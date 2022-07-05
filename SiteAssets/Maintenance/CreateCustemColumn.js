$(document).ready(function () {
    var myVar = $("#btnSubmit").find('.panel-heading-bg-txt-clr').val();
    //alert(myVar);

    $('#btnCreateCustomColumn').click(function () {
        createNewCustomColumn();
    });
    $('#btnenvironmental').click(function () {
        addEnvironmentalSettingsEntry();
    });
    

    $('#btnFilProject').click(function () {
        getProjects();
    });


    $("input[name='optradio']:checked")
    $('#btncustomer').click(function () {
        AddCustomer();

    });

    $('#btnCreateCustomColumns').click(function () {
        CreateListColumns();

    });


    $('#btnAddEmployee').click(function () {
        Addemployee();

    });

    $('#btnaddComment').click(function () {
        AddCommentInAnnouncement();

    });

    $('#btnaddProject').click(function () {
        addProjectkDetails();

    });

    $('#btnChangePriority').click(function () { //Priyanshu Pandey - 20, Feb 2021			
        if (confirm("The related MS Flow must be stopped. \n Do want to continue ?")) {
            ChangePriority();
        }
    });
    $('#btnFillAssignedByTask').click(function () { //Priyanshu Pandey - 07, Mar 2021		-- 	to fill 'Assigned By' column in 'EmployeeTaskDetails' list
        if (confirm("The related MS Flow must be stopped. \n Do want to continue ?")) {
            getBlankAssignedBy();
        }
    });
    $('#btnUpdateTaskCounter').click(function () { //Priyanshu Pandey - 07, Mar 2021		-- 	to update Task counter in EmployeeTaskCounter list
        if (confirm("The related MS Flow must be stopped. \n Do want to continue ?")) {
            waitingDialog.show();
            setTimeout(function () {
                getInternalEmployees();
            }, 500);
        }
    });
    $('#btnChangeCompanyId').click(function () { //lakhan - 02, mar 2022
        ChangeCompanyId();

    });
    $('#btnDocumentColumn').click(function () { //lakhan - 04, mar 2022        
        if (confirm("The related MS Flow must be stopped. \n Do want to continue ?")) {
            waitingDialog.show();
            setTimeout(function () {
                fileShareDocumentColumn();
            }, 500);
        }
   

    });
    
    $('#btnTaskItemByTaskCategory').click(function () { //lakhan - 09, mar 2022        
        if (confirm("The related MS Flow must be stopped. \n Do want to continue ?")) {
            waitingDialog.show();
            setTimeout(function () {
                getTaskItemByTaskCategory();
            }, 500);
        }
   

    });



});

var TaskAssignTo = [116, 20, 32];

function addEmployeeTaskDetails() {
    var ListName = 'EmployeeTaskDetails';

    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 50);


    for (var i = 1; i <= 500; i++) {
        var TaskName = 'TestTask' + i;

        var Metadata;
        Metadata = {
            __metadata: { 'type': 'SP.Data.EmployeeTaskDetailsListItem' },
            TaskAssignToId: {
                'results': TaskAssignTo
            },
            Title: TaskName,
            CurrentPhase: 'Open',
            TaskType: 'General task',
            //Description: Discription,
            StartDate: CurrentDate,
            DueDate: '01/01/2023',
            TaskPriority: 'Medium',
            Worktype: 'Fixed Bugs',
            Distribution: 'Consolidated',
            CompanyId: Logged_CompanyId
        };
        $.when(AddItemEmp(ListName, Metadata)).done(function (responseIdmore) {
            if (i == 500) {
                alert('Submit successfully');

            }
            //console.log(i)	;       

        })
    }

}

function addProjectkDetails() {
    var ListName = 'ProjectDetails';
    var Description = 'A pie chart (or a circle chart) is a circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents. While it is named for its resemblance to a pie which has been sliced, there are variations on the way it can be presented. The earliest known pie chart is generally credited to William Playfair ie charts are very widely used in the business world and the mass media.[3] However, they have been criticized,[4] and many experts recommend avoiding them,[5][6][7][8]'
    var today = new Date();
    var endDate = new Date('26/5/2022');
    var CurrentDate = today.toISOString().substring(0, 50);


    for (var i = 3000; i <= 5000; i++) {
        var ProjectName = 'TestProject' + i;
        var Metadata;
        Metadata = {
            __metadata: {
                'type': 'SP.Data.ProjectDetailsListItem'
            },
            Title: ProjectName,
            ProjectCode: '2540D',
            ProjectName: ProjectName,
            ProjectDescription: Description,
            ProjectSiteURL: '',
            DepartmentId: '50',
            Department_IDId: Logged_DepartmentId,
            //ClientName:'ABC',
            ActualStartDate: CurrentDate,
            PlanedStartDate: CurrentDate,
            PlanedEndDate: '2022-10-26T12:10:10.641Z',
            TechnologyUsed: '',
            Status: 'Live',
            DepartmentName: '50',
            // ConsultantName: '',
            ManagerNameId: 32,
            //StackeholderId:{ 'results': 20},
            //SponsorId:116,
            OfficeLocation: 'Gurgaon Main Office',
            Domain: 'ABC',
            //OfficeLocationID: '',
            Office_Location_IdId: Logged_Location,
            CompanyId: '2',
            /*MultipleStackeholderId: { 'results': 20},
            MultipleSponsorId: { 'results': 116},
            ProjectInternalName: ProjectName,*/
            ClientIDId: 3,
            ProgramIDId: 2
            //HoursPerDay: HoursPerDay,
            //EstimatedWorkHours: 2
        };


        $.when(AddItemEmp(ListName, Metadata)).done(function (responseIdmore) {
            if (i == 5000) {
                alert('Submit successfully');

            }
            //console.log(i)	;       

        })
    }

}








