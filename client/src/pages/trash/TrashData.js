import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import DataCards from '../dashboard/DataCards';
import { PageContext } from '../../App';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import Pagination from '../../components/ui/Pagination';

export default function TrashData({notify}) {

  
  const { setPage } = useContext(PageContext)

  const [ pageDetails, setPageDetails ] = useState(null)

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    setPage(3)
    fetchData()
  }, [])

  function fetchData() {
    axios.get('/api/v1/accounts/', {
      params: {
        status: false,
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

  function onChange(e) {
    setSearch(e.target.value)
  }

  function getPage(page) {
    setLoading(true)
    axios.get('/api/v1/accounts/', { 
      params: {
        status: false,
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

  function restoreData(id) {
    axios.put('/api/v1/accounts/' + id + '/?status=true', {
      status: true,
      last_modified: new Date()
    })
    .then(function (response) {
      notify("success", "Account restored.")
      fetchData()
    })
    .catch(function (error) { 
      notify('error', error.message)
    })
  }

  function deleteData(id) {
    axios.delete('/api/v1/accounts/' + id, {
     data: {
       id: id }
    })
    .then(function (response) {
      notify("success", "Account deleted.")
      fetchData()
    })
    .catch(function (error) { 
      notify('error', error.message)
    })
   }

  function searchData(e) {
    e.preventDefault()
    setLoading(true)
    axios.get('/api/v1/accounts/', {
      params: {
        status: false,
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
      </div>
      <div className='section-data'>
        {loading ? 
          <div id="loading-wrapper">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div> :
          data.length > 0 ?
            data.map(item => 
              <DataCards item={item} key={item._id} status={false} restoreData={restoreData} deleteData={deleteData}/>
            ) : <p>Trash is empty.</p> 
        }
      {/* {cardEdit && <EditData onClick={editForm}/> />} */}
      </div>
      { pageDetails &&
      <Pagination data={pageDetails} getPage={getPage}/>
      }
    </div>
  )
}
