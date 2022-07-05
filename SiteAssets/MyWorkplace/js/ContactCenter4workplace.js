$(window).ready(function() {
 // executes when complete page is fully loaded, including all frames, objects and images
 //alert("window is loaded");
 	GetLoginUserClients();
	setInterval(function(){ GetLoginUserClients() }, 200000);            


});

function GetLoginUserClients(){
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$filter=CompanyID/Id eq '" + Logged_CompanyId + "' and (InternalMembers/Id eq '"+_spPageContextInfo.userId+"' or InternalSupervisor/Id eq '"+_spPageContextInfo.userId+"')&$top=5000&$orderby=Title asc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) 
        {
        	var AllActiveClients=[];
        	//$('#CustomerList').empty();
            var items = data.d.results;
            var TableDesign = "";
            if (items.length > 0) 
            {
            	for (i = 0; i < items.length; i++) 
                {	
                	AllActiveClients.push(items[i].ID);                    
                }
            }
            
            GetUnreadmsgCounts(AllActiveClients)
            //setInterval(function(){ GetUnreadmsgCounts(AllActiveClients) }, 10000);            
        },
        error: function (data)
        {
            console.log("Error in AllActiveClients.");
            console.log(data);
        }
    });
}

var TotalNotification=0;
function GetUnreadmsgCounts(AllActiveClients)
{
	if (AllActiveClients.length > 0) 
	{	TotalNotification=0;
    	for (var j = 0; j < AllActiveClients.length; j++) 
    	{
        	dfds = $.Deferred(),
			NewQuery = "?$top=5000&$select=*,Client/MaxMsgID&$expand=Client&$filter=Client/Id eq '"+AllActiveClients[j]+"' and User/Id eq '"+_spPageContextInfo.userId+"'";
			url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenterMsgCounts')/items/" + NewQuery;
			FilterRequestQueryData(url,AllActiveClients[j],dfds);			
		}
	}
	if( TotalNotification != 0)
	{
		//alert(TotalNotification);
		$("#TotalNotifications").text(TotalNotification);
		$("#TotalNotifications").css("display", "block");
	}
}


function FilterRequestQueryData(Query,Client)
{
    var ResultItems=[];
    var Ownurl = Query;  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            var RequestStatusLastMsg = data.d.results; 
            var RequestUnreadMsg='';			
			if(RequestStatusLastMsg.length>0)
			{
				dfds = $.Deferred(),
				NewQuery = "?$top=5000&$orderby=ID asc&$select=ID,AuthorId&$skipToken=Paged=TRUE%26p_ID=" + RequestStatusLastMsg[0].LastMessageRead + "&$filter=(WebPartName eq 'ContactCenter' and Customer/Id eq '"+Client+"' and AuthorId ne '"+_spPageContextInfo.userId+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";//(WebPartName eq 'ContactCenter' and Customer/Id eq '"+ActiveCustomer+"' and (Initials eq 'Parent' or Initials eq 'Reply'))
			}
			else
			{
				//NewQuery = "?$top=5000&$orderby=ID asc&$select=ID,AuthorId&$filter=(WebPartName eq 'ContactCenter' and Customer/Id eq '"+Client+"' and AuthorId ne '"+_spPageContextInfo.userId+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";//(WebPartName eq 'ContactCenter' and Customer/Id eq '"+ActiveCustomer+"' and (Initials eq 'Parent' or Initials eq 'Reply'))
			}
			if(RequestStatusLastMsg.length>0)
			{
				var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenter')/items/" + NewQuery;
            	$.ajax({  
        		url: Ownurl,  
        		headers: { Accept: "application/json;odata=verbose" },  
        		async:false,  
        		success: function (data) 
        		{ 			
        		    RequestUnreadMsg = data.d.results;
        		    if(RequestUnreadMsg.length>0)
					{
						if(RequestUnreadMsg[(RequestUnreadMsg.length-1)].AuthorId != _spPageContextInfo.userId)
						{	
							TotalNotification = TotalNotification + RequestUnreadMsg.length;						
						}				
					}					
        		},
        		error: function (data) 
        		{          		    
        		    console.log("Error in FilterRequestQueryData.");
        			console.log(data);  
        		}  
    			});
    		} 
        },
        error: function (data) 
        {  
        	console.log("Error in FilterRequestQueryData.");
        	console.log(data);              
        }  
    });
    return ResultItems;
}

