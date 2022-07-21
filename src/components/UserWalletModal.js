import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserWalletModal = ({ user }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>ウォレットを見る</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{user.userName}さんの残高</ModalHeader>
        <ModalBody>
          {user.wallet}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>閉じる</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UserWalletModal;