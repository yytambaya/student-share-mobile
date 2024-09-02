import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import { downloadFileFromCloudinary } from '../components/ResourcesDownload';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download files',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

export const getPermissionAndDownload = async (url, fileName) => {
  if (Platform.OS === 'ios') {
    //actualDownload();
    //await downloadFileFromCloudinary(url, fileName)
    
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted!')
      } else {
        console.log("please grant permission");
        //await downloadFileFromCloudinary(url, fileName)
      }
    } catch (err) {
      console.log("display error",err)    }
  }
};