;(function($, window, document, undefined) {
  "use strict"

  var download = function (options) {
    var triggerDelay = (options && options.delay) || 100
    var cleaningDelay = (options && options.cleaningDelay) || 1000

    this.each(function (index, item) {
      createIFrame(item, index * triggerDelay, cleaningDelay)
    })
    return this
  }

  var createIFrame = function (item, triggerDelay, cleaningDelay) {
    setTimeout(function () {
      var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>')

      frame.attr('src', $(item).attr('href') || $(item).attr('src'))
      $(item).after(frame)

      setTimeout(function () { frame.remove() }, cleaningDelay)
    }, triggerDelay)
  }

  $.fn.multiDownload = function(options) {
      return download.call(this, options)
  }

})(jQuery, window, document);


/*  ------------- sort Media Gallery  -----------------*/
var isAdmin=false;
function mostLike(arr,isAdmin)
{
    $('#galleryFirstImgThumb').empty();
    isAdmin=isAdmin;
	arr.sort(function(a,b)
	{
		return b.Like-a.Like;

	})
	for(var i=0;i<arr.length;i++){
	  var items=sortMediagallery(arr,i)
	  $('#galleryFirstImgThumb').append(items)
    }
}
function recentAlbum(arr,isAdmin)
{
	$('#galleryFirstImgThumb').empty();
	isAdmin=isAdmin;
	arr.sort(function(a, b) {
	 var keyA = new Date(a.Publishing1),
         keyB = new Date(b.Publishing1);
				  // Compare the 2 dates
		 if (keyB < keyA) return -1;
	     if (keyB > keyA) return 1;
		   return 0;
   });
	for(var i=0;i<arr.length;i++){
	  var items=sortMediagallery(arr,i)
	  $('#galleryFirstImgThumb').append(items)
    }
    
}

function mostView(arr,isAdmin)
{
	$('#galleryFirstImgThumb').empty();
	isAdmin=isAdmin;
	arr.sort(function(a,b)
	{
		return b.View-a.View;

	})
	for(var i=0;i<arr.length;i++){
	  var items=sortMediagallery(arr,i)
	  $('#galleryFirstImgThumb').append(items)
    }
    
}

function mostComments(arr,isAdmin)
{
	$('#galleryFirstImgThumb').empty();
	isAdmin=isAdmin;
	arr.sort(function(a,b)
	{
		return b.Comments-a.Comments;

	})
	for(var i=0;i<arr.length;i++){
	  var items=sortMediagallery(arr,i)
	  $('#galleryFirstImgThumb').append(items)
    }
}

function recentUpload(arr,isAdmin)
{
   $('#galleryFirstImgThumb').empty();
   isAdmin=isAdmin;
   arr.sort(function(a,b)
	{
		return a.Id-b.Id;

	})
	for(var i=0;i<arr.length;i++)
	{
	  var items=sortMediagallery(arr,i)
	  $('#galleryFirstImgThumb').append(items)
	
	}    
}






