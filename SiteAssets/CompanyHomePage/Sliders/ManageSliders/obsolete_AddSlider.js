//////////////////////////////////////////////// Variables Initialization and Declarations ///////////////////////////////////////////
var AddSlider= function () {
	this.Title=$("#Title");
//	this.Description=$("#Description");
	this.Description=$(".richText-editor");
	this.NewsDate=$("#NewsDate");
	this.DisplayFrom=$("#DisplayFrom");
	this.DisplayTill=$("#DisplayTill");
	this.IsActive=$("#IsActive");
	this.SliderImage=$("#sliderImage");
	this.Attachments=$("#attachments");
	//this.SliderType	= $(".sliderType");
	this.SliderType	= $("#SliderCatogery").val();
	this.RequiredLabelsForNews = $(".requiredLabelsForNews");
	
	// Attachments
	this.AddAttachment=$(".addAttachment");
	this.ModalAttachments=$("#modalAttachments");
	this.btnUpload=$("#btnUpload");
	this.btnAttachmentClose=$("#btnAttachmentClose");
	this.NewAddedItemID=$("#newAddedItemID");
	this.AttachmentsTable=$(".attachmentsTable");
	this.AttachmentsDiv=$(".attachmentsDiv");
	this.AddAttachmentsMainDiv=$(".addAttachmentMainDiv");

	
	// Variables Declaration
	this.Mode;					// Add, Update, View
	this.ItemId=0;
	this.AttachmentItemId=0;
	this.CompanyId;
	this.SiteURL;
	//this.SourcePage;
	
	this.Submit=$("#Submit");
	this.Close=$("#Close");
};

///////////////////////////////////////////////////////// Initialize Controls /////////////////////////////////////////////////////
AddSlider.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    
    Handler.CompanyId= titanForWork.getQueryStringParameter('CompanyId');
    Handler.ItemId= titanForWork.getQueryStringParameter('ItemId');
    Handler.Mode = titanForWork.getQueryStringParameter('Mode');
    Handler.SiteURL=titanForWork.getQueryStringParameter('CompanySiteUrl');
    //Handler.SourcePage= titanForWork.getQueryStringParameter('Source');
    
    // Site Company Site URL
    if(Handler.ItemId!=undefined)
    {
	    objAddSlider.GetSiteURL('Companies').done(function(){
		    objAddSlider.GetSliderDetails();		// Get Slider Details Based on ItemID
			
			if(Handler.Mode=="Update")
		    {
		    	Handler.AddAttachmentsMainDiv.show();
		    	
		    	objAddSlider.GetAttachments();
		    }
	    });
    }
    
     // Date Pickers // News Date Control
     $(Handler.NewsDate).datepicker({
		changeMonth: true,
		changeYear: true,
		//minDate: 0,
		yearRange: "-50:+50"
	 });
	 $(Handler.NewsDate).datepicker("option", "dateFormat", "dd/mm/yy");

	 // Display From Date Control
	 $(Handler.DisplayFrom).datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: 0,
		yearRange: "-50:+50"
	 });
	 $(Handler.DisplayFrom).datepicker("option", "dateFormat", "dd/mm/yy");

	// Display Till Date Control
	 $(Handler.DisplayTill).datepicker({
		changeMonth: true,
		changeYear: true,
		minDate:0, // Handler.DisplayFrom,
		yearRange: "-50:+50"
	 });
	 $(Handler.DisplayTill).datepicker("option", "dateFormat", "dd/mm/yy");

    
     // Settings Max Lengt for Description Control
  /* 	$(Handler.Description).keyup(function () {
           var maxLength = 5000;
           var text = $(this).val();
           var textLength = text.length;
           if (textLength > maxLength) {
               $(this).val(text.substring(0, (maxLength)));
           }
           else {
               //alert("Required Min. 500 characters");
           }
     });*/
     
     $(Handler.SliderType).click(function(){
     		var sliderType = $(this).val();
     		if(sliderType=="News")
     		{
     			Handler.Description.prop("disabled",false);
     			Handler.NewsDate.prop("disabled",false);
     			//Handler.DisplayFrom.prop("disabled",false);
				//Handler.DisplayTill.prop("disabled",false);
				Handler.Attachments.prop("disabled",false);
				
				// Other Languages
				$(".otherLanguages .panel-default").each(function()
			   	{
			   		var langaugeName=$(this).attr('class').split(' ')[2];
					
			   		//var titleKey=langaugeName+"_Title";
			   		var DescriptionKey=langaugeName+"_Description";
			   		
			   		//$(this).find('.title').prop("disabled",false);
			   		$(this).find('.Description').prop("disabled",false);
			   	});
			}
     		else if(sliderType=="Banners")
     		{
     			// Reset Controls Values
     			//Handler.Description.val("");
     			//Handler.NewsDate.val("");
     			//Handler.DisplayFrom.val("");
				//Handler.DisplayTill.val("");
				Handler.Attachments.val("");
					
				// Disabled Controls
     			Handler.Description.prop("disabled",true);
     			Handler.NewsDate.prop("disabled",true);
     			//Handler.DisplayFrom.prop("disabled",true);
				//Handler.DisplayTill.prop("disabled",true);
				Handler.Attachments.prop("disabled",true);
					
				// Other Languages
				$(".otherLanguages .panel-default").each(function()
			   	{
			   		var langaugeName=$(this).attr('class').split(' ')[2];
					
			   		//var titleKey=langaugeName+"_Title";
			   		var DescriptionKey=langaugeName+"_Description";
			   		
			   		//$(this).find('.title').prop("disabled",true);
			   		$(this).find('.Description').val("");
			   		$(this).find('.Description').prop("disabled",true);
			   	});
			}
     });
};

AddSlider.prototype.GetSiteURL = function GetSiteURL(listName) {
	var Handler=this;
	var deferred=$.Deferred();
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
                deferred.resolve(Handler.SiteURL);
            }
        }, 
        error: function (data)
        {
             console.log(data);
        }
    });
    return deferred;
}

 
///////////////////////////////////////////////////// Set Controls /////////////////////////////////////////////////////////
AddSlider.prototype.SetControls = function  SetControls() {
ValidateLoginUserEntryscreen();
	/*var Handler=this;
	
	var webPartCollection = new Array();
	webPartCollection.push("Banners");
	
	var users = UserExistInProcessApprover(Handler.CompanyId, "", webPartCollection);

    for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++)
    {
        if (users[collectionIndex].webPartName == "Banners")
        {
        	Handler.Submit.show();
        	return false;
        }
     }*/
}

