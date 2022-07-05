//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var Occasions= function () {
	this.EmployeeOccasions=$(".employeeOccasions");
	this.CompanyId;
	this.DOB_DOA_Found=false;
	this.DefaultThoughtOfTheDayExcuted=false;
};

Occasions.prototype.InitializeControls= function(){
 	 var Handler=this;
 	 var welcomePageCalled=titanForWork.getQueryStringParameter('WelcomePageCalled');
	 
	 if(welcomePageCalled!=undefined)
	 {
		 Handler.CompanyId =  titanForWork.getQueryStringParameter("CompanyId");
		 
		 /*$.when(objOccasions.DisplayBirthday()).done(function(birthdayStatus){
	    	objOccasions.DisplayMarriageAnniversary().done(function(anniversaryStatus){
	    		if(birthdayStatus==false && anniversaryStatus==false)		// If None of Birthday or Anniversary Found then Show Thought of The Day.
	    		{
	    			objOccasions.DisplayThoughtOfTheDayOccassion(false);			
	    		}
	    	})
		})*/
		
		$.when(objOccasions.GetEmployeesDOB_DOA()).done(function(DOB_DOA_Found){
    		if(DOB_DOA_Found==false)				// If None of Birthday or Anniversary Found then Show Thought of The Day.
    		{
    			objOccasions.DisplayThoughtOfTheDayOccassion(false);			
    		}
	    })
	}
}

Occasions.prototype.BindEvents = function () {
     var Handler = this;
     
};

var employeeOccasionListItemCollection = new Array();
Occasions.prototype.GetEmployeesDOB_DOA = function GetEmployeesDOB_DOA()
{
	var Handler=this;
	var deferred=$.Deferred();
    var restQuery = "Company/ID eq '" + Handler.CompanyId + "' and Status eq 'Active'";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/items?$select=ID,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title&$orderby=FullName&$expand=LogonName&$filter=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++)
            {
                var empItemID = items[i].ID;
                var fullName = items[i].LogonName.Title;
                if (fullName == null || fullName == "") {
                    fullName = "NA";
                }
                
                //date of birth condition
                var dobDay = items[i].DayOfBirth;
                var dobMonth = items[i].MonthOfBirth;
                var currentDate = new Date();
                var currentDay = currentDate.getDate();
                var currentMonth = currentDate.getMonth();
                var currentYear = currentDate.getFullYear();
                var id = items[i].ID;
                
                if(objOccasions.GetLast7DaysData(dobDay, dobMonth) == true)
                {       
                    var occasionType = "Happy Birthday";
                    var occasionDate = parseInt(dobDay) + "/" + parseInt(dobMonth);                  
                    if (items[i].DateOfBirth != null)
                    {
                    	var employeeProperties={};
                    	
                    	occasionDate=new Date(items[i].DateOfBirth);
                    	employeeProperties.occasionDay=dobDay;
                    	employeeProperties.occasionMonth=dobMonth ;
                    	employeeProperties.occasionDate=occasionDate;
                    	employeeProperties.occasionType=occasionType;
                    	employeeProperties.fullName=fullName;
                        
                        employeeOccasionListItemCollection.push(employeeProperties);
                        
                        Handler.DOB_DOA_Found=true;
                    }
                }
                var dOADay = items[i].DayOfAnniversary;
                var dOAMonth = items[i].MonthOfAnniversary;
                if (objOccasions.GetLast7DaysData(dOADay, dOAMonth) == true) 
                {
                    var occasionType = "Happy Anniversary";
                    var occasionDate = parseInt(dOADay) + "/" + parseInt(dOAMonth);
                    if (items[i].DateOfAnniversary != null) {
	                    var employeeProperties={};
	                    
	                    occasionDate=new Date(items[i].DateOfAnniversary);
                    	employeeProperties.occasionDay=dOADay;
                    	employeeProperties.occasionMonth=dOAMonth;
                    	employeeProperties.occasionDate=occasionDate;
                    	employeeProperties.occasionType=occasionType;
                    	employeeProperties.fullName=fullName;

                        employeeOccasionListItemCollection.push(employeeProperties);
                         
                        Handler.DOB_DOA_Found=true;
                        
                    }
                }
			    /////////////////////////////////
            }
           objOccasions.GenerateHTML(employeeOccasionListItemCollection);
           deferred.resolve(Handler.DOB_DOA_Found);
           
		}, eror: function (data) {
            console.log('error');
        }
    });
    return deferred;
}

