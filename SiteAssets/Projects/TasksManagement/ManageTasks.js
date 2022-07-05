//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var ManageTasks= function () {
	
	// Main Input Form
	this.Submit=$("#Submit");
	this.Close=$("#Close");
	
	// Comments Section
	this.Comments=$("#Comments");
	this.btnSaveComments=$("#SaveComments");
	this.divTaskComments=$(".divTaskComments");
	this.ulCommentTasks=$(".ulCommentTasks");
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Main Tasks ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

ManageTasks.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    
    Handler.CompanyId= titanForWork.getQueryStringParameter('CompanyId');
    Handler.ItemId= titanForWork.getQueryStringParameter('ItemId');
    Handler.Mode = titanForWork.getQueryStringParameter('Mode');
    Handler.SourcePage= titanForWork.getQueryStringParameter('Source');
    
    if(Handler.ItemId!=undefined && Handler.ItemId!=null)
    {
    	Handler.divTaskComments.show();
    }
};
 
ManageTasks.prototype.SetControls = function  SetControls() {
	var Handler=this;
	
	
}


ManageTasks.prototype.ExecuteOrDelayUntilScriptLoad=function ExecuteOrDelayUntilScriptLoad()
{
	var Handler=this;

}


ManageTasks.prototype.BindEvents = function () {
     var Handler = this;
     
     // Main Input Form Submit Event
     Handler.Submit.click(function(){
     	alert("Hello...");
     })
     
     
     // Comments Submit Event
     Handler.btnSaveComments.click(function(){
     	if(Handler.Comments.val().trim()!='')
     	{
     		objManageTasks.AddNewComments();			// Add Task Comment
     	}
     })
};


ManageTasks.prototype.AddNewTask = function AddNewTask() {
	var Handler = this;
	var deferred = $.Deferred();
 	
 	var requestURL='';
	var headersData='';
	var ListName ='TasksComments';
	
	var metadataDescription=objManageTasks.TasksMetadata();
	requestURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";
	
	headersData={"accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        };
	
	$.ajax({
        url:requestURL ,
        type: "POST",
        async: false,
        headers: headersData,
        data: JSON.stringify(metadataDescription),
        success: function (dataD) {
	        deferred.resolve(dataD);
	        
        	if(Handler.Mode=='Add')	
        	{
				var itemID=dataD.d.Id;
				alert("Task updated successfully.");
          	}			
		},
        error: function (error) {
		    console.log(data);
            deferred.reject(error);
        }
    });
    return deferred.promise();
}


ManageTasks.prototype.TasksMetadata = function TasksMetadata() {
	var Handler = this;
	

	return Metadata;
}


ManageTasks.prototype.Validations = function Validations() {
    var Handler = this;
    //if(Handler.Title.val().trim()=='')
    {
    	alert("Please enter Title.");
    	//Handler.Title.focus();
    	return false;
    }
    
	return true;
};


ManageTasks.prototype.GetTasks=function GetTasks(){
	var Handler=this;
	if(Handler.Mode=='Add')
		return false;
	
	var requestUri=  _spPageContextInfo.webAbsoluteUrl +"/_api/lists/getByTitle('TasksComments')/items?$select=*&$Filter=ID eq "+Handler.ItemId+"";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			//var results=data.d.results;
			//var title=results[0]['Title'];
			//var expiryDate=new Date(results[0]['Expires']);
			//expiryDate=$.datepicker.formatDate('dd/mm/yy', expiryDate); //objManageTasks.ConvertDateTimeFormat(expiryDate,'-'); //expiryDate.toLocaleDateString();
			
			
		},
		error:function(data)
		{
			 console.log(data);
		}
	})
}	

ManageTasks.prototype.ConvertDateTimeFormat = function ConvertDateTimeFormat(date,delimiter)
{
	return date.split(delimiter)[1]+""+delimiter+""+date.split(delimiter)[0]+""+delimiter+""+date.split(delimiter)[2];
}

