import React, { useState, useContext } from 'react';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext } from '../../Context/UserDataProvider';
import styles from './HomeParking.css';
import { Circle } from '../../../UI/Circle/Circle';
import { Link } from 'react-router-dom';
import { ModalState } from '../../../Layouts/ModalState/ModalState';

export const HomeParking = () => {
  const { userData } = useContext(UserDataContext);

  // const [number, setNumber] = useState(2);
  const [isOpenStates, setIsOpenStates] = useState(false);
  const [stateSelected, setState] = useState('');

  const openModalState = (stateCircle) => {
    setIsOpenStates(true);
    setState(stateCircle);
  };

  const handleCloseState = () => {
    setIsOpenStates(false);
  };

  const handleStateChange = (newState) => {
    setState(newState);
  };

  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const capacityStr = userData?.capacity;
  const capacity = parseInt(capacityStr);

  return (
    <div id='homeParking'>
      <ModalState onStateChange={handleStateChange}
        actualState={stateSelected}
        numberState={0}
        isOpen={isOpenStates}
        onRequestClose={handleCloseState}
        closeModal={handleCloseState}
      />
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userData?.nameParking}</h3>
        <i className='icon-bell'></i>
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
          {Array.from({ length: capacity }, (_, index) => (
            <Circle
              number={0}
              state={stateSelected}
              // isSelected={stateSelected === 'reserved'}
              onClick={() => openModalState(stateSelected)}
              key={index}
            />
          ))}
        </aside>
      </main>
    </div>
  );
};