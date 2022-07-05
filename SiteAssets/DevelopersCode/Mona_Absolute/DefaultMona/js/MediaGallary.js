var currentAlbumSiteUrl="";
var existingAlbumArrayList=new Array();
$(document).ready(function () 
{
debugger;
	 var welcomePageCalled=titanForWork.getQueryStringParameter('WelcomePageCalled');
	 if(welcomePageCalled!=undefined)
	 {
		//MediaGalleryInitialization();
	 }
	 
	 
	 
});

$(window).load(function(){

	if (  $("#carousel-exampleMagzine ol li").size() > 1 ) {
	 	$("#carousel-exampleMagzine ol").show();
	 }
	 else {
	 	$("#carousel-exampleMagzine ol").hide();
	 }

});

/*
function MediaGalleryInitialization()
{
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	var webPartCollection = new Array();
		
    webPartCollection.push("Media Gallery");
    webPartCollection.push("Media");
    var usersPermission = UserExistInProcessApprover(txtCompanyId , "", webPartCollection);
    
    for (var collectionIndex = 0; collectionIndex < usersPermission.length; collectionIndex++)
    {	        
        if(usersPermission[collectionIndex].webPartName == "Media Gallery")
        {
            //$('.MediaGallery_Add').show();//Show or hide add new item link//MediaGallery_Add
            $('.AddNewMagazine').show();
        }
        if(usersPermission[collectionIndex].webPartName == "Media")
        {
            $('.MediaGallery_Add').show();//Show or hide add new item link//MediaGallery_Add
           // $('.MediaGallery_Add').show();
        }

    }
*/
	//$(".AddNewMagazine").attr("href", ""+_spPageContextInfo.webAbsoluteUrl+"/Pages/Magazine.aspx?WebAppId=1");
	//$(".viewAllMagazine").attr("href", ""+_spPageContextInfo.webAbsoluteUrl+"/Pages/MagazineViewAll.aspx?WebAppId=1");
	
	$('.btnAddNewAlbum').click(function()
	{
	     var txtNewAlbum=$('#txtNewAlbum').val();
	     var txtNewShortNote=$('#txtShortNote').val();
	     if(txtNewAlbum.trim().length<4)
	     {
	       alert('Please enter at least 4 characters for album name.')
	       return false;
	     }
	     if(txtNewShortNote.trim().length==0)
	     {
	       alert('Please enter short description.')
	       return false;
	     }
	     if(existingAlbumArrayList.indexOf(txtNewAlbum.trim().toLowerCase())==-1)
	     {
	       NewAlbumFolder(currentAlbumSiteUrl,txtNewAlbum.trim());
	     }
	     else
	     {
	       alert("Album is already exist.");
	     }
	
	});

	InitializationMediaSlider();
	AddOnClientClickAndPopup();
	LoadRequestDetails();
	ChangeMagzieMediaGalleryTab();
}

