var sorterTableMyDepartmentDocuments;
var sorterTableMyDepartmentDocumentsEveryone;
var departmentDoc = [];
var DeptId = "";

var selectedDepartmentDoc = new Array();
var selectedDepartmentDocrelativeurl = new Array();

departmentDoc.arrayLinksDoctype = new Array();
departmentDoc.BaseURL = "";
departmentDoc.departmentPermissionEditDocument = false
//Add Department Sub folder
departmentDoc.AddDepartmentSubFolder = function (newSubFolder) {

}
//Delete Department SubFolder
departmentDoc.DeleteDepartmentFolder = function (currentFolderUrl) {
    $(".context-menu").hide();
    if (confirm("Are you sure,you wan to delete this folder?")) {
        var webUrl = departmentDoc.BaseURL;
        $.when(departmentDoc.DeleteSubFolder(webUrl, currentFolderUrl)).done(function (data) {
            alert("Folder deleted successfully.");
            var cuurentFolderPath = $('#currentSubFolderMyDepartment').val();
            departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/" + cuurentFolderPath);

        });
    }
};
//Delete Department SubFolder
departmentDoc.DeleteCurrentFile = function (currentItemId) {
    if (confirm("Are you sure,you wan to delete this file?")) {
        var webUrl = departmentDoc.BaseURL;
        $.when(departmentDoc.DeleteFile(webUrl, currentItemId)).done(function (data) {
            alert("File deleted successfully.");
            var cuurentFolderPath = $('#currentSubFolderMyDepartment').val();
            departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/" + cuurentFolderPath);

        });
    }
};
//Get Department Documents
departmentDoc.GetDepartmentDocuments = function (subFolderlLink) {
    $(".context-menu").hide();
    var encodedeUrl = decodeURI(subFolderlLink)
    var surFoldersArray = new Array();
    encodedeUrl = encodedeUrl;
    var subFolders = encodedeUrl.split('/');
    var folderurls = "";
    for (var subFolderIndex = 0; subFolderIndex < subFolders.length; subFolderIndex++) {
        if (subFolders[subFolderIndex] == "DepartmentalDMS" || surFoldersArray.length > 0) {
            folderurls += subFolders[subFolderIndex] + "/";
            if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                surFoldersArray.push(departmentDoc.SubFolderProperties(folderurls, subFolders[subFolderIndex]));
            }
        }
    }
    departmentDoc.GenerateBradCumNavigation(surFoldersArray);
};
departmentDoc.AddNewSubFolder = function (baseUrl, newSubfoldersName) {
    var dfd = $.Deferred();
    var fullUrl = baseUrl + "/_api/web/folders";
    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Folder' },
            'ServerRelativeUrl': newSubfoldersName
        }),
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }, success: function (response) {
            dfd.resolve(true);
        },
        error: function (erre) {
            dfd.reject(erre);
            console.log('Error Folder not created')
        }
    });
    return dfd.promise();
};
departmentDoc.DeleteSubFolder = function (webUrl, folderServerRelativeUrl) {
    var dfd = $.Deferred();
    $.ajax({
        url: webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderServerRelativeUrl + "')",
        method: "POST",
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            dfd.resolve(true);
        },
        error: function (data) {
            dfd.reject(data);
            alert("Error occured in item deleting ." + data.responseText);
        }
    });
    return dfd.promise();
};
departmentDoc.DeleteFile = function (webUrl, deletingItemId) {
    var dfd = $.Deferred();
    $.ajax({
        url: webUrl + "/_api/web/lists/GetByTitle('DepartmentalDMS')/items('" + deletingItemId + "')",
        type: "POST",
        headers:
        {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            dfd.resolve(true);
        },
        error: function (data) {
            dfd.reject(data);
            alert("Error occured in item deleting ." + data.responseText);
        }
    });
    return dfd.promise();
};
departmentDoc.CreateCookies = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};
departmentDoc.ReadCookies = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};
// BradCum Navigation
departmentDoc.GenerateBradCumNavigation = function (surFoldersArray) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    for (var index = 0; index < surFoldersArray.length; index++) {
        //if (index != 0)
        {
            var targetUrl = "javascript:departmentDoc.GetMyDocumentsWithFilesFolder('" + surFoldersArray[index].folderUrl + "')";
            if (index == 0) {
                braCummHtml += '<li title="Root" class="mybradcumb first"><a href="' + targetUrl + '">Root</a></li>';
            }
            else {
                var subfolderLengthCheck = surFoldersArray[index].folderName;
                if (subfolderLengthCheck.length > 15) {
                    subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                }

                if (subfolderLengthCheck.length > 0) {
                    braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                }
            }
            if (index == surFoldersArray.length - 1) {
                targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                departmentDoc.GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
            }
        }
    }
    var bradCumDiv = $("#generateBradCumbNewMyDepartment");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    departmentDoc.ClickEventBradCumb();
};
departmentDoc.GetMyDocumentsWithFilesFolder = function (targetServerRaltiveUrl) {

    // $(".context-menu").hide(100);
    //Set CurrentFolder url
    $('#currentSubFolderMyDepartment').val(targetServerRaltiveUrl);

    //set cookies for current folder
    var cookiesName = "MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId;
    var cookiesvalue = $('#currentSubFolderMyDepartment').val();

    departmentDoc.CreateCookies(cookiesName, cookiesvalue, 7);
    var query = "";
    var DepartmentSiteUrl = departmentDoc.BaseURL;
    departmentDoc.GetMyDepartmentDocuments(query, DepartmentSiteUrl, targetServerRaltiveUrl);
};
departmentDoc.ClickEventBradCumb = function () {
    $(".mybradcumb ").unbind().click(function () {
        $(this).nextAll().remove(".mybradcumb ");
        //Create Cookies for Target Folder
    });
    //Create Cookies for Target Folder
    var cookiesName = "MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId;
    var cookiesvalue = $('#currentSubFolderMyDepartment').val();
    departmentDoc.CreateCookies(cookiesName, cookiesvalue, 7);
}
// Get Documents From Library
departmentDoc.GetMyDepartmentDocuments = function (query, siteURL, folderUrl) {

    var Ownurl = siteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,File_x0020_Type&$top=5000&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified desc" + query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var tableHeader = "";
            var tr = "";
            var files = data.d.Files.results;
            var folders = data.d.Folders.results;
            var itemFormCounter = 0;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].Name != "Forms") {
                    var encodeURILink = encodeURI(folders[i].ServerRelativeUrl)
                    var documentLink = "javascript:departmentDoc.GetDepartmentDocuments('" + encodeURILink + "')";
                    var folderIcon = "<span class='glyphicon glyphicon-folder-open'></span>&nbsp;&nbsp;";
                    var deletefolder = "";

                    var menuFolderHTML = "";
                    menuFolderHTML += "<li><a href=" + documentLink + "><i class='fa fa-folder-open'></i> Open</a></li>";   //For First li of menu

                    if (departmentDoc.departmentPermissionEditDocument == true) {
                        menuFolderHTML += "<li><a href=javascript:departmentDoc.DeleteDepartmentFolder('" + encodeURILink + "','" + folders[i].ListItemAllFields.Id + "')><i class='fa fa-trash'></i> Delete</a></li>";
                        menuFolderHTML += "<li><a href=javascript:DeptShareFolderProperties('" + folders[i].ListItemAllFields.Id + "','" + encodeURI(folders[i].Name) + "','" + encodeURILink + "')><i class='fa fa-share-alt'></i> Share</a></li>";;
                    }

                    var regardingContextMenuDIV = "<div class='divMenuClick'><i class='fa fa-cog' style='font-size:20px'></i><div class='menuListItems' style='display:none' >" + menuFolderHTML + "</div></div>";
                    tr = tr + "<tr><td></td><td><a href=" + documentLink + ">" + folderIcon + folders[i].Name + "</a></td><td style='text-align: center'>" + regardingContextMenuDIV + "</td><td style='text-align: center'>" + folders[i].Name + "</td><td></td><td>Folder</td><td></td><td></td><td></td>";
                    if (folders[i].ListItemAllFields.SecurityLevel != "Private" && folders[i].ListItemAllFields.SecurityLevel != null) {
                        tr = tr + "<td><a href=javascript:GetDeptSharedHistory('" + folders[i].ListItemAllFields.ID + "','" + encodeURI(folders[i].ServerRelativeUrl) + "','" + escape(folders[i].ListItemAllFields.Title) + "','" + escape(folders[i].ListItemAllFields.DocumentNo) + "','" + escape(folders[i].Name) + "','Folder')><i class='fa fa-users' style='font-size: 17px;'></i></a></td></tr>";
                    }
                    else {
                        tr = tr + "<td></td></tr>";
                    }
                }
                else {
                    itemFormCounter++;
                }
            }
            for (var i = 0; i < files.length; i++) {
                var regardingContextMenuDIV = "";
                var menuHTML = "";
                var icon = '';//GetDocumentTypeIcon(files[i].Name);
                var propertiesServerRelativeUrl = files[i].ListItemAllFields.ServerRedirectedEmbedUri; //siteURL + "/_layouts/15/WopiFrame.aspx?sourcedoc={" + files[i].UniqueId + "}&action=view";
                var sourcelocation = "&sourcelocation=../Pages/MyDocuments.aspx";

                var Department = files[i].ListItemAllFields.Department;
                var editPropertiesLink = ""

                if (propertiesServerRelativeUrl == null || propertiesServerRelativeUrl == "") {
                    //document  is not ediatable in browser
                    propertiesServerRelativeUrl = siteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(files[i].ServerRelativeUrl) + "&parent=" + encodeURIComponent(files[i].ServerRelativeUrl.substr(0, files[i].ServerRelativeUrl.lastIndexOf("/") + 0))
                    //encodeURI(files[i].ServerRelativeUrl);
                }
                menuHTML += "<li><a href=javascript:ViewinBrowser('" + propertiesServerRelativeUrl + "')><i class='fa fa-eye'></i><span data-localize='View'>View</span></a></li>";      //for first li of menu

                var deleteDocumentLink = "";
                if (departmentDoc.departmentPermissionEditDocument == true) {
                    // editPropertiesLink = "../Pages/UploadDocuments.aspx?DMSType=D&WebAppId=" + companyID + "&DepartmentId=" + Department + "&itemID=" + files[i].ListItemAllFields.ID + "&fileName=" + files[i].Name + sourcelocation;
                    menuHTML += "<li><a  id='edit' onclick=editdocument('D','" + Department + "','" + files[i].ListItemAllFields.ID + "','" + escape(files[i].Name) + "')><i class='fa fa-edit'></i><span data-localize='Properties'>Properties</span></a></li>";
                    // editPropertiesLink = "<li style='float:left;margin-left: 9px;'><a title='edit properties' data-toggle='modal' onclick=editdocument('D','" + Department+ "','" + files[i].ListItemAllFields.ID+ "','" +escape(files[i].Name)+ "')><i class='fa fa-edit'></i>  </a></li>";
                    // deleteDocumentLink = "<li style='float:left;margin-left: 9px;'><a title='delete' href=javascript:departmentDoc.DeleteCurrentFile(" + files[i].ListItemAllFields.Id + ")><i class='fa fa-trash'></i>   </a></li>";
                    menuHTML += "<li><a href=javascript:departmentDoc.DeleteCurrentFile(" + files[i].ListItemAllFields.Id + ")><i class='fa fa-trash'></i><span data-localize='Delete'>Delete</span></a></li>";
                }


                menuHTML += "<li><a download href='" + encodeURI(files[i].ServerRelativeUrl) + "'><i class='fa fa-download'></i><span data-localize='Download'>Download</span></a></li>";
                menuHTML += "<li><a href=javascript:departmentDoc.GetFileVersions('" + encodeURI(files[i].ServerRelativeUrl) + "','" + files[i].ListItemAllFields.Created + "','" + escape(files[i].ListItemAllFields.Title) + "','" + files[i].ListItemAllFields.DocumentNo + "','" + escape(files[i].Name) + "')><i class='fa fa-files-o'></i><span data-localize='Versions'>File Versions</span></a></li>";
                regardingContextMenuDIV = "<div class='divMenuClick'><i class='fa fa-cog' style='font-size:20px'></i><div class='menuListItems' style='display:none' >" + menuHTML + "</div></div>";


                if (files[i].Name != null) {
                    var DocumentNo = files[i].ListItemAllFields.DocumentNo;
                    if (DocumentNo == null) {
                        DocumentNo = "";
                    }
                    var DocumentType = files[i].ListItemAllFields.DocumentType;
                    if (DocumentType == null) {
                        DocumentType = "";
                    }
                    var Details = files[i].ListItemAllFields.Details;
                    if (Details == null) {
                        Details = "";
                    }
                    var DocumentWrittenBy = files[i].ListItemAllFields.DocumentWrittenBy;
                    if (DocumentWrittenBy == null) {
                        DocumentWrittenBy = "";
                    }
                    var FileName = files[i].Name;
                    var Title = files[i].ListItemAllFields.Title;
                    if (Title == null) {
                        Title = "";
                    }
                    var SecurityLevel = files[i].ListItemAllFields.SecurityLevel;



                    var lastModifiedDate = titanForWork.convertJSONDateAMPMWithDate(files[i].ListItemAllFields.Modified);
                    var parameter = "&itemID=" + files[i].ListItemAllFields.ID + "&fileName=" + FileName + sourcelocation;
                    var parameterLink = SecurityLevel;
                    var AccessLevel = files[i].ListItemAllFields.AccessLevel;
                    var ApprovalStatus = files[i].ListItemAllFields.ApprovalStatus



                    var downloadlink = "<li style='float:left'><a title='download' href='" + files[i].ServerRelativeUrl + "' target='_blank'><span class='fa fa-download'></span></a></li>";
                    var sharingiconlink = "";
                    // var versionLink = "<li style='float:left;margin-left: 9px;'><a title='Version history' href=javascript:departmentDoc.GetFileVersions('" + encodeURI(files[i].ServerRelativeUrl) + "','" + files[i].ListItemAllFields.Created + "')><i class='fa fa-files-o'></i></a></li>";
                    if (FileName.includes(".pdf") == false) {//to check if it's PDF
                        propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
                    }
                    if (AccessLevel != "Everyone" && AccessLevel != "Everyone_Nodownload") {
                        sharingiconlink += "<li style='float:left;margin-left: 20px;'><a title='Shared with Department only' href='javascript:void(0);'><i  class='glyphicon glyphicon-home' style='font-size: 15px;'></i></a>";
                        if (SecurityLevel != 'Private' && SecurityLevel != null) {
                            sharingiconlink += "<a href=javascript:GetDeptSharedHistory('" + files[i].ListItemAllFields.ID + "','" + encodeURI(files[i].ServerRelativeUrl) + "','" + escape(files[i].ListItemAllFields.Title) + "','" + escape(files[i].ListItemAllFields.DocumentNo) + "','" + escape(files[i].Name) + "','File')><i class='fa fa-users' style='font-size: 17px;'></i></a></li>";
                        }
                        else {
                            sharingiconlink += "</li>";
                        }
                    }
                    else {
                        if (ApprovalStatus == "Pending") {
                            sharingiconlink = "<li style='float:left;margin-left: 20px;'>Pending</li>";
                        }
                        else {
                            sharingiconlink += "<li style='float:left;margin-left: 20px;'><a title='Shared with Everyone' href='javascript:void(0);'><i  class='glyphicon glyphicon-globe' style='font-size: 15px;'></i></a>";
                            if (SecurityLevel != 'Private' && SecurityLevel != null) {
                                sharingiconlink += "<a href=javascript:GetDeptSharedHistory('" + files[i].ListItemAllFields.ID + "','" + encodeURI(files[i].ServerRelativeUrl) + "','" + escape(files[i].ListItemAllFields.Title) + "','" + escape(files[i].ListItemAllFields.DocumentNo) + "','" + escape(files[i].Name) + "','File')><i class='fa fa-users' style='font-size: 17px;'></i></a></li>";
                            }
                            else {
                                sharingiconlink += "</li>";
                            }
                        }
                    }

                    if (AccessLevel == "Everyone") {
                        tr = tr + "<tr><td><input type='checkbox' class='Departdocid'  value='" + files[i].ListItemAllFields.ID + "' title='" + encodeURI(files[i].ServerRelativeUrl) + "'></td><td><a href='" + propertiesServerRelativeUrl + "' class='doc_icon DeptFileName' target='_blank' >" + icon + FileName + "</a></td><td style='text-align: center'>" + regardingContextMenuDIV + "</td><td style='text-align: center'>" + Title + "</td><td>" + DocumentNo + "</td><td>" + DocumentType + "</td><td>" + DocumentWrittenBy + "</td><td>" + lastModifiedDate + "</td><td>" + Details + "</td><td>" + sharingiconlink + "</td></tr>";
                    }
                    else {
                        tr = tr + "<tr><td><input type='checkbox' class='Departdocid'  value='" + files[i].ListItemAllFields.ID + "' title='" + encodeURI(files[i].ServerRelativeUrl) + "'></td><td><a href='" + propertiesServerRelativeUrl + "' class='doc_icon DeptFileName' target='_blank' >" + icon + FileName + "</a></td><td style='text-align: center'>" + regardingContextMenuDIV + "</td><td style='text-align: center'>" + Title + "</td><td>" + DocumentNo + "</td><td>" + DocumentType + "</td><td>" + DocumentWrittenBy + "</td><td>" + lastModifiedDate + "</td><td>" + Details + "</td><td>" + sharingiconlink + "</td></tr>";
                    }
                }
            }

            var itemsCount = folders.length + files.length - itemFormCounter;
            var completebody = tr;
            $("#tableTempEmpOffice365DepartmentDocument>tbody").html("");
            $('#mydmsNorecordFound').hide();
            if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
            }

            $("#tableTempEmpOffice365DepartmentDocument>tbody").append(completebody);
            if (itemsCount > 0) {
                //departmentDoc.GenerateTableMyDocuments();
                $('.mydocumentsPagingValue').prop('selectedIndex', 1);

                $("#columnsMyDepartment").empty();
                $("#columnsMyDepartment").append('<option value="-1">All Columns</option>');
                $("#columnsMyDepartment").append('<option value="1">File</option>');
                $("#columnsMyDepartment").append('<option value="3">Title</option>');
                $("#columnsMyDepartment").append('<option value="4">Reference#</option>');
                $("#columnsMyDepartment").append('<option value="5">Type</option>');
                $("#columnsMyDepartment").append('<option value="6">Author</option>');
                $("#columnsMyDepartment").append('<option value="7">Modified Date</option>');
                $("#columnsMyDepartment").append('<option value="8">Details</option>');
            }
           // RightClickEvent();

            var TableRowCount = $('#tableTempEmpOffice365DepartmentDocument >tbody >tr').length;
            $('#lblMYDepartmentsDocumentCount').text(TableRowCount);
            selectedDepartmentDocumentsEvent()//Checkbox Selection to update metadata

        }, eror: function (data) {
            console.log('error');
        }
    });

}
departmentDoc.GenerateTableMyDocuments = function () {
    sorterTableMyDepartmentDocuments = new TINY.table.sorter('sorterTableMyDepartmentDocuments', 'tableTempEmpOffice365DepartmentDocument', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsMyDepartment',
        currentid: 'currentpageMyDepartment',
        totalid: 'totalpagesMyDepartment',
        startingrecid: 'startrecordMyDepartment',
        endingrecid: 'endrecordMyDepartment',
        totalrecid: 'totalrecordsMyDepartment',
        hoverid: 'selectedrowMyDepartment',
        pageddid: 'pagedropdownMyDepartment',
        navid: 'tablenavMyDepartment',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

var arrDepartmntEmail = [];

function selectedDepartmentDocumentsEvent() {

    $('.Departdocid').change(function () {
        selectedDepartmentDoc = [];
        selectedDepartmentDocrelativeurl = [];
        $('.Departdocid').each(function () {
            if ($(this).prop("checked") == true) {
                selectedDepartmentDoc.push($(this).val());
                selectedDepartmentDocrelativeurl.push($(this).attr("title"));
                var currentRow = $(this).closest("tr");
                var col1 = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                var col2 = currentRow.find("td:eq(3)").text(); // get current row 2nd TD
                var col3 = currentRow.find("td:eq(4)").text(); // get current row 2nd TD
                var col4 = currentRow.find("td:eq(5)").text(); // get current row 3rd TD
                var col5 = currentRow.find(".DeptFileName").attr('href'); // get current row 3rd TD
                arrDepartmntEmail.push({ File: col1, Title: col2, Reference: col3, Type: col4, serverUrl: col5 });
            }
        });
    });
}

departmentDoc.SubFolderProperties = function (folderUrl, folderName) {
    var folderProperties = [];
    folderProperties.folderUrl = folderUrl;
    folderProperties.folderName = folderName;
    return folderProperties;
};
departmentDoc.GetMyDepartment = function () {
    var doccompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,DepartmentId,LogonName/ID,LogonName/Title,LogonName/UserName,Company/ID,Department/DepartmentName&$expand=LogonName,Company,Department&$filter=CompanyId eq '" + doccompanyId + "' and LogonName/ID eq '" + _spPageContextInfo.userId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                departmentID = items[i].DepartmentId;
                currentuserdeptname = items[i].Department.DepartmentName;

                DeptId = items[i].DepartmentId.toString();



                departmentDoc.ShowUploadingButton(doccompanyId, departmentID);//check permission to show hide upload,edit and delete button

                //  departmentDoc.BaseURL = departmentDoc.ReadCookies("MyDepartmentDocumentBaseURL" + _spPageContextInfo.siteId);
                //  if (departmentDoc.BaseURL == null || departmentDoc.BaseURL == "") {
                departmentDoc.GetCurrentDepartmentSiteURL(items[i].DepartmentId);
                // }
                /*  else {
                      var currentDMSFolder = departmentDoc.ReadCookies("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
                      if (currentDMSFolder == null || currentDMSFolder == "") {
                          //Get My Department Documents
                          departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/DepartmentalDMS");
                      }
                      else {
                          //Get My Department Documents from last DMS Folder
                          departmentDoc.GetDepartmentDocuments(currentDMSFolder);
                      }
                  }*/


            }
        }, eror: function (data) {

            console.log('error');
        }
    });
}
departmentDoc.checkFolderSpecialCharaters = function (string) {

    //  var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,/~`-=";
    var specialChars = ".<>#%&*{}?:|\"\\/~`";


    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
}
departmentDoc.ChekFolderExistOrNot = function (dmsFolder, newFolderName) {

    var validation_flag = true;
    var Ownurl = departmentDoc.BaseURL + "/_api/Web/GetFolderByServerRelativeUrl('" + dmsFolder + "')?$select=ID,File_x0020_Type&$expand=Folders";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var folders = data.d.Folders.results;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].Name.toLowerCase() == newFolderName.toLowerCase()) {
                    validation_flag = false;
                }
            }
        }, eror: function (data) {

            console.log('error');
        }
    });
    return validation_flag;
}
departmentDoc.GetCurrentDepartmentSiteURL = function (deprtamentId) {
    var doccompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,CompanyIDId/ID,SiteURL&$filter=ID eq '" + deprtamentId + "' and CompanyIDId eq '" + doccompanyId + "'"
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].SiteURL);
                var cookiesName = "MyDepartmentDocumentBaseURL" + _spPageContextInfo.siteId;
                departmentDoc.CreateCookies(cookiesName, items[i].SiteURL, 7);
                departmentDoc.BaseURL = items[i].SiteURL;
                departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/DepartmentalDMS");
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}
departmentDoc.UploadDepartmentDocuments = function () {
    var departmentId = departmentID;
    var currentDepartmentUrl = "../Pages/UploadDocuments.aspx?WebAppId=2&DepartmentId=" + departmentId + "&sourcelocation=../Pages/MyDocuments.aspx?WebAppId=232S";
    $(location).attr('href', currentDepartmentUrl);
};
departmentDoc.ShowUploadingButton = function (companyID, departmentID) {
    var webPartCollection = new Array();
    webPartCollection.push("Documents");
    var users = UserExistInProcessApprover(companyID, departmentID, webPartCollection);
    //console.log(users);
    if (users.length > 0) {
        for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++) {
            if (users[collectionIndex].webPartName == "Documents") {
                $('#btnMyDepartmentAddFolders').show();
                $('#btnuploadDepartmentDocuments').show();
                $('#deptDocShare').show();
                $('#EditMetadata2').show();
                $('#deleteMutipleDepFile').show();
                departmentDoc.departmentPermissionEditDocument = true;
            }
        }
    }
    else {
        $('#btnMyDepartmentAddFolders').hide();
        $('#btnuploadDepartmentDocuments').hide();
        $('#deptDocShare').hide();
        $('#EditMetadata2').hide();

        departmentDoc.departmentPermissionEditDocument = false;

    }
};

