function getProjects() {
  var ListName ='ProjectDetails';
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/?$select=*&$top=5000",
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
              /*beforeSend: function() {
                $("#overlaysearch").fadeIn();   
            },*/

        success: function (data) {
             var response=data.d.results;
             if(response.length>0){
               for(var i=0;i<response.length;i++){
                 getEmployeeTaskDetails(response[i].ID)
                }
                alert('Successfully!');
             }
             waitingDialog.hide();
        
	     },
	     error: function (error) {
            alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

function getEmployeeTaskDetails(ProjectId) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('EmployeeTaskDetails')/items/?$top=5000&$filter=ProjectIDId eq "+ProjectId+"&$select=ID,CurrentPhase",
        method: "GET",
        async: false,
        headers:{
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            var Open,Hold,Completed,Close,Cancelled=0;
            if (dataresults.length > 0) {
              //for(var j=0;j<dataresults.length;j++){
                Open=dataresults.filter(function (v){
               return v.CurrentPhase == 'Open'
               });
               Hold=dataresults.filter(function (v){
               return v.CurrentPhase == 'Hold'
               });
               Completed=dataresults.filter(function (v){
               return v.CurrentPhase == 'Completed'
               });
               Close=dataresults.filter(function (v){
               return v.CurrentPhase == 'Close'
               });
               Cancelled=dataresults.filter(function (v){
               return v.CurrentPhase == 'Cancelled'
               });
               Open=Open.length;
               Hold=Hold.length;
               Completed=Completed.length;
               Close=Close.length;
               Cancelled=Cancelled.length;
              //}            
                
            }
            updateProjectCounter(ProjectId,Open,Hold,Completed,Close,Cancelled)
            
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}


function updateProjectCounter(ProjectId,Open,Hold,Completed,Close,Cancelled) {
    var ItemType = GetItemTypeForListName('ProjectDetails');
                
        Metadata = {
        __metadata: {
            'type': ItemType
        },
        OpenTasks:Open,
        OnHoldTasks:Hold,
        CompletedTasks:Completed,
        CloseTasks:Close,
        CompletedTasks:Cancelled
        
     };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/GetItemById(" +ProjectId+ ")",
            type: "POST",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": '*'
            },
            data: JSON.stringify(Metadata),
            success: function (data) {
                dfd.resolve(data);                
                    console.log("Successfully.");
                
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while deleting Application. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    
}


/*---addentry in EnvironmentalSettings-----------------lakhan 08/03/22--------*/

function addEnvironmentalSettingsEntry() {
   listItems=['Timesheet Entry','Attendance Entry','Timesheet','Attendance'];

    
    for (var i = 0; i <=3; i++) {        		 
        var ListName = "EnvironmentalSettings";
        var Metadata;
        Metadata = {
            __metadata: { 'type': 'SP.Data.EnvironmentalSettingsListItem' },
            Title:listItems[i],
            Active:'Yes'
         };
        var records=getItemByTitle(listItems[i])
        if(records.length==0){
	        $.when(AddItemEmp(ListName, Metadata)).done(function (responseIdmore) {
	            if (i ==4) {
	                alert('Submit successfully');
	
	
	            }
	        })
        }
    }
}

function getItemByTitle(Title) {
  var ListName ='EnvironmentalSettings';
  var response='';
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/?$select=Id,Title&$filter=Title eq '"+Title+"'",
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },

        success: function (data) {
             response=data.d.results;
             return response;
             
        
	     },
	     error: function (error) {
            alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return response;
};

function getTaskItemByTaskCategory() {
  var ListName ='EmployeeTaskDetails';
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/?$select=*&$top=5000&$filter=TaskCategory eq null",
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
              /*beforeSend: function() {
                $("#overlaysearch").fadeIn();   
            },*/

        success: function (data) {
             var response=data.d.results;
             if(response.length>0){
               for(var i=0;i<response.length;i++){
                 updateTaskCategory(response[i].ID)
                }
                alert('Successfully!');
             }
        waitingDialog.hide();
	     },
	     error: function (error) {
            alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};


function updateTaskCategory(TaskId) {
    var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        TaskCategory: 'General'
    };
    
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" +TaskId+ "')",
            type: "POST",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": '*'
            },
            data: JSON.stringify(Metadata),
            success: function (data) {
                dfd.resolve(data);
                
                    console.log("All Task's Priority has been changed.");
                
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while deleting task. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    
}

/*---------------fill date taken column in media gallery 15/03/22 (lakhan) --------------------------*/
var CompanySiteURL='';
function getCurrentCopaniesURL()
{
	var listName='Companies';
	var txtCompanyId =Logged_CompanyId;
    siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=ID,SiteURL&$filter=ID eq '" + txtCompanyId + "'";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length>0)
            {
                CompanySiteURL = items[0].SiteURL;
                waitingDialog.show();
                setTimeout(function () {
                 getMediaGalleryAllItems();
	            }, 500);
	                
                
                
				
				
			}
           
        }, eror: function (data)
        {
            alert($('#txtSomethingWentWrong').val());
        }
    });
}

