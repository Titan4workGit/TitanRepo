var arrContributorIds = [];
var companyID='';
$(document).ready(function() {
companyID=titanForWork.getQueryStringParameter('CompanyId');

    getTech_HR_Admin();
    userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
    setInterval(function(){ 
    	$('#siteanalytics').contents().find('.sp-PopularContent-List').hide();
		$('#siteanalytics').contents().find('.sp-PopularContent-Header').hide();
		$('#siteanalytics').contents().find('.sp-SiteHubList-listView').hide();
		$("#s4-workspace").addClass("WebAnalytics_Adoption");
    }, 3000);
});
	
$(window).load(function() {
	$('#siteanalytics').contents().find('.sp-PopularContent-List').hide();
	$('#siteanalytics').contents().find('.sp-PopularContent-Header').hide();
	$('#siteanalytics').contents().find('.sp-SiteHubList-listView').hide();
	$("#ctl00_PlaceHolderMain_ctl01_label").show();
	$("#ctl00_PlaceHolderMain_ctl01_label").text('Adoption');
	$("#ctl00_PlaceHolderMain_ctl01_label").css({"font-size":"24px", "font-weight":"600", "float":"left"});
	$("#ctl00_PlaceHolderMain_ctl01_label" ).after( "<button type='button' id='btnRedirect' style='float:right;'>Close</button>" );
	$("#btnRedirect").click(function () {
		location.href = "../Pages/Default.aspx"
    });
});

function GraphAccessTokenTogetUserDetails() {
    var deferred = new jQuery.Deferred();
    var requestHeaders = {
        'X-RequestDigest': $("#__REQUESTDIGEST").val(),
        "accept": "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata"
    };
    var resourceData = {
        "resource": "https://graph.microsoft.com",
    };
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.OAuth.Token/Acquire",
        headers: requestHeaders,
        type: "POST",
        data: JSON.stringify(resourceData),
        success: function(data) {
            var msGraphToken = data.access_token;
            WebAnalytics(msGraphToken);
            deferred.resolve(msGraphToken);
        },
        error: function(jqxr, errorCode, errorThrown) {
            console.log(jqxr.responseText);
            deferred.reject(jqxr.responseText);
        }
    });
    return deferred.promise();
}
GraphAccessTokenTogetUserDetails();


//Get details from SP list
function getTech_HR_Admin() {
    var dfd = $.Deferred();
	var Query = "?$select=ID,WebPartName,Contributors/ID,Contributors/Name,Company/Title&$expand=Contributors/Title,Contributors/Name,Company/Id&$filter=(WebPartName eq 'Tech Admin' or WebPartName eq 'HR Admin') and (CompanyId eq '" + companyID + "')";    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items/" + Query,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            if(data.d.results.length > 0){
	            for (var i = 0; i < data.d.results.length; i++) {
	            	value = data.d.results[i].Contributors.results;
	            	for (var j = 0; j < value.length; j++) {
	            		arrContributorIds.push(value[j].ID);
	            	}
				}
				arrContributorIds = arrContributorIds.filter(function(elem, index, self) {//remove duplicate elements.
      				return index === self.indexOf(elem);
  				});
			}
			IsUserTech_HR_Admin();
        },
        error: function (error) {
            dfd.reject(error)
            console.log(error);
        }
    });
    return dfd.promise()
}

//to check logged In user is Tech or HR adminn
function IsUserTech_HR_Admin(){
	var loggedInUserId = _spPageContextInfo.userId;
	if(arrContributorIds.indexOf(loggedInUserId) == -1){//Bind Iframe
		$("#siteanalytics").hide();
		$("#DivNotAccess").show();	
	}
	else{												//can access
		$('#siteanalytics').attr('src', "../_layouts/15/siteanalytics.aspx");
		$("#DivNotAccess").hide();										
	}
}
var odurlGraphUserRestQuery = "https://graph.microsoft.com/beta/reports/getSharePointSiteUsageDetail(period='D7')"
var _NextToken;

function WebAnalytics(token) {
	var WebUrl = "../_api/site/usage"
    _NextToken = token;
    $.ajax({
        url: WebUrl,
        dataType: 'json',
        headers: {
            //"Authorization": "Bearer " + token
            "Accept": "application/json; odata=verbose"
        },
        accept: "application/json;odata.metadata=none",
        async: false,
        success: function(data) {
       getsharePointUsageReportData(reqUrl);
         },
        eror: function(data) {
        debugger
            console.log('error');
        }


});

}
var reqUrl = "https://graph.microsoft.com/v1.0/reports/getSharePointSiteUsageDetail(period='D30')";  
  
function getsharePointUsageReportData(reqUrl) {  
   
        console.log("Inside get user last logon data method!!!");  
        var sharePointUsageRes = httpGet(encodeURI(reqUrl), _NextToken);  
        if (sharePointUsageRes.statusCode == 200) {  
            failIndex = 0;  
            var parsedJson = convertCSVToJSON(sharePointUsageRes.body.toString('utf-8'));  
            //add use case value to json valued array  
            var parsJson = JSON.parse(parsedJson);  
            if (parsJson) {  
                siteCollectionCount = siteCollectionCount + parsJson.length;  
                for (var i = 0; i < parsJson.length; i++) {  
                    var currItem = parsJson[i];  
                    if (currItem) {  
                        //process your data here  
                    }  
                }  
            }  
            console.log("Site Collection count : " + siteCollectionCount);  
        } else {  
         console.log("API received the failed response, Please check again");
            }  
         
    } 
    


//The below method is using to convert the csv values to json values  
function convertCSVToJSON(csv) {  
    /// <summary>This function is used to convert CSV to JSON</summary>   
    /// <param name="csv" type="String">CSV string</param>  
    /// <returns type="Array">Return as JSON Array</returns>  
    try {  
        var lines = csv.split("\n");  
        var result = [];  
        var headers = lines[0].split(",");  
        for (var i = 1; i < lines.length; i++) {  
            var obj = {};  
            if (lines[i]) {  
                var currentline = lines[i].split(",");  
                for (var j = 0; j < headers.length; j++) {  
                    obj[headers[j]] = currentline[j];  
                }  
                result.push(obj);  
            }  
        }  
        return JSON.stringify(result);  
    } catch (ex) {  
        console.log(ex + " in csvToJSON method...");  
    }  
}  


