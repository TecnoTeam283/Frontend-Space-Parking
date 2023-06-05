import React from 'react'
import Modal from 'react-modal'
// import styles from 
import { Circle } from '../../UI/Circle/Circle'
export const ModalState = ({actualState, numberState, onRequestClose, isOpen, onStateChange}) => {


  const handleStateChange = (newState) => {
    onStateChange(newState);
  };

  return (
    <Modal ariaHideApp={false} className="modalState" onRequestClose={onRequestClose} isOpen={isOpen}>
      <p>Estado Actual</p>
      <Circle state={actualState} />

      <p>Selecciona el nuevo estado</p>
      <div className="contStates">
      <Circle onClick={() => handleStateChange("reserved")} number={numberState} state="reserved"/>
      <Circle onClick={() => handleStateChange("busy")} number={numberState} state="busy"/>
      <Circle onClick={() => handleStateChange("notAvailable")} number={numberState} state="notAvailable"/>
      <Circle onClick={() => handleStateChange("available")} number={numberState} state="available"/>
      </div>



      

    </Modal>
  )
}


