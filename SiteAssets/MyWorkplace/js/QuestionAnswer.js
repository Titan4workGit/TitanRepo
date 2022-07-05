$( document ).ready(function() {
	EnvironmentalSettingsWorkplace();
	//LoadQuestioninworkplace();
	CheckUserPermissionForAttendanceRegister();
	
    var Menu_QuestionAnswer_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/QuestionAnswer.aspx?Mode=Add&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Myworkplace.aspx";
  	$('.question-plus').attr('href', Menu_QuestionAnswer_link);
  	
  	var Menu_QuestionAnswer_viewlink=  _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewQuestionAnswer.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Myworkplace.aspx";
  	$('#ViewQuestion').attr('href', Menu_QuestionAnswer_viewlink);

});

function EnvironmentalSettingsWorkplace()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EnvironmentalSettings')/items?$filter=Title eq 'QuestionAnswer' and Active eq '1' &$ Top=1"; 
	$.ajax({  
    url: Ownurl,
    async: false,  
    headers: { Accept: "application/json;odata=verbose" },  
    success: function (data) 
	{
		var items = data.d.results;  
		if (items.length > 0) 
		{
			if(items[0].Formats == "Format 2")
			{
				
				$("#QuestionDiv").css("display", "block");				
				LoadQuestioninworkplace();
			}
			else
			{
				$("#QuestionDiv").css("display", "none");
			}								
		}  
	},
	error: function (data) 
	{  
       	console.log(data);
	}  
	});  
}



function LoadQuestioninworkplace()
{
	var Ownurl='';
	var today = new Date();
	var CurrentDate=today.toISOString().substring(0, 10);
	Ownurl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Questions_Master')/Items?$filter=Active eq '1'and ApprovalStatus eq 'Approved'&$expand=Author/Id&$select=*,Author/Name,Author/Title&$top = 10&$orderby=Modified desc";

    $.ajax({
    url: Ownurl,
    headers: { Accept: "application/json;odata=verbose" },
    async: false,
    success: function (data) 
	{	
    	var items = data.d.results;
    	for (var i = 0; i < items.length; i++) 
        {
        	var AuthorTitle=items[i].Author.Title;
        	var postDate=formatDateQuestion(items[i].Created);
        	var PostID=items[i].ID;
        	var PostTitle=add3Dots(items[i].Title , 35);
        	var ReplyCounter = items[i].TotalReply;
        	var LastReplyBy = items[i].LastAnswerBy;
        	
        	var viewItem = "../Pages/QAPost.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId')+"&ItemId="+PostID+"&Mode=View&sourcelocation=../Pages/Myworkplace.aspx";
        	QuestionDesign(AuthorTitle,postDate,PostID,PostTitle,viewItem,ReplyCounter,LastReplyBy);
            	         	
        }
        $("#QuestionList").append(QuestionDesignHtml);
	}, 
	error: function (data)
	{
		console.log('error');
    }
	});
}


function add3Dots(string, limit)
{
  	var dots = "...";
  	if(string.length > limit)
  	{
  		string = string.substring(0,limit) + dots;  // you can also use substr instead of substring
  	}
    return string;
} 


var QuestionDesignHtml='';
function QuestionDesign(AuthorTitle,postDate,PostID,PostTitle,viewItem,ReplyCounter,LastReplyBy)
{
	QuestionDesignHtml=QuestionDesignHtml+"<div class='question-section'>"+
		"<h4 class='question-text-head event-text-head-new'><a href="+viewItem+">"+PostTitle+"</a></h4>"+
        "<p><span>"+postDate+"</span> |  <span>"+AuthorTitle+"</span> |  <span>Replies : "+ReplyCounter+"</span></p>"+
	"</div>"+
    "<hr class='question'>";
}


function formatDateQuestion(d) 
{
	var date = new Date(d);
	if ( isNaN( date .getTime())){ return d; }
    else{
         var month = new Array();
         month[0] = "Jan";
         month[1] = "Feb";
         month[2] = "Mar";
         month[3] = "Apr";
         month[4] = "May";
         month[5] = "Jun";
         month[6] = "Jul";
         month[7] = "Aug";
         month[8] = "Sept";
         month[9] = "Oct";
         month[10] = "Nov";
         month[11] = "Dec";
         day = date.getDate();
         var year=date.getFullYear();
         if(day < 10){day = "0"+day; }
         return    day  + " " +month[date.getMonth()] + " " +year;
         }
}






function CheckUserPermissionForAttendanceRegister()
{
var txtCompanyId =titanForWork.getQueryStringParameter("CompanyId");
var listName='ProcessApprovers';
   var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and (WebPartName eq 'HR Admin')";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
            if(valuesArray.length>0)
            {
                 	var AttendanceRegister_link =  _spPageContextInfo.webServerRelativeUrl + "/Pages/AttendanceRegister.aspx?WebAppId="+ txtCompanyId +"&sourcelocation=../Pages/Myworkplace.aspx";
             	$('#AttendanceRegister').attr('href', AttendanceRegister_link);
             	$('#AttendanceRegister').show();
             	

            
             }
            else
            {
             $('#AttendanceRegister').hide();      
            }

             },
        error: function (data) {
            console.log(data.responseJSON.error);

        }
        
    });


}
