var a392_0x4e3381=a392_0x4627;(function(_0x3cd071,_0x13d4b1){var _0x215143=a392_0x4627,_0x447bf0=_0x3cd071();while(!![]){try{var _0x4319fe=parseInt(_0x215143(0xfd))/0x1*(-parseInt(_0x215143(0xc4))/0x2)+parseInt(_0x215143(0xe7))/0x3+parseInt(_0x215143(0xa7))/0x4+-parseInt(_0x215143(0xd3))/0x5+-parseInt(_0x215143(0xbf))/0x6*(-parseInt(_0x215143(0xf7))/0x7)+-parseInt(_0x215143(0xc0))/0x8+-parseInt(_0x215143(0xea))/0x9*(parseInt(_0x215143(0xd7))/0xa);if(_0x4319fe===_0x13d4b1)break;else _0x447bf0['push'](_0x447bf0['shift']());}catch(_0x5ce870){_0x447bf0['push'](_0x447bf0['shift']());}}}(a392_0x30fe,0x4aae5));var txtCompanyId=titanForWork['getQueryStringParameter']('CompanyId');$(document)[a392_0x4e3381(0xcb)](function(){var _0x1012d6=a392_0x4e3381;GetTaskInboxCount(),GetApprovalInboxCount(),GetApprovalOutboxCount(),WorkPlaceApplicationLink();var _0x26524c=_spPageContextInfo[_0x1012d6(0xc1)];$(_0x1012d6(0xd5))[_0x1012d6(0xc9)](_0x1012d6(0xdc),''+_0x26524c+_0x1012d6(0x9c)+Logged_CompanyId+'&LocalStorage=Off&Location=TaskInbox&Source='+window[_0x1012d6(0xee)](_0x1012d6(0x109))),$(_0x1012d6(0xe1))[_0x1012d6(0xc9)](_0x1012d6(0xdc),''+_0x26524c+'/Pages/Mydashboard.aspx?WebAppId='+Logged_CompanyId+'&LocalStorage=Off&Location=TaskOutbox&Source='+window[_0x1012d6(0xee)](_0x1012d6(0x109))),$('.ApprovalInbox')[_0x1012d6(0xc9)]('href',''+_0x26524c+'/Pages/approvals.aspx?'+window[_0x1012d6(0xee)](_0x1012d6(0x10a))),$(_0x1012d6(0x108))[_0x1012d6(0xc9)](_0x1012d6(0xdc),''+_0x26524c+_0x1012d6(0x9b)+window[_0x1012d6(0xee)](_0x1012d6(0xfc))),GetImage();});function GetTaskInboxCount(){var _0x5f4040=a392_0x4e3381,_0x33c912=_spPageContextInfo['webAbsoluteUrl']+_0x5f4040(0xa9)+_spPageContextInfo[_0x5f4040(0xd6)]+'\x27\x20';$['ajax']({'url':_0x33c912,'type':_0x5f4040(0x9e),'async':![],'headers':{'ACCEPT':'application/json;odata=verbose'},'success':function(_0x13e1c5){var _0x534035=_0x5f4040,_0x1f5b82=_0x13e1c5['d'][_0x534035(0xf5)];_0x1f5b82[_0x534035(0xc6)]>0x0?($('#TaskOverdue')[_0x534035(0xa5)](_0x1f5b82[0x0]['OverdueCount']?_0x1f5b82[0x0][_0x534035(0xad)]:'0'),$('#TaskPending')['text'](_0x1f5b82[0x0]['OpenTasksCount']?_0x1f5b82[0x0][_0x534035(0xdd)]:'0'),$(_0x534035(0xe0))[_0x534035(0xa5)](_0x1f5b82[0x0][_0x534035(0xfb)]?_0x1f5b82[0x0][_0x534035(0xfb)]:'0'),$('#TaskPendingOutbox')[_0x534035(0xa5)](_0x1f5b82[0x0][_0x534035(0x106)]?_0x1f5b82[0x0][_0x534035(0x106)]:'0')):($(_0x534035(0xa8))[_0x534035(0xa5)](0x0),$('#TaskPending')[_0x534035(0xa5)](0x0),$('#TaskOverdueOutbox')[_0x534035(0xa5)](0x0),$(_0x534035(0xa1))['text'](0x0));},'error':function(_0x22ade2){var _0x214195=_0x5f4040;alert(_0x214195(0xe3));}});}function GetApprovalInboxCount(){var _0xbc58a5=a392_0x4e3381,_0x150c15=_spPageContextInfo[_0xbc58a5(0xc1)]+'/_api/lists/getbytitle(\x27ApprovalTaskList\x27)/items?$select=*&$Filter=ApproversId\x20eq\x20\x27'+_spPageContextInfo[_0xbc58a5(0xc3)]+_0xbc58a5(0xf1)+Logged_CompanyId+_0xbc58a5(0xd0);$[_0xbc58a5(0xb3)]({'url':_0x150c15,'type':_0xbc58a5(0x9e),'async':![],'headers':{'ACCEPT':'application/json;odata=verbose'},'success':function(_0x38eafe){var _0x59a88c=_0xbc58a5,_0x3fe2b4=[],_0x324c7f=_0x38eafe['d'][_0x59a88c(0xf5)],_0x5ec0f8='',_0x2f585c=0x0;for(var _0x45b7b0=0x0;_0x45b7b0<_0x324c7f[_0x59a88c(0xc6)];_0x45b7b0++){_0x2f585c++;}_0x5ec0f8+=_0x2f585c,$(_0x59a88c(0xaa))['append'](_0x5ec0f8);},'error':function(){var _0x4214df=_0xbc58a5;alert(_0x4214df(0xb4));}});}function GetApprovalOutboxCount(){var _0x4bcfbc=a392_0x4e3381,_0x22a330=_spPageContextInfo[_0x4bcfbc(0xc1)]+_0x4bcfbc(0xd8)+_spPageContextInfo[_0x4bcfbc(0xc3)]+_0x4bcfbc(0xf1)+Logged_CompanyId+_0x4bcfbc(0xd0);$[_0x4bcfbc(0xb3)]({'url':_0x22a330,'type':_0x4bcfbc(0x9e),'async':![],'headers':{'ACCEPT':_0x4bcfbc(0xdb)},'success':function(_0x4392ea){var _0x2e5e02=_0x4bcfbc,_0x5660a1=[],_0x37360b=_0x4392ea['d']['results'],_0x2d9696='',_0x46d242=0x0;for(var _0x20b769=0x0;_0x20b769<_0x37360b[_0x2e5e02(0xc6)];_0x20b769++){_0x46d242++;}_0x2d9696+=_0x46d242,$(_0x2e5e02(0xa4))['append'](_0x2d9696);},'error':function(){var _0x46a571=_0x4bcfbc;alert(_0x46a571(0xb4));}});}var arrItems,groupItem='';function WorkPlaceApplicationLink(){var _0x38468d=a392_0x4e3381,_0x15a9e2=_spPageContextInfo[_0x38468d(0xc1)]+_0x38468d(0xb1)+Logged_CompanyId+_0x38468d(0xf6)+_spPageContextInfo[_0x38468d(0xc3)]+'\x27)\x20or\x20(Audience\x20eq\x20\x27Department\x27\x20and\x20DepartmentIdId\x20eq\x20\x27'+Logged_DepartmentId+_0x38468d(0xe2);$['ajax']({'url':_0x15a9e2,'headers':{'Accept':'application/json;odata=verbose'},'success':function(_0x2ad723){var _0x1820ff=_0x38468d,_0x17c4c4=_0x2ad723['d'][_0x1820ff(0xf5)];arrItems=_0x17c4c4;var _0x2521cd='';if(_0x17c4c4[_0x1820ff(0xc6)]>0x0){for(var _0x52f38c=0x0;_0x52f38c<_0x17c4c4['length'];_0x52f38c++){var _0x2eeead=_0x17c4c4[_0x52f38c]['ID'];if(_0x17c4c4[_0x52f38c]['Group']!=_0x1820ff(0xbd))var _0x557067=_0x17c4c4[_0x52f38c]['LinkLocation'][_0x1820ff(0xd9)];var _0x2d469f=_0x17c4c4[_0x52f38c]['Title'],_0x528dbb=_0x17c4c4[_0x52f38c][_0x1820ff(0xbd)],_0xce4ab5=_0x17c4c4[_0x52f38c][_0x1820ff(0x105)],_0x3c33da=_0x17c4c4[_0x52f38c][_0x1820ff(0x10c)];if(_0x17c4c4[_0x52f38c]['AttachmentFiles'][_0x1820ff(0xf5)][_0x1820ff(0xc6)]>0x0)var _0x42d4a5=_0x17c4c4[_0x52f38c][_0x1820ff(0x9a)][_0x1820ff(0xf5)][0x0][_0x1820ff(0xef)];else var _0x42d4a5=_0x17c4c4[_0x52f38c][_0x1820ff(0x9f)];_0x528dbb=='Group'&&(groupItem!=_0xce4ab5&&(_0x2521cd+=_0x1820ff(0xb5)+_0xce4ab5+_0x1820ff(0xb8),_0x2521cd+='<a\x20href=\x22#\x22>',_0x2521cd+=_0x1820ff(0xd4)+_0x42d4a5+_0x1820ff(0xb6),_0x2521cd+=_0x1820ff(0xbc)+_0x2d469f+_0x1820ff(0xca),_0x2521cd+=_0x1820ff(0xe8),_0x2521cd+=_0x1820ff(0xb2),groupItem=_0xce4ab5));if(_0xce4ab5==''||_0xce4ab5==null){if(_0x3c33da!=null)_0x2521cd+=_0x1820ff(0xab)+_0x17c4c4[_0x52f38c]['ID']+')\x22>',_0x2521cd+=_0x1820ff(0xba),_0x2521cd+=_0x1820ff(0xd4)+_0x42d4a5+_0x1820ff(0xb6),_0x2521cd+='<p\x20class=\x22\x22>'+_0x2d469f+'</p>',_0x2521cd+=_0x1820ff(0xe8),_0x2521cd+=_0x1820ff(0xb2);else{_0x2521cd+=_0x1820ff(0xde);var _0x21ac30=_0x2d469f+'?.'+_0x557067;_0x2521cd+=_0x1820ff(0xcf)+_0x557067+_0x1820ff(0xfe)+_0x21ac30+_0x1820ff(0xb8),_0x2521cd+='<img\x20src=\x22'+_0x42d4a5+_0x1820ff(0xa6),_0x2521cd+='<p\x20class=\x22\x22>'+_0x2d469f+_0x1820ff(0xca),_0x2521cd+=_0x1820ff(0xe8),_0x2521cd+=_0x1820ff(0xb2);}}}$(_0x1820ff(0xe4))[_0x1820ff(0xcd)](_0x2521cd);var _0x1d5488=function(){var _0xe0e24f=_0x1820ff,_0xfb4774=$('.owl-stage'),_0x10aa39=_0xfb4774[_0xe0e24f(0xbb)](),_0x2453d8=$('.owl-item'),_0x1b8ec8=0x0;_0x2453d8['each'](function(){var _0x5646e9=_0xe0e24f;_0x1b8ec8+=$(this)['width']()+ +$(this)[_0x5646e9(0x102)](_0x5646e9(0xd2))[_0x5646e9(0xec)](0x0,-0x2);});_0x1b8ec8>_0x10aa39&&_0xfb4774[_0xe0e24f(0xbb)](_0x1b8ec8);;};$(_0x1820ff(0xed))[_0x1820ff(0xbe)]({'smartSpeed':0x258,'margin':0xa,'autoWidth':!![],'nav':!![],'dots':![],'onInitialized':_0x1d5488,'onRefreshed':_0x1d5488,'responsive':{0x0:{'items':0x1},0x258:{'items':0x4},0x3e8:{'items':0x6}}});}},'eror':function(_0x337a5a){var _0x3044c4=_0x38468d;alert(_0x3044c4(0xff));}});}function URLwithoutpass(_0x8934dc){var _0x27095e=_0x8934dc['split']('?.');addNotificationItem(_0x27095e[0x0],_0x27095e[0x1]);}var glbId;function a392_0x4627(_0x35feea,_0x58d17f){var _0x30fe9c=a392_0x30fe();return a392_0x4627=function(_0x4627e0,_0x43c34c){_0x4627e0=_0x4627e0-0x99;var _0x4cb1d9=_0x30fe9c[_0x4627e0];return _0x4cb1d9;},a392_0x4627(_0x35feea,_0x58d17f);}function redirectLinks(_0x31fcc5){var _0x32144d=a392_0x4e3381;$(_0x32144d(0xa2))[_0x32144d(0xeb)](_0x32144d(0xc2)),glbId=_0x31fcc5;}function bindGroup(_0x4ebd8a){var _0x3ba618=a392_0x4e3381,_0x94054d='';$(_0x3ba618(0xe6))[_0x3ba618(0xeb)](_0x3ba618(0xc2));var _0x4a8c56=arrItems['filter'](function(_0x33e0cf){var _0x3a852f=_0x3ba618;return _0x33e0cf[_0x3a852f(0x105)]==_0x4ebd8a&&_0x33e0cf[_0x3a852f(0xbd)]==_0x3a852f(0xc8);});$(_0x3ba618(0xe5))[_0x3ba618(0xf9)]();if(_0x4a8c56[_0x3ba618(0xc6)]>0x0)for(var _0x143348=0x0;_0x143348<_0x4a8c56[_0x3ba618(0xc6)];_0x143348++){var _0x37eabc=_0x4a8c56[_0x143348][_0x3ba618(0xcc)][_0x3ba618(0xd9)],_0x12acea=_0x4a8c56[_0x143348][_0x3ba618(0xfa)];if(_0x4a8c56[_0x143348][_0x3ba618(0x9a)][_0x3ba618(0xf5)][_0x3ba618(0xc6)]>0x0)var _0x52292a=_0x4a8c56[_0x143348][_0x3ba618(0x9a)]['results'][0x0][_0x3ba618(0xef)];else var _0x52292a=_0x4a8c56[_0x143348][_0x3ba618(0x9f)];var _0x427a7f=_0x12acea+'?.'+_0x37eabc,_0x25b0de=_0x4a8c56[_0x143348]['Password'];_0x25b0de!=null?(_0x94054d+=_0x3ba618(0xd1)+_0x4a8c56[_0x143348]['ID']+_0x3ba618(0x103),_0x94054d+=_0x3ba618(0xd4)+_0x52292a+_0x3ba618(0xda),_0x94054d+='<p\x20class=\x22\x22>'+_0x12acea+_0x3ba618(0xae)):(_0x94054d+=_0x3ba618(0xf4)+_0x37eabc+'\x22;\x20onclick=\x22URLwithoutpass(\x27'+_0x427a7f+_0x3ba618(0xb8),_0x94054d+=_0x3ba618(0xd4)+_0x52292a+'\x22\x20height=\x2250\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>',_0x94054d+=_0x3ba618(0xbc)+_0x12acea+_0x3ba618(0xae));}else _0x94054d+=_0x3ba618(0x100);$(_0x3ba618(0xe5))[_0x3ba618(0xcd)](_0x94054d);}function a392_0x30fe(){var _0x2c4c68=['Error\x20getting\x20the\x20Approver\x20Inbox\x20Count\x20.','<div\x20class=\x22item\x22\x20onclick=\x22bindGroup(\x27','\x22\x20\x20\x20height=\x2250\x22\x20alt=\x22\x22/>','NotificationCenter','\x27)\x22>','Department','<a\x20href=\x22#\x22>','width','<p\x20class=\x22\x22>','Group','owlCarousel','141714gqfkdb','861528vFavGd','webAbsoluteUrl','show','userId','10YWkfIC','when','length','Designation','Link','attr','</p>','ready','LinkLocation','append','#password-field','<a\x20target=\x22_blank\x22\x20href=\x22','\x27\x20and\x20Status\x20eq\x20\x27Initiated\x27','<div\x20class=\x22group_box\x22\x20\x20data-dismiss=\x22modal\x22\x20onclick=\x22redirectLinks(','margin-right','416060SjJflM','<img\x20src=\x22','.TaskInbox','userEmail','1345690BPrcIz','/_api/lists/getbytitle(\x27ApprovalTaskList\x27)/items?$select=*&$Filter=AuthorId\x20eq\x20\x27','Url','\x22\x20height=\x2250\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>','application/json;odata=verbose','href','OpenTasksCount','<div\x20class=\x22item\x22>','log','#TaskOverdueOutbox','.TaskOutbox','\x27)\x20)&$orderBy=Modified\x20desc','Error\x20getting\x20the\x20Task\x20Inbox\x20Count.','#WorkPlaceAppLink','#GroupAppLink','#MyLinkGroupsModal','737448qikuhI','</a>','Please\x20enter\x20password\x20!','18QGSlki','modal','slice','.quick-slider','btoa','ServerRelativeUrl','open','\x27\x20and\x20CompanyId\x20eq\x20\x27','Quick-Links','done','<div\x20class=\x22group_box\x22><a\x20target=\x22_blank\x22\x20href=\x22','results','\x27)\x20or\x20(Audience\x20eq\x20\x27Selective\x27\x20and\x20SelectiveUsersId\x20eq\x20\x27','133fewWGT','SP.Data.NotificationCenterListItem','empty','Title','OverdueCount_Out','outbox','41962MbWzzE','\x22;\x20onclick=\x22URLwithoutpass(\x27','An\x20error\x20occurred.\x20Please\x20try\x20again.','<p\x20style=\x22text-align:center\x22\x20class=\x22noRecordFound\x22>No\x20Records\x20Found</p>','_blank','css',')\x22><a\x20href=\x22#\x22>','Designation,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/EMail&$expand=OfficeLocation,Department,AttachmentFiles,LogonName&$filter=LogonName/EMail\x20eq\x20\x27','GroupName','OpenTasksCount_Out','/_api/web/lists/GetByTitle(\x27ApplicationLink\x27)/items?$select=*&$filter=ID\x20eq\x20\x27','.ApprovalOutbox','Tasks','inbox','/_layouts/15/userphoto.aspx?accountname=','Password','#password','AttachmentFiles','/Pages/approvals.aspx?','/Pages/Mydashboard.aspx?WebAppId=','val','GET','Event_pick','wrong\x20Password.','#TaskPendingOutbox','#myModal','Windows','#ApprovalOutboxpendingCounter','text','\x22\x20\x20height=\x2250\x22\x20alt=\x22\x22/>','1124668AHUJer','#TaskOverdue','/_api/lists/getbytitle(\x27EmployeeTaskCounter\x27)/items?$top=5000&$select=ID,OpenTasksCount,OverdueCount,UserId/EMail&$expand=UserId&$filter=UserId/EMail\x20eq\x20\x27','#ApprovalPendingTask','<div\x20class=\x22item\x22\x20onclick=\x22redirectLinks(','\x27)/items?$select=','OverdueCount','</p></a></div>','Employees','hide','/_api/web/lists/getbytitle(\x27ApplicationLink\x27)/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$Filter=VisibleAt\x20eq\x20\x27Workplace\x27\x20and\x20Status\x20eq\x20\x271\x27\x20and\x20(Audience\x20eq\x20\x27Corporate\x27\x20or\x20(Audience\x20eq\x20\x27Company\x27\x20and\x20CompanyIdId\x20eq\x20\x27','</div>','ajax'];a392_0x30fe=function(){return _0x2c4c68;};return a392_0x30fe();}function bindevent(){var _0x261d63=a392_0x4e3381,_0x1d6cdb=$(_0x261d63(0x99))[_0x261d63(0x9d)](),_0x20cb2a=![];if(_0x1d6cdb=='')return alert(_0x261d63(0xe9)),![];var _0x4eaa62=_spPageContextInfo[_0x261d63(0xc1)]+_0x261d63(0x107)+glbId+'\x27';$[_0x261d63(0xb3)]({'url':_0x4eaa62,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x5c9a3c){var _0x3b44d8=_0x261d63,_0x50d183=_0x5c9a3c['d'][_0x3b44d8(0xf5)],_0x247c64=_0x50d183[0x0]['Password'],_0x421520=_0x50d183[0x0][_0x3b44d8(0xcc)][_0x3b44d8(0xd9)];if(_0x1d6cdb==_0x247c64){var _0x2f3b0c=_0x50d183[0x0][_0x3b44d8(0xfa)];addNotificationItem(_0x2f3b0c,_0x421520),$(_0x3b44d8(0xa2))[_0x3b44d8(0xeb)](_0x3b44d8(0xb0)),$(_0x3b44d8(0xce))[_0x3b44d8(0x9d)](''),window[_0x3b44d8(0xf0)](_0x421520,_0x3b44d8(0x101));}else alert(_0x3b44d8(0xa0)),$(_0x3b44d8(0xce))['val'](''),_0x20cb2a=!![];},'error':function(_0x3cf857){alert(_0x3cf857);}});if(_0x20cb2a==!![])return![];}function addNotificationItem(_0x317aab,_0x5ab056){var _0x58093c=a392_0x4e3381,_0x58c33e=_0x58093c(0xb7),_0x9a2c32;_0x9a2c32={'__metadata':{'type':_0x58093c(0xf8)},'Title':_0x317aab,'WebpartName':_0x58093c(0xf2),'UserAction':_0x58093c(0xf2),'Details':_0x5ab056,'LocationIDId':parseInt(Logged_Location),'Designation':Logged_Designation,'AppVersion':'2.7','UserImage':employeePicURL,'UserIDId':_spPageContextInfo[_0x58093c(0xc3)],'Application':'Website','ContentCategory':_0x317aab,'Environment':_0x58093c(0xa3),'DepartmentIdId':parseInt(Logged_DepartmentId),'CompanyIdId':parseInt(Logged_CompanyId)},$[_0x58093c(0xc5)](AddItemNotification(_0x58c33e,_0x9a2c32))[_0x58093c(0xf3)](function(_0x887021){var _0x2b5eef=_0x58093c;console[_0x2b5eef(0xdf)](_0x58c33e),console['log']('Save\x20Quick-Links!');});}var employeePicURL='';function GetImage(){var _0x3b70e5=a392_0x4e3381,_0x5bd077,_0x40c6b1,_0x244c71='';_0x5bd077=_0x3b70e5(0xaf);var _0x4e88b4=_spPageContextInfo[_0x3b70e5(0xd6)];_0x244c71=_0x3b70e5(0x104)+_spPageContextInfo[_0x3b70e5(0xd6)]+'\x27';var _0x13ab21=_spPageContextInfo['webAbsoluteUrl']+'/_api/web/lists/getbytitle(\x27'+_0x5bd077+_0x3b70e5(0xac)+_0x244c71;$[_0x3b70e5(0xb3)]({'url':_0x13ab21,'headers':{'Accept':_0x3b70e5(0xdb)},'async':![],'success':function(_0x46e004){var _0x4cb2dc=_0x3b70e5,_0x3f0f5f=_0x46e004['d'][_0x4cb2dc(0xf5)];employeePicURL='',_0x3f0f5f[_0x4cb2dc(0xc6)]>0x0?(Designation=_0x3f0f5f[0x0][_0x4cb2dc(0xc7)],Department=_0x3f0f5f[0x0][_0x4cb2dc(0xb9)],OfficeLocation=_0x3f0f5f[0x0]['OfficeLocation'],_0x3f0f5f[0x0][_0x4cb2dc(0x9a)]['results'][_0x4cb2dc(0xc6)]>0x0?employeePicURL=_0x3f0f5f[0x0][_0x4cb2dc(0x9a)][_0x4cb2dc(0xf5)][0x0][_0x4cb2dc(0xef)]:employeePicURL=_spPageContextInfo[_0x4cb2dc(0xc1)]+_0x4cb2dc(0x10b)+escapeProperly(_spPageContextInfo[_0x4cb2dc(0xd6)])):employeePicURL=_spPageContextInfo['webAbsoluteUrl']+'/_layouts/15/userphoto.aspx?accountname='+escapeProperly(_spPageContextInfo['userEmail']);},'error':function(_0x17a5f2){var _0x2b1b52=_0x3b70e5;console[_0x2b1b52(0xdf)](_0x17a5f2);}});}