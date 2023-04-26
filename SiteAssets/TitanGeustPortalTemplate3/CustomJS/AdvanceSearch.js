var GloblListId = "";
var GloblSiteurl = _spPageContextInfo.webAbsoluteUrl;
var table;
var getFileDetails = [];
var path = "DocumentManagementSystem/indramani.gautam@adapt-india.com/";
var AddDocumentLib;
var linkDocumentLib;
var IsMyDocument = false;
var withoutLastChunk;
var arrAdSearchFiles = [];
var ShareAllItemswithFolder = [];
var txtContent = "";
var txtTitle = "";

$(document).ready(function () {
    $("#advanceserach").click(function () {
        $(".headdingLinks").html('Advance Search');
        $(".advance_setion").show();
        $("#DMSTable,#ButtonArea,#SearchArea").hide();
        if ($('#ddlDocumentType option').length == 0) {
            BindDMSDocumentType();
        }
    });
    $('#btnSearch').click(function () {
        StartSearch();
    });
    $('#btnAdSearchClear').click(function () {
        clearAll();
    });
    $('#btnAdSearchDownload').click(function () {
        downloadfiles();
    });    
});

//on Search - start the content/Advance Search
function StartSearch() {
    $.ajax({
        type: 'GET',
        beforeSend: function () {
            if ($("#chkMyLibrary").prop('checked') == true || $("#chkSharedLibrary").prop('checked') == true) {
                var dlgTitle = 'Searching...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                setTimeout(function () {
                    getFileDetails = [];
                    GenrateAdSearchGrid(getFileDetails);
                }, 100);
            } else {
                alert("Please select document library to search.");
                return false;
            }
        },
        success: function (data) {
            console.log(data);
            executeSearch();
        },
        error: function (result) {
            alert(JSON.stringify(result));
        }
    }).fail(function (error) {
        alert(JSON.stringify(error));
    });
}

