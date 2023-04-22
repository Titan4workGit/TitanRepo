var currentCompanyid = titanForWork.getQueryStringParameter("CompanyId");
$(document).ready(function () {
    UserAuthorization();
    if (IsTechadmin) {
        // alert("You are not authorized to access"); // error in the above string (in this case, yes)!
        $(".card").html('');
        htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
        htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
        htmlNotAuthorized += '</div></div></div></div>';
        $('.card').append(htmlNotAuthorized);
    }
});
function UserAuthorization() {
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    titanForWork.PageAuthorization("ManageCompany", companyId).done(function (currentUserRights, message) {
        if (currentUserRights.length > 0) {
            if ((currentUserRights[0].SiteAdmin == "SiteAdmin") || (currentUserRights[0].TechAdmin == "TechAdmin")) {
                userActivityNotificationEntry(_spPageContextInfo.userId,window.location);

                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', PageLoad_Permissions);
            } else {
                alert(message);
                window.location.href = _spPageContextInfo.webAbsoluteUrl;
            }
        }
    });
}

function PageLoad_Permissions() {
    
    initializePeoplePicker('peoplePickeruser', true);
    initializePeoplePicker('peoplePickerdept', true);
    
    initializePeoplePicker('peoplePickerpersonal', true);
    initializePeoplePicker('peoplePickeraboutus', true);
    initializePeoplePicker('peoplePickerquicklinks', true);

     InvisibleDiv();
     GetOwnerUser(); 
      getAvoutusnav();

    
    $('#Submit').click(function () {

        if (CheckValidUsers()) {

                  if(deptid!='') {
                       updatedeptitem(deptid);
                  }  
                  if(empid!='') {
                       updatepersonaldetail(empid);
                  } 
                  if(quicklinkid!='') {
                       updateQuickLink(quicklinkid);
                  } 
                  if(aboutusid!='') {
                       updateaboutpage(aboutusid);
                  } 
        } else {
            alert(AdminWarning);
            IsAdminOrNot = true;
        }
        if(splashid!= ''){
          updatesplashpage(splashid);
        }
        if(layoutid!= ''){
         updatenewlayout(layoutid);
        }
        if(webpartid!= ''){
          updatePrayerWebpart(webpartid);
        }
        if(newsid!= ''){
          updateNewsContent(newsid);
        }
        if(questionid!= ''){
          updateQuestionAnswer(questionid);
        }
        if(surveyid!= ''){
          updateSurvey(surveyid);
        }
        if(magazineid!= ''){  
          updateMagazine(magazineid);
        }
        if(suggestionid!= ''){
          updateSuggestion(suggestionid);
        }
        if(initiativeid!= ''){
          updateInitiative(initiativeid);
        }  
        if(productid!= ''){
          updateProductPage(productid);
        }
        if(carrierid!= ''){ 
           updateCarrierPage(carrierid);
        }
        if(rssid!= ''){ 
           updateRssfeed1(rssid);
        }
        if(rssid2!= ''){   
           updateRssfeed2(rssid2);
         }  
        alert("Permission assigned successfully .");

    });

    $('#Close').click(function () {
        var url = '..//Pages/AdminPortal.aspx?WebAppId=232SHDFGHJF22B2526DFG';
        $(location).attr('href', url);



    });



    $("#aboutusbtn").click(function () {
        $("#collapse9").toggle(309);
    });


    $("#prayerbtn").click(function () {
        $("#collapse1").toggle(309);
    });
    $("#onedrivebtn").click(function () {

        $("#collapse2").toggle(309);
    });
    $("#splashbtn").click(function () {
        $("#collapse3").toggle(309);
    });
    $("#deptbtn").click(function () {
        $("#collapse4").toggle(309);

    });
    $("#empbtn").click(function () {
        $("#collapse5").toggle(309);
    });
    $("#rss1btn").click(function () {
        $("#collapse6").toggle(309);
    });
    $("#rssbtn2").click(function () {
        $("#collapse7").toggle(309);
    });
    $("#quicklink").click(function () {
        $("#collapse8").toggle(309);
    });



}