/////////////////////////////////////////////////////////// Bind Events ////////////////////////////////////////////////////
AddSlider.prototype.BindEvents = function () {

     var Handler = this;
     
     Handler.Close.click(function()
     {
     	window.location.href="../Pages/ViewSliders.aspx?WebAppId="+ Handler.CompanyId;
	 });
  
  	 // Submit Button Operations (Add/Update)
	 Handler.Submit.click(function()
	 {debugger;
	   	 if(objAddSlider.Validations()==true)
		 {
		 	$('#Submit').attr('disabled','disabled');
		 	var file=Handler.SliderImage[0].files[0];
		 	
		 	var sliderType = $(".sliderType:checked").val();
			if(Handler.Mode=="Add")
		 	{	debugger;
		 		$.when(objAddSlider.AddSlider(file)).done(function(response){
		 		var ItemId= Handler.ItemId;
		 		     objAddSlider.AddAnnouncements();
		 		
		 			if(FinalFiles4Upload.length>0 || FinalFiles4Upload2.length>0)
		 			{
		 				SliderPhoto_DocumentUpload(Handler.ItemId);		 			
		 			}
		 			else
		 			{
		 			titanForWork.CreateWorkflowTaskForApproval(ItemId, titanForWork.getQueryStringParameter('CompanyId'), 0, "Banners", $("#Title").val(), $(".richText-editor").text(), $("#SliderCatogery option:selected").text()).done(function (response) {
                    console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                    if (response == "ApprovalNotRequired")			// Approval Not Required.
                    {
                    	var itemIDN = ItemId;
              			AutoApprovedSlider(itemIDN);
              			AutoApprovedAnnouncement(AnnouncementId);
						var DescDtl = "Slider " + $(".richText-editor").text() + " has been posted.";
						var listName="NotificationCenter";
						var WebName ="Banners";
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#Title").val(), 'Details':DescDtl,'WebpartName':WebName ,'CompanyIdId':titanForWork.getQueryStringParameter('CompanyId')};
						Universalinsert(listName,item,)	;
					}
					})

		 			
		 			alert('Data has been saved successfully.');
			        window.location.href="../Pages/ViewSliders.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId');
			        }
			        
		 			/*if(sliderType=="News")
					{
				 		if(confirm('News added successfully. Do you want to upload the attachments?'))
				 		{
				 			Handler.ModalAttachments.modal({backdrop: 'static', keyboard: false});
				 			$("#modalAttachments.close").hide();
				 		}
						else
						{
							window.location.href="../Pages/ViewSliders.aspx?WebAppId="+ Handler.CompanyId;
				        }
			        }
			        else if(sliderType=="Banners")
			        {
			        	alert('Banner added successfully.');
			        	window.location.href="../Pages/ViewSliders.aspx?WebAppId="+ Handler.CompanyId;
			        }*/
			 	})
		 	}
		 	else if(Handler.Mode=="Update")
		 	{debugger;
		 		var ItemId= Handler.ItemId;
		 		$.when(objAddSlider.UpdateSlider(file)).done(function(response){
		            objAddSlider.GetAnnouncementItemId(); 

		 		if(FinalFiles4Upload.length>0 || FinalFiles4Upload2.length>0)
		 		{
		 			SliderPhoto_DocumentUpload(Handler.ItemId);

		 		}
		 			else
		 			{
		 			
		 				titanForWork.GetItemIDOfApprovalTaskList(ItemId, titanForWork.getQueryStringParameter('CompanyId'), 'Banners').done(function (requestItemID) {
                    	titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
                		})
                	
                		titanForWork.CreateWorkflowTaskForApproval(ItemId, titanForWork.getQueryStringParameter('CompanyId'), 0, "Banners", $("#Title").val(), $(".richText-editor").text(), $("#SliderCatogery option:selected").text()).done(function (response) {
                    	console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                    	if (response == "ApprovalNotRequired")			// Approval Not Required.
                    	{debugger;
                    	   	var itemIDN = Handler.ItemId;
                    	   	AutoApprovedSlider(itemIDN);                        
            				var DescDtl = "Slider " + $(".richText-editor").text() + " has been modified.";
							var listName="NotificationCenter";
							var WebName ="Banners";
							var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#Title").val(), 'Details':DescDtl,'WebpartName':WebName ,'CompanyIdId':titanForWork.getQueryStringParameter('CompanyId')};
							Universalinsert(listName,item,)	;
                    	}
                 		});
		 			
		 			alert("Data has been updated successfully.");
		 			window.location.href="../Pages/ViewSliders.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId');
		 			}
		 			/*if(sliderType=="News")
					{
						if(confirm('News updated successfully. Do you want to upload the attachments?'))
				 		{
				 			Handler.ModalAttachments.modal({backdrop: 'static', keyboard: false});
				 			$("#modalAttachments.close").hide();
				 		}
						else
						{
							window.location.href="../Pages/ViewSliders.aspx?WebAppId="+ Handler.CompanyId;
				        }
				    }
				    else if(sliderType=="Banners")
			        {
			        	alert('Banner updated successfully.');
			        	window.location.href="../Pages/Sliders.aspx?WebAppId="+ Handler.CompanyId;
			        }*/
			 	})
			}
		 }
	 });  
	
	 // Close Popup
	 $(Handler.btnAttachmentClose).click(function(){
			Handler.ModalAttachments.modal('hide');
			if(Handler.Mode=='Add')
			{
          		window.location.href="../Pages/ViewSliders.aspx?WebAppId="+ Handler.CompanyId;
          	}
          	/*else if(Handler.Mode=='Update')
          	{
          		objAddSlider.GetAttachments(Handler.ItemId);
          		Handler.AttachmentsTable.html('');
          	}*/
     })
	 
	 // Close Popup
	 $(Handler.btnUpload).click(function(){
		 var file=Handler.Attachments[0].files[0];
	 	 objAddSlider.UploadSliderAttachments(file);
	 })
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// 1. Add/Update Slider Metadata along with its Image ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddSlider.prototype.GetSliderDetails=function GetSliderDetails(){
	var Handler=this;
	if(Handler.Mode=='Add')
		return false;
	
	var requestUri=  Handler.SiteURL +"/_api/lists/getByTitle('BannerImages')/items?$select=*,File/Name,File/ServerRelativeUrl&$Filter=ID eq "+Handler.ItemId+"&$expand=File";
	$.ajax({
		url:requestUri,
		type:"GET",
		async:false,
		headers:{"Accept":"application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			var title=results[0]['Title'];
			var Description =results[0]['Description'];
			var isActive=results[0]['IsActive'];
			var SliderType=results[0]['SliderType'];			
			$("#SliderCatogery").val(results[0]['SliderType']);
			$("#Audience").val(results[0]['Audience']);
			$("#TextRelWord").val(results[0]['Related_Word']);
			$("#textPublishBy").val(results[0]['PublishBy']);
			//videolink
			
			
			if(results[0]['videolink'] != null)
			{	var _videolink = results[0]['videolink'].split(",");
				for (i=0;i<_videolink.length;i++)
				{
     				if(i=="0")
     				{
     				$("#video_link0").val(_videolink[i]);
     				}
     				else
     				{
     					$("#Videolinkbox").append('<input id="video_link'+i+'" type="text" maxlength="100" class="form-control">');
						$("#vlinkbtn").append('<button type="button" class="btn-outline-danger btn-sm form-control btn-display" onclick="Deletelinktextbox(this.id);" id="link_btn'+i+'">Delete</button>');
						$("#video_link"+i).val(_videolink[i]);

     				}
     				//alert(_videolink[i]);
				}
			
			}
			
			
			var newsDate,displayFrom,displayTill;
			
			if(results[0]['NewsDate']!="" && results[0]['NewsDate']!=null)
			{
				newsDate=new Date(results[0]['NewsDate']);
				newsDate=$.datepicker.formatDate('dd/mm/yy', newsDate); 
			}
			if(results[0]['DisplayFrom']!="" && results[0]['DisplayFrom']!=null)
			{
				displayFrom=new Date(results[0]['DisplayFrom']);
				displayFrom=$.datepicker.formatDate('dd/mm/yy', displayFrom); 
			}
			if(results[0]['DisplayTill']!="" && results[0]['DisplayTill']!=null)
			{
				displayTill=new Date(results[0]['DisplayTill']);
				displayTill=$.datepicker.formatDate('dd/mm/yy', displayTill); 
			}
			
			Handler.Title.val(title);
			Handler.Description.html(Description);
			Handler.NewsDate.val(newsDate);
			Handler.DisplayFrom.val(displayFrom);
			Handler.DisplayTill.val(displayTill);
			Handler.IsActive.attr("checked",isActive);
			GetSliderDocuments(Handler.ItemId);
			/*if(SliderType=="News")
			{
				$("input[name='SliderType'][value='News']").prop('checked',true);
			}
			else
			{
				$("input[name='SliderType'][value='Banners']").prop('checked',true);	
				$("input[name='SliderType'][value='Banners']").trigger("click");
				Handler.AddAttachment.hide();
			}*/
			
			$(".otherLanguages .panel-default").each(function()
		   	{
		   		var langaugeName=$(this).attr('class').split(' ')[2];
				
		   		var titleKey=langaugeName+"_Title";
		   		var DescriptionKey=langaugeName+"_Description";
		   		title =results[0][titleKey];
				Description =results[0][DescriptionKey];

		   		$(this).find('.title').val(title);
		   		$(this).find('.Description').val(Description);
		   	});
		   	
		   	// Files
		   	var fileURL= results[0].File.ServerRelativeUrl;
		   	$('#blah').attr('src', fileURL);
		},
		error:function(data)
		{
			 console.log(data);
		}
	})
}

AddSlider.prototype.AddSlider = function AddSlider(file) 
{debugger;
	var deffered=$.Deferred();
	var Handler=this;
	var url = Handler.SiteURL + "/_api/contextinfo";
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        contentType: "application/json;odata=verbose",
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            var libraryName = "BannerImages";

            var reader = new FileReader();
            var arrayBuffer;

            reader.onload = function (e) 
            {
                arrayBuffer = reader.result;
                url = Handler.SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + libraryName + "')/Files/add(url='" + file.name + "',overwrite=true)";
				$.ajax({
                    url: url,
                    type: "POST",
                    data: arrayBuffer,
                    headers: {
                        "Accept": "application/json; odata=verbose",
                        "X-RequestDigest": digest
                    },
                    contentType: "application/json;odata=verbose",
                    processData: false,
                    success: function (response) 
                    {debugger;
                    
						objAddSlider.GetDocumentItemId(libraryName,response.d.ServerRelativeUrl).done(function () 		// Get Document Item ID 
						{
							objAddSlider.UpdateSliderProperties(libraryName).done(function(responseD){		// Update Slider Metadata properties
	                        	deffered.resolve("Success");
	                        });
	                    })
                    },
                    error: function (error) {
                    	
                        alert("Please try again something went wrong.<br/>"+JSON.stringify(errorr));
                        deffered.reject("Error occured in AddSlider() : " + error);
                    }
                });
            };
            reader.readAsArrayBuffer(file);
        },
        error: function (errorr) {
            alert("Please try again something went wrong.<br/>"+JSON.stringify(errorr));
            
        }
    });
    
    return deffered;
}

