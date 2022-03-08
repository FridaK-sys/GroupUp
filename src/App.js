import * as React from "react";
import SignInSide from "./components/SignInSide";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage"
import Searchresult from "./components/Searchresult"
import UserProfile from "./components/UserPage";
import Grouppage from "./components/Grouppage";
import "./App.css";


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCW9axUW2035fjrqjts23aw32k09gtLUdY",
  authDomain: "groupup-5ffe8.firebaseapp.com",
  databaseURL: "https://groupup-5ffe8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "groupup-5ffe8",
  storageBucket: "groupup-5ffe8.appspot.com",
  messagingSenderId: "263112867766",
  appId: "1:263112867766:web:9e823c8699eace63d44b17"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/homepage/grouppage/:id" element={<Grouppage />} />
        <Route path="/userpage" element={<UserProfile />} />
        <Route path="/homepage/search" element={<Searchresult />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<SignInSide />} />
      </Routes>
    </div>
  );
}
// ReactDOM.render(<App />, document.querySelector('#app'));
export default App;
