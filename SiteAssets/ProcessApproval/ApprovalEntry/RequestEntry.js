var ActiveBtnStatus='Submit';
var ActiveSystemIP =0;
var SignImage=[];
var finalImages = [];

$(document).ready(function () {
	$("form").attr('autocomplete', 'off');

	if(window.location.href.indexOf("ApprovalRequestEntry")> -1) 
	{
		if(window.location.href.indexOf("?")> -1) 
    	{
    		var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
			if(Passingtoken == 'Process Steps')
			{
				var QueryDataStep =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*&$filter=ID eq "+window.atob(titanForWork.getQueryStringParameter('StepID'))+" and Status eq 'Pending'";
				var QueryStepIdData = RequestGetdata(QueryDataStep);
				
				if(QueryStepIdData.length>0)
				{
					getDynamicTemplateName();   
					/*	var temp = window.atob(titanForWork.getQueryStringParameter('RecName')); 		temp = temp.trim();				
    				$('input[name="selector"]').filter("[value='"+temp+"']").attr('checked', true);		*/
    				
    				var temp = window.atob(titanForWork.getQueryStringParameter('Template'));
    				$('input[name="selector"]').filter("[templateid='"+temp+"']").attr('checked', true);									
    		
					$.when(PageColomnsDisplay()).then(function(datarespo){
						CreateLabesDynamically(datarespo);						
					})					
					apendlogoandtemplate();
				}
				else
				{
					alert("The Action has been already performed.");
					window.location.replace("approvals.aspx");					
				}
			}
			else
			{
				$("#newRequestModal").modal();
				getDynamicTemplateName();						
			}
    	}
    }
    	
    $(".RevertStepsRadio").click(function(){
  		alert("The paragraph was clicked.");
	});
		
	$(function() {
		$("#file").on('change', function(e) {
			SignImage=[];
  			var fileNum = this.files.length, initial = 0;
 			$.each(this.files,function(idx,elm){
       			SignImage[finalImages .length]=elm;
			});
			console.log(SignImage);
			$(".custom-image-label").css("display", "none");
			$(".approval_image_preview").css("display", "block");
		});
	})

	$.getJSON("https://api.ipify.org/?format=json", function(e) {
		ActiveSystemIP = e.ip
	});

	$('#CLR-TextSignature').click(function(){
		ClearTextSignature();
	});
	
    $('#CLR-ImageSignature').click(function(){
		ClearImageSignature();
		SignImage=[];
		finalImages = [];
	});
	
	$('#CLR-DrawSignature').click(function(){
		ClearDrawSignature();
	});
		
	$('#Pre-Upload-List-Btn').click(function(){
		PreUploadSignList();
	});

	$("#gettemplatenameid").click(function () {
		$.when(	PageColomnsDisplay()).then(function(datarespo){
			CreateLabesDynamically(datarespo);						
		})					
		apendlogoandtemplate();
	});
				
	$("#savenewrequest").click(function () {
		if(window.location.href.indexOf("?")> -1) 
    	{
    		if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation')
    		{
    			ActiveBtnStatus = 'Submit';
				saverecord();    			
    		}
    		else
    		{
    			var attr = $("#savenewrequest").attr('data-target');
				if (typeof attr !== 'undefined' && attr !== false) 
				{
					if(attr == '#approvalEditModal')
					{
						ActiveBtnStatus = 'Edit Data';
						$('#approvalEditModal').modal('show');  						
					}
					else
					{
						ActiveBtnStatus = 'Reviewed';
						$('#approvalReviewedModal').modal('show');  
					}
				}
				else
				{
					ActiveBtnStatus = 'Submit';
					saverecord();			
				}    			
    		}    			
    	}		
	});
		
		
	$("#RejectRequestSubmit").click(function () {
		ActiveBtnStatus = 'Reject';
		var RemarkText = $("#RejectApproveRemark").val();
			RemarkText = RemarkText.trim();
		if($("#RejectApproveChkBox").prop('checked') == true)
		{
			if(RemarkText.length>0)
			{
				saverecord();
			}
			else
			{
				alert("Enter Rejected Remark Message!");
			}
		}
		else
		{
			alert("Select Rejected Checkbox!");
		}
	});
		
	
	$("#ReviewedRequestSubmit").click(function () {
		ActiveBtnStatus = 'Reviewed';
		var RemarkText = $("#ReviewedApproveRemark").val();
			RemarkText = RemarkText.trim();
		if($("#ReviewedApproveChkBox").prop('checked') == true)
		{
			saverecord();
		}
		else
		{
			alert("Select Reviewed Checkbox!");
		}
	});
		
		
	$("#EditDataRequestSubmit").click(function () {
		ActiveBtnStatus = 'Edit Data';
		var RemarkText = $("#EditDataApproveRemark").val();
			RemarkText = RemarkText.trim();
		if($("#EditDataApproveChkBox").prop('checked') == true)
		{
			saverecord();
		}
		else
		{	
			var ChkText = $("#ChkText").text();
			ChkText = 'Select '+ChkText+' Checkbox!';
			//alert("Select Approved Checkbox!");
			alert(ChkText);
		}
	});

	
	$("#attachmentsupload").on('change', function (e) {
		bindAttachments(this);
	});	

});

// To get selected template details
function apendlogoandtemplate() 
	{
		var templatename = $("input[name='selector']:checked").val();
		GetData("/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=*,TemplateName&$filter=TemplateName eq '" + templatename + "'").done(function (templatename) {

			$("#titleid").empty();
			$("#approvalprocessimgid").empty();
			$("#templatenameid").empty();
			$("#requestfrid").empty();
			if (templatename.d.results.length > 0) 
			{
				$.map(templatename.d.results, function (datre) {
					var fileiconurl = "";
					if (datre.FileIcon != null && datre.FileIcon != undefined && datre.FileIcon != "") 
					{
						fileiconurl += "<img src='" + datre.FileIcon.Url + "' />";
					}
					$("#titleid").append(datre.Title);
					$("#approvalprocessimgid").append(fileiconurl);
					$("#templatenameid").append(datre.TemplateName);
					$("#requestfrid").append(datre.RequestFor);
				})
			}
		});
	}
			