AddSlider.prototype.UpdateSlider = function UpdateSlider(file) 
{ 
	var Handler=this;
	var deffered=$.Deferred();
	
	var libraryName = "BannerImages";
	var fileInput = $("#sliderImage");

    var SliderImage = fileInput[0].files.length;
	if(SliderImage>0)			// Update Document along with its Metadata
	{
		objAddSlider.DeleteSlider().done(function(){
			var url = Handler.SiteURL + "/_api/contextinfo";
		    $.ajax({
		        url: url,
		        type: "POST",
		        headers: {
		            "Accept": "application/json; odata=verbose"
		        },
		        contentType: "application/json;odata=verbose",
		        success: function (data) {
		            var digest = data.d.GetContextWebInformation.FormDigestValue;
		            
		            var reader = new FileReader();
		            var arrayBuffer;
		
		            reader.onload = function (e) 
		            {
		                arrayBuffer = reader.result;
		                url = Handler.SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + libraryName + "')/Files/add(url='" + file.name + "',overwrite=true)";
						$.ajax({
		                    url: url,
		                    type: "POST",
		                    data: arrayBuffer,
		                    headers: {
		                        "Accept": "application/json; odata=verbose",
		                        "X-RequestDigest": digest
		                    },
		                    contentType: "application/json;odata=verbose",
		                    processData: false,
		                    success: function (response) {
								objAddSlider.GetDocumentItemId(libraryName,response.d.ServerRelativeUrl).done(function () 		// Get Document Item ID 
								{
									objAddSlider.UpdateSliderProperties(libraryName).done(function(responseD){		// Update Slider Metadata properties
			                        	deffered.resolve("Success");
			                        	
			                        	objAddSlider.UpdateAttachments();			// Update BannerImageID of all relevant docs.
			                        });
			                    })
		                    },
		                    error: function (error) {
		                        alert("Please try again something went wrong.<br/>"+JSON.stringify(error));
		                        deffered.reject("Error occured in AddSlider() : " + error);
		                    }
		                });
		            };
		            reader.readAsArrayBuffer(file);
		        },
		        error: function (errorr) {
		            alert("Please try again something went wrong.<br/>"+JSON.stringify(errorr));
		        }
		    });
	    });
    }
    else	// Update Document's Metadata only
    {
    	objAddSlider.UpdateSliderProperties(libraryName).done(function(responseD){		// Update Slider Metadata properties only
	    	deffered.resolve("Success");
	    });	
    }
    
    return deffered;
}


AddSlider.prototype.DeleteSlider = function DeleteSlider() {
	var Handler=this;
	var deferred=$.Deferred();
	
	var ListName ='BannerImages';
	
	var URL =  Handler.SiteURL + "/_api/web/lists/getbytitle('"+ListName +"')/items("+Handler.ItemId+")";
    $.ajax({
        url: URL,
        type:"DELETE",
        headers: { "accept": "application/json;odata=verbose",
        		   "X-RequestDigest": $("#__REQUESTDIGEST").val(), 
        		   "IF-MATCH": "*" },
        success: function (data)
        {
			// Slider Delete Successfully.
			deferred.resolve("Deleted");
		}, 
        error: function (data)
        {
             console.log(data);
             deferred.resolve(data);
        }
    });
    return deferred;
}

///////////////////////////////////////////////////////// Update Attachemnts /////////////////////////////////////////////////////////////////
AddSlider.prototype.UpdateAttachments = function UpdateAttachments() {
	var Handler=this;	
	var currentItemID= titanForWork.getQueryStringParameter('ItemId');
	
	var libraryName='BannersAttachments';
	var Ownurl = Handler.SiteURL + "/_api/web/Lists/GetByTitle('"+libraryName+"')/Items?select=*,File/Name,File/ServerRelativeUrl&$filter=BannerImageID eq "+currentItemID+"&$expand=File";
	
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
	       	$.each(results,function(i,item){
	       		Handler.AttachmentItemId = item.ID;
	       		objAddSlider.UpdateAttachmentsProperties(libraryName); 	
	       	});
	    }, 
		eror: function (data)
		{
		    console.log('error');
		}                   
	});     
} 



/////////////////////////////////////////////////////// Get Document Item ID /////////////////////////////////////////////////////////////
AddSlider.prototype.GetDocumentItemId = function GetDocumentItemId(documentLibraryName,targetFileUrl) 
{
	var Handler=this;
	var deferred=$.Deferred();
	var URI=  Handler.SiteURL  + "/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items?$select=ID,Author/Id&$expand=Author&$filter=Author/Id eq "+_spPageContextInfo.userId+"&$orderby=ID desc&$top=1";  //Handler.SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields";
	
    $.ajax({
        url:URI,
        type: 'GET',
        async: false,
        headers: { 'accept': 'application/json;odata=verbose' },
        success: function (responseData) 
        {
        	var itemID=responseData.d.results["0"].ID;
        	Handler.ItemId = itemID;
        	deferred.resolve(itemID);
        	//deferred.resolve(responseData.d.Id);
        },
        error: function (errorMessage) {
            console.log('error  GetDocumentItemId');
            deferred.reject(errorMessage);
        }
    });
    return deferred;
}


AddSlider.prototype.GetAttachmentItemId = function GetAttachmentItemId(documentLibraryName,targetFileUrl) 
{
	var Handler=this;
	var deferred=$.Deferred();
	var URI=  Handler.SiteURL  + "/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items?$select=ID,Author/Id&$expand=Author&$filter=Author/Id eq "+_spPageContextInfo.userId+"&$orderby=ID desc&$top=1";  //Handler.SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields";
	
    $.ajax({
        url:URI,
        type: 'GET',
        async: false,
        headers: { 'accept': 'application/json;odata=verbose' },
        success: function (responseData) 
        {
        	var itemID=responseData.d.results["0"].ID;
        	Handler.AttachmentItemId = itemID;
        	deferred.resolve(itemID);
        },
        error: function (errorMessage) {
            console.log('error  GetDocumentItemId');
            deferred.reject(errorMessage);
        }
    });
    return deferred;
}


