var siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
var FName;
var folderId;
var employeePicURL;
var Comment=0;
var Like=0;
var View=0;
var getLatestAnnId = '';
var dropZoneAnnId = "drop-zone-Anncmnt";
var dropZoneAnn = $("#" + dropZoneAnnId);
var inputFileAnn = $("#AnnoncmntUpload");
var finalFilesAnn = [];
var Files4UploadAnn = [];

$(document).ready(function (){
var url = new URL(window.location.href);
var folderUrl= url.searchParams.get("FName");
var FilesArr=new Array();


	$(".annClosePopup").click(function () {
        $("#Announcement_Alert").modal('hide');
        $("#showInnerLikesAnncmnt").addClass("show-inner-likes-box-hide");
        //$("body").scrollTop(scrollPosition);
    });
    $("#scrollChatAnn").click(function () {
        $("#ToastPopupAnn").hide();
        $('#hideCommentScrollAnncmnt').scrollTop($('#reply_areaAnncmnt')[0].scrollHeight);
    });

	$("#replyHideAnncmnt").click(function () {
        $("#replyTextareaAnncmnt").hide();
    });
    
    $("#likeCloseBoxAnncmnt").click(function(){ 
		$("#showInnerLikesAnncmnt").toggleClass("show-inner-likes-box-hide"); 
	});
	$(".like-img").click(function () {
		var src = $(this).attr('src');
		var newsrc = (src == '../SiteAssets/Biography/Experience/assets/images/like-icon.png') ? '../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' : '../SiteAssets/Biography/Experience/assets/images/like-icon.png';
	});



	var url=window.location;
	userActivityNotificationEntry(_spPageContextInfo.userId,url)



$("#saveAnncmntChat").click(function () {
        PushAnnRootComment();
    });
    
    
    $("#seemorebtnGeneralAnncmnt").click(function () {
        ReadAnnComment('GetAll', 'Logged_InUser', AnncmntURL, 'ViewMore');
    });


FName=folderUrl;
//GetFolderDetails(FName);
GetMediaGalleryFiles(FName);
GetFolderDetails(FName)
//GetEmployeeImg();

	$("#btnSaveFolder").on("click", function () {
	
	 updateFolder();
	 
	});
	
	$("#btnFolderDetails").on("click", function (e) {
	e.preventDefault();
	 //GetFolderDetails(FName);
	 
	});
	$("#btnDelete").on("click", function (e) {
	e.preventDefault();
	
	
	 deleteFile(FName);
	 
	});
	$('input:checkbox').change(function(){	  
		if($(this).is(':checked')) {
		   $(this).parent().addClass('inputshow'); 
		   $(this).addClass('chck'); 
        }
		else 
		 $(this).parent().removeClass('inputshow')
		 $(this).removeClass('chck')
		 
	});	
	
	$("#btnDownloadAlbum").on("click", function (e) {
	e.preventDefault();
	 getCheckBoxValue();	 
	});
	
	$("#btnDeleteAlbum").on("click", function (e) {
	e.preventDefault();
	var fileSelect=false;
    var inputElements = document.getElementsByClassName('messageCheckbox');  
     for(var i=0; inputElements[i]; ++i)
     {
      if(inputElements[i].checked)
      {           
           fileSelect=true;                      
      }
     }
     if(fileSelect==false)
     {
         alert('Please select Items');
         return false
     }	
	 deleteMultiFile();	 
	});
	
	
	$("#btnViewFiles").on("click", function (e) {
	e.preventDefault();
	 FilesView(arr);
	 
	});
	$("#btnCommentFiles").on("click", function (e) {
	e.preventDefault();
	 FilesComments(arr);
	 
	});
	$("#btnRecent").on("click", function (e) {
	e.preventDefault();
	 recentFiles(arr);
	 
	});
	$("#btnLikeFiles").on("click", function (e) {
	e.preventDefault();
	 FilesLike(arr);
	 
	});
  $('#files2').change(function(){
	var FolderName=FName.split('/')
    uploadDocument(FolderName[FolderName.length-1],1);
    alert("File(s) uploaded successfully!");
    
  })
  
  $('#files').change(function(){
	var FolderName=FName.split('/')
    uploadDocument(FolderName[FolderName.length-1],2);
  })
  
  
   	$("#TotalHitsMedia").click(function () {
        getViewedUsers();
    });
    
    
    $("#TotalLikesMedia").click(function () {
        getLikedUsers();
    });
    
    $('#myCheckbox10000').on('click',function(){
	        if(this.checked){
	        	$(".chexbox_mg").addClass("inputshow");
	            $('.messageCheckbox').each(function(){
	                this.checked = true;
	            });
	        }
	        else{
	        	$(".chexbox_mg").removeClass("inputshow");
	             $('.messageCheckbox').each(function(){
	                this.checked = false;
	            });
		        }
		    });
		    
		    /*$('.messageCheckbox').on('click',function(){
		        if($('.messageCheckbox:checked').length == $('.messageCheckbox').length){
		        	$(".chexbox_mg").addClass("inputshow");
		            $('#gallery-check-all').prop('checked',true);
		        }
		        else{
		        	$(".chexbox_mg").removeClass("inputshow");
		            $('#gallery-check-all').prop('checked',false);
		        }
		    });*/



	
	
});


