import * as React from "react";
import { Box, Center, Container, HStack, Icon, IconButton, StatusBar, Text } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native";
export const AppBar = () => {
    const navigation = useNavigation()

    return <Container w='100%'>
        <StatusBar barStyle="light-content" />
        <Box safeAreaTop />
        <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
          <HStack alignItems="center">
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="black" />} />
            <Text color="black" fontSize="20" fontWeight="bold">
              
              AFIT Student Resource
            </Text>
          </HStack>
          <HStack>
            <IconButton pointerEvents="auto" onPress={() => navigation.navigate('profile')} icon={<Icon as={MaterialIcons} name="face" size="sm" color="black" />} />
          </HStack>
        </HStack>
      </Container>;
  }
  