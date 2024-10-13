import { useEffect, useRef } from "react";
import ModalBody from "./modal-comp/ModalBody"
import "./Modal.css"

export default function Modal({active, setActive}) {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setActive]);


    return (
        <div className={`modal ${active ? "active" : ""}`}>
            <div className="modal_content" ref={modalRef}>
                <ModalBody />
            </div>
        </div>
    )
} 