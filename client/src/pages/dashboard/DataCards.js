import Icon from '@mdi/react';
import { Tooltip } from 'react-tooltip'
import React, { useRef, useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import EditData from './EditData';
import { mdiEyeOutline, mdiEyeOffOutline, mdiTrashCan, mdiFileRestoreOutline, mdiFileEditOutline, mdiFileDocumentRemoveOutline } from '@mdi/js';

export default function DataCards({ item, status, fetchData, trashData, deleteData, restoreData, notify }) {

  const navigate = useNavigate();
  const { _id, label, username, password, last_duration } = item

  const [ img, setImg ] = useState(true);
  const [ dur, setDur ] = useState('');

  const un_input = useRef(null);
  const pw_input = useRef(null);
  const wb_input = useRef(null);

  function showPw() {
    if (pw_input.current.type === "password") {
      setImg(false);
      pw_input.current.value = password;
      pw_input.current.type = "text" 
    } else {
      setImg(true);
      pw_input.current.value = "***************"
      pw_input.current.type = "password"
    }
  }

  function editForm() {
    navigate("/dashboard/" + item._id + "/edit")
  }

  function closeForm() {
    navigate("/dashboard")
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password)
    notify('info', 'Copied to clipboard')
  }

  useEffect(() => {
    getDuration(last_duration)
  }, [])

  function getDuration(last_duration) {
    if (last_duration.years >= 1 ) {
      setDur(last_duration.years + ' yrs ago')
    } else if (last_duration.months >= 1) {
      setDur(last_duration.months + ' mos ago')
    } else if (last_duration.days >= 1) {
      setDur(last_duration.days + ' days ago')
    } else if (last_duration.hours >= 1) {
      setDur(last_duration.hours + ' hrs ago')
    } else if (last_duration.minutes >= 1) {
      setDur(last_duration.minutes + ' mins ago')
    } else {
      setDur(last_duration.seconds + ' secs ago')
    }
  }

  return (
    <>
    <div className='data-card' id={_id}>
      <div className='user-inputs column'>
        <p ref={wb_input} style={{fontSize: "18px", marginTop: "5px", marginBottom: "0px", fontWeight: "700", width: "100%", paddingTop: "5px"}}>{label}</p>
      </div>
      <div className='user-inputs column password'>
        <Tooltip id="pw-tooltip" />
        <input type="password" defaultValue={"***************"} id={_id + "_data"} readOnly ref={pw_input} onClick={() => copyToClipboard(pw_input)} data-tooltip-id="pw-tooltip" data-tooltip-content="Click to copy password"/>
      </div>
      <div className='data-cards controls'>
          <Tooltip id="pw-tooltip" />
          <button type="button" className='btn data-cards show-hide' onClick={showPw} data-tooltip-id='pw-tooltip' data-tooltip-content='Show password'>
            {img ? <Icon path={mdiEyeOutline} size={1.2}/> : <Icon path={mdiEyeOffOutline} size={1.2}/>}
          </button>
          { status ?
            <div className='card controls'>
              <Tooltip id="edit-tooltip" />
              <button onClick={editForm} data-tooltip-id="edit-tooltip" data-tooltip-content="Edit Account">
                <Icon path={mdiFileEditOutline} size={1.2}/>
              </button>
              <Tooltip id="trash-tooltip" />
              <button onClick={()=>trashData(_id)} data-tooltip-id="trash-tooltip" data-tooltip-content="Move to Trash">
                <Icon path={mdiTrashCan} size={1.2}/>
              </button>
            </div> :
            <div className='card controls'>
              <Tooltip id="restore-tooltip" />
              <button onClick={()=>restoreData(_id)} data-tooltip-id="restore-tooltip" data-tooltip-content="Restore Account">
                <Icon path={mdiFileRestoreOutline} size={1.2}/>
              </button>
              <Tooltip id="delete-tooltip" />
              <button onClick={()=>deleteData(_id)} data-tooltip-id='delete-tooltip' data-tooltip-content="Delete Account">
               <Icon path={mdiFileDocumentRemoveOutline} size={1.2} />
             </button>
           </div>
          }
      </div>    
    </div>
    <div className='bottom-text'>
      <p ref={un_input} style={{fontSize: "14px"}}>{username}</p>
      <p style={{fontSize:'12px', color: 'gray', marginTop: 0, textAlign: "right"}} className='last-modified'>last modified {dur}</p>
    </div>
    <Routes>
      <Route exact path={"/" + _id + "/edit"} element={<EditData data={item} onClose={closeForm} fetchData={fetchData}  notify={notify}/>} ></Route>
    </Routes>
    </>
  )
}
