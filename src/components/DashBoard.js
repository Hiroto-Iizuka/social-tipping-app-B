import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const DashBoard = () => {
  const [userDocument, setUserDocument] = useState('');

  useEffect(() => {
    (async () => {
      const currentUserDocumentId = auth.lastNotifiedUid;
      const docRef = doc(db, "users", currentUserDocumentId);
      const docSnap = await getDoc(docRef);
      setUserDocument(docSnap.data()); 
    })();
  }, []);

  return (
    <>
      <h1>ダッシュボード</h1>
      <p>{userDocument.userName}さんようこそ!</p>
      <p>残高：{userDocument.wallet}</p>
    </>
  )
}

export default DashBoard;
