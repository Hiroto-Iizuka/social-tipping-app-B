import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

const UserList = () => {
  // const [users, setUsers] = useState([]);
  const users = [];

  useEffect(() => {
    // user一覧を取得
    (async () => {
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      })
  })();
  });

  // const test = async () => {
  //   const q = query(collection(db, "users"));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     users.push(doc.data());
  //   })
  //   console.log(users)
  // }

  // const displayUsers = () => {
  //   users.map((user, index) => {
  //   return (
  //     <tbody>
  //       <tr>
  //         <td>{user[index].userName}</td>
  //         <td>ウォレットを見る</td>
  //         <td>送る</td>
  //       </tr>
  //     </tbody>
  //     )
  //   })
  // }

  const displayUsers = () => {
    if (typeof users !== 'undefined') {
    users.map((user, index) => (
      <tbody>
        <tr>
          <td>{user.userName}</td>
          <td><button>ウォレットを見る</button></td>
          <td><button>送る</button></td>
        </tr>
      </tbody>
    ))}
  }

  return (
    <>
      <h1>ユーザ一覧</h1>
      <table>
        <thead>
          <tr>
            <td>ユーザ名</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        {displayUsers()}
        {/* <button onClick={test}>test</button> */}
      </table>
    </>
  )
}

export default UserList;
