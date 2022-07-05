$(document).ready(function() {
	GetRssFeedUrl();
}); 
	
function GetRssFeedUrl()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EnvironmentalSettings')/items?$filter=Title eq 'RSS FEED2' and Active eq '1' &$ Top=1"; 
	$.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    success: function (data) 
	{
		console.log("RSS Trigger.");
		var items = data.d.results;  
		if (items.length > 0) 
		{	
			$("#feed_title").text(items[0].Label);
			var rssfeedurl= items[0].Service_Link.Url;
			var SyncTime  = items[0].RefreshTime*60*1000;
			initialize(rssfeedurl,SyncTime);
		} 
		else
		{
			$("#RSSDIV").css("display", "none");
			$(".my_workplace_container .TimelineDesign").css({"min-height": "542px", "height": "542px"});
		} 
	},
	error: function (data) 
	{  
       	alert("An error occurred. Please try again.");  
	}  
	});  
}
	
google.load("feeds", "5");
function initialize(rssfeedurl,SyncTime) 
{
	//var feed = new google.feeds.Feed("https://www.pymnts.com/feed");
	var feed = new google.feeds.Feed(rssfeedurl);
	feed.load(function(result) {
    if (!result.error) 
    {
    	if(result.feed.entries.length>0)
		{
			$("#rssfeed").empty();
			for(var x=0; x<5; x++)
			{	 
				var FeedUrl = result.feed.entries[x].link;
				var FeedTitle = result.feed.entries[x].title;
				$("#rssfeed").append('<a target="_blank" href='+FeedUrl+' class="list-group-item rss-list-item event-text-head-new">'+FeedTitle+'</a>');
			}
		}
		else
		{
			$("#rssfeed").append('<span class="list-group-item rss-list-item event-text-head-new">No Feed Available</span><br>');
		}
		if(SyncTime > 0)
		{
			setInterval(function(){GetRssFeedUrl();}, SyncTime);
		}
	}
    });
}
google.setOnLoadCallback(initialize);