function AddItemEmp(ListName, Metadata) {
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items";
    $.ajax({
        url: ownURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

/*-----------add Customer -------*/
function AddCustomer() {
    var ClientName = ''
    for (var i = 1; i <= 500; i++) {

        var Address = '';
        var Country = '';
        ClientName = 'Adapt' + i;
        var Email = 'Demo' + i + '@x.com';
        var AttnName = 'Lakhan' + i;
        var City = 'New York';
        var State = '';
        var ZIP = '';
        var Number = '';
        var BusinessDomain = 'Adapt';
        var TaxId = '';
        var CustTypt = 'Gust';
        var ddlTemplate = '';
        //var IsActive=$('#checkbox').is(":checked");		 
        var ListName = "ClientMaster";
        var Metadata;
        Metadata = {
            __metadata: { 'type': 'SP.Data.ClientMasterListItem' },
            Title: ClientName,
            Client_Code: '205',
            Attn_Name: AttnName,
            BillingAddress: Address,
            EmailId: Email,
            Country: Country,
            IsActive: true,
            City: City,
            State: 'Up',
            //SelfCompany:'No',
            SalesPersonId: TaskAssignTo[0],
            InternalMembersId: { 'results': TaskAssignTo },
            TemplateType: 'Template1',
            InternalSupervisorId: TaskAssignTo[1],
            //ZIP_Code:ZIP,
            CustType: 'Guest',
            Contact_No: '02546580',
            //Association:Association,
            //BusinessDomain:BusinessDomain,
            //TAX_ID:TaxId,
            CompanyIDId: Logged_CompanyId


        };


        $.when(AddItemEmp(ListName, Metadata)).done(function (responseIdmore) {
            if (i == 500) {
                alert('Submit successfully');


            }
        })
    }
}


function Create_List() {
    createList('Test by lakhan')
}

function createList(listName) {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists";
    $.ajax({
        url: siteUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.List' },
            'BaseTemplate': 101,

            'Title': listName
        }),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function onQuerySucceeded(data) {
    alert(data.d.Title + " successfully created!");
}

function onQueryFailed() {
    alert('Error!');
}






function Addemployee() {
    var ListName = 'Employees';
    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 50);

    //var Title=Tom Patrick;
    var Metadata;
    for (var i = 4806; i <= 4900; i++) {
        Metadata = {
            __metadata: {
                'type': 'SP.Data.EmployeesListItem'
            },
            LogonNameId: 116,
            FullName: 'Lakhan sharma' + i,
            Title: 'Lakhan sharma' + i,
            ParentId: 400,
            Designation: 'BA',
            //GroupName: $scope.groupName,
            Manager: 'Dipankar Goswami',
            ManagerLoginNameId: 20,
            //MobileNumber: ,
            //ExtensionName: ,
            Email: 'lakhan.sharma@adapt-india.com',
            //DateOfBirth: GetDateStandardFormat($scope.dateofBirth),
            //DateOfAnniversary: GetDateStandardFormat($scope.dateofAnniversary),
            Gender: 'Male',
            //EmployeeID:1255,
            CompanyId: Logged_CompanyId,
            DepartmentId: Logged_DepartmentId,
            OfficeLocationId: Logged_Location,
            Status: 'Active',
            JoiningDate: CurrentDate,
            //DateofTermination: GetDateStandardFormat($scope.dateofTermination),
            //PostalAddresses: $scope.currentAddress,
            //City: $scope.city,
            //StateProvince: $scope.state,
            //ZIPPostalCode: $scope.zip,
            //Country: $scope.country,
            //HomePhone: $scope.homePhone,
            //OtherEMailAddress: $scope.otherEmail,
            //HomeAddress: $scope.parmanentAddress,
            //Introduction: $(".richText-editor").html(),
            PrimaryCompany: 'Primary'
        };

        $.when(AddItemEmp(ListName, Metadata)).done(function (responseIdmore) {
            if (i == 4900) {
                alert('Submit successfully');

            }
        })

    }
}


function AddCommentInAnnouncement() {
    var Metadata;
    for (var i = 1; i <= 1000; i++) {

        var userid = _spPageContextInfo.userId;
        var Employeeprofilepic = '/sites/Titan_2_2_1_DEV/Lists/Employees/Attachments/400/dipankar1.jpg';

        var listName = "AnnouncementsChild";
        var item = {
            '__metadata': { type: 'SP.Data.' + listName + 'ListItem' },

            'Item_ID': '1357',
            'WebPartName': 'Banner',
            'Comment': 'test' + i,
            'ReplierId': parseInt(userid),
            'Initials': "Parent",
            'ReplyforId': parseInt(userid),
            'UserImage': Employeeprofilepic

        };
        $.when(AddItemEmp(listName, item)).done(function (responseIdmore) {
            if (i == 1000) {
                alert('Submit successfully');

            }
        })

    }
}

var arrMeta = [
	{ FieldTypeKind: 2, Title: 'DocumentNo' },
	{ FieldTypeKind: 2, Title: 'DocumentType' },
	{ FieldTypeKind: 2, Title: 'DocumentWrittenBy' },
	{ FieldTypeKind: 3, Title: 'Details' },
	//{FieldTypeKind:20,Title:'Checked Out To'},
	{ FieldTypeKind: 20, Title: 'Shared' },
	{ FieldTypeKind: 20, Title: 'Shared With' },
	{ FieldTypeKind: 2, Title: 'AccessLevel' },
	{ FieldTypeKind: 2, Title: 'SecurityLevel' },
	{ FieldTypeKind: 2, Title: 'PermissionLevel' },
	{ FieldTypeKind: 2, Title: 'PermissionLevelId' },
	{ FieldTypeKind: 6, Title: 'Acknowledgement' },
	{ FieldTypeKind: 2, Title: 'Approval' },
	{ FieldTypeKind: 20, Title: 'ApprovedBy' },
	{ FieldTypeKind: 4, Title: 'ApprovedDate' },
	{ FieldTypeKind: 2, Title: 'ApprovedVersion' },
	{ FieldTypeKind: 2, Title: 'ApprovedByOutsider' },
	{ FieldTypeKind: 3, Title: 'Titan_Permission' }

]

function CreateListColumn() {
    console.log(arrMeta);
    //if()

    for (var i = 0; i < arrMeta.length; i++) {
        var Metadata;
        Metadata = {
            __metadata: { 'type': 'SP.FieldUser', 'addToDefaultView': 'true' },
            'FieldTypeKind': arrMeta[i].FieldTypeKind,
            'Title': arrMeta[i].Title,
            //"Required": "true",
            'SelectionMode': 0,
            //'Mult':'TRUE'
            //'EnforceUniqueValues': 1,
            'AllowMultipleValues': true
            //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
        }

        $.ajax
            ({
                // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
                // You can replace this with other site URL where you want to apply the function

                url: _spPageContextInfo.webAbsoluteUrl + "/Titan/InformationTechnology22255/_api/web/lists/getByTitle('DepartmentalDMS')/fields",
                type: "POST",
                async: false,
                //'DefaultView': true, 
                // 'FieldTypeKind' value in below line decide the datatype of the column.
                // Some 'FieldTypeKind' values are listed below, after the method, for reference.
                data: JSON.stringify(Metadata),
                headers:
                   {
                       // Accept header: Specifies the format for response data from the server.
                       "Accept": "application/json;odata=verbose",
                       //Content-Type header: Specifies the format of the data that the client is sending to the server
                       "Content-Type": "application/json;odata=verbose",
                       // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                       "X-RequestDigest": $("#__REQUESTDIGEST").val()
                   },
                success: function (data, status, xhr) {
                    console.log("Success" + Title);
                    alert('Created')
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
    }
}
function getGUID() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/Titan/IT/_api/web/lists/getByTitle('KnowledgeBaseCategory')/Items?$select=GUID";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results[0].__metadata;
            console.log(data.d.results[0].__metadata.uri);
            items.uri.split("guid'")[1].split("')")[0];
            return items;

        },
        error: function (dada) {
            console.log('Guid Field');
        }


    });
}


function createNewCustomColumn() {
    var SiteURl = $('#txtSubsiteURL').val().trim();
    var lastIndexOf=SiteURl.lastIndexOf('/');
    if (SiteURl.length == 0) {
        alert('Please Enter DMS site URl');
        return false;
    }
    if ($('.radioBtnClass').is(":checked") == false) {
        alert('Please select radio button');
        return false;
    }
    var ListName = SiteURl.split('/');
    ListName = ListName[ListName.length - 1];
    if (ListName == '/') {
        ListName = ListName[ListName.length - 2];
    }



    for (var i = 0; i < arrMeta.length; i++) {
        var Metadata;
        GetAllFieldsFromList(SiteURl.slice(0,lastIndexOf), ListName, arrMeta[i].Title);
        if (urlValidation == false) {
            return false;
        }
        if (arrColumn == '') {
            var ownURL = '';
            ownURL = SiteURl.slice(0,lastIndexOf) + "/_api/web/lists/getByTitle('" + ListName + "')/fields"
            if (arrMeta[i].FieldTypeKind == 6) {
                if (arrMeta[i].Title == 'Acknowledgement') {
                    Metadata = {
                        __metadata: { 'type': 'SP.FieldChoice', 'addToDefaultView': 'true' },
                        'FieldTypeKind': arrMeta[i].FieldTypeKind,
                        'Title': arrMeta[i].Title,
                        "Choices": { 'results': ['Required', 'Not Required', 'N/A'] }
                    }
                }
                else {

                    Metadata = {
                        __metadata: { 'type': 'SP.FieldChoice', 'addToDefaultView': 'true' },
                        'FieldTypeKind': arrMeta[i].FieldTypeKind,
                        'Title': arrMeta[i].Title,
                        "Choices": { 'results': ['Draft', 'Approved', 'Pending', 'Rejected'] }
                    }
                }
            }
            else {
                if (arrMeta[i].FieldTypeKind != 7) {
                    Metadata = {
                        __metadata: { 'type': 'SP.Field', 'addToDefaultView': 'true' },
                        'FieldTypeKind': arrMeta[i].FieldTypeKind,
                        'Title': arrMeta[i].Title
                        //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
                    }
                }
            }

            if (arrMeta[i].Title == 'Shared') {
                ownURL = SiteURl.slice(0,lastIndexOf) + "/_api/web/lists/getByTitle('" + ListName + "')/fields";
                Metadata = {
                    __metadata: { 'type': 'SP.FieldUser', 'addToDefaultView': 'true' },
                    'FieldTypeKind': arrMeta[i].FieldTypeKind,
                    'Title': arrMeta[i].Title,
                    'AllowMultipleValues': true
                    //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
                }
            }


            if (arrMeta[i].Title == 'Shared With') {
                ownURL = SiteURl.slice(0,lastIndexOf)+ "/_api/web/lists/getByTitle('" + ListName + "')/fields";
                Metadata = {
                    __metadata: { 'type': 'SP.FieldUser', 'addToDefaultView': 'true' },
                    'FieldTypeKind': arrMeta[i].FieldTypeKind,
                    'Title': arrMeta[i].Title,
                }

            }
            if (arrMeta[i].Title == 'ApprovedBy') {
                ownURL = SiteURl.slice(0,lastIndexOf) + "/_api/web/lists/getByTitle('" + ListName + "')/fields";
                Metadata = {
                    __metadata: { 'type': 'SP.FieldUser', 'addToDefaultView': 'true' },
                    'FieldTypeKind': arrMeta[i].FieldTypeKind,
                    'Title': arrMeta[i].Title,
                    'SelectionMode': 0,
                }

            }

            if (arrMeta[i].Title == 'ApprovedDate') {
                ownURL = SiteURl.slice(0,lastIndexOf) + "/_api/web/lists/getByTitle('" + ListName + "')/fields"
                Metadata = {
                    __metadata: { 'type': 'SP.FieldDateTime' },
                    'FieldTypeKind': arrMeta[i].FieldTypeKind,
                    'Title': arrMeta[i].Title,
                    'DisplayFormat': 0
                    //'DateOnly':0         
                }

            }
            $.ajax
                 ({
                     url: ownURL,
                     type: "POST",
                     async: false,
                     data: JSON.stringify(Metadata),
                     headers:
                          {
                              // Accept header: Specifies the format for response data from the server.
                              "Accept": "application/json;odata=verbose",
                              //Content-Type header: Specifies the format of the data that the client is sending to the server
                              "Content-Type": "application/json;odata=verbose",
                              // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                              "X-RequestDigest": $("#__REQUESTDIGEST").val()
                          },
                     success: function (data, status, xhr) {
                         console.log("Success " + arrMeta[i].Title);
                         if (arrMeta.length - 1 == i) {
                             alert('Created successfully !');
                         }

                     },
                     error: function (xhr, status, error) {
                         console.log("Failed");
                     }
                 });
        }
        else {
            //console.log('All ready Add ' + arrMeta[i].Title);
            if (arrMeta.length - 1 == i) {
                alert('All ready Added!');
            }
            if (arrMeta[i].Title == 'Shared') {
                UpdateFieldFromList(SiteURl.slice(0,lastIndexOf), ListName, arrMeta[i].Title)
            }
        }
    }
}
var arrColumn = 'test';
var urlValidation = true;
function GetAllFieldsFromList(siteURL, ListName, Title) {
    arrColumn = '';
    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function


            url: siteURL+ "/_api/web/lists/getByTitle('" + ListName + "')/fields?$filter=Title eq '" + Title + "'",
            method: "GET",
            async: false,
            headers:
               {
                   // Accept header: Specifies the format for response data from the server.
                   "Accept": "application/json;odata=verbose"
               },
            success: function (data, status, xhr) {
                var dataresults = data.d.results;
                if (dataresults.length > 0) {
                    for (var i = 0; i < dataresults.length; i++) {
                        ColumnTitle = dataresults[i]["Title"];
                        if ($("input[name='optradio']:checked").val() == '2') {
                            DeleteListColumn(siteURL, ColumnTitle, ListName);
                        }


                        // Title is one of the field properties, the same way you can get other properties just by specifying the property name here.
                        console.log(dataresults[i]["Title"]);
                    }
                }
            },
            error: function (xhr, status, error) {
                alert('Wrong Url !');
                urlValidation = false;

            }
        });
}

