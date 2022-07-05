var PostReplyerEmail = '';
var PostReplyerName = '';
var QuestionPostBy = '';
var G_TotalReply = '';
var G_QuestionID='';
var G_Title='';
var G_Detail='';
var userImageUrl;

$(document).ready(function(){
    var urlmode= $.urlParam('Mode');
    if(urlmode == "View"){LoadQuestion($.urlParam('ItemId'));}
    
    G_QuestionID = $.urlParam('ItemId');
    Get_QuestionView(); 
    //GetEmployeeImg();
    SetLikeBtnValue($.urlParam('ItemId'));
    
    ReadComments_LikesOnPost($.urlParam('ItemId'));
    
    document.getElementById('ParentReply').addEventListener('click', function() {
    	ParentReply();
    	
    }, false);
   
   	PostReplyerName = _spPageContextInfo.userDisplayName;
   	PostReplyerEmail = _spPageContextInfo.userEmail;
   
    $("#ParentComment").emojioneArea({
 		ickerPosition: "right",
    	tonesStyle: "bullet",
		events: {
         	keyup: function (editor, event) {
           		//console.log(editor.html());
           		//console.log(this.getText());
        	}
    	}
	});
	  	
	 	
  	$(".QAPostLike").mouseover(function(){
		$("#Likesonpost").css("display", "none");
		$("#Likesonpost").css("display", "block");
  	});
  	
  	
  	$(".QAPostLike").mouseout(function(){
  		$("#Likesonpost").css("display", "none");
  	});
  	
  	userActivityNotificationEntry();
  	

});


$(function(){
	$(".QAlikesSpan").mouseover(function(){
		var Flag = $(event.target).closest('a').find('id');
		var ElementId = Flag.context.id;		
		$(".LikeListArea").css("display", "none");
		$("#AuthorNameLikes"+ElementId).css("display", "block");
  	});
  	
  	$(".QAlikesSpan").mouseout(function(){
  		$(".LikeListArea").css("display", "none");
  	});
  	
});


/*Get Url Perameters*/
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null){return results="null";}
	else{
		return results[1] || 0;
	}
}
var userDesignation='';
var userDepartment='';
var userOfficeLocation='';
var Q_Title='';
var Q_Detail='';
function LoadQuestion(ItemID)
{
	var itemId="";  
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Questions_Master')/items?$filter=ID eq ('"+ ItemID +"')&$expand=Author&$select=*,Author/Id";  
    $.ajax({   
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
			var items = data.d.results;  
            if (items.length > 0) 
			{   
			   if(items[0].ApprovalStatus=="Pending"){
			      if(items[0].AuthorId!=_spPageContextInfo.userId){
			       alert('Access denied');
			       window.location.href="../Pages/ViewQuestionAnswer.aspx?Mode=Add&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/ViewQuestionAnswer.aspx";

			       return false;
			      }
			   }
			   else{
			   
			   }
               
				G_TotalReply = items[0].TotalReply;
				var eventDateObj=new Date(items[0].Created);
				var Event_time = eventDateObj.toTimeString();
				var H = +Event_time.substr(0, 2);
				var h = (H % 12) || 12;
				var ampm = H < 12 ? " AM" : " PM";
				Event_time= h + Event_time.substr(2, 3) + ampm;	

				GetEmployeeImg(items[0].EmployeeCode);
				userImageUrl=employeePicURL ;
				$("#QuestionTitle").text(items[0].Title);
				$("#QuestionDtl").html(items[0].Detail);
				Q_Title=items[0].Title;
				Q_Detail=items[0].Detail;
				var Category=items[0].Category
				if(Category==null){
				  Category='';
				}
				$("#txtCategory").text(Category);
				$("#AuthorName").text(items[0].PublishBy);
				QuestionPostBy = items[0].PublishBy;
				$("#QuestionTime").text(Event_time);
				var TotalView=items[0].TotalView;
				if(TotalView==null){
				  TotalView=0;
				}
				var TotalLikes= items[0].TotalLikes;
				if(TotalLikes==null){
				  TotalLikes=0;
				}
				
				var TotalReply =items[0].TotalReply;
				if(TotalReply ==null){
				  TotalReply =0;
				}
				$('#TotalHitsAnncmnt').text(TotalView);
				$('#TotalLikesAnncmnt').text(TotalLikes);
				$('#TotalCommentsAnncmnt').text(TotalReply);				
				$("#userDepartment").text(userDepartment);
				$("#userOfficeLocation").text(userOfficeLocation);
				$("#userDesignation").text(userDesignation);
				$("#QuestionDate").text(formatDateEvent(items[0].Created));				
				$('#QuestionAuthorImg').attr("src",employeePicURL);			   
            	GetAttachments($.urlParam('ItemId'));				
           	}  
		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
	});	
}


function GetAttachments(ItemId)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Questions_Master')/Items?select=*&$filter=ID eq " + ItemId + "&$expand=AttachmentFiles";
	$.ajax({
        url: Ownurl,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
        },
        async: false,
        success: function (data)
        {
        	var results = data.d.results;
            var totalAttachments = results[0].AttachmentFiles.results.length;
            var itemHTML = "<tr>";
            for(var x=0; x<totalAttachments;x++)
            {            
    			itemHTML += "<th scope=\"row\"><a target='_blank' href='" + results[0].AttachmentFiles.results[x].ServerRelativeUrl + "'>" + results[0].AttachmentFiles.results[x].FileName + "</a></th>";
    			itemHTML += "</tr>";
   			}
   			$(".attachment-badge").append(itemHTML);
        },
        error: function (data){console.log(data);}
    });
}


function formatDateEvent(d) 
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
         if(day < 10){day = "0"+day; }
         return    day  + " " +month[date.getMonth()];
         }
}