var mediaGalleryCounter=0;
var arr=[];
function GetMediaGalleryFiles(targetfolderUrl)
{
    //var redirecturl= ""+_spPageContextInfo.webAbsoluteUrl+"/Pages/MediaGallery.aspx?WebAppId="+companyID+"";
	var endPointURL = siteURL  + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl+ "')?$select=*,File_x0020_Type&$top=5&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=ListItemAllFields/TimeLastModified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
               var files = data.d.Files.results;
               
               files.sort(function(a, b) {
				  var keyA = new Date(a.TimeLastModified),
				    keyB = new Date(b.TimeLastModified);
				  // Compare the 2 dates
				  if (keyB < keyA) return -1;
				  if (keyB > keyA) return 1;
				  return 0;
				});
               $('#folderName').text(data.d.Name);
               folderName=data.Name;
               var thumbNailUrl="";
               FilesArr=[];
               $('#galleryFirstImgThumb').empty();
              
               var menuFolderHTML="";
              
              
               
               var ImageCount=0; 
               ImageCount=files.length;
               if(ImageCount!=0){
	            for (var i = 0; i < files.length; i++)
	            {

	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	               mediaGalleryCounter++;
	                var fileName=files[i].Name;
	                var Publishing= new Date(files[i].ListItemAllFields.Created);
		            Publishing= $.datepicker.formatDate('MM dd, yy', Publishing);
		            var myCheckbox='myCheckbox'+mediaGalleryCounter;
		            var viewId='view'+files[i].ListItemAllFields.ID;
		            var LikeId='like'+files[i].ListItemAllFields.ID;
		            var CommentId='Comment'+files[i].ListItemAllFields.ID;
		
	            
	            
	            var extofImage;
	            
	            if(thumbNailUrl=="")
	            {
                  thumbNailUrl="../SiteAssets/MediaGallery/assets/images/album-icon.png";
                  extofImage=thumbNailUrl.split('.');
                  extofImage=extofImage[extofImage.length-1]
                }
                else{
                   extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
                }
	          
		        menuFolderHTML+='<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 album-col-info">'
				menuFolderHTML+='<div class="album-card album-photo-view-card">'
				menuFolderHTML+='<a href="#" class="album-card-info album-card-show" data-toggle="modal" data-target="#photo-view-with-comments" onclick="GetDataforModel('+files[i].ListItemAllFields.ID+')">'
			   if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		        {
		          menuFolderHTML +='<img src="'+thumbNailUrl+'" alt="album bg"></a>';
		        }
		        else{
		           menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+thumbNailUrl+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		           menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div></a>'

                 }
                 var View=files[i].ListItemAllFields.View;
                 if(View==null)View=0
                 var Like=files[i].ListItemAllFields.Like;
                 if(Like==null)Like=0
                 var Comment=files[i].ListItemAllFields.Comment;
                 if(Comment==null)Comment=0
                 

				//menuFolderHTML+='<video class="video-box" width="100%" height="100%">'
				//menuFolderHTML+='<source src="../SiteAssets/MediaGallery/assets/images/demo-video.mp4" type="video/mp4">Your browser does not support the video tag.</video>'
				//menuFolderHTML+='<div class="play-icon"><i class="fa fa-play"></i></div></a>'
				menuFolderHTML+='<div class="album-card-footer">'
				menuFolderHTML+='<div class="album-card-footer-flex-box">'
				menuFolderHTML+='<p class="mb-0 album-card-footer-date">'+Publishing+'</p>'
				menuFolderHTML+='<ul class="nav media-gallery-user-btn-item">'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img class="views-img" src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count"><span id='+viewId+'>'+View+'</span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-gap"><span></span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img class="like-img" src="../SiteAssets/MediaGallery/assets/images/like-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count"><span id='+LikeId+'>'+Like+'</span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-gap"><span></span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count active"><a href="#" data-toggle="modal" data-target="#photo-view-with-comments" id='+CommentId+'>'+Comment+'</a></li></ul></div>'
				menuFolderHTML+='<div class="dropdown custom-card-menu">'
				menuFolderHTML+='<a class="album-download-btn" href="'+thumbNailUrl+'" download>'
				menuFolderHTML+='<i class="fa fa-download" aria-hidden="true"></i></a>'
				menuFolderHTML+="<a class='album-delete-btn' onclick='deleteFile(\""+thumbNailUrl+"\");'>"
				menuFolderHTML+='<i class="fa fa-trash-o" aria-hidden="true"></i></a></div>'
				menuFolderHTML+='<div class="custom-album-check-box">'
				menuFolderHTML+='<div class="chexbox_mg">'
				menuFolderHTML+='<input  class="messageCheckbox" value="'+thumbNailUrl+'" type="checkbox" id="'+myCheckbox+'">'
				menuFolderHTML+='<label for="'+myCheckbox+'">'
				// <img src="http://townandcountryremovals.com/wp-content/uploads/2013/10/firefox-logo-200x200.png" /> -->
				menuFolderHTML+='<i class="fa fa-circle-thin" aria-hidden="true"></i>'
				menuFolderHTML+='</label></div></div></div></div></div>'
				
				FilesArr.push({
				 thumbNailUrl:thumbNailUrl,
				 myCheckbox:myCheckbox,
				 Publishing:Publishing,
				 Comment:Comment,
				 Like:Like,
				 View:View,
				 extofImage:extofImage,
				 Modified:files[i].ListItemAllFields.Modified,			 
				 Id:i
				}); 
		     }
		     }
		     else{
		       
		        menuFolderHTML+='<div id="divNoRecord"><p id="noRecordFond">No image found in this Album</p></div>'
		        $('#galleryFirstImgThumb').addClass('media-gallery-detail-null-no-data');
		     }
		    console.log(FilesArr);
		    arr=FilesArr;
		    $('#galleryFirstImgThumb').html('');
	        $('#galleryFirstImgThumb').append(menuFolderHTML);
	           
        }, eror: function (data) {

            console.log('error');
        }
    });
}



function GetFolderDetails(targetfolderUrl)
{ 
debugger
  fileLeafRef=targetfolderUrl;
	var endPointURL = siteURL  + "/_api/Web/lists/GetByTitle('MediaGallery')/Items?$select=*,Author/EMail,Author/Title,FileRef,FileLeafRef&$expand=Author/Title&$filter=FileRef eq '"+targetfolderUrl+"'";
	
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {               
             var folders= data.d.results;    
             var Publishing= new Date(folders[0].ImageCreateDate);
             Publishing= $.datepicker.formatDate('MM dd, yy', Publishing);
             var EName=folders[0].Event_Name;
             if(EName==null)EName='';
             var EPlace=folders[0].Event_Place
             if(EPlace==null)EPlace='';
             $('#EventName').text(EName);
             $('#PlaceName').text(EPlace);
             $('#EventDate').text(Publishing)
             
             
             
            /* $('#userName').text(folders[0].Author.Title);
             folderId=folders[0].Id;
             $('#folderName').text(folders[0].FileLeafRef);
             var imageUrl=folders[0].userImage;
             View=folders[0].View;
             if(View==null)View=0;
		     Like=folders[0].Like;
		     if(Like==null)Like=0;
		     Comment=folders[0].Comment;
		     if(Comment==null)Comment=0;
             if(imageUrl==null){
               imageUrl=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(folders[0].Author.EMail)
             }
            $('#userImage').attr("src",imageUrl);             
             var Publishing= new Date(folders[0].Created);
		     Publishing= $.datepicker.formatDate('dd-M-yy', Publishing);
             $('#txtDate').text(Publishing);
             
             $('#txtFolder').text(folders[0].FileLeafRef);
             $('#txtUserName').val(folders[0].Author.Title);
             $('#createDate').val(Publishing);
             $('#txtDescription').val(folders[0].Description);
             
             $('#dFolderDetails').text(folders[0].FileLeafRef);
             $('#DUserName').text(folders[0].Author.Title);
             $('#FDate').text(Publishing);
             $('#FDescription').text(folders[0].Description);
             */
             

         
	         
	    }, eror: function (data)
        {
            console.log(data);
        }
    });
}
 
function  deleteFile(targetFileUrl) {
   if(targetFileUrl!=FName){
    var deleteConfirmation= confirm("Are you sure to delete this item ?");
    }
    else{
    var folderName = $("#txtFolder").val();
    var deleteConfirmation= confirm("Are you sure you want to delete the album "+ '"'+folderName +'" '+ "? Photos in this album will also be deeted.");
    }
	if(deleteConfirmation)
	{

        
        jQuery.ajax({
            url: siteURL + "/_api/web/getfolderbyserverrelativeurl('" +targetFileUrl+ "')",
            type: "DELETE",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	        	"IF-MATCH": "*"
               // "X-HTTP-Method": "DELETE"
            },
            success: function (data){
              alert('Deleted Successfully !');
              if(targetFileUrl==FName){
               window.location.href='../Pages/MediaGalleryNew.aspx?WebAppId=1';               
              }
              GetMediaGalleryFiles(FName);
              
              
            
            },
            error: function (data){
             alert(data);
            }
        });
        
     }
 }

function  deleteMultiFile() {       
    var deleteConfirmation= confirm("Are you sure to delete this selected items ?");    
   	if(deleteConfirmation)
	{  
        var inputElements = document.getElementsByClassName('messageCheckbox');
        //var checkedValue = document.querySelector('.messageCheckbox:checked').value;
        for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
           targetFileUrl= inputElements[i].value;   
           jQuery.ajax({
            url: siteURL + "/_api/web/getfolderbyserverrelativeurl('" +targetFileUrl+ "')",
            type: "DELETE",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	        	"IF-MATCH": "*"
               // "X-HTTP-Method": "DELETE"
            },
            success: function (data){
              //alert('Deleted Successfully !');
              if(targetFileUrl==FName){
               window.location.href='../Pages/MediaGalleryNew.aspx?WebAppId=1';               
              }           
              
            
            },
            error: function (data){
             alert(data);
            }
        });
       }
      } 
        alert('Deleted Successfully !');
        GetMediaGalleryFiles(FName); 
        
     }
 } 
 
