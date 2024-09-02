import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {NativeBaseProvider, VStack, Box, Divider, Text, Heading, Center, Circle, HStack, Square, Image, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import CustomIcon from '../../../../CustomIcon';
import { constants } from '../../../config/constants';

const SavingsScreen = () => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const transactions = [
    {
     type: "Payment on Savings",
     price:  "N 35, 000.00",
     date: "26 FEB 2022", 
    },
    {
      type: "Payment on Savings",
      price:  "N 35, 000.00",
      date: "26 FEB 2022", 
     },
     {
      type: "Payment on Savings",
      price:  "N 35, 000.00",
      date: "26 FEB 2022", 
     },
     {
      type: "Payment on Savings",
      price:  "N 35, 000.00",
      date: "26 FEB 2022", 
     },
     {
      type: "Payment on Savings",
      price:  "N 35, 000.00",
      date: "26 FEB 2022", 
     }

  ]
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.body}>
        <NativeBaseProvider>
          <Box minH={deviceHeight} border="1" alignSelf={"center"} borderRadius="md" w={"92%"} mt={5}>
            <VStack space="5">
              {/*<Box>
                <HStack space={3} alignItems="center">
                  <Circle size="30px" borderWidth={1} borderColor="#1ED6A0" bgColor="#008060"/>
                  <Text fontWeight={300}>Hi, <Text fontWeight={700}> Mukhtar Badamasi</Text></Text>
                </HStack>
              </Box>*/}  


            <Box borderRadius={5} bgColor={constants.theme.greenBackgroundColor1} px="4" pb="6">
            <Box display={"flex"} alignItems={"center"} pt={10} pb={8}>
              
              <Text fontSize="sm" pb={2} color={constants.typography.smallTextColor1}>Savings Balance</Text>  
              <Heading size="xl" color={constants.typography.smallTextColor1}>N 2,345,000.4</Heading>
              
              {/*<HStack space={6} pt={4}>
                  <VStack>
                    <Square borderRadius={2} px="1" py="1" bgColor={"#2FCF87"} alignItems={"center"}>
                      <CustomIcon name='tab1' size={19} color={constants.typography.smallTextColor1}/>
                    </Square>  
                    <Text color={constants.typography.smallTextColor1}>Savings</Text>
                  </VStack>
        
                  <VStack>
                    <Square borderRadius={2} px="1" py="1" bgColor={"#2FCF87"} alignItems={"center"}>
                      <CustomIcon name='tab2' size={19} color={constants.typography.smallTextColor1}/>
                    </Square>  
                    <Text color={constants.typography.smallTextColor1}>Loans</Text>
                  </VStack>
            </HStack>*/}

            </Box>
            </Box>

            <Box mt="2">
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"sm"} fontWeight="300" color="#008060">SAVINGS PREFERENCE</Text>
                  <Text fontSize={"lg"} fontWeight="bold" color="#273D4B">N 25,000/month</Text>
                </Box>

                <Box>
                  <HStack>
                    <Button variant={"outline"} size={"lg"} px="7" borderColor="#008060"><Text color={"#008060"}>Edit</Text></Button>
                  </HStack>
                </Box>
              </HStack>
              
            </Box>

            <Divider />
                
            <Box>
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"sm"} fontWeight="300" color="#008060">NEXT SAVINGS DATE</Text>
                  <Text fontSize={"sm"} fontWeight="bold" color="#273D4B">MAR 03, 2022</Text>
                </Box>
              </HStack>
            </Box>

            <Box mt="1">
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontSize={"sm"} fontWeight="300" color="#273D4B">STATUS</Text>
                  <Text fontSize={"sm"} fontWeight="bold" color="#008060">Active</Text>
                </Box>
              </HStack>
              
            </Box>

            <Divider />

            <Box mt="3">
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight="300" color="#008060">TRANSACTIONS</Text>
                </Box>
                <Box>
                  <HStack>
                    <Button size={"sm"} bgColor="#E4FFF8"><Text color={"#008060"}>See All</Text></Button>
                  </HStack>
                </Box>
              </HStack>
            {transactions.map((tran, i) => 
              <Box key={i} mt="4">
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <HStack space={3} alignItems={"center"}>
                      <Circle size="30px" bgColor="#F0F0F0"/>
                      <Text fontSize={"sm"} fontWeight="bold" color="black">{tran.type}</Text>
                    </HStack>
                    <VStack alignItems={"center"}>
                      <Text fontSize={"sm"} fontWeight="bold" color="black">{tran.price}</Text>
                      <Text fontSize={"xs"} color="grey">{tran.date}</Text>
                    </VStack>
                </HStack>
              </Box>
            )}
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

export default SavingsScreen;