var employeePicURL = "";
function GetEmployeeImg(EmpID,type)
{
	var listname,id;
 	var restQuery = "";
		listname = "Employees";
		id = EmpID;
		restQuery = "Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=ID eq '" + id + "'";		    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	var items = data.d.results;
            employeePicURL = "";
           	if (items.length > 0)
          	{
          	  
          	    userDesignation=items[0].Designation;
          	    userDepartment=items[0].Department.Title;
          	    userOfficeLocation=items[0].OfficeLocation.Title;
          	    
           		if(items[0].AttachmentFiles.results.length>0)
           		{
           			if(type == "QA")
           			{
           			     PostEmpPicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
           			}
           			else
           			{
           			     employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
           			}
           		}
           		else
           		{
           			employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           		}
           	}
           	else
           	{
           		employeePicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           	}
		}, 
        error: function (data)
        {
            console.log(data);
        }
    });
}


function Universalinsert(listName,item) 
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
		var ForUploadAttachment = data.d.ID;
		if(FinalFiles4Upload.length>0)
		{	
			uploadattachment(ForUploadAttachment);
			var _conter = parseInt(G_TotalReply) + 1;
			var _UserName = _spPageContextInfo.userDisplayName;
			//UpdateCounter(_conter,_UserName);			
		}
		else
		{	
			var _conter = parseInt(G_TotalReply) + 1;
			var _UserName = _spPageContextInfo.userDisplayName;
			//UpdateCounter(_conter,_UserName);
			ReadComments_LikesOnPost($.urlParam('ItemId'));
		}				
		console.log("add success"); 
	},
	error: function (data) { console.log(data); }
	});
}


function AddComment()
{
	var d = new Date();
	var strDate = d.getDate() + "-";
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var Currentdate=strDate.concat(monthNames[d.getMonth()]);
	if($("#TextComment").val().trim().length>0)
	{
		var DataID=ItemID.toString();
		var listName="AnnouncementsChild";
		var Webpartname="General";
		var comment=$("#TextComment").val().trim();
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Title':comment ,'WebPartName':Webpartname, 'Item_ID':DataID, 'CreateDate':Currentdate};
		Universalinsert(listName,item);
		$(".emojionearea-editor").empty();
		//UpdateCounter();
	}
}


var LikeVal='';
var LikeID='';
function SetLikeBtnValue(ItmID)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq '"+ ItmID +"' and AuthorId eq '"+_spPageContextInfo.userId+"' and PostLike eq 'Yes' or PostLike eq 'No'";  
    $.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data)
    {
    	var items = data.d.results;
    	if (items.length > 0) 
		{	
          	 LikeVal = items[0].PostLike;
           	 LikeID = items[0].ID;             
        }
        else
        {
        	LikeVal ="New";
		}        	
  	},
	error: function (data) 
	{  
       	alert("An error occurred. Please try again.");  
	}  
    });  
}


function AddLike()
{
	SetLikeBtnValue($.urlParam('ItemId'));
	if(LikeVal=="New")
	{
		var listName="QuestionsAnswerReply";
		var DataID=$.urlParam('ItemId').toString();	
		var Like="Yes";
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'PostLike':Like, 'ItemID':DataID};
		InsertLikesValue(listName,item);	
		Get_LikesOnPost();
	}
	else if (LikeVal=="Yes" || LikeVal=="No")
	{	var LikeOnComment ='';
		updateLike(LikeOnComment);
		Get_LikesOnPost();
	}
}

function updateLike(LikeOnComment)  
{
	// LikeOnComment : use for Comment likes for Question like value null.
	// LikeOnComment : use for Comment likes for Comment likes value is Comment Id.
	var likebtnvalue='';
	if(LikeVal == "Yes")
	{
		likebtnvalue ="No";
	}
	else if (LikeVal == "No")
	{
		likebtnvalue="Yes";
	}	
    $.ajax({  
	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('QuestionsAnswerReply')/items('"+LikeID+"')",
	type: "POST", 
    async:false, 
    data: JSON.stringify  
    ({  
    	__metadata: {   type: "SP.Data.QuestionsAnswerReplyListItem" },  
        PostLike: likebtnvalue,
        LikeOnComment :LikeOnComment
	}),  
    headers:  
    {  
		"Accept": "application/json;odata=verbose",  
        "Content-Type": "application/json;odata=verbose",  
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        "IF-MATCH": "*",  
        "X-HTTP-Method": "MERGE"  
	},  
    success: function(data, status, xhr)  
    { 
    	console.log("Data Updated!");
    },  
    error: function(data)  
    {  
    	console.log(data);
    }  
    });
 }
 
 
var PostEmpPicURL = "";
function GetPostEmpPicURL (EmpID)
{
	var listname,id;
 	var restQuery = "";
		listname = "Employees";
		id = EmpID;
		restQuery = "AttachmentFiles,LogonName/EMail&$expand=AttachmentFiles,LogonName&$filter=Email eq '" + id + "'";		    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;
    $.ajax({
    url: Ownurl,
    headers: { Accept: "application/json;odata=verbose" },
    async: false,
    success: function (data) 
    {
      	var items = data.d.results;
        employeePicURL = "";
        if (items.length > 0)
        {
         	if(items[0].AttachmentFiles.results.length>0)
           	{
           		PostEmpPicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
           	}
          	else
           	{
           		PostEmpPicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           	}
		}
        else
        {
           	PostEmpPicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
        }           
	}, 
    error: function (data)
    {
		console.log(data);
    }
    });
}