departmentDoc.GetFileVersions = function (itemURL, datecreated, vertitle, verrefno, verfilename) {
    $(".context-menu").hide();

    $("#VisionTitleName").html(vertitle);
    $("#VersionreferNo").html(verrefno);
    $("#VisionFileName").html(verfilename);

    if (vertitle == "null" || vertitle == null) {
        $("#VisionTitleName").html('');
    }
    if (verrefno == "null" || verrefno == null) {
        $("#VersionreferNo").html('');
    }

    //  var webURL = departmentDoc.BaseURL + "/_api/Web/GetFileByServerRelativeUrl('" + itemURL + "')/Versions";
    var webURL = departmentDoc.BaseURL + "/_api/Web/GetFileByServerRelativeUrl('" + itemURL + "')/Versions?$select=Title,VersionLabel,Created,Url,CreatedBy/Title&$expand=CreatedBy";
    $.ajax({
        url: webURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            $('#myModalVersions').modal('show');
            var itemsVersion = data.d.results;
            var versionTR = "";
            for (var index = 0; index < itemsVersion.length; index++) {
                // var itemCreatedOn=  itemsVersion[index].Created;
                var labelVersion = itemsVersion[index].VersionLabel;
                var thisVersionUrl = itemsVersion[index].Url;
                // var itemCreatedOn = new Date(itemsVersion[index].Created);
                var formatedDate = convertJSONDateAMPMWithDate(itemsVersion[index].Created);
                //var formatedDate = ConvertJSONDateFormatToDaysFormat(itemsVersion[index].Created);//itemCreatedOn.toLocaleString([], { hour12: true });
                var ModifiedBy = itemsVersion[index].CreatedBy.Title;


                versionTR += "<tr><td style='padding: 5px;'>" + labelVersion + "</td><td style='padding: 5px;'>" + formatedDate + "</td><td style='padding: 5px;'>" + ModifiedBy + "</td><td style='padding: 5px;'><a download href='" + departmentDoc.BaseURL + "/" + thisVersionUrl + "' target='_blank'><i class='fa fa-download'></i>Download</a></td></tr>";
            }
            var formatedDate = convertJSONDateAMPMWithDate(datecreated);
            //var formatedDate = ConvertJSONDateFormatToDaysFormat(datecreated);
            if (itemsVersion.length == 0) {
                if (ModifiedBy == undefined) {
                    ModifiedBy = ''
                }
                versionTR += "<tr><td style='padding: 5px;'>1.0</td><td style='padding: 5px;'>" + formatedDate + "</td><td style='padding: 5px;'>" + ModifiedBy + "</td><td style='padding: 5px;'><a download href='" + itemURL + "' target='_blank'><i class='fa fa-download'></i>Download</a></td></tr>";
            }

            var completeVersionHTMLTable = versionTR;
            $('#allVersionList').html('');
            $('#allVersionList').append(completeVersionHTMLTable);
            console.log(itemsVersion);
        }, eror: function (data) {
            console.log('error');
        }
    });

}