function UpdateFieldFromList(siteURL, ListName, Title) {
    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function

            url: siteURL+ "/_api/web/lists/getByTitle('" + ListName + "')/fields/getbytitle(" + Title + ")",
            method: "POST",
            data: JSON.stringify({
                '__metadata': {
                    // Type that you are modifying.
                    'type': 'SP.FieldUser', 'addToDefaultView': 'true'
                },
                'Description': 'Updated Description of the field',
                'FieldTypeKind': 20,
                'Title': Title,
                'AllowMultipleValues': true
            }),
            headers:
                {
                    // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
                    // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "PATCH",
                    // Accept header: Specifies the format for response data from the server.
                    "Accept": "application/json;odata=verbose",
                    //Content-Type header: Specifies the format of the data that the client is sending to the server
                    "Content-Type": "application/json;odata=verbose",
                    // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
            success: function (data, status, xhr) {
                console.log("Updated " + Title);
            },
            error: function (xhr, status, error) {
                console.log("Failed");
            }
        });
}


function DeleteListColumn(siteURL, columnName, ListName) {
    //var siteURL = $('#txtSubsiteURL').val().trim();

    $.ajax
        ({

            url: siteURL + "/_api/web/lists/getByTitle('" + ListName + "')/fields/getbytitle('" + columnName + "')",
            type: "POST",
            async: false,
            headers:
        {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose",
            //Content-Type header: Specifies the format of the data that the client is sending to the server
            "Content-Type": "application/json;odata=verbose",
            // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
            // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
            "IF-MATCH": "*",
            //X-HTTP-Method:  The MERGE method updates only the properties of the entity, while the PUT method replaces the existing entity with a new one that you supply in the body of the POST
            "X-HTTP-Method": "DELETE",
            // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
            success: function (data, status, xhr) {
                console.log("Delete Success " + columnName);
                urlValidation = true;
            },
            error: function (xhr, status, error) {
                console.log("Failed");
            }
        });
}


function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

//Priyanshu Pandey - Last Modified, 07 Mar 2021 --------------------Starts
//get all the Tasks with Priority eq 'Top'
function ChangePriority() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('EmployeeTaskDetails')/items/?$top=5000&$filter=TaskPriority eq 'Top'&$select=Id,TaskPriority&$OrderBy=Modified asc",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            if (dataresults.length > 0) {
                updatePriority(dataresults);
            }
            else {
                alert("No Task with Priority 'Top' has been found.");
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

//to update TaskPriority
function updatePriority(arrTaskIds) {
    var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        TaskPriority: 'High'
    };
    arrTaskIds.forEach(function (value, i) {
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + value.Id + "')",
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
            success: function (data) {
                dfd.resolve(data);
                if (arrTaskIds.length == (i + 1)) {
                    alert("All Task's Priority has been changed.");
                }
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while deleting task. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    });
}


//get all tasks whose 'Assigned By' is blank
function getBlankAssignedBy() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('EmployeeTaskDetails')/items/?$top=5000" +
            "&$filter=AssignedBy/EMail eq null&$select=Id,AssignedBy/EMail,Author/EMail,Author/Id&$expand=AssignedBy,Author&$OrderBy=Modified asc",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            if (dataresults.length > 0) {
                updateAssignedBy(dataresults);
            }
            else {
                alert("No Task with blank 'Assigned By' value has been found.");
                return false;
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            return;
        }
    });
}

