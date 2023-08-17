import React from 'react'

import styles from "./Modal.module.css"
 
interface Props {
  children: React.ReactNode
}

const Modal = ({children}: Props) => {

  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.querySelector("#modal")
    modal!.classList.add("hide") // ! diz que o elemento vem de certeza
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div> {/* O onclick funciona ao clicar no modal */}
      <div className={styles.modal}>
        <h2>Texto do modal</h2>
        {children} 
      </div>
    </div>
  )
}

export default Modal