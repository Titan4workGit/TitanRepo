var siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
var arrItem=[];
var employeePicURL='';
var fileLeafRef='';
var listItem=new Array();
var ItemImage=new Array();
var downloadFile=new Array();
var newArr=new Array();
var itemId=0;
var currentDlg='';
$(document).ready(function(){

    GetCurrentUserRight();
	GetMediaGallery()
	//GetFolderDetails(url)
	getEvent();
	var url=window.location;
	userActivityNotificationEntry(_spPageContextInfo.userId,url)

	SetCalendar();
	
	$('#txtCreated').val(_spPageContextInfo.userDisplayName);
	//$('#txtDate').val();
	
	$("#btnSubmit").on("click", function () {
	 
	 if(isAdmin==false){
	   alert('Access Denied!');
	   $('#btnCreateNewAlbum').hide();
	   return false;
	   
	 }
	createFolder();
	});
	$("#btnCreateNewAlbum").on("click", function () {
	   
	   $('#txtTitle').val('');
	   $('#txteventName').val('');
	   $('#txtLocation').val('');
	   //$('#txtDate').val('');
	   $('#txtDescription').val('');	   
	
	});
	
	
	$("#btnUpdatefolder").on("click", function () {
	  updateFolder();
	});
	
	$("#btnSelect").on("click", function () {
	  var EventValue=$('.eventChkList:checked').val();
	  if(EventValue==undefined){
	    alert('Please select event');
	    return false;
	  }
	  else{
	      EventValue=EventValue.split(',');
	      $('#txteventName').val(EventValue[0])
	      $('#txtLocation').val(EventValue[1])
	      var Publishing=new Date(EventValue[2]);
	      var date=Publishing.format('MM dd, yy');
	      Publishing= $.datepicker.formatDate('MM dd, yy', Publishing);
	      $('#txtDate').val(Publishing);
	     }
	  
	});
	
	$("#Recentuploadfile").on("click", function (e) {
	  e.preventDefault();
	  recentUpload(newArr,isAdmin);
	});
	$("#RecentAlbumfile").on("click", function (e) {
	  e.preventDefault();
	  recentAlbum(newArr,isAdmin);
	});
	
	
	$("#mostViewFile").on("click", function (e) {
	  e.preventDefault();
	  mostView(newArr,isAdmin);
	});
	$("#mostLiked").on("click", function (e) {
	  e.preventDefault();
	  mostLike(newArr,isAdmin);
	});
	$("#mostcomment").on("click", function (e) {
	 e.preventDefault();
     mostComments(newArr,isAdmin);
	});
	
	$("#seemore").on("click", function (e) {
	 e.preventDefault();
	 var dlgTitle = 'Searching...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            getMoreAlbum();
            currentDlg.close();
        }, 100);   
	 
     
	});






});
var isAdmin=false;
function GetCurrentUserRight() {
 var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=ID&$filter=CompanyId eq '" +Logged_CompanyId+ "' and WebPartName eq 'Media' and ContributorsId eq '"+_spPageContextInfo.userId+"' or Scope eq 'EveryOne'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function(data) {
            var response = data;            
            if(response.d.results.length>0){
              isAdmin=true;              
            }
            else{
             $('#btnCreateNewAlbum').hide();            
            }
        },
        error: function(data) {
            console.log(JSON.stringify(data));
        }
    });
    
}




function GenerateTableMyCustomerList()
{
    sorterTableCustomerList = new TINY.table.sorter('sorterTableCustomerList', 'TempTableClientMaster', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
       // colddid: 'columnsMyCustomer',
        currentid: 'currentpageMyCustomer',
        totalid: 'totalpagesMyCustomer',
        startingrecid: 'startrecordMyCustomer',
        endingrecid: 'endrecordMyCustomer',
        totalrecid: 'totalrecordsMyCustomer',
        hoverid: 'selectedrowMyCustomer',
        pageddid: 'pagedropdownMyCustomer',
        navid: 'tablenavMyCustomer',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        //sortdir: 1,
        init: true
    });
}

function ConvertDateTimeFormat(date, delimiter) {
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}



