	$(document).ready(function() {
	//getdata();
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
			var items = data.d.results;  
			if (items.length > 0) 
			{	
				$("#feed_title").text(items[0].Label);
				var rssfeedurl= items[0].Service_Link.Url;
				var SyncTime  = items[0].RefreshTime*60*1000;
				//ReadRssFeed(rssfeedurl,SyncTime);
				initialize(rssfeedurl,SyncTime);
			}  
		},
		eror: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
		});  
	}
	
	
	google.load("feeds", "5");

    function initialize(rssfeedurl,SyncTime) {
      //var feed = new google.feeds.Feed("https://www.pymnts.com/feed");
      var feed = new google.feeds.Feed(rssfeedurl);
      feed.load(function(result) {
        if (!result.error) {
        
        if(result.feed.entries.length>0)
			{
				$("#rssfeed").empty();
				for(var x=0; x<5; x++)
				{	 
					var FeedUrl = result.feed.entries[x].link;
					var FeedTitle = result.feed.entries[x].title;
					$("#rssfeed").append('<a target="_blank" href='+FeedUrl+' class="list-group-item rss-list-item event-text-head-new">'+FeedTitle+'</a><br>');
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
	
	
	
	
	/*
	function ReadRssFeed(rssfeedurl,SyncTime)
	{debugger;
		$.ajax({  
        type: 'GET',  
        url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.pymnts.com%2Ffeed%2F&api_key=92eomk3uyzfv62ho2sudod9hukcwibriwzsfpuii&order_by=pubDate&order_dir=desc&count=5", //For converting default format to JSON format  
        //url:rssfeedurl, 
        dataType: 'jsonp', 
        success: function(data) 
		{debugger;
			if(data.items.length>0)
			{
				$("#rssfeed").empty();
				for(var x=0; x<5; x++)
				{	 
					var FeedUrl = data.items[x].link;
					var FeedTitle = data.items[x].title;
					$("#rssfeed").append('<a target="_blank" href='+FeedUrl+' class="list-group-item rss-list-item event-text-head-new">'+FeedTitle+'</a><br>');
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
		},
		error:function(data){console.log(data);}  
		});  
	}
	
function getdata()
{debugger;
  
    var Ownurl ="https://www.pymnts.com/feed";  
    $.ajax({   
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
			debugger; 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
                				
            }  
  
        },
			eror: function (data) 
			{  
        		alert("An error occurred. Please try again.");  
			}  
    });  
	
}*/