function GenrateAdSearchGrid(results) {
    var html = "";
    var filePermission = 'null';
    $("#SearchResultsGrid").html("");
    
    html += '<thead style="display:none">' +

        '</thead>' +
        '<tbody>';

        
    for (var i = 0; i < results.length; i++) {
        var Icon = "file.png";
        if ("docx" == results[i].FileExtension || "doc" == results[i].FileExtension) {
            Icon = "docx.png";
        } else if ("pdf" == results[i].FileExtension) {
            Icon = "pdf.png";
        } else if ("jpg" == results[i].FileExtension || "psd" == results[i].FileExtension || "tiff" == results[i].FileExtension || "gif" == results[i].FileExtension || "bmp" == results[i].FileExtension || "jpeg" == results[i].FileExtension || "png" == results[i].FileExtension) {
            Icon = "image-icon.png";
        } else if ("xlsx" == results[i].FileExtension) {
            Icon = "xlsx.png";
        } else if ("pptx" == results[i].FileExtension) {
            Icon = "pptx.png";
        } else if ("txt" == results[i].FileExtension) {
            Icon = "txt.png";
        } else if ("csv" == results[i].FileExtension) {
            Icon = "CSV.png";

        } else if ("zip" == results[i].FileExtension || "rar" == results[i].FileExtension || "7z" == results[i].FileExtension || "arz" == results[i].FileExtension || "cab" == results[i].FileExtension || "rpm" == results[i].FileExtension || "wim" == results[i].FileExtension) {
            Icon = "ZIP.png";

        } else if ("mp4" == results[i].FileExtension || "wmv" == results[i].FileExtension || "avi" == results[i].FileExtension || "mpeg" == results[i].FileExtension || "flv" == results[i].FileExtension || "mov" == results[i].FileExtension || "wav" == results[i].FileExtension || "ogv" == results[i].FileExtension) {
            Icon = "video.png";

        } else if ("mp3" == results[i].FileExtension || "wma" == results[i].FileExtension || "aac" == results[i].FileExtension || "pcm" == results[i].FileExtension) {
            Icon = "audio.png";

        }

        if (results[i].DocumentType == "-Select-" || results[i].DocumentType == null || results[i].DocumentType == "null" || results[i].DocumentType == "--select--") {
            results[i].DocumentType = '';
        }

        if (results[i].DocumentNo == null || results[i].DocumentNo == "null") {
            results[i].DocumentNo = '';
        }

        html += '<tr>' + '<td class="vertical-align-middle w-2 ">' + '<div class="chexbox_mg">' + '<input type="checkbox" class="chkFileFolder" value="'+results[i].Path+'" id="myCheckbox' + i + '" />' +
            '<label for="myCheckbox' + i + '">' +
            '<img width="30px" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/' + Icon + '" />' +
            '</label>' +

            '</div>' +

            '</td>' +

            '<td class="text-left w-50">' +
            '<a href="javascript:void(0);" id="Fileid' + i + '" onclick="DisplayFileProperty(this, \'' + results[i].ServerUrl + '\', \'' + results[i].Library + '\', \'' + filePermission + '\');" name="' + results[i].Path + '" class="table-title" target="">' + results[i].Title + '</a>' +
            '<div class="ellipsis-1">' +
            '<span>File name:</span> <span>' + results[i].Name + '</span>' +
            '</div>' +
            '</td>' +
            '<td class="w-25">' +
            '<div class="ellipsis-1">' +
            '<span data-localize="Category">Category</span><span>:</span> <span>' + results[i].DocumentType + '</span>' +
            '</div>' +
            '<div class="ellipsis-1">' +
            '<span data-localize="Reference">Reference</span><span>:</span> <span>' + results[i].DocumentNo + '</span>' +
            '</div>' +
            '<div class="ellipsis-1">' +
            '<span data-localize="Library">Library</span><span>:</span> <span>' + results[i].Library + '</span>' +
            '</div>' +
            '</td>' +
            '<td class="w-18">' +
            '<div>' +
            '<span data-localize="Modify">Modify</span><span>:</span> <span>' + ShowCommonStandardDateFormat(results[i].LastModifiedTime) + '</span>' +
            '</div>' +
            '<div class="ellipsis-1">' +
            '<span data-localize="Author">Author</span><span>:</span> <span>' + results[i].Author + '</span>' +
            '</div>' +
            '<div>' +
            '<span data-localize="Size">Size</span><span>:</span> <span>' + bytesToSize(results[i].Size) + '</span>' +
            '</div>' +
            '</td>' +
            '</tr>';
    }
    $("#SearchResultsGrid").html(html);
    
     $('#SearchResultsGrid').DataTable();
    /*
    if ($.fn.dataTable.isDataTable('#SearchResultsGrid')) {
        table.destroy();
        table = $('#SearchResultsGrid').DataTable({
            "bPaginate": true,
            "bJQueryUI": true, // ThemeRoller-stöd
            "bLengthChange": false,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": true,
            "bProcessing": true,
            "iDisplayLength": 8,
            "dom": 'Rlfrtip',
            "colReorder": {
                'allowReorder': true
            },
            "language": {
                "searchPlaceholder": "Type to find....",
                "sSearch": ""
            }
        });
    } else {
        table = $('#SearchResultsGrid').DataTable({
            "bPaginate": true,
            "bJQueryUI": true, // ThemeRoller-stöd
            "bLengthChange": false,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": true,
            "bProcessing": true,
            "iDisplayLength": 8,
            "dom": 'Rlfrtip',
            "colReorder": {
                'allowReorder': true
            },
            "language": {
                "searchPlaceholder": "Type to find....",
                "sSearch": ""
            }

        });
    }
   */
    
    $(".chkFileFolder").click(function () {
        var Properties = this.value;
        if (this.checked == true) {
            arrAdSearchFiles.push({
                ServerURL: Properties.trim(),
            });
        } else {
            var selected = this.value;
            arrAdSearchFiles = arrAdSearchFiles.filter(function (obj) {
                return obj.ServerURL != Properties.trim();
            });
        }
    });
    ChangeLabels();
}