Occasions.prototype.GenerateHTML=function GenerateHTML(occasionItemCollection)
{
occasionItemCollection=occasionItemCollection.sort(function(a, b){
    var a1= a.occasionDay, b1= b.occasionDay;     //sorting the array value
    if(a1== b1) return 0;
    return a1< b1? 1: -1;
})
	
	var Handler=this;
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for (var index = 0; index < occasionItemCollection.length; index++)
    {
		if(index ==0)
		{
			var occasionsHTML='<div class="item bday-bg active"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
		}
		else
		{
			var occasionsHTML='<div class="item bday-bg"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
		}
		
		occasionsHTML+='<div class="curve-box">'+occasionItemCollection[index].occasionDate.getDate() +" "+month[occasionItemCollection[index].occasionDate.getMonth()]+'</div></div>';
		occasionsHTML+='<div class="media-body pt-10 "><div class="col-sm-10">';
		occasionsHTML+='<div class="text-left ocasion-text ">'+occasionItemCollection[index].occasionType +'</div>';
		occasionsHTML+='<div class=" ocasion-text2 mt-5">'+occasionItemCollection[index].fullName+'</div></div>';
		occasionsHTML+='<span class="congrats-btn">';
		occasionsHTML+='<a style="cursor:pointer;" href="../Pages/ViewOccasion.aspx?WebAppId='+Handler.CompanyId+'&undefinedstr=undefinedstr" data-localize="WishAll"></a>';
		occasionsHTML+='</span></div></div></div>';
		
		Handler.EmployeeOccasions.append(occasionsHTML);
	}
}

Occasions.prototype.GetLast7DaysData=function GetLast7DaysData(days,months)
{
    var retufnFlag = false;
    var dobDay =parseInt(days);
    var dobMonth =parseInt( months);
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    currentMonth = currentMonth + 1;
    var firstDay = currentDay-1;
    var secondDay =currentDay-2;
    var thirdday = currentDay-3;
    var fourthday = currentDay-4;
	var fifthday = currentDay-5;
    var sixthday = currentDay-6;
    var seventhday = currentDay-7;
    
  	//31,30,29,28,27,26,25,24,23  // 1,2,3,4,5,6,7,8
    if (dobDay >=currentDay - 7)
    {
       if (dobDay >= 22 && currentDay<7)
       {
            if (dobMonth == currentMonth)
            {
                if (dobDay <= currentDay)
                {
                    retufnFlag = true;
                }
            }
        }
        else if (dobDay <= currentDay)
        {
            if (dobMonth == currentMonth)
            {
                retufnFlag = true;
            }
        }
    }
    return retufnFlag;
}