// To get seelcted template columns active scop
	var ActiveInitiationScope='';
	function PageColomnsDisplay() 
	{
		let promi = $.Deferred();
		ActiveInitiationScope='';
		var templatename = $("input[name='selector']:checked").val();
		GetData("/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=*,PageColumn,TemplateName&$filter=TemplateName eq '" + templatename + "'").done(function (templatename) {
			if (templatename.d.results.length > 0) 
			{
				promi.resolve(templatename.d.results[0].PageColumn)
				ActiveInitiationScope = templatename.d.results[0].EditScope;
			}
			else
			{
				promi.resolve("");
			}
		});
		return promi.promise();
	
// To get and append all active templates
var pagenumbers = "";
function getDynamicTemplateName()
{
	$.ajax({
	async: false,
	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=Id,Title,ProcessType,RequestFor,FileIcon,TemplateName,Active&$filter=Active eq '1' and ProcessType eq 'Process' and (Initiation eq 'Anyone' or Initiation eq 'Employee' or (Initiation eq 'Selective' and Initiators/EMail eq '"+_spPageContextInfo.userEmail+"'))",
	type: "GET",
	headers: {
		"accept": "application/json;odata=verbose",
		},
	success: function (data) 
	{
		const items = data.d.results;
		var uniqueOb = {}
		var uniqueArray = items.filter(obj => !uniqueOb[obj.TemplateName] && (uniqueOb[obj.TemplateName] = true));
		var incrementidnum = 0;
			$.each(uniqueArray, function (i, value) {
				incrementidnum++;
				var iconurl = "";
				if (value.FileIcon != null && value.FileIcon != undefined && value.FileIcon != "") 
				{
					iconurl += value.FileIcon['Url'] ? value.FileIcon['Url'] : "";
				}
				if(value.ProcessType == 'Document')
				{
					iconurl += 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/default.png'
				}
				var template = "<div class='col-md-4 col-sm-6 col-xs-12 new-request-panel'>\
									<div class='new-request-panel-card new-process-panel-group'>\
										<div class='panel panel-default radio-container'>\
											<input type='radio' id='new-process-option"+ incrementidnum + "' requestfor='"+value.RequestFor+"' templateid='"+value.Id+"' value='" + value.TemplateName + "' name='selector'>\
											<label for='new-process-option"+ incrementidnum + "'></label>\
												<div class='check'></div>\
												<div class='panel-heading panel-heading-checked'>\
													<h4 class='panel-title'>\
														<a>\
															<div class='new-request-top-left'>\
																<div class='new-request-top-left-img'>\
																	<img src='"+ iconurl + "' alt='process'>\
																</div>\
																<div class='new-request-top-left-text'>\
																	<div class='new-request-top-left-title ellipsis-1 mb10'>"+ value.RequestFor + "</div>\
																	<div class='new-request-top-left-title-pera ellipsis-1'>"+ value.Title + "</div>\
																</div>\
															</div>\
														</a>\
													</h4>\
												</div>\
											</div>\
										</div>\
									</div>";
				if (value.TemplateName) 
				{
					$("#TemplatedBinding1").append(template);
				}
			});
		},
		error: function (error) 
		{
		}
	});
}
// To create dyanmic form as per selected template

var ApproversListForward  = '';
	var FormulaColumnList =[];
	var mleList =[];
	var AutoFilledCols = [];	
	var arrNumVal= [];
	var summarizeValues = [];
	function CreateLabesDynamically(pagenumbers) 
	{
		var templatename = $("input[name='selector']:checked").val();
		var templateID = '';//$("input[name='selector']:checked").attr('templateid')
		if(templatename == null || templatename == '')
		{
			templatename =	window.atob(titanForWork.getQueryStringParameter('RecName'));
		}
		templatename = templatename.trim(); templateID = templateID ;
		templateID =  $("input[name='selector']:checked").attr('templateid')
		arrNumVal = [];mleList=[];AutoFilledCols =[];
		//GetData("/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$select=*,Title,SequenceNo,DefaultValue,ColumnName,ColumnType,Mandatory,DateValidation,NumberValidation,DropdownValues,Active,TemplateID/Id,TemplateID/TemplateName,Author/Title,Author/Id&$expand=TemplateID,Author&$filter= TemplateID/Title eq '" + templatename + "' &$orderby= SequenceNo asc").done(function (plantsdata) {
		GetData("/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$select=*,Title,SequenceNo,DefaultValue,ColumnName,ColumnType,Mandatory,DateValidation,NumberValidation,DropdownValues,Active,TemplateID/Id,TemplateID/TemplateName,Author/Title,Author/Id&$expand=TemplateID,Author&$filter= TemplateID/ID eq '" + templateID + "' &$orderby= SequenceNo asc").done(function (plantsdata) 
		{
			$("#appenddyamicboxes").empty();
			$('#Docfilename').empty();			
			
			resultCol = plantsdata.d.results;
			CurrTenplateID = resultCol[0].TemplateID.Id;
			var QueryResult = [];
			var QueryDataRetResult =[];
			var QueryDataQueueResult  = [];
			var Passingtoken='';			
			if(window.location.href.indexOf("?")> -1) 
    		{
    			Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
				if(Passingtoken == 'Initiation')
				{
					var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepType eq 'Initiation'";
    				QueryResult = RequestGetdata(Query);
    				
    				$("#new-request-top-right-change-Display").css("display", "block");
    				$("#Rejectrequest").css("display", "none");
					$("#Approverequest").css("display", "none");
					$('#Forwardrequest').css("display", "none");
					$('#Revertrequest').css("display", "none");
					$("#savenewrequest").text('Submit');
					$('#savenewrequest').removeAttr("data-target");
				}
				else if(Passingtoken == 'Process Steps')
				{
					var ActionType = window.atob(titanForWork.getQueryStringParameter('ActionType'));
					
					var CurrStepId = window.atob(titanForWork.getQueryStringParameter('StepID'));
					var QueryDataStep =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=StepID&$filter=RequestID eq "+window.atob(titanForWork.getQueryStringParameter('RecNo'))+" and ID eq "+CurrStepId+"&$orderby=Sequence_No asc";
					var QueryStepIdData = RequestGetdata(QueryDataStep);  						
					
					if(QueryStepIdData[0].StepID == 'Initiation' || QueryStepIdData[0].StepID == '')
					{
						var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepType eq 'Initiation'" ;
	    				QueryResult = RequestGetdata(Query);
	    				if(ActionType == 'Forward-Review-Action')
						{
							$("#ForwardTextDiv").css("display","inline-block");
							$("#new-request-top-right-change-Display").css("display", "block");
							$(".new-request-top-right-change").css("display", "none");
							$(".new-request-top-right").css("display", "none");
							
							$("#Forward-Review-Btn").css("display","inline-block");
							$("#Approverequest").css("display", "none");
							$("#savenewrequest").css("display", "none");
							$("#Rejectrequest").css("display", "none");
							$('#Forwardrequest').css("display", "none");
							$('#Revertrequest').css("display", "none");
							
						}
						else
						{
	    					$("#new-request-top-right-change-Display").css("display", "none");
	    					$("#Rejectrequest").css("display", "none");
							$("#Approverequest").css("display", "none");
							$('#Forwardrequest').css("display", "none");
							$('#Revertrequest').css("display", "none");
							$("#savenewrequest").text('Submit');
							$('#savenewrequest').removeAttr("data-target");
						}
					}
					else
					{					
						var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepID/ID eq '"+QueryStepIdData[0].StepID+"' and StepType eq 'Process Steps'" ;
						QueryResult = RequestGetdata(Query);
					} 
					if(ActionType == 'Forward-Review-Action')
					{
						$("#ForwardTextDiv").css("display","inline-block");
						$("#new-request-top-right-change-Display").css("display", "block");
						$(".new-request-top-right-change").css("display", "none");
						$(".new-request-top-right").css("display", "none");
						
						$("#Forward-Review-Btn").css("display","inline-block")
						$("#Approverequest").css("display", "none");
						$("#savenewrequest").css("display", "none");
						$("#Rejectrequest").css("display", "none");
						$('#Forwardrequest').css("display", "none");
						$('#Revertrequest').css("display", "none");
					}
					else
					{
						$("#new-request-top-right-change-Display").css("display", "none");
					}
  						
					var QueryDataRet =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$select=*,RequestBy/Id,RequestBy/Title,ColumnPeople1/Id,ColumnPeople1/Title,ColumnPeople2/Id,ColumnPeople2/Title,ColumnPeople3/Id,ColumnPeople3/Title,ColumnPeople4/Id,ColumnPeople4/Title,ColumnPeople5/Id,ColumnPeople5/Title,AttachmentFiles&$expand=RequestBy,ColumnPeople1,ColumnPeople2,ColumnPeople3,ColumnPeople4,ColumnPeople5,AttachmentFiles&$filter=ID eq "+window.atob(titanForWork.getQueryStringParameter('RecNo'))+"";
						QueryDataRetResult = RequestGetdata(QueryDataRet );
   						//console.log(QueryDataRetResult[0].AttachmentFiles.results); 
   						/*	var restendpoint = "/_api/web/lists/getbytitle('ApprovalProcessListTable')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=RequestID eq '"+ItemId+"'&$orderby=ID asc";
    					var QueryTableData = RequestData(restendpoint );	*/
		
					var QueryDataStep =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,Status, Approvers/Title,Approvers/EMail,Approvers/ID,ActionTakenby/Title, ActionTakenby/Id, Modified, AttachmentFiles&$expand=Approvers,AttachmentFiles,ActionTakenby&$filter=RequestID eq "+window.atob(titanForWork.getQueryStringParameter('RecNo'))+"&$orderby=Sequence_No asc";
						QueryDataQueueResult = RequestGetdata(QueryDataStep);  						
   					
   					if(QueryDataQueueResult.length>0)
   					{
   						var ActiveQueeApproversList = $.grep(QueryDataQueueResult, function(v) {
							return v.StepName == window.atob(titanForWork.getQueryStringParameter('StepNo')) || v.Status == "Pending" && v.Status == "Rejected"  
						});
						
						ApproversListForward  = ActiveQueeApproversList[0].ApproversId.results;
						var ApproversDesign='';
						

						for(var i=0; i<ActiveQueeApproversList[0].Approvers.results.length; i++)
    					{    			
    						var ApproversImg=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +ActiveQueeApproversList[0].Approvers.results[i].EMail;
    						ApproversDesign = ApproversDesign +	"<div class='col-md-6 col-sm-6'>"+
                            										"<div class='members-card border-0'>"+
							                            				"<div class='members-card-head'>"+
                                    										"<img src='"+ApproversImg+"'>"+
                                										"</div>"+
                                										"<div class='members-card-body'>"+
                                    										"<div class='members-card-body-info text-ellipsis'>"+
                                        										"<h3 class='member-name text-ellipsis'>"+ActiveQueeApproversList[0].Approvers.results[i].Title+"</h3>"+
                                        										"<p class='member-email text-ellipsis mb0'>"+ActiveQueeApproversList[0].Approvers.results[i].EMail+"</p>"+
                                    										"</div>"+
                                    										"<a class='btn remove-group-btn remove-btn close close-round' onclick='removeUserBox(this, \"" + ActiveQueeApproversList[0].Approvers.results[i].EMail + "\", \"" + ActiveQueeApproversList[0].Approvers.results[i].Title + "\", " + ActiveQueeApproversList[0].Approvers.results[i].ID + ")'><i class='fa fa-times'></i></a>"+
                                										"</div>"+
                            										"</div>"+
                        										"</div>";
		    			}
		    			$("#UsersListForward").empty().append(ApproversDesign);   					
					}
					
	
    				//$("#new-request-top-right-change-Display").css("display", "none");
    				$("#Approverequest").css("display", "none");
    				
					if(QueryDataRetResult[0].ActionRequired == 'Review Only')
					{
						$("#savenewrequest").text('Review');
						//$("#savenewrequest").attr("data-toggle", "modal");
						$("#savenewrequest").attr("data-target", "#approvalReviewedModal");

						$("#Rejectrequest").css("display", "none");
						$('#Forwardrequest').css("display", "none");
						$('#Revertrequest').css("display", "none");
					}
					else if(QueryDataRetResult[0].ActionRequired == 'Edit & Sign')
					{
						if(ActionType == 'Forward-Review-Action')
						{	
							$("#ForwardTextDiv").css("display","inline-block");
							$("#new-request-top-right-change-Display").css("display", "block");						
							$("#Approverequest").css("display", "none");
							$("#savenewrequest").css("display", "none");
							$(".new-request-top-right-change").css("display", "none");
							$(".new-request-top-right").css("display", "none");
							
						}
						else
						{
							$("#Approverequest").css("display", "inline-block");
							$("#savenewrequest").css("display", "none");
						}
					}
					else if(QueryDataRetResult[0].ActionRequired == 'Edit Data')
					{
						if(QueryStepIdData[0].StepID == 'Initiation' || QueryStepIdData[0].StepID == '')
						{
							$("#savenewrequest").text('Re-Submit');
							$("#ModelIDText").text('Re Submit');
							$("#ChkText").text('Re-Submit');
						}
						else
						{
							$("#savenewrequest").text('Approve');
							$("#ModelIDText").text('Approve');
							$("#ChkText").text('Approved');

						}
						
						$("#savenewrequest").attr("data-target", "#approvalEditModal");				
					}
					else
					{
						$("#savenewrequest").text('Approve');
						//$("#savenewrequest").css('position' , 'absolute');$("#savenewrequest").css('left', '427px');	
						$("#Rejectrequest").css("display", "inline-block");
					}
    			}
				else
				{
					alert("Unauthorized access!");
        		    window.location.href = _spPageContextInfo.webAbsoluteUrl;
				}
    		}
    		else
    		{
    			alert("Unauthorized access!");
    	    	window.location.href = _spPageContextInfo.webAbsoluteUrl;
    		}
			
    		if (plantsdata.d.results.length > 0) 
    		{
				$.map(plantsdata.d.results, function (datarepeter) {
					var FilteredRec = $.grep(QueryResult, function(v) {
    					return v.ColumnIDId == datarepeter.Id;
					});
					
					var PermissionStatus='';
					if(ActiveInitiationScope == 'Full-Form' || ActiveInitiationScope == 'Full Form'  && window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation')
					{
						PermissionStatus='';
					}
					else
					{				
						if(FilteredRec.length==0)
						{
							if(datarepeter.ColumnType == 'Currency')
							{
								PermissionStatus = 'disabled="disabled"';
							}
							else if(datarepeter.ColumnType == 'Yes/No')
							{
								PermissionStatus = 'disabled="disabled"';
							}
							else
							{
								PermissionStatus='disabled="disabled"';
							}							
						}
						else
						{
							PermissionStatus='';
						}
					}
					
					var dynamictempalte = "";
					var valuefordefault = "";
					var valueinMulti = "";
							
					if (datarepeter.DefaultValue != null && datarepeter.DefaultValue != undefined && datarepeter.DefaultValue != "") {
						valuefordefault += datarepeter.DefaultValue ? datarepeter.DefaultValue : "";
						AutoFilledCols.push({'ColName' : datarepeter.ColumnName , 'ColValue' : valuefordefault });
					}							
					
					if (datarepeter.FixedText != null && datarepeter.FixedText != undefined && datarepeter.FixedText != "") {
						valueinMulti += datarepeter.FixedText ? datarepeter.FixedText : "";
						
							}
							var datatypeval = "",classsetnew = "" ;
							if (datarepeter.ColumnType != null && datarepeter.ColumnType != undefined && datarepeter.ColumnType != "") {
								if (datarepeter.ColumnType == "Number") {
									//datatypeval += "onkeypress=' return isNumber(event)'";
									arrNumVal.push({'title':datarepeter.Title, 'col': datarepeter.ColumnName, 'min': datarepeter.MinNumber,'max': datarepeter.MaxNumber});
									if(datarepeter.CalculatedValue == true)
									{
										
								   		if(datarepeter.ColumnName == 'CalculatedValue'){
								   		var IsCalculate = true;
								   		var Formula = datarepeter.Formula;
								   		classsetnew = 
								   		//datatypeval += 'onfocusin="return CalculateDynamicValue(this, \''+datarepeter.ColumnName+'\',\''+Formula+'\');"'
								   		FormulaColumnList.push({'Formula':datarepeter.Formula,'ColumnName':datarepeter.ColumnName,'Rel':datarepeter.Title});
								   		datatypeval += 'disabled = disabled';
								   	}								   			
								   		datatypeval += 'onkeyup ="SetCalculateValue();"'
								   										   		
								   	}
								   	if(datarepeter.SummarizedValue == true){
								   		datatypeval += 'onkeyup ="SetSummarizedValue();"'
								   	}
								   	var setnumberlimit = "";
									if(datarepeter.NumberValidation != null && datarepeter.NumberValidation != undefined && datarepeter.NumberValidation != ""){
		                            
										if(datarepeter.NumberValidation == "Integer"){
											datatypeval += "onkeypress='return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 || event.charCode == 45) ? null : event.charCode >= 48 && event.charCode <= 57 '";//"onkeypress=' return isNumber(event)'";	//'onkeyup return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"'
											setnumberlimit +="maxlength='15'";											

										}else if(datarepeter.NumberValidation == "Decimal"){											
											setnumberlimit +="maxlength='15'";
											datatypeval += 'onkeydown = "isDecimal(event)";  onkeypress="isValidate(this)"'; 										
										}								
									}
								}
							}
							var datetypevalstop = "";
							if (datarepeter.ColumnType != null && datarepeter.ColumnType != undefined && datarepeter.ColumnType != "") {
								if (datarepeter.ColumnType == "Date" || datarepeter.ColumnType == "DueDate") {
									datetypevalstop += "stopenterdata"; 
								}
							}
							
							if(window.location.href.indexOf("?")> -1) 
    						{
    							var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
								if(Passingtoken == 'Process Steps')
								{
									//QueryDataRetResult
									var ColumnValue = '';
    								ColumnValue = ColumnValueByColumnName(QueryDataRetResult,datarepeter.ColumnName)
    								
    								if(ColumnValue ==  null)
    								{
    									valuefordefault = '';
    								}
    								else
    								{	    																	
    									valuefordefault = ColumnValue;
    									
									}
								}
							}
						
							var datalimitset = ""; urltext = "";
							if (datarepeter.ColumnType != null && datarepeter.ColumnType != undefined && datarepeter.ColumnType != "") {
								if (datarepeter.ColumnType == "Text") {
									if(datarepeter.TextValidation == 'Link' ){
										//datalimitset += "maxlength='250'";
										urltext += 'onkeyup = "return replaceURLWithHTMLLinks(this.value)"'
									}else if(datarepeter.TextValidation == '' || datarepeter.TextValidation == null  ){
										datalimitset += "maxlength='250'"; 
									}else{										
										datalimitset += "maxlength='"+datarepeter.TextValidation+"'"; 
									}
								}
							}
							var serialNum = 0;
							var NewSerail= '';							
							
                             var templatehelptext= "", saveclassset = ""; headerstyle = ""; classset = ""; classRich = "";
							 if(datarepeter.ColumnType == "FixedText" || datarepeter.ColumnType == "Multiline"){
								 if(datarepeter.ColumnType == "FixedText"){
								 	saveclassset += "dynamicdatatexboxes2 ";
								 	if(datarepeter.Width == 'Column Width'){
								 		saveclassset += "col-md-4";
								 	}else{
								 	saveclassset +=	"full";
								 	}									
									//templatehelptext += "<textarea "+PermissionStatus+" class='dynamicvalfeachcls2 form-control' readonly value='" + valueinMulti + "' rows='5' id='" + datarepeter.ColumnName + "'>"+valueinMulti+"</textarea>";\
									templatehelptext += "<div "+PermissionStatus+" class='dynamicvalfeachcls2' readonly value='" + valueinMulti + "' id='" + datarepeter.ColumnName + "'>"+valueinMulti+"</div>";
								 }else{
								 	saveclassset += " dynamicdatatexboxes ";
								 	if(datarepeter.Width == 'Column Width'){
								 		if(pagenumbers == 2){
								 			saveclassset += "col-md-6";
								 		}else{
								 			saveclassset += "col-md-4";
								 		}								 		
								 	}else if(datarepeter.Width == 'Page Width'){
								 	//	saveclassset += "col-md-12";
								 		saveclassset +=	"full";
								 		$(".full").removeClass("col-md-4")
										$(".full").removeClass("col-md-6")
								 	}
								 	if(PermissionStatus == '')	{
										classset += 'active';
										classRich += 'content_'+datarepeter.ColumnName;
										mleList.push({'col':datarepeter.ColumnName, 'data' : valuefordefault});
										//$('.richText-editor').html(valuefordefault )
										//templatehelptext += "<textarea "+PermissionStatus+" class='dynamicvalfeachcls form-control "+ classRich +" "+ classset +"' value='" + valuefordefault + "' rows='5' style='max-height : 100px' id='" + datarepeter.ColumnName + "' coltype ='"+datarepeter.ColumnType+"'></textarea>";
										templatehelptext += "<div class='dynamicvalfeachcls  form-control "+ classRich +" "+ classset +"' "+PermissionStatus+" style='height:100% !important;min-height : 100px' id='" + datarepeter.ColumnName + "' coltype ='"+datarepeter.ColumnType+"' ></div>";
									}else{
										templatehelptext += "<div class='dynamicvalfeachcls  form-control' "+PermissionStatus+" style='height:100% !important;min-height : 100px'>"+valuefordefault +"</div>";
									}																		
									//if(valuefordefault != '' ){ $('.richText-editor').val(valuefordefault )}								
								 } 							 
								
			                }else if(datarepeter.ColumnType == "Header"){
								saveclassset += "full";
								var colorset = "colorsetdyn";
								headerstyle += "margin-top:25px"
								templatehelptext += "<hr>";
							}else if(datarepeter.ColumnType == "QR Code" || datarepeter.ColumnType == "Web Link"){
								console.log(datarepeter.ColumnType);
								templatehelptext  += "";	
							}
							else if(datarepeter.ColumnType == "Checkbox"){								
								console.log(datarepeter.ColumnType);
								if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
									var value = '';
								}else{
									var value = 'checked' ;
								}
								if(PermissionStatus == '')	{
									classset += 'active';
								}
								var prefix = datarepeter.Prefix ? datarepeter.Prefix : '';
								var suffix = datarepeter.Suffix ? datarepeter.Suffix : '';
								if(datarepeter.Width == 'Switch'){
									saveclassset += "dynamicdatatexboxes";
									templatehelptext  += '<div class="combine_box_adds"><span class="">'+prefix+'</span><label class="switchtoggling"><input type="checkbox" '+PermissionStatus+' coltype ="'+datarepeter.ColumnType+'" class="dynamicvalfeachcls checkbox_widthmange '+ classset +'" value="" data-original-value="'+datarepeter.ColumnName+'"  id="'+datarepeter.ColumnName+'" '+value+'> <span class="clickmange"></span></label><span class="">'+suffix+'</span></div>';
								}else{
									saveclassset += "dynamicdatatexboxes";
									templatehelptext  += '<div class="combine_box_adds"><span class="">'+prefix+'</span><input type="checkbox" '+PermissionStatus+' coltype ="'+datarepeter.ColumnType+'" class="dynamicvalfeachcls inline_default_checkbox '+ classset +'" value="" data-original-value="'+datarepeter.ColumnName+'"  id="'+datarepeter.ColumnName+'" '+value+'></div>'; 
								}
	
							}
							else if(datarepeter.ColumnType == "Serial Number" ){
								var QueryDataRet =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$filter=TemplateID eq "+CurrTenplateID+"";
								//var QueryDataRet =  _spPageContextInfo.webAbsoluteUrl +	"/_api/Web/Lists/getByTitle('ApprovalProcessList')?$select=ItemCount,Items&$expand=Items&$filter=TemplateID eq "+CurrTenplateID+""								
								QueryDataRetResultSR = RequestGetdata(QueryDataRet );		console.log(QueryDataRetResultSR);
								serialNum = QueryDataRetResultSR.length +datarepeter.SerialStartFrom+1;
								var prefix = datarepeter.Prefix ? datarepeter.Prefix : "";
								var sufix =  datarepeter.Suffix ? datarepeter.Suffix : "";
								NewSerail = prefix  +serialNum+ sufix ;
								saveclassset += "dynamicdatatexboxes";
								classset += 'active';
								if(valuefordefault != ''){
									NewSerail  = valuefordefault;
									
								}
								AutoFilledCols.push({'ColName' : datarepeter.ColumnName , 'ColValue' : NewSerail  });
								templatehelptext += "<input type='text' "+PermissionStatus+"  coltype ='"+datarepeter.ColumnType+"' class='dynamicvalfeachcls form-control "+ datetypevalstop + " " + classset +"' " + datatypeval + " value='" + NewSerail + "' id='" + datarepeter.ColumnName + "' />";
							}						
							else{
								saveclassset += "dynamicdatatexboxes";
								classset += datarepeter.ColumnName 
								if(PermissionStatus == '')	{
										if(datarepeter.ColumnName  != 'CalculatedValue' && datarepeter.ColumnName  != 'SummarizedValue' ){
											classset += ' active';	
										}
								}
								var coltitle = ''; 
								if(datarepeter.ColumnName == 'CalculatedValue'){
									let t = datarepeter.Title; t=t.replaceAll(' ','')
									t=t.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
									coltitle = '_'+t;
								}else if(datarepeter.ColumnName == 'SummarizedValue'){
									let t = datarepeter.TableIName; 
									let d = datarepeter.TableColumnName;
									let f = datarepeter.Formula;	
									summarizeValues.push({'tblId' : t,'col' : d, 'formula' : f});
									coltitle = '_'+t+'_'+d;
									var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
									datatypeval += 'onkeyup ="SetSummarizedValue(\''+t+'\',\''+d+'\');"' 									
									if(Passingtoken == 'Process Steps')
									{	
										valuefordefault  = $('#ttlval_'+t+'_'+d).text();
									}																
								}
								templatehelptext += "<input type='text' "+PermissionStatus+"  coltype ='"+datarepeter.ColumnType+"'  class='dynamicvalfeachcls	" + classset +" form-control "+ datetypevalstop + "' " + datatypeval + " value='" + valuefordefault + "' id='" + datarepeter.ColumnName + coltitle +"' "+datalimitset +" "+setnumberlimit+" "+urltext+"  />";
							}
							if(datarepeter.ColumnType == "Table"){
                              appenedtableformat(datarepeter.ID,CurrTenplateID,PermissionStatus );
							}
							else{
							
							if (pagenumbers == 1) {
								if (datarepeter.Mandatory) {
									dynamictempalte = "<div class='col-md-12 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
													<div class='form-group custom-form-group' style='"+headerstyle+"'>\
														<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='true' alerttext='" + datarepeter.Title + "'>" + datarepeter.Title + " : <span style='color:red'>*</style></label>\
														"+templatehelptext+"\
													</div>\
												</div>";

								} else {
									 if(datarepeter.ColumnType == "QR Code" || datarepeter.ColumnType == "Web Link"){
											dynamictempalte = "";
										} else{
														dynamictempalte = "<div class='col-md-12 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
															<div class='form-group custom-form-group' style='"+headerstyle+"'>\
																<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='false' alerttext=''>" + datarepeter.Title + " :</label>\
																"+templatehelptext+"\
															</div>\
														</div>";
										}
								}
							}
							else if (pagenumbers == 2) {
								if (datarepeter.Mandatory) {
									dynamictempalte = "<div class='col-md-6 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
													<div class='form-group custom-form-group' style='"+headerstyle+"'>\
														<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='true' alerttext='" + datarepeter.Title + "'>" + datarepeter.Title + " : <span style='color:red'>*</style></label>\
															"+templatehelptext+"\
													</div>\
												</div>";
								} else {
										if(datarepeter.ColumnType == "QR Code" || datarepeter.ColumnType == "Web Link"){
											dynamictempalte = "";
										} else{
												dynamictempalte = "<div class='col-md-6 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
														<div class='form-group custom-form-group' style='"+headerstyle+"'>\
															<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='false' alerttext=''>" + datarepeter.Title + " :</label>\
															"+templatehelptext+"\
														</div>\
													</div>";
										}
								}
							}
							else if (pagenumbers == 3) {
								if (datarepeter.Mandatory) {
									dynamictempalte = "<div class='col-md-4 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
													<div class='form-group custom-form-group' style='"+headerstyle+"'>\
														<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='true' alerttext='" + datarepeter.Title + "'>" + datarepeter.Title + " : <span style='color:red'>*</style></label>\
															"+templatehelptext+"\
													</div>\
												</div>";
								} else {
									if(datarepeter.ColumnType == "QR Code" || datarepeter.ColumnType == "Web Link"){
											dynamictempalte = "";
										} else{
															dynamictempalte = "<div class='col-md-4 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
															<div class='form-group custom-form-group' style='"+headerstyle+"'>\
																<label class='columnnametxt "+colorset+" "+ classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='false' alerttext=''>" + datarepeter.Title + " :</label>\
																"+templatehelptext+"\
															</div>\
														</div>";
									}
								}
							}
							else {
								if (datarepeter.Mandatory) {
									dynamictempalte = "<div class='col-md-4 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
													<div class='form-group custom-form-group' style='"+headerstyle+"'>\
														<label class='columnnametxt "+colorset+" "+classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='true' alerttext='" + datarepeter.Title + "'>" + datarepeter.Title + " : <span style='color:red'>*</style></label>\
															"+templatehelptext+"\
													</div>\
												</div>";
								} else {
									if(datarepeter.ColumnType == "QR Code" || datarepeter.ColumnType == "Web Link"){
											dynamictempalte = "";
										} else{
														dynamictempalte = "<div class='col-md-4 col-sm-6 col-xs-12 "+saveclassset+" "+classset +"'>\
															<div class='form-group custom-form-group' style='"+headerstyle+"'>\
																<label class='columnnametxt "+colorset+" "+classset +"' value='" + datarepeter.ColumnName + "' mandatorycol='false' alerttext=''>" + datarepeter.Title + " :</label>\
																"+templatehelptext+"\
															</div>\
														</div>";
									}
								}
							}
						}
							
							$("#appenddyamicboxes").append(dynamictempalte);
							
							console.log(valuefordefault);
							console.log(datarepeter.ColumnName);
							$(".full").addClass("col-md-12")
							// remove a class
							$(".full").removeClass("col-md-4")
							$(".full").removeClass("col-md-6")
							selectddrval(datarepeter.ColumnName, valuefordefault);
						})
						$('.stopenterdata').keydown(function (e) {
							e.preventDefault();
							return false;
						});
						SetCalculateValue();
						SetDatpickerNdropDown(resultCol,'','','',QueryDataRetResult);						
					}					
					if(personCols.length > 0){
					setTimeout(removeCancel,5000);	
					}
					getTempID(CurrTenplateID);
					
					if(QueryDataRetResult.length >0){
					var attchments = QueryDataRetResult[0].AttachmentFiles.results;					
					var Tcounter = 0;
					var bindfile = '';
					if(attchments != null){
					for (var initial = 0; initial < attchments.length; initial++) {
					
						bindfile += '<div class="approve-process-upload-data-chip upload-chip" id="Ifile_' + Tcounter + '">';
						bindfile += '<i class="fa fa-paperclip color-sky-blue" aria-hidden="true"></i>';
						bindfile += '<span class="px-2 font-14 upload-chip-title" title=' + attchments[initial].FileName + '>' + attchments[initial].FileName  + '</span>';
					//	bindfile += '<i class="fa fa-times-circle-o text-danger" onclick="RemoveDocument(this.id);" id="Ifile_' + Tcounter + '""></i></div>';
						bindfile += '<span class="chip-icon-box"> <a href="javascript:void(0);" download="attchments[initial].FileName" name="'+attchments[initial].FileName+'" onclick="downloadAttach(\'' + attchments[initial].ServerRelativeUrl+ '\', \'' + attchments[initial].FileName+ '\')"style="color:#333;"><i class="fa fa-download cursor-pointer" aria-hidden="true"></i></a></span>';
						bindfile += '</div>';	
						Tcounter = Tcounter + 1;
					}
					$('#Docfilename').append(bindfile);
					}
				}
				
				if(QueryDataQueueResult.length > 0){
				/*	var FilteredRec2 = $.grep(QueryDataQueueResult , function(v) {
							return v.StepName == window.atob(titanForWork.getQueryStringParameter('StepNo'))
					}); console.log(FilteredRec2); */
					$('.mainlst').empty();
					var bindfile2 = '';
					var arrSubApprover = AllTaskUsersEmployeeuser.filter(function (filterData) {
					     return filterData.UserId == QueryDataRetResult[0].RequestById;
					 });
					bindfile2 += '<li>'
		            bindfile2 += '<span class="iconbox"> <img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/NewEntryAssets/images/time-icon-1.png" alt=""> </span>'
					bindfile2 += '<div class="approvelheadeing">  <h3 class="mainheading">Approval Initiation</h3>  <span class="date-sec">'+moment(QueryDataRetResult[0].Created).format('lll')+'</span> </div>'
		            bindfile2 += '<p class="waitsec initialize">Initialized</p>'	
					bindfile2 += '<div class="row">'
					var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrSubApprover[0].EMail);
		            bindfile2 += '<div class="col-sm-6 flexitem">  <div class="imgsetion"> <img src="'+Authorattachment+'" alt=""> </div>'
		            bindfile2 += '<div class="imagecontent"> <h4>'+arrSubApprover[0].LoginName+'</h4> <a href="#">'+arrSubApprover[0].EMail+'</a> </div></div>'
		
		          /*	<div class="col-sm-6"> <h3 style="font-size: 12px; margin-bottom:5px; padding:-left:3px; color:#333">
		                   Attachment files:
		                  </h3>
		                   <div class="signbox">
		                    <div class="upload-chip">
		                      <span class="pr-8 chip-text-box" style="color:#333; cursor:pointer;" title="">Example chart1.pdf</span>
		                      <span class="chip-icon-box">
		                        <a href="" download="" style="color:#333;"><i class="fa fa-download cursor-pointer" aria-hidden="true"></i> </a>
		                      </span>
		                    </div>
		                  </div>
		                </div> */
		           bindfile2 +=  '</div><!--row ed-->  </li>'

					
					
				 for(var q =0;q<QueryDataQueueResult.length;q++){
					var attchments = QueryDataQueueResult[q].AttachmentFiles.results;
					var Tcounter = 0;					
					
					if(QueryDataQueueResult[q].StepName == window.atob(titanForWork.getQueryStringParameter('StepNo'))){
						break;
					}else{
					bindfile2 +=  	'<li>'
			     	bindfile2 +=    '<span class="iconbox"> <img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/NewEntryAssets/images/time-icon-4.png" alt="" data-themekey="#"> </span>' 		
			        bindfile2 +=    '<div class="approvelheadeing"> <h3 class="mainheading">'+QueryDataQueueResult[q].StepName+'</h3> <span class="date-sec">'+moment(QueryDataQueueResult[q].Modified).format('lll')+'</span> </div>'
			        bindfile2 +=    '<p class="waitsec initialize">'+QueryDataQueueResult[q].Status+'</p>'
					
					var arrApprover = AllTaskUsersEmployeeuser.filter(function (filterData) {
					     return filterData.UserId == QueryDataQueueResult[q].ActionTakenby.Id;
					});
					
					
					if(arrApprover.length>0)
					{
			        	bindfile2 +=    '<div class="row"><div class="col-sm-6 flexitem">'
			        	var UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrApprover[0].EMail);
			     		bindfile2 +=    '<div class="imgsetion"><img src="'+UserImage +'" alt="" data-themekey="#"></div>'
			        	bindfile2 +=    '<div class="imagecontent"><h4>'+QueryDataQueueResult[q].ActionTakenby.Title+'</h4><a href="#">'+arrApprover[0].EMail+'</a></div></div>'
			        	bindfile2 +=    '<div class="col-sm-6 flx_verticalsbox"> <h3 style="font-size: 12px; margin-bottom:5px; padding:-left:3px; color:#333"> </h3>'
						bindfile2 +=  	'<div class="signbox">'
					}
					for (var initial2 = 0; initial2 < attchments.length; initial2++) {
					/*  bindfile += '<div class="upload-chip" id="Ifile_' + Tcounter + '">';
						bindfile += '<span class="d-flex align-items-center upload-chip-title">';
						bindfile += '<i class="fa fa-paperclip color-sky-blue" aria-hidden="true"></i>';
						bindfile += '<span class="px-2 font-14 upload-chip-title" title=' + RemoveDuplicate[initial] + '>' + RemoveDuplicate[initial] + '</span></span>';
						bindfile += '<button type="button" onclick="RemoveDocument(this.id);" id="Ifile_' + Tcounter + '"" class="btn p-0 upload-chip-delete-btn"><i class="fa fa-times-circle-o text-danger"></i></button></div>';
						//$('#Docfilename').append('<div id="Ifile_' + Tcounter2 + '"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + Tcounter2 + '</strong></span> ' + RemoveDuplicate2[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="RemoveDocument(this.id);" id="Ifile_' + Tcounter2 + '"" title="remove"></span></div>');
					 */					
			        
			        if(QueryDataQueueResult[q].SignType != 'SignImage')
			        {
			        	bindfile2 +=  '<div class="upload-chip" id="Ifile_' + Tcounter + '">'
			        	bindfile2 +=  '<span class="pr-8 chip-text-box" style="color:#333; cursor:pointer;" title="'+attchments[initial2].FileName+'">'+attchments[initial2].FileName+'</span>'
			        	bindfile2 +=  '<span class="chip-icon-box"> <a href="" download="'+attchments[initial2].FileName+'" style="color:#333;" ><i class="fa fa-download cursor-pointer" aria-hidden="true"></i></a></span></div>'			        
			        }
				 				  
				/*	bindfile2 += '<div class="approve-process-upload-data-chip upload-chip" id="Ifile_' + Tcounter + '">';
					bindfile2 += '<i class="fa fa-paperclip color-sky-blue" aria-hidden="true"></i>';
					bindfile2 += '<span class="px-2 font-14 upload-chip-title" title=' + attchments[initial2].FileName + '>' + attchments[initial2].FileName  + '</span>';
				//	bindfile2 += '<i class="fa fa-times-circle-o text-danger" onclick="RemoveDocument(this.id);" id="Ifile_' + Tcounter + '""></i></div>';
					bindfile2 += '</div>';  */
					Tcounter = Tcounter + 1;
					}					
					if(QueryDataQueueResult[q].SignType == 'SignText')//SignDraw
    				{	if(QueryDataQueueResult[q].DrawSign == null){QueryDataQueueResult[q].DrawSign = ''}
    				bindfile2 +=
							//	"<div class='process-approve-signature-box'>"+                                    	        							
    								"<span id='SignatureText' class='signature-front'>"+QueryDataQueueResult[q].DrawSign+"</span>"            	                   	        							
    						//	"</div>";
        						 					
					}
					else if(QueryDataQueueResult[q].SignType == 'SignDraw')
					{	if(QueryDataQueueResult[q].DrawSign == null){QueryDataQueueResult[q].DrawSign = ''}
						bindfile2 +=	
								//	"<div class='process-approve-signature-box'>"+
	    								"<img class='process-approve-signature-img' src='"+QueryDataQueueResult[q].DrawSign+"' alt='signature'>"                                  	        							            	               	        								
	   							//	"</div>";	            	               									   					
					}
					else if(QueryDataQueueResult[q].SignType == 'SignImage')
					{
						var SignUrl='';
						if(QueryDataQueueResult[q].DrawSign != null)
						{
							SignUrl = QueryDataQueueResult[q].DrawSign;
						}
						else if(QueryDataQueueResult[q].AttachmentFiles.results.length>0)
						{
							SignUrl = QueryDataQueueResult[q].AttachmentFiles.results[0].ServerRelativeUrl;
						}    						
						bindfile2 +=	
									//"<div class='process-approve-signature-box'>"+
	               	        				"<img class='process-approve-signature-img' src='"+SignUrl+"' alt='signature'>"                                   	        							               	        				
	           	    				//	"</div>";                        								
					}			
					
				//	bindfile2 += '<span id="SignatureText" class="signature-front"><img src="'+QueryDataQueueResult[q].DrawSign+'" alt="">'+QueryDataQueueResult[q].DrawSign+'</span>';
					var remarks = QueryDataQueueResult[q].Remarks;
					if(remarks != null || remarks == ''){ 
					bindfile2 += '</div><div class="imagecontent"><h4>Remarks:</h4><p class="Purposetext">'+remarks+'</p></div>'
					}
					bindfile2 += '</div><!--row ed--></li>';
					}				
				  }				
				  $('.mainlst').append(bindfile2);
				  $('.history_listbx').show();	
				}					
				});
				if(mleList.length > 0){
					for(m= 0;m<mleList.length;m++){
					    $('.content_'+mleList[m].col+'.active').richText();					    
					    $('a[title="Add image"]').hide();
					    $('a[title="Add file"]').hide();
					    $('a[title="Add video"]').hide();
					    $('a[title="Add URL"]').hide();
					    $('a[title="Add table"]').hide();
					    $('a[title="Show HTML code"]').hide();
					    $('a[title="Remove styles"]').hide();
					    $('.richText-help').hide();					    
					   	$('.richText-toolbar').hide();
					}					
				}
				
}


