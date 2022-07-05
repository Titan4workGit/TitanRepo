$(document).ready(function(){
		
});

$(window).load(function() {
	ApplicationLink();
});  
	
function ApplicationLink()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items?select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=Company eq '"+titanForWork.getQueryStringParameter('CompanyId')+"' and Status eq '1' and VisibleAt eq 'Home Page'&$Top=6&$orderby=Modified desc";  
  //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items?select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=Company eq '2' and Status eq '1' and VisibleAt eq 'Home Page'&$Top=6&$orderby=Modified desc";  
	$.ajax({  
    	url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        success: function (data) 
		{ 
			var items = data.d.results;  
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
			
				$("#H_learning").empty();	
				for(k=0; k<imageurl.length; k++)
				{
					var image = imageurl[k];
					var Desc_title= description[k];
					var link= Url_Link[k];
					if(k==0){ $('#H_learning').append('<a href="'+link+'" target="_blank"><div class="item active"><img src="'+image+'" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">'+Desc_title+'</h5></div></a>'); }
					else { $('#H_learning').append('<a href="'+link+'" target="_blank"><div class="item"><img src="'+image+'" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">'+Desc_title+'</h5></div></a>'); }				
				}			
			}
			else
			{
			/*	for(k=0; k<8; k++)
				{
					if(k==0){ $('#H_learning').append('<div class="item active"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/Biography/images/i1.jpeg" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">Launch of Intranet Portal at new office location</h5></div>'); }
					else { $('#H_learning').append('<div class="item"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/Biography/images/i2.jpg" id="sliderImage'+k+'"  alt=""><h5 class="event-text-head-new">Launch of Intranet Portal at new office location</h5></div>'); }				
				}
				//$("#carousel-example-generic").hide();		
			*/				
			}	
			
			$('.new-learn').owlCarousel({
				loop:true,
        		smartSpeed:800,
        		margin:5,
				nav:true,
        		maxHeight: 212,
        		slideBy: 3,
				dots:false,
				responsive:{
					0:{	items:1},
					600:{ items:1 },
					1000:{ items:3 }
					}
			})
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
		});  
	}	
