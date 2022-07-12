var txtCompanyId=titanForWork.getQueryStringParameter("CompanyId");
$(document).ready(function () {
    GetTaskInboxCount(); //Inbox and Outbox count
    GetApprovalInboxCount();
    GetApprovalOutboxCount();

    WorkPlaceApplicationLink()
    var rootSiteURL = _spPageContextInfo.webAbsoluteUrl;
    $(".TaskInbox").attr("href", "" + rootSiteURL + "/Pages/Mydashboard.aspx?WebAppId=" + Logged_CompanyId + "&LocalStorage=Off&Location=TaskInbox&Source=" + window.btoa('Tasks'));
    $(".TaskOutbox").attr("href", "" + rootSiteURL + "/Pages/Mydashboard.aspx?WebAppId=" + Logged_CompanyId + "&LocalStorage=Off&Location=TaskOutbox&Source=" + window.btoa('Tasks'));
    $(".ApprovalInbox").attr("href", "" + rootSiteURL + "/Pages/approvals.aspx?"+window.btoa('inbox'));
    $(".ApprovalOutbox").attr("href", "" + rootSiteURL + "/Pages/approvals.aspx?"+window.btoa('outbox'));
    GetImage();
});

function GetTaskInboxCount() {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmployeeTaskCounter')/items?$top=5000&$select=ID,OpenTasksCount,OverdueCount,UserId/EMail&$expand=UserId&$filter=UserId/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            if(items.length>0){
	            $("#TaskOverdue").text(items[0].OverdueCount ? items[0].OverdueCount : "0");
	            $("#TaskPending").text(items[0].OpenTasksCount ? items[0].OpenTasksCount : "0");
	            $("#TaskOverdueOutbox").text(items[0].OverdueCount_Out ? items[0].OverdueCount_Out : "0");
	            $("#TaskPendingOutbox").text(items[0].OpenTasksCount_Out ? items[0].OpenTasksCount_Out : "0");
            }
            else{
                $("#TaskOverdue").text(0);
	            $("#TaskPending").text(0);
	            $("#TaskOverdueOutbox").text(0);
	            $("#TaskPendingOutbox").text(0);
            }
        },
        error: function (data) {
            alert("Error getting the Task Inbox Count.");
        }
    });
}

function GetApprovalInboxCount() {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=*&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Logged_CompanyId + "' and Status eq 'Initiated'";
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            var myData = [];
            var items = data.d.results;
            var ApprovalInboxHtmlPending = '';
            var ApprovalpendingCounter = 0;
            for (var i = 0; i < items.length; i++) {
                ApprovalpendingCounter++;
            }
            ApprovalInboxHtmlPending += ApprovalpendingCounter;
            $("#ApprovalPendingTask").append(ApprovalInboxHtmlPending);

        },
        error: function () {
            alert("Error getting the Approver Inbox Count .");
        }
    });
}