////////////////////////////////////////////////////////////////// Update Slider Metadata Properties /////////////////////////////////////////////////////////
AddSlider.prototype.UpdateSliderProperties= function UpdateSliderProperties(documentLibraryName) 
{
	var Handler=this;
	var dfd = $.Deferred();   
	var metadataDescription=objAddSlider.SliderMetadata();
	var oweburl =  Handler.SiteURL  + "/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items(" + Handler.ItemId + ")";

    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(metadataDescription),
        success: function (RESULT) {
            dfd.resolve("Success");
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();   
}

/////////////////////////////////////////////////////// Generate Slider Metadata //////////////////////////////////////////////////////
AddSlider.prototype.SliderMetadata = function SliderMetadata() {debugger;
	var Handler = this;
	var documentLibraryName='BannerImages';
	
//	var newsDate = objAddSlider.ConvertDateTimeFormat(Handler.NewsDate.val(),'/'); 
    var displayFrom=  objAddSlider.ConvertDateTimeFormat(Handler.DisplayFrom.val(),'/');
    var displayTill= objAddSlider.ConvertDateTimeFormat(Handler.DisplayTill.val(),'/'); 
//    var sliderType = $(".sliderType:checked").val();
	
 	var ItemType = objAddSlider.GetItemTypeForDocumentLibrary(documentLibraryName);
    var Metadata = {"__metadata": {'type': ItemType}};
    
    var sliderType = $("#SliderCatogery").val();
    var Rel_Word = $("#TextRelWord").val();
    var Publishby = $("#textPublishBy").val();
    var Audience = "Company";
    var _companyID = titanForWork.getQueryStringParameter('CompanyId');
    
    var linklist=[];
    for(var k=0; k<5; k++)
    {
    	if($("#video_link"+k).val() != undefined && $("#video_link"+k).val() != "" )
    	{
    		linklist.push($("#video_link"+k).val());
    	}
    }
        
     Metadata["Title"]=Handler.Title.val().trim();
	 Metadata["Description"]=Handler.Description.html().trim();
	 //Metadata["NewsDate"]=newsDate; 
	 Metadata["DisplayFrom"]=displayFrom; 
	 Metadata["DisplayTill"]=displayTill;
	 //Metadata["IsActive"]=Handler.IsActive.is(":checked");
	 Metadata["SliderType"]=sliderType;
	 Metadata["Related_Word"]=Rel_Word;
	 Metadata["PublishBy"]=Publishby;
	 Metadata["Audience"]=Audience;
 	 Metadata["Company"]=_companyID;
 	 Metadata["videolink"]=linklist.toString();
 	 Metadata["ApprovalStatus"]="Pending";
 	 

	 
	 	   	 
	   	$(".otherLanguages .panel-default").each(function()
	   	{
	   		var langaugeName=$(this).attr('class').split(' ')[2];
			
	   		var titleKey=langaugeName+"_Title";
	   		var DescriptionKey=langaugeName+"_Description";
	   		
	   		Metadata[titleKey]=$(this).find('.title').val().trim();
	   		Metadata[DescriptionKey]=$(this).find('.Description').val().trim();
	   	});

    
    
    
	/*if(sliderType=="News")
	{
		// Default Columns
	    Metadata["Title"]=Handler.Title.val().trim();
	    Metadata["Description"]=Handler.Description.val().trim();
	    Metadata["NewsDate"]=newsDate; 
	    Metadata["DisplayFrom"]=displayFrom; 
	    Metadata["DisplayTill"]=displayTill;
	   	Metadata["IsActive"]=Handler.IsActive.is(":checked");
	   	Metadata["SliderType"]=sliderType;
	   	 
	   	$(".otherLanguages .panel-default").each(function()
	   	{
	   		var langaugeName=$(this).attr('class').split(' ')[2];
			
	   		var titleKey=langaugeName+"_Title";
	   		var DescriptionKey=langaugeName+"_Description";
	   		
	   		Metadata[titleKey]=$(this).find('.title').val().trim();
	   		Metadata[DescriptionKey]=$(this).find('.Description').val().trim();
	   	});
	}
	else if(sliderType=="Banners")
	{
		Metadata["Title"]=Handler.Title.val().trim();
	   	Metadata["IsActive"]=Handler.IsActive.is(":checked");
	   	Metadata["SliderType"]=sliderType; 
	   	Metadata["DisplayFrom"]=displayFrom; 
	    Metadata["DisplayTill"]=displayTill;
	   	
	   	$(".otherLanguages .panel-default").each(function()
	   	{
	   		var langaugeName=$(this).attr('class').split(' ')[2];
			
	   		var titleKey=langaugeName+"_Title";
	   		
	   		Metadata[titleKey]=$(this).find('.title').val().trim();
	   	});
	}*/
   
	return Metadata;
}

////////////////////////////////////////////////////// Validations //////////////////////////////////////////////////
AddSlider.prototype.Validations = function Validations() {
    var Handler = this;
    var fileInput = $("#sliderImage");

    var SliderImage = fileInput[0].files.length;
	
	var sliderType = $(".sliderType:checked").val();
	/*if(sliderType=="Banners")
	{
		if(Handler.Title.val().trim()=='')
	    {
	    	alert("Please enter Title.");
	    	Handler.Title.focus();
	    	return false;
	    }
	    else if(Handler.DisplayFrom.val().trim()=='')
	    {
	    	alert("Please enter Display From Date.");
	    	Handler.DisplayFrom.focus();
	    	return false;
	    }
	    else if(Handler.DisplayTill.val().trim()=='')
	    {
	    	alert("Please enter Display Till Date.");
	    	Handler.DisplayTill.focus();
	    	return false;
	    }
	    else if(SliderImage ==0 && Handler.Mode=="Add")
	    {
	    	alert("Please upload slider image.");
	    	return false;
	    }
	}
	else if(sliderType=="News")
	{*/
		if(Handler.Title.val().trim()=='')
	    {
	    	alert("Please enter Title.");
	    	Handler.Title.focus();
	    	return false;
	    }
	    else if(Handler.Description.text().trim()=='')
	    {
	    	alert("Please enter Description.");
	    	//Handler.Description.focus();
	    	return false;
	    }
	 /*   else if(Handler.NewsDate.val().trim()=='')
	    {
	    	alert("Please enter News Date.");
	    	Handler.NewsDate.focus();
	    	return false;
	    }*/
	     else if($("#TextRelWord").val().trim()=='')
	    {
	    	alert("Please enter related word.");
	    	$("#TextRelWord").focus();
	    	return false;
	    }
	    else if($("#textPublishBy").val().trim()=='')
	    {
	    	alert("Please enter publish by.");
	    	$("#textPublishBy").focus();
	    	return false;
	    }
		else if(Handler.DisplayFrom.val().trim()=='')
	    {
	    	alert("Please enter Display From Date.");
	    	Handler.DisplayFrom.focus();
	    	return false;
	    }
	    else if(Handler.DisplayTill.val().trim()=='')
	    {
	    	alert("Please enter Display Till Date.");
	    	Handler.DisplayTill.focus();
	    	return false;
	    }//TextRelWord
	   	/*else if($(".video_link").val().trim()=='')
	    {
	    	alert("Please enter video links.");
	    	$(".video_link").focus();
	    	return false;
	    }*/
		else if(SliderImage ==0 && Handler.Mode=="Add")
	    {
	    	alert("Please upload slider image.");
	    	return false;
	    }
	//}
     
	return true;
};
	
////////////////////////////////////////// Get Active Languages and Bind Langugaes Sections Accordingly ////////////////////////////////////////////

var LanguageResults;
AddSlider.prototype.GetActiveLanguage=function(){
	var Handler=this;
	
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('LanguageSetting')/items?$select=*&$Filter=Status eq 'Active'";
    $.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
            		 //var counter=0;
            		  LanguageResults = data.d.results;
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
							if (preferredLanguageGlobal == languageTitle) {
		                        var divlang = '<div class="panel-body flip" >';
		                        otherLanguageHTML += divlang;
		                    }
		                    else {
		                        otherLanguageHTML += '<div class="panel-body my_before_flip">';
		                    }
							otherLanguageHTML += '<div class="form-horizontal">';
		                    otherLanguageHTML += '<div class="form-group">';
		                    otherLanguageHTML += '<label for="" class="col-sm-4 control-label" id="Title_' + languageID + '" data-localize=""></label>'; //language.split(' ')[0]
		                    otherLanguageHTML += '<div class="col-sm-8">';
		                    otherLanguageHTML += "<input type='text' class='form-control title'>";
		                    otherLanguageHTML += '</div></div>';
		                    otherLanguageHTML += '<div class="form-group">';
		                    otherLanguageHTML += '<label for="" class="col-sm-4 control-label" id="Description_' + languageID + '" data-localize=""></label>';  //language.split(' ')[0]
		                    otherLanguageHTML += '<div class="col-sm-8">';
		                    otherLanguageHTML += "<textarea class='form-control Description' rows='10'></textarea>";
		                    otherLanguageHTML += '</div></div></div></div></div></div>';  
		                                              
        		 			$(".otherLanguages").append(otherLanguageHTML);
            		 	 }
            		 })
            },
            error: function (data) {
                console.log(data);
            }                     
       });
}

AddSlider.prototype.GetLabels = function GetLabels() {
    var Handler = this;
    var deferred = $.Deferred();
    //var companyID=titanForWork.getQueryStringParameter('CompanyId');
    var TableName = "Table1";
  //  var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('LabelsSettings')/items?$select=*&$filter=((Key eq 'Title') or (Key eq 'Description'))";
    var URL = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ExcelRest.aspx/Documents/languagedata.xlsx/OData/" + TableName + "?$inlinecount=allpages&$select=DefaultLanguage,Key,LabelType,Language2nd,Language3rd,Language4th,Language5th,Language6th,Language7th,Language8th,Language9th,Language10th&$filter=((Key eq 'Title') or (Key eq 'Description'))";
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $.each(LanguageResults, function (i, data) {
                    language = data['Language'];
                    languageTitle = data['Title'];
                    languageID = data['ID'];
                    // alert(items.length);

                    if (languageID == 3) {
                        $('#Title_' + languageID + '').text(items[0].Language2nd)
                        $('#Description_' + languageID + '').text(items[1].Language2nd)
                    }
                    if (languageID == 4) {
                        $('#Title_' + languageID + '').text(items[0].Language3rd)
                        $('#Description_' + languageID + '').text(items[1].Language3rd)
                    }
                    if (languageID == 5) {

                        $('#Title_' + languageID + '').text(items[0].Language4th)
                        $('#Description_' + languageID + '').text(items[1].Language4th)
                    }
                    if (languageID == 6) {

                       $('#Title_' + languageID + '').text(items[0].Language5th)
                       $('#Description_' + languageID + '').text(items[1].Language5th)
                    }
                    if (languageID == 7) {

                       $('#Title_' + languageID + '').text(items[0].Language6th)
                       $('#Description_' + languageID + '').text(items[1].Language6th)
                    }
                    if (languageID == 8) {

                        $('#Title_' + languageID + '').text(items[0].Language7th)
                        $('#Description_' + languageID + '').text(items[1].Language7th)
                    }
                    if (languageID == 9) {

                        $('#Title_' + languageID + '').text(items[0].Language8th)
                        $('#Description_' + languageID + '').text(items[1].Language8th)
                    }
                    if (languageID == 10) {

                        $('#Title_' + languageID + '').text(items[0].Language9th)
                        $('#Description_' + languageID + '').text(items[1].Language9th)
                    }
                    if (languageID == 11) {

                        $('#Title_' + languageID + '').text(items[0].Language10th)
                        $('#Description_' + languageID + '').text(items[1].Language10th)
                    }

                })
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    return deferred;
}

AddSlider.prototype.ConvertDateTimeFormat = function ConvertDateTimeFormat(date,delimiter)
{
	return date.split(delimiter)[1]+""+delimiter+""+date.split(delimiter)[0]+""+delimiter+""+date.split(delimiter)[2];
}