function ChangeMagzieMediaGalleryTab()
{
	$('.Magazine-left').hide();
	$('.Media-right').hide();
	$('.Media-right').click(function(){
		$('.Media-right').hide();
		$('.Media-left').show();	
		$('.Magazine-left').hide();
		$('.Magazine-right').show();
		$('.magazineTab').hide();
		$('.mediaGalleryTab').show();
		
	});
	$('.Magazine-right').click(function(){
		$('.Magazine-right').hide();
		$('.Magazine-left').show();
		$('.Media-left').hide();	
		$('.Media-right').show();
		$('.mediaGalleryTab').hide();
		$('.magazineTab').show();
		
	});
	  /* $('.MediaGalleryTabs').addClass('mrg-right-3');
	   $('.MagazineGalleryTabs').addClass('mrg-right-3');
	   $('.MagazineGalleryTabs').removeClass('head-bg2').addClass('head-bg').addClass('head-back-color');
	   $('.MagazineGalleryTabs span i').addClass('head-icon').removeClass('head-icon2');       
	   $('.mediaGalleryText').show();
	   $('.magzineGalleryText').hide();*/
       
   /* $('.MediaGalleryTabs').click(function ()
    {
        //$('.MediaGalleryTabs').hide();               
        //$('.MediaGalleryTabsRight').hide();
        $('.mediaGalleryText').hide();
        $('.magazineTab').show();
        //$('.MagazineGalleryTabsRight').show();
        //$('.MagazineGalleryTabs').show();
        $('.MagazineGalleryTabs').show();
        $('.magzineGalleryText').show();
        $('.MediaGalleryTabs').removeClass('head-bg2').addClass('head-bg').addClass('head-back-color');
        $('.MagazineGalleryTabs').removeClass('head-bg').removeClass('head-back-color').addClass('head-bg2');
        $('.MediaGalleryTabs').removeClass('head-bg2').addClass('head-bg').addClass('head-back-color');
        
        $('.MediaGalleryTabs span i').addClass('head-icon').removeClass('head-icon2');
		$('.MagazineGalleryTabs span i').addClass('head-icon2').removeClass('head-icon');
		
		$('.Biography span i').addClass('head-icon2').removeClass('head-icon');
        $('.mediaGalleryTab').hide();

    });
    $('.MagazineGalleryTabs').click(function () {

        //$('.MediaGalleryTabs').show();
        
        $('.mediaGalleryTab').show();
        //$('.MediaGalleryTabsRight').show();
        $('.mediaGalleryText').show();
        $('.magazineTab').hide();
        //$('.MagazineGalleryTabsRight').hide();
       // $('.MagazineGalleryTabs').hide();
        $('.MediaGalleryTabs').removeClass('head-bg').removeClass('head-back-color').addClass('head-bg2');
        $('.MagazineGalleryTabs').removeClass('head-bg2').addClass('head-bg').addClass('head-back-color');
        
        $('.MediaGalleryTabs span i').addClass('head-icon2').removeClass('head-icon');
		$('.MagazineGalleryTabs span i').addClass('head-icon').removeClass('head-icon2'); 

        $('.magzineGalleryText').hide();

    });*/

}

function AddOnClientClickAndPopup()
{
	$('.MediaGallery_Add').click(function(){
	  $('#newAlbumModelPopup').modal('show');
	});
}

function InitializationMediaSlider()
{
	//var departmentID=titanForWork.getQueryStringParameter('DepartmentId');
	//var companyID=titanForWork.getQueryStringParameter('CompanyId');
	//if(companyID>0 && departmentID>0)
	//{
	//    EventMediaGallerySiteURL('Departments',departmentID);
	//}
	//else
	// if(companyID>0 && departmentID!='undefined')
	//{
        var siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
        currentAlbumSiteUrl=siteURL;
        GetMediaGallery(siteURL,"MediaGallery");
	//}
}


function EventMediaGallerySiteURL(listName, ItemID)
{
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=ID,SiteURL&$filter=ID eq '" + ItemID + "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length>0)
            {
                var siteURL = items[0].SiteURL;
                currentAlbumSiteUrl=siteURL;
		        GetMediaGallery(siteURL,"MediaGallery");
            }

        }, eror: function (data)
        {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}
