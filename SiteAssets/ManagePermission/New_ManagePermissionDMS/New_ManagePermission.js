var SharingUserId=[];
var ShareUserPrincipleMail=[];
var SharingUserEmail=[];
var SharingUserName=[];
var AdminWarning;
var IsAdminOrNot = true;
var IscheckMessage = false;
var SuperAdminWaring;
var IsSuperAdmin = false;
var g_Contributors=[];
var g_HOD=[];
var g_OtherDeptContri=[];
var userRecords=[];
var g_Readers =[];
var arrContriUsers = [];
var g_eventAdminArr=[];
$(document).ready(function(){
  
  UserAuthorization();
  ChangeLabels();
  commonFormSubmit();
  LoadPeoplePickerControls();
  BindDepartments();
  getCompanyApprovers();
  GetDepartmentalApprovers(Logged_DepartmentId);  

  onChangeTech('TechPplPicker_TopSpan', 'TechPplPicker');
  onChangeSearchUser('serchUser_TopSpan', 'serchUser',userRecords);
  onChangeHr('HrPplPicker_TopSpan', 'HrPplPicker');
  onChangeDeptContributors('deptContributorsPplPicker_TopSpan', 'deptContributorsPplPicker');
  onChangeHeadOfDept('headOfDeptPplPicker_TopSpan', 'headOfDeptPplPicker');
  onChangeOtherDept('otherDeptContriPplPicker_TopSpan', 'otherDeptContriPplPicker');
  onChangeReader('readerPplPicker_TopSpan', 'readerPplPicker');
  onChangeProcess('processPplPicker_TopSpan', 'processPplPicker');
  onChangeCustomer('ClientAdminPplPicker_TopSpan', 'ClientAdminPplPicker');
  onChangeProjectAdmin('projectAdminPplPicker_TopSpan', 'projectAdminPplPicker');

  onChangeBanner('BannersContributors_Company_TopSpan','BannersContributors_Company');
  onChangeBannerApprover('BannersApprovers_Company_TopSpan','BannersApprovers_Company');
  onChangeAnnouncement('AnnouncementContributors_Company_TopSpan','AnnouncementContributors_Company');
  onChangeAnnouncementApprovers('AnnouncementApprovers_Company_TopSpan','AnnouncementApprovers_Company');
  onChangeAlert('AlertContributors_Company_TopSpan','AlertContributors_Company');
  onChangeAlertApprovers('AlertApprovers_Company_TopSpan','AlertApprovers_Company');
  onChangeEvent('EventsContributors_Company_TopSpan','EventsContributors_Company');
  onChangeEventApprover('EventsApprovers_Company_TopSpan','EventsApprovers_Company');
  onChangeSuevey('PollsContributors_Company_TopSpan','PollsContributors_Company');
  onChangeSueveyApprovers('PollsApprovers_Company_TopSpan','PollsApprovers_Company');
  onChangeRecogination('RecognitionContributors_Company_TopSpan','RecognitionContributors_Company');
  onChangeRecoginationApprovers('RecognitionApprovers_Company_TopSpan','RecognitionApprovers_Company');
  onChangeExperenceApprov('ExperienceApprovers_Company_TopSpan','ExperienceApprovers_Company');
  onChangeExperence('ExperienceContributors_Company_TopSpan','ExperienceContributors_Company');
  onChangeQuestion('QuestionAnswerContributors_Company_TopSpan','QuestionAnswerContributors_Company');
  onChangeQuestionApproval('QuestionAnswerApprovers_Company_TopSpan','QuestionAnswerApprovers_Company');
  onChangeMedia('MediaContributors_Company_TopSpan','MediaContributors_Company');
  onChangeMagazine('MegazineContributors_Company_TopSpan','MegazineContributors_Company');


  onChangeNewInitiative('initiativePplPicker_TopSpan','initiativePplPicker');
  onChangeDepartProject('deptProjectPplPicker_TopSpan','deptProjectPplPicker');
  onChangeDocumentApprovers('deptApproversPplPicker_TopSpan','deptApproversPplPicker');
  onChangeNewInitiativeApprovers('initiativeApproverPplPicker_TopSpan','initiativeApproverPplPicker');
  onChangeSuggesion('SuggestionPplPicker_TopSpan','SuggestionPplPicker');
  onChanSuggesionApprov('suggestionApprovalPplPicker_TopSpan','suggestionApprovalPplPicker');
  onChangeActivity('ActivityPplPicker_TopSpan','ActivityPplPicker');
  onChangeActivityApprov('ActivityApproverPplPicker_TopSpan','ActivityApproverPplPicker');
  onChangeKnowledge('KnowledgeAdminPplPicker_TopSpan','KnowledgeAdminPplPicker');
  onChangeKnowledgeApprov('KnowledgeApproverPplPicker_TopSpan','KnowledgeApproverPplPicker');
  
});