function getMediaGalleryAllItems(){

var endPointURL = CompanySiteURL+"/_api/Web/lists/GetByTitle('MediaGallery')/rootfolder/folders?$select=*,FileRef,FileLeafRef&$orderby=TimeCreated desc&$top=5000";
 	//var endPointURL = siteURL +"/_api/Web/lists/GetByTitle('MediaGallery')/rootfolder/folders?$select=*,FileRef,FileLeafRef&$orderby=Like desc";
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {

            var folders = data.d.results;
            console.log(data);
            $('#galleryFirstImgThumb').empty();
            mediaGalleryCounter=0;
            for (var i = 0; i < folders.length; i++)
            {
	            if(folders[i].Name!="Forms" && folders[i].Name!="_t" && folders[i].Name!="_w")
	            {
	              	
	              	var ServerRelativeUrl=folders[i].ServerRelativeUrl;
	              	GetFolderDetails(ServerRelativeUrl);	              	
	                
	             }
	         }
	         alert("Successfully done!");
	         waitingDialog.hide();       
    	  
    	},
    	error:function(data){
    	alert(data)
    	
    	}
    	});

}


function GetFolderDetails(targetfolderUrl)
{ 

  fileLeafRef=targetfolderUrl;
	var endPointURL = CompanySiteURL+ "/_api/Web/lists/GetByTitle('MediaGallery')/Items?$select=*,File_x0020_Type,Author/Title,Author/EMail,FileRef,FileLeafRef&$expand=Author/Title&$filter=FileRef eq '"+targetfolderUrl+"' and ImageCreateDate eq null";
	
    $.ajax({
        url: endPointURL ,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
           var items=data.d.results;
           if(items.length>0){
	           var Title=items[0].FileLeafRef;
	           var filesId=items[0].Id;
		       var Datetaken=items[0].Created;		       
		       fillDateTakenInMedia(filesId,Title,Datetaken)	       
	       }
        },
    	error:function(data){
    	alert(data)
    	
    	}
    });
}

function fillDateTakenInMedia(filesId,Title,Datetaken){   
        var currentDate=new Date(Datetaken);
        currentDate=currentDate.format('MM/dd/yyyy')
        $.ajax({  
            url: CompanySiteURL+ "/_api/web/lists/GetByTitle('MediaGallery')/items('"+filesId+"')",
            type: "POST",
            async:false, 
            data: JSON.stringify  
            ({  
                __metadata:  
                {  
                    type: "SP.Data.MediaGalleryItem"
                      
                },  
                Title: Title,                
                //UserDepartment:Logged_DepartmentName,
                //Event_Name:EventName,
                //Event_Place:Location,
                ImageCreateDate:currentDate
                //UserDesignation:Logged_Designation,
                //userImage:employeePicURL
                  
            }),  
            headers:  
            {  
                "Accept": "application/json;odata=verbose",  
                "Content-Type": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "MERGE"  
            },  
            success: function(data, status, xhr)  
            {  
             console.log('Updated!')
            },
            error: function (error)             
            {
              alert(error);
            }
        });


}


