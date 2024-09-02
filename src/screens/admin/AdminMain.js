import * as React from 'react'
import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import { Container, NativeBaseProvider } from 'native-base'
import Shares from './PendingShares'
import NewShare from './NewShare'
import PendingShares from './PendingShares'
import ApprovedMain from './ApprovedShares'
import ApprovedShares from './ApprovedShares'

const AdminMain = () => {
    const [page, setPage] = useState("adminshares")
    const [lastPage, setLastPage] = useState("adminshares")
    const [reservation, setReservation] = useState({})
    
    
    /*useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])*/
    
    
    
    return(
        <NativeBaseProvider>
        <Container flex={1} px="3">
          {page == "adminshares" ? <PendingShares setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : <ApprovedShares setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> } 
        </Container>
        </NativeBaseProvider>
    )
}

export default AdminMain