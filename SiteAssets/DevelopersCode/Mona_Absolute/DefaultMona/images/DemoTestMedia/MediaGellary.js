var siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
var arrItem=[];
var employeePicURL='';
var fileLeafRef='';
//var  url='/sites/Titan_2_2_1_DEV/TITAN/MediaGallery/Lakhan';
$(document).ready(function(){


	GetMediaGallery()
	GetEmployeeImg();
	SetCalendar();
	
	$('#txtCreated').val(_spPageContextInfo.userDisplayName);
	$('#txtDate').val();
	
	$("#btnSubmit").on("click", function () {
	createFolder();
	});
	
	$("#btnUpdatefolder").on("click", function () {
	  updateFolder();
	});




});

function SetCalendar()
{
    var d = new Date();
    today = d.getMonth()+1 + ' ' + d.getDate() + ' ' + d.getFullYear();
    $('#txtDate').datepicker({
        defaultDate: 0,
        minDate: 0,
        maxDate: "+48m",
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate", new Date()) ;
}


function getAlbum(){
	var requestUri = siteURL  +"/_api/web/lists/getByTitle('MediaGallery')/items?$select=*,ID,FileRef/FileRef,File,EncodedAbsThumbnailUrl";
	
	debugger;
	var requestHeaders = {
	    "accept": "application/json;odata=verbose"
	}
	
	$.ajax({
	    url: requestUri,
	    type: 'GET',
	    dataType: 'json',
	    headers: requestHeaders,
	    success: function (data) 
	    {        
	       
	       $.each(data.d.results, function(i,result) {
	            var path = result.EncodedAbsUrl;
	            //console.log(path);
	         });
	
	    },
	    error: function ajaxError(response) {
	        alert(response.status + ' ' + response.statusText);
	    }
	});
}

var mediaGalleryCounter=0;
function GetMediaGallery()
{
   //BindAlbumDropDownList(targetSiteUrl);
 	var endPointURL = siteURL +"/_api/Web/lists/GetByTitle('MediaGallery')/rootfolder/folders?$select=*,FileRef,FileLeafRef&$orderby=TimeLastModified desc";

	//var endPointURL = siteURL +"/_api/web/Lists/Getbytitle('MediaGallery')/rootfolder/folders?$expand=Folders,Files,Files/ListItemAllFields,Folders/ListItemAllFields,Files/Author/Id&$select=*,Id,Name,TimeLastModified,ServerRelativeUrl&$orderby=TimeLastModified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {

            var folders = data.d.results;
            console.log(folders)
            var counterIndex=0;
            $('#galleryFirstImgThumb').empty();
            mediaGalleryCounter=0;
            for (var i = 0; i < folders.length; i++)
            {
	            if(folders[i].Name!="Forms" && folders[i].Name!="_t" && folders[i].Name!="_w")
	            {
	              	counterIndex==1;
	                var encodeURILink = encodeURI(folders[i].ServerRelativeUrl);
	                var folderName=folders[i].Name;
	                var albumDescription="";
	                var Title=folders[i].Title;               

	                GetMediaGalleryThumbNail(encodeURILink,folderName);
                     
	              
	             }
             }
             if(counterIndex==0)
             {
                var langblankMessage=$('#langBlankTextMessageMedia').text();
	            if(langblankMessage=="")
	            {
	               langblankMessage="Keep watching for upcoming albums";
	            }
                var norecord='<div class="albumNoRecord col-sm-12 col-xs-12 col-md-12"><h3 class="top5" data-localize="NoRecord_MediaGallery">'+langblankMessage+'</h3></div>';
              	//$('gallerySecondImgThumb').append(norecord);
               	$('.mediaGalleryTab').append(norecord);

             }

        }, eror: function (data)
        {
            console.log(data);
        }
    });
}

function GetMediaGalleryThumbNail(targetfolderUrl,folderName,Author,userImage)
{
    //var redirecturl= ""+_spPageContextInfo.webAbsoluteUrl+"/Pages/MediaGallery.aspx?WebAppId="+companyID+"";
	var endPointURL = siteURL  + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl+ "')?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$top=5000&$orderby=Modified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
               var files = data.d.Files.results;
               console.log(files);
               var thumbNailUrl="";
               var menuFolderHTML="";
               //var folderId=Id;
               mediaGalleryCounter++;
               var ImageCount=0; 
               ImageCount=files.length;
	            for (var i = 0; i < files.length; i++)
	            {

	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	            }
	            
	            var extofImage;
	            
	            if(thumbNailUrl=="")
	            {
                  thumbNailUrl="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MediaGallery/assets/images/album-icon.png";
                  extofImage=thumbNailUrl.split('.');
                  extofImage=extofImage[extofImage.length-1]
                }
                else{
                   extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
                }
	          
	              if(folderName.length>29)
	              {
	               folderName=folderName.substring(0, 29)+"...";
	              }
                   var redirecturl='../Pages/MediaGalleryDetail.aspx?WebAppId=2&FName='+targetfolderUrl+'&Author='+window.btoa(Author)+'&Image='+window.btoa(userImage)+'&Mode=View&sourcelocation=../Pages/MediaGalleryNew.aspx'; 
		           menuFolderHTML +='<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 album-col-info">';
		           menuFolderHTML +='<div class="album-card">';
		           menuFolderHTML +='<a href="'+redirecturl+'" class="album-card-info album-card-show">';
		           //menuFolderHTML +='<a href="'+redirecturl+'">';
		           if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+thumbNailUrl+'" alt="album bg">';
		            }
		            else{
		                 menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+thumbNailUrl+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		                 menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                      }
		           menuFolderHTML +='<div class="album-count-box">';
		           menuFolderHTML +='<span class="album-count-box-count">'+ImageCount+'</span>';
		           menuFolderHTML +='<img class="album-count-box-icon" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MediaGallery/assets/images/album-icon.png" alt="album icon">';
		           menuFolderHTML +='</div></a>';
		           menuFolderHTML +='<div class="album-card-footer">';
		           menuFolderHTML +='<p class="album-card-footer-title ellipsis-2">'+folderName+'</p>';
		           menuFolderHTML +='<div class="dropdown custom-card-menu">';
		           menuFolderHTML +='<button class="px-0 dropdown-toggle button-ed-menu" type="button" data-toggle="dropdown" aria-expanded="false">';
		           menuFolderHTML +='<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MediaGallery/assets/images/more-horiz.png">';
		           menuFolderHTML +='</button>';
		           menuFolderHTML +='<ul class="dropdown-menu dropdown-menu-right">';
		           //menuFolderHTML +='<ul class="dropdown-menu dropdown-menu-right">';
		           menuFolderHTML +="<li><a href='#' data-toggle='modal' data-target='#album-edit'  onclick='GetFolderDetails(\""+targetfolderUrl+"\");'>Edit</a></li>";
		           menuFolderHTML +="<li><a href='#'  onclick='deleteFolder(\""+targetfolderUrl+"\");' >Delete</a></li>";
		           menuFolderHTML +="<li><a href='#' data-toggle='modal' data-target='#album-Information'  onclick='GetFolderDetails(\""+targetfolderUrl+"\");'>Info</a></li>";
		           menuFolderHTML +='</ul></div></div></div></div>';
		           //$('#galleryFirstImgThumb').html('');
	               $('#galleryFirstImgThumb').append(menuFolderHTML);
	           
        }, eror: function (data) {

            console.log('error');
        }
    });
}




