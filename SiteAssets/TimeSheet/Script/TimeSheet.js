var a465_0xdfec1b=a465_0x26cc;(function(_0x216303,_0x45bfae){var _0x5aa986=a465_0x26cc,_0x1b7951=_0x216303();while(!![]){try{var _0x251b19=-parseInt(_0x5aa986(0x13c))/0x1*(parseInt(_0x5aa986(0x131))/0x2)+parseInt(_0x5aa986(0x186))/0x3+parseInt(_0x5aa986(0x123))/0x4*(-parseInt(_0x5aa986(0x12f))/0x5)+-parseInt(_0x5aa986(0x188))/0x6*(-parseInt(_0x5aa986(0x14a))/0x7)+parseInt(_0x5aa986(0x14c))/0x8*(-parseInt(_0x5aa986(0x111))/0x9)+parseInt(_0x5aa986(0x112))/0xa+parseInt(_0x5aa986(0x11f))/0xb;if(_0x251b19===_0x45bfae)break;else _0x1b7951['push'](_0x1b7951['shift']());}catch(_0x16f2aa){_0x1b7951['push'](_0x1b7951['shift']());}}}(a465_0x4eba,0x9d755),$(document)[a465_0xdfec1b(0x156)](function(){var _0x21d000=a465_0xdfec1b;authentication(),$(_0x21d000(0x16b))['datepicker']({'dateFormat':_0x21d000(0x149)})[_0x21d000(0x178)](_0x21d000(0x114),new Date()),$(_0x21d000(0x134))[_0x21d000(0x178)]({'dateFormat':_0x21d000(0x149)})[_0x21d000(0x178)](_0x21d000(0x114),new Date()),$(_0x21d000(0x175))[_0x21d000(0x184)](formatDateReportEmp(ConvertDateTimeFormat($(_0x21d000(0x16b))[_0x21d000(0x106)](),'/'))),$(_0x21d000(0x162))[_0x21d000(0x184)](formatDateReportEmp(ConvertDateTimeFormat($(_0x21d000(0x134))[_0x21d000(0x106)](),'/'))),initiatefilter();}),$(window)[a465_0xdfec1b(0x118)](function(){getworktype();}));function formatDateReportEmp(_0x11792f){var _0x4b79e1=a465_0xdfec1b,_0x162c0a=new Date(_0x11792f);if(isNaN(_0x162c0a['getTime']()))return _0x11792f;else{var _0x2da4d5=new Array();return _0x2da4d5[0x0]='Jan',_0x2da4d5[0x1]=_0x4b79e1(0x19a),_0x2da4d5[0x2]=_0x4b79e1(0x15b),_0x2da4d5[0x3]='Apr',_0x2da4d5[0x4]=_0x4b79e1(0x11a),_0x2da4d5[0x5]=_0x4b79e1(0x13b),_0x2da4d5[0x6]=_0x4b79e1(0x166),_0x2da4d5[0x7]='Aug',_0x2da4d5[0x8]=_0x4b79e1(0x157),_0x2da4d5[0x9]='Oct',_0x2da4d5[0xa]=_0x4b79e1(0x16e),_0x2da4d5[0xb]=_0x4b79e1(0x15e),day=_0x162c0a['getDate'](),day<0xa&&(day='0'+day),day+'\x20'+_0x2da4d5[_0x162c0a['getMonth']()]+'\x20'+_0x162c0a[_0x4b79e1(0x115)]();}}function ApplyFilter(){var _0x23c695=a465_0xdfec1b,_0x349054='',_0x19fe02='',_0x2c3f62=new Date(ConvertDateTimeFormat($(_0x23c695(0x16b))[_0x23c695(0x106)](),'/')),_0x395aa7=_0x2c3f62[_0x23c695(0x115)]()+'-'+(_0x2c3f62['getMonth']()+0x1)+'-'+_0x2c3f62[_0x23c695(0x113)](),_0x41b588=new Date(ConvertDateTimeFormat($(_0x23c695(0x134))[_0x23c695(0x106)](),'/')),_0x362b5e=_0x41b588[_0x23c695(0x115)]()+'-'+(_0x41b588[_0x23c695(0x197)]()+0x1)+'-'+_0x41b588[_0x23c695(0x113)](),_0x59f705=$('.TaskListchk:checked')[_0x23c695(0x106)]();$(_0x23c695(0x11e))['val']()!=_0x23c695(0x165)&&(_0x349054+='and\x20ClientID\x20eq\x20\x27'+$(_0x23c695(0x11e))['val']()+'\x27\x20',_0x19fe02+=_0x23c695(0x180)+$(_0x23c695(0x183))['text']()+_0x23c695(0x14d));$('#ProjectDDL')[_0x23c695(0x106)]()!=_0x23c695(0x165)&&(_0x349054+='and\x20ProjectID\x20eq\x20\x27'+$(_0x23c695(0x16c))[_0x23c695(0x106)]()+'\x27\x20',_0x19fe02+=_0x23c695(0x180)+$(_0x23c695(0x10f))[_0x23c695(0x184)]()+_0x23c695(0x14d));$(_0x23c695(0x143))[_0x23c695(0x106)]()!='ALL'&&(_0x349054+=_0x23c695(0x13a)+$('#WorkType')[_0x23c695(0x106)]()+'\x27\x20',_0x19fe02+=_0x23c695(0x180)+$(_0x23c695(0x170))[_0x23c695(0x184)]()+_0x23c695(0x14d));if(_0x59f705!=undefined){var _0x30f606=_0x59f705['split'](',');_0x349054+=_0x23c695(0x167)+_0x30f606[0x0]+'\x27\x20',_0x19fe02+='<div\x20class=\x27upload-chip\x27>'+_0x30f606[0x1]+_0x23c695(0x14d);}$(_0x23c695(0x198))[_0x23c695(0x136)](),$(_0x23c695(0x198))[_0x23c695(0x158)](_0x19fe02),$(_0x23c695(0x175))[_0x23c695(0x184)](formatDateReportEmp(ConvertDateTimeFormat($(_0x23c695(0x16b))[_0x23c695(0x106)](),'/'))),$(_0x23c695(0x162))['text'](formatDateReportEmp(ConvertDateTimeFormat($(_0x23c695(0x134))[_0x23c695(0x106)](),'/')));var _0x2bfd11=_spPageContextInfo[_0x23c695(0x190)]+'/_api/web/lists/getbytitle(\x27EmpTimeSheet\x27)/items?$select=*,TaskID/Title,ProjectID/Title,ModuleID/Title,ClientID/Title&$expand=TaskID/Title,ProjectID/Title,ModuleID/Title,ClientID/Title&$top=5000&$orderby=AbsoluteTime\x20asc&$filter=CompanyID\x20eq\x20\x27'+titanForWork[_0x23c695(0x159)](_0x23c695(0x146))+'\x27\x20and\x20Employee\x20eq\x20\x27'+_spPageContextInfo[_0x23c695(0x142)]+_0x23c695(0x12a)+_0x395aa7+'\x27\x20and\x20DateOfWork\x20le\x20\x27'+_0x362b5e+'\x27'+_0x349054;DisplayTimeSheet(_0x2bfd11);}function initiatefilter(){var _0x159b82=a465_0xdfec1b,_0x5bb3d2=new Date(ConvertDateTimeFormat($(_0x159b82(0x16b))[_0x159b82(0x106)](),'/')),_0xe112ed=_0x5bb3d2[_0x159b82(0x115)]()+'-'+(_0x5bb3d2['getMonth']()+0x1)+'-'+_0x5bb3d2[_0x159b82(0x113)](),_0x507d90=new Date(ConvertDateTimeFormat($('#timesheetTo')[_0x159b82(0x106)](),'/')),_0x345b4a=_0x507d90[_0x159b82(0x115)]()+'-'+(_0x507d90[_0x159b82(0x197)]()+0x1)+'-'+_0x507d90[_0x159b82(0x113)](),_0x34e669=_spPageContextInfo[_0x159b82(0x190)]+'/_api/web/lists/getbytitle(\x27EmpTimeSheet\x27)/items?$select=*,TaskID/Title,ProjectID/Title,ModuleID/Title,ClientID/Title&$expand=TaskID/Title,ProjectID/Title,ModuleID/Title,ClientID/Title&$filter=CompanyID\x20eq\x20\x27'+titanForWork[_0x159b82(0x159)](_0x159b82(0x146))+_0x159b82(0x168)+_spPageContextInfo[_0x159b82(0x142)]+_0x159b82(0x12a)+_0xe112ed+_0x159b82(0x154)+_0x345b4a+_0x159b82(0x10d);DisplayTimeSheet(_0x34e669);}function DisplayTimeSheet(_0x175999){var _0x2772fd=a465_0xdfec1b;$[_0x2772fd(0x16a)]({'url':_0x175999,'headers':{'Accept':_0x2772fd(0x14b)},'async':![],'success':function(_0x41cee4){var _0x385459=_0x2772fd,_0x38be81=_0x41cee4['d'][_0x385459(0x17b)];$(_0x385459(0x155))[_0x385459(0x136)](),$(_0x385459(0x120))[_0x385459(0x184)](_0x38be81[_0x385459(0x18f)]);var _0x392e5d='';if(_0x38be81[_0x385459(0x18f)]>0x0){var _0x57d407=0x0;for(var _0x43f519=0x0;_0x43f519<_0x38be81[_0x385459(0x18f)];_0x43f519++){_0x57d407=parseInt(_0x57d407)+parseInt(_0x38be81[_0x43f519][_0x385459(0x176)]);var _0x48268f=_0x38be81[_0x43f519]['ID'],_0x2311a7=_0x38be81[_0x43f519][_0x385459(0x13d)];if(_0x2311a7==null)_0x2311a7='';else _0x2311a7=new Date(_0x2311a7),_0x2311a7=$[_0x385459(0x178)]['formatDate'](_0x385459(0x17c),_0x2311a7);var _0x5586c1='-';_0x38be81[_0x43f519][_0x385459(0x196)][_0x385459(0x127)]!=undefined&&(_0x5586c1=_0x38be81[_0x43f519][_0x385459(0x196)][_0x385459(0x127)]);var _0x62178a='-';_0x38be81[_0x43f519]['ProjectID'][_0x385459(0x127)]!=undefined&&(_0x62178a=_0x38be81[_0x43f519]['ProjectID'][_0x385459(0x127)]);var _0xb6e6ce='-';_0x38be81[_0x43f519]['ModuleID'][_0x385459(0x127)]!=undefined&&(_0xb6e6ce=_0x38be81[_0x43f519][_0x385459(0x12d)][_0x385459(0x127)]);var _0x21e0f5='-';_0x38be81[_0x43f519][_0x385459(0x163)][_0x385459(0x127)]!=undefined&&(_0x21e0f5=_0x38be81[_0x43f519]['ClientID'][_0x385459(0x127)]);var _0x99b086='-';_0x38be81[_0x43f519][_0x385459(0x126)]!=null&&(_0x99b086=_0x38be81[_0x43f519][_0x385459(0x126)]);var _0x124dd4=_0x38be81[_0x43f519]['StartTime'],_0x708577=_0x38be81[_0x43f519]['EndTime'],_0x1e507b=_0x38be81[_0x43f519][_0x385459(0x176)],_0x13143e=_0x38be81[_0x43f519]['WorkHours'],_0x392f5a=Math[_0x385459(0x138)](_0x13143e/0x3c),_0x5d4b88=_0x13143e%0x3c,_0x3f6beb=_0x392f5a+':'+_0x5d4b88,_0x9db4ce=[];_0x9db4ce['push']([_0x48268f,_0x2311a7]);var _0x3e4a96=_spPageContextInfo[_0x385459(0x190)]+_0x385459(0x174)+window[_0x385459(0x130)](_0x385459(0x18e))+_0x385459(0x16f)+window[_0x385459(0x130)](_0x9db4ce)+'&WebAppId=2&sourcelocation=../Pages/timesheet.aspx#',_0x3bc538=_0x385459(0x147)+_0x3e4a96+_0x385459(0x119);_0x392e5d+=_0x385459(0x17d)+_0x2311a7+_0x385459(0x129)+_0x5586c1+_0x385459(0x129)+_0x62178a+_0x385459(0x129)+_0xb6e6ce+'</td><td>'+_0x21e0f5+'</td><td>'+_0x99b086+_0x385459(0x129)+_0x124dd4+'\x20-\x20'+_0x708577+_0x385459(0x129)+_0x3f6beb+'</td><td>'+_0x3bc538+_0x385459(0x17a),_0x392e5d+=_0x385459(0x121);}var _0x301781=Math[_0x385459(0x138)](_0x57d407/0x3c),_0x400e13=_0x57d407%0x3c;$(_0x385459(0x193))[_0x385459(0x184)](_0x301781+':'+_0x400e13+'\x20(H:M)');}else $(_0x385459(0x191))[_0x385459(0x136)](),$(_0x385459(0x193))[_0x385459(0x184)]('00:00');_0x38be81[_0x385459(0x18f)]==0x0?$(_0x385459(0x177))[_0x385459(0x10b)]():$(_0x385459(0x177))['hide'](),$(_0x385459(0x155))[_0x385459(0x158)](_0x392e5d),_0x38be81['length']>0x0&&TableConfigurationTimeSheetDtl();},'error':function(_0x389081){var _0x33a624=_0x2772fd;console['log'](_0x33a624(0x17f)),console[_0x33a624(0x192)](_0x389081);}});}function TableConfigurationTimeSheetDtl(){var _0x393297=a465_0xdfec1b;sorter=new TINY[(_0x393297(0x132))][(_0x393297(0x194))]('sorter',_0x393297(0x105),{'headclass':_0x393297(0x169),'ascclass':_0x393297(0x10c),'descclass':'desc','evenclass':_0x393297(0x145),'oddclass':_0x393297(0x185),'evenselclass':_0x393297(0x199),'oddselclass':_0x393297(0x110),'paginate':!![],'size':0xa,'colddid':_0x393297(0x137),'currentid':'currentpage','totalid':_0x393297(0x11b),'startingrecid':_0x393297(0x18d),'endingrecid':_0x393297(0x18b),'totalrecid':_0x393297(0x189),'hoverid':_0x393297(0x11c),'pageddid':_0x393297(0x109),'navid':_0x393297(0x161),'sortdir':0x1,'init':!![]});}function a465_0x26cc(_0x46d432,_0x94951c){var _0x4ebac9=a465_0x4eba();return a465_0x26cc=function(_0x26ccfe,_0x5b2fe4){_0x26ccfe=_0x26ccfe-0x105;var _0x412b75=_0x4ebac9[_0x26ccfe];return _0x412b75;},a465_0x26cc(_0x46d432,_0x94951c);}function getworktype(){var _0x143d35=a465_0xdfec1b,_0x39a5d0=_spPageContextInfo[_0x143d35(0x190)]+_0x143d35(0x128);$[_0x143d35(0x16a)]({'url':_0x39a5d0,'async':![],'headers':{'Accept':'application/json;odata=verbose'},'success':function(_0x16385f){var _0x55ffc0=_0x143d35,_0x2d8a70=_0x16385f['d'][_0x55ffc0(0x17b)];if(_0x2d8a70[_0x55ffc0(0x18f)]>0x0){$('#WorkType')[_0x55ffc0(0x136)](),$('#WorkType')[_0x55ffc0(0x158)]($(_0x55ffc0(0x15a))[_0x55ffc0(0x106)](_0x55ffc0(0x165))[_0x55ffc0(0x107)](_0x55ffc0(0x165)));for(i=0x0;i<_0x2d8a70['length'];i++){$(_0x55ffc0(0x143))[_0x55ffc0(0x158)]($(_0x55ffc0(0x15a))[_0x55ffc0(0x106)](_0x2d8a70[i]['CatogeryName'])[_0x55ffc0(0x107)](_0x2d8a70[i][_0x55ffc0(0x139)]));}}loadclient();},'error':function(_0x15b736){var _0x3e18ca=_0x143d35;alert(_0x3e18ca(0x14e));}});}function loadclient(){var _0x3c8feb=a465_0xdfec1b,_0x4f0cc6=_spPageContextInfo['webAbsoluteUrl']+_0x3c8feb(0x135)+titanForWork['getQueryStringParameter'](_0x3c8feb(0x146))+_0x3c8feb(0x179);$[_0x3c8feb(0x16a)]({'url':_0x4f0cc6,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x145b87){var _0x236514=_0x3c8feb,_0x838021=_0x145b87['d'][_0x236514(0x17b)];if(_0x838021[_0x236514(0x18f)]>0x0){$('#ClientDDL')[_0x236514(0x136)](),$(_0x236514(0x11e))[_0x236514(0x158)]($(_0x236514(0x15a))[_0x236514(0x106)](_0x236514(0x165))[_0x236514(0x107)]('ALL'));for(var _0x43b6b6=0x0;_0x43b6b6<_0x838021[_0x236514(0x18f)];_0x43b6b6++){$(_0x236514(0x11e))[_0x236514(0x158)]($(_0x236514(0x15a))['val'](_0x838021[_0x43b6b6]['ID'])[_0x236514(0x107)](_0x838021[_0x43b6b6][_0x236514(0x127)]));}}else $(_0x236514(0x11e))[_0x236514(0x136)]();loadproject();},'error':function(_0x181ad6){var _0x2fb38d=_0x3c8feb;console[_0x2fb38d(0x192)](_0x2fb38d(0x17f)),console[_0x2fb38d(0x192)](_0x181ad6);}});}function loadproject(){var _0x9e7cb5=a465_0xdfec1b,_0x4601a6='',_0x474967=[],_0x3c24f5=_spPageContextInfo[_0x9e7cb5(0x190)]+_0x9e7cb5(0x16d)+_spPageContextInfo[_0x9e7cb5(0x142)]+'\x27)&$orderby=Project\x20asc&$top=5000';$[_0x9e7cb5(0x16a)]({'url':_0x3c24f5,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x28ac15){var _0xeb128b=_0x9e7cb5,_0x316ea5=_0x28ac15['d'][_0xeb128b(0x17b)];for(var _0x5a4521=0x0;_0x5a4521<_0x316ea5[_0xeb128b(0x18f)];_0x5a4521++){_0x474967['push'](_0x316ea5[_0x5a4521][_0xeb128b(0x12c)]);}_0x4601a6=_0x474967[_0xeb128b(0x12e)](function(_0x4fed96,_0xf252c3,_0x3c553b){var _0x42a2d6=_0xeb128b;return _0xf252c3==_0x3c553b[_0x42a2d6(0x164)](_0x4fed96);});},'error':function(_0x2b4568){var _0x1e7ca6=_0x9e7cb5;console[_0x1e7ca6(0x192)](_0x1e7ca6(0x151)),console[_0x1e7ca6(0x192)](_0x2b4568);}});var _0x4411fc=[];for(var _0xd27acd=0x0;_0xd27acd<_0x4601a6[_0x9e7cb5(0x18f)];_0xd27acd++){var _0x11b0ef=_0x4601a6[_0xd27acd],_0x2bf0e2=_spPageContextInfo[_0x9e7cb5(0x190)]+_0x9e7cb5(0x15f)+_0x11b0ef+'\x27&$top=5000';$[_0x9e7cb5(0x16a)]({'url':_0x2bf0e2,'headers':{'Accept':_0x9e7cb5(0x14b)},'async':![],'success':function(_0x3a3436){var _0x2d9487=_0x9e7cb5,_0xdd1599=_0x3a3436['d']['results'];if(_0xdd1599['length']>0x0){var _0x4d0a4f=[];for(var _0x5a895b=0x0;_0x5a895b<_0xdd1599[_0x2d9487(0x18f)];_0x5a895b++){var _0x47f0c8=_0xdd1599[_0x5a895b]['ID'],_0x33a388=_0xdd1599[_0x5a895b]['ProjectName'];_0x4411fc[_0x2d9487(0x172)]([_0x47f0c8,_0x33a388]);}}},'error':function(_0x266e50){var _0x4ff68d=_0x9e7cb5;console[_0x4ff68d(0x192)]('loadprojectinsearch\x20Function\x20failed'),console[_0x4ff68d(0x192)](_0x266e50);}});}if(_0x4411fc['length']>0x0){$(_0x9e7cb5(0x16c))[_0x9e7cb5(0x136)](),$('#ProjectDDL')[_0x9e7cb5(0x158)]($(_0x9e7cb5(0x15a))[_0x9e7cb5(0x106)](_0x9e7cb5(0x165))[_0x9e7cb5(0x107)](_0x9e7cb5(0x165)));for(var _0x2034e7=0x0;_0x2034e7<_0x4411fc[_0x9e7cb5(0x18f)];_0x2034e7++){$(_0x9e7cb5(0x16c))[_0x9e7cb5(0x158)]($(_0x9e7cb5(0x15a))['val'](_0x4411fc[_0x2034e7][0x0])['html'](_0x4411fc[_0x2034e7][0x1]));}}else $('#ProjectDDL')['empty'](),$(_0x9e7cb5(0x16c))[_0x9e7cb5(0x158)]($(_0x9e7cb5(0x15a))[_0x9e7cb5(0x106)](_0x9e7cb5(0x165))[_0x9e7cb5(0x107)](_0x9e7cb5(0x165)));}function a465_0x4eba(){var _0x23b86=['table','CurrentPhase','#timesheetTo','/_api/web/lists/getbytitle(\x27ClientMaster\x27)/items?$select=*&$filter=IsActive\x20eq\x20\x271\x27\x20and\x20CompanyID\x20eq\x20(\x27','empty','columns','floor','CatogeryName','and\x20Work_Type\x20eq\x20\x27','Jun','519434clhfaa','DateOfWork','All','/_api/web/lists/getbytitle(\x27EnvironmentalSettings\x27)/items?$select=Title,Active,ListOfUsers/Title&$filter=Title\x20eq\x20\x27Timesheet\x20Entry\x27\x20&$expand=ListOfUsers/Id','application/json;\x20odata=verbose','checked','userId','#WorkType','.ResetCTRL','evenrow','CompanyId','<div\x20class=\x27approval-edit-lock-btn-box\x27><a\x20href=','select#StatusFilter\x20option:selected','dd/mm/yy','553322hUuFrp','application/json;odata=verbose','522056vYdpSo','</div>','An\x20error\x20occurred.\x20Please\x20try\x20again.','pagedropdowns','formatDate','loadtaskinsearch\x20Function\x20failed','/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG','loadtaskinfilter\x20Function\x20failed','\x27\x20and\x20DateOfWork\x20le\x20\x27','.TimeSheetTableDataDIV','ready','Sept','append','getQueryStringParameter','<option></option>','Mar','CompletionPersent','/_api/web/lists/getbytitle(\x27EmployeeTaskDetails\x27)/items?$select=*,Editor/Title,Module/Title,ClientID/Title,TaskManager/Title,ProjectID/Title&$expand=Module/Title,TaskManager/Id,ClientID/Title,Editor/Id,ProjectID/Title&$filter=TaskAssignTo\x20eq\x20(\x27','Dec','/_api/web/lists/getbytitle(\x27ProjectDetails\x27)/items?$select=ID,ProjectName&$filter=ID\x20eq\x20\x27','Active','tablenav','#txtEndDate','ClientID','indexOf','ALL','Jul','and\x20TaskID\x20eq\x20\x27','\x27\x20and\x20AuthorId\x20eq\x20\x27','head','ajax','#timesheetFrom','#ProjectDDL','/_api/web/lists/getbytitle(\x27ProjectTeamDetails\x27)/items?$select=*&$filter=TeamMember\x20eq\x20(\x27','Nov','&data=','#WorkType\x20option:selected','hide','push','forEach','/Pages/TimeSheetEntry.aspx?Mode=','#txtStartDate','WorkHours','.NoRecordFound','datepicker','\x27)&$orderby=Title\x20asc&$top=5000','</td>','results','dd-M-yy','<tr><td>','\x27\x20onclick=\x27onlyOne(this)\x27></td><td>','loadprojectinsearch\x20Function\x20failed','<div\x20class=\x27upload-chip\x27>','ProjectIDId','This\x20feature\x20has\x20been\x20deactivated\x20!','#ClientDDL\x20option:selected','text','oddrow','75168PxdkJN','location','78nQndYg','totalrecords','totalpagess','endrecord','TaskListTable','startrecord','Edit','length','webAbsoluteUrl','.ClientTables','log','#TOTALHOURS','sorter','ProjectID','TaskID','getMonth','#filterchips','evenselected','Feb','split','TimeSheetTableData','val','html','GET','pagedropdown','userDisplayName','show','asc','\x27&$top=5000\x20','Timesheet\x20Entry','#ProjectDDL\x20option:selected','oddselected','45GBMWkm','7234400zqdnJl','getDate','setDate','getFullYear','stringify','/_api/web/lists/getbytitle(\x27EmployeeTaskDetails\x27)/items?$select=*,Editor/Title,Module/Title,TaskManager/Title,ClientID/Title,ProjectID/Title&$expand=Module/Title,ClientID/Title,TaskManager/Id,Editor/Id,ProjectID/Title&$filter=TaskAssignTo\x20eq\x20(\x27','load','\x20class=\x27custom-edit-btn\x27><i\x20class=\x27fa\x20fa-pencil\x27></i></a></div>','May','totalpages','selectedrow','.mainDivAllTask','#ClientDDL','2624864maoilA','#TotalItemscount','</tr>','\x27)\x20and\x20CurrentPhase\x20eq\x20(\x27','4616Rkvvyz','DueDate','#TotalItemscounts','Work_Type','Title','/_api/web/lists/getbytitle(\x27CategoryMaster\x27)/items?select=ID,Title,CategoryType,CatogeryName&$filter=CategoryType\x20eq\x20\x27Work\x20Type\x27\x20and\x20Status\x20eq\x20\x27Yes\x27&$orderby=CatogeryName\x20asc&$top=5000','</td><td>','\x27\x20and\x20DateOfWork\x20ge\x20\x27','<tr><td><input\x20type=\x27checkbox\x27\x20class=\x27TaskListchk\x27\x20name=\x27TaskListchk\x27\x20value=\x27','ProjectId','ModuleID','filter','20MlJgDC','btoa','4TKWkVe'];a465_0x4eba=function(){return _0x23b86;};return a465_0x4eba();}function ResetControl(){var _0x267ce1=a465_0xdfec1b;$(_0x267ce1(0x144))[_0x267ce1(0x106)](_0x267ce1(0x165));}function ClearControl(){var _0x3c6dd8=a465_0xdfec1b;$(_0x3c6dd8(0x144))[_0x3c6dd8(0x106)](_0x3c6dd8(0x165)),$(_0x3c6dd8(0x16b))[_0x3c6dd8(0x178)]({'dateFormat':_0x3c6dd8(0x149)})[_0x3c6dd8(0x178)](_0x3c6dd8(0x114),new Date()),$('#timesheetTo')['datepicker']({'dateFormat':'dd/mm/yy'})[_0x3c6dd8(0x178)]('setDate',new Date());}function loadtaskinfilter(){var _0x526617=a465_0xdfec1b,_0x468a3a=$(_0x526617(0x148))[_0x526617(0x106)](),_0x214c53='';if(_0x468a3a!=_0x526617(0x13e))var _0x169065=_spPageContextInfo['webAbsoluteUrl']+_0x526617(0x117)+_spPageContextInfo['userId']+_0x526617(0x122)+_0x468a3a+'\x27)&$orderby=Title\x20asc';else var _0x169065=_spPageContextInfo[_0x526617(0x190)]+_0x526617(0x15d)+_spPageContextInfo[_0x526617(0x142)]+'\x27)&$orderby=Title\x20asc';$[_0x526617(0x16a)]({'url':_0x169065,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x44ae70){var _0x96447c=_0x526617,_0x31ac2b=_0x44ae70['d']['results'];$(_0x96447c(0x11d))[_0x96447c(0x136)](),$(_0x96447c(0x125))[_0x96447c(0x184)](_0x31ac2b[_0x96447c(0x18f)]);var _0x301839='';if(_0x31ac2b['length']>0x0){var _0x477222=[],_0x1d7f04=[];for(var _0x197ae9=0x0;_0x197ae9<_0x31ac2b['length'];_0x197ae9++){var _0x4b95bc=_0x31ac2b[_0x197ae9]['ID'],_0x26c359=_0x31ac2b[_0x197ae9][_0x96447c(0x127)],_0x51116b=_0x31ac2b[_0x197ae9][_0x96447c(0x195)][_0x96447c(0x127)];_0x51116b==undefined?_0x51116b='':(_0x51116b=_0x31ac2b[_0x197ae9][_0x96447c(0x195)]['Title'],_0x477222[_0x96447c(0x172)](_0x51116b),_0x1d7f04[_0x96447c(0x172)](_0x31ac2b[_0x197ae9][_0x96447c(0x181)]));var _0x370e1a=_0x31ac2b[_0x197ae9]['TaskPriority'],_0x45f722=_0x31ac2b[_0x197ae9][_0x96447c(0x133)],_0xd8fdce=_0x31ac2b[_0x197ae9]['Editor'][_0x96447c(0x127)],_0x147049=_0x31ac2b[_0x197ae9][_0x96447c(0x15c)],_0x3199cf=_0x31ac2b[_0x197ae9][_0x96447c(0x124)];if(_0x3199cf==null)_0x3199cf='';else _0x3199cf=new Date(_0x3199cf),_0x3199cf=$[_0x96447c(0x178)][_0x96447c(0x150)](_0x96447c(0x17c),_0x3199cf);var _0x3ef4e7=[];_0x3ef4e7[_0x96447c(0x172)]([_0x4b95bc,_0x26c359]),_0x301839+=_0x96447c(0x12b)+_0x3ef4e7+_0x96447c(0x17e)+_0x26c359+_0x96447c(0x129)+_0x51116b+_0x96447c(0x129)+_0xd8fdce+'</td><td>'+_0x3199cf+_0x96447c(0x129)+_0x45f722+_0x96447c(0x17a),_0x301839+=_0x96447c(0x121);}}else $(_0x96447c(0x11d))[_0x96447c(0x136)]();_0x31ac2b[_0x96447c(0x18f)]==0x0?$(_0x96447c(0x177))[_0x96447c(0x10b)]():$(_0x96447c(0x177))[_0x96447c(0x171)](),$(_0x96447c(0x11d))[_0x96447c(0x158)](_0x301839),_0x31ac2b['length']>0x0&&TableConfiguration();},'error':function(_0x44c4f4){var _0xc145b2=_0x526617;console[_0xc145b2(0x192)](_0xc145b2(0x153)),console['log'](_0x44c4f4);}});}function TableConfiguration(){var _0x3a42aa=a465_0xdfec1b;sorter=new TINY[(_0x3a42aa(0x132))]['sorter'](_0x3a42aa(0x194),_0x3a42aa(0x18c),{'headclass':'head','ascclass':'asc','descclass':'desc','evenclass':'evenrow','oddclass':'oddrow','evenselclass':_0x3a42aa(0x199),'oddselclass':'oddselected','paginate':!![],'size':0x5,'colddid':_0x3a42aa(0x137),'currentid':'currentpages','totalid':_0x3a42aa(0x18a),'startingrecid':'startrecord','endingrecid':_0x3a42aa(0x18b),'totalrecid':'totalrecords','hoverid':'selectedrow','pageddid':_0x3a42aa(0x14f),'navid':'tablenav','sortdir':0x1,'init':!![]});}function onlyOne(_0x42b674){var _0x11956d=a465_0xdfec1b,_0x52256f=document['getElementsByName']('TaskListchk');_0x52256f[_0x11956d(0x173)](_0x51d074=>{var _0x4c458a=_0x11956d;if(_0x51d074!==_0x42b674)_0x51d074[_0x4c458a(0x141)]=![];});}function ConvertDateTimeFormat(_0xf18c1e,_0x4a3d13){var _0xb82295=a465_0xdfec1b;return _0xf18c1e[_0xb82295(0x19b)](_0x4a3d13)[0x1]+''+_0x4a3d13+''+_0xf18c1e[_0xb82295(0x19b)](_0x4a3d13)[0x0]+''+_0x4a3d13+''+_0xf18c1e[_0xb82295(0x19b)](_0x4a3d13)[0x2];}var authentication=function(){var _0x8e6b49=a465_0xdfec1b,_0x43face=_spPageContextInfo[_0x8e6b49(0x10a)],_0x251b61=_spPageContextInfo['webAbsoluteUrl']+_0x8e6b49(0x13f);$['ajax']({'url':_0x251b61,'async':![],'type':_0x8e6b49(0x108),'headers':{'accept':_0x8e6b49(0x140)},'success':function(_0x2dbea7){var _0x84af3c=_0x8e6b49;debugger;var _0x27547f=_0x2dbea7['d'][_0x84af3c(0x17b)];if(_0x27547f[_0x84af3c(0x18f)]>0x0)for(var _0x461efb=0x0;_0x461efb<_0x27547f['length'];_0x461efb++){if(_0x27547f[_0x461efb]['Title']==_0x84af3c(0x10e)){if(_0x27547f[_0x461efb][_0x84af3c(0x160)]==![])return alert(_0x84af3c(0x182)),window[_0x84af3c(0x187)]=_spPageContextInfo[_0x84af3c(0x190)]+_0x84af3c(0x152),![];}}},'error':function(_0xad258c){var _0x17c81b=_0x8e6b49;alert(JSON[_0x17c81b(0x116)](_0xad258c));}});};