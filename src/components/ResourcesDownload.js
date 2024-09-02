import { Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Pressable } from 'react-native';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const FileDownloadScreen = ({url, fileName}) => {
  const [downloading, setDownloading] = useState(false)
  /* useEffect(() => {
    // Optional: Delete the file if it exists before downloading
    const filePath = RNFS.DocumentDirectoryPath + `/${fileName}`;
    RNFS.unlink(filePath)
      .then(() => {
        console.log('Previous file deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);*/

  const downloadThisFile = async () => {
    //const url = '';
    //const filePath = `${url}`;
    try{
    console.log('Download link: ' + url)
    console.log('Destination path and path: ' + fileName)
    const dest = `${RNFS.DownloadDirectoryPath}/${fileName}`
    setDownloading(true)
    const response = await RNFS.downloadFile({
      fromUrl: url,
      toFile: dest,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    }).promise
      
   // .promise.then((response) => {
        console.log('File downloaded!', response);
        if(response && response.statusCode == 200 && response.bytesWritten > 0 ){
            //console.log('download successful:' + response.path)
            Alert.alert('Download successful. saved to: ' + dest)
            console.log('Saved to: ' + dest)
        }else{
          console.log(JSON.stringify(response))
          //console.log('response path: ' + response.path)
          console.log('download unsuccessful!!')
        }
      //})
      //.catch((err) => {
       // console.log('Download error:', err);
      //});
        setDownloading(false)
      }catch(error){
        setDownloading(false)
        console.log('Error: ' + error)

      }
  };

  return (
    <View>
      <Pressable onPress={() => downloadThisFile()}>
      <Box background={downloading ? 'gray.300' : 'blue.800'} aria-disabled={downloading} rounded={'full'} mt={2} p={2} width={8} height={8} shadow={4}>
        <AntDesign name='download' size={12} color={'white'}/>
      </Box>
      </Pressable>
      {/*<Button title="Download h" onPress={() => downloadFile()} />*/}
    </View>
  );
};