AddSlider.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName)
{
	return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

AddSlider.prototype.GetItemTypeForDocumentLibrary = function GetItemTypeForDocumentLibrary(ListName) 
{
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "Item";//"SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}


AddSlider.prototype.ResetControls = function () {
	var Handler = this;
	Handler.Title.val('');
	
	$(".otherLanguages .panel-default").each(function()
   	{
   		var langaugeName=$(this).attr('class').split(' ')[2];
   		
   		$(this).find('.title').val('');
   		$(this).find('.Description').val('');
   	});
}

AddSlider.prototype.readURL= function readURL(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            $('#blah').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// 2. Attachments /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddSlider.prototype.UploadSliderAttachments = function UploadSliderAttachments(file) 
{
	var deffered=$.Deferred();
	var Handler=this;
	var url = Handler.SiteURL + "/_api/contextinfo";
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        contentType: "application/json;odata=verbose",
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            var libraryName = "BannersAttachments";

            var reader = new FileReader();
            var arrayBuffer;

            reader.onload = function (e) 
            {
                arrayBuffer = reader.result;
                url = Handler.SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + libraryName + "')/Files/add(url='" + file.name + "',overwrite=true)";
				$.ajax({
                    url: url,
                    type: "POST",
                    data: arrayBuffer,
                    headers: {
                        "Accept": "application/json; odata=verbose",
                        "X-RequestDigest": digest
                    },
                    contentType: "application/json;odata=verbose",
                    processData: false,
                    success: function (response) 
                    {
						objAddSlider.GetAttachmentItemId(libraryName,response.d.ServerRelativeUrl).done(function () 
						{
							objAddSlider.UpdateAttachmentsProperties(libraryName).done(function(responseD){
	                        	alert("File uploaded successfully");
	                        	Handler.AttachmentsTable.html(' ');
					 			//objAddSlider.GenerateAttachmentTable(Handler.AttachmentItemId,response.d.Name,response.d.ServerRelativeUrl);  
					 			objAddSlider.GetAttachments();  
	                        });
	                    })
                    },
                    error: function (error) {
                        alert("Please try again something went wrong.<br/>"+JSON.stringify(errorr));
                        deffered.reject("Error occured in AddSlider() : " + error);
                    }
                });
            };
            reader.readAsArrayBuffer(file);
        },
        error: function (errorr) {
            alert("Please try again something went wrong.<br/>"+JSON.stringify(errorr));
        }
    });
    
    return deffered;
}

///////////////////////////////////////////////// Update Attachments Metadata Properties ///////////////////////////////////////
AddSlider.prototype.UpdateAttachmentsProperties= function UpdateAttachmentsProperties(documentLibraryName) 
{

	var Handler=this;
	var dfd = $.Deferred();   
	var Metadata;
    var ItemType = objAddSlider.GetItemTypeForDocumentLibrary(documentLibraryName);
     
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        BannerImageID: Handler.ItemId
    };
    
    var oweburl =  Handler.SiteURL  + "/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items(" + Handler.AttachmentItemId + ")";
    $.ajax({
        url: oweburl,
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
        success: function (response) {
            dfd.resolve(response);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd;  
}


AddSlider.prototype.readURLAttachment= function readURLAttachment(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            $('#blahAttachment').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}	
	
///////////////////////////////////////////////// Generate Attachments Table ////////////////////////////////////////////////////
AddSlider.prototype.GenerateAttachmentTable = function GenerateAttachmentTable(AttachmentItemId,FileName,FileURL)
{
	var Handler=this;
	
	var itemHTML="<tr>";
	itemHTML+="<th scope=\"row\">"+titanForWork.GetDocumentTypeIcon(FileName) + "</th>";
	itemHTML+="<th scope=\"row\">"+FileName+"</th>";
	itemHTML+="<th><a target='_blank' href='"+FileURL+"'><span class=\"glyphicon glyphicon-download-alt\"></span></a></th>";
	itemHTML+="<th><a style='cursor:pointer' onclick=\"objAddSlider.DeleteAttachment("+AttachmentItemId +",'"+FileName+"','"+FileURL+"')\"><span class=\"glyphicon glyphicon-remove\"></span></a></th>";
	itemHTML+="</tr>";
	
	Handler.AttachmentsTable.append(itemHTML);
	Handler.AttachmentsDiv.show();
}

///////////////////////////////////////////////// Delete Attachment //////////////////////////////////////////////////////////////
AddSlider.prototype.DeleteAttachment = function DeleteAttachment(ItemId,fileName,fileURL) {
	var Handler=this;

	var Dfd = $.Deferred();  
	//var Url = Handler.SiteURL + "/_api/web/lists/GetByTitle('BannersAttachments')/GetItemById(" + ItemId + ")";  
	var Url = Handler.SiteURL +  "/_api/web/getfilebyserverrelativeurl('"+fileURL+"')";  
	$.ajax({  
	    url: Url,  
	    type: 'DELETE',  
	    contentType: 'application/json;odata=verbose',  
	    headers: {  
	        'X-RequestDigest': $('#__REQUESTDIGEST').val(),  
	        'X-HTTP-Method': 'DELETE',  
	        'Accept': 'application/json;odata=verbose'  
	    },  
	    success: function (data) {  
	        Dfd.resolve(data);  
	        Handler.AttachmentsTable.html(' ');

	        objAddSlider.GetAttachments();
	    },  
	    error: function (error) {  
	        Dfd.reject(JSON.stringify(error));  
	    }  
	});  
	
	return Dfd.promise(); 
}

///////////////////////////////////////////////////////// Get Attachments By ItemID /////////////////////////////////////////////////////////////////
AddSlider.prototype.GetAttachments = function GetAttachments() {
	var Handler=this;	
	
	var Ownurl = Handler.SiteURL + "/_api/web/Lists/GetByTitle('BannersAttachments')/Items?select=*,File/Name,File/ServerRelativeUrl&$filter=BannerImageID eq "+Handler.ItemId+"&$expand=File";
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
	       	var totalAttachments= results.length;
	       	
	       	Handler.AddAttachment.text("Attachments ("+totalAttachments+")");
	       	Handler.NewAddedItemID.val(Handler.ItemId);

	       	$.each(results,function(i,item){
	       		objAddSlider.GenerateAttachmentTable(item.ID,item.File.Name,item.File.ServerRelativeUrl); 	
	       	});
	       	
	       	Handler.AddAttachment.click(function(){
	       		Handler.ModalAttachments.modal({backdrop: 'static', keyboard: false});
	       	})
	    }, 
		eror: function (data)
		{
		    console.log('error');
		}                   
	});     
} 



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// 3. Notification Center : Add Notifications into Notification Center List  ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddSlider.prototype.NotificationCenter=function NotificationCenter()
{
	var Handler = this;
	try
    {
    	var webPartName,description;
    	if(Handler.Mode=='Add')		
    	{
			webPartName="Banners";
			description="A new announcement "+Handler.Description.val()+" has been posted.";
		}
		else
		{
			webPartName="Banners (Revised)";
			description="Banners "+Handler.Description.val()+" has been modified.";
		}
		
		var title= Handler.Title.val();
		var companyId= titanForWork.getQueryStringParameter('CompanyId');
		
        var Metadata;
        var ItemType = objAddSlider.GetItemTypeForListName("NotificationCenter");
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
			   
               Title: title,
               Details: description,
			   WebpartName:webPartName,
			   CompanyIdId:companyId
			};
            objAddSlider.AddItemIntoNotificationCenter("NotificationCenter", Metadata);         
    }
    catch (error)
    {
        console.log(error.message);
    }
}

AddSlider.prototype.AddItemIntoNotificationCenter = function  AddItemIntoNotificationCenter(ListName, Metadata) 
{
	var requestURI= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";
	
	//var dfd = $.Deferred();
    $.ajax({
        url: requestURI,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            //dfd.resolve(data);
		},
        error: function (error) {
			//alert(JSON.stringify(error));
            //dfd.reject(error);
        }
    });
    //return dfd.promise();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Main Entry Point //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    objAddSlider= new AddSlider();
    objAddSlider.InitializeControls();
    objAddSlider.GetActiveLanguage();
    objAddSlider.BindEvents();
    objAddSlider.SetControls();
    objAddSlider.CheckRadio(); 
    objAddSlider.GetLabels();
    
    var urlMode = titanForWork.getQueryStringParameter('Mode');
    if(urlMode == "Update"){
    //sliderImage
    //$("sliderImage").attr('disabled','disabled');
    //document.getElementById("sliderImage").disabled = true;
    document.getElementById("sliderImage").style.display = 'none';
    }else if(urlMode == "View"){
     $(".viewMode").attr('disabled','disabled');    
    }
    
    GetCategory();
    //<button type="button" class="btn-outline-primary btn-sm form-control btn-display" id="Video_link_btn">Add</button>

    $('#Video_link_btn').click(function () {
    var count = $("#Videolinkbox").find('input:text').length;
    	if ($("#Videolinkbox").find('input:text').length < 5){ $("#Videolinkbox").append('<input id="video_link'+count+'" type="text" maxlength="100" class="form-control video_link">'); add_Deletebtn(count); }
   		else { alert("Warning! Maximum 5 Video link can be saved."); }
	});
	
	
	$("#textPublishBy").val(_spPageContextInfo.userDisplayName);	//Set current user name in publish by
	
	$("#DisplayFrom").datepicker({dateFormat:"yy/mm/dd"}).datepicker("setDate",new Date());
	

