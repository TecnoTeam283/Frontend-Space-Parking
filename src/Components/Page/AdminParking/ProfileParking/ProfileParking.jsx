import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../../UI/Logo/Logo'
import { UserDataContext } from '../../Context/UserDataProvider'
import { FormGroup } from '../../../UI/FormGroup/FormGroup'
import axios from 'axios'
export const ProfileParking = () => {

  const {userData} = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
// console.log(userData);

  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleCancelClick = () => {
    setIsEditing(false);
  };


  // Logica de Actualizacion de datos
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [cellphone, setCellphone] = useState(userData?.phone || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [cellphoneParking, setCellphoneParking] = useState(userData?.phoneParking || '');


 const onSubmit = async(e) => {
  e.preventDefault()
  const User = {
    name, email, cellphone, address, cellphoneParking   
  };
 
 try {
   const response = await axios.patch(`http://localhost:5000/api/users/updateUserParking/${userData.idUserParking}`, User);
  console.log(userData.idUserParking);
   alert("updated user")
  } catch (error) {
  alert("error updating user")

 }
}

  return (
    <div className='parkingProfile'>
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userData?.nameParking}</h3>
        <i className='icon-bell'></i>
        <div className='contIcon'>
          <i className='icon-user'></i>
        </div>
        {/* {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/profileParking'>Perfil</Link>
            <hr />
            <Link className='linkOptions' to='/'>Cerrar Sesión</Link>
          </div>
        )
        } */}
      </header>
      {isEditing ? (
        
          
            <form className='containerInputs' onSubmit={(e) => onSubmit(e)} action="">
              <FormGroup onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre"  value={name} />
              <FormGroup onChange={(e) => setEmail(e.target.value)} nameInput="email" inputType="email" contLabel="Correo"value={email} />
              <FormGroup onChange={(e) => setCellphone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono" value={cellphone} />
              <FormGroup onChange={(e) => setAddress(e.target.value)} nameInput="address" inputType="text" contLabel="Dirección" value={address} />
              <FormGroup onChange={(e) => setCellphoneParking(e.target.value)} nameInput="cellphoneParking" inputType="number" contLabel="Teléfono Parqueadero" value={cellphoneParking} />
              <div className="contFuncBtns">
                <button type='submit'>Actualizar</button>
                <button onClick={handleCancelClick}>Cancelar</button>
              </div>

            
            </form>
        ) : (

      <main className="containerall">        
          <div className='containerInfo'>
            <div className="personalInfo">
              <h4>Información Personal</h4>
              <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
              <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {userData?.phone}</p>
              <p><span className='spanInfo'>No. Identificación:</span> {userData?.idUserParking}</p>
              <p><span className='spanInfo'>Nit</span> {userData?.nit}</p>
              {/* <p><span className='spanInfo'>No. Licencia:</span> {userData?.license}</p> */}
            </div>


            <div className="parkingInfo">
              <h4>Información Parqueadero</h4>
              
              <p><span className='spanInfo'>Nombre Parqueadero: </span> {userData?.nameParking}</p>
              <p><span className='spanInfo'>Dirección: </span> {userData?.address}</p>
              <p><span className='spanInfo'>Teléfono Parqueadero: </span> {userData?.phoneParking}</p>
              <p><span className='spanInfo'>Hora inicio: </span> {userData?.hourStart}</p>
              <p><span className='spanInfo'>Hora Fin: </span> {userData?.hourEnd}</p>
            </div>
            
          </div>
          <div className="contFuncBtns">
            <button onClick={handleEditClick}>Actualizar Información</button>
            <button>Cambiar Contraseña</button>
          </div>

        </main>
        )}
    </div>
  )
}
