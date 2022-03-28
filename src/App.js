import * as React from "react";
import SignInSide from "./components/SignInSide";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage"
import Searchresult from "./components/Searchresult"
import UserProfile from "./components/UserPage";
import Grouppage from "./components/Grouppage";
import Chat from "./components/chat";
import ChatPage from "./components/chatPage";
import "./App.css";


import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

initializeApp({
  apiKey: "AIzaSyA-zKmTvd4gLeuOyL4DgIcdbKiXqIogEQA",
  authDomain: "group-up-2.firebaseapp.com",
  databaseURL: "https://group-up-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "group-up-2",
  storageBucket: "group-up-2.appspot.com",
  messagingSenderId: "314900726163",
  appId: "1:314900726163:web:86fc0bb35db9c1ecfba866",
  measurementId: "G-RWJWLS4TQW"
})

// const auth = getAuth();
// const firestore = getFirestore();

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Routes>
        <Route path="/homepage/grouppage/:id" element={<Grouppage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/chat" element={<Chat />} />
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
