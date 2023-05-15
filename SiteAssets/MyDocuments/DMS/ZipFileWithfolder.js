// set the SharePoint site URL and the selected folders
const selectedFolders = []; // add the selected folders here
var zip; //= new JSZip();
// Set the SharePoint site URL and list name
var listName = 'DemoLibrary';
const myTimeout = "";
var IsleftRestritcfile = false;
async function downloadSelectedFilesAsZip(selectedFolder) {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
        // alert("Script loaded and executed.");
        // here you can use anything you defined in the loaded script
        if(selectedFolder[0].SelectedLibrary == undefined) {
            listName = selectedFolder[0].LibraryName;
        } else {
            listName = selectedFolder[0].SelectedLibrary;
        }
        var fileUrls = [];
        var promises = selectedFolder.map(function(folderUrl) {
            $.when(getFolderFilesAndSubFolders(folderUrl.ServerURL, fileUrls)).done(function(filesss) {
                return promises = filesss;
            });
        });
        var downloadtext = "";
        if(fileUrls.length > 0) {
            Promise.all(promises).then(function() {
                // Compress the files using JSZip
                zip = new JSZip();
                var promisess = fileUrls.map(function(fileUrl) {
                    var file = _spPageContextInfo.portalUrl + fileUrl;
                    /*
                    if(checkFilePermission(fileUrl)) {
                        alert(true)
                    }
                    */
                    return fetch(file).then(function(response) {
                        if(!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob();
                    }).then(function(blob) {
                        var filePath = fileUrl.substring(fileUrl.indexOf(listName) + listName.length + 1);
                        zip.file(filePath, blob);
                    }).catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                });
                Promise.all(promisess).then(function() {
                    // Download the zip file
                    dowloadZip();
                    
                });
            });
        } else {
            alert("No Files in zip download");
            IsleftRestritcfile = false;
            waitingDialog.hide();
        }
    });
}

function dowloadZip() {
    zip.generateAsync({
        type: "blob"
    }).then(function(content) {
        // Download the ZIP file
        var link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "files_" + (new Date().toJSON().slice(0, 20)) + ".zip";
        link.click();
        waitingDialog.hide();
        if(IsleftRestritcfile) {
            alert("Restricted file(s) are skipped to download");
            IsleftRestritcfile = false;
        }
        
                $(".chkFileFolder").prop("checked", false);
                $(".chkShareToMe").prop("checked", false);
                arrFileFolder = [];

        
    });
}

