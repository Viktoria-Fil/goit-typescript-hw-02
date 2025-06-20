import Modal from "react-modal";
import React, { useEffect } from "react";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    padding: "20px",
    border: "none",
    maxWidth: "100%",
    maxHeight: "90%",
    textAlign: "center",
  },
};

const ImageModal = ({ isOpen, imageData, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!imageData) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.ImageModal}
      style={customStyles}
    >
      <img
        className={css.BigImage}
        src={imageData.urls.regular}
        alt={imageData.alt_description}
      />
      <p>{imageData.description || "No description available"}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ImageModal;
