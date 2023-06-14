import React, { useState, useContext, useEffect } from 'react';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext } from '../../Context/UserDataProvider';
import styles from './HomeParking.css';
import { Circle } from '../../../UI/Circle/Circle';
import { Link } from 'react-router-dom';
import { ModalState } from '../../../Layouts/ModalState/ModalState';
import axios from 'axios';
export const HomeParking = () => {
  const { userData } = useContext(UserDataContext);


  const [isOpenStates, setIsOpenStates] = useState(false);
  const [stateSelected, setState] = useState('');
  const [spaces, setSpaces] = useState([]);
  

  // Obtener espacios
  const getSpaces = async () => {
    try {
      if (userData?.idUserParking) {
        const response = await axios.get(`https://backend-space-parking.onrender.com/api/users/getSpacesById/${userData.idUserParking}`);
        setSpaces(response.data)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getSpaces();
  });

  const openModalState = (spaceSelected) => {
    setIsOpenStates(true);
    setState(spaceSelected);
  };

  const handleCloseState = () => {
    setIsOpenStates(false);
  };

  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  // console.log(spaces.length);

  return (
    <div id='homeParking'>
      <ModalState actualState={stateSelected} numberState={0} isOpen={isOpenStates} onRequestClose={handleCloseState}closeModal={handleCloseState}/>
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userData?.nameParking}</h3>
        {/* <i className='icon-bell'></i> */}
        <div onClick={toggleDiv} className='contIcon'>
          <i className='icon-user'></i>
        </div>
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/profileParking'>
              Perfil
            </Link>
            <hr />
            <Link className='linkOptions' to='/'>
              Cerrar Sesión
            </Link>
          </div>
        )}
      </header>
      <main className='mainParking'>
        <section className='infoStates'>
          <p>Estados</p>
          <div className='info'>
            <Circle state='reserved' />
            <span>Reservado</span>
          </div>
          <div className='info'>
            <Circle state='busy' />
            <span>Ocupado</span>
          </div>
          <div className='info'>
            <Circle state='notAvailable' />
            <span>No Disponible</span>
          </div>
          <div className='info'>
            <Circle state='available' />
            <span>Disponible</span>
          </div>
        </section>
        <aside className='availabilityMap'>
        {spaces.map((space) => (
          <Circle
            state={space.state}
            onClick={() => openModalState(space)}
            key={space._id} // Utiliza un identificador único para la clave de cada componente
            id={space._id} // Pasa el ID del espacio como una prop
          />
        ))}
        </aside>
      </main>
    </div>
  );
};