var x = 6;
var CurrentDate = new Date();
CurrentDate.setMonth(CurrentDate.getMonth() + x);
var d = new Date(CurrentDate);
	var _Date =   d.getDate();
	var month = '';
	if((d.getMonth()+1)<10){month = "0"+(d.getMonth()+1);} else{month =(d.getMonth()+1); }
	var year = d.getFullYear();
	$("#DisplayTill").val(_Date+"/"+month+"/"+year);	
	
	
	
	
var file = document.getElementById('sliderImage');
file.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'jpg':
    case 'JPG':
    case 'JPEG':
    case 'jpeg':
    case 'GIF':
    case 'gif':
    case 'PNG':
    case 'png':

  	var size = this.files[0].size/1024;
	if(size.toFixed(2)>1024)
	{
		alert("Image size not more then 1 MB");
		this.value='';
		$('#blah').removeProp('src');
	}
	else
	{
	  document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);
	}
	break;
    default:
    alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');      
    this.value = '';
    $('#blah').removeProp('src');
  }
};
});

function add_Deletebtn(count)
{
	$("#vlinkbtn").append('<button type="button" class="btn-outline-danger btn-sm form-control btn-display" onclick="Deletelinktextbox(this.id);" id="link_btn'+count+'">Delete</button>');
}


function Deletelinktextbox(id)
{	
	var ID =id.slice(8, 9);
	$("#link_btn"+ID).remove();
	$("#video_link"+ID).remove();
}


AddSlider.prototype.CheckRadio = function CheckRadio()
 {
	 $('#rdBanner').click(function(){
	    if($("#rdBanner").is(":checked")){
		    $('#dvDescription').addClass('collapse')	
		    $('#dvNewsDate').addClass('collapse')
	    }	    
	 })
	//$('#rdBanner').prop("checked",true);
	$('#rdNews').click(function(){
	    if($("#rdNews").is(":checked"))
	    {
	        $('#dvDescription').removeClass('collapse')	
		    $('#dvNewsDate').removeClass('collapse')
	    }
	 })
	
 }
 
 
function GetCategory()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$filter=CategoryType eq 'Slider' and Status eq 'Yes' ";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
        	var items = data.d.results;  
            if (items.length > 0) 
			{  
				$('#SliderCatogery').empty();
				for (i = 0; i < items.length; i++) 
				{
   					$('#SliderCatogery').append($("<option     />").val(items[i].CatogeryName).text(items[i].CatogeryName));
  				}
            }    
        },
		eror: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}


var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles = [];
var FinalFiles4Upload=[];
var Tcounter = 0;
var RemoveDuplicate = [];


