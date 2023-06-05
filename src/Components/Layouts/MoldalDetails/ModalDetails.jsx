import React from 'react'
import Modal from 'react-modal'

export const ModalDetails = ({onRequestClose,isOpen,functionGetItem}) => {

console.log(functionGetItem);

  return (
    <Modal getItem={functionGetItem}  ariaHideApp={false} className="modalDetails" onRequestClose={onRequestClose} isOpen={isOpen}>
        <div className="contUp">
            <h3>{functionGetItem?.nameParking}</h3>
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
                <p> <span>Direccion:</span>{functionGetItem?.address}</p>
                <p> <span>Administrador:</span>{functionGetItem?.name}</p>
                <p> <span>Telefono:</span>{functionGetItem?.cellphone}</p>
                <p> <span>Correo:</span>{functionGetItem?.email}</p>
                <p> <span>Horarios:</span>{functionGetItem?.hourStart} - {functionGetItem?.hourEnd}</p>
                <p> <span>Precio Moto:</span>$ {functionGetItem?.priceMotorcycle} COP</p>
                <p> <span>Precio Carro:</span>$ {functionGetItem?.priceCar} COP </p>
                <button className='btnBooking'>Reservar</button>
            </div>
        </div>

        </div>
    </Modal>
  )
}