//// User Authorization
function UserAuthorization() {
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    titanForWork.PageAuthorization("ManageCompany", companyId).done(function (currentUserRights, message) {
        if (currentUserRights.length > 0) {
            if ((currentUserRights[0].SiteAdmin == "SiteAdmin") || (currentUserRights[0].TechAdmin == "TechAdmin")) {
                userActivityNotificationEntry(_spPageContextInfo.userId,window.location);

                //SP.SOD.executeFunc('sp.js', 'SP.ClientContext', PageLoad_Permissions);
            } else {
                alert(message);
                window.location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/Default.aspx?WebAppId=" + companyId;
            }
        }
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Load People Picker Controls ////////////////////////////////////////
function LoadPeoplePickerControls() {
      InitializePeoplePicker("TechPplPicker", true);
      InitializePeoplePicker("processPplPicker", true);
      InitializePeoplePicker("serchUser", false);      
	  InitializePeoplePicker("HrPplPicker", true);
      InitializePeoplePicker("deptApproversPplPicker", true);                                                                                                       
	  InitializePeoplePicker("deptContributorsPplPicker", true);
	  InitializePeoplePicker("headOfDeptPplPicker", true);
	  InitializePeoplePicker("otherDeptContriPplPicker", true);
	  InitializePeoplePicker("readerPplPicker", true);
	  InitializePeoplePicker("ClientAdminPplPicker", true);
	  InitializePeoplePicker("projectAdminPplPicker", true);
      InitializePeoplePicker("BannersContributors_Company", true);
      InitializePeoplePicker("BannersApprovers_Company", true);
      InitializePeoplePicker("MegazineContributors_Company", true);
      InitializePeoplePicker("MediaContributors_Company", false);      
	  InitializePeoplePicker("AnnouncementContributors_Company", true);
	  InitializePeoplePicker("AnnouncementApprovers_Company", true);
	  InitializePeoplePicker("AlertContributors_Company", true);
	  InitializePeoplePicker("AlertApprovers_Company", true);
	  InitializePeoplePicker("EventsContributors_Company", true);
	  InitializePeoplePicker("EventsApprovers_Company", true);      
      InitializePeoplePicker("PollsContributors_Company", true);
      InitializePeoplePicker("PollsApprovers_Company", true);
      InitializePeoplePicker("RecognitionContributors_Company", true);
      InitializePeoplePicker("RecognitionApprovers_Company", false);      
	  InitializePeoplePicker("ExperienceContributors_Company", true);
	  InitializePeoplePicker("ExperienceApprovers_Company", true);
	  InitializePeoplePicker("QuestionAnswerContributors_Company", true);
	  InitializePeoplePicker("QuestionAnswerApprovers_Company", true);

      InitializePeoplePicker("deptProjectPplPicker", true);
      InitializePeoplePicker("initiativePplPicker", true);
      InitializePeoplePicker("initiativeApproverPplPicker", true);
      InitializePeoplePicker("SuggestionPplPicker", false);      
	  InitializePeoplePicker("suggestionApprovalPplPicker", true);
	  InitializePeoplePicker("ActivityPplPicker", true);
	  InitializePeoplePicker("ActivityApproverPplPicker", true);
	  InitializePeoplePicker("KnowledgeAdminPplPicker", true);
      InitializePeoplePicker("KnowledgeApproverPplPicker", true);	  
    

	  $('#btnSubmit_Admin').click(function () {	    
	
        $.ajax({
            cache: false,
            beforeSend: function() {
              $("#overlaysearch").fadeIn();
            },
            success: function(data) {
                if(CheckAdminBlock()==true) {           
                    $.when(ProjectAdmin()).done(function (isSuccessResponse) {
                         if (isSuccessResponse==true) {             
                            $.when(TechAdmin(),ProcessAdmin(), HRAdmin(),CompanyClientMaster()).done(function (MainExamListItemTemp) {
                             alert("Permission assigned successfully .");                    
                           });
                         }                
                     });        
                 } else {
                     if (IsAdminOrNot == false) {
                         alert(AdminWarning);
                         waitingDialog.hide();
                     }
                     IsAdminOrNot = true;
                 }

                $("#overlaysearch").fadeOut();
            }
        });        
	});
    $("#ddlDepartments").change(function () {        
         var SiteURL=GetSiteURL($(this).val());
         var DeptId= parseInt($(this).val());

         userRecords= userRecords.filter(function(items){
             return (items.deptId==DeptId || items.WebPartName=='Tech Admin' || items.WebPartName=='Hr Admin');
         })


         $('#deptContributors').empty();
         $('#headOfDepartment').empty();
         emprtyDepartmentBox();
         $('#otherDeptContributors').empty();
         $('#readerOtherDept').empty();
         EmptyPeoplePicker('serchUser');
         $("#deptsiteurl").val(SiteURL);        
         var departmentID = $(this).val();
         GetDepartmentalApprovers(departmentID);
    });
    
    ///////////////////Department//////
    $('#btnSubmit_DepartmentDocument').click(function () {
        $.ajax({
            cache: false,
            beforeSend: function() {
            $("#overlaysearch").fadeIn();
            },
            success: function(data) {

                if (CheckDepartmentDocuments()) {
                    var departmentId = $('#ddlDepartments').val()
                    currentDepartmentID=$('#ddlDepartments').val()
                    $("body").css("cursor", "progress");
                    
                    if (departmentId != 0 && $('#departmentWebPartDiv').hasClass('d-none')==false) {
                        if ($("#toggleSuggestionApp").hasClass("active")== false) {
                            var approverIdArray =SuggestionApprover 
                            if (approverIdArray.length > 0) {

                            } else {
                                alert('Please enter Suggestion approver name.');
                                waitingDialog.hide();
                                return false;
                            }
                        }
                        if ($("#toggleInitiativeApp").hasClass("active") == false) {
                            var approverIdArray =g_NewApprover
                            if (approverIdArray.length > 0) {

                            } else {
                                alert('Please enter Initiative approver name.');
                                waitingDialog.hide();
                                return false;
                            }
                        }            
                        if ($("#toggleActivityApp").hasClass("active") == false) {
                            var approverIdArray =g_ActivityApprover
                            if (approverIdArray.length > 0) {

                            } else {
                                alert('Please enter Activity approver name.');
                                waitingDialog.hide();
                                return false;
                            }
                        }
                        if ($("#toggleKnowledgeApp").hasClass("active") == false) {
                            var approverIdArray =KnowledgeApprover
                            if (approverIdArray.length > 0) {

                            } else {
                                alert('Please enter knowledge approver name.');
                                waitingDialog.hide();
                                return false;
                            }
                        }
                        /*-------document approver ----*/
                        /*if ($("#toggleDocumentApp").hasClass("active") == false) {
                            var approverIdArray =g_DocumentApp
                            if (approverIdArray.length > 0) {

                            } else {
                                alert('Please enter document approver name.');
                                waitingDialog.hide();
                                return false;
                            }
                        }*/
                    }
                    if (departmentId != 0) {       

                        $.when(DepartmentDocuments(), DepartmentDocumentAccess(),HeadOfDepartment(),DepartmentNewInitiative(),DepartmentSuggestion(),DepartmentActivity(),DepartmentProject(),addDepartmentKnowledge()).done(function (MainExamListItemTemp) {
                            alert("Permission assigned successfully .");
                            waitingDialog.hide();
                        });
                    } else {
                        alert("Please select department .");
                    }
                } else {
                    if (IsAdminOrNot == false) {
                        alert(AdminWarning);
                    }

                    IsAdminOrNot = true;
                }

                $("#overlaysearch").fadeOut();
            }
        });
        
        

    });


}

function GetSiteURL(departmentId) {
    var SiteURL='';
    var currentCompanyid=Logged_CompanyId;
    if (departmentId != null && departmentId != "") {
            SiteURL=g_DeptSiteUrl.filter(function(items){
            return items.DeptId==departmentId;
        })
    } 
    else {
        var query = "?$select=ID,SiteURL&$filter=ID eq '" + currentCompanyid + "'";
        var ListName = "Companies";
        $.when(GetCompanySiteURL(ListName, query)).done(function (MainExamListItemTemp) {
            if (MainExamListItemTemp.length > 0) {
                SiteURL = MainExamListItemTemp[0].SiteURL;
            }
        });

    }   
    
    return SiteURL;
}

function InitializePeoplePicker(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '100%';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function FillAccountName(ControlId, UsersValues) {

    try {

        for (var i = 0; i < UsersValues.length; i++) {
            var UserId = UsersValues[i];
             UserId = UserId.get_lookupId();
            GetAccountName(ControlId, UsersValues);
        }
    } catch (err) {

    }
}


function GetAccountName(userControlId, userLookUpId) {


    var context = SP.ClientContext.get_current();
    var user = context.get_web().getUserById(userLookUpId);
    context.load(user);
    context.executeQueryAsync(
        function () {

            if (user.get_email() > 0) {
                setPeoplePickerUsersInfoCurrent(userControlId, user.get_email());
            } else {
                setPeoplePickerUsersInfoCurrent(userControlId, user.get_loginName());
            }

        },
        function (sender, args) {
            //todo errorhandling
            console.log('Error while receiving the properties from the UserProfile');

        }
    );
}


function setPeoplePickerUsersInfoCurrent(id, LoginName) {

    //var fieldName = id + '_TopSpan';
    var peoplePickerDiv = $("[id$='" + id + "']");

    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];

    //var usersobject = ppobject.GetAllUserInfo();
    //var usersobject = peoplePicker.GetAllUserInfo();
    //usersobject.forEach(function (index) {
    //	peoplePicker.DeleteProcessedUser(usersobject[index]);
    //});
    peoplePicker.AddUserKeys(LoginName, false);
}

function onChangeTech(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_TechAdminArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#techAdminUser').scrollTop($('#techAdminUser')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                g_TechAdminArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Tech Admin',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromTech(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#techAdminUser").append(BindUser);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeProjectAdmin(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_ProjectArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#projectAdmin').scrollTop($('#projectAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                g_ProjectArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Project Admin',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromProject(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#projectAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeCustomer(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_ClientArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#CustomerManagementAdmin').scrollTop($('#CustomerManagementAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                g_ClientArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'ClientMaster',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromClient(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#CustomerManagementAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}


function onChangeHr(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_HrAdminArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#hrAdmin').scrollTop($('#hrAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_HrAdminArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Hr Admin',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromHr(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#hrAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeProcess(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_ProcessArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#processAdmin').scrollTop($('#processAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_ProcessArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Process Admin',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromProcess(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#processAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}



/*-----------------------Intranet picker onChange functionality--------------------------------------------------*/
function onChangeBanner(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_informationArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#informationAdmin').scrollTop($('#informationAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_informationArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Banners',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeBanner(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#informationAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeBannerApprover(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            BannersApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#informationApprover').scrollTop($('#informationApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                BannersApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'BannersApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeBannerApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#informationApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeAnnouncement(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_AnnouncementsArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#announcementsAdmin').scrollTop($('#announcementsAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_AnnouncementsArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Announcements',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAnnouncement(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#announcementsAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeAnnouncementApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            announcementApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#announcementApprover').scrollTop($('#announcementApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                announcementApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'announcementApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAnnounceApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#announcementApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeAlert(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_AlertArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#alertAdmin').scrollTop($('#alertAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_AlertArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Emergency Annoucements',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAlert(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#alertAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeAlertApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            AlertApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#AlertApprover').scrollTop($('#AlertApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                AlertApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Emergency Annoucements',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAlertApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#AlertApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeEvent(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_eventAdminArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#eventAdmin').scrollTop($('#eventAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_eventAdminArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Events',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeEvent(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#eventAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

/*function onChangeEvent(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_eventAdminArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#eventAdmin').scrollTop($('#eventAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_eventAdminArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Events',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeEvent(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#eventAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}*/

function onChangeEventApprover(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            EventApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#EventApprover').scrollTop($('#EventApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                EventApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'EventApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeEventApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#EventApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeSuevey(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_PollsArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#surveyAdmin').scrollTop($('#surveyAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_PollsArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Polls',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removePolls(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#surveyAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeSueveyApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            SurveyApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#SurveyApprover').scrollTop($('#SurveyApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                SurveyApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'SurveyApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removePollsApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#SurveyApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeRecogination(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_RecognitionArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#recognitionAdmin').scrollTop($('#recognitionAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_RecognitionArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Recognition',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeRecogination(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#recognitionAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeRecoginationApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            RecoginitionApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#RecoginitionApprover').scrollTop($('#RecoginitionApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                RecoginitionApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'RecoginitionApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeRecoginationApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#RecoginitionApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeExperence(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_GeneralArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#ExperienceAdmin').scrollTop($('#ExperienceAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_GeneralArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'General',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeExperience(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#ExperienceAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}


function onChangeExperenceApprov(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            ExperienceApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#ExperienceApprover').scrollTop($('#ExperienceApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                ExperienceApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'ExperienceApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeExperienceApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#ExperienceApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}


function onChangeQuestion(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_QuestionAnswerArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#questionsAdmin').scrollTop($('#questionsAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_QuestionAnswerArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'QuestionAnswer',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeQuestion(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#questionsAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeQuestionApproval(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            QuestionApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#QuestionApprover').scrollTop($('#QuestionApprover')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                QuestionApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'QuestionApprover',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeQuestionApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#QuestionApprover").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeMagazine(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_MagazineArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#magazineAdmin').scrollTop($('#magazineAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_MagazineArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Media Gallery',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeMagazine(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#magazineAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeMedia(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_MediaGalleryArr.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                $('#mediaGalleryAdmin').scrollTop($('#mediaGalleryAdmin')[0].scrollHeight);
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SharingUserEmail.push(tempEmail);
                g_MediaGalleryArr.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Media',
                        deptId:0,
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeMedia(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#mediaGalleryAdmin").append(BindUser);
                EmptyPeoplePicker(PplPickerId);

            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}


/*-----------------------End----------------------------------------*/
function onChangeDeptContributors(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_Contributors.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_Contributors.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'DeptContri',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromContributors(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $('#deptContributors').scrollTop($('#deptContributors')[0].scrollHeight);
                $("#deptContributors").append(BindUser);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeHeadOfDept(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_HOD.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_HOD.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'HOD',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromHOD(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#headOfDepartment").append(BindUser);
                $('#headOfDepartment').scrollTop($('#headOfDepartment')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeOtherDept(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_OtherDeptContri.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_OtherDeptContri.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'OtherDeptContri',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromContributorsOfOtherDept(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#otherDeptContributors").append(BindUser);
                $('#otherDeptContributors').scrollTop($('#otherDeptContributors')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeDepartProject(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_DepartmentalProject.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_DepartmentalProject.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Project',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeDeptProject(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#projectAdminDertmental").append(BindUser);
                $('#projectAdminDertmental').scrollTop($('#projectAdminDertmental')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeDocumentApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_DocumentApp.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_DocumentApp.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'DocumentApprovers',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeDocApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#allApprovers").append(BindUser);
                $('#allApprovers').scrollTop($('#allApprovers')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeNewInitiative(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_NewInitiative.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_NewInitiative.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'New Initiative',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeNewInitiative(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#NewInitiativeAdmin").append(BindUser);
                $('#NewInitiativeAdmin').scrollTop($('#NewInitiativeAdmin')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChangeNewInitiativeApprovers(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_NewApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_NewApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'NewApprover',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeInitiativeApp(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#initiativeApproval").append(BindUser);
                $('#initiativeApproval').scrollTop($('#initiativeApproval')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
function onChangeSuggesion(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_Suggesion.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_Suggesion.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Suggesion',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeSuggesion(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#SuggestionAdmin").append(BindUser);
                $('#SuggestionAdmin').scrollTop($('#SuggestionAdmin')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

function onChanSuggesionApprov(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            SuggestionApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                SuggestionApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'SuggestionApprover',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeSuggApprove(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#suggestionApproval").append(BindUser);
                $('#suggestionApproval').scrollTop($('#suggestionApproval')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}

//#region on change Activity

function onChangeActivity(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_Activity.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_Activity.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Activity',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeActivity(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#ActivityAdmin").append(BindUser);
                $('#ActivityAdmin').scrollTop($('#ActivityAdmin')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
//#endregion

//#region on change Activity Approvers


function onChangeActivityApprov(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_ActivityApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_ActivityApprover.push({
                    EMail:tempEmail,
                    deptId:$('#ddlDepartments').val(),
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'ActivityApprover',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeActivityApprov(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#ActivityApprover").append(BindUser);
                $('#ActivityApprover').scrollTop($('#ActivityApprover')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
//#endregion

//#region on change Knowledge Picker
function onChangeKnowledge(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_Knowledge.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_Knowledge.push({
                    EMail:tempEmail,
                    deptId:$('#ddlDepartments').val(),
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Knowledge',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeKnowledge(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#KnowledgeAdmin").append(BindUser);
                $('#KnowledgeAdmin').scrollTop($('#KnowledgeAdmin')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
//#endregion

//#region on change Knowledge Approvers

function onChangeKnowledgeApprov(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            KnowledgeApprover.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                KnowledgeApprover.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    deptId:$('#ddlDepartments').val(),
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'KnowledgeApprover',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeKnowledgeApp(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#KnowledgeApprover").append(BindUser);
                $('#KnowledgeApprover').scrollTop($('#KnowledgeApprover')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}
//#endregion

function onChangeReader(HTMLID, PplPickerId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            var userCheck=false;
            g_Readers.forEach(function(data){
                if(data.EMail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    userCheck=true;
                }
            })
            if(userCheck==false)
            {
                BindUser = '';
                tempUserId = parseInt(getUserInformation(PplPickerId));
                SharingUserId.push(tempUserId);
                var tempEmail = userInfo[0].Key.split('|')[2];
                ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                g_Readers.push({
                    EMail:tempEmail,
                    Id:tempUserId,
                    UserName:userInfo[0].DisplayText
                });
                userRecords.push(
                    {
                        EMail:tempEmail,
                        WebPartName:'Redear',
                        deptId:$('#ddlDepartments').val(),
                        Id:tempUserId,
                        UserName:userInfo[0].DisplayText
                    }
                )
                SharingUserEmail.push(tempEmail);
                SharingUserName.push(userInfo[0].DisplayText);
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';
                
                //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
                BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromReader(this, \'' + tempEmail + '\');"><i class="fa fa-times"></i></button>';

                BindUser += '</div></div></div></div>';
                $("#readerOtherDept").append(BindUser);
                $('#readerOtherDept').scrollTop($('#readerOtherDept')[0].scrollHeight);
                EmptyPeoplePicker(PplPickerId);
            }
            else
            {
                alert('User '+userInfo[0].DisplayText +' already exists');
                EmptyPeoplePicker(PplPickerId);
            }
            
        }
        else {
            //$("#userList").hide();
        }
    };
}




//get user information from people picker
function getUserInformation(PeoplepickerId, multipleEmailAddress, assignUserName, StepCount) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            // Get information about all users.  
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                // UsersID += GetUserID(users[i].Key);
                var accountName = users[i].Key;
                users[i].EntityData.Email; users[i].DisplayText;
                var userId = GetUserID(accountName);
                if (userId != -1) {
                    if (uniqueValues.indexOf(userId) == -1) {
                        uniqueValues.push(userId);
                        userIds.push(userId);
                    }
                }
                else {
                    userIds.push(parseInt(users[i].EntityData.SPGroupID));
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}

// Get the user ID.
function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }
    var userId = -1;
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            userId = data.d.Id;
        },
        error: function (data) {
            console.log(data)
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    })
    return userId;

}

//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// Bind Departments ///////////////////////////////////////////////
g_DeptSiteUrl=[];
function BindDepartments() {
    var ListName = "Departments";
    var companyId =Logged_CompanyId;
    var dfd = $.Deferred();    
    var webURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/items?$select=ID,SiteURL,DepartmentName,CompanyID/ID&$expand=CompanyID&$filter=CompanyID/ID eq '" + companyId + "'";
    $.ajax({
        url: webURL,
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            var ddlDepartments = document.getElementById("ddlDepartments");
            var items ='';
            if(data.d.results.length>0){
                var LoggedDepartment=data.d.results.filter(function(data)
                {
                   if(data.ID==Logged_DepartmentId)
                   {
                      items += "<option value = '" +data.ID+ "' data-tokens='"+data.DepartmentName+"'>" +data.DepartmentName+ " </option>"
                   }
                
                })
            }    
            
            $.each(data.d.results, function (i, item) {                
                //items += "<option value = '" +item.ID+ "'>" +item.DepartmentName+ " </option>"
                if(item.ID != Logged_DepartmentId){
                  items += "<option value = '" +item.ID+ "' data-tokens='"+item.DepartmentName+"'>" +item.DepartmentName+ " </option>"              
                }
                g_DeptSiteUrl.push({
                    DeptId:item.ID,
                    DeptSiteUrl:item.SiteURL
                })
            })
            $("#ddlDepartments").append(items);            
            dfd.resolve(true);

        },
        error: function (result) {
            alert("Error in Bind Departments method.");

            dfd.reject(result);
        }
    })

    return dfd.promise();
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//************************************ Permissions Logic for Company *******************************************//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Get Company Approvers /////////////////////////////////////////
var g_ApprovalItems='';
var g_TechAdminArr=[];
var g_HrAdminArr=[];
var g_ProcessArr=[];
var g_ProjectArr=[];
var g_ClientArr=[];
var g_AnnouncementsArr=[];
var g_AlertArr=[];
var g_RecognitionArr=[];
var g_eventAdminArr=[];
var g_PollsArr=[];
var g_informationArr=[];
var g_QuestionAnswerArr =[];
var g_GeneralArr=[];
var g_MediaGalleryArr=[];
var g_MagazineArr=[];
var QuestionApprover=[];
var announcementApprover=[];
var AlertApprover=[];
var BannersApprover=[];
var RecoginitionApprover=[];
var EventApprover=[];
var ExperienceApprover=[];
var SurveyApprover=[];
function getCompanyApprovers(){
    var siteUrl=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getBytitle('ProcessApprovers')/items?$select=*,Approver/Title,Approver/EMail,Approver/Id,Approver/UserName,Owner/Title,Owner/EMail,Owner/Id,Owner/UserName,Contributors/Title,Contributors/Id,Contributors/UserName,Contributors/EMail&$expand=Approver,Contributors,Owner&$filter=CompanyId eq '"+Logged_CompanyId+"'";
    $.ajax({
        url:siteUrl,
        //headers:{"ACCEPT":"application/json;odata=verbose"},
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        async:false,
        success:function(data){
            var results=data.d.results;
            g_ApprovalItems=results;
            for(let i=0;i<results.length;i++)
            {
                var scope=results[i].Scope;
                var ApproverRequired=results[i].ApproverRequired;
                if(results[i].WebPartName =='Tech Admin')
                {
                    var Contributors=results[i].Contributors;
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_TechAdminArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Tech Admin',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromTech(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#techAdminUser").append(BindUser);
                        })
                    }
                    
                }
                else if(results[i].WebPartName =='Process Admin')
                {
                    var Contributors=results[i].Contributors;
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_ProcessArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Process Admin',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromProcess(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#processAdmin").append(BindUser);
                        })
                    }
                    
                }
                else if(results[i].WebPartName =='Project Admin')
                {
                    var Contributors=results[i].Contributors;
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_ProjectArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Project Admin',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromProject(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#projectAdmin").append(BindUser);
                        })
                    }
                    
                }
                else if(results[i].WebPartName =='ClientMaster')
                {
                    var Contributors=results[i].Contributors;
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_ClientArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'ClientMaster',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeFromClient(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#CustomerManagementAdmin").append(BindUser);
                        })
                    }
                    
                }
                else if(results[i].WebPartName =='Announcements')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleGeneralAnnouncement").addClass("active");
                        ChrckGeneralAnnouncement();
                    }                    
                    if (ApproverRequired ==false) {
                        $("#tglannouncementApprover").addClass("active");
                        $(".announcement-approval-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_AnnouncementsArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Announcements',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAnnouncement(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#announcementsAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            announcementApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'announcementApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAnnounceApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#announcementApprover").append(BindUser);
                        })
                    }

                }
                else if(results[i].WebPartName =='Banners')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleNews").addClass("active");
                        ChrckToggleNews();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglinformationApprover").addClass("active");
                        $(".approval-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_informationArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Banners',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeBanner(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#informationAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            BannersApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'BannersApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeBannerApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#informationApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='Emergency Annoucements')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleEmergencyAnnouncement").addClass("active");
                        ChrckEmergencyAnnouncement();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglAlertApprover").addClass("active");
                        $(".alert-approval-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_AlertArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Emergency Annoucements',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAlert(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#alertAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            AlertApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'AlertApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeAlertApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#AlertApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='Events')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleEvents").addClass("active");
                        ChrckEvents();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglEventApprover").addClass("active");
                        $(".events-approval-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_eventAdminArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Events',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeEvent(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#eventAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            EventApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'EventApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeEventApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#EventApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='Recognition')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleRecognition").addClass("active");
                        ChrckRecognition();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglRecoginitionApprover").addClass("active");
                        $(".recognition-approval-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_RecognitionArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Recognition',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeRecogination(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#recognitionAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            RecoginitionApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'RecoginitionApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeRecoginationApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#RecoginitionApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='Polls')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#togglePolls").addClass("active");
                        ChrckPolls();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglSurveyApprover").addClass("active");
                        $(".Survey-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_PollsArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Polls',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removePolls(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#surveyAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            SurveyApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'SurveyApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removePollsApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#SurveyApprover").append(BindUser);
                        })
                    }


                }
                else if(results[i].WebPartName =='General')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleExperience").addClass("active");
                        ChrckExperience();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglExperienceApprover").addClass("active");
                        $(".experienc-required-yes").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_GeneralArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'General',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeExperience(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#ExperienceAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            ExperienceApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'ExperienceApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeExperienceApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#ExperienceApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='QuestionAnswer')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleQuestionAnswer").addClass("active");
                        //$("#mediaGalleryBox").addClass("d-none");
                        ChrckQuestionAnswer();
                    }
                    if (ApproverRequired ==false) {
                        $("#tglQuestionApprover").addClass("active");
                        $("#QuestionApproverBox").toggleClass("d-none");
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_QuestionAnswerArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'QuestionAnswer',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeQuestion(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#questionsAdmin").append(BindUser);
                        })
                    }
                    
                    if(results[i].ApproverId!=null)
                    {
                        results[i].Approver.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            QuestionApprover.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            })
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'QuestionApprover',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeQuestionApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                            BindUser += '</div></div></div></div>';
                            $("#QuestionApprover").append(BindUser);
                        })
                    }
                }
                else if(results[i].WebPartName =='Media Gallery')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleMagazine").addClass("active");
                        //$("#magazineBox").addClass("d-none");        
                        ChrcktoggleMagazine();
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_MagazineArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Media Gallery',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeMagazine(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#magazineAdmin").append(BindUser);
                        })
                    }
                    
                }
                else if(results[i].WebPartName =='Media')
                {
                    var Contributors=results[i].Contributors;
                    if (scope == "EVERYONE" || scope == "Everyone") {
                        $("#toggleMediaGallery").addClass("active"); 
                        //$("#mediaGalleryBox").addClass("d-none");       
                        ChrcktoggleMediaGallery();
                    }
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_MediaGalleryArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Media',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';                        
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeMedia(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#mediaGalleryAdmin").append(BindUser);
                        })
                    }
                    
                }

                else if(results[i].WebPartName =='HR Admin')
                {
                    var Contributors=results[i].Contributors;
                    if(results[i].ContributorsId!=null)
                    {
                        Contributors.results.forEach(function(Items){
                            var email=Items.EMail;
                            var userName=Items.Title;
                            var userId=Items.Id;
                            g_HrAdminArr.push({
                                EMail:email,
                                Id:userId,
                                UserName:userName
                            });
                            userRecords.push(
                                {
                                    EMail:email,
                                    WebPartName:'Hr Admin',
                                    deptId:0,
                                    Id:userId,
                                    UserName:userName
                                }
                            )
                            var BindUser='';
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                            BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';
                            
                            //BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                            BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                            BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                            BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromHr(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';
                
                            BindUser += '</div></div></div></div>';
                            $("#hrAdmin").append(BindUser);
                        })
                    }
                    
                }
                
            }

        },
        error:function(error){
            alert(error);
        }

    })
}



function CheckAdminBlock() {
    var AllEmployeeuser = [];
    var RestQuery;
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= Status eq 'Active' and Company/ID eq '" + companyId + "'   &$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {
        try {
            for (var i = 0; i < Employees.results.length; i++) {
                AllEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'Department': Employees.results[i].Department.ID,
                    'UserEmail':Employees.results[i].Email
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    AdminWarning = "";
    SuperAdminWaring = "";
    if (g_TechAdminArr.length > 0) {
        for (var j = 0; j < g_TechAdminArr.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLowerCase() == g_TechAdminArr[j].EMail.toLowerCase() || filterData.UserEmail.toLowerCase()==g_TechAdminArr[j].EMail.toLowerCase();
            }); 
            if (arrSubVisaLetters < 1) {
                AdminWarning += g_TechAdminArr[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Tech Admin. \n ";
            IscheckMessage = false;
        }
    }
    else {
        alert('Please enter Tech AdminContributor name.');
        waitingDialog.hide();
        return false;
    }    
    var users =g_HrAdminArr;
    if (users.length > 0) {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLowerCase() == users[j].EMail.toLowerCase() || filterData.UserEmail.toLowerCase()==g_TechAdminArr[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as HR Admin. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter HR Admin Contributor name.');
        waitingDialog.hide();
        return false;
    }
    if (g_ProcessArr.length > 0 && $('#processAdminDiv').hasClass('d-none')==false) {
        for (var j = 0; j < g_ProcessArr.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLowerCase() == g_ProcessArr[j].EMail.toLowerCase() || filterData.UserEmail.toLowerCase()==g_TechAdminArr[j].EMail.toLowerCase();
            }); 
            if (arrSubVisaLetters < 1) {
                AdminWarning += g_ProcessArr[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Process Admin. \n ";
            IscheckMessage = false;
        }
    }
    else {
        if(IsBpassModules==true || IsDMSModules==true)
        {
            alert('Please enter Process Admin Contributor name.');
            waitingDialog.hide();
            return false;
        }
        
    }
    if (g_ClientArr.length > 0) {
        for (var j = 0; j < g_ClientArr.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLowerCase() == g_ClientArr[j].EMail.toLowerCase() || filterData.UserEmail.toLowerCase()==g_ClientArr[j].EMail.toLowerCase();
            }); 
            if (arrSubVisaLetters < 1) {
                AdminWarning += g_ClientArr[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Customer Management. \n ";
            IscheckMessage = false;
        }
    }
    else {
        alert('Please enter Customer Contributor name.');
        waitingDialog.hide();
        return false;
    }
    if(IsTaskModules==true){
	    if (g_ProjectArr.length > 0) {
	        for (var j = 0; j < g_ProjectArr.length; j++) {
	            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
	                return filterData.EMail.toLowerCase() == g_ProjectArr[j].EMail.toLowerCase() || filterData.UserEmail.toLowerCase()==g_ProjectArr[j].EMail.toLowerCase();
	            }); 
	            if (arrSubVisaLetters < 1) {
	                AdminWarning += g_ProjectArr[j].UserName + ",";
	                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
	                IsAdminOrNot = false;
	                IscheckMessage = true;
	            }
	
	        }
	        if (IscheckMessage) {
	            AdminWarning += " is not an active user.\n Can not be assigned as Project Admin. \n ";
	            IscheckMessage = false;
	        }
	    }
	    else {
	        alert('Please enter Project Admin Contributor name.');
	        waitingDialog.hide();
	        return false;
	    }
    }

    return IsAdminOrNot
}


function TechAdmin() {
    //var deferred = $.Deferred();
    var listCollectionArray = new Array();
    listCollectionArray.push("Employees");
    listCollectionArray.push("Companies");
    listCollectionArray.push("OfficeLocation");
    listCollectionArray.push("Departments");
    listCollectionArray.push("ProcessApprovers");
    listCollectionArray.push("ThoughtOfTheDay");
    listCollectionArray.push("TipOfTheDay");
    listCollectionArray.push("LabelsSettings");
    listCollectionArray.push("SocialMediaSettings");
    listCollectionArray.push("LanguageSetting");
    listCollectionArray.push("ThemePictures");
    listCollectionArray.push("ThemeSettings");
    listCollectionArray.push("ThemeSettings");
    listCollectionArray.push("ApplicationLink");

    
    var contributorsIdArray =[]
    g_TechAdminArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
        //return contributorsIdArray ;
    })
    
    
    var limitedAccessIdArray =[];
    g_HrAdminArr.forEach(function(data){
        limitedAccessIdArray .push(data.Id); 
        return limitedAccessIdArray;
    })
    var approverIdArray = new Array(); // ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    var webPartName = "Tech Admin";
    var departmentId = "";
    var myDocumentsiteURL = _spPageContextInfo.webAbsoluteUrl;
    var usersPermissionAllowded = new Array();
    for (var index = 0; index < contributorsIdArray.length; index++) {
        usersPermissionAllowded.push(contributorsIdArray[index]);
    }
    for (var index = 0; index < limitedAccessIdArray.length; index++) {
        usersPermissionAllowded.push(limitedAccessIdArray[index]);
    }
    var ownerIdArray = [];
    limitedAccessIdArray = [];

    //var pickerDiv = $("[id^='TechAdmin_Company']");
    //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    //var users = peoplePicker.GetAllUserInfo();
    var users=[];
    g_TechAdminArr.forEach(function(data){
        users.push(data.EMail);
        return users;
    })

    GetGroupIDByGroupName();
    addUserToSharePointGroup(users);

    CommonServiceForRootSite(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded, ownerIdArray, true);


}

function ProjectAdmin() {
    if(IsTaskModules==true)
    {
        //var deferred = $.Deferred();
        var listCollectionArray = new Array();
        var contributorsIdArray = []//ListCommonService.getMultiPeoplePickerUserInfo("ProjectAdmin_Company");
        g_ProjectArr.forEach(function(data){
            contributorsIdArray.push(data.Id)
            //return contributorsIdArray ;
        })
        var limitedAccessIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
        var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
        var webPartName = "Project Admin";
        var departmentId = "";
        var myDocumentsiteURL = _spPageContextInfo.webAbsoluteUrl;
        var ownerIdArray = [];
        var users=[];
        g_ProjectArr.forEach(function(data){
            users.push(data.EMail);
            return users;
        })
        GetGroupIDByGroupName();
        addUserToSharePointGroup(users);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, false);
        //deferred.resolve(true);
        return true;
    }
    return true;
    
}
function CompanyClientMaster() {
    var listCollectionArray = new Array();
    listCollectionArray.push("PollsDetails"); //Admin company based
    var contributorsIdArray =[]; //ListCommonService.getMultiPeoplePickerUserInfo("ClientMasterContributors_Company");
    g_ClientArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
        //return contributorsIdArray ;
    })
    var limitedAccessIdArray =[];// ListCommonService.getMultiPeoplePickerUserInfo("ClientMasterLimitedAccess_Company");

    var approverIdArray = new Array(); // ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    var webPartName = "ClientMaster";
    var departmentId = "";
    var myDocumentsiteURL =_spPageContextInfo.webAbsoluteUrl //GetSiteURL("");
    var ownerIdArray = [];
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true);
}



function HRAdmin() {
    var listCollectionArray = new Array();
    var contributorsIdArray =[]
    g_HrAdminArr.forEach(function(data){
        contributorsIdArray.push(data.Id);
    })
    var limitedAccessIdArray = new Array();
    var approverIdArray = new Array();
    var webPartName = "HR Admin";
    var departmentId = "";
    var myDocumentsiteURL = _spPageContextInfo.webAbsoluteUrl;
    var ownerIdArray = [];    
    var users=[];
    g_HrAdminArr.forEach(function(data){
        users.push(data.EMail);
        return users;
    })

    GetGroupIDByGroupName();
    addUserToSharePointGroup(users);
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, false);

}

function ProcessAdmin() {
    if(IsBpassModules==true || IsDMSModules==true)
    {
        var listCollectionArray = new Array();
        var contributorsIdArray =[]
        g_ProcessArr.forEach(function(data){
            contributorsIdArray.push(data.Id);
        })
        var limitedAccessIdArray = new Array();
        var approverIdArray = new Array();
        var webPartName = "Process Admin";
        var departmentId = "";
        var myDocumentsiteURL = _spPageContextInfo.webAbsoluteUrl;
        var ownerIdArray = [];    
        var users=[];
        g_ProcessArr.forEach(function(data){
            users.push(data.EMail);
            return users;
        })
        GetGroupIDByGroupName();
        addUserToSharePointGroup(users);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, false);

    }
    
}

function addUserToSharePointGroup(ownerIdArray) {
    for (var j = 0; j < ownerIdArray.length; j++) {
        addUser(ownerIdArray[j])
    }
}

function addUser(owner) {
    var user='i:0#.f|membership|'+owner;
    var clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
    var collGroup = clientContext.get_web().get_siteGroups();
    var oGroup = collGroup.getById(groupID);

    var userCreationInfo = new SP.UserCreationInformation();
    //    userCreationInfo.set_email(ownerIdArray[j].Description);
    userCreationInfo.set_loginName(user);
    this.oUser = oGroup.get_users().add(userCreationInfo);
    clientContext.load(oUser);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceeded(data) {
  console.log(data);
}

function onQueryFailed(sender, args) {
 console.log('Permission error');
}


var groupID = "";
function GetGroupIDByGroupName() {
    var groupName = "Owners";
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('" + groupName + "')?$select=*";
    $.ajax({
        url: url,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {

            groupID = data.d.Id;
        },
        error: function (data) {
            console.log(data);

        }
    });
return groupID;
};


function CommonServiceForRootSite(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded, ownerIdArray, breakPerimission) {
    //waitingDialog.show();
    var ListName = "ProcessApprovers";
    var itemID = ValidateExistingPermissionProcessApprover(ListName, currentCompanyid, departmentId, webPartName);
    var Metadata = GenerateMetaData(ListName, currentCompanyid, departmentId, webPartName, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray);
    if (itemID == "") {
        $.when(ListCommonService.AddItemToList(ListName, Metadata)).done(function (MainExamListItemTemp) {
            if (breakPerimission == true) {
                for (var index = 0; index < listCollectionArray.length; index++) {
                    // BreakInheritePermissionOnItem(myDocumentsiteURL, listCollectionArray[index], approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded);
                }
            }

        });
    } else {
        $.when(ListCommonService.updateItemWithID(ListName, Metadata, itemID)).done(function (MainExamListItemTemp) {
            if (breakPerimission == true) {
                for (var index = 0; index < listCollectionArray.length; index++) {
                    // BreakInheritePermissionOnItem(myDocumentsiteURL, listCollectionArray[index], approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded);
                }
            }
        });
    }
}

function CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, breakPerimission, Scope) {
    var usersPermissionAllowded = "";
    //waitingDialog.show();
    var ListName = "ProcessApprovers";
    var itemID = ValidateExistingPermissionProcessApprover(ListName, currentCompanyid, departmentId, webPartName);
    var Metadata = GenerateMetaData(ListName, currentCompanyid, departmentId, webPartName, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, Scope);
    if (itemID == "") {
        $.when(ListCommonService.AddItemToList(ListName, Metadata)).done(function (MainExamListItemTemp) {
            if (breakPerimission == true) {
                for (var index = 0; index < listCollectionArray.length; index++) {
                    // BreakInheritePermissionOnItem(myDocumentsiteURL, listCollectionArray[index], approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded);
                }
            }

        });
    } else {
        $.when(ListCommonService.updateItemWithID(ListName, Metadata, itemID)).done(function (MainExamListItemTemp) {
            if (breakPerimission == true) {
                for (var index = 0; index < listCollectionArray.length; index++) {
                    //  BreakInheritePermissionOnItem(myDocumentsiteURL, listCollectionArray[index], approverIdArray, limitedAccessIdArray, contributorsIdArray, usersPermissionAllowded);
                }
            }
        });
    }
}

function ValidateExistingPermissionProcessApprover(ListName, companyId, departmentId, webpartName) {
    var itemID = "";
    var departmentQuery = "";
    if (departmentId != null && departmentId != "") {
        departmentQuery = " and DepartmentId eq '" + departmentId + "'";
    }
    var query = "?$select=ID,WebPartName,CompanyId,DepartmentId&$filter=CompanyId eq '" + companyId + "' and  WebPartName eq '" + webpartName + "'" + departmentQuery;
    $.when(ListCommonService.getItemsWithQuery(ListName, query)).done(function (MainExamListItemTemp) {
        if (MainExamListItemTemp.length > 0) {
            itemID = MainExamListItemTemp[0].Id;
        }
    });
    return itemID;
}


function GenerateMetaData(ListName, companyId, departmentId, webPartName, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, Scoprvalue) {

    var approverRequiredFlag = false;
    var Scopevalue=Scoprvalue;
    if (approverIdArray.length == 0) {
        approverIdArray = [];
    }
    if (limitedAccessIdArray.length == 0) {
        limitedAccessIdArray = [];
    }
    if (contributorsIdArray.length == 0) {
        contributorsIdArray = [];
    }
    if (ownerIdArray.length == 0) {
        ownerIdArray = [];
    }   
    
    if(webPartName=='Documents' || webPartName=='DepartmentDocument_Access')
    {
        /*Scopevalue= $('input[name="UpdateEmp"]:checked').val()
        if(Scopevalue=='3')
        {
            Scopevalue='Everyone';    
        }
        if(Scopevalue=='4')
        {
            Scopevalue='HOD'    
        }*/
        if($('#toggleDocument').hasClass('active'))Scopevalue='EVERYONE';
    }
    /*else if (webPartName == "Suggesion") {
        if ($('#toggleSuggestionApp').hasClass("active") == false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }

    }*/ else if (webPartName == "Banners") {
        if ($("#tglinformationApprover").hasClass("active") ==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    } /*else if (webPartName == "Activity") {
        if ($('#toggleActivityApp').hasClass("active")== false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }*/
    else if (webPartName == "Announcements") {
        if ($("#tglannouncementApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    } 
    else if (webPartName == "Emergency Annoucements") {
        if ($("#tglAlertApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Events") {
        if ($("#tglEventApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Polls") {
        if ($("#tglSurveyApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }

    else if (webPartName == "General") {
        if ($("#tglExperienceApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "QuestionAnswer") {
        if ($("#tglQuestionApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }

    else if (webPartName == "Recognition") {
        if ($("#tglRecoginitionApprover").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Documents") {
        if ($("#toggleDocumentApp").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "New Initiative") {
        if ($("#toggleInitiativeApp").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Suggesion") {
        if ($("#toggleSuggestionApp").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Activity") {
        if ($("#toggleActivityApp").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else if (webPartName == "Knowledge") {
        if ($("#toggleKnowledgeApp").hasClass("active")==false) {
            approverRequiredFlag = true;
        } else {
            approverIdArray = [];
        }
    }
    else{
        approverRequiredFlag = false
    }




    if (approverIdArray.length == 0) {
        approverIdArray = [];
    }
    if (limitedAccessIdArray.length == 0) {
        limitedAccessIdArray = [];
    }
    if (contributorsIdArray.length == 0) {
        contributorsIdArray = [];
    }
    if (ownerIdArray.length == 0) {
        ownerIdArray = [];
    }
    
    
    

    var Metadata;
    var ItemType = ListCommonService.GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        CompanyId: companyId,
        DepartmentId: departmentId,
        WebPartName: webPartName,
        Scope:Scopevalue,
        ApproverId: {
            'results': approverIdArray
        },
        LimitedAccessId: {
            'results': limitedAccessIdArray
        },
        ContributorsId: {
            'results': contributorsIdArray
        },
        OwnerId: {
            'results': ownerIdArray
        },
        ApproverRequired: approverRequiredFlag
    };

    if (webPartName != "Documents" && webPartName != "Announcements" && webPartName != "Events" && webPartName != "Polls" && webPartName != "General" && webPartName !== "Banners" & webPartName != "QuestionAnswer" && webPartName != "Recognition" && webPartName != "Departmental Events" && webPartName != "Driver Request" && webPartName != "Suggesion" && webPartName != "New Initiative" && webPartName != "Activity" && webPartName!='Knowledge') {
        delete Metadata["ApproverRequired"];
        delete Metadata["OwnerId"];
    }
    if (departmentId == "" || departmentId == null) {
        delete Metadata["DepartmentId"];
    }

    return Metadata
}

//remove user from each step
function removeFromTech(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_TechAdminArr = g_TechAdminArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeFromProject(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_ProjectArr = g_ProjectArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeFromClient(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_ClientArr = g_ClientArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}

function removeUserFromHr(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_HrAdminArr = g_HrAdminArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeUserFromProcess(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_ProcessArr = g_ProcessArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
/*--------------Intarnet tab------------------------------*/
function removeAnnouncement(Action, Email){
    $(Action).parents('.parentremove').remove();
    g_AnnouncementsArr = g_AnnouncementsArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });
}
function removeAnnounceApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    announcementApprover = announcementApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeBanner(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_informationArr = g_informationArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeBannerApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    BannersApprover = BannersApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeAlert(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_AlertArr = g_AlertArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeAlertApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    AlertApprover = AlertApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeEvent(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_eventAdminArr = g_eventAdminArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeEventApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    EventApprover = EventApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removePolls(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_PollsArr = g_PollsArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removePollsApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    SurveyApprover = SurveyApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeRecogination(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_RecognitionArr = g_RecognitionArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeRecoginationApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    RecoginitionApprover = RecoginitionApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeExperience(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_GeneralArr = g_GeneralArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeExperienceApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    ExperienceApprover = ExperienceApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeQuestion(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_QuestionAnswerArr = g_QuestionAnswerArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeQuestionApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    QuestionApprover = QuestionApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeMedia(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_MediaGalleryArr = g_MediaGalleryArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeMagazine(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_MagazineArr = g_MagazineArr.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}


/*---------------------------End tab------------------------------------*/

function removeUserFromContributors(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_Contributors = g_Contributors.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeUserFromHOD(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_HOD = g_HOD.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeUserFromContributorsOfOtherDept(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_OtherDeptContri = g_OtherDeptContri.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });
    
}
function removeUserFromReader(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_Readers = g_Readers.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeDocApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_DocumentApp = g_DocumentApp.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeDeptProject(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_DepartmentalProject = g_DepartmentalProject.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeNewInitiative(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_NewInitiative = g_NewInitiative.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeInitiativeApp(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_NewApprover = g_NewApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeSuggesion(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_Suggesion = g_Suggesion.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeSuggApprove(Action, Email) {
    $(Action).parents('.parentremove').remove();
    SuggestionApprover = SuggestionApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeActivity(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_Activity = g_Activity.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeActivityApprov(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_ActivityApprover = g_ActivityApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeKnowledge(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_Knowledge = g_Knowledge.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}
function removeKnowledgeApp(Action, Email) {
    $(Action).parents('.parentremove').remove();
    g_KnowledgeApprover = KnowledgeApprover.filter(function (obj) {
        return obj.EMail.toLowerCase() !== Email.toLowerCase();
    });    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//********************************* Permissions Logic for Department   *******************************//
////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Departmental Approvers /////////////////////////////////////////

var g_Suggesion=[];
var g_NewInitiative=[];
var g_Knowledge=[];
var g_KnowledgeApprover=[]; 
var KnowledgeApprover=[];
var g_Activity=[];
var g_ActivityApprover=[];
var g_DepartmentalProject=[];
var g_DepartmentalProjectApprover=[];
var g_ActivityApprover=[];
var g_Discussion=[];
var g_NewApprover=[];
var SuggestionApprover=[];

function emptyArr()
{
    g_Contributors=[];
    g_HOD=[];
    g_Readers=[];
    g_OtherDeptContri=[];
    g_Suggesion=[];
    //g_informationArr=[];
    g_NewInitiative=[];
    g_Knowledge=[];
    g_KnowledgeApprover=[]; 
    KnowledgeApprover=[];
    g_Activity=[];
    g_ActivityApprover=[];
    g_DepartmentalProject=[];
    g_DepartmentalProjectApprover=[];
    g_ActivityApprover=[];
    g_Discussion=[];
    g_NewApprover=[];
    SuggestionApprover=[];
}

function GetDepartmentalApprovers(departmentId)
{
    var departmentValue=g_ApprovalItems.filter(function(data){
        return data.DepartmentId==departmentId && data.CompanyId==Logged_CompanyId //&& data.WebPartName=="Suggesion" && data.WebPartName=="New Initiative" && data.WebPartName=="Discussion" && data.WebPartName=="Knowledge" && data.WebPartName=="Activity" && data.WebPartName=="Project"
    })
    $('#ddlDepartments').val(departmentId);
    emptyArr();
    departmentValue.forEach(function(v){
        if(v.WebPartName=="Documents")
        {
            var Contributors=v.Contributors;
            if(v.Scope=='EVERYONE' || v.Scope == "Everyone")
            {
                $('#radioAllContr').prop('checked',true);
                $(".sharing-with-everyone-approvers").toggleClass("d-none");
                $("#toggleDocument").addClass("active");
                //ChrckDocument();
                $("#documentBox").addClass("d-none");
                if(v.ApproverRequired==false){
                    $('.contributors-approval-required-yes').toggleClass("d-none");
                    $('#toggleDocumentApp').addClass("active");                   

                }
            }
            else
            {
                //$('#radioHod').prop('checked',true);
                $("#toggleDocument").removeClass("active");
                $("#documentBox").removeClass("d-none");
            }

            if(v.ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_Contributors.push({
                        EMail:email,
                        Id:userId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'DeptContri',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromContributors(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#deptContributors").append(BindUser);
                })
            }
            
            var Owner=v.Owner;
            if(v.OwnerId!=null)
            {
                Owner.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_OtherDeptContri.push({
                        EMail:email,
                        Id:userId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'OtherDeptContri',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromContributorsOfOtherDept(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#otherDeptContributors").append(BindUser);
                })
            }
            var Documentapprover=v.Approver
            g_DocumentApp=[];
            if(v.ApproverId!=null)
            {
                v.Approver.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_DocumentApp.push({
                        EMail:email,
                        Id:userId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'DocumentApprovers',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeDocApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#allApprovers").append(BindUser);
                })
            }
        }
        if(v.WebPartName=="DepartmentDocument_Access")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_Readers.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'Redear',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromReader(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#readerOtherDept").append(BindUser);
                })
            }
            
            
        }
        if(v.WebPartName=="Project")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_DepartmentalProject.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'Project',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeDeptProject(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#projectAdminDertmental").append(BindUser);
                })
            }
            
            
        }
        if(v.WebPartName=="New Initiative")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(v.Scope=='EVERYONE' || v.scope == "Everyone"){
                $("#toggleInitiative").addClass("active");
                $("#NewInitiativeBox").addClass("d-none");                
            }
            else
            {
                $("#toggleInitiative").removeClass("active");
                $("#NewInitiativeBox").removeClass("d-none");
            }
            if(ContributorsId!=null)
            {
                
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_NewInitiative.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'New Initiative',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeNewInitiative(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#NewInitiativeAdmin").append(BindUser);
                })
            }
            var Approver=v.Approver;
            if(v.ApproverRequired==false)
            {
                $('#toggleInitiativeApp').addClass('active')
                $('.new-initiative-approval-required-yes').addClass('d-none');
            }
            else
            {
                $("#toggleInitiativeApp").removeClass("active");
                $(".new-initiative-approval-required-yes").removeClass("d-none");
            }            
            if(v.ApproverId!=null)
            {
                Approver.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_NewApprover.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'NewApprover',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeInitiativeApp(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#initiativeApproval").append(BindUser);
                })
            }
            
        }
        if(v.WebPartName=="Suggesion")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(v.ApproverRequired==false)
            {
                $('#toggleSuggestionApp').addClass('active')
                $('.suggestion-approval-required-yes').addClass('d-none');
            }
            else
            {
                $("#toggleSuggestionApp").removeClass("active");
                $(".suggestion-approval-required-yes").removeClass("d-none");
            }
            if(v.Scope=='EVERYONE' || v.Scope == "Everyone"){
                $("#toggleSuggestion").addClass("active");
                $("#SuggestionBox").addClass("d-none");
                //ChrckSuggestion()
            }
            else
            {
                $("#toggleSuggestion").removeClass("active");
                $("#SuggestionBox").removeClass("d-none");
            }
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_Suggesion.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'Suggesion',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeSuggesion(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#SuggestionAdmin").append(BindUser);
                })
            }
            var Approver=v.Approver;
            if(v.ApproverId!=null)
            {
                Approver.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    SuggestionApprover.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'SuggestionApprover',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeSuggApprove(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#SuggestionApprover").append(BindUser);
                })
            }
            
            
        }
        if(v.WebPartName=="Activity")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(v.ApproverRequired==false)
            {
                $('#toggleActivityApp').addClass('active')
                $('.activity-approval-required-yes').addClass('d-none');
            }
            else
            {
                $("#toggleActivityApp").removeClass("active");
                $(".activity-approval-required-yes").removeClass("d-none");
            }
            if(v.Scope=='EVERYONE' || v.Scope == "Everyone"){
                $("#toggleActivity").addClass("active");
                $("#ActivityBox").addClass("d-none");
                //ChrckActivity()
            }
            else
            {
                $("#toggleActivity").removeClass("active");
                $("#ActivityBox").removeClass("d-none");
            }
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_Activity.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'Activity',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeActivity(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#ActivityAdmin").append(BindUser);
                })
            }
            var Approver=v.Approver;
            if(v.ApproverId!=null)
            {
                Approver.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_ActivityApprover.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'ActivityApprover',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeActivityApprov(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#ActivityApprover").append(BindUser);
                })
            }
            
            
            
        }
        if(v.WebPartName=="Knowledge")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(v.ApproverRequired==false)
            {
                $('#toggleKnowledgeApp').addClass('active')
                $('.knowledge-approval-required-yes').addClass('d-none');
            }
            else
            {
                $("#toggleKnowledgeApp").removeClass("active");
                $(".knowledge-approval-required-yes").removeClass("d-none");
            }
            if(v.Scope=='EVERYONE' || v.Scope == "Everyone"){
                $("#toggleKnowledge").addClass("active");
                $("#KnowledgeBox").addClass("d-none");
                //ChrckKnowledge()
            }
            else
            {
                $("#toggleKnowledge").removeClass("active");
                $("#KnowledgeBox").removeClass("d-none");
            }
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_Knowledge.push({
                        EMail:email,
                        Id:userId,
                        deptId:v.DepartmentId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'Knowledge',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeKnowledge(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#KnowledgeAdmin").append(BindUser);
                })
            }
            var Approver=v.Approver;
            if(v.ApproverId!=null)
            {
                Approver.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    KnowledgeApprover.push({
                        EMail:email,
                        Id:userId,
                        deptId:$('#ddlDepartments').val(),
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'KnowledgeApprover',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeKnowledgeApp(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#KnowledgeApprover").append(BindUser);
                })
            }
            
            
        }     
        

        if(v.WebPartName=="Head of the department")
        {
            var Contributors=v.Contributors;
            var ContributorsId=v.ContributorsId;
            if(ContributorsId!=null)
            {
                Contributors.results.forEach(function(Items){
                    var email=Items.EMail;
                    var userName=Items.Title;
                    var userId=Items.Id;
                    g_HOD.push({
                        EMail:email,
                        Id:userId,
                        UserName:userName
                    })
                    userRecords.push(
                        {
                            EMail:email,
                            WebPartName:'HOD',
                            deptId:v.DepartmentId,
                            Id:userId,
                            UserName:userName
                        }
                    )
                    var BindUser='';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(email);
                    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + userId+ '"><div class="admin-th-card employeesection">';			            
                    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +userName+ '</h3>';
                    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + email+ '\')">' + email+ '</p></div>';
                    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromHOD(this, \'' + email+ '\');"><i class="fa fa-times"></i></button>';			
                    BindUser += '</div></div></div></div>';
                    $("#headOfDepartment").append(BindUser);
                })
            }
            
            
        }
    })

}


function DepartmentDocuments() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        //var VisitorgID = ListCommonService.GetGroupIDByGroupName("Visitors");//Get Visitor GroupID        
        
        var contributorsIdArray =[];
        g_Contributors.forEach(function(data){
            contributorsIdArray.push(data.Id);
        })
        var limitedAccessIdArray =[];
        var listCollectionArray=[];
        var approverIdArray = new Array();
        approverIdArray=[];
        g_DocumentApp.forEach(function(data){
            approverIdArray.push(data.Id);
        })
        var limitedAccessIdArray=[];
        var webPartName = "Documents";
        var ownerIdArray = [];
        g_OtherDeptContri.forEach(function(data){
            ownerIdArray.push(data.Id)
        })
        var myDocumentsiteURL = GetSiteURL(departmentId);

        BreakInheritePermissionOnDocuments(myDocumentsiteURL[0].DeptSiteUrl, webPartName, contributorsIdArray, ownerIdArray, approverIdArray);
        CommonService(myDocumentsiteURL[0].DeptSiteUrl, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true);
    }
}

function DepartmentDocumentAccess() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        var listCollectionArray = new Array();
        listCollectionArray.push("DepartmentDocument_Access"); //Department based
        var contributorsIdArray = [];
        g_Readers.forEach(function(data){
            contributorsIdArray.push(data.Id);
        })
        var limitedAccessIdArray = new Array();
        var approverIdArray = new Array();
        var webPartName = "DepartmentDocument_Access";
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);
        //BreakInheritePermissionOnDocuments(myDocumentsiteURL, webPartName, contributorsIdArray);

        CommonService(myDocumentsiteURL[0].DeptSiteUrl, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true);
    }
}
function BreakInheritePermissionOnDocuments(myDocumentsiteURL, webPartName, contributorsIdArray, ownerIdArray, approverIdArray) {
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var listLibaryName = "DepartmentalDMS";
    var endPointUrl = myDocumentsiteURL + "/_api/web/lists/getByTitle('" + listLibaryName + "')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json',
        success: function (data)
        {
            AllEmployeeuser= AllEmployeeuser.filter(function (val) {
                return (val.Department==$('#ddlDepartments').val() && val.UserId!=_spPageContextInfo.userId)
            });
            
                
            ResetAllPermission(myDocumentsiteURL);
            
            var fullControlUser=[];
            arrUsersPermission=[];                             
            g_Contributors.forEach(function(data){
                fullControlUser.push(data.Id);
                arrUsersPermission.push(data.Id);
            })
            g_HOD.forEach(function(data){
                fullControlUser.push(data.Id);
                arrUsersPermission.push(data.Id);
            })
            g_OtherDeptContri.forEach(function(data){
                fullControlUser.push(data.Id);
                arrUsersPermission.push(data.Id);
            })
            if (fullControlUser.length != 0) {
                for (var index = 0; index < fullControlUser.length; index++) {
                    AssignPermissionForDocuments(myDocumentsiteURL, "DepartmentalDMS", fullControlUser[index], "1073741829"); //ApprooverPermission permission for Current User 
                    //arrContriUsers.push(fullControlUser[index]);
                }
            }
            var arrReadAccess= [];
            g_Readers.forEach(function(data){
                arrReadAccess.push(data.Id);
                arrUsersPermission.push(data.Id);
            })
            if (arrReadAccess.length != 0) {
                for (var index = 0; index < arrReadAccess.length; index++) {
                    AssignPermissionForDocuments(myDocumentsiteURL, "DepartmentalDMS", arrReadAccess[index], "1073741826"); //ApprooverPermission permission for Current User                         
                }
            }
            AllEmployeeuser.forEach(function(data){
                if(data.UserId!=arrUsersPermission.includes(data.UserId))
                {
                    AssignPermissionForDocuments(myDocumentsiteURL, "DepartmentalDMS",data.UserId, "1073741826");
                }
            })


        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

}

function AssignPermissionForDocuments(myDocumentsiteURL, listLibaryName, userPrincpleId, permissionLevel) {
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var webUrl = myDocumentsiteURL + "/_api/web/lists/getByTitle('" + listLibaryName + "')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
    $.ajax({
        url: webUrl,
        type: "POST",
        headers: headers,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("User has been assigned permission .");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

function HeadOfDepartment() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        var listCollectionArray = new Array();
        listCollectionArray.push("Head of the department"); //Department based
        var contributorsIdArray = [];
        
        var limitedAccessIdArray = new Array();
        var approverIdArray = new Array();
        var webPartName = "Head of the department";
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);        
        var users = [];
        g_HOD.forEach(function(data){
            users.push(data.Id);
            contributorsIdArray.push(data.Id);
            return users;
        })

        addUserToSharePointGroup(users);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true);
        
        
        /*for(var i=0; i<contributorsIdArray.length;i++){
         AssignPermissionForDocuments(myDocumentsiteURL, "DepartmentalDMS", contributorsIdArray[i], "1073741829");
        
        } */ 
    
    }

}
var AllEmployeeuser=[];
function CheckDepartmentDocuments() {
    AllEmployeeuser = [];
    var RestQuery;
    var companyId = Logged_CompanyId;
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= Status eq 'Active' and Company/ID eq '" + companyId + "'&$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {
        try {
            for (var i = 0; i < Employees.results.length; i++) {
                AllEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'Department': Employees.results[i].Department.ID
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    AdminWarning = "";
    //#region check HOD permission  
        var users=[];
        users=g_HOD
        if(users.length>0)
        {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase();
                });
        
                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }
        
            }
            if (IscheckMessage) {
                AdminWarning += " is not an active user  .\n Can not be assigned as Head of the Department.\n ";
                IscheckMessage = false;
            }
        }
        else
        {
            alert('Please enter Head of the Department name.');
            waitingDialog.hide();
            return false;
        }  


    //#endregion
    var departmentId = $('#ddlDepartments').val();
    var department = parseInt(departmentId);
    if(IsDMSModules==true)
    {
        
        var users=[];    
        users=g_Contributors;
        if (users.length > 0) {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }
            if (IscheckMessage) {
                AdminWarning += " are not departmental user, cannot be assigned as Contributors. \n ";
                IscheckMessage = false;
            }

        }
        else
        {
            //if($('#toggleDocument').hasClass('active')==false)
            //{
                alert('Please enter Document Contributor name.');
                waitingDialog.hide();
                return false;

            //}        
        }


    
        var users = g_OtherDeptContri;
        if(users.length>0)
        {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department != department;
                });
                if (arrSubVisaLetters < 1) {
        
                    AdminWarning += users[j].UserName + ",";
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }
        
            }
            if (IscheckMessage) {
                AdminWarning += "are departmental user, cannot be assigned as Contributors from Other Dept.\n ";
                IscheckMessage = false;
            }
        }
    else
    {
        /*alert('Please enter Contributors from Other Dept name.');
        waitingDialog.hide();
        return false;*/
    }
        
        var users = g_Readers;
        if(users.length>0)
        {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department != department;
                });
        
                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }
        
            }
        
            if (IscheckMessage) {
                AdminWarning += " is departmental user, can not assigned as reader from other department.\n ";
                IscheckMessage = false;
            }

        }
        else
        {
            /*alert('Please enter Readers from Other Dept name.');
            waitingDialog.hide();
            return false;*/
        }   
        
    }
    if(IsIntranetModules==true)
    {    
        users =g_NewInitiative;
        var active = $("#toggleInitiative").hasClass("active");
        if (!active) {
            var WebpartsInitiativeScope = "SELECTIVE"
        }
        else {
            var WebpartsInitiativeScope = "EVERYONE"
        }

        if (users.length > 0 || WebpartsInitiativeScope == "EVERYONE") {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }
            if (IscheckMessage) {
                AdminWarning += " are not departmental user,\n Can not be assigned as New Initiative.\n ";
                IscheckMessage = false;
            }
        }
        else {

            alert('Please enter New Initiative Contributor name.');
            waitingDialog.hide();
            return false;
        }
        
        var users =g_Suggesion;
        var active = $("#toggleSuggestion").hasClass("active");
        if (!active) {
            var WebpartsActivityScope = "SELECTIVE"
        }
        if (active) {
            var WebpartsActivityScope = "EVERYONE"
        }

        if (users.length > 0 || WebpartsActivityScope == "EVERYONE") {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }
            if (IscheckMessage) {
                AdminWarning += " are not departmental user,\n Can not be assigned as Suggesion Contributors.\n ";
                IscheckMessage = false;
            }
        } else {

            alert('Please enter Suggesion Contributor name.');
            waitingDialog.hide();
            return false;
        }


        
        var users =g_Activity
        var active = $("#toggleActivity").hasClass("active");
        if (!active) {
            var WebpartsActivityScope = "SELECTIVE"
        }
        if (active) {
            var WebpartsActivityScope = "EVERYONE"
        }

        if (users.length > 0 || WebpartsActivityScope == "EVERYONE") {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }
            if (IscheckMessage) {
                AdminWarning += " are not departmental user,\n Can not be assigned as Activity Contributors.\n ";
                IscheckMessage = false;
            }
        } else {

            alert('Please enter Activity Contributor name.');
            waitingDialog.hide();
            return false;
        }

        var users = g_Knowledge
        if (users.length > 0) {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }

            if (IscheckMessage) {
                AdminWarning += " are not departmental user,\n Can not be assigned as Knowledge.\n";
                IscheckMessage = false;
            }
        }
        else {

            if($("#toggleKnowledge").hasClass("active")==false)
            {
                alert('Please enter Knowledge Contributor  name.');
                waitingDialog.hide();
                return false;
            }

            
        }    
        var users =g_DocumentApp;
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail.toLocaleLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += "is not an active user \n Can not be assigned as Document Approvers. ";
            IscheckMessage = false;
        }
        

        var users =SuggestionApprover
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail.toLocaleLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += "is not an active user \n Can not be assigned as Suggestion Approvers. ";
            IscheckMessage = false;
        }

        
        var users =g_ActivityApprover
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase()
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += "is not an active user \n Can not be assigned as  Activity Approvers. ";
            IscheckMessage = false;
        }

        var users =g_NewApprover;
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += "is not an active user \n Can not be assigned as  NewInitiative Approvers. ";
            IscheckMessage = false;
        }
        var users =KnowledgeApprover;
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += "is not an active user \n Can not be assigned as  Knowledge Approvers. ";
            IscheckMessage = false;
        }
    }
    
/*------------------Departmet Project admin---------------*/
    if(IsTaskModules==true)
    {
        var users =g_DepartmentalProject;
        if (users.length > 0) {
            for (var j = 0; j < users.length; j++) {
                var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                    return filterData.EMail.toLocaleLowerCase() == users[j].EMail.toLocaleLowerCase() && filterData.Department == department;
                });

                if (arrSubVisaLetters < 1) {
                    AdminWarning += users[j].UserName + ",";
                    //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                    IsAdminOrNot = false;
                    IscheckMessage = true;
                }

            }

            if (IscheckMessage) {
                AdminWarning += " are not departmental user,\n Can not be assigned as Project Admin.\n";
                IscheckMessage = false;
            }
        }
        else {

            alert('Please enter departmental Project admin name.');
            waitingDialog.hide();
            return false;
        }
    }



    return IsAdminOrNot

}


//Assign read permisson to those users which are removed from people pickre at the time of submission 25/04/2022
function BreakPermission(userPrincpleId,myDocumentsiteURL ) {
    var dmsSiteURL = myDocumentsiteURL;
    var headers = {
        'X-RequestDigest': $('#__REQUESTDIGEST').val(),
        'X-HTTP-Method': 'DELETE'
    }
    var endPointUrl = dmsSiteURL + "/_api/web/lists/getByTitle('DepartmentalDMS')/roleassignments/getbyprincipalid(" + userPrincpleId + ")";
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        //   dataType: 'json',
        success: function (data) {
            console.log("Permission removed.");
        },
        error: function (error) {
            console.log(userPrincpleId+ ' not found');
        }
    });
}

