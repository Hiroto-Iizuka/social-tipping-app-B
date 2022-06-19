import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = e.target.elements;
    const usersCollectionRef = collection(db, "users");
    await addDoc(usersCollectionRef, {
      userName: userName.value,
      email: email.value,
      password: password.value,
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
            placeholder="userName"
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password" 
            type="password"
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
