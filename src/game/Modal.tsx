import { useRef } from "react";
import "./Modal.css";

type ModalProps = {
  //   children: ReactNode;
  onReset(): void;
  headerText: string;
  description: string;
};

const Modal = ({ headerText, description, onReset }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    // onReset ? onReset() : null;
  };
  const closeDialog = (shouldReset: boolean) => {
    console.log(dialogRef.current);
    if (dialogRef.current && !shouldReset) {
      dialogRef.current.close();
    } else if (dialogRef.current && shouldReset) {
      onReset();
      dialogRef.current.close();
    }
  };
  return (
    <>
      <button onClick={openDialog}>Reset</button>
      <dialog ref={dialogRef} className="modal">
        <section className="content-container">
          <h2
            id="dialog-title"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="header"
          >
            {headerText}
          </h2>
          <section className="modal-content">{description}</section>
          <div className="modal-button-group">
            <button className="button" onClick={() => closeDialog(false)}>
              No
            </button>
            <button className="button" onClick={() => closeDialog(true)}>
              Yes
            </button>
          </div>
        </section>
      </dialog>
    </>
  );
};

export default Modal;