function ResetAllPermission(myDocumentsiteURL) {
     debugger;
      var dmsSiteURL =myDocumentsiteURL;
      var siteurl=  dmsSiteURL  + "/_api/web/lists/getbytitle('DepartmentalDMS')/RoleAssignments?$top=5000&$expand=Member,RoleDefinitionBindings,User";
      //var siteurl=  "https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/TITAN/IT/_api/web/lists/getbytitle('DepartmentalDMS')/RoleAssignments?$expand=Member,RoleDefinitionBindings,User";

   $.ajax({
        url: siteurl,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data)
        {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++)
            {
            if(items[i].Member.UserId!=null)
            {
                 userpricipalid= items[i].PrincipalId;
               BreakPermission(userpricipalid,myDocumentsiteURL);
            }
               
            }
        },
        error: function (errorMessage) {
            console.log('error not found users');
            Permissionloder.close();

        }
    });
}

function Openmngsiteadmins()
{
        //$('#Openmngsiteadmin').modal('show');
        $('#genericPopup').append($('<iframe id="myIframeTeam"  title="Teams"></iframe>'));
        $('#myIframeTeam').attr('src', _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/mngsiteadmin.aspx?Openmngsiteadmin");
        //popup("Site Collection Administration");

}
function popup(popuptitle) {
    $('#genericPopup').dialog({
        width: 850,
        height: 600,
        modal: true,
        class: 'popup',
        title: popuptitle,
        overlay: {
            backgroundColor: "#000",
            opacity: 0.9
        }
    });
    $(".ui-dialog").addClass("ui-dialog_costom");
    $(".ui-widget-overlay").addClass("ui-dialog_cost");

}


/*---------------------Search user-----------------------*/

function onChangeSearchUser(HTMLID, PplPickerId,records)
{
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo)
    {
        
        emptyWebPartBox();
        if(userInfo.length >0)
        {
            userRecords.forEach(element => {
                var tempEmail=element.EMail;
                var tempUserId=element.Id;
                var tempUserName=element.UserName;
                var WebPartName=element.WebPartName
                if(tempEmail.toLowerCase()==userInfo[0].EntityData.Email.toLowerCase())
                {
                    if(element.WebPartName=='Tech Admin')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'techAdminUser',WebPartName);
                    }
                    if(element.WebPartName=='Hr Admin')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'hrAdmin',WebPartName);
                    }
                    if(element.WebPartName=='Process Admin')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'processAdmin',WebPartName);
                    }
                    if(element.WebPartName=='Project Admin')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'projectAdmin',WebPartName);
                    }
                    if(element.WebPartName=='ClientMaster')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'CustomerManagementAdmin',WebPartName);
                    }
                    if(element.WebPartName=='DeptContri')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'deptContributors',WebPartName);
                    }
                    if(element.WebPartName=='OtherDeptContri')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'otherDeptContributors',WebPartName);
                    }
                    if(element.WebPartName=='HOD')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'headOfDepartment',WebPartName);
                    }
                    
                    if(element.WebPartName=='Announcements')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'announcementsAdmin',WebPartName);
                    }
                    if(element.WebPartName=='announcementApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'announcementApprover',WebPartName);
                    }
                    if(element.WebPartName=='Banners')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'informationAdmin',WebPartName);
                    }
                    if(element.WebPartName=='BannersApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'informationApprover',WebPartName);
                    }
                    if(element.WebPartName=='Emergency Annoucements')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'alertAdmin',WebPartName);
                    }
                    if(element.WebPartName=='AlertApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'AlertApprover',WebPartName);
                    }
                    if(element.WebPartName=='Events')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'Events',WebPartName);
                    }
                    if(element.WebPartName=='EventApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'EventApprover',WebPartName);
                    }
                    if(element.WebPartName=='Recognition')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'recognitionAdmin',WebPartName);
                    }
                    if(element.WebPartName=='RecoginitionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'RecoginitionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Polls')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'surveyAdmin',WebPartName);
                    }
                    if(element.WebPartName=='SurveyApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SurveyApprover',WebPartName);
                    }
                    if(element.WebPartName=='General')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ExperienceAdmin',WebPartName);
                    }
                    if(element.WebPartName=='ExperienceApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ExperienceApprover',WebPartName);
                    }
                    if(element.WebPartName=='QuestionAnswer')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'questionsAdmin',WebPartName);
                    }
                    if(element.WebPartName=='QuestionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'QuestionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Media Gallery')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'magazineAdmin',WebPartName);
                    }
                    if(element.WebPartName=='Media')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'mediaGalleryAdmin',WebPartName);
                    }
                    if(element.WebPartName=='DocumentApprovers')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'allApprovers',WebPartName);
                    }
                    if(element.WebPartName=='Project')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'projectAdminDertmental',WebPartName);
                    }
                    if(element.WebPartName=='New Initiative')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'NewInitiativeAdmin',WebPartName);
                    }
                    if(element.WebPartName=='NewApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'initiativeApproval',WebPartName);
                    }
                    if(element.WebPartName=='Suggesion')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SuggestionAdmin',WebPartName);
                    }
                    if(element.WebPartName=='SuggestionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SuggestionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Activity')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ActivityAdmin',WebPartName);
                    }
                    if(element.WebPartName=='ActivityApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ActivityApprover',WebPartName);
                    }
                    if(element.WebPartName=='Knowledge')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'KnowledgeAdmin',WebPartName);
                    }
                    if(element.WebPartName=='KnowledgeApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'KnowledgeApprover',WebPartName);
                    }
                    
                    


                }
            });

        }
        else
        {
            
            userRecords.forEach(element => {
                var tempEmail=element.EMail;
                var tempUserId=element.Id;
                var tempUserName=element.UserName;
                var WebPartName=element.WebPartName;
                if(element.WebPartName=='Tech Admin')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'techAdminUser',WebPartName);
                }
                if(element.WebPartName=='Hr Admin')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'hrAdmin',WebPartName);
                }
                if(element.WebPartName=='Process Admin')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'processAdmin',WebPartName);
                }
                if(element.WebPartName=='DeptContri')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'deptContributors',WebPartName);
                }
                if(element.WebPartName=='DocumentApprovers')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'allApprovers',WebPartName);
                }
                if(element.WebPartName=='OtherDeptContri')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'otherDeptContributors',WebPartName);
                }
                if(element.WebPartName=='HOD')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'headOfDepartment',WebPartName);
                }
                if(element.WebPartName=='Redear')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'readerOtherDept',WebPartName);
                }
                if(element.WebPartName=='Project Admin')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'projectAdmin',WebPartName);
                }
                if(element.WebPartName=='ClientMaster')
                {
                    bindSearchUsers(tempEmail,tempUserId,tempUserName,'CustomerManagementAdmin',WebPartName);
                }
                if(element.WebPartName=='Announcements')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'announcementsAdmin',WebPartName);
                    }
                    if(element.WebPartName=='announcementApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'announcementApprover',WebPartName);
                    }
                    if(element.WebPartName=='Banners')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'informationAdmin',WebPartName);
                    }
                    if(element.WebPartName=='BannersApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'informationApprover',WebPartName);
                    }
                    if(element.WebPartName=='Emergency Annoucements',WebPartName)
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'alertAdmin',WebPartName);
                    }
                    if(element.WebPartName=='AlertApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'AlertApprover',WebPartName);
                    }
                    if(element.WebPartName=='Events')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'Events',WebPartName);
                    }
                    if(element.WebPartName=='EventApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'EventApprover',WebPartName);
                    }
                    if(element.WebPartName=='Recognition')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'recognitionAdmin',WebPartName);
                    }
                    if(element.WebPartName=='RecoginitionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'RecoginitionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Polls')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'surveyAdmin',WebPartName);
                    }
                    if(element.WebPartName=='SurveyApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SurveyApprover',WebPartName);
                    }
                    if(element.WebPartName=='General')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ExperienceAdmin',WebPartName);
                    }
                    if(element.WebPartName=='ExperienceApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ExperienceApprover',WebPartName);
                    }
                    if(element.WebPartName=='QuestionAnswer')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'questionsAdmin',WebPartName);
                    }
                    if(element.WebPartName=='QuestionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'QuestionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Media Gallery')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'magazineAdmin',WebPartName);
                    }
                    if(element.WebPartName=='Media')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'mediaGalleryAdmin',WebPartName);
                    }

                    if(element.WebPartName=='Project')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'projectAdminDertmental',WebPartName);
                    }
                    if(element.WebPartName=='New Initiative')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'NewInitiativeAdmin',WebPartName);
                    }
                    if(element.WebPartName=='NewApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'initiativeApproval',WebPartName);
                    }
                    if(element.WebPartName=='Suggesion')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SuggestionAdmin',WebPartName);
                    }
                    if(element.WebPartName=='SuggestionApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'SuggestionApprover',WebPartName);
                    }
                    if(element.WebPartName=='Activity')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ActivityAdmin',WebPartName);
                    }
                    if(element.WebPartName=='ActivityApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'ActivityApprover',WebPartName);
                    }
                    if(element.WebPartName=='Knowledge')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'KnowledgeAdmin',WebPartName);
                    }
                    if(element.WebPartName=='KnowledgeApprover')
                    {
                        bindSearchUsers(tempEmail,tempUserId,tempUserName,'KnowledgeApprover',WebPartName);
                    }    
            });
        }
    }
}

