import { Route, Routes } from 'react-router-dom';
import UserData from './UserData';
import TrashData from '../trash/TrashData';
import PasswordGenerator from '../password-generator/PasswordGenerator';

export default function Dashboard({notify}) {

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Dashboard</h1>
      </div>
      <div className='dashboard-content'>
        <Routes>
            <Route path='/*' element={<UserData notify={notify} />} />
            <Route path='/password-generator' element={<PasswordGenerator />} />
            <Route path='/trash/*' element={<TrashData notify={notify} />} />
        </Routes>
      </div>
    </div>
  )
}