function ReadComments_LikesOnPost(ItmID,AuthorID)
{
	var QID = $.urlParam('ItemId');
	if(AuthorID == undefined || AuthorID == "All")
	{
    	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq ('"+ QID +"')&$expand=Author/Id,AttachmentFiles&$select=*,Author/Name,Author/Title,AttachmentFiles";  
    }
    else
    {
    	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq ('"+ QID+"') and AuthorId eq '"+AuthorID+"'&$expand=Author/Id,AttachmentFiles&$select=*,Author/Name,Author/Title,AttachmentFiles";  
    }
    $.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data)
    {
    	$("#reply_areabind").empty();
    	var items = data.d.results;  
        var likeCount=[];
        var AuthorList=[];
        if (items.length > 0) 
		{
			var i = 0;
			for (i; i < data.d.results.length; i++)   
           	{                     
            	var value = data.d.results[i]; 
  			    if(value.PostLike == "Yes" && value.PostLike != null && value.LikeOnComment == null)
			    {
			    	likeCount.push(value.PostLike);
			       	AuthorList.push(value.Author.Title);
			    }
			    else
			    {
			        var childReply = value.ChildReply;
			        var Displydiv = "none";
			        if(childReply !=null && childReply !=No)
			        {
			        	Displydiv = "block";
			        }
			        var eventDateObj=new Date(value.Created);
					var Event_time = eventDateObj.toTimeString();
					var H = +Event_time.substr(0, 2);
					var h = (H % 12) || 12;
					var ampm = H < 12 ? " AM" : " PM";
					Event_time= h + Event_time.substr(2, 3) + ampm;
					if(value.AttachmentFiles.results.length>0)
            		{
            			var HideAttachment = "display: block";						
					}	
					else
					{
						var HideAttachment = "display: none";
					}				
			        GetPostEmpPicURL(value.ReplyerEmail);
			        var ReplyDate=formatDateEvent(value.Created);			        
			        var setdisplay = '';
					if(parseInt(value.AuthorId) == _spPageContextInfo.userId){ setdisplay = "display: inline-block"; }else { setdisplay = "display: none"; }
					if(value.ParentReply != null)
					{			        
			        	DesignHtml(i,value.ParentReply,childReply,Displydiv,value.ReplyBy,value.ReplyTo,PostEmpPicURL,ReplyDate,Event_time,value.ID,setdisplay,ServerRelativeUrl,FileName,HideAttachment,value.ReplyAgainst );
			        }   			        	
		        }		        		     
			}			
			$("#reply_areabind").append(Html_Design);			
			
			for(var q=0;q<data.d.results.length;q++)
			{	
				var AttachmentIndex = data.d.results[q];
				AttachmentHtml='';
				OldAttachment='';
				if(AttachmentIndex.AttachmentFiles.results.length>0)
            	{
					for(var p=0; p<AttachmentIndex.AttachmentFiles.results.length; p++)
					{
							var ServerRelativeUrl = AttachmentIndex.AttachmentFiles.results[p].ServerRelativeUrl;
							var FileName = 	AttachmentIndex.AttachmentFiles.results[p].FileName;
							AttachmentDesign(ServerRelativeUrl,FileName,AttachmentIndex.ID);				
					}
					$("#AttachmentsList"+AttachmentIndex.ID).append(AttachmentHtml);
					$("#oldfilename"+AttachmentIndex.ID).append(OldAttachment); 
				}			
			}
			
			var w = 0;
			for (w; w < data.d.results.length; w++)   
           	{	
           		var CommentIDvalue = data.d.results[w]; 
           	   	DisplayCommentLikes(CommentIDvalue.ID);           		   
           	}
           	
          	Html_Design='';
	       	if(likeCount.length < 1)
            {
				$("#Qtotal_likes").text("");
               	$("#Likesonpost").text("");
			}
            else
            {               	
				$("#Qtotal_likes").text(likeCount.length);
				$("#Likesonpost").text(AuthorList);
	        }
		}
		else
        {
        	$("#Qtotal_likes").text("");
        	$("#Likesonpost").text(""); 
        }
         
        SetLikeBtnValue($.urlParam('ItemId'));
        
        $(".ParentComment").emojioneArea({  	
		pickerPosition: "right",
    	tonesStyle: "bullet",
		events: {
         	keyup: function (editor, event) {
           		//console.log(editor.html());
           		//console.log(this.getText());
        	}
    	}
		});		
	
		$(".QAlikesSpan").mouseover(function(){
			var Flag = $(event.target).closest('a').find('id');
			var ElementId = Flag.context.id;		
			$(".LikeListArea").css("display", "none");
			$("#AuthorNameLikes"+ElementId).css("display", "block");
  		});
  	
  		$(".QAlikesSpan").mouseout(function(){
  			$(".LikeListArea").css("display", "none");
  		});		
	},
	error: function (data) 
	{  
    	alert("An error occurred. Please try again.");  
	}  
    });  
}


var AttachmentHtml='';
var OldAttachment='';
function AttachmentDesign(ServerRelativeUrl,FileName,ID)
{
	var deletedata=[];
	deletedata.push([ID,FileName]);
	var Tdivid=FileName.split(".")[0];
	var divid =  Tdivid.slice(0, 5);	
	AttachmentHtml = AttachmentHtml + "<a href='"+ServerRelativeUrl+"'><span>"+FileName+"</span> <span><i class='fa fa-eye'></i></span></a>";
	OldAttachment = OldAttachment + "<div class='QA_OldAttach "+ID+divid+"' id='"+divid+"'><a href='"+ServerRelativeUrl+"'><span>"+FileName+"</span> </a><span><i class='fa fa-trash-o' style='color:red;font-size: large;' onclick='DeleteAttachmentQA(\""+deletedata+"\");'></i></span></div>";
}


function ParentReply()
{
	var listName="QuestionsAnswerReply";
	var TotalComments=$('#TotalCommentsAnncmnt').text();
	var count=(parseInt(TotalComments)+1)
	$('#TotalCommentsAnncmnt').text(count);

	var comment = $(".emojionearea-editor").html();
	var DataID=$.urlParam('ItemId').toString();
	GetImage();	
	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'ParentReply':comment,'ImageUrl':employeePicURL, 'ItemID':DataID,'ReplyBy':PostReplyerName,'ReplyerEmail':PostReplyerEmail,'ReplyTo':QuestionPostBy};
	Universalinsert(listName,item);	
	$(".emojionearea-editor").html('');
	FinalFiles4Upload=[];
	finalFiles = [];
	RemoveDuplicate = [];
	$('.blnkspan').empty();
}


