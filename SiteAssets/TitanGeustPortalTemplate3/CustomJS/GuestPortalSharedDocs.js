var arrayLinksDoctype = new Array();
var LoggedIn_TimeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
var to = [];
var SharingUserEmail = [];
var SharingUserId = [];
var SharingUserName = [];
var ShareHostoryTable = '';
var SharedMeTable = '';
var selectedHistoryDoc = [];
var arrSharedBy = [];
var arrSharedTo = [];
var AllApprovers = [];
var FilePermissions = [];
var arrAckAllUser = [];
var currentSharedHistory = [];
var PermissionStatus = '';
var ShareUserPrincipleMail = [];
var currentSharedItemId = '';
$(document).ready(function () {
    initializePeoplePicker("SharingPplPicker", true);
    onChangeSharing('SharingPplPicker_TopSpan', 'SharingPplPicker', 'AddUserPplPicker');
    $("#tabSharedToMe").click(function () {
        arrPermission = [];
        $(".advance_setion").hide();
        $("#DMSTable,#ButtonArea,#SearchArea").show();
        waitingDialog.show();
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            if(currentTemplate=="TFW Partner Portal")
                $(".headdingLinks").text('Marketting Collerateral');//7 feb 23
            else
                $(".headdingLinks").text('Shared with Me');
            currentSectionType = "SharedWithMe";
            DMS_Type = 'Shared with Me';
            $("#divRevokeSharedTbl").hide();
            //ActionBtnControls();
            GetDocumentsSharedWithMe('SharedWithMe');
        }, 100);
    });
    $("#checkall").click(function (e) {
        if (this.checked == true) {
            $('.chkNotify').prop("checked", "");
            $('.chkNotify').trigger('click');
        }
        else {
            $('.chkNotify').prop("checked", "");
            to = [];
        }
    });
    $("#selectAllHist").click(function () {
        $(".historydocid").prop("checked", $(this).prop("checked"));
        selectedHistoryDoc = [];
        selectedHistoryDocrelativeurl = [];
        $('.historydocid').each(function () {
            if ($(this).prop("checked") == true) {
                selectedHistoryDoc.push($(this).val());
                $("#revokebtn").show();
            }
            else {
                $("#revokebtn").hide();
            }
        });
    });
    $('.closeShareHis').click(function (e) {
        currentSharedItemId = '';
        currentSharedHistory = [];
        $("#sharedAs").val('All');
    });
    $("#tabSharedByMe").click(function () {
        arrPermission = [];
        $(".advance_setion").hide();
        $("#DMSTable,#ButtonArea,#SearchArea").show();
        waitingDialog.show();
        $("#divPendingAck").hide();
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Shared by Me');
            currentSectionType = "SharedByMe";
            DMS_Type = 'Shared by Me';
            $("#divRevokeSharedTbl").show();
            //ActionBtnControls();
            GetDocumentsSharedWithMe('SharedByMe');
        }, 100);
    });
    $("#tabArchive").click(function () {
        $(".advance_setion").hide();
        $("#DMSTable,#ButtonArea,#SearchArea").show();
        arrPermission = [];
        waitingDialog.show();
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Archive');
            currentSectionType = "Archive";
            DMS_Type = 'Archive';
            $("#divRevokeSharedTbl").hide();
            //ActionBtnControls();
            GetDocumentsSharedWithMe('Archive');
        }, 100);
    });
    $('#shreduser').change(function (e) {
        FilterShareHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'Filter', currentSharedItemId);
    });
    $('#sharedAs').change(function (e) {
        FilterShareHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'Filter', currentSharedItemId);
    });
    $("#btnShareFilter").click(function () {
        waitingDialog.show();
        setTimeout(function () {
            //if ($(".headdingLinks").text() == "Shared by Me") {
                if (currentSectionType == "SharedByMe") {
                GetDocumentsSharedFilter('SharedByMe');
            }
            else if (currentSectionType == "Archive") {
                GetDocumentsSharedFilter('Archive');
            }
            else {
                GetDocumentsSharedFilter('SharedWithMe');
            }
        }, 100);
    });
    $(".CloseShareFilter").click(function () {
        if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
            EmptyPeoplePicker('pplSharedBy');
        }
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        $("#filterSharedFrom").val("");

    });
    $('#btnAddToArchive').click(function () {
        var arrTempFolder = [];
        if (arrFileFolder.length > 0) {
            AddToArchive();
        }
        else {
            alert("Please select any file/folder first.");
            return false;
        }
    });
    $('#btnRemoveArchive').click(function () {
        var arrTempFolder = [];
        if (arrFileFolder.length > 0) {
            RemoveArchive();
        }
        else {
            alert("Please select any file/folder first.");
            return false;
        }
    });
    $("#SharedFilterBox").click(function () {
        $("#btnShareFilter").show();
        $("#btnSharedDocFilter").hide();
        $(".NewFilter").show();
        if ($('#FilterShareDocType option').length == 0) {
            BindDMSDocumentType();
        }
       // if ($(".headdingLinks").text() == "Shared by Me") {
        if (currentSectionType == "SharedByMe") {
            
            $("#filterShareText").text('Shared To:');
        }
        else {
            $("#filterShareText").text("Shared By:");
        }
        if ($("#pplSharedBy").html() == '') {
            initializePeoplePicker("pplSharedBy", true);
        }
    });
    $("#btnRevokeSharedTbl").click(function () {
        if (arrFileFolder.length > 0) {
            waitingDialog.show();
            setTimeout(function () {
                RevokeMultiPermission();
            }, 100);
        }
        else {
            alert("Please select any file first.");
            return false;
        }
    });
    $("#divShare").click(function () {
        var arrTempFolder = [];
        SharingUserEmail = [];
        ShareUserPrincipleMail = [];
        SharingUserId = [];
        SharingUserName = [];
        $(".parentremove").remove();
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            $("#NeedAckBox").hide();
        }

        if (arrFileFolder.length > 0) {
            $('#expiredats').datepicker("destroy");
            $('#expiredats').datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: 1
            });
            $('#expiredats').datepicker("option", "dateFormat", "MM dd, yy");
            $("#btnShareMulti").show();
            $("#btnShare").hide();
        }
        else {
            alert("Please select any file or folder first.");
            return false
        }
    });
    $("#btnShareMulti").click(function () {
        if(!CheckSPecialNameMulti())//3 March 23
        {
            return false;
        }
        if (ShareFileValidation() == true) {
            shareFileMulti();
        }
    });
    $('#sharedWithPermission').on('change', function () {
        var optionValue = $('#sharedWithPermission option:selected').attr("value");
        $('.redonlysec').each(function () {
            var stalt = $(this).attr('alt');
            if (optionValue == stalt) {
                $(this).show().siblings().hide();
            }
        });
    });
    $(".btnClosePopup").click(function () {
        $("#txtShareMessage").val('');
        $("#sharedWithPermission").val('Contribute');
        $("#sharedWithPermission").trigger("change");
        $("#forever").prop("checked", "checked");
        $("#expiredon").prop("checked", "");
        $('#expiredats').removeClass('activating');
        $("#notifymail").prop("checked", "");
        $(".chkGpName").prop("checked", "");
        $(".chkClientName").prop("checked", "");
        $(".chkProjectName").prop("checked", "");
        $("#Acknowledgment").prop("checked", "");
        $(".txtselect").text("Select");
         //$("#sharewith").val('--Select--');
        $("#sharewith").val('Selective');//ON 13 March 23
        $("#sharewith").trigger("change");
        $("#NeedAckBox").show();
    });
    $("#btnShareFile").click(function () {
        $('#expiredats').datepicker("destroy");
        $('#expiredats').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: 1
        });
        $('#expiredats').datepicker("option", "dateFormat", "MM dd, yy");
        $("#btnShareMulti").hide();
        $("#btnShare").show();
    });
    $("#btnShare").click(function () {
         if(!CheckSPecialName($("#FileName").text()))//3 March 23
        {
            return false;
        }
        if (ShareFileValidation() == true) {
            shareFile();
        }
    });
    $('#txtPendingCount').click(function (e) {
        if ($('#FilterShareDocType option').length == 0) {
            BindDMSDocumentType();
        }
        if ($("#pplSharedBy").html() == '') {
            initializePeoplePicker("pplSharedBy", true);
        }
        $(".CloseShareFilter").trigger("click");
        $("#ddlAckFilter").val("Pending");
        $("#btnShareFilter").trigger("click");
    });
});

//Get all the Documents which are shared with me/shared by me.
function GetDocumentsSharedWithMe(SectionName) {
    //Geenrating the THead of table
    $("#generateBradCumbNew").empty();
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    var ColumnName = "";
    var sharedWithMeTR = '';
    ColumnName += '<th class="text-center border-bottom-0 w-2 nosort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
    $("#theadItem").empty();
    if (SectionName == 'SharedByMe') {
       // var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', '',''];
    }
    else {
       // var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission'];
         var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission',''];
       /* if(currentTemplate=="TFW Partner Portal")
            var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission'];//27 feb 23
        else 
            var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];*/
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItem").append(ColumnName);
    LoggedUserSPGp = GetSPGroup();
    var SharedUserFilter = "";
    for (var gp = 0; gp < LoggedUserSPGp.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + LoggedUserSPGp[gp].Id + "' ";
    }
    /*var EveryoneUserId = getTargetGroupId();
    for (var gp = 0; gp < EveryoneUserId.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + EveryoneUserId[gp] + "' ";
    }*/

    SharedUserFilter = SharedUserFilter.substring(0, SharedUserFilter.length - 1) + ")";

    if (SectionName == 'SharedByMe') {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(Author/EMail eq '" + _spPageContextInfo.userEmail + "' and IsArchive ne 1) ";
    }
    else if (SectionName == "Archive") {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View') and (PermissionStatus ne 'Deleted') and (IsArchive eq 1)";
    }
    else {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View' or PermissionStatus eq 'Revoked') and (PermissionStatus ne 'Deleted' and IsArchive ne 1)";
    }
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        if (SectionName == 'SharedByMe') {
            arrSharedBy = items.filter(function (f) { return f; });
        }
        else {
            arrSharedTo = items.filter(function (f) { return f; });
        }
        if (items.length) {
            $("#ButtonArea").show();// 27 feb 23
            if (SectionName == 'SharedByMe') {
                SharedByMeItems(items);
            }
            else {
                items = items.filter(function (obj) { //Filter array on the basis of PermissionStatus 
                    return obj.PermissionStatus != "Revoked";
                });
                SharedWithMeItems(items, 'SharedWithMe');
            }
            waitingDialog.hide();
        }
        else {
            $("#ButtonArea").hide();//27 feb 23
            $("#DivAppInCount").hide();
           $("#DivAppOutCount").hide();
            $("#divPendingAck").hide();
            waitingDialog.hide();
            sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
            $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
            $("#divPendingAck").hide();
        }
    });
}

//bind Shared with me Items
function SharedWithMeItems(items) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        IsEveryone = [],
        AckCounter = 0,
        ChatBoxHTML='';
    ActionHTML = '';

    var HistoryAction = "SharedWithMe";
    var sharedWithMeTR = '';
    for (var i = 0; i < items.length; i++) {
        var DocumentNo ="";//Bhawana
        var DocRefNo=(items[i].DocumentNo!=null&&items[i].DocumentNo!='null')?items[i].DocumentNo:"";
        if(items[i].MetaDataRestricted==true ||items[i].MetaDataRestricted=='true') 
        {}
        else
        {
            DocumentNo = DocRefNo;
        }
        //var DocumentNo = items[i].DocumentNo ? items[i].DocumentNo : "";
        var DocumentType = items[i].DocumentType ? items[i].DocumentType : "";
        var Details = items[i].Details ? items[i].Details : "";
        //var sourceDocType = items[i].DocumentType ? items[i].DocumentType : "";
         var sourceDocType = items[i].DOC_ID.DocumentType ? items[i].DOC_ID.DocumentType : "";//27 feb 23
        var PermissionType = items[i].PermissionType ? items[i].PermissionType : "";

        var PermissionStatus = items[i].PermissionStatus;
        if (PermissionStatus != "Revoked" && PermissionStatus != "Deleted") {
            PermissionStatus = PermissionType;
        }
        else {
            PermissionStatus = PermissionStatus.fontcolor("Red");
        }
        if (sourceDocType == "--select--" || sourceDocType == "-Select-") {
            sourceDocType = '';
        }
        //27 feb 23
        if (items[i].SubCategory != "null" && items[i].SubCategory != null && items[i].SubCategory != "" && items[i].SubCategory != "--select--" && items[i].SubCategory != "-Select-") {
            if(sourceDocType!='')
            sourceDocType = "(" + sourceDocType + ")" + items[i].SubCategory;
            else
            sourceDocType = items[i].SubCategory;

        }
        var Title = items[i].Title ? items[i].Title : "";
        var SourceDocTitle = items[i].SharedFileTitle ? items[i].SharedFileTitle : "";
        var sharedBy = items[i].Author.Title
        var FileServerRelativeUrl = items[i].ServerRedirectedEmbedURL;
        if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
            FileServerRelativeUrl = items[i].DocumentURL;//items[i].File.ServerRelativeUrl;
        }
        FileServerRelativeUrl = FileServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
        var documentLink = "";
        var splitDocTypeLink = "";
        var downloadlink = "";
        var FileExtension = "." + Title.substring(Title.lastIndexOf('.') + 1);
        sharedFrom = getSharedFromValue(items[i].SharedType, items[i].SharedFrom);
        if (DocumentType.toLowerCase() != "folder") {
            Icon = "file.png";
            if (".docx" == FileExtension || ".doc" == FileExtension) {
                Icon = "docx.png";
            } else if (".pdf" == FileExtension) {
                Icon = "pdf.png";
            } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                Icon = "image-icon.png";
            } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                Icon = "xlsx.png";
            } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
                Icon = "pptx.png";
            } else if (".txt" == FileExtension) {
                Icon = "txt.png";
            } else if (".csv" == FileExtension) {
                Icon = "CSV.png";
            } else if (".zip" == FileExtension || ".rar" == FileExtension || ".7z" == FileExtension || ".arz" == FileExtension || ".cab" == FileExtension || ".rpm" == FileExtension || ".wim" == FileExtension) {
                Icon = "ZIP.png";
            } else if (".mp4" == FileExtension || ".wmv" == FileExtension || ".avi" == FileExtension || ".mpeg" == FileExtension || ".flv" == FileExtension || ".mov" == FileExtension || ".wav" == FileExtension || ".ogv" == FileExtension) {
                Icon = "video-files.png";
            } else if (".mp3" == FileExtension || ".wma" == FileExtension || ".aac" == FileExtension || ".pcm" == FileExtension) {
                Icon = "audio.png";
            }

            if (items[i].PermissionStatus != "Revoked" && items[i].PermissionStatus != "Deleted") {
                var SiteURL = '';
                if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                    DMS_Type = "My Documents";
                }
                else {
                    DMS_Type = items[i].SharedType + ': ' + items[i].SharedFrom;
                }
                if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                    if (encodeURI(items[i].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                        SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                    }
                    else {
                        SiteURL = _spPageContextInfo.webAbsoluteUrl;
                    }
                }
                else {
                    SiteURL = items[i].SiteURL;
                }
                var NullValue = 'NullValue';
                 var shareMsgg=(items[i].SharedMessage!=""&&items[i].SharedMessage!=null&&items[i].SharedMessage!=undefined&&items[i].SharedMessage!='null'&&items[i].SharedMessage!='undefined')?fixedEncodeURIComponent(items[i].SharedMessage):"";
               
                documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '" rel="' + items[i].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(items[i].DocumentURL) + '\', \'' + items[i].Id + '\', \'' + NullValue + '\', \'' + items[i].LibraryURL + '\', \'' + items[i].MetaDataRestricted + '\', \'' + shareMsgg + '\');">' + Title + '</a>';//Bhawana
                downloadlink = "<a href='" + fixedEncodeURIComponent(items[i].DocumentURL,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
            }
            else {
                documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '">' + Title + '</a>';
            }
            //14 April 23
            if (items[i].CommentCount != null && items[i].CommentCount != "null" && items[i].CommentCount != 0 && items[i].CommentCount != "0") {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
            }
            else {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
            }
        }
        else {
              ChatBoxHTML = '';
            Icon = "folder.png";
            var LibraryType = '';
            if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                LibraryType = "My Documents";
            }
            else {
                LibraryType = items[i].SharedType + ': ' + items[i].SharedFrom;
            }
            var tempStatus = PermissionStatus;
            if (PermissionStatus == '<font color="Red">Revoked</font>') {
                tempStatus = "Revoked";
            }
            RunBreadCrumb = true;
            documentLink += '<a href="javascript:void(0);" rel="' + items[i].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[i].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[i].SiteURL + '\', \'' + items[i].LibraryName + '\', \'' + items[i].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[i].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
            SourceDocTitle = Title;   //Title For Folder
            sourceDocType = "Folder";
        }

        if (items[i].NeedAcknowledgement == true) {
            var AckValue = AckUserStatus(items[i].Id, _spPageContextInfo.userEmail, items[i].DocumentURL, items[i].SiteURL, items[i].PermissionType, items[i].LibraryName, items[i].SharedFrom);
        }
        else {
            var AckValue = '';
        }
        if (AckValue.indexOf("DisplayFileProperty") !== -1) {
            AckCounter++;
        }
        if ($("#ddlAckFilter").val() == "Acknowledged") {
            if (AckValue.indexOf("Acknowledged") !== -1) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].SharedFileTitle = items[i].SharedFileTitle ? items[i].SharedFileTitle : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].SharedFileTitle + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
                //if(currentTemplate!="TFW Partner Portal")
                //sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')"></div></td>';
                sharedWithMeTR += '<td>' + ChatBoxHTML + '</td>';//14 April 23
                sharedWithMeTR += '</tr>';
            }
        }
        else if ($("#ddlAckFilter").val() == "Pending") {
            if (AckValue.search(/\bAcknowledge\b/) >= 0) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].SharedFileTitle = items[i].SharedFileTitle ? items[i].SharedFileTitle : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].SharedFileTitle + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
               // if(currentTemplate!="TFW Partner Portal")
               // sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')"></div></td>';
                sharedWithMeTR += '<td>' + ChatBoxHTML + '</td>';//14 April 23
                sharedWithMeTR += '</tr>';
            }
        }

        else {
            sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ' , ' + items[i].Title + ' , ' + items[i].LibraryName + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[i].SharedFileTitle = items[i].SharedFileTitle ? items[i].SharedFileTitle : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].SharedFileTitle + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
            sharedWithMeTR += '' + AckValue + '</div></td>';
            //if(currentTemplate!="TFW Partner Portal")
            //sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')"></div></td>';
             sharedWithMeTR += '<td>' + ChatBoxHTML + '</td>';//14 April 23
            sharedWithMeTR += '</tr>';

        }
    }
    if (MyDoctable != '') {
        MyDoctable.destroy();
    }
    $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    if (AckCounter == 0) {
        $("#divPendingAck").hide();
    }
    else {
        $("#txtPendingCount").text(AckCounter);
        $("#divPendingAck").show();
    }
    $(".chkShareToMe").click(function () {
        var Properties = this.value.split(',');
        if (this.checked == true) {
            arrFileFolder.push({
                SharedItemId: Properties[0].trim(),
                type: Properties[1].trim(),
                SharedTo: Properties[2].trim(),
                DocumentId: Properties[3].trim(),
                ServerURL: Properties[4].trim(),
                userOrgId: Properties[5].trim(),
                SiteURL: Properties[6].trim(),
                FileFolderName:Properties[4].split('/')[Properties[4].split('/').length-1].trim(),
                SelectedLibrary:Properties[Properties.length-1].trim()
            });
        }
        else {
            var selected = this.value;
            arrFileFolder = arrFileFolder.filter(function (obj) {
                return obj.SharedItemId != Properties[0].trim();
            });
        }
    });
    $("#selectAllChk").click(function (e) {
        waitingDialog.show();
        setTimeout(function () {
            //if (this.checked == true) //Bhawana
            if($("#selectAllChk").prop('checked')==true){
                $('.chkShareToMe').prop("checked", "");
                $('.chkShareToMe').trigger('click');
            }
            else {
                $('.chkShareToMe').prop("checked", "");
                arrFileFolder = [];
            }
            /* var checked = this.checked;
            MyDoctable.column(0).nodes().to$().each(function(index) {    
                if($("#selectAllChk").prop('checked')==true){
                $(this).find('.chkShareToMe').prop('checked', 'checked');
                $('.chkShareToMe').trigger('click');
                } else {
                $(this).find('.chkShareToMe').removeProp('checked'); 
                arrFileFolder = [];           
                }
            });
            MyDoctable.draw();  */
            waitingDialog.hide();
        }, 100);
    });
    Tableagination();
}


