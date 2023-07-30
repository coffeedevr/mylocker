import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DataCards from './DataCards';
import AddData from './AddData';
import Button from '../../components/form_controls/Button'
import { PageContext } from '../../App';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import Pagination from '../../components/ui/Pagination';

export default function UserData({notify}) {

  const navigate = useNavigate();
  
  const { setPage } = useContext(PageContext)

  const [ pageDetails, setPageDetails ] = useState(null)

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ search, setSearch ] = useState('')

  const addForm = () => {
    navigate("/dashboard/new")
  }

  useEffect(() => {
    setPage(1)
    fetchData()
  }, [])

  function trashData(id) {
    axios.put('/api/v1/accounts/' + id + '/?status=false', {
      status: false,
      last_modified: new Date()
    })
    .then(function (response) {
      notify("info", "Moved to trash.")
      fetchData()
    })
    .catch(function (error) { 
      notify('error', error.message)
    })
  }

  function fetchData() {
    axios.get('/api/v1/accounts/', {
      params: {
        status: true,
        page: 1,
        q: search
      }
    })
    .then(function (response) {
      const { data, pages }  = response.data
      setData(data)
      setPageDetails(pages)
      setTimeout(()=> {
        setLoading(false)}, 700)
    })
    .catch(function (error) { 
      notify('error', error.message)
    })
  }

  function closeForm() {
    navigate("/dashboard")
  }

  function onChange(e) {
    setSearch(e.target.value)
  }

  function getPage(page) {
    setLoading(true)
    axios.get('/api/v1/accounts/', { 
      params: {
        status: true,
        page: page,
        q: search
      }})
      .then(function (response) {
        const { data, pages }  = response.data
        setData(data)
        setPageDetails(pages)
        setTimeout(()=> {
          setLoading(false)}, 700)
      })
      .catch(function (error) { 
        notify('error', error.message)
      })
    window.scrollTo(0, 0);
  }

  function searchData(e) {
    e.preventDefault()
    setLoading(true)
    axios.get('/api/v1/accounts/', {
      params: {
        status: true,
        page: 1,
        q: search
      }
    })
    .then(function (response) {
      const { data, pages }  = response.data
      setData(data)
      setPageDetails(pages)
      setTimeout(()=> {
        setLoading(false)}, 700)
    })
    .catch(function (error) { 
      notify('error', error.message)
    })
  }


  return (
    <div className='section user-data'>
      <div className='header-controls'>
        <div className='search-wrapper'>
          <form className='search-form' onSubmit={searchData}>
            <button type='submit'>
              <Icon path={mdiMagnify} size={1.5} color={"#4F5D75"} />
              </button>
            <input type="type" id="search-bar" onChange={onChange} placeholder='Search labels'/>
          </form>
        </div>
        <Button id="add-acc" type="button" onClick={addForm}>+ New Account
        </Button>
      </div>
      <p style={{textAlign: "center", color: "gray", fontSize: "14px", marginTop: "0px"}}>Tip: You can click on your password to directly copy it even while its hidden!</p>
      <div className='section-data'>
        {loading ? 
          <div id="loading-wrapper">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div> :
          data.length > 0 ?
            data.map(item => 
              <DataCards item={item} key={item._id} status={true}  notify={notify} trashData={trashData} fetchData={fetchData}/>
            ) : <p>No saved information yet.</p> 
        }
      {/* {cardEdit && <EditData onClick={editForm}/> />} */}
      </div>
      {data.length > 0 &&
      <Pagination data={pageDetails} getPage={getPage}/>
      }
      <Routes>
        <Route exact path={"/new"} element={<AddData onClose={closeForm} fetchData={fetchData} notify={notify}/>} />
      </Routes>
    </div>
  )
}
