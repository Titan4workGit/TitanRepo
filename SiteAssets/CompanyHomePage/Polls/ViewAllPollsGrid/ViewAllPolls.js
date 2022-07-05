//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var sorterViewAllPolls;
var ViewAllPolls = function () {
	this.SiteURL;
	this.CompanyId;
	
	this.AllViewAllPollsTasks= $(".mainDivViewAllPolls"); //$("#mainDivViewAllPolls");
	this.NoRecordFound=$(".NoRecordFound");
	
	this.columns=$("#columnsViewAllPolls");
    this.currentpage=$("#currentpageViewAllPolls");
	this.totalpages=$("#totalpagesViewAllPolls");
	this.startrecord=$("#startrecordViewAllPolls");
	this.endrecord=$("#endrecordViewAllPolls");
	this.totalrecords=$("#totalrecordsViewAllPolls");
	this.selectedrow=$("#selectedrowViewAllPolls");
	this.pagedropdown=$("#pagedropdownViewAllPolls");
	this.tablenav=$("#tablenavViewAllPolls");
	
	this.myData=[];
};

ViewAllPolls.prototype.InitializeControls = function InitializeControls() {
	var Handler=this;
	
	Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');		// Get Company ID from QueryString
	Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
}

ViewAllPolls.prototype.SetControls = function  SetControls() {
	var Handler=this;
	
}


ViewAllPolls.prototype.BindEvents= function BindEvents() {
	var Handler=this;

}

ViewAllPolls.prototype.TableConfiguration= function TableConfiguration()
{
	try
	{
		var Handler=this;
		
	    sorterViewAllPolls= new TINY.table.sorter('sorterViewAllPolls', 'TempTableViewAllPolls', {
	        headclass: 'head',
	        ascclass: 'asc',
	        descclass: 'desc',
	        evenclass: 'evenrow',
	        oddclass: 'oddrow',
	        evenselclass: 'evenselected',
	        oddselclass: 'oddselected',
	        paginate: true,
	        size: 10,
	        colddid: Handler.columns.attr('id'),
	        currentid: Handler.currentpage.attr('id'),
	        totalid: Handler.totalpages.attr('id'),
	        startingrecid: Handler.startrecord.attr('id'),
	        endingrecid: Handler.endrecord.attr('id'),
	        totalrecid: Handler.totalrecords.attr('id'),
	        hoverid: Handler.selectedrow.attr('id'),
	        pageddid: Handler.pagedropdown.attr('id'),
	        navid: Handler.tablenav.attr('id'),
	        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
	        sortdir: 1,
	        init: true
	    });
	  }
	  catch(error)
	  {
	  }
}

