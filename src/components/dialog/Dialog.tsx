import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";

export interface DialogProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
  disableFocusTrap?: boolean; // This to enable unit test
}

export const Dialog = ({
  title,
  children,
  onClose,
  isOpen = true,
  disableFocusTrap = false,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const dialogContent = (
    <div
      className="modal fade show d-block dialog-content"
      data-testid="dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-lg">
        <div
          ref={dialogRef}
          className="modal-content"
          data-testid="dialog-content"
          tabIndex={-1}
        >
          <div className="modal-header">
            <h5
              className="modal-title"
              id="dialog-title"
              data-testid="dialog-title"
            >
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onMouseUp={handleCloseClick}
              aria-label="Close"
              data-testid="dialog-close-button"
            />
          </div>
          <div className="modal-body" data-testid="dialog-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // This to enable unit test without FocusTrap
  const modalContent = disableFocusTrap ? (
    dialogContent
  ) : (
    <FocusTrap active={isOpen}>{dialogContent}</FocusTrap>
  );

  return createPortal(modalContent, document.body);
};

export default Dialog;
