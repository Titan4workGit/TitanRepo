﻿var _0x1f04e8=_0x26a8;(function(_0x1465a5,_0x5ca996){var _0xb70c4f=_0x26a8,_0x482fb4=_0x1465a5();while(!![]){try{var _0x2e763c=parseInt(_0xb70c4f(0x24e))/0x1*(parseInt(_0xb70c4f(0x28f))/0x2)+parseInt(_0xb70c4f(0x225))/0x3*(parseInt(_0xb70c4f(0x2d9))/0x4)+parseInt(_0xb70c4f(0x1e8))/0x5+-parseInt(_0xb70c4f(0x2e4))/0x6+-parseInt(_0xb70c4f(0x1f3))/0x7*(parseInt(_0xb70c4f(0x26a))/0x8)+parseInt(_0xb70c4f(0x248))/0x9+parseInt(_0xb70c4f(0x23e))/0xa;if(_0x2e763c===_0x5ca996)break;else _0x482fb4['push'](_0x482fb4['shift']());}catch(_0x29b87b){_0x482fb4['push'](_0x482fb4['shift']());}}}(_0x471a,0x6dd72));var arrayLinksDoctype=new Array(),currentSharedItemId='',LoggedIn_TimeZone=new Date()[_0x1f04e8(0x2cb)]()[_0x1f04e8(0x1fd)](/([A-Z]+[\+-][0-9]+.*)/)[0x1];$(document)[_0x1f04e8(0x204)](function(){var _0x5875a9=_0x1f04e8;$(_0x5875a9(0x1fb))[_0x5875a9(0x216)](function(){var _0x2bcdc4=_0x5875a9;if($('.SharedWithMe')[_0x2bcdc4(0x208)](_0x2bcdc4(0x28d))==_0x2bcdc4(0x243)){var _0x3e883e=_0x2bcdc4(0x260),_0x2c6edf=_0x2bcdc4(0x2c6),_0x5f38cc=0xc8,_0x1a7eb5=0x190;currentDlg=SP['UI']['ModalDialog'][_0x2bcdc4(0x207)](_0x3e883e,_0x2c6edf,_0x5f38cc,_0x1a7eb5),setTimeout(function(){GetDocumentsSharedWithMe();},0x64);}}),$('#permissionStatus')['change'](function(){var _0x19939c=_0x5875a9;permissionStaus=$('#permissionStatus')[_0x19939c(0x287)](),CurrentPermissionStatus(permissionStaus);});});function IconProperties(_0x57ad30,_0xf7f013){var _0x3abd9a=_0x1f04e8,_0x288240=[];return _0x288240[_0x3abd9a(0x2cf)]=_0x57ad30,_0x288240[_0x3abd9a(0x1f7)]=_0xf7f013,_0x288240;}function CurrentPermissionStatus(_0x215068){var _0x252b51=_0x1f04e8;LoggedUserSPGp=GetSPGroup();var _0x43f5eb='';for(var _0xcee130=0x0;_0xcee130<LoggedUserSPGp[_0x252b51(0x22b)];_0xcee130++){_0x43f5eb+=_0x252b51(0x1f0)+LoggedUserSPGp[_0xcee130]['Id']+'\x27\x20';}var _0x37bcff=getTargetGroupId();for(var _0xcee130=0x0;_0xcee130<_0x37bcff[_0x252b51(0x22b)];_0xcee130++){_0x43f5eb+=_0x252b51(0x1f0)+_0x37bcff[_0xcee130]+'\x27\x20';}_0x43f5eb=_0x43f5eb[_0x252b51(0x245)](0x0,_0x43f5eb['length']-0x1)+')';if(_0x215068==_0x252b51(0x1df)){var _0x281f97=_0x252b51(0x21f)+_spPageContextInfo['userId']+'\x27\x20'+_0x43f5eb+'\x20and\x20(PermissionType\x20eq\x20\x27Read\x27\x20or\x20PermissionType\x20eq\x20\x27Contribute\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27'+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27';GetDocumentsSharedWithMe(_0x281f97);}else{if(_0x215068==_0x252b51(0x23f)){var _0x281f97='&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27\x20'+_0x43f5eb+_0x252b51(0x283)+_spPageContextInfo['userId']+'\x27';GetDocumentsSharedWithMe(_0x281f97);}else{if(_0x215068=='Contribute'){var _0x281f97=_0x252b51(0x21f)+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27\x20'+_0x43f5eb+'\x20and\x20(PermissionType\x20eq\x20\x27Contribute\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27'+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27';GetDocumentsSharedWithMe(_0x281f97);}else{if(_0x215068==_0x252b51(0x249)){var _0x281f97='&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27\x20'+_0x43f5eb+_0x252b51(0x1ec)+_spPageContextInfo['userId']+'\x27';GetDocumentsSharedWithMe(_0x281f97);}else{if(_0x215068==_0x252b51(0x200)){var _0x281f97=_0x252b51(0x21f)+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27\x20'+_0x43f5eb+_0x252b51(0x1f1)+_spPageContextInfo['userId']+'\x27';GetDocumentsSharedWithMe(_0x281f97);}else{if(_0x215068==_0x252b51(0x2b7)){var _0x281f97='&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27\x20'+_0x43f5eb+_0x252b51(0x1fc)+_spPageContextInfo[_0x252b51(0x1fe)]+'\x27';GetDocumentsSharedWithMe(_0x281f97);}}}}}}}function _0x471a(){var _0x1b557b=['?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID\x20eq\x20\x27','false','#mainDivAreaSharedFolderDocuments','substring','css','html','356040hSDxiF','Revoked','empty','\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>','stringify','getMonth','2IOPSpP','undefined','head','</td><td\x20class=\x27dwnld_cell\x27\x20style=\x27text-align:center\x27></td></tr>','\x20and\x20(PermissionType\x20eq\x20\x27Read\x27\x20or\x20PermissionType\x20eq\x20\x27Contribute\x27\x20or\x20PermissionType\x20eq\x20\x27Restricted\x20View\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)','</div></div>','getDate','\x27\x20target=\x27_blank\x27\x20download><span\x20class=\x27glyphicon\x20glyphicon-download-alt\x27></span></a>','image-icon.png','\x27\x20and\x20ViewsBy/EMail\x20eq\x20\x27','sorter','SPMember','getMinutes','#columnsSharedWithMe','.mov','/_api/web/sitegroups/getbyname(\x27ALL_EMPLOYEE\x27)?$select=id','pdf.png','sorterSharedWithMe','Loading...','Folders','.tiff','</a></td><td>','text','<option\x20value=\x220\x22>File</option>','<span\x20class=\x27glyphicon\x20glyphicon-folder-open\x27></span>&nbsp;&nbsp;','totalrecordsSharedWithMe','.wmv','.mp3','8iZysRH','asc','<div\x20class=\x22breakbox\x22><input\x20type=\x22checkbox\x22\x20id=\x22txtAcknoldge\x22><label\x20class=\x22detail-label\x22\x20id=\x22AckHeading\x22>Acknowledgement</label></div><div\x20class=\x22breakbox\x22><label\x20class=\x22detail-label\x22\x20id=\x22AckText\x22>By\x20clicking\x20this\x20you\x20agree\x20that\x20you\x20understandand\x20acknowledge\x20this\x20documents.</label></div>','</a>','pagedropdownSharedWithMe','#txtShareOn','/_layouts/15/images/','Created','\x27);\x22>','#documentShareWithmeNoRecordFound','<div\x20class=\x22AckBox\x22>','checked','Yes','ajax','CSV.png','.doc','file.png','responseJSON','done','<a\x20href=\x27','\x22);\x27\x20name=\x27','.png','<li><div\x20class=\x22detailsectionbox\x22><span\x20class=\x22imgboxsectin\x22><img\x20src=\x22','\x27/>','application/json;odata=verbose','\x20and\x20(PermissionType\x20eq\x20\x27Read\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Restricted\x20View</div>','IPAddress','July','val','#ParentAck','<a\x20href=\x22javascript:void(0);\x22\x20class=\x22emilbox\x22\x20style=\x22cursor:pointer;color:blue;\x22\x20onclick=\x22OpenEmail(\x27','.gif','Deferred','null','aria-expanded','Feb','164062IgLRkZ','DocumentNo','.ogv','DocumentAcknowledgement','webAbsoluteUrl','Contribute','folder','/_api/web/currentuser/?$expand=groups','Modified','<tr><td><a\x20href=\x27javascript:void(0);\x27\x20onclick=\x27OpenFolderWithAllFileFolder(\x22','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Read</div>','\x27\x20and\x20Acknowledge\x20eq\x20\x271\x27','\x22\x20name=\x22','.pcm','#__REQUESTDIGEST','txt.png','SharedFileTitle','Are\x20you\x20sure\x20to\x20acknowledge\x20this\x20document\x20?','#myModalGetSharedFilesFolder','interactivepreview','#txtShareBy','.wma','System\x20Account','promise','OwnerTitle','#FileName','.arz','currentpageSharedWithMe','\x27,progid=\x27\x27,size=0)','Apr','Dec','#divPendingAck','.csv','&parent=','\x22\x20onclick=\x22DisplayFileProperty(this,\x20\x27','.pdf','AccessLevel','SharedType','.wim','IsBlock','All','/_layouts/15/userphoto.aspx?accountname=','ShareWith','.jpeg','SiteURL','.rpm','modal','#mydmsNorecordFoundSharedFolder','<div\x20class=\x22AckStatus\x22\x20style=\x22color:green;cursor:pointer;\x22\x20onclick=\x22OpenAckNotify(\x27','.zip','ServerRelativeUrl','black','Oct','xlsx.png','POST','<br\x20/>Please\x20wait!!','when','evenselected','DepartmentalDMS','<a\x20href=\x22javascript:void(0);\x22\x20style=\x22color:blue;\x22\x20rel=\x22','toString','Personal','Mar','#txtPendingCount','iconType','log','#AckHeading','PermissionStatus','/Forms/AllItems.aspx?id=','ActionByTimeZone','fontcolor','Author','.pptx','/DepartmentalDMS/Forms/AllItems.aspx?id=','272bMxeVk','Title','split','</p><p\x20style=\x22color:black;font-size:12px;\x22>','</div></div></div>','includes','pptx.png','</td><td\x20class=\x27dwnld_cell\x27\x20style=\x27text-align:center\x27>','</td><td>','Aug','ListItemAllFields','4245126BVJAYz','Groups','selectedrowSharedWithMe','\x27,\x20\x27','replace','disabled','<option\x20value=\x221\x22>Title</option>','.docx','Shared\x20with\x20','Documents','close','oddselected','ViewsBy','<a\x20href=\x27javascript:void(0);\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27../SiteAssets/MyDocuments/DMS/assets/images/','Files','DocumentManagementSystem','May','EMail','.rar','indexOf','SharedWithMe','SharedFrom','\x27);\x22\x20class=\x22AckStatus\x22>Acknowledge</a>','\x22);\x27><img\x20width=\x2730px\x27\x20src=\x27../SiteAssets/MyDocuments/DMS/assets/images/','/_api/web/Lists/GetByTitle(\x27SharedDocument\x27)/Items?$select=*,ID,SharedType,SharedFrom,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/EMail,Author/ID&$orderby=Modified\x20desc&$expand=SharedUsers,Author','error','filter','NeedAcknowledgement','#txtAcknoldge','.avi','origin','<option\x20value=\x222\x22>Reference#</option>','</p></div></li>','?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created\x20desc&$filter=Id\x20eq\x20\x27','PermissionType','ZIP.png','#txtSharePermission','color','docx.png','endrecordSharedWithMe','.txt','results','My-DMS:','#mainDivAreaSharedWithMe','prop','--select--','permited','getFullYear','getHours','folder.png','<tr><td>','Sept','startrecordSharedWithMe','webServerRelativeUrl','userEmail','4455700QQVqfV','/_api/Web/GetFolderByServerRelativeUrl(\x27','DocumentURL','.psd','\x20and\x20(PermissionStatus\x20eq\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27','DocumentType','<a\x20href=\x27javascript:void(0);\x27\x20onclick=\x27OpenFolderWithAllFileFolder(\x22','#AckText','or\x20SharedUsers/ID\x20eq\x20\x27','\x20and\x20(PermissionStatus\x20eq\x20\x27Deleted\x27)\x20and\x20Author/ID\x20ne\x20\x27','.cab','4671989luyfAL','\x27\x20and\x20DocumentID\x20eq\x20\x27','\x27\x20alt=\x27','audio.png','image','GET','PATCH','default&mobileredirect=true','.SharedWithMe','\x20and\x20Author/ID\x20ne\x20\x27','match','userId','green','Deleted','.flv','video-files.png','Restricted\x20View','ready','columnsSharedWithMe','Shared%20Documents','showWaitScreenWithNoClose','attr','<option\x20value=\x227\x22>Shared\x20from</option>','/DocumentManagementSystem/Forms/AllItems.aspx?id=','View','<div\x20class=\x22Acknowledgementsec\x22><p\x20style=\x22color:green\x22>Acknowledged</p><p\x20style=\x22color:green\x22>','TFW_Employees','</a></td><td></td><td></td><td></td><td></td></tr>','</td></tr>','push','lastIndexOf','/_api/web/maptoicon(filename=\x27','Default','Contributors','My-DMS','click','SharedOn','SharedDocument','show','\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27../SiteAssets/MyDocuments/DMS/assets/images/','#ShareTabSharing','My\x20Documents','.7z','location','&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27','hide','#Acknowledgement','Nov','Owners','\x22,\x20\x22','13746bwXrHG','totalpagesSharedWithMe','substr','</div></div></div><div\x20class=\x22SharedFromHTML\x22>','Jun','append','length','#AckUserList','</h3><div\x20class=\x22ModifiedDate\x22>','ServerRedirectedEmbedURL','.aac','</td><tdstyle=\x27display:none;\x27>','.mp4','Name','<option\x20value=\x223\x22>Type</option>','<div\x20class=\x22SharedByData\x22><div\x20class=\x22empoyeeimg\x22><img\x20src=\x22','/_api/Web/Lists/getByTitle(\x27DocumentAcknowledgement\x27)/Items(','<a\x20href=\x22javascript:void(0);\x22\x20rel=\x22','SP.Data.DocumentAcknowledgementListItem','</span><div\x20class=\x22detalbox\x22>','<option\x20value=\x225\x22>Shared\x20By</option>','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>','<div\x20class=\x22employeeinfo\x22><h3>','SharedUsers','</td><td\x20style=\x27display:none;\x27>','4185160VpQyjL','Read','evenrow','Details'];_0x471a=function(){return _0x1b557b;};return _0x471a();}function GetSPGroup(){var _0x598df7=_0x1f04e8,_0x3a6c19=[],_0x2e1ed8=_spPageContextInfo[_0x598df7(0x1e6)]+_0x598df7(0x296);return $[_0x598df7(0x277)]({'url':_0x2e1ed8,'method':_0x598df7(0x1f8),'async':![],'contentType':_0x598df7(0x282),'headers':{'Accept':_0x598df7(0x282)},'success':function(_0x5854e6){var _0x5268d4=_0x598df7,_0x5a509c=[];_0x5a509c=_0x5854e6['d'][_0x5268d4(0x2e5)][_0x5268d4(0x1da)],_0x5a509c[_0x5268d4(0x22b)]>0x0&&(_0x3a6c19=_0x5a509c[_0x5268d4(0x2fe)](function(_0x2e1354){var _0xbe00e9=_0x5268d4;return _0x2e1354[_0xbe00e9(0x2a7)]!==_0xbe00e9(0x2a5)&&_0x2e1354[_0xbe00e9(0x2da)]!==_0xbe00e9(0x214)&&_0x2e1354[_0xbe00e9(0x2da)]!==_0xbe00e9(0x223)&&_0x2e1354['Title']!==_0xbe00e9(0x259)&&_0x2e1354[_0xbe00e9(0x2da)]!==_0xbe00e9(0x20d);}));},'eror':function(_0xee1b3){var _0x3a7a1e=_0x598df7;alert(JSON[_0x3a7a1e(0x24c)](_0xee1b3));}}),_0x3a6c19;}function _0x26a8(_0x4f8dcb,_0x424048){var _0x471a74=_0x471a();return _0x26a8=function(_0x26a8e5,_0x5214dd){_0x26a8e5=_0x26a8e5-0x1d6;var _0x2626d2=_0x471a74[_0x26a8e5];return _0x2626d2;},_0x26a8(_0x4f8dcb,_0x424048);}function getTargetGroupId(){var _0x324ac2=_0x1f04e8,_0x27184c=[],_0x55a646=_spPageContextInfo[_0x324ac2(0x293)]+_0x324ac2(0x25d);return $[_0x324ac2(0x277)]({'url':_0x55a646,'type':_0x324ac2(0x1f8),'headers':{'accept':_0x324ac2(0x282)},'async':![],'success':function(_0x16145c,_0x453ad8,_0x1d1d33){var _0x27cf18=_0x324ac2;_0x27184c[_0x27cf18(0x210)](_0x16145c['d']['Id']);},'error':function(_0x11e5ba,_0x13a0dd,_0x259b43){var _0x32ae6a=_0x324ac2;console[_0x32ae6a(0x2d0)](_0x11e5ba[_0x32ae6a(0x27b)][_0x32ae6a(0x2fd)]);}}),_0x27184c;}function GetDocumentsSharedWithMe(_0x2ebcd9){var _0x491411=_0x1f04e8,_0x1c08e2='',_0x79cdb6='';AckCounter=0x0,currentSectionType=_0x491411(0x2f8);if(_0x2ebcd9==undefined){LoggedUserSPGp=GetSPGroup();var _0x3822b4='';for(var _0x283203=0x0;_0x283203<LoggedUserSPGp['length'];_0x283203++){_0x3822b4+=_0x491411(0x1f0)+LoggedUserSPGp[_0x283203]['Id']+'\x27\x20';}var _0x200806=getTargetGroupId();for(var _0x283203=0x0;_0x283203<_0x200806[_0x491411(0x22b)];_0x283203++){_0x3822b4+=_0x491411(0x1f0)+_0x200806[_0x283203]+'\x27\x20';}_0x3822b4=_0x3822b4[_0x491411(0x245)](0x0,_0x3822b4[_0x491411(0x22b)]-0x1)+')';var _0x2ebcd9='&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo[_0x491411(0x1fe)]+'\x27\x20'+_0x3822b4+_0x491411(0x252);}var _0x58f45f=_spPageContextInfo[_0x491411(0x293)]+_0x491411(0x2fc)+_0x2ebcd9;$['ajax']({'url':_0x58f45f,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x55a5f2){var _0x25d213=_0x491411,_0xa7d525=_0x55a5f2['d'][_0x25d213(0x1da)],_0xecc0eb='',_0x27f6e3='';for(var _0x5e350b=0x0;_0x5e350b<_0xa7d525[_0x25d213(0x22b)];_0x5e350b++){_0x79cdb6='',_0x1c08e2='';var _0x358179=_0xa7d525[_0x5e350b][_0x25d213(0x290)];_0x358179==null&&(_0x358179='');var _0x56d53b=_0xa7d525[_0x5e350b]['DocumentType'];(_0x56d53b==null||_0x56d53b=='--select--'||_0x56d53b=='-Select-')&&(_0x56d53b='');var _0x8f450b='';_0x8f450b==null&&(_0x8f450b='');var _0x352523=_0xa7d525[_0x5e350b][_0x25d213(0x241)];_0x352523==null&&(_0x352523='');var _0x4034c6=_0xa7d525[_0x5e350b][_0x25d213(0x1ed)];(_0x4034c6==null||_0x4034c6==_0x25d213(0x1de)||_0x4034c6=='-Select-')&&(_0x4034c6='');var _0x35a43c=_0xa7d525[_0x5e350b][_0x25d213(0x306)];_0x35a43c==null&&(_0x35a43c='');var _0x2c4f52=_0xa7d525[_0x5e350b]['PermissionStatus'];_0x2c4f52!=_0x25d213(0x249)&&_0x2c4f52!=_0x25d213(0x200)?_0x2c4f52=_0x35a43c:_0x2c4f52=_0x2c4f52[_0x25d213(0x2d5)]('Red');var _0x2663f5='';_0x2663f5==null&&(_0x2663f5='');var _0x26bb0b=_0xa7d525[_0x5e350b]['Title'];_0x26bb0b==null&&(_0x26bb0b='');var _0x188f8c=_0xa7d525[_0x5e350b][_0x25d213(0x29f)];_0x188f8c==null&&(_0x188f8c='');var _0x784505='';_0x784505==null&&(_0x784505='');var _0x22c7ae='';_0x22c7ae==null&&(_0x22c7ae='');var _0x471a0c='',_0x1b5435=_0xa7d525[_0x5e350b][_0x25d213(0x2d6)][_0x25d213(0x2da)],_0x40e8bc=_0x26bb0b,_0x2eba1d=_0x1c08e2=_0xa7d525[_0x5e350b][_0x25d213(0x22e)];if(_0x2eba1d==null||_0x2eba1d==''){_0x2eba1d=_0xa7d525[_0x5e350b][_0x25d213(0x1ea)];if(_0x2eba1d[_0x25d213(0x2de)](_0x25d213(0x2f3))==!![]||_0x2eba1d['includes'](_0x25d213(0x2c9))==!![])_0x2eba1d['includes'](_0x25d213(0x2f3))==!![]?_0x1c08e2=_0xa7d525[_0x5e350b][_0x25d213(0x2bb)]+_0x25d213(0x20a)+encodeURIComponent(_0x2eba1d)+_0x25d213(0x2b0)+encodeURIComponent(_0x2eba1d[_0x25d213(0x227)](0x0,_0x2eba1d[_0x25d213(0x211)]('/')+0x0)):(CopyLibrary=_0x25d213(0x2c9),_0x1c08e2=_0xa7d525[_0x5e350b]['SiteURL']+_0x25d213(0x2d8)+encodeURIComponent(_0x2eba1d)+_0x25d213(0x2b0)+encodeURIComponent(_0x2eba1d[_0x25d213(0x227)](0x0,_0x2eba1d['lastIndexOf']('/')+0x0)));else{var _0x43f3dd=window[_0x25d213(0x21e)]['origin']+_0x2eba1d['substr'](0x0,_0x2eba1d['lastIndexOf']('/')+0x0);_0x1c08e2=_0x43f3dd+_0x25d213(0x2d3)+encodeURIComponent(_0x2eba1d)+_0x25d213(0x2b0)+encodeURIComponent(_0x2eba1d[_0x25d213(0x227)](0x0,_0x2eba1d[_0x25d213(0x211)]('/')+0x0));}}else _0x2eba1d=_0x1c08e2=_0x2eba1d[_0x25d213(0x2e8)](_0x25d213(0x2a2),_0x25d213(0x1fa)),_0x1c08e2=encodeURI(_0x1c08e2);var _0xd5e7ff='',_0x1c5180='',_0x2b06e8=_0x25d213(0x266),_0x4ea2cc='';_0xa7d525[_0x5e350b]['SiteURL']==_0x25d213(0x28c)||_0xa7d525[_0x5e350b]['SiteURL']==null||_0xa7d525[_0x5e350b][_0x25d213(0x2bb)]=='undefined'||_0xa7d525[_0x5e350b][_0x25d213(0x2bb)]==undefined?encodeURI(_0xa7d525[_0x5e350b][_0x25d213(0x1ea)])['indexOf']('DepartmentalDMS')!=-0x1?SiteURL=window[_0x25d213(0x21e)][_0x25d213(0x302)]+encodeURI(_0xa7d525[_0x5e350b][_0x25d213(0x1ea)])[_0x25d213(0x2db)](_0x25d213(0x2c9))[0x0]:SiteURL=_spPageContextInfo[_0x25d213(0x293)]:SiteURL=_0xa7d525[_0x5e350b][_0x25d213(0x2bb)];_0xa7d525[_0x5e350b][_0x25d213(0x2b4)]==null||_0xa7d525[_0x5e350b]['SharedType']==_0x25d213(0x2cc)||_0xa7d525[_0x5e350b]['SharedType']==_0x25d213(0x215)?DMS_Type=_0x25d213(0x21c):DMS_Type=_0xa7d525[_0x5e350b][_0x25d213(0x2b4)]+':\x20'+_0xa7d525[_0x5e350b]['SharedFrom'];if(_0x56d53b['toLowerCase']()!=_0x25d213(0x295)){var _0x16ce8d='.'+_0x26bb0b[_0x25d213(0x245)](_0x26bb0b[_0x25d213(0x211)]('.')+0x1);Icon=_0x25d213(0x27a);if(_0x25d213(0x2eb)==_0x16ce8d||_0x25d213(0x279)==_0x16ce8d)Icon=_0x25d213(0x1d7);else{if(_0x25d213(0x2b2)==_0x16ce8d)Icon=_0x25d213(0x25e);else{if('.jpg'==_0x16ce8d||'.psd'==_0x16ce8d||_0x25d213(0x262)==_0x16ce8d||_0x25d213(0x28a)==_0x16ce8d||'.bmp'==_0x16ce8d||'.jpeg'==_0x16ce8d||_0x25d213(0x27f)==_0x16ce8d)Icon=_0x25d213(0x256);else{if('.xlsx'==_0x16ce8d)Icon=_0x25d213(0x2c4);else{if(_0x25d213(0x2d7)==_0x16ce8d)Icon=_0x25d213(0x2df);else{if(_0x25d213(0x1d9)==_0x16ce8d)Icon=_0x25d213(0x29e);else{if(_0x25d213(0x2af)==_0x16ce8d)Icon=_0x25d213(0x278);else{if('.zip'==_0x16ce8d||_0x25d213(0x2f6)==_0x16ce8d||_0x25d213(0x21d)==_0x16ce8d||_0x25d213(0x2a9)==_0x16ce8d||_0x25d213(0x1f2)==_0x16ce8d||'.rpm'==_0x16ce8d||_0x25d213(0x2b5)==_0x16ce8d)Icon=_0x25d213(0x307);else{if(_0x25d213(0x231)==_0x16ce8d||_0x25d213(0x268)==_0x16ce8d||'.avi'==_0x16ce8d||'.mpeg'==_0x16ce8d||_0x25d213(0x201)==_0x16ce8d||'.mov'==_0x16ce8d||'.wav'==_0x16ce8d||_0x25d213(0x291)==_0x16ce8d)Icon=_0x25d213(0x202);else(_0x25d213(0x269)==_0x16ce8d||_0x25d213(0x2a4)==_0x16ce8d||_0x25d213(0x22f)==_0x16ce8d||_0x25d213(0x29c)==_0x16ce8d)&&(Icon=_0x25d213(0x1f6));}}}}}}}}_0xa7d525[_0x5e350b][_0x25d213(0x2d2)]!='Revoked'&&_0xa7d525[_0x5e350b][_0x25d213(0x2d2)]!=_0x25d213(0x200)?(_0xa7d525[_0x5e350b][_0x25d213(0x2ff)]==!![]?_0x79cdb6=AckUserStatus(_0xa7d525[_0x5e350b]['Id'],_spPageContextInfo[_0x25d213(0x1e7)],_0xa7d525[_0x5e350b]['DocumentURL'],_0xa7d525[_0x5e350b][_0x25d213(0x2bb)],_0xa7d525[_0x5e350b][_0x25d213(0x306)],_0xa7d525[_0x5e350b]['LibraryName'],_0xa7d525[_0x5e350b][_0x25d213(0x2f9)]):_0x79cdb6='',_0x79cdb6[_0x25d213(0x2f7)]('DisplayFileProperty')!==-0x1&&AckCounter++,_0x4ea2cc=_0x25d213(0x27d)+encodeURI(_0xa7d525[_0x5e350b][_0x25d213(0x1ea)])+_0x25d213(0x255),_0xd5e7ff=_0x25d213(0x236)+_0xa7d525[_0x5e350b]['Id']+'\x22\x20name=\x22'+_0xa7d525[_0x5e350b][_0x25d213(0x1ea)]+'\x22\x20onclick=\x22DisplayFileProperty(this,\x20\x27'+SiteURL+_0x25d213(0x2e7)+DMS_Type+_0x25d213(0x2e7)+_0x2c4f52+'\x27);\x22\x20class=\x22doc_icon\x22><img\x20width=\x2230px\x22\x20src=\x22../SiteAssets/MyDocuments/DMS/assets/images/'+Icon+'\x22\x20alt=\x22'+Icon+'\x22>'+_0x40e8bc+_0x25d213(0x26d)):_0xd5e7ff=_0x25d213(0x2f1)+Icon+_0x25d213(0x1f5)+Icon+'\x27>'+_0x40e8bc+'</a>';}else Icon=_0x25d213(0x1e2),_0xd5e7ff=_0x25d213(0x1ee)+encodeURI(_0xa7d525[_0x5e350b]['DocumentURL'])+_0x25d213(0x224)+_0xa7d525[_0x5e350b]['SiteURL']+'\x22,\x20\x22'+SiteURL+'\x22,\x20\x22'+DMS_Type+'\x22,\x20\x22'+_0x2c4f52+_0x25d213(0x224)+_0xa7d525[_0x5e350b]['Id']+_0x25d213(0x224)+_0xa7d525[_0x5e350b][_0x25d213(0x2d6)][_0x25d213(0x2da)]+_0x25d213(0x224)+_0xa7d525[_0x5e350b][_0x25d213(0x271)]+_0x25d213(0x224)+_0xa7d525[_0x5e350b][_0x25d213(0x23c)]['results'][0x0][_0x25d213(0x2da)]+'\x22);\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27../SiteAssets/MyDocuments/DMS/assets/images/'+Icon+_0x25d213(0x1f5)+Icon+'\x27>'+_0x40e8bc+'</a>',_0x188f8c=_0x26bb0b;sharedFrom=sharedFromHTML=getSharedFromValue(_0xa7d525[_0x5e350b][_0x25d213(0x2b4)],_0xa7d525[_0x5e350b][_0x25d213(0x2f9)]);sharedFrom[_0x25d213(0x2f7)](_0x25d213(0x1db))!=-0x1&&(sharedFromHTML='');var _0x5e6c50=_spPageContextInfo[_0x25d213(0x293)]+_0x25d213(0x2b8)+escapeProperly(_0xa7d525[_0x5e350b][_0x25d213(0x2d6)]['EMail']);_0x471a0c+=_0x25d213(0x234)+_0x5e6c50+_0x25d213(0x24b),_0x471a0c+=_0x25d213(0x23b)+_0x1b5435+_0x25d213(0x22d)+convertJSONDateAMPMWithDate(_0xa7d525[_0x5e350b][_0x25d213(0x297)])+_0x25d213(0x228)+sharedFromHTML+'</div></div>';_0xa7d525[_0x5e350b][_0x25d213(0x2b4)]==null&&(_0xa7d525[_0x5e350b][_0x25d213(0x2b4)]=_0x25d213(0x2cc));var _0x177b6d='';if(_0x2c4f52==_0x25d213(0x203))_0x177b6d+=_0x25d213(0x284),_0x177b6d+=_0x25d213(0x274)+_0x79cdb6+_0x25d213(0x253);else{if(_0x2c4f52=='Read')_0x177b6d+=_0x25d213(0x299),_0x177b6d+=_0x25d213(0x274)+_0x79cdb6+_0x25d213(0x253);else _0x2c4f52==_0x25d213(0x294)?(_0x177b6d+='<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Contribute</div>',_0x177b6d+=_0x25d213(0x274)+_0x79cdb6+_0x25d213(0x253)):_0x177b6d=_0x25d213(0x23a)+_0x2c4f52+_0x25d213(0x274)+_0x79cdb6+_0x25d213(0x2dd);}_0xa7d525[_0x5e350b][_0x25d213(0x2b6)]==_0x25d213(0x276)?_0x27f6e3=_0x27f6e3+_0x25d213(0x1e3)+_0xd5e7ff+_0x25d213(0x2e1)+_0x188f8c+'</td><td>'+_0x358179+'</td><td>'+_0x4034c6+_0x25d213(0x23d)+_0x1b5435+_0x25d213(0x2e1)+_0x471a0c+'</td><td\x20style=\x27display:none;\x27>'+_0x79cdb6+_0x25d213(0x23d)+sharedFrom+_0x25d213(0x2e1)+_0x177b6d+_0x25d213(0x251):_0x27f6e3=_0x27f6e3+_0x25d213(0x1e3)+_0xd5e7ff+_0x25d213(0x2e1)+_0x188f8c+_0x25d213(0x2e1)+_0x358179+_0x25d213(0x2e1)+_0x4034c6+_0x25d213(0x23d)+_0x1b5435+'</td><td>'+_0x471a0c+_0x25d213(0x230)+_0x79cdb6+_0x25d213(0x23d)+sharedFrom+_0x25d213(0x2e1)+_0x177b6d+_0x25d213(0x2e0)+_0x4ea2cc+_0x25d213(0x20f);}var _0x4d77df=_0x27f6e3,_0xd2d65f=$(_0x25d213(0x1dc));_0xd2d65f['html'](''),$('#documentShareWithmeNoRecordFound')[_0x25d213(0x220)](),_0xa7d525[_0x25d213(0x22b)]==0x0&&$(_0x25d213(0x273))[_0x25d213(0x219)](),_0xd2d65f['append'](_0x4d77df),_0xa7d525[_0x25d213(0x22b)]>0x0&&(GenerateTableSharedWithMe(),AckCounter==0x0?$(_0x25d213(0x2ae))[_0x25d213(0x220)]():($(_0x25d213(0x2ce))[_0x25d213(0x264)](AckCounter),$(_0x25d213(0x2ae))[_0x25d213(0x219)]()),$(_0x25d213(0x25b))[_0x25d213(0x24a)](),$(_0x25d213(0x25b))['append']('<option\x20value=\x22-1\x22>All\x20Columns</option>'),$('#columnsSharedWithMe')[_0x25d213(0x22a)](_0x25d213(0x265)),$(_0x25d213(0x25b))[_0x25d213(0x22a)](_0x25d213(0x2ea)),$(_0x25d213(0x25b))[_0x25d213(0x22a)](_0x25d213(0x303)),$(_0x25d213(0x25b))['append'](_0x25d213(0x233)),$(_0x25d213(0x25b))[_0x25d213(0x22a)](_0x25d213(0x239)),$('#columnsSharedWithMe')[_0x25d213(0x22a)](_0x25d213(0x209)));},'eror':function(_0x2841fb){var _0x5afdcf=_0x491411;currentDlg!=''&&currentDlg[_0x5afdcf(0x2ee)](),console[_0x5afdcf(0x2d0)](_0x5afdcf(0x2fd));}}),currentDlg!=''&&currentDlg[_0x491411(0x2ee)]();}function AckUserStatus(_0x575ad2,_0x294780,_0x1585a9,_0x499e89,_0x2ea11c,_0x40bc76,_0x81f771){var _0x31ea3c=_0x1f04e8;_0x40bc76==_0x31ea3c(0x2f3)?_0x40bc76=_0x31ea3c(0x21c):_0x40bc76=_0x81f771;var _0x15a237='',_0x13d5a0=_0x31ea3c(0x242)+_0x575ad2+_0x31ea3c(0x257)+_0x294780+_0x31ea3c(0x29a);return $['when'](getItemsWithQuery(_0x31ea3c(0x292),_0x13d5a0,_spPageContextInfo['webAbsoluteUrl']))[_0x31ea3c(0x27c)](function(_0x107d3a){var _0x28553c=_0x31ea3c;_0x107d3a[_0x28553c(0x22b)]>0x0?_0x15a237=_0x28553c(0x2bf)+_0x575ad2+'\x27)\x22>Acknowledged</div>':_0x15a237=_0x28553c(0x2ca)+_0x575ad2+_0x28553c(0x29b)+_0x1585a9+_0x28553c(0x2b1)+_0x499e89+_0x28553c(0x2e7)+_0x40bc76+'\x27,\x20\x27'+_0x2ea11c+_0x28553c(0x2fa);}),_0x15a237;}function OpenAckNotify(_0x4d9d78){var _0x2cca4e=_0x1f04e8;$(_0x2cca4e(0x22c))[_0x2cca4e(0x24a)](),arrAckAllUser=[];var _0x4642e9='',_0x37e6b5='',_0x56e31e='?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID\x20eq\x20\x27'+_0x4d9d78+'\x27\x20';$[_0x2cca4e(0x2c7)](getItemsWithQuery(_0x2cca4e(0x292),_0x56e31e,_spPageContextInfo[_0x2cca4e(0x293)]))[_0x2cca4e(0x27c)](function(_0x3235b6){var _0x2ea704=_0x2cca4e;_0x3235b6[_0x2ea704(0x22b)]>0x0&&(_0x4642e9=_spPageContextInfo['webAbsoluteUrl']+'/_layouts/15/userphoto.aspx?accountname='+escapeProperly(_0x3235b6[0x0][_0x2ea704(0x2f0)][_0x2ea704(0x2f5)]),_0x37e6b5+=_0x2ea704(0x280)+_0x4642e9+'\x22>',_0x37e6b5+=_0x2ea704(0x238)+_0x3235b6[0x0][_0x2ea704(0x2f0)][_0x2ea704(0x2da)]+_0x2ea704(0x289)+_0x3235b6[0x0][_0x2ea704(0x2f0)][_0x2ea704(0x2f5)]+_0x2ea704(0x272)+_0x3235b6[0x0][_0x2ea704(0x2f0)][_0x2ea704(0x2f5)]+'</a></div></div>',_0x37e6b5+=_0x2ea704(0x20c)+ShowCommonStandardDateFormat(new Date(_0x3235b6[0x0]['Modified']))+_0x2ea704(0x2dc)+(_0x3235b6[0x0][_0x2ea704(0x2d4)]?_0x3235b6[0x0][_0x2ea704(0x2d4)]:'')+'</p><p\x20style=\x22color:blue\x22>IP:\x20'+_0x3235b6[0x0][_0x2ea704(0x285)]+_0x2ea704(0x304));}),$(_0x2cca4e(0x22c))[_0x2cca4e(0x22a)](_0x37e6b5),$(_0x2cca4e(0x221))['modal'](_0x2cca4e(0x219));}function getSharedFromValue(_0x2678eb,_0x241c0c){var _0x1c0424=_0x1f04e8;return _0x2678eb==_0x1c0424(0x2cc)||_0x2678eb==null||_0x2678eb==_0x1c0424(0x28c)?_0x241c0c==null?_0x2678eb=_0x1c0424(0x2cc):'Personal'+':\x20'+_0x241c0c:_0x2678eb+':\x20'+_0x241c0c;}function GenerateTableSharedWithMe(){var _0x2179c4=_0x1f04e8;sorterSharedWithMe=new TINY['table'][(_0x2179c4(0x258))](_0x2179c4(0x25f),'tableTempSharedWithMe',{'headclass':_0x2179c4(0x250),'ascclass':_0x2179c4(0x26b),'descclass':'desc','evenclass':_0x2179c4(0x240),'oddclass':'oddrow','evenselclass':_0x2179c4(0x2c8),'oddselclass':_0x2179c4(0x2ef),'paginate':!![],'size':0xa,'colddid':_0x2179c4(0x205),'currentid':_0x2179c4(0x2aa),'totalid':_0x2179c4(0x226),'startingrecid':_0x2179c4(0x1e5),'endingrecid':_0x2179c4(0x1d8),'totalrecid':_0x2179c4(0x267),'hoverid':_0x2179c4(0x2e6),'pageddid':_0x2179c4(0x26e),'navid':'tablenavSharedWithMe','sortdir':0x1,'init':!![]});}function GetDocumentTypeIcon(_0x303e05){var _0x32d634=_0x1f04e8,_0x4544f2='';for(var _0x4c7ebb=0x0;_0x4c7ebb<arrayLinksDoctype[_0x32d634(0x22b)];_0x4c7ebb++){arrayLinksDoctype[_0x4c7ebb][_0x32d634(0x2cf)]['split']('.')[0x0]['indexOf'](_0x303e05['split']('.')[0x1])!=-0x1&&(_0x4544f2=arrayLinksDoctype[_0x4c7ebb][_0x32d634(0x1f7)]);}if(_0x4544f2['length']==0x0){var _0x1c164c=_spPageContextInfo[_0x32d634(0x293)]+_0x32d634(0x212)+_0x303e05+_0x32d634(0x2ab);$[_0x32d634(0x277)]({'url':_0x1c164c,'headers':{'Accept':_0x32d634(0x282)},'async':![],'success':function(_0x37ceb3){var _0x8fe9aa=_0x32d634,_0x38de09='<img\x20src=\x27'+_spPageContextInfo[_0x8fe9aa(0x293)]+_0x8fe9aa(0x270)+_0x37ceb3['d']['MapToIcon']+_0x8fe9aa(0x281);_0x4544f2=_0x38de09,arrayLinksDoctype[_0x8fe9aa(0x210)](IconProperties(_0x37ceb3['d']['MapToIcon'],_0x38de09));},'eror':function(_0x377a2d){var _0x392431=_0x32d634;console[_0x392431(0x2d0)]('error');}});}return _0x4544f2;}function OpenFolderWithAllFileFolder(_0x52f6b6,_0x5e3195,_0x1ea211,_0x1c436a,_0xc504b8,_0x463b74,_0x226b94,_0x5915e9,_0x1cebf8){var _0x31f1c2=_0x1f04e8;$(_0x31f1c2(0x244))[_0x31f1c2(0x247)](''),GetSharedFolderDocuments(_0x52f6b6,_0x5e3195,_0x1ea211,_0x1c436a,_0xc504b8,_0x463b74,_0x226b94,_0x5915e9,_0x1cebf8);}var arrSharingDetails=[];function GetSharedFolderDocuments(_0x3efe35,_0x1b7c46,_0x37a067,_0x52f207,_0xa97d39,_0x1bb03a,_0x5ac939,_0x1e86e2,_0x2d768a){var _0x1d422e=_0x1f04e8;arrSharingDetails['push']({'SharedBy':_0x5ac939,'SharedOn':_0x1e86e2,'ShareWith':_0x2d768a});_0x1b7c46==_0x1d422e(0x28c)||_0x1b7c46==null||_0x1b7c46==_0x1d422e(0x24f)||_0x1b7c46==undefined?_0x3efe35[_0x1d422e(0x2f7)](_0x1d422e(0x2c9))!=-0x1?siteURL=window['location']['origin']+_0x3efe35[_0x1d422e(0x2db)](_0x1d422e(0x2c9))[0x0]:siteURL=_spPageContextInfo[_0x1d422e(0x293)]:siteURL=_0x1b7c46;_0x3efe35[_0x1d422e(0x2f7)](_0x1d422e(0x2ed))!=-0x1&&_0x3efe35[_0x1d422e(0x2f7)](_0x1d422e(0x206))==-0x1&&(_0x3efe35=_0x3efe35[_0x1d422e(0x2e8)](_0x1d422e(0x2ed),_0x1d422e(0x206)));var _0x2e43e0=siteURL+_0x1d422e(0x1e9)+_0x3efe35+'\x27)?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified\x20desc';$['ajax']({'url':_0x2e43e0,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x4740cf){var _0x150366=_0x1d422e;$(_0x150366(0x2a1))[_0x150366(0x2bd)](_0x150366(0x219));var _0x3bbdaa='',_0x26717c='',_0x16c1a3=_0x4740cf['d'][_0x150366(0x2f2)][_0x150366(0x1da)],_0x234aad=_0x4740cf['d'][_0x150366(0x261)][_0x150366(0x1da)],_0x35855b=_0x234aad['length']+_0x16c1a3[_0x150366(0x22b)];for(var _0x3edf11=0x0;_0x3edf11<_0x234aad['length'];_0x3edf11++){Icon=_0x150366(0x1e2);var _0x333f04=encodeURI(_0x234aad[_0x3edf11][_0x150366(0x2c1)]),_0x3de31d=_0x150366(0x266);_0x26717c=_0x26717c+_0x150366(0x298)+_0x333f04+'\x22,\x20\x22'+siteURL+_0x150366(0x224)+_0x37a067+_0x150366(0x224)+_0x52f207+_0x150366(0x224)+_0xa97d39+_0x150366(0x224)+_0x1bb03a+_0x150366(0x224)+_0x5ac939+_0x150366(0x224)+_0x1e86e2+_0x150366(0x224)+_0x2d768a+_0x150366(0x2fb)+Icon+'\x27\x20alt=\x27'+Icon+'\x27>'+_0x234aad[_0x3edf11][_0x150366(0x232)]+_0x150366(0x20e);}for(var _0x3edf11=0x0;_0x3edf11<_0x16c1a3[_0x150366(0x22b)];_0x3edf11++){var _0x1abc84='.'+_0x16c1a3[_0x3edf11][_0x150366(0x232)][_0x150366(0x245)](_0x16c1a3[_0x3edf11][_0x150366(0x232)][_0x150366(0x211)]('.')+0x1);Icon=_0x150366(0x27a);if(_0x150366(0x2eb)==_0x1abc84||_0x150366(0x279)==_0x1abc84)Icon=_0x150366(0x1d7);else{if(_0x150366(0x2b2)==_0x1abc84)Icon=_0x150366(0x25e);else{if('.jpg'==_0x1abc84||_0x150366(0x1eb)==_0x1abc84||_0x150366(0x262)==_0x1abc84||_0x150366(0x28a)==_0x1abc84||'.bmp'==_0x1abc84||_0x150366(0x2ba)==_0x1abc84||_0x150366(0x27f)==_0x1abc84)Icon=_0x150366(0x256);else{if('.xlsx'==_0x1abc84)Icon='xlsx.png';else{if(_0x150366(0x2d7)==_0x1abc84)Icon=_0x150366(0x2df);else{if(_0x150366(0x1d9)==_0x1abc84)Icon='txt.png';else{if(_0x150366(0x2af)==_0x1abc84)Icon=_0x150366(0x278);else{if(_0x150366(0x2c0)==_0x1abc84||_0x150366(0x2f6)==_0x1abc84||_0x150366(0x21d)==_0x1abc84||_0x150366(0x2a9)==_0x1abc84||_0x150366(0x1f2)==_0x1abc84||_0x150366(0x2bc)==_0x1abc84||_0x150366(0x2b5)==_0x1abc84)Icon=_0x150366(0x307);else{if(_0x150366(0x231)==_0x1abc84||_0x150366(0x268)==_0x1abc84||_0x150366(0x301)==_0x1abc84||'.mpeg'==_0x1abc84||_0x150366(0x201)==_0x1abc84||_0x150366(0x25c)==_0x1abc84||'.wav'==_0x1abc84||_0x150366(0x291)==_0x1abc84)Icon=_0x150366(0x202);else(_0x150366(0x269)==_0x1abc84||_0x150366(0x2a4)==_0x1abc84||_0x150366(0x22f)==_0x1abc84||_0x150366(0x29c)==_0x1abc84)&&(Icon=_0x150366(0x1f6));}}}}}}}}var _0x13aa13=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)]['ServerRedirectedEmbedUri'];(_0x13aa13==null||_0x13aa13=='')&&(_0x13aa13=encodeURI(_0x16c1a3[_0x3edf11][_0x150366(0x2c1)]));if(_0x16c1a3[_0x3edf11][_0x150366(0x232)]!=null){var _0x9df9f8=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)][_0x150366(0x290)];_0x9df9f8==null&&(_0x9df9f8='');var _0x412719=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)]['DocumentType'];(_0x412719==null||_0x412719==_0x150366(0x1de))&&(_0x412719='');var _0x23e276=_0x16c1a3[_0x3edf11]['ListItemAllFields']['Details'];_0x23e276==null&&(_0x23e276='');var _0xfe5787='';_0xfe5787==null&&(_0xfe5787='');var _0x390a80=_0x16c1a3[_0x3edf11][_0x150366(0x232)],_0x364e6c=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)][_0x150366(0x2da)];_0x364e6c==null&&(_0x364e6c=_0x390a80);var _0x1e7dc4=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)]['SecurityLevel'];(_0x1e7dc4==null||_0x1e7dc4=='')&&(_0x1e7dc4=_0x150366(0x213));var _0x130f56=convertJSONDateAMPMWithDate(_0x16c1a3[_0x3edf11][_0x150366(0x2e3)]['Modified']),_0x3945f1=_0x16c1a3[_0x3edf11][_0x150366(0x2e3)][_0x150366(0x2b3)];_0x3945f1==null&&(_0x3945f1='');var _0x5cf975=_0x150366(0x27d)+_0x16c1a3[_0x3edf11][_0x150366(0x2c1)]+_0x150366(0x255);_0x26717c=_0x26717c+'<tr><td><a\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x1bb03a+'\x27\x20onclick=\x27DisplayFileProperty(this,\x20\x22'+_0x37a067+'\x22,\x20\x22'+_0x52f207+_0x150366(0x224)+_0xa97d39+_0x150366(0x27e)+_0x16c1a3[_0x3edf11][_0x150366(0x2c1)]+_0x150366(0x21a)+Icon+_0x150366(0x1f5)+Icon+'\x27>'+_0x390a80+_0x150366(0x263)+_0x9df9f8+_0x150366(0x2e1)+_0x130f56+_0x150366(0x2e1)+_0x23e276+_0x150366(0x2e0)+_0x5cf975+_0x150366(0x20f);}}var _0x4b7cc5=_0x26717c,_0x609650=$(_0x150366(0x244));_0x609650[_0x150366(0x247)](''),$(_0x150366(0x2be))[_0x150366(0x220)](),_0x35855b==0x0&&$(_0x150366(0x2be))['show'](),_0x609650['append'](_0x4b7cc5);},'eror':function(_0x20271b){var _0x342e1a=_0x1d422e;console['log'](_0x342e1a(0x2fd));}});}function convertJSONDateAMPMWithDate(_0x541fd2){var _0x49d929=_0x1f04e8,_0x2ea382=new Date(_0x541fd2),_0x298e7b=['Jan',_0x49d929(0x28e),_0x49d929(0x2cd),_0x49d929(0x2ac),_0x49d929(0x2f4),_0x49d929(0x229),_0x49d929(0x286),_0x49d929(0x2e2),_0x49d929(0x1e4),_0x49d929(0x2c3),_0x49d929(0x222),_0x49d929(0x2ad)],_0xc026d=_0x2ea382[_0x49d929(0x1e1)](),_0x3f7ced=_0x2ea382[_0x49d929(0x25a)](),_0x5ca880=_0x2ea382[_0x49d929(0x1e1)]()>=0xc?'PM':'AM';_0xc026d=_0xc026d%0xc,_0xc026d=_0xc026d?_0xc026d:0xc,_0x3f7ced=_0x3f7ced<0xa?'0'+_0x3f7ced:_0x3f7ced;var _0x31f037=_0xc026d+':'+_0x3f7ced+'\x20'+_0x5ca880;return _0x298e7b[_0x2ea382[_0x49d929(0x24d)]()]+'\x20'+_0x2ea382[_0x49d929(0x254)]()+'\x20'+_0x2ea382[_0x49d929(0x1e0)]()+'\x20'+_0x31f037;}function getSingleShareInfo(_0x124907,_0x80f9c,_0x4e1e8e){var _0x349303=_0x1f04e8,_0x41b254=_0x349303(0x305)+_0x80f9c+_0x349303(0x1f4)+_0x124907+'\x27\x20and\x20(PermissionStatus\x20ne\x20\x27Revoked\x27\x20or\x20PermissionStatus\x20ne\x20\x27Deleted\x27)';$[_0x349303(0x2c7)](getItemsWithQuery(_0x349303(0x218),_0x41b254,_spPageContextInfo[_0x349303(0x293)]))['done'](function(_0x152c8c){var _0x2ae08c=_0x349303;_0x152c8c[_0x2ae08c(0x22b)]>0x0?(currentSharedItemId=_0x152c8c[0x0]['Id'],_0x152c8c[0x0][_0x2ae08c(0x2ff)]==!![]?getAcknowledgeStatus(_0x152c8c[0x0]['Id']):$('#ParentAck')['hide'](),$(_0x2ae08c(0x2a3))[_0x2ae08c(0x264)](_0x152c8c[0x0][_0x2ae08c(0x2d6)][_0x2ae08c(0x2da)]),$(_0x2ae08c(0x26f))[_0x2ae08c(0x264)](ShowCommonStandardDateFormat(new Date(_0x152c8c[0x0][_0x2ae08c(0x271)]))),$(_0x2ae08c(0x308))[_0x2ae08c(0x264)](_0x152c8c[0x0][_0x2ae08c(0x306)]),$(_0x2ae08c(0x21b))['text']('Shared\x20with\x20'+_0x152c8c[0x0][_0x2ae08c(0x23c)][_0x2ae08c(0x1da)][0x0][_0x2ae08c(0x2da)])):($(_0x2ae08c(0x288))['hide'](),$(_0x2ae08c(0x2a3))[_0x2ae08c(0x264)](arrSharingDetails[0x0]['SharedBy']),$(_0x2ae08c(0x26f))[_0x2ae08c(0x264)](ShowCommonStandardDateFormat(new Date(arrSharingDetails[0x0][_0x2ae08c(0x217)]))),$('#txtSharePermission')[_0x2ae08c(0x264)](_0x4e1e8e),$('#ShareTabSharing')['text'](_0x2ae08c(0x2ec)+arrSharingDetails[0x0][_0x2ae08c(0x2b9)]));});}function getAcknowledgeStatus(_0x5ea87d){var _0x7e155f=_0x1f04e8;$('#ParentAck')[_0x7e155f(0x219)]();var _0xc47e9e='';$(_0x7e155f(0x288))[_0x7e155f(0x24a)]()[_0x7e155f(0x22a)](_0x7e155f(0x26c));var _0x5894f1=_0x7e155f(0x242)+_0x5ea87d+_0x7e155f(0x257)+_spPageContextInfo[_0x7e155f(0x1e7)]+'\x27';$[_0x7e155f(0x2c7)](getItemsWithQuery('DocumentAcknowledgement',_0x5894f1,_spPageContextInfo['webAbsoluteUrl']))[_0x7e155f(0x27c)](function(_0x4a567b){var _0x2836e0=_0x7e155f;_0x4a567b[_0x2836e0(0x22b)]>0x0?(_0xc47e9e=_0x4a567b[0x0]['Id'],_0x4a567b[0x0]['Acknowledge']==!![]?($(_0x2836e0(0x2d1))[_0x2836e0(0x264)]('Acknowledged'),$(_0x2836e0(0x2d1))[_0x2836e0(0x246)](_0x2836e0(0x1d6),_0x2836e0(0x1ff)),$('#AckText')[_0x2836e0(0x220)](),$('#txtAcknoldge')[_0x2836e0(0x1dd)](_0x2836e0(0x2e9),_0x2836e0(0x2e9)),$(_0x2836e0(0x300))[_0x2836e0(0x1dd)]('checked',_0x2836e0(0x275))):(_0x4a567b[0x0][_0x2836e0(0x20b)]!=!![]&&ViewAckDocument(),$(_0x2836e0(0x2d1))[_0x2836e0(0x264)]('Acknowledgement'),$(_0x2836e0(0x2d1))['css'](_0x2836e0(0x1d6),_0x2836e0(0x2c2)),$(_0x2836e0(0x1ef))[_0x2836e0(0x219)](),$(_0x2836e0(0x300))['prop'](_0x2836e0(0x2e9),''),$('#txtAcknoldge')['prop'](_0x2836e0(0x275),''),$(_0x2836e0(0x300))[_0x2836e0(0x216)](function(){AcknowledgeDocument(_0xc47e9e);}))):(_0xc47e9e=ViewAckDocument(_0x5ea87d),$(_0x2836e0(0x2d1))[_0x2836e0(0x264)]('Acknowledgement'),$('#AckHeading')['css'](_0x2836e0(0x1d6),_0x2836e0(0x2c2)),$('#AckText')[_0x2836e0(0x219)](),$(_0x2836e0(0x300))[_0x2836e0(0x1dd)]('disabled',''),$('#txtAcknoldge')['prop']('checked',''),$(_0x2836e0(0x300))[_0x2836e0(0x216)](function(){AcknowledgeDocument(_0xc47e9e);}));});}function ViewAckDocument(_0x760b33){var _0x58cebf=_0x1f04e8,_0x3a77b3,_0x454719='';_0x3a77b3={'__metadata':{'type':_0x58cebf(0x237)},'ViewsById':_spPageContextInfo[_0x58cebf(0x1fe)],'Title':$(_0x58cebf(0x2a8))['text'](),'DocumentID':parseInt(_0x760b33)};var _0x2de51b=$[_0x58cebf(0x28b)]();return $[_0x58cebf(0x277)]({'url':_spPageContextInfo[_0x58cebf(0x293)]+'/_api/web/lists/getbytitle(\x27DocumentAcknowledgement\x27)/items','type':_0x58cebf(0x2c5),'async':![],'headers':{'accept':_0x58cebf(0x282),'X-RequestDigest':$(_0x58cebf(0x29d))[_0x58cebf(0x287)](),'content-Type':'application/json;odata=verbose'},'data':JSON[_0x58cebf(0x24c)](_0x3a77b3),'success':function(_0x326f27){_0x454719=_0x326f27['d']['Id'];},'error':function(_0x17e308){var _0x44792d=_0x58cebf;alert(JSON[_0x44792d(0x24c)](_0x17e308)),$(_0x44792d(0x300))['prop'](_0x44792d(0x2e9),'');}}),_0x454719;}function AcknowledgeDocument(_0x59358c){var _0xd1b22a=_0x1f04e8;if(confirm(_0xd1b22a(0x2a0))==!![]){var _0xb1c0d3;(CurrentIpAddress==undefined||CurrentIpAddress==null)&&(CurrentIpAddress='');$('#txtAcknoldge')[_0xd1b22a(0x1dd)](_0xd1b22a(0x2e9),_0xd1b22a(0x2e9)),_0xb1c0d3={'__metadata':{'type':'SP.Data.DocumentAcknowledgementListItem'},'Acknowledge':!![],'IPAddress':CurrentIpAddress,'ActionByTimeZone':LoggedIn_TimeZone};var _0x55df68=$[_0xd1b22a(0x28b)](),_0x2d6a17=_spPageContextInfo[_0xd1b22a(0x293)]+_0xd1b22a(0x235)+_0x59358c+')';return $[_0xd1b22a(0x277)]({'url':_0x2d6a17,'type':_0xd1b22a(0x2c5),'async':![],'headers':{'accept':_0xd1b22a(0x282),'X-RequestDigest':$(_0xd1b22a(0x29d))['val'](),'content-Type':'application/json;odata=verbose','X-Http-Method':_0xd1b22a(0x1f9),'If-Match':'*'},'data':JSON['stringify'](_0xb1c0d3),'success':function(_0x1a2914){var _0x5a05e8=_0xd1b22a;$(_0x5a05e8(0x2d1))[_0x5a05e8(0x264)]('Acknowledged'),$(_0x5a05e8(0x2d1))[_0x5a05e8(0x246)]('color','green'),$(_0x5a05e8(0x1ef))[_0x5a05e8(0x220)](),GetDocumentsSharedWithMe();},'error':function(_0x3de65f){var _0x2a0478=_0xd1b22a;alert(JSON[_0x2a0478(0x24c)](_0x3de65f)),$(_0x2a0478(0x300))[_0x2a0478(0x1dd)](_0x2a0478(0x2e9),''),_0x55df68['reject'](_0x3de65f);}}),_0x55df68[_0xd1b22a(0x2a6)]();}}