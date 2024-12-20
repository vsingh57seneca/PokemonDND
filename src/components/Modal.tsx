import React, { ReactNode } from "react";

interface ModalProps {
  modal_id: string;
  modalTitle: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: ReactNode;
  actionButton?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modal_id,
  modalTitle,
  showModal,
  setShowModal,
  children,
  actionButton
}) => {
  return (
    <div>
      {/* Modal */}
      <div
        className="absolute top-0 left-0 w-full md:inset-0 z-50 flex items-center justify-center bg-black/50 text-black"
        id="custom-modal"
      >
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">{modalTitle}</h1>
          <div className="mb-6">{children}</div>
          <div className="flex justify-end">
            <div className="flex gap-x-2">
                {actionButton}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(!showModal)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