function createFolder() {

	var folderName = $("#txtTitle").val();
	var description=$('#txtDescription').val();
	//var siteUrl = _spPageContextInfo.webAbsoluteUrl;
	var fullUrl = siteURL + "/_api/web/folders";
	var itemType = GetItemTypeForListName('MediaGallery');
	$.ajax({
	url: fullUrl,
	async: false,
	type: "POST",
	data: JSON.stringify({
	'__metadata': { 'type': 'SP.Folder'},
	//'Title':'testbylakhan',
	'ServerRelativeUrl': 'MediaGallery/' + folderName
	}),
	headers: {
	"accept": "application/json;odata=verbose",
	"content-type": "application/json;odata=verbose",
	"X-RequestDigest": $("#__REQUESTDIGEST").val()
	},
	success: function (data){
	var targetFileUrl=  data.d.ServerRelativeUrl ;
	  alert('Folder created successfully !!!');
	  GetFolderDetails(targetFileUrl)
	  //console.log(data);
	  addFolderDetails(folderName,description);
	  GetMediaGallery();
	  
	},
	error: function (data){
	   alert(data);
	}
	});
}

var folderId='';
function GetFolderDetails(targetfolderUrl)
{ 
debugger
  fileLeafRef=targetfolderUrl;
	var endPointURL = siteURL  + "/_api/Web/lists/GetByTitle('MediaGallery')/Items?$select=*,Author/Title,FileRef,FileLeafRef&$expand=Author/Title&$filter=FileRef eq '"+targetfolderUrl+"'";
	
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {               
             var folders = data.d.results; 
             folderId=folders[0].Id;
                          
             $('#folderTitle').text(folders[0].FileLeafRef);
             var Description= folders[0].Description;
             if(Description==null){
               Description='';
             }
             $('#folderDescription').text(Description);
             var Author=folders[0].Author.Title 
             $('#createdByname').text(Author);             
             var Publishing= new Date(folders[0].Created);
             Publishing= $.datepicker.formatDate('dd-M-yy', Publishing);
             $('#createdDate').text(Publishing);
             
             $('#updateTitle').val(folders[0].FileLeafRef);
             $('#updateDescription').val(Description); 
             $('#updateCreatedBy').val(folders[0].Author.Title);
             var Publishing= new Date(folders[0].Created);
             Publishing= $.datepicker.formatDate('dd-M-yy', Publishing);
             $('#updateDate').val(Publishing);


         
	         
	    }, eror: function (data)
        {
            console.log('error');
        }
    });
}
 
 
 function updateFolder() {
debugger;
	var folderName = $("#updateTitle").val();
	var Description= $("#updateDescription").val();
	//var siteUrl = _spPageContextInfo.webAbsoluteUrl;
	var fullUrl = siteURL + "/_api/web/GetFolderByServerRelativeUrl('"+fileLeafRef+"')/ListItemAllFields?$select=FileLeafRef"
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
	  
	  alert('Folder updated successfully !!!');
	  GetFolderDetails(targetFileUrl)	  
	  GetMediaGallery();
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
    
    
    
 function  deleteFolder (targetFileUrl) {
    var deleteConfirmation= confirm("Do you want to delete this Folder?");
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
              GetMediaGallery();
            
            },
            error: function (data){
             alert(data);
            }
        });
        
     }
 }    
    
    
function GetEmployeeImg()
{
	var listname,id;
 	var restQuery = "";
		listname = "Employees";		
		restQuery = "Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=LogonNameId eq '" + _spPageContextInfo.userId + "'";		    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	var items = data.d.results;
            employeePicURL = "";
           	if (items.length > 0)
          	{
          	  
          	    /*userDesignation=items[0].Designation;
          	    userDepartment=items[0].Department.Title;
          	    userOfficeLocation=items[0].OfficeLocation.Title;*/
          	    
           		if(items[0].AttachmentFiles.results.length>0)
           		{
           		  employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
           		
           		}
           		else
           		{
           			employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           		}
           	}
        }, 
        error: function (data)
        {
            console.log(data);
        }
    });
}
   