function ChildReply()
{
	var listName="QuestionsAnswerReply";
	var comment = $("#"+ActiveReplyBox+"").find('.emojionearea-editor').html();
	var DataID=$.urlParam('ItemId').toString();
	GetImage();	
	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'ParentReply':comment, 'ImageUrl':employeePicURL, 'ItemID':DataID,'ReplyBy':PostReplyerName,'ReplyerEmail':PostReplyerEmail,'ReplyTo':ChildReplyby,'ReplyAgainst':ReplyAgainstID};
	Universalinsert(listName,item);	
	$("#"+ActiveReplyBox+"").find('.emojionearea-editor').html('');
	FinalFiles4Upload=[];
	finalFiles = [];
	RemoveDuplicate = [];
	$('.blnkspan').empty();
}


var ChildReplyby ='';
var ActiveReplyBox='';
var ReplyAgainstID='';
function SetDisplay(ElementId)
{
	$(".oldfilename").css("display", "none");
	$(".btn_post").show();
	$(".btn_save").hide();
	$(".Replyarea").css("display", "none");
	var ret = ElementId.split("-");
	var str1 = ret[0];
	var str2 = ret[1];
	ReplyAgainstID = str1;
	ChildReplyby = str2;
	ActiveReplyBox="spanChildcomment"+str1;
	$("#comment_area"+str1).css("display", "block");
	$('#spanChildcomment'+str1).find('.emojionearea-editor').html('');
}


var Html_Design='';
function DesignHtml(i,ParentReply,childReply,Displydiv,ReplyBy,ReplyTo,PostEmpPicURL,ReplyDate,Event_time,ID,setdisplay,ServerRelativeUrl,FileName,HideAttachment,ReplyAgainst )
{
   Html_Design= Html_Design+"<div class='col-md-12 col-sm-12 reply-box mt5 CommentBox"+ID+"'>"+
		"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb20 pt0'>"+
			"<span class='mr10'><img src="+PostEmpPicURL+" class='img-circle' width='36' height='36' alt=''/></span>"+
			"<span>"+ReplyBy+"</span> in reply to <a href='#' class='popover-title' data-toggle='modal' data-target='#ReplyModel' onclick='DataInModel("+ReplyAgainst+")'><span>"+ReplyTo+"</span></a> - <span>"+ReplyDate+"</span> at <span> "+Event_time+"</span>"+
		"</div>"+
		"<h4><p id='ReplyNo"+ID+"'>"+ParentReply+"</p></h4>"+
		"<div class='col-md-12 col-sm-12 p0'>"+
		   "<div class='attachment-badge mt-10' style='"+HideAttachment+"' id='AttachmentsList"+ID+"'>"+
				//"<a href='"+ServerRelativeUrl+"'><span>"+FileName+"</span> <span><i class='fa fa-eye'></i></span></a>"+     
		   "</div>"+
		"</div>"+
		"<div class='clearfix'></div>"+
		"<div class='col-md-12 col-md-12 pt10 pl0 pr0 my_relply_like_box' >"+
		  //"<div class='question-like-button' id='"+ID+"'><a onclick='SetChildLikes("+ID+");' id='"+ID+"'><i class='fa fa-thumbs-up'></i> <span>Like</span> </a>&nbsp;<strong><span id='LikesCount"+ID+"' onclick='Displaylikespan(this.id)'></span></strong> </div>"+
			"<span class='question-like-button' ><a onclick='SetChildLikes("+ID+");' id='"+ID+"' class=''><i class='fa fa-thumbs-up QAlikesSpan' id='"+ID+"'></i> <span class='_likebtn'>Like</span> </a>&nbsp;<strong><span id='LikesCount"+ID+"' onclick='' class=''></span></strong> </span>"+
			"<span class='question-reply-button mml5 ml20'><a href='javascript:void(0)' id='"+ID+"-"+ReplyBy+"' onclick='SetDisplay(this.id);' ><i class='fa fa-reply'></i>  <p>Reply</p> </a> </span>"+
			"<span style='"+setdisplay+"'>"+
		    "<span class='question-edit-button mml5 ml20'><a href='javascript:void(0)' id='"+ID+"-"+ReplyBy+"' onclick='EditReply(this.id);'><i class='fa fa-pencil'></i> <p>Edit</p> </a> </span>"+
			"<span class='question-delete-button mml5 ml20'><a href='javascript:void(0)' onclick='DeleteReply("+ID+")'><i class='fa fa-trash'></i> <p>Delete</p> </a> </span>"+
			"</span >"+
		"</div>"+
		"<div class='col-sm-12 my_reply_like_names'><a href='javascript:void(0)'><span style='display:none;' id='AuthorNameLikes"+ID+"' class='LikeListArea'></span></a></div>"+
		"<div id='comment_area"+ID+"' style='display:none;' class='Replyarea question-reply-button mml5'>"+
			"<div class='col-md-12 col-sm-12 comment-box-in p0 '>"+
			  //"<div class='col-lg-11 col-md-10 col-sm-10 col-xs-12 p0 tpb10'><span id='spanChildcomment"+ID+"'><textarea class='form-control custom-control custom-scroll ParentComment' rows='2' id='Childcomment"+ID+"' style='resize:none;'></textarea><a href='#'><i class='fa fa-paperclip comment-attachment'></i></a></span></div>"+ //
				"<div class='col-lg-11 col-md-10 col-sm-10 col-xs-12 p0 tpb10 my_qa_reply_box'><span id='spanChildcomment"+ID+"'><textarea class='form-control custom-control custom-scroll ParentComment' rows='2' id='Childcomment"+ID+"' style='resize:none;'></textarea><div id='drop-zone'><input type='file' style='display: none' id='attachmentBox"+ID+"'></div><a class='my_qa_reply_attach_btn' onclick='initiatefilechosen("+ID+")'><i class='fa fa-paperclip'></i></a></span></div>"+
				"<button type='button' id='post1' class='btn btn-post pull-right pt10 btn_post' onclick='ChildReply()';><label>Post</label></button>"+
				"<button type='button' id='post1' class='btn btn-post pull-right pt10 btn_save' onclick='UpdateChildReply()';><label>Save</label></button>"+
				"<div class='clearfix'></div>"+				
			"</div>"+
		"</div>"+
		"<div id='oldfilename"+ID+"' class='oldfilename' style='padding:0px 0px 0px 10px; display:none;'></div>"+
		"<div id='FileName"+ID+"' class='blnkspan' style='padding:10px 10px 0px 10px;'></div>"+
	"</div>";
}


