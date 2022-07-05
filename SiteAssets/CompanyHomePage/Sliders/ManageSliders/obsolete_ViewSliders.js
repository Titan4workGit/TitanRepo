//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var sorterSharedWithMe;
var ViewSliders = function () {
	this.Mode;					// Add, Update, View
	this.SiteURL;
	this.CompanyId;
	
	this.AllSliders=$(".mainDivAllSliders");	 
	this.AddSlider= $("#addSlider");
	this.CloseSlider=$("#closeSlider");
	this.NoRecordFound=$(".NoRecordFound");
	this.IsSliderAdmin=false;
	
	// Attachments
	this.ModalManageSliders=$("#modalManageSliders");
	this.btnSliderClose=$("#btnSliderClose");
	this.SlidersAttachments=$(".slidersAttachments");
	this.AttachmentsDiv=$(".attachmentsDiv");
};

ViewSliders.prototype.InitializeControls = function InitializeControls() {
	var Handler=this;
	
	Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');		// Get Company ID from QueryString
	Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
	
	ValidateLoginUser();

	// User Auhorization
	var webPartCollection = new Array();
	webPartCollection.push("Banners");
	var users = UserExistInProcessApprover(Handler.CompanyId, "", webPartCollection);
	if(users.length==0)
	{
		//Handler.AddSlider.remove();
		//$(".panel-heading th:last").remove();
    	//Handler.IsSliderAdmin=false;
    }
	else
	{
	  	for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++)
	  	{
		  	if(users.length>0 && users[collectionIndex].webPartName == "Banners")
		    {
		    	//Handler.IsSliderAdmin=true;
		    }
		}
	}
}


ViewSliders.prototype.BindEvents= function BindEvents() {
	var Handler=this;
	
	Handler.AddSlider.click(function(){
		window.location.href="../Pages/AddSlider.aspx?WebAppId="+Handler.CompanyId+"&Mode=Add";
	});
	
	Handler.CloseSlider.click(function(){
		window.location.href="../Pages/Default.aspx?WebAppId="+Handler.CompanyId;
	});
	
	 // Close Popup
	 $(Handler.btnSliderClose).click(function()
	 {
		Handler.ModalManageSliders.modal('hide');
	 })
}

/*ViewSliders.prototype.ExecuteOrDelayUntilScriptLoad=function ExecuteOrDelayUntilScriptLoad()
{
	var Handler=this;
	objViewSliders.GetAllSliders();		// Get Sliders
}*/

ViewSliders.prototype.TableConfiguration= function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableSliders', {
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

ViewSliders.prototype.GetAllSliders= function GetAllSliders()
{
	var Handler=this;
	var Ownurl;
	var today = new Date();
	var todayDate = today.toISOString().substring(0, 10);
	Ownurl =  Handler.SiteURL + "/_api/web/Lists/GetByTitle('BannerImages')/Items?$select=*&$filter=(ApprovalStatus eq 'Approved' and IsActive eq '1' and(DisplayFrom le '"+todayDate+"' and DisplayTill ge '"+todayDate+"') or (AuthorId eq '"+_spPageContextInfo.userId+"'))&$orderby=Modified desc";
	    
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	var items = data.d.results;
            var tableItemsHTML = "";
            var title="Title";        
            if($.cookie.length>0 && $.cookie("Language")!=undefined && $.cookie("Language")!=undefined)
			{	
			 	var preferredLanguageValue=$.cookie("Language");
			 	var preferredLanguage=$.cookie("Language").split('#');	// Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
			 	if(preferredLanguage[0]=='DefaultLanguage')
			 	{
			 		title='Title';
			 	}
			 	else
			 	{
			 		title=preferredLanguage[0]+"_Title";
			 	}
			}
			
			for (var i = 0; i < items.length; i++) 
            {
            	var UserID = items[i].AuthorId;
            	var itemId = items[i].ID;
				var Title = items[i][title];
				var sliderType = items[i]['SliderType'];
				if(Title==null)
					Title = items[i]["Title"];
					
                var NewsDate=items[i]["NewsDate"];
                if (NewsDate== null || NewsDate== undefined) 
                    NewsDate= "N/A";
                else
                { 
                  if(sliderType == 'Banners'){
                    	NewsDate = 'N/A';                
                    }                   
                   else{                
	                  NewsDate= new Date(NewsDate);
	                  NewsDate = $.datepicker.formatDate('dd-M-yy', NewsDate);
                	}
                }
                
                var DisplayFrom=items[i]["DisplayFrom"];
                if (DisplayFrom== null) 
                    DisplayFrom= "";
                else
                {
                	DisplayFrom= new Date(DisplayFrom);
                	DisplayFrom= $.datepicker.formatDate('dd-M-yy', DisplayFrom);
				}
				
				var DisplayTill=items[i]["DisplayTill"];
                if (DisplayTill== null) 
                    DisplayTill= "";
                else
                {
                	DisplayTill= new Date(DisplayTill);
                	DisplayTill= $.datepicker.formatDate('dd-M-yy', DisplayTill);
				}
				
				var ApprovalStatus = items[i]["ApprovalStatus"];

				var moreItemDetails = "../Pages/ViewSlider.aspx?WebAppId="+Handler.CompanyId+"&ItemId="+itemId +"";
				var viewItem = "../Pages/AddSlider.aspx?WebAppId="+Handler.CompanyId+"&ItemId="+itemId +"&Mode=View";
                var editItem = "../Pages/AddSlider.aspx?WebAppId="+Handler.CompanyId+"&ItemId="+itemId +"&Mode=Update";
				
                //tableItemsHTML += "<tr><td>" + Title + "</td><td>" + NewsDate + "</td><td>" + DisplayFrom + "</td><td>" + DisplayTill+ "</td><td>" + sliderType + "</td>";
                tableItemsHTML += "<tr><td>" + Title + "</td><td>" + DisplayFrom + "</td><td>" + DisplayTill+ "</td><td>" + sliderType + "</td><td>" + ApprovalStatus + "</td>";
                tableItemsHTML +="<td>";
                tableItemsHTML +="<a title='More' class='btn btn-outline-primary btn-xs' style='min-width:30px !important;' href='"+ moreItemDetails +"'><i class='fa fa-info-circle fa-lg' aria-hidden='true'></i></a>";
               // if(ApprovalStatus == "Pending" || ApprovalStatus == "Rejected")
                //{
               	//	 tableItemsHTML +="<a title='Edit' class='btn btn-outline-primary btn-xs' style='min-width:30px !important;' href='"+ editItem  +"'><i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i></a>";
               	
                //}
                if(UserID == _spPageContextInfo.userId)
             	{
             		tableItemsHTML +="<a title='Edit' class='btn btn-outline-primary btn-xs' style='min-width:30px !important;' href='"+ editItem  +"'><i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i></a>";
  					tableItemsHTML +='<a title="Delete" class="btn btn-outline-danger btn-xs" style="min-width:30px !important;" onclick="objViewSliders.DeleteSlider('+itemId+')"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>';
                }

                tableItemsHTML +='</td></tr>';
			 }	
          	
            var completebody = tableItemsHTML;
            var dvTable = Handler.AllSliders;
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
                objViewSliders.TableConfiguration();					 // GenerateTableSharedWithMe();
            }
        }, eror: function (data) {

            console.log('error');
        }
    });
}



