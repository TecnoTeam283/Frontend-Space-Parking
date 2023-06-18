import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { FormGroup } from '../../UI/FormGroup/FormGroup'
import axios from 'axios';
import Swal from 'sweetalert2'
import { MapCreate } from '../../UI/MapCreate/MapCreate';

// import { CloudinaryContext } from 'cloudinary-react';
// import { MapCreate } from '../../UI/MapCreate/MapCreate';

export const ModalParking = ({isOpen, onRequestClose}) => {

  // Uso de mapa como input 
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleLocationChange = (latlng) => {
    setLocation(latlng);
  };

    // State para almacenar las coordenadas de ubicación seleccionadas
    

    


// Manejo de imagenes con cloudinary
  // const [imageUrls, setImageUrls] = useState([]);
  // const cloudName = 'miguelgo205';
  // const apiKey = '975486234138471';
  // const folderName = 'Parkings';

  // Alerta creacion de cuenta
  const accountCreate = () =>{
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
      // text: 'Datos incorrectos',
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }

  // const handleImageUpload = async () => {
  //   const files = document.getElementById('inputFile').files;
  //   const urls = [];
  
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', 'TU_UPLOAD_PRESET'); // Define un upload preset en tu cuenta de Cloudinary
  //     formData.append('folder', folderName);
  //     try {
  //       const response = await fetch(
  //         `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
  //         {
  //           method: 'POST',
  //           body: formData,
  //         }
  //       );
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         const imageUrl = data.secure_url;
  //         urls.push(imageUrl);
  //       } else {
  //         console.error('Error al subir la imagen:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error al subir la imagen:', error);
  //     }
  //   }
  
  //   setInputs({...inputs, stringPhoto: urls});
  // };

   // Connect back and front
   const [inputs, setInputs] = useState({
    name: "",
    email: "", 
    cellphone: "",
    idUserParking: "",
    password: "", 
    nameParking: "",
    address: "",
    cellphoneParking: "",
    nit: "",
    hourStart: "",
    hourEnd: "",
    capacity: "",
    priceCar: "",
    priceMotorcycle: "",
    // location: ""
    // stringPhoto: ""
  });

  // const [mensaje, setMensaje] = useState();
  // const [loading, setLoading] = useState(false);

  const { name, email, cellphone, idUserParking, password, nameParking, address, cellphoneParking, nit, hourStart, hourEnd, capacity, priceCar, priceMotorcycle } = inputs;

  const onSaveData = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const sendData = async(e) => {
    e.preventDefault()

    // await handleImageUpload();
    const UsuarioParking = {
      name, email, cellphone, idUserParking, password, nameParking, address, cellphoneParking, nit, hourStart, hourEnd, capacity, priceMotorcycle, priceCar, location: { lat: location.lat, lng: location.lng }};


    // setLoading(true)
    try{
      const response = await axios.post("http://localhost:5000/api/users/registerParking", UsuarioParking)
      // const response = await axios.post("https://backend-space-parking.onrender.com/api/users/registerParking", UsuarioParking)
      console.log(response.data);
      accountCreate()
      // uploadCloud(UsuarioParking.idUserParking)
      onRequestClose("false")
    }catch{
      alert("Error No se creo la cuenta")
    }
  }
  return (

    <Modal  ariaHideApp={false} className="modalParking" onRequestClose={onRequestClose} isOpen={isOpen}>
        <h2 id='titleCreate'>Crear Cuenta Administrador De Parqueadero</h2>
        
            <form onSubmit={(e) => sendData(e)} className='createAccount'>
              <div className="contAll">
              <div className='dataUser'>
                <h3 >Datos Personales</h3>
                <div className='contGroup'>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="name" contLabel="Nombre Completo" place="Nombre" inputType="text"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="email" contLabel="Correo" place="Correo" inputType="email"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="cellphone" contLabel="Telefono" place="Telefono" inputType="number"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="idUserParking" contLabel="No. Identificacion" place="No. Identificacion" inputType="number"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="password" contLabel="Contraseña" place="Contraseña" inputType="password"/>
                <FormGroup contLabel="Confirmar Contraseña" place="Contraseña" inputType="password"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="hourStart" contLabel="Hora Inicio" place="Hora Inicio" inputType="time"/>
                <FormGroup onChange={(e) => onSaveData(e)} nameInput="hourEnd" contLabel="Hora Fin" place="Hora Fin" inputType="time"/>
                </div>
              </div>
              

              <div className='dataParking'>
                <h3>Datos Parqueadero</h3>

                <div className='contGroup'>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="nameParking" contLabel="Nombre Parqueadero" place="Nombre Parqueadero" inputType="text"/>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="address" contLabel="Dirección" place="Dirección" inputType="text"/>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="cellphoneParking" contLabel="Telefono Parqueadero" place="Telefono Parqueadero" inputType="number"/>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="nit" contLabel="NIT." place="NIT." inputType="text"/>
                  <FormGroup onChange={(e) => onSaveData(e)} min="10" nameInput="capacity" contLabel="Capacidad Maxima" place="Capacidad Maxima" inputType="number"/>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="priceCar" contLabel="Hora Carro" place="Hora Carro" inputType="number"/>
                  <FormGroup onChange={(e) => onSaveData(e)} nameInput="priceMotorcycle" contLabel="Hora Moto" place="Hora Moto" inputType="number"/>
                  <FormGroup nameInput="Images" contLabel="Imagenes Parqueadero" place="Imagenes Parqueadero" inputType="file"/>
                  <MapCreate messageMap="Ubica tu parqueadero" onLocationChange={handleLocationChange}/>

                </div>
        </div>

              </div>
              
        <button id="btnCreateUserPark" type="submit">Crear Cuenta</button>
      </form>
      
    </Modal>
  );
};