function DeleteReply(ID)
{ 
	if (confirm('Are you sure to delete this record?')) 
	{
    	$.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('QuestionsAnswerReply')/items('"+ID+"')",  
        type: "POST",  
        headers:  
        {  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "DELETE"  
        },  
        success: function(data, status, xhr)  
        {  
        	var _conter = parseInt(G_TotalReply) - 1;
			var _UserName = _spPageContextInfo.userDisplayName;
			//UpdateCounter(_conter,_UserName);
        	var DataID=$.urlParam('ItemId').toString();
        	$(".CommentBox"+ID).hide();	
        },  
        error: function(xhr, status, error)  
        {  
            $("#ResultDiv").empty().text(data.responseJSON.error);  
        }  
    	}); 
    } 
}


var ItemUpdateID='';
function EditReply(ID)
{	
	$(".oldfilename").css("display", "none");
	$(".btn_post").hide();
	$(".btn_save").show();
	$(".Replyarea").css("display", "none");
	var ret = ID.split("-");
	var str1 = ret[0];
	var str2 = ret[1];
	ItemUpdateID = str1;
	var Text = $("#ReplyNo"+str1).html();
	ActiveReplyBox="Childcomment"+str1;
	$("#comment_area"+str1).css("display", "block");
	$('#spanChildcomment'+str1).find('.emojionearea-editor').html(Text);
	$("#oldfilename"+str1).css("display", "block");	
}


