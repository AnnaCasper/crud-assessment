module.exports = {

  validateForm:function(title, excerpt, body){
    var errorArray = [];
    
    if(title === ""){
      errorArray.push('Article title must be filled out.');
    };

    if(excerpt === ""){
      errorArray.push('Article excerpt must be filled out.');
    };

    if(body === ""){
      errorArray.push('Article body must be filled out.');
    };

    return errorArray;
  },

}
