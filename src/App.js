
import {Route, Routes} from 'react-router-dom'
// import { Header } from './Components/Layouts/Header/Header';
// import { Header } from "./components/Layouts/Header/Header";

import { Inicio } from './Components/Page/Inicio/Inicio';
// import { CreateAccount } from './Components/Page/CreateAccount/CreateAccount';
import { MainLogIn } from './Components/Layouts/MainLogIn/MainLogIn';
import { RecoverPassword } from './Components/Page/RecoverPassword/RecoverPassword';
import { HomeUser } from './Components/Page/SpaceUser/HomeUser/HomeUser';
import { ProfileUser } from './Components/Page/SpaceUser/ProfileUser/ProfileUser';
import { HomeParking } from './Components/Page/AdminParking/HomeParking/HomeParking';




function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio/>}></Route>

        {/* <Route path="/CreateAccount" element={<CreateAccount/>}></Route> */}
        <Route path="/LogIn" element={<MainLogIn/>}></Route>
        <Route path="/HomeUser" element={<HomeUser/>}></Route>
        <Route path="/HomeParking" element={<HomeParking/>}></Route>
        <Route path="/RecoverPassword" element={<RecoverPassword/>}></Route>
        <Route path="/ProfileUser" element={<ProfileUser/>}></Route>

        <Route path="*" element="Not Found"></Route>
      </Routes>
    </div>
  )
}

export default App;
