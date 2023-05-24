import React, { useState } from 'react'
import Modal from 'react-modal'

export const ModalDetails = ({onRequestClose,isOpen}) => {

    
  return (
    <Modal ariaHideApp={false} className="modalDetails" onRequestClose={onRequestClose} isOpen={isOpen}>
        <div className="contUp">
            <h3>Parqueadero La Cejita</h3>
            <hr />

          <div className="containerAside">
            <div className="contImages">
              <img id='imgPrin' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815614/SpaceParking/432216777nidoo-parqueaderos-cy_i901xu.jpg" alt="" />
              {/* <div className="conttImages"> */}
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815602/SpaceParking/parqueadero1_ljazl7.jpg" alt="" />
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            
            </div>

            <hr />
            <div className="contInfoPark">
                <p> <span>Direccion:</span> Unicentro</p>
                <p> <span>Administrador:</span> Jhon Moreno Rios</p>
                <p> <span>Horarios:</span> 8am - 8pm</p>
                <p> <span>Precio Moto:</span> 800$ COP hora</p>
                <p> <span>Precio Carro:</span> 1200$ COP hora</p>
                <button>Reservar</button>
            </div>
        </div>

        </div>
    </Modal>
  )
}
