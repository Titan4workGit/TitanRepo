(function(_0x5aadbc,_0x28a7cd){var _0x2bb3e3=_0x55f0,_0x56bc77=_0x5aadbc();while(!![]){try{var _0x2e629b=-parseInt(_0x2bb3e3(0x158))/0x1*(parseInt(_0x2bb3e3(0x131))/0x2)+-parseInt(_0x2bb3e3(0x146))/0x3+-parseInt(_0x2bb3e3(0x14c))/0x4+parseInt(_0x2bb3e3(0x106))/0x5+parseInt(_0x2bb3e3(0x108))/0x6*(parseInt(_0x2bb3e3(0x115))/0x7)+parseInt(_0x2bb3e3(0x145))/0x8+parseInt(_0x2bb3e3(0x10e))/0x9;if(_0x2e629b===_0x28a7cd)break;else _0x56bc77['push'](_0x56bc77['shift']());}catch(_0xa4ac52){_0x56bc77['push'](_0x56bc77['shift']());}}}(_0x2309,0xcf9b8));var currentDlg='';$(document)['ready'](function(){var _0x4c3178=_0x55f0;$(_0x4c3178(0xe8))[_0x4c3178(0xe9)](function(){var _0x5e57e5=_0x4c3178;this[_0x5e57e5(0x104)]=null;}),$(_0x4c3178(0xe8))[_0x4c3178(0x13b)](function(){var _0x34caa3=_0x4c3178;$('#txtAddedCount')[_0x34caa3(0xda)]('0'),$('#txtFailedTasks')[_0x34caa3(0xda)]('0'),ReadExcel();}),$('#selectAllChk')[_0x4c3178(0xe9)](function(_0x492f87){var _0x2f98ed=_0x4c3178,_0x18026=$(_0x492f87[_0x2f98ed(0xdc)])[_0x2f98ed(0x13a)](_0x2f98ed(0x183));$(_0x2f98ed(0x14e),_0x18026)[_0x2f98ed(0x171)]('checked',this['checked']),this[_0x2f98ed(0x17a)]==!![]?$('tr',_0x18026)[_0x2f98ed(0x15a)](_0x2f98ed(0x174)):$('tr',_0x18026)[_0x2f98ed(0x107)]('selected'),this[_0x2f98ed(0x17a)]==!![]?$(_0x2f98ed(0x101))[_0x2f98ed(0xda)]($(_0x2f98ed(0x13e))[_0x2f98ed(0x140)]):$('#txtSelectedRows')[_0x2f98ed(0xda)]('0');}),$('#btnCloseTasks')['click'](function(_0x107e48){var _0x11651a=_0x4c3178;location[_0x11651a(0x141)]=_0x11651a(0x164)+titanForWork[_0x11651a(0x14d)](_0x11651a(0x12e));});});function ReadExcel(){var _0x38c77d=_0x55f0,_0x2586d4=/^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;if(_0x2586d4[_0x38c77d(0x18b)]($(_0x38c77d(0xe8))[_0x38c77d(0x177)]()[_0x38c77d(0xd6)]())){var _0x433030=![];$('#ExcelUpload')[_0x38c77d(0x177)]()[_0x38c77d(0xd6)]()['indexOf'](_0x38c77d(0xff))>0x0&&(_0x433030=!![]);if(typeof FileReader!=_0x38c77d(0x14b)){var _0x495f14=new FileReader();_0x495f14[_0x38c77d(0x184)]=function(_0xc58dd3){var _0x10472f=_0x38c77d,_0x4000cb=_0xc58dd3['target'][_0x10472f(0x188)];if(_0x433030)var _0x219af2=XLSX['read'](_0x4000cb,{'type':_0x10472f(0x156)});else var _0x219af2=XLS[_0x10472f(0x166)](_0x4000cb,{'type':_0x10472f(0x156)});var _0x394679=_0x219af2[_0x10472f(0x153)],_0x170e99=0x0;_0x394679['forEach'](function(_0x44aa98){var _0x594c51=_0x10472f;if(_0x433030)var _0x9f1ffa=XLSX[_0x594c51(0x17b)][_0x594c51(0x186)](_0x219af2[_0x594c51(0x173)][_0x44aa98]);else var _0x9f1ffa=XLS['utils'][_0x594c51(0x143)](_0x219af2['Sheets'][_0x44aa98]);_0x9f1ffa[_0x594c51(0x140)]>0x0&&_0x170e99==0x0&&(ValidateExcel(_0x9f1ffa)==!![]?BindExcelToTable(_0x9f1ffa):$(_0x594c51(0xe8))[_0x594c51(0x177)](''),_0x170e99++);});},_0x433030?_0x495f14[_0x38c77d(0x144)]($(_0x38c77d(0xe8))[0x0][_0x38c77d(0x127)][0x0]):_0x495f14[_0x38c77d(0xe3)]($('#ExcelUpload')[0x0]['files'][0x0]);}else alert('Sorry!\x20Your\x20browser\x20does\x20not\x20support\x20HTML5!');}else alert(_0x38c77d(0x182));}function ValidateExcel(_0x51824f){var _0x483c0e=_0x55f0;IsAllCorrect=!![];if(_0x51824f[_0x483c0e(0x140)]>0x0){for(var _0x366c66=0x0;_0x366c66<_0x51824f[_0x483c0e(0x140)]-0x1;_0x366c66++){var _0x4f2e4f=_0x51824f[_0x366c66];if($[_0x483c0e(0xf8)](_0x4f2e4f[_0x483c0e(0x152)])==''||$[_0x483c0e(0xf8)](_0x4f2e4f[_0x483c0e(0xd7)])==''||$[_0x483c0e(0xf8)](_0x4f2e4f[_0x483c0e(0xe2)])==''||$[_0x483c0e(0xf8)](_0x4f2e4f['Due\x20Date'])=='')return alert(_0x483c0e(0x11f)),IsAllCorrect=![],![];else{if(validateEmail($[_0x483c0e(0xf8)](_0x4f2e4f[_0x483c0e(0x111)]))==![])return alert(_0x483c0e(0x126)),IsAllCorrect=![],![];else{if($['trim'](_0x4f2e4f[_0x483c0e(0xe2)])!=''){var _0x3fe0e8=$[_0x483c0e(0xf8)](_0x4f2e4f[_0x483c0e(0xe2)])[_0x483c0e(0x16c)](';');for(var _0x1d2ce3=0x0;_0x1d2ce3<_0x3fe0e8[_0x483c0e(0x140)];_0x1d2ce3++){if(validateEmail($['trim'](_0x3fe0e8[_0x1d2ce3][_0x483c0e(0xf8)]()))==![]||$[_0x483c0e(0xf8)](_0x3fe0e8[_0x1d2ce3][_0x483c0e(0xf8)]())[_0x483c0e(0xf7)](';')==!![])return alert(_0x483c0e(0x155)),IsAllCorrect=![],![];}}else IsAllCorrect=!![];}}_0x4f2e4f[_0x483c0e(0x111)]==null&&(_0x4f2e4f['Assigned\x20By']=''),_0x4f2e4f[_0x483c0e(0xea)]==null&&(_0x4f2e4f['Project']=''),_0x4f2e4f[_0x483c0e(0x160)]==null&&(_0x4f2e4f[_0x483c0e(0x160)]=''),_0x4f2e4f[_0x483c0e(0xeb)]==null&&(_0x4f2e4f[_0x483c0e(0xeb)]=''),_0x4f2e4f['Work\x20Type']==null&&(_0x4f2e4f[_0x483c0e(0x185)]=''),_0x4f2e4f['Priority']==null&&(_0x4f2e4f[_0x483c0e(0x16d)]='');}return IsAllCorrect;}else return![];}function BindExcelToTable(_0x169250){var _0x496b68=_0x55f0,_0x526c81='',_0x31af74='';$('.tbdyImportTasks')['empty']();if(_0x169250[_0x496b68(0x140)]>0x0){$('#btnViewAll')['show']();for(var _0x371875=0x0;_0x371875<_0x169250['length'];_0x371875++){_0x31af74=_0x169250[_0x371875],_0x526c81+=_0x496b68(0x187),_0x526c81+='<td>Ready</td>',_0x526c81+='<td>'+_0x31af74[_0x496b68(0x152)]+_0x496b68(0x130),_0x526c81+=_0x496b68(0x138)+_0x31af74[_0x496b68(0xd7)]+'</td>',_0x526c81+=_0x496b68(0x138)+_0x31af74['Project']+_0x496b68(0x130),_0x526c81+=_0x496b68(0x138)+_0x31af74[_0x496b68(0x160)]+_0x496b68(0x130),_0x526c81+=_0x496b68(0x138)+_0x31af74[_0x496b68(0xeb)]+'</td>',_0x526c81+=_0x496b68(0x138)+_0x31af74[_0x496b68(0x185)]+'</td>',_0x526c81+=_0x496b68(0x138)+_0x31af74['Assigned\x20By']+_0x496b68(0x130),_0x526c81+=_0x496b68(0x138)+_0x31af74[_0x496b68(0xe2)]+_0x496b68(0x130),_0x526c81+='<td>'+_0x31af74[_0x496b68(0x17f)]+_0x496b68(0x130),_0x526c81+='<td>'+_0x31af74[_0x496b68(0x16d)]+_0x496b68(0x130),_0x526c81+=_0x496b68(0x18c);}$(_0x496b68(0x12d))['append'](_0x526c81),TableConfiguration(),$(_0x496b68(0x181))[_0x496b68(0x12f)]('click'),$(_0x496b68(0x13c))[_0x496b68(0x134)]()['append'](_0x496b68(0x139)),$(_0x496b68(0xf1))[_0x496b68(0xe9)](function(_0x5bf17c){var _0x526984=_0x496b68,_0x55bd2a=_0x526984(0x170),_0x2b0f73='<br\x20/>Please\x20wait!!',_0x5dcaff=0xc8,_0x404ef6=0x190;SP[_0x526984(0xe1)][_0x526984(0x16f)](['strings.js','sp.ui.dialog.js'],function(){var _0x3b6c6a=_0x526984;currentDlg=SP['UI'][_0x3b6c6a(0xd8)][_0x3b6c6a(0xf0)](_0x55bd2a,_0x2b0f73,_0x5dcaff,_0x404ef6);}),setTimeout(function(){SubmitTasks(_0x169250);});}),$(_0x496b68(0x17c))[_0x496b68(0xe9)](function(_0x189d58){var _0x1bc8b0=_0x496b68;location['href']=_0x1bc8b0(0x164)+titanForWork[_0x1bc8b0(0x14d)](_0x1bc8b0(0x12e));});}else $(_0x496b68(0x15e))[_0x496b68(0x169)]();}var sorter='';function TableConfiguration(){var _0xdb76ae=_0x55f0;sorter=new TINY[(_0xdb76ae(0x183))][(_0xdb76ae(0xfa))](_0xdb76ae(0xfa),'tblImportTasks',{'ascclass':'asc','descclass':_0xdb76ae(0xdf),'evenclass':_0xdb76ae(0x14f),'oddclass':_0xdb76ae(0xe7),'evenselclass':_0xdb76ae(0x10f),'oddselclass':_0xdb76ae(0x11a),'paginate':!![],'size':0xa,'colddid':'columns','currentid':_0xdb76ae(0x149),'totalid':'totalpages','startingrecid':_0xdb76ae(0x124),'endingrecid':_0xdb76ae(0xf2),'totalrecid':_0xdb76ae(0x119),'hoverid':'selectedrow','pageddid':'pageDropDown','navid':'tablenav','sortdir':0x1,'init':!![]}),$(_0xdb76ae(0x101))['text']($(_0xdb76ae(0x13e))[_0xdb76ae(0x140)]),$(_0xdb76ae(0xde))[_0xdb76ae(0x13b)](function(){var _0x193f1b=_0xdb76ae;this[_0x193f1b(0x17a)]==![]?$(_0x193f1b(0x181))[_0x193f1b(0x171)]('checked',''):$(_0x193f1b(0x12d))[_0x193f1b(0x12c)]('tr')['length']==$(_0x193f1b(0x13e))[_0x193f1b(0x140)]?$(_0x193f1b(0x181))[_0x193f1b(0x171)](_0x193f1b(0x17a),_0x193f1b(0x17a)):$(_0x193f1b(0x181))[_0x193f1b(0x171)](_0x193f1b(0x17a),''),$(this)[_0x193f1b(0x13a)]('tr')['hasClass'](_0x193f1b(0x174))==!![]?$(this)[_0x193f1b(0x13a)]('tr')[_0x193f1b(0x107)](_0x193f1b(0x174)):$(this)['closest']('tr')[_0x193f1b(0x15a)](_0x193f1b(0x174)),$(_0x193f1b(0x101))[_0x193f1b(0xda)]($(_0x193f1b(0x13e))[_0x193f1b(0x140)]);});}function SubmitTasks(_0x3d7e02){var _0x1fcfd8=_0x55f0,_0x1af6b6='',_0x3ea7e5=![];_0x3d7e02[_0x1fcfd8(0x140)]>0x0&&($(_0x1fcfd8(0x181))[_0x1fcfd8(0x171)](_0x1fcfd8(0x17a),'checked'),$(_0x1fcfd8(0x167))[_0x1fcfd8(0x12f)]('click'),$('.tbdyImportTasks\x20tr.selected')[_0x1fcfd8(0x140)]>0x0&&(_0x3ea7e5=!![]),$('.tbdyImportTasks\x20tr.selected')[_0x1fcfd8(0x14a)](function(_0xc21f69,_0x1a488f){var _0x1b4163=_0x1fcfd8,_0x25f451=$[_0x1b4163(0xf8)](_0x1a488f[_0x1b4163(0x103)][0x9][_0x1b4163(0x165)])[_0x1b4163(0x16c)](';');_0x1a488f[_0x1b4163(0x103)][0x3][_0x1b4163(0x165)][_0x1b4163(0xd6)]()==_0x1b4163(0x125)?getProjectID(_0x1a488f[_0x1b4163(0x103)][0x4][_0x1b4163(0x165)],_0x25f451,_0x1a488f['children'],_0xc21f69,_0x1a488f):getCustomerID(_0x1a488f[_0x1b4163(0x103)][0x6][_0x1b4163(0x165)],_0x25f451,_0x1a488f[_0x1b4163(0x103)],_0xc21f69,_0x1a488f);}),_0x3ea7e5==!![]&&alert(_0x1fcfd8(0x105))),currentDlg[_0x1fcfd8(0x15c)]();}function getProjectID(_0x58de41,_0x23be96,_0x298045,_0x52587b,_0x4db841){var _0x2a2f58=_0x55f0,_0x14b65a=_0x2a2f58(0x150)+_0x58de41+_0x2a2f58(0xec)+_0x58de41+_0x2a2f58(0x176)+_0x58de41+_0x2a2f58(0xfc),_0x1a7d31=$[_0x2a2f58(0xfe)](),_0x362295=![],_0x406f75=[],_0x1b59b2=_spPageContextInfo[_0x2a2f58(0x120)]+'/_api/web/lists/getbytitle(\x27ProjectDetails\x27)/items/'+_0x14b65a;$[_0x2a2f58(0x142)](getItems(_0x1b59b2,_0x1a7d31))[_0x2a2f58(0x16b)](function(_0x28ad56){var _0x49c463=_0x2a2f58;response=[];if(_0x28ad56['length']>0x0){var _0x2626d7='';_0x298045[0x8][_0x49c463(0x165)]!=''&&_0x298045[0x8][_0x49c463(0x165)]!=null?_0x2626d7=_0x298045[0x8][_0x49c463(0x165)]:_0x2626d7=_spPageContextInfo[_0x49c463(0x147)],_0x14b65a=_0x49c463(0xdb)+_0x2626d7+_0x49c463(0x11e)+_0x28ad56[0x0]['Id']+'\x27\x20',_0x1a7d31=$['Deferred'](),_0x1b59b2=_spPageContextInfo[_0x49c463(0x120)]+_0x49c463(0xd3)+_0x14b65a,$[_0x49c463(0x142)](getItems(_0x1b59b2,_0x1a7d31))[_0x49c463(0x16b)](function(_0x4a2437){var _0x113430=_0x49c463;response=[];if(_0x4a2437['length']>0x0){if(_0x4a2437[0x0]['TaskPermission']==!![])for(var _0x47b7e0=0x0;_0x47b7e0<_0x23be96[_0x113430(0x140)];_0x47b7e0++){_0x362295=IsProjectTeamMembers(_0x28ad56[0x0]['Id'],_0x23be96[_0x47b7e0]['trim'](),_0x298045,_0x4db841);if(_0x362295==![]||_0x362295==null){_0x298045[0x1][_0x113430(0x165)]=_0x113430(0xee),_0x298045[0xc]['innerText']=_0x23be96[_0x47b7e0]['trim']()+'\x20is\x20not\x20a\x20valid\x20team\x20member.',$(_0x113430(0x16a))['text'](parseInt($('#txtFailedTasks')[_0x113430(0xda)]())+0x1),_0x4db841['style'][_0x113430(0x100)]='#ff0000';break;}else _0x406f75[_0x113430(0xf4)](_0x362295);}else _0x298045[0x1][_0x113430(0x165)]=_0x113430(0xee),_0x298045[0xc][_0x113430(0x165)]='You\x20do\x20not\x20have\x20the\x20permission\x20to\x20create\x20Task.',$('#txtFailedTasks')[_0x113430(0xda)](parseInt($('#txtFailedTasks')[_0x113430(0xda)]())+0x1),_0x4db841['style']['color']=_0x113430(0x12a);}}),_0x362295!=![]&&_0x362295!=null&&_0x362295!=''&&GetModule(_0x28ad56[0x0]['Id'],_0x298045[0x5][_0x49c463(0x165)],_0x298045,_0x406f75,_0x28ad56[0x0][_0x49c463(0xd4)],_0x52587b,_0x4db841);}else _0x298045[0x1][_0x49c463(0x165)]=_0x49c463(0xee),_0x298045[0xc]['innerText']=_0x58de41+_0x49c463(0xf5),$(_0x49c463(0x16a))[_0x49c463(0xda)](parseInt($(_0x49c463(0x16a))[_0x49c463(0xda)]())+0x1),_0x4db841['style'][_0x49c463(0x100)]=_0x49c463(0x12a);})[_0x2a2f58(0x18a)](function(_0x3d5a84){var _0x187c34=_0x2a2f58;_0x3d5a84['responseJSON'][_0x187c34(0x110)][_0x187c34(0x10b)][_0x187c34(0x104)][_0x187c34(0x17e)](_0x187c34(0x112))!=-0x1&&(_0x298045[0x1][_0x187c34(0x165)]=_0x187c34(0xee),_0x298045[0xc]['innerText']=_0x187c34(0x112),$(_0x187c34(0x16a))[_0x187c34(0xda)](parseInt($(_0x187c34(0x16a))[_0x187c34(0xda)]())+0x1),_0x4db841[_0x187c34(0x13f)][_0x187c34(0x100)]='#ff0000');});}function IsProjectTeamMembers(_0x46ab94,_0x4a0c23,_0x614f7f,_0x4ff38c){var _0x379a8c=_0x55f0,_0x316e44=![],_0x19e8ce=_0x379a8c(0xdb)+_0x4a0c23+_0x379a8c(0x11e)+_0x46ab94+'\x27\x20',_0x300b61=$[_0x379a8c(0xfe)]();return url=_spPageContextInfo['webAbsoluteUrl']+_0x379a8c(0xd3)+_0x19e8ce,$[_0x379a8c(0x142)](getItems(url,_0x300b61))[_0x379a8c(0x16b)](function(_0x12871a){var _0x302d63=_0x379a8c;response=[];if(_0x12871a[_0x302d63(0x140)]>0x0)_0x316e44=_0x12871a[0x0][_0x302d63(0x151)]['Id'];else{}})[_0x379a8c(0x18a)](function(_0x3cdeb6){var _0xed8077=_0x379a8c;_0x3cdeb6[_0xed8077(0x11c)][_0xed8077(0x110)]['message'][_0xed8077(0x104)][_0xed8077(0x17e)]('The\x20attempted\x20operation\x20is\x20prohibited\x20because\x20it\x20exceeds\x20the\x20list\x20view\x20threshold.')!=-0x1&&(_0x614f7f[0x1][_0xed8077(0x165)]=_0xed8077(0xee),_0x614f7f[0xc][_0xed8077(0x165)]='The\x20attempted\x20operation\x20is\x20prohibited\x20because\x20it\x20exceeds\x20the\x20list\x20view\x20threshold.',$(_0xed8077(0x16a))[_0xed8077(0xda)](parseInt($(_0xed8077(0x16a))[_0xed8077(0xda)]())+0x1),_0x4ff38c[_0xed8077(0x13f)]['color']=_0xed8077(0x12a));}),_0x316e44;}function GetModule(_0x41aa44,_0x115226,_0x1b3315,_0xd16dc2,_0xa3ae5f,_0x1c2f08,_0x416ada){var _0x26d80c=_0x55f0,_0x36d158=_0x26d80c(0x10d)+_0x41aa44+_0x26d80c(0x168)+_0x115226+'\x27\x20';$[_0x26d80c(0x142)](getItemsWithQueryItem(_0x26d80c(0x118),_0x36d158))[_0x26d80c(0x16b)](function(_0x480b64){var _0x11a914=_0x26d80c;_0x480b64[_0x11a914(0x140)]>0x0?AddProjectTask(_0x41aa44,_0x1b3315,_0xa3ae5f,_0xd16dc2,_0x480b64[0x0]['Id'],_0x1c2f08,_0x416ada):AddProjectTask(_0x41aa44,_0x1b3315,_0xa3ae5f,_0xd16dc2,'',_0x1c2f08,_0x416ada);});}function _0x55f0(_0x191f7c,_0x317f28){var _0x230910=_0x2309();return _0x55f0=function(_0x55f091,_0x942ee9){_0x55f091=_0x55f091-0xd2;var _0x509c1c=_0x230910[_0x55f091];return _0x509c1c;},_0x55f0(_0x191f7c,_0x317f28);}function AddProjectTask(_0x4955ab,_0x4abd6e,_0x299f1b,_0x23f468,_0x3b7ca5,_0x1b1783,_0xaab94){var _0x38c784=_0x55f0,_0x1ed712,_0x2d8fb6='1',_0x52d1fb='Medium',_0x5dc899='';_0x4abd6e[0x8][_0x38c784(0x165)]!=''&&_0x4abd6e[0x8][_0x38c784(0x165)]!=null?_0x5dc899=GetUserId(_0x4abd6e[0x8][_0x38c784(0x165)]):_0x5dc899=_spPageContextInfo[_0x38c784(0xf3)];var _0x5a6cb3=GetDateStandardFormat(moment(_0x4abd6e[0xa]['innerText'])[_0x38c784(0x17d)](_0x38c784(0xf9)));_0x4abd6e[0xb][_0x38c784(0x165)]!=''&&_0x4abd6e[0xb][_0x38c784(0x165)]!=null&&(_0x52d1fb=_0x4abd6e[0xb][_0x38c784(0x165)]);var _0xa48e4b=0x0;_0x3b7ca5==''&&(_0x3b7ca5=0x0);var _0x43531c=GetItemTypeForListName(_0x38c784(0xe4));_0x1ed712={'__metadata':{'type':_0x43531c},'Title':$[_0x38c784(0xf8)](_0x4abd6e[0x2]['innerText']),'TaskType':_0x2d8fb6,'ProjectName':_0x4955ab[_0x38c784(0xe5)](),'ProjectFullName':_0x299f1b,'ProjectIDId':_0x4955ab,'TaskAssignToId':{'results':_0x23f468},'AssignedById':_0x5dc899,'Description':'','StartDate':new Date()[_0x38c784(0x137)](),'DueDate':_0x5a6cb3,'TaskPriority':_0x52d1fb,'CurrentPhase':_0x38c784(0x162),'CompletionPersent':'0','CompanyId':Logged_CompanyId,'Distribution':_0x38c784(0x157),'ClientIDId':_0xa48e4b,'ModuleId':_0x3b7ca5,'Worktype':$['trim'](_0x4abd6e[0x7][_0x38c784(0x165)]),'ReferenceLink':{'__metadata':{'type':_0x38c784(0x189)},'Description':'','Url':''}},AddItemToList(_0x1ed712,_0x1b1783,_0x4abd6e,_0xaab94);}function AddItemToList(_0x4675b2,_0x4f7d39,_0x453738,_0x658a42){var _0x2537eb=_0x55f0,_0x5c3bb6=$[_0x2537eb(0xfe)]();return $[_0x2537eb(0xed)]({'url':_spPageContextInfo[_0x2537eb(0x120)]+_0x2537eb(0x161),'type':_0x2537eb(0x123),'async':![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$(_0x2537eb(0x16e))[_0x2537eb(0x177)](),'content-Type':_0x2537eb(0x154)},'data':JSON[_0x2537eb(0x11b)](_0x4675b2),'success':function(_0x1b2acb){var _0x5a84e8=_0x2537eb;_0x453738[0x1][_0x5a84e8(0x165)]=_0x5a84e8(0xd9),_0x453738[0x0][_0x5a84e8(0x103)][0x0][_0x5a84e8(0x103)][0x0][_0x5a84e8(0x163)](),$(_0x5a84e8(0x135))[_0x5a84e8(0xda)](parseInt($(_0x5a84e8(0x135))[_0x5a84e8(0xda)]())+0x1),_0x658a42[_0x5a84e8(0x13f)][_0x5a84e8(0x100)]=_0x5a84e8(0xef),$(_0x658a42)['removeClass'](_0x5a84e8(0x174)),_0x5c3bb6[_0x5a84e8(0x178)](_0x1b2acb);},'error':function(_0x335cf6){var _0x47e30e=_0x2537eb;_0x453738[0x1][_0x47e30e(0x165)]=_0x47e30e(0xee),_0x453738[0xc][_0x47e30e(0x165)]=JSON[_0x47e30e(0x11b)](_0x335cf6)+_0x47e30e(0x133),$('#txtFailedTasks')['text'](parseInt($(_0x47e30e(0x16a))[_0x47e30e(0xda)]())+0x1),_0x658a42[_0x47e30e(0x13f)][_0x47e30e(0x100)]=_0x47e30e(0x12a),console[_0x47e30e(0x179)](JSON[_0x47e30e(0x11b)](_0x335cf6)),_0x5c3bb6[_0x47e30e(0x15f)](_0x335cf6);}}),_0x5c3bb6[_0x2537eb(0x117)]();}function GetUserId(_0x5e29b4){var _0x1f53f7=_0x55f0,_0x40d9b2='',_0x567739=_0x1f53f7(0x12b),_0x14b28f=_spPageContextInfo[_0x1f53f7(0xdd)],_0x107a9d=_0x567739+_0x5e29b4;return $[_0x1f53f7(0xed)]({'url':_0x14b28f+_0x1f53f7(0x113)+encodeURIComponent(_0x107a9d)+'\x27','method':_0x1f53f7(0x122),'headers':{'Accept':_0x1f53f7(0x114)},'async':![],'success':function(_0x2f85bf){_0x40d9b2=_0x2f85bf['d']['Id'];},'error':function(_0x498220){var _0x1ef5c9=_0x1f53f7;console[_0x1ef5c9(0x179)](JSON[_0x1ef5c9(0x11b)](_0x498220));}}),_0x40d9b2;}function getCustomerID(_0x2289c3,_0x4a9635,_0xdd827,_0x3bb610,_0x2ab0b9){var _0x317405=_0x55f0,_0x727b2d=0x0,_0x284aa7=[],_0x3ec474=_0x317405(0x10c);if(_0x2289c3!=null&&_0x2289c3!=null&&_0x2289c3!=''){RestQuery='?$select=SelfCompany,Title,ID,Client_Code&$filter=IsActive\x20eq\x201\x20and\x20(Title\x20eq\x20\x27'+_0x2289c3+_0x317405(0x116)+_0x2289c3+_0x317405(0xfb);var _0x1b96af=$[_0x317405(0xfe)](),_0x596ae7=_spPageContextInfo[_0x317405(0x120)]+_0x317405(0x136)+RestQuery;$[_0x317405(0x142)](getItems(_0x596ae7,_0x1b96af))[_0x317405(0x16b)](function(_0x3c1a7f){var _0x28b3f4=_0x317405;response=[];if(_0x3c1a7f[_0x28b3f4(0x140)]>0x0){ClientID=_0x3c1a7f[0x0]['ID'];for(var _0x3c35b1=0x0;_0x3c35b1<_0x4a9635[_0x28b3f4(0x140)];_0x3c35b1++){_0x727b2d=checkUserValid(_0x4a9635[_0x3c35b1][_0x28b3f4(0xf8)]());if(_0x727b2d==''||_0x727b2d==null){_0xdd827[0x1]['innerText']=_0x28b3f4(0xee),_0xdd827[0xc][_0x28b3f4(0x165)]=_0x4a9635[_0x3c35b1][_0x28b3f4(0xf8)]()+'\x20is\x20not\x20a\x20valid\x20user.',$(_0x28b3f4(0x16a))['text'](parseInt($(_0x28b3f4(0x16a))['text']())+0x1),_0x2ab0b9['style'][_0x28b3f4(0x100)]='#ff0000',_0x284aa7=[];break;}else _0x284aa7[_0x28b3f4(0xf4)](_0x727b2d);}AddGeneralTask(ClientID,_0xdd827,_0x284aa7,_0x3bb610,_0x2ab0b9);}else _0xdd827[0x1][_0x28b3f4(0x165)]=_0x28b3f4(0xee),_0xdd827[0xc][_0x28b3f4(0x165)]=_0x2289c3+'\x20is\x20not\x20a\x20valid\x20ClientName/ClientCode.',$(_0x28b3f4(0x16a))[_0x28b3f4(0xda)](parseInt($(_0x28b3f4(0x16a))[_0x28b3f4(0xda)]())+0x1),_0x2ab0b9[_0x28b3f4(0x13f)][_0x28b3f4(0x100)]=_0x28b3f4(0x12a);});}else{RestQuery=_0x317405(0xd5);var _0x1b96af=$[_0x317405(0xfe)](),_0x596ae7=_spPageContextInfo[_0x317405(0x120)]+_0x317405(0x136)+RestQuery;$[_0x317405(0x142)](getItems(_0x596ae7,_0x1b96af))[_0x317405(0x16b)](function(_0x7e7273){var _0x310673=_0x317405;response=[];if(_0x7e7273[_0x310673(0x140)]>0x0){ClientID=_0x7e7273[0x0]['ID'];for(var _0xbf77f5=0x0;_0xbf77f5<_0x4a9635['length'];_0xbf77f5++){_0x727b2d=checkUserValid(_0x4a9635[_0xbf77f5][_0x310673(0xf8)]());if(_0x727b2d==''||_0x727b2d==null){_0x284aa7=[],_0xdd827[0x1]['innerText']=_0x310673(0xee),_0xdd827[0xc][_0x310673(0x165)]=_0x4a9635[_0xbf77f5][_0x310673(0xf8)]()+'\x20is\x20not\x20a\x20valid\x20user.',$(_0x310673(0x16a))[_0x310673(0xda)](parseInt($('#txtFailedTasks')['text']())+0x1),_0x2ab0b9[_0x310673(0x13f)][_0x310673(0x100)]='#ff0000';break;}else _0x284aa7[_0x310673(0xf4)](_0x727b2d);}AddGeneralTask(ClientID,_0xdd827,_0x284aa7,_0x3bb610,_0x2ab0b9);}else _0xdd827[0x1][_0x310673(0x165)]=_0x310673(0xee),_0xdd827[0xc][_0x310673(0x165)]=_0x310673(0x11d),$(_0x310673(0x16a))[_0x310673(0xda)](parseInt($(_0x310673(0x16a))['text']())+0x1),_0x2ab0b9[_0x310673(0x13f)][_0x310673(0x100)]='#ff0000';});}}function AddGeneralTask(_0xd22134,_0x38688a,_0x270e3e,_0x11f2d2,_0x115837){var _0x27dc00=_0x55f0,_0x44351a,_0x23d037='2',_0x59d343='Medium';_0x38688a[0xa][_0x27dc00(0x165)]=moment(new Date(_0x38688a[0xa][_0x27dc00(0x165)]))['format'](_0x27dc00(0x121));var _0x5a426c=GetDateStandardFormat(_0x38688a[0xa][_0x27dc00(0x165)]),_0x1a2e8b='';_0x38688a[0x8][_0x27dc00(0x165)]!=''&&_0x38688a[0x8]['innerText']!=null?_0x1a2e8b=GetUserId(_0x38688a[0x8][_0x27dc00(0x165)]):_0x1a2e8b=_spPageContextInfo[_0x27dc00(0xf3)];_0x38688a[0xb]['innerText']!=''&&_0x38688a[0xb]['innerText']!=null&&(_0x59d343=_0x38688a[0xb]['innerText']);var _0x2b4189=GetItemTypeForListName('EmployeeTaskDetails');_0x44351a={'__metadata':{'type':_0x2b4189},'Title':$[_0x27dc00(0xf8)](_0x38688a[0x2]['innerText']),'TaskType':_0x23d037,'ProjectName':'','ProjectFullName':'','ProjectIDId':0x0,'TaskAssignToId':{'results':_0x270e3e},'AssignedById':_0x1a2e8b,'Description':'','StartDate':new Date()[_0x27dc00(0x137)](),'DueDate':_0x5a426c,'TaskPriority':_0x59d343,'CurrentPhase':'Open','CompletionPersent':'0','CompanyId':Logged_CompanyId,'Distribution':'Consolidated','ClientIDId':_0xd22134,'ModuleId':0x0,'Worktype':$[_0x27dc00(0xf8)](_0x38688a[0x7][_0x27dc00(0x165)]),'ReferenceLink':{'__metadata':{'type':'SP.FieldUrlValue'},'Description':'','Url':''}},(_0x1a2e8b==''||_0x1a2e8b==_0x27dc00(0x172)||_0x1a2e8b==null||_0x1a2e8b==_0x27dc00(0x14b))&&delete _0x44351a['AssignedById'],(_0x59d343==''||_0x59d343==_0x27dc00(0x172)||_0x59d343==null||_0x59d343==_0x27dc00(0x14b))&&(_0x44351a[_0x27dc00(0x132)]='Low'),AddItemToList(_0x44351a,_0x11f2d2,_0x38688a,_0x115837);}function checkUserValid(_0x460fb0){var _0x59a845=_0x55f0,_0x2ae99d='';return RestQuery=_0x59a845(0xf6)+_0x460fb0+'\x27&$top=5000',(dfds=$[_0x59a845(0xfe)](),url=_spPageContextInfo[_0x59a845(0x120)]+_0x59a845(0x128)+RestQuery),$['when'](getItems(url,dfds))[_0x59a845(0x16b)](function(_0x2a180d){var _0x28e754=_0x59a845;response=[];if(_0x2a180d[_0x28e754(0x140)]>0x0)_0x2ae99d=_0x2a180d[0x0]['LogonName']['Id'];else{var _0x551904=_0x28e754(0x180)+_0x460fb0+_0x28e754(0xfc);dfds=$[_0x28e754(0xfe)](),url=_spPageContextInfo['webAbsoluteUrl']+_0x28e754(0x129)+_0x551904,$[_0x28e754(0x142)](getItems(url,dfds))[_0x28e754(0x16b)](function(_0x540d85){var _0x9b5814=_0x28e754;response=[],_0x540d85[_0x9b5814(0x140)]>0x0&&(_0x2ae99d=_0x540d85[0x0][_0x9b5814(0xd2)]['Id']);});}}),_0x2ae99d;}function validateEmail(_0x3aae0e){var _0x11b3ee=_0x55f0;result=![];if(_0x3aae0e!=''){const _0x52e2ad=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;result=_0x52e2ad[_0x11b3ee(0x18b)](String(_0x3aae0e)['toLowerCase']());}else result=!![];return result;}function _0x2309(){var _0x19d4cf=['showWaitScreenWithNoClose','#btnSubmitTasks','endrecord','userId','push','\x20is\x20not\x20a\x20project\x20name/project\x20code.','?$select=Status,LogonName/Id,LogonName/EMail&$expand=LogonName&$filter=\x20Status\x20eq\x20\x27Active\x27\x20and\x20LogonName/EMail\x20eq\x20\x27','includes','trim','DD/MM/YYYY','sorter','\x27)&$top=5000','\x27&$top=5000','toUpperCase','Deferred','.xlsx','color','#txtSelectedRows','SP.Data.','children','value','Process\x20has\x20been\x20completed.','6156785CDsBff','removeClass','48sqtqqc','dd/MM/yyyy','slice','message','ClientMaster','?$select=*&$Filter=ProjectId\x20eq\x20\x27','6677028kTbFOm','evenselected','error','Assigned\x20By','The\x20attempted\x20operation\x20is\x20prohibited\x20because\x20it\x20exceeds\x20the\x20list\x20view\x20threshold.','/_api/web/siteusers(@v)?@v=\x27','application/json;\x20odata=verbose','818195qOcKqy','\x27\x20or\x20Client_Code\x20eq\x20\x27','promise','ProjectModules','totalrecords','oddselected','stringify','responseJSON','There\x20is\x20not\x20self\x20company\x20assigned.','\x27\x20and\x20ProjectId\x20eq\x20\x27','Kindly\x20fill\x20all\x20the\x20mandatory\x20fields.','webAbsoluteUrl','MM/DD/YYYY','GET','POST','startrecord','project\x20task','Assigned\x20By\x20email\x20Id\x20is\x20not\x20in\x20correct\x20format.','files','/_api/web/lists/getbytitle(\x27Employees\x27)/items/','/_api/web/lists/getbytitle(\x27ExternalUsers\x27)/items/','#ff0000','i:0#.f|membership|','find','.tbdyImportTasks','source','trigger','</td>','8242FOzYeX','TaskPriority','\x20Error\x20while\x20adding.','empty','#txtAddedCount','/_api/web/lists/getbytitle(\x27ClientMaster\x27)/items/','toISOString','<td>','<button\x20type=\x22button\x22\x20class=\x22btn\x20custom-btn\x20mr-8\x20w-87\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#template-modal\x22>Template</button><button\x20type=\x22button\x22\x20class=\x22btn\x20custom-btn\x20mr-8\x20w-87\x22\x20id=\x22btnSubmitTasks\x22>Submit</button><button\x20type=\x22button\x22\x20class=\x22btn\x20custom-btn-two-danger\x20w-87\x22\x20id=\x22btnCloseTasks\x22>Close</button>','closest','change','#parentSubmit','join','td\x20.ExcelRow:checkbox:checked','style','length','href','when','sheet_to_row_object_array','readAsArrayBuffer','9351608ibGmIN','3916386zbtzNQ','userEmail','ListItem','currentpage','each','undefined','5394556BCxqCo','getQueryStringParameter','td\x20input:checkbox','evenrow','?$select=Id,ProjectCode,Title&$orderby=Modified\x20desc&$expand=&$filter=ProjectCode\x20eq\x20\x27','TeamMember','Task','SheetNames','application/json;odata=verbose','Assigned\x20To\x20email\x20Id\x20is\x20not\x20in\x20correct\x20format.','binary','Consolidated','139CzOxuz','charAt','addClass','yyyy','close','\x27)/items/','#btnViewAll','reject','Module','/_api/web/lists/getbytitle(\x27EmployeeTaskDetails\x27)/items','Open','remove','../Pages/MyDashboard.aspx?Location=','innerText','read','#btnExpandAll','\x27\x20and\x20Status\x20eq\x20\x27Active\x27\x20and\x20Title\x20eq\x20\x27','hide','#txtFailedTasks','done','split','Priority','#__REQUESTDIGEST','loadMultiple','Adding...','prop','null','Sheets','selected','getTime','\x27\x20or\x20ProjectName\x20eq\x20\x27','val','resolve','log','checked','utils','#btnCloseTasks','format','indexOf','Due\x20Date','?$select=LoginName/EMail,LoginName/Id&$expand=LoginName&$filter=LoginName/EMail\x20eq\x20\x27','#selectAllChk','Please\x20upload\x20a\x20valid\x20excel\x20file!','table','onload','Work\x20Type','sheet_to_json','<tr><td><div\x20class=\x22checkbox\x20task-import-thead-checkbox\x20m-0\x22><input\x20type=\x22checkbox\x22\x20class=\x22ExcelRow\x22></div></td>','result','SP.FieldUrlValue','fail','test','<td></td></tr>','LoginName','/_api/web/lists/getbytitle(\x27ProjectTeamDetails\x27)/items/','Title','?$select=SelfCompany,Title,ID,Client_Code&$filter=SelfCompany\x20eq\x201&$top=5000','toLowerCase','Type','ModalDialog','Done','text','?$select=*,TeamMember/EMail,TeamMember/Id&$expand=TeamMember&$top=100&$filter=\x20Status\x20eq\x20\x27Active\x27\x20and\x20TeamMember/EMail\x20eq\x20\x27','target','siteAbsoluteUrl','.ExcelRow','desc','results','SOD','Assigned\x20To','readAsBinaryString','EmployeeTaskDetails','toString','__next','oddrow','#ExcelUpload','click','Project','Customer','\x27\x20or\x20Title\x20eq\x20\x27','ajax','Failed','#039203'];_0x2309=function(){return _0x19d4cf;};return _0x2309();}var response=response||[];function getItems(_0xec85ce,_0x567605){var _0x19511c=_0x55f0;return $['ajax']({'url':_0xec85ce,'type':_0x19511c(0x122),'async':![],'headers':{'accept':_0x19511c(0x154)},'success':function(_0x124c69){var _0x168cc9=_0x19511c;response=response['concat'](_0x124c69['d'][_0x168cc9(0xe0)]),_0x124c69['d']['__next']?(_0xec85ce=_0x124c69['d'][_0x168cc9(0xe6)],getItems(_0xec85ce,_0x567605)):_0x567605['resolve'](response);},'error':function(_0x3f03c8){var _0x238a2b=_0x19511c;_0x567605['reject'](_0x3f03c8),console[_0x238a2b(0x179)](_0x3f03c8);}}),_0x567605[_0x19511c(0x117)]();}function GetDateStandardFormat(_0xf1cfe6){var _0x302798=_0x55f0,_0x2682db=ConvertDateFormatToddMMyyyy(_0xf1cfe6),_0x76f922=new Date(_0x2682db),_0x1db69f=0x3c*0x3c*0x18*0x3e8,_0x19f35a=new Date(_0x76f922[_0x302798(0x175)]()),_0x14d808=_0x19f35a['toISOString']();return _0x14d808;}function ConvertDateFormatToddMMyyyy(_0x4c8925){var _0x5f19e5=_0x55f0,_0x4d22e6=stringToDate(_0x4c8925,_0x5f19e5(0x109),'/');return _0x4d22e6;}function stringToDate(_0x33a862,_0x624514,_0x550a0b){var _0x3baa24=_0x55f0,_0x4e8ed2=_0x624514[_0x3baa24(0xd6)](),_0x3d194b=_0x4e8ed2['split'](_0x550a0b),_0x468053=_0x33a862[_0x3baa24(0x16c)](_0x550a0b),_0x6d7be5=_0x3d194b['indexOf']('mm'),_0x1968a6=_0x3d194b[_0x3baa24(0x17e)]('dd'),_0x29d629=_0x3d194b[_0x3baa24(0x17e)](_0x3baa24(0x15b)),_0x3ab5f1=parseInt(_0x468053[_0x6d7be5]);_0x3ab5f1-=0x1;var _0x526223=new Date(_0x468053[_0x29d629],_0x3ab5f1,_0x468053[_0x1968a6]);return _0x526223;}function GetItemTypeForListName(_0x58b6fd){var _0xa787d3=_0x55f0;return _0xa787d3(0x102)+_0x58b6fd[_0xa787d3(0x159)](0x0)[_0xa787d3(0xfd)]()+_0x58b6fd[_0xa787d3(0x16c)]('\x20')[_0xa787d3(0x13d)]('')[_0xa787d3(0x10a)](0x1)+_0xa787d3(0x148);}function getItemsWithQueryItem(_0x46fcdb,_0x50113f){var _0x5b35c8=_0x55f0;return DeferredObj=$['Deferred'](),$[_0x5b35c8(0xed)]({'url':_spPageContextInfo['webAbsoluteUrl']+'/_api/web/lists/getbytitle(\x27'+_0x46fcdb+_0x5b35c8(0x15d)+_0x50113f,'type':_0x5b35c8(0x122),'async':![],'headers':{'ACCEPT':_0x5b35c8(0x154),'X-RequestDigest':$('#__REQUESTDIGEST')[_0x5b35c8(0x177)]()},'success':function(_0x380974){var _0x5ef75b=_0x5b35c8;DeferredObj[_0x5ef75b(0x178)](_0x380974['d']['results']);},'error':function(_0x231fd2){var _0x5b1d49=_0x5b35c8;DeferredObj[_0x5b1d49(0x15f)](_0x231fd2);}}),DeferredObj['promise']();}