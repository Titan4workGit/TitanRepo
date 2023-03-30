var currentCompanyid="";

$(document).ready(function(){
 userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
})

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http,$window) 
{ 

$('#langClickEvent').click(function(){

$("[data-localize]").each(function (i, el) 
	{
		try
	 	{
				var controlLabelText=$(this).attr('data-localize');
				if(controlLabelText=="ClickHereForLocation")
				{
			     	$(this).html($('#ClickHereForLocationLocal').text());
				}			
         }
         catch(ex)
         {}
     }); 

});


     currentCompanyid=titanForWork.getQueryStringParameter("CompanyId");	
     $scope.selectedCompanyId=currentCompanyid;
	$scope.company=currentCompanyid;
    $scope.GetOfficeLocation = function ()
    {		
			$http({
			    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeMapUrl,Region,Address,City,State,Country,PinCode,TelephoneNo,EmailID,ContactPerson,ContactNo,OfficeName,CompanyID/ID,CompanyID/CompanyName&$expand=CompanyID&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + $scope.selectedCompanyId+ "'",
				method: "GET",
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {		
              $scope.showOffice =response.data.d.results;		              		  
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });		
    }
    setInterval(function(){ $('#langClickEvent').trigger('click'); }, 3000);
  $scope.GetCompaniesList = function ()
  {
    $http({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Companies')/items?$select=ID,CompanyName",
        method: "GET",
        headers: { "Accept": "application/json;odata=verbose" }
    }).then(function mySuccess(response)
    {
        var companiesListArray = new Array();
       // var item1 = {};
       // item1.ID = "0";
       //  item1.CompanyName = "All";
       //  companiesListArray.push(item1);
        for (var s = 0; s < response.data.d.results.length; s++)
        {
            var item = {};
            item.ID = response.data.d.results[s].ID.toString();
            item.CompanyName = response.data.d.results[s].CompanyName;
            companiesListArray.push(item);
        }
        $scope.companiesListArray = companiesListArray;
       
    }, function myError(response)
    {
        $scope.myWelcome = response.statusText;
    });
}
	$scope.GetOfficeLocationUrl = function (officeMapUrl)
    {		
	
         var linkurkActivity = officeMapUrl;//"https://www.google.com/maps/embed?q="+adderessValue+cityValue+stateValue+pinccodeValue+countryValue;
	     $scope.linkurl= "<iframe src='"+linkurkActivity+"' width='564' height='450' frameborder='0' style='border:0' allowfullscreen></iframe>"
         var myEl = angular.element( document.querySelector('#myDIVID' ));
		 myEl.html(''); 
         myEl.append($scope.linkurl); 
	}

});