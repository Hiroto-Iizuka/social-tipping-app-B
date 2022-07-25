import React, { useState, useContext } from 'react';
import { CurrentUser } from './DashBoard';
import { db } from "../firebase/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { 
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Label, Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendMoneyModal = ({ user }) => {
  const currentUser = useContext(CurrentUser);
  const targetUser = user

  const [modal, setModal] = useState(false);
  const [money, setMoney] = useState();

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    withDrawMoney();
    sendMoney();
    setModal(false);
  }

  const withDrawMoney = async () => {
    const currentUserWallet = currentUser.wallet;
    const resultMoney = currentUserWallet - money;
    const currentUserRef = doc(db, "users", currentUser.uid);
    await updateDoc(currentUserRef, {
      wallet: resultMoney
    });
  }

  const sendMoney = async () => {
    const targetUserWallet = targetUser.wallet;
    const resultMoney = Number(targetUserWallet) + Number(money);
    const targetUserRef = doc(db, "users", targetUser.uid);
    await updateDoc(targetUserRef, {
      wallet: resultMoney
    });
  }

  return (
    <div>
      <Button onClick={toggle}>送る</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>あなたの残高：{currentUser.wallet}</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Label>送る金額</Label>
            <Input 
              id="sendMoney" 
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button>送信</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default SendMoneyModal;