//bind Shared by me Items
function SharedByMeItems(array) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        arrDuplicateFile = [],
        arrRevoked = [],
        IsEveryone = [],
        ActionHTML = '',
        PermissionStatus = 'Single',
        items = [],
        ChatBoxHTML = '',
        HistoryAction = "SharedByMe";
    var sharedWithMeTR = '';
    for (var i = 0; i < array.length; i++) {
        array[i].IsBlock = "No";
        PermissionStatus = 'Single';
        var documentLink = "";
        var splitDocTypeLink = "";
        var downloadlink = "";
        if (jQuery.inArray(array[i].DocumentID, arrDuplicateFile) == '-1') {
            arrDuplicateFile.push(array[i].DocumentID);
            items = array.filter(function (obj) { //filter the array file-wise
                return obj.DocumentID == array[i].DocumentID;
            });
            var Title = items[0].Title;
            if (items.length > 1) {
                PermissionStatus = "Multiple";
            }
            //to check if all the permission status are revoked --------
            arrRevoked = items.filter(function (obj) { //filter the array file-wise
                return obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted";
            });
            if (arrRevoked.length == 0) {
                PermissionStatus = "All revoked";
            }

            //----------------------------------------------------------
            var DocumentNo = items[0].DocumentNo ? items[0].DocumentNo : "";
            var sharedBy = items[0].Author.Title;
            var DocumentType = items[0].DocumentType ? items[0].DocumentType : "";
            var Details = items[0].Details ? items[0].Details : "";
            //var sourceDocType = items[0].DocumentType ? items[0].DocumentType : "";
            var sourceDocType = items[0].DOC_ID.DocumentType ? items[0].DOC_ID.DocumentType : "";
            if (sourceDocType == "--select--" || sourceDocType == "-Select-") {
                sourceDocType = '';
            }
            if (items[0].SubCategory != "null" && items[0].SubCategory != null && items[0].SubCategory != "" && items[0].SubCategory != "--select--" && items[0].SubCategory != "-Select-") {
            if(sourceDocType!='')
                sourceDocType = "(" + sourceDocType + ")" + items[0].SubCategory;
            else
                sourceDocType = items[0].SubCategory;            
            }
            var SourceDocTitle = items[0].SharedFileTitle ? items[0].SharedFileTitle : "";
            var FileServerRelativeUrl = items[0].ServerRedirectedEmbedURL;
            if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
                FileServerRelativeUrl = items[0].DocumentURL;
            }
            FileServerRelativeUrl = FileServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
            var FileExtension = "." + Title.substring(Title.lastIndexOf('.') + 1);
            sharedFrom = getSharedFromValue(items[0].SharedType, items[0].SharedFrom);
            if (DocumentType.toLowerCase() != "folder") {
                Icon = "file.png";
                if (".docx" == FileExtension || ".doc" == FileExtension) {
                    Icon = "docx.png";
                } else if (".pdf" == FileExtension) {
                    Icon = "pdf.png";
                } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                    Icon = "image-icon.png";
                } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                    Icon = "xlsx.png";
                } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
                    Icon = "pptx.png";
                } else if (".txt" == FileExtension) {
                    Icon = "txt.png";
                } else if (".csv" == FileExtension) {
                    Icon = "CSV.png";
                } else if (".zip" == FileExtension || ".rar" == FileExtension || ".7z" == FileExtension || ".arz" == FileExtension || ".cab" == FileExtension || ".rpm" == FileExtension || ".wim" == FileExtension) {
                    Icon = "ZIP.png";
                } else if (".mp4" == FileExtension || ".wmv" == FileExtension || ".avi" == FileExtension || ".mpeg" == FileExtension || ".flv" == FileExtension || ".mov" == FileExtension || ".wav" == FileExtension || ".ogv" == FileExtension) {
                    Icon = "video-files.png";
                } else if (".mp3" == FileExtension || ".wma" == FileExtension || ".aac" == FileExtension || ".pcm" == FileExtension) {
                    Icon = "audio.png";
                }
                var SiteURL = '';
                if (items[0].SharedType == null || items[0].SharedType == "Personal" || items[0].SharedType == "My-DMS") {
                    DMS_Type = "My Documents";
                }
                else {
                    DMS_Type = items[0].SharedType + ': ' + items[0].SharedFrom;
                }
                if (items[0].SiteURL == "null" || items[0].SiteURL == null || items[0].SiteURL == "undefined" || items[0].SiteURL == undefined) {
                    if (encodeURI(items[0].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                        SiteURL = window.location.origin + encodeURI(items[0].DocumentURL).split('DepartmentalDMS')[0];
                    }
                    else {
                        SiteURL = _spPageContextInfo.webAbsoluteUrl;
                    }
                }
                else {
                    SiteURL = items[0].SiteURL;
                }
                var NullValue = 'NullValue';
                
                var shareMsgg=(items[0].SharedMessage!=""&&items[0].SharedMessage!=undefined&&items[0].SharedMessage!=null&&items[0].SharedMessage!='null'&&items[0].SharedMessage!='undefined')?fixedEncodeURIComponent(items[0].SharedMessage):"";//24 April 23
                
                documentLink = '<a href="javascript:void(0);" name="' + items[0].DocumentURL + '" rel="' + items[0].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(items[0].DocumentURL) + '\', \'' + items[0].Id + '\', \'' + NullValue + '\',\''+items[0].LibraryURL+'\', \'' + items[0].MetaDataRestricted + '\', \'' + shareMsgg + '\');">' + Title + '</a>';//Bhawana
                downloadlink = "<a href='" + fixedEncodeURIComponent(items[0].DocumentURL,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                //14 April 23
               if (items[0].CommentCount != null && items[0].CommentCount != "null" && items[0].CommentCount != 0 && items[0].CommentCount != "0") {
                    ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[0].DocumentID + '\', \'' + items[0].Title + '\', \'' + items[0].SharedFileTitle + '\', \'' + items[0].DocType + '\', \'' + items[0].EditorId + '\', \'' + items[0].EditorId + '\', \'' + items[0].Modified + '\', \'' + items[0].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
                }
                else {
                    ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[0].DocumentID + '\', \'' + items[0].Title + '\', \'' + items[0].SharedFileTitle + '\', \'' + items[0].DocType + '\', \'' + items[0].EditorId + '\', \'' + items[0].EditorId + '\', \'' + items[0].Modified + '\', \'' + items[0].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
                }
            }
            else {
                ChatBoxHTML = '';
                Icon = "folder.png";
                var LibraryType = '';
                if (items[0].SharedType == null || items[0].SharedType == "Personal" || items[0].SharedType == "My-DMS") {
                    LibraryType = "My Documents";
                }
                else {
                    LibraryType = items[0].SharedType + ': ' + items[0].SharedFrom;
                }
                var tempStatus = PermissionStatus;
                if (PermissionStatus == 'All revoked') {
                    tempStatus = "Revoked";
                }
                RunBreadCrumb = true;
                documentLink += '<a href="javascript:void(0);" rel="' + items[0].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[0].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[0].SiteURL + '\', \'' + items[0].LibraryName + '\', \'' + items[0].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[0].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
                SourceDocTitle = Title;   //Title For Folder
                sourceDocType = "Folder";
            }
            if (PermissionStatus == "All revoked") {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" id ="ShareToMe' + i + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + i + '">';
            }
            else {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[0].Id + ', ' + items[0].DocumentType + ', ' + items[0].SharedGroup + ', ' + items[0].DocumentID + ', ' + items[0].DocumentURL + ', ' + items[0].SharedUsers.results[0].ID + ', ' + items[0].SiteURL + ', ' + items[0].IsBlock + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            }
            //check if any time file/folder shared to 'Everyone'
            if (PermissionStatus != "All revoked") {
                IsEveryone = items.filter(function (obj) { //filter the array file-wise
                    return obj.SharedGroup == "Everyone" && (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted");
                });
                var temparray = items.filter(function (obj) { //filter the array file-wise
                    return (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted");
                });
                if (IsEveryone.length > 0 && IsEveryone.length == temparray.length) {
                    ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                }
                else {
                    if (IsEveryone.length > 0 && IsEveryone.length != items.length) {
                        ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')"><img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[0].Id + '\')">';
                    }
                    else {
                        ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                    }
                }
            }
            else {
                ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
            }
            sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[0].SharedFileTitle = items[0].SharedFileTitle ? items[0].SharedFileTitle : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[0].SharedFileTitle + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
            if (PermissionStatus == "All revoked") {
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2"><img src="../SiteAssets/MyDocuments/DMS/assets/images/no_shared.png" style="width:20px; margin:0 2px;"></div></td>';
            }
            else {
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '</div></td>';
            }
            sharedWithMeTR += '<td class="text-left"><div class="ShareAction">' + ActionHTML + '</div>' + ChatBoxHTML + '</td></tr>';
        }
    }
    if (MyDoctable != '') {
        MyDoctable.destroy();
    }
    $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    $(".chkShareToMe").click(function () {
        var Properties = this.value.split(',');
        if (this.checked == true) {
            arrFileFolder.push({
                SharedItemId: Properties[0].trim(),
                type: Properties[1].trim(),
                SharedTo: Properties[2].trim(),
                DocumentId: Properties[3].trim(),
                ServerURL: Properties[4].trim(),
                userOrgId: Properties[5].trim(),
                SiteURL: Properties[6].trim(),
                FileFolderName:Properties[4].split('/')[Properties[4].split('/').length-1].trim(),
                SelectedLibrary:Properties[Properties.length-1].trim()
            });
        }
        else {
            var selected = this.value;
            arrFileFolder = arrFileFolder.filter(function (obj) {
                return obj.SharedItemId != Properties[0].trim();
            });
        }
    });
    $("#selectAllChk").click(function (e) {
        waitingDialog.show();
        setTimeout(function () {
            //if (this.checked == true)//Bhawna
            if($('#selectAllChk').prop('checked')==true)
             {
                $('.chkShareToMe').prop("checked", "");
                $('.chkShareToMe').trigger('click');
            }
            else {
                $('.chkShareToMe').prop("checked", "");
                arrFileFolder = [];
            }
            waitingDialog.hide();
        }, 100);
    });
    Tableagination();
}


//to find the Shared_From value
function getSharedFromValue(SharedType, SharedFrom) {
    if (SharedType == "Personal" || SharedType == null || SharedType == "null" || SharedType == "My-DMS") {
        if (SharedFrom == null) {
            return (SharedType = "My-DMS");
        }
        else {
            return "My-DMS" + ": " + SharedFrom;
        }
    }
    else {
        return (SharedType + ": " + SharedFrom);
    }
}