function updateFolder() {

	var folderName = $("#txtFolder").val();
	var Description= $("#txtDescription").val();
	//var siteUrl = _spPageContextInfo.webAbsoluteUrl;
	var fullUrl = siteURL + "/_api/web/GetFolderByServerRelativeUrl('"+FName+"')/ListItemAllFields?$select=FileLeafRef"
	var itemType = GetItemTypeForListName('MediaGallery');
	$.ajax({
	url: fullUrl,
	async: false,
	type: "POST",
	data: JSON.stringify({
	'__metadata': { 'type': 'SP.Data.MediaGalleryItem'},	
	//'ServerRelativeUrl': 'MediaGalleryItem/' + 'Green',
	'FileLeafRef':folderName
	
	
	}),
	headers: {
	"Accept": "application/json;odata=verbose",  
    "Content-Type": "application/json;odata=verbose",  
    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
    "IF-MATCH": "*",  
    "X-HTTP-Method": "MERGE" 
    },
	success: function (data){
	//var targetFileUrl=  data.d.ServerRelativeUrl ;
	  var Urlsplit=fileLeafRef.split('MediaGallery');
	  var targetFileUrl=Urlsplit[0]+'MediaGallery/'+folderName;
	  FName=targetFileUrl;
	  alert('Folder updated successfully !!!');
	  //GetFolderDetails(targetFileUrl)	  
	  //GetMediaGalleryFiles(FName);
	  addFolderDetails(folderName,Description);
	},
	error: function (data){
	   alert(data.responseText);
	}
	});
}



function  addFolderDetails(Title,Description) {
   var  testurl=siteURL + "/_api/web/getfolderbyserverrelativeurl('/sites/Titan_2_2_1_DEV/TITAN/MediaGallery/Lakhan')"
        $.ajax({  
            url: siteURL  + "/_api/web/lists/GetByTitle('MediaGallery')/items('"+folderId+"')",
            type: "POST",  
            data: JSON.stringify  
            ({  
                __metadata:  
                {  
                    type: "SP.Data.MediaGalleryItem"
                      
                },  
                Title: Title,
                Description:Description,
                userImage:employeePicURL
                  
            }),  
            headers:  
            {  
                "Accept": "application/json;odata=verbose",  
                "Content-Type": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "MERGE"  
            },  
            success: function(data, status, xhr)  
            {  
             console.log('Updated!')
            },
            error: function (error)             
            {
              alert(error);
            }
        });
    }    
 
 
 
 

function getCheckBoxValue(){
  var fileSelect=false;
  var inputElements = document.getElementsByClassName('messageCheckbox');
  //var checkedValue = document.querySelector('.messageCheckbox:checked').value;
     for(var i=1; inputElements[i]; ++i)
     {
      if(inputElements[i].checked)
      {
           checkedValue = inputElements[i].value;
           fileSelect=true;
           var filename =inputElements[i].value.split('/'); 
           filename =filename[filename.length-1].split('.');         
           download1(checkedValue,filename[0]);           
      }
     }
     if(fileSelect==false)
     {
         alert('Please select Items');
     }

}

function download1(img,filename) {
    var link = document.createElement("a");
    link.href = img;
    link.download = filename;
    link.style.display = "none";
    var evt = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": true
    });

    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
    console.log("Downloading...");
}


$("#uploadFile1").on('change', function () {
        if (typeof ($("#uploadFile1")[0].files) != "undefined") {
            var size = parseFloat($("#uploadFile1")[0].files[0].size / 1024).toFixed(2);
            console.log(size + " KB.");
            if (size <= 100) {
                document.getElementById('profile-image1').src = window.URL.createObjectURL(this.files[0]);
                return true;
            }

            else {
                alert("The file you are trying to upload is too large (max 50KB).");
                $("#uploadFile1").val(null);
                $('#profile-image1').attr("src", "../SiteAssets/EmployeeSynchronous/EmployeeDirectory_New/images/user_pic.jpg");
                return false;
            }
        }
    }); 
    

function uploadDocument(FolserName,x) {  
       var files;    
       files=$("#files2")[0].files;     
       if (x > 0) {
	       for(var i=0;i<files.length; i++){
		        fileName = files[i].name;  
		          
		        var documentLibrary = "MediaGallery";  
		        var targetUrl = siteURL + "/" + documentLibrary + "/" +FolserName;  
		        // Construct the Endpoint  
		        var url = siteURL + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";  
		        uploadFileToFolder(files[i], url, function(data) {  
		            var file = data.d;  
		            DocFileName = file.Name;  
		            var updateObject = {  
		                __metadata: {  
		                    type: file.ListItemAllFields.__metadata.type  
		                },  
		                FileLeafRef: DocFileName //FileLeafRef --> Internal Name for Name Column  
		            };
		            var filesId=file.ListItemAllFields.Id;
		            addFilesDetails(filesId);
		             GetMediaGalleryFiles(FName);
		        }, function(data) {  
		            alert("File uploading failed");  
		        });
		            
		              
	        } 
    } else {  
        alert("Kindly select a file to upload.!"); 
    }  
}
var employeePicURL=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
function  addFilesDetails(filesId) {
  // var  testurl=siteURL + "/_api/web/getfolderbyserverrelativeurl('/sites/Titan_2_2_1_DEV/TITAN/MediaGallery/Lakhan')"
        var currentDate=new Date();
        currentDate=currentDate.format('MM/dd/yyyy')

        $.ajax({  
            url: siteURL  + "/_api/web/lists/GetByTitle('MediaGallery')/items('"+filesId+"')",
            type: "POST",
            async:false, 
            data: JSON.stringify  
            ({  
                __metadata:  
                {  
                    type: "SP.Data.MediaGalleryItem"
                      
                },  
                //Title: Title,
                //Description:Description,
                UserDepartment:Logged_DepartmentName,
                //Event_Name:EventName,
                //Event_Place:Location,
                ImageCreateDate:currentDate,
                UserDesignation:Logged_Designation,
                userImage:employeePicURL
                  
            }),  
            headers:  
            {  
                "Accept": "application/json;odata=verbose",  
                "Content-Type": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "MERGE"  
            },  
            success: function(data, status, xhr)  
            {  
             console.log('Updated!')
            },
            error: function (error)             
            {
              alert(error);
            }
        });
    }



function getFileBuffer(uploadFile) {  
    var deferred = jQuery.Deferred();  
    var reader = new FileReader();  
    reader.onloadend = function(e) {  
        deferred.resolve(e.target.result);  
    }  
    reader.onerror = function(e) {  
        deferred.reject(e.target.error);  
    }  
    reader.readAsArrayBuffer(uploadFile);  
    return deferred.promise();  
}  



function uploadFileToFolder(fileObj, url, success, failure) {  
    var apiUrl = url;  
    // Initiate method calls using jQuery promises.  
    // Get the local file as an array buffer.  
    var getFile = getFileBuffer(fileObj);  
    // Add the file to the SharePoint folder.  
    getFile.done(function(arrayBuffer) {  
        $.ajax({  
            url: apiUrl,//File Collection Endpoint  
            type: "POST",  
            data: arrayBuffer,  
            processData: false,  
            async: false,  
            headers: {  
                "accept": "application/json;odata=verbose",  
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),  
            },  
            success: function(data) {  
                success(data);  
            },  
            error: function(data) {  
               success(data);  
            }  
        });  
    });  
}

