var _0x59f6c=_0x279b;(function(_0x2ec7f2,_0x132e77){var _0x7ec8c3=_0x279b,_0x178a3f=_0x2ec7f2();while(!![]){try{var _0x407ef6=parseInt(_0x7ec8c3(0x1f9))/0x1*(-parseInt(_0x7ec8c3(0x193))/0x2)+parseInt(_0x7ec8c3(0x1e2))/0x3*(parseInt(_0x7ec8c3(0x1ef))/0x4)+parseInt(_0x7ec8c3(0x1fe))/0x5*(parseInt(_0x7ec8c3(0x1ae))/0x6)+-parseInt(_0x7ec8c3(0x1c3))/0x7*(-parseInt(_0x7ec8c3(0x1e9))/0x8)+-parseInt(_0x7ec8c3(0x1cd))/0x9*(-parseInt(_0x7ec8c3(0x1a6))/0xa)+-parseInt(_0x7ec8c3(0x1de))/0xb*(-parseInt(_0x7ec8c3(0x1a2))/0xc)+-parseInt(_0x7ec8c3(0x1c5))/0xd;if(_0x407ef6===_0x132e77)break;else _0x178a3f['push'](_0x178a3f['shift']());}catch(_0x4a826c){_0x178a3f['push'](_0x178a3f['shift']());}}}(_0x27ac,0x53a52));var currentDepartnemtUrls='',categoryId='',departmentID='',isCurrentUserAuthorizedtoKnowledgeAdmin=![];$(document)[_0x59f6c(0x197)](function(){var _0x2cb5d1=_0x59f6c;userActivityNotificationEntry(_spPageContextInfo[_0x2cb5d1(0x1e7)],window[_0x2cb5d1(0x1df)]),$[_0x2cb5d1(0x1a8)]({'cache':![]}),departmentID=GetParameterValues(_0x2cb5d1(0x1ad));Logged_DepartmentId==departmentID?$(_0x2cb5d1(0x19a))[_0x2cb5d1(0x1ac)]():$(_0x2cb5d1(0x19a))[_0x2cb5d1(0x1c9)]();var _0x55f358=titanForWork[_0x2cb5d1(0x1c8)](_0x2cb5d1(0x196)),_0x49ba8c=new Array();_0x49ba8c[_0x2cb5d1(0x1e0)]('Knowledge');var _0x5b2d95=UserExistInProcessApprover(_0x55f358,departmentID,_0x49ba8c);for(var _0xcf5721=0x0;_0xcf5721<_0x5b2d95[_0x2cb5d1(0x1eb)];_0xcf5721++){_0x5b2d95[_0xcf5721][_0x2cb5d1(0x19c)]==_0x2cb5d1(0x195)&&(isCurrentUserAuthorizedtoKnowledgeAdmin=!![]);}InitializationComponents(),$('#btnAddCateg')[_0x2cb5d1(0x1cf)](function(){var _0x319b9c=_0x2cb5d1;$(_0x319b9c(0x1d7))[_0x319b9c(0x1f0)](''),$(_0x319b9c(0x1fa))['modal'](_0x319b9c(0x1ac));}),$('#btnAddUpdateCategory')['click'](function(){var _0x281efc=_0x2cb5d1,_0x1c950a=$(_0x281efc(0x1d7))[_0x281efc(0x1f0)]()[_0x281efc(0x1e1)]();if(_0x1c950a!=''&&_0x1c950a!=null){var _0x3fcd13=categoryId;CategoryNameValidation(_0x1c950a,_0x3fcd13)==0x0?_0x3fcd13==''||_0x3fcd13==null?AddNewCategory():UpdateCategory(_0x3fcd13):alert(_0x281efc(0x1f6));}else alert(_0x281efc(0x1f7));}),$(_0x2cb5d1(0x19a))[_0x2cb5d1(0x1cf)](function(){var _0x9dff7c=_0x2cb5d1;departmentID>0x0&&(document[_0x9dff7c(0x1df)][_0x9dff7c(0x1a9)]='../Pages/AddKnowledge.aspx?WebAppId=232&DepartmentId='+departmentID+_0x9dff7c(0x1d3));}),isCurrentUserAuthorizedtoKnowledgeAdmin==![]&&$(_0x2cb5d1(0x1f8))[_0x2cb5d1(0x19f)]();});function InitializationComponents(){var _0x1bd1e3=_0x59f6c;departmentID>0x0&&GetDepartmentUrl(_0x1bd1e3(0x1db),departmentID);}function BindStatusChangeEvent(){var _0x1c92e7=_0x59f6c;$(_0x1c92e7(0x1b8))[_0x1c92e7(0x1b9)]()['change'](function(){var _0x20c7fb=_0x1c92e7,_0x1f7c2d=$(this)[_0x20c7fb(0x1f2)]('id'),_0x1b88f8=_0x1f7c2d[_0x20c7fb(0x19b)]('_')[0x1];$(this)['prop'](_0x20c7fb(0x1fd))?UpdateCategoryStatus(_0x1b88f8,!![]):UpdateCategoryStatus(_0x1b88f8,![]);});}function AddNewCategory(_0x220176){var _0x3ee5c4=_0x59f6c,_0x2a4fb0='KnowledgeBaseCategory',_0x87b7b4=GetItemTypeForListName(_0x2a4fb0),_0x4ab6ea;_0x4ab6ea={'__metadata':{'type':_0x87b7b4},'Status':!![],'Title':$(_0x3ee5c4(0x1d7))[_0x3ee5c4(0x1f0)]()[_0x3ee5c4(0x1e1)](),'PublishedCounter':'0','PendingCounter':'0','DraftCounter':'0'},$[_0x3ee5c4(0x1ff)](AddItemToList(_0x2a4fb0,_0x4ab6ea))[_0x3ee5c4(0x1f5)](function(_0x6f229d){var _0x534519=_0x3ee5c4;$('#myModal')[_0x534519(0x1e5)](_0x534519(0x1c9)),$(_0x534519(0x1d7))[_0x534519(0x1f0)](''),GetAllCategory(currentDepartnemtUrls),alert(_0x534519(0x1b0));})['fail'](function(){var _0x43aebb=_0x3ee5c4;console['log'](_0x43aebb(0x1b3));});;}function UpdateCategory(_0x72d8c9){var _0x52790e=_0x59f6c,_0x111980=_0x52790e(0x1da),_0x20e32c=GetItemTypeForListName(_0x111980),_0x3818ec;_0x3818ec={'__metadata':{'type':_0x20e32c},'Title':$(_0x52790e(0x1d7))['val']()[_0x52790e(0x1e1)]()},$['when'](updateItemWithID(_0x111980,_0x3818ec,_0x72d8c9))[_0x52790e(0x1f5)](function(_0x31d4c6){var _0x55e84c=_0x52790e;$('#myModal')[_0x55e84c(0x1e5)]('hide'),$(_0x55e84c(0x1d7))['val'](''),GetAllCategory(currentDepartnemtUrls),alert(_0x55e84c(0x194));})['fail'](function(){var _0x9d0e53=_0x52790e;console['log'](_0x9d0e53(0x1b3));});;}function UpdateCategoryStatus(_0x4afd0c,_0x122f53){var _0x3ed9e6=_0x59f6c,_0x204dcd=_0x3ed9e6(0x1da),_0x387fe8=GetItemTypeForListName(_0x204dcd),_0x3e597b;_0x3e597b={'__metadata':{'type':_0x387fe8},'Status':_0x122f53},$[_0x3ed9e6(0x1ff)](updateItemWithID(_0x204dcd,_0x3e597b,_0x4afd0c))[_0x3ed9e6(0x1f5)](function(_0x59226c){})[_0x3ed9e6(0x1b7)](function(){var _0x1fb841=_0x3ed9e6;console[_0x1fb841(0x1bd)]('Error\x20in\x20Category\x20Topic.');});;}function CategoryNameValidation(_0x13a71c,_0x26ede8){var _0x369b89=_0x59f6c,_0x4606c=0x0,_0x16c8d4='';_0x26ede8==''||_0x26ede8==null?_0x16c8d4=_0x369b89(0x1dc)+_0x13a71c+'\x27':_0x16c8d4=_0x369b89(0x1dc)+_0x13a71c+'\x27\x20and\x20ID\x20ne\x20\x27'+_0x26ede8+'\x27';var _0xb0127d=currentDepartnemtUrls+_0x369b89(0x1ba)+_0x16c8d4;return $['ajax']({'url':_0xb0127d,'headers':{'Accept':_0x369b89(0x1c4)},'async':![],'success':function(_0x32d8e0){var _0x428cb3=_0x369b89,_0x51dea0=_0x32d8e0['d'][_0x428cb3(0x1b2)];_0x4606c=_0x51dea0[_0x428cb3(0x1eb)];},'eror':function(_0x2ccfa8){var _0x7653e2=_0x369b89;console[_0x7653e2(0x1bd)](_0x7653e2(0x1be));}}),_0x4606c;}function GetAllCategory(_0x35659e){var _0x5a2eca=_0x59f6c,_0x356fd1='ID,Modified,Status,Title,PublishedCounter,PendingCounter,DraftCounter&$top=5000&$orderby=Modified\x20desc';isCurrentUserAuthorizedtoKnowledgeAdmin!=!![]&&(_0x356fd1=_0x356fd1+_0x5a2eca(0x1bf));var _0x1e094e=_0x35659e+_0x5a2eca(0x1ba)+_0x356fd1;$[_0x5a2eca(0x1b5)]({'url':_0x1e094e,'headers':{'Accept':_0x5a2eca(0x1c4)},'async':![],'success':function(_0x55c4df){var _0x797639=_0x5a2eca,_0x4a90a0=_0x55c4df['d'][_0x797639(0x1b2)],_0x1cccb2='';_0x1cccb2+='<table\x20class=\x22table\x20table2\x22>',_0x1cccb2+='<thead>',_0x1cccb2+=_0x797639(0x1d5),_0x1cccb2+=_0x797639(0x1b1),_0x1cccb2+=_0x797639(0x1b4),_0x1cccb2+='<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22Draft\x22>Draft</th>',_0x1cccb2+='<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22LastUpdated\x22>Last\x20Updated</th>';isCurrentUserAuthorizedtoKnowledgeAdmin==!![]&&(_0x1cccb2+=_0x797639(0x1ed),_0x1cccb2+='<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22Action\x22>Action</th>');_0x1cccb2+=_0x797639(0x1c1),_0x1cccb2+=_0x797639(0x1fc),_0x1cccb2+=_0x797639(0x1dd);for(var _0x15eb8b=0x0;_0x15eb8b<_0x4a90a0[_0x797639(0x1eb)];_0x15eb8b++){var _0x5da2e9=_0x4a90a0[_0x15eb8b][_0x797639(0x1a3)],_0x508341=_0x4a90a0[_0x15eb8b][_0x797639(0x1a0)],_0xfe1289='';_0x508341==!![]&&(_0xfe1289=_0x797639(0x1fd));var _0x3a36d6=new Date(_0x4a90a0[_0x15eb8b][_0x797639(0x19d)]),_0x489e3e=_0x4a90a0[_0x15eb8b][_0x797639(0x1c7)];_0x489e3e==null&&(_0x489e3e=0x0);var _0x1aa782=_0x4a90a0[_0x15eb8b][_0x797639(0x1bc)];_0x1aa782==null&&(_0x1aa782=0x0);var _0x355689=_0x4a90a0[_0x15eb8b][_0x797639(0x1ea)];_0x355689==null&&(_0x355689=0x0);var _0x203c1b=_0x4a90a0[_0x15eb8b][_0x797639(0x1aa)];_0x1cccb2+=_0x797639(0x1d5),_0x1cccb2+=_0x797639(0x1ec)+_0x4a90a0[_0x15eb8b]['ID']+_0x797639(0x1ab)+_0x5da2e9+_0x797639(0x1d6),_0x1cccb2+=_0x797639(0x1a1)+_0x489e3e+_0x797639(0x1fb),_0x1cccb2+=_0x797639(0x1a1)+_0x1aa782+_0x797639(0x1fb),_0x489e3e+_0x1aa782+_0x355689==0x0?_0x1cccb2+=_0x797639(0x1cc):_0x1cccb2+=_0x797639(0x1a1)+ShowCommonDateFormat(_0x3a36d6)+_0x797639(0x1fb),isCurrentUserAuthorizedtoKnowledgeAdmin==!![]&&(_0x1cccb2+=_0x797639(0x1a1),_0x1cccb2+='<label\x20class=\x22switch\x22>',_0x1cccb2+=_0x797639(0x1cb)+_0x4a90a0[_0x15eb8b]['ID']+_0x797639(0x1d9)+_0xfe1289+'>',_0x1cccb2+='<span\x20class=\x22slider\x20round\x22></span></label></td>',_0x1cccb2+='<td><span\x20class=\x22action-edit-button\x22><a\x20onclick=OpenUpdateModalPopup(\x22'+_0x4a90a0[_0x15eb8b]['ID']+_0x797639(0x1ce)+escape(_0x5da2e9)+_0x797639(0x1e4),_0x489e3e+_0x1aa782+_0x355689==0x0&&(_0x1cccb2+=_0x797639(0x198)+_0x4a90a0[_0x15eb8b]['ID']+'\x22)><i\x20class=\x22fa\x20fa-trash\x22></i></a></span>'),_0x1cccb2+=_0x797639(0x1fb)),_0x1cccb2+=_0x797639(0x1c1);}_0x1cccb2+=_0x797639(0x199),_0x1cccb2+='</table>',$(_0x797639(0x1d8))[_0x797639(0x1b6)](''),$(_0x797639(0x1d8))[_0x797639(0x1f4)](_0x1cccb2),BindStatusChangeEvent();},'eror':function(_0x440d5b){var _0x28f08b=_0x5a2eca;console[_0x28f08b(0x1bd)](_0x28f08b(0x1be));}});}function GetDepartmentUrl(_0x2e2658,_0x58f93e){var _0x178d20=_0x59f6c,_0x2a729d=_spPageContextInfo[_0x178d20(0x1c0)]+_0x178d20(0x1a4)+_0x58f93e+'\x27';$[_0x178d20(0x1b5)]({'url':_0x2a729d,'headers':{'Accept':_0x178d20(0x1c4)},'async':!![],'success':function(_0x2970f9){var _0xda5913=_0x178d20,_0x545264=_0x2970f9['d'][_0xda5913(0x1b2)];if(_0x545264[_0xda5913(0x1eb)]>0x0){currentDepartnemtUrls=_0x545264[0x0][_0xda5913(0x1e3)];var _0x3eaf3c=_0x545264[0x0][_0xda5913(0x1d0)];$(_0xda5913(0x1af))[_0xda5913(0x1b6)](_0x3eaf3c),GetAllCategory(currentDepartnemtUrls);}},'eror':function(_0x335634){var _0x597685=_0x178d20;console[_0x597685(0x1bd)]($(_0x597685(0x1d1))[_0x597685(0x1f0)]());}});}function updateItemWithID(_0x40028f,_0x3201e2,_0x314d3c){var _0x37c6b2=_0x59f6c,_0x5ac4b4=$[_0x37c6b2(0x1ee)]();return $['ajax']({'url':currentDepartnemtUrls+_0x37c6b2(0x1f3)+_0x40028f+_0x37c6b2(0x1bb)+_0x314d3c+'\x27)','type':'POST','headers':{'accept':_0x37c6b2(0x1c4),'X-RequestDigest':$(_0x37c6b2(0x200))[_0x37c6b2(0x1f0)](),'content-Type':_0x37c6b2(0x1c4),'X-Http-Method':'PATCH','If-Match':'*'},'data':JSON[_0x37c6b2(0x1a5)](_0x3201e2),'async':![],'success':function(_0x3e182f){var _0x5e52d9=_0x37c6b2;_0x5ac4b4[_0x5e52d9(0x1c2)](!![]);},'error':function(_0x19e024){var _0x20e5f0=_0x37c6b2;alert(JSON[_0x20e5f0(0x1a5)](_0x19e024)),_0x5ac4b4[_0x20e5f0(0x1e8)](_0x19e024);}}),_0x5ac4b4[_0x37c6b2(0x1d4)]();}function GetItemTypeForListName(_0x43d31d){var _0x2eccfc=_0x59f6c;return _0x2eccfc(0x19e)+_0x43d31d[_0x2eccfc(0x201)](0x0)['toUpperCase']()+_0x43d31d[_0x2eccfc(0x19b)]('\x20')['join']('')['slice'](0x1)+'ListItem';}function AddItemToList(_0x5dd212,_0x177c7f){var _0x124f2d=_0x59f6c,_0x29cf40=$['Deferred']();restQuery='ID';var _0x4f371a=currentDepartnemtUrls+'/_api/web/lists/getbytitle(\x27'+_0x5dd212+_0x124f2d(0x1d2)+restQuery;return $['ajax']({'url':_0x4f371a,'type':'POST','async':![],'headers':{'accept':_0x124f2d(0x1c4),'X-RequestDigest':$(_0x124f2d(0x200))[_0x124f2d(0x1f0)](),'content-Type':_0x124f2d(0x1c4)},'data':JSON[_0x124f2d(0x1a5)](_0x177c7f),'success':function(_0x1d2cee){var _0x7e3548=_0x124f2d,_0x5bb01a=_0x1d2cee['d']['ID'];_0x29cf40[_0x7e3548(0x1c2)](_0x1d2cee);},'error':function(_0x195431){var _0x3bed5a=_0x124f2d;alert(JSON[_0x3bed5a(0x1a5)](_0x195431)),_0x29cf40[_0x3bed5a(0x1e8)](_0x195431);}}),_0x29cf40[_0x124f2d(0x1d4)]();}function _0x27ac(){var _0x188137=['<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22Category\x22>Category</th>','results','Error\x20in\x20Category\x20Topic.','<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22Published\x22>Published</th>','ajax','html','fail','input[id^=\x27chkItemStatus_\x27]','unbind','/_api/web/lists/getbytitle(\x27KnowledgeBaseCategory\x27)/items?$select=','\x27)/GetItemById(\x27','DraftCounter','log','error','&$filter=Status\x20eq\x20\x271\x27','webAbsoluteUrl','</tr>','resolve','168ZcziPg','application/json;odata=verbose','11894948VraHmF','Are\x20you\x20sure,You\x20want\x20to\x20delete\x20this\x20category\x20?','PublishedCounter','getQueryStringParameter','hide','../Pages/Topics.aspx?WebAppId=232&DepartmentId=','<input\x20id=\x22chkItemStatus_','<td></td>','36rkrbdr','\x22,\x22','click','DepartmentName','#txtSomethingWentWrong','\x27)/items?$select=','&undefined=undefined','promise','<tr>','<a></td>','#txtCategory','#categoryListItems','\x22\x20type=\x22checkbox\x22\x20','KnowledgeBaseCategory','Departments','ID,Modified,Status,Title&$filter=Title\x20eq\x20\x27','<tbody\x20id=\x22listCollection\x22>','209WfNxIz','location','push','trim','19464YsUrKq','SiteURL','\x22)><i\x20class=\x22fa\x20fa-edit\x22></i></a></span>','modal','&topiccategoryid=','userId','reject','54472NycazP','PendingCounter','length','<td><a\x20style=\x22cursor:pointer\x22\x20onclick=\x22RedirectOnCategoryTopics(','<th\x20bgcolor=\x22efefef\x22\x20data-localize=\x22Status\x22>Status</th>','Deferred','388uWtaIv','val','DELETE','attr','/_api/web/lists/getbytitle(\x27','append','done','Category\x20name\x20is\x20already\x20exist.','Please\x20enter\x20category.','#btnAddCateg','18121WjlPwQ','#myModal','</td>','</thead>','checked','1281755FWQlnG','when','#__REQUESTDIGEST','charAt','6lgKPmP','Category\x20has\x20been\x20updated\x20successfully.','Knowledge','CompanyId','ready','<span\x20class=\x22action-delete-button\x22><a\x20onclick=DeleteItemCategory(\x22','</tbody>','#btnAddNewTopic','split','webPartName','Modified','SP.Data.','remove','Status','<td>','151224EvrJVm','Title','/_api/web/lists/getbytitle(\x27Departments\x27)/items?$select=ID,SiteURL,DepartmentName&$filter=ID\x20eq\x20\x27','stringify','58570yzDuaq','/_api/web/lists/getbytitle(\x27KnowledgeBaseCategory\x27)/items(','ajaxSetup','href','Description',')\x22>','show','DepartmentId','6IBiAiU','#deptName','Category\x20has\x20been\x20added\x20successfully.'];_0x27ac=function(){return _0x188137;};return _0x27ac();}function DeleteItemCategory(_0x5b6d37){var _0x1fbdfd=_0x59f6c,_0xd8ad0e=confirm(_0x1fbdfd(0x1c6));if(_0xd8ad0e==!![]){var _0x156def=$[_0x1fbdfd(0x1ee)](),_0x50efe3=currentDepartnemtUrls+_0x1fbdfd(0x1a7)+_0x5b6d37+')';return $[_0x1fbdfd(0x1b5)]({'url':_0x50efe3,'type':_0x1fbdfd(0x1f1),'contentType':'application/json;odata=verbose','headers':{'Accept':_0x1fbdfd(0x1c4),'X-RequestDigest':$('#__REQUESTDIGEST')[_0x1fbdfd(0x1f0)](),'IF-MATCH':'*','X-HTTP-Method':'DELETE'},'success':function(_0x3cff07){GetAllCategory(currentDepartnemtUrls),_0x156def['resolve'](_0x3cff07);},'error':function(_0x22ff4a){var _0x2a902e=_0x1fbdfd;_0x156def['reject'](JSON[_0x2a902e(0x1a5)](_0x22ff4a));}}),_0x156def[_0x1fbdfd(0x1d4)]();}}function OpenUpdateModalPopup(_0x999451,_0x5fd1f8){var _0x385c39=_0x59f6c;categoryId=_0x999451,_0x5fd1f8=unescape(_0x5fd1f8),$(_0x385c39(0x1d7))['val'](_0x5fd1f8),$(_0x385c39(0x1fa))[_0x385c39(0x1e5)](_0x385c39(0x1ac));}function RedirectOnCategoryTopics(_0x4692a9){var _0x3c7028=_0x59f6c;departmentID>0x0&&(document[_0x3c7028(0x1df)]['href']=_0x3c7028(0x1ca)+departmentID+_0x3c7028(0x1e6)+_0x4692a9+_0x3c7028(0x1d3));}function _0x279b(_0x3416a6,_0x17aaaa){var _0x27acd7=_0x27ac();return _0x279b=function(_0x279b7d,_0x4d1051){_0x279b7d=_0x279b7d-0x193;var _0x491ea7=_0x27acd7[_0x279b7d];return _0x491ea7;},_0x279b(_0x3416a6,_0x17aaaa);}function GetParameterValues(_0x4c6a15){var _0x1843e0=_0x59f6c,_0x5c487f=window[_0x1843e0(0x1df)][_0x1843e0(0x1a9)]['slice'](window[_0x1843e0(0x1df)][_0x1843e0(0x1a9)]['indexOf']('?')+0x1)[_0x1843e0(0x19b)]('&');for(var _0x2bb935=0x0;_0x2bb935<_0x5c487f[_0x1843e0(0x1eb)];_0x2bb935++){var _0x46fa9e=_0x5c487f[_0x2bb935][_0x1843e0(0x19b)]('=');if(_0x46fa9e[0x0]==_0x4c6a15)return _0x46fa9e[0x1];}}