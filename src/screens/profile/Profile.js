import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container, useSafeArea, IconButton, Icon, Flex, CheckIcon } from "native-base";
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from "react-native";

export const Profile = () => {
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

   <Box safeArea p="2" w="90%" py="8">
        <Flex alignItems={'center'} direction='row'>
        <Pressable onPress={() => navigation.goBack()}>
            <Icon as={MaterialCommunityIcons} name="arrow-left" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} />
        </Pressable>
        <Heading ml="2" size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Profile
        </Heading>
        </Flex>
        <Heading mt="1" color="coolGray.400" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          {regNo ? 'user details' : 'admin details'}
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input value={name} _disabled={true} aria-disabled={true}/>
          </FormControl>
          {regNo && <FormControl>
            <FormControl.Label>Registration Number</FormControl.Label>
            <Input  value={regNo} _disabled={true} aria-disabled={true}/>
          </FormControl>}
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input type="text" value={email} _disabled={true} aria-disabled={true}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Status</FormControl.Label>
            <Input type="text" value="active" _disabled={true}  aria-disabled={true}/>
          </FormControl>
          <Button mt="2" colorScheme="red" width={100} onPress={async() => {await AsyncStorage.clear(); navigation.navigate('login')}}>
            Logout
          </Button>
        </VStack>
        {/*<Link href="/signup" mt="2" colorScheme="indigo">
            Login
        </Link>*/}
      </Box>
    
    </NativeBaseProvider>
)}
    