var G_MediaRecord=0;
function GetDataforModel(RecId)
{
	G_MediaRecord = RecId;
	$(".Data-view-tab").removeClass( "in" );
	$(".Data-view-tab").removeClass( "active" );
	$("#commentsAnncmnt").addClass( "in");
	$("#commentsAnncmnt").addClass( "active" );

	
	var requestUri = siteURL+"/_api/web/lists/getByTitle('MediaGallery')/items?$select=*,Author/EMail,Author/Title,EncodedAbsUrl&$expand=Author&$filter=Id eq '"+RecId+"'";
	var requestHeaders = { "accept": "application/json;odata=verbose" }
	$.ajax({
    	url: requestUri,
    	type: 'GET',
    	dataType: 'json',
    	async:false,
    	headers: requestHeaders,
    	success: function (data) 
    	{          	   
			var path = data.d.results[0].EncodedAbsUrl;
			var recImage=path.split('.');

			recImage=recImage[recImage.length-1]
			recImage.toLowerCase();

			var HTML4Model ='';
			var WeightDesign='';
			if(recImage=='jpg' || recImage=='jpeg' || recImage=='gif' || recImage=='png' || recImage=='bmp')
		    {
		    	HTML4Model +='<img src="'+path+'" alt="album bg"></a>';
		    	WeightDesign = "Size: <span>"+data.d.results[0].ImageWidth+" KB</span>";
		    }
		    else
		    {
		      	HTML4Model +='<video class="video-box" width="100%" height="100%" controls><source src="'+path+'" type="video/mp4"></video>'
		      	// HTML4Model +='<div class="play-icon"><i class="fa fa-play"></i></div></a>'
		      	WeightDesign = "Duration: <span>"+data.d.results[0].MediaLengthInSeconds+" Seconds</span>";

			}
			
			$('#PushModelDesign').empty().append(HTML4Model)
			$("#Weight4Doc").empty().append(WeightDesign);
			var date =new Date(data.d.results[0].Created)
			var publishingDate=$.datepicker.formatDate('MM dd, yy',date)
			$('#DocDate').text(publishingDate);

			//$('#DocDate').text(moment(data.d.results[0].Created).format('MM dd, yy'));
			//$('#RecWeight').text(data.d.results[0].ImageWidth+" KB");
			$("#AothName").text(data.d.results[0].Author.Title);
			$("#AothEmail").text(data.d.results[0].Author.EMail);
			var AuthImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + data.d.results[0].Author.EMail//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                //AuthPhoto	
            $('#AuthPhoto').attr('src', AuthImage);

			GetCountsLikesViewsComments();
			GetAnnComments("PageLoad", '');
   	        AddViewCount();
   	        
   	        //GetEmpInfo(data.d.results[0].Author.EMail);    	   
	    },
    	error: function ajaxError(response)
    	{
    	    alert(response.status + ' ' + response.statusText);
    	}
	});      
}


function GetEmpInfo(LogonEmail)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$filter=LogonName/EMail eq ('"+ LogonEmail +"') and PrimaryCompany eq 'Primary'&$select=*,LogonName/EMail,LogonName/Title,Department/Title,AttachmentFiles&$expand=AttachmentFiles,LogonName,Department";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data){ 
			 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
				$("#AothName").text(items[0].LogonName.Title);
				$("#AothDesignation").text(items[0].Designation);
				$("#AothDept").text(items[0].Department.Title);
				$("#AothEmail").text(items[0].LogonName.EMail);
				var AuthImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + items[0].LogonName.EMail//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                //AuthPhoto	
                $('#AuthPhoto').attr('src', AuthImage);
			
            }  
  
        },
			error: function (data) 
			{  
        		alert("An error occurred. Please try again.");  
			}  
    });	
}

function AddViewCount() {
	var Type = "MediaGallery"
	var ItemId = G_MediaRecord;
    var Query = "$expand=Author&$select=*,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"' and (Views eq 'Yes' or Views eq 'No'))";
    var FilterResult = getdata(Query);
    
    Employeeprofilepic = currentUserProfileData[0].ProfilePic;
    if(FilterResult.length>0)
    {
        if(FilterResult[0].Views == "No")
        {
            var listName="MediaContactCenter";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'Views':'Yes','ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
            var Res = UniversalUpdate(listName,item,FilterResult[0].ID);
            GetCountsLikesViewsComments();    	
        }    
    }
    else if(FilterResult.length == 0)
    {
        var listName="MediaContactCenter";
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'Views':'Yes','ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        Universalinsert(listName,item); 
        $("#TotalHits").text(parseInt($("#TotalHits").text()) + 1);
        GetCountsLikesViewsComments();   
    }
    
}



function getdata(Query)
{
    var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
			
            ResultItems = data.d.results;  
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
    return ResultItems;
}


function UniversalUpdate(listName,item,dataid)  
{
    var Responce="";
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
        type: "POST",  
        async:false,
        data: JSON.stringify(item),         
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data)
        { 	
            console.log(data);
            Responce = data;
        },  
        error: function(data) 
        {  
            Responce=data;
            console.log(data);      	
            alert ("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }  
    }); 
    return Responce;    
}


function Universalinsert(listName,item,ControlID) 
{
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers: 
		{
		    "Accept": "application/json;odata=verbose",
		    "X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
        success: function (data) 
        { 	
            if(FinalFiles4Upload.length>0)
            {
                uploadattachment(data.d.ID);
            }
            else if(ControlID == undefined)
            {
				
            }
            else
            {
                AutoRefreshComments('GetAll', 'Logged_InUser');
                $('.emojionearea-editor').empty();
                $("#replyTextarea").hide();
            	$("#NewAttachmentFiles").empty();
                FinalFiles4Upload=[];
                inputFile.val('');
            	finalFiles = [];
            }
        },
        error: function (data) { console.log(data); }
    });
}