ViewAllPolls.prototype.GetPollsGrid = function GetPollsGrid()
{
	var Handler=this;

	var siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	
	var today=new Date();    
    var requestUri =siteURL + "/_api/lists/getbytitle('MainPollsList')/Items?$select=*,Author/Title&$Expand=Author&$filter=PollsStartDate le datetime'" + today.toISOString() + "' or AuthorId eq "+_spPageContextInfo.userId+" &$orderby=Modified desc";
  	
  	$.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose",
						"X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
					 },
					 
            success: function (data) {
					var items=data.d.results;
					var preferredLanguage;
					if($.cookie.length>0 && $.cookie("Language")!=undefined)
					{	
					 	preferredLanguage=$.cookie("Language").split('#')[0];	// Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
					 	if(preferredLanguage=='DefaultLanguage')
						 	preferredLanguage='Title';
					}
					else
					{
						preferredLanguage='Title';
					}
					
					for(i = 0; i < items.length;i++) 
					{
					
					
					
					var PollShared =items[i]["PollShared"];
                    var PollSharedId=items[i]["PollSharedId"];
                    console.log(PollShared+"     "+PollSharedId);
                    var isValidFlag=false;
                	if(PollShared=="Company" || PollShared==null)
                	{
                	    isValidFlag=true;  
                	}
                	else if(PollShared=="Department")
                	{
                	   isValidFlag=GetMyDepartment(PollSharedId);
                	}
                    else if(PollShared=="Group")
                	{
                	 isValidFlag=GetMyGroups(PollSharedId);
                	}

					if(isValidFlag==true)
					                	{

					
						var pollsTitle= items[i][preferredLanguage];//oListItem.get_item('Title');
					    
					    if(pollsTitle!=null && pollsTitle.length > 20)
						{					
							pollsTitle = pollsTitle.substring(0,20);
							pollsTitle +='...';
						}
						
						var ItemID=items[i]["ID"]//oListItem.get_item('ID');
						var pollsStartDate=new Date(items[i]["PollsStartDate"]);
						
						var StartDate= $.datepicker.formatDate('dd-M-yy', pollsStartDate);
						var pollsEndDate=new Date(items[i]["PollsEndDate"]);
						var EndDate= $.datepicker.formatDate('dd-M-yy', pollsEndDate);
						
						var PollsExpireDate=new Date(items[i]["PollsExpireDate"]);
						var ExpireDate= $.datepicker.formatDate('dd-M-yy', PollsExpireDate);
						var todayDate=new Date();
						todayDate= $.datepicker.formatDate('mm-dd-yy', todayDate);

						var createdBy=items[i].AuthorId;
						var pollscreatedBy= items[i].Author.Title; //getUserName(createdBy);
						var Status=items[i].Status;
						var txtPollStatus='';
						
						pollsEndDate= $.datepicker.formatDate('mm-dd-yy', pollsEndDate);
						PollsExpireDate= $.datepicker.formatDate('mm-dd-yy', PollsExpireDate);
						if(todayDate>PollsExpireDate)
						{
							txtPollStatus="Expired";
						}
						else if(Status=="New")
						{
							txtPollStatus="Unpublished";
						}
						else if(Status=="Active")
						{
							txtPollStatus="Published";
						}
						else
						{
							txtPollStatus="Terminated";
						}
						
						var url = _spPageContextInfo.webServerRelativeUrl;
						var participatePage= "'"+url+"/Pages/PraticipatePolls.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID+"&IsParticipate=False'";
						objViewAllPolls.GetPollsResults(siteURL,ItemID,pollsTitle,pollscreatedBy,StartDate,EndDate,ExpireDate,participatePage,i,pollsEndDate,Status,createdBy,txtPollStatus,pollsEndDate,PollsExpireDate);
					    }
					
					
					} 
					
					// Added new code
					var tableItemsHTML='';
					$.each(Handler.myData,function(index,item){
						var pollsTitle=item[0];			//pollsTitle
						var pollscreatedBy=item[1];		//pollscreatedBy
						var StartDate=item[2];			//StartDate
						var EndDate=item[3];			//EndDate
						var ExpireDate=item[4];			//ExpireDate
						var txtPollStatus=item[5];		//txtPollStatus
						var participateStatus=item[6];	//participateStatus
						var EditPollHTML=item[7];		//EditPollHTML
						
						tableItemsHTML += "<tr><td>"+pollsTitle+"</td><td>"+pollscreatedBy+"</td><td>"+StartDate+"</td><td>"+EndDate+"</td><td>"+ExpireDate+"</td><td> "+txtPollStatus+" </td><td> "+participateStatus+"</td><td> "+EditPollHTML+"</td></tr>";
					})
						
					//var completebody = tableHeadersHTML+ tableItemsHTML + "</tbody></table>";
		            var completebody = tableItemsHTML;
		            var dvTable = Handler.AllViewAllPollsTasks;
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
		                objViewAllPolls.TableConfiguration();					 // GenerateTableSharedWithMe();
		            }
		    },
            error: function () {
                console.log("Error getting the View Polls.");
            }                     
        });
}


function GetMyGroups(groupid) {
    var groupmember = false;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/UserName,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=SharedUsers/ID eq '" + _spPageContextInfo.userId + "' and ID eq '" + groupid + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data)
        {
            var response = data;
            if (response.d.results.length > 0)
            {
                groupmember = true;
              
            }
           
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    
    return groupmember;
}


function GetMyDepartment(PollSharedId) {
    var companyID = titanForWork.getQueryStringParameter("CompanyId");
    var departmentId = false;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$top=1&$select=DepartmentId,FullName,LogonName/ID,Department/DepartmentName&$expand=LogonName,Department&$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Company/ID eq " + companyID + "",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            var Data = data.d.results
            if (Data.length > 0)
            {

                var DepartmentId = Data[0].DepartmentId;
                if(DepartmentId != null)
                {
                  if(PollSharedId==DepartmentId)
                  {
                    departmentId = true;
                  }
                }

            }
        },
        error: function (err) {
            console.log("Error");
        }
    });
    return departmentId
}





var today=new Date();
today= $.datepicker.formatDate('mm-dd-yy', today);

