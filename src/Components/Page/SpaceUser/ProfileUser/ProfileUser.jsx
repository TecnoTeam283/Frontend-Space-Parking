import React, { useState, useContext, useEffect } from 'react'
// import styles from "../HomeUser/HomeUser.css"
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext} from '../../Context/UserDataProvider'
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useNavigate } from 'react-router-dom';



// Obtencion de los datos del ususario

export const ProfileUser = () => {
  // Mantenemos Actualizando el userdata del usecontext, para mantener la pagina actulizada
  const {updateUserData} = useContext(UserDataContext);
  const navigate = useNavigate()
  const {userData} = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [cellphone, setCellphone] = useState(userData?.cellphone);
  // Cambio de Contraseña
  const [currentPassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  // Mostrar Div del perfil
  const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
// Validacion de que los campos se guardan
  useEffect(() => {
    if (!name && !cellphone) {
      setName(userData?.name);
      setCellphone(userData?.cellphone);
    }
  }, [userData, cellphone, name]);


  // Alertas de actualizacion de datos 
  const correctUpdateData = () =>{
    Swal.fire({
        icon: 'success',
        title: '¡Excelente!',
        html: 'Tus Datos Han Sido Actualizados',
        showConfirmButton: true,
        confirmButtonText: 'Hecho',
        customClass: {
          title: 'titleUpdatePass',
          content: 'textUpdatePass',
          confirmButton: 'btnUpdatePass',
        },
      })
    };

  const incorrectUpData = () =>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Verifica Los Datos E Intentalo Mas Tarde',
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdateIncorrect',
            content: 'textUpdatePass',
            confirmButton: 'btnIncorrectPass',
          },
        })
  }

  // Alertas Cambio de contraseña
  const correctUpdatePass = () =>{
    Swal.fire({
        icon: 'success',
        title: '¡Excelente!',
        html: 'Contraseña Actualizada <br> Debes Volver A Iniciar Sesion',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        customClass: {
          title: 'titleUpdatePass',
          content: 'textUpdatePass',
          confirmButton: 'btnUpdatePass',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
        }
      });
    };

  const incorrectUpPassword = () =>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Datos incorrectos',
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdateIncorrect',
            content: 'textUpdatePass',
            confirmButton: 'btnIncorrectPass',
          },
        })
  }

  
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
      // console.log(userData);
    };

    const handleEditPassword = ()=>{
      setEditingPassword(true)
    }
  
    const handleCancelClick = () => {
      setIsEditing(false);
      setEditingPassword(false);
    };


    useEffect(() => {
      if (!name && !cellphone) {
        setName(userData?.name);
        setCellphone(userData?.cellphone);
      }
    }, [userData, cellphone, name]);


    const updateData = async(e) => {
      e.preventDefault()
      const User = {
        name, cellphone
      };
      
      try {
        // console.log("entra");
        await axios.patch(`https://backend-space-parking.onrender.com/api/users/updateUser/${userData?.idUser}`, User);
        getUser()
        console.log(User);
        setIsEditing(false);
        correctUpdateData();
        
       } catch (error) {
       incorrectUpData()
     }
     }

     // Peticion de obtener el usuario luego de actualizar los datos
 const getUser = async () => {
  try {
    if (userData?.email) {
      const response = await axios.post('https://backend-space-parking.onrender.com/api/users/meUser', { email: userData?.email });
      updateUserData(response.data);
    }
  } catch (error) {
  }
};

useEffect(() => {
  getUser();
});

// Función Actualizar contraseña
const UpdatePassword = async(e) =>{
  e.preventDefault()
  const User = {
    currentPassword, email, newPassword
  };
  try {
    axios.patch('https://backend-space-parking.onrender.com/api/users/updatePassword', User)
    correctUpdatePass();
    setEditingPassword(false)

  } catch (error) {
    incorrectUpPassword()
  }
}
  
  
    return (
      <div className="user-profile">
        <header className='headerUser'>
          <Logo to="/HomeUser"idLogo="logoHomeUser"/>
            
          <h3 >Datos Personales</h3>
          <i className='icon-bell'></i>
          <div onClick={toggleDiv} className='contIcon'>
          <i className='icon-user'></i>
        </div>
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/HomeUser'>Home</Link>
            <hr />
            <Link className='linkOptions' to='/'>Cerrar Sesión</Link>
          </div>
        )
        }
        </header>
        {isEditing ? (
          
          <form className="containerInputs" onSubmit={(e) => updateData(e)} action="">
            <FormGroup value={name} onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre" />
            <FormGroup value={cellphone} onChange={(e) => setCellphone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono" />
            
            <div className="contBtns">
              <button type='submit' >Actualizar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          </form>
          
        ):isEditingPassword ? (
          <form className='containerInputs' onSubmit={(e) => UpdatePassword(e)} action=''>
            <FormGroup onChange={(e) => setPassword(e.target.value)} nameInput="currentPassword" inputType="password" contLabel="Contraseña Actual" />
            <FormGroup onChange={(e) => setEmail(e.target.value)} nameInput="email" inputType="email" contLabel="Correo" />
            <FormGroup onChange={(e) => setNewPassword(e.target.value)} nameInput="newPassword" inputType="text" contLabel="Nueva Contraseña" />
            <div className="contFuncBtns">
                <button type='submit'>Actualizar Contraseña</button>
                <button onClick={()=> setEditingPassword(false)}>Cancelar</button>
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
          <div className="contBtns">

            <button onClick={handleEditClick}>Actualizar Información</button>
            <button onClick={handleEditPassword}>Cambiar Contraseña</button>
          </div>
        </div>
        )}
      </div>
    );
  }
