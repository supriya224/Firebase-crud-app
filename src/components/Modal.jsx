
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

function Modal({ onClose, isOpen, children }) {
  return createPortal(
    <>
      {isOpen && (
    <div className=" grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur">
      <div className=" m-auto min-h-[200px] relative z-50 min-w-[80%] bg-white p-4">
          <div className="flex justify-end ">
            <AiOutlineClose
              onClick={onClose}
              className=" cursor-pointer self-end text-2xl"
            />
          </div>
          {children}
        </div>
       
    </div>
      )}
    </>
  ,document.getElementById("modal-root")
  );
}

export default Modal;
