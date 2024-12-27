import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition(): Promise<PositionType> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type PositionType = {
  coords: GeolocationCoordinates;
  timestamp: number;
};

/* 
  createAsyncThunk(action_type_prefix, middleware_function)
  creates an "extra action creator function". When this action creator function
  is dispatched, first the middleware will be called and return a promise. One 
  reducer will be called when the promise is pending, with the action object
  {type:"user/fetchAddress/pending"}. Another reducer will be called when the promise
  is fulfilled or rejected with the action object {type:"user/fetchAddress/fulfilled OR rejected", payload}
  where "payload" is the returned value of the middleware function or the thrown error instance 
*/
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // payload of the FULFILLED state
    return { position, address };
  },
);

export type UserStateType = {
  username: string;
  status: "idle" | "loading" | "error";
  position: { latitude: number; longitude: number } | null;
  address: string;
  error: SerializedError | null;
  phone: string;
  orderIds: string[];
};

export const LOCAL_STORAGE_USER = "userData";
const userString = localStorage.getItem(LOCAL_STORAGE_USER);
export const initialUserData: UserStateType = JSON.parse(
  userString ||
    '{"username":"", "status":"idle", "position":"", "address":"", "error":null, "phone":"", "orderIds":[]}',
);

const initialState: UserStateType = {
  username: initialUserData.username,
  status: "idle",
  position: initialUserData.position,
  address: initialUserData.address,
  error: null,
  phone: initialUserData.phone,
  orderIds: initialUserData.orderIds,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(prevState, action) {
      prevState.username = action.payload;
    },
    // enterName(prevState, action) {
    //   prevState.username = action.payload;
    // },
    // fillInformation(prevState, action) {
    //   prevState.username = action.payload.username;
    //   prevState.phoneNumber = action.payload.phoneNumber;
    //   prevState.address = action.payload.address;
    // },

    updateUserData(prevState, action) {
      prevState.orderIds.push(action.payload.id);
      prevState.phone = action.payload.phone;
      prevState.address = action.payload.phone;
    },

    logout(prevState) {
      prevState.address = "";
      prevState.error = null;
      prevState.status = "idle";
      prevState.orderIds = [];
      prevState.position = null;
      prevState.phone = "";
      prevState.username = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (prevState) => {
        // the reducer that will be called when the action type is user/fetchAddress/pending
        prevState.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (prevState, action) => {
        // the reducer that will be called when the action type is user/fetchAddress/fulfilled
        prevState.status = "idle";
        prevState.position = action.payload.position;
        prevState.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (prevState, action) => {
        // the reducer that will be called when the action type is user/fetchAddress/rejected
        prevState.status = "error";
        prevState.error = action.error;
      });
  },
});

export const { updateName, updateUserData, logout } = userSlice.actions;
export default userSlice.reducer;