var ischeckk = false;
function saverecord() 
{
	var requiredfileds = [];
	var nonrequiredfileds =[];
	var datacreate = "";
	var intarr = $("input[name='selector']:checked").attr('templateid');
	var nu = parseInt(intarr);
	var requestforstring = $("input[name='selector']:checked").attr('requestfor'); 
	var requestTile = $('#titleid').text();
	var itemProperties = {};
		itemProperties['RequestFor'] = requestforstring;
		itemProperties['Title'] = requestTile;
		itemProperties['TemplateIDId'] = nu;
	ischeckk = false;
	$("#appenddyamicboxes > .dynamicdatatexboxes.active").each(function () {
	var key = $(this).find(".columnnametxt.active").attr("value");
	//itemProperties[key] = $(this).find(".dynamicvalfeachcls").val();
	var vval = '';
	if(key  == 'Checkbox1' || key  == 'Checkbox2' || key  == 'Checkbox3' || key  == 'Checkbox4'|| key  == 'Checkbox5'){
	 	vval = $(this).find(".combine_box_adds .dynamicvalfeachcls.active").prop('checked')
	}else{
		vval = $(this).find(".dynamicvalfeachcls.active").val()
	}
	if ($(this).find(".columnnametxt.active").attr("mandatorycol") != "true" && vval == "") 
	{
		var dyanmicvalhtml = $(this).find(".columnnametxt.active").attr('alerttext');
			nonrequiredfileds.push(dyanmicvalhtml);
	}		  
	else
	{
		if(key  == 'ColumnPeople1' || key  == 'ColumnPeople2' || key  == 'ColumnPeople3' || key  == 'ColumnPeople4'|| key  == 'ColumnPeople5'){
			var EntityUsers= [];
				var peoplePickerDiv = $("[id$='"+key+"_TopSpan']"); 
				var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
				var users = peoplePicker.GetAllUserInfo()				
				for (var j = 0; j < users.length; j++) 
				{	var flag=false;
					var arrUSer = AllTaskUsersEmployeeuser.filter(function (filterData) {
					if(filterData.EMail == users[j].EntityData.Email){flag=true;}
					return filterData.EMail == users[j].EntityData.Email;
			    });
				if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}			    
			    EntityUsers.push(arrUSer[0].UserId)	    
				}
				itemProperties[key+'Id'] = {"results": EntityUsers};
			}else{
			if($(this).find(".combine_box_adds .dynamicvalfeachcls.active").attr('type') == 'checkbox'){
				itemProperties[key]= $(this).find(".combine_box_adds .dynamicvalfeachcls.active").prop('checked')
			}		
			else
			{
				var val = '';
				if(key  == 'Checkbox1' || key  == 'Checkbox2' || key  == 'Checkbox3' || key  == 'Checkbox4'|| key  == 'Checkbox5'){
				 	val = $(this).find(".combine_box_adds .dynamicvalfeachcls.active").prop('checked')
				}else{
					val = $(this).find(".dynamicvalfeachcls.active").val();
				}
				if(val == '' || val == null)
				{
					itemProperties[key] = ''; //$(this).find(".dynamicvalfeachcls").val();
				}
				else
				{
					itemProperties[key] = val;
				}
			}
			}
			if ($(this).find(".columnnametxt.active").attr("mandatorycol") == "true" && $(this).find(".dynamicvalfeachcls.active").val() == "") 
			{
				var dyanmicvalhtml = $(this).find(".columnnametxt.active").attr('alerttext');
				requiredfileds.push(dyanmicvalhtml);
			}
			if(arrNumVal.length>0)	{
							for(a=0;a<arrNumVal.length;a++){
							if($(this).find(".dynamicvalfeachcls.active").val() != ''){
								if(key == arrNumVal[a].col){
									if(arrNumVal[a].min != null &&  arrNumVal[a].max != null){																	
										if($(this).find(".dynamicvalfeachcls.active").val() >= arrNumVal[a].min && $(this).find(".dynamicvalfeachcls.active").val() <= arrNumVal[a].max){
											itemProperties[key] = $(this).find(".dynamicvalfeachcls.active").val();
										}else{
											alert(arrNumVal[a].title+' should be between '+ arrNumVal[a].min +' to '+ arrNumVal[a].max);
											ischeckk =  true; return false;break;
										}
									}else if(arrNumVal[a].min != null && arrNumVal[a].max == null ){
										if($(this).find(".dynamicvalfeachcls.active").val() >= arrNumVal[a].min){
											itemProperties[key] = $(this).find(".dynamicvalfeachcls.active").val();
										}else{
											alert(arrNumVal[a].title+' should be greater than '+ arrNumVal[a].min );
											ischeckk =  true; return false;break;
										}									
									}else if(arrNumVal[a].min == null && arrNumVal[a].max != null ){
										if($(this).find(".dynamicvalfeachcls.active").val() <= arrNumVal[a].max){
											itemProperties[key] = $(this).find(".dynamicvalfeachcls.active").val();
										}else{
											alert(arrNumVal[a].title+' should be less than  '+ arrNumVal[a].max );											
											ischeckk =  true; return false;break;
										}									
									}else if(arrNumVal[a].min == null && arrNumVal[a].max == null ){
										itemProperties[key] = $(this).find(".dynamicvalfeachcls.active").val();
									}
									
								}
								}
							}						
						}
			}
			if(ischeckk){return false;alert(ischeckk);}		  
		})
		if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation')
    	{
		$("#appenddyamicboxes > .dynamicdatatexboxes:not(.active)").each(function () {
			var key = $(this).find(".columnnametxt:not(.active)").attr("value");
			for(i=0;i<AutoFilledCols.length;i++){
				if(key  == 'ColumnPeople1' || key  == 'ColumnPeople2' || key  == 'ColumnPeople3' || key  == 'ColumnPeople4'|| key  == 'ColumnPeople5'){
					var EntityUsers= [];
					var peoplePickerDiv = $("[id$='"+key+"_TopSpan']"); 
					var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
					var users = peoplePicker.GetAllUserInfo()				
					for (var j = 0; j < users.length; j++) 
					{	var flag=false;
						var arrUSer = AllTaskUsersEmployeeuser.filter(function (filterData) {
						if(filterData.EMail == users[j].EntityData.Email){flag=true;}
						return filterData.EMail == users[j].EntityData.Email;
				    });
					if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}			    
				    EntityUsers.push(arrUSer[0].UserId)	    
					}
					itemProperties[key+'Id'] = {"results": EntityUsers};
				}else{
					if(key  == 'Checkbox1' || key  == 'Checkbox2' || key  == 'Checkbox3' || key  == 'Checkbox4'|| key  == 'Checkbox5'){
					 	itemProperties[key] = $(this).find(".combine_box_adds .dynamicvalfeachcls").prop('checked')
					}else
					if(key == AutoFilledCols[i].ColName){
						itemProperties[key] = $(this).find(".dynamicvalfeachcls").val();
					}
				}
			}		
		})	}
		if(ischeckk){return false;alert(ischeckk);}	
		else{	
		var itemType = "SP.Data.ApprovalProcessListListItem";
		itemProperties["__metadata"] = { "type": itemType };
		if (requiredfileds.length > 0) 
		{
			for (let i = 0; i < requiredfileds.length; i++) 
			{
				alert("Please enter the value for " + requiredfileds[i] + "");
				break;
			}					
		} 
		else 
		{
			validateTable();
			if(window.location.href.indexOf("?")> -1) 
    		{
    			if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation')
    			{
					if(isValid){
					savedata(JSON.stringify(itemProperties));			    									
					}
				}
				else if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Process Steps')
				{
					if(isValid){
					var RecId = window.atob(titanForWork.getQueryStringParameter('RecNo'));	    		
					updateData(itemProperties, RecId);						
					}
				}
			}
		}
	}
}
// To save new data in list
var savedata = function (data) 
{
	var dfd = $.Deferred()
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessList')/items",
		type: "POST",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",						
			"content-Type": "application/json;odata=verbose"
		},
		data: data,
			/*where Title is column name and you can add more columns by splitting with ,*/
		success: function (data) 
		{
			if ($('#attachmentsupload').val() == "") 
			{
				var NewlyCreatedItemId = data.d.ID;
				SubmitTbltcols(NewlyCreatedItemId );
				if(ischeck ==  false && ischeckk ==  false)
				{
					if(SavedStpApprovers.length > 0)
					{
						$.when(SaveApproverQueue(NewlyCreatedItemId)).then(function (ProcessListResult) {							      					   																								
							console.log('Queues created');
						}); 
						//SaveApproverQueue(NewlyCreatedItemId);
						//SubmitTbltcols(NewlyCreatedItemId );
					}
					else
					{
						alert('The approval request has been submitted successfully.');
						window.location.replace("approvals.aspx");
					}
				}
			}
			if ($('#attachmentsupload').val() == "")
				return;						
			var fileInput = jQuery('#attachmentsupload');
			var fileCount = fileInput[0].files.length;
				console.log(fileCount);
			var filecountset = 0;
			for (var i = 0; i < fileCount; i++) 
			{
				filecountset++;
				console.log(i);
				getFileBuffer(i)
				.done(function (arrayBuffer, index) {
					console.log("Success " + index);
					uploadFileSP("ApprovalProcessList", data.d.Id, arrayBuffer, index);
				})
				.fail(function (error) {
					console.log(error);
					LogError("uploadFile", error);
					alert("Error while uploading file for ID" + id);
				});
				if (fileCount == filecountset) 
				{
					var NewlyCreatedItemId = data.d.ID;
					if(ischeck ==  false && ischeckk ==  false)
					{
					SubmitTbltcols(NewlyCreatedItemId );
					if(SavedStpApprovers.length > 0)
					{
						$.when(SaveApproverQueue(NewlyCreatedItemId)).then(function (ProcessListResult) {							      					   																								
							console.log('Queues created');
						}); 							
					}
					else
					{
						alert('The approval request has been submitted successfully.');
					 	window.location.replace("approvals.aspx");
					}
					}
				}
			}					
		},
		error: function (error) 
		{
			alert(JSON.stringify(error));
		}
	});
}

