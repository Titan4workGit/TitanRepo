//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var AddThoughts= function () {
	//this.MyDigitalWorkplace_Section=$("#home-section");
	this.Title=$("#txtThought");
	this.DisplayDate=$("#txtDisplayDate");
	this.Description=$("#txtSaidBy");
	this.IsDefault=$("#chkIsDefault");
	this.Mode;															// Add, Update, View
	this.ItemId=0;
	this.CompanyId;
	this.SiteURL;
	this.SourcePage;
	
	this.Submit=$("#Submit");
	this.Close=$("#Close");
};

AddThoughts.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    //$("#Submit").attr('value', 'Update');

    Handler.CompanyId= titanForWork.getQueryStringParameter('CompanyId');
    Handler.ItemId= titanForWork.getQueryStringParameter('ItemId')!=undefined?titanForWork.getQueryStringParameter('ItemId'):0;
    Handler.Mode = titanForWork.getQueryStringParameter('Mode');
    Handler.SourcePage= titanForWork.getQueryStringParameter('Source');
    
    objAddThoughts.GetSiteURL('Companies');		// Site Company Site URL
    
    // Date Pickers
     $(Handler.DisplayDate).datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: 0,
		yearRange: "-50:+50"
	 });
	 $(Handler.DisplayDate).datepicker("option", "dateFormat", "dd/mm/yy");
    
     // Settings Max Length for Description Control
   	$(Handler.Title).keyup(function () {
           var maxLength = 200;
           var text = $(this).val();
           var textLength = text.length;
           if (textLength > maxLength) {
               $(this).val(text.substring(0, (maxLength)));
           }
           else {
               //alert("Required Min. 500 characters");
           }
     });

    // Settings Max Length for Author Control
   	$(Handler.Description).keyup(function () {
           var maxLength = 35;
           var text = $(this).val();
           var textLength = text.length;
           if (textLength > maxLength) {
               $(this).val(text.substring(0, (maxLength)));
           }
           else {
               //alert("Required Min. 500 characters");
           }
     });
	
	       
     Handler.IsDefault.change(function(){
	 	if($(this).is(":Checked"))
	 	{
	 		Handler.DisplayDate.attr('disabled',true);
	 		Handler.DisplayDate.val('');
	 	}
	 	else
	 	{
	 		Handler.DisplayDate.attr('disabled',false);
	 	}
	 })
  
 };
 
AddThoughts.prototype.SetControls = function  SetControls() 
{
    /*
	var Handler=this;
	var webPartCollection = new Array();
	webPartCollection.push("");
	
	var users = UserExistInProcessApprover(Handler.CompanyId, "", webPartCollection);

    for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++)
    {
        if (users[collectionIndex].webPartName == "")
        {
        	Handler.Submit.show();
        	return false;
        }
     }*/
}

AddThoughts.prototype.BindEvents = function () {
     var Handler = this;
     
     Handler.Close.click(function()
     {
     	if(Handler.SourcePage=="Home")
     	{
			window.location.href="../Pages/Titan-New.aspx?WebAppId="+ Handler.CompanyId;
		}
		else
		{
			window.location.href="../Pages/ThoughtsOfTheDay.aspx?WebAppId="+ Handler.CompanyId;
		}
	 });
  	objAddThoughts.GetThoughts();
  	 // Submit Button Operations (Add/Update)
	 Handler.Submit.click(function()
	 {
	 	// Check Default Duplicate Record exists.
	 	 if(Handler.IsDefault.is(":Checked"))
	 	 {
	 	 	objAddThoughts.CheckDuplicateRecord().done(function(duplicateRecordExist)
	 	 	{
	 	 		if(duplicateRecordExist)
	 	 		{
	 	 			var confirmation =confirm("Default Thought of The Day already exists. Do you want to replace it?");
	 	 			if(confirmation)
	 	 			{
	 	 				objAddThoughts.GetItem().done(function(ItemID){
	 	 					objAddThoughts.DeleteThought(ItemID); 
	 	 				}) 
	 	 				objAddThoughts.AddUpdateThoughtOfTheDay();
	 	 			}
	 	 		}
	 	 		else
	 	 		{
	 	 			objAddThoughts.AddUpdateThoughtOfTheDay();
	 	 		}	
	 	 	})
	 	 }
	   	 else
	   	 {
	   	 	objAddThoughts.AddUpdateThoughtOfTheDay();
	   	 }
	});  
};



