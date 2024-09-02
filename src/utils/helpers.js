//import AsyncLocalStorage from '@createnextapp/async-local-storage'
import { allconfig } from '../config'

/*export const isLoggedIn = () => {
    readData("accessToken").then(result => {
        if(result == "" || result == undefined){
            window.location.href = `${getAPIBaseURL()}/login`
        }
    })
    .catch(error => {
        
    })
}*/


/*export const storeData = async (key, value) => {
    try {
      await AsyncLocalStorage.setItem(key, value)
    } catch(e) {
      // error
    }
  }*/

/*export const readData = async (key) => {
    let data
  
    try {
      data = await AsyncLocalStorage.getItem(key)
    } catch(e) {
      // error
    }
  
    console.log(data)
    return data
    /*
      output: 
      value
  }*/

  export const getAPIBaseURL = () => {
    var api_base_url = allconfig.env == "dev" ? allconfig.dev_api_url : allconfig.prod_api_url

    return api_base_url;
  }

  export const getSiteBaseURL = () => {
    var site_base_url = allconfig.env == "dev" ? allconfig.dev_site_url : allconfig.prod_site_url
  
    return site_base_url;
  }

  export const getLandingURL = () => {
    var site_base_url = allconfig.env == "dev" ? allconfig.dev_site_url : allconfig.prod_landing_url
  
    return site_base_url;
  }

  