function UpdateChildReply()
{
	var UpdatedReply = $('#spanChildcomment'+ItemUpdateID).find('.emojionearea-editor').html(); //$("#Childcomment"+ItemUpdateID).val().trim();
	GetImage();
	
	$.ajax({  
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('QuestionsAnswerReply')/items('"+ItemUpdateID+"')",
    type: "POST",  
    data: JSON.stringify({  
          __metadata: {  type: "SP.Data.QuestionsAnswerReplyListItem"  },  
            ParentReply: UpdatedReply,
            ImageUrl:employeePicURL
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {
            var DataID=$.urlParam('ItemId').toString();
            if(FinalFiles4Upload.length>0)
			{	
				uploadattachment(ItemUpdateID);
			}
			else
			{            	
            	ReadComments_LikesOnPost(DataID);
            }
        },  
        error: function(data)  
        { 
            alert(data);
        }  
    });
}


var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles = [];
var FinalFiles4Upload=[];
var Tcounter = 0;
var RemoveDuplicate = [];

$(function() 
{
	$("#attachmentBox").on('change', function(e) 
	{
		FinalFiles4Upload =[];
  		var fileNum = this.files.length, initial = 0;
 		$.each(this.files,function(idx,elm)
 		{
       		finalFiles[finalFiles.length]=elm;
		});

		RemoveDuplicate = [];
		var arr = finalFiles.filter(function(el) 
		{
  			if (RemoveDuplicate.indexOf(el.name) == -1) 
  			{
    			RemoveDuplicate.push(el.name);
    			return true;
  			}
			return false;
		});

		FinalFiles4Upload = ReinitializeArray(arr);
		$('#'+G_DispFiles).empty();
  		for (initial; initial < FinalFiles4Upload.length-1; initial++) 
  		{ 
  			$('#'+G_DispFiles).append('<div id="file_'+ Tcounter +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;"></strong></span> ' + RemoveDuplicate[initial] + '<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_'+ Tcounter +'"" title="remove"></span></div>');
   			Tcounter = Tcounter + 1;
  		}
  });
})


function removeLine(id)
{
  	var index = id.split('_')[1];
  	$("#"+id).remove();
  	delete finalFiles[parseInt(index)]; 
  	RemoveDuplicate = [];
	var arr = finalFiles.filter(function(el) {
  	if (RemoveDuplicate.indexOf(el.name) == -1) {
    	RemoveDuplicate.push(el.name);
    	return true;
    }
	return false;
  	});
 	FinalFiles4Upload = ReinitializeArray(arr);
}

function ReinitializeArray(arr) 
{
	var newArr = [];
    var count = 0;
	for (var i in arr) 
	{
    	newArr[count++] = arr[i];
    }
	return newArr;	
}


var getFileBuffer = function (FinalFiles4Upload) 
{
	var deferred = $.Deferred();
	var reader = new FileReader();
	reader.onload = function (e) 
	{
    	deferred.resolve(e.target.result);
	}
	reader.onerror = function (e) 
	{
		deferred.reject(e.target.error);
	}
		reader.readAsArrayBuffer(FinalFiles4Upload);
		return deferred.promise();
};

var F_counter = 0;
var xRequestDigest = $("#__REQUESTDIGEST").val();
function uploadattachment(id) 
{
	var T_counter=0;
	var File_counter=FinalFiles4Upload.length;
	if(FinalFiles4Upload.length>0)
	{
		F_counter = FinalFiles4Upload.length;
	    $.each(FinalFiles4Upload, function(index, value){
		    getFileBuffer(value).then(function (buffer) {
			    $.ajax({
					url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
			    	method: 'POST',
			    	data: buffer,
			    	async: false,
    				processData: false,
    				headers: 
    				{
    	  				"Accept": "application/json;odata=verbose",
    	  				"content-type": "application/json;odata=verbose",
    	  				"X-RequestDigest": xRequestDigest
    				},
    				success: function (data)
    				{    					
    					console.log("Doc Uploaded.");
    					T_counter = T_counter+1;    					
    					if(parseInt(F_counter) == parseInt(T_counter))
    					{
    						$('.blnkspan').empty();
							console.log("All Document Uploaded!");
   							ReadComments_LikesOnPost(DataI='');
   						}    					     					
    				},
    				error: function (data) 
    				{
    					console.log(data);
    				}
    			});
			});
		});  
   }   
}


function DataInModel(ID)
{	
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ID eq ('"+ ID +"')&$expand=Author/Id,AttachmentFiles&$select=*,Author/Name,Author/Title,AttachmentFiles";  
   	$.ajax({  
   	url: Ownurl,  
   	headers: { Accept: "application/json;odata=verbose" },  
   	async:false,  
   	success: function (data)
   	{
   	 	$("#_appendmodeldata").empty();
   	  	var items = data.d.results;  
   	    if (items.length > 0) 
		{
			var i = 0;
		   	for (i; i < data.d.results.length; i++)   
   	    	{                      
  	       		var value = data.d.results[i]; 
		        if(value.PostLike != "No" && value.PostLike != null )
		        {
		        	likeCount.push(value.PostLike);
		        	AuthorList.push(value.Author.Title);
		        }
		        else
		        {
			        var ReplyDate=formatDateEvent(value.Created);
			        var eventDateObj=new Date(value.Created);
					var Event_time = eventDateObj.toTimeString();
					var H = +Event_time.substr(0, 2);
					var h = (H % 12) || 12;
					var ampm = H < 12 ? " AM" : " PM";
					    Event_time= h + Event_time.substr(2, 3) + ampm;
				    ModelHtmlDesign(ReplyDate,Event_time,value.ParentReply,value.ReplyBy);
				}
   	      	}
		}
		else
		{
			var ReplyDate = $("#QuestionDate").text();
			var Event_time = $("#QuestionTime").text();
			var ParentReply = $("#QuestionTitle").text();
			var ReplyBy = $("#AuthorName").text();
				ModelHtmlDesign(ReplyDate,Event_time,ParentReply,ReplyBy);			
		}
		$(".appendmodeldata").append(Model_Html_Design);
		Model_Html_Design='';
	},
	error: function (data) 
	{  
   	   	alert("An error occurred. Please try again.");  
	}  
   	});  
}	


var Model_Html_Design='';
function ModelHtmlDesign(ReplyDate,Event_time,ParentReply,ReplyTo)
{
 	Model_Html_Design = Model_Html_Design+"<div class='col-md-12  pb20 pl0 pr0'>"+
		"<div class='clearfix'></div>"+					
			"<div class='col-md-12 col-sm-12 reply-box mt5'>"+
				"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb20 pt0'>"+
				     "<span>"+ReplyTo+"</span>"+
				"</div>"+
				"<h5>"+ParentReply+"</h5>"+
				"<p><strong>"+ReplyDate+" at "+Event_time+"</strong></p>"+
				"<div class='clearfix'></div>"+					
			"</div>"+		  								
		"<div class='clearfix'></div>"+	
	"</div>";
}


function ClosePage()
{
	var SourceLocation = $.urlParam('sourcelocation');
	if(SourceLocation != null && SourceLocation != "null" && SourceLocation != ""){
		window.location.replace(SourceLocation);
	}
	else {
		window.location.replace(_spPageContextInfo.webAbsoluteUrl);
	}

	window.location.replace(SourceLocation);
}


function UpdateCounter(_conter,_UserName)
{	
	$.ajax({  
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Questions_Master')/items('"+G_QuestionID+"')",
    type: "POST",
    async: false,  
    data: JSON.stringify({  
          __metadata: {  type: "SP.Data.Questions_x005f_MasterListItem"  },  
    		LastAnswerBy: _UserName, 
			TotalReply: _conter.toString()
	}),  
    headers:  
 	{  
    	"Accept": "application/json;odata=verbose",  
        "Content-Type": "application/json;odata=verbose",  
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        "IF-MATCH": "*",  
        "X-HTTP-Method": "MERGE"  
    },  
    success: function(data, status, xhr)  
    {
    	console.log("Counter Updated.");
        ReadReplyCounter();
    },  
    error: function(data)  
    { 
    	alert(data);
    }  
    });
}


function ReadReplyCounter()
{
	var ReplyQuestionId = $.urlParam('ItemId');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Questions_Master')/items?$filter=ID eq ('"+ ReplyQuestionId +"')&$expand=Author&$select=*,Author/Id";  
    $.ajax({   
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
			G_TotalReply = ''; 
            var items = data.d.results;  
            if (items.length > 0) 
			{
				G_TotalReply = items[0].TotalReply;						
           	}  
		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
	});	
}


$(window).load(function() {
	// Set Value in Replye By Dropdown List.
	 GetReplyerthisQuestion();
});


function GetReplyerthisQuestion()
{
	var _AuthorList=[];
	var QuesID = $.urlParam('ItemId');
 	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq ('"+ QuesID +"')&$expand=Author/Id,AttachmentFiles&$select=*,Author/Name,Author/Title,AttachmentFiles";  
    $.ajax({  
		url: Ownurl,  
	    headers: { Accept: "application/json;odata=verbose" },  
	    async:false,  
	    success: function (data)
	    {
	    	var items = data.d.results;  
	       	if (items.length > 0) 
			{
				for(var x=0; x<items.length; x++)
				{
					_AuthorList.push(items[x].AuthorId.toString());
				}
				var a=_AuthorList;
				var _uniqueID = a.filter(function(itm, i, a) {
    				return i == a.indexOf(itm);
				});
				UserNameID=[];
				var valNew = _uniqueID.toString().split(',');
    			for(i=0;i<valNew.length;i++)
    			{
						getUser(valNew[i]);
				}
			
				$("#RepliedBy").empty();
				$("#RepliedBy").append($("<option></option>").val('All').html('- Select -'));
				for(var y=0; y<UserNameID.length; y++)
				{				
					$("#RepliedBy").append($("<option></option>").val(UserNameID[y][0]).html(UserNameID[y][1]));
				}										
			}
		},
		error: function (data) 
		{  
	    	alert("An error occurred. Please try again.");  
		}  
    });
}


var UserNameID=[];
function getUser(id)
{
	var returnValue;
	jQuery.ajax({
   		url: _spPageContextInfo.webAbsoluteUrl +"/_api/Web/GetUserById(" + id + ")",
   		type: "GET",
   		async:false,  
   		headers: { "Accept": "application/json;odata=verbose" },
   		success: function(data)
   		{
			var dataResults = data.d;
			var loginName  = dataResults.LoginName.split('|')[1];
			UserNameID.push([id,dataResults.Title]);
		}
 	});
}


function SetChildLikes(CommentId)
{
	LikeVal ='';
  	LikeID ='';
	ValidateActionCommentLike(CommentId);	
}


function InsertLikesValue(listName,item) 
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
		console.log("add success"); 
	},
	error: function (data) { console.log(data); }
	});
}