//get all the users info who viewed the post
function getViewedUsers() {
	
	$(".Data-view-tab").removeClass( "in" );
	$(".Data-view-tab").removeClass( "active" );
	$("#viewsAnncmnt").addClass( "in");
	$("#viewsAnncmnt").addClass( "active" );
    var Html_Design = '';
    var Type = "MediaGallery"
	var ItemId = G_MediaRecord;
    var Query = "$filter= WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"' and Views eq 'Yes' &$select=UserImage,ViewsBy/Title,ViewsBy/EMail,ViewsBy/ID&$expand=ViewsBy";
    var QueryResult = getdata(Query);
    $("#ViewHitList").html("");
    $("#TotalHitsMedia").text(QueryResult.length);
    if(QueryResult.length>0){
        for(var i=0; i<QueryResult.length; i++)
        {
            Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+QueryResult[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+QueryResult[i].ViewsBy.Title+"</h4>"+
										"</div>"+
										"</li>";
        }
        $("#ViewHitListMedia").empty().append(Html_Design);
    }
    else {
        Html_Design = Html_Design + "<li class='likes-box'>" +
                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
                                           "<h4>No users viewed!!</h4>"+
                                           "</div>"+
                                           "</li>";
        $("#ViewHitListMedia").empty().append(Html_Design);
    }
}


function TriggerLikes()
{	
	var Type = "MediaGallery"
	var ItemId = G_MediaRecord;
    var Query = "$filter= (AuthorId eq ('"+_spPageContextInfo.userId+"') and WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"') and (Like eq 'Yes' or Like eq 'No')&$top=1";
    var QueryResult = getdata(Query);
    Employeeprofilepic = currentUserProfileData[0].ProfilePic;
    if(QueryResult[0].Like == "No")
    {
        var listName="MediaContactCenter";		
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'Like':'Yes','LikeById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        var Res = UniversalUpdate(listName,item,QueryResult[0].ID);    
    }
    else if(QueryResult[0].Like == "Yes")
    {
        var listName="MediaContactCenter";		
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'Like':'No','LikeById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        var Res = UniversalUpdate(listName,item,QueryResult[0].ID);
    }
    if($(".like-img").attr("src") == "../SiteAssets/Biography/Experience/assets/images/like-icon.png"){
        $('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        $("#TotalLikes").text(parseInt($("#TotalLikes").text()) + 1);
    }
    else {
        $('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png");
        $("#TotalLikes").text(parseInt($("#TotalLikes").text()) - 1);
    }
    if($("#likes").hasClass("active") == true){
    	$('#TotalLikes').trigger('click');
    }
    GetCountsLikesViewsComments();
}


//get all the users info who liked the post
function getLikedUsers() {
    var Html_Design = '';
    var Type = "MediaGallery"
var ItemId = G_MediaRecord;
    var Query = "$filter=  WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"' and Like eq 'Yes' &$select=UserImage,LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";;
    var QueryResult = getdata(Query);
    $("#LikeshitlistMedia").html("");
    $("#TotalLikesMedia").text(QueryResult.length);
    if(QueryResult.length>0){
        for(var i=0; i<QueryResult.length; i++)
        {
        	if(QueryResult[i].LikeBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
        		$('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        	}
            Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+QueryResult[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+QueryResult[i].LikeBy.Title+"</h4>"+
										"</div>"+
										"</li>";
        }
        $("#LikeshitlistMedia").append(Html_Design);
    }
    else {
        $('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png");
        Html_Design = Html_Design + "<li class='likes-box'>" +
                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
                                           "<h4>No users liked!!</h4>"+
                                           "</div>"+
                                           "</li>";
        $("#LikeshitlistMedia").append(Html_Design);
    }
}


var CommentTypeMedia = "Parent";
function PushAnnRootComment() {
    var comment = $(".emojionearea-editor").html();
    comment = comment.trim();
    var listName = "MediaContactCenter";
    var ItemId = G_MediaRecord;
    var userid = _spPageContextInfo.userId;
    var Type = "MediaGallery";
    if (comment != "") {
        if (CommentTypeMedia == "Parent") {
            //var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': AnnItemID, 'WebPartName': 'MediaGallery', 'ReplierId': parseInt(_spPageContextInfo.userId), 'Comment': $(".emojionearea-editor").html(), 'Initials': "Parent", 'ReplyforId': parseInt(_spPageContextInfo.userId), 'UserImage': currentUserProfileData[0].ProfilePic };
              var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'ReplierId':parseInt(userid),'Comment':$(".emojionearea-editor").html(),'Initials':"Parent",'ReplyforId':parseInt(userid),'UserImage':Employeeprofilepic};
            AnnouncmntInsert(listName, item, '0');
        }
        else if (CommentTypeMedia == "Reply") {
           //var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': AnnItemID, 'WebPartName': 'MediaGallery', 'ReplierId': parseInt(_spPageContextInfo.userId), 'Comment': $(".emojionearea-editor").html(), 'Initials': "Reply", 'ReplyTo': $("#replyforuserAnncmnt").text(), 'ReplyAgainst': $("#ReplyforMsgAnncmnt").attr('value'), 'UserImage': currentUserProfileData[0].ProfilePic };
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':ItemId.toString(),'CompanyIdId':Logged_CompanyId,'WebPartName':Type,'ReplierId':parseInt(userid),'Comment':$(".emojionearea-editor").html(),'Initials':"Reply",'ReplyTo':$("#replyforuserAnncmnt").text(),'ReplyAgainst':$("#ReplyforMsgAnncmnt").attr('value'),'UserImage':Employeeprofilepic};
            AnnouncmntInsert(listName, item, '0');
            CommentTypeMedia = "Parent";
        }
        else if (CommentTypeMedia == "Modify") {
            UpdateEditAnnComment(ModifyAnnRecId);
        }
        $('#hideCommentScrollAnncmnt').scrollTop($('#reply_areaAnncmnt')[0].scrollHeight);
    }
    else {
        alert("Please type a message to continue.");
    }
}


function AnnouncmntInsert(listName, item, ControlID) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers:
		{
		    "Accept": "application/json;odata=verbose",
		    "X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
        success: function (data) {
            if (FinalFiles4Upload.length > 0) {
				uploadattachmentAnn(data.d.ID);            
			}
            else if (ControlID == undefined) {

            }
            else {
                AutoRefreshAnnComments('GetAll', 'Logged_InUser');
	            Files4UploadAnn = [];
	            $('.emojionearea-editor').empty();
	            $("#replyTextareaAnncmnt").hide();
	            $("#NewAttachmentFilesAnncmnt").empty();
	            //inputFileAnn.val('');
	            finalFilesAnn = [];

            }
        },
        error: function (data) { console.log(data); }
    });
}

//Update Like/View/Chat-Msg in list for Alert/Announcement chatting
function AnnouncmntUpdate(listName, item, dataid) {
    var Responce = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + dataid + "')",
        type: "POST",
        async: false,
        data: JSON.stringify(item),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            console.log("Done");
            Responce = data;
        },
        error: function (data) {
            Responce = data;
            console.log(data);
            alert("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }
    });
    return Responce;
}

//upload attachment in Alert/Announcement chatting
var xRequestDigest = $("#__REQUESTDIGEST").val();
function uploadattachmentAnn(id, ControlID) {
    var counter = 0;
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBufferAnn(value).then(function (buffer) {
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (FinalFiles4Upload.length == counter) {
                            AutoRefreshAnnComments('GetAll', 'Logged_InUser');
				            Files4UploadAnn = [];
				            $('.emojionearea-editor').empty();
				            $("#replyTextareaAnncmnt").hide();
				            $("#NewAttachmentFilesAnncmnt").empty();
				            //inputFileAnn.val('');
				            finalFilesAnn = [];
                        }
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
    else {
        //GetComments('', "Logged_InUser");
    }
}

var getFileBufferAnn = function (Files4UploadAnn) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(Files4UploadAnn);
    return deferred.promise();
};


function AutoRefreshAnnComments(Action, Source) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('MediaContactCenter')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=50&$skipToken=Paged=TRUE%26p_ID=" + getLatestAnnId + "&$filter= (WebPartName eq 'MediaGallery' and Item_ID eq '"+G_MediaRecord+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = ExecuteAnnFilter(Ownurl, Action, Source);
}

function GetAnnComments(Action, Source) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('MediaContactCenter')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=50&$filter= (WebPartName eq 'MediaGallery' and Item_ID eq '" + G_MediaRecord+ "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = ExecuteAnnFilter(Ownurl, Action, Source);
}

function ExecuteAnnFilter(_query, Action, Source) {
    AnnResponse = [];
    var tempURL = '';
    if (_query.indexOf("$skipToken") != -1) {
        tempURL = _query;
    }
    else {
        AnncmntURL = tempURL = _query;
    }
    ReadAnnComment(Action, Source, tempURL, '');
}
var AnncmntURL = '';
function ReadAnnComment(Action, Source, URL, IsViewMore) 
{
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {	
            CommentTypeMedia == "Parent";
            AnnResponse= AnnResponse.concat(data.d.results);
            AnnResponse.sort((a, b) => a.ID - b.ID);                      
            if(AnnResponse.length > 0){ 
                if(getLatestAnnId != AnnResponse[(AnnResponse.length -1)].Id && Action == "GetAll" && $("#hideCommentScrollAnncmnt").scrollTop() < -5 && Source != "Logged_InUser") {
                    $("#ToastPopupAnn").show();
                }
                if(IsViewMore != "ViewMore"){
                    getLatestAnnId = AnnResponse[(AnnResponse.length -1)].Id;  
                }
            }     
            if(AnnResponse.length>0)
            {      
                if(URL.indexOf("$skipToken") != -1) {
                    //'skiptoken' substring found
                    DesignAnnChatting(AnnResponse, 'refreshMode');
                }
                else {
                    //no 'skiptoken' substring
                    DesignAnnChatting(AnnResponse, '');
                }
            }
            else
            {
                //$("#CommentsData").empty();
            }

            if (data.d.__next) 
            {
                AnncmntURL = data.d.__next;
                $("#seemorebtnGeneralAnncmnt").css("display", "block");
            }
            else 
            {
                if(URL.indexOf("$skipToken") == -1) {
                    $("#seemorebtnGeneralAnncmnt").css("display", "none");
                }
            }
            if(Action != "PageLoad"){
                //GetTotalAnnComments(Action);
            }
            if(AnnResponse.length==0)
	{
		$("#CommentsAreaAnncmnt").empty();
	}
            AnnResponse = [];
        },
        error: function (data) 
        {
            console.log(data);
        }
    });
}

function GetTotalAnnComments(Action)
{
    if(Action == "GetAll"){
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('MediaContactCenter')/Items?$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=ID asc&$top=5000&$filter= (WebPartName eq 'MediaGallery' and Item_ID eq '"+G_MediaRecord+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    else {
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('MediaContactCenter')/Items?$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=ID asc&$top=50&$filter= (WebPartName eq 'MediaGallery' and Item_ID eq '"+G_MediaRecord+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $("#TotalCommentsAnncmnt").text(Items.length);
            }
            else
            {
                $("#TotalCommentsAnncmnt").text("0");    		
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}


function DesignAnnChatting(QueryResult, Mode)
{
	GetCountsLikesViewsComments();
    var Commenthtmldesign='';
    var Attachmnetlist=[];
    var AttachmnetIDs=[];
    var CommentLikeValue = 'Like';
    for(var i=0; i<QueryResult.length; i++)
    {
        var likesCount = QueryResult[i].LikeCount;
        var DisplayLikeDiv = "inline-block";
        if(likesCount == null || likesCount == '0')
        {
            likesCount = 0;
            DisplayLikeDiv = "none";
        }
        else
        {
            likesCount = QueryResult[i].LikeCount;
            DisplayLikeDiv = "inline-block";
        }
        if(Mode != "refreshMode"){
            CommentLikeValue = checkLikeAnnCommentUser(QueryResult[i].Id);
        }
        var eventDateObj=new Date(QueryResult[i].Created);
        var Event_time = eventDateObj.toTimeString();
        var H = +Event_time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        Event_time= h + Event_time.substr(2, 3) + ampm;	
        if(AnnResponse[i].Initials == "Parent")
        {			
            if(_spPageContextInfo.userEmail.toLowerCase() == AnnResponse[i].Author.EMail.toLowerCase())
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>"+
	                      									"<span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span>"+
	                    								"</div>"+
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
	                      									"<div>"+
	                        									"<div id='editMenuOpen2' class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        									"</div>"+
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          										"<li><a type='button' onclick='EditAnnComment("+QueryResult[i].ID+")'>Edit</a></li>"+
	                          										"<li><a type='button' class='logout' onclick='DeleteAnnComments("+QueryResult[i].ID+")' >Delete</a></li>"+
	                        									"</ul>"+
	                      									"</div>"+
	                      									"<div class='my-chat-edit-delete-panel-inside' id='CommentTextAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Comment+"</div>"+
	                    								"</h4>"+
	                    								"<div class='col-md-12 col-sm-12 p0'>"+
	                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      									"</div>"+
	                    								"</div>"+
	                    								"<div class='clearfix'></div>"+
	                  								"</div>";
            }
            else
            {
                Commenthtmldesign = Commenthtmldesign +	"<div class='col-md-12 col-sm-12 reply-box-ext' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='"+QueryResult[i].UserImage+"' class='img-circle chat-user-image' width='30' height='30' data-themekey='#'></span><span class='b-500' id='UsernameAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Author.Title+"</span><span class='pl5 pr5'>-</span><span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span> </div>"+
	                    									"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
	                      										"<div class='mt-4 my-chat-edit-delete-panel-inside' id='CommentTextAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Comment+"</div>"+
	                      											"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          											"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        										"</div>"+
	                        										"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          											"<li><button id='messageEdit' type='button' class='btn LikeCmntAnn"+QueryResult[i].ID+"' data-toggle='collapse' data-target='#messageReplyBox' aria-expanded='false' onclick='PushlikeforAnnComment("+QueryResult[i].ID+")'>"+CommentLikeValue+"</button></li>"+
	                          											"<li><a class='logout' onclick='ActiveAnnReplyCtrl("+QueryResult[i].ID+")'>Reply</a></li>"+
	                        										"</ul>"+
	                    									"</h4>"+
	                    									"<div class='col-md-12 col-sm-12 p0'>"+
	                      										"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      										"</div>"+
	                    									"</div>"+
	                    									"<div class='clearfix'></div>"+
														"</div>";		
            }
        }
        else if(AnnResponse[i].Initials == "Reply")
        {
            if(_spPageContextInfo.userEmail.toLowerCase() == AnnResponse[i].Author.EMail.toLowerCase())
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>"+
	                      									"<span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span>"+
	                    								"</div>"+
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel others-reply-text-box'>"+
	                      									"<div class='reply-text-line'>"+
	                        									"<a href='#' class='comment-reply-user-name-info'>@<span >"+AnnResponse[i].ReplyTo+"</span> :</a>"+
	                        									"<span class='replymsgAnn'>"+AnnResponse[i].ReplyAgainst+"</span>"+
	                        									"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        									"</div>"+
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          										"<li><a type='button' onclick='EditAnnComment("+QueryResult[i].ID+")'>Edit</a></li>"+
	                          										"<li><a class='logout' onclick='DeleteAnnComments("+QueryResult[i].ID+")'>Delete</a></li>"+
	                        									"</ul>"+
	                      									"</div>"+
	                      									"<div class='mt-14'>"+
	                        									"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentTextAnn"+QueryResult[i].ID+"'>"+
	                          										""+AnnResponse[i].Comment+""+
	                        									"</div>"+
	                      									"</div>"+
	                    								"</h4>"+
	                    								"<div class='col-md-12 col-sm-12 p0'>"+
	                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      									"</div>"+
	                    								"</div>"+
	                    								"<div class='clearfix'></div>"+
	                  								"</div>";		
		
            }
            else
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext'>"+
		                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='"+QueryResult[i].UserImage+"' class='img-circle chat-user-image' width='30' height='30'></span> <span class='b-500' id='UsernameAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Author.Title+"</span><span class='pl5 pr5'>-</span><span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span> </div>"+
		                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
		                      									"<div class='reply-text-line'><a href='javascript:void(0);' class='comment-reply-user-name-info'>@<span >"+AnnResponse[i].ReplyTo+"</span> :</a><span class='replymsgAnn'>"+AnnResponse[i].ReplyAgainst+"</span>"+
		                      										"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
		                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz'>"+
		                        									"</div>"+
		                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
		                          										"<li><a type='button' class='LikeCmntAnn"+QueryResult[i].ID+"' onclick='PushlikeforAnnComment("+QueryResult[i].ID+")'>"+CommentLikeValue+"</a></li>"+
		                          										"<li><a type='button' onclick='ActiveAnnReplyCtrl("+QueryResult[i].ID+")'>Reply</a></li>"+
		                        									"</ul>"+
		                        								"</div>"+
		                        								"<div class='mt-14'>"+
			                        								"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentTextAnn"+QueryResult[i].ID+"'>"+
			                          									""+AnnResponse[i].Comment+""+
			                        								"</div>"+
		                      									"</div>"+
		                    								"</h4>"+
		                    								"<div class='col-md-12 col-sm-12 p0'>"+
		                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
		                      									"</div>"+
		                    								"</div>"+
		                    								"<div class='clearfix'></div>"+
	                  									"</div>";					  
			
            }
        }
		
        if(QueryResult[i].AttachmentFiles.results.length>0)
        {
            AttachmnetIDs.push(QueryResult[i].ID);
            for(var j=0; j<QueryResult[i].AttachmentFiles.results.length; j++)
            {
                Attachmnetlist.push({
                    RecordId: QueryResult[i].ID,
                    FileName: QueryResult[i].AttachmentFiles.results[j].FileName,
                    ServerRelativeUrl: QueryResult[i].AttachmentFiles.results[j].ServerRelativeUrl,
                });
            }		
        }
	
    }
    //$("#CommentsArea").empty();
    
    if(Mode == "refreshMode"){
        $("#CommentsAreaAnncmnt").append(Commenthtmldesign);
    }
    else {
        $("#CommentsAreaAnncmnt").empty().append(Commenthtmldesign);
    }
    for(var k=0; k<AttachmnetIDs.length; k++)
    {	var RecId= AttachmnetIDs[k];
        var FilterResult = $.grep(Attachmnetlist, function(e){ return e.RecordId == AttachmnetIDs[k]; });
        var Attachmentdesign='';
        $("#AttachmentlistAnn"+RecId).empty();
        for(var p=0; p<FilterResult.length; p++)
        {
            if(FilterResult[p].FileName.indexOf("docx") != -1){
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
            else if(FilterResult[p].FileName.indexOf("pdf") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
            else if(FilterResult[p].FileName.indexOf("xlsx") != -1 || FilterResult[p].FileName.indexOf("csv") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }

            else if(FilterResult[p].FileName.indexOf("jpg") != -1 || FilterResult[p].FileName.indexOf("jpeg") != -1 || FilterResult[p].FileName.indexOf("JPEG") != -1 || FilterResult[p].FileName.indexOf("png") != -1 || FilterResult[p].FileName.indexOf("PNG") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" +FilterResult[p].ServerRelativeUrl+ "' title="+FilterResult[p].FileName+" onclick='previewImage(this);'></img></div>";		
            }
						
            else {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
        }
        
        $("#AttachmentlistAnn"+RecId).append(Attachmentdesign);
    }
	
    $(".countInnerLikes").click(function(){
        $("#showInnerLikesAnncmnt").toggleClass("show-inner-likes-box-hide");
    });
}


function formatDateComment(d) 
{
    var date = new Date(d);
    if ( isNaN( date .getTime())){ return d; }
    else
    {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        day = date.getDate();
        if(day < 10){day = "0"+day; }
        return    day  + " " +month[date.getMonth()];
    }
}


function checkLikeAnnCommentUser(RecId)
{
    var textValue = "Like";
    //var Query = "$filter= WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"'  &$select=UserImage,Author/Title,Author/Id&$expand=Author";
    var Query = "$filter= WebPartName eq 'MediaGallery' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"' and Author/EMail eq '"+_spPageContextInfo.userEmail+"' &$select=UserImage,Author/Title,Author/Id,Author/EMail&$expand=Author";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                textValue = "Unlike";
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
    return textValue;
}
$(function() {

inputFileAnn.on('change', function (e) {
        Files4UploadAnn = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            finalFilesAnn[finalFilesAnn.length] = elm;
        });

        RemoveDuplicateAnn = [];
        var arr = finalFilesAnn.filter(function (el) {
            if (RemoveDuplicateAnn.indexOf(el.name) == -1) {
                RemoveDuplicateAnn.push(el.name);
                return true;
            }
            return false;
        });

        Files4UploadAnn = ReinitializeAnnArray(arr);
        $('#NewAttachmentFilesAnncmnt').empty();
        var ChangedfileName = '';

        for (initial; initial < Files4UploadAnn.length; initial++) {
            if (RemoveDuplicateAnn[initial].length > 15) {
                ChangedfileName = RemoveDuplicateAnn[initial].substring(0, 15) + "...";
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicateAnn[initial] + '" id="file_' + TcounterAnn + '"> <span class="comment-box-chip-text-box">' + ChangedfileName + ' </span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeAnnLine(this.id);" id="file_' + TcounterAnn + '"" title="remove"></span></div>');
            }
            else {
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicateAnn[initial] + '" id="file_' + TcounterAnn + '"> <span class="comment-box-chip-text-box">' + RemoveDuplicateAnn[initial] + '</span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeAnnLine(this.id);" id="file_' + TcounterAnn + '"" title="remove"></span></div>');
            }
            TcounterAnn = TcounterAnn + 1;
        }
        inputFileAnn.val('');
    });
})



var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles = [];
var FinalFiles4Upload=[];
var Tcounter = 0;
var RemoveDuplicate = [];

$(function() {
    $("#AnnoncmntUpload").on('change', function(e) {
        FinalFiles4Upload =[];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files,function(idx,elm){
            finalFiles[finalFiles.length]=elm;
        });

        RemoveDuplicate = [];
        var arr = finalFiles.filter(function(el) {
            if (RemoveDuplicate.indexOf(el.name) == -1) 
            {
                RemoveDuplicate.push(el.name);
                return true;
            }
            return false;
        });
		
        FinalFiles4Upload = ReinitializeArray(arr);
        $('.NewSelectedAttachment').empty();
        $('#NewAttachmentFilesAnncmnt').empty();
        var ChangedfileName = '';
	
        for (initial; initial < FinalFiles4Upload.length; initial++)
        {
            if(RemoveDuplicate[initial].length > 15)
            {
                ChangedfileName = RemoveDuplicate[initial].substring(0,15) + "...";
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicate[initial] + '" id="file_'+ Tcounter +'"><span class="comment-box-chip-text-box">' + ChangedfileName + '</span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_'+ Tcounter +'"" title="remove"></span></div>');
            }
            else
            {
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicate[initial] + '" id="file_'+ Tcounter +'"><span class="comment-box-chip-text-box">' + RemoveDuplicate[initial] + '</span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_'+ Tcounter +'"" title="remove"></span></div>');
            }
            Tcounter = Tcounter + 1;
        }
        $("#ContactcenterAttachment").val('');
    });
})