var ActiveQueeNo='';
var NextActiveQueeNo='';
var ExistingSignedImage='';

// To update form data in list

var updateData = function (data,Id) 
{
	Id = parseInt(Id);		
	var Query = "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,RequestID/ID,AttachmentFiles&$expand=RequestID/ID,AttachmentFiles&$filter=RequestID eq '"+Id+"'&$orderby=Sequence_No asc";
	var QueryResult = RequestData(Query);
	var SeqArray=[];
	var FilteredRec2 = $.grep(QueryResult, function(v) {
		return v.StepName == window.atob(titanForWork.getQueryStringParameter('StepNo'))
	}); 
	
	if(FilteredRec2[0].AttachmentFiles.results.length>0)
	{
		ExistingSignedImage = FilteredRec2[0].AttachmentFiles.results[0].FileName;
	}

	if(FilteredRec2.length>0)
	{
		ActiveQueeNo = FilteredRec2[0].ID;
		var StepNo = FilteredRec2[0].Sequence_No; //window.atob(titanForWork.getQueryStringParameter('StepNo'));			
	}
	var StepId = FilteredRec2[0].Id; 
	var SeqIndex = '';
	for(var i=0; i<QueryResult.length; i++)
	{
		SeqArray.push(QueryResult[i].Sequence_No);								
	}
	SeqIndex = SeqArray.indexOf(StepNo);
	if(SeqArray.length>SeqIndex+1)
	{
		let index = [SeqIndex+1];
		let indexArr = index.map(i => SeqArray[i]);
		var NewIndexValue = indexArr.toString();
		var FilteredRec = $.grep(QueryResult, function(v) {
			return v.Sequence_No == NewIndexValue;
		});
		NextActiveQueeNo = FilteredRec[0].ID;
		console.log(FilteredRec);
	}	
	data.CurrentStepID = NextActiveQueeNo.toString();
	
	if(NextActiveQueeNo == '')
	{
		if(ActiveBtnStatus == 'Submit' || ActiveBtnStatus == 'ApprovedSign' || ActiveBtnStatus == 'Reviewed' || ActiveBtnStatus == 'Edit Data')
		{
			data.CurrentStep = 'Final',
			data.ApprovedById = _spPageContextInfo.userId,
			data.ActionRequired = 'Final',
			data.Status = 'Approved'
		}
		else if(ActiveBtnStatus == 'Reject')
		{
			data.ActionRequired = 'Rejected',
			data.Status = 'Rejected',
			data.ApprovedById = _spPageContextInfo.userId			
		}
	}
	else
	{
		if(ActiveBtnStatus == 'Submit' || ActiveBtnStatus == 'ApprovedSign' || ActiveBtnStatus == 'Reviewed' || ActiveBtnStatus == 'Edit Data')
		{
			if(FilteredRec[0].ApproversId != null){
				data.ApproversId = {'results': FilteredRec[0].ApproversId.results};
			}
			data.CurrentStep = FilteredRec[0].StepName,			
			data.ActionRequired = FilteredRec[0].ActionRequired
		}
		else if(ActiveBtnStatus == 'Reject')
		{					
			data.ActionRequired = 'Rejected',
			data.Status = 'Rejected',
			data.ApprovedById = _spPageContextInfo.userId			
		}
	}	
var dfd = $.Deferred()
{
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessList')/items("+Id+")",
		type: "PATCH",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"X-Http-Method": "PATCH",
   			"If-Match": "*",
			"content-Type": "application/json;odata=verbose"
		},
		data: JSON.stringify(data),
			/*where Title is column name and you can add more columns by splitting with ,*/
		success: function (data) 
		{
			var ActiveSingTypeRadio='';
			var listName="ApprovalProcessQueue";	//Action.name.split(',')[4]
			var SiteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+ActiveQueeNo+"')";
			var item='';
			
			if(ActiveBtnStatus == 'Submit')
			{					
				item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Reviewed'};				
			}
			else if(ActiveBtnStatus == 'Reject')
			{
				item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Rejected','Remarks':$("#RejectApproveRemark").val()};
			}
			else if(ActiveBtnStatus == 'Reviewed')
			{
				item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Reviewed','Remarks':$("#ReviewedApproveRemark").val()};
			}
			else if(ActiveBtnStatus == 'Edit Data')
			{
				item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','Remarks':$("#EditDataApproveRemark").val()};
			}				
			else if(ActiveBtnStatus  == 'ApprovedSign')
			{
				ActiveSingTypeRadio = $('input[name="SignTypeRadio"]:checked').val();
				var listName="ApprovalProcessQueue";	//Action.name.split(',')[4]
				if(ActiveSingTypeRadio == 'SignText')
				{
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignText','DrawSign':$("#SingTextType").val(),'Remarks':$("#RemarksApprovalContent").val(),'IPAddress':ActiveSystemIP};
				}
				else if(ActiveSingTypeRadio == 'SignImage')
				{
					targetItemId = ActiveQueeNo;
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignImage','Remarks':$("#RemarksApprovalContent").val(),'IPAddress':ActiveSystemIP,'DrawSign':''};
					//if(SelectedSignImages != '')
					//{
					//	item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignImage','Remarks':$("#RemarksApprovalContent").val(),'IPAddress':ActiveSystemIP,'DrawSign':SelectedSignImages};				
					//}
					//else
					//{						
					//	item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignImage','Remarks':$("#RemarksApprovalContent").val(),'IPAddress':ActiveSystemIP,'DrawSign':''};				
					//}
				}
				else if(ActiveSingTypeRadio == 'SignDraw')
				{
					var DrawSingValue = $sigdiv.jSignature('getData', "default");
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignDraw','DrawSign':DrawSingValue,'Remarks':$("#RemarksApprovalContent").val(),'IPAddress':ActiveSystemIP};
				} 
			}
			
			var ExStatus = UniversalUpdateApprovalProcess(listName,item,ActiveQueeNo,SiteUrl);
			if(ExStatus == true && ActiveSingTypeRadio == 'SignImage')
			{
				if(SelectedSignImages != '')
				{
					CopySignatureFile();
				}
				else
				{
					uploadattachment(ActiveQueeNo);
				}
			}
			
			var SiteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+NextActiveQueeNo+"')";
			if(NextActiveQueeNo != '')
			{
				var item='';					
				item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'Status':'Pending'};				
				var ExStatus = UniversalUpdateApprovalProcess(listName,item,NextActiveQueeNo ,SiteUrl);				
			}
			
			if ($('#attachmentsupload').val() == "") 
			{
				//var NewlyCreatedItemId = data.d.ID;					
				UpdateTableData();
				if(ischeck ==  false && ischeckk ==  false)
				{
				if(SavedStpApprovers.length > 0)
				{							
					console.log(SavedStpApprovers);							
				 	console.log('Updated');
				 	alert('The approval request has been updated successfully.');
				 	window.location.replace("approvals.aspx");
				}
				}
			}
			if ($('#attachmentsupload').val() == "")
				return;						
			var fileInput = jQuery('#attachmentsupload');
			var fileCount = fileInput[0].files.length;
			console.log(fileCount);
			var filecountset = 0;
			for (var i = 0; i < fileCount; i++) 
			{
				filecountset++;
				console.log(i);
				getFileBuffer(i)
				.done(function (arrayBuffer, index) {
					console.log("Success " + index);
					//uploadFileInList(arrayBuffer, id, index);
					uploadFileSP("ApprovalProcessQueue", StepId, arrayBuffer, index);
				})
				.fail(function (error) {
					console.log(error);
					LogError("uploadFile", error);
					alert("Error while uploading file for ID" + id);
				});
				if (fileCount == filecountset) 
				{
					alert("Details are saved successfully.");
					window.location.replace("approvals.aspx"); //location.reload();
				}
			}
		},
		error: function (error) 
		{
			alert(JSON.stringify(error));
		}
	});