function SetCalendar()
{
    var d = new Date();
    today = d.getMonth()+1 + ' ' + d.getDate() + ' ' + d.getFullYear();
    $('#txtDate').datepicker({
        defaultDate: 0,
        minDate: "-48m",
        maxDate:0,
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", new Date()) ;
}

var mediaGalleryCounter=0;
var topItems=10;
var arrItems;
function GetMediaGallery()
{
    var endPointURL = siteURL +"/_api/Web/lists/GetByTitle('MediaGallery')/rootfolder/folders?$select=*,FileRef,FileLeafRef&$orderby=TimeCreated desc&$top=5000";
 	//var endPointURL = siteURL +"/_api/Web/lists/GetByTitle('MediaGallery')/rootfolder/folders?$select=*,FileRef,FileLeafRef&$orderby=Like desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {

            var folders = data.d.results;
            console.log(data);
            arrItems=[];            
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
	                arrItems.push({
	                encodeURILink:encodeURILink,
	                folderName:folderName
	                });
	                var albumDescription="";
	                var Title=folders[i].Title;                    
	                                   
	              
	             }
	             
             }
             if(folders.length>top){
              $('#seemore').show()              
             }
             else{
              $('#seemore').hide() 
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
             getMoreAlbum();
        }, eror: function (data)
        {
            console.log(data);
        }
    });
}
var y=0;
var x=0
function getMoreAlbum(){
  y+=10;
  x=y-10;
  $('#seemore').show();
  if(arrItems.length<y){
   y=arrItems.length;
   $('#seemore').hide();   
  }
  for(var i=x;i<y;i++){  
    GetMediaGalleryThumbNail(arrItems[i].encodeURILink,arrItems[i].folderName);
  }
 
}

function GetMediaGalleryThumbNail(targetfolderUrl,folderName,Author,userImage)
{
    //var redirecturl= ""+_spPageContextInfo.webAbsoluteUrl+"/Pages/MediaGallery.aspx?WebAppId="+companyID+"";
	var endPointURL = siteURL  + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl+ "')?$select=ID,Description,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$top=5000&$orderby=Modified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
               var files = data.d.Files.results;             
               
               var thumbNailUrl="";
               var menuFolderHTML="";
               //var folderId=Id;
               mediaGalleryCounter++;
               var ImageCount=0; 
               ItemImage=[];
               ImageCount=files.length;
              
               var extofImage;
               if(ImageCount >= 4){
	            for (var i = 0; i < 4; i++)
	            {
	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	               extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
	               ItemImage.push({
	                ImgURL:thumbNailUrl,
	                ImgType:extofImage,
	                imgCount:ImageCount,
	                Id:itemId
	               })
	            }
	            }
	            else if(ImageCount==3){
	            for (var i = 0; i < 3; i++)
	            {
	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	               extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
	               ItemImage.push({
	                ImgURL:thumbNailUrl,
	                Id:itemId,
	                imgCount:ImageCount,
	                ImgType:extofImage
	               })
	            }
	            }
	            else if(ImageCount==2){
	            for (var i = 0; i < 2; i++)
	            {
	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	               extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
	               ItemImage.push({
	                ImgURL:thumbNailUrl,
	                Id:itemId,
	                imgCount:ImageCount,
	                ImgType:extofImage
	               })

	            }
	            }
	            else if(ImageCount==1){
                  	            
	               thumbNailUrl=encodeURI(files[0].ServerRelativeUrl)
	               extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
	               ItemImage.push({
	                ImgURL:thumbNailUrl,
	                Id:itemId,
	                imgCount:ImageCount,
	                ImgType:extofImage
	               })

	             
	            }
	            else{
                  	            
	               thumbNailUrl=''//encodeURI(files[].ServerRelativeUrl)
	               extofImage=thumbNailUrl.split('.');
                   extofImage=extofImage[extofImage.length-1]
	               ItemImage.push({
	                ImgURL:thumbNailUrl,
	                Id:itemId,
	                imgCount:ImageCount,
	                ImgType:extofImage
	               })	             
	            }        
	            
	            	          
	               GetFolderDetails(targetfolderUrl);
	              var menuFolderHTML =mediaHTML(ImageCount,targetfolderUrl);           
	              $('#galleryFirstImgThumb').append(menuFolderHTML);
	           
        }, eror: function (data) {

            console.log('error');
        }
    });
}




