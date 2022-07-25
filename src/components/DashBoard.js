import React, { useState, useEffect, createContext } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";

export const CurrentUser = createContext();

const DashBoard = () => {

  const [user, setUser] = useState();
  const [userAuth, setUserAuth] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // ログイン認証
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      } else {
        setUserAuth(user);
      }
    }, []);
  });

  useEffect(() => {
    (async () => {
      const currentUserDocumentId = auth.lastNotifiedUid;
      const docRef = doc(db, "users", currentUserDocumentId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    })();
  })

  const logout = async () => {
    await signOut(auth);
    navigate("/signin");
  }

  if (userAuth !== null) {
    return (
      <>
        <CurrentUser.Provider value={user}>
          <h1>ダッシュボード</h1>
          <p>{user?.userName}さんようこそ!</p>
          <p>残高：{user?.wallet}</p>
          <button onClick={logout}>ログアウト</button>
          <UserList />
        </CurrentUser.Provider>
      </>
    )
  } 
}

export default DashBoard;