departmentDoc.GenerateTableMyDepartmentEveryone = function () {
    sorterTableMyDepartmentDocumentsEveryone = new TINY.table.sorter('sorterTableMyDepartmentDocumentsEveryone', 'tableTempEmpOffice365DepartmentDocumentEveryone', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsMyDepartmentEveryone',
        currentid: 'currentpageMyDepartmentEveryone',
        totalid: 'totalpagesMyDepartmentEveryone',
        startingrecid: 'startrecordMyDepartmentEveryone',
        endingrecid: 'endrecordMyDepartmentEveryone',
        totalrecid: 'totalrecordsMyDepartmentEveryone',
        hoverid: 'selectedrowMyDepartmentEveryone',
        pageddid: 'pagedropdownMyDepartmentEveryone',
        navid: 'tablenavMyDepartmentEveryone',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

var DoctypeSiteUrl ='';
function GetDoctypes (query, siteURL) {
	DoctypeSiteUrl = siteURL;
    var Ownurl = siteURL + "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=ID,File_x0020_Type,ServerRedirectedEmbedUri,DocumentNo,DocumentType,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File" + query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
		{
            var items = data.d.results;
            //var DocTypes=[];
            $("#DocumentTypesDDL").empty();
            if(items.length>0)
            {
            	const distinctItems = [...new Map(items.map(item => [item["DocumentType"], item])).values()];
            	var SortOrdervalue = distinctItems.sort(function(a,b){return a.DocumentType< b.DocumentType? -1 : 1});
            	var check=''
            	$("#DocumentTypesDDL").append($("<option></option>").val('ALL').html('ALL'));            	 
            	for(var i=0; i<SortOrdervalue.length; i++)
            	{
            		//$("#DocTypesDDL").append($("<option></option>").val(SortOrdervalue[i].DocumentType).html(SortOrdervalue[i].DocumentType)); 
            		var ddlText=SortOrdervalue[i].DocumentType;
            		if(ddlText==null || ddlText=='-Select-')
            		{
            		  ddlText='Others';
            		}
            		if(check!=ddlText){
	            		$("#DocumentTypesDDL").append($("<option/>").val(ddlText).text(ddlText));
	            		check=ddlText;
            		}
            	}         	
            	
            	//var everyOneDocumentTypes = titanForWork.GetValueFromQueryString("DocumentType");
            	$("#DocumentTypesDDL").val(decodeURIComponent(titanForWork.GetValueFromQueryString("DocumentType")));
            	var ActionValue = $("#DocumentTypesDDL").val();
            	ActionValue =titanForWork.GetValueFromQueryString("DocumentType");
            	$("#DocTypeCard").text('Type: '+ActionValue);
            	
            	if(ActionValue != 'ALL')
            	{  
	                if(ActionValue == 'Others')
	                {
	                	//var query = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved'";
	                	var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '-Select-' or (ApprovalStatus eq 'Approved' and DocumentType eq null)";
	                	departmentDoc.GetDepartmentEveryOneDocuments(query, siteURL);
	                }
	                else{                	
	                	//var query = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved' and DocumentType eq '" + ActionValue + "'";
	                	var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '" + ActionValue + "'";
	                	departmentDoc.GetDepartmentEveryOneDocuments(query, siteURL);
                	}
                }
                else if(ActionValue == 'ALL')
                {
                	//var query = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved'";
                	var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved'";
                	departmentDoc.GetDepartmentEveryOneDocuments(query, siteURL);
                }
                           	
            }           
        }, 
		error: function (data) 
		{
            console.log(data);
        }
    });
}


function ApplyFilterDocType()
{
	var ActionValue = $("#DocumentTypesDDL").val();
	if(ActionValue != 'ALL')
 	{  
 	   if(ActionValue == 'Others')
	     {
	        //var query = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved'";
	        var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '-Select-' or (ApprovalStatus eq 'Approved' and DocumentType eq null)";
	        departmentDoc.GetDepartmentEveryOneDocuments(query, DoctypeSiteUrl );
	     }
	     else{ 	
	 		$("#DocTypeCard").text('Type: '+ActionValue);
	      	var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '" + ActionValue + "'";
			departmentDoc.GetDepartmentEveryOneDocuments(query, DoctypeSiteUrl );
		}
    }
    else if(ActionValue == 'ALL')
    {
    	$("#DocTypeCard").text('Type: '+ActionValue);
      	var query = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved'";
      	departmentDoc.GetDepartmentEveryOneDocuments(query, DoctypeSiteUrl );
	}           	
}


function SortDocuments(Action){
    if(Action=='Type')
    {
        var items=g_DocumentItems.sort(function(a,b){
            var keyA=a.DocumentType.toLowerCase();
            var keyB=b.DocumentType.toLowerCase();
            if(keyA<keyB)return -1;
            if(keyA>keyB)return 1;
            return 0;
        })
        bindDocument(items,g_siteURL)

    }
    if(Action=='File')
    {
       var items= g_DocumentItems.sort(function(a,b){
            var keyA=a.File.Name.toLowerCase();
            var keyB=b.File.Name.toLowerCase();
            if(keyA<keyB)return -1;
            if(keyA>keyB)return 1;
            return 0;
        })
        bindDocument(items,g_siteURL)

    }
    if(Action=='modified')
    {
        var items= g_DocumentItems.sort(function(a,b){
            var keyA = new Date(a.Modified),
		       keyB = new Date(b.Modified);
            if(keyA<keyB)return -1;
            if(keyA>keyB)return 1;
            return 0;
        })
        bindDocument(items,g_siteURL)

    }
    
}

g_DocumentItems=[];
departmentDoc.GetDepartmentEveryOneDocuments = function (query, siteURL) {
    var Ownurl = siteURL + "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=Acknowledgement,ID,File_x0020_Type,ServerRedirectedEmbedUri,DocumentNo,PermissionLevel,DocumentType,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File" + query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            var tableHeader = "";
            var tr = "";
            var NewTrDesign='';
            g_DocumentItems=items;
            g_siteURL=siteURL;            
            bindDocument(items,siteURL)
            
        }, eror: function (data) {
            console.log('error');
        }
    });
}