``}
}
var GetImageBuffer = function (SignImage) 
	{
		var deferred = $.Deferred();
		var reader = new FileReader();
		reader.onload = function (e) 
		{
    		deferred.resolve(e.target.result);
		}

		reader.onerror = function (e) 
		{
			deferred.reject(e.target.error);
		}
		reader.readAsArrayBuffer(SignImage);
		return deferred.promise();
	};
	
	var xRequestDigest = $("#__REQUESTDIGEST").val();
	function uploadattachment(id) 
	{
		if(SignImage.length>0)
		{
	    $.each(SignImage, function(index, value){
		    GetImageBuffer (value).then(function (buffer) {
		     	var OrginalFileName = value.name;
		    	var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");
			    $.ajax({
					url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
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
    				success: function (data)
    				{ 
    					console.log("Image Upload");
    					if(ExistingSignedImage != '')
    					{
    						DeleteItemAttachment(id, ExistingSignedImage);
    					} 
    				},
    				error: function (data) 
    				{
    					console.log(data);
    		  			//alert(data.responseText);
    				}
    			});
			});
		});
	}
}

function uploadFileSP(listName, id, fileArray, fileCount) {
	
	var deferred = $.Deferred();
	var fileInput = jQuery('#attachmentsupload');	
	var fileName = fileInput[0].files[fileCount].name;
	var queryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')";
	//var uploadCount = 0;
	$.ajax({
		url: queryUrl,
		type: "POST",
		processData: false,
		contentType: "application/json;odata=verbose",
		data: fileArray,
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"content-length": fileArray.byteLength
		},
		success: function (data) {

			if (fileArray.length > 0) {
				//uploadFileSP("ListName", id, fileArray, fileArray.length);
			}
			else {
				//	alert("Your item has been submitted successfully!");
			}
		},
		error: function (err) {
			alert("Idea has been submitted but some files failed to upload.");
		}
	});
	return deferred.promise();
}

