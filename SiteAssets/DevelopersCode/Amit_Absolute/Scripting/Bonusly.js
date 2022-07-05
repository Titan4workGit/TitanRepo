	$(document).ready(function() {
		GetBonusly();
	});
	var LabelText = '';  
	function GetBonusly()
	{
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EnvironmentalSettings')/items?$filter=Title eq 'RSS FEED1' and Active eq '1' &$ Top=1"; 
		$.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        success: function (data) 
		{ 
			var items = data.d.results;  
			if (items.length > 0) 
			{	
				$("#Title_Bonusly").text(items[0].Label);
				LabelText= items[0].Label;
				var Bonuslyfeedurl= items[0].Service_Link.Url;
				var SyncTime  = items[0].RefreshTime*60*1000;
				ReadBonusly(Bonuslyfeedurl,SyncTime);
			}  
		},
		eror: function (data) 
		{  
        	console.log(data);
		}  
		});  
	}

	
	
	
function ReadBonusly(Bonuslyfeedurl,SyncTime)
{debugger;
	$.ajax({
    	//url : 'https://bonus.ly/api/v1/bonuses.json?access_token=45cd240ebef99876142a7b0538d49f19',
    	url: Bonuslyfeedurl,
    	type : 'GET',
    	dataType:'json',
    	success : function(data) 
    	{
    		if(data.result.length>0)
    		{  debugger;
    			$("#Bonusly").empty();
        		var BonuslyDesign='';
        		var x=0;
        		for(x; x<5; x++)
				{	 
					var pointsString = data.result[x].reason;
					var receiver = pointsString.substr(pointsString.indexOf('@')+0).slice(0,70); 
					var TempUrl = data.result[x].reason_html;
					var desc="https://bonus.ly/bonuses/"+data.result[x].id;
					var TextValue =  data.result[x].hashtag;
					BonuslyDesign = BonuslyDesign + "<a href='"+desc+"' target='_blank' >"+
														"<div class='feed-section'>" +
         													"<div class='feed-text-head event-text-head-new'>"+data.result[x].giver.full_name+"<span>+"+data.result[x].amount+"</span><p class='Bonusly_receiver'>"+receiver+"...</p></div>" +
      														"<p>"+TextValue+"</p>" +
      														"</div>" +
      														"<hr class='feed'>" +
      										      		"</div>"+
      									      		"</a>";
				}
				$("#Bonusly").append(BonuslyDesign);
			}
			else
			{
				$("#Bonusly").append("<span>No "+LabelText+" Available</span>");
			}
			if(SyncTime > 0)
			{
				setInterval(function(){GetBonusly();}, SyncTime);
			}
		},
    	error : function(data)
    	{
        	console.log(data);
   		}
	});
}


/*	function ReadBonusly(Bonuslyfeedurl,SyncTime)
	{debugger;
		//var BonuslyUrl = 'https://bonus.ly/api/v1/bonuses.atom?access_token=45cd240ebef99876142a7b0538d49f19';
    	$.ajax({  
        	//url:"https://api.rss2json.com/v1/api.json?rss_url=" + Bonuslyfeedurl,
        	url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fbonus.ly%2Fapi%2Fv1%2Fbonuses.atom%3Faccess_token%3D45cd240ebef99876142a7b0538d49f19&api_key=92eomk3uyzfv62ho2sudod9hukcwibriwzsfpuii&order_by=pubDate&order_dir=desc&count=5",  
        	//url: Bonuslyfeedurl,  
        	headers: { Accept: "application/json;odata=verbose" },  
        	async:false,  
        	success: function (data) 
        	{ var test = JSON.stringify(data);
            	var items = data;  
            	if (data.items.length > 0) 
				{
					$("#Bonusly").empty();
			  		var BonuslyDesign='';
			  		var x=0;
					for(x; x<5; x++)
					{	 
						var pointsString = data.items[x].title;
						var points = pointsString.substr(0,pointsString.indexOf(' '));
						var receiver = pointsString.substr(pointsString.indexOf(' ')+1); 
						//var tempdesc = data.items[x].description;
						//var desc = tempdesc.substr(tempdesc.indexOf('+')+4);
						//var receiver = desc .substr(0,desc .indexOf('&'));
						BonuslyDesign = BonuslyDesign + "<a href='"+data.items[x].link+"' target='_blank'>"+
															"<div class='feed-section'>" +
         														"<div class='feed-text-head event-text-head-new'>"+data.items[x].author+"<span>"+points+"</span><p class='Bonusly_receiver'>"+receiver+"</p></div>" +
      														//"<p>Outstanding work Micheal. Always up with fresh ideas & suggestions. Keep it Up!! #outstandingachiever </p>" +
      														"</div>" +
      													"<hr class='feed'>" +
      										      		"</div>"+
      										      		"</a>";
      				}
					$("#Bonusly").append(BonuslyDesign);
				}
				if(SyncTime > 0)
			{
				setInterval(function(){GetBonusly();}, SyncTime);
			}
  
  			},
			eror: function (data) 
			{  
        		console.log(data);
			}  
    });  		
	}
*/