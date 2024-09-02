import axios from "axios";

export const getData = async (url, headers, params) => {
    try{
            
        const res = await axios.get(url, {params:params, headers: headers});
        return {error: "", result: res};
            
      }catch(error){
        if(error.request){
          //alert("Request error: " + JSON.stringify(error.request))
        }else if(error.response){
          //alert("Response error: ", error.response.data)
        }else{
          //alert("Error here: " + error.message)
        }
        return {error: "error", result: error}
      }
}

export const postData = async (url, headers, data) => {
    try{
          const res = await axios.post(url, data, {headers: headers});
          return {error: "", result: res};
            
      }catch(error){
        console.log(error.request)
        return {error: "error", result: error}
      }
}