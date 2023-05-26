import React, { useState, useRef, useEffect } from 'react'
import styles from "./HomeUser.css"
import { CardParking } from '../../../Layouts/CardParking/CardParking'
import { Logo } from '../../../UI/Logo/Logo'
import { ModalDetails } from '../../../Layouts/MoldalDetails/ModalDetails'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const HomeUser = () => {

  // RENDERIZADO DE PARQUEADEROS 
  const [collection, setCollection] = useState([]);

  const apiGetParkigns = "http://localhost:5000/api/users/getParking"


  useEffect(() =>{
    const getCollection = async () =>{
        try{
          const answer = await axios.get(apiGetParkigns);
          setCollection(answer.data);
          // console.log(answer.data);
        }catch (error) {
          console.log(error);
        }
    };
        getCollection()
  }, []);




  // Modal detalles parqueadero
  const [isOpenDetail, setIsOpenDetail] = useState(false);



    const isOpen = () => {
        setIsOpenDetail(true);
      };
    
      const handleCloseDetail = () => {
        setIsOpenDetail(false);
      };

  // Visualizacion opciones perfil cerrar cuenta

  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };


  // console.log(styles);
  return (
    <div id='HomeUser'>
      <ModalDetails isOpen={isOpenDetail}  onRequestClose={handleCloseDetail} closeModal={handleCloseDetail}/>
        <header className='headerUser'>
          <Logo to="/HomeUser" idLogo="logoHomeUser"/>
            
          <h3 id='nameUser'>Nombre Usuario</h3>
          <input placeholder='Buscar Parqueadero' type="text" name="" id="inputSearch" />

          <i className='icon-bell'></i>
          <div onClick={toggleDiv}className="contIcon">
              <i  className='icon-user'></i>
          </div>
        </header>

        {/* {showDiv && <div style={{ display: 'block' }}>Contenido del div</div>} */}

        {showDiv && <div style={{display: 'block'}} className="optionsUser">
          <Link className="linkOptions" to="/profileUser" >Perfil</Link>
          <hr />
          <Link className="linkOptions" to="/" >Cerrar Sesión</Link>
        </div>}

        <main id='mainHomeUser'>
          <div className="containerParkings">
            {collection.map((item) => (
              <CardParking
              key={item.idUserParking}
              showModal={isOpen}
              priceParking="800-1200"
              adressParking={item.address}
              nameParking={item.nameParking}
              urlImage="https://res.cloudinary.com/miguelgo205/image/upload/v1684815614/SpaceParking/432216777nidoo-parqueaderos-cy_i901xu.jpg"
              />
            ))}
          </div>     
        </main>
    </div>
  )
}
