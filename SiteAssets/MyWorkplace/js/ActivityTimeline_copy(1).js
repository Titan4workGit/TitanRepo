function a383_0x56ba(_0x3b5c63,_0x308328){var _0x2de01d=a383_0x2de0();return a383_0x56ba=function(_0x56ba18,_0xe69055){_0x56ba18=_0x56ba18-0x124;var _0x3b15fe=_0x2de01d[_0x56ba18];return _0x3b15fe;},a383_0x56ba(_0x3b5c63,_0x308328);}var a383_0x4a271d=a383_0x56ba;(function(_0x5427f8,_0x2a0b27){var _0x1c5012=a383_0x56ba,_0x77b05e=_0x5427f8();while(!![]){try{var _0x2aca3f=parseInt(_0x1c5012(0x12b))/0x1*(-parseInt(_0x1c5012(0x1b4))/0x2)+-parseInt(_0x1c5012(0x15a))/0x3+parseInt(_0x1c5012(0x175))/0x4+parseInt(_0x1c5012(0x127))/0x5*(-parseInt(_0x1c5012(0x169))/0x6)+-parseInt(_0x1c5012(0x14e))/0x7*(parseInt(_0x1c5012(0x14f))/0x8)+-parseInt(_0x1c5012(0x1ac))/0x9*(parseInt(_0x1c5012(0x199))/0xa)+-parseInt(_0x1c5012(0x12c))/0xb*(-parseInt(_0x1c5012(0x1a9))/0xc);if(_0x2aca3f===_0x2a0b27)break;else _0x77b05e['push'](_0x77b05e['shift']());}catch(_0xb4cb9){_0x77b05e['push'](_0x77b05e['shift']());}}}(a383_0x2de0,0x4771e));var G_Department='',G_Category='';$(document)[a383_0x4a271d(0x172)](function(){(function(){var _0x42d597=a383_0x56ba,_0x5ede24=titanForWork[_0x42d597(0x135)](_0x42d597(0x126))+_0x42d597(0x197)+Logged_DepartmentId+_0x42d597(0x132);G_Department=Logged_DepartmentId,G_Category=_0x42d597(0x14a),ExecuteFilter(_0x5ede24);}()),BindDepartmentinfilterMenu();});function BindDepartmentinfilterMenu(){var _0x4633aa=a383_0x4a271d,_0x1c73fd=_spPageContextInfo[_0x4633aa(0x178)]+_0x4633aa(0x19a)+titanForWork[_0x4633aa(0x135)]('CompanyId')+_0x4633aa(0x18e);$[_0x4633aa(0x19b)]({'url':_0x1c73fd,'headers':{'Accept':_0x4633aa(0x124)},'async':![],'success':function(_0xe65f7c){var _0x3b75d1=_0x4633aa,_0x18bd6b=_0xe65f7c['d'][_0x3b75d1(0x158)];if(_0x18bd6b['length']>0x0){var _0x3ed747='';for(i=0x0;i<_0x18bd6b[_0x3b75d1(0x193)];i++){_0x3ed747=_0x3ed747+'<a\x20href=\x27#\x27\x20class=\x27DepartmentList\x27\x20onclick=\x27GetDepartment('+_0x18bd6b[i]['ID']+_0x3b75d1(0x15e)+_0x18bd6b[i]['ID']+_0x3b75d1(0x15c)+_0x18bd6b[i][_0x3b75d1(0x187)]+_0x3b75d1(0x16a);}$(_0x3b75d1(0x13d))[_0x3b75d1(0x181)](_0x3ed747);}$(_0x3b75d1(0x13d))[_0x3b75d1(0x195)]({'speed':0x1f4,'margin':0x5,'autoWidth':!![],'slideBy':0x14,'nav':!![],'dots':![],'responsive':{0x0:{'items':0x1},0x258:{'items':0x3},0x3e8:{'items':0x3}}});},'error':function(_0x2d655b){console['log'](_0x2d655b);}});}function GetCategotyValues(_0xef2985){var _0x201d3a=a383_0x4a271d;G_Category=$('#'+_0xef2985)['text'](),$(_0x201d3a(0x17e))[_0x201d3a(0x14d)]('style'),GenerateQuery(),$('#'+_0xef2985)['attr'](_0x201d3a(0x188),_0x201d3a(0x18a)+'1px\x20solid'+HeaderTextColor+_0x201d3a(0x147)+HeaderTextColor+_0x201d3a(0x184)+MediatextColor);}function GetDepartment(_0x47f392){var _0x27a5f9=a383_0x4a271d;G_Department=_0x47f392,$(_0x27a5f9(0x165))[_0x27a5f9(0x14d)]('style'),GenerateQuery(),$('#'+_0x47f392)[_0x27a5f9(0x1b1)]('style',_0x27a5f9(0x18a)+_0x27a5f9(0x15f)+HeaderTextColor+_0x27a5f9(0x147)+HeaderTextColor+_0x27a5f9(0x184)+MediatextColor);}function GenerateQuery(){var _0x2533d0=a383_0x4a271d;if(G_Category==_0x2533d0(0x14a)){var _0x2a70c2=titanForWork['getQueryStringParameter']('CompanySiteUrl')+'/_api/web/Lists/GetByTitle(\x27Activity\x27)/Items?$orderby=\x20Created\x20desc&$filter=DepartmentID\x20eq\x20\x27'+G_Department+_0x2533d0(0x132);ExecuteFilter(_0x2a70c2);}else{var _0x2a70c2=titanForWork[_0x2533d0(0x135)](_0x2533d0(0x126))+_0x2533d0(0x156)+G_Department+_0x2533d0(0x1b6)+G_Category+_0x2533d0(0x19f);ExecuteFilter(_0x2a70c2);}}function formatDateEvent(_0x30d48d){var _0x2a2b87=a383_0x4a271d,_0x56e892=new Date(_0x30d48d);if(isNaN(_0x56e892['getTime']()))return _0x30d48d;else{var _0x2fdef8=new Array();return _0x2fdef8[0x0]=_0x2a2b87(0x18d),_0x2fdef8[0x1]=_0x2a2b87(0x185),_0x2fdef8[0x2]=_0x2a2b87(0x145),_0x2fdef8[0x3]='Apr',_0x2fdef8[0x4]='May',_0x2fdef8[0x5]=_0x2a2b87(0x1ab),_0x2fdef8[0x6]=_0x2a2b87(0x1af),_0x2fdef8[0x7]=_0x2a2b87(0x134),_0x2fdef8[0x8]=_0x2a2b87(0x140),_0x2fdef8[0x9]=_0x2a2b87(0x142),_0x2fdef8[0xa]=_0x2a2b87(0x13a),_0x2fdef8[0xb]='Dec',day=_0x56e892['getDate'](),day<0xa&&(day='0'+day),day+'\x20'+_0x2fdef8[_0x56e892[_0x2a2b87(0x173)]()]+'\x20'+_0x56e892[_0x2a2b87(0x128)]();}}var Ownurl='';function ExecuteFilter(_0x25282b){response=[],Ownurl=_0x25282b,ReadTimeLine();}function removetag(_0x48791c){var _0x222b02=_0x48791c,_0x231018=stripHtml(_0x222b02);return _0x231018;}function stripHtml(_0x1f2c65){var _0x5b30b6=a383_0x4a271d;let _0x23f012=document['createElement'](_0x5b30b6(0x16b));return _0x23f012[_0x5b30b6(0x170)]=_0x1f2c65,_0x23f012[_0x5b30b6(0x1b3)]||_0x23f012[_0x5b30b6(0x150)]||'';}var response=response||[];function ReadTimeLine(){var _0x55c1d8=a383_0x4a271d;$['ajax']({'url':Ownurl,'headers':{'Accept':_0x55c1d8(0x124)},'async':![],'success':function(_0x2d986d){var _0x3b380a=_0x55c1d8;response=response[_0x3b380a(0x159)](_0x2d986d['d'][_0x3b380a(0x158)]),$('#ActivityTimeLine')[_0x3b380a(0x13b)](''),$('#ActivityTimeLine')[_0x3b380a(0x19c)](),HTMLDESIGN='';if(response['length']>0x0){var _0x5edcd5=0x0;for(_0x5edcd5;_0x5edcd5<response['length'];_0x5edcd5++){var _0x25c8d3=response[_0x5edcd5]['ID'],_0x14c152=response[_0x5edcd5][_0x3b380a(0x187)],_0x403eb2=response[_0x5edcd5][_0x3b380a(0x1a8)],_0x52410b=removetag(response[_0x5edcd5][_0x3b380a(0x17f)]);if(_0x52410b[_0x3b380a(0x193)]>0xfa)var _0x2a3359=add3Dots(_0x52410b,0xfa);else var _0x2a3359=_0x52410b;var _0xa6460=formatDateEvent(response[_0x5edcd5][_0x3b380a(0x138)]),_0x440c5c=response[_0x5edcd5][_0x3b380a(0x177)],_0x4a6cda=_spPageContextInfo['webAbsoluteUrl']+_0x3b380a(0x19e)+window[_0x3b380a(0x160)](_0x403eb2)+_0x3b380a(0x189)+window[_0x3b380a(0x160)](_0x440c5c)+_0x3b380a(0x149);AvtivityTimeLineDesign(_0x25c8d3,_0x14c152,_0x403eb2,_0x2a3359,_0xa6460,_0x440c5c,_0x4a6cda);}$(_0x3b380a(0x154))[_0x3b380a(0x181)](HTMLDESIGN),MediatextColor!=null&&HeaderTextColor!=null&&($('.panel-heading-bg-txt-clr')[_0x3b380a(0x1a1)](function(){var _0x254a6e=_0x3b380a;this[_0x254a6e(0x188)][_0x254a6e(0x130)](_0x254a6e(0x133),MediatextColor);}),$('#DeltaPlaceHolderMain\x20.panel-heading-bg-txt-clr')[_0x3b380a(0x1a1)](function(){var _0x3bb80f=_0x3b380a;this[_0x3bb80f(0x188)][_0x3bb80f(0x130)](_0x3bb80f(0x17d),HeaderTextColor);}));}_0x2d986d['d']['__next']?(Ownurl=_0x2d986d['d'][_0x3b380a(0x1a5)],$(_0x3b380a(0x17b))[_0x3b380a(0x14d)](_0x3b380a(0x188)),$(_0x3b380a(0x17b))[_0x3b380a(0x1ae)](_0x3b380a(0x183),_0x3b380a(0x19d))):$(_0x3b380a(0x17b))[_0x3b380a(0x1ae)](_0x3b380a(0x16d),_0x3b380a(0x15d));},'error':function(_0x351bee){console['log'](_0x351bee);}});}function a383_0x2de0(){var _0x2c062d=['pop','<div\x20class=\x27col-sm-12\x20col-xs-12\x20pl0\x20pr0\x20pb5\x27>','\x22\x20name=','length','TITAN','owlCarousel','</a>','/_api/web/Lists/GetByTitle(\x27Activity\x27)/Items?$filter=DepartmentID\x20eq\x20\x27','docx','10ZBJztW','/_api/web/lists/getbytitle(\x27Departments\x27)/items?select=*,ID,Title&$filter=CompanyID\x20eq\x20\x27','ajax','empty','block','/Pages/ViewSuggestions.aspx?WebAppId=2&Type=','\x27\x20and\x20ApprovalStatus\x20eq\x20\x27Approved\x27&$orderby=Modified\x20desc&$top=10','100%','each','#textDepartment','name','</span></div>','__next','98%','AttachmentFiles','CategoryType','1956XCCVLG','#iframe-viewer','Jun','2850606eBHCRw','substring','css','Jul','</span>\x20|\x20<span>\x20','attr','<div\x20class=\x27panel-body\x20panel-body-suggestion\x27>','textContent','14498jLQZOO','<div\x20width=\x22100%\x22\x20id=\x22viewMyDocuments\x22\x20style=\x22padding-top:0px\x22>','\x27\x20and\x20ActivityType\x20eq\x20\x27','application/json;odata=verbose','appendTo','CompanySiteUrl','65CqKQVK','getFullYear','text','?web=1','53IFJjrz','121902kmCInJ','#doc-viewer','</p>','#AttachmentView','setProperty','<p>','\x27\x20and\x20Active\x20eq\x201\x20and\x20ApprovalStatus\x20eq\x20\x27Approved\x27&$orderby=Modified\x20desc&$top=10','color','Aug','getQueryStringParameter','filename','<p\x20class=\x27suggestion-title\x27>','Created','yes','Nov','html','<div\x20class=\x27panel-heading\x20panel-heading-suggestion\x27><span\x20class=\x27suggestion-head-text\x20panel-heading-bg-txt-clr\x27>','.timeline-filter','\x20...','</div>','Sept','#DownloadDocs','Oct','modal','load','Mar','#F_All',';background-color:','FileName','&sourcelocation=../Pages/Myworkplace.aspx','All','<div\x20class=\x27col-md-12\x20p0\x27>','<span><h2\x20class=\x22text-center\x22>No\x20preview\x20available.\x20File\x20has\x20been\x20downloaded.</h2></span>','removeAttr','14455KnZzxY','1432nyEzYG','innerText',');\x27>Details</a>','&action=interactivepreview','/TITAN/_layouts/15/WopiFrame.aspx?sourcedoc=','#ActivityTimeLine','#_DtlDescription','/_api/web/Lists/GetByTitle(\x27Activity\x27)/Items?$orderby=\x20Created\x20desc&$filter=DepartmentID\x20eq\x20\x27','fileurl','results','concat','1339260CTyFAe','iframe-viewer','\x27><span>','hidden',')\x27\x20id=\x27','1px\x20solid','btoa','find','<iframe>','<li\x20class=\x27pull-right\x20date-time-card\x27><span>','\x22\x20data-fileUrl=\x22','.DepartmentList','prop','#_AttachDocument','<i\x20class=\x22fa\x20fa-eye\x22></i></a>','173742rEoToy','</span></a>','DIV','<div\x20class=\x22panel\x20panel-default\x20shadow2\x22\x20style=\x22margin:100px;\x22>','visibility','</ul>','doc','innerHTML','ppt','ready','getMonth','href','1518796DVuQKX','<a\x20href=\x27#\x27\x20class=\x27suggestion-button\x27\x20data-toggle=\x27modal\x27\x20data-target=\x27#ActivityTimeLineModel\x27\x20onclick=\x27ActivityDetailinmodel(','Department','webAbsoluteUrl','pdf','dataset','.timeline-extend','\x27)&$expand=AttachmentFiles','background','.CategotyValues','Suggestions','<div\x20class=\x22col-md-12\x22>','append','split','display',';color:','Feb','title','Title','style','&Department=','border:\x20','An\x20error\x20occurred.\x20Please\x20try\x20again.','<li><a\x20href=','Jan','\x27\x20&$orderby=\x20Title\x20asc','#_TextTitle'];a383_0x2de0=function(){return _0x2c062d;};return a383_0x2de0();}var HTMLDESIGN='';function AvtivityTimeLineDesign(_0x5f21f8,_0x107d6d,_0x5cb0fc,_0x29b93f,_0x3e65c4,_0x5dbc19,_0x3e44b7){var _0x4dcf09=a383_0x4a271d;HTMLDESIGN=HTMLDESIGN+_0x4dcf09(0x14b)+'<div\x20class=\x27panel\x20panel-default\x20panel-mb10\x27>'+_0x4dcf09(0x13c)+_0x5cb0fc+_0x4dcf09(0x1a4)+_0x4dcf09(0x1b2)+_0x4dcf09(0x137)+_0x107d6d+_0x4dcf09(0x12e)+_0x4dcf09(0x131)+_0x29b93f+_0x4dcf09(0x12e)+_0x4dcf09(0x191)+_0x4dcf09(0x176)+_0x5f21f8+_0x4dcf09(0x151)+_0x4dcf09(0x13f)+'<ul\x20class=\x27list-inline\x20list-unstyled\x27>'+_0x4dcf09(0x163)+_0x3e65c4+_0x4dcf09(0x1b0)+_0x5dbc19+'\x20</span></li>'+_0x4dcf09(0x18c)+_0x3e44b7+'\x20class=\x27view\x20my_view_arrow_w\x27><i\x20class=\x27fa\x20fa-chevron-circle-right\x27></i></a></li>'+_0x4dcf09(0x16e)+'</div>'+_0x4dcf09(0x13f)+_0x4dcf09(0x13f);}function ActivityDetailinmodel(_0x53f10b){var _0x20b80a=a383_0x4a271d,_0x4c7a26=titanForWork[_0x20b80a(0x135)](_0x20b80a(0x126))+'/_api/web/lists/getbytitle(\x27Activity\x27)/items?$filter=ID\x20eq\x20(\x27'+_0x53f10b+_0x20b80a(0x17c);$[_0x20b80a(0x19b)]({'url':_0x4c7a26,'headers':{'Accept':_0x20b80a(0x124)},'async':![],'success':function(_0x1de625){var _0x31ed5d=_0x20b80a,_0x30c8aa=_0x1de625['d'][_0x31ed5d(0x158)];if(_0x30c8aa[_0x31ed5d(0x193)]>0x0){$(_0x31ed5d(0x18f))[_0x31ed5d(0x129)](_0x30c8aa[0x0]['Title']),$(_0x31ed5d(0x155))[_0x31ed5d(0x13b)](_0x30c8aa[0x0][_0x31ed5d(0x17f)]),$('#_ModelHeading')[_0x31ed5d(0x129)](_0x30c8aa[0x0][_0x31ed5d(0x1a8)]),$(_0x31ed5d(0x1a2))['text'](_0x30c8aa[0x0][_0x31ed5d(0x177)]),$('#textdate')[_0x31ed5d(0x129)](formatDateEvent(_0x30c8aa[0x0][_0x31ed5d(0x138)]));var _0x30f969=_0x30c8aa[0x0][_0x31ed5d(0x1a7)][_0x31ed5d(0x158)]['length'];$(_0x31ed5d(0x167))[_0x31ed5d(0x19c)]();if(_0x30f969>0x0){var _0x5d71d8='';for(var _0x4fa127=0x0;_0x4fa127<_0x30f969;_0x4fa127++){$(_0x31ed5d(0x167))['append']('<a\x20onclick=\x22priviewfile(this);\x22\x20href=\x22javascript:void(0)\x22\x20data-filename=\x22'+_0x30c8aa[0x0][_0x31ed5d(0x1a7)][_0x31ed5d(0x158)][_0x4fa127][_0x31ed5d(0x148)]+_0x31ed5d(0x164)+_0x30c8aa[0x0][_0x31ed5d(0x1a7)][_0x31ed5d(0x158)][_0x4fa127]['ServerRelativeUrl']+_0x31ed5d(0x192)+_0x30c8aa[0x0][_0x31ed5d(0x1a7)][_0x31ed5d(0x158)][_0x4fa127]['ServerRelativeUrl']+'>\x20'+_0x30c8aa[0x0][_0x31ed5d(0x1a7)]['results'][_0x4fa127][_0x31ed5d(0x148)]+_0x31ed5d(0x168)),_0x5d71d8+=_0x31ed5d(0x196);}}}},'error':function(_0x5504b3){var _0x468b27=_0x20b80a;alert(_0x468b27(0x18b));}});}function priviewfile(_0x2365af){var _0x36c64d=a383_0x4a271d;src=_0x2365af['name']+'?web=1';var _0x2ac0c1='',_0x31401d=_0x2365af[_0x36c64d(0x17a)][_0x36c64d(0x136)][_0x36c64d(0x182)]('.')[_0x36c64d(0x190)]();_0x31401d==_0x36c64d(0x16f)||_0x31401d==_0x36c64d(0x198)||_0x31401d=='xls'||_0x31401d=='xlsx'||_0x31401d==_0x36c64d(0x171)||_0x31401d=='pptx'||_0x31401d==_0x36c64d(0x179)?(_0x2ac0c1=_spPageContextInfo[_0x36c64d(0x178)]+_0x36c64d(0x153)+_0x2365af[_0x36c64d(0x17a)][_0x36c64d(0x157)][_0x36c64d(0x182)](_0x36c64d(0x194))[0x1][_0x36c64d(0x1ad)](0x1),+_0x36c64d(0x152)):_0x2ac0c1=_0x2365af[_0x36c64d(0x17a)][_0x36c64d(0x157)];$(_0x36c64d(0x141))[_0x36c64d(0x166)](_0x36c64d(0x174),window['location']['origin']+_0x2365af[_0x36c64d(0x17a)]['fileurl']);_0x2365af[_0x36c64d(0x1a3)]==null&&(src=_0x2365af[_0x36c64d(0x186)]+_0x36c64d(0x12a),_0x2ac0c1=_0x2365af[_0x36c64d(0x186)]+'?web=1');var _0x4e4e53=$(_0x36c64d(0x12d))['empty']();$(_0x36c64d(0x162),{'src':_0x2ac0c1,'id':_0x36c64d(0x15b),'frameborder':0x0,'scrolling':_0x36c64d(0x139),'width':_0x36c64d(0x1a0),'height':_0x36c64d(0x1a6)})[_0x36c64d(0x125)](_0x4e4e53),$(_0x36c64d(0x12f))[_0x36c64d(0x143)]('show'),setTimeout(function(){var _0x2df531=_0x36c64d;if($(_0x2df531(0x1aa))['contents']()[_0x2df531(0x161)]('body')[_0x2df531(0x13b)]()==''){$(_0x2df531(0x12d))[_0x2df531(0x19c)]();var _0x483697=_0x2df531(0x180)+_0x2df531(0x16c)+'<div\x20class=\x22panel-body\x22\x20style=\x22padding:60px;\x22><div\x20class=\x22row\x20text-center\x22><br>'+_0x2df531(0x14c);$(_0x2df531(0x12d))['append'](_0x2df531(0x1b5)+_0x483697+_0x2df531(0x13f));}},0x3e8);}function add3Dots(_0x29d699,_0x3077b1){var _0x657996=a383_0x4a271d,_0x3684a7=_0x657996(0x13e);return _0x29d699[_0x657996(0x193)]>_0x3077b1&&(_0x29d699=_0x29d699[_0x657996(0x1ad)](0x0,_0x3077b1)+_0x3684a7),_0x29d699;}$(window)[a383_0x4a271d(0x144)](function(){var _0x4e9edc=a383_0x4a271d;$('#'+Logged_DepartmentName)[_0x4e9edc(0x1b1)](_0x4e9edc(0x188),'border:\x20'+_0x4e9edc(0x15f)+HeaderTextColor+_0x4e9edc(0x147)+HeaderTextColor+_0x4e9edc(0x184)+MediatextColor),$(_0x4e9edc(0x146))['attr'](_0x4e9edc(0x188),_0x4e9edc(0x18a)+_0x4e9edc(0x15f)+HeaderTextColor+';background-color:'+HeaderTextColor+_0x4e9edc(0x184)+MediatextColor);});