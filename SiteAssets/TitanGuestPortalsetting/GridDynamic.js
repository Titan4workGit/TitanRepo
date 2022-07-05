// in reality we should put this inside our own namespace, but this is just a sample.
var context;
var web;
var user;
var UserdocListId = "";
var GloblListId = "8aaab423-bead-4ca1-b6df-eac10e9d9dca";
var GloblSiteurl = "https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV";



// Called from the ASPX Page
function executeSearch() {
    var query = $("#searchBox").val();

    // run
    //&enablequeryrules='false' &Author='"+_spPageContextInfo.userDisplayName+"'
    SPSearchResults = {
        element: '',
        url: '',

        init: function(element) {
            SPSearchResults.element = element;
            SPSearchResults.url = GloblSiteurl + "/_api/search/query?querytext= '" + query + " * '&rowlimit='50' &sortlist='rank:descending,modifiedby:ascending'  &refinementfilters='and(ListId:(" + GloblListId + "),IsDocument:(true))'";
        },

        load: function() {
            $.ajax({
                url: SPSearchResults.url,
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                },
                success: SPSearchResults.onSuccess,
                error: SPSearchResults.onError
            });
        },

        onSuccess: function(data) {
            var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;


            $("#TableGrid").html("");
            var html = ""
            html += '<thead>' +
                '<tr>' +
                ' <th class="text-left border-bottom-0"><b>File name</b></th>' +
                ' <th class="text-left border-bottom-0" ><b>Title</b></th>' +
                '<th class="text-left border-bottom-0"  ><b>Document Type</b></th>' +
                ' <th class="text-left border-bottom-0"><b>Refrence_no</b></th>' +
                ' <th class="text-left border-bottom-0" ><b>Author</b></th>' +
                ' <th class="text-left border-bottom-0"><b>Date</b></th>' +
                ' <th class="text-center border-bottom-0"><b>Size</b></th>' +
                ' <th class="text-center border-bottom-0"><b>PictureThumbnail</b></th>' +
                ' </tr>' +
                '</thead>' +
                '<tbody >';


            $("#searchResults").html("");




            for (var i = 0; i < results.length; i++) {
                var findUser = results[i].Cells.results[3].Value;
                if (findUser.search(_spPageContextInfo.userDisplayName) >= 0) {

                    html += "<tr>";
                    var d = new Date(results[i].Cells.results[29].Value);
                    var currentDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();


                    html += "<td><a href='" + results[i].Cells.results[5].Value + "' download>" + results[i].Cells.results[2].Value + "</a></td>";
                    html += "<td><span> " + results[i].Cells.results[2].Value + "</span></td>"
                    html += " <td><span> " + results[i].Cells.results[30].Value + "</span></td>";
                    html += " <td><span> " + results[i].Cells.results[2].Value + "</span></td>";
                    html += "<td><span> " + results[i].Cells.results[3].Value + "</span></td>";
                    html += " <td><span>" + currentDate + "</span></td>";
                    html += " <td><span> " + bytesToSize(results[i].Cells.results[4].Value) + "</span></td>";
                    
                    html += " <td><img width='30px' src='"  + results[i].Cells.results[12].Value +  "' alt='docx' data-themekey='#'></td>"
                    html += "</tr>";


                }
            }
            $(".wrapping_box").show();
            $("#TableGrid").html(html);


            if ($.fn.dataTable.isDataTable('#TableGrid')) {
                table.destroy();
                // table.DataTable().clear().destroy();
                table = $('#TableGrid').DataTable({
                    "bPaginate": true,
                    "bJQueryUI": true, // ThemeRoller-stöd
                    "bLengthChange": false,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": true,
                    "bAutoWidth": true,
                    "bProcessing": true,
                    "iDisplayLength": 10,
                    "dom": 'Rlfrtip',
                    "colReorder": {
                        'allowReorder': true
                    },
                    "language": {
                        "searchPlaceholder": "Search"
                    },
                    "columnDefs": [{
                        width: 150,
                        targets: 1
                    }],

                });

            } else {
                table = $('#TableGrid').DataTable({
                    "bPaginate": true,
                    "bJQueryUI": true, // ThemeRoller-stöd
                    "bLengthChange": false,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": true,
                    "bAutoWidth": true,
                    "bProcessing": true,
                    "iDisplayLength": 10,
                    "dom": 'Rlfrtip',
                    "colReorder": {
                        'allowReorder': true
                    },
                    "language": {
                        "searchPlaceholder": "Search"
                    },
                    "columnDefs": [{
                        width: 150,
                        targets: 1
                    }],

                });

            }




        },

        onError: function(err) {
            $("#searchResults").html("<h3>An error occured</h3><br/>" + JSON.stringify(err));
        }
    };

    // Call our Init-function
    SPSearchResults.init($('#searchResults'));

    // Call our Load-function which will post the actual query
    SPSearchResults.load();
}


function GetListItemById(UrlLink) {
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;

    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this with other site URL where you want to apply the function

        // "$select" can be used, if only a defined colmns need to be returned in result set
        url: UrlLink,
        method: "GET",
        async: false,
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose"
        },
        success: function(data, status, xhr) {
            var dataresults = data.d;
            Itemid = data.d.Id;
            //console.log("ID- " + dataresults.Id + " | " + dataresults.Description + " | " + dataresults.New_x0020_Column);
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });

    return Itemid
}


function GetListId() {
    debugger
    const GetListId = $("#txtdmslik").val();
    //alert(GetListId.split('/')[6]);
    const UrlLink = GetListId.split('/Forms')[0];
    var Documentname = UrlLink.split('/')[UrlLink.split('/').length - 1];

    if (Documentname == "Shared%20Documents") {
        Documentname = "Documents";
    }
    // alert("ListName  "+Documentname);
    const withoutLastChunk = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
    GloblSiteurl = withoutLastChunk;
    // alert("SiteUrl "+withoutLastChunk);
    //https://adaptindia.sharepoint.com/sites/Titan_2_4_QC/adaptindia/DMS/6a80cb64-991e-4461-9dea-1fc36fdfd220/_api/lists/GetByTitle('Documents')/id

    var DynmicUrl = withoutLastChunk + "/_api/lists/GetByTitle('" + Documentname + "')/id"

    GloblListId = GetListItemById(DynmicUrl);

    $("#searchContenttxt").show();
    $("#searchContentbtn").show();



}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

