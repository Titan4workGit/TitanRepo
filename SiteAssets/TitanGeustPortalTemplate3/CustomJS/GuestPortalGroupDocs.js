function MyDocumentEnv() {

    HeadingTitle = "Group Documents"
    // $(".headdingLinks").html("");
    // $(".headdingLinks").html(HeadingTitle);
    arrFileFolder = [];
    arrFilterTable = [];
    $(".btnFilterClear").trigger('click');
    flagFilterClear=false;
    //companyID = titanForWork.getQueryStringParameter("CompanyId");
    companyID = Logged_CompanyId;
    var restQueryPersonalDMS = "?$top=5000&$select=*,RestrictedContributor/Title,Author/Id,CompanyID/Id&$expand=Author,RestrictedContributor,CompanyID&$orderby=Title asc&$filter= ((EmployeeName/Id eq '" + _spPageContextInfo.userId + "') or (Contributors/Id eq '" + _spPageContextInfo.userId + "') or (Readers/Id eq '" + _spPageContextInfo.userId + "')or (Viewers/Id eq '" + _spPageContextInfo.userId + "')or (RestrictedContributor/Id eq '" + _spPageContextInfo.userId + "')) and Status eq 'Active' ";
    $.when(getItemsWithQuery("PersonalDMS_Setting", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(PersonalDMSData) {
        $("#accordioninner3").html("");
        var GroupLimk = "";
        if(PersonalDMSData.length>=20)
        {
            $("#group_documentslist").show();
        }
        else
        {
            $("#group_documentslist").hide();
        }

        if (PersonalDMSData.length > 0) {
			var tempTitle = '';

            for (var j = 0; j < PersonalDMSData.length; j++) {
                var IsMemberInGroup = false;
                title = PersonalDMSData[j].Title;
                status = PersonalDMSData[j].Status;
                myOwnDocumentsUrl = PersonalDMSData[j].DMS_Link;


                if (PersonalDMSData[j].LibraryType == "Team") {
                    if (PersonalDMSData[j].RestrictedContributorId != null) {
                        // IsMemberInGroup = getIsCurrentUserInGroup(PersonalDMSData[j].DMS_Link, PersonalDMSData[j].RestrictedContributor.results[0].Title);
                    }
                }


                var GetLib = "javascript:GetLibarayDetails(this,'" + myOwnDocumentsUrl + "','" + title + "','" + PersonalDMSData[j].LibraryType + "','Group Documents')";
				var tempTitle = '';
                if (status == "Active") {
					tempTitle = title.replace(/[^A-Z0-9]/ig, "");
                    GroupLimk += '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                        '<h4 class="panel-title">' +
                        '<a data-toggle="pill" href="#" id="'+tempTitle + PersonalDMSData[j].Id.toString() +'" data-LibraryType="' + PersonalDMSData[j].LibraryType + '" data-MSTeamID="' + PersonalDMSData[j].MSTeamID + '" data-PrivateChID="' + PersonalDMSData[j].PrivateChannelName + '" onclick="' + GetLib + '"  class="dms-left-panel-tab-inner" name="' + myOwnDocumentsUrl + '">' +
                        '<div class="d-flex align-items-center">' +
                        '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/group-ico.png" alt="Group Documents">' +
                        '<span class="mobile-hide-tabs-name mt3 ml10">' + title + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</h4>' +
                        '</div>' +
                        '</div>';

                }


            }

            /*GroupLimk += '<div class="panel panel-default" id="AddNewLibBox">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a href="#" data-toggle="modal" data-target="#add-new-group-dms" onclick="cleartextbox()" class="dms-left-panel-tab-inner">' +
                '<div class="d-flex align-items-center">' +
                '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/add-group.png" alt="add group">' +
                '<span class="mobile-hide-tabs-name mt3 ml10">  Add New Library </span>' +
                '</div>' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>';*/

            $("#accordioninner3").append(GroupLimk);

        } else {
            GroupLimk += '<div class="panel panel-default" id="AddNewLibBox">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a href="#" data-toggle="modal" data-target="#add-new-group-dms" onclick="cleartextbox()" class="dms-left-panel-tab-inner">' +
                '<div class="d-flex align-items-center">' +
                '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/add-group.png" alt="add group">' +
                '<span class="mobile-hide-tabs-name mt3 ml10">  Add New Library </span>' +
                '</div>' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>';

            $('#accordioninner3').append(GroupLimk);

        }
        
    });
}
//on click of Group get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Group() {
    arrPermission = [];
    var Query = "?$select=Id,IsAllowFeature,Title,Status,DMS_Link,EmployeeName/EMail&$top=5000&$expand=EmployeeName&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active' and EmployeeName/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
        	MSLinkedLibId = valuesArray[0].Id;
           /* if((LibraryType == "Team" || LibraryType == "Linked") && valuesArray[0].IsAllowFeature == "Pending") {
                $("#BoxAllowPermission").show();
            }
            else {
                $("#BoxAllowPermission").hide();
            }*/
            arrPermission.push({ //User is HOD
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            var Query = "?$select=Id,Title,Status,DMS_Link,Contributors/EMail&$top=5000&$expand=Contributors&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "'";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                	MSLinkedLibId = valuesArray[0].Id;
                	/*if(LibraryType == "Linked" && valuesArray[0].IsAllowFeature == "Pending") {
				    	$("#BoxAllowPermission").show();
				    }
				    else {
				        $("#BoxAllowPermission").hide();
				    }*/
                    //$("#liSahringRule").hide();//Bhawana
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#onlyforGroup").hide();
                    $("#liRemoveGroup").hide();
                    $(".fixed-table-footer").hide();
                    $("#btnaboutthegroup").hide();

                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {//Reader
                	var Query = "?$select=Id,Title,Status,DMS_Link,Contributors/EMail&$top=5000&$expand=Contributors&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active'";
            		$.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
		                if (valuesArray.length > 0) {
		                	MSLinkedLibId = valuesArray[0].Id;
		                	/*if(LibraryType == "Linked" && valuesArray[0].IsAllowFeature == "Pending") {
						    	$("#BoxAllowPermission").show();
						    }
						    else {
						        $("#BoxAllowPermission").hide();
						    }*/
		                }
		            });
                    //$("#liSahringRule").hide();//Bhawana
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
                    $("#liRemoveGroup").hide();
                    $("#divShare").hide();
                    $("#onlyforGroup").hide();
                    $(".fixed-table-footer").hide();
                    $("#btnaboutthegroup").hide();
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
function getGroupData() {
    companyID = Logged_CompanyId;
    var restQueryPersonalDMS = "?$top=5000&$select=*,RestrictedContributor/Title,Author/Id,CompanyID/Id&$expand=Author,RestrictedContributor,CompanyID&$orderby=Title asc&$filter= ((EmployeeName/Id eq '" + _spPageContextInfo.userId + "') or (Contributors/Id eq '" + _spPageContextInfo.userId + "') or (Readers/Id eq '" + _spPageContextInfo.userId + "')or (Viewers/Id eq '" + _spPageContextInfo.userId + "')or (RestrictedContributor/Id eq '" + _spPageContextInfo.userId + "')) and Status eq 'Active' ";
    $.when(getItemsWithQuery("PersonalDMS_Setting", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(PersonalDMSData) {
        if (PersonalDMSData.length > 0) {
            $("#GpDocuments").show();
        }
        else{
             $("#GpDocuments").hide();
        }
        });
			
}