function removeLine(id)
{
    var index = id.split('_')[1];
    $("#"+id).remove();
    delete finalFiles[parseInt(index)]; 
    RemoveDuplicate = [];
    var arr = finalFiles.filter(function(el) {
        if (RemoveDuplicate.indexOf(el.name) == -1) {
            RemoveDuplicate.push(el.name);
            return true;
        }
        return false;
    });
    FinalFiles4Upload = ReinitializeArray(arr);
    if(arr.length == 0) {
        inputFile.val('');
    }
}


function ReinitializeArray(arr) 
{
    var newArr = [];
    var count = 0;
    for (var i=0; i<arr.length; i++) 
    {
        newArr[count++] = arr[i];
    }
    return newArr;	
}



function DeleteAttachment(ItemId,filename) 
{
    var Dfd = $.Deferred();
    var dataID = ItemId.split("-");
    var DocumentName =$("#"+ItemId).attr('value');
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ContactCenter')/GetItemById(" + dataID[0]+ ")/AttachmentFiles/getByFileName('" + DocumentName+ "')  ";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) 
        {
            Dfd.resolve(data);
            $("."+ItemId).hide();
            $("#"+ItemId).hide();            
            //TotalCommentsCounts=[];
            //GetTotalComments();          
        },
        error: function (data) 
        {
            Dfd.reject(JSON.stringify(error));
            console.log("Error in DeleteAttachment.");
        	console.log(data);	
        }
    });
    return Dfd.promise();
}


