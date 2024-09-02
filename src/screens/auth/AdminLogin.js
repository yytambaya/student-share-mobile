import * as React from "react";
import { useState } from "react";
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from "../../utils/validators";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Text } from "native-base";
import { getAPIBaseURL, getSiteBaseURL } from "../../utils/helpers";
import { postData } from "../../utils/request";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btnState, setBtnState] = useState("Login");
    const [error, setError] = useState([{field: "email", msg:""}, {field: "password", msg:""}]);
    const [genError, setGenError] = useState("")
    const navigation = useNavigation()

    const setItem = async (key, value) => {
        try{
            await AsyncStorage.setItem(key, value)
            console.log('set key value')
        }catch(error){
            console.log("Async Error: " + error)
        }
    }
    
    const login = async () => {
        //alert("RegNo: " + regNo + " Password: " + password);
        var e_val = validateEmail(email).error == "" ? true: false;
        var p_val = validatePassword(password).error == "" ? true: false;
        
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        
        if(e_val && p_val){
            console.log("fields are okay")
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/login`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {email: email, password: password};

            const request = await postData(url, headers, data)
            setBtnState('Login')
            console.log(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    console.log("logged in successfully. jwt: " + request.result.data.result.token)
                    console.log(JSON.stringify(request.result.data.result.result))
                    await setItem('_id', request.result.data.result.result._id);
                    await setItem('jwt_token', request.result.data.result.token);
                    await setItem('name', request.result.data.result.result.name);
                    await setItem('email', request.result.data.result.result.email);
                    
                    navigation.navigate('adminnavigation') 
                    //window.location.href = `${getSiteBaseURL()}/login`

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                
                //alert(JSON.stringify(request.result.data))
                if(request.result.data?.status == 409){
                    setGenError(request.result.data?.result)
                
                }else if(request.result.data?.status == 403){
                    setGenError(request.result.data?.result)
                }else if(request.result.data?.status == 404){
                    setGenError(request.result.data?.result)
                }else{
                    setGenError("check your form for errors")
                }
            }

        }else{
          console.log("error in forms")
        }

        //setBtnState('Signup')
        
    }  



  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          AFIT Student Resources
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Admin Login
        </Heading>
        <VStack space={3} mt="5">
          {genError ? <Box>
            <Text color="red.500">{genError}</Text>
          </Box> : null }
          
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input type="text" onChangeText={(text) => setEmail(text)} />
            {error.find(item => item.field == "email").msg ? <Text color='red.500'>{error.find(item => item.field == "email").msg }</Text>: null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(text) => setPassword(text)} />
            {error.find(item => item.field == "password").msg ? <Text color={'red.500'}>{error.find(item => item.field == "password").msg }</Text>: null}
          </FormControl>
          <Button onPress={() => login()} mt="2" colorScheme="indigo">
            {btnState}
          </Button>
        </VStack>
          <Button onPress={() => navigation.navigate('signup')} mt="2" variant={'link'} colorScheme="indigo">
            Student Signup
          </Button>
          <Button onPress={() => navigation.navigate('login')} mt="2" variant={'link'} colorScheme="indigo">
            Student Login
          </Button>
          <Button onPress={() => navigation.navigate('admin-signup')} mt="2" variant={'link'} colorScheme="indigo">
            Admin Signup
          </Button>
          <Button onPress={() => navigation.navigate('admin-login')} mt="2" variant={'link'} colorScheme="indigo">
            Admin Login
          </Button>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <AdminLogin />
            </Center>
          </NativeBaseProvider>
        );
    };
    