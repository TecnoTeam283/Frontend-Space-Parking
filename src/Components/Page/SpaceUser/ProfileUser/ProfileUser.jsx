import React, { useState, useContext, useEffect } from 'react'
// import styles from "../HomeUser/HomeUser.css"
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext} from '../../Context/UserDataProvider'
import axios from 'axios';



// Obtencion de los datos del ususario

export const ProfileUser = () => {
  const {updateUserData} = useContext(UserDataContext);
  const {userData} = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [cellphone, setPhone] = useState(userData?.cellphone);

  
  // Asignar imagen dependiendo el tipo de vehiculo
  
  const getImageSource = () => {
    if (userData?.vehicle?.toUpperCase() === 'MOTO') {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814136/SpaceParking/Moto.webp';
    } else {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814081/SpaceParking/Carro.jpg';
    }
  };
  
  
    const handleEditClick = () => {
      setIsEditing(true);
      console.log(userData);
    };
  
    const handleCancelClick = () => {
      setIsEditing(false);
    };


    useEffect(() => {
      if (!name && !cellphone) {
        setName(userData?.name);
        setPhone(userData?.cellphone);
      }
    }, [userData]);


    const onSubmit = async(e) => {
      e.preventDefault()
      const User = {
        name, cellphone
      };

      try {
        const response = await axios.patch(`http://localhost:5000/api/users/updateUser/${userData.idUser}`, User);
        alert("updated user")
        getUser()
        setIsEditing(false);
       } catch (error) {
       alert("error updating user")
     }
     }

     // Peticion de obtener el usuario luego de actualizar los datos
 const getUser = async () => {
  try {
    if (userData?.email) {
      const response = await axios.post('http://localhost:5000/api/users/meUser', { email: userData?.email });
      updateUserData(response.data);
    }
  } catch (error) {
  }
};

useEffect(() => {
  getUser();
}, [userData]);
  
  
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
          
          <form className="containerInputs" onSubmit={(e) => onSubmit(e)} action="">
            <FormGroup value={name} onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre" />
            <FormGroup value={cellphone} onChange={(e) => setPhone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono" />
            {/* <FormGroup onChange={handlePhoneChange} inputType="number" contLabel="Teléfono" value={phone} /> */}
    
            <div className="contBtns">
              <button >Actualizar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          </form>
          
        ) : (

        <div className="containerall">        
          <div className='containerInfo'>
            <div className="personalInfo">
              <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
              <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {userData?.cellphone}</p>
              <p><span className='spanInfo'>No. Identificación:</span> {userData?.idUser}</p>
              {/* <p><span className='spanInfo'>No. Licencia:</span> {userData?.license}</p> */}
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
            <button onClick={handleEditClick}>Actualizar Información</button>
        </div>
        )}
      </div>
    );
  }
