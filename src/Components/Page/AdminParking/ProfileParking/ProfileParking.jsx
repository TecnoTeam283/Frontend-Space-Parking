import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../../UI/Logo/Logo'
import { UserDataContext } from '../../Context/UserDataProvider'
export const ProfileParking = () => {

  const {userDataParking} = useContext(UserDataContext);
  return (
    <div>
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userDataParking?.nameParking}</h3>
        <i className='icon-bell'></i>
        <div className='contIcon'>
          <i className='icon-user'></i>
        </div>
        {/* {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/profileParking'>Perfil</Link>
            <hr />
            <Link className='linkOptions' to='/'>Cerrar Sesión</Link>
          </div>
        )
        } */}
      </header>


    </div>
  )
}
