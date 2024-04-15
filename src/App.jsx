import { Routes, Route } from "react-router-dom";

import { Home, Error } from "./Pages";

import { Navbar } from "./Components";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
