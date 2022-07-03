import React, { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const DashBoard = () => {

  const [user, setUser] = useState();
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (typeof userAuth !== 'object') {
        setUserAuth(currentUser);
      }
    });
  }, [userAuth]);

  useEffect(() => {
    (async () => {
      const currentUserDocumentId = auth.lastNotifiedUid;
      const docRef = doc(db, "users", currentUserDocumentId);
      const docSnap = await getDoc(docRef);
      if (typeof user !== 'object') {
        setUser(docSnap.data());
      }
    })();
  }, [])

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/signin");
  }

  return (
    <>
      {!userAuth ? (
        <Navigate to={"signin"} />
      ) : (
        <>
          {!user ? (
            <Navigate to={"signin"} />
          ) : (
            <>
              <h1>ダッシュボード</h1>
              <p>{user?.userName}さんようこそ!</p>
              <p>残高：{user?.wallet}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  )
}


export default DashBoard;