function GetApprovalOutboxCount() {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=*&$Filter=AuthorId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Logged_CompanyId + "' and Status eq 'Initiated'";
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            var myData = [];
            var items = data.d.results;
            var ApprovalOutboxHtmlPending = '';
            var ApprovalOutboxpendingCounter = 0;
            for (var i = 0; i < items.length; i++) {
                ApprovalOutboxpendingCounter++;
            }
            ApprovalOutboxHtmlPending += ApprovalOutboxpendingCounter;
            $("#ApprovalOutboxpendingCounter").append(ApprovalOutboxHtmlPending);

        },
        error: function () {
            alert("Error getting the Approver Inbox Count .");
        }
    });
}
var arrItems;
var groupItem='';
function WorkPlaceApplicationLink() {
    // Commented by harsh
    // var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$Filter=VisibleAt eq 'Workplace' and CompanyId eq '"+txtCompanyId+"' and DepartmentIdId eq '"+Logged_DepartmentId+"' and Status eq '1' or Audience eq 'Corporate' or SelectiveUsersId eq '"+_spPageContextInfo.userId+"'"; 
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$Filter=VisibleAt eq 'Workplace' and Status eq '1' and (Audience eq 'Corporate' or (Audience eq 'Company' and CompanyIdId eq '" + Logged_CompanyId + "') or (Audience eq 'Selective' and SelectiveUsersId eq '" + _spPageContextInfo.userId + "') or (Audience eq 'Department' and DepartmentIdId eq '" + Logged_DepartmentId + "') )&$orderBy=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            arrItems =items;
            var AppLinkHTML = '';
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    var itemId = items[i].ID;
                    //arrItems = [];
                    if(items[i].Group!='Group'){
                    var RedirectLink = items[i].LinkLocation.Url;}
                    var IconName = items[i].Title;
                    var group=items[i].Group;
                    var GroupName =items[i].GroupName;
                    var password = items[i].Password;
                    if (items[i].AttachmentFiles.results.length > 0) {
                        var AttachmentUrl = items[i].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        var AttachmentUrl = items[i].Event_pick;
                    }
                    if(group=='Group'){
                      if(groupItem!=GroupName){
	                      AppLinkHTML += '<div class="item" onclick="bindGroup(\'' + GroupName + '\')">';
	                      AppLinkHTML += '<a href="#">';
	                      AppLinkHTML += '<img src="' + AttachmentUrl + '"   height="50" alt=""/>';
	                      AppLinkHTML += '<p class="">' + IconName + '</p>';
	                      AppLinkHTML += '</a>';
	                      AppLinkHTML += '</div>';
	                      groupItem=GroupName
                      }
                    }
                    if(GroupName=='' || GroupName==null){
                    if (password != null) {
                        AppLinkHTML += '<div class="item" onclick="redirectLinks(' + items[i].ID + ')">';
                        AppLinkHTML += '<a href="#">';
                        AppLinkHTML += '<img src="' + AttachmentUrl + '"   height="50" alt=""/>';
                        AppLinkHTML += '<p class="">' + IconName + '</p>';
	                    AppLinkHTML += '</a>';
	                    AppLinkHTML += '</div>';
                    }
                    else {
                        AppLinkHTML += '<div class="item">';
                        var linkItems = IconName + '?.' + RedirectLink;
                        //AppLinkHTML += '<a href="' + RedirectLink + '"; onclick="URLwithoutpass(\'' + linkItems + '\')">'
                        
                        AppLinkHTML += '<a target="_blank" href="' + RedirectLink + '"; onclick="URLwithoutpass(\'' + linkItems + '\')">'
                        AppLinkHTML += '<img src="' + AttachmentUrl + '"  height="50" alt=""/>';
                        AppLinkHTML += '<p class="">' + IconName + '</p>';
	                    AppLinkHTML += '</a>';
	                    AppLinkHTML += '</div>'; 
                     }
                    }
                    
                }

                $("#WorkPlaceAppLink").append(AppLinkHTML);

                var fixOwlquick = function () {
                    var $stage = $('.owl-stage'),
                        stageW = $stage.width(),
                        $el = $('.owl-item'),
                        elW = 0;
                    $el.each(function () {
                        elW += $(this).width() + +($(this).css("margin-right").slice(0, -2))
                    });
                    if (elW > stageW) {
                        $stage.width(elW);
                    };
                }
                $('.quick-slider').owlCarousel({
                    //        loop:true,
                    smartSpeed: 600,
                    margin: 10,
                    autoWidth: true,
                    nav: true,
                    dots: false,
                    onInitialized: fixOwlquick,
                    onRefreshed: fixOwlquick,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 4
                        },
                        1000: {
                            items: 6
                        }
                    }
                });
            }
        },
        eror: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

/*function URLwithoutpass(dataArr,group,linkUrl,GroupName) {
    var str = dataArr.split('?.');
    //alert(str);
    if(group=='Group'){
      $('#MyLinkGroupsModal').modal('show');
        //addNotificationItem(str[0], str[1]);
        bindGroup(GroupName);
    }
    else{
        addNotificationItem(str[0], str[1]);
     }
}

var glbId;
function redirectLinks(linkId,group,linkUrl,GroupName) {
    if(group=='Group'){
      $('#MyLinkGroupsModal').modal('show');
      bindGroup(GroupName);
    }
    else{  
     $('#myModal').modal('show');    
    }
    glbId = linkId;
}*/

function URLwithoutpass(dataArr) {
    var str = dataArr.split('?.');
    //alert(str);
    addNotificationItem(str[0], str[1]);
}