function showhide1(data) {
    if (data.value == "Selective") {
        document.getElementById("onedrvadd").style.display = "block";

    } else {
        document.getElementById("onedrvadd").style.display = "none";
    }

}

function showhide2(that) {


    if (that.value == "Selective") {
        document.getElementById("Deptsiteadd").style.display = "block";

    } else {
        document.getElementById("Deptsiteadd").style.display = "none";
    }
}

function showhide3(that) {
    if (that.value == "Selective") {
        document.getElementById("Employeeadd").style.display = "block";

    } else {
        document.getElementById("Employeeadd").style.display = "none";
    }

}
var GetAllUserOwner = [];
var AllEmployeeuser = [],
    OwnersUser = [],
    AdministratorUser = [];
var RestQuery;
function GetOwnerUser() {
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= Status eq 'Active' and Company/ID eq '" + currentCompanyid + "'  &$top=5000 ";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {

        try {
            for (var i = 0; i < Employees.results.length; i++) {
                AllEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail
                })
            }

            $.when(CommonFunction.getSharePointGroupUsers("Owners")).done(function (Owners) {

                for (var i = 0; i < Owners.length; i++) {
                    OwnersUser.push({
                        'UserId': Owners[i].Id,
                        'EMail': Owners[i].Email
                    })
                }
            });

            $.when(CommonFunction.AdministratorUsers()).done(function (Administrator) {
                for (var i = 0; i < Administrator.length; i++) {
                    OwnersUser.push({
                        'UserId': Administrator[i].Id,
                        'EMail': Administrator[i].WorkEmail
                    })
                }
            });
            //OwnersUser.concat(AdministratorUser);
            var DeleteDuplicate = OwnersUser;
            GetAllUserOwners = Array.from(new Set(DeleteDuplicate.map(JSON.stringify))).map(JSON.parse);

        } catch (e) {
            alert(e);
        }
    });
}
var IscheckMessage = false;
var IsAdminOrNot = true;
function CheckValidUsers() {

    AdminWarning = "";
    /* var pickerDiv = $("[id^='peoplePickeruser']");
     var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
     var users = peoplePicker.GetAllUserInfo();
    
     for (var j = 0; j < users.length; j++) {
         var arrSubVisaLetters = AllEmployeeuser.filter(function(filterData) {
             return filterData.EMail == users[j].Description;
         });
 
         if (arrSubVisaLetters < 1) {
             AdminWarning += users[j].DisplayText + ",";
              IsAdminOrNot = false;
             IscheckMessage = true;
         }
 
     }
     if (IscheckMessage) {
         AdminWarning += " is not an active user.\n Can not be assigned as One drive. \n ";
         IscheckMessage = false;
     }*/

    var pickerDiv = $("[id^='peoplePickerdept']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].Description;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].DisplayText + ",";
            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }

    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Department. \n ";
        IscheckMessage = false;
    }
    var pickerDiv = $("[id^='peoplePickerpersonal']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].Description;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].DisplayText + ",";

            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Personal Details.\n ";
        IscheckMessage = false;
    }
    var pickerDiv = $("[id^='peoplePickerquicklinks']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].Description;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].DisplayText + ",";

            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as Quick Link .\n ";
        IscheckMessage = false;
    }
    var pickerDiv = $("[id^='peoplePickeraboutus']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    for (var j = 0; j < users.length; j++) {
        var arrSubVisaLetters = AllEmployeeuser.filter(function (filterData) {
            return filterData.EMail == users[j].Description;
        });

        if (arrSubVisaLetters < 1) {
            AdminWarning += users[j].DisplayText + ",";

            IsAdminOrNot = false;
            IscheckMessage = true;
        }

    }
    if (IscheckMessage) {
        AdminWarning += " is not an active user.\n Can not be assigned as About Us.\n ";
        IscheckMessage = false;
    }

    return IsAdminOrNot
}



