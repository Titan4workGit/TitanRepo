var _0x3e439b=_0x588f;(function(_0x1a01fa,_0x5df890){var _0x251bc9=_0x588f,_0x3fc273=_0x1a01fa();while(!![]){try{var _0x552569=parseInt(_0x251bc9(0x1e4))/0x1*(parseInt(_0x251bc9(0x195))/0x2)+-parseInt(_0x251bc9(0x1a1))/0x3*(-parseInt(_0x251bc9(0x1e3))/0x4)+-parseInt(_0x251bc9(0x198))/0x5*(parseInt(_0x251bc9(0x1d0))/0x6)+parseInt(_0x251bc9(0x17e))/0x7*(parseInt(_0x251bc9(0x1aa))/0x8)+-parseInt(_0x251bc9(0x1b4))/0x9*(-parseInt(_0x251bc9(0x1c1))/0xa)+-parseInt(_0x251bc9(0x18b))/0xb*(parseInt(_0x251bc9(0x1a4))/0xc)+parseInt(_0x251bc9(0x1e6))/0xd*(parseInt(_0x251bc9(0x193))/0xe);if(_0x552569===_0x5df890)break;else _0x3fc273['push'](_0x3fc273['shift']());}catch(_0x2456f3){_0x3fc273['push'](_0x3fc273['shift']());}}}(_0x47cf,0x8b0ce));var currentDepartnemtUrls='',topiccategoryid='',departmentID='',newUserEmailIdGlobalVariable='';$(document)[_0x3e439b(0x17f)](function(){var _0x52b613=_0x3e439b;$[_0x52b613(0x1d6)]({'cache':![]}),departmentID=GetParameterValues(_0x52b613(0x1b3)),Logged_DepartmentId==departmentID?$(_0x52b613(0x1d5))['show']():$('#btnAddNewTopic')[_0x52b613(0x1ac)](),topiccategoryid=titanForWork[_0x52b613(0x1c9)]('topiccategoryid'),InitializationComponents(),$('.ddlCategoryList')[_0x52b613(0x186)](function(){var _0x53a8f5=_0x52b613;topiccategoryid=$(_0x53a8f5(0x1cb))[_0x53a8f5(0x1a9)](),GetTopicDetails(currentDepartnemtUrls,topiccategoryid,newUserEmailIdGlobalVariable);}),$(_0x52b613(0x1d5))['click'](function(){var _0xa845a9=_0x52b613;if(departmentID>0x0){var _0x3a3565=titanForWork[_0xa845a9(0x1c9)](_0xa845a9(0x1bf));document[_0xa845a9(0x180)][_0xa845a9(0x189)]=_0xa845a9(0x1a8)+departmentID+_0xa845a9(0x19f)+_0x3a3565+_0xa845a9(0x1d2);}}),$(_0x52b613(0x1a0))[_0x52b613(0x194)](function(){var _0x4961fd=_0x52b613,_0x3db039=titanForWork[_0x4961fd(0x1c9)](_0x4961fd(0x1bf));window[_0x4961fd(0x180)]['href']=_0x4961fd(0x18a)+departmentID+_0x4961fd(0x1d2);}),$(_0x52b613(0x1d3))['on'](_0x52b613(0x1dc),function(){var _0x199fd2=_0x52b613,_0x34518c=$(this)[_0x199fd2(0x1a9)]()[_0x199fd2(0x1cd)]();$(_0x199fd2(0x1e1))['filter'](function(){var _0x57100b=_0x199fd2;$(this)[_0x57100b(0x1e5)]($(this)[_0x57100b(0x1c3)]()[_0x57100b(0x1cd)]()['indexOf'](_0x34518c)>-0x1);});});});function GetTopicDetails(_0x580077,_0x4f8bc6,_0x4b7d8d){var _0x1b5b3b=_0x3e439b,_0x10db13='';if(_0x4b7d8d=='')_0x10db13=_0x1b5b3b(0x185)+_0x4f8bc6+_0x1b5b3b(0x1ca)+_spPageContextInfo[_0x1b5b3b(0x183)]+_0x1b5b3b(0x182)+_0x4f8bc6+'\x27)';else{if(_0x4b7d8d!='')_0x10db13=_0x1b5b3b(0x185)+_0x4f8bc6+_0x1b5b3b(0x19a)+_0x4b7d8d+_0x1b5b3b(0x1d8)+_spPageContextInfo[_0x1b5b3b(0x183)]+_0x1b5b3b(0x182)+_0x4f8bc6+_0x1b5b3b(0x1b7)+_0x4b7d8d+'\x27)';else{}}var _0xd4f39d=_0x580077+_0x1b5b3b(0x1a2)+_0x10db13;$['ajax']({'url':_0xd4f39d,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x4c5f0f){var _0x2d8df3=_0x1b5b3b,_0x1edc3f=_0x4c5f0f['d'][_0x2d8df3(0x1bd)],_0x3c70b8='';for(var _0x1721e3=0x0;_0x1721e3<_0x1edc3f[_0x2d8df3(0x19d)];_0x1721e3++){var _0x21b81d=_0x1edc3f[_0x1721e3]['Title'];_0x21b81d==null&&(_0x21b81d='');var _0xdad06e=_0x1edc3f[_0x1721e3][_0x2d8df3(0x1e2)];_0xdad06e==null&&(_0xdad06e='');var _0x39b571=_0x1edc3f[_0x1721e3][_0x2d8df3(0x1ce)]['Title'],_0x266857=_0x1edc3f[_0x1721e3][_0x2d8df3(0x18f)][_0x2d8df3(0x1bd)],_0x39c629='';UserDetails(_0x1edc3f[_0x1721e3]['Author']['Id']),_0x39c629=_0x1edc3f[_0x1721e3][_0x2d8df3(0x1c0)][_0x2d8df3(0x1b6)]+',\x20';if(_0x266857!=null)for(var _0x51175c=0x0;_0x51175c<_0x266857[_0x2d8df3(0x19d)];_0x51175c++){_0x266857[_0x51175c]['Id']!=_0x1edc3f[_0x1721e3][_0x2d8df3(0x1c0)]['Id']&&(_0x39c629+=_0x266857[_0x51175c][_0x2d8df3(0x1b6)]+',\x20');}_0x39c629=_0x39c629['replace'](/,(\s+)?$/,'');var _0xc8dd09=_0x2d8df3(0x1da)+_0x1edc3f[_0x1721e3]['ID']+_0x2d8df3(0x19f)+_0x1edc3f[_0x1721e3][_0x2d8df3(0x1ce)]['Id']+_0x2d8df3(0x18d)+departmentID+_0x2d8df3(0x1d1),_0x46f10d='';_0x1edc3f[_0x1721e3][_0x2d8df3(0x1d9)]!=null&&(_0x46f10d=new Date(_0x1edc3f[_0x1721e3]['ApprovedDate']),_0x46f10d=ShowCommonDateFormat(_0x46f10d));_0x3c70b8+=_0x2d8df3(0x1c8),_0x3c70b8+='<div\x20class=\x22row\x22>',_0x3c70b8+='<div\x20class=\x22col-md-2\x20col-sm-2\x20text-center\x22>';debugger;userPick==''&&(userPick=_0x2d8df3(0x1b0)),_0x3c70b8+=_0x2d8df3(0x1e7)+userPick+'\x22\x20alt=\x22\x22></div></div>',_0x3c70b8+=_0x2d8df3(0x1b9)+_0x39c629+_0x2d8df3(0x196)+userDepartment+_0x2d8df3(0x1be)+userOfficeLocation+_0x2d8df3(0x190)+_0x46f10d+_0x2d8df3(0x1c7),_0x3c70b8+=_0x2d8df3(0x184)+_0xc8dd09+'\x22>'+_0x21b81d+_0x2d8df3(0x1bc),_0x3c70b8+=_0x2d8df3(0x1b2)+_0xdad06e+_0x2d8df3(0x1c7),_0x1edc3f[_0x1721e3][_0x2d8df3(0x1cf)]==_0x2d8df3(0x1d7)&&(_0x3c70b8+=_0x2d8df3(0x188)+_0x1edc3f[_0x1721e3]['ID']+_0x2d8df3(0x19c)+_0x1edc3f[_0x1721e3]['ApprovalStatus']+_0x2d8df3(0x1db)),_0x3c70b8+='</div>',_0x3c70b8+=_0x2d8df3(0x19e),_0x3c70b8+=_0x2d8df3(0x19e);}$('#topicsListItems')[_0x2d8df3(0x1a6)](''),$(_0x2d8df3(0x1c6))[_0x2d8df3(0x18e)](_0x2d8df3(0x199),_0x2d8df3(0x1c5)),_0x1edc3f['length']==0x0&&($(_0x2d8df3(0x1c6))[_0x2d8df3(0x18e)](_0x2d8df3(0x199),_0x2d8df3(0x1a7)),_0x3c70b8=_0x2d8df3(0x192)),$(_0x2d8df3(0x1c6))['append'](_0x3c70b8);},'eror':function(_0x484ecd){var _0x294bbe=_0x1b5b3b;console[_0x294bbe(0x197)](_0x294bbe(0x1de));}});}function _0x47cf(){var _0x2cb56f=['Departments','left','#topicsListItems','</p></div></div>','<div\x20class=\x22panel_box\x20shadow3\x22>','getQueryStringParameter','\x27\x20and\x20ApprovalStatus\x20eq\x20\x27Approved\x27)\x20or\x20(ApprovalStatus\x20eq\x20\x27Draft\x27\x20and\x20AuthorId\x20eq\x20\x27','.ddlCategoryList','AttachmentFiles','toLowerCase','KnowledgeCategory','ApprovalStatus','6stqxNY','&Unidefined=Undefined','&undefined=undefined','#myInput','append','#btnAddNewTopic','ajaxSetup','Draft','\x27)\x20or\x20(ApprovalStatus\x20eq\x20\x27Draft\x27\x20and\x20AuthorId\x20eq\x20\x27','ApprovedDate','../Pages/TopicDetails.aspx?WebAppId=232&topicid=','</strong></em></a></p>','keyup','#deptName','error','webAbsoluteUrl','Title,ID&$filter=Status\x20eq\x20\x271\x27','#topicsListItems\x20div','Description','20YfyHlR','150461GZqlgS','toggle','7306fQuGNg','<div\x20class=\x22img_box\x22><img\x20src=\x22','indexOf','&topicid=','175mosLUp','ready','location','application/json;odata=verbose','\x27\x20and\x20KnowledgeCategory/Id\x20eq\x20\x27','userId','<div\x20class=\x22col-md-6\x20col-sm-12\x22><div\x20class=\x22Title_box\x22><p\x20class=\x22post_sec\x22><a\x20href=\x22','ID,Modified,ApprovedDate,ApprovalStatus,Title,Description,KnowledgeCategory/Title,KnowledgeCategory/Id,ApprovedDate,CoAuthor/Id,CoAuthor/UserName,CoAuthor/Title,ApprovedBy/Id,ApprovedBy/Title,Author/Id,Author/Title,Author/UserName,ApprovedBy/UserName&$expand=KnowledgeCategory,Author,ApprovedBy,CoAuthor&$filter=(KnowledgeCategory/Id\x20eq\x20\x27','change','#__REQUESTDIGEST','<p\x20class=\x22pull-right\x20status-p\x22\x20style=\x22font-size:16px\x22><a\x20onclick=\x22RedirectToEditTopic(','href','../Pages/KnowledgeCategory.aspx?WebAppId=232&DepartmentId=','7539807IYkBGY','<option></option>','&DepartmentId=','css','CoAuthor','</span><p\x20class=\x22date\x22><i\x20class=\x22fa\x20fa-calendar\x22></i>','empty','<strong\x20style=\x27font-size:14px\x27\x20data-localize=\x27NoTopicFound\x27></strong>','28532jwYxNw','click','2VxCZRZ','</h3><span>','log','3113015WtWBoK','text-align','\x27\x20and\x20ApprovalStatus\x20eq\x20\x27Approved\x27\x20and\x20Author/UserName\x20eq\x20\x27','slice',')\x22><i\x20class=\x22fa\x20fa-edit\x22></i><strong>','length','</div>','&topiccategoryid=','#btnGoBack','110847NiNzBB','/_api/web/lists/getbytitle(\x27KnowledgeBase\x27)/items?top=5000&$orderby=Modified\x20desc&$select=','value','12LdtrOY','attr','html','center','../Pages/AddKnowledge.aspx?WebAppId=232&DepartmentId=','val','93856MbxVvJ','/_api/web/lists/getbytitle(\x27KnowledgeBaseCategory\x27)/items?$select=','hide','OfficeLocation','/_api/web/lists/GetByTitle(\x27Employees\x27)/items?$select=*,Department/Title,OfficeLocation/Title,AttachmentFiles,LogonName/Id,LogonName/Title&$expand=AttachmentFiles,OfficeLocation,Department,LogonName&$filter=LogonNameId\x20eq\x20','Department','../SiteAssets/KnowledgeBase/dummy-user.png','#txtSomethingWentWrong','<div\x20class=\x22col-md-6\x20col-sm-12\x22><div\x20class=\x22description_box\x22><p>','DepartmentId','54SYNWwb','split','Title','\x27\x20\x20and\x20Author/UserName\x20eq\x20\x27','\x20and\x20CompanyId\x20eq\x20','<div\x20class=\x22col-md-3\x20col-sm-6\x22><div\x20class=\x22detail_box\x22><h3>','../Pages/AddKnowledge.aspx?WebAppId=232S&DepartmentId=','ajax','</a></p></div></div>','results','</span>\x20|\x20<span>','topiccategoryid','Author','172880HRqDBv','ServerRelativeUrl','text'];_0x47cf=function(){return _0x2cb56f;};return _0x47cf();}function InitializationComponents(){var _0x36c757=_0x3e439b;departmentID>0x0&&GetDepartmentUrl(_0x36c757(0x1c4),departmentID);}function RedirectToEditTopic(_0x43f419){var _0x3b578d=_0x3e439b,_0x42a125=_0x3b578d(0x1ba)+departmentID+_0x3b578d(0x1e9)+_0x43f419+_0x3b578d(0x1d2);document[_0x3b578d(0x180)]['href']=_0x42a125;}function GetDepartmentUrl(_0x39cc65,_0x374dfc){var _0x1d2b89=_0x3e439b,_0x5d54c0=_spPageContextInfo[_0x1d2b89(0x1df)]+'/_api/web/lists/getbytitle(\x27Departments\x27)/items?$select=ID,SiteURL,DepartmentName&$filter=ID\x20eq\x20\x27'+_0x374dfc+'\x27';$[_0x1d2b89(0x1bb)]({'url':_0x5d54c0,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x39fc84){var _0x2de9a5=_0x1d2b89,_0x2f77d7=_0x39fc84['d'][_0x2de9a5(0x1bd)];if(_0x2f77d7[_0x2de9a5(0x19d)]>0x0){currentDepartnemtUrls=_0x2f77d7[0x0]['SiteURL'];var _0x25f5ae=_0x2f77d7[0x0]['DepartmentName'];$(_0x2de9a5(0x1dd))[_0x2de9a5(0x1a6)](_0x25f5ae),BindCategory(),$(_0x2de9a5(0x1cb))[_0x2de9a5(0x1a9)](topiccategoryid),GetTopicDetails(currentDepartnemtUrls,topiccategoryid,newUserEmailIdGlobalVariable);}},'eror':function(_0x3af208){var _0x5b8574=_0x1d2b89;console[_0x5b8574(0x197)]($(_0x5b8574(0x1b1))[_0x5b8574(0x1a9)]());}});}function BindCategory(){var _0x1d4f65=_0x3e439b,_0x21c9c7='';$(_0x1d4f65(0x1cb))[_0x1d4f65(0x191)](),_0x21c9c7=_0x1d4f65(0x1e0);var _0x419b9e=currentDepartnemtUrls+_0x1d4f65(0x1ab)+_0x21c9c7;$['ajax']({'url':_0x419b9e,'headers':{'Accept':_0x1d4f65(0x181)},'async':![],'success':function(_0x31bdf3){var _0x260abe=_0x1d4f65,_0x22f209=_0x31bdf3['d'][_0x260abe(0x1bd)];for(var _0x146bad=0x0;_0x146bad<_0x22f209[_0x260abe(0x19d)];_0x146bad++){var _0x45d52a=_0x22f209[_0x146bad][_0x260abe(0x1b6)],_0x1ab1e5=_0x22f209[_0x146bad]['ID'];$(_0x260abe(0x1cb))[_0x260abe(0x1d4)]($(_0x260abe(0x18c))[_0x260abe(0x1a5)](_0x260abe(0x1a3),_0x1ab1e5)['text'](_0x45d52a));}},'eror':function(_0x3f413e){var _0x40176a=_0x1d4f65;console[_0x40176a(0x197)](_0x40176a(0x1de));}});}function GetParameterValues(_0x1ce52c){var _0x1bcd40=_0x3e439b,_0x46ffa9=window[_0x1bcd40(0x180)][_0x1bcd40(0x189)][_0x1bcd40(0x19b)](window[_0x1bcd40(0x180)]['href'][_0x1bcd40(0x1e8)]('?')+0x1)[_0x1bcd40(0x1b5)]('&');for(var _0x511fba=0x0;_0x511fba<_0x46ffa9['length'];_0x511fba++){var _0x2481e7=_0x46ffa9[_0x511fba][_0x1bcd40(0x1b5)]('=');if(_0x2481e7[0x0]==_0x1ce52c)return _0x2481e7[0x1];}}var userDepartment,userOfficeLocation,userPick='';function _0x588f(_0x23adeb,_0x115bde){var _0x47cf43=_0x47cf();return _0x588f=function(_0x588f85,_0xf5d283){_0x588f85=_0x588f85-0x17e;var _0x442975=_0x47cf43[_0x588f85];return _0x442975;},_0x588f(_0x23adeb,_0x115bde);}function UserDetails(_0x431336){var _0x58b58c=_0x3e439b,_0x2c43bf=_spPageContextInfo[_0x58b58c(0x1df)]+_0x58b58c(0x1ae)+_0x431336+_0x58b58c(0x1b8)+Logged_CompanyId+'';$[_0x58b58c(0x1bb)]({'url':_0x2c43bf,'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$(_0x58b58c(0x187))[_0x58b58c(0x1a9)](),'IF-MATCH':'*'},'async':![],'success':function(_0x4d6a7e){var _0x1dd7fb=_0x58b58c,_0x370f7e=_0x4d6a7e['d'][_0x1dd7fb(0x1bd)];userOfficeLocation='',userDesignation='',console[_0x1dd7fb(0x197)](_0x370f7e),_0x370f7e[0x0][_0x1dd7fb(0x1cc)][_0x1dd7fb(0x1bd)][_0x1dd7fb(0x19d)]>0x0&&(userPick=_0x370f7e[0x0][_0x1dd7fb(0x1cc)][_0x1dd7fb(0x1bd)][0x0][_0x1dd7fb(0x1c2)]),userDepartment=_0x370f7e[0x0][_0x1dd7fb(0x1af)][_0x1dd7fb(0x1b6)],userOfficeLocation=_0x370f7e[0x0][_0x1dd7fb(0x1ad)]['Title'];},'error':function(_0x328dff){}});}