function bindSearchUsers(tempEmail,tempUserId,tempUserName,divId,webPartName)
{
    var BindUser = '';
    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
    BindUser += '<div class="col-md-6 col-sm-6 col-xs-12 parentremove User' + tempUserId + '"><div class="admin-th-card employeesection">';                    
    BindUser += '<div class="admin-th-card-head empoyeeimg"><img src="' + attachment + '" alt=""></div>';
    BindUser += '<div class="admin-th-card-body employeeinfo"><div class="admin-th-card-body-info text-ellipsis"><h3 class="admin-th-name text-ellipsis">' +tempUserName+ '</h3>';
    BindUser += '<p class="admin-th-email text-ellipsis" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</p></div>';
    BindUser += '<div class="text-right"><button class="btn remove-group-btn remove-btn close close-round" onclick="removeUserFromsearch(this, \'' + tempEmail + '\',\'' + webPartName+ '\');"><i class="fa fa-times"></i></button>';
    BindUser += '</div></div></div></div>';
    $("#"+divId).append(BindUser);
}

function GetCompanySiteURL (ListName, Query)
{
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data)
        {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
};

/*--------------Toggle button functionality------------------------*/

var IsActiveNews = true;
function ChrckToggleNews() {
    if (IsActiveNews) {
        IsActiveNews = false;
        BannersScope = "EVERYONE";        
        //$("#BannersContributors_Company").hide();
    } else {
        
        IsActiveNews = true;
        BannersScope = "SELECTIVE";
    }
    $("#informationBox").toggleClass("d-none");
}
var IsActiveMediaGallery = true;
function ChrcktoggleMediaGallery() {
    if (IsActiveMediaGallery) {
        IsActiveMediaGallery = false;
        MediaScope = "EVERYONE";
        
    } else {        
        IsActiveMediaGallery = true;
        MediaScope = "SELECTIVE";
    }
    $("#mediaGalleryBox").toggleClass("d-none");
}
var IsMagazineNews = true;