//update all 'Assigned By' with same as 'Created' column value
function updateAssignedBy(arrTaskIds) {
    var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
    arrTaskIds.forEach(function (value, i) {
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            AssignedById: value.Author.Id
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + value.Id + "')",
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
            success: function (data) {
                dfd.resolve(data);
                if (arrTaskIds.length == (i + 1)) {
                    alert("All Task's 'Assigned By' column have been set.");
                }
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while changing task. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    });
}

//get All employee list to update counter
function getInternalEmployees() {
    var AllEmployees = '';
    pnp.Logger.subscribe(new pnp.ConsoleListener());
    pnp.Logger.activeLogLevel = pnp.LogLevel.Info;

    pnp.sp.web.get().then(function (w) {
        console.log(JSON.stringify(w, null, 4));
    });
    try {
        result = pnp.sp.web.lists
        .getByTitle("Employees")
        .items
            .select("ID,Status,LogonName/EMail,LogonName/ID,Email")
            .expand("LogonName")
            .filter("")
            .orderBy("", "")
            .getAll()
            .then(function (d) {
                AllEmployees = d.filter(function (obj) { //Filter array on the basis of Status = 'Active'
                    return obj.Status == "Active";
                });
                getExternalEmployees(AllEmployees);
            });
    }
    catch (e) {
        waitingDialog.hide();
        console.log(e);
    }

}

//get All ExternalEmployee list to update counter
function getExternalEmployees(AllEmployees) {
    var AllExtEmployees = '';
    pnp.Logger.subscribe(new pnp.ConsoleListener());
    pnp.Logger.activeLogLevel = pnp.LogLevel.Info;

    pnp.sp.web.get().then(function (w) {
        console.log(JSON.stringify(w, null, 4));
    });
    try {
        result = pnp.sp.web.lists
        .getByTitle("ExternalUsers")
        .items
            .select("ID,Status,LoginName/EMail,LoginName/ID,email")
            .expand("LoginName")
            .filter("")
            .orderBy("", "")
            .getAll()
            .then(function (d) {
                AllExtEmployees = d.filter(function (obj) { //Filter array on the basis of Status = 'Active'
                    return obj.Status == "Active";
                });
                checkInCounterList(AllEmployees, AllExtEmployees);
            });
    }
    catch (e) {
        waitingDialog.hide();
        console.log(e);
    }
}

//check User availble in CounterList
function checkInCounterList(AllIntEmployees, AllExtEmployees) {
    //First check for Internal employees - Task Inbox and OutBox and Approval Inbox and Outbox
    $.each(AllIntEmployees, function (index, value) {
        var Query = "?$top=5000&$select=*,UserId/Id,UserId/EMail&$expand=UserId&$filter=UserId/EMail eq '" + value.Email + "' ";
        $.when(getItemsWithQueryItem('EmployeeTaskCounter', Query)).done(function (CounterResults) {
            if (CounterResults.length > 0) {
                GetTaskInboxCount(value.Email, CounterResults[0].Id);
                GetTaskOutboxCount(value.Email, CounterResults[0].Id);
                GetApprovalInboxCount(value.Email, CounterResults[0].Id);
            }
            else {
                AddUserInCounterList(value.LogonName.ID, "Employee", value.Email, "Employee");
            }
        });
    });
    //First check for External employees - Task Inbox and OutBox
    $.each(AllExtEmployees, function (index, value) {
        var Query = "?$top=5000&$select=*,UserId/Id,UserId/EMail&$expand=UserId&$filter=UserId/EMail eq '" + value.email + "' ";
        $.when(getItemsWithQueryItem('EmployeeTaskCounter', Query)).done(function (CounterResults) {
            if (CounterResults.length > 0) {
                GetTaskInboxCount(value.email, CounterResults[0].Id);
                GetTaskOutboxCount(value.email, CounterResults[0].Id);
            }
            else {
                AddUserInCounterList(value.LoginName.ID, "GuestUser", value.email, "Guest");
            }
        });
    });
    alert("All counters have been updated.");
    waitingDialog.hide();
}


//Add user in Counter List
function AddUserInCounterList(UserId, EmpTitle, EmpEmail, Action) {
    Metadata = {
        __metadata: { 'type': 'SP.Data.EmployeeTaskCounterListItem' },
        'Title': EmpTitle,
        'UserIdId': UserId
    };
    AddedItemId = AddToSPList('EmployeeTaskCounter', Metadata);
    GetTaskInboxCount(EmpEmail, AddedItemId);
    GetTaskOutboxCount(EmpEmail, AddedItemId);
    if (Action == "Employee") {
        GetApprovalInboxCount(EmpEmail, AddedItemId);
    }
}


//get Task Inbox count - Pending and OverDue
function GetTaskInboxCount(EmpEmail, CounterItemId) {
    restQuery = "&$filter=((TaskAssignTo/EMail eq '" + EmpEmail + "' or DependencyTo/EMail eq '" + EmpEmail + "') and (CurrentPhase eq 'Open'))";
    var Query = "?$top=5000&$select=*,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified asc" + restQuery;
    $.when(getItemsWithQueryItem('EmployeeTaskDetails', Query)).done(function (arrLimitTaskInbox) {
        var TaskinboxChip = '';
        var pendingCounter = 0;
        var overdueCounter = 0;
        var CurrentDate = new Date();
        CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
        CurrentDate = new Date(CurrentDate);
        for (var i = 0; i < arrLimitTaskInbox.length; i++) {
            var DueDate = new Date(moment(arrLimitTaskInbox[i].DueDate.split('T')[0]).format("MM/DD/YYYY"));
            DueDate.setDate(DueDate.getDate());
            DueDate = new Date(DueDate);
            if (DueDate >= CurrentDate) {
                pendingCounter++;
            }
            else {
                overdueCounter++;
            }
        }

        UpdateTaskCounter(CounterItemId, pendingCounter, overdueCounter, "Inbox");

    });
}

//get Task Outbox count - Pending and OverDue
function GetTaskOutboxCount(EmpEmail, CounterItemId) {
    restQuery = "&$filter=((Author/EMail eq '" + EmpEmail + "' or AssignedBy/EMail eq '" + EmpEmail + "') and (CurrentPhase eq 'Open'))";
    var Query = "?$top=5000&$select=*,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified asc" + restQuery;
    $.when(getItemsWithQueryItem('EmployeeTaskDetails', Query)).done(function (arrLimitTaskOutbox) {
        var pendingCounter = 0;
        var overdueCounter = 0;
        for (var i = 0; i < arrLimitTaskOutbox.length; i++) {
            var DueDate = new Date(arrLimitTaskOutbox[i].DueDate);
            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            if (CurrentDate > DueDate) {
                overdueCounter++;
            }
            else {
                pendingCounter++;
            }
        }
        UpdateTaskCounter(CounterItemId, pendingCounter, overdueCounter, "Outbox");

    });
}

//Update Task counter in SP list
function UpdateTaskCounter(CounterItemId, PendingCounter, OverdueCounter, Action) {
    var ItemType = GetItemTypeForListName('EmployeeTaskCounter');
    if (Action == "Inbox") {
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            OpenTasksCount: parseInt(PendingCounter),
            OverdueCount: parseInt(OverdueCounter)
        };
    }
    else {
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            OpenTasksCount_Out: parseInt(PendingCounter),
            OverdueCount_Out: parseInt(OverdueCounter)
        };
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskCounter')/GetItemById('" + CounterItemId + "')",
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
        success: function (data) {
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}

//get Approval Inbox/OutBox count - Pending
function GetApprovalInboxCount(EmpEmail, CounterItemId) {
    var PendingCounterIn = 0;
    restQuery = "&$filter=((Approvers/EMail eq '" + EmpEmail + "') and (Status eq 'Initiated' or Status eq 'Forwarded'))";
    var Query = "?$top=5000&$select=*,Approvers/EMail,Approvers/Title,Approvers/Id&$Expand=Approvers&$OrderBy=Modified asc" + restQuery;
    $.when(getItemsWithQueryItem('ApprovalTaskList', Query)).done(function (arrLimitAppInbox) {
        PendingCounterIn = arrLimitAppInbox.length;
        restQuery = "&$filter=((Author/EMail eq '" + EmpEmail + "') and (Status eq 'Initiated' or Status eq 'Forwarded'))";
        var Query = "?$top=5000&$select=*,Author/EMail,Author/Title,Author/Id&$Expand=Author&$OrderBy=Modified asc" + restQuery;
        $.when(getItemsWithQueryItem('ApprovalTaskList', Query)).done(function (arrLimitAppOutbox) {
            UpdateApprovalCounter(CounterItemId, PendingCounterIn, arrLimitAppOutbox.length);
        });
    });
}


//Update Approval counter in SP list
function UpdateApprovalCounter(CounterItemId, InboxCounter, OutboxCounter) {
    var ItemType = GetItemTypeForListName('EmployeeTaskCounter');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        ApprovalCount_IN: parseInt(InboxCounter),
        ApprovalCount_OUT: parseInt(OutboxCounter)
    };
    
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskCounter')/GetItemById('" + CounterItemId + "')",
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
        success: function (data) {
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}

//Add Details to LIst
function AddToSPList(ListName, Metadata) {
    var AddedItemId = '';
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            AddedItemId = data.d.Id;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
    return AddedItemId;
}

//get list-items from SP list
function getItemsWithQueryItem(ListName, Query) {
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            DeferredObj.resolve(data.d.results);
        },
        error: function (error) {
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

//Priyanshu Pandey - Last Modified, 07 Mar 2021 --------------------Ends

function ChangeCompanyId() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('ApplicationLink')/items/?$top=5000&$filter=Company/ID ne null&$select=*,Company/ID,Id&$expand=Company&$OrderBy=Modified asc",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            if (dataresults.length > 0) {
                updateCompanyId(dataresults);
            }
            else {
                alert("No record found.");
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

//to update CompanyId
function updateCompanyId(arrTaskIds) {
    var ItemType = GetItemTypeForListName('ApplicationLink');
    var CompanyId = [];
    arrTaskIds.forEach(function (value, i) {
        CompanyId = [];
        CompanyId.push(value.Company.ID);

        Metadata = {
            __metadata: {
                'type': ItemType
            },
            CompanyIdId: { "results": CompanyId }
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/GetItemById(" + value.Id + ")",
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
            success: function (data) {
                dfd.resolve(data);
                if (arrTaskIds.length == (i + 1)) {
                    alert("Successfully.");
                }
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while deleting Application. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    });
}

//Lakhan Kumar Sharma - 02, March 2022 --------------------Ends

/*---------------Fill sharedocument column -----*/
function fileShareDocumentColumn() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('SharedDocument')/items/?$top=5000&$filter=SiteURL eq null and DocumentID ne null&$select=*,SharedUsers/EMail&$expand=SharedUsers/EMail&$OrderBy=Modified desc",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               if (dataresults.length > 0) {
                for (var i = 0; i < dataresults.length; i++) {
                    var urlStr = dataresults[i].DocumentURL;
                    var DocumentId = dataresults[i].DocumentID;
                    var SharedUsersEmail=''       
                    if(dataresults[i].SharedUsersId!=null){
                      SharedUsersEmail=dataresults[i].SharedUsers.results[0].EMail  
                    }                  
                    var shareDocumentId = dataresults[i].Id                   
                    var urlSplit = urlStr.split('/DocumentManagementSystem');                     
                    var ListName = 'DocumentManagementSystem';
                    var SiteUrl = _spPageContextInfo.webAbsoluteUrl;
                    var LibraryUrl = _spPageContextInfo.webAbsoluteUrl + '/DocumentManagementSystem';
                    if(urlSplit.length>1){
                      
                    }
                    else{
                        var str = urlStr.split('/DepartmentalDMS');
                            str =str[0].split('/sites/')[1].split('/');
                                               
                        ListName = 'DepartmentalDMS'
                        if(str.length>2){
                         SiteUrl = _spPageContextInfo.webAbsoluteUrl + '/' + str[1]+'/' + str[2];
                         LibraryUrl =_spPageContextInfo.webAbsoluteUrl + '/' + str[1]+'/' + str[2] + '/DepartmentalDMS';

                        }
                        else{
                            SiteUrl = _spPageContextInfo.webAbsoluteUrl + '/' + str[1]
                            LibraryUrl =_spPageContextInfo.webAbsoluteUrl + '/' + str[1]+'/' +'/DepartmentalDMS';

                        }
                        //LibraryUrl = SiteUrl = _spPageContextInfo.webAbsoluteUrl + '/' + str[1]+'/' + str[2] + '/DepartmentalDMS';
                    }
                    
                    
                    

                    var str1 =urlStr.split('/sites/');                    
                    str1='/sites/'+str1[1];
                    var str3=str1.split('/');
                    
                    var str2=str3[str3.length-1].split('.');
                    if(str2.length>1){
                     urlStr = str1.split('/'+str3[str3.length-1])
                     urlStr =str1;
                    }
                    else{urlStr = str1}
                    
                    if (ListName == 'DepartmentalDMS') {
                        GetFolderDetails(urlStr, DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl,SharedUsersEmail)
                    }
                    else {
                        GetDocumentsFiles(urlStr, DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl,SharedUsersEmail);
                    }
                    //GetFolderDetails(urlStr[0],str[3])
                    //updateShareDocument(dataresults);
                }
            }
            else {
                alert("No record found.");
                return false;
            }
            waitingDialog.hide();
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

//to update updateShareDocument
function updateShareDocument(arrTaskIds, shareDocumentId, ListName, SiteURL, LibraryURL,SharedUsersEmail) {
    var ItemType = GetItemTypeForListName('SharedDocument');
    var SharedUserEmail = '';
    var DocType = '';
    if (ListName == 'DepartmentalDMS') {
        SharedUserEmail = arrTaskIds[0].Author.EMail;
        DocType = arrTaskIds[0].DocumentType;
    }
    else{
        SharedUserEmail = arrTaskIds[0].AuthorEMail;   
        DocType = arrTaskIds[0].DocumentType;
        
    }
   
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        LibraryURL: LibraryURL,
        LibraryName: ListName,
        SiteURL: SiteURL,
        DocType: DocType,
        SharedFileTitle:arrTaskIds[0].FileLeafRef,
        SharedUserEmail: SharedUsersEmail
        //CompanyIdId:{"results":CompanyId}
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SharedDocument')/GetItemById(" + shareDocumentId + ")",
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
        success: function (data) {
            dfd.resolve(data);
            //alert("Successfully.");

        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting Application. " + JSON.stringify(data));
        }
    });
    return dfd.promise();

}


function GetFolderDetails(urlStr, DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl,SharedUsersEmail) {
    debugger
    //fileLeafRef=targetfolderUrl;
    var URL = urlStr.split('/DepartmentalDMS');
    URL = URL[0].split('/sites/')[1].split('/');
    if(URL.length>2){
     URL=URL[1]+'/'+URL[2];
    }
    else{URL=URL[1]}
    var SiteURL = SiteUrl;
    var LIbraryURL = LibraryUrl;
    var endPointURL = _spPageContextInfo.webAbsoluteUrl + "/" + URL + "/_api/Web/lists/GetByTitle('" + ListName + "')/Items?$select=*,Author/EMail,Author/Title,FileRef,FileLeafRef&$expand=Author/Title&$filter=ID eq " + DocumentId + "";

    $.ajax({
        url: endPointURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var folders = data.d.results;            
            if (folders.length > 0) {
                updateShareDocument(folders, shareDocumentId, ListName, SiteURL, LIbraryURL,SharedUsersEmail);
            }
            console.log(folders)






        }, eror: function (data) {
            console.log(data);
        }
    });
}


