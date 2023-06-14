import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserDataProvider';
import { Logo } from '../../../UI/Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import  atob  from 'atob';
import axios from 'axios';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

export const DetailPark = () => {


    // get data parking
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedEmail = searchParams.get('email');
    const decodedEmail = encodedEmail ? atob(encodedEmail) : null;
    const [dataParking, setDataParking] = useState()

    const getUser = async () => {
      try {
        if (decodedEmail) {
          const response = await axios.post('https://backend-space-parking.onrender.com/api/users/meUserParking', { email: decodedEmail });
          // console.log(response.data);
          setDataParking(response.data);
        }
      } catch (error) {
      }
    };

    useEffect(() => {
      getUser();
    });

    const convertTime = (horaMilitar) => {
      if (!horaMilitar) {
        return ''; // Devolver cadena vacía si no se proporciona la hora militar
      }
    
      const horaLocal = moment(horaMilitar, 'HH:mm').format('hh:mm A');
      return horaLocal;
    };


    const { userData} = useContext(UserDataContext);
    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = () => {
      setShowDiv(!showDiv);
      // console.log(dataParking);
    };


    // Realizar Reserva
    const correctBooking = () =>{
      Swal.fire({
          icon: 'success',
          title: '¡Excelente!',
          html: 'Tu reserva se ha realizado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdatePass',
            content: 'textUpdatePass',
            confirmButton: 'btnUpdatePass',
          },
        });
      };
    
    const incorrectBooking = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya tienes una reserva en progreso',
            confirmButtonText: 'OK',
            customClass: {
              title: 'titleUpdateIncorrect',
              content: 'textUpdatePass',
              confirmButton: 'btnIncorrectPass',
            },
          })
    }
    
    const createBooking = async () => {
    
      const currentDate = moment(); // Obtiene la fecha y hora actual
      const formattedDate = currentDate.tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
     
        const bookingData = {
          name: `${userData?.placa}-${userData?.name}`,
          nitParking: dataParking?.nit, 
          idUser: userData?.idUser,
          userName: userData?.name,
          cellphone: userData?.cellphone,
          dateStartBooking: formattedDate,  // Fecha de inicio de la reserva en formato ISO 8601
          duration: 30, // Duración de la reserva en minutos
        };
    
        try {
          await axios.post("https://backend-space-parking.onrender.com/api/users/createBooking", bookingData);
          // await axios.post("http://localhost:5000/api/users/createBooking", bookingData);
          correctBooking()
        
    
        } catch (error) {
          incorrectBooking()
          console.log(bookingData);
          // incorrect()
        }
      }
    
 
  return (
    <div className='detailParkPage'>
      <header className='headerUser'>
        <Logo to="/HomeUser" idLogo="logoHomeUser"/>    
        <h3 id='nameUser'>{userData?.name}</h3>
          {/* <input placeholder='Buscar Parqueadero' type="text" name="" id="inputSearch" /> */}
        <i className='icon-bell'></i>
        <div onClick={toggleDiv}className="contIcon">
        <i  className='icon-user'></i>
        </div>
      </header>

      {showDiv && <div style={{display: 'block'}} className="optionsUser">
          <Link className="linkOptions" to="/profileUser" >Perfil</Link>
          <hr />
          <Link className="linkOptions" to="/HomeUser" >Inicio</Link>
          <hr />
          <Link className="linkOptions" to="/" >Cerrar Sesión</Link>
        </div>}

      <main id='mainDetailPark'>
        <div className="contInformation">
          <i className="icon-map-marker"></i>
          <span id='nameParkingDetail'>{dataParking?.nameParking}</span>
        </div>

        <div className="contImagesParking">
          <img id='imgPrinParking' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815614/SpaceParking/432216777nidoo-parqueaderos-cy_i901xu.jpg" alt="" />
          <div className='contImgPequeñas'>
            <div className="peqImg">
              <img className='imgModalParking' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815602/SpaceParking/parqueadero1_ljazl7.jpg" alt="" />
            </div>
            <div className="peqImg">
              <img className='imgModalParking' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815602/SpaceParking/parqueadero1_ljazl7.jpg" alt="" />
            </div>
            <div className="peqImg down">
              <img className='imgModalParking' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            </div>
            <div className="peqImg down">
              <img className='imgModalParking' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            </div>   
            </div>
          </div>

      
      <div className="contInfoParking">

        <div className="anfitrion">
          <h2>Acerca del anfitrion</h2>

          <p> <span>Nombre: </span> {dataParking?.name}</p>
          <p> <span>Teléfono:</span> {dataParking?.cellphone}</p>
          <p> <span>Correo:</span> {dataParking?.email}</p>

        </div>

        <aside className="cardDataParking">
          <p>${dataParking?.priceCar} COP <span className='priceSpan'> Hora Carro</span></p>
          <p>${dataParking?.priceMotorcycle} COP  <span className='priceSpan'>Hora Moto</span> </p>
          <p className='pTittle'>Dirección: <span className='spanData'>{dataParking?.address}</span></p>
          <p className='pTittle'>Capacidad Maxima: <span className='spanData'>{dataParking?.capacity[0].space} - vehiculos</span></p>
          <p className='pTittle'>Teléfono: <span className='spanData'>{dataParking?.cellphoneParking}</span></p>
          <p id='pHorarios'>Horarios De Servicio:</p>
          <div className="horarios">
            <div className="open">
              <p>Abre desde las: </p>
              <span>{convertTime(dataParking?.hourStart)}</span>
            </div>
            <div className="open">
              <p>Cierra a las: </p>
              <span>{convertTime(dataParking?.hourEnd)}</span>
            </div>
          </div>

          <button onClick={createBooking} className='btnBooking'>Reservar</button>
        </aside>
      </div>
        </main>
    </div>
  )
}