function bindDocument(items,siteURL){
    var tableHeader = "";
    var tr = "";
    var NewTrDesign='';
 for (var i = 0; i < items.length; i++) {

                var DocumentNo = items[i].DocumentNo;
                if (DocumentNo == null) {
                    DocumentNo = "";
                }
                var DocumentType = items[i].DocumentType;
                if (DocumentType == null) {

                    DocumentType = "Others";
                }
                if (DocumentType =='-Select-') {

                    DocumentType = "Others";
                }
                var Regarding = items[i].Regarding;
                if (Regarding == null) {
                    Regarding = "";
                }
                var Details = items[i].Details;
                if (Details == null) {
                    Details = "";
                }
                var DocumentWrittenBy = items[i].DocumentWrittenBy;
                if (DocumentWrittenBy == null) {
                    DocumentWrittenBy = "";
                }
                
                var SecurityLevel = items[i].SecurityLevel;
                if (SecurityLevel == null) {
                    SecurityLevel = "";
                }
                var AccessLevel = items[i].AccessLevel;
                if (AccessLevel == null) {
                    AccessLevel = "";
                }
                
                
				var DispAckBtn='display:none';
				if(items[i].Acknowledgement == 'Required')
				{
					DispAckBtn='display:block'
				} 
				
				
				var DownloadDocBtn='display:block';
				if(items[i].PermissionLevel== 'Restricted View'|| items[i].AccessLevel=='Everyone_Nodownload')
				{
					DownloadDocBtn='display:none'
				}

                var sourcelocation = "";
                var FileName = items[i].File.Name;
                var Department = items[i].Department;
                var lastModifiedDate = titanForWork.convertJSONDateAMPMWithDate(items[i].Modified);
                var linkDepartment = "";
                
                var FileExt =  FileName.split('.');//[1].toLowerCase();
    			var FileExtImage = GetFileExtensionImage(FileExt[FileExt.length-1].toLowerCase());
    			var ExtName = FileExt[FileExt.length-1].toLowerCase();
    			
    			var Title = items[i].Title;
                if (Title == null) {
                
                    Title = FileName.substring(0,FileName.length - parseInt(ExtName.length+1)) //"";
                }
                //if (checkDepartmentID == null || checkDepartmentID == "")
                //{
                //    sourcelocation = "&DepartmentId=" + Department + "&sourcelocation=../Pages/MyDocuments.aspx";
                //    linkDepartment = "D";//D for dashboard
                //}
                //else {
                //    sourcelocation = "&DepartmentId=" + Department + "&sourcelocation=../Pages/ViewAllDocuments.aspx";
                //    linkDepartment = "E";//E for Everyone
                //}

                var parameter = "&itemID=" + items[i].ID + "&fileName=" + FileName + sourcelocation;
                //if (departmentPermissionEditDocument == true)
                //{
                //    AccessLevel = "<a href='../Pages/UploadDocuments.aspx?DMSType=" + linkDepartment + "&WebAppId=" + companyID + parameter + "'>Edit</a>";
                //}
                //else {
                AccessLevel = "NA";
                //}

                // var FileServerRelativeUrl=items[i].File.ServerRelativeUrl;
                //   var documentLink = FileServerRelativeUrl;
                //   var icon = GetDocumentTypeIcon(FileName);

                var FileServerRelativeUrl = items[i].ServerRedirectedEmbedUri;
                if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
                    FileServerRelativeUrl = items[i].File.ServerRelativeUrl;
                }
                //$('#DocPreviewBox').attr('src', FileServerRelativeUrl);
                $('#doc-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + FileServerRelativeUrl + "'/></div>");
                
                var documentLink = FileServerRelativeUrl;
                var icon = departmentDoc.GetDocumentTypeIcon("." + items[i].File_x0020_Type);
                
                var Perameters=[];
                Perameters.push(items[i].ID,DocumentType,siteURL);
                var PassingVal = Perameters.toString();
                
                var NewPerameters=[];
                NewPerameters.push(items[i].ID,siteURL,items[i].File.ServerRelativeUrl);
                var NewPassingVal = NewPerameters.toString();
                g_DocumentURL=items[i].File.ServerRelativeUrl;
                
                
                var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
				//var NQuery = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(DocID eq '"+items[i].ID+"' and DepartmentID eq '"+ActiveDepartment+"')";
    			//var FilterResultQuery = RequestedInfo(NQuery);
    			var FilterResultQuery=getShareDocumentId(items[i].ID)
    			var FilteredRecViewCount=0;
    			var FilteredRecAcknowledgeCount=0;
    			var FilteredRecLikeCount=0;
    			if(FilterResultQuery.length>0){
	    		    FilteredRecViewCount=FilterResultQuery[0].View_count;
	    			FilteredRecAcknowledgeCount=FilterResultQuery[0].Acknowledge_count;
	    			FilteredRecLikeCount=FilterResultQuery[0].Like_count;
    			}
    			if(FilteredRecViewCount==null)FilteredRecViewCount=0
    			if(FilteredRecAcknowledgeCount==null)FilteredRecAcknowledgeCount=0
    			if(FilteredRecLikeCount==null)FilteredRecLikeCount=0
    			
    			/*if(FilterResultQuery.length>0)
    			{
    				var FilteredRecView = $.grep(FilterResultQuery, function(v) {
    					return v.View == true;
					});
		
					var FilteredRecAcknowledge = $.grep(FilterResultQuery, function(v) {
    					return v.Acknowledge == true;
					});
			
					var FilteredRecLike  = $.grep(FilterResultQuery, function(v) {
    					return v.Like == true;
					});
					
					FilteredRecViewCount = FilteredRecView.length;
					FilteredRecAcknowledgeCount = FilteredRecAcknowledge.length;
					FilteredRecLikeCount = FilteredRecLike.length;
				//	$("#AcknowledgeCount").text(FilteredRecAcknowledge.length);
				//	$("#ViewsCount").text(FilteredRecView.length);
				//	$("#LikesCount").text(FilteredRecLike.length);
    			}*/

 

                var downloadlink = "<a href='" + items[i].File.ServerRelativeUrl + "' target='_blank' download><span class='fa fa-download'></span></a>";
                tr = tr + "<tr><td><a href='" + documentLink + "' class='doc_icon' target='_blank' >" + icon + FileName + "</a></td><td>" + Title + "</td><td>" + DocumentNo + "</td><td>" + DocumentType + "</td><td>" + DocumentWrittenBy + "</td><td>" + Details + "</td><td style='text-align:center'>" + lastModifiedDate + "</td><td>" + downloadlink + "</td></tr>";
                var AcknowledgeId='Acknowledge'+items[i].ID;
                var likeId='Like'+items[i].ID;
                var Profile = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +items[i].Author.EMail;// escapeProperly(ExtResults[0].InternalMembers.results[k].EMail),                        
                NewTrDesign = NewTrDesign + "<tr>"+
												"<td class='text-left w-7 vertical-align-middle'>"+
													"<img src='"+FileExtImage+"' alt='img' class='table-icon-box'>"+
												"</td>"+
												"<td class='w-58'>"+
													"<a href='#' class='font-16' data-toggle='modal' data-target='#details-modal' id='Title"+items[i].ID+"' name="+items[i].File.ServerRelativeUrl+" onclick='SetAcknowledgedisplay(this,\""+NewPassingVal+"\")'>"+Title+"</a>"+
													"<div class='mt10 mb10' id='Desc"+items[i].ID+"'>"+Details+"</div>"+
														"<div class='acknowledge-btn-panel'>"+
															"<div class='groups-card'>"+
																"<div class='groups-card-head'>"+
																	"<img src='"+Profile+"' alt='user'>"+
																"</div>"+
																"<div class='groups-card-body'>"+
																	"<div class='groups-card-body-info text-ellipsis'>"+
																		"<h3 class='member-name text-ellipsis' id='Author"+items[i].ID+"'>"+items[i].Author.Title+"</h3>"+
																		//"<p class='member-deg text-ellipsis'><span>Leader</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>Marketting</span></p>"+
																		"<p class='member-email text-ellipsis'>"+items[i].Author.EMail+"</p>"+
																	"</div>"+
																"</div>"+
															"</div>"+
															"<div class='acknowledge-btns-box'>"+
																"<a type='button' style='"+DispAckBtn+"' class='btn acknowledge-btn' data-toggle='modal' name="+items[i].File.ServerRelativeUrl+" data-target='#details-modal' onclick='AcknowledgeDoc(this,\""+PassingVal+"\", \"" + NewPassingVal + "\", \"" + AcknowledgeId + "\",\"" + likeId+ "\")'>Acknowledge</a>"+
																"<a type='button' style='"+DownloadDocBtn+"' href='"+items[i].File.ServerRelativeUrl+"' target='_blank' class='btn acknowledge-btn' ><img class='detail-view-icon-info mr2' src='../SiteAssets/MyDocuments/DocumentsForAll/assets/images/download.png' alt='download'><span>Download</span></a>"+
															"</div>"+	
												        "</div>"+
												"</td>"+
												"<td class='w-35'>"+
													"<div class='d-flex'>"+
														"<label class='lable-view-name'>File name:</label>"+
												        "<div>"+FileName+"</div>"+
													"</div>"+
													"<div class='d-flex'>"+
														"<label class='lable-view-name'>Reference#:</label>"+
												        "<div>"+DocumentNo+"</div>"+
													"</div>"+
													"<div class='d-flex'>"+
														"<label class='lable-view-name'>Type:</label>"+
												        "<div>"+DocumentType +"</div>"+
													"</div>"+
													"<div class='d-flex experiences-inner-card-btn-panel'>"+
														"<ul class='experiences-inner-card-btn-item'>"+
												        	"<li class='experiences-inner-card-btn-panel-icon'>"+
																"<img src='../SiteAssets/MyDocuments/DocumentsForAll/assets/images/checkmark.png'>"+
															"</li>"+
															"<li class='experiences-inner-card-btn-panel-count' onclick='' id='"+AcknowledgeId+"'>"+FilteredRecAcknowledgeCount+"</li>"+
												        	"<li class='experiences-inner-card-btn-panel-icon'>"+
																"<img src='../SiteAssets/MyDocuments/DocumentsForAll/assets/images/visibility-icon.png'>"+
															"</li>"+
															"<li class='experiences-inner-card-btn-panel-count'>"+FilteredRecViewCount+"</li>"+
															"<li class='experiences-inner-card-btn-panel-icon'>"+
																"<img src='../SiteAssets/MyDocuments/DocumentsForAll/assets/images/like-icon.png'>"+
															"</li>"+
															"<li class='experiences-inner-card-btn-panel-count' id='"+likeId+"'>"+FilteredRecLikeCount+"</li>"+
														"</ul>"+
													"</div>"+
												"</td>"+
											"</tr>";

            }
            //var completebody = tr;
            var completebody = NewTrDesign;
            $("#tableTempEmpOffice365DepartmentDocumentEveryone").empty().append(NewTrDesign);
            var dvTable = $("#tableTempEmpOffice365DepartmentDocumentEveryone>tbody");
            dvTable.html("");
            $('#norecordFoundMydepartment').hide();
            if (items.length == 0) {
                $('#norecordFoundMydepartment').show();
            }
            //dvTable.append(completebody);
            if (items.length > 0) {
                //departmentDoc.GenerateTableMyDepartmentEveryone();
                //   departmentDoc.GenerateTableMyDocuments();


                $("#columnsMyDepartmentEveryone").empty();
                $("#columnsMyDepartmentEveryone").append('<option value="-1">All Columns</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="0">File</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="1">Title</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="2">Reference#</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="3">Type</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="4">Author</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="5">Details</option>');
                $("#columnsMyDepartmentEveryone").append('<option value="5">Modified Date</option>');

  }
}

function ListofActiveusers(PassingValue)
{
	var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
	var NQuery = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/Title,Author/EMail&$filter=(DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResultQuery = RequestedInfo(NQuery);
    
    var ActionBy='';
    
    if(FilterResultQuery.length>0)
    {
    	if(PassingValue == "ViewsUsers")
    	{
    		ActionBy = $.grep(FilterResultQuery, function(v) {
    			return v.View == true;
			});
		}
		else if(PassingValue == "AcknowledgeUsers")
		{		
			ActionBy = $.grep(FilterResultQuery, function(v) {
    			return v.Acknowledge == true;
			});
		}
		else if(PassingValue == "LikeUsers")
		{
			ActionBy = $.grep(FilterResultQuery, function(v) {
    			return v.Like == true;
			});
		}
		
		var HtmlDesign='';
		for(var i=0; i<ActionBy.length; i++)
		{
			var UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + ActionBy[i].Author.EMail//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
			HtmlDesign = HtmlDesign + 	"<li>"+
											"<a href='#'>"+
												"<img src='"+UserImage+"'>"+
												"<span class='ml5'>"+ActionBy[i].Author.Title+"</span>"+
											"</a>"+
										"</li>";
		}
		
		if(PassingValue == "ViewsUsers")
    	{
    		$("#ViewsCountLists").empty().append(HtmlDesign);
		}
		else if(PassingValue == "AcknowledgeUsers")
		{		
			$("#AcknowledgeCountLists").empty().append(HtmlDesign);
		}
		else if(PassingValue == "LikeUsers")
		{
			$("#LikesCountLists").empty().append(HtmlDesign);
		}	
    }
    else
    {
    	$("#ViewsCountLists").empty();				
		$("#AcknowledgeCountLists").empty();		
		$("#LikesCountLists").empty();    
    }
}


function SetAcknowledgedisplay(Actions,PassingValue)
{
	ActiveDocumnetNo = PassingValue.split(',')[0];
	var NewValues = PassingValue.split(',')[0];
	var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
	$("#DocTitleModel").text($("#Title"+NewValues).text());
	
	$("#DocAothorModel").text($("#Author"+NewValues).text());
	$("#DocDescModel").text($("#Desc"+NewValues).text());
	
	
	var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResult = RequestedInfo(Query);
    if(FilterResult.length>0)
    {
    	if(FilterResult[0].Acknowledge == true)
    	{
    		$('#AcknowledgeChkbox').prop('checked', true);
    		//$('#lbl-Acknowledge').text('Acknowledged');
    		//$('#lbl-Acknowledge').css("color","cornflowerblue");

    		
    	}
    	else if(FilterResult[0].Acknowledge == false)
    	{
    		$('#AcknowledgeChkbox').prop('checked', false);
    		$('#AcknowledgeChkbox').attr('disabled', false);    	
    	}
    	
    	if(FilterResult[0].Like == true)
    	{
    		$('#LikeChkbox').prop('checked', true);
    	}
    	else if(FilterResult[0].Like == false)
    	{
    		$('#LikeChkbox').prop('checked', false);    	
    	}

    }
    else
    {
    	$('#AcknowledgeChkbox').prop('checked', false);
    	$('#AcknowledgeChkbox').attr('disabled', false);
    	$('#LikeChkbox').prop('checked', false);
    }
    
    

	
	var Ownurl = PassingValue.split(',')[1]+ "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=Acknowledgement,ID,File_x0020_Type,ServerRedirectedEmbedUri,DocumentNo,DocumentType,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File&$filter=ID eq '"+PassingValue.split(',')[0]+"'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
            var items = data.d.results;            
            $("#DocTypeModel").text(items[0].DocumentType);
            if(items[0].Acknowledgement == "Required")
            {
            	$("#AcknowledgeChkboxDIV").css("display", "block");
            }
            else
            {
            	$("#AcknowledgeChkboxDIV").css("display", "none")
            }
            ActiveDocumnetNo = PassingValue.split(',')[0];
               
    		var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    		var FilterResult = RequestedInfo(Query);

    		if(FilterResult.length =='0')
    		{
    			var listName="DocumentAcknowledgement";
        		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Acknowledge':false,'DocumentID':ActiveDocumnetNo, 'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        		Universalinsert(listName,item);     
    		}

            //LikesViewsAcknowledge();               
        }, error: function (data) {
            console.log(data);
        }
    });
    
    
    LikesViewsAcknowledge();
    
    DisplayFileProperty(Actions, PassingValue.split(',')[1], PassingValue);



}