function createFolder() {

	var folderName = $("#txtTitle").val();
	if(folderName==''){
	   alert('Please enter Title! ');
	   return false;
	}
	if(folderName.length>250){
	 alert('Album name allow only 250 char');
	 return false;
	}
	var eventName=$("#txteventName").val();
	/*if(eventName==''){
	   alert('Please select Event !');
	   return false
	}*/
	var Location=$("#txtLocation").val();
	if(Location==''){
	   alert('Please select place!');
	   return false
	}

	var description=$('#txtDescription').val();
	if(description==''){
	   alert('Please enter description !');
	   return false
	}
	var txtDate=$('#txtDate').val();
	var d=new Date(txtDate);
    date=d.format('MM/dd/yyyy')
    //date=ConvertDateTimeFormat(Date, '/')

	
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
	  alert('Album created successfully !!!');
	  $('#createNew').modal('hide');
	  y=0;
      x=0

	  GetFolderDetails(targetFileUrl)	  
	  addFolderDetails(folderName,eventName,Location,description,date);
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

  fileLeafRef=targetfolderUrl;
	var endPointURL = siteURL  + "/_api/Web/lists/GetByTitle('MediaGallery')/Items?$select=*,File_x0020_Type,Author/Title,Author/EMail,FileRef,FileLeafRef&$expand=Author/Title&$filter=FileRef eq '"+targetfolderUrl+"'";
	
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {               
             var folders = data.d.results;              
             folderId=folders[0].Id;
             listItem=[];             
             $('#folderTitle').text(folders[0].FileLeafRef);
             var Title=folders[0].FileLeafRef;
             var Description= folders[0].Description;
             if(Description==null){
               Description='';
             }
             $('#folderDescription').text(Description);
             var Author=folders[0].Author.Title 
             $('#createdByname').text(Author); 
             var AuthorEmail=folders[0].Author.EMail;            
             var Publishing= new Date(folders[0].ImageCreateDate);
             var Publishing1= new Date(folders[0].ImageCreateDate);
             Publishing= $.datepicker.formatDate('MM dd, yy', Publishing);
             $('#createdDate').text(Publishing);
             
             $('#updateTitle').val(folders[0].FileLeafRef);
             $('#updateDescription').val(Description); 
             $('#updateCreatedBy').val(folders[0].Author.Title);
             var Publishing= new Date(folders[0].ImageCreateDate);
             Publishing= $.datepicker.formatDate('MM dd, yy', Publishing);
             $('#updateDate').val(Publishing);
             var EName=folders[0].Event_Name;
             if(EName==null)EName='';
             var EPlace=folders[0].Event_Place
             if(EPlace==null)EPlace='';
             var UserDesignation=folders[0].UserDesignation;
             if(UserDesignation==null)UserDesignation='';
             var UserDepartment=folders[0].UserDepartment;
             if(UserDepartment==null)UserDepartment='';
             var View=folders[0].View;
             if(View==null)View=0;
             var Like=folders[0].Like;
             if(Like==null)Like=0;
             var Comment=folders[0].Comment;
             if(Comment==null)Comment=0;
             var userImg=folders[0].userImage;
             if(userImg==null)userImg='../SiteAssets/QuestionAnswer/images/user_pic.jpg';
             listItem.push({
	             Title:Title,
	             Description:Description,
	             Author:Author,
	             Event_Name:EName,
	             Event_Place:EPlace,
	             EMail:AuthorEmail,
	             designation:UserDesignation,
	             UserDepartment:UserDepartment,
	             Publishing:Publishing,
	             Publishing1:Publishing1,
	             View:View,
	             Like:Like,
	             Comments:Comment,
	             userImage:userImg             
             })          


         
	         
	    }, eror: function (data)
        {
            console.log('error');
        }
    });
}
 
 
 function updateFolder() {

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


var employeePicURL=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail); 
function  addFolderDetails(Title,EventName,Location,Description,date) {
   var  testurl=siteURL + "/_api/web/getfolderbyserverrelativeurl('/sites/Titan_2_2_1_DEV/TITAN/MediaGallery/Lakhan')"
        $.ajax({  
            url: siteURL  + "/_api/web/lists/GetByTitle('MediaGallery')/items('"+folderId+"')",
            type: "POST",
            async:false, 
            data: JSON.stringify  
            ({  
                __metadata:  
                {  
                    type: "SP.Data.MediaGalleryItem"
                      
                },  
                Title: Title,
                Description:Description,
                UserDepartment:Logged_DepartmentName,
                Event_Name:EventName,
                Event_Place:Location,
                ImageCreateDate:date,
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
    
    
    
 function  deleteFolder (targetFileUrl) {
    var deleteConfirmation= confirm("Are you sure to delete this album ?");
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
              x=0;
              y=0;
              GetMediaGallery();
            
            },
            error: function (data){
             alert(data);
            }
        });
        
     }
 }
var today = new Date();
var CurrentDate=today.toISOString();
     
var eventlength;    
function getEvent()
{
	//var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items?$filter=ID eq ('"+ globalEventId+"')";  
    var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items?$select=*,Location,Id,Title,Department,EventDate&$orderby Modified desc&$top=100";  

    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
			 
            var items = data.d.results; 
            var tblBody='';            
            $('#eventTBody').empty();
            eventlength=items.length;
            if(items.length>0){
            for(var i=items.length-1;i>=0;i--){
	            var eventName=items[i].Title;
	            var eventId=items[i].Id;	            
	            var Publishing= new Date(items[i].EventDate);
                Publishing= $.datepicker.formatDate('dd-M-yy', Publishing);

	            var officeLocation=items[i].Location;
	            var Department=items[i].Department;
	            var chck=[];
	            chck.push(eventName,officeLocation,items[i].EventDate)
	              var myCheckbox1='myCheckbox'+eventId;          
			      tblBody+='<tr class="eventTBody_tr">'
				  tblBody+='      <td>'
				        tblBody+='	<div class="chexbox_mg">'
						tblBody+='		<input type="checkbox" name="check" class="eventChkList" value="'+chck+'" onclick="onlyOne(this)" id="'+myCheckbox1+'" />'
						tblBody+='		<label for="'+myCheckbox1+'">'
							tblBody+='<i class="fa fa-circle-thin" aria-hidden="true"></i>'
							tblBody+='	</label>'
						tblBody+='	</div></td>'
				        tblBody+='	<td><span>'+Publishing+'</span>'
				      tblBody+='  </td>'
				     tblBody+='   <td>'+eventName+'</td>'
				     tblBody+='   <td>'+officeLocation+'</td>'
				     tblBody+='   <td>'+Department+'</td>'

				    tblBody+='  </tr>'

			  }
			$('#eventTBody').append(tblBody);
			GenerateTableMyCustomerList();  
		  }
		  if (items.length == 0) 
            {
                $("#NoRecordFoundclientmaster").show();
            }
            else
            {
            	 $("#NoRecordFoundclientmaster").hide();
            }            
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    }); 
}    

