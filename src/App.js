// import './App.css';
import * as React from "react";
import SignInSide from "./components/SignInSide";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage"
import Searchresult from "./components/Searchresult"

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/homepage/search" element={<Searchresult />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<SignInSide />} />
      </Routes>
    </div>
  );
}
// ReactDOM.render(<App />, document.querySelector('#app'));
export default App;