function DisplayFileProperty(Action, SiteURL, Library) {
	$("#doc-viewer").empty();
    //CopySourceURL = SiteURL;
    var webURL = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + Library.split(',')[2] + "')?$expand=ListItemAllFields,Author,ListItemAllFields/RoleAssignments/Member,ListItemAllFields/RoleAssignments/RoleDefinitionBindings,ListItemAllFields/RoleAssignments/Member/Users,ListItemAllFields/RoleAssignments/Member/Title,Files/Author,Editor&$select=AccessLevel,PermissionLevel,LockedByUser,CheckedOutByUser,DocumentWrittenBy,ListItemAllFields/RoleAssignments,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +
        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/SecurityLevel,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            //Bind File in Iframe
            var FileValue = data.d.ListItemAllFields;
            var propertiesServerRelativeUrl = FileValue.ServerRedirectedEmbedUri;
            DocumentId = data.d.ListItemAllFields.Id;
            SelectedFileServerURL = Action.name;
            //FileCheckOutBy = getCheckedOutBy();
           // if (_spPageContextInfo.userDisplayName != FileCheckOutBy && FileCheckOutBy != "" && FileCheckOutBy != null) 
            //{
            	//$("#lockeffect .texthere").text("Unlock");
              	//$("#lockeffect").hide();
              	//$("#LockStatus").show();
                //$("#LockStatus").text("Locked by: " + FileCheckOutBy);
                //$('#lockeffect .unlock').hide();
                //$('#lockeffect .lock').show();
                //$("#lockeffect").attr("disabled", "disabled");
                //$("#btnDeleteFile").attr("disabled", "disabled");
                //$("#LoackMove").attr("disabled", "disabled");
                //$("#btnShareFile").attr("disabled", "disabled");
                //$("#btnRenameFile").attr("disabled", "disabled");
                //$("#lockeffect").attr("disabled", "disabled");
                //if (FilePermissions == 'Full Control') 
                //{
                //    $("#btnUndoLock").show();
                //}
            //} 
            //else
            //{
            	//if (_spPageContextInfo.userDisplayName == FileCheckOutBy) 
            	//{
                //   $("#LockStatus").show();
                //    $("#LockStatus").text("Locked by me");
                //    $("#lockeffect .texthere").text("Unlock");
                //} 
                //else 
                //{
                //    $("#lockeffect .texthere").text("Lock");
                //    $("#LockStatus").hide();
                //}
                //$("#btnDeleteFile").prop("disabled", "");
                //$("#LoackMove").prop("disabled", "");
                //$("#btnShareFile").prop("disabled", "");
                //$("#btnRenameFile").prop("disabled", "");
                //$("#lockeffect").prop("disabled", "");
           // }

            if (propertiesServerRelativeUrl == null) {
                propertiesServerRelativeUrl = window.location.origin + Action.name;

                if (Action.name.includes("DocumentManagementSystem") == true || Action.name.includes("DepartmentalDMS") == true) {
                    if (Action.name.includes("DocumentManagementSystem") == true) {
                        CopyLibrary = "DocumentManagementSystem";
                        $(".txtCopyLink").val(SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                    } else {
                        CopyLibrary = "DepartmentalDMS";
                        $(".txtCopyLink").val(propertiesServerRelativeUrl = SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                    }
                } else {
                    CopyLibrary = "Documents";
                    var HostName = window.location.origin + Action.name.substr(0, Action.name.lastIndexOf("/") + 0);
                    $(".txtCopyLink").val(propertiesServerRelativeUrl = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                }
                //window.location.origin + Action.name;
            } else {
                if (Action.name.includes("DocumentManagementSystem") == true) {
                    CopyLibrary = "DocumentManagementSystem";
                } else if (Action.name.includes("DepartmentalDMS") == true) {
                    CopyLibrary = "DepartmentalDMS";
                } else {
                    CopyLibrary = "Documents";
                }
                $(".txtCopyLink").val(propertiesServerRelativeUrl);
            }
            if (FileValue.FileLeafRef.includes(".pdf") == false) { //to check if it's PDF
                //propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
            }
            //if(PermissionLevel)
            
            $("#DownloadBtn").prop("href", window.location.origin + Library.split(',')[2]);
            $("#FullviewBtn").prop("href", propertiesServerRelativeUrl);
            var container = $("#doc-viewer").empty();
            if (FileValue.FileLeafRef.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                $('#doc-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + propertiesServerRelativeUrl + "'/></div>");
            } else {


                if (data.d.ListItemAllFields.FileLeafRef.substr(data.d.ListItemAllFields.FileLeafRef.length - 3) == "csv") {
                    CsvViewer(propertiesServerRelativeUrl)
                } else {
                    $('<iframe>', {
                        src: propertiesServerRelativeUrl,
                        id: 'iframe-viewer',
                        frameborder: 0,
                        scrolling: 'yes',
                        width: '100%',
                        height: '98%'
                    }).appendTo(container);
                }
            }
            if (FileValue.SecurityLevel == null || FileValue.SecurityLevel == "Private") {
                if (FileValue.AccessLevel == 'Everyone') {
                    $('#FileSharing').text("Shared with Everyone");
                    $("#txtSharingHistoy").show();
                }
                else {
                    FileValue.SecurityLevel = "Not shared";
                    $('#FileSharing').text(FileValue.SecurityLevel);
                    $("#txtSharingHistoy").hide();
                }
            }
            else {
                $('#FileSharing').text("Shared with " + FileValue.SecurityLevel);
                $("#txtSharingHistoy").show();
            }
            $('#FileTitle').text(FileValue.Title ? FileValue.Title : "");
            if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null) {
                $('#FileDocType').text(FileValue.DocumentType);
            }
            $('#FileReference').text(FileValue.DocumentNo ? FileValue.DocumentNo : "");
            $('#FileAuthor').text(data.d.DocumentWrittenBy);
            $('#FileDetalis').text(FileValue.Details ? FileValue.Details : "");

        //    $('#FileApproval').text(FileValue.Approval ? FileValue.Approval : "");
         //   if (FileValue.Approval != "" && FileValue.Approval != null) {
        //        $("#btnApproval").hide();
        ///        $("#btnApprovalHistry").show();
        //    }
        //    else {
        //        $("#btnApproval").show();
        //        $("#btnApprovalHistry").hide();
        //    }
           // $('#FilePath').text(Action.name);
           // $('#FileName').text(FileValue.FileLeafRef);
          //  $('#txtRenamefile').val(FileValue.FileLeafRef.split('.').slice(0, -1).join('.'));
          //  $("#txtFileExt").text("." + FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1));
            //$('#FileLastModified').text(moment(FileValue.Last_x0020_Modified).format('DD-MM-YYYY HH:MM:SS'));
           // $('#FileLastModifiedBy').text(GetUserFullName(FileValue.Modified_x0020_By));
            //$('#FileSize').text(FileValue.FileSizeDisplay + " KB");
           // $('#LibProject').text(Library);
           // GetFileVersion(Action.name, SiteURL, FileValue.FileLeafRef, FileValue.Title ? FileValue.Title : "");
            //PermissionsControl(FileValue);
        },
        eror: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    }).fail(function (error) {
        alert(error.responseJSON.error.message.value);
    });
}


//get check out by user name
function getCheckedOutBy() {
    var checkOutBy = '';
    var ServerRelativeUrlofFile = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckedOutByUser/Title"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            checkOutBy = data.d.Title;
            $("#LockStatus").show();
            $("#LockStatus").text("Locked by me");
            $("#lockeffect .texthere").text("Unlock");
            $('#lockeffect .unlock').show();
            $('#lockeffect .lock').hide();
        },
        error: function (xhr, status, error) {
            $("#LockStatus").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
            console.log(SelectedFileServerURL + "Not checked out");
        }
    });
    return checkOutBy;
}




function GetFileExtensionImage(tempval)
{
	res = '../SiteAssets/ContactCenter/assets/ExtensionImages/file.png';
	switch(tempval)
	{
		case 'docx':	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/doc.png'; break;
	    case 'pdf': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/pdf.png'; break;
	 	case 'xlsx':	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/xls.png'; break;
	 	case 'xls': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/xls.png'; break;
	 	case 'doc': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/doc.png'; break;	 	
	 	case 'html': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/html.png'; break;	 	
	 	case 'js': 		tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/javascript.png'; break;	 	
	 	case 'jpg': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/jpg.png'; break;	 	
	 	case 'ppt': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/ppt.png'; break;	 	
	 	case 'png': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/png.png'; break;	 	 	
	 	case 'mp3': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/mp3.png'; break;
	 	case 'mp4': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/mp4.png'; break;
	 	case 'avi': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/avi.png'; break;
	 	case 'csv': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/csv.png'; break;
	 	case 'wmv': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/wmv.png'; break;
	 	case 'jpeg':	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/jpeg.png'; break;
	 	case 'bmp': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/bmp.png'; break;
	 	case 'gif': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/gif.png'; break;
	 	case 'txt': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/txt.png'; break;
	 	case 'zip': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/zip.png'; break;
	 	case 'css': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/css.png'; break;
	 	case 'ppt': 	tempval  = '../SiteAssets/ContactCenter/assets/ExtensionImages/ppt.png'; break;
	 	//case '': tempval  = 'B+'; break;	 	 	
 	};
 	return tempval;
}

