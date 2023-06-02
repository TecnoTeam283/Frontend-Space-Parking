import React, {useState} from 'react'
import Modal from 'react-modal'
import { FormGroup } from '../../UI/FormGroup/FormGroup'
import axios from 'axios';
import Swal from 'sweetalert2'

export const ModalParking = ({isOpen, onRequestClose}) => {





  // Alerta creacion de cuenta
  const accountCreate = () =>{
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
      // text: 'Datos incorrectos',
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }

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
    priceMotorcycle: ""
  });

  // const [mensaje, setMensaje] = useState();
  // const [loading, setLoading] = useState(false);

  const { name, email, cellphone, idUserParking, password, nameParking, address, cellphoneParking, nit, hourStart, hourEnd, capacity, priceCar, priceMotorcycle } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async(e) => {
    e.preventDefault()
    const UsuarioParking = {
      name, email, cellphone, idUserParking, password, nameParking, address, cellphoneParking, nit, hourStart, hourEnd, capacity, priceMotorcycle, priceCar
    };
    // setLoading(true)
    try{
      const response = await axios.post("http://localhost:5000/api/users/registerParking", UsuarioParking)
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
            <form onSubmit={(e) => onSubmit(e)} className='createAccount'>

              <div className='dataUser'>
                <h3 >Datos Personales</h3>

                <div className='contGroup'>
                <FormGroup onChange={(e) => onChange(e)} nameInput="name" contLabel="Nombre Completo" place="Nombre" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="email" contLabel="Correo" place="Correo" inputType="email"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="cellphone" contLabel="Telefono" place="Telefono" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="idUserParking" contLabel="No. Identificacion" place="No. Identificacion" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="password" contLabel="Contraseña" place="Contraseña" inputType="password"/>
                <FormGroup contLabel="Confirmar Contraseña" place="Contraseña" inputType="password"/>
                </div>
 
              </div>
              {/* <hr id='divHr'/> */}

              <div className='dataParking'>
                <h3>Datos Parqueadero</h3>

                <div className='contGroup'>
                <FormGroup onChange={(e) => onChange(e)} nameInput="nameParking" contLabel="Nombre Parqueadero" place="Nombre Parqueadero" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="address" contLabel="Dirección" place="Dirección" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="cellphoneParking" contLabel="Telefono Parqueadero" place="Telefono Parqueadero" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="nit" contLabel="NIT." place="NIT." inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="hourStart" contLabel="Hora Inicio" place="Hora Inicio" inputType="time"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="hourEnd" contLabel="Hora Fin" place="Hora Fin" inputType="time"/>
                <FormGroup onChange={(e) => onChange(e)} min="10" nameInput="capacity" contLabel="Capacidad Maxima" place="Capacidad Maxima" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="priceCar" contLabel="Hora Carro" place="Hora Carro" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="priceMotorcycle" contLabel="Hora Moto" place="Hora Moto" inputType="number"/>
                <FormGroup  nameInput="Images" contLabel="Imagenes Parqueadero" place="Imagenes Parqueadero" inputType="file"/>
                
                </div>

                
              </div>
              
              <button id='btnCreateUserPark' type='submit' >Crear Cuenta</button>
            </form>
    </Modal>
  )
}