function ChrcktoggleMagazine() {
    if (IsMagazineNews) {
        IsMagazineNews = false;
        MediaGalleryScope = "EVERYONE";        
    } else {        
        IsMagazineNews = true;
        MediaGalleryScope = "SELECTIVE";
    }
    $("#magazineBox").toggleClass("d-none");
}
var IsGeneralAnnouncement = true;
function ChrckGeneralAnnouncement() {
    if (IsGeneralAnnouncement) {
        IsGeneralAnnouncement = false;
        AnnouncementScope = "EVERYONE";        
    } else {
        AnnouncementScope = "SELECTIVE";        
        IsGeneralAnnouncement = true;
    }
    $("#announcementsBox").toggleClass("d-none");

}
var IsEmergencyAnnouncement = true;
function ChrckEmergencyAnnouncement() {
    if (IsEmergencyAnnouncement) {
        IsEmergencyAnnouncement = false;
        EmergencyAnnouncementScope = "EVERYONE";      

    } else {
        EmergencyAnnouncementScope = "SELECTIVE";        
        IsEmergencyAnnouncement = true;
    }
    $("#alertBox").toggleClass("d-none");
}
var IsEvents = true;
function ChrckEvents() {
    if (IsEvents) {
        IsEvents = false;
        WebpartsEventsScope = "EVERYONE";  
    } 
    else {       
        IsEvents = true;
        WebpartsEventsScope = "SELECTIVE";
    }
    $("#eventBox").toggleClass("d-none");

}
var IsPolls = true;
function ChrckPolls() {
    if (IsPolls) {
        IsPolls = false;
        WebpartsPollsScope = "EVERYONE";
    } 
    else {        
        IsPolls = true;
        WebpartsPollsScope = "SELECTIVE";

    }
    $("#SurveyBox").toggleClass("d-none");

}
var IsRecognition = true;
function ChrckRecognition() {
    if (IsRecognition) {
        IsRecognition = false;
        WebpartsRecognitionScope = "EVERYONE";        
    } else {       
        IsRecognition = true;
        WebpartsRecognitionScope = "SELECTIVE";
    }
    $("#rocognitionBox").toggleClass("d-none");
}
var IsExperience = true;
function ChrckExperience() {
    if (IsExperience) {
        IsExperience = false;
        WebpartsExperienceScope = "EVERYONE";        
    } else {        
        IsExperience = true;
        WebpartsExperienceScope = "SELECTIVE";
    }
    $("#experienceBox").toggleClass("d-none");

}
var IsQuestionAnswer = true;
function ChrckQuestionAnswer() {
    if (IsQuestionAnswer) {
        IsQuestionAnswer = false;        
        WebpartsQuestionAnswerScope = "EVERYONE";     

    } else {
        IsQuestionAnswer = true;
        WebpartsQuestionAnswerScope = "SELECTIVE";
    }
    $("#questionBox").toggleClass("d-none");

}

