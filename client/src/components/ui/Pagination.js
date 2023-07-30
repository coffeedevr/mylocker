import React from 'react'
import Button from '../form_controls/Button'
import Icon from '@mdi/react';
import { mdiSkipForward, mdiSkipBackward } from '@mdi/js';

export default function Pagination({data, getPage}) {

  const { hasNextPage, nextPage, hasPrevPage, page, prevPage, totalPages } = data

  return (
    <div className='section pages'> 
      {prevPage != null || page != 1 ?
        <Button type="button" className="main-pg" onClick={() => getPage(1)}>
          <Icon path={mdiSkipBackward} size={1.1} />
        </Button> :
        <button type="button" className="main-pg" disabled>
          <Icon path={mdiSkipBackward} size={1.1} color={"gray"} />
        </button>
      }
      {hasPrevPage ?
      <div style={{width: 30}}>
        <Button type="button" id="prev-pg" onClick={() => getPage(prevPage)}>
          {prevPage}
        </Button>
      </div> :
        <div style={{width: 30}}></div>
      }
      <div id="current-pg" style={{width: 30}}>
       <Button type="button" onClick={() => getPage(page)}>
        {page}
        </Button>
      </div>
      {hasNextPage ?
      <div style={{width: 30}}>
        <Button type="button" id="next-pg" onClick={() => getPage(nextPage)}>
        {nextPage}
      </Button>
      </div> :
        <div style={{width: 30}}></div>
      }
      {nextPage != null || page != totalPages ?
      <Button type="button" className="main-pg" onClick={() => getPage(totalPages)}>
        <Icon path={mdiSkipForward} size={1.1} />
      </Button> :
      <button type="button" className="main-pg" disabled>
        <Icon path={mdiSkipForward} size={1.1} color={"gray"} />
      </button>
      }
    </div>
  )
}
