import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserDataProvider';
import { Logo } from '../../../UI/Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { MapParking } from '../../../UI/MapParking/MapParking.jsx';
import  atob  from 'atob';
import axios from 'axios';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

export const DetailPark = () => {
  const { userData} = useContext(UserDataContext);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(userData);
  };

  const getImageSource = (vehicle) => {
    if (vehicle.typeVehicle.toUpperCase() === 'MOTO') {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814136/SpaceParking/Moto.webp';
    } else {
      return 'https://res.cloudinary.com/miguelgo205/image/upload/v1684814081/SpaceParking/Carro.jpg';
    }
  };

    // get data parking
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedEmail = searchParams.get('email');
    const decodedEmail = encodedEmail ? atob(encodedEmail) : null;
    const [dataParking, setDataParking] = useState()
    // const [cellphone, setCellphone] = useState(userData?.cellphone)
    const getUser = async () => {
      try {
        if (decodedEmail) {
          const response = await axios.post('https://backend-space-parking.onrender.com/api/users/meUserParking', { email: decodedEmail });
          // const response = await axios.post('http://localhost:5000/api/users/meUserParking', { email: decodedEmail });
          setDataParking(response.data);
          const imageUrlString = response.data.allUrls; // Cadena de URLs separadas por comas
          const urlsArray = imageUrlString.split(','); // Divide la cadena en un array de URLs
          setImageUrls(urlsArray); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUser();
    });

    // useEffect(() => {
    //   console.log(dataParking);
    // }, [dataParking]);

    const convertTime = (horaMilitar) => {
      if (!horaMilitar) {
        return ''; // Devolver cadena vacía si no se proporciona la hora militar
      }
    
      const horaLocal = moment(horaMilitar, 'HH:mm').format('hh:mm A');
      return horaLocal;
    };


    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = () => {
      setShowDiv(!showDiv);
      console.log(userData);
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
          name: `${selectedVehicle}-${userData?.name}`,
          nitParking: dataParking?.nit, 
          idUser: userData?.idUser,
          userName: userData?.name,
          placa: selectedVehicle,
          cellphone: userData.phone,
          dateStartBooking: formattedDate,  // Fecha de inicio de la reserva en formato ISO 8601
          duration: 30, // Duración de la reserva en minutos
        };
    
        try {
          await axios.post("https://backend-space-parking.onrender.com/api/users/createBooking", bookingData);
          // await axios.post("http://localhost:5000/api/users/createBooking", bookingData);
          correctBooking()
          toggleModal()

        } catch (error) {
          incorrectBooking()
          toggleModal()

          console.log(bookingData);
        }
      }
    
 
  return (
    <div className='detailParkPage'>
      <header className='headerUser'>
        <Logo to="/HomeUser" idLogo="logoHomeUser"/>    
        <h3 id='nameUser'>{userData?.name}</h3>
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
          <img id='imgPrinParking' src={imageUrls[0]} alt="" />
          <div className='contImgPequeñas'>
            <div className="peqImg">
              <img className='imgModalParking' src={imageUrls[1]}  alt="" />
            </div>
            <div className="peqImg">
              <img className='imgModalParking' src={imageUrls[2]}  alt="" />
            </div>
            <div className="peqImg down">
              <img className='imgModalParking' src={imageUrls[3]}  alt="" />
            </div>
            <div className="peqImg down">
              <img className='imgModalParking' src={imageUrls[4]}  alt="" />
            </div>   
            </div>
          </div>

      
      <div className="contInfoParking">

        <div className="anfitrion">
          <h2>Acerca del anfitrion</h2>

          <p> <span>Nombre: </span> {dataParking?.name}</p>
          <p> <span>Teléfono:</span> {dataParking?.cellphone}</p>
          <p> <span>Correo:</span> {dataParking?.email}</p>
          {dataParking && dataParking.location && (
          <MapParking nameParking={dataParking.nameParking} latitud={dataParking.location[0]} longitud={dataParking.location[1]} />)}
          </div>

        <aside className="cardDataParking">
        <h2>Información General</h2>
          <p>${dataParking?.priceCar} COP <span className='priceSpan'> Hora Carro</span></p>
          <p>${dataParking?.priceMotorcycle} COP  <span className='priceSpan'>Hora Moto</span> </p>
          <p className='pTittle'>Dirección: <span className='spanData'>{dataParking?.address}</span></p>
          <p className='pTittle'>Capacidad Maxima: <span className='spanData'>{dataParking?.capacity.length} vehiculos</span></p>
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
          <button onClick={toggleModal} className='btnBooking'>Reservar</button>
          {/* <button onClick={createBooking} className='btnBooking'>Reservar</button> */}
        </aside>
      </div>
      <Modal ariaHideApp={false} isOpen={showModal} onRequestClose={toggleModal} className='modalBooking'>
          <h2>Selecciona tu vehículo</h2>
          <div className="allVehiclesBooking">
            {userData?.vehicle?.map((vehicle) => (
              <div key={vehicle._id} className={`vehicleSelected ${selectedVehicle === vehicle ? 'selected' : ''}`} tabIndex="0"  onClick={() => {
                if (vehicle.placa) {
                  setSelectedVehicle(vehicle.placa);
                }
              }}>
                  <img src={getImageSource(vehicle)} alt="" />
                <p> <span>Placa:</span> {vehicle.placa}<span>  Modelo:</span> {vehicle.model}</p>
              </div>
            ))}
          </div>
          <button onClick={createBooking} className='btnConfirmBooking'>Confirmar Reserva</button>
        </Modal>
        </main>
    </div>
  )
}