var WebpartsSuggestionScope='SRLECTIVE';
//Toggle button functionality for Departments
function ChrckInitiative() {
    /*var active = $("#toggleInitiative").hasClass("active");
    if (active==true) {
        WebpartsInitiativeScope = "EVERYONE";
        $("#NewInitiativeBox").addClass("d-none");
    }  else  {       
        WebpartsInitiativeScope = "SRLECTIVE";
        $("#NewInitiativeBox").removeClass("d-none");
    }*/
    $("#NewInitiativeBox").toggleClass("d-none");
}
function ChrckSuggestion() {
    /*var active = $("#toggleSuggestion").hasClass("active");
    if (active==true) {
        WebpartsSuggestionScope = "EVERYONE";
        //$("#toggleSuggestion").addClass("active");
        $("#SuggestionBox").addClass("d-none");
    }  else  {       
        WebpartsSuggestionScope = "SRLECTIVE";
        $("#SuggestionBox").removeClass("d-none");
    }*/
    $("#SuggestionBox").toggleClass("d-none");
}
function ChrckActivity() {
    /*var active = $("#toggleActivity").hasClass("active");
    if (active==true) {
        WebpartsActivityScope = "EVERYONE";
        $("#ActivityBox").addClass("d-none");
        //$("#toggleActivity").addClass("active");        
    } else {
        WebpartsActivityScope = "SRLECTIVE";
        $("#ActivityBox").removeClass("d-none");
    }*/
    $("#ActivityBox").toggleClass("d-none");
}
var WebpartsKnowledgeScope='SRLECTIVE'
function ChrckKnowledge() {
    /*var active = $("#toggleKnowledge").hasClass("active");
    if (active==true) {
        WebpartsKnowledgeScope = "EVERYONE";
        $("#KnowledgeBox").addClass("d-none");
        //$("#toggleKnowledge").addClass("active");        
    } else {
        WebpartsKnowledgeScope = "SRLECTIVE";
        $("#KnowledgeBox").removeClass("d-none");
    }*/
    $("#KnowledgeBox").toggleClass("d-none");
}
var WebpartsDocumentScope='SRLECTIVE';
function ChrckDocument() {    
    $("#documentBox").toggleClass("d-none");    
}
var g_DocumentApp=[];
function commonFormSubmit()
{
    $('#btnSubmit_Company').click(function () {
        $.ajax({
            cache: false,
            beforeSend: function() {
            $("#overlaysearch").fadeIn();
            },
            success: function(data) {
                if (CheckWebparts()) {
                    if ($("#tglinformationApprover").hasClass("active") == false) {
                        if (BannersApprover.length > 0) {

                        } else {
                            alert('Please enter approver of Information web-part name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }
                    if ($("#tglannouncementApprover").hasClass("active") == false) {
                        if (announcementApprover.length > 0) {

                        } else {
                            alert('Please enter Announcements approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }
                    if ($("#tglAlertApprover").hasClass("active") == false) {
                        if (AlertApprover.length > 0) {

                        } else {
                            alert('Please enter Alert approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }     
                    
                    if ($("#tglEventApprover").hasClass("active") == false) {
                        if (EventApprover.length > 0) {

                        } else {
                            alert('Please enter Event approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }


                    if ($('#tglSurveyApprover').hasClass("active") == false) {                
                        if (SurveyApprover.length > 0) {

                        } else {
                            alert('Please enter Survey approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }
                    if ($('#tglRecoginitionApprover').hasClass("active") == false) {                
                        if (RecoginitionApprover.length > 0) {

                        } else {
                            alert('Please enter Recognition approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }
                    if ($('#tglExperienceApprover').hasClass("active") == false) {                
                        if (ExperienceApprover.length > 0) {

                        } else {
                            alert('Please enter Experience approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }
                    if ($('#tglQuestionApprover').hasClass("active") == false) {                
                        if (QuestionApprover.length > 0) {

                        } else {
                            alert('Please enter Questions & Answers approver name.');
                            waitingDialog.hide();
                            $('#loader_showing').removeClass('shownow');
                            return false;
                        }
                    }   

                    $.when(CompanyMediaBanner(),CompanyGeneralAnnouncement(), CompanyEmergencyAnnouncement(), CompanyMediaGallery(), CompanyMedia(),CompanyWebpartsPolls(), CompanyWebpartsExperience(), CompanyWebpartsQuestionAnswer(), CompanyWebpartsRecognition(), CompanyWebpartsEvents()).done(function (MainExamListItemTemp) {
                        alert("Permission assigned successfully .");
                        $('#submitnow').modal('hide');
                        //waitingDialog.hide();
                        //$('#loader_showing').removeClass('shownow');
                    });

                } else {
                    if (IsAdminOrNot == false) {
                        alert(AdminWarning);
                    }
                    IsAdminOrNot = true;
                }            
                $("#overlaysearch").fadeOut();
            }
        });        
    });    

}
var AdminWarning='';
function CheckWebparts() {
    $('#loader_showing').addClass('shownow');
    var AllEmployeeuser = [];
    var RestQuery;
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= Status eq 'Active' and Company/ID eq '" + companyId + "'   &$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {


        try {
            for (var i = 0; i < Employees.results.length; i++) {
                AllEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'Department': Employees.results[i].Department.ID,
                    'UserEmail':Employees.results[i].Email
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    AdminWarning = "";
    
    var users =g_eventAdminArr;
    if (users.length > 0 || WebpartsEventsScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Events Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Events Contributor name.');
        waitingDialog.hide();
        return false;


    }    
    var users = EventApprover
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as HR Admin \n");
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Events Approvers. \n ";
        IscheckMessage = false;
    }

    
    var users =g_GeneralArr
    if (users.length > 0 || WebpartsExperienceScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Experience Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Experience Contributor name.');
        waitingDialog.hide();
        return false;
    }
    var users =ExperienceApprover
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].Email || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });
        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as HR Admin \n");
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Experience Approvers. \n ";
        IscheckMessage = false;
    }


    
    var users = g_QuestionAnswerArr
    if (users.length > 0 || WebpartsQuestionAnswerScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();;
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as QuestionAnswer Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter QuestionAnswer Contributor name.');
        waitingDialog.hide();
        return false;
    }
    var users = QuestionApprover;
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as QuestionAnswer Approvers. \n ";
        IscheckMessage = false;
    }

    var users = g_PollsArr
    if (users.length > 0 || WebpartsPollsScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();;
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as survey Contributors. ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter survey Contributor name.');
        waitingDialog.hide();
        return false;
    }

    var users =SurveyApprover
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as HR Admin \n");
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as survey Approvers. \n ";
        IscheckMessage = false;
    }

    var users = g_RecognitionArr
    if (users.length > 0 || WebpartsRecognitionScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();;
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Project Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Recognition Contributors. ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Recognition Contributor name.');
        waitingDialog.hide();
        return false;
    }

    var users = RecoginitionApprover
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as HR Admin \n");
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Recognition Approvers. \n ";
        IscheckMessage = false;
    }
    var users =g_informationArr
    if (users.length > 0 || BannersScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                //alert(users[j].DisplayText + "   is not an active user.\n Can not be assigned as Tech Admin ");
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Information web-part Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Contributor of Information web-part');
        waitingDialog.hide();
        return false;


    }
    
    var users =BannersApprover
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as information approver \n ";
        IscheckMessage = false;
    }
    
    
    var users = g_MagazineArr
    if (users.length > 0 || MediaGalleryScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserEmail + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Magazine Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Magazine Contributor name.');
        waitingDialog.hide();
        return false;
    }

    var users = g_MediaGalleryArr
    if (users.length > 0 || MediaScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Media Gallery Contributors. ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Media Gallery Contributor name.');
        waitingDialog.hide();
        return false;


    }    
    var users =g_AlertArr
    if (users.length > 0 || EmergencyAnnouncementScope == "EVERYONE") {

        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as Emergency Announcement. \n ";
            IscheckMessage = false;
        }

    }
    else {

        alert('Please enter Alert Contributor name.');
        waitingDialog.hide();
        return false;

    }

    
    var users =g_AnnouncementsArr
    if (users.length > 0 || AnnouncementScope == "EVERYONE") {
        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].UserName + ",";
                IsAdminOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n Can not be assigned as General Announcement Contributors. \n ";
            IscheckMessage = false;
        }
    }
    else {

        alert('Please enter Announcement Contributor name.');
        waitingDialog.hide();
        return false;


    }

    var users = announcementApprover;
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as General Announcement Approvers. ";
        IscheckMessage = false;
    }
    var users = AlertApprover;
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].EMail || filterData.UserEmail.toLowerCase()==users[j].EMail.toLowerCase();
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].UserName + ",";
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Alert Approvers. ";
        IscheckMessage = false;
    }



    return IsAdminOrNot

}


/**********************Add Intranet web part************************ */

var BannersScope = "SELECTIVE", MediaGalleryScope = "SELECTIVE", MediaScope = "SELECTIVE", EmergencyAnnouncementScope = "SELECTIVE", AnnouncementScope = "SELECTIVE", WebpartsPollsScope = "SELECTIVE", WebpartsRecognitionScope = "SELECTIVE", WebpartsEventsScope = "SELECTIVE", WebpartsExperienceScope = "SELECTIVE", WebpartsQuestionAnswerScope = "SELECTIVE";

function CompanyMediaBanner() {

    var listCollectionArray = new Array();
    listCollectionArray.push("BannerImages"); //Company based
    var contributorsIdArray =[]
    g_informationArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray = []
    if ($("#tglinformationApprover").hasClass("active") == false) {
        var approverIdArray =[];
        BannersApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
        var approverIdArray = new Array();
    }
    var webPartName = "Banners";
    var departmentId = "";
    var myDocumentsiteURL =''// GetSiteURL("");
    var ownerIdArray = [];
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, BannersScope);
}




function CompanyMediaGallery() {
    var listCollectionArray = new Array();
    listCollectionArray.push("MediaGallery"); //Company based
    var contributorsIdArray =[];
    g_MagazineArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray =[]
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    var webPartName = "Media Gallery";
    var departmentId = "";
    var myDocumentsiteURL = ''//GetSiteURL("");
    var ownerIdArray = [];
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, MediaGalleryScope);
}
function CompanyMedia() {
    var listCollectionArray = new Array();
    listCollectionArray.push("Media"); //Company based
    var contributorsIdArray = [];
    g_MediaGalleryArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray = []//ListCommonService.getMultiPeoplePickerUserInfo("MediaLimitedAccess_Company");
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    var webPartName = "Media";
    var departmentId = "";
    var myDocumentsiteURL = GetSiteURL("");
    var ownerIdArray = [];



    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, MediaScope);

    if (MediaScope == "SELECTIVE") {
        ResetBreakInheriteOnMediaGallary(myDocumentsiteURL, "MediaGallery")
        BreakInheritePermissionOnMediaGallary(myDocumentsiteURL, contributorsIdArray, MediaScope);

    }
    else {
        ResetBreakInheriteOnMediaGallary(myDocumentsiteURL, "MediaGallery")
    }

}


function CompanyGeneralAnnouncement() {
    var listCollectionArray = new Array();
    listCollectionArray.push("Announcements"); //Company based
    var contributorsIdArray =[];
    g_AnnouncementsArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var approverIdArray=[];
    var limitedAccessIdArray =[]
    var required=$("#tglannouncementApprover").hasClass("active");
    if (required== false) {
        announcementApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
          approverIdArray = new Array();
    }
    var webPartName = "Announcements";
    var departmentId = "";
    var myDocumentsiteURL ='';
    var ownerIdArray = [];
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, AnnouncementScope);
}

function CompanyEmergencyAnnouncement() {

    var listCollectionArray = new Array();
    listCollectionArray.push("Emergency Announcement"); //For root site
    var contributorsIdArray = [];
    g_AlertArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })

    var limitedAccessIdArray = [];
    if ($("#tglAlertApprover").hasClass("active") == false) {
        var approverIdArray =[];
        AlertApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
        var approverIdArray = new Array();
    }
    var webPartName = "Emergency Annoucements";
    /*var contributorsId = ListCommonService.getMultiPeoplePickerUserInfo("GeneralAnnouncementContributors_Company");

    var webPartName2 = "Announcements";
    for (var j = 0; j < contributorsIdArray.length; j++) {

        var arrSubVisaLetters = contributorsId.filter(function (filterData) {
            return filterData == contributorsIdArray[j];

        });

        if (arrSubVisaLetters < 1) {
            contributorsId.push(contributorsIdArray[j]);
        }
    }
    var listCollectionArray2 = new Array();
    listCollectionArray2.push("Announcements");*/
    var departmentId = "";
    var ownerIdArray = [];
    var myDocumentsiteURL = _spPageContextInfo.webAbsoluteUrl;
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, EmergencyAnnouncementScope);
    //CommonService(myDocumentsiteURL, webPartName2, departmentId, listCollectionArray2, approverIdArray, limitedAccessIdArray, contributorsId, ownerIdArray, true, AnnouncementScope);

}
function CompanyWebpartsPolls() {

    var listCollectionArray = new Array();
    listCollectionArray.push("MainPollsList"); //Admin Company based
    listCollectionArray.push("PollsDetails"); //Admin company based
    var contributorsIdArray =[];
    g_PollsArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray = []//ListCommonService.getMultiPeoplePickerUserInfo("PollsLimitedAccess_Company");
    // var approverIdArray = new Array(); // ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    if ($("#tglSurveyApprover").hasClass("active") == false) {
        var approverIdArray =[];
        SurveyApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
        var approverIdArray = new Array();
    }

    var webPartName = "Polls";
    var departmentId = "";
    var myDocumentsiteURL =''// GetSiteURL("");
    var ownerIdArray = [];
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsPollsScope);
}