ViewSliders.prototype.DeleteSlider = function DeleteSlider(ItemId) {
	var Handler=this;
	var ListName ='BannerImages';
	
	var deleteConfirmation= confirm("Are you sure to delete this record?");
	if(deleteConfirmation)
	{
		var URL =  Handler.SiteURL + "/_api/web/lists/getbytitle('"+ListName +"')/items("+ItemId+")";
	    $.ajax({
	        url: URL,
	        type:"DELETE",
	        headers: { "accept": "application/json;odata=verbose",
	        		   "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	        		   "IF-MATCH": "*" },
	        success: function (data)
	        {	
	        	GetSliderDocuments4Delete(ItemId);
	        	DeleteTaskItem(ItemId);
				alert("Record deleted successfully.");
				
				objViewSliders.GetAllSliders();
			}, 
	        error: function (data)
	        {
	             console.log(data);
	        }
	    });
    }
}

function DeleteTaskItem(ItemId)
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items?$filter=ItemId eq ('"+ItemId+"') and WebpartName eq 'Banners'";  
    $.ajax({    
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data) 
    { 		 
    	var items = data.d.results;  
        if (items.length > 0) 
		{  
        	var RequestID=items[0].ID;
        	$.ajax({  
        		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalTaskList')/items('"+RequestID+"')",  
        		type: "POST",
        		async:false,  
        		headers:  
        		{  
        		    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        		    "IF-MATCH": "*",  
        		    "X-HTTP-Method": "DELETE"  
        		},  
        		success: function(data, status, xhr)  
        		{  
        		    console.log("Task Deleted!");
        		},  
        		error: function(xhr, status, error)  
        		{  
					console.log("DeleteTaskItem function Failed");
        		}  
    		});  
		}  	
  	},
	error: function (data) 
	{  
    	alert("An error occurred. Please try again.");  
	}  
    });
}