//Get all the sub-File/Folder shared with me
function GetSharedFolderDocuments(Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var ChkCount = 1;
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2 nosort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
    //if ($(".headdingLinks").text() == 'Shared by Me') {
        if (currentSectionType == 'SharedByMe') {
        
        var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItem").empty().append(ColumnName);
    if (SiteURL == "null" || SiteURL == null || SiteURL == "undefined" || SiteURL == undefined) {
        if (folderUrl.indexOf("DepartmentalDMS") != -1) {
            SiteURL = window.location.origin + folderUrl.split('DepartmentalDMS')[0];
        }
        else {
            SiteURL = _spPageContextInfo.webAbsoluteUrl;
        }
    }
    var documentLink = '';
    var sharedWithMeTR = '';
    var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var files = data.d.Files.results;
            var folders = data.d.Folders.results;
            if (files.length == 0 && folders.length == 0) {
                waitingDialog.hide();
                sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
            }
            else {
                for (var i = 0; i < folders.length; i++) {
                    Icon = "folder.png";
                    var SubfolderUrl = folderUrl + '/' + folders[i].Name;
                    var RunBreadCrumb = true;
                    var BlankValueParam = '';
                    FileType = "folder";
                    documentLink = '<a href="javascript:void(0);" rel="' + Action.rel + '" onclick="GetSharedFolderDocuments(this, \'' + SubfolderUrl + '\', \'' + PermissionType + '\', \'' + SiteURL + '\', \'' + LibraryName + '\', \'' + ItemTitle + '\', \'' + ItemRef + '\', \'' + ItemDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\')" class="doc_icon">' + folders[i].Name + '</a>';
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">Folder</div></td>';
                   // if ($(".headdingLinks").text() != 'Shared by Me') {
                    if (currentSectionType != 'SharedByMe') {
                        sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                    }
                    else {
                        //sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2"></div></td>';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionType + '</div></td>';
                    sharedWithMeTR += IsBlockHTML + '</tr>';
                }
                for (var i = 0; i < files.length; i++) {
                    var FileExtension = "." + files[i].Name.substring(files[i].Name.lastIndexOf('.') + 1);
                    Icon = "file.png";
                    if (".docx" == FileExtension || ".doc" == FileExtension) {
                        Icon = "docx.png";
                    } else if (".pdf" == FileExtension) {
                        Icon = "pdf.png";
                    } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                        Icon = "image-icon.png";
                    } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                        Icon = "xlsx.png";
                    } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
                        Icon = "pptx.png";
                    } else if (".txt" == FileExtension) {
                        Icon = "txt.png";
                    } else if (".csv" == FileExtension) {
                        Icon = "CSV.png";
                    } else if (".zip" == FileExtension || ".rar" == FileExtension || ".7z" == FileExtension || ".arz" == FileExtension || ".cab" == FileExtension || ".rpm" == FileExtension || ".wim" == FileExtension) {
                        Icon = "ZIP.png";
                    } else if (".mp4" == FileExtension || ".wmv" == FileExtension || ".avi" == FileExtension || ".mpeg" == FileExtension || ".flv" == FileExtension || ".mov" == FileExtension || ".wav" == FileExtension || ".ogv" == FileExtension) {
                        Icon = "video-files.png";
                    } else if (".mp3" == FileExtension || ".wma" == FileExtension || ".aac" == FileExtension || ".pcm" == FileExtension) {
                        Icon = "audio.png";
                    }
                    var NullValue = 'NullValue';
                  //  documentLink = '<a href="javascript:void(0);" name="' + files[i].ServerRelativeUrl + '" rel="" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + LibraryType + '\', \'' + PermissionType + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + files[i].ServerRelativeUrl + '\', \'' + NullValue + '\', \'' + NullValue + '\');">' + files[i].Name + '</a>';
                    documentLink = '<a href="javascript:void(0);" name="' + files[i].ServerRelativeUrl + '" rel="" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + LibraryType + '\', \'' + PermissionType + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + files[i].ServerRelativeUrl + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + files[i].LibraryURL + '\');">' + files[i].Name + '</a>';//Bhawana
                    downloadlink = "<a href='" + encodeURI(files[i].ServerRelativeUrl) + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    var BlankValueParam = '';
                    FileType = "file";
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    if (files[i].ListItemAllFields.DocumentType == null || files[i].ListItemAllFields.DocumentType == undefined || files[i].ListItemAllFields.DocumentType == "null" || files[i].ListItemAllFields.DocumentType == "--select--" || files[i].ListItemAllFields.DocumentType == "-Select-") {
                        files[i].ListItemAllFields.DocumentType = '';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + files[i].ListItemAllFields.DocumentType + '</div></td>';
                    //if ($(".headdingLinks").text() != 'Shared by Me') {
                     if (currentSectionType != 'SharedByMe') {
                        sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                    }
                    else {
                        //sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2"></div></td>';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionType + '</div></td>';
                    sharedWithMeTR += IsBlockHTML + '</tr>';

                }
                if (MyDoctable != '') {
                    MyDoctable.destroy();
                }
                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
                Tableagination();
                $(".chkShareToMe").click(function () {
                    var Properties = this.value.split(',');
                    if (this.checked == true) {
                        arrFileFolder.push({
                            SharedItemId: Properties[0].trim(),
                            type: Properties[1].trim(),
                            SharedTo: Properties[2].trim(),
                            DocumentId: Properties[3].trim(),
                            ServerURL: Properties[4].trim(),
                            userOrgId: Properties[5].trim(),
                            SiteURL: Properties[6].trim(),
                            IsBlock: Properties[7].trim(),
                            FileFolderName:Properties[4].split('/')[Properties[4].split('/').length-1].trim(),
                            SelectedLibrary:Properties[Properties.length-1].trim()
                        });
                    }
                    else {
                        var selected = this.value;
                        arrFileFolder = arrFileFolder.filter(function (obj) {
                            return obj.SharedItemId != Properties[0].trim();
                        });
                    }
                });
                $("#selectAllChk").click(function (e) {
                    waitingDialog.show();
                    setTimeout(function () {
                        if (this.checked == true) {
                            $('.chkShareToMe').prop("checked", "");
                            $('.chkShareToMe').trigger('click');
                        }
                        else {
                            $('.chkShareToMe').prop("checked", "");
                            arrFileFolder = [];
                        }
                        waitingDialog.hide();
                    }, 100);

                });
                waitingDialog.hide();
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    if (RunNavigation == true || RunNavigation == "true") {
        $("#generateBradCumbNew").empty();
        CheckLibary = LibraryName;
       // if ($(".headdingLinks").text() == 'Shared with Me' || $(".headdingLinks").text() == 'Shared by Me') {
        if (currentSectionType == 'SharedWithMe' || currentSectionType == 'SharedByMe') {
             
            //folderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
            GetSubShareFolders(folderUrl, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, false);
        }
        else {
            GetSubFolders(folderUrl);
        }
    }
}


//get Acknowledgment when binding Shared With Me Docs
function AckUserStatus(SharedItemId, SharedUserName, ServerURL, LibraryURL, Permission, LibraryName, SharedFrom) {
    if (LibraryName == "DocumentManagementSystem") {
        LibraryName = 'My Documents';
    }
    else {
        LibraryName = SharedFrom;
    }
    var AckStatus = '';
    var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + SharedUserName + "' and Acknowledge eq '1'";
    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
        if (DocumentAcknowledgement.length > 0) {
            AckStatus = '<div class="AckStatus" style="color:green;">Acknowledged</div>';
        }
        else {
        	var NullValue = 'NullValue';
            AckStatus = '<a href="javascript:void(0);" rel="' + SharedItemId + '" name="' + ServerURL + '" onclick="DisplayFileProperty(\'' + LibraryURL + '\', \'' + LibraryName + '\', \'' + Permission + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + ServerURL + '\', \'' + SharedItemId + '\', \'' + NullValue + '\');" class="AckStatus">Acknowledge</a>';
        }
    });
    return AckStatus;
}

//open Popup to show which users have Acknowledged or not
function OpenAckNotify(Section, SharedGroup, SharedUserId, SharedItemId, SharingValidity, SharedOn, PermissionType, SharedUserEmail, SharedUserName, PermissionStatus, ShareBy, DocType) {
    waitingDialog.show();
    setTimeout(function () {
        $("#AckUserList").empty();
        arrAckAllUser = [];
        var attachment = '';
        var AckHistory = '';
        $("#btnAckNotifyAll").show();
        if (Section == "SharedWithMe") {
            $("#btnAckNotifyAll").hide();
            var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "' and Acknowledge eq '1'";
            $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                if (DocumentAcknowledgement.length > 0) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
                    AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                    AckHistory += '</span><div class="detalbox">' + _spPageContextInfo.userDisplayName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + _spPageContextInfo.userEmail + '\');">' + _spPageContextInfo.userEmail + '</a></div></div>';
                    AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + ShowCommonStandardDateFormat(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
                    AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                    AckHistory += '</span><div class="detalbox">' + _spPageContextInfo.userDisplayName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + _spPageContextInfo.userEmail + '\');">' + _spPageContextInfo.userEmail + '</a></div></div>';
                    AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" style="display:none;" id="SendAckParent0"><button class="btn custom-btn w-70" id="0" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + _spPageContextInfo.userDisplayName + '\', \'' + _spPageContextInfo.userEmail + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                }
            });
            $("#AckUserList").append(AckHistory);
            arrAckAllUser.push({
                AckName: _spPageContextInfo.userDisplayName,
                AckEmail: _spPageContextInfo.userEmail,
                AckPermission: PermissionType,
                AckSharedOn: SharedOn,
                AckSharedValid: SharingValidity,
                AckShareBy: ShareBy,
                AckDocType: DocType
            });
        }
        else {
            if (SharedGroup == "My-Groups" || SharedGroup == "Selective") {
                $("#btnAckNotifyAll").hide();
                var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + SharedUserEmail + "' and Acknowledge eq '1'";
                $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                    if (DocumentAcknowledgement.length > 0) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SharedUserEmail);
                        AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                        AckHistory += '</span><div class="detalbox">' + SharedUserName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + SharedUserEmail + '\');">' + SharedUserEmail + '</a></div></div>';
                        AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + ShowCommonStandardDateFormat(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                    }
                    else {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SharedUserEmail);
                        AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                        AckHistory += '</span><div class="detalbox">' + SharedUserName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + SharedUserEmail + '\');">' + SharedUserEmail + '</a></div></div>';
                        AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent0"><button class="btn custom-btn w-70" id="0" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserName + '\', \'' + SharedUserEmail + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                    }
                });
                $("#AckUserList").append(AckHistory);
                arrAckAllUser.push({
                    AckName: SharedUserName,
                    AckEmail: SharedUserEmail,
                    AckPermission: PermissionType,
                    AckSharedOn: SharedOn,
                    AckSharedValid: SharingValidity,
                    AckShareBy: ShareBy,
                    AckDocType: DocType
                });

            }
            else { //"Everyone", "Organization"
                var GpUserDetails = [];
                if (SharedGroup == "Organization") {
                    GpUserDetails = GetUserFromSPGp(SharedUserId);
                }
                else { //Everyone
                    GpUserDetails = GetUserFromEmp(SharedUserId);
                }
                for (var gp = 0; gp < GpUserDetails.length; gp++) {
                    AckHistory = '';
                    var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + GpUserDetails[gp].Email + "' and Acknowledge eq '1'";
                    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                        if (DocumentAcknowledgement.length > 0) {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GpUserDetails[gp].Email);
                            AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                            AckHistory += '</span><div class="detalbox">' + GpUserDetails[gp].Title + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + GpUserDetails[gp].Email + '\');">' + GpUserDetails[gp].Email + '</a></div></div>';
                            AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + ShowCommonStandardDateFormat(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                            $("#AckUserList").append(AckHistory);
                        }
                        else {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GpUserDetails[gp].Email);
                            AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                            AckHistory += '</span><div class="detalbox">' + GpUserDetails[gp].Title + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + GpUserDetails[gp].Email + '\');">' + GpUserDetails[gp].Email + '</a></div></div>';

                            if (PermissionStatus == "Revoked") {
                                $("#btnAckNotifyAll").hide();
                                AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent' + gp + '"><button class="btn custom-btn w-70" id="' + gp + '" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + GpUserDetails[gp].Title + '\', \'' + GpUserDetails[gp].Email + '\', \'' + ShareBy + '\', \'' + DocType + '\');" disabled="disabled">Notify</button></div></div></li>';
                            }
                            else {
                                AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent' + gp + '"><button class="btn custom-btn w-70" id="' + gp + '" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + GpUserDetails[gp].Title + '\', \'' + GpUserDetails[gp].Email + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                            }
                            $("#AckUserList").append(AckHistory);
                            arrAckAllUser.push({
                                AckName: GpUserDetails[gp].Title,
                                AckEmail: GpUserDetails[gp].Email,
                                AckPermission: PermissionType,
                                AckSharedOn: SharedOn,
                                AckSharedValid: SharingValidity,
                                AckShareBy: ShareBy,
                                AckDocType: DocType

                            });
                        }
                    });
                }
            }
        }
        $("#Acknowledgement").modal('show');
        waitingDialog.hide();
    }, 100);
}


//send Notify mail to all
function NotifyAllAck() {
    var DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    var MailSub = _spPageContextInfo.userDisplayName + ' is requesting your acknowledgement on a document.';
    for (var ack = 0; ack < arrAckAllUser.length; ack++) {
        Metadata = '';
        var EmailDesign = '';
        var SharedValidHTML = '';
        if (arrAckAllUser[ack].AckSharedValid == null || arrAckAllUser[ack].AckSharedValid == "null" || arrAckAllUser[ack].AckSharedValid == '') {
            SharedValidHTML = '';
        }
        else {
            SharedValidHTML = "<div><strong>Valid till:</strong> " + arrAckAllUser[ack].AckSharedValid + "</div><br/>";
        }
        EmailDesign = "Dear " + arrAckAllUser[ack].AckName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has shared the following document with you. Your acknowledgment is required on this document.<br/><br/>";
        EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#filenamee").text() + "</div>" +
        	                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#filetitle").text() + "</div>" +
        	                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + arrAckAllUser[ack].AckDocType + "</div>" +
	                            "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#referNo").text() + "</div>" +
	                             "<div><strong>Permission:</strong> " + arrAckAllUser[ack].AckPermission + "</div>" +
	                             "<div><strong>Shared By:</strong> " + arrAckAllUser[ack].AckShareBy + "</div>" +
	                             "<div><strong>Shared On:</strong> " + arrAckAllUser[ack].AckSharedOn + "</div>" +
	                             SharedValidHTML +
	                             "<br/><br/><br/>" +
	                            "<div><a href=" + DashboardLink + ">Click here</a> to open and acknowledge the document.</div>" + "<br/><br/>";
        EmailDesign += "This is an auto generated email. Please don't reply.";
        for(var k = 0; k < LabelDefaultLangauge.length; k++) {
	    	if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
	    		EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
	    	}	
	    }
        Metadata = {
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': _spPageContextInfo.userEmail,
                'To': { 'results': [arrAckAllUser[ack].AckEmail] },
                'Body': EmailDesign,
                'Subject': MailSub
            }
        };

        var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({
            contentType: 'application/json',
            url: sitetemplateurl,
            type: "POST",
            async: false,
            data: JSON.stringify(Metadata),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                if (arrAckAllUser.length == ack + 1) {
                    waitingDialog.hide();
                    alert("Notification has been sent to all.");
                }
            },
            error: function (err) {
                alert("SendEmailAckNotification  " + JSON.stringify(err));
                return false;
            }
        });
    }
}

//to send Acknowledgement mail to users
function SendAckMail(Action, SharingValidity, SharedOn, PermissionType, ToUserName, ToUserEmail, ShareBy, DocType) {
    var EmailDesign = '';
    var MailSub = _spPageContextInfo.userDisplayName + ' is requesting your acknowledgement on a document.';
    var DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    var SharedValidHTML = '';
    if (SharingValidity == null || SharingValidity == "null" || SharingValidity == '') {
        SharedValidHTML = '';
    }
    else {
        SharedValidHTML = "<div><strong>Valid till:</strong> " + SharingValidity + "</div><br/>";
    }
    EmailDesign = "Dear " + ToUserName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has shared the following document with you. Your acknowledgment is required on this document.<br/><br/>";
    EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#filenamee").text() + "</div>" +
                                "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#filetitle").text() + "</div>" +
                                "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + DocType + "</div>" +
                            "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#referNo").text() + "</div>" +
                             "<div><strong>Permission:</strong> " + PermissionType + "</div>" +
                             "<div><strong>Shared By:</strong> " + ShareBy + "</div>" +
                             "<div><strong>Shared On:</strong> " + SharedOn + "</div>" +
                             SharedValidHTML +
                             "<br/><br/><br/>" +
                            "<div><a href=" + DashboardLink + ">Click here</a> to open and acknowledge the document.</div>" + "<br/><br/>";
    EmailDesign += "This is an auto generated email. Please don't reply.";
    for(var k = 0; k < LabelDefaultLangauge.length; k++) {
    	if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
    		EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
    	}	
    }
    Metadata = {
        'properties': {
            '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
            'From': _spPageContextInfo.userEmail,
            'To': { 'results': [ToUserEmail] },
            'Body': EmailDesign,
            'Subject': MailSub
        }
    };

    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(Metadata),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            $("#SendAckParent" + Action.id).empty().append('<p class="SendMSg">Notification Sent.</p>');
        },
        error: function (err) {
            alert("SendEmailAckNotification  " + JSON.stringify(err));
        }
    });
}

