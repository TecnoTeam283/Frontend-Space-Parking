import React from 'react'
import { Li } from '../../UI/Li/Li.jsx'
import { Card } from '../../Layouts/Card/Card'
import { Img } from '../../UI/Img/Img'
import { MainLogIn } from '../../Layouts/MainLogIn/MainLogIn'
import { Logo } from '../../UI/Logo/Logo'




export const Inicio = () => {
    return (
    <main className='mainInicio'>
        <div className='titleContainer'> 
            <h2 className='titleInit'>Bienvenido a <br /> <span id='spanInit'>Space</span> Parking</h2>
            <div className="contLogo">
                <Logo classLogo="logoInitial"/>
                <h4 id='eslogan'>Encuentra Tu Espacio Ideal</h4>
            </div>
        </div>
        <MainLogIn/>
        <h2 className='service' >Acerca De Nuestros Servicios</h2>
          
        <div className='services1'>
            <div className='card'>
                <Card content={`Usuario De  \n\n  Espacios`} styleImg="service-img" imgUrl="https://res.cloudinary.com/miguelgo205/image/upload/v1678346056/SpaceParking/concepto-de-servicio-uso-compartido-autom%C3%B3viles-hombre-en-l%C3%ADnea-elige-auto-para-compartir-carros-alquiler-carpool-viajes-ciudad-165740150_crpvmw.jpg" />
                <Li content="Busca Parqueaderos"/>
                <Li content="Reserva un Espacio"/>
                <Li content="Ve detalles del parqueadero"/>
            </div>
                
            <div className='card'>
                <Card content="Administrador De Parqueadero" styleImg="service-img" imgUrl="https://res.cloudinary.com/miguelgo205/image/upload/v1678334537/SpaceParking/parking-icon-flat-style-isolated-on-white-background-free-vector_wo8zkr.jpg"/>
                <Li content="Gestiona tu parqueadero"/>
                <Li content="Promociona tu Parqueadero"/>
                <Li content="Recibe resevas en tu Parqueadero"/>
            </div>

        </div>
         

            <div className="contInfo">
                
                <Img styleImg="imgInfo" url="https://res.cloudinary.com/miguelgo205/image/upload/v1679025367/SpaceParking/grid_landscape-removebg-preview_1_z4u7cd.png"/>
                <div className="contText">
                    <h2 className='serviceTitle'>Usuario de espacios</h2>
                    <p className='subtitle'>¿Buscas un parqueadero? <br /> 
                    El rol Usuario De Espacios te brinda la oportunidad de encontrar multiples parqueaderos que esten registrado en el 
                    aplicativo y reservar en el que mas te guste.</p>
                </div>
            </div>

            <hr></hr>

            <div className="contInfo">
                <div className="contText">
                    <h2 className='serviceTitle'>Administrador de parqueadero</h2>
                    <p className='subtitle'> ¿Eres dueño de un parqueadero? <br /> 
                    Ingresa y obtendras beneficios como la promoción de tu parqueadero
                    el manejo de reservas y el manejo de los espacios de tu establecimiento. </p>
                </div>
                <Img styleImg="imgInfoP" url="https://res.cloudinary.com/miguelgo205/image/upload/v1682551525/SpaceParking/ParkingNew.png"/>
            </div> 
    </main>
    )
}