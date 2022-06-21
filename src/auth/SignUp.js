import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
    } catch(error) {
      alert("正しく入力してください");
    }
    const usersCollectionRef = collection(db, "users");
    await addDoc(usersCollectionRef, {
      uid: auth.lastNotifiedUid,
      userName: registerUserName,
      email: registerEmail,
      password: registerPassword,
      wallet: 0,
    });
    window.location.href = "/"; 
  }

  return (
    <>
      <h1>新規登録画面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザ名</label>
          <input 
            name="userName" 
            type="userName" 
            value={registerUserName}
            onChange={(e) => setRegisterUserName(e.target.value)}
            placeholder="userName"
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            placeholder="E-mail"
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password" 
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Password" 
          />
        </div>
        <div>
          <button>新規登録</button>
        </div>
        <p><Link to={{pathname: "/signin"}}>ログインはこちらから</Link></p>
      </form>
    </>
  )
}

export default SignUp;
