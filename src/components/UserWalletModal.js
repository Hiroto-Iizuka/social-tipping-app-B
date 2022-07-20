import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const UserWalletModal = ({ user }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>ウォレットを見る</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          {user.userName}さんの残高
          <br />
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