//get shared History of File with 'Revoke' option
function GetSharedHistory(documentid, itemurl, title, documentno, fileName, type, Action, SharedItemId) {
    waitingDialog.show();
    setTimeout(function () {

        fileName = /[^/]*$/.exec(itemurl)[0];
        $("#FilePath").text(itemurl);
        selectedHistoryDoc = [];
        var option = "",
        uniqueValues = [],
        arrduplicateClient = [],
        arrduplcteRevokdClient = [],
        arrduplcteRevokdTime = [],
        arrDuplicateSharedTo = []; SharedTo = '';
        var IsModal = 'true';
        var Doc_Type = 'My_Doc';
        $(".select_all").prop("checked", false);          //For all Checkbox
        $("#revokebtn").hide();
        $(".context-menu").hide();
        $('#sharedHistoryList').html('');
        $('#myModalShareHistory').modal('show');//,SharedUsers/EMail
        $("#HeadingShareWith").text('Shared With');
        $("#HeadingShareBy").text('Shared By');
        if (Action == "Filter" && $("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
            if ($("#shreduser").val() == "All" && $("#sharedAs").val() != "All") {
                var PermissionQuery = '';
                if ($("#sharedAs").val() == "true") {
                    PermissionQuery = "NeedAcknowledgement eq '1'";
                }
                else {
                    PermissionQuery = "PermissionType eq '" + $("#sharedAs").val() + "' ";
                }
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and " + PermissionQuery + " &$orderby=Created asc";
            }
            else if ($("#shreduser").val() != "All" && $("#sharedAs").val() == "All") {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and (SharedUsers/EMail eq '" + $("#shreduser").val() + "' or SharedClient/Title eq '" + $("#shreduser").val() + "')&$orderby=Created asc";
            }
            else if ($("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
                var PermissionQuery = '';
                if ($("#sharedAs").val() == "true") {
                    PermissionQuery = "NeedAcknowledgement eq '1'";
                }
                else {
                    PermissionQuery = "PermissionType eq '" + $("#sharedAs").val() + "' ";
                }
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and (SharedUsers/EMail eq '" + $("#shreduser").val() + "' or SharedClient/Title eq '" + $("#shreduser").val() + "') and " + PermissionQuery + "&$orderby=Created asc";
            }
        }
        else if (Action == "SharedWithMe") {
            DocumentId = documentid;
            $("#HeadingShareWith").text('Shared By');
            $("#HeadingShareBy").text('Shared With');
            var checkQuery = '';
            var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
            $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Clients) {
                if (Clients.length > 0) {
                    for (var client = 0; client < Clients.length; client++) {
                        checkQuery += " or SharedClient/Title eq '" + Clients[client].Title + "' ";
                    }
                }
            });
            if (SharedItemId == '' || SharedItemId == null || SharedItemId == "null") {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=(DocumentID eq '" + documentid + "' and (SharedUsers/Id eq '" + _spPageContextInfo.userId + "' or SharedGroup eq 'Everyone' " + checkQuery + "))&$orderby=Created asc";
            }
            else {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=(Id eq '" + SharedItemId + "' and DocumentID eq '" + documentid + "' and (SharedUsers/Id eq '" + _spPageContextInfo.userId + "' or SharedGroup eq 'Everyone' " + checkQuery + "))&$orderby=Created asc";
            }
        }
        else if (Action == "SharedByMe") {
            DocumentId = documentid;
            var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentID eq '" + documentid + "' and Title eq '" + fileName + "'&$orderby=Created asc";
        }
        else {
            DocumentId = documentid;
            var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and Title eq '" + fileName + "'&$orderby=Created asc";
        }
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (itemsSharedHistory) {

            $("#filenamee").html(fileName);
            if (documentno == "null") {
                $("#referNo").html('');
            }
            else {
                $("#referNo").html(documentno);
            }
            //Cloning array
            currentSharedHistory = itemsSharedHistory.filter(function (f) { return f; });
            if (itemsSharedHistory.length > 0) {
                var sharedHistory = "";
                option += '<option value="All">All</option>';

                for (var index = 0; index < itemsSharedHistory.length; index++) {
                    var SiteURL = '';
                    var SharedBYAck = itemsSharedHistory[index].Author.Title;
                    if (itemsSharedHistory[index].SiteURL == "null" || itemsSharedHistory[index].SiteURL == null || itemsSharedHistory[index].SiteURL == "undefined" || itemsSharedHistory[index].SiteURL == undefined) {
                        if (encodeURI(itemsSharedHistory[index].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                            SiteURL = window.location.origin + encodeURI(itemsSharedHistory[index].DocumentURL).split('DepartmentalDMS')[0];
                        }
                        else {
                            SiteURL = _spPageContextInfo.webAbsoluteUrl;
                        }
                    }
                    else {
                        SiteURL = itemsSharedHistory[index].SiteURL;
                    }

                    var fileTitle = itemsSharedHistory[index].Title;
                    var PermissionType = DisplayPermissionType = itemsSharedHistory[index].PermissionType;
                    if (DisplayPermissionType == "Contribute") {
                        DisplayPermissionType = "Full Access";
                    }
                    else if (DisplayPermissionType == "Read") {
                        DisplayPermissionType = "Read Access";
                    }
                    else { //Restricted View
                        DisplayPermissionType = "Restricted Access";
                    }

                    var currentItemId = itemsSharedHistory[index].ID;
                    var PermissionStatus = itemsSharedHistory[index].PermissionStatus;
                    if (itemsSharedHistory[index].SharedFileTitle != null) {
                        $("#filetitle").html(itemsSharedHistory[index].SharedFileTitle);
                    }
                    else {
                        $("#filetitle").html('');
                    }
                    var userNamecurretn = "";
                    var userEmail = '';
                    var userId = "";
                    var NeedAck = itemsSharedHistory[index].NeedAcknowledgement;
                    if (NeedAck == true) {
                        NeedAck = "Required";
                    }
                    else {
                        NeedAck = "Not Required";
                    }
                    var SharingValidity = '';
                    if (itemsSharedHistory[index].SharingValidity != null) {
                        SharingValidity = moment(itemsSharedHistory[index].SharingValidity).format('MMM D YYYY');
                    }
                    for (var j = 0; j < itemsSharedHistory[index].SharedUsers.results.length; j++) {
                        if (uniqueValues.indexOf(itemsSharedHistory[index].SharedUsers.results[j].Title) == -1) {
                            uniqueValues.push(itemsSharedHistory[index].SharedUsers.results[j].Title);
                            if (itemsSharedHistory[index].SharedGroup != "Organization") {
                                option += "<option value='" + itemsSharedHistory[index].SharedUserEmail + "'title='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'>" + itemsSharedHistory[index].SharedUsers.results[j].Title + "</option>";
                            }
                            else {
                                if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrDuplicateSharedTo) == '-1') {
                                    option += "<option value='" + itemsSharedHistory[index].SharedClient.Title + "'title='" + itemsSharedHistory[index].SharedClient.Title + "'>" + itemsSharedHistory[index].SharedClient.Title + "</option>";
                                    arrDuplicateSharedTo.push(itemsSharedHistory[index].SharedClient.Title);
                                }
                            }
                        }
                        userNamecurretn = itemsSharedHistory[index].SharedUsers.results[j].Title
                        userEmail = itemsSharedHistory[index].SharedUserEmail;
                        userEmail = userEmail ? userEmail : "";
                        userId = itemsSharedHistory[index].SharedUsers.results[j].Id;
                    }

                    if (itemsSharedHistory[index].SharedGroup != "Organization") {
                        if (PermissionStatus == "Revoked") {
                            sharedHistory += "<tr><td></td>";
                            if (Action != "SharedWithMe") {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                                if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                    sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                                }
                                else {
                                    sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                }
                                sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + userEmail + "\");'>" + userEmail + "</a></div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }

                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + userNamecurretn + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            var RevokeRemarks = '';
                            if (itemsSharedHistory[index].share_remarks != null) {
                                RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                            }
                            sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                            sharedHistory += "</tr>";
                        }
                        else {
                            SharedTo = 'User';
                            var UserOrGroup = 'User';
                            sharedHistory += "<tr>";
                            if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                UserOrGroup = 'Everyone';
                                IsBtnHide = getApprovalStatus(itemsSharedHistory[index].LibraryName, itemsSharedHistory[index].SiteURL, itemsSharedHistory[index].DocumentID);
                            }
                            else {
                                IsBtnHide = false;
                            }
                            sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + ',' + userEmail + " title='" + userId + "''></td>";
                            if (Action != "SharedWithMe") {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                                if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                    sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                                }
                                else {
                                    sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                }
                                sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + userEmail + "\");'>" + userEmail + "</a></div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + userNamecurretn + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (IsBtnHide == false) {
                                if (NeedAck == "Required") {
                                    if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                        var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                        sharedHistory += "<td>" + AckValue + "</td>";
                                    }
                                    else {
                                        var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                        sharedHistory += "<td>" + AckValue + "</td>";
                                    }
                                }
                                else {
                                    sharedHistory += "<td>Not Required</td>";
                                }
                                if (Action != "SharedWithMe") {
                                    sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick="RevokePermission(' + documentid + ',\'' + encodeURI(itemurl) + '\',' + userId + ',' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + SiteURL + '\', \'' + userEmail + '\')">Revoke</a></td>';
                                }
                                else {
                                    sharedHistory += '<td></td>';
                                }
                            }
                            else {
                                sharedHistory += "<td></td>";
                                sharedHistory += '<td>Approval Pending</td>';
                            }

                            sharedHistory += "</tr>";
                        }
                    }
                    else { //to bind all the external users sharing in one table row [Organizations wise]
                        if (PermissionStatus == "Revoked") {
                            //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                            sharedHistory += "<tr><td></td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td><div class='flexingtwo'><div class='empoyeeimg clientnameshow'><span class='clienttext'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div></span>";
                                sharedHistory += "</div><div class='designationtype'><h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3><p>Guest Client</p></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "</div></div><td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            var RevokeRemarks = '';
                            if (itemsSharedHistory[index].share_remarks != null) {
                                RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                            }
                            sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                        }
                        else {
                            SharedTo = 'Organization';
                            var UserOrGroup = 'User';
                            if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                UserOrGroup = 'Everyone';
                            }
                            //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                            sharedHistory += "<tr>";
                            sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + " title='" + userId + "''></td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3>";
                                sharedHistory += "</div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            if (Action != "SharedWithMe") {
                                sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick=" RevokeGpPermission(' + userId + ', ' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + encodeURI(itemurl) + '\', \'' + SiteURL + '\');">Revoke</a></td>';
                            }
                            else {
                                sharedHistory += '<td></td>';
                            }
                            sharedHistory += "</tr>";
                        }
                    }
                }

                if (itemsSharedHistory.length == 0) {
                    $(".NoRecordFound").show();
                }
                else {
                    $(".NoRecordFound").hide();
                }
                if (ShareHostoryTable != '') {
                    ShareHostoryTable.destroy();
                }
                $("#sharedHistoryList").empty().append(sharedHistory);
                $("#TotalItemscount").text(itemsSharedHistory.length);
                if (itemsSharedHistory.length > 0) {
                    if (Action != "Filter") {
                        $("#shreduser").empty().append(option);
                    }
                    selectedHistoryDocEvent();
                    TablePaginationShareHistory()
                    //Check permissions
                    if (currentSectionType != 'My Documents' && currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe') {
                        getListUserEffectivePermissions(SiteURL, listTitle, true, parseInt(documentid), 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '');
                        if (IsNotpermission == true) {
                            if (IsContributor == false && IsFullControl == false) { //Reader
                                $(".fileFolderRevoke").hide();
                            }
                        }
                        else {
                            if (arrPermission.length > 0) {
                                $(".fileFolderRevoke").hide();
                            }
                        }
                    }
                }
            }
            else {
                $(".NoRecordFound").show();
                $("#TotalItemscount").text('0');
            }
            waitingDialog.hide();
        });
    }, 100);
}

//get the SP group-names in which logged-In user belongs to
function GetSPGroup() {
    var arrSPGroup = [];
    var endpointUrl = _spPageContextInfo.webServerRelativeUrl + '/_api/web/currentuser/?$expand=groups';
    $.ajax({
        url: endpointUrl,
        method: "GET",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var arrAllGp = [];
            arrAllGp = data.d.Groups.results;
            if (arrAllGp.length > 0) {
                arrSPGroup = arrAllGp.filter(function (obj) {
                    return obj.OwnerTitle !== "System Account" && obj.Title !== "Contributors" && obj.Title !== "Owners" && obj.Title !== "SPMember" && obj.Title !== "TFW_Employees";
                });
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    return arrSPGroup;
}

//get GroupId of 'Everyone' and 'All_Employee'
function getTargetGroupId() {
    var arrEveryOneId = [];
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('ALL_EMPLOYEE')?$select=id";
    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        async: false,
        success: function (data, status, xhr) {
            arrEveryOneId.push(data.d.Id);
        },
        error: function (data, status, error) {
            console.log(data.responseJSON.error);
        }
    });

    return arrEveryOneId;
}

//to check if Approval process is in 'Pending' or 'Approved' state
function getApprovalStatus(QueryLibraryName, SiteUrl, DocId) {
    var IsBtnHide = false;
    var RestQuery = "?$select=Id,ApprovalStatus&$filter=Id eq '" + DocId + "' and ApprovalStatus eq 'Approved'";
    //$.when(getDocItemsWithQueryItemById(QueryLibraryName, RestQuery, SiteUrl, DocId)).done(function (docsresults) {
    $.when(getItemsWithQuery(QueryLibraryName, RestQuery, SiteUrl)).done(function (docsresults) {
        if (docsresults.length == 0) {
            IsBtnHide = true;
        }
    });
    return IsBtnHide;
}

//method for pagination of Approvals
function TablePaginationShareHistory() {
    ShareHostoryTable = $('#sharedHistoryTable').DataTable({
        'columnDefs': [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false,
        "bProcessing": true,
        "iDisplayLength": 5,
        "dom": 'Rlfrtip',
        "colReorder": {
            'allowReorder': true
        },
        "language": {
            "searchPlaceholder": "Type to find....",
            "sSearch": ""
        }
    });
    $("#sharedHistoryTable_filter").hide();
    $('#customHistrySearch').keyup(function () {
        ShareHostoryTable.search($(this).val()).draw();
    });

}

function selectedHistoryDocEvent() {
    $('.historydocid').change(function () {
        selectedHistoryDoc = [];
        selectedHistoryDocrelativeurl = [];
        $('.historydocid').each(function () {
            if ($(this).prop("checked") == true) {
                selectedHistoryDoc.push($(this).val());
            }
        });
        if (selectedHistoryDoc.length == 0) {
            $("#revokebtn").hide();
        }
        else {
            $("#revokebtn").show();
        }
        if ($('.historydocid:checked').length == $('.historydocid').length) {
            $('.select_all').prop('checked', true);
        } else {
            $('.select_all').prop('checked', false);
        }
    });
}

//get Sharing Info for 'Shared With Me'
function getSingleShareInfo(DocId, SharedId) {
    var Query = "?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created desc&$filter=Id eq '" + SharedId + "' and DocumentID eq '" + DocId + "' and (PermissionStatus ne 'Revoked' or PermissionStatus ne 'Deleted')";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            currentSharedItemId = SharingInfo[0].Id;
            if (SharingInfo[0].NeedAcknowledgement == true) {
                getAcknowledgeStatus(SharingInfo[0].Id, DocId);
            }
            else {
                $("#ParentAck").hide();
            }
            $("#txtShareBy").text(SharingInfo[0].Author.Title);
            $("#txtShareOn").text(ShowCommonStandardDateFormat(SharingInfo[0].Created));
            $("#txtSharePermission").text(SharingInfo[0].PermissionType);
            $("#ShareTabSharing").text("Shared with " + SharingInfo[0].SharedUsers.results[0].Title);
        }
        else {
            $("#ParentAck").hide();
            $("#txtShareBy").text('');
            $("#txtShareOn").text('');
            $("#txtSharePermission").text('');
            $("#ShareTabSharing").text('');
        }
    });
}