function initializePeoplePicker(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties. 
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    //This value specifies where you would want to search for the valid values
    schema['SearchPrincipalSource'] = 15;
    //This value specifies where you would want to resolve for the valid values
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial  
    // PickerEntity objects to set the picker value, and a schema that defines 
    // picker properties.             
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

var listName = "EnvironmentalSettings";
var driveid = '';


function InvisibleDiv() {
     
    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle('EnvironmentalSettings');
    var camlQuery = new SP.CamlQuery();
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    var camlXML = "<View />";
    camlQuery.set_viewXml(camlXML);
    var collListItem = oList.getItems(camlQuery);
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(function () {

        var listItemEnumerator = collListItem.getEnumerator();
        var ItemCount = collListItem.get_count();
        while (listItemEnumerator.moveNext()) {
           
            var oListItem = listItemEnumerator.get_current();
            var Title = oListItem.get_item('Title');
            
            if (Title == 'EmployeePersonalInfo') {
                 var Invisibility = oListItem.get_item('Invisibility');

                 if (Invisibility == true) {
                     $("#personaldiv").hide();
                     
                  }
                  else {
                      $("#personaldiv").show();
                      ExecuteOrDelayUntilScriptLoaded(getpersonaldetail, "sp.js");
                  }
            }
            
            else if (Title == 'Mydepartmentonly') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#departmentdiv").hide();
                     
                  }
                  else {
                      $("#departmentdiv").show();
                       ExecuteOrDelayUntilScriptLoaded(getdeptitems, "sp.js");
                  }
            }
            
            else if (Title == 'TITANNewLayout') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#NewLayoutdiv").hide();
                     
                  }
                  else {
                      $("#NewLayoutdiv").show();
                      getnewlayout();
                  }
            }

            
            else if (Title == 'SplashPage') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#splashdiv").hide();
                     
                  }
                  else {
                      $("#splashdiv").show();
                      getsplashpage();
                  }
            }
            
            else if (Title == 'PrayerWebpart') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#prayerdiv").hide();
                     
                  }
                  else {
                      $("#prayerdiv").show();
                      getPrayerWebpart();                  }
            }
            
             else if (Title == 'NewsContent') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#newsdiv").hide();
                     
                  }
                  else {
                      $("#newsdiv").show();
                      getNewsContent();
                  }
            }
            
            else if (Title == 'QuestionAnswer') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#QuestionAnswerdiv").hide();
                     
                  }
                  else {
                      $("#QuestionAnswerdiv").show();
                      getQuestionAnswer();
                  }
            }
            
             else if (Title == 'Survey') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Surveydiv").hide();
                     
                  }
                  else {
                      $("#Surveydiv").show();
                     getSurvey();
                  }
            }
            
            else if (Title == 'Magazine') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true)
                  {
                     $("#Magazinediv").hide();
                     
                  }
                  else {
                      $("#Magazinediv").show();
                      getMagazine();                  
                  }
            }
            
            else if (Title == 'Suggestion') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true)
                  {
                     $("#Suggestiondiv").hide();
                     
                  }
                  else {
                      $("#Suggestiondiv").show();
                      getSuggestion();                  
                  }
            }

             else if (Title == 'Initiative') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Initiativediv").hide();
                     
                  }
                  else {
                      $("#Initiativediv").show();
                      getInitiative();
                  }
            }
            
             else if (Title == 'ProductPage') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Productdiv").hide();
                     
                  }
                  else {
                      $("#Productdiv").show();
                      getProductPage();
                  }
            }
            
            else if (Title == 'CarrierPage') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Carrierdiv").hide();
                     
                  }
                  else {
                      $("#Carrierdiv").show();
                      getCarrierPage();
                  }
            }
            
              else if (Title == 'RSS FEED1') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Rssfeed1div").hide();
                     
                  }
                  else {
                      $("#Rssfeed1div").show();
                      getRssfeed1();
                  }
            }
            
            
             else if (Title == 'RSS FEED2') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Rssfeed2div").hide();
                     
                  }
                  else {
                      $("#Rssfeed2div").show();
                      getRssfeed2();
                  }
            }
            
             else if (Title == 'QuickLink') {
                 var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Quicklinkdiv").hide();
                     
                  }
                  else {
                      $("#Quicklinkdiv").show();
                         ExecuteOrDelayUntilScriptLoaded(getQuickLink, "sp.js");
                  }
            }
            
            else if (Title == 'AboutUsPage') {
                  var Invisibility = oListItem.get_item('Invisibility');
                 if (Invisibility == true) {
                     $("#Aboutusdiv").hide();
                     
                  }
                  else {
                      $("#Aboutusdiv").show();
                       ExecuteOrDelayUntilScriptLoaded(getaboutpage, "sp.js");               
                 }
            }
            
       }
    },
        function () {
            alert('error : Get Company Approvers Details.');
        });
}

 
function getonedriveitem() {

    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$select=*&$filter=Title eq 'OneDrive'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {

            item = response.d.results[0];
            driveid = item.ID;
            var active = item.Active;
            var scope = item.scope;
            if (active) {
                $("#onedrivebtn").addClass('active');
                $("#collapse2").toggle(309);
            }

            $('#optionvalue').val(scope);
            if (scope == "Selective") {
                document.getElementById("onedrvadd").style.display = "block";
                var users = item.ListOfUsersId.results;
                FillAccountName("peoplePickeruser_TopSpan", users);
            }
        },
        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateonedriveitems(driveid) {
    var dfd = $.Deferred();
    var active = $('#onedrivebtn').hasClass('active');
    if (!active) {
        $('#onedrivebtn').attr('aria-pressed', 'true');
    }
    else {
        $('#onedrivebtn').attr('aria-pressed', 'true');
    }
    var scope = $('#optionvalue').val();
    // var add = $('#peoplePickeruser').val();
    if (scope == "Selective") {
        var adduser = eval(document.querySelector("input[id^='peoplePickeruser']").getAttribute('value'));
        //var add = adduser[0].Key;
        var userInfo = [];
        for (var i = 0; i < adduser.length; i++) {
            userInfo = userInfo + adduser[i].Key.split() + ',';
        }
        var add = userInfo.split(',');
        var updatedValueArr = [];
        var updatedValue = [];
        for (var i = 0; i < add[i].length; i++) {
            updatedValue = updatedValue + GetUserIdd(add[i]);
        }
        // GetUserIdd(add[0]);
        var update = updatedValue.substr(0, updatedValue.length - 1);
        var updateuser = update.split(',');

    }
    var userlist;
    if (scope == "Selective") {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                scope: scope,
                ListOfUsersId:
                {
                    'results': updateuser
                }
            })
    }
    else {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem',
                },
                Active: active,
                scope: scope

            })

    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + driveid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: userlist,
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data, items) {
            },
            error: function (error) {
            }
        })
}
function GetUserIdd(logonName) {
    var item =
    {
        'logonName': logonName
    }
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers:
        {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            return data.d.Id;
        },
        error: function (data) {
            failure(data)
        }
    })
    return UserId.responseJSON.d.Id + ','

}
var deptid = '';
function getdeptitems() {

    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'Mydepartmentonly' ";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {

            item = response.d.results[0];

            deptid = item.ID;
            var active = item.Active;
            var scope = item.scope;
            if (active) {
                $("#deptbtn").addClass('active');
                $("#collapse4").toggle(309);
            }
            $('#slctdept').val(scope);
            if (scope == "Selective") {
                document.getElementById("Deptsiteadd").style.display = "block";
                var users = item.ListOfUsersId.results;
                FillAccountName("peoplePickerdept_TopSpan", users);
            }
        },
        myError: function (response) {

        }
    });
}



