import Modal from "react-modal";
import React, { useEffect, FC } from "react";
import { ReactNode } from "react";
import css from "./ImageModal.module.css";



interface iImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}


Modal.setAppElement("#root");

const customStyles: Modal.Styles = {
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

export default function ImageModal ({
  isOpen,
  onClose,
  imageUrl,
  children,}: iImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      return () => {
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!children) return null;

  return (
    <>
      <Modal
        className={css.ImageModal}
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
      >
        <button className={css.Btn} onClick={onClose}>
          close
        </button>
        <div className={css.BigImage}>
        {children}
        </div>
        
      </Modal>
    </>
  );
}
