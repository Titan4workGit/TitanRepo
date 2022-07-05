//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var sorterSharedWithMe;
var ViewThoughts = function () {
	this.Mode;					// Add, Update, View
	this.SiteURL;
	this.CompanyId;
	
	this.AllThoughts=$(".mainDivAllThoughts");	 //$("#mainDivAllAnnouncements");
	this.AddThought= $("#addThoughts");
	this.CloseThought=$("#closeThought");
	this.NoRecordFound=$(".NoRecordFound");
};

ViewThoughts.prototype.InitializeControls = function InitializeControls() {
	var Handler=this;
	
	Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');		// Get Company ID from QueryString
	Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
}

ViewThoughts.prototype.SetControls = function  SetControls() {
	var Handler=this;
	var webPartCollection = new Array();
	webPartCollection.push("Thoughts");

	var users = UserExistInProcessApprover(Handler.CompanyId, "", webPartCollection);
	
  	for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++)
  	{
	  	if(users.length>0 && users[collectionIndex].webPartName == "Thoughts")
	    {
	    	Handler.AddThought.show();
	    	$(".panel-heading  .nosort").show();
		  	$(".evenrow td:last").show(); 
		  	$(".oddrow td:last").show();   
		}
	    else
	    {
	    	Handler.AddThought.hide();
	    	$(".panel-heading .nosort").hide();
	    	$(".evenrow td:last").hide();
	    	$(".oddrow td:last").hide();  
	    }
	}
}


ViewThoughts.prototype.BindEvents= function BindEvents() {
	var Handler=this;
	
	Handler.AddThought.click(function(){
		window.location.href="../Pages/AddThoughtOFTheDay.aspx?WebAppId="+Handler.CompanyId+"&Mode=Add";
	});
	
	Handler.CloseThought.click(function(){
		window.location.href="../Pages/AdminPortal.aspx?WebAppId="+Handler.CompanyId;
	});
}

ViewThoughts.prototype.ExecuteOrDelayUntilScriptLoad=function ExecuteOrDelayUntilScriptLoad()
{
	var Handler=this;
	objViewThoughts.GetAllThoughts();		// Get Thoughts
	//objViewThoughts.SetControls();    			// Set Controls
}

ViewThoughts.prototype.TableConfiguration= function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableThoughts', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columns',
        currentid: 'currentpage',
        totalid: 'totalpages',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

ViewThoughts.prototype.GetAllThoughts= function GetAllThoughts()
{
	var Handler=this;
	var thoughtTitle;  
	
	thoughtTitle='Title';   
	if($.cookie.length>0 && $.cookie("Language")!=undefined && $.cookie("Language")!=undefined)
	{	
	 	var preferredLanguageValue=$.cookie("Language");
	 	var preferredLanguage=$.cookie("Language").split('#');	// Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
	 	if(preferredLanguage[0]!='DefaultLanguage')
	 	{
	 		thoughtTitle=preferredLanguage[0];
	 	}
	}
	
    var Ownurl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ThoughtOfTheDay')/Items?$select=ID,Title,"+thoughtTitle+",QuotationBy,DisplayDate&$orderby=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            var tableItemsHTML = "";
            var thoughtDescription="QuotationBy";
            			
			for (var i = 0; i < items.length; i++) 
            {
            	var itemId = items[i].ID;
				var Title = (items[i][thoughtTitle]==null)?items[i]['Title']:items[i][thoughtTitle];
				
                var Description=items[i][thoughtDescription];
                if(Description==null)
					Description= items[i]["QuotationBy"];
					                
                var Created=items[i]["DisplayDate"];
                if (Created== null) 
                    Created= "Default";
                else
                {
                	Created= new Date(Created);
                	Created= $.datepicker.formatDate('dd-M-yy', Created);
				}
                
				var viewItem = "../Pages/AddThoughtOFTheDay.aspx?WebAppId="+Handler.CompanyId+"&ItemId="+itemId +"&Mode=View";
                var editItem = "../Pages/AddThoughtOFTheDay.aspx?WebAppId="+Handler.CompanyId+"&ItemId="+itemId +"&Mode=Update";
				
                tableItemsHTML += "<tr><td>" + Created + "</td><td>" + Title+ "</td><td>" +Description+ "</td>";
                //tableItemsHTML +="<td style='display:none;'><a class='btn btn-warning btn-xs' style='min-width:30px !important;' href="+ viewItem +"><span class='glyphicon glyphicon-list'></span></a>";
                tableItemsHTML +="<td style='text-align:center;'>";
                tableItemsHTML +="<a class='btn btn-outline-primary btn-xs' style='min-width:30px !important;' href='"+ editItem +"'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>";
                if(Created!="Default")
                {
                	tableItemsHTML +='<a class="btn btn-outline-danger btn-xs" style="min-width:30px !important;" onclick="objViewThoughts.DeleteThought('+itemId+')"><i class="fa fa-trash" aria-hidden="true"></i></a></td></td></tr>';	
                }
			 }	
          	
            var completebody = tableItemsHTML;
            var dvTable = Handler.AllThoughts;
            dvTable.html("");
          	
          	if (items.length == 0) 
            {
                Handler.NoRecordFound.show();
            }
            else
            {
            	 Handler.NoRecordFound.hide();
            }
            
            dvTable.append(completebody);
            if (items.length > 0) 
            {
                objViewThoughts.TableConfiguration();		// GenerateTableSharedWithMe();
                objViewThoughts.SetControls();    			// Set Controls
            }
        }, eror: function (data) {

            console.log('error');
        }
    });
}

ViewThoughts.prototype.DeleteThought = function DeleteThought(ItemId) {
	var Handler=this;
	var ListName ='ThoughtOfTheDay';
	
	var deleteConfirmation= confirm("Do you want to delete this thought?");
	if(deleteConfirmation)
	{
		var URL =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName +"')/items("+ItemId+")";
	    $.ajax({
	        url: URL,
	        type:"DELETE",
	        headers: { "accept": "application/json;odata=verbose",
	        		   "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	        		   "IF-MATCH": "*" },
	        success: function (data)
	        {
				alert("Thought of the day deleted successfully");
				objViewThoughts.GetAllThoughts();
				//objViewThoughts.SetControls();    			// Set Controls
			}, 
	        error: function (data)
	        {
	             console.log(data);
	        }
	    });
    }
}

ViewThoughts.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

ViewThoughts.prototype.UserAuthorization = function UserAuthorization()
{
	var companyId =  titanForWork.getQueryStringParameter("CompanyId");
	titanForWork.PageAuthorization("ManageThoughtsOfTheDay",companyId).done(function(currentUserRights,message)
	{
		if(currentUserRights.length>0)
		{
			if((currentUserRights[0].SiteAdmin=="SiteAdmin") || (currentUserRights[0].TechAdmin=="TechAdmin"))
			{
				objViewThoughts.InitializeControls();
				objViewThoughts.BindEvents();
			    
			    ExecuteOrDelayUntilScriptLoaded(objViewThoughts.ExecuteOrDelayUntilScriptLoad, "sp.js");		
			}
			else
			{
				alert(message);
				window.location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/Default.aspx?WebAppId=" + companyId;
			}
		}
   });
}

$(document).ready(function () {
    objViewThoughts= new ViewThoughts();
    objViewThoughts.UserAuthorization();
});