function FillAccountName(ControlId, UsersValues) {

    try {

        for (var i = 0; i < UsersValues.length; i++) {
            var UserId = UsersValues[i];
            // UserId = UserId.get_lookupId();
            GetAccountName(ControlId, UserId);
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

function updatedeptitem(deptid) {
    var active = $('#deptbtn').hasClass('active');
    if (!active) {
        $('#deptbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#deptbtn').attr('aria-pressed', 'true');
    }
    var scope = $('#slctdept').val();
    if (scope == "Selective") {
        var adduser = eval(document.querySelector("input[id^='peoplePickerdept']").getAttribute('value'));

        var userInfo = [];
        for (var i = 0; i < adduser.length; i++) {
            userInfo = userInfo + adduser[i].Key.split() + ',';
        }
        var add = userInfo.split(',');
        var updatedValueArr = [];
        var updatedValue = [];
        for (var i = 0; i < add[i].length; i++) {
            updatedValue = updatedValue + GetUserIdd(add[i]);
        }
        // GetUserIdd(add[0]);
        var update = updatedValue.substr(0, updatedValue.length - 1);
        var updateuser = update.split(',');

    }

    var userlist;
    if (scope == "Selective") {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                scope: scope,

                ListOfUsersId:
                {
                    'results': updateuser
                }

            })
    }
    else {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                scope: scope

            })

    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + deptid + "')";
    $.ajax({
        url: siteurl,
        method: "POST",
        data: userlist,
        headers:
        {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {

        },
        error: function (error) {

        }
    })

}
var empid = '';
function getpersonaldetail() {
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'EmployeePersonalInfo' ";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            empid = item.ID;
            var active = item.Active;
            var scope = item.scope;
            if (active) {
                $("#empbtn").addClass('active');
                $("#collapse5").toggle(309);


            }
            $('#slctpersonal').val(scope);
            if (scope == "Selective") {
                document.getElementById("Employeeadd").style.display = "block";
                var users = item.ListOfUsersId.results;
                FillAccountName("peoplePickerpersonal_TopSpan", users);
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updatepersonaldetail(empid) {
    var dfd = $.Deferred();
    var active = $('#empbtn').hasClass('active');
    if (!active) {
        $('#empbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#empbtn').attr('aria-pressed', 'true');
    }
    var scope = $('#slctpersonal').val();
    if (scope == "Selective") {
        var adduser = eval(document.querySelector("input[id^='peoplePickerpersonal']").getAttribute('value'));

        var userInfo = [];
        for (var i = 0; i < adduser.length; i++) {
            userInfo = userInfo + adduser[i].Key.split() + ',';
        }
        var add = userInfo.split(',');
        var updatedValueArr = [];
        var updatedValue = [];
        for (var i = 0; i < add[i].length; i++) {
            updatedValue = updatedValue + GetUserIdd(add[i]);
        }
        // GetUserIdd(add[0]);
        var update = updatedValue.substr(0, updatedValue.length - 1);
        var updateuser = update.split(',');

    }

    var userlist;
    if (scope == "Selective") {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                scope: scope,

                ListOfUsersId:
                {
                    'results': updateuser
                }

            })
    }
    else {
        userlist = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                scope: scope

            })

    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + empid + "')";
    $.ajax({
        url: siteurl,
        method: "POST",
        data: userlist,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {

            dfd.resolve(true);

        },
        error: function (error) {

        }
    })
}
var splashid = '';
function getsplashpage() {

    Query = "?$filter=Title eq 'SplashPage'&$select=ID,Active,scope";
    $.ajax
        ({
            async: false,
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items/" + Query,
            method: "GET",
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {

                items = data.d.results;
                splashid = items["0"].ID;
                var active = items["0"].Active;
                if (active) {
                    $('#splashbtn').addClass('active');
                }

            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })
}
function updatesplashpage(splashid) {

    var splash = splashid;

    var active = $('#splashbtn').hasClass('active');
    if (!active) {
        $('#splashbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#splashbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + splashid + "')";

    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {

            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}

var layoutid = '';
function getnewlayout() {

    Query = "?$filter=Title eq 'TITANNewLayout'&$select=ID,Active ";
    $.ajax
        ({
            async: false,
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items/" + Query,
            method: "GET",
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                items = data.d.results;
                layoutid = items["0"].ID;
                var active = items["0"].Active;
                if (active) {
                    $('#siteviewbtn').addClass('active');
                }


            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })
}

function updatenewlayout(layoutid) {

    var active = $('#siteviewbtn').hasClass('active');
    if (!active) {
        $('#siteviewbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#siteviewbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + layoutid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {

            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var webpartid = '';
function getPrayerWebpart() {
    Query = "?$filter=Title eq 'PrayerWebpart'&$select=ID,Active,scope";
    $.ajax
        ({
            async: false,
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items/" + Query,
            method: "GET",
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                items = data.d.results;
                webpartid = items["0"].ID;
                var active = items["0"].Active;
                if (active) {
                    $('#prayerbtn').addClass('active');
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })
}

function updatePrayerWebpart(webpartid) {
    var active = $('#prayerbtn').hasClass('active');
    if (!active) {
        $('#prayerbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#prayerbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + webpartid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {

            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}


var newsid = '';

function getNewsContent() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'NewsContent'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            newsid = item.ID;
            var active = item.Active;
            if (active) {
                $('#newsbtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updateNewsContent(newsid) {

    var deferred = $.Deferred();

    var active = $('#newsbtn').hasClass('active');
    if (!active) {
        $('#newsbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#newsbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + newsid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}

var questionid = '';
function getQuestionAnswer() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'QuestionAnswer'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            questionid = item.ID;
            var active = item.Active;
            if (active) {
                $('#questbtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateQuestionAnswer(questionid) {

    var deferred = $.Deferred();

    var active = $('#questbtn').hasClass('active');
    if (!active) {
        $('#questbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#questbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + questionid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var surveyid = '';
function getSurvey() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'Survey'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            surveyid = item.ID;
            var active = item.Active;
            if (active) {
                $('#surveybtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateSurvey(surveyid) {

    var deferred = $.Deferred();

    var active = $('#surveybtn').hasClass('active');
    if (!active) {
        $('#surveybtn').attr('aria-pressed', 'true');
    }
    else {
        $('#surveybtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + surveyid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var magazineid = '';
function getMagazine() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'Magazine'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            magazineid = item.ID;
            var active = item.Active;
            if (active) {
                $('#magazinebtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateMagazine(magazineid) {

    var deferred = $.Deferred();

    var active = $('#magazinebtn').hasClass('active');
    if (!active) {
        $('#magazinebtn').attr('aria-pressed', 'true');
    }
    else {
        $('#magazinebtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + magazineid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var suggestionid = '';
function getSuggestion() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'Suggestion'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            suggestionid = item.ID;
            var active = item.Active;
            if (active) {
                $('#sugbtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateSuggestion(suggestionid) {

    var deferred = $.Deferred();

    var active = $('#sugbtn').hasClass('active');
    if (!active) {
        $('#sugbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#sugbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + suggestionid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}

var initiativeid = '';
function getInitiative() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'Initiative'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            initiativeid = item.ID;
            var active = item.Active;
            if (active) {
                $('#initiativebtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updateInitiative(initiativeid) {
    var deferred = $.Deferred();
    var active = $('#initiativebtn').hasClass('active');
    if (!active) {
        $('#initiativebtn').attr('aria-pressed', 'true');
    }
    else {
        $('#initiativebtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + initiativeid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}

var productid = '';
function getProductPage() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'ProductPage'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            productid = item.ID;
            var active = item.Active;
            if (active) {
                $('#Pagebtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateProductPage(productid) {
    var deferred = $.Deferred();
    var active = $('#Pagebtn').hasClass('active');
    if (!active) {
        $('#Pagebtn').attr('aria-pressed', 'true');
    }
    else {
        $('#Pagebtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + productid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var carrierid = '';
function getCarrierPage() {
    var deferred = $.Deferred();
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'CarrierPage'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            carrierid = item.ID;
            var active = item.Active;
            if (active) {
                $('#Carrierbtn').addClass('active');
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateCarrierPage(carrierid) {
    var deferred = $.Deferred();
    var active = $('#Carrierbtn').hasClass('active');
    if (!active) {
        $('#Carrierbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#Carrierbtn').attr('aria-pressed', 'true');
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + carrierid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}


var rssid = '';

function getRssfeed1() {

    var deferred = $.Deferred();

    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'RSS FEED1'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            rssid = item.ID;
            var active = item.Active;
            var reftime = item.RefreshTime;
            var time = '';
            if ((reftime / 60) >= 1) {
                time = (reftime / 60) + " hour";
            }
            else
                time = reftime + " minute";
            if (reftime == 0) {
                time = (reftime / 60) + " (No refresh)";
            }

            if (active) {
                $('#rss1btn').addClass('active');
                $("#collapse6").toggle(309);
                

            }
             $("#txtName").val(item.Label);
             $("#Link").val(item.Service_Link.Url);
             $("#Link").attr("disabled", true);

            $("#timer").val(time);
            if (reftime > 0) {
                setInterval('updateRssfeed(rssid)', reftime * 6000 * 10);
            }
            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function updateRssfeed1(rssid) {
    
    var deferred = $.Deferred();
    var active = $('#rss1btn').hasClass('active');
    if (!active) {
        $('#rss1btn').attr('aria-pressed', 'true');
    }
    else {
        $('#rss1btn').attr('aria-pressed', 'true');
    }
    var name = $("#txtName").val();
 
    var timer = $("#timer").val();
    var time;
    if (timer == null) {
        time;
    }
    else {

        if (timer.indexOf("hour") > -1) {
            time = timer.split(' ')[0] * 60;
        }
        if (timer.indexOf("minute") > -1) {
            time = timer.split(' ')[0];
        }
        if (timer.indexOf("(No refresh)") > -1) {
            time = timer.split(' ')[0];
        }
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + rssid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                    Label: name,
                    RefreshTime: time,
                    


                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var rssid2 = '';
function getRssfeed2() {

    var deferred = $.Deferred();

    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'RSS FEED2'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {

            item = response.d.results[0];
            rssid2 = item.ID;
            var active = item.Active;
            var reftime = item.RefreshTime;
            var time = '';
            if ((reftime / 60) >= 1) {
                time = (reftime / 60) + " hour";
            }
            else
                time = reftime + " minute";
            if (reftime == 0) {
                time = (reftime / 60) + " (No refresh)";
            }

            if (active) {
                $('#rssbtn2').addClass('active');
                $("#collapse7").toggle(309);
                $("#txtName2").val(item.Label);
                


            }
               $("#txtName2").val(item.Label);
               $("#Link2").val(item.Service_Link.Url);
              $("#Link2").attr("disabled", true);


            $("#timer2").val(time);
            if (reftime > 0) {
                setInterval('updateRssfeed2(rssid2)', reftime * 6000 * 10);
            }
            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updateRssfeed2(rssid2) {    
      

    var deferred = $.Deferred();
    var active = $('#rssbtn2').hasClass('active');
    if (!active) {
        $('#rssbtn2').attr('aria-pressed', 'true');
    }
    else {
        $('#rssbtn2').attr('aria-pressed', 'true');
    }
    var name = $("#txtName2").val();
     
    var timer = $("#timer2").val();
    var time;
    if (timer == null) {
        time;
    }
    else {

        if (timer.indexOf("hour") > -1) {
            time = timer.split(' ')[0] * 60;
        }
        if (timer.indexOf("minute") > -1) {
            time = timer.split(' ')[0];
        }
        if (timer.indexOf("(No refresh)") > -1) {
            time = timer.split(' ')[0];
        }
    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + rssid2 + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.EnvironmentalSettingsListItem'
                    },
                    Active: active,
                    Label: name,
                    RefreshTime: time,
                   


                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })

}
var quicklinkid = '';
function getQuickLink() {

    var deferred = $.Deferred();

    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'QuickLink'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {

            item = response.d.results[0];

            quicklinkid = item.ID;
            var active = item.Active;


            if (active) {
                $('#quicklink').addClass('active');
                $("#collapse8").toggle(309);
                $("#txtName3").val(item.Label);
            }
            if (active == true) {
                var users = item.ListOfUsersId.results;
                FillAccountName("peoplePickerquicklinks_TopSpan", users);
            }

            deferred.resolve();

        },

        myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updateQuickLink(quicklinkid) {
    var deferred = $.Deferred();
    var active = $('#quicklink').hasClass('active');
    if (!active) {
        $('#quicklink').attr('aria-pressed', 'true');
    }
    else {
        $('#quicklink').attr('aria-pressed', 'true');
    }
    var name = $("#txtName3").val();
    if (active == true) {
        var adduser = eval(document.querySelector("input[id^='peoplePickerquicklinks']").getAttribute('value'));
        var userInfo = [];
        for (var i = 0; i < adduser.length; i++) {
            userInfo = userInfo + adduser[i].Key.split() + ',';
        }
        var add = userInfo.split(',');
        var updatedValueArr = [];
        var updatedValue = [];
        for (var i = 0; i < add[i].length; i++) {
            updatedValue = updatedValue + GetUserIdd(add[i]);
        }
        // GetUserIdd(add[0]);
        var update = updatedValue.substr(0, updatedValue.length - 1);
        var updateuser = update.split(',');
    }
    var user;
    if (active == true) {
        user = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                Label: name,
                ListOfUsersId:
                {
                    'results': updateuser
                }
            })
    }
    else {
        user = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
            })

    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + quicklinkid + "')";
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: user,
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })
}
var aboutusid = '';
function getaboutpage() {
    var item;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$filter=Title eq 'AboutUsPage' ";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            item = response.d.results[0];
            aboutusid = item.ID;
            var active = item.Active;
            if (active) {
                $("#aboutusbtn").addClass('active');
                $("#collapse9").toggle(309);
            }
            if (active == true) {
                var users = item.ListOfUsersId.results;
                FillAccountName("peoplePickeraboutus_TopSpan", users);
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}
function updateaboutpage(aboutusid) {
  
    var dfd = $.Deferred();
    var active = $('#aboutusbtn').hasClass('active');
    showhidefromnav(active,NavAboutusId);
    if (!active) {
        $('#aboutusbtn').attr('aria-pressed', 'true');
    }
    else {
        $('#aboutusbtn').attr('aria-pressed', 'true');
    }
    if (active == true) {
        var adduser = eval(document.querySelector("input[id^='peoplePickeraboutus']").getAttribute('value'));
          if (adduser =="")
        {
          alert("Please Enter Contributors In About Us Page")
        }

        var userInfo = [];
        for (var i = 0; i < adduser.length; i++) {
            userInfo = userInfo + adduser[i].Key.split() + ',';
        }
        var add = userInfo.split(',');
        var updatedValueArr = [];
        var updatedValue = [];
        for (var i = 0; i < add[i].length; i++) {
            updatedValue = updatedValue + GetUserIdd(add[i]);
        }
        // GetUserIdd(add[0]);
        var update = updatedValue.substr(0, updatedValue.length - 1);
        var updateuser = update.split(',');
         
    }
    
    var user;
    if (active == true) {
        user = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
                ListOfUsersId:
                {
                    'results': updateuser
                }
            })
    }
    else {
        user = JSON.stringify
            ({
                '__metadata':
                {
                    type: 'SP.Data.EnvironmentalSettingsListItem'
                },
                Active: active,
            })

    }
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + aboutusid + "')";
    $.ajax({
        url: siteurl,
        method: "POST",
        data: user,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            dfd.resolve(true);
        },
        error: function (error) {

        }
    })
}


function  showhidefromnav(active,NavAboutusId)
{   
 
   var Listname= "Navigation";
   if(active=="true"){
     var status="Yes";
   }
   else{
     var status="No";
   }
   
   var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + Listname+ "')/items('" + NavAboutusId+ "')";;
    $.ajax
        ({
            url: siteurl,
            method: "POST",
            data: JSON.stringify
                ({
                    '__metadata':
                    {
                        'type': 'SP.Data.NavigationListItem'
                    },
                    Status: active
                }),
            headers:
            {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data) {
           localStorage.setItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + titanForWork.getQueryStringParameter("CompanyId"), null);

                
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        })
}

var NavAboutusId='';
function getAvoutusnav()
{  
   var Listname= "Navigation";
    
   var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + Listname+ "')/items?$filter=Title eq 'About Us' and Company eq '"+currentCompanyid +"'";
    $.ajax({  
		url: siteurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
		{	 
            var items = data.d.results;  
            NavAboutusId=items[0].ID; 
             
              
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}





