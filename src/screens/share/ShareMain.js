import * as React from 'react'
import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import { Container, NativeBaseProvider } from 'native-base'
import Shares from './Shares'
import NewShare from './NewShare'

const ShareMain = () => {
    const [page, setPage] = useState("shares")
    const [lastPage, setLastPage] = useState("shares")
    const [reservation, setReservation] = useState({})
    
    
    /*useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])*/
    
    
    
    return(
        <NativeBaseProvider>
        <Container flex={1} px="3">
          {page == "shares" ? <Shares setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : <NewShare setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> } 
        </Container>
        </NativeBaseProvider>
    )
}

export default ShareMain