function GetDocumentsFiles(targetfolderUrl, DocumentId, shareDocumentId, ListName, SiteURL, LIbraryURL,SharedUsersEmail) {
    var folderUrl=targetfolderUrl.split('/');
    folderUrl=folderUrl[folderUrl.length-1];
    targetfolderUrl=targetfolderUrl.split('/'+folderUrl);
    var items=[];
    var endPointURL = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl[0] + "')?$select=*,Author/EMail,File_x0020_Type&$top=5000&$expand=Author/EMail,Folders,Folders/ListItemAllFields,Files,Folders/ListItemAllFields/Created_x0020_By,Files/ListItemAllFields/Created_x0020_By,Files/ListItemAllFields&$orderby=ListItemAllFields/TimeLastModified desc";
    $.ajax({
        url: endPointURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var files = data.d.Files.results;            
            var records = files.filter(function (v) {
                return v.ListItemAllFields.ID == DocumentId
            });
            if (records.length > 0) {
                var Email=records[0].ListItemAllFields.Created_x0020_By;
               Email= Email.split('membership|');
               items.push({
	               DocumentType:records[0].ListItemAllFields.DocumentType,
	               FileLeafRef:records[0].Title,
	               AuthorEMail:Email[1]               
               }) 
               
                updateShareDocument(items, shareDocumentId, ListName, SiteURL, LIbraryURL,SharedUsersEmail);
            }

        },
        eror: function (data) {

            console.log('error');
        }
    });

}











