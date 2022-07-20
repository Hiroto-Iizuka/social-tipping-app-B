import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import UserWalletModal from "./UserWalletModal";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [])

  return (
    <>
    {users && users.length && (
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
          <tbody>
            {
              users.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td><UserWalletModal user={user} /></td>
                <td><button>送る</button></td>
              </tr>
              ))
            }
          </tbody>         
        </table>
      </>
    )}
    </>
  )

}

export default UserList;
