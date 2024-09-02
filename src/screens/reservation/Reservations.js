import * as React from 'react' 
import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../utils/helpers";
import { getData } from "../../utils/request";
import { validateTitle, validateText } from "../../services/validators";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container, useSafeArea, Text, Flex } from "native-base";
import { AppBar } from '../../components/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reservations = ({setPage, setLastPage, setReservation}) => {
    const [lits, setLits] = useState([]);
    const [reservations, setReservations] = useState([])
    const [accessToken, setAccessToken] = useState("")
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [limit, setLimit] = useState("10")
    const [skip, setSkip] = useState("0")
    const [bottomLoading, setBottomLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);
    const [error, setError] = useState([{field: "title", msg:""}, {field: "text", msg:""}]);
    const [genError, setGenError] = useState("")

    useEffect(() => {
      getItems()
    }, [])
    useEffect( () => {
        if(accessToken){
          getReservations()
        }
    }, [accessToken])

    //window.onscroll = (e) => handleScroll(e);

    /*const handleScroll = (e) => {
      
      if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
        //alert("Reached end")
        
        setSkip(lits?.length)
        //console.log("At the bottom")
        //fetchMoreData(); 
        //alert("Fetch next 10")
      }
    }*/

    const getItems = async () => {
      try{
        //const value = await AsyncStorage.getItem(key)
        const tokenVal = await AsyncStorage.getItem('jwt_token')
        const idVal = await AsyncStorage.getItem('_id')
        setAccessToken(tokenVal)
        setId(idVal)
      }catch(error){
        console.log("Get item error: " + error)
      }
     } 
    


    const getReservations = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        if(accessToken == ""){
          setGenError("Unauthorized park. Login again!"); 
          return
        }
        if(accessToken && id){
            //alert('access token' + accessToken)
            //alert(id)
            const url = `${getAPIBaseURL()}/v1/admin/reservation/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const params = {limit:limit , skip:skip};
            //params = {}
            const request = await getData(url, headers, params)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    if(request.result.data.result.length == 0){
                        setPageEnd(true)
                        setBottomLoading(false)
                    }else{
                        setReservations([...reservations, ...request.result.data.result])
                    }
                    //window.location.href = `${getAPIBaseURL()}/app`

                }else{
                    //alert("Eror")
                    setGenError(request.result.data.result)
                }

            }else{
                setGenError("Something went wrong")
            }
            
        }  
    }

    const changePage = (reservation) => {
        setReservation(reservation)
        setPage("Reservation")
        setLastPage("Reservations")
    }


    return(
      <>      
      <AppBar/>
        <Container px="3" >
      <Text color={'blue.500'}>Reservations</Text>
      {/*reservations.map((res, i) => 
        <Box>
          <Text>{res?.parkId}</Text>
          <Text>{res?.slotId}</Text>
        </Box>
      )*/}
      <Flex>
        <Box mb="4" bgColor={'gray.400'} px="8" py="6">
          <Text fontSize={'xl'}>Spot A</Text>
          <Flex direction="column">
            <Text>Garki park</Text>
            <Text>23/08/24</Text>
            <Text>2:30 pm</Text>
          </Flex>
        </Box>

        <Box mb="4" bgColor={'gray.400'} px="8" py="6">
          <Text fontSize={'xl'}>Admin Spot</Text>
          <Flex direction="column">
            <Text>Samru Dan Abba</Text>
            <Text>13/07/24</Text>
            <Text>8:00 am</Text>
          </Flex>
        </Box>

        <Box bgColor={'gray.400'} px="8" py="6">
          <Text fontSize={'xl'}>Spot D</Text>
          <Flex direction="column">
            <Text>Garki park</Text>
            <Text>12/04/24</Text>
            <Text>5:30 pm</Text>
          </Flex>
        </Box>
      </Flex>
      {reservations.length ? <Text>No reservations</Text> : null}
        </Container>

   </>
  
)}

export default Reservations;