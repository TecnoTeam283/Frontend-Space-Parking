import React, {useState} from 'react'
import Modal from 'react-modal'
import { FormGroup } from '../../UI/FormGroup/FormGroup'
import axios from 'axios'
import Swal from 'sweetalert2'

export const ModalUser = ({isOpen, onRequestClose}) => {

  // Alerta de confirmacion
  const accountCreate = () =>{
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
    })
  }


  // Connect back and front
  const [inputs, setInputs] = useState({
    name: "",
    email: "", 
    cellphone: "",
    idUser: "",
    password: "", 
    placa: "", 
    model: "",
    license: "",
    vehicle: ""
  });

  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { name, email, cellphone, idUser, password, placa, model, license, vehicle} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async(e) => {
    e.preventDefault()
    const Usuario = {
      name, email, cellphone, idUser ,password, placa, model, license, vehicle
    };
    setLoading(true)
    try{
      const response = await axios.post("http://localhost:5000/api/users/registerUser", Usuario)
      console.log(response.data);
      console.log(response.data.name);
      accountCreate()
      onRequestClose("false")

    }catch{
      alert("Error no se creo la cuenta")
    }
  }

  return (
    
    <Modal  ariaHideApp={false} className="modalUser" onRequestClose={onRequestClose} isOpen={isOpen}>
        <h2 id='titleCreate'>Crear Cuenta Usuario De Espacios</h2>
            <form onSubmit={(e) => onSubmit(e)} className='createAccount'>

              <div className='dataUser'>
                <h3 >Datos Personales</h3>

                <div className='contGroup'>
                <FormGroup onChange={(e) => onChange(e)} nameInput="name" contLabel="Nombre Completo" place="Nombre" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="email" contLabel="Correo" place="Correo" inputType="email"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="cellphone" contLabel="Telefono" place="Telefono" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="idUser" contLabel="No. Identificacion" place="No. Identificacion" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="password" contLabel="Contraseña" place="Contraseña" inputType="password"/>
                <FormGroup nameInput="confirmarContraseña" contLabel="Confirmar Contraseña" place="Contraseña" inputType="password"/>
                </div>
 
              </div>
              

              <div className='dataVehicle'>
                <h3>Datos Vehiculo</h3>

                <div className='contGroup'>
                <FormGroup onChange={(e) => onChange(e)} nameInput="placa" contLabel="No. Placa" place="No. Placa" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="model" contLabel="Modelo" place="Modelo" inputType="number"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="license" contLabel="No. Licencia" place="No. Licencia" inputType="text"/>
                <FormGroup onChange={(e) => onChange(e)} nameInput="vehicle" contLabel="Tipo Vehiculo" place="Tipo Vehiculo" inputType="text"/>
                </div>
              </div>
              
              <button id='btnCreateUser' type='submit' >Crear Cuenta</button>
            </form>
    </Modal>
  )
}
