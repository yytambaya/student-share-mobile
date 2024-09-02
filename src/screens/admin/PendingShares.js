// screens/Feed.js
import React, { useContext, useEffect, useState } from 'react';
import { Box, FlatList, Text, Button, Icon, NativeBaseProvider, Image, Flex, IconButton, Heading } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAPIBaseURL } from '../../utils/helpers';
import { getData } from '../../utils/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import { Pressable, StyleSheet } from 'react-native';
import { getPermissionAndDownload, requestStoragePermission } from '../../services/storagePermission';
//import FileDownloadButton from '../../components/ResourcesDownload';
import { useNavigation } from '@react-navigation/native';
import { SharesContext } from '../../context/sharesContext';
import { FileDownloadScreen } from '../../components/ResourcesDownload';

const PendingShares = ({}) => {
  const [shares, setShares] = useState([])
  const [genError, setGenError] = useState("")
  const [limit, setLimit] = useState("10")
  const [skip, setSkip] = useState("0")
  const [refresh, setRefresh] = useState(0)
  const [backgroundLoading, setBackgroundLoading] = useState('Loading...')
  const {isUpdated} = useContext(SharesContext)
  const navigation = useNavigation()    
  

  useEffect(() => {
    getPermissionAndDownload()
  }, [])

  useEffect(() => {
    getShares()
  }, [isUpdated])

  
  const renderItem = ({ item }) => (
    <Box key={item._id} borderBottomWidth={1} borderColor="coolGray.200" p={4} mb={2} bg="coolGray.50" borderRadius="md">
    
      <Text fontWeight="bold" fontSize="lg">{item.title.toUpperCase()}</Text>
      <Text>{item.note}</Text>
      { item?.type == 'image' ? 
        <Box backgroundColor={'gray.100'} rounded={'md'}>
          <Flex flexDir={'column'}>
          <Image width={'100%'} height={200} source={{ uri: `https://res.cloudinary.com/dofqmpzy8/image/upload/v1722596440/IJMB/students/share/${item?.fileLink}.png`}} alt="image"/>
          <FileDownloadScreen 
          url={`https://res.cloudinary.com/dofqmpzy8/image/upload/v1724852724/IJMB/students/share/${item?.fileLink}.png`}
                fileName={`${item?.fileLink}.png`} />
          </Flex>      
        </Box>        
        :
      item?.type == 'video' ?
        <Box>
        <Flex flexDirection={'column'}>
          <Box flex='1' bg="black" alignItems='center' alignContent='center' justifyContent='center' style={ styles.containerStyle }>
              <Video source={{ uri: `https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.mp4`}} poster={`https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.png`} paused={true} repeat={ true } style={styles.videoStyle} controls={ true } />
          </Box>
          <FileDownloadScreen url={`https://res.cloudinary.com/dofqmpzy8/video/upload/v1723906465/IJMB/students/share/${item?.fileLink}.mp4`} 
                fileName={`${item?.fileLink}.mp4`} />
        </Flex>
        </Box>        
        : 
        <Box backgroundColor={'gray.100'} rounded={'md'}>
        <Flex flexDirection={'column'}>
            <Text fontWeight={'medium'} mr={2}>{`pdf - ${item?.fileLink}.pdf`}</Text>
            {/*<Pressable onPress={()=> getPermissionAndDownload(`https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.mp4.mp4`, `${item?.fileLink}.mp4.mp4`)}>
              <Box background={'gray.300'} rounded={'full'} p={4} shadow={4}>
                <AntDesign name='download' size={12} color={'blue'}/>
              </Box>
            </Pressable>*/}
            <FileDownloadScreen url={`https://res.cloudinary.com/dofqmpzy8/image/upload/v1722608953/IJMB/students/share/${item?.fileLink}.pdf`} 
                fileName={`${item?.fileLink}.pdf`} />
            {/*<FileDownloadButton 
                url={`https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.mp4.mp4`} 
                fileName={`${item?.fileLink}.mp4.mp4`} 
            />*/}

        </Flex>
        </Box>
      }
      <Text color="coolGray.600" fontSize="xs">posted on {item?.createdAt?.substring(0, 10)}</Text>
    </Box>
  );

  const getShares = async () => {
    //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
    //var accessToken = localStorage.getItem('jwt_token');
    const accessToken = await AsyncStorage.getItem('jwt_token')
    var at_val = accessToken == "" || accessToken == undefined? false : true; 
    //const idVal = await AsyncStorage.getItem('_id')
    //setAccessToken(tokenVal)
    //setId(idVal)
    if(accessToken == "") setGenError("Unauthorized park. Login again!"); 
    
    if(at_val){
        //alert("going")
        const url = `${getAPIBaseURL()}/v1/admin/share/rejected`;
        const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
        const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
        const params = {limit:limit , skip:skip};

        const request = await getData(url, headers, params)
        setBackgroundLoading('')
        //alert(JSON.stringify(request))
        if(request.error == ""){
            if(request.result.data.error == ""){
                //alert(JSON.stringify(request.result.data.result))
                if(request.result.data.result.length == 0){
                    //setPageEnd(true)
                    //setBottomLoading(false)
                }else{
                    setShares([...request.result.data.result])
                }
                //window.location.href = `${getAPIBaseURL()}/app`

            }else{
                //alert("Eror")
                setGenError(request.result.data.result)
            }

        }else{
            setGenError("Something went wrong")
        }
        
    }else{
      console.log('No token')
    }  
}

  return (
    <NativeBaseProvider>
         
    <Box flex={1} p={4} bg="white">
    {/*<Box>
        <Pressable onPress={() => setRefresh(1)}>
            <MaterialIcons name='refresh' size={26} color={'blue'}/>
        </Pressable>
    </Box>*/}

    
      <FlatList
        data={shares}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListHeaderComponent={() => (
          <Heading bgColor={'blue.500'} backgroundColor={'blue.500'} size={'lg'} mt={4} mb={4}>Pending Resources</Heading>
            /*<Button
            mb={4}
            colorScheme="teal"
            onPress={() => navigation.navigate('newshare')}
            leftIcon={<Icon as={MaterialIcons} name="add" size="sm" />}
          >
            Share a Resource
          </Button>*/
        )}
      />
      {!shares.length && <Box alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
        <Text>{backgroundLoading}</Text>
      </Box>}
    </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
    video: {
      width: '100%', // Adjust width and height as needed
      height: 200,
      backgroundColor: 'black'
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 200,
        width: '100%'
      },
    
    videoStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 200,
    width: '100%'
  }
  });

export default PendingShares;
