// import './App.css';
import * as React from "react";
import ReactDOM from "react-dom";
import SignInSide from "./components/SignInSide";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<SignInSide />} />
      </Routes>
    </div>
  );
}
// ReactDOM.render(<App />, document.querySelector('#app'));
export default App;