ViewAllPolls.prototype.GetPollsResults =  function GetPollsResults(siteURL,ItemID,pollsTitle,pollscreatedBy,StartDate,EndDate,ExpireDate,participatePage,i,pollsEndDate,Status,createdBy,txtPollStatus,pollsEndDate,PollsExpireDate)
{
	var Handler=this;
	
	var webAbsoluterURL=_spPageContextInfo.webAbsoluteUrl;
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
   	siteURL = siteURL + "/_api/web/lists/getbytitle('PollsResults')/items?$select=*&$filter=PollsId eq '" + ItemID + "' and AuthorId eq '"+_spPageContextInfo.userId+"'";
    //siteURL = siteURL + "/_api/web/lists/getbytitle('PollsResults')/items?$select=*&$filter=PollsId eq '" + ItemID + "' and AuthorId eq '"+_spPageContextInfo.userId+"'&$Order By=ID Desc";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
			var items = data.d.results;
			var EditPollHTML='';
			if(createdBy==_spPageContextInfo.userId && (Status=="New" || Status=="Active"))
			{
				EditPollHTML='<div class="view-poll-edit-btn-div"><button type="button" class="btn btn-outline-primary btn-xs" style="min-width:0em;" onclick="objViewAllPolls.RedirectPollDetails('+ItemID+');"><span class="fa fa-pencil-square-o fa-lg"></span></button></div>';
			}
			else if((createdBy!=_spPageContextInfo.userId && Status!="Active") ||(createdBy!=_spPageContextInfo.userId && today > PollsExpireDate))
			{
				return false;
			}
			else
			{
				EditPollHTML='<div class="view-poll-edit-btn-div">N/A</div>';
				//return false;
			}
			
			var viewReaultPage= '';
            var Titleurl='';
            var participateStatus='';
			if (items.length>0)
            {
            	var myObject=[];
				// Participate Status
				if(today>PollsExpireDate && createdBy==_spPageContextInfo.userId)
				{
					participateStatus='Date Expired';
				}
				else if(today>PollsExpireDate && createdBy!=_spPageContextInfo.userId)
				{
					return false;
				}
				else if(today>pollsEndDate)
				{
					viewReaultPage= webAbsoluterURL+"/Pages/ViewPollsResults.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID+"&IsParticipate=False";
					//participateStatus='<div class="col-sm-6 col-xs-6 mrgn-tp4 "><button type="button" class="btn btn-default btn-sm" onclick="location.href='+viewReaultPage+'">View Results</button></div>';
					participateStatus='<a href="'+viewReaultPage+'">View Results</a>';
				}
				else 
				{
					viewReaultPage= webAbsoluterURL+"/Pages/PraticipatePolls.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID+"&IsParticipate=True";
					participateStatus='<a href="'+viewReaultPage+'">Participated</a>';
				}
		
			
				myObject.push(pollsTitle);
				myObject.push(pollscreatedBy);
				myObject.push(StartDate);
				myObject.push(EndDate);
				myObject.push(ExpireDate);
				myObject.push(txtPollStatus);
				myObject.push(participateStatus);
				myObject.push(EditPollHTML);
				
				Handler.myData.push(myObject);
				//counter++;
            }
			else
			{

				var participatePage= webAbsoluterURL+"/Pages/PraticipatePolls.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID+"&IsParticipate=False";

				var myObject=[];
				var Titleurl='';
				/*if(Status=="Active")
				{
					if(pollsEndDate<today)
					{
						Titleurl=pollsTitle;
					}
					else
					{
						Titleurl="<a href="+participatePage+">"+pollsTitle+"</a>";
					}
				}
				else
				{
					Titleurl=pollsTitle;
				}*/
				
				// Participate Status
				var participateStatus='';
				
				if(today>PollsExpireDate && createdBy==_spPageContextInfo.userId)
				{
					participateStatus='Date Expired';
				}
				else if(today>PollsExpireDate && createdBy!=_spPageContextInfo.userId)
				{
					return false;
				}
				else if(Status=='Active' && today<=pollsEndDate)
				{
					participateStatus='<a href="'+participatePage+'">Participate</a>';
				}
				else if(today>pollsEndDate)
				{
					viewReaultPage= webAbsoluterURL+"/Pages/ViewPollsResults.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID+"&IsParticipate=False";
					participateStatus='<a href="'+viewReaultPage+'">View Results</a>';
				}
				else if(Status=='New')
				{
					participateStatus='N/A';
				}

				
				myObject.push(pollsTitle);
				myObject.push(pollscreatedBy);
				myObject.push(StartDate);
				myObject.push(EndDate);
				myObject.push(ExpireDate);
				myObject.push(txtPollStatus);
				myObject.push(participateStatus);
				myObject.push(EditPollHTML);
				
				Handler.myData.push(myObject);
				//counter++;
				
			}
			
        }, eror: function (data)
        {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}

ViewAllPolls.prototype.RedirectPollDetails = function RedirectPollDetails(ItemID)
{
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");		
	TitanHomePage=_spPageContextInfo.webAbsoluteUrl+"/Pages/AddPolls.aspx?WebAppId="+txtCompanyId+"&PollId="+ItemID;
	window.open(TitanHomePage,"_self");
}


ViewAllPolls.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

$(document).ready(function () {
    objViewAllPolls = new ViewAllPolls();

    objViewAllPolls.InitializeControls();
	objViewAllPolls.SetControls();
	objViewAllPolls.GetPollsGrid();
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");		
	$('#addPoll').click(function(){	
	TitanHomePage=_spPageContextInfo.webAbsoluteUrl+"/Pages/AddPolls.aspx?WebAppId="+txtCompanyId;
	window.open(TitanHomePage,"_self");	
	})
	SurveyAuth(txtCompanyId)
});

function SurveyAuth(txtCompanyId){
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter= WebPartName eq 'Polls' and CompanyId eq '"+txtCompanyId+"'&$select=*";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
        { 
        
        var results = data.d.results;
        if(data.d.results[0].Scope == 'SELECTIVE') 
        {    
           var Usersresults = results[0].ContributorsId.results;
	        for(i=0; i<Usersresults.length; i++){
	          if(_spPageContextInfo.userId ==  Usersresults[i])
	           {
	             UserAuth = true;	
	             $('#btnaddPoll').show()
	             return;             
	           }else{
	           	UserAuth = false;
	           	$('#btnaddPoll').hide()
	           }
	         } 
	      }	 
	      else{
	       UserAuth = true;	
	      }       
   		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    }); 
}

