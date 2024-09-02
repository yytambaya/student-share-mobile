import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container } from "native-base";

export const Reservation = ({reservation, page, setPage, setLastPage, lastPage}) => {
    return(

   <Container w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Profile
        </Heading>
        <Heading mt="1" color="coolGray.400" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          user details
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input  value="yytambaya@gmail.com"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input type="password" value="09054762388"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Status</FormControl.Label>
            <Input type="text" value="active" />
          </FormControl>
          {/*<Button mt="2" colorScheme="indigo">
            Sign up 2
          </Button>*/}
        </VStack>
        {/*<Link href="/signup" mt="2" colorScheme="indigo">
            Login
        </Link>*/}
      </Box>
    </Container>
)}
    