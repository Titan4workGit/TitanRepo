(function(_0x3dbff9,_0x419e5e){var _0x2fe308=a17_0x1991,_0x5bbe8d=_0x3dbff9();while(!![]){try{var _0x2b06dc=parseInt(_0x2fe308(0xb2))/0x1*(parseInt(_0x2fe308(0x82))/0x2)+-parseInt(_0x2fe308(0x7c))/0x3+parseInt(_0x2fe308(0xc0))/0x4+parseInt(_0x2fe308(0x89))/0x5+parseInt(_0x2fe308(0xcb))/0x6*(parseInt(_0x2fe308(0xb5))/0x7)+parseInt(_0x2fe308(0x6c))/0x8+parseInt(_0x2fe308(0x85))/0x9*(-parseInt(_0x2fe308(0xc5))/0xa);if(_0x2b06dc===_0x419e5e)break;else _0x5bbe8d['push'](_0x5bbe8d['shift']());}catch(_0x4a8730){_0x5bbe8d['push'](_0x5bbe8d['shift']());}}}(a17_0x4cb5,0x53a2e),$(document)['ready'](function(){var _0x2bd3db=a17_0x1991;$('#closeNewCompanySite')[_0x2bd3db(0x8a)](function(){var _0x4b342c=_0x2bd3db,_0x29bfb6=titanForWork[_0x4b342c(0x7e)](_0x4b342c(0xc6));window[_0x4b342c(0xb6)][_0x4b342c(0xb8)]=_spPageContextInfo[_0x4b342c(0x6b)]+'/Pages/ManageCompanyDetails.aspx?WebAppId='+_0x29bfb6+_0x4b342c(0xc8);}),$(_0x2bd3db(0x99))[_0x2bd3db(0x8a)](function(){var _0x5cb27d=_0x2bd3db,_0x551013=$('#CompanyNameEng')[_0x5cb27d(0x70)]();if(_0x551013[_0x5cb27d(0x71)]()['length']!=0x0){var _0xa7e458=$(_0x5cb27d(0xba))[_0x5cb27d(0x70)]()[_0x5cb27d(0x6e)](/\s/g,'');if(checkSpecialCharaters(_0xa7e458)==!![])return alert(_0x5cb27d(0x7d)),![];if(_0xa7e458[_0x5cb27d(0xb1)]==0x0)return alert(_0x5cb27d(0xb9)),![];if(_0xa7e458[_0x5cb27d(0xb1)]>0x19)return alert(_0x5cb27d(0xc3)),![];var _0x215290=$(_0x5cb27d(0xbc))['val']();if(_0x215290[_0x5cb27d(0x71)]()[_0x5cb27d(0xb1)]==0x0)return alert(_0x5cb27d(0xa8)),![];var _0x33534f=$(_0x5cb27d(0x6f))['val']();waitingDialog[_0x5cb27d(0xa0)]();var _0x2bd624=GetWebTemplateGUID(_0xa7e458,_0x551013,_0x215290,_0x33534f);(_0x2bd624==''||_0x2bd624==null)&&alert(_0x5cb27d(0x9c));}else return alert(_0x5cb27d(0xc7)),![];});}));function checkSpecialCharaters(_0x5f1259){var _0x48743e=a17_0x1991,_0x26be40=_0x48743e(0x8e);for(i=0x0;i<_0x26be40[_0x48743e(0xb1)];i++){if(_0x5f1259[_0x48743e(0xc1)](_0x26be40[i])>-0x1)return!![];}return![];}function GetWebTemplateGUID(_0x494d3f,_0x55896e,_0x270dd6,_0x535243){var _0x11f151=a17_0x1991,_0x15142f='';return $['ajax']({'url':_spPageContextInfo[_0x11f151(0x6b)]+_0x11f151(0xb3),'method':'GET','async':![],'headers':{'Accept':_0x11f151(0xaf)},'success':function(_0x143696){var _0x11286b=_0x11f151,_0x982e82=_0x143696['d']['results'];for(var _0x22b2d6=0x0;_0x22b2d6<_0x982e82[_0x11286b(0xb1)];_0x22b2d6++){_0x982e82[_0x22b2d6][_0x11286b(0x76)]=='Company\x20Site'&&(_0x15142f=_0x982e82[_0x22b2d6][_0x11286b(0x90)],console['log'](_0x11286b(0x7f)),console['log']('Company\x20Site\x20Creating..'),createSite(_0x15142f,_0x494d3f,_0x55896e,_0x270dd6,_0x535243));}},'error':function(_0x3b9ba2){var _0x33f36b=_0x11f151;console[_0x33f36b(0x8d)](_0x33f36b(0xc4)+_0x3b9ba2[_0x33f36b(0x9e)]),waitingDialog[_0x33f36b(0xad)]();}}),_0x15142f;}function createSite(_0xa16079,_0x1032a7,_0x4e51c0,_0x49fcc8,_0x31aaa9){var _0x3533ef=a17_0x1991,_0x3bd4e8=_spPageContextInfo[_0x3533ef(0x6b)]+'/_api/web/webinfos/add',_0x417813=JSON[_0x3533ef(0x81)]({'parameters':{'__metadata':{'type':_0x3533ef(0xc9)},'Url':_0x1032a7,'Description':_0x3533ef(0x91),'Title':_0x4e51c0,'Language':0x409,'WebTemplate':_0xa16079,'UseUniquePermissions':![]}});$[_0x3533ef(0xab)]({'url':_0x3bd4e8,'type':_0x3533ef(0x84),'async':!![],'data':_0x417813,'headers':{'accept':'application/json;odata=verbose','content-type':'application/json;odata=verbose','X-RequestDigest':$('#__REQUESTDIGEST')[_0x3533ef(0x70)]()},'success':function(_0x789ec2){var _0x55cd43=_0x3533ef;console['log']('Company\x20Site\x20Created..'),console[_0x55cd43(0x8d)](_0x55cd43(0x9b));var _0x352775=_spPageContextInfo[_0x55cd43(0x6b)]+'/'+_0x1032a7;AddCompanyinList(_0x4e51c0,_0x31aaa9,_0x4e51c0,_0x49fcc8,_0x352775,'Companies');},'error':function(_0x46bdb9){var _0x5c4c0e=_0x3533ef;alert(_0x5c4c0e(0x8c)+_0x46bdb9['responseText']),console[_0x5c4c0e(0x8d)]('Error\x20creating\x20site'),waitingDialog[_0x5c4c0e(0xad)]();}});}function AddCompanyinList(_0x5e3df5,_0x13a67f,_0x46bda3,_0x29c4a4,_0x3d7233,_0x43c02a){var _0x132209=a17_0x1991,_0x5eefbc,_0xa08492=GetItemTypeForListNameDetailsGroups(_0x43c02a);_0x5eefbc={'__metadata':{'type':_0xa08492},'Title':_0x5e3df5,'CompanyType':_0x13a67f,'CompanyName':_0x46bda3,'EmailID':_0x29c4a4,'SiteURL':_0x3d7233};var _0x4a3f3c='';$['when'](AddItemToList(_0x43c02a,_0x5eefbc))[_0x132209(0x7a)](function(_0x413cc5){var _0xe39737=_0x132209;console['log'](_0xe39737(0x95)),console[_0xe39737(0x8d)](_0xe39737(0x78)),_0x4a3f3c=parseInt(_0x413cc5['d']['ID']),AddCompanyThemeMetadat(_0x4a3f3c),console[_0xe39737(0x8d)](_0xe39737(0xaa)),AddNavigationMetadat(_0x4a3f3c,0x0,0x1,'',_0xe39737(0xa5)),AddNavigationMetadat(_0x4a3f3c,0x0,0x2,'',_0xe39737(0xa2)),AddNavigationMetadat(_0x4a3f3c,0x0,0x3,'',_0xe39737(0x92)),AddNavigationMetadat(_0x4a3f3c,0x0,0x5,_0xe39737(0x97)+_0x4a3f3c,'My\x20Dashborad');var _0x4257b8='';$[_0xe39737(0x74)](AddNavigationMetadat(_0x4a3f3c,0x0,0x4,'',_0xe39737(0x94)))['done'](function(_0x30a24b){var _0x51528e=_0xe39737;_0x4257b8=parseInt(_0x30a24b),AddNavigationMetadat(_0x4a3f3c,_0x4257b8,0x1,_0x51528e(0x86)+_0x4a3f3c,_0x51528e(0x9d)),AddNavigationMetadat(_0x4a3f3c,_0x4257b8,0x2,_0x51528e(0x79)+_0x4a3f3c,_0x51528e(0x88)),AddNavigationMetadat(_0x4a3f3c,_0x4257b8,0x3,_0x51528e(0xac)+_0x4a3f3c,_0x51528e(0x98));});var _0x57d7bf='';$['when'](AddNavigationMetadat(_0x4a3f3c,0x0,0x6,'',_0xe39737(0xa3)))[_0xe39737(0x7a)](function(_0x3f20b6){var _0x557de1=_0xe39737;_0x57d7bf=parseInt(_0x3f20b6),AddNavigationMetadat(_0x4a3f3c,_0x57d7bf,0x1,_0x557de1(0xc2)+_0x4a3f3c+_0x557de1(0xb0)+_spPageContextInfo[_0x557de1(0x6b)],_0x557de1(0xa9)),AddNavigationMetadat(_0x4a3f3c,_0x57d7bf,0x2,_0x557de1(0xb7)+_0x4a3f3c,_0x557de1(0x83)),AddNavigationMetadat(_0x4a3f3c,_0x57d7bf,0x5,'Pages/OrgChart.aspx?WebAppId='+_0x4a3f3c,_0x557de1(0x7b)),AddNavigationMetadat(_0x4a3f3c,_0x57d7bf,0x6,_0x557de1(0x96)+_0x4a3f3c,_0x557de1(0x73)),AddCurrentUserasEmployee(_0x4a3f3c,_spPageContextInfo[_0x557de1(0xbd)],_spPageContextInfo['userDisplayName'],_spPageContextInfo[_0x557de1(0xae)]),AddCurrentUserasTechAdmin(_0x4a3f3c,_spPageContextInfo[_0x557de1(0xbd)]),console['log'](_0x557de1(0xbf)),waitingDialog[_0x557de1(0xad)]();}),console['log'](_0xe39737(0xa6));});}function a17_0x4cb5(){var _0x3dd7d8=['Home','Navigation\x20added\x20in\x20\x20Navigation\x20list...','reject','Please\x20enter\x20emailid.','Emergency\x20Announcement','Navigation\x20adding\x20in\x20\x20Navigation\x20list...','ajax','Pages/ViewProjectGrid.aspx?WebAppId=','hide','userEmail','application/json;\x20odata=verbose','&sourcelocation=','length','32731AbBzow','/_api/web/getavailablewebtemplates(lcid=1033,\x20doincludecrosslanguage=true)','resolve','42ZKZgbv','location','Pages/AdminPortal.aspx?WebAppId=','href','Please\x20enter\x20url\x20keywords.','#txtUrlPath','/_api/web/lists/getbytitle(\x27','#massMailID','userId','application/json;odata=verbose','Current\x20Users\x20added\x20in\x20\x20employee\x20list\x20for\x20this\x20company...','364588yrnVTf','indexOf','Pages/ManageEmergencyAnnounce.aspx?WebAppId=','Maximum\x2025\x20Character\x20are\x20allowed.','error\x20not\x20found\x20GetWebTemplateGUID','110wAWOTr','CompanyId','Please\x20enter\x20company\x20name.','&sourcelocation=../Pages/AdminPortal.aspx','SP.WebInfoCreationInformation','Tech\x20Admin','411006dFmNoK','webAbsoluteUrl','1707056kJGNPC','split','replace','#companyType','val','trim','promise','Reset\x20theme\x20and\x20language','when','Navigation','Title','SP.Data.','Default\x20theme\x20adding...','Pages/officeLocation.aspx?WebAppId=','done','Org.\x20Chart','1489470jSPzGo','Special\x20Character\x20are\x20not\x20allowed\x20in\x20url.','getQueryStringParameter','Got\x20Company\x20template\x20','Active','stringify','22oYnetB','Admin\x20Portal','POST','455967OeELuP','Pages/EmployeeDirectory.aspx?WebAppId=','Company\x20has\x20been\x20created\x20successfully.','Office\x20Locations','1603905OEKjWs','click','DefaultTheme','<br\x20/>','log','<>@!#$%^&*()+[]{}?:;|\x27\x22\x5c,/~`-=','Employees','Name','Subsite\x20created\x20from\x20REST\x20API','My\x20Documents','Deferred','Directory','Company\x20is\x20added\x20in\x20list...','Pages/resettheme.aspx?WebAppId=','Pages/mydashboard.aspx?WebAppId=','Projects','#createNewCompanySite','slice','Company\x20is\x20adding\x20in\x20list...','Company\x20site\x20template\x20is\x20not\x20availbale\x20to\x20create\x20new\x20company\x20site.','Employee\x20Directory','responseText','ProcessApprovers','show','#__REQUESTDIGEST','Department','More','ListItem'];a17_0x4cb5=function(){return _0x3dd7d8;};return a17_0x4cb5();}function AddNavigationMetadat(_0x3f97db,_0x8864eb,_0x662e35,_0x17d2d5,_0x54f1b7){var _0x7af44c=a17_0x1991;_0x8864eb=parseInt(_0x8864eb),_0x662e35=parseInt(_0x662e35),_0x3f97db=parseInt(_0x3f97db);var _0x136fc4=_0x7af44c(0x75),_0x2cc43c,_0x2ba92e=GetItemTypeForListNameDetailsGroups(_0x136fc4);_0x2cc43c={'__metadata':{'type':_0x2ba92e},'CompanyId':_0x3f97db,'ParentId':_0x8864eb,'Status':!![],'Postion':_0x662e35,'URL':_0x17d2d5,'Menu':_0x54f1b7,'Description':_0x54f1b7,'Title':_0x54f1b7};var _0x10af41='';return $['when'](AddItemToList(_0x136fc4,_0x2cc43c))[_0x7af44c(0x7a)](function(_0x1146c7){_0x10af41=_0x1146c7['d']['ID'];}),_0x10af41;}function AddCompanyThemeMetadat(_0x5273eb){var _0x3bd2d8=a17_0x1991;_0x5273eb=parseInt(_0x5273eb);var _0x262066='CompanyThemes',_0x2dca95,_0x390f6a=GetItemTypeForListNameDetailsGroups(_0x262066);_0x2dca95={'__metadata':{'type':_0x390f6a},'Title':_0x3bd2d8(0x8b),'CompanyNameId':_0x5273eb,'ThemeName':_0x3bd2d8(0x8b)};var _0x2fc2c9='';return $[_0x3bd2d8(0x74)](AddItemToList(_0x262066,_0x2dca95))['done'](function(_0x51444b){_0x2fc2c9=_0x51444b['d']['ID'];}),_0x2fc2c9;}function AddCurrentUserasEmployee(_0x33c66f,_0xec3574,_0x365a14,_0x2fbe48){var _0x42e2de=a17_0x1991,_0x4d2e88=_0x42e2de(0x8f),_0x5a86dc,_0xf66986=GetItemTypeForListNameDetailsGroups(_0x4d2e88);_0x5a86dc={'__metadata':{'type':_0xf66986},'CompanyId':_0x33c66f,'FullName':_0x365a14,'ParentId':'-1','Email':_0x2fbe48,'LogonNameId':_0xec3574,'Status':_0x42e2de(0x80)},$[_0x42e2de(0x74)](AddItemToList(_0x4d2e88,_0x5a86dc))[_0x42e2de(0x7a)](function(_0x510245){var _0x12dfe4=_0x42e2de;waitingDialog[_0x12dfe4(0xad)]();});}function AddCurrentUserasTechAdmin(_0x46d826,_0x419438){var _0x42748a=a17_0x1991,_0x510d69=new Array();_0x510d69['push'](_0x419438);var _0x5bfc97=_0x42748a(0x9f),_0x411742,_0x3a06a4=GetItemTypeForListNameDetailsGroups(_0x5bfc97);_0x411742={'__metadata':{'type':_0x3a06a4},'CompanyId':_0x46d826,'WebPartName':_0x42748a(0xca),'ContributorsId':{'results':_0x510d69}},$[_0x42748a(0x74)](AddItemToList(_0x5bfc97,_0x411742))[_0x42748a(0x7a)](function(_0xec2544){var _0x4bd9bc=_0x42748a;alert(_0x4bd9bc(0x87)),waitingDialog[_0x4bd9bc(0xad)]();});}function AddItemToList(_0x151274,_0x486b3e){var _0x2bf193=a17_0x1991,_0x12d4db=$[_0x2bf193(0x93)]();return $['ajax']({'url':_spPageContextInfo['webAbsoluteUrl']+_0x2bf193(0xbb)+_0x151274+'\x27)/items','type':_0x2bf193(0x84),'async':![],'headers':{'accept':_0x2bf193(0xbe),'X-RequestDigest':$(_0x2bf193(0xa1))['val'](),'content-Type':_0x2bf193(0xbe)},'data':JSON[_0x2bf193(0x81)](_0x486b3e),'success':function(_0x349494){var _0x18330f=_0x2bf193;console[_0x18330f(0x8d)](_0x151274),_0x12d4db[_0x18330f(0xb4)](_0x349494);},'error':function(_0x54b239){var _0x58418c=_0x2bf193;alert(JSON['stringify'](_0x54b239)),_0x12d4db[_0x58418c(0xa7)](_0x54b239);}}),_0x12d4db[_0x2bf193(0x72)]();}function a17_0x1991(_0x4417a9,_0x238d04){var _0x4cb550=a17_0x4cb5();return a17_0x1991=function(_0x19918d,_0x57d448){_0x19918d=_0x19918d-0x6b;var _0x3a2539=_0x4cb550[_0x19918d];return _0x3a2539;},a17_0x1991(_0x4417a9,_0x238d04);}function GetItemTypeForListNameDetailsGroups(_0x5104dc){var _0x40d473=a17_0x1991;return _0x40d473(0x77)+_0x5104dc['charAt'](0x0)['toUpperCase']()+_0x5104dc[_0x40d473(0x6d)]('\x20')['join']('')[_0x40d473(0x9a)](0x1)+_0x40d473(0xa4);}