var ActiveDocumnetNo=0;
var g_AcknowledgeId='';
var g_DocumentURL='';
var g_likeId='';
function AcknowledgeDoc(Actions,PassingValue,NewPassingValue,AcknowledgeId,likeId)
{
	g_AcknowledgeId=AcknowledgeId;
	g_likeId=likeId;
	var RecNo = PassingValue.split(',')[0];
	ActiveDocumnetNo = RecNo;
	var RecType = PassingValue.split(',')[1];	
	$("#DocTitleModel").text($("#Title"+RecNo).text());
	$("#DocTypeModel").text(RecType);
	$("#DocAothorModel").text($("#Author"+RecNo).text());
	$("#DocDescModel").text($("#Desc"+RecNo).text());
	$("#AcknowledgeChkboxDIV").css("display", "block")
	//var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
	
	var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");    
    var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResult = RequestedInfo(Query);
    var getResults=getShareDocumentId(ActiveDocumnetNo)
    var shareDocumentId=getResults[0].Id;
    

    if(FilterResult.length =='0')
    {
    	var listName="DocumentAcknowledgement";
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Acknowledge':false,'DocID':ActiveDocumnetNo,'DocumentID':shareDocumentId,'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        Universalinsert(listName,item);
             
    }
    
	var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResult = RequestedInfo(Query);
    
    if(FilterResult.length>0)
    {    	        		
    	if(FilterResult[0].Acknowledge == true)
    	{
    		$('#AcknowledgeChkbox').prop('checked', true);
    		$('#AcknowledgeChkbox').attr('disabled', true);
    		$('#lbl-Acknowledge').text('Acknowledged');
    		$('#lbl-Acknowledge').css("color","cornflowerblue");
    		$('#acknowledgeMassage').text('');

    	}
    	else if(FilterResult[0].Acknowledge == false)
    	{
    		$('#AcknowledgeChkbox').prop('checked', false);
    		$('#AcknowledgeChkbox').attr('disabled', false); 
    		$('#lbl-Acknowledge').text('Acknowledge');
    		$('#lbl-Acknowledge').css("color","black");
    		$('#acknowledgeMassage').text('By clicking this you agree that you understand and acknowledge this document.');
   	
    	}
    	
    	if(FilterResult[0].Like == true)
    	{
    		$('#LikeChkbox').prop('checked', true);
    	}
    	else if(FilterResult[0].Like == false)
    	{
    		$('#LikeChkbox').prop('checked', false);    	
    	}

    }
    else
    {
    	$('#AcknowledgeChkbox').prop('checked', false);
    	$('#AcknowledgeChkbox').attr('disabled', false);
    	
    }
    
    LikesViewsAcknowledge();
    
    var Ownurl = PassingValue.split(',')[2]+ "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=PermissionLevel,Acknowledgement,ID,File_x0020_Type,ServerRedirectedEmbedUri,DocumentNo,DocumentType,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File&$filter=ID eq '"+PassingValue.split(',')[0]+"'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
            var items = data.d.results;
            if(items[0].PermissionLevel=='Restricted View' || items[0].AccessLevel=='Everyone_Nodownload'){
              $("#DownloadBtn").css("display", "none")
            }
            var Filefullscreen = items[0].ServerRedirectedEmbedUri;
            $("#FullviewBtn").attr("href", Filefullscreen);
            var filedownload = items[0].File.ServerRelativeUrl;
            g_DocumentURL=filedownload;
            $("#DownloadBtn").attr("href", filedownload);
            var DocumentType = items[0].DocumentType;
            if (DocumentType == null) {
                DocumentType = "Others";
            }
            if (DocumentType =='-Select-') {
                DocumentType = "Others";
            }            
            $("#DocTypeModel").text(DocumentType);
            if(items[0].DocumentNo==null || items[0].DocumentNo=='')
            {
              items[0].DocumentNo='';
            }
            
            $("#referenceModel").text(items[0].DocumentNo);
            
            if(items[0].Acknowledgement == "Required")
            {
            	$("#AcknowledgeChkboxDIV").css("display", "block");
            }
            else
            {
            	$("#AcknowledgeChkboxDIV").css("display", "none")
            }
            

            //LikesViewsAcknowledge();               
        }, error: function (data) {
            console.log(data);
        }
    });
    
    DisplayFileProperty(Actions, PassingValue.split(',')[2], NewPassingValue);


}


function LikesViewsAcknowledge()
{
	var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
	//var NQuery = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    //var FilterResultQuery = RequestedInfo(NQuery);
    var FilterResultQuery=getShareDocumentId(ActiveDocumnetNo)
    var FilteredRecViewCount=0;
    var FilteredRecAcknowledgeCount=0;
    var FilteredRecLikeCount=0;	
    			        
    if(FilterResultQuery.length>0)
    {
    	/*var FilteredRecView = $.grep(FilterResultQuery, function(v) {
    		return v.View == true;
		});
		
		var FilteredRecAcknowledge = $.grep(FilterResultQuery, function(v) {
    		return v.Acknowledge == true;
		});
		
		var FilteredRecLike  = $.grep(FilterResultQuery, function(v) {
    		return v.Like == true;
		});*/
		
		FilteredRecViewCount=FilterResultQuery[0].View_count;
	    FilteredRecAcknowledgeCount=FilterResultQuery[0].Acknowledge_count;
	    FilteredRecLikeCount=FilterResultQuery[0].Like_count;
	    if(FilteredRecViewCount==null)FilteredRecViewCount=0
    	if(FilteredRecAcknowledgeCount==null)FilteredRecAcknowledgeCount=0
    	if(FilteredRecLikeCount==null)FilteredRecLikeCount=0
    	
		$("#AcknowledgeCount").text(FilteredRecAcknowledgeCount);
		$('#'+g_AcknowledgeId).text(FilteredRecAcknowledgeCount);
		
		var likes=$("#LikesCount").text();		
		$("#"+g_likeId).text(FilteredRecLikeCount);
		$("#ViewsCount").text(FilteredRecViewCount);
		$("#LikesCount").text(FilteredRecLikeCount);
			
    }
    else
    {
    	$("#AcknowledgeCount").text('0');
		$("#ViewsCount").text('0');
		$("#LikesCount").text('0');
    
    }
}


function Universalinsert(listName,item,ControlID) 
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
        success: function (data) 
        {
        	
        	LikesViewsAcknowledge(); 	
        },
        error: function (data) { console.log(data); }
    });
}


function UniversalUpdate(listName,item,dataid)  
{
    var Responce="";
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
        type: "POST",  
        async:false,
        data: JSON.stringify(item),         
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data)
        { 	
            console.log("Done");
            //LikesViewsAcknowledge();
            Responce = data;
        },  
        error: function(data) 
        {  
            Responce=data;
            console.log(data);      	
            alert ("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }  
    }); 
    return Responce;    
}


function AcknowledgeRecord()
{
	var CheckboxStatus=false;
	var CurrentIpAddress='';
	if($("#AcknowledgeChkbox").prop('checked') == true)
	{
		CheckboxStatus=true;
		var Ack=$("#AcknowledgeCount").text();
		$("#AcknowledgeCount").text(parseInt(Ack)+1);
		$("#"+g_AcknowledgeId).text(parseInt(Ack)+1);
    }
    else{
        var Ack=$("#AcknowledgeCount").text();
		$("#AcknowledgeCount").text(parseInt(Ack)-1);
		$("#"+g_AcknowledgeId).text(parseInt(Ack)-1);
    }
   if(confirm("Are you sure to acknowledge this document ?")==true)
   {
     
        /*var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "https://api.ipify.org/?format=json", true);
	    xhttp.send();
	    xhttp.onreadystatechange = function () {
	        if (this.readyState == 4 && this.status == 200) {
	            CurrentIpAddress = JSON.parse(this.responseText).ip;
	        }
	        else {
	            $.getJSON("https://api.ipify.org/?format=json", function(e) {
	                CurrentIpAddress = e.ip;
	            });
	        }         
     
     }*/
     $('#AcknowledgeChkbox').attr('disabled', true);
     $('#lbl-Acknowledge').text('Acknowledged');
     $('#lbl-Acknowledge').css("color","cornflowerblue");
     $('#acknowledgeMassage').text('');

   
   }
   else{
        let inputs = document.getElementById('AcknowledgeChkbox');
        inputs.checked = false;
        return false;      
   }
	
    
 
    var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");    
    var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResult = RequestedInfo(Query);
    var shareDocumentId=getShareDocumentId(ActiveDocumnetNo);
    if(shareDocumentId.length==0){
       shareDocumentId=ActiveDocumnetNo;
    }
    else{
       shareDocumentId=shareDocumentId[0].Id;
    }
    
    if(FilterResult.length=='0')
    {
    	var listName="DocumentAcknowledgement";
        $.getJSON("https://api.ipify.org/?format=json", function(e) {
	                CurrentIpAddress = e.ip;
	                var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Acknowledge':true,'IPAddress':CurrentIpAddress,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo, 'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
                    Universalinsert(listName,item);
	            });
        
        //$('#'+g_AcknowledgeId).text($('#AcknowledgeCount').val());     
    }
    else
    {
    	if(CheckboxStatus == true)
    	{
    		var listName="DocumentAcknowledgement";		
             $.getJSON("https://api.ipify.org/?format=json", function(e) {
                CurrentIpAddress = e.ip;
                var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Acknowledge':true,'IPAddress':CurrentIpAddress,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo, 'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
                var Res = UniversalUpdate(listName,item,FilterResult[0].ID);
            });
            
            //$('#'+g_AcknowledgeId).text($('#AcknowledgeCount').val());    	
    	}
    	else
    	{
    		var listName="DocumentAcknowledgement";		
             $.getJSON("https://api.ipify.org/?format=json", function(e) {
                CurrentIpAddress = e.ip;
                var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Acknowledge':false,'IPAddress':CurrentIpAddress,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo, 'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
                var Res = UniversalUpdate(listName,item,FilterResult[0].ID);
            });
             
            //$('#'+g_AcknowledgeId).text($('#AcknowledgeCount').val());   	
    	}    	  
    }
}


function LikeRecord()
{
	var CheckboxStatus=false;
	if($("#LikeChkbox").prop('checked') == true)
	{
		CheckboxStatus=true;
		var likes=$("#LikesCount").text();
		$("#LikesCount").text(parseInt(likes)+1);
		$("#"+g_likeId).text(parseInt(likes)+1);
    }
    else{
       var likes=$("#LikesCount").text();
		$("#LikesCount").text(parseInt(likes)-1);
		$("#"+g_likeId).text(parseInt(likes)-1);
    }
    
    
    //var ActionValue = $("#DocumentTypesDDL").val();
    //var likeQuery = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '" + ActionValue + "'";		
    
    var ActiveDepartment = titanForWork.GetValueFromQueryString("DepartmentId");
        
    var Query = "$expand=Author,DepartmentID&$select=*,DepartmentID/Title,Author/EMail&$filter=(Author/EMail eq ('"+_spPageContextInfo.userEmail+"') and DocID eq '"+ActiveDocumnetNo+"' and DepartmentID eq '"+ActiveDepartment+"')";
    var FilterResult = RequestedInfo(Query);
    var shareDocumentId=getShareDocumentId(ActiveDocumnetNo);
    if(shareDocumentId.length==0){
       shareDocumentId=ActiveDocumnetNo;
    }
    else{
       shareDocumentId=shareDocumentId[0].Id;
    }

    if(FilterResult.length=='0')
    {
    	var listName="DocumentAcknowledgement";
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Like':true,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo,'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
        Universalinsert(listName,item); 
        //departmentDoc.GetDepartmentEveryOneDocuments(likeQuery , DoctypeSiteUrl );    
    }
    else
    {
    	if(CheckboxStatus == true)
    	{
    		var listName="DocumentAcknowledgement";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Like':true,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo,'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
            var Res = UniversalUpdate(listName,item,FilterResult[0].ID);
            //departmentDoc.GetDepartmentEveryOneDocuments(likeQuery,DoctypeSiteUrl );    	
    	}
    	else
    	{
    		var listName="DocumentAcknowledgement";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Like':false,'DocumentID':shareDocumentId,'DocID':ActiveDocumnetNo,'DepartmentIDId':parseInt(ActiveDepartment),'View':true,'ViewsById':parseInt(_spPageContextInfo.userId),'UserImage':Employeeprofilepic};
            var Res = UniversalUpdate(listName,item,FilterResult[0].ID); 
            //departmentDoc.GetDepartmentEveryOneDocuments(likeQuery,DoctypeSiteUrl );   	
    	}    	  
    }
}


function RequestedInfo(Query)
{
    var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentAcknowledgement')/items?"+Query+"";  
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
            alert("An error occurred. Please try again.");  
        }  
    });
    return ResultItems;
}

function getShareDocumentId(DocumentId)
{
    var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SharedDocument')/items?$select=Acknowledge_count,View_count,Like_count,Id&$filter=DocumentID eq "+DocumentId+"  and SharedGroup eq 'Everyone' and PermissionStatus ne 'Revoked'";  
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
            alert("An error occurred. Please try again.");  
        }  
    });
    return ResultItems;
}



