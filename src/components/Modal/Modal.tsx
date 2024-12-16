import React from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  orientation: {top?: number, left?: number, bottom?: number, right?: number};
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, orientation, children }) => {
  return (
    <div className={`absolute top-${orientation.top} left-${orientation.left} bottom-${orientation.bottom} right-${orientation.right} bg-black/70 w-full h-full flex justify-center items-center`}>
      <div className="rounded bg-white w-[90%] lg:w-[70%] p-4 text-black">{children}</div>
    </div>
  );
};

export default Modal;
