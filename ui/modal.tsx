'use client';
import { useState } from "react";

type ModalProps = {
  children: (onClose: () => void) => React.ReactNode;
  button: React.ReactNode;
};

export function Modal({ children, button }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-none p-0 m-0 outline-none"
      >
        {button}
      </button>

      {isOpen && (
        <div className="z-[100] fixed inset-0 bg-msx-black">
          <button type="button" onClick={handleClose} className="flex w-full justify-end p-4">
            <img
              src="/icons/cross.png"
              alt="close menu"
              width={32}
              height={32}
            />
          </button>
          {children(handleClose)}
        </div>
      )}
    </>
  );
}
