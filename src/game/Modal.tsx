import { useRef } from "react";
// import "./Modal.css"; <- Somehow an issue with the CSS not removing the dialog when clicked...

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
        <h2 id="dialog-title" aria-modal="true" aria-labelledby="dialog-title">
          {headerText}
        </h2>
        <section className="modal-content">{description}</section>
        <button onClick={() => closeDialog(false)}>No</button>
        <button onClick={() => closeDialog(true)}>Yes</button>
      </dialog>
    </>
  );
};

export default Modal;
