import React from 'react'
import UpcomingEvent from '../UpcomingEvent';
import { Navigate } from 'react-router-dom';

function AdminUpcomingEvent() {
    const adminLogin = localStorage.getItem('adminLogged')
    // const [isAdminPage, setIsAdminPage] = useStat
    console.log("local-dash", typeof adminLogin);
    return (
      <>
        {
          adminLogin === 'true'
            ?
            <UpcomingEvent/>
            :
            <Navigate to='/' />
        }
  
      </>
    )
}

export default AdminUpcomingEvent