var g_siteURL='';
departmentDoc.GetEveryOneDocument = function (currentDepartmentId) {
    var currentCompanyIdd = titanForWork.getQueryStringParameter("CompanyId");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=DepartmentName,ID,CompanyIDId/ID,SiteURL&$filter=ID eq '" + currentDepartmentId + "' and CompanyIDId eq '" + currentCompanyIdd + "'"
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            if (response.d.results.length > 0) {
            	$("#DeptTitleCard").text('Department: ' +response.d.results[0].DepartmentName);
                //var everyOneDocumentTypes = titanForWork.GetValueFromQueryString("DocumentType");
                //var query = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved' and DocumentType eq '" + everyOneDocumentTypes + "'";
				//var Query4DocType = "&$filter=AccessLevel eq 'Everyone' and ApprovalStatus eq 'Approved'";
				var Query4DocType = "&$filter=startswith(AccessLevel,'Everyone') and ApprovalStatus eq 'Approved'";
				g_siteURL=response.d.results[0].SiteURL
                GetDoctypes(Query4DocType, response.d.results[0].SiteURL);
                
                //departmentDoc.GetDepartmentEveryOneDocuments(query, response.d.results[0].SiteURL);
                
                
            }

        }, eror: function (data) {
            console.log('error');
        }
    });

}


departmentDoc.GetDocumentTypeIcon = function (FileName) {
    //  var status = checkValue(FileName.split('.')[1], arrayLinksDoctype);
    var urlLink = "";
    for (var index = 0; index < departmentDoc.arrayLinksDoctype.length; index++) {
        if (departmentDoc.arrayLinksDoctype[index].iconType.split('.')[0].indexOf(FileName.split('.')[1]) != -1) {
            urlLink = departmentDoc.arrayLinksDoctype[index].image;
        }
    }
    if (urlLink.length == 0) {

        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/maptoicon(filename='" + FileName + "',progid='',size=0)";
        $.ajax({
            url: url,
            headers: { Accept: "application/json;odata=verbose" },
            async: false,
            success: function (data) {
                var icon = "<img src='" + _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/images/" + data.d.MapToIcon + "'/>";
                urlLink = icon;
                departmentDoc.arrayLinksDoctype.push(departmentDoc.IconProperties(data.d.MapToIcon, icon));//Add new document type url
            }, eror: function (data) {
                console.log('error');
            }
        });
    }
    return urlLink;
}
departmentDoc.IconProperties = function (iconType, imagePath) {
    var icoProp = [];
    icoProp.iconType = iconType;
    icoProp.image = imagePath;
    return icoProp;
}

$(document).ready(function () {//alert("Chkrd");
	var url=window.location;
	userActivityNotificationEntry(_spPageContextInfo.userId,url)

	
	$('#chkNotUpload').click(function () {
		$("#chkReplaceVer").attr('checked', '');
		$("#chkKeepExist").prop("checked", false);
		$("#chkKeepExist").prop("disabled", "disabled");
		$("#chkUploadNew").prop("disabled", "disabled");
		$("#chkUploadNew").prop("checked", false);
	});
	$('#chkReplaceVer').click(function () {
		$("#chkKeepExist").prop("checked", true);
		$("#chkKeepExist").prop("disabled", "");
		$("#chkUploadNew").prop("disabled", "");
	});
	$('.btnAdvanceSearch').click(function () {
		location.href = "../Pages/AdvancedSearch.aspx";
	});
    $('#myDepartmentcreateNewGroup').click(function () {
        $(this).hide();
        var newSubfolderName = $('#txtnewMydepartmentSubFolderName').val();
        newSubfolderName = newSubfolderName.trim();
        var flagSpecialChar = departmentDoc.checkFolderSpecialCharaters(newSubfolderName);
        if (flagSpecialChar == true) {
            alert('Folder name can not Contain the Following Characters: .<>#%&*{}?:|\"\\/~`');
            $(this).show();
            return false;
        }
        if (newSubfolderName.length < 2) {
            alert("Folder's length can't be less than 2 character.");
            $(this).show();
            return false;
        }
        if (newSubfolderName.length > 40) {
            alert('40 characters maximum folder length allowed.');
            $(this).show();
            return false;
        }
        var currentSubFolder = $('#currentSubFolderMyDepartment').val();

        /////////add hree  folder exist
        var folderexistcheck = departmentDoc.ChekFolderExistOrNot(currentSubFolder, newSubfolderName);
        if (folderexistcheck == false) {
            alert('Folder is already exist.');
            $(this).show();
            return false;
        }

        var baseUrl = departmentDoc.BaseURL;
        var currentFolderUrl = departmentDoc.ReadCookies("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
        if (currentFolderUrl == null || currentFolderUrl == "" || currentFolderUrl == "undefined") {
            currentFolderUrl = "DepartmentalDMS";
        }
        currentFolderUrl = currentFolderUrl.replace(/\/$/, "");//remove last back slash from url
        newSubfolderName = currentFolderUrl + "/" + newSubfolderName.trim();
        $.when(departmentDoc.AddNewSubFolder(baseUrl, newSubfolderName)).done(function (data) {
            $('#myDepartmentcreateNewGroup').show();
            $('#myModalMyDepartmentCreateNewFolder').modal('hide');
            $('#txtnewMydepartmentSubFolderName').val('');
            alert("Folder is added !!");
            departmentDoc.GetDepartmentDocuments(currentFolderUrl);
        });
    });

    var currentDepartmentId = titanForWork.GetValueFromQueryString("DepartmentId");
    
    //TO check on dashboard page or everyone page
    if (currentDepartmentId == null || currentDepartmentId == "") {
        //Get Base Url for my Department and get document on dashboard
        departmentDoc.GetMyDepartment();
    }
    else {
        currentDepartmentId = currentDepartmentId.split('#')[0];
        //get everyone documents accoording to department
        departmentDoc.GetEveryOneDocument(currentDepartmentId)
    }
});



function convertJSONDateAMPMWithDate(jsonDateTime) {

    var date = new Date(jsonDateTime);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    // return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + strTime;
    return date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear() + " " + strTime;
}


function myShareDepartment() {
    $("#alldepartment").empty();
    var result;
    var listName = 'ProcessApprovers';
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    //  var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'DepartmentDocument_Access'";
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=(CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + txtCompanyId + "' and Owner eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'Documents') ";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;


            // valuesArray.push({ID: departmentID, DepartmentName: currentuserdeptname});
            // var subodinatdata =[];
            // var DepartmentName = _spPageContextInfo.userDisplayName;
            // var currentid= _spPageContextInfo.userId;
            // $('<option value="' + departmentID+ "'title='" +currentuserdeptname+'">' + currentuserdeptname+ '</option>').appendTo("#alldepartment");

            //$("<option value='" + departmentID + "'title='" + currentuserdeptname + "'>" + currentuserdeptname + "</option>").appendTo("#alldepartment");


            // $('<option value="All">All</option>').appendTo("#assigntodrp");
            //  $('<option value="Subordinates">My Subordinates</option>').appendTo("#assigntodrp");

            $.each(valuesArray, function (i, el) {
                option += "<option value='" + el.Department.ID + "'title='" + el.Department.DepartmentName + "'>" + el.Department.DepartmentName + "</option>";
                // subodinatdata.push(el.LogonNameId);

            });
            // $('<option value="' + subodinatdata+ '">My Subordinates</option>').appendTo("#assigntodrp");
            $("#alldepartment").append(option);

            var map = {};
            $('#alldepartment option').each(function () {
                if (map[this.value]) {
                    $(this).remove()
                }
                map[this.value] = true;
            });



        },
        error: function (data) {
            console.log(data.responseJSON.error);

        }

    });
}




$("#alldepartment").change(function () {

    DeptId = $("#alldepartment").val();
    //  departmentDoc.ShowUploadingButton(companyID, DeptId);
    CheckUserPermissionToShowButton(companyID, DeptId);

    // alert(selectedText);
    departmentDoc.GetCurrentDepartmentSiteURL(DeptId);


});



$(document).ready(function () {
    setTimeout(function () { myShareDepartment(); }, 3000);

    // myShareDepartment()
});



$("#btnuploadDepartmentDocuments").click(function () {
    uploaddocument(DeptId);
});




function mutipleDepartDocfiledownload() {

    if (selectedDepartmentDocrelativeurl.length > 0) {

        var filesdownload = 1;
        for (var index = 0; index < selectedDepartmentDocrelativeurl.length; index++) {
            var url = selectedDepartmentDocrelativeurl[index];

            var a = document.createElement("a");
            a.setAttribute('href', url);
            a.setAttribute('download', '');
            a.setAttribute('target', '_blank');
            a.click();

            // download(fileurl)
            //"<a href="+fileurl+" download></a>

            if (filesdownload == selectedDepartmentDocrelativeurl.length) {
                // var folderUrl = readTargetUrlCookie("UploadedDocumentTargetFolderURl");
                // GetMyDocumentsWithFilesFolder(folderUrl);
                alert("Files download successfully.");
                $(".Departdocid").prop("checked", false);
                selectedDepartmentDocrelativeurl = [];
                selectedDepartmentDoc = [];

            }

            filesdownload++;




        }
    }
    else {
        alert("please select file");
    }
}







function deleteMutipleDepartmentDocs() {

    if (selectedDepartmentDoc.length > 0) {
        var confirmmessage = confirm("Are you sure,you want to delete this file ?")
        if (confirmmessage == true) {
            var webUrl = departmentDoc.BaseURL;

            var itemUpdated = 1;
            for (var index = 0; index < selectedDepartmentDoc.length; index++) {
                var deletingItemId = selectedDepartmentDoc[index];

                $.ajax({
                    url: webUrl + "/_api/web/lists/GetByTitle('DepartmentalDMS')/items('" + deletingItemId + "')",
                    type: "POST",
                    headers:
                    {
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "DELETE"
                    },
                    success: function (data) {
                        if (itemUpdated == selectedDepartmentDoc.length) {
                            alert("Files Deleted successfully.");
                            var cuurentFolderPath = $('#currentSubFolderMyDepartment').val();
                            departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/" + cuurentFolderPath);
                            selectedDepartmentDoc = [];
                            selectedDepartmentDocrelativeurl = [];
                        }
                        itemUpdated++;
                    },
                    error: function (data) {

                        alert("Error occured in item deleting ." + data.responseText);
                    }

                });


            }

        }

    }
    else {
        alert("Please select some file ");
    }
}







$('#EditMetadata2').click(function () {



    if (selectedDepartmentDoc.length > 0) {

        //set current user author in metadat form
        $("#txtMyDocumentPropertiesAuthor").val(_spPageContextInfo.userDisplayName);

        $('#btnSubmitFormProperties').hide();
        $('#btnSubmitFormProperties2').show();
        $('#modalMyDocumentProperties').modal('show');
    }
    else {
        alert("Please select one or more documents.");
    }


});

$('#btnCancelFormProperties').click(function () {

    $('#modalMyDocumentProperties').modal('hide');
    ClearAllMetadatControl();

});

$('#btnSubmitFormProperties2').click(function () {

    if ($("#txtMyDocumentPropertiesTitleCHK").prop("checked") == true) {

        if ($("#txtMyDocumentPropertiesTitle").val().trim().length == 0) {
            alert("Please enter Title.")
            return false;
        }
    }
    if ($("#txtMyDocumentPropertiesReferenceNoCHK").prop("checked") == true) {
        if ($("#txtMyDocumentPropertiesReferenceNo").val().trim().length == 0) {
            alert("Please enter Reference number.")
            return false;
        }
    }
    if ($("#ddlMyDocumentPropertiesTypeCHK").prop("checked") == true) {
        if ($("#ddlMyDocumentPropertiesType").val() == null) {
            alert("Please select Type.")
            return false;
        }
    }
    if ($("#txtMyDocumentPropertiesAuthorCHK").prop("checked") == true) {
        if ($("#txtMyDocumentPropertiesAuthor").val().trim().length == 0) {
            alert("Please enter Author name.")
            return false;
        }
    }
    if ($("#ddlMyDocumentPropertiesDetailsCHK").prop("checked") == true) {
        if ($("#ddlMyDocumentPropertiesDetails").val().trim().length == 0) {
            alert("Please enter Details.")
            return false;
        }
    }


    if ($("#txtMyDocumentPropertiesTitleCHK").prop("checked") == false &&
    $("#txtMyDocumentPropertiesReferenceNoCHK").prop("checked") == false &&
    $("#ddlMyDocumentPropertiesTypeCHK").prop("checked") == false &&
    $("#txtMyDocumentPropertiesAuthorCHK").prop("checked") == false &&
    $("#ddlMyDocumentPropertiesDetailsCHK").prop("checked") == false) {
        alert("Please select any option,to update the metadata.");
        return;
    }


    waitingDialog.show();

    setTimeout(function () { UpdateMultipleDepartmentItemsMetadat() }, 2000);


});

