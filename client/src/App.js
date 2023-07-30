import './styles/App.scss';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import Sidebar from './components/layout/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PageContext = React.createContext(null);

function App() {

  const [ page , setPage ] = useState(null)

  const notify = (type, string ) => {
    switch (type) {
      case "success":
        toast.success(string, { theme: "dark"})
        break;
      case "info":
        toast.info(string, { theme: "dark" })
        break;
      case "error":
        toast.error(string, { theme: "dark"})
        break;
      default:
        toast(string, {theme: "dark"})
        break;
    }
  }

  return (
    <div className="App">
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
      />
      <PageContext.Provider value={{page, setPage}}>
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route path='/*' element={<Dashboard notify={notify}/>} />
          </Routes>
        </div>
      </PageContext.Provider>
    </div>
  );
}

export default App;