function sortMediagallery(arr,x){
 var targetfolderUrl=arr[x].targetfolderUrl;
   var redirecturl='../Pages/MediaGalleryDetail.aspx?WebAppId=2&FName='+targetfolderUrl+'&Mode=View&sourcelocation=../Pages/MediaGalleryNew.aspx';
   
      var ImageCount=arr[x].imgCount;

      var menuFolderHTML=''
             if(ImageCount==0){
                menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card album-card-default">'
                menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
                menuFolderHTML +='<div class="album-img-grid-default" id="album-default-case">'
                menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/default album.png" alt="album img grid default"></div></div>'                                 
                menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right"><div class="album-detail-box"><div class="album-heading">'        
                menuFolderHTML +='<a href="'+redirecturl+'">'+arr[x].Title+'</a>' 
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-info">'
                menuFolderHTML +='<span>'+arr[x].Description+'</span>' 
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="row album-detail-footer">'
                menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
                menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
                menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
                menuFolderHTML +='<img src="'+arr[x].userImage+'"data-themekey="#">'
                menuFolderHTML +='<div class="album-user-image-text">'
                menuFolderHTML +='<p class="mb0">'+arr[x].Author+'</p>'
                if(arr[x].UserDepartment!=''){
                 menuFolderHTML +='<p class="mb0">'+arr[x].UserDepartment+' | '+arr[x].designation+' </p>'
                }
                menuFolderHTML +='<p class="mb0 Emailfont">'+arr[x].EMail+'</p>'
                menuFolderHTML +='</div></div>'                               
                menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
                if(arr[x].Event_Name!=''){
                 menuFolderHTML +='<p class="media-event">Event: <span id="">'+arr[x].Event_Name+'</span></p> '                    
                }                        
                menuFolderHTML +='<p class="media-place">Place: <span id=""> '+arr[x].Event_Place+' </span></p>'
                menuFolderHTML +='<p class="media-date">Date: <span id=""> '+arr[x].Publishing+' </span></p>'                           
                menuFolderHTML +='</div></div></div>'              
                menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
                menuFolderHTML +='<div class="album-data-box">'
                menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
                menuFolderHTML +='<div class="album-inner-card-btn-item">'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">234</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
                menuFolderHTML +='<span> </span></div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">3</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-count">1</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
                menuFolderHTML +='</div>'
                menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
                menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
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
				var extofImage=arr[x].imgtype1;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img1+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img1+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				
				menuFolderHTML +='</div></div>'	
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+arr[x].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info"><span>'+arr[x].Description+'</span></div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+arr[x].userImage+'" data-themekey="#"/>'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+arr[x].Author+'</p>'
			   if(arr[x].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+arr[x].UserDepartment+'| '+arr[x].designation +'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+arr[x].EMail+'</p>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(arr[x].Event_Name!=''){
				 menuFolderHTML +='<p class="media-event">Event: <span id="">'+arr[x].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+arr[x].Event_Place+' </span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+arr[x].Publishing+'</span></p>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#"/>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Comments+'</div>'
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
				var extofImage=arr[x].imgtype1;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img1+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img1+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				var extofImage=arr[x].imgtype2;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img2+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img2+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }				
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+arr[x].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+arr[x].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+arr[x].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+arr[x].Author+'</p>'
				if(arr[x].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+arr[x].UserDepartment+'| '+arr[x].designation+'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+arr[x].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(arr[x].Event_Name!=''){
				menuFolderHTML +='<p class="media-event">Event: <span id="">'+arr[x].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+arr[x].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+arr[x].Publishing+'</span></p>'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn' onclick='downLoadFile(\""+targetfolderUrl+"\");'> "
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i>'
				if(isAdmin==true){
				menuFolderHTML +="</a><a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'> <i class='fa fa-trash-o' aria-hidden='true'></i></a>"
				}
				menuFolderHTML +='</div></div></div></div>'
				return menuFolderHTML;
              
              }
              
              if(ImageCount==3){
              menuFolderHTML +='<div class="col-xs-12 col-sm-12 album-col-info album-card">'
				menuFolderHTML +='<div class="col-xs-12 col-sm-3 album-card-left">'
				menuFolderHTML +='<div class="row album-img-grid-case-3" id="album-case-3">'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-left">'
				var extofImage=arr[x].imgtype1;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img1+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img1+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }				
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-1">'
				var extofImage=arr[x].imgtype2;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img2+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img12+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-2">'
				var extofImage=arr[x].imgtype3;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img3+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img3+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-3.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+arr[x].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+arr[x].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+arr[x].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+arr[x].Author+'</p>'
				if(arr[x].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+arr[x].UserDepartment+'| '+arr[x].designation+'</p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+arr[x].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(arr[x].Event_Name!=''){
				menuFolderHTML +='<p class="media-event">Event: <span id="">'+arr[x].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id="">'+arr[x].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+arr[x].Publishing+' </span></p></div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn'  onclick='downLoadFile(\""+targetfolderUrl+"\");'> ";
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
				if(isAdmin==true){
				menuFolderHTML +="<a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'> <i class='fa fa-trash-o' aria-hidden='true></i></a>"
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
				var extofImage=arr[x].imgtype1;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img1+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img1+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-1.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-left-row-2">'
				var extofImage=arr[x].imgtype2;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img2+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img2+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }
				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-2.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-xs-6 album-case-half-right">'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-1">'
				var extofImage=arr[x].imgtype3;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img3+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img3+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-3.jpg" alt="album img grid default">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="col-xs-12 album-case-half-right-row-2">'
				var extofImage=arr[x].imgtype4;
				if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		           {
		             menuFolderHTML +='<img src="'+arr[x].img4+'" alt="album img grid case 1"/>'
		            }
		         else{
		             menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+arr[x].img4+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		             menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div>'

                }

				//menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/album-bg-4.jpg" alt="album img grid default">'
				menuFolderHTML +='</div></div></div></div>'
				menuFolderHTML +='<div class="col-xs-12 col-sm-9 album-card-right">'
				menuFolderHTML +='<div class="album-detail-box">'
				menuFolderHTML +='<div class="album-heading">'
				menuFolderHTML +='<a href="'+redirecturl+'" >'+arr[x].Title+'</a> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-info">'
				menuFolderHTML +='<span>'+arr[x].Description+'</span> '
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="row album-detail-footer">'
				menuFolderHTML +='<div class="col-sm-8 col-xs-12 album-detail-left">'
				menuFolderHTML +='<div class="col-sm-12 album-user-info-grid">'
				menuFolderHTML +='<div class="col-sm-6 album-user-image-box">'
				menuFolderHTML +='<img src="'+arr[x].userImage+'" data-themekey="#">'
				menuFolderHTML +='<div class="album-user-image-text">'
				menuFolderHTML +='<p class="mb0">'+arr[x].Author+'</p>'
				if(arr[x].UserDepartment!=''){
				 menuFolderHTML +='<p class="mb0">'+arr[x].UserDepartment +'| '+arr[x].designation+' </p>'
				}
				menuFolderHTML +='<p class="mb0 Emailfont">'+arr[x].EMail+'</p>'
				menuFolderHTML +='</div></div>'
				menuFolderHTML +='<div class="col-sm-6 album-user-details-box">'
				if(arr[x].Event_Name!=''){
				menuFolderHTML +='<p class="media-event">Event: <span id=""> '+arr[x].Event_Name+'</span></p>'
				}
				menuFolderHTML +='<p class="media-place">Place: <span id=""> '+arr[x].Event_Place+'</span></p>'
				menuFolderHTML +='<p class="media-date">Date: <span id=""> '+arr[x].Publishing+' </span></p>'
				menuFolderHTML +='</div></div></div>'
				menuFolderHTML +='<div class="col-sm-4 col-xs-12 album-detail-right">'
				menuFolderHTML +='<div class="album-data-box">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel album-inner-card-btn-panel-isTab">'
				menuFolderHTML +='<div class="album-inner-card-btn-item">'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/image-gallery-icon.jpg" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+ImageCount+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap">'
				menuFolderHTML +='<span> </span></div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].View+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Like+'</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-gap"><span> </span>'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-icon">'
				menuFolderHTML +='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png" data-themekey="#">'
				menuFolderHTML +='</div>'
				menuFolderHTML +='<div class="album-inner-card-btn-panel-count">'+arr[x].Comments+'</div>'
				menuFolderHTML +='</div></div></div></div></div>'
				menuFolderHTML +='<div class="dropdown custom-card-menu">'
				menuFolderHTML +="<a class='album-download-btn'  onclick='downLoadFile(\""+targetfolderUrl+"\");'> "
				menuFolderHTML +='<i class="fa fa-download" aria-hidden="true"></i></a>'
				if(isAdmin==true){
				menuFolderHTML +="<a class='album-delete-btn'  onclick='deleteFolder(\""+targetfolderUrl+"\");'><i class='fa fa-trash-o' aria-hidden='true'></i></a>"
				}
				menuFolderHTML +='</div></div></div></div>'
				              
              
              return menuFolderHTML;
              } 
  
}

function FilesLike(arr)
{
    $('#galleryFirstImgThumb').empty();
	arr.sort(function(a,b)
	{
		return b.Like-a.Like;

	})
	for(var i=0;i<arr.length;i++){
	  var items=mediaDeatilsHTML(arr,i)
	  //$('#galleryFirstImgThumb').html('');
	  //$('#galleryFirstImgThumb').append(menuFolderHTML);
	  $('#galleryFirstImgThumb').append(items)
    }
}
function FilesView(arr)
{
	$('#galleryFirstImgThumb').empty();
	arr.sort(function(a,b)
	{
		return b.View-a.View;

	})
	for(var i=0;i<arr.length;i++){
	  var items=mediaDeatilsHTML(arr,i)
	  //$('#galleryFirstImgThumb').html('');
	  //$('#galleryFirstImgThumb').append(menuFolderHTML);
	  $('#galleryFirstImgThumb').append(items)

    }
    
}
function FilesComments(arr)
{
	$('#galleryFirstImgThumb').empty();
	arr.sort(function(a,b)
	{
		return b.Comment-a.Comment;

	})
	for(var i=0;i<arr.length;i++){
	 var items=mediaDeatilsHTML(arr,i)
	  //$('#galleryFirstImgThumb').html('');
	  //$('#galleryFirstImgThumb').append(menuFolderHTML);
	  $('#galleryFirstImgThumb').append(items)
    }
}

function recentFiles(arr)
{
   $('#galleryFirstImgThumb').empty();
   arr.sort(function(a,b)
	{
		return b.Id-a.Id;

	})
	for(var i=0;i<arr.length;i++)
	{
	  var items=mediaDeatilsHTML(arr,i)
	  //$('#galleryFirstImgThumb').html('');
	  //$('#galleryFirstImgThumb').append(menuFolderHTML);
	  $('#galleryFirstImgThumb').append(items)
	
	}    
}

function mediaDeatilsHTML(arr,x){
 var menuFolderHTML='';
                menuFolderHTML+='<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 album-col-info">'
				menuFolderHTML+='<div class="album-card album-photo-view-card">'
				menuFolderHTML+='<a href="#" class="album-card-info album-card-show" data-toggle="modal" data-target="#photo-view-with-comments">'
				var extofImage=arr[x].extofImage;
				var thumbNailUrl=arr[x].thumbNailUrl;
				
			   if(extofImage=='jpg'  || extofImage=='JPG' || extofImage=='JPEG' || extofImage=='GIF' || extofImage=='PNG' || extofImage=='BMP' || extofImage=='jpeg' || extofImage=='gif' || extofImage=='png'  ||  extofImage=='bmp')
		        {
		          menuFolderHTML +='<img src="'+thumbNailUrl+'" alt="album bg"></a>';
		        }
		        else{
		           menuFolderHTML +='<video class="video-box" width="100%" height="100%"><source src="'+thumbNailUrl+'" type="video/mp4"> Your browser does not support the video tag.</video>'
		           menuFolderHTML +='<div class="play-icon"><i class="fa fa-play"></i></div></a>'

                 }
                 var View=arr[x].View;
                 if(View==null)View=0
                 var Like=arr[x].Like;
                 if(Like==null)Like=0
                 var Comment=arr[x].Comment;
                 if(Comment==null)Comment=0

				//menuFolderHTML+='<video class="video-box" width="100%" height="100%">'
				//menuFolderHTML+='<source src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/demo-video.mp4" type="video/mp4">Your browser does not support the video tag.</video>'
				//menuFolderHTML+='<div class="play-icon"><i class="fa fa-play"></i></div></a>'
				menuFolderHTML+='<div class="album-card-footer">'
				menuFolderHTML+='<div class="album-card-footer-flex-box">'
				menuFolderHTML+='<p class="mb-0 album-card-footer-date">'+arr[x].Publishing+'</p>'
				menuFolderHTML+='<ul class="nav media-gallery-user-btn-item">'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img class="views-img" src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/visibility-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count"><span>'+View+'</span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-gap"><span></span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img class="like-img" src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/like-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count"><span>'+Like+'</span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-gap"><span></span></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-icon">'
				menuFolderHTML+='<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/MediaGallery/assets/images/chat-icon.png"></li>'
				menuFolderHTML+='<li class="media-gallery-user-btn-panel-count active"><a href="#" data-toggle="modal" data-target="#photo-view-with-comments">'+Comment+'</a></li></ul></div>'
				menuFolderHTML+='<div class="dropdown custom-card-menu">'
				menuFolderHTML+='<a class="album-download-btn" href="'+thumbNailUrl+'" download>'
				menuFolderHTML+='<i class="fa fa-download" aria-hidden="true"></i></a>'
				menuFolderHTML+="<a class='album-delete-btn' onclick='deleteFile(\""+thumbNailUrl+"\");'>"
				menuFolderHTML+='<i class="fa fa-trash-o" aria-hidden="true"></i></a></div>'
				menuFolderHTML+='<div class="custom-album-check-box">'
				menuFolderHTML+='<div class="chexbox_mg">'
				menuFolderHTML+='<input  class="messageCheckbox" value="'+thumbNailUrl+'" type="checkbox" id="'+arr[x].myCheckbox+'">'
				menuFolderHTML+='<label for="'+arr[x].myCheckbox+'">'
				// <img src="http://townandcountryremovals.com/wp-content/uploads/2013/10/firefox-logo-200x200.png" /> -->
				menuFolderHTML+='<i class="fa fa-circle-thin" aria-hidden="true"></i>'
				menuFolderHTML+='</label></div></div></div></div></div>'
				
				return menuFolderHTML

				

}
