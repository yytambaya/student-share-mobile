// screens/Feed.js
import React, { useContext, useEffect, useState } from 'react';
import { Box, FlatList, Text, Button, Icon, NativeBaseProvider, Image, Flex, IconButton, Heading, Menu, Center, AlertDialog, useToast } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAPIBaseURL } from '../../utils/helpers';
import { getData, postData } from '../../utils/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import { Modal, Pressable, StyleSheet } from 'react-native';
import FileDownloadButton from '../../components/ResourcesDownload';
import { validateCollectionID_post, validateID_post, validateName } from '../../utils/validators';
import { useNavigation } from '@react-navigation/native';
import { SharesContext } from '../../context/sharesContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import PDFReader from '../../components/PDFReader';

const ApprovedShares = ({ }) => {
  const [shares, setShares] = useState([])
  const [genError, setGenError] = useState("")
  const [limit, setLimit] = useState("10")
  const [skip, setSkip] = useState("0")
  const [btnState, setBtnState] = useState('Delete')
  const [rejBtnState, setRejBtnState] = useState('Reject')
  const [id, setID] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [isRejOpen, setIsRejOpen] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState('loading...')
  const [error, setError] = useState([{field: "id", msg:""}]);
  const [selectedPDF, setSelectedPDF] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const cancelRef = React.useRef(null);
  const rejCancelRef = React.useRef(null);
  const navigation = useNavigation()  
  const toast = useToast()
  const {isUpdated, setIsUpdated} = useContext(SharesContext)
  const onClose = () => setIsOpen(false);
  const onCloseRej = () => setIsRejOpen(false)

  useEffect(() => {
    getShares()
  }, [isUpdated])

 

  const renderItem = ({ item }) => (
    <Box key={item._id} borderBottomWidth={1} borderColor="coolGray.200" p={4} mb={2} bg="coolGray.50" borderRadius="md">
        <Box w="100%">
      <Menu w="100%" trigger={triggerProps => {
      return <Box>
            <Flex flexDirection={'row-reverse'}>
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <MaterialCommunityIcons name='dots-vertical' color={'grey'} size={28}/>
            </Pressable>;
            </Flex>
        </Box>    
    }}>
        <Menu.Item onPress={() => {setIsRejOpen(true); setID(item._id)}}>reject</Menu.Item>
        <Menu.Item onPress={() => {setIsOpen(true); setID(item._id)}}>delete</Menu.Item>
      </Menu>
    </Box>
      <Text fontWeight="bold" fontSize="lg">{item.title.toUpperCase()}</Text>
      <Text>{item.note}</Text>
      { item?.type == 'image' ? 
        <Pressable onPress={() => setSelectedImage(item?.fileLink)}>
          <Image width={'100%'} height={200} source={{ uri: `https://res.cloudinary.com/dofqmpzy8/image/upload/v1722596440/IJMB/students/share/${item?.fileLink}.png`}} alt="image"/>
        </Pressable>
        :item?.type == 'video' ?
        <Box flex='1' bg="black" alignItems='center' alignContent='center' justifyContent='center' style={ styles.containerStyle }>
            <Video source={{ uri: `https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.mp4`}} poster={`https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.png`} paused={true} repeat={ true } style={styles.videoStyle} controls={ true } />
        </Box>        
        : 
        <Box backgroundColor={'gray.200'} rounded={'md'}>
        <Flex flexDirection={'row'} >
            <Text fontWeight={'medium'} mr={2}>{item?.fileLink}.pdf</Text>
            <Button onPress={ () => setSelectedPDF(`https://res.cloudinary.com/dofqmpzy8/video/upload/v1722608953/IJMB/students/share/${item?.fileLink}.pdf`)} color={'blue.800'}>open</Button>
            {/*<AntDesign name='download' size={16} color={'blue'}/>*/}
           
        </Flex>
        </Box>
      }
      <Text color="coolGray.600" fontSize="xs">posted on {item?.createdAt?.substring(0, 10)}</Text>
    </Box>
  );

  const DeleteConfirmation = () => {
    
    return <Center>
        {/*<Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
          Delete Customer
        </Button>*/}
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Customer</AlertDialog.Header>
            <AlertDialog.Body>
            
            {error.find(item => item.field == "id").msg ? <Text color='red.500'>{error.find(item => item.field == "id").msg }</Text>: null}
              This will remove all data relating to this resource. This action cannot be
              reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={() => deleteShare()}>
                  {btnState}
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
  };
  
  const RejConfirmation = () => {
    
    return <Center>
        {/*<Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
          Delete Customer
        </Button>*/}
        <AlertDialog leastDestructiveRef={rejCancelRef} isOpen={isRejOpen} onClose={onCloseRej}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Reject Resource</AlertDialog.Header>
            <AlertDialog.Body>
            
            {error.find(item => item.field == "id").msg ? <Text color='red.500'>{error.find(item => item.field == "id").msg }</Text>: null}
              This disapprove remove this post. The content of this post won't be seen again
              until is approved again
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onCloseRej} ref={rejCancelRef}>
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={() => rejectShare()}>
                  {rejBtnState}
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
  };
  
  const getShares = async () => {
    //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
    //var accessToken = localStorage.getItem('jwt_token');
    const accessToken = await AsyncStorage.getItem('jwt_token')
    const userId = await AsyncStorage.getItem('_id')
    
    var at_val = accessToken == "" || accessToken == undefined? false : true; 
    //const idVal = await AsyncStorage.getItem('_id')
    //setAccessToken(tokenVal)
    //setId(idVal)
    if(accessToken == "") setGenError("Unauthorized. Login again!"); 
    
    if(userId == "") setGenError("Unauthorized. Login again!"); 
    
    if(at_val){
        //alert("going")
        const url = `${getAPIBaseURL()}/v1/admin/share/approved`;
        const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
        const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
        const params = {limit:limit , skip:skip, id: userId};

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
        
    }  
}