Occasions.prototype.GetListItems = function GetListItems(webUrl,listTitle, query) 
{
    var url = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getitems"; 
    var queryPayload = {  
               'query' : {
                      '__metadata': { 'type': 'SP.CamlQuery' }, 
                      'ViewXml' : query  
               }
    };

    return $.ajax({
           url: url,
           method: "POST",
           data: JSON.stringify(queryPayload),
           headers: {
              "X-RequestDigest": $("#__REQUESTDIGEST").val(),
              "Accept": "application/json; odata=verbose",
              "content-type": "application/json; odata=verbose"
           }
     });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Display Employee Birthday (Display Last 7 Days Birthday) /////////////////////////////////////////////////
Occasions.prototype.DisplayBirthday = function DisplayBirthday()
{
	var deferred=$.Deferred();
	var Handler=this;
	Handler.CompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	var todayDate = new Date();
	// Logics to Get Last 7 Days's Day and Month
	var lastWeek= new Date(todayDate.setDate(todayDate.getDate() - 7));
	var lastWeekMonth = lastWeek.getUTCMonth() + 1; //months from 1-12
	var lastWeekDay = lastWeek.getUTCDate();
	
	// Logics to Get Today's Day and Month
	var todayDate2=new Date();
	var todayMonth = todayDate2.getUTCMonth() + 1; //months from 1-12
	var todayDay = todayDate2.getUTCDate();
	
	var query = "<View><Query><Where><And><Geq><FieldRef Name='DayOfBirth' /><Value Type='Number'>"+ lastWeekDay +"</Value></Geq><And><Leq><FieldRef Name='DayOfBirth' /><Value Type='Number'>"+todayDay+"</Value></Leq><And><Geq><FieldRef Name='MonthOfBirth' /><Value Type='Number'>"+ lastWeekMonth +"</Value></Geq><And><Eq><FieldRef Name='Company_x003a_ID' /><Value Type='Lookup'>"+Handler.CompanyId+"</Value></Eq><Eq><FieldRef Name='Status' /><Value Type='Text'>Active</Value></Eq></And></And></And></And></Where><OrderBy><FieldRef Name='DayOfBirth' Ascending='False' /></OrderBy></Query></View>";
	
	objOccasions.GetListItems(_spPageContextInfo.webAbsoluteUrl,'Employees',query)
	.done(function(data)
	{
	     var items = data.d.results;
	     for(var i = 0; i < items.length;i++) {
	     	var employeeName=items[i].FullName;
	     	var dateOfBirth=new Date(items[i].DateOfBirth);
	     	
	    	if(i==0)
	    	{
				var occasionsHTML='<div class="item bday-bg active"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
			}
			else
			{
				var occasionsHTML='<div class="item bday-bg"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
			}
			occasionsHTML+='<div class="curve-box">'+dateOfBirth.getDate() +" "+month[dateOfBirth.getMonth()]+'</div></div>';
			occasionsHTML+='<div class="media-body pt-10 "><div class="col-sm-10">';
			occasionsHTML+='<div class="text-left ocasion-text"></div>';
			occasionsHTML+='<div class=" ocasion-text2 mt-5">'+employeeName+'</div></div>';
			occasionsHTML+='<span class="congrats-btn">';
			occasionsHTML+='<a style="cursor:pointer;" href="../Pages/ViewOccasion.aspx?WebAppId='+Handler.CompanyId+'&undefinedstr=undefinedstr" data-localize="WishAll"></a>';
			occasionsHTML+='</span></div></div></div>';
			
			Handler.EmployeeOccasions.append(occasionsHTML);
			
			Handler.DOB_DOA_Found=true;
		}    
		deferred.resolve(Handler.DOB_DOA_Found);
	})
	.fail(
	function(error){
	    console.log(JSON.stringify(error));
	});

	return deferred;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Display Employee Marriage Anniversary (Display Last 7 Days Anniversary) ///////////////////////////////////////////
Occasions.prototype.DisplayMarriageAnniversary = function DisplayMarriageAnniversary()
{
	var deferred=$.Deferred();
	var Handler=this;
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	var todayDate = new Date();
	// Logics to Get Last 7 Days's Day and Month
	var lastWeek= new Date(todayDate.setDate(todayDate.getDate() - 7));
	var lastWeekMonth = lastWeek.getUTCMonth() + 1; //months from 1-12
	var lastWeekDay = lastWeek.getUTCDate();
	
	// Logics to Get Today's Day and Month
	var todayDate2=new Date();
	var todayMonth = todayDate2.getUTCMonth() + 1; //months from 1-12
	var todayDay = todayDate2.getUTCDate();

	var query = "<View><Query><Where><And><Geq><FieldRef Name='DayOfAnniversary' /><Value Type='Number'>"+lastWeekDay +"</Value></Geq><And><Leq><FieldRef Name='DayOfAnniversary' /><Value Type='Number'>"+todayDay +"</Value></Leq><And><Geq><FieldRef Name='MonthOfAnniversary' /><Value Type='Number'>"+lastWeekMonth +"</Value></Geq><And><Eq><FieldRef Name='Company_x003a_ID' /><Value Type='Lookup'>"+Handler.CompanyId+"</Value></Eq><Eq><FieldRef Name='Status' /><Value Type='Text'>Active</Value></Eq></And></And></And></And></Where><OrderBy><FieldRef Name='DayOfAnniversary' Ascending='False' /></OrderBy></Query></View>";
	
	objOccasions.GetListItems(_spPageContextInfo.webAbsoluteUrl,'Employees',query)
	.done(function(data)
	{
	     var items = data.d.results;
	     for(var i = 0; i < items.length;i++) {
	     	var employeeName=items[i].FullName;
	     	var dateOfAnniversary=new Date(items[i].DateOfAnniversary);
	     	
	    	if(i==0 && Handler.DOB_DOA_Found==false)
	    	{
				var occasionsHTML='<div class="item bday-bg active"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
			}
			else
			{
				var occasionsHTML='<div class="item bday-bg"><div class="media pb-5 pt-10"><div class="pull-left" href="#">';
			}
			occasionsHTML+='<div class="curve-box">'+dateOfAnniversary.getDate() +" "+month[dateOfAnniversary.getMonth()]+'</div></div>';
			occasionsHTML+='<div class="media-body pt-10 "><div class="col-sm-10">';
			occasionsHTML+='<div class="text-left ocasion-text"></div>';
			occasionsHTML+='<div class=" ocasion-text2 mt-5">'+employeeName+'</div></div>';
			occasionsHTML+='<span class="congrats-btn">';
			occasionsHTML+='<a style="cursor:pointer;" href="../Pages/ViewOccasion.aspx?WebAppId='+Handler.CompanyId+'&undefinedstr=undefinedstr" data-localize="WishAll"></a>';
			occasionsHTML+='</span></div></div></div>';
			
			Handler.EmployeeOccasions.append(occasionsHTML);
			
			Handler.DOB_DOA_Found=true;
		}    
		
		deferred.resolve(Handler.DOB_DOA_Found);
	})
	.fail(
	function(error){
	    console.log(JSON.stringify(error));
	});
	return deferred;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////// Display Thought of The Day If Occasion Not Found And If today's The Thought of The Day Not Found then Display Default Thought of The Day) ///////
Occasions.prototype.DisplayThoughtOfTheDayOccassion = function DisplayThoughtOfTheDayOccassion(showDefaultThought)
{
	var Handler=this;
	if(Handler.DOB_DOA_Found==false && Handler.DefaultThoughtOfTheDayExcuted==false)
	{
		var todayDate=new Date();
		var currentMonth =todayDate.getMonth()+1; 	
		var currentDay= todayDate.getDate();
		
		if(showDefaultThought==false)
		{
			var query ="<View><Query><Where><And><Eq><FieldRef Name='DisplayMonth' /><Value Type='Number'>"+currentMonth +"</Value></Eq><Eq><FieldRef Name='DisplayDay' /><Value Type='Number'>"+currentDay+"</Value></Eq></And></Where><OrderBy><FieldRef Name='ID' Ascending='False'/></OrderBy></Query><Limit>1</Limit></View>";
		}
		else if(showDefaultThought==true)
		{
		 	var query ="<View><Query><Where><Eq><FieldRef Name='IsDefault' /><Value Type='Boolean'>1</Value></Eq></Where></Query><OrderBy><FieldRef Name='ID' Ascending='False'/></OrderBy><Limit>1</Limit></View>";
		}
	
		objOccasions.GetListItems(_spPageContextInfo.webAbsoluteUrl,'ThoughtOfTheDay',query)
		.done(function(data)
		{
		    var items = data.d.results;
		    if(items.length>0)
		    {
		    	var currentLanguage=objOccasions.GetCurrentLanguage();
		    	if(currentLanguage=='DefaultLanguage')
                {
                    var thoughts='Title';
                }
                else
                {
                    var thoughts=currentLanguage;
                }

			    var thoughtOfTheDay=items[0][thoughts];
		     	var quotationBy=items[0].QuotationBy;
		     	if(thoughtOfTheDay!=null && thoughtOfTheDay.length > 110)
				{					
					thoughtOfTheDay= thoughtOfTheDay.substring(0,110);
					//thoughtOfTheDay+='.';
				}

		     	var occasionsHTML='<div class="item thought-div thought-bg active"><div class="col-sm-12"><div class="media pb-15 pt-10">';
				occasionsHTML+='<div class="media-body"><div class="col-sm-12">';
				occasionsHTML+='<div class="text-left ocasion-text " data-localize="ThoughtOfTheDay"></div>';
				occasionsHTML+='<div class="thought-text ocasion-text2">'+thoughtOfTheDay+'</div></div>';
				
				if(quotationBy!=null || quotationBy!=undefined)
				{
					occasionsHTML+='<span class="quotationby congrats-btn">-'+quotationBy+'</span>';
				}
				occasionsHTML+='</div></div></div></div>';

				Handler.EmployeeOccasions.append(occasionsHTML);
			}
			else
			{
				objOccasions.DisplayThoughtOfTheDayOccassion(true);
				Handler.DefaultThoughtOfTheDayExcuted=true;
			}
		})
		.fail(
		function(error){
		    console.log(JSON.stringify(error));
		});
	}
}


Occasions.prototype.GetCurrentLanguage= function GetCurrentLanguage()
{
	var preferredLanguage;
	if($.cookie.length>0 && $.cookie("Language")!=undefined && $.cookie("Language")!=undefined)
	{	
	 	var preferredLanguageValue=$.cookie("Language");
	 	preferredLanguage=$.cookie("Language").split('#')[0];	// Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
	}
	else
	{
		preferredLanguage='DefaultLanguage';
	}
	
	return preferredLanguage;
}


$(document).ready(function () {
    objOccasions= new Occasions();
    objOccasions.InitializeControls();
});