function GetSliderDocuments4Delete(filename)
{
	var requestUri = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/web/GetFolderByServerRelativeUrl('SliderDocuments')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'"+filename+"')";
	var requestHeaders = { "accept": "application/json;odata=verbose" }
	$.ajax({
    	url: requestUri,
    	type: 'GET',
    	async: false,
    	dataType: 'json',
    	headers: requestHeaders,
        success: function (data) 
    	{
    	    var res = data.d.results;
    	    if(res.length>0)
    	    {
    	    	var x=0;
    	    	for(x; x<res.length; x++)
    	    	{
			    	var DocumentName =res[x].Name;
					var serverUrl = titanForWork.getQueryStringParameter('CompanySiteUrl'); //_spPageContextInfo.webAbsoluteUrl;    // Get the server URL.
					var serverRelativeUrlToFolder = serverUrl.substr(serverUrl.indexOf('/sites')+0)+"/SliderDocuments";//Split url from sites to get subsite folder url
			    	var ServerRelativeUrlofFile = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/web/GetFileByServerRelativeUrl('" + serverRelativeUrlToFolder  + "/" + DocumentName + "')"
 	    			$.ajax
        			({
        			    url: ServerRelativeUrlofFile,
        			    type: "POST",
        			    async: false,
        			    headers:
        				{
        			    	"Accept": "application/json;odata=verbose",
        			    	"Content-Type": "application/json;odata=verbose",
        			    	"IF-MATCH": "*",
        			    	"X-HTTP-Method": "DELETE",
        			    	"X-RequestDigest": $("#__REQUESTDIGEST").val()
        				},
            			success: function (data, status, xhr)
            			{
            			    console.log("Success");
            			},
            			error: function (xhr, status, error){ console.log("Failed"); }
        			});						
				}
			}    	    
		},
    	error: function ajaxError(response) 
    	{
        	alert(response.status + ' ' + response.statusText);
    	}
	});	
}




ViewSliders.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

///////////////////////////////////////// Attachments /////////////////////////////////
ViewSliders.prototype.ShowAttachmentModal = function ShowAttachmentModal(ItemId) {
	var Handler=this;
	Handler.ModalManageSliders.modal("show");
	
	// Show Attachments
	objViewSliders.GetAttachments(ItemId);
}

ViewSliders.prototype.GenerateAttachmentTable = function GenerateAttachmentTable(ItemId,item)
{
	var Handler=this;
	
	var itemHTML="<tr>";
	itemHTML+="<th scope=\"row\">"+titanForWork.GetDocumentTypeIcon(item.File.Name) + "</th>";
	itemHTML+="<th scope=\"row\">"+ item.File.Name+"</th>";
	itemHTML+="<th><a target='_blank' href='"+item.File.ServerRelativeUrl+"'><span class=\"glyphicon glyphicon-download-alt\"></span></a></th>";
	itemHTML+="</tr>";

	Handler.SlidersAttachments.append(itemHTML);
	Handler.AttachmentsDiv.show();
}

ViewSliders.prototype.GetAttachments = function GetAttachments(ItemId) {
	var Handler=this;	
	
	var Ownurl = Handler.SiteURL + "/_api/web/Lists/GetByTitle('BannersAttachments')/Items?select=*,File/Name,File/ServerRelativeUrl&$filter=BannerImageID eq "+ItemId+"&$expand=File";
	//https://adaptindia.sharepoint.com/sites/TITAN-2_2-DEV/Medgulf/_api/web/Lists/GetByTitle('BannersAttachments')/Items?$select=*,File/Name,File/ServerRelativeUrl&$expand=File
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: true,
        success: function (data)
	    {	
	   		var results=data.d.results;
	       	Handler.SlidersAttachments.html('');
	       	if(results.length>0)
	       	{
	       	   	$.each(results,function(i,item){
		       		objViewSliders.GenerateAttachmentTable(ItemId,item); 	
		       	});
	       	}
	       	else
	       	{
	       		Handler.SlidersAttachments.append("<br/>No file found.");
	       	}
	    }, 
		eror: function (data)
		{
		    console.log('error');
		}                   
	});     
} 


$(document).ready(function () {
    objViewSliders= new ViewSliders();

    objViewSliders.InitializeControls();
	objViewSliders.BindEvents();
    objViewSliders.GetAllSliders();		// Get Sliders
    
    
    //ExecuteOrDelayUntilScriptLoaded(objViewSliders.ExecuteOrDelayUntilScriptLoad, "sp.js");
});

var _IsAdmin='';
function ValidateLoginUser() 
{
var Handler=this;
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter=WebPartName eq 'Banners' and Company eq '"+titanForWork.getQueryStringParameter("CompanyId")+"'";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
		{	 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
             	if(items[0].Scope =="Selective" || items[0].Scope =="SELECTIVE" || items[0].Scope == null)
             	{
             	if(items[0].ContributorsId!=null)
             	{
             		var userlist =items[0].ContributorsId.results;
             		function checkuser(_userID)
             		{
  						return _userID== _spPageContextInfo.userId;
					}
					var res = userlist.filter(checkuser);
					if(res.length>0)
					{
						$("#addSlider").css("display", "block");
						//Handler.IsSliderAdmin=true;
						_IsAdmin = "True";
					}
					else{
						$("#addSlider").css("display", "none");
						_IsAdmin = "False";
						}
				}
				else{
						$("#addSlider").css("display", "none");
						_IsAdmin = "False";
						}
             	}
             	else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE")
             	{
             		$("#addSlider").css("display", "block");
             		//Handler.IsSliderAdmin=true;
             		_IsAdmin = "True";
				}
				else
				{
					$("#addSlider").css("display", "none");
					_IsAdmin = "False";
				}  			
            }
            else{$("#addSlider").css("display", "none");_IsAdmin = "False";}  
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}