function EditAnnComment(RecID)
{
    CommentTypeMedia ="Modify";
    ModifyAnnRecId = RecID;
    var Query = "$filter=ID eq '"+RecID+"'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $('.emojionearea-editor').html(Items[0].Comment);
                $("#oldfilenameAnncmnt").empty(); 
                if(Items[0].AttachmentFiles.results.length>0)
                {
                    var AttachmentDesign ='';
                    for(var y=0; y<Items[0].AttachmentFiles.results.length; y++)
                    {
                        AttachmentDesign = AttachmentDesign +"<div class='comment-upload-chip "+Items[0].ID+"-"+y+"'><span class='attachment-badge-name comment-box-chip-text-box'><a onclick='previewfile(this);' href='javascript:void(0)' name='" +Items[0].AttachmentFiles.results[y].ServerRelativeUrl+ "'><span>"+Items[0].AttachmentFiles.results[y].FileName+"</span></a></span><span class='Closebtn' id='ClosebtnAnn"+Items[0].ID+"'><i class='fa fa-close "+Items[0].ID+"' style='color:red;' id='"+Items[0].ID+"-"+y+"' value='"+Items[0].AttachmentFiles.results[y].FileName+"' onclick='DeleteAnnAttachment(this.id)'></i></span></div>";    	
                    }
                    $("#oldfilenameAnncmnt").append(AttachmentDesign); 
                } 	
            }
            else
            {
                $('.emojionearea-editor').empty();    		
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}


function UpdateEditAnnComment(RecID) {
    var Comment = $(".emojionearea-editor").html();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MediaContactCenter')/items(" + RecID + ")",
        type: "POST",
        async: false,
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.MediaContactCenterListItem"
            },
            Comment: Comment,
            CompanyIdId:Logged_CompanyId
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data, status, xhr) {
            if (FinalFiles4Upload.length > 0) 
            {
                EditAnnAttachment(RecID);
            }
            else 
            {
                RetriveAnnUpdateData(RecID);
                FinalFiles4Upload= [];
                $("#CommentTextAnn" + RecID).html($(".emojionearea-editor").html());
            	CommentTypeMedia = "Parent";
            	$("#NewAttachmentFilesAnncmnt").empty();
            	//FinalFiles4Upload= [];
            	$("#oldfilenameAnncmnt").empty();
            	$('.emojionearea-editor').empty();
            }            
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function EditAnnAttachment(id) {
    var xRequestDigest = $("#__REQUESTDIGEST").val();
    var counter = 0;
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBufferAnn(value).then(function (buffer) {
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (counter == FinalFiles4Upload.length) {
                            RetriveAnnUpdateData(id);
                            FinalFiles4Upload= [];
                            FinalFiles4Upload= [];
                			//$("#CommentTextAnn" + RecID).html($(".emojionearea-editor").html());
            				CommentTypeMedia = "Parent";
            				$("#NewAttachmentFilesAnncmnt").empty();
            				//FinalFiles4Upload= [];
            				$("#oldfilenameAnncmnt").empty();
            				$('.emojionearea-editor').empty();

                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });
        });
    }
}

