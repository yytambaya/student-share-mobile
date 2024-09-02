import * as React from "react";
import { useState } from "react";
import { validateName, validateEmail, validatePassword } from "../../utils/validators";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Text, useToast } from "native-base";
import { getAPIBaseURL, getSiteBaseURL } from "../../utils/helpers";
import { postData } from "../../utils/request";
import { useNavigation } from "@react-navigation/native";

const AdminSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [regNo, setRegNo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [btnState, setBtnState] = useState("Sign up");
    const [error, setError] = useState([{field: "name", msg:""}, {field: "email", msg:""}, {field: "password1", msg:""}, {field: "password2", msg:""}]);
    const [genError, setGenError] = useState("")
    const navigation = useNavigation()
    const toast = useToast()
    
    const signup = async () => {
        //alert("Email: " + email + " Password: " + password1);
        var n_val = validateName(name).error == "" ? true : false;
        var e_val = validateEmail(email).error == "" ? true: false;
        var p1_val = validatePassword(password1).error == "" ? true: false;
        var p2_val = validatePassword(password2).error == "" ? true: false;
        
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "password1").msg = validatePassword(password1).result])
        setError([...error, error.find(item => item.field == "password2").msg = validatePassword(password2).result])
        
        if(n_val && e_val && p1_val && p2_val){
            console.log("fields are okay")
            if(password1 == password2){
              console.log("passwords are equal")
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/signup`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {name: name, email: email, password: password1, status: 1};

            const request = await postData(url, headers, data)
            setBtnState('Signup')
            console.log(JSON.stringify(request))
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    console.log("registered successfully")
                    toast.show({description:'signed up successfully', placement: 'top', color:'green.500'})
                    navigation.navigate('login') 
                    //window.location.href = `${getSiteBaseURL()}/login`

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                
                //alert(JSON.stringify(request.result.data))
                if(request.result.data?.status == 409){
                    setGenError(request.result.data?.result)
                }else{
                    setGenError("check your form for errors")
                }
            }
          }else{
            console.log("passwords are not equal")
            setGenError("passwords not matched")
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
          Sign up as Admin!
        </Heading>
        <VStack space={3} mt="5">
          {genError ? <Box>
            <Text color="red.500">{genError}</Text>
          </Box> : null }
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input type="text" onChangeText={(text) => setName(text)} />
            {error.find(item => item.field == "name").msg ? <Text color='red.500'>{error.find(item => item.field == "name").msg }</Text>: null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" onChangeText={(text) => setEmail(text)} />
            {error.find(item => item.field == "email").msg ? <Text color='red.500'>{error.find(item => item.field == "email").msg }</Text>: null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(text) => setPassword1(text)} />
            {error.find(item => item.field == "password1").msg ? <Text color='red.500'>{error.find(item => item.field == "password1").msg }</Text>: null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" onChangeText={(text) => setPassword2(text)} />
            {error.find(item => item.field == "password2").msg ? <Text color={'red.500'}>{error.find(item => item.field == "password2").msg }</Text>: null}
          </FormControl>
          <Button onPress={() => signup()} mt="2" colorScheme="indigo">
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
                <AdminSignup />
            </Center>
          </NativeBaseProvider>
        );
    };
    