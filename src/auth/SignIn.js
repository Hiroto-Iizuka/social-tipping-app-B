import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword,
      );
      navigate("/");
    } catch(error) {
      alert("メールアドレスもしくはパスワードが間違っています")
    }
  }

  return (
    <>
      <h1>ログイン画面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            placeholder="E-mail"
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password" 
            type="password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            placeholder="Password" 
          />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
      <p><Link to={{pathname: "/signup"}}>新規登録はこちらから</Link></p>
    </>
  )
}

export default SignIn;