$(function() {
  $("#FileUpload").on('change', function(e) {
	FinalFiles4Upload =[];
  	var fileNum = this.files.length, initial = 0;
 	    $.each(this.files,function(idx,elm){
       finalFiles[finalFiles.length]=elm;
      });

  RemoveDuplicate = [];
  var arr = finalFiles.filter(function(el) {
    if(RemoveDuplicate.indexOf(el.name) == -1)
    {
      RemoveDuplicate.push(el.name);
      return true;
    }
	  return false;
  });
  console.log(arr);
  FinalFiles4Upload = ReinitializeArray(arr);
  if(FinalFiles4Upload.length<6)
  {
    $('#filename').empty();
  	for (initial; initial < FinalFiles4Upload.length; initial++)
    { 
  		$('#filename').append('<div id="file_'+ Tcounter +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + Tcounter+ '</strong></span> ' + RemoveDuplicate[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_'+ Tcounter +'"" title="remove"></span></div>');
   		Tcounter = Tcounter + 1;
    }
  }
  //getImageWeight();
  });
})


function getImageWeight()
{
	var totalWeight =0;
  	var t=0;
  	for(t; t<FinalFiles4Upload.length; t++)
  	{
  	  totalWeight += FinalFiles4Upload[t].size;
  	}
  	var kb=totalWeight/1024;
  	var mb=kb/1024; 
  	$("#imgweight").text(mb.toFixed(2).concat(" MB"));  
  	if(FinalFiles4Upload.length>5 )
  	{
		alert("Warning: Select only 5 Images/Photos");
	    finalFiles=[];
	    FinalFiles4Upload=[];
	    Tcounter = 0;
		RemoveDuplicate = [];
		$("#FileUpload").val('');
	    $('#filename').empty();
	}
  	else if(mb.toFixed(2)>5)
	{
	    alert("Warning: Total weight of selected Award Image more than 5.00 MB");
	    finalFiles=[];
	    FinalFiles4Upload=[];
	    Tcounter = 0;
		RemoveDuplicate = [];
		$("#FileUpload").val('');
	    $('#filename').empty();
	}
}

function removeLine(id)
{
  	var index = id.split('_')[1];
  	$("#"+id).remove();
  	delete finalFiles[parseInt(index)]; 
  	RemoveDuplicate = [];
	var arr = finalFiles.filter(function(el) {
  	if (RemoveDuplicate.indexOf(el.name) == -1) {
    	RemoveDuplicate.push(el.name);
    	return true;
    }
	return false;
  	});
 	FinalFiles4Upload = ReinitializeArray(arr);
   getImageWeight();
}


function ReinitializeArray(arr) 
{
	var newArr = [];
    var count = 0;
	for (var i in arr) 
	{
    	newArr[count++] = arr[i];
    }
	return newArr;	
}

var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles2 = [];
var FinalFiles4Upload2=[];
var Tcounter2 = 0;
var RemoveDuplicate2 = [];


$(function() {
  $("#UploadDoc").on('change', function(e) {
	FinalFiles4Upload2 =[];
  	var fileNum = this.files.length, initial = 0;
 	$.each(this.files,function(idx,elm){
       finalFiles2[finalFiles2.length]=elm;
});


RemoveDuplicate2 = [];
var arr = finalFiles2.filter(function(el) {
  if (RemoveDuplicate2.indexOf(el.name) == -1) {
    RemoveDuplicate2.push(el.name);
    return true;
  	}
	return false;
});

//console.log(arr);
FinalFiles4Upload2 = ReinitializeArray(arr);


$('#Docfilename').empty();
  	for (initial; initial < FinalFiles4Upload2.length; initial++) { 
  		$('#Docfilename').append('<div id="Ifile_'+ Tcounter2 +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + Tcounter2+ '</strong></span> ' + RemoveDuplicate2[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="RemoveDocument(this.id);" id="Ifile_'+ Tcounter2 +'"" title="remove"></span></div>');
   		Tcounter2 = Tcounter2 + 1;
  }
  getDocWeight();
  });
})


function getDocWeight()
{
	var totalWeight =0;
  	var t=0;
  	for(t; t<FinalFiles4Upload2.length; t++)
  	{
  	  totalWeight += FinalFiles4Upload2[t].size;
  	}
  	var kb=totalWeight/1024;
  	var mb=kb/1024; 
  	$("#imgweight").text(mb.toFixed(2).concat(" MB"));  
  	if(FinalFiles4Upload2.length>5 )
  	{
		alert("Warning: Select only 5 Documents");
	    finalFiles2=[];
	    FinalFiles4Upload2=[];
	    Tcounter2 = 0;
		RemoveDuplicate2= [];
		$("#UploadDoc").val('');
	    $('#Docfilename').empty();
	}
  	else if(mb.toFixed(2)>5)
	{
	    alert("Warning: Total weight of selected Award Image more than 5.00 MB");
	    finalFiles2=[];
	    FinalFiles4Upload2=[];
	    Tcounter2 = 0;
		RemoveDuplicate2= [];
		$("#UploadDoc").val('');
	    $('#Docfilename').empty();
	}
}


function RemoveDocument(id)
{
  	var index = id.split('_')[1];
  	$("#"+id).remove();
  	delete finalFiles2[parseInt(index)]; 
  	RemoveDuplicate2 = [];
	var arr = finalFiles2.filter(function(el) {
  	if (RemoveDuplicate2.indexOf(el.name) == -1) {
    	RemoveDuplicate2.push(el.name);
    	return true;
    }
	return false;
  	});
 	FinalFiles4Upload2 = ReinitializeArray(arr);
}


(function($){
$.fn.checkFileType = function(options) {
var defaults = {
	allowedExtensions: [],
	success: function() {},
    error: function() {}
    };
    options = $.extend(defaults, options);
    return this.each(function() {

$(this).on('change', function() {
	var value = $(this).val(),
	file = value.toLowerCase(),
    extension = file.substring(file.lastIndexOf('.') + 1);
	if ($.inArray(extension, options.allowedExtensions) == -1)
	{
    	options.error();
    	$(this).focus();
    } 
    else { options.success(); }
	});
    });
   };
})(jQuery);


$(function() {
    $('#FileUpload').checkFileType({
        allowedExtensions: ['jpg','jpeg','png','gif','JPG'],
        success: function() {
            //alert('Success');
            getImageWeight();
        },
        error: function() {
            alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
            $("#FileUpload").val(null);
            $("#filename").html('');
             finalFiles=[];
    FinalFiles4Upload=[];
    Tcounter = 0;
	RemoveDuplicate = [];

        }
    });
});


function SliderPhoto_DocumentUpload(ID)
{
	var successFileUp = uploadFile(ID,Doctype='Slider_Image',Element='FileUpload'); // Here I'm passing ID(I'm using this ID with FileName). If you don't have anything then just pass ("")
    successFileUp.done(function(){
    	var successFileUp = uploadFile(ID,Doctype='Slider_Document',Element='UploadDoc');
    	successFileUp.done(function(){
    		
    		var _Mode = titanForWork.getQueryStringParameter('Mode');
    		if(_Mode == "Add")
    		{
    			titanForWork.CreateWorkflowTaskForApproval(ID, titanForWork.getQueryStringParameter('CompanyId'), 0, "Banners", $("#Title").val(), $(".richText-editor").text(), $("#SliderCatogery option:selected").text()).done(function (response) {
            		console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                	if (response == "ApprovalNotRequired")			// Approval Not Required.
                    {
                    	var itemIDN = ID;
              			AutoApprovedSlider(itemIDN);
              			AutoApprovedAnnouncement(AnnouncementId);
						var DescDtl = "Slider " + $(".richText-editor").text() + " has been posted.";
						var listName="NotificationCenter";
						var WebName ="Banners";
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#Title").val(), 'Details':DescDtl,'WebpartName':WebName ,'CompanyIdId':titanForWork.getQueryStringParameter('CompanyId')};
						Universalinsert(listName,item,)	;
					}
					})	
		 		alert('Data has been saved successfully.');
		 		window.location.href="../Pages/ViewSliders.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId');
    		
    		}
    		else if(_Mode == "Update" )
    		{
    			titanForWork.GetItemIDOfApprovalTaskList(ID, titanForWork.getQueryStringParameter('CompanyId'), 'Banners').done(function (requestItemID) {
            		titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
                })
                	
                titanForWork.CreateWorkflowTaskForApproval(ID, titanForWork.getQueryStringParameter('CompanyId'), 0, "Banners", $("#Title").val(), $(".richText-editor").text(), $("#SliderCatogery option:selected").text()).done(function (response) {
                   	console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                	if (response == "ApprovalNotRequired")			// Approval Not Required.
                	{
                    	var itemIDN = ID;
                    	AutoApprovedGeneral(itemIDN);                        
            			var DescDtl = "Slider " + $(".richText-editor").text() + " has been modified.";
						var listName="NotificationCenter";
						var WebName ="Banners";
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#Title").val(), 'Details':DescDtl ,'WebpartName':WebName ,'CompanyIdId':titanForWork.getQueryStringParameter('CompanyId')};
						Universalinsert(listName,item,)	;
                    }
                 	});
                 alert('Data has been updated successfully.');
                 window.location.href="../Pages/ViewSliders.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId');
			}
    	});
	});
}

function uploadFile(ID,Doctype,Element) 
{
	if(Element !="FileUpload")
    { 
      FinalFiles4Upload=null;
      FinalFiles4Upload=FinalFiles4Upload2;
    }
 	var deferred = $.Deferred();
 	
	var serverUrl = titanForWork.getQueryStringParameter('CompanySiteUrl'); //_spPageContextInfo.webAbsoluteUrl;    // Get the server URL.
	var serverRelativeUrlToFolder = serverUrl.substr(serverUrl.indexOf('/sites')+0)+"/SliderDocuments";//Split url from sites to get subsite folder url
 	(function Tasks(i,callback)
 	{
    	if(i<FinalFiles4Upload.length)
    	{
    	  	var success = ProcessFiles(i);
    		success.done(function(){Tasks((i+1),callback);});
    	}
    	else
    	{
    		callback();
    	}
})(0,function(){deferred.resolve();});
 
function ProcessFiles(ind)
{
	var deferred = $.Deferred();
    var getFile = getFileBuffer(ind);
    getFile.done(function (arrayBuffer) {
    var addFile = addFileToFolder(arrayBuffer,ind);
    addFile.done(function (file, status, xhr) {
    var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
    getItem.done(function (listItem, status, xhr) {     
    var changeItem = updateListItem(listItem.d.__metadata,ind); // Change the display name and title of the list item.
    changeItem.done(function (data, status, xhr) {      
      deferred.resolve();
     });
     changeItem.fail(onError);
    });
    getItem.fail(onError);
   });
   addFile.fail(onError);
  });
  getFile.fail(onError);
  return deferred.promise();
 }

function getFileBuffer(ind) 
{
    var deferred = jQuery.Deferred();
    var reader = new FileReader();
    reader.onloadend = function (e) { deferred.resolve(e.target.result); }
    reader.onerror = function (e) { deferred.reject(e.target.error); }
    reader.readAsArrayBuffer(FinalFiles4Upload[ind]);
    return deferred.promise();
}

function addFileToFolder(arrayBuffer,ind) 
{  
  var fileName = FinalFiles4Upload[ind].name; 
  var fileCollectionEndpoint = String.format("{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" + "/add(url='{2}',overwrite=true)", serverUrl, serverRelativeUrlToFolder, fileName);
  return jQuery.ajax({
    url: fileCollectionEndpoint,
    type: "POST",
     async: false,
    data: arrayBuffer,
    processData: false,
    headers: {
        "accept": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
        "content-type": "application/json;odata=verbose"
        }
    });
}

function getListItem(fileListItemUri) {
  return jQuery.ajax({
    url: fileListItemUri,
    type: "GET",
    headers: { "accept": "application/json;odata=verbose" }
  });
}

function updateListItem(itemMetadata,ind)
{
  var newName =  ID.toString()+'-'+FinalFiles4Upload[ind].name;
  var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','DataID':'{3}','DocType':'{4}'}}",itemMetadata.type, newName, Doctype, ID,Doctype);
    return jQuery.ajax({
        url: itemMetadata.uri,
        type: "POST",
        async: false,
        data: body,
        headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
              }
    });
 }
 return deferred.promise();
}

function onError(error) 
{ 
	console.log(error);
	//alert(error.responseText);
	//location.reload();
}



function GetSliderDocuments(filename)
{debugger;
	var requestUri = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/web/GetFolderByServerRelativeUrl('SliderDocuments')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'"+filename+"')";
	//var requestUri = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/web/GetFolderByServerRelativeUrl('SliderDocuments')/files?Select=DocType,Name,ServerRelativeUrl&$filter=DataID eq '"+filename+"'";
	var requestHeaders = { "accept": "application/json;odata=verbose" }
	$.ajax({
    	url: requestUri,
    	type: 'GET',
    	async: false,
    	dataType: 'json',
    	headers: requestHeaders,
        success: function (data) 
    	{debugger;
    	    var res = data.d.results;
    	    if(res.length>0)
    	    {
    	    	var x=0;
    	    	for(x; x<res.length; x++)
    	    	{
					if(res[x].Title == "Slider_Image")
					{	var imgname= res[x].Name;
						$('#OldImagename').append('<div id="_file_'+ x +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong></span><a href="'+document.location.origin+res[x].ServerRelativeUrl+'" target="_blank"><span class="play"></span><span class="">' + res[x].Name + '</span></a> &nbsp;&nbsp;<span class="fa fa-trash-o fa-lg closeBtn" style="color:red;"  onclick="DeleteSelectedFile(this.id);" value=\'' + imgname+ '\'" id="file_'+ x +'"" title="Delete"></span></div>');
					}
					else if (res[x].Title == "Slider_Document")
					{	
						var Docname= res[x].Name;		
						$('#oldfilename').append('<div id="_file_'+ x +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong></span><a href="'+document.location.origin+res[x].ServerRelativeUrl+'" target="_blank"><span class="play"></span><span class="">' + res[x].Name + '</span></a> &nbsp;&nbsp;<span class="fa fa-trash-o fa-lg closeBtn" style="color:red;"  onclick="DeleteSelectedFile(this.id);" value=\'' + Docname + '\'" id="file_'+ x +'"" title="Delete"></span></div>');
					}
				}
			}    	    
		},
    	error: function ajaxError(response) 
    	{
        	alert(response.status + ' ' + response.statusText);
    	}
	});	
}


function DeleteSelectedFile(id) 
{
	if (confirm('Are you sure to delete this document?')) 
	{	
		var serverUrl = titanForWork.getQueryStringParameter('CompanySiteUrl'); //_spPageContextInfo.webAbsoluteUrl;    // Get the server URL.
		var serverRelativeUrlToFolder = serverUrl.substr(serverUrl.indexOf('/sites')+0)+"/SliderDocuments";//Split url from sites to get subsite folder url

    	var DocumentName =$("#"+id).attr('value');
    	var ServerRelativeUrlofFile = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/web/GetFileByServerRelativeUrl('" + serverRelativeUrlToFolder  + "/" + DocumentName + "')"
 	    $.ajax
        ({
            url: ServerRelativeUrlofFile,
            type: "POST",
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
                alert("Selected document deleted successfully.");
               $("#_"+id).hide();           
            },
            error: function (xhr, status, error){ console.log("Failed"); }
        });
    } 
	else { console.log('Command Terminated.'); }
}

function AutoApprovedSlider(itemIDN)  
{  
	var documentLibraryName ="BannerImages";
	var _url = titanForWork.getQueryStringParameter('CompanySiteUrl')+"/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items(" + itemIDN + ")";
    $.ajax  
    ({  
        url: _url,
        type: "POST",
        async: false,  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.BannerImagesItem"  
            },  
            ApprovalStatus: "Approved"
        }),  
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },        
        success: function(data, status, xhr){ console.log("Auto Approved Success!"); },  
        error: function(error) { console.log(error); }  
    });
}
 
