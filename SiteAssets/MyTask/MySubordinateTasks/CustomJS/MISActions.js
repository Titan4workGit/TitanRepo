var arrAllTaskInbox=[];
//Differenet Action for Table
function updateMISMeatdata(Action) {
    var Metdata;
    if (arrTaskInIds.length > 0) {
        if (Action == "NotifyByMail") {
            getAssignToMIS(arrTaskInIds);
        }
    }
    else {
        alert("Kindly select any task first.");
        return false;
    }
}

//get Assigned to of all selected task to send mail
function getAssignToMIS(array) {
    var arrAllAssignTo = [];
    var arrAllAssignToName = [];
    var arrDependency = [];
    var arrDependencyName = [];
    var arrSendUser = [];
    var EmailDesign = '';
    var arrTemp = [];
    var TaskType = '';
    var DashboardURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/mydashboard.aspx?WebAppId=" + Logged_CompanyId;
    array.forEach(function (value, count) {
        arrTemp = [];
        arrAllAssignTo = [];
        arrAllAssignToName = [];
        arrDependency = [];
        arrDependencyName = [];
        arrTemp = AllTaskInbox.filter(function (data) {
            return data.Id == value;
        });

        for (var i = 0; i < arrTemp[0].TaskAssignTo.length; i++) {
            arrAllAssignTo.push(arrTemp[0].TaskAssignTo[i].EMail);
            arrAllAssignToName.push(arrTemp[0].TaskAssignTo[i].Title);
        }
        if (arrTemp[0].DependencyTo != null) {
            for (var j = 0; j < arrTemp[0].DependencyTo.length; j++) {
                arrDependency.push(arrTemp[0].DependencyTo[j].EMail);
                arrDependencyName.push(arrTemp[0].DependencyTo[j].Title);
            }
        }

        if ($('.hideSelective:checked').val() == "All") {
            arrSendUser = arrAllAssignTo.concat(arrDependency);
        }
        else if ($('.hideSelective:checked').val() == "All Assignee") {
            arrSendUser = arrAllAssignTo.filter(function (f) { return f; });
        }
        else if ($('.hideSelective:checked').val() == "All Dependency") {
            arrSendUser = arrDependency.filter(function (f) { return f; });
        }
        else {
            arrSendUser = getUserInformationEmail("SendNotiPicker");
        }
        if (arrTemp[0].TaskType == "1") {
            TaskType = "Project Task";
        }
        else {
            TaskType = "General Task";
        }
        if (arrSendUser.length > 0) {
            var EmailDesign = '';
            var mailDesc = arrTemp[0].Description ? arrTemp[0].Description : "";
            EmailDesign = "Dear User,<br/><br/>" + _spPageContextInfo.userDisplayName + ", has shared the following message regarding a task with you.<br/><br/>";
            EmailDesign = EmailDesign + "<div><strong>Message :</strong> " + $("#txtTaskNotify").val() + "</div></br></br>" +
							            "<div><strong>Task Detail</strong></div><div><strong>---------------</strong></div>" +
            							"<div><strong>Assigned To :</strong>" + arrAllAssignToName.toString() + "</div>" +
                					    "<div><strong>Assigned By :</strong> " + arrTemp[0].Author.Title + "</div>" +
                					    "<div><strong>Modify On :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].Modified)) + "</div>" +
                    				    "<div><strong>Status :</strong> " + arrTemp[0].CurrentPhase + "</div>" +
                    				    "<div><strong>Task Name:</strong> " + arrTemp[0].Title + "</div>" +
                    				    "<div><strong>Type:</strong> " + TaskType + "</div>" +
                    				    "<div><strong>Priority :</strong> " + arrTemp[0].TaskPriority + "</div>" +
                    				    "<div><strong>Starting Date :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].StartDate)) + "</div>" +
                    				    "<div><strong>Due Date :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].DueDate)) + "</div>" +
                    				    "<div><strong>Description :</strong> " + mailDesc + "</div><br/>" +
		        					    "<div><a href=" + DashboardURL + ">Click here</a> to open the Task.</div>" + "<br/><br/>";

            EmailDesign += "This is an auto generated email. Please don't reply.";
            var Metadata;
            Metadata = {
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'From': _spPageContextInfo.userEmail,
                    'To': {
                        'results': arrSendUser
                    },
                    'Body': EmailDesign,
                    'Subject': "Task notification"
                }
            };
            var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
            $.ajax({
                contentType: 'application/json',
                url: sitetemplateurl,
                type: "POST",
                data: JSON.stringify(Metadata),
                async: false,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    if (array.length == (count + 1)) {
                        alert("Notification has been sent.");
                        $("#Notificationlist").modal("hide");
                        $("#txtTaskNotify").val('');
                        $("#chkAllUser").prop("checked", "checked");
                        $("#SendNotiPicker").hide();
                        $(".taskchkIn").prop("checked", '');//MIS
                        clearPeoplePickerControl("SendNotiPicker");
                        arrTaskInIds = [];
                    }
                },
                error: function (err) {
                    console.log("SendEmailSharedNotification  " + JSON.stringify(err));
                }
            });
        }
        else {
            alert("Kindly select any user to send mail.");
            if (array.length == (count + 1)) {
                alert("Notification has been sent.");
                $("#Notificationlist").modal("hide");
                $("#txtTaskNotify").val('');
                $("#chkAllUser").prop("checked", "checked");
                $("#SendNotiPicker").hide();
                $(".taskchkIn").prop("checked", '');//MIS
                clearPeoplePickerControl("SendNotiPicker");
                arrTaskInIds = [];
            }
        }
    });
}