function DisplayCommentLikes(IndexNo)
{
	var QuesID=$.urlParam('ItemId');		
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter=LikeOnComment eq ('"+ IndexNo+"') and PostLike eq 'Yes'&$expand=Author&$select=*,Author/Id,Author/Name,Author/Title";  
    $.ajax({   
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
        {
            var items = data.d.results;  
            if (items.length > 0) 
			{
				var AuthorName = [];
				var LikeCount =0;
				for(var k=0; k<items.length; k++)
				{						
					if(IndexNo == items[k].LikeOnComment)
					{
						LikeCount = LikeCount+1;						
					}
					AuthorName.push(items[k].Author.Title);				
				}
				$("#LikesCount"+IndexNo).text(LikeCount);
				$("#AuthorNameLikes"+IndexNo).text(AuthorName);
			}
           	else
           	{
           		$("#LikesCount"+IndexNo).text('');
           		$("#AuthorNameLikes"+IndexNo).text('');
			}  
		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
	});	
}


function ValidateActionCommentLike(ItmID)
{
	LikeVal ='';
  	LikeID ='';
	var DataID=$.urlParam('ItemId').toString();	
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter=LikeOnComment eq '"+ItmID+"' and ItemID eq '"+ DataID+"' and AuthorId eq '"+_spPageContextInfo.userId+"'";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
        {debugger;
        	var items = data.d.results;
        	
            if (items.length > 0) 
			{	
            	 LikeVal = items[0].PostLike;
            	 LikeID = items[0].ID;             
        	}
        	else
        	{
        		LikeVal ="New";
			}
			
			if(LikeVal=="New")
			{
				var listName="QuestionsAnswerReply";
				var DataID=$.urlParam('ItemId').toString();	
				var Like="Yes";
				var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'PostLike':Like, 'ItemID':DataID,'LikeOnComment':ItmID.toString()};
				InsertLikesValue(listName,item);
				DisplayCommentLikes(ItmID);
			}
			else if(LikeVal=="Yes" || LikeVal=="No")
			{
				var LikeOnComment = ItmID.toString();
				updateLike(LikeOnComment);
				DisplayCommentLikes(LikeOnComment)
			}        	
  		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}


function Get_LikesOnPost()
{
	var QID = $.urlParam('ItemId');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq ('"+ QID+"')&$expand=Author/Id,AttachmentFiles&$select=*,Author/Name,Author/Title,AttachmentFiles";  
    $.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data)
    {
    	var items = data.d.results;  
        var likeCount=[];
        var AuthorList=[];
        if (items.length > 0) 
		{
			var i = 0;
			for (i; i < data.d.results.length; i++)   
           	{                      
            	var value = data.d.results[i]; 
  			    if(value.PostLike == "Yes" && value.PostLike != null && value.LikeOnComment == null)
			    {
			    	likeCount.push(value.PostLike);
			       	AuthorList.push(value.Author.Title);
			    }			    		     
			}			
	       	if(likeCount.length < 1)
            {
				$("#Qtotal_likes").text("");
               	$("#Likesonpost").text("");
			}
            else
            {               	
				$("#Qtotal_likes").text(likeCount.length);
				$("#Likesonpost").text(AuthorList);
	        }
		}
		else
        {
        	$("#Qtotal_likes").text("");
        	$("#Likesonpost").text(""); 
        } 
        SetLikeBtnValue($.urlParam('ItemId'));       
	},
	error: function (data) 
	{  
    	alert("An error occurred. Please try again.");  
	}  
    });  
}

function Displaylikespan(id)
{
	var NewId = id.split("LikesCount")[1];
	$(".LikeListArea").css("display", "none");
	$("#AuthorNameLikes"+NewId).css("display", "block");
}

