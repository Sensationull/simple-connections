import { useEffect, useRef } from "react";
import cx from "classnames";
import "./Modal.css";

type ModalProps = {
  onReset(): void;
  headerText: string;
  description: string;
  shouldShowButton: boolean;
};

const Modal = ({
  headerText,
  description,
  onReset,
  shouldShowButton,
}: ModalProps) => {
  useEffect(() => {
    if (!shouldShowButton && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [shouldShowButton]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = (shouldReset: boolean) => {
    if (dialogRef.current && !shouldReset) {
      dialogRef.current.close();
    } else if (dialogRef.current && shouldReset) {
      onReset();
      dialogRef.current.close();
    }
  };
  return (
    <>
      {shouldShowButton && (
        <button className="reset-button" onClick={openDialog}>
          Reset
        </button>
      )}
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
          <div
            className={cx("modal-button-group", {
              "modal-button-group-single-button": !shouldShowButton,
            })}
          >
            {shouldShowButton && (
              <button className="button" onClick={() => closeDialog(false)}>
                No
              </button>
            )}
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
