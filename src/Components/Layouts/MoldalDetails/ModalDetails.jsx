import React, { useState } from 'react'
import Modal from 'react-modal'

export const ModalDetails = ({onRequestClose,isOpen}) => {

    
  return (
    <Modal ariaHideApp={false} className="modalDetails" onRequestClose={onRequestClose} isOpen={isOpen}>
        <div className="contUp">
            <h3>titulo Parqueadero</h3>
            <div className="contImages">
            <img src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            <div className="conttImages">
            <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            </div>
            </div>


        </div>
        <div className="contInfoPark">
            <p className='adressParking'>Unicentro</p>
            <p className='sirParking'>Jhon Moreno Rios</p>
            <p className='hours'>8am - 8pm</p>
            <p className='priceParking'>Moto $ COP hora</p>
            <p className='priceParking'>Carro $ COP hora</p>
            <button>Reservar</button>
        </div>
    </Modal>
  )
}