//get Status of Document of Acknowledgement
function getAcknowledgeStatus(SharedDocId, LibraryDocId) {
    $("#ParentAck").show();
    var AckId = '';
    $("#ParentAck").empty().append('<div class="breakbox"><input type="checkbox" id="txtAcknoldge"><label class="detail-label" id="AckHeading">Acknowledgement</label></div><div class="breakbox"><label class="detail-label" id="AckText">By clicking this you agree that you understand and acknowledge this document.</label></div>');
    var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedDocId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
        if (DocumentAcknowledgement.length > 0) {
            AckId = DocumentAcknowledgement[0].Id;
            if (DocumentAcknowledgement[0].Acknowledge == true) {
                $("#AckHeading").text('Acknowledged');
                $("#AckHeading").css('color', 'green');
                $("#AckText").hide();
                $("#txtAcknoldge").prop('disabled', 'disabled');
                $("#txtAcknoldge").prop('checked', 'checked');
            }
            else {
                if (DocumentAcknowledgement[0].View != true) {
                    ViewAckDocument(SharedDocId, LibraryDocId);
                }
                $("#AckHeading").text('Acknowledge');
                $("#AckHeading").css('color', 'black');
                $("#AckText").show();
                $("#txtAcknoldge").prop('disabled', '');
                $("#txtAcknoldge").prop('checked', '');
                $("#txtAcknoldge").click(function () {
                    AcknowledgeDocument(AckId);
                });
            }
        }
        else {
            AckId = ViewAckDocument(SharedDocId, LibraryDocId);
            $("#AckHeading").text('Acknowledge');
            $("#AckHeading").css('color', 'black');
            $("#AckText").show();
            $("#txtAcknoldge").prop('disabled', '');
            $("#txtAcknoldge").prop('checked', '');
            $("#txtAcknoldge").click(function () {
                AcknowledgeDocument(AckId);
            });
        }
    });
}

//Acknowledge the file - Add mode
function AcknowledgeDocument(AckId) {
    if (confirm("Are you sure to acknowledge this document ?") == true) {
        var Metadata;
        if (CurrentIpAddress == undefined || CurrentIpAddress == null) {
            CurrentIpAddress = '';
        }
        $("#txtAcknoldge").prop('disabled', 'disabled');
        Metadata = {
            __metadata: { 'type': 'SP.Data.DocumentAcknowledgementListItem' },
            'Acknowledge': true,
            'IPAddress': CurrentIpAddress,
            'ActionByTimeZone': LoggedIn_TimeZone
        };
        var dfd = $.Deferred();
        var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('DocumentAcknowledgement')/Items(" + AckId + ")";
        $.ajax({
            url: URL,
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
            success: function (RESULT) {
                $("#AckHeading").text('Acknowledged');
                $("#AckHeading").css('color', 'green');
                $("#AckText").hide();
                $("#tabSharedToMe").trigger("click");
            },
            error: function (error) {
                alert(JSON.stringify(error));
                $("#txtAcknoldge").prop('disabled', '');
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }
}


//Acknowledge the file - view mode
function ViewAckDocument(SharedDocId, LibraryDocId) {
    var Metadata;
    var AckId = '';
    Metadata = {
        __metadata: { 'type': 'SP.Data.DocumentAcknowledgementListItem' },
        'ViewsById': _spPageContextInfo.userId,
        'Title': $("#FileName").text(),
        'DocumentID': parseInt(SharedDocId),
        'DocID': parseInt(LibraryDocId)
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentAcknowledgement')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            AckId = data.d.Id;
        },
        error: function (error) {
            alert(JSON.stringify(error));
            $("#txtAcknoldge").prop('disabled', '');
        }
    });
    return AckId;
}

//Bind Shared History while filtering data
function FilterShareHistory(documentid, itemurl, title, documentno, fileName, type, Action, SharedItemId) {
    selectedHistoryDoc = [];
    $("#FilePath").text(itemurl);
    var uniqueValues = [],
	arrduplicateClient = [],
	arrduplcteRevokdClient = [],
	arrduplcteRevokdTime = [],
	arrDuplicateSharedTo = []; SharedTo = '';
    var IsModal = 'true';
    var Doc_Type = 'My_Doc';
    $(".select_all").prop("checked", false);          //For all Checkbox
    $("#revokebtn").hide();
    $(".context-menu").hide();
    $('#sharedHistoryList').html('');
    //if ($(".headdingLinks").text() == 'Shared with Me') {
    if (currentSectionType== 'SharedWithMe') {
        Action = "SharedWithMe";
    }
    else {
        Action = "SharedByMe";
    }
    var itemsSharedHistory = [];
    if ($("#shreduser").val() != "All" || $("#sharedAs").val() != "All") {
        if ($("#shreduser").val() == "All" && $("#sharedAs").val() != "All") {
            var PermissionQuery = '';
            if ($("#sharedAs").val() == "true") {
                PermissionQuery = true;
            }
            else {
                PermissionQuery = $("#sharedAs").val();
            }
            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return obj.NeedAcknowledgement == PermissionQuery || obj.PermissionType == PermissionQuery;
            });
        }
        else if ($("#shreduser").val() != "All" && $("#sharedAs").val() == "All") {
            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return (obj.SharedClient.Title == $("#shreduser").val() || obj.SharedUserEmail == $("#shreduser").val());
            });
        }
        else if ($("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
            var PermissionQuery = '';
            if ($("#sharedAs").val() == "true") {
                PermissionQuery = true;
            }
            else {
                PermissionQuery = $("#sharedAs").val();
            }

            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return (obj.NeedAcknowledgement == PermissionQuery || obj.PermissionType == PermissionQuery) && (obj.SharedClient.Title == $("#shreduser").val() || obj.SharedUserEmail == $("#shreduser").val());
            });
        }
    }
    else {
        //Cloning array
        itemsSharedHistory = currentSharedHistory.filter(function (f) { return f; })
    }
    if (itemsSharedHistory.length > 0) {
        var sharedHistory = "";
        for (var index = 0; index < itemsSharedHistory.length; index++) {
            var SiteURL = '';
            if (itemsSharedHistory[index].SiteURL == "null" || itemsSharedHistory[index].SiteURL == null || itemsSharedHistory[index].SiteURL == "undefined" || itemsSharedHistory[index].SiteURL == undefined) {
                if (encodeURI(itemsSharedHistory[index].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                    SiteURL = window.location.origin + encodeURI(itemsSharedHistory[index].DocumentURL).split('DepartmentalDMS')[0];
                }
                else {
                    SiteURL = _spPageContextInfo.webAbsoluteUrl;
                }
            }
            else {
                SiteURL = itemsSharedHistory[index].SiteURL;
            }

            var fileTitle = itemsSharedHistory[index].Title;
            var PermissionType = DisplayPermissionType = itemsSharedHistory[index].PermissionType;
            if (DisplayPermissionType == "Contribute") {
                DisplayPermissionType = "Full Access";
            }
            else if (DisplayPermissionType == "Read") {
                DisplayPermissionType = "Read Access";
            }
            else { //Restricted View
                DisplayPermissionType = "Restricted Access";
            }

            var currentItemId = itemsSharedHistory[index].ID;
            var PermissionStatus = itemsSharedHistory[index].PermissionStatus;
            var userNamecurretn = "";
            var userEmail = '';
            var userId = "";
            var NeedAck = itemsSharedHistory[index].NeedAcknowledgement;
            if (NeedAck == true) {
                NeedAck = "Required";
            }
            else {
                NeedAck = "Not Required";
            }
            var SharingValidity = '';
            if (itemsSharedHistory[index].SharingValidity != null) {
                SharingValidity = moment(itemsSharedHistory[index].SharingValidity).format('MMM D YYYY');
            }
            for (var j = 0; j < itemsSharedHistory[index].SharedUsers.results.length; j++) {
                if (uniqueValues.indexOf(itemsSharedHistory[index].SharedUsers.results[j].Title) == -1) {
                    uniqueValues.push(itemsSharedHistory[index].SharedUsers.results[j].Title);
                    if (itemsSharedHistory[index].SharedGroup != "Organization") {
                        //option += "<option value='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'title='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'>" + itemsSharedHistory[index].SharedUsers.results[j].Title + "</option>";
                    }
                    else {
                        if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrDuplicateSharedTo) == '-1') {
                            //option += "<option value='" + itemsSharedHistory[index].SharedClient.Title + "'title='" + itemsSharedHistory[index].SharedClient.Title + "'>" + itemsSharedHistory[index].SharedClient.Title + "</option>";
                            arrDuplicateSharedTo.push(itemsSharedHistory[index].SharedClient.Title);
                        }
                    }
                }
                userNamecurretn = itemsSharedHistory[index].SharedUsers.results[j].Title
                userEmail = itemsSharedHistory[index].SharedUserEmail;
                userEmail = userEmail ? userEmail : "";
                userId = itemsSharedHistory[index].SharedUsers.results[j].Id;
            }
            var SharedBYAck = itemsSharedHistory[index].Author.Title;
            if (itemsSharedHistory[index].SharedGroup != "Organization") {
                if (PermissionStatus == "Revoked") {
                    sharedHistory += "<tr><td></td>";
                    if (Action != "SharedWithMe") {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                        if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                            sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                        }
                        else {
                            sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        }
                        sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + userEmail + "\");'>" + userEmail + "</a></div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }

                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + userNamecurretn + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    var RevokeRemarks = '';
                    if (itemsSharedHistory[index].share_remarks != null) {
                        RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                    }
                    sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                    sharedHistory += "</tr>";
                }
                else {
                    SharedTo = 'User';
                    var UserOrGroup = 'User';
                    sharedHistory += "<tr>";
                    if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                        UserOrGroup = 'Everyone';
                    }
                    sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + DocumentId + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + ',' + userEmail + " title='" + userId + "''></td>";
                    if (Action != "SharedWithMe") {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                        if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                            IsBtnHide = getApprovalStatus(itemsSharedHistory[index].LibraryName, itemsSharedHistory[index].SiteURL, itemsSharedHistory[index].DocumentID);
                            sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                        }
                        else {
                            IsBtnHide = false;
                            sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        }
                        sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + userEmail + "\");'>" + userEmail + "</a></div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + userNamecurretn + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (IsBtnHide == false) {
                        if (NeedAck == "Required") {
                            if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                sharedHistory += "<td>" + AckValue + "</td>";
                            }
                            else {
                                var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                sharedHistory += "<td>" + AckValue + "</td>";
                            }
                        }
                        else {
                            sharedHistory += "<td>Not Required</td>";
                        }
                        if (Action != "SharedWithMe") {
                            sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick="RevokePermission(' + DocumentId + ',\'' + encodeURI(itemurl) + '\',' + userId + ',' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + SiteURL + '\', \'' + userEmail + '\')">Revoke</a></td>';
                        }
                        else {
                            sharedHistory += '<td></td>';
                        }
                    }
                    else {
                        sharedHistory += '<td></td>';
                        sharedHistory += '<td>Approval Pending</td>';
                    }
                    sharedHistory += "</tr>";
                }
            }
            else { //to bind all the external users sharing in one table row [Organizations wise]
                if (PermissionStatus == "Revoked") {
                    //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                    sharedHistory += "<tr><td></td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td><div class='flexingtwo'><div class='empoyeeimg clientnameshow'><span class='clienttext'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div></span>";
                        sharedHistory += "</div><div class='designationtype'><h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3><p>Guest Client</p></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "</div></div><td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    var RevokeRemarks = '';
                    if (itemsSharedHistory[index].share_remarks != null) {
                        RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                    }
                    sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                }
                else {
                    SharedTo = 'Organization';
                    var UserOrGroup = 'User';
                    if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                        UserOrGroup = 'Everyone';
                    }
                    //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                    sharedHistory += "<tr>";

                    sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + DocumentId + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + " title='" + userId + "''></td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3>";
                        sharedHistory += "</div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + ShowCommonStandardDateFormat(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, ShowCommonStandardDateFormat(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    if (Action != "SharedWithMe") {
                        sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick=" RevokeGpPermission(' + userId + ', ' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + encodeURI(itemurl) + '\', \'' + SiteURL + '\');">Revoke</a></td>';
                    }
                    else {
                        sharedHistory += '<td></td>';
                    }
                    sharedHistory += "</tr>";
                }
            }
        }

        if (itemsSharedHistory.length == 0) {
            $(".NoRecordFound").show();
        }
        else {
            $(".NoRecordFound").hide();
        }
        if (ShareHostoryTable != '') {
            ShareHostoryTable.destroy();
        }
        $("#sharedHistoryList").empty().append(sharedHistory);
        $("#TotalItemscount").text(itemsSharedHistory.length);
        if (itemsSharedHistory.length > 0) {
            selectedHistoryDocEvent();
            TablePaginationShareHistory();

            //Check permissions
            if (currentSectionType != 'My Documents' && currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe') {
                getListUserEffectivePermissions(SiteURL, listTitle, true, parseInt(documentid), 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '');
                if (IsNotpermission == true) {
                    if (IsContributor == false && IsFullControl == false) { //Reader
                        $(".fileFolderRevoke").hide();
                    }
                }
                else {
                    if (arrPermission.length > 0) {
                        $(".fileFolderRevoke").hide();
                    }
                }
            }
        }
    }
    else {
        $(".NoRecordFound").show();
        $("#TotalItemscount").text('0');
    }
}

//get Ack Value for Sharing History
function getAcknowledgeValue(Section, SharedGroup, SharedUserName, SharedUserId, SharedItemId, SharingValidity, SharedOn, PermissionType, SharedUserEmail, SharedUserName, PermissionStatus, ShareBy, DocType) {
    var AckValue = '';
    var AckCounter = 0;
    $("#btnAckNotifyAll").show();
    if (Section == "SharedWithMe") {
        var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "' and Acknowledge eq '1'";
        $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
            if (DocumentAcknowledgement.length > 0) {
                AckValue = '<a href="javascript:void(0);" class="AckDoc" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" style="color:green;">Acknowledged</a>';
            }
            else {
                if (PermissionStatus == "Revoked") {
                    $("#btnAckNotifyAll").hide();
                    AckValue = '<div class="AckDoc" style="color:black;">Pending</div>';
                }
                else {
                    AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">Pending</a>';
                }
            }
        });
    }
    else {
        if (SharedGroup == "My-Groups" || SharedGroup == "Selective") {
            var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/Id eq '" + SharedUserId + "' and Acknowledge eq '1'";
            $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                if (DocumentAcknowledgement.length > 0) {
                    AckValue = '<a href="javascript:void(0);" class="AckDoc" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" style="color:green;">Acknowledged</a>';
                }
                else {
                    if (PermissionStatus == "Revoked") {
                        $("#btnAckNotifyAll").hide();
                        AckValue = '<div class="AckDoc" style="color:black;">Pending</div>';
                    }
                    else {
                        AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">Pending</a>';
                    }
                }
            });
        }
        else { //"Everyone", "Organization"
            var GpUserDetails = [];
            if (SharedGroup == "Organization") {
                GpUserDetails = GetUserFromSPGp(SharedUserId);
            }
            else { //Everyone
                GpUserDetails = GetUserFromEmp(SharedUserId);
            }
            for (var gp = 0; gp < GpUserDetails.length; gp++) {
                var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + GpUserDetails[gp].Email + "' and Acknowledge eq '1'";
                $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                    if (DocumentAcknowledgement.length > 0) {
                        AckCounter++;
                    }
                });
            }
            if (PermissionStatus == "Revoked") {
                $("#btnAckNotifyAll").hide();
                AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">' + AckCounter + '</a>';
            }
            else {
                AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">' + AckCounter + '</a>';
            }
        }
    }
    return AckValue;
}