// Delete Attachment	
function DeleteItemAttachment(ItemId, FileTitle) 
	{  
		var Dfd = $.Deferred();  
    	var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessQueue')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ";  
    	$.ajax({  
			url: Url,  
			type: 'DELETE',  
    	    contentType: 'application/json;odata=verbose',  
    	    headers: {  
    	    	'X-RequestDigest': $('#__REQUESTDIGEST').val(),  
    	    	'X-HTTP-Method': 'DELETE',  
    	        'Accept': 'application/json;odata=verbose'  
			},  
    	    success: function (data) 
    	    {  
				Dfd.resolve(data);
				console.log('Old Signed Image Delete.')  
			},  
        	error: function (error) 
        	{  
				Dfd.reject(JSON.stringify(error));  
        	}  
		});  
    	return Dfd.promise();  
}

var arrFileUpload = [];
var finalFiles = [];
var RemoveDuplicate = [];
//Bind selected attachment in popup
function bindAttachments(Action)
{
	arrFileUpload = [];
	//finalFiles =[];
	var fileNum = Action.files.length, initial = 0;
	$.each(Action.files, function (idx, elm) {
		finalFiles[finalFiles.length] = elm;
	});
	RemoveDuplicate = [];
	var arr = finalFiles.filter(function (el) {
		if (RemoveDuplicate.indexOf(el.name) == -1) {
			RemoveDuplicate.push(el.name);
			return true;
		}
		return false;
	});
	arrFileUpload = ReinitializeArray(arr);
	//	$('#Docfilename').empty();
	var bindfile = '';
	Tcounter = 0;
	for (initial; initial < arrFileUpload.length; initial++) {		
		bindfile += '<div class="approve-process-upload-data-chip upload-chip" id="Ifile_' + Tcounter + '">';
		bindfile += '<i class="fa fa-paperclip color-sky-blue" aria-hidden="true"></i>';
		bindfile += '<span class="px-2 font-14 upload-chip-title" title=' + RemoveDuplicate[initial] + '>' + RemoveDuplicate[initial] + '</span>';
		bindfile += '<i class="fa fa-times-circle-o text-danger" onclick="RemoveDocument(this.id);" id="Ifile_' + Tcounter + '""></i></div>';		
		Tcounter = Tcounter + 1;
	}
	$('#Docfilename').empty().append(bindfile);
	//   getDocWeight();   // commented to remove file size validaion.
}

