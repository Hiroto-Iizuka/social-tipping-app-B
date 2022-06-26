import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [userDocument, setUserDocument] = useState('');

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const currentUserDocumentId = auth.lastNotifiedUid;
      const docRef = doc(db, "users", currentUserDocumentId);
      const docSnap = await getDoc(docRef);
      setUserDocument(docSnap.data()); 
    })();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  // }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/signin");
  }

  return (
    <>
      {!loading && (
        <>
          {user ? (
            <>
              <h1>ダッシュボード</h1>
              <p>{userDocument.userName}さんようこそ!</p>
              <p>残高：{userDocument.wallet}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          ) : (
            <Navigate to={"signin"} />
          )}
        </>
      )}
    </>
  )
}


export default DashBoard;
