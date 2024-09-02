import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {NativeBaseProvider, VStack, Box, Divider, Text, Heading, Center, Circle, HStack, Square, Image} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
//import CustomIcon from '../../../../CustomIcon';
import { constants } from '../../../config/constants';

const Savings = () => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.body}>
        <NativeBaseProvider>
          <Box minH={deviceHeight} border="1" alignSelf={"center"} borderRadius="md" w={"92%"} mt={5}>
            <VStack space="5">
              <Box>
                <HStack space={3} alignItems="center">
                  <Circle size="30px" borderWidth={1} borderColor="#1ED6A0" bgColor="#008060"/>
                  <Text fontWeight={300}>Hi, <Text fontWeight={700}> Mukhtar Badamasi</Text></Text>
                </HStack>
              </Box>  


            <Box borderRadius={5} bgColor={constants.theme.greenBackgroundColor1} px="4">
            <Box display={"flex"} alignItems={"center"} pt={10} pb={8}>
              
              <Text fontSize="sm" pb={2} color={constants.typography.smallTextColor1}>Savings Balance</Text>  
              <Heading size="xl" color={constants.typography.smallTextColor1}>N 2,345,000.4</Heading>
              
              <HStack space={6} pt={4}>
                  <VStack>
                    <Square borderRadius={2} px="1" py="1" bgColor={"#2FCF87"} alignItems={"center"}>
                      {/*<CustomIcon name='tab1' size={19} color={constants.typography.smallTextColor1}/>*/}
                    </Square>  
                    <Text color={constants.typography.smallTextColor1}>Savings</Text>
                  </VStack>
        
                  <VStack>
                    <Square borderRadius={2} px="1" py="1" bgColor={"#2FCF87"} alignItems={"center"}>
                      {/*<CustomIcon name='tab2' size={19} color={constants.typography.smallTextColor1}/>*/}
                    </Square>  
                    <Text color={constants.typography.smallTextColor1}>Loans</Text>
                  </VStack>
              </HStack>

            </Box>
            </Box>

            <Box mt="4">
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"xs"} fontWeight="300" color="#273D4B">Savings Portfolio</Text>
                  <Text fontSize={"sm"} color="#2FCF87">N 2,345,000.4</Text>
                </Box>
                <Box>
                  <HStack>
                    <Text color={"#2FCF87"}>+0.5.00%</Text>
                    <Ionic name="chevron-forward-outline" size={22} color={"#CECECE"}/> 
                  </HStack>
                </Box>
              </HStack>
            </Box>

            <Box mt="5">
              <Box mb={5}>
                <Heading size={"lg"} color="#008060">Apply for a Loan</Heading>
              </Box>
              
              <Box>
               <HStack justifyContent={"space-between"}> 
              <Box>
                <Box borderRadius={6} w="150" pt="5" pb="4" px="15" py="2" bgColor={"#F4FFFC"}>
                  <Circle size="25px" bg={"#C8FFF1"}>
                    <Image size={3} source={require('../../../assets/icons/others/Vector.png')} alt="icon"/>
                  </Circle>
                  <Heading mb="3" mt="5" size="sm" color={"#008060"}>Salary Loan</Heading>
                  <Text fontSize="xs" color={"#273D4B"}>
                      Get a loan with a fast
                      review, with loan limit
                      up to N 500,000
                  </Text>
                  <HStack alignItems={"center"} space={6} mt="7">
                    <Text fontSize={"xs"} color="#008060">Flexible loan term</Text>
                    <Circle size="13px" bg="#C8FFF1">
                      <Foundation name="arrow-right" size={10} color="white"/>
                  </Circle>
                  </HStack>
                </Box>
              </Box>
   
              <Box>
                <Box borderRadius={6} w="150" pt="5" pb="4" px="15" py="2" bgColor={"#F8EDEB"}>
                  <Circle size="25px" bg={"#ECE2D0"}>
                    <Image size={3} source={require('../../../assets/icons/others/Vector.png')} alt="icon"/>
                  </Circle>
                  <Heading mb="3" mt="5" size="sm" color={"#6D2E46"}>Upkeep Loan</Heading>
                  <Text fontSize="xs" color={"#273D4B"}>
                      Get a loan with a fast
                      review, with loan limit
                      up to N 100,000
                  </Text>
                  <HStack alignItems={"center"} space={6} mt="7">
                    <Text fontSize={"xs"} color="#6D2E46">Easily processed</Text>
                    <Circle size="13px" bg="#ECE2D0">
                      <Foundation name="arrow-right" size={10} color="white"/>
                  </Circle>
                  </HStack>
                </Box>
              </Box>
                </HStack>
              </Box>
            </Box>

            </VStack>
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

export default Savings;