function DeleteAttachmentQA(deletedata) 
{
	if (confirm('Are you sure to delete this document?')) 
	{
		var Itmid = deletedata.split(",")[0];
		var FileTitle = deletedata.split(",")[1];
		var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('QuestionsAnswerReply')/GetItemById(" + Itmid + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ";  
    	$.ajax({  
		    url: Url,
		    async: false,  
			type: 'DELETE',  
    	    contentType: 'application/json;odata=verbose',  
    	    headers: {  
		       'X-RequestDigest': $('#__REQUESTDIGEST').val(),  
    	       'X-HTTP-Method': 'DELETE',  
    	       'Accept': 'application/json;odata=verbose'  
			},  
    	    success: function (data) 
    	    {  
    	    	console.log("Deleted");
    	    	var Fdivid=FileTitle.split(".")[0];
    	    	var Sdivid = Fdivid.slice(0, 5);
    	    	$("."+Itmid+Sdivid).hide();    	    	
    	    },  
    	    error: function (error) 
    	    {  
    	    	console.log(JSON.stringify(error));  
    	    }  
		});
	}  
}


var G_FileBrowseID='';
var G_DispFiles='';
function initiatefilechosen(id)
{
	$('.blnkspan').empty();
	FinalFiles4Upload =[];
	if(G_FileBrowseID != id)
	{
		finalFiles =[];
	}
	G_FileBrowseID = id;
	if(id == "RootSpan1")
	{
		G_DispFiles ="RootSpanDisp1";
	}
	else
	{
		G_DispFiles ="FileName"+id;
	}	
	$('#attachmentBox').click();
}







function userActivityNotificationEntry(){
var Title,Detail; 

function convertToPlain(Q_Detail){

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = Q_Detail;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

Q_Detail=convertToPlain(Q_Detail);

debugger;
if(Q_Detail.length>100)
{
  Detail=Q_Detail.substring(0, 100);

}
else{
    Detail=Q_Detail;
}

if(Q_Title.length>100)
{
  Title=Q_Title.substring(0, 100);

}
else{
    Title=Q_Title;

  }


var ListName = "NotificationCenter";
	    var Metadata;
	    		Metadata = {
	        __metadata: {'type': 'SP.Data.NotificationCenterListItem'},
				'Title':Title,
				'WebpartName':'Question & Answer',
				'UserAction':'Content Read',
				'Details':Detail,
				'LocationIDId':parseInt(Logged_Location),
				'Designation':Logged_Designation,
				'AppVersion':'2.7',
				'ItemId':G_QuestionID,
				'UserImage':userImageUrl,
				'UserIDId':_spPageContextInfo.userId,			
				'Application': 'Website',
				'ContentCategory':'Question & Answer',
				'Environment':'Windows',
				'DepartmentIdId':parseInt(Logged_DepartmentId),
				'CompanyIdId':parseInt(Logged_CompanyId)
	           }; 
	           
       
    $.when(AddItemNotification(ListName,Metadata)).done(function(responseIdmore)
    {  
        
    })
	       


}


function AddItemNotification(ListName,Metadata)
{
	var Handler=this;
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('"+ListName+"')/Items";
    $.ajax({    	
        url: ownURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data:JSON.stringify(Metadata),
        success: function (data) {
            console.log(ListName);
            dfd.resolve(data);
        },
        error: function (error) {
           alert(JSON.stringify(error));
           dfd.reject(error);
        }
    });
    return dfd.promise();
}


function Get_QuestionView()
{
    var QItemID=$.urlParam('ItemId');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionsAnswerReply')/items?$filter= ItemID eq '"+ QItemID+"' and AuthorId eq '"+_spPageContextInfo.userId+"' and PostView eq 'View'";  
    $.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data)
    {
    	var items = data.d.results;
    	if (items.length > 0) 
		{
		  
	       update(items[0].Id,items[0].ItemID)
	    }
        else
        {
	        var listName="QuestionsAnswerReply";
			var DataID=$.urlParam('ItemId').toString();	
			var View="View";
			var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'PostView':View, 'PostLike':'No', 'ItemID':DataID};			
			InsertLikesValue(listName,item);
		}	       	
  	},
	error: function (data) 
	{  
       	alert("An error occurred. Please try again.");  
	}  
    });  
}

function update(QId,QItemID)  
{
	$.ajax({  
	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('QuestionsAnswerReply')/items('"+QId+"')",
	type: "POST", 
    async:false, 
    data: JSON.stringify  
    ({  
    	__metadata: {   type: "SP.Data.QuestionsAnswerReplyListItem" },  
        //PostLike: 'No',
        PostView: 'View',
        ItemID:QItemID
	}),  
    headers:  
    {  
		"Accept": "application/json;odata=verbose",  
        "Content-Type": "application/json;odata=verbose",  
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        "IF-MATCH": "*",  
        "X-HTTP-Method": "MERGE"  
	},  
    success: function(data, status, xhr)  
    { 
    	console.log("Data Updated!");
    },  
    error: function(data)  
    {  
    	console.log(data);
    }  
    });
 }
 
function GetImage()
{
	var listname,id;
 	var restQuery = "";
		listname = "Employees";
		//id = EmpID;
		restQuery = "Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=LogonNameId eq '" + _spPageContextInfo.userId+ "'";		    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	var items = data.d.results;
            employeePicURL = "";
           	if (items.length > 0)
          	{
          	            	    
           		if(items[0].AttachmentFiles.results.length>0)
           		{
           	       employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
           		
           		}
           		else
           		{
           			employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           		}
           	}
           	else
           	{
           	  employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
           	}
		}, 
        error: function (data)
        {
            console.log(data);
        }
    });
}


/*function Get_QuestionView()
{
    var QItemID=$.urlParam('ItemId');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Questions_Master')/items?$filter= ItemID eq '"+ QItemID+"' and AuthorId eq '"+_spPageContextInfo.userId+"' and PostView eq 'View'";  
    $.ajax({  
	    url: Ownurl,  
	    headers: { Accept: "application/json;odata=verbose" },  
	    async:false,  
	    success: function (data)
	    {
	    	var items = data.d.results;
	    	if (items.length > 0) 
			{
			  
		       
		    }        	       	
	  	},
		error: function (data) 
		{  
	       	alert("An error occurred. Please try again.");  
		}  
    });  
}
 */
 
 