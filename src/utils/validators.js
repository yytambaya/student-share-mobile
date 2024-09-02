export const reg_name = /^[a-zA-Z0-9#$()!<>\//s]{2,30}/
export const reg_title = (/^(?![ -.&,_'":?!])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!]{2})[a-zA-Z0-9- .#@&,_'":.?!]+$/)
export const reg_desc = /[A-Za-z0-9!@#$%&*()-_+=:;//\/.?{},]{0,200}/;
export const reg_text = (/^(?![ -.&,_'":?!])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!]{2})[a-zA-Z0-9- .#@&,_'":.?!]+$/)
export const reg_id = /^[A-Za-z0-9]{1,}$/ 
export const reg_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const reg_phoneNumber = /^[0-9]{11}$/
//export const  reg_name = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
//export const reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
export const reg_password = /^[A-Za-z0-9]{6,50}/ 
//export const reg_url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const reg_url = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
export const reg_type = /^[A-Za-z0-9]{1,50}$/;
export const reg_number = /^[0-9]{1,}$/;

export const validateEmail = (email) => {
    //email = req.body.email; 
    var res = {error:"error", result:"Unknown"};
    if(email != "" && email != undefined){
        if(reg_email.test(email)){
            res = {error: "", result: ""};
                
        }else{
            res = {error: "error", result: "invalid email address"};    
        }
    }else{
        res = {error: "error", result: "email address is empty"};
    }
    return res;
};

export const validateImage = (image) => {
    //link = req.body.link;
    var res = {error:"error", result:"Unknown"};
    if(image != "" && image != undefined){
        /*if(reg_url.test(image)){
            res = {error:"", result:""};
            
        }else{
            res = {error: "error", result: "invalid image"};    
        }*/
        res = {error:"", result:""};
    }else{
        res = {error: "error", result: "image is required"};
    }
    return res;
};

export const validatePhoneNumber = (phoneNumber) => {
    //email = req.body.email; 
    var res = {error:"error", result:"Unknown"};
    if(phoneNumber != "" && phoneNumber != undefined){
        if(reg_phoneNumber.test(phoneNumber)){
            res = {error: "", result: ""};
                
        }else{
            res = {error: "error", result: "invalid phone number"};    
        }
    }else{
        res = {error: "error", result: "phone number address is empty"};
    }
    return res;
};


export const validatePassword = (password) => {
    //password = req.body.password;
    var res = {error:"error", result:"Unknown"};
    if(password != "" && password != undefined){
        if(reg_password.test(password)){
            res = {error:"", result:""};;
            
        }else{
            res = {error: "error", result: "invalid password"};    
        }
    }else{
        res = {error: "error", result: "password is empty"};
    }
    return res;
};

export const validateName = (name) => {
  //name = req.body.name;
  var res = {error:"error", result:"Unknown"};
  if(name != "" && name != undefined){
      if(reg_name.test(name)){
          res = {error:"", result:""};;
          
      }else{
          res = {error: "error", result: "invalid name"};    
      }
  }else{
      res = {error: "error", result: "name is empty"};
  }
  return res;
};

export const validateTitle = (title) => {
    //name = req.body.name;
    var res = {error:"error", result:"Unknown"};
    if(title != "" && title != undefined){
        if(reg_title.test(title)){
            res = {error:"", result:""};;
            
        }else{
            res = {error: "error", result: "invalid title"};    
        }
    }else{
        res = {error: "error", result: "title is empty"};
    }
    return res;
};

export const validateText = (text) => {
    //name = req.body.name;
    var res = {error:"error", result:"Unknown"};
    if(text != "" && text != undefined){
        if(reg_text.test(text)){
            res = {error:"", result:""};;
            
        }else{
            res = {error: "error", result: "invalid text"};    
        }
    }else{
        res = {error: "error", result: "text is empty"};
    }
    return res;
};

export const validateDescription = (desc) => {
  var res = {error:"error", result:"Unknown"};
  //desc = req.body.desc;
  if(desc != "" && desc != undefined){
      if(reg_desc.test(desc)){
        res = {error:"", result:""};;
        
    }else{
          res = {error: "error", result: "invalid description. 200 min"};    
      }
  }else{
      res = {error: "", result: ""};
  }
  return res;
};

export const validateLink = (link) => {
  //link = req.body.link;
  var res = {error:"error", result:"Unknown"};
  if(link != "" && link != undefined){
      if(reg_url.test(link)){
          res = {error:"", result:""};;
          
      }else{
          res = {error: "error", result: "invalid link"};    
      }
  }else{
      res = {error: "error", result: "link is empty"};
  }
  return res;
};

export const validateID_post = (id) => {
  //id = req.body.id;  
  var res = {error:"error", result:"Unknown"};
  if(id != "" && id != undefined){
      if(reg_id.test(id)){
          res = {error:"", result:""};;
          
      }else{
          res = {error: "error", result: "invalid ID"};    
      }
  }else{
      res = {error: "error", result: "ID is empty"};
  }
  return res;
};

export const validateID_get = (id) => {
    //id = req.query.id;  
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        if(reg_id.test(id)){
            res = {error:"", result:""};;
            
        }else{
            res = {error: "error", result: "invalid ID"};    
        }
    }else{
        res = {error: "error", result: "ID is empty"};
    }
    return res;
  };

export const validatePaymentType = (type) => {
  //type = req.body.type;
  var res = {error:"error", result:"Unknown"};
  if(type != "" && type != undefined){
      if(reg_type.test(type)){
          res = {error:"", result:""};;
          
      }else{
          res = {error: "error", result: "invalid type"};    
      }
  }else{
      res = {error: "error", result: "type is empty"};
  }
  return res;
};

export const validateTransactionID = (id) => {
    //id = req.query.transaction_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:""};;
        
    }else{
        res = {error: "error", result: "transaction id is empty"};
    }
    return res;
};
  
export const validateToken = (id) => {
    //id = req.query.token;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:""};;
        
    }else{
        res = {error: "error", result: "token is empty"};
    }
    return res;
};

export const validateParentID = (id) => {
    //id = req.body.parent_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:""};;
        
    }else{
        res = {error: "error", result: "parent id is empty"};
    }
    return res;
};

export const validateParentName = (parent_name) => {
    //var parent_name = req.body.parent_name; 
    var res = {error:"error", result:"unknown"};
    if(parent_name != "" && parent_name != undefined){
        if(reg_name.test(parent_name)){
            res = {error: "", result: ""};
              //next();  
        }else{
            res = {error: "error", result: "invalid parent name"}    
        }
    }else{
        res = {error: "error", result: "parent name is empty"}
    }
    return res;
}

export const validateCollectionID_post = (id) => {
    //id = req.body.col_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:"This id is valid"};;
        
    }else{
        res = {error: "error", result: "collection id is empty"};
    }
    return res;
};

export const validateCollectionID_get = (id) => {
    //id = req.body.col_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:""};;
        

    }else{
        res = {error: "error", result: "collection id is empty"};
    }
    return res;
};
//alert(validateEmail("hjsjsj@gmail.com").result);
//alert(validatePassword("hsjhsjs").result);

export const validateResourceID_post = (id) => {
    //id = req.body.res_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:"This id is valid"};;
        

    }else{
        res = {error: "error", result: "resource id is empty"};
    }
    return res;
};

export const validateResourceID_get = (id) => {
    //id = req.query.res_id;
    var res = {error:"error", result:"Unknown"};
    if(id != "" && id != undefined){
        res = {error:"", result:"This id is valid"};;
        

    }else{
        res = {error: "error", result: "resource id is empty"};
    }
    return res;
};

export const validateNumber = (num) => {
    //id = req.query.id;  
    var res = {error:"error", result:"Unknown"};
    if(num != "" && num != undefined){
        if(reg_number.test(num)){
            res = {error:"", result:""};
            
        }else{
            res = {error: "error", result: "invalid number"};    
        }
    }else{
        res = {error: "error", result: "Field is empty"};
    }
    return res;
  };

/*export const validateFundingCategory = (cat) => {
    //id = req.query.res_id;
    var res = {error:"error", result:"Unknown"};
    if(cat != "" && cat != undefined){
        if(Category.includes(cat)){
            res = {error:"", result:""};
        }else{
            res = {error:"error", result:"Invalid input"};
        }
        
        

    }else{
        res = {error: "error", result: "Field is empty"};
    }
    return res;
};*/