function CompanyWebpartsRecognition() {
    var listCollectionArray = new Array();
    listCollectionArray.push("Recognition"); //Company based
    var contributorsIdArray =[];
    g_RecognitionArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray =[]// ListCommonService.getMultiPeoplePickerUserInfo("RecognitionLimitedAccess_Company");
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    if ($("#tglRecoginitionApprover").hasClass("active") == false) {
        RecoginitionApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
        var approverIdArray = new Array();
    }

    var webPartName = "Recognition";
    var departmentId = "";
    var ownerIdArray = [];
    var myDocumentsiteURL = GetSiteURL("");
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsRecognitionScope);
}

function CompanyWebpartsEvents() {
    var listCollectionArray = new Array();
    listCollectionArray.push("Event"); //Company based
    var contributorsIdArray =[]
    g_eventAdminArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray = []//ListCommonService.getMultiPeoplePickerUserInfo("EventsLimitedAccess_Company");
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    if ($("#tglEventApprover").hasClass("active") == false) {
        EventApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
        var approverIdArray = new Array();
    }

    var webPartName = "Events";
    var departmentId = "";
    var ownerIdArray = [];
    var myDocumentsiteURL = GetSiteURL("");
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsEventsScope);
}
function CompanyWebpartsExperience() {
    var listCollectionArray = new Array();
    listCollectionArray.push("General"); //Company based
    var contributorsIdArray =[];
    g_GeneralArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray = new Array();
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    if ( $("#tglExperienceApprover").hasClass("active")== false) {
         ExperienceApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
         approverIdArray = new Array();
    }

    var webPartName = "General";
    var departmentId = "";
    var ownerIdArray = [];
    var myDocumentsiteURL = GetSiteURL("");
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsExperienceScope);
}
function CompanyWebpartsQuestionAnswer() {
    var listCollectionArray = new Array();
    listCollectionArray.push("QuestionAnswer"); //Company based
    var contributorsIdArray =[];
    g_QuestionAnswerArr.forEach(function(data){
        contributorsIdArray.push(data.Id)
    })
    var limitedAccessIdArray =new Array();
    var approverIdArray = new Array(); //ListCommonService.getMultiPeoplePickerUserInfo("TechAdmin_Company");
    if ($("#tglQuestionApprover").hasClass("active") == false) {
        QuestionApprover.forEach(function(data){
            approverIdArray.push(data.Id)
        })
    } else {
           approverIdArray = new Array();
    }

    var webPartName = "QuestionAnswer";
    var departmentId = "";
    var ownerIdArray = [];
    var myDocumentsiteURL = GetSiteURL("");
    CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsQuestionAnswerScope);

}

function ResetBreakInheriteOnMediaGallary(myDocumentsiteURL, dmsLibraryName) {

    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var endPointUrl = myDocumentsiteURL + "/_api/web/lists/getByTitle('" + dmsLibraryName + "')/ResetRoleInheritance()";
    //  var endPointUrl = myDocumentsiteURL + "_api/web/lists/getByTitle('Documents')/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)"; 
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log("Success");
        },

        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

}function BreakInheritePermissionOnMediaGallary(myDocumentsiteURL, contributorsIdArray, MediaScope) {
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var endPointUrl = myDocumentsiteURL + "/_api/web/lists/getByTitle('MediaGallery')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";

    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log("BreakInherite");


            if (contributorsIdArray != null) {
                for (var j = 0; j < contributorsIdArray.length; j++) {
                    var principleid = contributorsIdArray[j];
                    AssignPermissiononOnMediaLibrary(myDocumentsiteURL, principleid, "1073741827");

                }
            }

            //  var EverOneGroupId= 14;
            $.when(getTargetGroupId()).done(function (response) {
                var EverOneGroupId = groupIdofEveryone;
                if (EverOneGroupId != null || EverOneGroupId != '') {
                    AssignPermissiononOnMediaLibrary(myDocumentsiteURL, EverOneGroupId, "1073741826");
                }
            });


        },
        error: function (error) {
            console.log(JSON.stringify(error));


        }
    });



}
var groupIdofEveryone = ''
function getTargetGroupId() {
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$filter=PrincipalType eq 4 and Title eq 'Everyone'";

    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        async: false,
        success: function (data, status, xhr) {
            groupIdofEveryone = data.d.results[0].Id;
            return groupIdofEveryone;
        },
        error: function (data, status, error) {
            console.log(data.responseJSON.error);
        }

    });
}


function AssignPermissiononOnMediaLibrary(myDocumentsiteURL, userPrincpleId, permissionLevel) {


    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var webUrl = myDocumentsiteURL + "/_api/web/lists/getByTitle('MediaGallery')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
    $.ajax(
    {
        url: webUrl,
        type: "POST",
        headers: headers,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("User has been assigned permission .");
        },
        error: function (error) {
            console.log(JSON.stringify(error));


        }
    });
}


function emptyWebPartBox()
{
        $('#techAdminUser').empty();
        $('#hrAdmin').empty();
        $('#processAdmin').empty();
        $('#deptContributors').empty();
        $('#otherDeptContributors').empty();
        $('#headOfDepartment').empty();
        $('#readerOtherDept').empty();
        $('#projectAdmin').empty();
        $('#CustomerManagementAdmin').empty();
        $('#informationAdmin').empty();
        $('#informationApprover').empty();
        $('#announcementsAdmin').empty();
        $('#announcementApprover').empty();
        $('#alertAdmin').empty();
        $('#AlertApprover').empty();
        $('#eventAdmin').empty();
        $('#EventApprover').empty();
        $('#surveyAdmin').empty();
        $('#SurveyApprover').empty();
        $('#recognitionAdmin').empty();
        $('#RecoginitionApprover').empty();
        $('#ExperienceAdmin').empty();
        $('#tglExperienceApprover').empty();
        $('#questionsAdmin').empty();
        $('#QuestionApproverBox').empty();
        $('#magazineAdmin').empty();
        $('#mediaGalleryAdmin').empty();
        $('#projectAdminDertmental').empty();
        $('#NewInitiativeAdmin').empty();
        $('#initiativeApproval').empty();
        $('#SuggestionAdmin').empty();
        $('#suggestionApproval').empty();
        $('#ActivityAdmin').empty();
        $('#ActivityApprover').empty();
        $('#KnowledgeAdmin').empty();
        $('#KnowledgeApprover').empty();
        $('#allApprovers').empty();
}

function emprtyDepartmentBox()
{
    
    $('#NewInitiativeAdmin').empty();
    $('#projectAdminDertmental').empty();
    $('#initiativeApproval').empty();
    $('#SuggestionAdmin').empty();
    $('#suggestionApproval').empty();
    $('#allApprovers').empty();
    $('#ActivityAdmin').empty();
    $('#ActivityApprover').empty();
    $('#KnowledgeAdmin').empty();
    $('#KnowledgeApprover').empty();   

}

//#region  Add department web part functionality

function DepartmentNewInitiative() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        var listCollectionArray = new Array();
        listCollectionArray.push("New Initiative"); //Department based
        var contributorsIdArray =[]
        g_NewInitiative.forEach(function(data){
        contributorsIdArray.push(data.Id)
        //return contributorsIdArray ;
       })
 
        var limitedAccessIdArray =[];
        var approverIdArray=[]
        g_NewApprover.forEach(function(data){
           approverIdArray.push(data.Id)
        })
        var active = $("#toggleInitiative").hasClass("active");
        if (!active) {
            var WebpartsInitiativeScope = "SELECTIVE"
        }
        if (active) {
            var WebpartsInitiativeScope = "EVERYONE"
        }

        var webPartName = "New Initiative";
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsInitiativeScope);
    }
}