var glbId;
function redirectLinks(linkId) {
    $('#myModal').modal('show');
    glbId = linkId;
}


function bindGroup(GroupName){
  var groupHtml='';
  $('#MyLinkGroupsModal').modal('show');
  var newArray = arrItems.filter (function(d) {
    return d.GroupName==GroupName && d.Group=='Link';
  });
  $("#GroupAppLink").empty();
  if(newArray.length>0){
      for(var i=0;i<newArray.length;i++){    
       var RedirectLink =newArray[i].LinkLocation.Url;
       var IconName=newArray[i].Title;
       if (newArray[i].AttachmentFiles.results.length > 0) {
          var AttachmentUrl = newArray[i].AttachmentFiles.results[0].ServerRelativeUrl;
       }
       else {
          var AttachmentUrl = newArray[i].Event_pick;
       }
       var linkItems = IconName + '?.' + RedirectLink;
       var password = newArray[i].Password;

       if (password != null) {
	       groupHtml+='<div class="group_box"  data-dismiss="modal" onclick="redirectLinks(' + newArray[i].ID + ')"><a href="#">'
	       groupHtml+='<img src="'+AttachmentUrl+'" height="50" alt="" data-themekey="#">'
	       groupHtml+='<p class="">'+IconName+'</p></a></div>'         
       }
       else{
        groupHtml+='<div class="group_box"><a target="_blank" href="' + RedirectLink + '"; onclick="URLwithoutpass(\'' + linkItems + '\')">'
	    groupHtml+='<img src="'+AttachmentUrl+'" height="50" alt="" data-themekey="#">'
	    groupHtml+='<p class="">'+IconName+'</p></a></div>'
      }
    }
    }
    else{
      groupHtml+='<p style="text-align:center" class="noRecordFound">No Records Found</p>'
    }
  
  
  $("#GroupAppLink").append(groupHtml);

}


function bindevent() {
    var password = $('#password').val();
    var check = false;
    if (password == '') {
        alert('Please enter password !');
        return false;
    }
    var ownUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApplicationLink')/items?$select=*&$filter=ID eq '" + glbId + "'";
    $.ajax({
        url: ownUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            //linkId='';
            var pass = items[0].Password;
            var link = items[0].LinkLocation.Url;
            if (password == pass) {
                var Title = items[0].Title;
                addNotificationItem(Title, link)
                $("#myModal").modal('hide');
                $('#password-field').val('');
                window.open(link, '_blank');
            }
            else {
                alert('wrong Password.');
                $('#password-field').val('');
                check = true;
            }
        },
        error: function (dataerror) {
            alert(dataerror);
        }
    });

    if (check == true) {
        return false;
    }
}

function addNotificationItem(Title, urlLink) {

    var ListName = "NotificationCenter";
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.NotificationCenterListItem' },
        'Title': Title,
        'WebpartName': 'Quick-Links',
        'UserAction': 'Quick-Links',
        'Details': urlLink,
        'LocationIDId': parseInt(Logged_Location),
        'Designation': Logged_Designation,
        'AppVersion': '2.7',
        //'ItemId':0,
        'UserImage': employeePicURL,
        'UserIDId': _spPageContextInfo.userId,
        'Application': 'Website',
        'ContentCategory': Title,
        'Environment': 'Windows',
        //'Guest_CustomerId':parseInt(guestClientId),
        'DepartmentIdId': parseInt(Logged_DepartmentId),
        'CompanyIdId': parseInt(Logged_CompanyId)
    };

    $.when(AddItemNotification(ListName, Metadata)).done(function (responseIdmore) {
        console.log(ListName);
        console.log('Save Quick-Links!');
    })
}

var employeePicURL = '';
function GetImage() {
    var listname, id;
    var restQuery = "";
    listname = "Employees";
    var aa = _spPageContextInfo.userEmail;
    //id = EmpID;
    restQuery = "Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=LogonName/EMail eq '" + _spPageContextInfo.userEmail + "'";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;

            employeePicURL = "";
            if (items.length > 0) {

                Designation = items[0].Designation;
                Department = items[0].Department;
                OfficeLocation = items[0].OfficeLocation;
                if (items[0].AttachmentFiles.results.length > 0) {
                    employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;

                }
                else {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
                }
            }
            else {
                employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