AddThoughts.prototype.AddUpdateThoughtOfTheDay = function AddUpdateThoughtOfTheDay () 
{
	var Handler = this;
	if(objAddThoughts.Validations()==true)
    {
	 	var dfd = $.Deferred();
	 	
	 	var requestURL='';
		var headersData='';
		var ListName ='ThoughtOfTheDay';
		
		//var siteURL=objAddThoughts.GetSiteURL('Companies');		// Get Company Site URL using Company ID QueryString.
		var metadataDescription=objAddThoughts.ThoughtMetadata();
		
		if(Handler.Mode=='Add')		// For Insert Operation
		{
			requestURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";
			headersData={"accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose"};
	        
		}
		else if(Handler.Mode=='Update')		// For Update Operation
		{
		
			requestURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items("+Handler.ItemId+")";
			headersData={ "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": '*'
				};
		}
			
		$.ajax({
	        url:requestURL ,
	        type: "POST",
	        async: false,
	        headers: headersData,
	        data: JSON.stringify(metadataDescription),
	        success: function (data) {
	        	if(Handler.Mode=='Add' && Handler.SourcePage=="Home")	
	        	{
	        		alert("Thought of The Day added successfully.");
					window.location.href="../Pages/Titan-New.aspx?WebAppId="+ Handler.CompanyId;
				}			
				else if(Handler.Mode=='Add' && Handler.SourcePage!="Home")
				{
	          		alert("Thought of The Day added successfully.");
	          		window.location.href="../Pages/ThoughtsOfTheDay.aspx?WebAppId="+ Handler.CompanyId;
				}
	          	else if(Handler.Mode=='Update')		// For Update Operation
	          	{
	          		
	          		alert("Thought of The Day updated successfully.");
	          		window.location.href="../Pages/ThoughtsOfTheDay.aspx?WebAppId="+ Handler.CompanyId;
				}
				
	          	objAddThoughts.ResetControls();	// Reset All Controls
	            //dfd.resolve(data);
	        },
	        error: function (error) {
			    console.log(JSON.stringify(error));
	            dfd.reject(error);
	        }
	    });
	    return dfd.promise();
	 }
}

AddThoughts.prototype.CheckDuplicateRecord=function CheckDuplicateRecord(){
	var Handler=this;
	var Deferred=$.Deferred();

	var requestUri=  _spPageContextInfo.webAbsoluteUrl +"/_api/lists/getByTitle('ThoughtOfTheDay')/items?$select=ID&$Filter=ID ne "+Handler.ItemId+" and IsDefault eq 1";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			if(results.length>0)
			{
				Deferred.resolve(true);
			}
			else
			{
				Deferred.resolve(false);
			}
		},
		error:function(data)
		{
			 console.log(data);
			 Deferred.reject(data);
		}
	})
	return Deferred;
}	

AddThoughts.prototype.DeleteThought = function DeleteThought(ItemId) 
{
	var Handler=this;
	var ListName ='ThoughtOfTheDay';
	
	var URL =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName +"')/items("+ItemId+")";
    $.ajax({
        url: URL,
        type:"DELETE",
        headers: { "accept": "application/json;odata=verbose",
        		   "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
        		   "IF-MATCH": "*" },
        success: function (data)
        {
			//alert("Thought deleted successfully.");
		}, 
        error: function (data)
        {
             console.log(data);
        }
    });
}

AddThoughts.prototype.GetItem=function GetItem(){
	var Handler=this;
	var Deferred=$.Deferred();

	var requestUri=  _spPageContextInfo.webAbsoluteUrl +"/_api/lists/getByTitle('ThoughtOfTheDay')/items?$select=ID&$Filter=IsDefault eq 1";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			if(results.length>0)
			{
				var itemID=results[0]["ID"];	
				Deferred.resolve(itemID);
			}
			else
			{
				Deferred.resolve(0);
			}
		},
		error:function(data)
		{
			 console.log(data);
			 Deferred.reject(data);
		}
	})
	return Deferred;
}


AddThoughts.prototype.ThoughtMetadata = function ThoughtMetadata() {
	var Handler = this;
	var displayDate=objAddThoughts.ConvertDateTimeFormat(Handler.DisplayDate.val(),'/')
	displayDate=new Date(displayDate);  // Convert DateTime format from ddMMyyyy to MMddyyyy format
	
 	var ListName ='ThoughtOfTheDay';
	var itemType= objAddThoughts.GetItemTypeForListName(ListName);
	var Metadata;		
    Metadata = {"__metadata": {'type': itemType}};
    
    // Default Columns
    Metadata["Title"]=Handler.Title.val();
    Metadata["DisplayDate"]=displayDate; //$.datepicker.formatDate('dd/mm/yy', displayDate); //displayDate.toLocaleDateString;
    Metadata["QuotationBy"]=Handler.Description.val();
   	Metadata["IsDefault"]=Handler.IsDefault.is(":Checked");

    $(".otherLanguages .panel-default").each(function()
   	{
   		var langaugeName=$(this).attr('class').split(' ')[2];
		//var index=totalLangauges.indexOf(langaugeName);
		//totalLangauges.splice(index,1);			// Remove current language from Languages Array
		
   		//var titleKey=langaugeName;
   		var DescriptionKey=langaugeName;
   		
   		//Metadata[titleKey]=$(this).find('.title').val();
   		Metadata[DescriptionKey]=$(this).find('.Description').val();
   	});

	//$.each(totalLangauges,function(index,value){
   	//	Metadata[value+"_Title"]=Handler.Title.val();
   	//	Metadata[value+"_Description"]=Handler.Description.val();
   	//});
   	
	return Metadata;
}