function RetriveAnnUpdateData(RecID) {
    var Query = "$filter=ID eq '" + RecID + "'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?" + Query + "";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var Items = "";
            Items = data.d.results;
            if (Items.length > 0) {
                $('#CommentTextAnn' + Items[0].ID).html(Items[0].Comment);
                $("#AttachmentlistAnn" + Items[0].ID).empty();
                if (Items[0].AttachmentFiles.results.length > 0) {
                    var Attachmentdesign = '';
                    for (var y = 0; y < Items[0].AttachmentFiles.results.length; y++) {

                        if (Items[0].AttachmentFiles.results[y].FileName.indexOf("docx") != -1) {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                        }
                        else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("pdf") != -1) {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                        }
                        else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("xlsx") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("csv") != -1) {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                        }
                        else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("jpg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("jpeg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("JPEG") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("png") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("PNG") != -1) {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' title=" + Items[0].AttachmentFiles.results[y].FileName + " onclick='previewImage(this);'></img></div>";
                        }
                        else {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                        }
                    }
                    $("#AttachmentlistAnn" + Items[0].ID).append(Attachmentdesign);
                }
            }
        },
        error: function (data) {
            console.log("An error occurred. Please try again.");
        }
    });
}


function DeleteAnnComments(RecordID)
{
    if (confirm('Are you sure to delete this comment ?')) 
    {
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MediaContactCenter')/items("+RecordID+")",  
            type: "POST",
            async: true,  
            headers:  
        	{  
        	    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        	    "IF-MATCH": "*",  
        	    "X-HTTP-Method": "DELETE"  
        	},  
            success: function(data, status, xhr)  
            {  
                $('#CommentDivRecNoAnn'+RecordID).hide();
                GetCountsLikesViewsComments();           	  
            },  
            error: function(xhr, status, error)  
            {  
                console.log(xhr.responseText);  
            }  
        });  
    } 
}


function GetCountsLikesViewsComments()
{debugger
	var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?$filter=Item_ID eq '"+G_MediaRecord+"'";  
    $.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
	async:true,  
	success: function (data) 
	{ 			
		ResultItems = data.d.results;
		if(ResultItems.length>0)
		{
			var PostLikesCount = $.grep(ResultItems, function(e){ return e.Like == 'Yes'; });
			$("#TotalLikesMedia").text(PostLikesCount.length);
			$('#like'+G_MediaRecord).text(PostLikesCount.length);
			var PostViewsCount = $.grep(ResultItems, function(e){ return e.Views == 'Yes'; });
            $("#TotalHitsMedia").text(PostViewsCount.length);
            $('#view'+G_MediaRecord).text(PostViewsCount.length);
            var PostCommentsCount = $.grep(ResultItems, function(e){ return e.Initials == 'Parent' || e.Initials == 'Reply'; });
            $("#TotalCommentsAnncmnt").text(PostCommentsCount.length);
            $('#Comment'+G_MediaRecord).text(PostCommentsCount.length);
		}
		else
		{
			$("#TotalLikesMedia").text('0');
			$("#TotalHitsMedia").text('0');
			$("#TotalCommentsAnncmnt").text('0');
		}
	},
    error: function (data) 
    {  
    	alert("An error occurred. Please try again.");  
    }  
	});
    return ResultItems;
}


function ActiveAnnReplyCtrl(ControlId)
{
    CommentTypeMedia = "Reply";
    $("#replyforuserAnncmnt").text($("#UsernameAnn"+ControlId).text());
    var Query = "$filter=ID eq '"+ControlId+"'&$select=*";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $("#ReplyforMsgAnncmnt").html(Items[0].Comment);
                $("#ReplyforMsgAnncmnt").attr('value', Items[0].Comment);    	
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
    $("#replyTextareaAnncmnt").show();
}


function PushlikeforAnnComment(RecordID)
{
    var Query = "?$top=5000&$filter= (AuthorId eq ('"+_spPageContextInfo.userId+"') and WebPartName eq 'MediaGallery' and LikeCommentID eq '"+RecordID+"') and (LikeComment eq 'Yes' or LikeComment eq 'No')";
    var dfds = $.Deferred(),
		url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items" + Query;
    var QueryResult = getAllRecords(url, dfds);
    
    AnnResponse = [];
    if(QueryResult.length>0)
    {
        if(QueryResult[0].LikeComment == "No")
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
            if(parseInt(OldLikes)+1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Unlike");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
                
            }

            var listName="MediaContactCenter";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'Yes','CompanyIdId':Logged_CompanyId,'UserImage':currentUserProfileData[0].ProfilePic};
            AnnouncmntUpdate(listName,item,QueryResult[0].ID);
        }
        else if(QueryResult[0].LikeComment == "Yes")
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)-1);
            if(parseInt(OldLikes)-1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }

            var listName="MediaContactCenter";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'No','CompanyIdId':Logged_CompanyId,'UserImage':currentUserProfileData[0].ProfilePic };
            var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);   
        }
        else if(QueryResult[0].LikeComment == null)
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
            if(parseInt(OldLikes)+1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Unlike");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }

            var listName="MediaContactCenter";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'Yes','CompanyIdId':Logged_CompanyId,'UserImage':currentUserProfileData[0].ProfilePic};
            var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);  
        }
    }
    else
    {	
        var OldLikes = $("#LikesCountAnn"+RecordID).text();
        $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
        if(parseInt(OldLikes)+1>0)
        {
            $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
            $(".LikeCmntAnn"+RecordID).text("Unlike");
        }
        else
        {			
            $("#LikeSpanAnn"+RecordID).css("display", "none");
            $(".LikeCmntAnn"+RecordID).text("Like");
        }

        var listName="MediaContactCenter";
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':G_MediaRecord.toString(),'WebPartName':'MediaGallery','LikeComment':'Yes','CompanyIdId':Logged_CompanyId,'LikeCommentID':RecordID.toString(),'UserImage':currentUserProfileData[0].ProfilePic};
        AnnouncmntInsert(listName,item);    
    }
}


var AnnResponse = AnnResponse || [];
//Get details from SP list above 5000
function getAllRecords(url, dfds) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            AnnResponse = AnnResponse.concat(data.d.results);
            if (data.d.__next) {
                //url = data.d.__next;
                getAllRecords(url, dfds);
            }
            else {
                dfds.resolve(AnnResponse);
            }
        },
        error: function (error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return AnnResponse;
}


function GetAllAnnLikesComment(RecId)
{
    var Query = "$filter= WebPartName eq 'MediaGallery' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"'  &$select=UserImage,Author/Title,Author/Id&$expand=Author";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MediaContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            $("#LikesCountAnn" + RecId).text(Items.length);
            if(Items.length>0)
            {
                $("#CommentLikeListAnncmnt").empty();
                var Html_Design="";
                for(var i=0; i<Items.length; i++)
                {	
                    Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' src='"+Items[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+Items[i].Author.Title+"</h4>"+
										"</div>"+
										"</li>";
                }
                $("#CommentLikeListAnncmnt").append(Html_Design);
            }
            else
            {
                $("#CommentLikeListAnncmnt").empty();
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}



function previewImage(Action) {
    src = Action.src + "?web=1";
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
}


function previewfile(Action) {
    //src = Action.src + "?web=1";
    src = Action.name + "?web=1";
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
}















