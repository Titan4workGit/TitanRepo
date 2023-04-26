function getProjectData() {
 var Query = "?$select=DocumentPermission,TeamMember/Id,Project/ProjectStatus,Project/Id,Project/ProjectName,Project/ProjectInternalName,TeamMember/EMail&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active' and Project/ProjectStatus eq 'Live'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
        if(valuesArray.length>0)
            $("#liProjectDocs").show();
        else
            $("#liProjectDocs").hide();
        
    });
}
//to bind the all the Project with DMS URL to which Logged_In user can access
function BindProjects() {
    var DocLibraries = '';
    var uniqueValues = [];
    var sectionType = 'ProjectDocuments';
    arrFileFolder = [];
    ActionBtnControls();
    $("#accordioninner4").html(DocLibraries);
    //var CompanySiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var CompanySiteURL =Logged_CompanySiteURlg;
    
    //var CompanySiteURL = "";
   // var Query = "?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName,Project/ProjectInternalName,TeamMember/EMail&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active'";
    var Query = "?$select=DocumentPermission,TeamMember/Id,Project/ProjectStatus,Project/Id,Project/ProjectName,Project/ProjectInternalName,TeamMember/EMail&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active' and Project/ProjectStatus eq 'Live'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
        //19 jan 23
        if(valuesArray.length>=20)
            $("#serachingse").show();
        else
            $("#serachingse").hide();
        $.each(valuesArray, function(i, el) {
            //if (uniqueValues.indexOf(el.Project.Id) == -1) {
                //var ProjectURL = getProjectDMS1(el.Project.Id);
                var siteURL = el.Project.ProjectName;
                var ProjectURL = '';
                if (el.Project.ProjectInternalName != null && el.Project.ProjectInternalName != "") {
	                siteURL = el.Project.ProjectInternalName;
	                ProjectURL = CompanySiteURL + "/DMS/" + siteURL + "/Shared%20Documents/Forms/AllItems.aspx";
	            }
                var GetLib = "javascript:GetLibarayDetails(this,'" + ProjectURL + "','" + el.Project.ProjectName + "','','" + sectionType + "')";

                //uniqueValues.push(el.Project.Id);
				tempTitle = el.Project.ProjectName.replace(/[^A-Z0-9]/ig, "");
                DocLibraries += '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                    ' <h4 class="panel-title">' +
                    '<a href="javascript:void(0);" id="'+tempTitle + el.Project.Id.toString() +'" onclick="' + GetLib + '" data-toggle="pill" class="dms-left-panel-tab-inner">' +
                    '<div class="d-flex align-items-center">' +
                    ' <img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/project-ico.png" alt="Project Documents">' +
                    ' <span class="mobile-hide-tabs-name mt3 ml10">' + el.Project.ProjectName + '</span>' +
                    ' </div>' +
                    ' </a>' +
                    '</h4>' +
                    '</div>' +
                    '</div>';

            //}
        });
        $("#accordioninner4").append(DocLibraries);
    });
}
//on click of Projects get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Project_Old(ProjectName) {
    arrPermission = [];
    var Query = "?$select=Title,CompanyId,ManagerName/EMail&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + encodeURIComponent(ProjectName) + "' and ManagerName/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrPermission.push({ //User has Full control
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            var Query = "?$select=Title,CompanyId,TeamMember/EMail,Project/Title,DocumentPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + ProjectName + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentPermission eq '1' ";
            $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    //$("#liSahringRule").hide();//Bhawana
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {
                   // $("#liSahringRule").hide();//Bhawana
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#divNew").hide();
                    $("#divUpload").hide();
                    $("#liEmails").hide();
                    $("#divProperties").hide();
                    $("#btnMultiMove").hide();
                    $("#liAlert").hide();
                    $("#divDelete").hide();
                    $("#LiLeavethegroup").hide();
                    $("#liRemoveGroup").hide();
                    $("#divShare").hide();
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: false,
                        UserReader: true
                    });
                }
            });
        }
    });
}
//on click of Projects get Logged_In Roles - Full Owner, Contributor, Reader,Restrict view
function getUserRoles_Project(ProjectName) {
    arrPermission = [];
    var Query = "?$select=Title,CompanyId,ManagerName/EMail&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + encodeURIComponent(ProjectName) + "' and ManagerName/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrPermission.push({ //User has Full control
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            var Query = "?$select=Title,CompanyId,TeamMember/EMail,Project/Title,DocumentPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + ProjectName + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentPermission eq '1' ";
            $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    //$("#liSahringRule").hide();//Bhawana
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {
                    //31 MArch 23
                         //check for Restrict in case of Property
                        var Query = "?$select=Title,CompanyId,TeamMember/EMail,Project/Title,RestrictPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + ProjectName + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and RestrictPermission eq '1' ";
                        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                            if (valuesArray.length > 0) {
                                $("#divDownload").hide();
                                $("#liPermission").hide();
                                $("#liSettings").hide();
                                $("#liMembers").hide();
                                $("#divNew").hide();
                                $("#divUpload").hide();
                                $("#liEmails").hide();
                                $("#divProperties").hide();
                                $("#btnMultiMove").hide();
                                $("#liAlert").hide();
                                $("#divDelete").hide();
                                $("#LiLeavethegroup").hide();
                                $("#liRemoveGroup").hide();
                                $("#divShare").hide();
                                arrPermission.push({ //User is HOD
                                    UserFullAccess: false,
                                    UserContri: false,
                                    UserReader: false,
                                    UserRestrict: true
                                });
                            }
                            else {
                                // $("#liSahringRule").hide();//Bhawana
                                $("#liPermission").hide();
                                $("#liSettings").hide();
                                $("#liMembers").hide();
                                $("#divNew").hide();
                                $("#divUpload").hide();
                                $("#liEmails").hide();
                                $("#divProperties").hide();
                                $("#btnMultiMove").hide();
                                $("#liAlert").hide();
                                $("#divDelete").hide();
                                $("#LiLeavethegroup").hide();
                                $("#liRemoveGroup").hide();
                                $("#divShare").hide();
                                arrPermission.push({ //User is HOD
                                    UserFullAccess: false,
                                    UserContri: false,
                                    UserReader: true
                                });
                            }
                        });  
                    //31 March 23                   
                }
            });
        }
    });
}


//to get the DMS URL of given project
function getProjectDMS1(ItemId) {
    var myProjectDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,ProjectName,ProjectSiteURL,ProjectInternalName&$top=5000&$filter=ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("ProjectDetails", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].ProjectName;
            if (ProjectDetailData[0].ProjectInternalName != null && ProjectDetailData[0].ProjectInternalName != "") {
                siteURL = ProjectDetailData[0].ProjectInternalName;
                myProjectDocumentsUrl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + siteURL + "/Shared%20Documents/Forms/AllItems.aspx";
            }
        }
    });
    return myProjectDocumentsUrl;
}