function AddItemToListWithMetadat(targetSiteUrl,ListName, Metadata)
{
    var dfd = $.Deferred();
    $.ajax({
        url: targetSiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "POST",
        async: true,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) 
        {
           $('#newAlbumModelPopup').modal('hide');
           InitializationMediaSlider();
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function GetItemTypeForListNameDetailsGroups(ListName)
{
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

var mediaGalleryCounter=0;
function GetMediaGallery(targetSiteUrl,targetfolderUrl)
{
   BindAlbumDropDownList(targetSiteUrl);

	var endPointURL = targetSiteUrl+"/_api/web/Lists/Getbytitle('MediaGallery')/rootfolder/folders?$select=Name,TimeLastModified,ServerRelativeUrl&$top=10&$orderby=TimeLastModified desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {

            var folders = data.d.results;
            var counterIndex=0;
            $('.gallerySecondImgThumb').html('');
            mediaGalleryCounter=0;
            for (var i = 0; i < folders.length; i++)
            {
	            if(folders[i].Name!="Forms" && folders[i].Name!="_t" && folders[i].Name!="_w")
	            {
	              if(counterIndex<5)
	              {
	                counterIndex++;
	                var encodeURILink = encodeURI(folders[i].ServerRelativeUrl);
	                var imageCaption=folders[i].Name;
	                var albumDescription=""

	                 $.when(GetAlbumCaptionDescription(targetSiteUrl,imageCaption)).done(function (result)
	                 {
	                   if(result.length>0)
	                   {
	                    albumDescription=result[0].Description;
	                   }
                       GetMediaGalleryThumbNail(targetSiteUrl,encodeURILink,imageCaption,albumDescription);
                     });
	              }
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
            console.log('error');
        }
    });
}
function GetMediaGalleryThumbNail(targetSiteUrl,targetfolderUrl,imageCaption,albumDescription)
{

	var endPointURL = targetSiteUrl+ "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl+ "')?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified desc&$top=1";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
               var files = data.d.Files.results;
               var thumbNailUrl="";
               var menuFolderHTML="";
                mediaGalleryCounter++;
	            for (var i = 0; i < files.length; i++)
	            {

	               thumbNailUrl=encodeURI(files[i].ServerRelativeUrl)
	            }
	            if(thumbNailUrl=="")
	            {
                  thumbNailUrl="https://spoprod-a.akamaihd.net/files/odsp-next-prod_2018-08-03-sts_20180810.001/odsp-media/images/emptyfolder/empty_folder.svg";
                }
	           if(mediaGalleryCounter==1)
	           {
	              if(imageCaption.length>29)
	              {
	               imageCaption=imageCaption.substring(0, 29)+"...";
	              }

		           menuFolderHTML +='<div class="cuadro_intro_hover ">';
		           menuFolderHTML +='<a target="_blank" href="'+targetfolderUrl+'">';
		           menuFolderHTML +='<img src="'+thumbNailUrl+'" alt="" class="thumb pic-height imageThumView1">';
		           menuFolderHTML +='</a>';
		           menuFolderHTML +='<div class="caption">';
		           menuFolderHTML +='<div class="blur"></div>';
		           menuFolderHTML +='<div class="caption-text">';
		           menuFolderHTML +='<h5>'+imageCaption+'</h5>';
		           menuFolderHTML +='<p><a target="_blank" href="'+targetfolderUrl+'">'+albumDescription+'</a></p>';
		           menuFolderHTML +='</div>';
		           menuFolderHTML +='</div>';
		           menuFolderHTML +='</div>';
	               $('.galleryFirstImgThumb').html('');
	               $('.galleryFirstImgThumb').append(menuFolderHTML);
	           }
	           else
	           {
	               if(imageCaption.length>18)
	                {
	                 imageCaption=imageCaption.substring(0, 18)+"...";
	                }
	                menuFolderHTML="";
		            menuFolderHTML +='<div class="col-sm-6 col-xs-6">';
                    menuFolderHTML +='<div class="cuadro_intro_hover2 mb-15">';
                    menuFolderHTML +='<a target="_blank" href="'+targetfolderUrl+'">';
                    menuFolderHTML +='<img src="'+thumbNailUrl+'" alt="" class="thumb imageThumView2">';
                    menuFolderHTML +='</a>';
                    menuFolderHTML +='<div class="caption">';
                    menuFolderHTML +='<div class="blur"></div>';
                    menuFolderHTML +='<div class="caption-text">';
                    menuFolderHTML +='<h5>'+imageCaption+'</h5>';
                    menuFolderHTML +='<p><a target="_blank" href="'+targetfolderUrl+'">'+albumDescription+'</a></p>';
                    menuFolderHTML +='</div>';
                    menuFolderHTML +=' </div>';
                    menuFolderHTML +='</div>';
                    menuFolderHTML +='</div>';
	                $('.gallerySecondImgThumb').append(menuFolderHTML);
	           }
        }, eror: function (data) {

            console.log('error');
        }
    });
}
///////////////////Create Folder Inside DMS////////
function NewAlbumFolder(albumSiteUrl,newSubFolder)
{
    var fullUrl = albumSiteUrl + "/_api/web/folders";
    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Folder' },
            'ServerRelativeUrl': "MediaGallery/"+newSubFolder
        }),
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }, success: function (response)
        {
            console.log(response);
            var txtNewAlbum=$('#txtNewAlbum').val();
            var txtNewShortNote=$('#txtShortNote').val();
		    var Metadata;
		    var ListName="MediaGalleryCaption";
		    var ItemType = GetItemTypeForListNameDetailsGroups(ListName);
		    Metadata = {
		        __metadata: {
		            'type': ItemType
		        },
		        Title:txtNewAlbum.trim(),///Caption
		        Description:txtNewShortNote.trim()
		    };
            AddItemToListWithMetadat(albumSiteUrl,ListName, Metadata);
            BindAlbumDropDownList(albumSiteUrl);
            alert('New album created successfully.');
            $('#txtNewAlbum').val('');
            $('#txtShortNote').val('');
        },
        error: function (response)
        {
            console.log('Error Folder not created'+response)
        }
    });
}
function BindAlbumDropDownList(targetSiteUrl)
{
    existingAlbumArrayList=[];
	var endPointURL = targetSiteUrl+ "/_api/web/Lists/Getbytitle('MediaGallery')/rootfolder/folders?$select=Name,ServerRelativeUrl&$top=5000";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {
            var folders = data.d.results;
            for (var i = 0; i < folders.length; i++)
            {
	            if(folders[i].Name!="Forms" && folders[i].Name!="_t" && folders[i].Name!="_w")
	            {
	                var imageCaption=folders[i].Name;
	                existingAlbumArrayList.push(imageCaption.toLowerCase());
	             }
             }
        }, eror: function (data)
        {
            console.log('error');
        }
    });

}
function GetAlbumCaptionDescription(targetSiteUrl,targetCaption)
{
   var dfd = $.Deferred();
	var endPointURL = targetSiteUrl + "/_api/web/lists/getbytitle('MediaGalleryCaption')/items?$select=Title,Description&$filter=Title eq '" + targetCaption+ "'";
	  $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
            dfd.resolve(data.d.results);
        }, eror: function (data)
        {
            console.log('error');
            dfd.reject(data);
        }
    });
    return dfd.promise();
}