//Get all the Documents which are shared with me --Filter
function GetDocumentsSharedFilter(SectionName) {
    //Geenrating the THead of table
    arrFileFolder = [];
    var LoggedUserSPGp = [];
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2 nosort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
    if (SectionName == 'SharedByMe') {
        var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItem").empty().append(ColumnName);
    LoggedUserSPGp = GetSPGroup();

    var assigntoQuery = '';
    if (SectionName == 'SharedByMe') {
        items = arrSharedBy.filter(function (f) { return f; });
    }
    else {
        items = arrSharedTo.filter(function (f) { return f; });
    }
    var FilterShareById = getUserInformation("pplSharedBy");
    var StringShareQuery = [];
    var DropdownSharingValue = $("#ddlShare").val();
    if ($("#ddlShare").val() == "Shared") {
        DropdownSharingValue = null;
    }
    var NeedAck = '';
    if ($("#ddlAckFilter").val() == "Required" || $("#ddlAckFilter").val() == "Acknowledged" || $("#ddlAckFilter").val() == "Pending") {
        NeedAck = true;
    }
    else if ($("#ddlAckFilter").val() == "All") {
        NeedAck = "All";
    }
    else {
        NeedAck = false;
    }
    if (SectionName == 'SharedByMe') {
        items = items.filter(function (obj, index) {
            if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
                for (var i = 0; i < FilterShareById.length; i++) {
                    if (i == 0) {
                        StringShareQuery.push(obj.SharedUsers.results[0].ID == FilterShareById[i]);
                    }
                    else {
                        StringShareQuery.push(obj.SharedUsers.results[0].ID == FilterShareById[i]);
                    }
                }
            }
            else {
                var assigntobyme = [];
                StringShareQuery.push(true);
            }

            StringShareQuery.forEach(function (entry, index) {
                if (index == 0) {
                    assigntoQuery = entry;
                }
                else {
                    assigntoQuery = entry || assigntoQuery;
                }
            });

            if (obj.DocumentNo == null || obj.DocumentNo == '') {
                obj.DocumentNo = "null";
            }
            var tempAck = obj.NeedAcknowledgement;
            if ($("#ddlAckFilter").val() == "All") {
                tempAck = true;
            }
            StringShareQuery = [];
           // return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
            		&& (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
            		&& (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck);
            //Bhawana
            return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
            		&& (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
            		&& (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck)&&($("#filterSharedFrom").val() == ""?obj.SharedFrom!=null:$("#filterSharedFrom").val().trim()==obj.SharedFrom);

        });
    }
    else {
        items = items.filter(function (obj, index) {
            if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
                for (var i = 0; i < FilterShareById.length; i++) {
                    if (i == 0) {
                        StringShareQuery.push(obj.Author.ID == FilterShareById[i]);
                    }
                    else {
                        StringShareQuery.push(obj.Author.ID == FilterShareById[i]);
                    }
                }
            }
            else {
                var assigntobyme = [];
                StringShareQuery.push(true);
            }

            StringShareQuery.forEach(function (entry, index) {
                if (index == 0) {
                    assigntoQuery = entry;
                }
                else {
                    assigntoQuery = entry || assigntoQuery;
                }
            });
            StringShareQuery = [];
            if (obj.DocumentNo == null || obj.DocumentNo == '') {
                obj.DocumentNo = "null";
            }
            var tempAck = obj.NeedAcknowledgement;
            if ($("#ddlAckFilter").val() == "All") {
                tempAck = true;
            }
            //return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
                    && (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
                    && (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck);
            //Bhawana
            return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
            		&& (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
            		&& (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck)&&($("#filterSharedFrom").val() == ""?obj.SharedFrom!=null:$("#filterSharedFrom").val().trim()==obj.SharedFrom);
        });
    }
    var sharedWithMeTR = "";
    if (items.length > 0) {
        if (SectionName == 'SharedByMe') {
            SharedByMeItems(items);
        }
        else {
            SharedWithMeItems(items, 'SharedWithMe');
        }

        waitingDialog.hide();
    }
    else {
        waitingDialog.hide();
        sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
        $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    }
    $("#shared-documents-filter").modal('hide');
}

//To archive multiple files and folders
function AddToArchive() {
    var arrTempFolder = [];
    arrTempFolder = arrFileFolder.filter(function (obj) {
        return obj.SharedTo == "Everyone";// || obj.SharedTo == "Organization";
    });
    if (arrTempFolder.length > 0) {
        arrFileFolder = arrFileFolder.filter(function (obj) {
            return obj.SharedTo != "Everyone";// && obj.SharedTo != "Organization";
        });
    }
    if (arrFileFolder.length == 0) {
        alert("File(s)/Folder(s) shared to Everyone can't be archived.");
        //waitingDialog.hide();
        return false
    }
    arrFileFolder.forEach(function (entry, index) {
        var ListName = "SharedDocument";
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: { 'type': ItemType },
            'IsArchive': true
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + entry.SharedItemId + "')",
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
                arrSharedTo = arrSharedTo.filter(function (data) {
                    return data.Id != entry.SharedItemId;
                });
                if (arrFileFolder.length == (index + 1)) {
                    //SharedWithMeItems(arrSharedTo, 'SharedWithMe');
                    if ($('#FilterShareDocType option').length == 0) {
                        BindDMSDocumentType();
                    }
                    if ($("#pplSharedBy").html() == '') {
                        initializePeoplePicker("pplSharedBy", true);
                    }
                    $("#btnShareFilter").trigger('click');
                    //waitingDialog.hide();
                    arrFileFolder = [];
                    if (arrTempFolder.length == 0) {
                        alert("File(s)/Folder(s) have been archived.");
                    }
                    else {
                        arrTempFolder = [];
                        alert("File(s)/Folder(s) shared to Everyone can't be archived. Rest of the File(s)/Folder(s) have been archived.");
                    }
                    $(".chkShareToMe").prop("checked", "");
                    $(".chkShareToMe").click(function () {
                        var Properties = this.value.split(',');
                        if (this.checked == true) {
                            arrFileFolder.push({
                                SharedItemId: Properties[0].trim(),
                                type: Properties[1].trim(),
                                SharedTo: Properties[2].trim(),
                                DocumentId: Properties[3].trim(),
                                ServerURL: Properties[4].trim(),
                                userOrgId: Properties[5].trim(),
                                SiteURL: Properties[6].trim(),
                                IsBlock: Properties[7].trim(),
                                FileFolderName:Properties[4].split('/')[Properties[4].split('/').length-1].trim(),
                                SelectedLibrary:Properties[Properties.length-1].trim()
                            });
                        }
                        else {
                            var selected = this.value;
                            arrFileFolder = arrFileFolder.filter(function (obj) {
                                return obj.SharedItemId != Properties[0].trim();
                            });
                        }
                    });
                    $("#selectAllChk").click(function (e) {
                        if (this.checked == true) {
                            $('.chkShareToMe').prop("checked", "");
                            $('.chkShareToMe').trigger('click');
                        }
                        else {
                            $('.chkShareToMe').prop("checked", "");
                            arrFileFolder = [];
                        }
                        //waitingDialog.hide();
                    });
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                dfd.reject(error);
            }
        });
        return dfd.promise();
    });
}

//To remove archive multiple files and folders
function RemoveArchive() {
    arrFileFolder.forEach(function (entry, index) {
        var ListName = "SharedDocument";
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: { 'type': ItemType },
            'IsArchive': false
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + entry.SharedItemId + "')",
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
                /*arrSharedTo.forEach(function (value, i) {   
	                if (value.Id == entry.SharedItemId) {
	                    value.IsArchive = null;
	    			}
	            }); */
                arrSharedTo = arrSharedTo.filter(function (data) {
                    return data.Id != entry.SharedItemId;
                });
                if (arrFileFolder.length == (index + 1)) {
                    if ($('#FilterShareDocType option').length == 0) {
                        BindDMSDocumentType();
                    }
                    if ($("#pplSharedBy").html() == '') {
                        initializePeoplePicker("pplSharedBy", true);
                    }
                    $("#btnShareFilter").trigger('click');
                    alert("File(s)/Folder(s) have been restored.");
                    arrFileFolder = [];
                    $(".chkFileFolder").prop("checked", "");
                    //waitingDialog.hide();
                    $(".chkShareToMe").click(function () {
                        var Properties = this.value.split(',');
                        if (this.checked == true) {
                            arrFileFolder.push({
                                SharedItemId: Properties[0].trim(),
                                type: Properties[1].trim(),
                                SharedTo: Properties[2].trim(),
                                DocumentId: Properties[3].trim(),
                                ServerURL: Properties[4].trim(),
                                userOrgId: Properties[5].trim(),
                                SiteURL: Properties[6].trim(),
                                IsBlock: Properties[7].trim(),
                                FileFolderName:Properties[4].split('/')[Properties[4].split('/').length-1].trim(),
                                SelectedLibrary:Properties[Properties.length-1].trim()
                            });
                        }
                        else {
                            var selected = this.value;
                            arrFileFolder = arrFileFolder.filter(function (obj) {
                                return obj.SharedItemId != Properties[0].trim();
                            });
                        }
                    });
                    $("#selectAllChk").click(function (e) {
                        if (this.checked == true) {
                            $('.chkShareToMe').prop("checked", "");
                            $('.chkShareToMe').trigger('click');
                        }
                        else {
                            $('.chkShareToMe').prop("checked", "");
                            arrFileFolder = [];
                        }
                        //waitingDialog.hide();
                    });
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                dfd.reject(error);
            }
        });
        return dfd.promise();
    });
}

//open confirmation popup for revoking - users
function RevokePermission(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail) {
    if (UserOrGroup == "Everyone") {
        //if (CheckForEveryone() == false) //on 14 March 23 as dept of guest user was not defined
       // {
            alert("You are not authorized to revoke file/folder permission.");
            return false;
        //}
    }
    $("#txtRevokeMsg").val('');
    $("#RevokePermission").modal('show');
    $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
    $("#btnOpenRevoke").click(function () {
        if (confirm("Are you sure, you want to revoke permission?")) {
            revokeFile(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail);
        }
    });
}

//to revoke permission for USers
function revokeFile(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail) {
    CopySourceURL = SiteURL;
    if (itemurl.includes('/Documents') == true && itemurl.includes('/Shared%20Documents') == false) {
        itemurl = itemurl.replace('/Documents', '/Shared%20Documents');
    }
    if (SiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    else {
        var endPointUrl = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": RequestDigest
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json', success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            DeleateUserPermission(userId, itemurl, undefineditemID, currentItemId, "Selective", 0, 0, IsModalOpen, FileFolder, UserOrGroup, UserEmail);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            DeleateUserPermission(userId, itemurl, undefineditemID, currentItemId, "Selective", 0, 0, IsModalOpen, FileFolder, UserOrGroup, UserEmail);
            console.log(JSON.stringify(error));
        }
    });
}


//Delete permissions of Files
function DeleateUserPermission(userPrincipleId, itemurl, undefineditemID, currentItemId, userType, currentItem, TotalLength, IsModalOpen, FileFolder, UserOrGroup, UserEmail) {
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var headers = {
        'X-RequestDigest': RequestDigest,
        'X-HTTP-Method': 'DELETE'
    }
    if (UserEmail != null && UserEmail != "null" && UserEmail != "") {
        userPrincipleId = GetUserId(UserEmail, CopySourceURL);
    }
    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + userPrincipleId + ")";
    }
    else {
        var endPointUrl = CopySourceURL + "/_api/web/GetFolderByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + userPrincipleId + ")";
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (UserOrGroup == "Everyone") {
                var LibraryName='';//Bhawana
                if (Documentname.includes('/') == true) {
                    LibraryName = Documentname.split('/')[0];
                }
                else {
                    LibraryName = Documentname;
                }
                var Metadata;
                var ItemType;
                if (LibraryName.includes('/Documents') == true) {
                     ItemType = GetItemTypeForLibraryName('/Shared_x0020_Documents');
                }
                else {
                    ItemType = GetItemTypeForLibraryName(LibraryName);
                }
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    AccessLevel: "Revoked"
                }
                updateItemWithIDItemListDocuments(LibraryName, Metadata, undefineditemID, CopySourceURL);
            }
            var ListName = "SharedDocument";
            var Metadata;
            var ItemType = GetItemTypeForListName(ListName);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                PermissionStatus: "Revoked",
                share_remarks: $("#txtRevokeMsg").val(),
                SharedEnd: new Date().toISOString()
            }
            $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
               // SendRevokeEmail(UserOrGroup, currentItemId);
                $("#RevokePermission").modal('hide');
                if (IsModalOpen != 'false') {
                    alert("permission deleted sucessfully.");
                }
                $('#myModalShareHistory').modal('hide');
            });
            console.log(userPrincipleId + ' Successfully removed Permission !');
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Attempted to perform an unauthorized operation") == true) {
                //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");//14 March 23
                NoRevokePermissionFile(IsModalOpen, currentItemId);
            }
            else {
                alert(error.responseText);
            }
        }
    });
}
//if user has no revoke permission then it will trigger flow
function NoRevokePermissionFile(IsModalOpen, currentItemId){
	var ListName = "SharedDocument";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        share_remarks: $("#txtRevokeMsg").val(),
        SharedEnd: new Date().toISOString(),
        PermissionStatus: "RevokePending",
        IsSendMail: true   
    }
	$.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
		$("#RevokePermission").modal('hide');
        if (IsModalOpen != 'false') 
        {
            alert("permission deleted sucessfully.");
        }
        $('#myModalShareHistory').modal('hide');
	});
}


//update data when revoking permission
function updateItemWithIDItemListDocuments(ListName, Metadata, undefineditemID, webUrl, asyncCall) {
    if (ListName == "Shared%20Documents") {
        ListName = "Documents";
    }
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var dfd = $.Deferred();
    var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + undefineditemID + ")";
    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (RESULT) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            console.log(undefineditemID + ': Item is set permission');
            dfd.resolve(true);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1) {
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
            }
            else {
                var tempError = '';
                if (error.responseJSON.error.message.value == undefined) {
                    tempError = JSON.stringify(error);
                }
                else {
                    tempError = error.responseJSON.error.message.value;
                }
                alert(tempError);
            }
            dfd.reject(error);
            waitingDialog.hide();
        }
    });
    return dfd.promise();
}

//Send Email to revoke permission
function SendRevokeEmail(RevokedTo, ItemId) {
    var Query = "?$select=*,ID,SharedGroup,SharedUsers/Title&$expand=SharedUsers&$filter=Id eq '" + ItemId + "' ";
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        var ToUserName = '';
        var ToUserArray = [];
        var EmailDesign = '';
        if (items[0].SharedGroup == "Selective") {
            ToUserArray.push(items[0].SharedUserEmail);
            ToUserName = items[0].SharedUsers.results[0].Title;
            EmailDesign += "Dear " + ToUserName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        else if (items[0].SharedGroup == "Organization") {
            ToUserArray.push(items[0].SharedUsers.results[0].Title);
            ToUserName = items[0].SharedUsers.results[0].Title;
            EmailDesign += "Dear All,<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        if (RevokedTo == "Everyone") {
            EmailDesign += "Dear All,<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        EmailDesign = EmailDesign + "<div><strong>File Name: </strong>" + $("#filenamee").text() + "</div>" +
	                                "<div><strong>Title:</strong> " + $("#filetitle").text() + "</div>" +
	                            "<div><strong>Reference:</strong> " + $("#referNo").text() + "</div>" +
	                                "</br><div><strong>Message:</strong> " + $("#txtRevokeMsg").val() + "</div></br></br></br>";

        EmailDesign += "This is an auto generated email. Please don't reply.";
        var Metadata;
        if (RevokedTo == "Everyone") {
            ToUserArray = getCompanyEmailId();
        }
        Metadata = {
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': _spPageContextInfo.userEmail,
                'To': { 'results': ToUserArray },
                //'CC': { 'results': ccUsers },
                'Body': EmailDesign,
                'Subject': 'A document has been shared with you.'
            }
        };

        var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({
            contentType: 'application/json',
            url: sitetemplateurl,
            type: "POST",
            async: false,
            data: JSON.stringify(Metadata),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                //Do Nothing
            },
            error: function (err) {
                waitingDialog.hide();
                alert("Send mail Revoke  " + JSON.stringify(err));
            }
        });
    });

}