function getFileBuffer(i) {
	var deferred = jQuery.Deferred();
	var fileInput = jQuery('#attachmentsupload');
	var reader = new FileReader();

	reader.onloadend = function (e) {
		deferred.resolve(e.target.result, i);
	}
	reader.onerror = function (e) {
		deferred.reject(e.target.error);
	}
	reader.readAsArrayBuffer(fileInput[0].files[i]);
	return deferred.promise();
}

//remove the attached document
function RemoveDocument(id) {
	var index = id.split('_')[1];
	$("#" + id).remove();
	//delete finalFiles[parseInt(index)];
	finalFiles.splice(parseInt(index), 1);
	if ($('#Docfilename').html() == '') {
		finalFiles = [];
		$("#uploadFileAttach").val('');
	}
	RemoveDuplicate = [];
	var arr = finalFiles.filter(function (el) {
		if (RemoveDuplicate.indexOf(el.name) == -1) {
			RemoveDuplicate.push(el.name);
			return true;
		}
		return false;
	});
	arrFileUpload = ReinitializeArray(arr);
}

//Loop on documents to get the details
function ReinitializeArray(arr) {
	var newArr = [];
	var count = 0;
	//for (var i in arr) 
	for (var i = 0; i < arr.length; i++) {
		newArr[count++] = arr[i];
	}
	return newArr;
}

