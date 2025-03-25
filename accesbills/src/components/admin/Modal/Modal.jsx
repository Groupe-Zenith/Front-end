import React from "react";
import { Modal, Button } from "antd";

const LogoutModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Confirmer la déconnexion"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Oui, se déconnecter
        </Button>,
      ]}
    >
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
    </Modal>
  );
};

export default LogoutModal;
