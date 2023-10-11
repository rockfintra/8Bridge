import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Modal.scss";
import Backdrop from "./Backdrop";
import ReactModal from "./ReactModal";

const modalVaraints = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
    scale: 1,
    x: "-50%",
    y: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
};

interface IModal {
  isOpen: boolean;
  handleClose?: () => void;
  children?: ReactNode;
}

const Modal: React.FC<IModal> = ({ isOpen, handleClose, children }) => {
  return (
    <ReactModal>
      <Backdrop handleClose={handleClose} isOpen={isOpen}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className={"base-modal"}
              onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
              variants={modalVaraints}
              animate="animate"
              initial="initial"
              exit="exit"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </Backdrop>
    </ReactModal>
  );
};

export default Modal;