//Multiple revoke for My documents
function RevokeOnCheckBox() {
    if (selectedHistoryDoc.length > 0) {
        $("#txtRevokeMsg").val('');
        $("#RevokePermission").modal('show');
        $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
        $("#btnOpenRevoke").click(function () {
            if (confirm("Are you sure, you want to revoke permission?")) {
                var filesHistory = 1;
                for (var index = 0; index < selectedHistoryDoc.length; index++) {
                    var value = selectedHistoryDoc[index];
                    var arraycureent = [];
                    arraycureent = value.split(",");
                    if (arraycureent[6] == "User") {
                        /*if (arraycureent[7] == "Everyone")//On 14 March as every one sharing is not in guest portal scope
                         {
                            if (CheckForEveryone() == false) {
                                alert("You are not authorized to revoke " + arraycureent[1].split("/").pop() + " permission.");
                            }
                            else {
                                revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[8], arraycureent[9]);
                            }
                        }
                        else*/
                         {
                            revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[8], arraycureent[9]);
                        }
                    }
                    else {
                        revokeGpFile(arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[1], arraycureent[8]);
                    }
                }
                $("#myModalShareHistory").modal("hide");
                return false;
            }
        });
    }
    else {
        alert("Please select one or more history for revoke.");
        return false;
    }
}

//If Scope eq 'HOD'
//And (Logged_In user ne HOD: - Then don't show Everyone share and Revoke for EveryoneSharing)
//And (Logged_In user eq HOD: - Then show Everyone share and Revoke for EveryoneSharing);
function CheckForEveryone() {
    var IsEveryoneShareRev = true;
    var Query = "?$select=ID,ApproverRequired,Approver/Title,Approver/EMail,Approver/Id,WebPartName,Department/Id&$top=5000&$expand=Department,Approver&$filter=WebPartName eq 'Documents' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "' and Scope eq 'HOD'";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            if (valuesArray[0].ApproverRequired == true) {
                var Query = "?$select=*,ID,WebPartName,Department/Id,Contributors/EMail&$top=5000&$expand=Contributors,Department&$filter=Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'Head of the department' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
                $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                    if (valuesArray.length > 0) {
                        IsEveryoneShareRev = true;
                    }
                    else {
                        IsEveryoneShareRev = false;
                    }
                });
            }
        }

    });
    return IsEveryoneShareRev;
}

//Revoke Permission of clients
function RevokeGpPermission(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL) {
    $("#RevokePermission").modal('show');
    $("#txtRevokeMsg").val('');
    $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
    $("#btnOpenRevoke").click(function () {
        if (confirm("Are you sure, you want to revoke permission?")) {
            revokeGpFile(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL);
        }
    });
}

//to revoke permission for Group
function revokeGpFile(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL) {
    if (serverURL.includes('Documents') == true && serverURL.includes('Shared%20Documents') == false) {
        serverURL.replace('Documents', 'Shared%20Documents');
    }
    if (SiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }

    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + serverURL + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + GroupId + ")";
    }
    else {
        var endPointUrl = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + serverURL + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + GroupId + ")";
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        async: false,
        headers: {
            "X-RequestDigest": RequestDigest,
            "Accept": "application/json;odata=verbose",
            "content-Type": "application/json;odata=verbose",
            'X-HTTP-Method': 'DELETE'
        },
        async: false,
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (UserOrGroup == "Everyone") {
                if (Documentname.includes('/') == true) {
                    var LibraryName = Documentname.split('/')[0];
                }
                else {
                    var LibraryName = Documentname;
                }
                var Metadata;
                if (ListName.includes('Documents') == true) {
                    var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
                }
                else {
                    var ItemType = GetItemTypeForLibraryName(ListName);
                }
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    AccessLevel: "Revoked"
                }
                updateItemWithIDItemListDocuments(LibraryName, Metadata, currentItemId, SiteURL);
            }

            var ItemType = GetItemTypeForListName('SharedDocument');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                PermissionStatus: "Revoked",
                share_remarks: $("#txtRevokeMsg").val(),
                SharedEnd: new Date().toISOString(),
                IsSendMail:true////3 march
            }
            $.when(updateItemWithIDItemListDocuments('SharedDocument', Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl, false)).done(function (Result) {
                //SendRevokeEmail(UserOrGroup, currentItemId);//on 3 March 23
                $("#RevokePermission").modal('hide');
                if (IsModalOpen != 'false') {
                    alert("Permission has been revoked.");
                    $('#myModalShareHistory').modal('hide');
                }
                return false;
            });
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Attempted to perform an unauthorized operation") == true) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            else {
                alert(error.responseJSON.error.message.value);
            }
            return false;
        }
    });
}

function GetUserId(userName, SiteUrl) {
    var userID = "";
    var prefix = "i:0#.f|membership|";
    var siteUrl = SiteUrl;
    var accountName = prefix + userName;
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            userID = data.d.Id;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function (data) {
            console.log(JSON.stringify(data));
            console.log(JSON.stringify("This user:-" + userName));

        }
    });
    return userID;
}

//get sub-folder/files for Shared Documents/folder
function GetSubShareFolders(subFolderlLink, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var encodedeUrl = decodeURI(subFolderlLink)
    var surFoldersArray = new Array();
    var subFolders = encodedeUrl.split('/');
    var folderurls = "";
    for (var subFolderIndex = 0; subFolderIndex < subFolders.length; subFolderIndex++) {
        if (subFolders[subFolderIndex] == "Documents") {
            subFolders[subFolderIndex] = "Shared%20Documents";
        }
        if (subFolders[subFolderIndex] == CheckLibary || surFoldersArray.length > 0) {
            folderurls += subFolders[subFolderIndex] + "/";
            if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                surFoldersArray.push(SubFolderProperties(folderurls, subFolders[subFolderIndex]));
            }
        }
    }
    ShareFolderNavig(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation);
}

//code for Folder-Navigation for Shared Documents/folder
function ShareFolderNavig(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    if (DMS_Type == "My Documents") {
        for (var index = 0; index < surFoldersArray.length; index++) {
            if (index != 0) {
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
                var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                if (index == 1) {
                    braCummHtml += '<li title="Root" class="mybradcumb first"><a href="javascript:void(0);" onclick="shareTootFolder();">Root</a></li>';
                } else {
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
                }
            }
        }
    } else {
        for (var index = 0; index < surFoldersArray.length; index++) {
            //if (index != 0)
            {
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
                var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                if (index == 0) {
                    braCummHtml += '<li title="Root" class="mybradcumb first"><a href="javascript:void(0);" onclick="shareTootFolder();">Root</a></li>';
                } else {
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
                }
            }
        }
    }

    var bradCumDiv = $("#generateBradCumbNew");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    $(".mybradcumb ").unbind().click(function () {
        $(this).nextAll().remove(".mybradcumb ");
        //Create Cookies for Target Folder
    });
}

function shareTootFolder() {
    //if ($(".headdingLinks").text() == 'Shared with Me') {
    if (currentSectionType== 'SharedWithMe') {
        $("#tabSharedToMe").trigger("click");
    }
    else {
        $("#tabSharedByMe").trigger("click");
    }
}

//Revoke permission Multiple select
function RevokeMultiPermission() {
    if (confirm("It will revoke all the permissions applied to file. Are you sure, you want to revoke?")) {
        var revokeSuccess=true;
        arrFileFolder.forEach(function (entry, index) {
            //get All the files with Document Id
            var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail&$orderby=Modified desc&$expand=SharedUsers,Author&$filter=(DocumentID eq '" + entry.DocumentId + "' and PermissionStatus ne 'Revoked') ";
            $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
                for (var i = 0; i < items.length; i++) {
                    $("#FilePath").text(items[i].DocumentURL);
                    CopySourceURL = items[i].SiteURL;
                    if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                        if (items[i].DocumentURL.indexOf("DepartmentalDMS") != -1) {
                            items[i].SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                        }
                        else {
                            items[i].SiteURL = _spPageContextInfo.webAbsoluteUrl;
                        }
                    }
                    if (items[i].SharedGroup == "Organization") {
                        RevokeGpPermission(items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].DocumentURL, items[i].SiteURL);
                    }
                    else {
                        revokeSuccess=RevokePermission(items[i].DocumentID, items[i].DocumentURL, items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].SiteURL, items[i].SharedUserEmail);
                    }
                }
            });
            if (arrFileFolder.length == (index + 1)) {
                $("#btnRefreshSharedTbl").trigger("click");
                if(revokeSuccess==true||revokeSuccess=='true')
                alert("All permissions are revoked.");
                $(".chkShareToMe").prop('checked', '');
                arrFileFolder = [];
                waitingDialog.hide();
            }
        });
    }
}

//-----------------------------------------Sharing Code starts----------------------------------------------------
//validation while sharing any file
function ShareFileValidation() {
    if (SharingUserEmail.length == 0) {
        if ($("#sharewith").val() != "Everyone") {
            alert("Kindly select any users first.");
            return;
        }
        else {
            if ($("#expiredon").prop("checked") && $("#expiredats").val() == "") {
                alert("Kindly enter expiry date.");
                return;
            }
            else {
                return true;
            }
        }
    }
    else if ($("#expiredon").prop("checked") && $("#expiredats").val() == "") {
        alert("Kindly enter expiry date.");
        return;
    }
    else if (new Date() > new Date($("#expiredats").val())) {
        alert("Expiry date should me greater than today.");
        return false;
    }
    else {
        return true;
    }
}