// Called from the ASPX Page
function executeSearch() {
    try {
        var txtContent = $("#txtContentsearchBox").val().trim();
        var txtTitle = $("#txtTitlesearchBox").val().trim();
        AddDocumentLib = "";
        if($("#chkMyLibrary").prop('checked') == true || $("#chkSharedLibrary").prop('checked') == true) {
            var strLink = '<a href="javascript:void(0)" name="' + userDocumenturl + '">' + currentClientName + '</a>';
            IsMyDocument = false;
            linkDocumentLib = strLink.split('name="')[1].split('">')[0];
            GetListId(linkDocumentLib)
            AddDocumentLib = "Guest Client : " + strLink.split('name="')[1].split('">')[1].split('</a>')[0];
            if($("#chkSharedLibrary").prop('checked') == true) {
                ShareAllItemswithFolder = [];
                SharewithMe();
                getFileDetails = getFileDetails.concat(ShareAllItemswithFolder);
                if(txtTitle != "") {
                    var Filenametxt = txtTitle.toString();
                    getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.Title.toString().includes(Filenametxt));
                }
                if($("#txtReference").val() != "") {
                    getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.DocumentNo.includes($("#txtReference").val()));
                }
                if($("#ddlDocumentType option:selected").val() != "All") {
                    getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.DocumentType.includes($("#ddlDocumentType option:selected").val()));
                }
            }
            if(txtContent != "") {
                // run
                //&enablequeryrules='false' &Author='"+_spPageContextInfo.userDisplayName+"'
                SPSearchResults = {
                    element: '',
                    url: '',
                    init: function(element) {
                        SPSearchResults.element = element;
                        SPSearchResults.url = GloblSiteurl + "/_api/search/query?querytext= '" + txtContent + "* '&rowlimit='5000' &sortlist='rank:descending,modifiedby:ascending' &selectproperties='Path,FileExtension,Author,Size,Name,Title,DocumentNo,Regarding,Details,Shared,Department,DepartmentName,Shared With,DocumentType,LastModifiedTime,ID' &refinementfilters='and(ListId:(" + GloblListId + "),IsDocument:(true),Title:(" + txtTitle + "*))'";
                    },
                    load: function() {
                        $.ajax({
                            url: SPSearchResults.url,
                            method: "GET",
                            async: false,
                            headers: {
                                "accept": "application/json;odata=verbose",
                            },
                            success: SPSearchResults.onSuccess,
                            error: SPSearchResults.onError
                        });
                    },
                    onSuccess: function(data) {
                        var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                        for(var i = 0; i < results.length; i++) {
                            var findUrl = results[i].Cells.results[0].Value;
                            if(IsMyDocument == false) {
                                RestQuery = "?$orderby=Id desc &$select=*,Author/Title &$expand=File,File/Author/Title, Author,File/ListItemAllFields &$filter=FileLeafRef eq '" + results[i].Cells.results[0].Value.split('/')[results[i].Cells.results[0].Value.split('/').length - 1] + "' ";
                                var selectproperties = GetFileDetails(RestQuery, Documentname, withoutLastChunk);
                                if(selectproperties != undefined) {
                                    getFileDetails.push({
                                        'Path': selectproperties[0].File.ServerRelativeUrl,
                                        'FileExtension': selectproperties[0].File.Name.split('.')[1],
                                        'Author': selectproperties[0].File.Author.Title,
                                        'Size': selectproperties[0].File.Length,
                                        'Name': selectproperties[0].File.Name,
                                        'Title': (selectproperties[0].File.Title == null || selectproperties[0].File.Title == "") ? selectproperties[0].File.Name.split('.')[0] : selectproperties[0].File.Title,
                                        'DocumentNo': selectproperties[0].DocumentNo,
                                        'Details': selectproperties[0].Details,
                                        'DocumentType': selectproperties[0].DocumentType,
                                        'LastModifiedTime': selectproperties[0].File.TimeLastModified,
                                        'Library': AddDocumentLib,
                                        'ServerUrl': withoutLastChunk
                                    });
                                }
                            }
                        }
                    },
                    onError: function(err) {
                        $("#searchResults").html("<h3>An error occured</h3><br />" + JSON.stringify(err));
                    }
                };
                // Call our Init-function
                SPSearchResults.init($('#searchResults'));
                // Call our Load-function which will post the actual query
                SPSearchResults.load();
                RestQuery = "&$filter= ";
                var IsAndOp = false;
                if(txtTitle != "") {
                    IsAndOp = true;
                    RestQuery += "substringof('" + txtTitle + "',FileLeafRef) or substringof('" + txtTitle + "',Title) "
                }
                if($("#txtReference").val() != "") {
                    if(IsAndOp) {
                        RestQuery += "and substringof('" + $("#txtReference").val() + "',DocumentNo)"
                    } else {
                        RestQuery += "substringof('" + $("#txtReference").val() + "',DocumentNo)";
                        IsAndOp = true;
                    }
                }
                if($("#ddlDocumentType option:selected").val() != "All") {
                    if(IsAndOp) {
                        RestQuery += "and DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
                        IsAndOp = false
                    } else {
                        RestQuery += "DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
                    }
                }
                if(txtTitle != "" || $("#txtReference").val() != "" || $("#ddlDocumentType option:selected").val() != "All") {
                    getFileDetails = getFileDetails.filter(function(obj, index) {
                        if(obj.DocumentNo == null || obj.DocumentNo == '') {
                            obj.DocumentNo = "null";
                        }
                        if(obj.Title == null || obj.Title == '') {
                            obj.DocumentNo = "null";
                        }
                        if(obj.Name == null || obj.Name == '') {
                            obj.Name = "null";
                        }
                        return ($("#ddlDocumentType").val() == "All" ? obj.DocumentType != "" : obj.DocumentType == $("#ddlDocumentType").val()) && ($("#txtReference").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#txtReference").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#txtReference").val().toLowerCase()) != -1)) && ($("#txtTitlesearchBox").val().trim() == "null" ? obj.Title != "null" : (obj.Title.toLowerCase() == $("#txtTitlesearchBox").val().toLowerCase() || obj.Title.toLowerCase().indexOf($("#txtTitlesearchBox").val().toLowerCase()) != -1) || $("#txtTitlesearchBox").val().trim() == "null" ? obj.Name != "null" : (obj.Name.toLowerCase() == $("#txtTitlesearchBox").val().toLowerCase() || obj.Name.toLowerCase().indexOf($("#txtTitlesearchBox").val().toLowerCase()) != -1));
                    });
                }
            } else {
                if($("#chkMyLibrary").prop('checked') == true) {
                    RestQuery = "&$filter= ";
                    var IsAndOp = false;
                    if(txtTitle != "") {
                        IsAndOp = true;
                        RestQuery += "substringof('" + txtTitle + "',FileLeafRef) or substringof('" + txtTitle + "',Title) "
                    }
                    if($("#txtReference").val() != "") {
                        if(IsAndOp) {
                            RestQuery += "and substringof('" + $("#txtReference").val() + "',DocumentNo)"
                        } else {
                            RestQuery += "substringof('" + $("#txtReference").val() + "',DocumentNo)";
                            IsAndOp = true;
                        }
                    }
                    if($("#ddlDocumentType option:selected").val() != "All") {
                        if(IsAndOp) {
                            RestQuery += "and DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
                            IsAndOp = false
                        } else {
                            RestQuery += "DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
                        }
                    }
                    var selectproperties = GetFileDetails("?$orderby=Id desc &$top=4999 &$select=*,Author/Title &$expand=File,File/Author/Title, Author,File/ListItemAllFields" + RestQuery, Documentname, withoutLastChunk);
                    if(selectproperties != undefined) {
                        for(var i = 0; i < selectproperties.length; i++) {
                            var findUrl = selectproperties[i].File.ServerRelativeUrl;
                            if(findUrl != undefined) {
                                if(IsMyDocument == false) {
                                    getFileDetails.push({
                                        'Path': selectproperties[i].File.ServerRelativeUrl,
                                        'FileExtension': selectproperties[i].File.Name.split('.')[1],
                                        'Author': selectproperties[i].File.Author.Title,
                                        'Size': selectproperties[i].File.Length,
                                        'Name': selectproperties[i].File.Name,
                                        'Title': (selectproperties[i].File.Title == null || selectproperties[i].File.Title == "") ? selectproperties[i].File.Name.split('.')[0] : selectproperties[i].File.Title,
                                        'DocumentNo': (selectproperties[i].DocumentNo == null) ? "" : selectproperties[i].DocumentNo,
                                        'Details': selectproperties[i].Details,
                                        'DocumentType': (selectproperties[i].DocumentType == null) ? "" : selectproperties[i].DocumentType,
                                        'LastModifiedTime': selectproperties[i].File.TimeLastModified,
                                        'Library': AddDocumentLib,
                                        'ServerUrl': withoutLastChunk
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        GenrateAdSearchGrid(getFileDetails)
        currentDlg.close();
    } catch (err) {
        currentDlg.close();
        console.log(err);
        alert("The crawling services is failed, try with proper searching text");
    }
}



function SharewithMe() {
    //itemsShareWithme = [];
    IsShareDocumnet = true;
    IsMyDocument = false;
    if(ShareAllItemswithFolder.length == 0) {
        itemsShareWithme = GetDocumentsSharedWithMeSearch("SharedWithMe");
        itemsShareWithme = removeDuplicates(itemsShareWithme);
        var CountItem = "";
        for(var i = 0; i < itemsShareWithme.length; i++) {
            console.log(itemsShareWithme[i].DocumentURL);
            // debugger
            CountItem = i;
            if(itemsShareWithme[i].DocumentType.toLowerCase() == "folder") {
                console.log(itemsShareWithme[i].DocumentURL);
                RequestDigest = $("#__REQUESTDIGEST").val();
                if(itemsShareWithme[i].SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(itemsShareWithme[i].SiteURL)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                //   selectproperties = "";
                var ListNamewithfolder = itemsShareWithme[i].DocumentURL;
                var SiteUrlFolder = itemsShareWithme[i].SiteURL
                var LibraryName = itemsShareWithme[i].LibraryName
                $.when(getItemsWithQueryUsersDocuments(ListNamewithfolder, SiteUrlFolder)).done(function(DocumentFolderfiles) {
                    for(var i = 0; i < DocumentFolderfiles.Files.results.length; i++) {
                        console.log(DocumentFolderfiles.Files.results[i].Name);
                        ShareAllItemswithFolder.push({
                            'Path': DocumentFolderfiles.Files.results[i].ServerRelativeUrl,
                            'FileExtension': DocumentFolderfiles.Files.results[i].Name.split('.')[1],
                            'Author': (DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentWrittenBy == null) ? "" : DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentWrittenBy,
                            'Size': DocumentFolderfiles.Files.results[i].Length,
                            'Name': DocumentFolderfiles.Files.results[i].Name,
                            'Title': (DocumentFolderfiles.Files.results[i].Title == null || DocumentFolderfiles.Files.results[i].Title == "") ? DocumentFolderfiles.Files.results[i].Name.split('.')[0] : DocumentFolderfiles.Files.results[i].Title,
                            'DocumentNo': (DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentNo == null) ? "" : DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentNo,
                            'Details': DocumentFolderfiles.Files.results[i].ListItemAllFields.Details,
                            'DocumentType': (DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentType == null) ? "" : DocumentFolderfiles.Files.results[i].ListItemAllFields.DocumentType,
                            'LastModifiedTime': DocumentFolderfiles.Files.results[i].TimeLastModified,
                            'Library': LibraryName,
                            'ServerUrl': SiteUrlFolder,
                            'SubCategory': (DocumentFolderfiles.Files.results[i].ListItemAllFields.SubCategory == null) ? "" : DocumentFolderfiles.Files.results[i].ListItemAllFields.SubCategory
                        })
                    }
                    for(var j = 0; j < DocumentFolderfiles.Folders.results.length; j++) {
                        console.log(DocumentFolderfiles.Folders.results[j].Name);
                        //var SiteUrlFolderServerRelativeUrl = DocumentFolderfiles.Folders.results[j].ServerRelativeUrl
                        $.when(getItemsWithQueryUsersDocuments(DocumentFolderfiles.Folders.results[j].ServerRelativeUrl, SiteUrlFolder)).done(function(DocumentsubFolderfiles) {
                            for(var i = 0; i < DocumentsubFolderfiles.Files.results.length; i++) {
                                console.log(DocumentsubFolderfiles.Files.results[i].Name);
                                ShareAllItemswithFolder.push({
                                    'Path': DocumentsubFolderfiles.Files.results[i].ServerRelativeUrl,
                                    'FileExtension': DocumentsubFolderfiles.Files.results[i].Name.split('.')[1],
                                    'Author': (DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentWrittenBy == null) ? "" : DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentWrittenBy,
                                    'Size': DocumentsubFolderfiles.Files.results[i].Length,
                                    'Name': DocumentsubFolderfiles.Files.results[i].Name,
                                    'Title': (DocumentsubFolderfiles.Files.results[i].Title == null || DocumentsubFolderfiles.Files.results[i].Title == "") ? DocumentsubFolderfiles.Files.results[i].Name.split('.')[0] : DocumentsubFolderfiles.Files.results[i].Title,
                                    'DocumentNo': (DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentNo == null) ? "" : DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentNo,
                                    'Details': DocumentsubFolderfiles.Files.results[i].ListItemAllFields.Details,
                                    'DocumentType': (DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentType == null) ? "" : DocumentsubFolderfiles.Files.results[i].ListItemAllFields.DocumentType,
                                    'LastModifiedTime': DocumentsubFolderfiles.Files.results[i].TimeLastModified,
                                    'Library': LibraryName,
                                    'ServerUrl': SiteUrlFolder,
                                    'SubCategory': (DocumentsubFolderfiles.Files.results[i].ListItemAllFields.SubCategory == null) ? "" : DocumentsubFolderfiles.Files.results[i].ListItemAllFields.SubCategory
                                })
                            }
                            for(var i = 0; i < DocumentsubFolderfiles.Folders.results.length; i++) {
                                DocumentFolderfiles.Folders.results.push(DocumentsubFolderfiles.Folders.results[i]);
                            }
                        });
                    }
                });
            }
        }
    }
    RestQuery = "&$filter= ";
    var IsAndOp = false;
    if(txtTitle != "") {
        IsAndOp = true;
        RestQuery += "substringof('" + txtTitle + "',FileLeafRef) or substringof('" + txtTitle + "',Title) "
    }
    if($("#txtReference").val() != "") {
        if(IsAndOp) {
            RestQuery += "and substringof('" + $("#txtReference").val() + "',DocumentNo)"
        } else {
            RestQuery += "substringof('" + $("#txtReference").val() + "',DocumentNo)";
            IsAndOp = true;
        }
    }
    if($("#ddlDocumentType option:selected").val() != "All") {
        if(IsAndOp) {
            RestQuery += "and DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
            IsAndOp = false
        } else {
            RestQuery += "DocumentType eq '" + $("#ddlDocumentType option:selected").val() + "'"
        }
    }
    var selectproperties = "";
    if(itemsShareWithme.length > 0 && IsShareDocumnet == true) {
        // debugger
        for(var i = 0; i < itemsShareWithme.length; i++) {
            if(itemsShareWithme[i].DocumentType.toLowerCase() == "file") {
                RestQuery = "&$filter=Id eq '" + itemsShareWithme[i].DOC_ID.ID + "'" 
                RequestDigest = $("#__REQUESTDIGEST").val();
                if(itemsShareWithme[i].SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(itemsShareWithme[i].SiteURL)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                selectproperties = "";
                if(itemsShareWithme[i].LibraryName == "Shared Documents" || itemsShareWithme[i].LibraryName == "Shared%20Documents") {
                    itemsShareWithme[i].LibraryName = "Documents";
                }
                selectproperties = GetFileDetails("?$orderby=Id desc &$top=4999 &$select=*,Author/Title &$expand=File,File/Author/Title, Author,File/ListItemAllFields" + RestQuery, itemsShareWithme[i].LibraryName, itemsShareWithme[i].SiteURL);
                if(selectproperties != undefined) {
                    var findUrl = selectproperties[0].File.ServerRelativeUrl;
                    if(findUrl != undefined) {
                        getFileDetails.push({
                            'Path': selectproperties[0].File.ServerRelativeUrl,
                            'FileExtension': selectproperties[0].File.Name.split('.')[1],
                            'Author': selectproperties[0].File.Author.Title,
                            'Size': selectproperties[0].File.Length,
                            'Name': selectproperties[0].File.Name,
                            'Title': (selectproperties[0].File.Title == null || selectproperties[0].File.Title == "") ? selectproperties[0].File.Name.split('.')[0] : selectproperties[0].File.Title,
                            'DocumentNo': (selectproperties[0].DocumentNo == null) ? "" : selectproperties[0].DocumentNo,
                            'Details': selectproperties[0].Details,
                            'DocumentType': (selectproperties[0].DocumentType == null) ? "" : selectproperties[0].DocumentType,
                            'LastModifiedTime': selectproperties[0].File.TimeLastModified,
                            'Library': itemsShareWithme[i].LibraryName,
                            'ServerUrl': itemsShareWithme[i].SiteURL,
                            'SubCategory': (selectproperties[0].SubCategory == null) ? "" : selectproperties[0].SubCategory,
                        })
                    }
                }
            }
        }
        getFileDetails = getFileDetails.concat(ShareAllItemswithFolder);
        if(txtTitle != "") {
            var Filenametxt = txtTitle.toString();
            getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.Title.toString().includes(Filenametxt));
        }
        if($("#txtReference").val() != "") {
            getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.DocumentNo.includes($("#txtReference").val()));
        }
        if($("#ddlDocumentType option:selected").val() != "All") {
            getFileDetails = getFileDetails.filter(getFileDetails => getFileDetails.DocumentType.includes($("#ddlDocumentType option:selected").val()));
        }
    }
}



function GetListId(GetdocUrl) {
    const UrlLink = GetdocUrl.split('/Forms')[0];
    var TempDocName = '';
    Documentname = TempDocName = UrlLink.split('/')[UrlLink.split('/').length - 1];
    if (TempDocName == "Shared%20Documents" || TempDocName == "Shared Documents") {
        TempDocName = "Documents";
    }
    withoutLastChunk = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
    GloblSiteurl = withoutLastChunk;
    //https://adaptindia.sharepoint.com/sites/Titan_2_4_QC/adaptindia/DMS/6a80cb64-991e-4461-9dea-1fc36fdfd220/_api/lists/GetByTitle('Documents')/id
    var DynmicUrl = withoutLastChunk + "/_api/lists/GetByTitle('" + TempDocName + "')/id"
    GloblListId = GetListItemById(DynmicUrl);
}

function GetListItemById(UrlLink) {
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;
    $.ajax({
        url: UrlLink,
        method: "GET",
        async: false,
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d;
            Itemid = data.d.Id;
            //console.log("ID- " + dataresults.Id + " | " + dataresults.Description + " | " + dataresults.New_x0020_Column);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
    return Itemid;
}

function GetFileDetails(RestQuery, listName, Siteurl) {
    var FileDetails;
    $.when(getItemsWithQuery(listName, RestQuery, Siteurl)).done(function (docsresults) {
        if (docsresults.length > 0) {
            FileDetails = docsresults;
        }
    });
    return FileDetails;
}

//to download multiple files - Search box
function downloadfiles() {
    if (arrAdSearchFiles.length > 0) {
        for (var index = 0; index < arrAdSearchFiles.length; index++) {
            var url = arrAdSearchFiles[index].ServerURL;
            var a = document.createElement("a");
            a.setAttribute('href', url);
            a.setAttribute('download', '');
            a.setAttribute('target', '_blank');
            a.click();
            if ((index + 1) == arrAdSearchFiles.length) {
                arrAdSearchFiles = [];
                $('.chkFileFolder').prop("checked", "");
            }
        }
    }
    else {
        alert("Please select any file first.");
        return false;
    }
}

function Tablesorting(id, columnIndex) {

    var direction = $("#" + id.id + "").attr('name').split('=');

    if (direction[1] == "asc") {
        $("#" + id.id + "").attr("name", "=desc");
    } else {
        $("#" + id.id + "").attr("name", "=asc");
    }
    table.order([columnIndex, direction[1]]).draw();
}

//to clear all control boxes
function clearAll() {
    $("#txtTitlesearchBox").val("");
    $("#txtContentsearchBox").val("");
    $("#txtReference").val("");
    $("#ddlDocumentType").val("All");
}


//Get all the Documents which are shared with me/shared by me.
function GetDocumentsSharedWithMeSearch(SectionName) {
    //Geenrating the THead of table
    LoggedUserSPGp = GetSPGroupSearch();
    var SharedUserFilter = "";
    for (var gp = 0; gp < LoggedUserSPGp.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + LoggedUserSPGp[gp].Id + "' ";
    }
    var EveryoneUserId = getTargetGroupIdSearch();
    for (var gp = 0; gp < EveryoneUserId.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + EveryoneUserId[gp] + "' ";
    }

    SharedUserFilter = SharedUserFilter.substring(0, SharedUserFilter.length - 1) + ")";

    if (SectionName == 'SharedByMe') {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(Author/EMail eq '" + _spPageContextInfo.userEmail + "' and IsArchive ne 1) ";
    } else if (SectionName == "Archive") {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View') and (PermissionStatus ne 'Deleted') and (IsArchive eq 1)";
    } else {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and PermissionStatus ne 'Revoked'";
    }
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(items) {
        if (SectionName == 'SharedByMe') {
            arrSharedBy = items.filter(function(f) {
                return f;
            });
        } else {
            arrSharedTo = items.filter(function(f) {
                return f;
            });
        }
    });

    return arrSharedTo;
}


function GetSPGroupSearch() {
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
        success: function(data) {
            var arrAllGp = [];
            arrAllGp = data.d.Groups.results;
            if (arrAllGp.length > 0) {
                arrSPGroup = arrAllGp.filter(function(obj) {
                    return obj.OwnerTitle !== "System Account" && obj.Title !== "Contributors" && obj.Title !== "Owners" && obj.Title !== "SPMember" && obj.Title !== "TFW_Employees";
                });
            }
        },
        eror: function(error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    return arrSPGroup;
}

//get GroupId of 'Everyone' and 'All_Employee'
function getTargetGroupIdSearch() {
    var arrEveryOneId = [];
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('ALL_EMPLOYEE')?$select=id";
    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        async: false,
        success: function(data, status, xhr) {
            arrEveryOneId.push(data.d.Id);
        },
        error: function(data, status, error) {
            console.log(data.responseJSON.error);
        }
    });


    return arrEveryOneId;
}

function GetFormDigestValue(SiteUrl) {
    // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
    // You can replace this with other site URL where you want to apply the function
    var dfd = $.Deferred();
    $.ajax({
        url: SiteUrl + "/_api/contextinfo",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            var FormDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            dfd.resolve(FormDigestValue);
            //console.log(FormDigestValue);
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
    return dfd.promise();
}

function getItemsWithQueryUsersDocuments(ListName, Siteurl) {
    var dfd = $.Deferred();
    //var siteurl = Siteurl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items?$select=Acknowledgement,ID,File_x0020_Type,ServerRedirectedEmbedUri,DocumentNo,PermissionLevel,DocumentType,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File";
    var siteurl = Siteurl + "/_api/Web/GetFolderByServerRelativeUrl('" + ListName + "')?$select=Author/Title,ID,EncodedAbsUrl,File_x0020_Type,DocumentWrittenBy&$expand=Author,Folders,Folders/ListItemAllFields/HasUniqueRoleAssignments,Files/ModifiedBy/Title,Files/ListItemAllFields/HasUniqueRoleAssignments,Folders/ListItemAllFields,Files,Files/ListItemAllFields,Files/ListItemAllFields/FileSizeDisplay&$orderby=Modified desc";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
            alert(error.responseJSON.error.message.value);
        }
    });
    return dfd.promise();
}

function removeDuplicates(array) {
    let uniq = {};
    return array.filter(obj => !uniq[obj.DocumentID] && (uniq[obj.DocumentID] = true))
}