const rejectShare = async () => {
    var id_val = validateID_post(id).error == "" ? true : false;
 
    setError([...error, error.find(item => item.field == "id").msg = validateID_post(id).result])
    
    if(id_val){
        console.log("fields are okay")
        setBtnState("Loading...")
        const url = `${getAPIBaseURL()}/v1/admin/share/reject`;
        const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
        const accessToken = await AsyncStorage.getItem('jwt_token')
        let headers = {'x-access-key': api_key, 'x-access-token': accessToken}
        let data = {id: id};
        const request = await postData(url, headers, data)
        setRejBtnState('Reject')
        console.log(JSON.stringify(request))
        //alert(JSON.stringify(request))
        if(request.error == "" && request.result.data?.error != "error"){
            if(request.result.data?.error == ""){
                console.log("deleted successfully")
                toast.show({title: 'This resource  is rejected', placement:'top'})
                setIsRejOpen(false)
                setShares(shares.filter((e) => !(e._id == id)))
                setIsUpdated(true)
                //alert('successful')
                //toast.show({description:'signed up successfully', placement: 'top', color:'green.500'})
                //navigation.navigate('login') 
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
      console.log("error in forms")
    }

    //setBtnState('Signup')
    
} 

const deleteShare = async () => {
  var id_val = validateID_post(id).error == "" ? true : false;

  setError([...error, error.find(item => item.field == "id").msg = validateID_post(id).result])
  
  if(id_val){
      console.log("fields are okay")
      setBtnState("Loading...")
      const url = `${getAPIBaseURL()}/v1/admin/share/remove`;
      const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
      const accessToken = await AsyncStorage.getItem('jwt_token')
      let headers = {'x-access-key': api_key, 'x-access-token': accessToken}
      let data = {id: id};
      const request = await postData(url, headers, data)
      setBtnState('Delete')
      console.log(JSON.stringify(request))
      //alert(JSON.stringify(request))
      if(request.error == "" && request.result.data?.error != "error"){
          if(request.result.data?.error == ""){
              console.log("deleted successfully")
              toast.show({title: 'resource deleted successfully!', placement:'top'})
              setIsOpen(false)
              setShares(shares.filter((e) => !(e._id == id)))
              //alert('successful')
              //toast.show({description:'signed up successfully', placement: 'top', color:'green.500'})
              //navigation.navigate('login') 
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
    console.log("error in forms")
  }

  //setBtnState('Signup')
  
} 


  return (
    <NativeBaseProvider>
      <Modal visible={selectedPDF ? true : false} onRequestClose={() => setSelectedPDF(null)}>
        <IconButton size={12} icon={<AntDesign name='close'/>} onPress={() => setSelectedPDF(null)} />
        {selectedPDF && <PDFReader url={selectedPDF}/>}
      </Modal>     
     
     {selectedImage && <Box>
        {/*<Pressable onPress={() => setSelectedImage(null)}>*/}
          {/*<Image  width={'100%'} height={'100%'} source={{ uri: `https://res.cloudinary.com/dofqmpzy8/image/upload/v1722596440/IJMB/students/share/${selectedImage}.png`}} alt="image"/>*/}
          <Modal visible={selectedImage ? true : false} transparent={true} onRequestClose={() => setSelectedImage(null)}>
          <ImageViewer
          imageUrls={ [{url: `https://res.cloudinary.com/dofqmpzy8/image/upload/v1722596440/IJMB/students/share/${selectedImage}.png`}]}
          onSwipeDown={() => setSelectedImage(null)}
          onClick={() => setSelectedImage(null)}
          enableSwipeDown={true}
        />
        </Modal>
        {/*</Pressable>*/}  
    </Box>}    
    <Box flex={1} p={4} bg="white">
      <RejConfirmation/>
      <DeleteConfirmation/>
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
          <Heading size={'lg'} fontWeight={'bold'} mt={4} mb={4}>Approved Resources</Heading>
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

export default ApprovedShares;