function RequestGetdata(Query)
{
    var ResultItems=[];
    var Ownurl =Query;// _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            ResultItems = data.d.results;  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}

// get submitted column data from list

function ColumnValueByColumnName(QueryResult, _ProcessType) {
	var ListName;
	//var event_pop;
	switch (_ProcessType) {
		case 'ColumnText1': ListName = 	QueryResult[0].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[0].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[0].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[0].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[0].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[0].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[0].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[0].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[0].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[0].ColumnText10; break;
		case 'ColumnText11': ListName = QueryResult[0].ColumnText11; break;
		case 'ColumnText12': ListName = QueryResult[0].ColumnText12; break;
		case 'ColumnText13': ListName = QueryResult[0].ColumnText13; break;
		case 'ColumnText14': ListName = QueryResult[0].ColumnText14; break;
		case 'ColumnText15': ListName = QueryResult[0].ColumnText15; break;
		case 'ColumnText16': ListName = QueryResult[0].ColumnText16; break;
		case 'ColumnText17': ListName = QueryResult[0].ColumnText17; break;
		case 'ColumnText18': ListName = QueryResult[0].ColumnText18; break;
		case 'ColumnText19': ListName = QueryResult[0].ColumnText19; break;
		case 'ColumnText20': ListName = QueryResult[0].ColumnText20; break;
		case 'ColumnNumber1': ListName = QueryResult[0].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[0].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[0].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[0].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[0].ColumnNumber5; break;
		case 'ColumnNumber6': ListName = QueryResult[0].ColumnNumber6; break;
		case 'ColumnNumber7': ListName = QueryResult[0].ColumnNumber7; break;
		case 'ColumnNumber8': ListName = QueryResult[0].ColumnNumber8; break;
		case 'ColumnNumber9': ListName = QueryResult[0].ColumnNumber9; break;
		case 'ColumnNumber10': ListName = QueryResult[0].ColumnNumber10; break;
		case 'ColumnNumber11': ListName = QueryResult[0].ColumnNumber11; break;
		case 'ColumnNumber12': ListName = QueryResult[0].ColumnNumber12; break;
		case 'ColumnNumber13': ListName = QueryResult[0].ColumnNumber13; break;
		case 'ColumnNumber14': ListName = QueryResult[0].ColumnNumber14; break;
		case 'ColumnNumber15': ListName = QueryResult[0].ColumnNumber15; break;
		case 'ColumnNumber16': ListName = QueryResult[0].ColumnNumber16; break;
		case 'ColumnNumber17': ListName = QueryResult[0].ColumnNumber17; break;
		case 'ColumnNumber18': ListName = QueryResult[0].ColumnNumber18; break;
		case 'ColumnNumber19': ListName = QueryResult[0].ColumnNumber19; break;
		case 'ColumnNumber20': ListName = QueryResult[0].ColumnNumber20; break;
		case 'ColumnDate1': ListName = moment(QueryResult[0].ColumnDate1).format('LL'); break;
		case 'ColumnDate2': ListName = moment(QueryResult[0].ColumnDate2).format('LL'); break;
		case 'ColumnDate3': ListName = moment(QueryResult[0].ColumnDate3).format('LL'); break;
		case 'ColumnDate4': ListName = moment(QueryResult[0].ColumnDate4).format('LL'); break;
		case 'ColumnDate5': ListName = moment(QueryResult[0].ColumnDate5).format('LL'); break;
		case 'ColumnDate6': ListName = moment(QueryResult[0].ColumnDate6).format('LL'); break;
		case 'ColumnDate7': ListName = moment(QueryResult[0].ColumnDate7).format('LL'); break;
		case 'ColumnDate8': ListName = moment(QueryResult[0].ColumnDate8).format('LL'); break;
		case 'ColumnDate9': ListName = moment(QueryResult[0].ColumnDate9).format('LL'); break;
		case 'ColumnDate10': ListName = moment(QueryResult[0].ColumnDate10).format('LL'); break;
		case 'Currency': ListName = QueryResult[0].Currency; break;
		case 'DueDate': ListName = moment(QueryResult[0].DueDate).format('LL'); break;
		case 'Priority': ListName = QueryResult[0].Priority; break;
		case 'YesNo': ListName = QueryResult[0].YesNo; break;
		case 'ColumnMultiline1': ListName = QueryResult[0].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[0].ColumnMultiline2; break;
		case 'ColumnMultiline3': ListName = QueryResult[0].ColumnMultiline3; break;
		case 'ColumnMultiline4': ListName = QueryResult[0].ColumnMultiline4; break;
		case 'ColumnMultiline5': ListName = QueryResult[0].ColumnMultiline5; break;
		case 'ColumnMultiline6': ListName = QueryResult[0].ColumnMultiline6; break;
		case 'ColumnMultiline7': ListName = QueryResult[0].ColumnMultiline7; break;
		case 'ColumnMultiline8': ListName = QueryResult[0].ColumnMultiline8; break;
		case 'ColumnMultiline9': ListName = QueryResult[0].ColumnMultiline9; break;
		case 'ColumnMultiline10': ListName = QueryResult[0].ColumnMultiline10; break;
		case 'Checkbox1': ListName = QueryResult[0].Checkbox1; break;
		case 'Checkbox2': ListName = QueryResult[0].Checkbox2; break;
		case 'Checkbox3': ListName = QueryResult[0].Checkbox3; break;
		case 'Checkbox4': ListName = QueryResult[0].Checkbox4; break;
		case 'Checkbox5': ListName = QueryResult[0].Checkbox5; break;		
		case 'ColumnPeople1': ListName = QueryResult[0].ColumnPeople1; break;
		case 'ColumnPeople2': ListName = QueryResult[0].ColumnPeople2; break;
		case 'ColumnPeople3': ListName = QueryResult[0].ColumnPeople3; break;
		case 'ColumnPeople4': ListName = QueryResult[0].ColumnPeople4; break;
		case 'ColumnPeople5': ListName = QueryResult[0].ColumnPeople5; break;
		case 'AutoSerialNumber': ListName = QueryResult[0].AutoSerialNumber; break;
	}
	return ListName;
}
