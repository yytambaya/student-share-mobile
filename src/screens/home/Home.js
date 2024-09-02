import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container } from "native-base";
import { AppBar } from "../../components/AppBar";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
    const navigation = useNavigation()


    return(
    <NativeBaseProvider>
        <AppBar/>
        <Container flex={1} px="3" bgColor={'green.500'}>
            <Container w="100%">
                <Button onPress={() => navigation.navigate('login')} variant={'link'} colorScheme="indigo">Reservations</Button>
            </Container>
        </Container>

    </NativeBaseProvider>
)}
    