import React, { useState, useContext } from 'react'
// import styles from "../HomeUser/HomeUser.css"
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext} from '../../Context/UserDataProvider'




// Obtencion de los datos del ususario

export const ProfileUser = () => {
  const {userData} = useContext(UserDataContext);
  console.log(userData);
  
  // Asignar imagen dependiendo el tipo de vehiculo
  
  const getImageSource = () => {
    if (userData?.vehicle.toUpperCase() === 'MOTO') {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814136/SpaceParking/Moto.webp';
    } else {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814081/SpaceParking/Carro.jpg';
    }
  };
  
  
  const [isEditing, setIsEditing] = useState(false);
    // const [name, setName] = useState("fesfsef");
    // const [email, setEmail] = useState('johndoe@example.com');
    // const [phone, setPhone] = useState('3218413214');
    // const [id, setId] = useState('10952341211');
    // const [license, setLicense] = useState('2532340333');
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = () => {
      setIsEditing(false);
      // Aquí se puede realizar la lógica para guardar los cambios en el backend.M.I
    };
  
    const handleCancelClick = () => {
      setIsEditing(false);
    };
  
  
    return (
      <div className="user-profile">
        <header className='headerUser'>
          <Logo to="/HomeUser"idLogo="logoHomeUser"/>
            
          <h3 >Datos Personales</h3>
          <i className='icon-bell'></i>
          <div className="contIcon">
              <i  className='icon-user'></i>
          </div>
        </header>
        {isEditing ? (
          <div className='containerInputs'>
            {/* <FormGroup onChange={handleNameChange} inputType="text" contLabel="Nombre" value={userData.name} />
            <FormGroup onChange={handleEmailChange} inputType="email" contLabel="Correo" value={userData.email} />
            <FormGroup onChange={handlePhoneChange} inputType="number" contLabel="Teléfono" value={userData.phone} /> */}
            {/* <FormGroup onChange={handlePhoneChange} inputType="number" contLabel="Teléfono" value={phone} /> */}
    
            <div className="contBtns">
              <button onClick={handleSaveClick}>Actualizar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          </div>
        ) : (

        <div className="containerall">        
          <div className='containerInfo'>
            <div className="personalInfo">
              <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
              <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {userData?.phone}</p>
              <p><span className='spanInfo'>No. Identificación:</span> {userData?.idUser}</p>
              <p><span className='spanInfo'>No. Licencia:</span> {userData?.license}</p>
            </div>
            <div className="allVehicles">
                <h2>Mis vehiculos</h2>
              <div className="contVehicles">
                <div className="vehicle">
                  <img src={getImageSource()} alt="" />
                  <p><span>Placa:</span>{userData?.placa}</p>
                </div>
              </div>
            </div>
          </div>
            <button onClick={handleEditClick}>Editar</button>
        </div>
        )}
      </div>
    );
  }
