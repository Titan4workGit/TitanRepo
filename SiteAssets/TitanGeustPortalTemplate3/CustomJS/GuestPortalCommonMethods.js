function CheckSPecialNameMulti()
{
    var format = /[`#$%&\=\[\]{};'"\\|,<>\/?~]/;
    var notValid=true;
    if (arrFileFolder.length > 0) {
            
            for (var index = 0; index < arrFileFolder.length; index++) {
                //if (arrFileFolder[index].type == 'file')
                
                    var fileN=arrFileFolder[index].FileFolderName;
                    if(format.test(fileN))
                    {
                        notValid=false;
                        break;
                    }
                
            }
            if(notValid==false)
                alert("Selected document has invalid file name. Please change the file name before proceed.");

    }
    return notValid;
}
function CheckSPecialName(fileN)
{
    var format = /[`#$%&\=\[\]{};'"\\|,<>\/?~]/;
    var notValid=true;
    if(format.test(fileN))
    {
        notValid=false;
        alert("Selected document has invalid file name. Please change the file name before proceed.");

    }
    return notValid;
}
//encodeURIComponent() will not encode: ~!*()'
//Function to encode ! ' () *
function fixedEncodeURIComponent(str,tag) {
    
    
    str=str.replaceAll("'", "''");
    if(tag!=undefined&&tag!=null&&tag!='null',tag!='undeined'&&tag!=""){
        if(tag=="href")
        {
            //No replace ' with ''
            //reverse
            str=str.replaceAll("''", "'");
        }
    }
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
function fixedEncodeURI(str) {
str=str.replaceAll("'", "''");
  return encodeURI(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
function fixedDecodeURIComponent(str){
  str=decodeURIComponent(str).replaceAll("''", "'"); 
  return str; 
}