//Method for sharing multiple file and Folder
function shareFileMulti() {
    var arrRevokeIds = [];
    var SharingRespose = true;
    var IsContinueEvery1Share = true;
    var sharefileuser = [];
    sharedUsersIdArrayListItemCollection = [];
    sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    var txtDocshareingTypePermissionLevel = $('#sharewith').val();
    var txttsharedWithPermission = $('#sharedWithPermission').val();
    var txtSharedDocumetnOnDemandId = '';
    var serverRelativeFileUrl = '';
    if (sharedUsersIdArrayListItemCollection.length == 0) {
        for (var groupId = 0; groupId < SharingUserEmail.length; groupId++) {
            SharingUserId.push(parseInt(SharingUserEmail[groupId].GroupId));
        }
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    }
    FailDueToCheckOut = 0;
    if (Documentname[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = Documentname + '/';
    }
    $("#LibProject").text(currentClientName);
    arrFileFolder.forEach(function (entry, index) {
        if (entry.type.toLowerCase() == 'file' || entry.type.toLowerCase() == "folder") {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true && entry.type == 'file') {
                SharingRespose = true;
                txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                CopySourceURL = entry.SiteURL;
                CopyLibrary = entry.SelectedLibrary;
                $("#FilePath").text(entry.ServerURL);
                $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                $("#FileName").text(entry.FileFolderName);
                //If PDF
                var tempAction = entry.ServerURL;
                if (entry.FileFolderName.includes(".pdf") == true) {//to check if it's PDF
                    if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                    }
                    $(".txtCopyLink").val(DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + entry.ServerURL.substr(0, tempAction.lastIndexOf("/")) + "&p=true");
                }
                else {
                    //If any other file than PDF
                    if (entry.ServerURL.includes("DocumentManagementSystem") == true || entry.ServerURL.includes("DepartmentalDMS") == true) {
                        if (entry.ServerURL.includes("DocumentManagementSystem") == true) {
                            $(".txtCopyLink").val(entry.SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        } else {
                            $(".txtCopyLink").val(entry.SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        }
                    }
                    else {
                        var HostName = window.location.origin + entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0);
                        if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                            tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                        }
                        $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + encodeURIComponent(tempAction.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                    }
                }
                serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                //return false;
                arrRevokeIds = $.grep(sharefileuser, function (element) {
                    return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                });

                sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                if (SharingRespose != false) {
                    SharingRespose = true;
                }
                if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                    var securityLeveltext = $('#sharewith').val();//Update Document Properties
                    if (PermissionStatus == "") {
                        updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                    }

                    GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                    var Shared = [];
                    Shared = getSharedType();
                    AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1]);
                    //mail send
                    /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                    {
                        var ToUserArray = [];
                        var Permission = $("#sharedWithPermission :selected").text();
                        if (SharingUserEmail.length > 0) {
                            var EmailDesign = '';
                            ValidityDateHTML = '';
                            if ($("#expiredats").val() != "") {
                                ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMM DD YYYY') + "</div>";
                            }
                            EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                            //for (i = 0; i < SharingUserEmail.length; i++) {
                            EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                     "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                     "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                     "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMM DD YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                     ValidityDateHTML +
                                                     "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                    "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                            //}

                            EmailDesign += "This is an auto generated email. Please don't reply.";
							for(var k = 0; k < LabelDefaultLangauge.length; k++) {
						    	if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
						    		EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
						    	}	
						    }
                        }
                        var Metadata;
                        ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                        Metadata = {
                            'properties': {
                                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                'From': _spPageContextInfo.userEmail,
                                'To': { 'results': ToUserArray },
                                //'CC': { 'results': ccUsers },
                                'Body': EmailDesign,
                                'Subject': 'A document has been shared with you.'
                            }
                        };

                        var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
                        $.ajax({
                            contentType: 'application/json',
                            url: sitetemplateurl,
                            type: "POST",
                            data: JSON.stringify(Metadata),
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "content-type": "application/json;odata=verbose",
                                "X-RequestDigest": $("#__REQUESTDIGEST").val()
                            },
                            success: function (data) {
                                if ((index + 1) == arrFileFolder.length) {
                                    var tempDocName = Documentname;
                                    if (Documentname.search(/\bDocuments\b/) >= 0) {
                                        tempDocName = "Shared%20Documents";
                                    }
                                    GetMyDocumentsWithFilesFolder(tempDocName);
                                    if (FailDueToCheckOut == 0) {
                                        alert("File has been shared.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                    }
                                    $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                    $(".txtSharingHistoy").show();
                                    $(".btnClosePopup").trigger("click");
                                    arrFileFolder = [];
                                    FailDueToCheckOut = 0;
                                    $(".chkFileFolder").prop("checked", false);
                                }
                            },
                            error: function (err) {
                                waitingDialog.hide();
                                alert("SendEmailSharedNotification  " + JSON.stringify(err));
                            }
                        });
                    }
                    else*/
                     {
                        if ((index + 1) == arrFileFolder.length) {
                            var tempDocName = Documentname;
                            if (Documentname.search(/\bDocuments\b/) >= 0) {
                                tempDocName = "Shared%20Documents";
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }

                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            FailDueToCheckOut = 0;
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (entry.type == 'folder') {
                    SharingRespose = true;
                    txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                    CopySourceURL = entry.SiteURL;
                    CopyLibrary = entry.SelectedLibrary;
                    $("#FilePath").text(entry.ServerURL);
                    $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                    $("#FileName").text(entry.FileFolderName);
                    if (entry.CopyFileLink.includes('/Documents/') == true) {
                        entry.CopyFileLink = entry.CopyFileLink.replace('/Documents/', '/Shared%20Documents/');
                    }
                    $(".txtCopyLink").val(entry.CopyFileLink);
                    serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                    sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                    //return false;
                    arrRevokeIds = $.grep(sharefileuser, function (element) {
                        return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                    });

                    sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                    SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                    if (SharingRespose != false) {
                        SharingRespose = true;
                    }
                    if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                        var securityLeveltext = $('#sharewith').val();//Update Document Properties
                        if (PermissionStatus == "") {
                            updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                        }
                        GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                        var Shared = [];
                        Shared = getSharedType();
                        AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1]);

                        //mail send
                        /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                        {
                            var ToUserArray = [];
                            var Permission = $("#sharedWithPermission :selected").text();
                            if (SharingUserEmail.length > 0) {
                                var EmailDesign = '';
                                ValidityDateHTML = '';
                                if ($("#expiredats").val() != "") {
                                    ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMM DD YYYY') + "</div>";
                                }
                                EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                                //for (i = 0; i < SharingUserEmail.length; i++) {
                                EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                         "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                         "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                         "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                         "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMM DD YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                         ValidityDateHTML +
                                                         "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                        "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                                //}

                                EmailDesign += "This is an auto generated email. Please don't reply.";
								for(var k = 0; k < LabelDefaultLangauge.length; k++) {
							    	if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
							    		EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
							    	}	
							    }
                            }
                            var Metadata;
                            ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                            Metadata = {
                                'properties': {
                                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                    'From': _spPageContextInfo.userEmail,
                                    'To': { 'results': ToUserArray },
                                    //'CC': { 'results': ccUsers },
                                    'Body': EmailDesign,
                                    'Subject': 'A document has been shared with you.'
                                }
                            };

                            var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
                            $.ajax({
                                contentType: 'application/json',
                                url: sitetemplateurl,
                                type: "POST",
                                data: JSON.stringify(Metadata),
                                headers: {
                                    "Accept": "application/json;odata=verbose",
                                    "content-type": "application/json;odata=verbose",
                                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                                },
                                success: function (data) {
                                    if ((index + 1) == arrFileFolder.length) {
                                        var tempDocName = Documentname;
                                        if (Documentname.search(/\bDocuments\b/) >= 0) {
                                            tempDocName = "Shared%20Documents";
                                        }
                                        GetMyDocumentsWithFilesFolder(tempDocName);
                                        if (FailDueToCheckOut == 0) {
                                            alert("File has been shared.");
                                        }
                                        else {
                                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                        }
                                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                        $(".txtSharingHistoy").show();
                                        $(".btnClosePopup").trigger("click");
                                        arrFileFolder = [];
                                        FailDueToCheckOut = 0;
                                        $(".chkFileFolder").prop("checked", false);
                                    }
                                },
                                error: function (err) {
                                    waitingDialog.hide();
                                    alert("SendEmailSharedNotification  " + JSON.stringify(err));
                                }
                            });
                        }
                        else */
                        {
                            if ((index + 1) == arrFileFolder.length) {
                                var tempDocName = Documentname;
                                if (Documentname.search(/\bDocuments\b/) >= 0) {
                                    tempDocName = "Shared%20Documents";
                                }
                                GetMyDocumentsWithFilesFolder(tempDocName);
                                if (FailDueToCheckOut == 0) {
                                    alert("File has been shared.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                }

                                $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                $(".txtSharingHistoy").show();
                                $(".btnClosePopup").trigger("click");
                                arrFileFolder = [];
                                FailDueToCheckOut = 0;
                                $(".chkFileFolder").prop("checked", false);
                            }
                        }
                    }
                }
                else {
                    FailDueToCheckOut++;
                    if (FailDueToCheckOut == arrFileFolder.length) {
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        alert("Selected file(s) are locked, couldn't be shared.");
                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                        $(".txtSharingHistoy").show();
                        $(".btnClosePopup").trigger("click");
                        arrFileFolder = [];
                        $(".chkFileFolder").prop("checked", false);
                    }
                    else {
                        if (arrFileFolder.length == (index + 1)) {
                            var tempDocName = Documentname;
                            if (Documentname.search(/\bDocuments\b/) >= 0) {
                                tempDocName = "Shared%20Documents";
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }
                            waitingDialog.hide();
                            FailDueToCheckOut = 0;
                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
        }
    });
}

function getSharedUsersId(shareDocumentitemIdd) {
    var sharefileuser = [];
    if (CopyLibrary == "Shared%20Documents") {
        CopyLibrary = "Documents";
    }
    var resturl = CopySourceURL + "/_api/web/Lists/GetByTitle('" + CopyLibrary + "')/getItemById(" + shareDocumentitemIdd + ")?$select=ServerRedirectedEmbedUri,File/Name,File/ServerRelativeUrl,Folder/Name,Folder/ServerRelativeUrl,Shared/Title,SharedId&$expand=File,Folder,SharedId"
    $.ajax({
        url: resturl,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        async: false,
        success: function (data) {
            if (data.d.SharedId != null) {
                for (var m = 0; m < data.d.SharedId.results.length; m++) {
                    var sharefileuserid = data.d.SharedId.results[m];
                    sharefileuser.push(sharefileuserid);
                }
            }
        }, eror: function (data) {
            console.log(data);
        }
    });
    return sharefileuser;
}

//Share the selected file
function ShareFilesFolder(sharingLink, typeOfFileFolder, permissionTo) {
    var UsersId = [];
    SharingRespose = true;
    var userRole = 2;
    if ($('#sharedWithPermission').val() == "Read") {
        userRole = 1;
    }
    else if ($('#sharedWithPermission').val() == "Restricted View") {
        userRole = 7;
    }
    if (sharingLink.includes("/Documents/") == true) {
        sharingLink = sharingLink.replace('Documents', 'Shared%20Documents');
    }
    var userRoleAssignments = createJSONMetadata(SharingUserEmail, userRole);
    var restSource = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Sharing.DocumentSharingManager.UpdateDocumentSharingInfo";
    $.ajax(
    {
        'url': restSource,
        'method': 'POST',
        async: false,
        'data': JSON.stringify({
            'resourceAddress': document.location.origin + sharingLink,
            'userRoleAssignments': userRoleAssignments,
            'validateExistingPermissions': false,
            'additiveMode': false,
            'sendServerManagedNotification': false,
            'customMessage': "Please look at the following File/Folder.",
            'includeAnonymousLinksInNotification': false
        }),
        'headers': {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        'success': function (data) {
            console.log("Assigned");
            SharingRespose = true;
        },
        'error': function (err) {
            if (err.responseText.includes("The caller has no permissions to grant permission") == true) {
                //It will done by flow then, Pass 'PermissionStatus' equal to 'Pending' in SharedDocument list.
                //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                //return false;
                SharingRespose = true;
                PermissionStatus = "Pending";
            }
            else {
                SharingRespose = false;
                alert(err.responseText);
                PermissionStatus = '';
                return false;
            }
        }
    });
    return SharingRespose;
}

//convert the email data into JSON format
function createJSONMetadata(emailIdCollection, roleId) {
    var jsonObj = [];
    var commonObj = {};
    commonObj['type'] = 'SP.Sharing.UserRoleAssignment';
    for (var index = 0; index < emailIdCollection.length; index++) {
        var item = {}
        item['__metadata'] = commonObj;
        item['Role'] = parseInt(roleId);
        item['UserId'] = emailIdCollection[index];
        jsonObj.push(item);
    }
    return jsonObj;
}

//update metadata of shared document
function updateDocumentPropertiesOnItemSharing(undefineditemID, serverRelativeFileUrl, securityLeveltext, sharedUserArrayListss, webUrl, asyncCall) {
    var divsharedWithPermission = $('#sharedWithPermission').val();
    var divtxtPermissionLevelId = '';
    if ($('#sharedWithPermission').val() == 'Contribute') {
        divtxtPermissionLevelId = "1073741827";
    }
    else if ($('#sharedWithPermission').val() == 'Read') {
        divtxtPermissionLevelId = "1073741826";
    }
    else {
        divtxtPermissionLevelId = "1073741937";
    }

    var ListName = CopyLibrary;
    var Metadata;
    if (ListName.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(ListName);
    }
    if (securityLeveltext == "Selective" || securityLeveltext == "") {
        if (ShareUserPrincipleMail.length == 0) {
            for (var usr = 0; usr < SharingUserEmail.length; usr++) {
                sharedUserArrayListss.push(GetUserId(SharingUserEmail[usr], webUrl));
            }
        }
        else {
            for (var usr = 0; usr < ShareUserPrincipleMail.length; usr++) {
                sharedUserArrayListss.push(GetUserId(ShareUserPrincipleMail[usr], webUrl));
            }
        }
    }
    sharedUserArrayListss = sharedUserArrayListss.filter(function (obj) {
        return obj !== "";
    });
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        SecurityLevel: securityLeveltext,
        PermissionLevel: divsharedWithPermission,
        PermissionLevelId: divtxtPermissionLevelId,
        SharedId: { 'results': sharedUserArrayListss }
    };
    if ($("#Acknowledgment").prop("checked") == true) {
        Metadata["Acknowledgement"] = 'Required';
    }
    updateItemWithIDItemListDocuments(ListName, Metadata, undefineditemID, webUrl, asyncCall).done(function () {
    }).fail(function (err) {
        console.log(err);
    });
}

//remove the permission
function GetDocumentsRevoke(sharedHistoryUser, undefineditemID) {
    arrSharedUser = [];
    if ($('#sharewith').val() == "Organization") {
        SharingUserEmail.forEach(function (entry, index) {
            arrSharedUser.push(entry.GroupId);
        });
    }
    else {
        arrSharedUser = sharedHistoryUser.filter(function (f) { return f; })
    }
    for (k = 0; k < arrSharedUser.length; k++) {
        var queryFilter = "&$filter=SharedUsers/ID eq '" + arrSharedUser[k] + "' and DocumentID eq '" + undefineditemID + "' and PermissionStatus ne 'Revoked'";
        var Query = "?$select=ID,DocumentNo,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID&$expand=SharedUsers,Author" + queryFilter;
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
            for (var i = 0; i < items.length; i++) {
                currentItemId = items[i].ID;
                var ListName = "SharedDocument";
                var Metadata;
                var ItemType = GetItemTypeForListName(ListName);
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    PermissionStatus: "Revoked",
                    share_remarks: "Revoked due to re-share",
                    SharedEnd: new Date().toISOString()
                }
                $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                    console.log("sucessfully revoke");
                });
            }
        });
    }
}

//Get shared type of Shared file
function getSharedType() {
    var ShareType = [];
    ShareType.push("Guest");
    ShareType.push(currentClientName);
    return ShareType;
}

// add Shared file metadata in 'SharedDocument' list
function AddSharedLinkToList(documentURL, sharedUsersId, documentId, documentType, sharedGroup, permissionType, Shared_Type, DocType, SharedFrom) {
    IsBlock = "No";
    var ListName = "SharedDocument";
    var ItemType = GetItemTypeForListName(ListName);
    var SelectedLibrary = '';
    if (Documentname.indexOf('/') != -1) {
        SelectedLibrary = Documentname.split('/')[0];
    }
    else {
        SelectedLibrary = Documentname;
    }

    for (k = 0; k < sharedUsersId.length; k++) {
        var shareduserid = [];
        shareduserid.push(sharedUsersId[k]);
        var Metadata;
        //for block download coding
        if (permissionType == "Restricted View") {
            IsBlock = "Yes";
        }
        var ValidityDate = null;
        if ($("#expiredats").val() != "") {
            ValidityDate = GetDateStandardFormat(moment($('#expiredats').val()).format('DD/MM/YYYY'));
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: $("#FileName").text(),//File/Folder name
            SharedFileTitle: $("#FileTitle").text(),//File/Folder Title
            DocumentURL: documentURL,//File/Folder url
            SharedUsersId: { 'results': shareduserid },//Shared users
            SharedUserEmail: SharingUserEmail[k],
            DocumentID: documentId,//Shared file/folder id
            //DOC_IDId: documentId,  //Shared file/folder id Lookupvalue
            DocumentType: documentType,// File/Folder
            SharedGroup: sharedGroup,//shared goupname or any label
            PermissionType: permissionType,//1 for readonly 2 for editor,
            ServerRedirectedEmbedURL: '',
            //DocumentNo: sharingLinkDocumentNo,
            //Details: globalsharingDocumentDetails,
            IsBlock: IsBlock,
            SharedType: Shared_Type,
            SharedFrom: SharedFrom,
            SharedMessage: $("#txtShareMessage").val(),
            SharingValidity: ValidityDate,
            NeedAcknowledgement: $("#Acknowledgment").prop("checked"),
            LibraryURL: DMS_Link.split('/Forms')[0],
            LibraryName: SelectedLibrary,
            SiteURL: DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")),
            DocType: DocType,
            IsSendMail: $("#notifymail").prop('checked')
        };
        if (PermissionStatus == "Pending") {
            Metadata["PermissionStatus"] = "Pending";
        }

        $.when(AddItemToListGroups(ListName, Metadata)).done(function (response) {
            //if((k+1) == sharedUsersId.length) {
            //}
        });
    }
}


function AddItemToListGroups(ListName, Metadata) {
    if (ListName == "Shared%20Documents") {
        ListName = "Documents";
    }
    var dfd = $.Deferred();
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
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
//on change peoplePIcker
function onChangeSharing(HTMLID, PplPickerId, userHTMLId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            BindUser = '';
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
            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
            BindUser += '<div class="col-sm-6 parentremove User' + tempUserId + '"><div class="employeesection">';
            BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
            BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            BindUser += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
            BindUser += '<span class="employeeemail" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</span>';
            BindUser += '</div></div></div>';
            $("#" + userHTMLId).before(BindUser);
            EmptyPeoplePicker(PplPickerId);
        }
        else {
            //$("#userList").hide();
        }
    };
}

//method to share single file.
function shareFile() {
    var sharefileuser = [];
    var arrRevokeIds = [];
    var SharingRespose = true;
    sharedUsersIdArrayListItemCollection = [];
    sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    var txtDocshareingTypePermissionLevel = $('#sharewith').val();
    var txttsharedWithPermission = $('#sharedWithPermission').val();
    var txtSharedDocumetnOnDemandId = DocumentId.toString();
    var serverRelativeFileUrl = $("#FilePath").text();

    sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId);
    arrRevokeIds = $.grep(sharefileuser, function (element) {
        return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
    });

    sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
    SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
    if (SharingRespose != false) {
        SharingRespose = true;
    }
    if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
        var securityLeveltext = $('#sharewith').val();//Update Document Properties
        if (PermissionStatus == "") {
            updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
        }
        GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
        var Shared = [];
        Shared = getSharedType();
        AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, "File", $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], $('#FileDocType').text(), Shared[1]);

        //mail send
        //CommentSTART  as email trigger from flow//3 march 23
        /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
        {
            var ToUserArray = [];
            var Permission = $("#sharedWithPermission :selected").text();
            if (SharingUserEmail.length > 0) {
                var EmailDesign = '';
                ValidityDateHTML = '';
                if ($("#expiredats").val() != "") {
                    ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMM DD YYYY') + "</div>";
                }
                EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#FileTitle").text() + "</div>" +
                                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + $("#FileDocType").text() + "</div>" +
                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#FileReference").text() + "</div>" +
                                         "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                         "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                         "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMM DD YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                         ValidityDateHTML +
                                         "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                        "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                EmailDesign += "This is an auto generated email. Please don't reply.";
				for(var k = 0; k < LabelDefaultLangauge.length; k++) {
			    	if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
			    		EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
			    	}	
			    }
            }
            var from = $('#lblSelectedCurrentEmail').text();
            var Metadata;
            ToUserArray = SharingUserEmail.filter(function (f) { return f; })
            Metadata = {
                'properties': {
                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                    'From': _spPageContextInfo.userEmail,
                    'To': { 'results': ToUserArray },
                    //'CC': { 'results': ccUsers },
                    'Body': EmailDesign,
                    'Subject': 'A document has been shared with you.'
                }
            };
            SendEmailSharedNotification(Metadata);
        }
        else */{
            var tempDocName = Documentname;
            if (Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            alert("File has been shared.");
            $("#FileSharing").text("Shared with " + $('#sharewith').val());
            $(".txtSharingHistoy").show();
            $(".btnClosePopup").trigger("click");
        }

    }
}

//Send email notification to Shared users
function SendEmailSharedNotification(emailProperties) {
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(emailProperties),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var tempDocName = Documentname;
            if (Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            alert("File has been shared.");
            $("#FileSharing").text("Shared with " + $('#sharewith').val());
            $(".txtSharingHistoy").show();
            $(".btnClosePopup").trigger("click");
        },
        error: function (err) {
            alert("SendEmailSharedNotification  " + JSON.stringify(err));
        }
    });
}
//-----------------------------------------Sharing Code ends----------------------------------------------------
// 13 March 23
//get all UserName from Employee List
function GetUserFromEmp() {
    var UserDetails = [];
    var RestQuery = "?$select=Title,Status,Company/Id,LogonName/EMail,Email,FullName,PrimaryCompany&$orderby=FullName asc&$expand=LogonName,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and PrimaryCompany eq 'Primary' and Status eq 'Active'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        if (Employees.length > 0) {
            UserDetails = Employees;
        }
    });
    return UserDetails;
}
