JSRequest.EnsureSetup();
const currTempID = JSRequest.QueryString['TID'];
$(document).ready(function() {
	var schema = {};  
	schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';  
	schema['SearchPrincipalSource'] = 15;  
	schema['ResolvePrincipalSource'] = 15;  
	schema['AllowMultipleValues'] = true;  
	schema['MaximumEntitySuggestions'] = 50;  
	schema['Width'] = '400px';  
	SPClientPeoplePicker_InitStandaloneControlWrapper("preocessOwner", null, schema);
	GetTempDetail(currTempID);
	$("#appearanceTemp,#aboutTemp").click(function(){GetTempDetail(currTempID);
	  showTemp(currTempID,"")
	});
	$('#about_modl').on('hidden.bs.modal', function() {
		resetPeoplePicker("preocessOwner");
	});
});
var arrTemp=[];
var initiators='';
function GetTempDetail(currTempID)
{
	var Responce=[];
	$.ajax({
		async: false,
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items",//?$filter=ID eq '"+currTempID +"'",
		type: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		},
		success :  function (data) 
		{
			Responce = data.d.results;
			let obj ;
			var slectedrow=Responce.find(x => x.Id === Number(currTempID));
			if(slectedrow.ProcessOwnerId!=null){
				obj = slectedrow.ProcessOwnerId.results.indexOf(_spPageContextInfo.userId);
			}
			if(obj== -1 || slectedrow.ProcessOwnerId==null)
			{
				//alert("Unauthorized Access.\nYou don't have permissions.")
				if(titanForWork.getQueryStringParameter('sourcelocation') == '../Pages/Document.aspx')
				{
				//	window.location.replace("Document.aspx?WebAppId="+window.btoa(Logged_CompanyId)+"&undefined=undefined");
				}
				else
				{
				//	window.location.replace("approvals.aspx");
				}
			}
			arrTemp=Responce;
			initiators=slectedrow.Initiation;
			ProcessType=slectedrow.ProcessType;					
			$("#showInitiator").text(slectedrow.Initiation);

			$("#txtPrName").text(slectedrow.Title);
			$("#txtTempName").text(slectedrow.TemplateName);
			$("#txtPrTitle").text(slectedrow.RequestFor);
			$('#imgPrLogo').attr("src",slectedrow.FileIcon.Url);		
		},  
		eror: function(data) {  
			console.log("An error occurred. Please try again.");  
		}
	});
}
 function getAllTemplate(){}
 
 function showTemp(id,sts) {
	 	resetPeoplePicker("preocessOwner");
		var slectedrow=arrTemp.find(x => x.Id === Number(id));		
		let list = document.querySelectorAll('.slideN img');
			for (let i=0; i<list.length; i++){
				let j = 0;
				var stringURL = list[i].getAttribute('src').slice(3).split("?")[0].split("?")[0]
      		    var avoid = "_vti_bin/afdcache.ashx/authitem/";
				var avoided = stringURL.replace(avoid,'');  
					if((slectedrow.FileIcon.Url).includes(avoided)){
						$('#blah').attr("src",'');
						$('.changemeN').addClass('d-block');
	                    $('.changemeN').removeClass('d-none');
	                    $('#Upload-user-imageN').removeClass('d-block');
	                    $('#Upload-user-imageN').addClass('d-none');
						$('#divSelImg').hide();
						let list = document.querySelectorAll('.slideN img');
						for (let j=0; j<list.length; j++){
							list[j].parentElement.className = 'slide slideN';
						}
						$("input[name=UpdateEmpN][value='Choose from gallery']").prop('checked', true);
						list[i].src=list[0].getAttribute('src');

						list[0].src=slectedrow.FileIcon.Url;
						list[0].parentElement.className = 'slide slideN image-active';
						break; 

					}
					else{ 			
						$("input[name=UpdateEmpN][value='Upload']").prop('checked', true);

						list[i].parentElement.className = 'slide slideN';      
						$('#blah').attr("src",slectedrow.FileIcon.Url);
			 			$('#divSelImg').show();
			 			$('.changemeN').removeClass('d-block');
                    	$('.changemeN').addClass('d-none');

                    	$('#Upload-user-imageN').addClass('d-block');
                    	$('#Upload-user-imageN').removeClass('d-none');
			 		}
				
			}

	
		$("#ddlPageColumn").val(slectedrow.PageColumn);
	
		$("#txtTitle").val(slectedrow.Title);
		$("#txtTemplate").val(slectedrow.TemplateName);
		$('#tmpIcon').attr("src",slectedrow.FileIcon.Url);
		
		$("#txtDetails").val(slectedrow.Details);
		$("#txtInstruct").val(slectedrow.Instructions);
		$('#txtPre').val(slectedrow.Prerequisite);
		
		$("#clrTitleBack").val(slectedrow.TitleBackColor);
		$("#clrFormBack").val(slectedrow.FormBackColor);
		$('#clrHeadLine').val(slectedrow.HeaderLineColor);
		$('#clrTableHead').val(slectedrow.TableHeaderColor);
		var themeopts= slectedrow.Appearance;
	    var thm="";
      	if(themeopts=="Theme"){$("#txtThm").val(slectedrow.ThemeColor);$(".themeselect").show();$(".customselect").hide();thm="themeselect";}
      	else if(themeopts=="Custom"){$("#txtCustomThm").val(slectedrow.ThemeColor);$(".customselect").show();$(".themeselect").hide();thm="customselect";}
      	else if(themeopts=="Default"){thm="defaultselect";$(".customselect").hide();$(".themeselect").hide();}
		$("input[name=them_setting][value='"+thm+"']").prop('checked', true);
			if(slectedrow.ProcessOwnerId!=null){
				for(i=0;i<slectedrow.ProcessOwnerId.results.length;i++)
				{
					var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.preocessOwner_TopSpan;
		    	 //	peoplePickerteamleaderDiv.AddUserKeys(SavedStpApprovers[index-1].StUser[i].Key.split('|')[2]);
		    	 	var UserTitle = GetUserLogin(slectedrow.ProcessOwnerId.results[i]);
		    	 	peoplePickerteamleaderDiv.AddUserKeys(UserTitle);
	     		}
			}
		
		$("#ddlReqFor option").each(function()
		{
			if($(this).val()==slectedrow.RequestFor){
				$("#chkReqFor").prop('checked', false);
				$("#ddlReqFor").val(slectedrow.RequestFor);
				$("#ddlReqFor").show();
				$("#txtReqFor").hide();
				return false;
			}
			else{
				$("#chkReqFor").prop('checked', true);
				$("#txtReqFor").val(slectedrow.RequestFor);
				$("#ddlReqFor").hide();
				$("#txtReqFor").show();
			}
		});

}
function resetPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}
 /**Set Appearance**/
 function setTempDetail(txtType){
 			var Template=$("#txtTemplate").val();
 			let result = arrTemp.filter(obj => {
					if(obj.TemplateName!=null){
				  		return obj.TemplateName.toLowerCase()=== Template.toLowerCase() && obj.Id!=currTempID;
				  	}
				})
			if(result.length>0){alert("Duplicate template name!");return false;}
    		var radioValue = $("input[name='UpdateEmpN']:checked").val();
      	   	parent = document.getElementsByClassName('image-active');
			if(radioValue =="Choose from gallery"){
				if(parent.length!=0){
					updateProcessMaster(parent[0].children[0].currentSrc,txtType);
				}else{alert("Please choose image");return false;}
			}
			else if(radioValue =="Upload" && $('.approve-process-upload-image-inp')[0].files.length != 0){
              	uploadFile("Edit");
            }else if(radioValue =="Upload" && $('.approve-process-upload-image-inp')[0].files.length == 0 && $('#blah').attr('src')==""){
              	alert("Please upload image.");
            }
            else{
            	updateProcessMaster($('#blah').attr('src'),txtType)
            }

    }

    		function updateProcessMaster(imgurl,txtType){
      		    
      		    var Title=$("#txtTitle").val();
      		    var ReqFor='';
      		    var Template=$("#txtTemplate").val();
      		    
      		    var pageColumn=$("#ddlPageColumn option:selected").text();
      		    
				var Details=$("#txtDetails").val();
      		    var Instruct=$("#txtInstruct").val();
      		    var Prereq=$("#txtPre").val();
      		    
      		    var themeopts= $("input[name='them_setting']:checked").val();
      		    var thmcolor="";      		    
      		    if(themeopts=="themeselect"){thmcolor=$("#txtThm").val();themeopts="Theme";}
      		    else if(themeopts=="customselect"){thmcolor=$("#txtCustomThm").val();themeopts="Custom";}
      		    else if(themeopts=="defaultselect"){thmcolor="";themeopts="Default";}
      		    
      		    var peoplePickerTopDivId = $('#preocessOwner').children().children().attr('id');  
				var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopDivId];  
				var users = peoplePicker.GetAllUserInfo();  
				var procOwner=[];
				var userArr=[];	
				for (var j = 0; j < users.length; j++) 
				{	var flag=false;
					var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
						if(filterData.EMail == users[j].EntityData.Email){flag=true;}
						return filterData.EMail == users[j].EntityData.Email;
				    });
				    if(arrSubVisaLetters.length==0){userArr.push(users[j].DisplayText)}
			        if(arrSubVisaLetters.length>0){
			        	procOwner.push(arrSubVisaLetters[0].UserId)	 
			        }
				}
				let result = arr.filter(obj => {
					if(obj.TemplateName!=null){
				  		return obj.TemplateName.toLowerCase()=== Template.toLowerCase() && obj.Id!=id;
				  	}
				})
      		    if($("#chkReqFor").prop('checked') == true){
				    ReqFor=$("#txtReqFor").val();
				}
				else{
					ReqFor=$("#ddlReqFor option:selected").text();					
				}
      		    var tblRowCount=$('#tblApTemp tbody tr').length;
      		    
      		    if(result.length>0){alert("Duplicate template name!");return false;}
      		    
      		    var stringURL = imgurl.split("?")[0]
      		    var avoid = "_vti_bin/afdcache.ashx/authitem/";
				var avoided = stringURL.replace(avoid,'');    				
				var listItem='';
				var clrTitleBack=$("#clrTitleBack").val();
				var clrFormBack=$("#clrFormBack").val();
				var clrHeadLine=$('#clrHeadLine').val();
				var clrTableHead=$('#clrTableHead').val();

				if(txtType=="Appearance"){
					listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },
						                'PageColumn':pageColumn,
						                'ThemeColor':thmcolor,
						                'Appearance':themeopts,
						                'TitleBackColor':clrTitleBack,
						                'FormBackColor':clrFormBack,
						                'HeaderLineColor':clrHeadLine,
						                'TableHeaderColor':clrTableHead,
										'FileIcon': 
						                {
						                    '__metadata': { 'type': 'SP.FieldUrlValue' },
						                    //escription': 'Google',
						                    'Url': avoided//imgurl
						                },				
						          }
						}
					else if(txtType=="About"){
					listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },
							            'RequestFor':ReqFor,
						                'TemplateName':Template,
						                'Title':Title, 
						                'Details':Details,
						                'Instructions':Instruct,
						                'Prerequisite':Prereq,
						                'ProcessOwnerId':{"results": procOwner},
														
						          }
						}
				               $.ajax({
							        url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('ApprovalProcessMaster')/getItemById(" +currTempID+ ")",
							        type: "PATCH",
							        headers: {
							            "accept": "application/json;odata=verbose",
							            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
							            "content-Type": "application/json;odata=verbose",
							            "X-Http-Method": "PATCH",
							            "If-Match": "*"
							        },
							        data: JSON.stringify(listItem),
							        success: function (data) {
										alert("Template updated successfully.");
										
									    $( '#Appearance_modl,#about_modl' ).modal( 'hide' ).data( 'bs.modal', null );						    

							        },
							        error: function (error) {
							        }
							    });          

     	 }