ManageTasks.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

ManageTasks.prototype.ResetControls = function () {
	var Handler = this;

	// Handler.Title.val('');
}

ManageTasks.prototype.FormReadOnlyMode = function () {
	var Handler = this;
	if(Handler.Mode=='View')
	{
		//Handler.Title.attr('disabled',true);
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Task Comments ////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ManageTasks.prototype.AddNewComments = function AddNewComments() {
	var Handler = this;
	var deferred = $.Deferred();
 	
 	var ListName ='TasksComments';
	var metadataDescription=objManageTasks.CommentsMetadata();
	var requestURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";
	
	var headersData={"accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        };
	
	$.ajax({
        url:requestURL ,
        type: "POST",
        async: false,
        headers: headersData,
        data: JSON.stringify(metadataDescription),
        success: function (dataD) {
	        deferred.resolve(dataD);
	        
	        Handler.Comments.val(' ');
	        objManageTasks.GetTaskComments();
	    },
        error: function (error) {
		    console.log(data);
            deferred.reject(error);
        }
    });
    return deferred.promise();
}


ManageTasks.prototype.CommentsMetadata= function CommentsMetadata() {
	var Handler = this;
 	var ListName ='TasksComments';
	var itemType= objManageTasks.GetItemTypeForListName(ListName);
	var Metadata;		
    Metadata = {"__metadata": {'type': itemType}};
    
    // Default Columns
    Metadata["TaskID"]=Handler.ItemId;
    Metadata["Comments"]=Handler.Comments.val().trim();
   	
   	return Metadata;
}


ManageTasks.prototype.Validations = function Validations() {
    var Handler = this;
    //if(Handler.Title.val().trim()=='')
    {
    	alert("Please enter Title.");
    	//Handler.Title.focus();
    	return false;
    }
    
	return true;
};


ManageTasks.prototype.GetTaskComments=function GetTaskComments(){
	var Handler=this;
	if(Handler.Mode=='Add')
		return false;
	
	debugger;
	var requestUri=  _spPageContextInfo.webAbsoluteUrl +"/_api/lists/getByTitle('TasksComments')/items?$select=Comments,Created,Author/Title&$expand=Author&$Filter=TaskID eq "+Handler.ItemId+"&$OrderBy=ID desc";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			
			var commentsHTML='';
			Handler.ulCommentTasks.empty();
			$.each(results,function(index,item){
				var comments=item.Comments;
				var author = item.Author.Title;
				var createdDate = item.Created;
			
				commentsHTML+='<ul class="comment-tasks">';
				commentsHTML+='<li class="left clearfix">';
				commentsHTML+='<div class="clearfix">';
				commentsHTML+='<div class="header"><strong class="primary-font">'+author+'</strong></div>';
				commentsHTML+='<p>'+comments+'</p>';
				commentsHTML+='<small class="pull-right text-muted">09:33</small>';
				commentsHTML+='<small class="text-muted">25-04-2019</small>';
				commentsHTML+='</div>';
				commentsHTML+='</li></ul>';	
			});
			Handler.ulCommentTasks.append(commentsHTML);
			//var expiryDate=new Date(results[0]['Expires']);
			//expiryDate=$.datepicker.formatDate('dd/mm/yy', expiryDate); //objManageTasks.ConvertDateTimeFormat(expiryDate,'-'); //expiryDate.toLocaleDateString();
		},
		error:function(data)
		{
			 console.log(data);
		}
	})
}	

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    objManageTasks= new ManageTasks();
    objManageTasks.InitializeControls();
    objManageTasks.FormReadOnlyMode();
    objManageTasks.BindEvents();
    objManageTasks.SetControls();
    objManageTasks.GetTaskComments();

    //ExecuteOrDelayUntilScriptLoaded(objManageTasks.ExecuteOrDelayUntilScriptLoad, "sp.js");
});