function UpdateMultipleDepartmentItemsMetadat() {
    var itemUpdated = 1;
    for (var index = 0; index < selectedDepartmentDoc.length; index++) {
        var ListName = "DepartmentalDMS";
        var Metadata;
        var ItemType = GetItemTypeForListNamee(ListName);
        var txtMyDocumentPropertiesTitle = $("#txtMyDocumentPropertiesTitle").val();
        if (txtMyDocumentPropertiesTitle.trim().length == 0) {
            txtMyDocumentPropertiesTitle = "";
        }
        var txtMyDocumentPropertiesReferenceNo = $("#txtMyDocumentPropertiesReferenceNo").val();
        if (txtMyDocumentPropertiesReferenceNo.trim().length == 0) {
            txtMyDocumentPropertiesReferenceNo = "";
        }
        var txtMyDocumentPropertiesAuthor = $("#txtMyDocumentPropertiesAuthor").val();
        if (txtMyDocumentPropertiesAuthor.trim().length == 0) {
            txtMyDocumentPropertiesAuthor = "";
        }
        var ddlMyDocumentPropertiesDetails = $("#ddlMyDocumentPropertiesDetails").val();
        if (ddlMyDocumentPropertiesDetails.trim().length == 0) {
            ddlMyDocumentPropertiesDetails = "";
        }
        var ddlMyDocumentPropertiesType = $("#ddlMyDocumentPropertiesType").val();
        if (ddlMyDocumentPropertiesType == null) {
            ddlMyDocumentPropertiesType = "";
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: txtMyDocumentPropertiesTitle,
            DocumentNo: txtMyDocumentPropertiesReferenceNo,
            DocumentType: ddlMyDocumentPropertiesType,
            DocumentWrittenBy: txtMyDocumentPropertiesAuthor,
            Details: ddlMyDocumentPropertiesDetails
        };

        if ($("#txtMyDocumentPropertiesTitleCHK").prop("checked") == false) {
            delete Metadata["Title"];
        }
        if ($("#txtMyDocumentPropertiesReferenceNoCHK").prop("checked") == false) {
            delete Metadata["DocumentNo"];
        }
        if ($("#ddlMyDocumentPropertiesTypeCHK").prop("checked") == false) {
            delete Metadata["DocumentType"];
        }
        if ($("#txtMyDocumentPropertiesAuthorCHK").prop("checked") == false) {
            delete Metadata["DocumentWrittenBy"];
        }
        if ($("#ddlMyDocumentPropertiesDetailsCHK").prop("checked") == false) {
            delete Metadata["Details"];
        }

        var webUrl = departmentDoc.BaseURL;
        $.when(updateItemWithIDItemListDocuments(ListName, Metadata, selectedDepartmentDoc[index], webUrl, false)).done(function (response) {
            console.log(response + " :  Item Updated !");
            if (itemUpdated == selectedDepartmentDoc.length) {
                //Reload documents
                folderName = readTargetUrlCookie("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
                departmentDoc.GetDepartmentDocuments(folderName)
                $('#modalMyDocumentProperties').modal('hide');
                waitingDialog.hide();
                alert("Metadata updated successfully.");
                ClearAllMetadatControl();
                selectedDepartmentDoc = [];
                selectedDepartmentDocrelativeurl = [];
            }
            itemUpdated++;
        });
        waitingDialog.hide();
    }
}

function CheckUserPermissionToShowButton(companyID, DeptId) {
    var listName = 'ProcessApprovers';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + companyID + "' and (OwnerId eq '" + _spPageContextInfo.userId + "' or ContributorsId eq '" + _spPageContextInfo.userId + "') and DepartmentId eq '" + DeptId + "' and WebPartName eq 'Documents'";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
            if (valuesArray.length > 0) {
                $('#btnMyDepartmentAddFolders').show();
                $('#btnuploadDepartmentDocuments').show();
                $('#deptDocShare').show();
                $('#EditMetadata2').show();
                $('#deleteMutipleDepFile').show();
                departmentDoc.departmentPermissionEditDocument = true;
            }
            else {
                $('#btnMyDepartmentAddFolders').hide();
                $('#btnuploadDepartmentDocuments').hide();
                $('#deptDocShare').hide();
                $('#EditMetadata2').hide();
                $('#deleteMutipleDepFile').hide();
                departmentDoc.departmentPermissionEditDocument = false;
            }
        },
        error: function (data) {
            console.log(data.responseJSON.error);
        }
    });
}


//get shared History of File/Folder with 'Revoke' option for Department Documents
function GetDeptSharedHistory(documentid, itemurl, title, documentno, fileName, type) {
    selectedHistoryDoc = [];
    arrSharedOrgUsers = [];
    var option = "",
    uniqueValues = [],
	arrduplicateClient = [],
	arrduplcteRevokdClient = [],
	arrduplcteRevokdTime = [],
	arrDuplicateSharedTo = [];
    var Doc_Type = 'Dept_Doc';
    $(".select_all").prop("checked", false);          //For all Checkbox
    $("#revokebtn").hide();
    $(".context-menu").hide();
    $('#sharedHistoryList').html('');
    $('#shreduser').html('');
    $('#myModalShareHistory').modal('show');
    var webURL = myCompanyUrl + "/_api/web/lists/getbytitle('SharedDocument')/items?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title&$expand=SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "'&$orderby=Created desc";
    $.ajax({
        url: webURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var itemsSharedHistory = data.d.results;

            $("#filenamee").html(fileName);
            if (title == "null") {
                $("#filetitle").html('');
            }
            else {
                $("#filetitle").html(title);
            }
            if (documentno == "null") {
                $("#referNo").html('');
            }
            else {
                $("#referNo").html(documentno);
            }

            if (itemsSharedHistory.length > 0) {
                var sharedHistory = "";
                $("#shreduser").append('<option value="">All</option>');
                for (var index = 0; index < itemsSharedHistory.length; index++) {

                    var fileTitle = itemsSharedHistory[index].Title;
                    var PermissionType = itemsSharedHistory[index].PermissionType;
                    var SharedToName = itemsSharedHistory[index].SharedUsers.Title;
                    var currentItemId = itemsSharedHistory[index].ID;
                    var PermissionStatus = itemsSharedHistory[index].PermissionStatus;
                    var userNamecurretn = "";
                    var userId = "";
                    var SharedOn = titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created);

                    for (var j = 0; j < itemsSharedHistory[index].SharedUsers.results.length; j++) {
                        var myarray = [];
                        if (uniqueValues.indexOf(itemsSharedHistory[index].SharedUsers.results[j].Title) == -1) {
                            uniqueValues.push(itemsSharedHistory[index].SharedUsers.results[j].Title);
                            if (itemsSharedHistory[index].SharedGroup != "Organization") {
                                option += "<option value='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'title='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'>" + itemsSharedHistory[index].SharedUsers.results[j].Title + "</option>";
                            }
                            else {
                                if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrDuplicateSharedTo) == '-1') {
                                    option += "<option value='" + itemsSharedHistory[index].SharedClient.Title + "'title='" + itemsSharedHistory[index].SharedClient.Title + "'>" + itemsSharedHistory[index].SharedClient.Title + "</option>";
                                    arrDuplicateSharedTo.push(itemsSharedHistory[index].SharedClient.Title);
                                }
                            }
                        }
                        // userNamecurretn += itemsSharedHistory[index].SharedTo.results[j].Title+ ", ";
                        userNamecurretn = itemsSharedHistory[index].SharedUsers.results[j].Title
                        userId = itemsSharedHistory[index].SharedUsers.results[j].Id;
                    }

                    if (itemsSharedHistory[index].SharedGroup != "Organization") {
                        if (PermissionStatus == "Revoked") {
                            sharedHistory += "<tr><td></td>><td>" + userNamecurretn + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: not-allowed;color: Red;'>Revoked</a></td></tr>";
                        }
                        else {
                            if (type == "Folder") {
                                sharedHistory += "<tr><td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + " title='" + userId + "''></td><td>" + userNamecurretn + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: pointer;' onclick=BreakPermissionDeptDocFolder('" + documentid + "','" + encodeURI(itemurl) + "','" + userId + "','" + currentItemId + "')>Revoke</a></td></tr>";
                            }
                            else {
                                sharedHistory += "<tr><td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + " title='" + userId + "''></td><td>" + userNamecurretn + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: pointer;' onclick=RevokeDepartmntPermission('" + documentid + "','" + encodeURI(itemurl) + "','" + userId + "','" + currentItemId + "')>Revoke</a></td></tr>";
                            }
                        }
                    }
                    else { //to bind all the external users sharing in one table row [Organizations wise]
                        arrSharedOrgUsers.push({
                            userId: userId,
                            Organization: itemsSharedHistory[index].SharedClient.Title,
                            ItemId: currentItemId
                        });
                        if (PermissionStatus == "Revoked") {
                            if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrduplcteRevokdClient) != '-1') {
                                //Do Nothing. Elements contains this already
                                if (jQuery.inArray(SharedOn, arrduplcteRevokdTime) != '-1') {

                                }
                                else {
                                    sharedHistory += "<tr><td></td>><td>" + itemsSharedHistory[index].SharedClient.Title + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: not-allowed;color: Red;'>Revoked</a></td></tr>";
                                    arrduplcteRevokdTime.push(SharedOn);
                                }
                            }
                            else {
                                sharedHistory += "<tr><td></td>><td>" + itemsSharedHistory[index].SharedClient.Title + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: not-allowed;color: Red;'>Revoked</a></td></tr>";
                                arrduplcteRevokdClient.push(itemsSharedHistory[index].SharedClient.Title);
                                arrduplcteRevokdTime.push(SharedOn);
                            }
                        }
                        else {
                            if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrduplicateClient) != '-1') {
                                //Do Nothing. Elements contains this already
                            }
                            else {
                                currentItemId = '';
                                if (type == "Folder") {
                                    sharedHistory += "<tr><td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + encodeURI(itemsSharedHistory[index].SharedClient.Title) + ',' + currentItemId + ',' + Doc_Type + ',' + type + "></td><td>" + itemsSharedHistory[index].SharedClient.Title + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: pointer;' onclick=BreakPermissionDeptDocFolder('" + documentid + "','" + encodeURI(itemurl) + "','" + encodeURI(itemsSharedHistory[index].SharedClient.Title) + "','')>Revoke</a></td></tr>";
                                }
                                else {
                                    sharedHistory += "<tr><td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + encodeURI(itemsSharedHistory[index].SharedClient.Title) + ',' + currentItemId + ',' + Doc_Type + ',' + type + "></td><td>" + itemsSharedHistory[index].SharedClient.Title + "</td><td>" + PermissionType + "</td><td>" + SharedOn + "</td><td><a style='cursor: pointer;' onclick=RevokeDepartmntPermission('" + documentid + "','" + encodeURI(itemurl) + "','" + encodeURI(itemsSharedHistory[index].SharedClient.Title) + "','')>Revoke</a></td></tr>";
                                }
                                arrduplicateClient.push(itemsSharedHistory[index].SharedClient.Title);
                            }
                        }

                    }
                }

                if (itemsSharedHistory.length == 0) {
                    $(".NoRecordFound").show();
                }
                else {
                    $(".NoRecordFound").hide();
                }

                $("#sharedHistoryList").append(sharedHistory);
                $("#TotalItemscount").text(itemsSharedHistory.length);
                if (itemsSharedHistory.length > 0) {
                    $("#shreduser").append(option);
                    TableConfiguration();	     // GenerateTable();
                    selectedHistoryDocEvent();
                }
            }
            else {
                $(".NoRecordFound").show();
                $("#TotalItemscount").text('0');
            }
        }, error: function (data) {
            console.log('error');
        }
    });
}

