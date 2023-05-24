import React, { useState } from 'react'
// import styles from "../HomeUser/HomeUser.css"
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import { Logo } from '../../../UI/Logo/Logo';
export const ProfileUser = () => {

  const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [phone, setPhone] = useState('3218413214');
    const [id, setId] = useState('10952341211');
    const [license, setLicense] = useState('2532340333');
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = () => {
      setIsEditing(false);
      // Aquí puedes realizar la lógica para guardar los cambios en el backend
    };
  
    const handleCancelClick = () => {
      setIsEditing(false);
    };
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
  
    const handleBioChange = (event) => {
      setBio(event.target.value);
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
            <FormGroup onChange={handleNameChange} inputType="text" contLabel="Nombre" value={name} />
            <FormGroup onChange={handleEmailChange} inputType="email" contLabel="Correo" value={email} />
            <FormGroup onChange={handlePhoneChange} inputType="number" contLabel="Teléfono" value={phone} />
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
              <p><span className='spanInfo'>Nombre: </span> {name}</p>
              <p><span className='spanInfo'>Correo: </span> {email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {phone}</p>
              <p><span className='spanInfo'>No. Identificación:</span> {id}</p>
              <p><span className='spanInfo'>No. Licencia:</span> {license}</p>
            </div>
            <div className="allVehicles">
                <h2>Mis vehiculos</h2>
              <div className="contVehicles">
                <div className="vehicle">
                  <img src="https://res.cloudinary.com/miguelgo205/image/upload/v1684814136/SpaceParking/Moto.webp" alt="" />
                  <p><span>Placa:</span> DMN23D </p>
                </div>
                <div className="vehicle">
                  <img src="https://res.cloudinary.com/miguelgo205/image/upload/v1684814081/SpaceParking/Carro.jpg" alt="" />
                  <p><span>Placa:</span> Vlx40c </p>
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