/*function fileShareDocumentColumn() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('SharedDocument')/items/?$top=5000&$filter=SiteURL eq null and DocumentID ne null&$select=*&$OrderBy=Modified asc",
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            if (dataresults.length > 0) {
                for (var i = 0; i < dataresults.length; i++) {
                    var urlStr = dataresults[i].DocumentURL;
                    var DocumentId = dataresults[i].DocumentID;

                    var shareDocumentId = dataresults[i].Id
                    var str = urlStr.split('/');
                    var ListName = 'DocumentManagementSystem';
                    var SiteUrl = _spPageContextInfo.webAbsoluteUrl;
                    var LibraryUrl = _spPageContextInfo.webAbsoluteUrl + '/DocumentManagementSystem';

                    if (str.length == 7) {
                        ListName = 'DepartmentalDMS'
                        SiteUrl = _spPageContextInfo.webAbsoluteUrl + '/' + str[3] + '/' + str[4];
                        LibraryUrl = SiteUrl = _spPageContextInfo.webAbsoluteUrl + '/' + str[3] + '/' + str[4] + '/DepartmentalDMS';
                    }
                    var str1 = '/' + str[str.length - 1]
                    urlStr = urlStr.split(str1)
                    if (ListName == 'DepartmentalDMS') {
                        GetFolderDetails(urlStr[0], DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl)
                    }
                    else {
                        GetMediaGalleryFiles(urlStr[0], DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl);
                    }
                    //GetFolderDetails(urlStr[0],str[3])
                    //updateShareDocument(dataresults);
                }
            }
            else {
                alert("No record found.");
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}




//to update updateShareDocument
function updateShareDocument(arrTaskIds, shareDocumentId, ListName, SiteURL, LibraryURL) {
    var ItemType = GetItemTypeForListName('SharedDocument');
    var SharedUserEmail = '';
    var DocType = '';
    if (ListName == 'DepartmentalDMS') {
        SharedUserEmail = arrTaskIds[0].Author.EMail;
        DocType = arrTaskIds[0].DocumentType;
    }

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        LibraryURL: LibraryURL,
        LibraryName: ListName,
        SiteURL: SiteURL,
        DocType: DocType,
        SharedUserEmail: SharedUserEmail
        //CompanyIdId:{"results":CompanyId}
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SharedDocument')/GetItemById(" + shareDocumentId + ")",
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
        success: function (data) {
            dfd.resolve(data);
            alert("Successfully.");

        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting Application. " + JSON.stringify(data));
        }
    });
    return dfd.promise();

}


function GetFolderDetails(urlStr, DocumentId, shareDocumentId, ListName, SiteUrl, LibraryUrl) {
    //fileLeafRef=targetfolderUrl;
    var URL = urlStr.replace('/DepartmentalDMS', '');
    URL = URL.split('/');
    URL = URL[2] + '/' + URL[3]
    var SiteURL = urlStr;
    var LIbraryURL = LibraryUrl;
    var endPointURL = _spPageContextInfo.webAbsoluteUrl + "/" + URL + "/_api/Web/lists/GetByTitle('" + ListName + "')/Items?$select=*,Author/EMail,Author/Title,FileRef,FileLeafRef&$expand=Author/Title&$filter=ID eq " + DocumentId + "";

    $.ajax({
        url: endPointURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var folders = data.d.results;
            if (folders.length > 0) {
                updateShareDocument(folders, shareDocumentId, ListName, SiteURL, LIbraryURL);
            }
            console.log(folders)






        }, eror: function (data) {
            console.log(data);
        }
    });
}


function GetMediaGalleryFiles(targetfolderUrl, DocumentId, shareDocumentId, ListName, SiteURL, LIbraryURL) {
    //if(ListName=='DocumentManagementSystem'){
    var endPointURL = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + targetfolderUrl + "')?$select=*,Author/EMail,File_x0020_Type&$top=5000&$expand=Author/EMail,Folders,Folders/ListItemAllFields,Files,Folders/ListItemAllFields/Created_x0020_By,Files/ListItemAllFields/Created_x0020_By,Files/ListItemAllFields&$orderby=ListItemAllFields/TimeLastModified desc";
    $.ajax({
        url: endPointURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var files = data.d.Files.results;
            return false;
            var records = files.filter(function (v) {
                return v.ListItemAllFields.ID == DocumentId
            });
            if (records.length > 0) {
                updateShareDocument(records, shareDocumentId, ListName, SiteURL, LIbraryURL);
            }

        },
        eror: function (data) {

            console.log('error');
        }
    });

}
*/