function LoadRequestDetails() {
    var companySiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var requestURI = companySiteUrl + "/_api/web/lists/getbytitle('Magazine_items')/items?$orderby= Publish_Date desc&$orderby=Volume desc&$expand=AttachmentFiles";
    $.ajax({
        url: requestURI,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            var mainArray = [];
var counternorecord=0;

            var firstSlideHTML = "";
            var secondSlideHTML = "";
            var thirdSlideHTML = "";
            var carSoulIndicator = "";
            for (var i = 0; i < items.length; i++)
            {
                counternorecord++;
                var htmlview = "";
                var FileName = items[i].File.Name;
                var FileServerRelativeUrl = "";
                var FileServerRelativeUrl2 = "";
                if (items[i].AttachmentFiles.results.length > 1) {
                    if (items[i].AttachmentFiles["results"][0].FileName.indexOf('.pdf') == -1) {
                        FileServerRelativeUrl = items[i].AttachmentFiles.results[0].ServerRelativeUrl;
                        FileServerRelativeUrl2 = items[i].AttachmentFiles.results[1].ServerRelativeUrl;
                    }
                    else {
                        FileServerRelativeUrl = items[i].AttachmentFiles.results[1].ServerRelativeUrl;
                        FileServerRelativeUrl2 = items[i].AttachmentFiles.results[0].ServerRelativeUrl;
                    }

                }
                var tempDate = new Date(items[i].Publish_Date);
                var PublishDate = $.datepicker.formatDate('dd-M-yy', tempDate);
                          
                var magzinetitle = items[i].Title;
                var magazineVolume = items[i].Volume==null?'':items[i].Volume;
                
                if (magzinetitle.length > 12) {
                    magzinetitle = magzinetitle.substring(0, 10) + "...";
                }
                htmlview += '<div class="col-sm-4 col-xs-4">';
                htmlview += '<div class="cuadro_intro_hover ">';
                htmlview += '<a target="_blank" href="' + FileServerRelativeUrl2 + '">';
                htmlview += '<img  src="' + FileServerRelativeUrl + '" alt="" class="thumb pic-height magazineimg">';
                htmlview += '</a>';
                htmlview += '<div class="caption">';
                htmlview += '<div class="blur"></div>';
                htmlview += '<div class="caption-text">';
                htmlview += '<h5>' + magzinetitle + '</h5>';
                htmlview += '<p><a target="_blank" href="' + FileServerRelativeUrl2 + '"><span data-localize="VolColon"></span>' + magazineVolume  + '<br><span data-localize="PublishOnColon"></span>' + PublishDate + '</a></p>';
                htmlview += '</div>';
                htmlview += '</div>';
                htmlview += '</div>';
                htmlview += '</div>';
                if (i < 3) {
                    firstSlideHTML += htmlview;
                }
                else if (i > 2 && i < 6) {
                    secondSlideHTML += htmlview;
                }
                else if (i > 5 && i < 9) {
                    thirdSlideHTML += htmlview;
                }
            }
           
            if (firstSlideHTML.length > 0)
            {
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="0" class="active"></li>';
                $('.firstCarSoulSlide').html('');
                $('.firstCarSoulSlide').append(firstSlideHTML);
            }
            else
            {
            $('.firstCarSoulSlide').remove();
            }
          
            if (secondSlideHTML.length > 0)
            {
                carSoulIndicator = "";
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="0" class="active"></li>';
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="1"></li>';
                 $('.SecondCarSoulSlide').html('');
            $('.SecondCarSoulSlide').append(secondSlideHTML);
            }
            else
            {
            $('.SecondCarSoulSlide').remove();
            }
           
            if (thirdSlideHTML.length > 0)
            {
                carSoulIndicator = "";
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="0" class="active"></li>';
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="1"></li>';
                carSoulIndicator += '<li style="border: 2px solid #f9acac" data-target="#carousel-exampleMagzine" data-slide-to="2"></li>';
                 $('.thirdCarSoulSlide').html('');
            $('.thirdCarSoulSlide').append(thirdSlideHTML);
            }
            else
            {
            $('.thirdCarSoulSlide').remove();
            }
            
            
          //  $('.magazineCarouselIndicators').append(carSoulIndicator);
            
            if(counternorecord==0)
            {
            
             var langblankMessage=$('#langBlankTextMessageMagazine').text();
	            if(langblankMessage=="")
	            {
	               langblankMessage="Keep watching for upcoming magazines";
	            }
                var norecord='<div class="magazineNoRecord col-sm-12 col-xs-12 col-md-12"><h3 class="top5" data-localize="NoRecord_Magazine">'+langblankMessage+'</h3></div>';
                // $('.magazineCarouselIndicators').append(norecord);
                $('.magazinePanel').append(norecord);
                
            }
            else
            {
                $('.magazineCarouselIndicators').append(carSoulIndicator);
            }

        }
    });
}