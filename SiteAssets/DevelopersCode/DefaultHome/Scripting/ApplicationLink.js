$(document).ready(function(){

	setTimeout(function(){ ApplicationLink(); }, 2000);		
	
});

$( window ).load(function() {
  // Run code
  //ApplicationLink();
});
	
function ApplicationLink()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items?select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=CompanyIdId eq '"+Logged_CompanyId+"' and Status eq '1' and VisibleAt eq 'Home Page' or (Audience eq  'Corporate' and VisibleAt eq 'Home Page')&$Top=6&$orderby=Modified desc";  
	$.ajax({  
    	url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        success: function (data) 
		{ 
			var items = data.d.results;
			$("#H_learning").empty();;  
			if(items.length>0)
			{
				var imageurl=[];
				var description=[];
				var Url_Link=[];
				for (var x=0; x<items.length; x++)
				{
					if(items[x].Event_pick != "" && items[x].Event_pick != null)
					{
						imageurl.push(items[x].Event_pick);
						description.push(items[x].Title);
						Url_Link.push(items[x].LinkLocation.Url);
					}
					else if (items[x].AttachmentFiles.results.length > 0)
					{
						imageurl.push(items[x].AttachmentFiles.results[0].ServerRelativeUrl);
                    	description.push(items[x].Title);
                    	Url_Link.push(items[x].LinkLocation.Url);
                	}			
				}
			
				//$("#H_learning").empty();	
				for(k=0; k<imageurl.length; k++)
				{
					var image = imageurl[k];
					var Desc_title= description[k];
					if(Desc_title.length>40)
					{
					var Desc_Title2= Desc_title.slice(0,40)+'...';
					}
					else
					{
					var Desc_Title2= Desc_title;
					}
					
					var link= Url_Link[k];
					if(k==0){ $('#H_learning').append('<a href="'+link+'" target="_blank"><div class="item active"><img src="'+image+'" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">'+Desc_Title2+'</h5></div></a>'); }
					else { $('#H_learning').append('<a href="'+link+'" target="_blank"><div class="item"><img src="'+image+'" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">'+Desc_Title2+'</h5></div></a>'); }				
				}			
			}
			else
			{
				$('#H_learning').append('<div class="item active Null-Case-learning"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/ImageGallery/Default_Learning.png" alt="" class="LearningNull"></div>');
			
			}	
			
			$('.new-learn').owlCarousel({
			loop:true,
        	smartSpeed:800,
			nav:true,
        	maxHeight: 212,
			autoplay:true,
        	autoplayTimeout:3600,
        	autoplayHoverPause:true,
			dots:false,
			responsive:{
				0:{ items:1 },
				600:{ items:1 },
				1000:{ items:1 }
				}
			})
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
		});  
	}	