function DepartmentSuggestion() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        var VisitorgID = ListCommonService.GetGroupIDByGroupName("Visitors"); //Get Visitor GroupID
        var listCollectionArray = new Array();
        listCollectionArray.push("Suggestions"); //Deprtament based
        var contributorsIdArray =[]// g_Suggesion
        g_Suggesion.forEach(function(data){
           contributorsIdArray .push(data.Id)
        })
        var limitedAccessIdArray = new Array();
        limitedAccessIdArray.push(VisitorgID);
        var approverIdArray =[]// SuggestionApprover
        SuggestionApprover.forEach(function(data){
           approverIdArray.push(data.Id)
        })
        var webPartName = "Suggesion";
        var active = $("#toggleSuggestion").hasClass("active");
        if (!active) {
            var WebpartsSuggestionScope = "SELECTIVE"
        }
        if (active) {
            var WebpartsSuggestionScope = "EVERYONE"
        }
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsSuggestionScope);
    }
}
function DepartmentActivity() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0) {
        var VisitorgID = ListCommonService.GetGroupIDByGroupName("Visitors"); //Get Visitor GroupID
        var listCollectionArray = new Array();
        listCollectionArray.push("Activity"); //Department based
        var contributorsIdArray =[];g_Activity
        g_Activity.forEach(function(data){
           contributorsIdArray.push(data.Id)
        })

        var limitedAccessIdArray =[]
        // limitedAccessIdArray.push(VisitorgID);
        var approverIdArray =[]//g_ActivityApprover
        g_ActivityApprover.forEach(function(data){
           approverIdArray.push(data.Id)
        })
        var active = $("#toggleActivity").hasClass("active");
        if (!active) {
            var WebpartsActivityScope = "SELECTIVE"
        }
        if (active) {
            var WebpartsActivityScope = "EVERYONE"
        }

        var webPartName = "Activity";
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true, WebpartsActivityScope);
    }
}
function DepartmentProject() {
    var departmentId = $('#ddlDepartments').val()
    if (departmentId != 0 && IsTaskModules==true) {
        var listCollectionArray = new Array();
        listCollectionArray.push("Project"); //Department based
        var contributorsIdArray =[]// g_DepartmentalProject;
        g_DepartmentalProject.forEach(function(data){
           contributorsIdArray.push(data.Id)
        })
        var limitedAccessIdArray = new Array();
        var approverIdArray = new Array();
        var webPartName = "Project";
        var ownerIdArray = [];
        var myDocumentsiteURL = GetSiteURL(departmentId);
        
        var users =[];
        g_DepartmentalProject.forEach(function(data){
            users.push(data.EMail);
            return users;
        })
        addUserToSharePointGroup(users);
        CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true);
    }
}
var WebpartsKnowledgeScope='SELECTIVE'
    function addDepartmentKnowledge() {
        var departmentId = $('#ddlDepartments').val()
        if (departmentId != 0) {
            var listCollectionArray = new Array();
            listCollectionArray.push("Knowledge"); //Department based
            var contributorsIdArray =[]//g_Knowledge
            g_Knowledge.forEach(function(data){
	           contributorsIdArray.push(data.Id)
	        })
            var limitedAccessIdArray = new Array();
            var approverIdArray =[]//KnowledgeApprover
            KnowledgeApprover.forEach(function(data){
	           approverIdArray .push(data.Id)
	        })
	        var active = $("#toggleKnowledge").hasClass("active");
	        if (!active) {
	            var WebpartsKnowledgeScope= "SELECTIVE"
	        }
	        if (active) {
	            var WebpartsKnowledgeScope= "EVERYONE"
	        }
	        
            var webPartName = "Knowledge";
            var ownerIdArray = [];
            var myDocumentsiteURL =''// GetSiteURL(departmentId);
            CommonService(myDocumentsiteURL, webPartName, departmentId, listCollectionArray, approverIdArray, limitedAccessIdArray, contributorsIdArray, ownerIdArray, true,WebpartsKnowledgeScope);
        }
    }


//#endregion


function AssignPermissiononDMSLibary(userPrincpleId, permissionLevel) {
    //var dmsSiteURL =// $("#deptsiteurl").val();
    var deptURL=GetSiteURL($('#ddlDepartments').val())
    var dmsSiteURL=deptURL[0].DeptSiteUrl
  //  var dmsSiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + currentProjectSiteURL;
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var webUrl = dmsSiteURL + "/_api/web/lists/getByTitle('DepartmentalDMS')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
  // var webUrl = "https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/TITAN/IT/_api/web/lists/getbytitle('DepartmentalDMS')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
    $.ajax(
    {
        url: webUrl,
        type: "POST",
        headers: headers,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("Permission has been assigned.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            //Permissionloder.close();

        }
    });
}


/*function BreakInheritePermission() {  

    var deptURL=GetSiteURL($('#ddlDepartments').val())
    var dmsSiteURL =deptURL[0].DeptSiteUrl //$("#deptsiteurl").val();
    if(dmsSiteURL!="")
    {
//$("body").css("cursor", "progress");
//Permissionloder = SP.UI.ModalDialog.showWaitScreenWithNoClose("Permission resetting", "Please wait...");
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
  var endPointUrl = dmsSiteURL + "/_api/web/lists/getByTitle('DepartmentalDMS')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
  // var endPointUrl = "https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/TITAN/IT/_api/web/lists/getbytitle('DepartmentalDMS')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
       $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        dataType: 'json', success: function (data) {
         
          
       $.when(ResetAllPermission(dmsSiteURL)).done(function (DeletePermissionrslt) {         
                  
          $.when(ResetAllPermission2()).done(function (AssignDeptUserPermissionrslt) {       
          
              $.when(departmentUserPermission()).done(function (DeptUserPermissionrslt) {       
                                
              })

           })
             
       });      
                          // DeleteUserPermissionOnDMSLibrary(userpricipalid)
     },
      error: function (error) {
            console.log(JSON.stringify(error));
            Permissionloder.close();

        }
    });
    
  }

}


var currentDepartmentID=0;
function ResetAllPermission2() {
  debugger;
           var companyId =  titanForWork.getQueryStringParameter("CompanyId");
           var resetdeptpermission =currentDepartmentID;
           var counterAssignPermission=0;
   $.ajax({
        url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$top=5000&$select=*,ID,DepartmentId,LogonName/ID,LogonName/Title,LogonName/UserName,Company/ID&$expand=LogonName,Company&$filter=Status eq 'Active'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data)
        {
            var items = data.d.results;
            items=items.filter(function(v){
	            return v.DepartmentId==currentDepartmentID && CompanyId==companyId;
	         })
            for (var i = 0; i < items.length; i++)
            {
                  var assignPrincipleid = items[i].LogonName.ID; 
                  AssignPermissiononDMSLibary(assignPrincipleid,"1073741826");
                  counterAssignPermission++
            }
          
        },
        error: function (errorMessage) {
            console.log('error not found users');
            Permissionloder.close();

        }
    });
  }
  
  function departmentUserPermission() {
debugger;
 var resetdeptpermission =currentDepartmentID;
 var counterAssignPermission=0;
	var listName='ProcessApprovers';
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
  //  var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'DepartmentDocument_Access'";
   var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=(CompanyId eq '" + txtCompanyId + "' and Department eq '" + resetdeptpermission + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + txtCompanyId + "' and Department eq '" + resetdeptpermission + "' and WebPartName eq 'Documents') or (CompanyId eq '" + txtCompanyId + "' and Department eq '" + resetdeptpermission + "' and WebPartName eq 'Head of the department') ";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
             for (var i = 0; i < items.length; i++)
            {
            if(items[i].WebPartName == "Documents")
            {   
                  counterAssignPermission++;
                  
                  if(items[i].ContributorsId!=null)
                  {
                     for (var j = 0; j < items[i].ContributorsId.results.length; j++)
                      {
                         var principleid= items[i].ContributorsId.results[j];
                         AssignPermissiononDMSLibary(principleid,"1073741830");//change by lakhan 26/04/2022
                         
                       }
                   }
                    if(items[i].ApproverId!=null)
                  {

                   for (var k = 0; k < items[i].ApproverId.results.length; k++)
                   {
                         var principleid= items[i].ApproverId.results[k];
                         AssignPermissiononDMSLibary(principleid,"1073741830");//  change by lakhan (1073741827)
                         
                   }
                 }

                   if(items[i].OwnerId!=null)
                  {

                   for (var k = 0; k < items[i].OwnerId.results.length; k++)
                   {
                         var principleid= items[i].OwnerId.results[k];
                         AssignPermissiononDMSLibary(principleid,"1073741830"); // change by lakhan (1073741827) 25/04/2022
                         
                   }
                 }
               }
               
               else if(items[i].WebPartName == "DepartmentDocument_Access")
               {
                   counterAssignPermission++;
                    if(items[i].ContributorsId!=null)
                  {

                   for (var m = 0; m < items[i].ContributorsId.results.length; m++)
                   {
                         var principleid= items[i].ContributorsId.results[m];
                         AssignPermissiononDMSLibary(principleid,"1073741826");
                         
                   }
                  }
               
               }
               
               else if(items[i].WebPartName == "Head of the department")
               {
                   counterAssignPermission++;
                    if(items[i].ContributorsId!=null)
                  {

                   for (var m = 0; m < items[i].ContributorsId.results.length; m++)
                   {
                         var principleid= items[i].ContributorsId.results[m];
                         AssignPermissiononDMSLibary(principleid,"1073741829");
                         
                   }
                  }
               
               }
               
             
            }
            
              if(items.length==counterAssignPermission)
            {
               //alert("Permission Reset Sucessfully");
               alert("Permission assigned successfully .");
               $("body").css("cursor", "default");
               //Permissionloder.close();
            }

                  
            },
                    error: function (data) {
            console.log(data.responseJSON.error);
            Permissionloder.close();


        }
        
    });
}*/


/***********************Lable setting code**************************************************************/

//change label as per the 'LabelSettings' list

var LabelDefaultLangauge = [];
var labels = [];
function ChangeLabels() {
	var preferredLanguage = 'DefaultLanguage';
    if (LabelDefaultLangauge.length == 0) {
        var RestQuery = "?$select=Title,Key,DefaultLanguage&$top=5000&$filter=(Title eq 'Workplace' or Title eq 'Home Page')";
        $.when(CommonFunction.getItemsWithQueryItem("LabelsSettings", RestQuery)).done(function (LabelsSettings) {
            try {
                //alert("test");
                LabelDefaultLangauge = LabelsSettings.results;
                SetDMSText(LabelsSettings.results, preferredLanguage);

            } catch (e) {
                alert("Recommended to clear the browsing data and cookies for smooth and fast browsing. Please press Ctrl + H to clear cookies.");
            }

        });
    }
    else {
        SetDMSText(LabelDefaultLangauge, preferredLanguage);
    }
}

function SetDMSText(results, preferredLanguage) {
    labels = [];
    $.each(results, function (i, value) {
        var actualText = value['Key'];
        var convertedText = value[preferredLanguage];
        if (convertedText == null || convertedText == "" || convertedText == undefined)
            convertedText = value['DefaultLanguage'];

        var label = {
            labelText_Actual: actualText,
            lableText_Converted: convertedText
        };
        labels.push(label);
    });

    DetectBrowser(); // First Detect Browser then Change All Headings as per selected language.
}

function DetectBrowser() {
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    if (isSafari || isIE) {
        ChangeWebPartsHeadings_OldBrowser();
    } else {
        ChangeWebPartsHeadings();
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////// For Latest Browser //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = labels.find(function (e) {
                    return e.labelText_Actual.trim() === controlLabelText;
                }).lableText_Converted;

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                } else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                } else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                } else if ($(this).hasClass("button")) {
                    $(this).attr('value', convertedText);
                } else {
                    $(this).html(convertedText);
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

//////////////////////////////////////////////////////////////////////
////////////////// IE Browser and Windows Safar 5.1.7 ////////////////
//////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings_OldBrowser() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = findObjectByKey(labels, controlLabelText, controlLabelText);

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                }
                else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                }
                else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                }
                else if ($(this).hasClass("button")) {
                    if (convertedText != null && convertedText != "null" && convertedText != "") {
                        $(this).attr('value', convertedText);
                    }
                    else {
                        $(this).attr("value", $(this).val());
                    }
                } else {
                    if (convertedText != null && convertedText != "null" && convertedText != "") { 
                        $(this).html(convertedText);
                    }
                    else {
                        $(this).html($(this).text());
                    }
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].labelText_Actual == value) {
            //alert(array[i].labelText_Actual);

            return array[i].lableText_Converted;
        }
    }
    return null;
}

function removeUserFromsearch(Action,email,webPartName){
    //$(Action).parents('.parentremove').remove();
    userRecords=userRecords.filter(function(v)
    {
        return v.WebPartName!=webPartName || v.EMail.toLocaleLowerCase()!=email.toLocaleLowerCase();
    })
    if(webPartName=="Tech Admin")
    {
        removeFromTech(Action,email);
    }
    else if(webPartName=="Hr Admin")
    {
        removeUserFromHr(Action,email);
    }
    else if(webPartName=="Project Admin")
    {
        removeUserFromProcess(Action,email);
    }
    else if(webPartName=="Process Admin")
    {
        removeUserFromProcess(Action,email);
    }
    else if(webPartName=="ClientMaster")
    {
        removeFromClient(Action,email);
    }
    else if(webPartName=="Banners")
    {
        removeBanner(Action,email);
    }
    else if(webPartName=="BannersApprover")
    {
        removeBannerApprov(Action,email);
    }
    else if(webPartName=="Announcements")
    {
        removeAnnouncement(Action,email);
    }
    else if(webPartName=="announcementApprover")
    {
        removeAnnounceApprov(Action,email);
    }
    else if(webPartName=="Emergency Annoucements")
    {
        removeAlert(Action,email);
    }
    else if(webPartName=="AlertApprover")
    {
        removeAlertApprov(Action,email);
    }
    else if(webPartName=="Events")
    {
        removeEvent(Action,email);
    }
    else if(webPartName=="EventApprover")
    {
        removeEventApprov(Action,email);
    }
    else if(webPartName=="Polls")
    {
        removePolls(Action,email);
    }
    else if(webPartName=="SurveyApprover")
    {
        removePollsApprov(Action,email);
    }
    else if(webPartName=="Recognition")
    {
        removeRecogination(Action,email);
    }
    else if(webPartName=="RecoginitionApprover")
    {
        removeRecoginationApprov(Action,email);
    }
    else if(webPartName=="General")
    {
        removeExperience(Action,email);
    }
    else if(webPartName=="ExperienceApprover")
    {
        removeExperienceApprov(Action,email);
    }
    else if(webPartName=="QuestionAnswer")
    {
        removeQuestion(Action,email);
    }
    else if(webPartName=="QuestionApprover")
    {
        removeQuestionApprov(Action,email);
    }
    else if(webPartName=="Media Gallery")
    {
        removeMagazine(Action,email);
    }
    else if(webPartName=="Media")
    {
        removeMedia(Action,email);
    }
    else if(webPartName=="DeptContri")
    {
        removeUserFromContributors(Action,email);
    }
    else if(webPartName=="OtherDeptContri")
    {
        removeUserFromContributorsOfOtherDept(Action,email);
    }
    else if(webPartName=="HOD")
    {
        removeUserFromHOD(Action,email);
    }
    else if(webPartName=="Project")
    {
        removeDeptProject(Action,email);
    }
    else if(webPartName=="Redear")
    {
        removeUserFromReader(Action,email);
    }
    else if(webPartName=="New Initiative")
    {
        removeNewInitiative(Action,email);
    }
    else if(webPartName=="NewApprover")
    {
        removeInitiativeApp(Action,email);
    }
    else if(webPartName=="Suggesion")
    {
        removeSuggesion(Action,email);
    }
    else if(webPartName=="removeSuggApprove")
    {
        SuggestionApprover(Action,email);
    }
    else if(webPartName=="Activity")
    {
        removeActivity(Action,email);
    }
    else if(webPartName=="ActivityApprover")
    {
        removeActivityApprov(Action,email);
    }
    else if(webPartName=="Knowledge")
    {
        removeKnowledge(Action,email);
    }
    else if(webPartName=="KnowledgeApprover")
    {
        removeKnowledgeApp(Action,email);
    }
    

}