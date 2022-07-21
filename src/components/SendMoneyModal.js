import React, { useState, useContext } from 'react';
import { CurrentUser } from './DashBoard';
import { 
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
  Form, Label, Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendMoneyModal = () => {
  const currentUser = useContext(CurrentUser)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>送る</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>あなたの残高：{currentUser.wallet}</ModalHeader>
        <ModalBody>
          <Form>
            <Label>送る金額</Label>
            <Input />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button>送信</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SendMoneyModal;