/*------checkbox--------*/
function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false        
    })  
    
}


function mediaHTML(ImageCount,targetfolderUrl,View,Like,comments){
    itemId+=1;
   var redirecturl='../Pages/MediaGalleryDetail.aspx?WebAppId=2&FName='+targetfolderUrl+'&Mode=View&sourcelocation=../Pages/MediaGalleryNew.aspx';
   var  img='';
   var img1='';
   var img2='';
   var img3='';
   var img4='';
   var imgtype=''
   var imgtype1=''
   var imgtype2=''
   var imgtype3=''
   var imgtype4='';
   if(ImageCount==1){
    img1=ItemImage[0].ImgURL;
    imgtype1=ItemImage[0].ImgType; 
   }
   else if(ImageCount==2){
    img1=ItemImage[0].ImgURL;
    imgtype1=ItemImage[0].ImgType;
    img2=ItemImage[1].ImgURL;
    imgtype2=ItemImage[1].ImgType; 
   }

  else if(ImageCount==3){
	 img1=ItemImage[0].ImgURL;
	 imgtype1=ItemImage[0].ImgType;
	 img2=ItemImage[1].ImgURL;
     imgtype2=ItemImage[1].ImgType;
     img3=ItemImage[2].ImgURL;
     imgtype3=ItemImage[2].ImgType; 
   }
   else if(ImageCount>=4){
    img1=ItemImage[0].ImgURL;
    imgtype1=ItemImage[0].ImgType;
    img2=ItemImage[1].ImgURL;
	imgtype2=ItemImage[1].ImgType;
	img3=ItemImage[2].ImgURL;
    imgtype3=ItemImage[2].ImgType;
    img4=ItemImage[3].ImgURL;
    imgtype4=ItemImage[3].ImgType; 
   }
   else{
    img=ItemImage[0].ImgURL;
    imgtype=ItemImage[0].ImgType;
   }   
     
             newArr.push({
                 Title:listItem[0].Title,
                 Id:itemId,
	             Description:listItem[0].Description,
	             Author:listItem[0].Author,
	             Event_Name:listItem[0].Event_Name,
	             Event_Place:listItem[0].Event_Place,
	             EMail:listItem[0].EMail,
	             designation:listItem[0].designation,
	             UserDepartment:listItem[0].UserDepartment,
	             Publishing:listItem[0].Publishing,
	             Publishing1:listItem[0].Publishing1,
	             View:listItem[0].View,
	             Like:listItem[0].Like,
	             Comments:listItem[0].Comments,
	             userImage:listItem[0].userImage,
	             ImgURL:ItemImage[0].ImgURL,
	             imgCount:ImageCount,
	             img:img,
	             imgtype:imgtype,
	             img1:img1,
	             imgtype1:imgtype1,
	             img2:img2,
	             imgtype2:imgtype2,
	             img3:img3,
	             targetfolderUrl:targetfolderUrl,
	             imgtype3:imgtype3,
	             img4:img4,
	             imgtype4:imgtype4          
   
            })
           
            var department =listItem[0].UserDepartment+' '
            var designation=' '+ listItem[0].designation;
            var menuFolderHTML=''
             if(ImageCount==0){
                menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card album-card-default">'
                menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
                menuFolderHTML +='<div class="album-img-grid-default" id="album-default-case">'
                menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/default album.png" alt="album img grid default"></div></div>'                                 
                menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right"><div class="album-detail-box"><div class="album-heading">'        
                menuFolderHTML +='<a href="'+redirecturl+'">'+listItem[0].Title+'</a>' 
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-info">'
                menuFolderHTML +='<span>'+listItem[0].Description+'</span>' 
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="row album-detail-footer">'
                menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
                menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
                menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
                menuFolderHTML +='<img src="'+listItem[0].userImage+'"data-themekey="#">'
                menuFolderHTML +='<div class="album-user-image-text">'
                menuFolderHTML +='<p class="mb0">'+listItem[0].Author+'</p>'
                if(listItem[0].UserDepartment!=''){
                 menuFolderHTML +='<p class="mb0">'+department+'|'+designation+' </p>'
                }
                menuFolderHTML +='<p class="mb0 Emailfont">'+listItem[0].EMail+'</p>'
                menuFolderHTML +='</div></div>'                               
                menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
                if(listItem[0].Event_Name.length==0){
                 listItem[0].Event_Name='';
                }
                
                if(listItem[0].Event_Name!=''){
                 menuFolderHTML +='<p class="media-event">Event: <span id="">'+listItem[0].Event_Name+'</span></p> '                    
                }                        
                menuFolderHTML +='<p class="media-place">Place: <span id=""> '+listItem[0].Event_Place+' </span></p>'
                menuFolderHTML +='<p class="media-date">Date: <span id=""> '+listItem[0].Publishing+' </span></p>'                           
                menuFolderHTML +='</div></div></div>'              
                menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
                menuFolderHTML +='<div class="album-data-box">'
                menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
                menuFolderHTML +='<div class="album-inner-card-btn-item">'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">234</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
                menuFolderHTML +='<span> </span></div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">3</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">1</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">5</div>'
                menuFolderHTML +='</div>'
                menuFolderHTML +='</div></div></div></div>'	
                menuFolderHTML +='<div class="dropdown custom-card-menu">'
                menuFolderHTML +='<a class="album-download-btn">' 
                menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
                if(isAdmin==true){
                 menuFolderHTML +="<a class='album-delete-btn' onclick='deleteFolder(\""+targetfolderUrl+"\");'>"
                 menuFolderHTML +='<i class="fa fa-trash-o" aria-hidden="true"></i> </a>'
                }
                menuFolderHTML +='</div></div></div></div>'
                return menuFolderHTML;
              }
              else if(ImageCount==1){
                menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card">'
				menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
				menuFolderHTML +='<div class="album-img-grid-case-1" id="album-case-1">'
				var extofImage=ItemImage[0].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='jfif' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[0].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[0].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				
				menuFolderHTML +='</div></div>'	
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+listItem[0].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info"><span>'+listItem[0].Description+'</span></div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+listItem[0].userImage+'" data-themekey="#"/>'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+listItem[0].Author+'</p>'
			   if(listItem[0].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+department+'| '+designation +'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+listItem[0].EMail+'</p>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(listItem[0].Event_Name.length==0){
				 listItem[0].Event_Name='';
				}
				if(listItem[0].Event_Name!=''){
				 menuFolderHTML +='<p class="media-event">Event: <span id="">'+listItem[0].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+listItem[0].Event_Place+' </span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+listItem[0].Publishing+'</span></p>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn' onclick='downLoadFile(\""+targetfolderUrl+"\");'> "
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
				if(isAdmin==true){
				 menuFolderHTML +="<a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'><i class='fa fa-trash-o' aria-hidden='true'></i></a>"
				}
				menuFolderHTML +='</div></div></div></div>'
                            
              return menuFolderHTML;
              
              }
              
              if(ImageCount==2){
                menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card">'
				menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
				menuFolderHTML +='<div class="row album-img-grid-case-2" id="album-case-2">'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-left">'
				var extofImage=ItemImage[0].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[0].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[0].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				var extofImage=ItemImage[1].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[1].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[1].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }				
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+listItem[0].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+listItem[0].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+listItem[0].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+listItem[0].Author+'</p>'
				if(listItem[0].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+department +'| '+designation+'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+listItem[0].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(listItem[0].Event_Name.length!=0){
				 menuFolderHTML +='<p class="media-event">Event: <span id="">'+listItem[0].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+listItem[0].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+listItem[0].Publishing+'</span></p>'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn' onclick='downLoadFile(\""+targetfolderUrl+"\");'> "
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i>'
				if(isAdmin==true){
				 menuFolderHTML +="</a><a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'><i class='fa fa-trash-o' aria-hidden='true'></i></a>"
				}
				menuFolderHTML +='</div></div></div></div>'
				return menuFolderHTML;
              
              }
              
              if(ImageCount==3){
              menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card">'
				menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
				menuFolderHTML +='<div class="row album-img-grid-case-3" id="album-case-3">'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-left">'
				var extofImage=ItemImage[0].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[0].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[0].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }				
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-1">'
				var extofImage=ItemImage[1].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[1].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[1].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-2">'
				var extofImage=ItemImage[2].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[2].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[2].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-3.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+listItem[0].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+listItem[0].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+listItem[0].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+listItem[0].Author+'</p>'
				if(listItem[0].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+department+'| '+designation+'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+listItem[0].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(listItem[0].Event_Name.length!=0){
				 menuFolderHTML +='<p class="media-event">Event: <span id="">'+listItem[0].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id="">'+listItem[0].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+listItem[0].Publishing+' </span></p></div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn'  onclick='downLoadFile(\""+targetfolderUrl+"\");'> ";
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
				if(isAdmin==true){
				 menuFolderHTML +="<a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'><i class='fa fa-trash-o' aria-hidden='true></i></a>"
				}
				menuFolderHTML +='</div></div></div></div>'

               return menuFolderHTML;
              
              }
              
              if(ImageCount>=4){
               menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card">'
				menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
				menuFolderHTML +='<div class="row album-img-grid-case-4" id="album-case-4">'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-left">'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-left-row-1">'
				var extofImage=ItemImage[0].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[0].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[0].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-left-row-2">'
				var extofImage=ItemImage[1].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='jfif' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[1].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[1].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-1">'
				var extofImage=ItemImage[2].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[2].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[2].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-3.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-2">'
				var extofImage=ItemImage[3].ImgType;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='jfif' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+ItemImage[3].ImgURL+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+ItemImage[3].ImgURL+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/album-bg-4.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'">'+listItem[0].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+listItem[0].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+listItem[0].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+listItem[0].Author+'</p>'
				if(listItem[0].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+department+'| '+designation+' </p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+listItem[0].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(listItem[0].Event_Name.length!=0){
				 menuFolderHTML +='<p class="media-event">Event: <span id=""> '+listItem[0].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+listItem[0].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+listItem[0].Publishing+' </span></p>'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="../SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+listItem[0].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn'  onclick='downLoadFile(\""+targetfolderUrl+"\");'> "
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
				if(isAdmin==true){
				 menuFolderHTML +="<a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'>";
				 menuFolderHTML +="<i class='fa fa-trash-o' aria-hidden='true'></i></a>";
				}
				menuFolderHTML +='</div></div></div></div>'
				              
              
              return menuFolderHTML;
              }      
}


function downLoadFile(targetfolderUrl)
{
    
	var endPointURL = siteURL  + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl+ "')?$select=ID,Description,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$top=5000&$orderby=Modified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
               var files = data.d.Files.results;
               downloadFile=[];
               var extofImage;
               var Imgs ='';
               //var data = canvas.toDataURL();
               $('.panel-head-hidden-div').empty();              
	            for (var i = 0; i < files.length; i++)
	            {
	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)            
                   downloadFile.push(thumbNailUrl);                   
                   var filename=files[i].Name;                  
                   download1(thumbNailUrl,filename)
                  
	            }            	            
	            
	           
        }, eror: function (data) {

            console.log('downlod img error');
        }
    });
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


