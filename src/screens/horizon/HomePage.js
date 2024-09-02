import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container, useSafeArea, IconButton, Icon, Flex, CheckIcon, Image } from "native-base";
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from "react-native";
import { Text } from "react-native-svg";

export const HomePage = () => {
  const [name, setName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const navigation = useNavigation()
  
  useEffect(() => {
    //console.log('Email:' + getItem('email'))
    //setName(getItem('name'))
    //setEmail(getItem('email'))
    //setPhoneNumber(getItem('phoneNumber'))
    getItems()
  }, [])

   const getItems = async () => {
    try{
      //const value = await AsyncStorage.getItem(key)
      const nameVal = await AsyncStorage.getItem('name')
      const emailVal = await AsyncStorage.getItem('email')
      const regNoVal = await AsyncStorage.getItem('regNo')
      setName(nameVal)
      setEmail(emailVal)
      setRegNo(regNoVal)
      //console.log(temVal)
      
    }catch(error){
      console.log("Get item error: " + error)
    }
   } 

    return(
    <NativeBaseProvider>

   <Box background={'#EEEEEE'} safeArea p="2" w="100%" h='100%' alignContent={'center'}>
        <Image source={require('../../assets/images/homebackground.jpg')} width={'100%'} h={'100%'}/>
        <Heading position={'absolute'} fontSize={36} top={'35%'} left={'20%'} alignSelf={'center'} color={'#373A40'} >Horizontal Apex</Heading>
        {/*<Image position={'absolute'} left={'35%'} top={'30%'} source={require('../../assets/images/logo.jpg')} width={32} height={32}/>*/}
        <Button zIndex={50} size={'lg'} width={'70%'} position={'absolute'} top={'45%'} left={'20%'} px={2} py={4} rounded={'md'} background={'#DC5F00'} color={'white'} fontSize={36}>Tenant Login</Button>
        <Button zIndex={50} size={'lg'} width={'70%'} position={'absolute'} top={'55%'} left={'20%'} px={2} py={4} rounded={'md'} background={'#373A40'} color={'white'} fontSize={36}>Landlord Login</Button>
    </Box>
    
    </NativeBaseProvider>
)}
    