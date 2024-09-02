// screens/ShareResource.js
import React, { useContext, useState } from 'react';
import { Box, Input, Button, Select, CheckIcon, TextArea, VStack, FormControl, ScrollView, Heading, Text, NativeBaseProvider, useToast } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { validateDescription, validateImage, validateName } from '../../utils/validators';
import { useNavigation } from '@react-navigation/native';
import { getAPIBaseURL } from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../utils/request';
import { SharesContext } from '../../context/sharesContext';

const ShareResource = ({}) => {
  const [type, setType] = useState('');
  const [fileName, setFileName] = useState('')
  const [content, setContent] = useState('');
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [pdf, setPdf] = useState("");
  const [fileUri, setFileUri] = useState('')
  const [btnState, setBtnState] = useState("Share Resource");
  const [error, setError] = useState([{field: "title", msg:""}, {field: "content", msg:""}, {field: "image", msg:""}, {field: "video", msg:""}, {field: "pdf", msg:""}]);
  const [genError, setGenError] = useState("")
  const navigation = useNavigation()
  const toast = useToast()
  const {setIsUpdated} = useContext(SharesContext)
    
  const sendShare = async () => {
    //alert("Title: " + title + " Content: " + content);
    var n_val = validateName(title).error == "" ? true : false;
    var e_val = validateDescription(content).error == "" ? true: false;
    //var ph_val = validateImage(image).error == "" ? true: false;
    //var p1_val = validateImage(video).error == "" ? true: false;
    //var p2_val = validateImage(pdf).error == "" ? true: false;
    
    setError([...error, error.find(item => item.field == "title").msg = validateName(title).result])
    setError([...error, error.find(item => item.field == "content").msg = validateDescription(content).result])
    //setError([...error, error.find(item => item.field == "image").msg = validateImage(image).result])
    //setError([...error, error.find(item => item.field == "video").msg = validateImage(video).result])
    //setError([...error, error.find(item => item.field == "pdf").msg = validateImage(pdf).result])
    
    if(n_val && e_val){
        console.log("fields are okay")
        console.log("passwords are equal")
        setBtnState("Loading...")
        const url = `${getAPIBaseURL()}/v1/admin/share/new`;
        const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
        const accessToken = await AsyncStorage.getItem('jwt_token')
        const userId = await AsyncStorage.getItem('_id')
        if(accessToken && userId){
          //alert('access token inside: ' + accessToken)
        let headers = null
        headers = {"Content-Type" : 'multipart/form-data', 'x-access-key': api_key, 'x-access-token': accessToken}
        let data = null
        if(type ==  'note'){
            //alert('Note')
            headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            data = {title: title, note: content, type: type, userId};
        }else{
            //alert('File')
            data = new FormData()
            data.append('title', title)
            data.append('type', type)
            data.append('userId', userId)
            //data.append('file', fileUri)
            data.append('file', {
                uri: fileUri,
                type: type === 'image' ? 'image/jpeg' : type === 'video' ? 'video/mp4' : 'application/pdf',
                name: fileName,
            });
        }        
        //const formData = FormData()
        //formData.append('title', title)
        //formData.append('note', content)
        const request = await postData(url, headers, data)
        setBtnState('Share Resource')
        console.log(JSON.stringify(request))
        //alert(JSON.stringify(request))
        if(request.error == "" && request.result.data?.error != "error"){
            if(request.result.data?.error == ""){
                console.log("added successfully")
                toast.show({title: 'New resource shared successfully!', placement:'top'})
                setIsUpdated(true)
                navigation.navigate('Pending')
                
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
        //alert('no access token')
      }

    }else{
      console.log("error in forms")
    }

    //setBtnState('Signup')
    
}  

const handleImageUpload = (e) => {
    setPhoto(e.target.files[0])
    setPhotoURL(URL.createObjectURL(e.target.files[0]))
    setUploadCapture(true)
}

  const handleFileSelect = async () => {
    try {
      if (type === 'image' || type === 'video') {
        const result = await launchImageLibrary({ mediaType: type });
        if (result.assets && result.assets.length > 0) {
          setFileName(result.assets[0].fileName);
          setContent(result.assets[0]);
          setFileUri(result.assets[0].uri);
          
        }
      } else if (type === 'pdf') {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        setFileName(result[0].name);
        setContent(result[0].uri);
        setFileUri(result[0].uri);
        }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };



  const handleSubmit = () => {
    // Logic to handle resource sharing (e.g., saving to database)
    console.log(`Type: ${type}, Content: ${content}`);
    navigation.goBack();
  };


  return (
    <NativeBaseProvider>
    <Box flex={1} bg="white" safeArea p={4}>
      <ScrollView>
        <VStack space={4}>
          <Heading size="lg" color="#03346E" alignSelf="center" mb={4}>
            Share a Resource
          </Heading>
          <FormControl>
          <FormControl.Label>Title</FormControl.Label>
            <Input type="text" onChangeText={(text) => setTitle(text)} placeholder='title of this resource'/>
            {error.find(item => item.field == "title").msg ? <Text color='red.500'>{error.find(item => item.field == "title").msg }</Text>: null}
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Select Resource Type</FormControl.Label>
            <Select
              selectedValue={type}
              minWidth={200}
              placeholder="Choose Type"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              onValueChange={itemValue => {
                setType(itemValue);
                setContent('');
                setFileName('');
              }}
            >
              <Select.Item label="Note" value="note" />
              <Select.Item label="PDF" value="pdf" />
              <Select.Item label="Image" value="image" />
              <Select.Item label="Video" value="video" />
            </Select>
          </FormControl>
          {type === 'note' && (
            <FormControl isRequired>
              <FormControl.Label>Content</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Enter note content"
                value={content}
                onChangeText={text => setContent(text)}
                autoCompleteType="off"
              />
          
            </FormControl>
          )}
            {error.find(item => item.field == "content").msg ? <Text color='red.500'>{error.find(item => item.field == "content").msg }</Text>: null}
          {(type === 'pdf' || type === 'image' || type === 'video') && (
            <Button mt={4} backgroundColor={'#03346E'} colorScheme="#03346E" onPress={handleFileSelect}>
              Select {type === 'pdf' ? 'PDF' : type === 'image' ? 'Image' : 'Video'}
            </Button>
          )}
          {fileName !== '' && (
            <Text mt={2} color="coolGray.600">
              Selected File: {fileName}
            </Text>
          )}
          <Button
            mt={4}
            backgroundColor={'#03346E'}
            colorScheme="#03346E"
            onPress={() => sendShare()}
            _text={{
              fontSize: "md",
              fontWeight: "bold",
              color: "white"
            }}
          >
            {btnState}
          </Button>
        </VStack>
      </ScrollView>
    </Box>
    </NativeBaseProvider>
  );
};

export default ShareResource;
