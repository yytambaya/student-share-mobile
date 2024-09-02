import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {NativeBaseProvider, VStack, Box, Divider, Text, Heading, Center, Circle, HStack, Square, Image, Modal, FormControl, Input, Select, Button, IconButton} from 'native-base';
import { WarningOutlineIcon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
//import CustomIcon from '../../../../CustomIcon';
import { constants } from '../../../config/constants';
import { countryCodes } from '../../../utils/countrycodes';

const SignIn = () => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.body}>
        <NativeBaseProvider>
          <Box mx='4' mt='70px' minH={deviceHeight}>
            <VStack space={2}>
                <Text fontSize={'lg'} fontWeight={'bold'}>Enter your mobile number</Text>
                <Text color={''}>You will receive a 4 digit code for</Text> 
                <Text mt='-2' color={''}>phone number verification</Text>
            </VStack>

            <Center mt='7'>
              <FormControl isInvalid >
                <HStack>
                  <Select>
                    {
                      countryCodes.map((country, i)=> 
                        <Select.Item label={country} value={country}/>
                      )  
                    }
                  </Select>
                  <Input  placeholder="Phone Number" w='85%'/>
                </HStack>
                <Text mt='2' color={'lightgrey'}>Hint</Text>

                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Try different from previous passwords.
                </FormControl.ErrorMessage>
                <Button bgColor={'lightgrey'} size='lg'><Text color='black'>Continue</Text></Button>
              </FormControl> 
            </Center>

            <Box>
              <Box>
                Continue with Google  
              </Box>  
            </Box>
            <Box>

            </Box>
          </Box>
          </NativeBaseProvider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  header1:{
    fontFamily: 'Roboto-Light',
    fontSize: 50,
    color:"black"
  },
});

export default SignIn;