AddThoughts.prototype.Validations = function Validations() {
    var Handler = this;
    if(!Handler.IsDefault.is(":Checked") && Handler.DisplayDate.val().trim() =='')
    {
    	alert("Please enter Display Date.");
    	Handler.DisplayDate.focus();
    	return false;
    }
    else if(Handler.Title.val().trim()=='')
    {
    	alert("Please enter Thought.");
    	Handler.Title.focus();
    	return false;
    }
    
    else if(Handler.Description.val().trim()=='')
    {
    	alert("Please enter Said By.");
    	Handler.Description.focus();
    	return false;
    }

	return true;
};


AddThoughts.prototype.GetThoughts=function GetThoughts(){
	var Handler=this;
	if(Handler.Mode=='Add')
		return false;
	
	var requestUri=  _spPageContextInfo.webAbsoluteUrl +"/_api/lists/getByTitle('ThoughtOfTheDay')/items?$select=*&$Filter=ID eq "+Handler.ItemId+"";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			var title=results[0]['Title'];
			
			if(results[0]['DisplayDate']!=null)
			{
				var displayDate=new Date(results[0]['DisplayDate']);
				displayDate=$.datepicker.formatDate('dd/mm/yy', displayDate);
				Handler.DisplayDate.val(displayDate);			
			}
			else
			{
				Handler.DisplayDate.attr("disabled",true);
				Handler.IsDefault.attr("checked",true);
				Handler.IsDefault.attr("disabled",true);
			}				
			var Description =results[0]['QuotationBy'];
			Handler.Title.val(title);
			Handler.Description.val(Description);
			
			$(".otherLanguages .panel-default").each(function()
		   	{
		   		var langaugeName=$(this).attr('class').split(' ')[2];
				
		   		var DescriptionKey=langaugeName;
				Description =results[0][DescriptionKey];
		   		$(this).find('.Description').val(Description);
		   	});
		},
		error:function(data)
		{
			 console.log(data);
		}
	})
}	
	
	
AddThoughts.prototype.GetActiveLanguage=function(){
	var Handler=this;
	
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('LanguageSetting')/items?$select=*&$Filter=Status eq 'Active'";
    $.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
            		 //var counter=0;
            		 $.each(data.d.results,function(i,data)
            		 {
            		 	var language=data['Language'];
            		 	var languageTitle=data['Title'];
            		 	var languageID=data['ID'];
            		 	if(languageTitle!='DefaultLanguage')
            		 	{
        		 			var otherLanguageHTML="<div class='panel panel-default "+languageTitle+"'>";
							otherLanguageHTML+="<div class='panel-heading panel-head-4' role='tab' id='headingOne"+i+"'>";
							otherLanguageHTML+='<h4 class="panel-title">';
							otherLanguageHTML+="<a class='h4-color' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseOne"+i+"' aria-expanded='false' aria-controls='collapseOne' class='collapsed'>";
							otherLanguageHTML+='<i class="short-full glyphicon glyphicon-chevron-down"></i>';
							otherLanguageHTML+=""+language+"";
							otherLanguageHTML+='</a>';
							otherLanguageHTML+='</h4></div>';
							otherLanguageHTML+="<div id='collapseOne"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne"+i+"' aria-expanded='false' style='height: 0px;'>";
							otherLanguageHTML+='<div class="panel-body">';
							otherLanguageHTML+='<div class="form-horizontal">';
							otherLanguageHTML+='<div class="form-group">';
							otherLanguageHTML+='<label for="" class="col-sm-4 control-label" data-localize="ThoughtOfTheDay"></label>';
							otherLanguageHTML+='<div class="col-sm-8">';
							otherLanguageHTML+="<textarea class='form-control Description' rows='10' maxlength='250'></textarea>";
							otherLanguageHTML+='</div></div></div></div></div></div>';
                            
        		 			$(".otherLanguages").append(otherLanguageHTML);
            		 	 }
            		 })
            },
            error: function (data) {
                console.log(data);
            }                     
       });
}

AddThoughts.prototype.GetSiteURL = function GetSiteURL(listName) {
	var Handler=this;
	var companyID=titanForWork.getQueryStringParameter('CompanyId');

	var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=ID,SiteURL&$filter=ID eq '" + companyID + "'";
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length>0)
            {
                Handler.SiteURL = items[0].SiteURL;
            }
        }, 
        error: function (data)
        {
             console.log(data);
        }
    });
}


AddThoughts.prototype.ConvertDateTimeFormat = function ConvertDateTimeFormat(date,delimiter)
{
	return date.split(delimiter)[1]+""+delimiter+""+date.split(delimiter)[0]+""+delimiter+""+date.split(delimiter)[2];
}

AddThoughts.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

AddThoughts.prototype.ResetControls = function () {
	var Handler = this;

	Handler.Title.val('');
	Handler.DisplayDate.val('');
	Handler.Description.val('');
	
	$(".otherLanguages .panel-default").each(function()
   	{
   		var langaugeName=$(this).attr('class').split(' ')[2];
   		
   		$(this).find('.title').val('');
   		$(this).find('.Description').val('');
   	});
}

$(document).ready(function () {
    objAddThoughts= new AddThoughts();
    objAddThoughts.InitializeControls();
    objAddThoughts.GetActiveLanguage();
    objAddThoughts.BindEvents();
    
  });