function getFilesFromLibrary(libraryUrl) {
    var endpointUrl = libraryUrl + "/_api/web/lists/getByTitle('DemoLibrary')/items?$select=FileRef&$orderby=FileLeafRef&$filter=FSObjType eq 1";
    $.ajax({
        url: endpointUrl,
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        beforeSend: function() {
            $("#overlaysearch").fadeIn();
        },
        success: function(data) {
            var results = data.d.results;
            var items = [];
            // add each item to the array
            results.forEach(function(item) {
                // get the file name from the URL
                var fileName = item.FileRef.substring(item.FileRef.lastIndexOf('/') + 1);
                // create a new object for the item with a checkbox and the file URL
                var newItem = {
                    name: fileName,
                    url: item.FileRef,
                    checkbox: "<input type='checkbox' name='files' value='" + item.FileRef + "'>"
                };
                items.push(newItem);
            });
            // render the items in a table
            var tableHtml = "<table>";
            tableHtml += "<tr><th>Select</th><th>Name</th></tr>";
            items.forEach(function(item) {
                tableHtml += "<tr><td>" + item.checkbox + "</td><td>" + item.name + "</td></tr>";
            });
            tableHtml += "</table>";
            $("#fileList").html(tableHtml);
            // call the success callback with the table HTML
            // success(tableHtml);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
//getFilesFromLibrary(siteUrl);
// Retrieve all the files and subfolders in a folder
function getFolderFilesAndSubFolders(folderUrl, fileUrls) {
    var endpointUrl = SiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$expand=Folders,Files, ListItemAllFields/EffectiveBasePermissions, Files/ListItemAllFields/EffectiveBasePermissions";
    jQuery.ajax({
        url: endpointUrl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        beforeSend: function() {
            // $("#overlaysearch").fadeIn();
        },
        success: function(data) {
            /*          
              var permissions = new SP.BasePermissions();
                        permissions.initPropertiesFromJson(data.d.ListItemAllFields.EffectiveBasePermissions);
                        if(permissions.has(SP.PermissionKind.viewListItems)) {
                            console.log("User has permission to view the file.");
                            Isnotpermission = true;
                        } else {
                            console.log("User does not have permission to view the file.");
                            Isnotpermission = false;
                        }
            */
            var IsopenItems = parseBasePermissionss(data.d.ListItemAllFields.EffectiveBasePermissions);
            if(IsopenItems != false) {
                var folderFiles = data.d.Files.results;
                folderFiles.forEach(function(file) {
                    if(parseBasePermissionss(file.ListItemAllFields.EffectiveBasePermissions) != false) {
                        fileUrls.push(file.ServerRelativeUrl);
                    } else {
                        IsleftRestritcfile = true;
                    }
                });
                // Recurse into each subfolder and get its files and subfolders
                var subfolders = data.d.Folders.results;
                var promises = subfolders.map(function(subfolder) {
                    getFolderFilesAndSubFolders(subfolder.ServerRelativeUrl, fileUrls);
                });
            } else {
                IsleftRestritcfile = true;
            }
            //  return Promise.all(promises);        
        },
        error: function(error) {
           // IsleftRestritcfile = true;
            console.log(error);
        }
    });
    return fileUrls;
    /*
     return fetch(endpointUrl, {
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async:false
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            // Add all the file URLs to the array
            var folderFiles = data.d.Files.results;
            folderFiles.forEach(function(file) {
                fileUrls.push(file.ServerRelativeUrl);
            });
            // Recurse into each subfolder and get its files and subfolders
            var subfolders = data.d.Folders.results;
            var promises = subfolders.map(function(subfolder) {
                return getFolderFilesAndSubFolders(subfolder.ServerRelativeUrl, fileUrls);
            });
            return Promise.all(promises);
        });
        
        
        */
}

function parseBasePermissionss(value) {
    var permissions = new SP.BasePermissions();
    permissions.initPropertiesFromJson(value);
    /*
    permissions.has(SP.PermissionKind.manageLists);
    permissions.has(SP.PermissionKind.addListItems);
    permissions.has(SP.PermissionKind.deleteListItems);
    permissions.has(SP.PermissionKind.managePermissions);
    var permLevels = [];
    for(var permLevelName in SP.PermissionKind.prototype) {
        if(SP.PermissionKind.hasOwnProperty(permLevelName)) {
            var permLevel = SP.PermissionKind.parse(permLevelName);
            if(permissions.has(permLevel)) {
                permLevels.push(permLevelName);
            }
        }
    }
    */
    return permissions.has(SP.PermissionKind.openItems);
}
var Isnotpermission = false;

function checkFilePermission(fileUrl) {
    // Construct the REST API endpoint URL
    Isnotpermission = false;
    var apiUrl = SiteUrl + "/_api/web/GetFolderByServerRelativePath('" + fileUrl + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields/HasUniqueRoleAssignments,Files/ModifiedBy/Title,Files/ListItemAllFields/HasUniqueRoleAssignments,Folders/ListItemAllFields,Files,Files/ListItemAllFields,Files/ListItemAllFields/FileSizeDisplay&$orderby=Modified desc";
    // Send an AJAX request to the endpoint URL
    $.ajax({
        url: apiUrl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            // Check if the user has the "View" permission on the file
            debugger;
        },
        error: function(error) {
            console.log("Error checking file permissions: " + JSON.stringify(error));
        }
    });
    return Isnotpermission;
}
// Example usage
function retrieveAllItemsFromFolder(libraryName, folderPath) {
    var deferred = $.Deferred();
    var items = [];
    retrieveItems(libraryName, folderPath, null, items);

    function retrieveItems(libraryName, folderPath, skipToken, items) {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + libraryName + "')/items?$top=5000";
        if(folderPath) {
            url += "&$filter=FileDirRef eq '" + folderPath + "'";
        }
        if(skipToken) {
            url += "&$skiptoken=" + encodeURIComponent(skipToken);
        }
        $.ajax({
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                items = items.concat(data.d.results);
                if(data.d.__next) {
                    var nextUrl = data.d.__next;
                    var nextSkipToken = nextUrl.substring(nextUrl.indexOf("skiptoken=") + 10);
                    retrieveItems(libraryName, folderPath, nextSkipToken, items);
                } else {
                    // Call retrieveSubfolders for each subfolder in folderPath
                    retrieveSubfolders(libraryName, folderPath, items).then(function(allItems) {
                        deferred.resolve(allItems);
                    }).fail(function(error) {
                        deferred.reject(error);
                    });
                }
            },
            error: function(error) {
                deferred.reject(error);
            }
        });
    }

    function retrieveSubfolders(libraryName, folderPath, items) {
        var subfoldersDeferred = $.Deferred();
        var subfoldersUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + libraryName + "')/GetFolderByServerRelativeUrl('" + folderPath + "')/folders";
        $.ajax({
            url: subfoldersUrl,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                var subfolders = data.d.results;
                // Use jQuery's map function to create an array of promises
                // that call retrieveItems for each subfolder
                var subfolderPromises = $.map(subfolders, function(subfolder) {
                    var subfolderPath = subfolder.ServerRelativeUrl;
                    return retrieveItems(libraryName, subfolderPath, null, items);
                });
                // Use jQuery's when function to wait for all promises to resolve
                // and then concatenate the results
                $.when.apply($, subfolderPromises).done(function() {
                    var subfolderItems = [];
                    for(var i = 0; i < arguments.length; i++) {
                        subfolderItems = subfolderItems.concat(arguments[i]);
                    }
                    var allItems = items.concat(subfolderItems);
                    subfoldersDeferred.resolve(allItems);
                }).fail(function(error) {
                    subfoldersDeferred.reject(error);
                });
            },
            error: function(error) {
                subfoldersDeferred.reject(error);
            }
        });
        return subfoldersDeferred.promise();
    }
    return deferred.promise();
}
// When the user clicks a button, download the selected folders and subfolders as a ZIP file
