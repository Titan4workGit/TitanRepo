var a393_0x359704=a393_0x3faf;function a393_0x3faf(_0x301800,_0x370ffd){var _0x4db618=a393_0x4db6();return a393_0x3faf=function(_0x3faf77,_0xbbafb5){_0x3faf77=_0x3faf77-0x18f;var _0x54327c=_0x4db618[_0x3faf77];return _0x54327c;},a393_0x3faf(_0x301800,_0x370ffd);}(function(_0x4eef7e,_0x47d941){var _0x3a3370=a393_0x3faf,_0x40ace0=_0x4eef7e();while(!![]){try{var _0x2b7000=parseInt(_0x3a3370(0x1f2))/0x1*(-parseInt(_0x3a3370(0x1e4))/0x2)+-parseInt(_0x3a3370(0x195))/0x3*(-parseInt(_0x3a3370(0x1a8))/0x4)+parseInt(_0x3a3370(0x1f6))/0x5+-parseInt(_0x3a3370(0x1c2))/0x6*(-parseInt(_0x3a3370(0x193))/0x7)+-parseInt(_0x3a3370(0x19e))/0x8+-parseInt(_0x3a3370(0x1d8))/0x9+parseInt(_0x3a3370(0x1b4))/0xa;if(_0x2b7000===_0x47d941)break;else _0x40ace0['push'](_0x40ace0['shift']());}catch(_0x3301d6){_0x40ace0['push'](_0x40ace0['shift']());}}}(a393_0x4db6,0xeed1f));var txtCompanyId=titanForWork[a393_0x359704(0x1d2)](a393_0x359704(0x199));$(document)[a393_0x359704(0x1a9)](function(){var _0x1e4314=a393_0x359704;GetTaskInboxCount(),GetApprovalInboxCount(),GetApprovalOutboxCount(),WorkPlaceApplicationLink();var _0x40ee1e=_spPageContextInfo[_0x1e4314(0x192)];$(_0x1e4314(0x1be))[_0x1e4314(0x1a5)]('href',''+_0x40ee1e+'/Pages/Mydashboard.aspx?WebAppId='+Logged_CompanyId+_0x1e4314(0x1f4)+window['btoa'](_0x1e4314(0x1df))),$('.TaskOutbox')['attr'](_0x1e4314(0x194),''+_0x40ee1e+_0x1e4314(0x1a7)+Logged_CompanyId+'&LocalStorage=Off&Location=TaskOutbox&Source='+window['btoa'](_0x1e4314(0x1df))),$(_0x1e4314(0x1eb))[_0x1e4314(0x1a5)](_0x1e4314(0x194),''+_0x40ee1e+_0x1e4314(0x19d)+window['btoa'](_0x1e4314(0x196))),$(_0x1e4314(0x190))[_0x1e4314(0x1a5)](_0x1e4314(0x194),''+_0x40ee1e+_0x1e4314(0x19d)+window['btoa'](_0x1e4314(0x1bc))),GetImage();});function GetTaskInboxCount(){var _0x25e3d4=a393_0x359704,_0x44709e=_spPageContextInfo['webAbsoluteUrl']+_0x25e3d4(0x1e3)+_spPageContextInfo[_0x25e3d4(0x1e1)]+'\x27\x20';$['ajax']({'url':_0x44709e,'type':'GET','async':![],'headers':{'ACCEPT':_0x25e3d4(0x1bf)},'success':function(_0x4102c7){var _0x4757ea=_0x25e3d4,_0x516940=_0x4102c7['d']['results'];_0x516940[_0x4757ea(0x1ea)]>0x0?($(_0x4757ea(0x1b6))[_0x4757ea(0x1ad)](_0x516940[0x0][_0x4757ea(0x1c1)]?_0x516940[0x0][_0x4757ea(0x1c1)]:'0'),$(_0x4757ea(0x1f0))[_0x4757ea(0x1ad)](_0x516940[0x0][_0x4757ea(0x1b5)]?_0x516940[0x0][_0x4757ea(0x1b5)]:'0'),$('#TaskOverdueOutbox')['text'](_0x516940[0x0][_0x4757ea(0x1e2)]?_0x516940[0x0][_0x4757ea(0x1e2)]:'0'),$(_0x4757ea(0x1ae))[_0x4757ea(0x1ad)](_0x516940[0x0][_0x4757ea(0x1f3)]?_0x516940[0x0][_0x4757ea(0x1f3)]:'0')):($(_0x4757ea(0x1b6))[_0x4757ea(0x1ad)](0x0),$(_0x4757ea(0x1f0))[_0x4757ea(0x1ad)](0x0),$('#TaskOverdueOutbox')[_0x4757ea(0x1ad)](0x0),$(_0x4757ea(0x1ae))['text'](0x0));},'error':function(_0x16e01b){var _0x1ad89d=_0x25e3d4;alert(_0x1ad89d(0x1ed));}});}function GetApprovalInboxCount(){var _0x29fee1=a393_0x359704,_0x3e4dac=_spPageContextInfo[_0x29fee1(0x192)]+'/_api/lists/getbytitle(\x27ApprovalTaskList\x27)/items?$select=*&$Filter=ApproversId\x20eq\x20\x27'+_spPageContextInfo[_0x29fee1(0x1ac)]+_0x29fee1(0x1c6)+Logged_CompanyId+_0x29fee1(0x1ef);$[_0x29fee1(0x1cb)]({'url':_0x3e4dac,'type':'GET','async':![],'headers':{'ACCEPT':_0x29fee1(0x1bf)},'success':function(_0x4b93bd){var _0x183fe6=_0x29fee1,_0x31e744=[],_0x1f2cc2=_0x4b93bd['d'][_0x183fe6(0x1dd)],_0x495014='',_0x52a20d=0x0;for(var _0x251af0=0x0;_0x251af0<_0x1f2cc2[_0x183fe6(0x1ea)];_0x251af0++){_0x52a20d++;}_0x495014+=_0x52a20d,$(_0x183fe6(0x1d6))[_0x183fe6(0x1f7)](_0x495014);},'error':function(){alert('Error\x20getting\x20the\x20Approver\x20Inbox\x20Count\x20.');}});}function GetApprovalOutboxCount(){var _0x5108c0=a393_0x359704,_0x18fd76=_spPageContextInfo['webAbsoluteUrl']+_0x5108c0(0x1ec)+_spPageContextInfo['userId']+'\x27\x20and\x20CompanyId\x20eq\x20\x27'+Logged_CompanyId+_0x5108c0(0x1ef);$['ajax']({'url':_0x18fd76,'type':_0x5108c0(0x1d9),'async':![],'headers':{'ACCEPT':_0x5108c0(0x1bf)},'success':function(_0x52b463){var _0x5023a6=_0x5108c0,_0x2aefeb=[],_0x286cd0=_0x52b463['d'][_0x5023a6(0x1dd)],_0x573c41='',_0x1e5022=0x0;for(var _0x7502ca=0x0;_0x7502ca<_0x286cd0['length'];_0x7502ca++){_0x1e5022++;}_0x573c41+=_0x1e5022,$(_0x5023a6(0x1ab))[_0x5023a6(0x1f7)](_0x573c41);},'error':function(){var _0x12fe11=_0x5108c0;alert(_0x12fe11(0x1e5));}});}function WorkPlaceApplicationLink(){var _0x2282df=a393_0x359704,_0x57e9a0=_spPageContextInfo[_0x2282df(0x192)]+'/_api/web/lists/getbytitle(\x27ApplicationLink\x27)/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$Filter=VisibleAt\x20eq\x20\x27Workplace\x27\x20and\x20Status\x20eq\x20\x271\x27\x20and\x20(Audience\x20eq\x20\x27Corporate\x27\x20or\x20(Audience\x20eq\x20\x27Company\x27\x20and\x20CompanyIdId\x20eq\x20\x27'+Logged_CompanyId+_0x2282df(0x1c0)+_spPageContextInfo[_0x2282df(0x1ac)]+_0x2282df(0x1f9)+Logged_DepartmentId+'\x27)\x20)';$['ajax']({'url':_0x57e9a0,'headers':{'Accept':'application/json;odata=verbose'},'success':function(_0xf148cf){var _0x141491=_0x2282df,_0x1a0757=_0xf148cf['d'][_0x141491(0x1dd)],_0x18d59a=[],_0x378bfd='';if(_0x1a0757[_0x141491(0x1ea)]>0x0){for(var _0x339d89=0x0;_0x339d89<_0x1a0757[_0x141491(0x1ea)];_0x339d89++){var _0x5e6fd1=_0x1a0757[_0x339d89]['ID'];_0x18d59a=[];var _0x10993e=_0x1a0757[_0x339d89][_0x141491(0x19b)][_0x141491(0x1d4)],_0x4e0d54=_0x1a0757[_0x339d89][_0x141491(0x1cc)],_0xc7beb9=_0x1a0757[_0x339d89][_0x141491(0x1a6)];if(_0x1a0757[_0x339d89][_0x141491(0x1d1)][_0x141491(0x1dd)][_0x141491(0x1ea)]>0x0)var _0x26118b=_0x1a0757[_0x339d89][_0x141491(0x1d1)][_0x141491(0x1dd)][0x0][_0x141491(0x1e8)];else var _0x26118b=_0x1a0757[_0x339d89][_0x141491(0x19f)];if(_0xc7beb9!=null)_0x378bfd+=_0x141491(0x1a3)+_0x1a0757[_0x339d89]['ID']+_0x141491(0x1e9),_0x378bfd+=_0x141491(0x1b3),_0x378bfd+=_0x141491(0x1b9)+_0x26118b+_0x141491(0x1c5);else{_0x378bfd+='<div\x20class=\x22item\x22>';var _0xc852ff=_0x4e0d54+'?.'+_0x10993e;_0x378bfd+=_0x141491(0x1b7)+_0x10993e+_0x141491(0x1e7)+_0xc852ff+_0x141491(0x1a4),_0x378bfd+=_0x141491(0x1b9)+_0x26118b+_0x141491(0x1ce);}_0x378bfd+=_0x141491(0x1c7)+_0x4e0d54+_0x141491(0x1c9),_0x378bfd+=_0x141491(0x1d3),_0x378bfd+=_0x141491(0x1cf);}$('#WorkPlaceAppLink')[_0x141491(0x1f7)](_0x378bfd);var _0x145819=function(){var _0x27927d=_0x141491,_0xf5d6ac=$(_0x27927d(0x1ca)),_0x2959ae=_0xf5d6ac[_0x27927d(0x198)](),_0x4f90e8=$(_0x27927d(0x18f)),_0x183957=0x0;_0x4f90e8[_0x27927d(0x19c)](function(){var _0x4041d9=_0x27927d;_0x183957+=$(this)['width']()+ +$(this)[_0x4041d9(0x1f8)]('margin-right')[_0x4041d9(0x1cd)](0x0,-0x2);});_0x183957>_0x2959ae&&_0xf5d6ac[_0x27927d(0x198)](_0x183957);;};$(_0x141491(0x1ba))[_0x141491(0x1de)]({'smartSpeed':0x258,'margin':0xa,'autoWidth':!![],'nav':!![],'dots':![],'onInitialized':_0x145819,'onRefreshed':_0x145819,'responsive':{0x0:{'items':0x1},0x258:{'items':0x4},0x3e8:{'items':0x6}}});}},'eror':function(_0x5bb1fd){var _0x46de16=_0x2282df;alert(_0x46de16(0x1c8));}});}function URLwithoutpass(_0x4d4dae){var _0x593a00=a393_0x359704,_0x4c9cba=_0x4d4dae[_0x593a00(0x1da)]('?.');addNotificationItem(_0x4c9cba[0x0],_0x4c9cba[0x1]);}var glbId;function redirectLinks(_0x5777c5){var _0x39e2b0=a393_0x359704;$(_0x39e2b0(0x1b8))[_0x39e2b0(0x1b1)](_0x39e2b0(0x197)),glbId=_0x5777c5;}function bindevent(){var _0x429909=a393_0x359704,_0x275259=$(_0x429909(0x1aa))[_0x429909(0x1ee)](),_0x456b32=![];if(_0x275259=='')return alert(_0x429909(0x1c4)),![];var _0x2ecbb7=_spPageContextInfo[_0x429909(0x192)]+'/_api/web/lists/GetByTitle(\x27ApplicationLink\x27)/items?$select=*&$filter=ID\x20eq\x20\x27'+glbId+'\x27';$['ajax']({'url':_0x2ecbb7,'headers':{'Accept':_0x429909(0x1bf)},'async':![],'success':function(_0x200883){var _0x2c10fa=_0x429909,_0x3809da=_0x200883['d'][_0x2c10fa(0x1dd)],_0x576a80=_0x3809da[0x0][_0x2c10fa(0x1a6)],_0x3c5fa0=_0x3809da[0x0]['LinkLocation'][_0x2c10fa(0x1d4)];if(_0x275259==_0x576a80){var _0x23225c=_0x3809da[0x0]['Title'];addNotificationItem(_0x23225c,_0x3c5fa0),$(_0x2c10fa(0x1b8))[_0x2c10fa(0x1b1)](_0x2c10fa(0x1d0)),$(_0x2c10fa(0x1d7))['val'](''),window['open'](_0x3c5fa0,'_blank');}else alert(_0x2c10fa(0x1f1)),$(_0x2c10fa(0x1d7))['val'](''),_0x456b32=!![];},'error':function(_0x3840e3){alert(_0x3840e3);}});if(_0x456b32==!![])return![];}function addNotificationItem(_0x34a38c,_0x4e9de4){var _0x32c1c5=a393_0x359704,_0x389267=_0x32c1c5(0x19a),_0x5d433d;_0x5d433d={'__metadata':{'type':_0x32c1c5(0x1dc)},'Title':_0x34a38c,'WebpartName':_0x32c1c5(0x1a0),'UserAction':_0x32c1c5(0x1a0),'Details':_0x4e9de4,'LocationIDId':parseInt(Logged_Location),'Designation':Logged_Designation,'AppVersion':_0x32c1c5(0x191),'UserImage':employeePicURL,'UserIDId':_spPageContextInfo['userId'],'Application':'Website','ContentCategory':_0x34a38c,'Environment':_0x32c1c5(0x1f5),'DepartmentIdId':parseInt(Logged_DepartmentId),'CompanyIdId':parseInt(Logged_CompanyId)},$[_0x32c1c5(0x1bb)](AddItemNotification(_0x389267,_0x5d433d))[_0x32c1c5(0x1e6)](function(_0x28ef75){var _0x4c312e=_0x32c1c5;console[_0x4c312e(0x1af)](_0x389267),console[_0x4c312e(0x1af)](_0x4c312e(0x1db));});}function a393_0x4db6(){var _0x3814c8=['results','owlCarousel','Tasks','/_api/web/lists/getbytitle(\x27','userEmail','OverdueCount_Out','/_api/lists/getbytitle(\x27EmployeeTaskCounter\x27)/items?$top=5000&$select=ID,OpenTasksCount,OverdueCount,UserId/EMail&$expand=UserId&$filter=UserId/EMail\x20eq\x20\x27','10GLlPWz','Error\x20getting\x20the\x20Approver\x20Inbox\x20Count\x20.','done','\x22;\x20onclick=\x22URLwithoutpass(\x27','ServerRelativeUrl',')\x22>','length','.ApprovalInbox','/_api/lists/getbytitle(\x27ApprovalTaskList\x27)/items?$select=*&$Filter=AuthorId\x20eq\x20\x27','Error\x20getting\x20the\x20Task\x20Inbox\x20Count.','val','\x27\x20and\x20Status\x20eq\x20\x27Initiated\x27','#TaskPending','wrong\x20Password.','183819IGXIMw','OpenTasksCount_Out','&LocalStorage=Off&Location=TaskInbox&Source=','Windows','4064810YsTjaY','append','css','\x27)\x20or\x20(Audience\x20eq\x20\x27Department\x27\x20and\x20DepartmentIdId\x20eq\x20\x27','.owl-item','.ApprovalOutbox','2.7','webAbsoluteUrl','42TfvSjA','href','3lBNabG','inbox','show','width','CompanyId','NotificationCenter','LinkLocation','each','/Pages/approvals.aspx?','5086760yWqTre','Event_pick','Quick-Links','Department','Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=LogonName/EMail\x20eq\x20\x27','<div\x20class=\x22item\x22\x20onclick=\x22redirectLinks(','\x27)\x22>','attr','Password','/Pages/Mydashboard.aspx?WebAppId=','5816416zfrHJX','ready','#password','#ApprovalOutboxpendingCounter','userId','text','#TaskPendingOutbox','log','Designation','modal','/_layouts/15/userphoto.aspx?accountname=','<a\x20href=\x22#\x22>','16917710yyiaPG','OpenTasksCount','#TaskOverdue','<a\x20target=\x22_blank\x22\x20href=\x22','#myModal','<img\x20src=\x22','.quick-slider','when','outbox','Employees','.TaskInbox','application/json;odata=verbose','\x27)\x20or\x20(Audience\x20eq\x20\x27Selective\x27\x20and\x20SelectiveUsersId\x20eq\x20\x27','OverdueCount','424518BzJCLt','OfficeLocation','Please\x20enter\x20password\x20!','\x22\x20\x20\x20height=\x2250\x22\x20alt=\x22\x22/>','\x27\x20and\x20CompanyId\x20eq\x20\x27','<p\x20class=\x22\x22>','An\x20error\x20occurred.\x20Please\x20try\x20again.','</p>','.owl-stage','ajax','Title','slice','\x22\x20\x20height=\x2250\x22\x20alt=\x22\x22/>','</div>','hide','AttachmentFiles','getQueryStringParameter','</a>','Url','\x27)/items?$select=','#ApprovalPendingTask','#password-field','16651872kEXUxy','GET','split','Save\x20Quick-Links!','SP.Data.NotificationCenterListItem'];a393_0x4db6=function(){return _0x3814c8;};return a393_0x4db6();}var employeePicURL='';function GetImage(){var _0x1ffc64=a393_0x359704,_0x50dca2,_0x3a3e3f,_0x375a47='';_0x50dca2=_0x1ffc64(0x1bd);var _0x20ea5f=_spPageContextInfo['userEmail'];_0x375a47=_0x1ffc64(0x1a2)+_spPageContextInfo[_0x1ffc64(0x1e1)]+'\x27';var _0x3c9ec3=_spPageContextInfo['webAbsoluteUrl']+_0x1ffc64(0x1e0)+_0x50dca2+_0x1ffc64(0x1d5)+_0x375a47;$['ajax']({'url':_0x3c9ec3,'headers':{'Accept':_0x1ffc64(0x1bf)},'async':![],'success':function(_0x107847){var _0x18255d=_0x1ffc64,_0x12d6ce=_0x107847['d'][_0x18255d(0x1dd)];employeePicURL='',_0x12d6ce[_0x18255d(0x1ea)]>0x0?(Designation=_0x12d6ce[0x0][_0x18255d(0x1b0)],Department=_0x12d6ce[0x0][_0x18255d(0x1a1)],OfficeLocation=_0x12d6ce[0x0][_0x18255d(0x1c3)],_0x12d6ce[0x0][_0x18255d(0x1d1)][_0x18255d(0x1dd)][_0x18255d(0x1ea)]>0x0?employeePicURL=_0x12d6ce[0x0][_0x18255d(0x1d1)][_0x18255d(0x1dd)][0x0][_0x18255d(0x1e8)]:employeePicURL=_spPageContextInfo[_0x18255d(0x192)]+_0x18255d(0x1b2)+escapeProperly(_spPageContextInfo['userEmail'])):employeePicURL=_spPageContextInfo['webAbsoluteUrl']+_0x18255d(0x1b2)+escapeProperly(_spPageContextInfo['userEmail']);},'error':function(_0xf4c078){console['log'](_0xf4c078);}});}