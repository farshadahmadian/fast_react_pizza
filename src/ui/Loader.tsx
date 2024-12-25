function Loader() {
  return (
    // (inset-0 => left:0; top:0; right:0; bottom:0) OR (width: 100vw; height: 100vh)
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-[1px]">
      <div className="loader"></div>
      {/* <div className="loader absolute left-[calc(50%-45px/2)] top-[calc(50%-60px/2)]"></div> */}
    </div>
  );
}

export default Loader;
