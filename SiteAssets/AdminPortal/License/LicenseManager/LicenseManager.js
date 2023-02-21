$(document).ready(function(){
    var CompanyId=titanForWork.getQueryStringParameter('CompanyId');
    UserAuthorization();
    GetClientName();
	$("#closeLicenceManager").click(function(){
		location.href='../Pages/AdminPortal.aspx?WebAppId='+CompanyId;
	});
	
	$("#LiceneceAgreement").prop("href","../Pages/LicenceAgreement.aspx?WebAppId="+CompanyId+"");
	
	//$("#PrivatePolicy").prop("href","../Pages/LicencePolicy.aspx?WebAppId="+CompanyId+"");
	
	LicenseDetails();
	
	$("#Accept").click(function(){
		if($(this).is(':checked')){
		   document.getElementById("btnApply").disabled = false;
        }
        else {
             document.getElementById("btnApply").disabled = true;
       }
	});
});

function LicenseDetails()
{
	licenseValidTill=$.datepicker.formatDate('dd M yy', licenseValidTill);
	GetActiveUsersLicense().done(function(activeUsersLicense)
	{
		$("#licenseActiveUsers").text(activeUsersLicense);	
	});
	
	$("#totalUserLicenses").text(UsersLicenceRequired);
	//var Declined= document.getElementById('Declined');
    var Accept= document.getElementById('Accept');
    if(activeCheck==true){
       Accept.checked = true;
         
       //Declined.checked = false;
       
                   
    }
    else{
        Accept.checked = false;
        Accept.disabled=false;  
        //Declined.checked = true;
        document.getElementById("btnApply").disabled = false;
    }
	
	
	$("#licenseValidTill").text(licenseValidTill);
	$("#adUser").text(UsersLicenceRequired);

}

function GetActiveUsersLicense()
{
	var deferred=$.Deferred();
	var requestURL=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('Employees')/Items?$select=ID,Email&$filter=PrimaryCompany eq 'Primary' and Status eq 'Active'&$top=5000";
	$.ajax({
		url:requestURL,
		type:'GET',
		headers:{"accept": "application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			if(results.length>0)
			{
			 var newArray = [];
    
      $.each(results, function(key, value) {
        var exists = false;
        $.each(newArray, function(k, val2) {
          if(value.Email == val2.Email){ exists = true }; 
        });
        if(exists == false && value.Email != "") { newArray.push(value); }
      });
   
      //return newArray;
                 //var activeUsersLicense=newArray.length;
       				var activeUsersLicense=results.length;
				deferred.resolve(activeUsersLicense);
			}
		},
		error:function(msg)
		{
			BootstrapDialog.alert(msg.responseText);
			deferred.reject(msg.responseText);
		}
	})
	return deferred;
}


function UserAuthorization() {
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    titanForWork.PageAuthorization("ManageCompany", companyId).done(function (currentUserRights, message) {
    debugger;
        if (currentUserRights.length > 0) {
            if ((currentUserRights[0].SiteAdmin == "SiteAdmin") || (currentUserRights[0].TechAdmin == "TechAdmin")) {
                //SP.SOD.executeFunc('sp.js', 'SP.ClientContext', PageLoad_Permissions);
            } else {
                alert(message);
                window.location.href = _spPageContextInfo.webAbsoluteUrl;
            }
        }
    });
}


function GetClientName()
{	debugger;
    var ddlstatus=1;
	var Ownurl="";
	 Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$filter=Status eq 'Active'&$top=5000";
	$.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results; 
            
            $('#licenseActiveGuestUser').text(items.length);
         },
         error:function(msg)
		{
			BootstrapDialog.alert(msg.responseText);
			deferred.reject(msg.responseText);
		}

            
            
      })
      
}      
function declinedLicense(){
  var DataId=$('#txtLicenseId').val();
  var Metadata;    
       Metadata = {
        __metadata: {'type': 'SP.Data.EnvironmentalSettingsListItem'},
        Active: false,
  }
  var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('EnvironmentalSettings')/Items('"+DataId+"')",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
             "IF-MATCH": "*",  
  		    "X-HTTP-Method": "MERGE" 
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            alert('License Declined Successfully');
            dfd.resolve(data);
        },
        error: function (error) {
            alert("Error occured while updating item - " + JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
 
  