function Universalinsert(listName,item) 
{	
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
		type: "POST",
		contentType: "application/json;odata=verbose",
		data: JSON.stringify(item),
		async: false,
		headers: 
		{
			"Accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data) { console.log("add success"); },
		error: function (data) { console.log("data"); }
	});
}

function ShowFormattingtools()
{
	if($("#Ftools").prop('checked') == true){ $('.richText-toolbar').show(); }
	else{$('.richText-toolbar').hide();}
}


function ValidateLoginUserEntryscreen() 
{
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
					if(res.length>0){}
					else
					{
						alert("Unauthorized access!");
            			window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
					}
				}
				else
					{
						alert("Unauthorized access!");
            			window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
					}

             	}
             	else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE" )
             	{
             		//break;
				}
				else
				{
					alert("Unauthorized access!");
            		window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
				}  			
            }
            else
            {
            	alert("Unauthorized access!");
            	window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
            }  
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
  });  
}








var AnnouncementId='';

//Add Information In announcements List Added By Rahul Rana

AddSlider.prototype.AddAnnouncements= function AddAnnouncements()
  {
     
	var Handler = this;
    var deferred = $.Deferred();
    var requestURL = '';
    var headersData = '';
    var ListName = 'Announcements';
    var metadataDescription = objAddSlider.AnnouncementMetadata();
     if (Handler.Mode == 'Add')		// For Insert Operation
    {
        //requestURL = Handler.SiteURL + "/_api/web/lists/getbytitle('" + ListName + "')/items";
		requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";
        headersData = {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        };
    }
    else if (Handler.Mode == 'Update')		// For Update Operation
    {
       // requestURL = Handler.SiteURL + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + Handler.ItemId + ")";tems?$select=EmployeeID&$filter=EmployeeID%20eq%20326
		requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + AnnouncementItemId  + ")";

        headersData = {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        };
    }

     $.ajax({
        url: requestURL,
        type: "POST",
        async: false,
        headers: headersData,
        data: JSON.stringify(metadataDescription),

        success: function (dataD) {
          
        
			deferred.resolve(dataD);
			 
			 if (Handler.Mode == 'Add'){
			  var itemID = dataD.d.Id;
			  AnnouncementId=itemID; 	
		       uploadattachment(itemID);
             }
 
        },
        error: function (error) {
          	
            console.log(error);
            deferred.reject(error);
        }
    }); 
    return deferred.promise();
}

AddSlider.prototype.AnnouncementMetadata= function AnnouncementMetadata()
  {
  
   var Handler = this;
    var ListName = 'Announcements';
    var displayFrom=  objAddSlider.ConvertDateTimeFormat(Handler.DisplayFrom.val(),'/');
    var displayTill= objAddSlider.ConvertDateTimeFormat(Handler.DisplayTill.val(),'/'); 
//    var sliderType = $(".sliderType:checked").val();
	
 	var ItemType = GetItemTypeForListName(ListName);
    var Metadata = {"__metadata": {'type': ItemType}};
    
    var sliderType = $("#SliderCatogery").val();
    var Rel_Word = $("#TextRelWord").val();
    var Publishby = $("#textPublishBy").val();
    var Audience = "Company";
    var CompanyId = titanForWork.getQueryStringParameter('CompanyId');
    
    var linklist=[];
    for(var k=0; k<5; k++)
    {
    	if($("#video_link"+k).val() != undefined && $("#video_link"+k).val() != "" )
    	{
    		linklist.push($("#video_link"+k).val());
    	}
    } 
        Metadata["Title"] = Handler.Title.val().trim();
       Metadata["Expires"] = displayTill; //$.datepicker.formatDate('dd/mm/yy', expiryDate); //expiryDate.toLocaleDateString;
		Metadata["Publish_Date"] = displayFrom;
     	 Metadata["EmployeeID"]= Handler.ItemId.toString();
        //Metadata["Description"] = Handler.Description.val().trim();
        Metadata["Description"] = Handler.Description.html().trim();
        Metadata["Announcement_Type"]=sliderType; 
		Metadata["Audience"]="Company";
		Metadata["EmployeeName"] = Publishby; 
        Metadata["WebPartName"]= "Banners"
        Metadata["ApprovalStatus"]="Pending";
        	// Metadata["Company"]=CompanyId;
        Metadata["CompanyId"]={"results": [parseInt(CompanyId)]}
      //  Metadata["WebLinks"] =  linklist.toString();
        Metadata["WebLinks"] = 	{
			'__metadata': { 'type': 'SP.FieldUrlValue' },
			'Description':  linklist.toString(),
			'Url':  linklist.toString()
			}   
        return Metadata;
	}
	
	 
var Images = [];
var AddImage = [];

	$(function () {
		$("#sliderImage").on('change', function (e) {
			ProfileImage = [];
			var fileNum = this.files.length, initial = 0;
			$.each(this.files, function (idx, elm) {
				AddImage[Images.length] = elm;
			});
	
		});
	})
	
	var GetImageBuffer = function (AddImage) {
		var deferred = $.Deferred();
		var reader = new FileReader();
		reader.onload = function (e) {
			deferred.resolve(e.target.result);
		}
	
		reader.onerror = function (e) {
			deferred.reject(e.target.error);
		}
		reader.readAsArrayBuffer(AddImage);
		return deferred.promise();
	};
	
	var xRequestDigest = $("#__REQUESTDIGEST").val();
	function uploadattachment(id) {
	 
		if (AddImage.length > 0) {
			$.each(AddImage, function (index, value) {
			   GetImageBuffer(value).then(function (buffer) {
					var OrginalFileName = value.name;
				var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");
				$.ajax({
					url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('Announcements')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
					method: 'POST',
					data: buffer,
					async: false,
					processData: false,
					headers: 
					{ 
						 
						  "Accept": "application/json;odata=verbose",
						  "content-type": "application/json;odata=verbose",
						  "X-RequestDigest": xRequestDigest
					},
					success: function (data){console.log("Doc Uploaded."); },
					error: function (data) 
					{
						console.log(data.responseText.error);
						  //alert(data.responseText);
					}
				});
				});
			});
		}
	}

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
function AutoApprovedAnnouncement(AnnouncementId)   
{  
    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Announcements')/items('"+AnnouncementId+"')",
        type: "POST",
        async: false,  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.AnnouncementsListItem"  
            },  
            ApprovalStatus: "Approved"
        }),  
        headers:  
        {   
			 
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr){ console.log("Auto Approved Success!"); },  
        error: function(error) { console.log(error); }  
    });
 }
 

AnnouncementItemId="";
AddSlider.prototype.GetAnnouncementItemId = function GetAnnouncementItemId() 
{
	var Handler=this;
	var deferred=$.Deferred();
	var URI= _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Announcements')/Items?$select=ID,EmployeeID&$filter=EmployeeID eq (" + Handler.ItemId + ")";  //Handler.SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields";
	
    $.ajax({
        url:URI,
        type: 'GET',
        async: false,
        headers: { 'accept': 'application/json;odata=verbose' },
        success: function (responseData) 
        {    
           
        	var itemID=responseData.d.results["0"].ID;
        	AnnouncementItemId = itemID;
        	objAddSlider.AddAnnouncements(AnnouncementItemId);
        	deferred.resolve(itemID);
        	//deferred.resolve(responseData.d.Id);
        },
        error: function (errorMessage) {
            console.log('error  GetDocumentItemId');
            deferred.reject(errorMessage);
        }
    });
    return deferred;
}

 
 