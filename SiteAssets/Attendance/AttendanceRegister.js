(function(_0x5779ea,_0x3465bd){var _0x4eddc9=_0x4b86,_0x5ec939=_0x5779ea();while(!![]){try{var _0x4e6ddc=parseInt(_0x4eddc9(0xad))/0x1+-parseInt(_0x4eddc9(0xfa))/0x2+-parseInt(_0x4eddc9(0xfe))/0x3+-parseInt(_0x4eddc9(0xb2))/0x4+parseInt(_0x4eddc9(0x131))/0x5*(parseInt(_0x4eddc9(0xc7))/0x6)+parseInt(_0x4eddc9(0xb7))/0x7+-parseInt(_0x4eddc9(0xee))/0x8*(-parseInt(_0x4eddc9(0x90))/0x9);if(_0x4e6ddc===_0x3465bd)break;else _0x5ec939['push'](_0x5ec939['shift']());}catch(_0x32c92f){_0x5ec939['push'](_0x5ec939['shift']());}}}(_0x94dc,0x90b88));var EmpAttendanceData=[],txtCompanyId='',selectedAttendListItem=new Array();$(document)['ready'](function(){var _0x4f19ef=_0x4b86;txtCompanyId=titanForWork[_0x4f19ef(0x10b)](_0x4f19ef(0xf9)),$(_0x4f19ef(0x122))[_0x4f19ef(0xb6)]({'dateFormat':_0x4f19ef(0x13b),'maxDate':new Date()})['datepicker'](_0x4f19ef(0xa3),new Date()),$('#attendencedateValue')['text']($(_0x4f19ef(0x7e))[_0x4f19ef(0xb3)]()),EmpAttendanceTodayData(),initializePeoplePicker(_0x4f19ef(0xbc)),bindAllDepartment(),bindAllOfficeLocation(),$(_0x4f19ef(0x13e))[_0x4f19ef(0xdb)](function(){MutipleBaseFilter();}),$(_0x4f19ef(0x9c))[_0x4f19ef(0xdb)](function(){ClearFilterForAttendence();}),$(_0x4f19ef(0x145))['click'](function(){ClearFilterForAttendence();}),$(_0x4f19ef(0x11b))[_0x4f19ef(0xdb)](function(){var _0x32453d=_0x4f19ef;selectedAttendListItem[_0x32453d(0x105)]>0x0?($('#totalAttendItem')[_0x32453d(0x12e)](''),$('#totalAttendItem')[_0x32453d(0x12e)](selectedAttendListItem[_0x32453d(0x105)]),$(_0x32453d(0xcf))[_0x32453d(0x127)](_0x32453d(0x9b))):alert('Please\x20select\x20Employees\x20to\x20update\x20Attendance');}),$('#applyMutipleSelectedUpdate')['click'](function(){var _0x2383a2=_0x4f19ef;$(_0x2383a2(0x133))[_0x2383a2(0x9b)](),setTimeout(function(){UpdateMultipleSelectedItem();},0x3e8);}),$(_0x4f19ef(0x7c))['click'](function(){var _0x1660af=_0x4f19ef;$(_0x1660af(0xa4))[_0x1660af(0xe6)]('checked',$(this)[_0x1660af(0xe6)](_0x1660af(0xd6))),selectedAttendListItem=[],$(_0x1660af(0xa4))[_0x1660af(0xb0)](function(){var _0x26deee=_0x1660af;if($(this)[_0x26deee(0xe6)](_0x26deee(0xd6))==!![]){var _0x36f3b2=$(this)['val'](),_0x4ad10f=$(this)[_0x26deee(0x113)]('tr'),_0x551451=_0x4ad10f['find'](_0x26deee(0xdd))['text'](),_0x5c3d8f=_0x4ad10f[_0x26deee(0xdf)](_0x26deee(0x101))[_0x26deee(0x12e)]();selectedAttendListItem[_0x26deee(0xc6)]({'AttenListitemId':_0x36f3b2,'EmpName':_0x551451,'Empid':_0x5c3d8f});}});});});function EmpAttendanceTodayData(){var _0x49e452=_0x4b86;$(_0x49e452(0xcd))[_0x49e452(0xb3)]('');var _0x2a7020=$(_0x49e452(0x122))[_0x49e452(0xb3)](),_0xcf8c08=moment($(_0x49e452(0x122))[_0x49e452(0xb3)](),_0x49e452(0xd9))[_0x49e452(0xfb)]('YYYY-MM-DD');GetHolidays(_0xcf8c08);debugger;$(_0x49e452(0xcd))['val'](_0x2a7020),$(_0x49e452(0xcc))[_0x49e452(0x12e)]($[_0x49e452(0xb6)]['formatDate']('DD',new Date(_0xcf8c08))),$('#monthhyear')['text']($[_0x49e452(0xb6)][_0x49e452(0x13c)](_0x49e452(0x78),new Date(_0xcf8c08)));var _0x126924=_spPageContextInfo['webAbsoluteUrl']+_0x49e452(0x100)+_0xcf8c08+'\x27\x20';$[_0x49e452(0x107)](getFileData(_0x126924))[_0x49e452(0xce)](function(_0x2f7f40){var _0x86c62e=_0x49e452,_0x14dfe0=_spPageContextInfo['webAbsoluteUrl']+_0x86c62e(0x13a)+txtCompanyId+'\x27';EmployeeListDat(_0x14dfe0);});}function _0x94dc(){var _0x5426ee=['SPClientPeoplePickerDict','<td><input\x20type=\x27checkbox\x27\x20class=\x27Attenid\x27\x20\x20value=\x27','</span></td>','LogonName','#currentAttencedenceId','#updateMutipleCheckBox','#empPresent','</option>','getElementById','/_api/web/lists/GetByTitle(\x27EmpAttendance\x27)/items','#HolidayCity','<td><div\x20class=\x27attendance-table-ellipsis-2\x20Attendancetype\x27>-</div></td>','#attendanceDate','stringify','#currentEmpName','HasInputError','SearchPrincipalSource','modal','\x20(H:M)</a>\x20</td>','Please\x20select\x20Attendance\x20type','_TopSpan','Attendance\x20Submitted','table','input[name=\x27HRACTIONCHK\x27][value=\x27','text','indexOf','Key','5OiDEtF','siteAbsoluteUrl','#showLoderForMutiple','</a>\x20</td>','<td><div\x20class=\x27attendance-table-ellipsis-2\x20Attendancetype\x27\x20style=\x27color:','desc','Please\x20Select\x20Attendance\x20type','.marquee-div','charAt','/_api/web/lists/GetByTitle(\x27Employees\x27)/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=Status\x20eq\x20\x27Active\x27\x20and\x20Company/ID\x20\x20eq\x20\x27','dd/mm/yy','formatDate','true','#mutipleFilter','AllowMultipleValues','Please\x20select\x20Employees\x20to\x20update\x20Attendance','EmpAttendance','DeleteProcessedUser','slice','/_api/web/lists/getbytitle(\x27EmpAttendance\x27)/items?$filter=ID\x20eq\x20(\x27','#closeCross','ResolvedListElementId','Holiday','promise','evenrow','\x27&$top=200&$orderby=Holiday_start\x20asc','dd\x20M\x20yy','/_api/web/lists/GetByTitle(\x27Employees\x27)/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/ID,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=Status\x20eq\x20\x27Active\x27\x20and\x20Company/ID\x20\x20eq\x20\x27','</li>','DepartmentName','#selectAll','none','#timesheetFrom','.Attendancetype','</tr>','ajax','totalpages','Attendance','ListItem','AttendanceType','Width','EmpWorkHours','#currentEmpAttendanceType','#tattendanceRegtable','Employee','empty','pagedropdown','SPClientPeoplePicker','color','and\x20(AttendanceType\x20eq\x20\x271st\x20Half\x27\x20or\x20AttendanceType\x20eq\x20\x272nd\x20Half\x27)\x20','164421TsInHl','hide','black','left','sorter','OfficeName','tablenav','or\x20LogonNameId\x20eq\x20\x27','split','</div>','#allDepartment','show','#clearControl','AttendanceDate','endrecord','Half\x20Day','UserId','block','On\x20Leave','setDate','.Attenid','#allDepartment\x20option:selected','css','\x27\x20and\x20CompanyID\x20eq\x20\x27','User,DL,SecGroup,SPGroup','responseJSON','<td><div\x20class=\x27attendance-table-ellipsis-2\x20Department\x27>','.NoRecordFound','#totalemp','12598TxwaAm','#mutipleUpdatedate','<td><a\x20href=\x27#\x27>','each','#allOfficeLocation\x20option:selected','4257008fqLKCj','val','IsEmpty','#notSpecifiedValue','datepicker','4708088dyPgXf','#AttendanceType','selectedrow','#TotalItemscount','An\x20error\x20occurred.\x20Please\x20try\x20again.','EmployeeAttendence','Designation','append','All',')\x27><i\x20class=\x27fa\x20fa-pencil\x27></i>\x20</a></div></td>','></td>','application/json;odata=verbose','reject','#__REQUESTDIGEST','#AttendanceType\x20option:selected','push','1059162dhbbib','#TempTableQuestions\x20>tbody\x20>tr','resolve','#ResultDiv','results','#daydate','#attendencedateValue','done','#updateMutipleAttend','#EmployeeAttendence_TopSpan_ResolvedList','<td><div\x20class=\x27attendance-table-ellipsis-2\x20OfficeLocation\x27>','ResolvePrincipalSource','Action\x20taken\x20successfully.','oddrow','and\x20(LogonNameId\x20eq\x20\x27','checked','log','SP.Data.','DD/MM/YYYY','floor','click','<div\x20class=\x27upload-chip\x27>Half\x20Day</div>','.EmpName','#empId','find','AttendanceItemId','POST','Attendance\x20Updated\x20Successfully','appendTo','webAbsoluteUrl','<td><div\x20class=\x27attendance-table-ellipsis-2\x20Designation\x27>','prop','<div\x20class=\x27upload-chip\x27>','#attendanceEdit','<option\x20value=\x22All\x22>All</option>','evenselected','OfficeLocation','280px','#currentdatefilter','856cnMgXO','\x27\x20onclick=\x27HrActionVerify(this.value)\x27\x20','startrecord','00:00\x20(H:M)','Title','oddselected','.marquee','<td><div\x20class=\x27attendance-edit-lock-btn-box\x20text-center\x27>\x20<a\x20href=\x27#\x27\x20class=\x27custom-edit-btn\x27\x20onclick=\x27attendanceEditModal(this,','#currentEmpDepartment','red','linear','CompanyId','1786312oeMFNd','format','asc','#AttendanceChips','798924alCsZL','currentpage','/_api/lists/getbytitle(\x27EmpAttendance\x27)/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate\x20eq\x20\x27','.EmpID','Not\x20Specified','MaximumEntitySuggestions','HrAction','length','</div></td>','when','/_api/web/lists/GetByTitle(\x27OfficeLocation\x27)/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=OfficeLocationId\x20eq\x20\x270\x27\x20and\x20CompanyID/ID\x20eq\x20\x27','<tr\x20class=\x27text-center\x27>','.Designation','getQueryStringParameter','#mutipleEmpAttendType','GetAllUserInfo','</div><span\x20style=\x27display:none\x27\x20class=\x27EmpID\x27>','<option\x20value=\x22','#monthhyear','\x27></td>','/_api/web/lists/GetByTitle(\x27EmpAttendance\x27)/items(','closest','<td><div\x20class=\x27attendance-table-ellipsis-2\x20EmpName\x27>','#allOfficeLocation'];_0x94dc=function(){return _0x5426ee;};return _0x94dc();}function getFileData(_0x476af1){var _0x221ada=_0x4b86;jQuery[_0x221ada(0x81)]({'url':_0x476af1,'headers':{'Accept':_0x221ada(0xc2)},'async':![],'success':function(_0x418510){var _0x2996e7=_0x221ada;EmpAttendanceData=[];var _0x15fb76=_0x418510['d'][_0x2996e7(0xcb)];if(_0x15fb76[_0x2996e7(0x105)]>0x0)for(var _0x1cfa38=0x0;_0x1cfa38<_0x15fb76[_0x2996e7(0x105)];_0x1cfa38++){var _0x1f686c=_0x15fb76[_0x1cfa38]['ID'],_0x50c575=_0x15fb76[_0x1cfa38]['Employee'][_0x2996e7(0xf2)],_0x2cb376=_0x15fb76[_0x1cfa38][_0x2996e7(0x8a)]['ID'],_0x2a2920=_0x15fb76[_0x1cfa38][_0x2996e7(0x9d)],_0x29696e=_0x15fb76[_0x1cfa38][_0x2996e7(0x85)],_0x1b9d63=_0x15fb76[_0x1cfa38]['WorkHours'],_0x5d1820=_0x15fb76[_0x1cfa38][_0x2996e7(0x104)];EmpAttendanceData['push']({'UserId':_0x2cb376,'EmpName':_0x50c575,'AttendanceDate':_0x2a2920,'AttendanceType':_0x29696e,'AttendanceItemId':_0x1f686c,'EmpWorkHours':_0x1b9d63,'HrAction':_0x5d1820});}},'error':function(_0x12e380,_0x459be4){var _0x5d83af=_0x221ada;console[_0x5d83af(0xd7)](JSON[_0x5d83af(0x123)](_0x12e380));}});}function EmployeeListDat(_0x5dd0c7){var _0x4b8da9=_0x4b86;debugger;$[_0x4b8da9(0x81)]({'url':_0x5dd0c7,'headers':{'Accept':_0x4b8da9(0xc2)},'async':![],'success':function(_0x55f2e0){var _0x5b1b8f=_0x4b8da9;debugger;var _0x1a3ac8=_0x55f2e0['d'][_0x5b1b8f(0xcb)];$(_0x5b1b8f(0x89))[_0x5b1b8f(0x8b)]();var _0x5f4a03='';if(_0x1a3ac8['length']>0x0){var _0x3b7d3c=0x0,_0x2a2c4a=0x0,_0x3a7574=0x0;for(var _0x391f82=0x0;_0x391f82<_0x1a3ac8[_0x5b1b8f(0x105)];_0x391f82++){var _0x10a5dc=_0x1a3ac8[_0x391f82]['ID'],_0x4900dc=_0x1a3ac8[_0x391f82][_0x5b1b8f(0x119)][_0x5b1b8f(0xf2)],_0x191d75=_0x1a3ac8[_0x391f82][_0x5b1b8f(0xbd)],_0x40fadc=_0x1a3ac8[_0x391f82]['Department'][_0x5b1b8f(0x7b)],_0x48b39a='00:00\x20(H:M)',_0x395f1e='',_0x1a0806=_0x5b1b8f(0x92);_0x191d75==null&&(_0x191d75='');var _0x54fce7=_0x1a3ac8[_0x391f82][_0x5b1b8f(0xeb)][_0x5b1b8f(0x95)];_0x54fce7==null&&(_0x54fce7='');EmployeeId=_0x1a3ac8[_0x391f82]['LogonName']['ID'];var _0xe3d4e1=EmpAttendanceData['map'](function(_0x1a8f9d){return _0x1a8f9d['UserId'];})[_0x5b1b8f(0x12f)](EmployeeId);if(_0xe3d4e1!=-0x1){if($(_0x5b1b8f(0xb8))[_0x5b1b8f(0xb3)]()!=_0x5b1b8f(0x102)){var _0x24bfb5=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0xa0)],_0x3d843a=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0x85)],_0x521d51=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0xe0)];_0x48b39a=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0x87)];var _0x2940aa=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0x87)];_0x395f1e=EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0xe0)];var _0x5a8b78='';EmpAttendanceData[_0xe3d4e1][_0x5b1b8f(0x104)]==!![]?_0x5a8b78=_0x5b1b8f(0xd6):_0x5a8b78='',_0x48b39a==null&&(_0x48b39a=_0x5b1b8f(0xf1)),_0x3d843a!=_0x5b1b8f(0xa2)&&_0x3d843a!='Holiday'&&_0x3b7d3c++,_0x3d843a==_0x5b1b8f(0xa2)&&(_0x1a0806=_0x5b1b8f(0xf7),_0x3a7574++),_0x3d843a==_0x5b1b8f(0x147)&&(_0x1a0806='blue'),_0x5f4a03+=_0x5b1b8f(0x109),_0x5f4a03+=_0x5b1b8f(0x117)+_0x395f1e+_0x5b1b8f(0x111),_0x5f4a03+=_0x5b1b8f(0x114)+_0x4900dc+_0x5b1b8f(0x10e)+EmployeeId+_0x5b1b8f(0x118),_0x5f4a03+=_0x5b1b8f(0xe5)+_0x191d75+_0x5b1b8f(0x106),_0x5f4a03+=_0x5b1b8f(0xaa)+_0x40fadc+_0x5b1b8f(0x106),_0x5f4a03+=_0x5b1b8f(0xd1)+_0x54fce7+_0x5b1b8f(0x106),_0x5f4a03+=_0x5b1b8f(0x135)+_0x1a0806+'\x27>'+_0x3d843a+_0x5b1b8f(0x106),_0x2940aa==null?_0x5f4a03+=_0x5b1b8f(0xaf)+_0x48b39a+_0x5b1b8f(0x134):_0x5f4a03+=_0x5b1b8f(0xaf)+ConvertHHMM(_0x48b39a)+_0x5b1b8f(0x128),_0x5f4a03+='<td><input\x20type=\x27checkbox\x27\x20name=\x27HRACTIONCHK\x27\x20value=\x27'+_0x395f1e+_0x5b1b8f(0xef)+_0x5a8b78+_0x5b1b8f(0xc1),_0x5f4a03+=_0x5b1b8f(0xf5)+_0x521d51+_0x5b1b8f(0xc0),_0x5f4a03+=_0x5b1b8f(0x80);}}else($('#AttendanceType')[_0x5b1b8f(0xb3)]()==_0x5b1b8f(0xbf)||$('#AttendanceType')[_0x5b1b8f(0xb3)]()==_0x5b1b8f(0x102))&&(_0x5f4a03+='<tr\x20class=\x27text-center\x27>',_0x5f4a03+=_0x5b1b8f(0x117)+_0x395f1e+_0x5b1b8f(0x111),_0x5f4a03+='<td><div\x20class=\x27attendance-table-ellipsis-2\x20EmpName\x27>'+_0x4900dc+'</div><span\x20style=\x27display:none\x27\x20class=\x27EmpID\x27>'+EmployeeId+'</span></td>',_0x5f4a03+='<td><div\x20class=\x27attendance-table-ellipsis-2\x20Designation\x27>'+_0x191d75+_0x5b1b8f(0x106),_0x5f4a03+=_0x5b1b8f(0xaa)+_0x40fadc+'</div></td>',_0x5f4a03+=_0x5b1b8f(0xd1)+_0x54fce7+_0x5b1b8f(0x106),_0x5f4a03+=_0x5b1b8f(0x121),_0x5f4a03+='<td><a\x20href=\x27#\x27>'+_0x48b39a+_0x5b1b8f(0x134),_0x5f4a03+='<td><input\x20type=\x27checkbox\x27\x20name=\x27HRACTIONCHK\x27\x20value=\x27'+_0x395f1e+'\x27\x20onclick=\x27HrActionVerify(this.value)\x27\x20disabled></td>',_0x5f4a03+='<td><div\x20class=\x27attendance-edit-lock-btn-box\x20text-center\x27>\x20<a\x20href=\x27#\x27\x20class=\x27custom-edit-btn\x27\x20onclick=\x27attendanceEditModal(this)\x27><i\x20class=\x27fa\x20fa-pencil\x27></i>\x20</a></div></td>',_0x5f4a03+=_0x5b1b8f(0x80),_0x2a2c4a++);}}else{}_0x1a3ac8[_0x5b1b8f(0x105)]==0x0?$(_0x5b1b8f(0xab))[_0x5b1b8f(0x9b)]():$(_0x5b1b8f(0xab))['hide']();$('#tattendanceRegtable')['append'](_0x5f4a03),$(_0x5b1b8f(0x11c))[_0x5b1b8f(0x12e)](_0x3b7d3c),$(_0x5b1b8f(0xb5))['text'](_0x2a2c4a),$('#onleaveValue')[_0x5b1b8f(0x12e)](_0x3a7574);var _0x1ff32b=$(_0x5b1b8f(0xc8))[_0x5b1b8f(0x105)];$(_0x5b1b8f(0xba))['text'](_0x1ff32b),$(_0x5b1b8f(0xac))[_0x5b1b8f(0x12e)](_0x1ff32b),_0x1ff32b>0x0&&(TableConfiguration(),selectedAttendenceEvent());},'error':function(_0x3e0624){var _0x34f5c9=_0x4b8da9;console[_0x34f5c9(0xd7)](_0x3e0624);}});}function bindAllDepartment(){var _0x5f155e=_0x4b86;$(_0x5f155e(0x9a))['empty']();var _0x93e89d=_spPageContextInfo[_0x5f155e(0xe4)]+'/_api/web/lists/getbytitle(\x27Departments\x27)/items?select=ID,Title&$filter=CompanyID\x20eq\x20\x27'+txtCompanyId+'\x27';$[_0x5f155e(0x81)]({'url':_0x93e89d,'headers':{'Accept':_0x5f155e(0xc2)},'async':!![],'success':function(_0x4eb570){var _0x242cf1=_0x5f155e;$(_0x242cf1(0xe9))[_0x242cf1(0xe3)](_0x242cf1(0x9a));for(var _0x7fcf13=0x0;_0x7fcf13<_0x4eb570['d'][_0x242cf1(0xcb)]['length'];_0x7fcf13++){$('#allDepartment')[_0x242cf1(0xbe)](_0x242cf1(0x10f)+_0x4eb570['d'][_0x242cf1(0xcb)][_0x7fcf13]['ID']+'\x22>'+_0x4eb570['d']['results'][_0x7fcf13][_0x242cf1(0xf2)]+_0x242cf1(0x11d));}},'myError':function(_0x146508){}});}function bindAllOfficeLocation(){var _0x2c3e79=_0x4b86;$(_0x2c3e79(0x115))[_0x2c3e79(0x8b)]();var _0x1d5e67=_spPageContextInfo['webAbsoluteUrl']+_0x2c3e79(0x108)+txtCompanyId+'\x27';$['ajax']({'url':_0x1d5e67,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x51f209){var _0x16fd91=_0x2c3e79;$(_0x16fd91(0xe9))['appendTo'](_0x16fd91(0x115));for(var _0x3c2dd8=0x0;_0x3c2dd8<_0x51f209['d']['results']['length'];_0x3c2dd8++){$(_0x16fd91(0x115))[_0x16fd91(0xbe)](_0x16fd91(0x10f)+_0x51f209['d'][_0x16fd91(0xcb)][_0x3c2dd8]['ID']+'\x22>'+_0x51f209['d'][_0x16fd91(0xcb)][_0x3c2dd8][_0x16fd91(0x95)]+_0x16fd91(0x11d));}},'myError':function(_0x473b35){}});}function MutipleBaseFilter(){var _0x149cb3=_0x4b86,_0x1644f0='',_0x50906b='',_0x523dcd='';$(_0x149cb3(0xcd))[_0x149cb3(0xb3)]('');$(_0x149cb3(0x9a))[_0x149cb3(0xb3)]()!=_0x149cb3(0xbf)&&(_0x1644f0+='and\x20Department/ID\x20eq\x20\x27'+$(_0x149cb3(0x9a))[_0x149cb3(0xb3)]()+'\x27\x20',_0x523dcd+=_0x149cb3(0xe7)+$(_0x149cb3(0xa5))['text']()+'</div>');$('#allOfficeLocation')[_0x149cb3(0xb3)]()!='All'&&(_0x1644f0+='and\x20OfficeLocation/ID\x20eq\x20\x27'+$(_0x149cb3(0x115))[_0x149cb3(0xb3)]()+'\x27\x20',_0x523dcd+=_0x149cb3(0xe7)+$(_0x149cb3(0xb1))[_0x149cb3(0x12e)]()+_0x149cb3(0x99));if($(_0x149cb3(0xd0))['text']()!=''){var _0x5a9e29=getUserInformation(_0x149cb3(0xbc));if(_0x5a9e29['length']>0x0){_0x1644f0+=_0x149cb3(0xd5)+_0x5a9e29[0x0]+'\x27\x20';for(var _0x444d3e=0x0;_0x444d3e<_0x5a9e29[_0x149cb3(0x105)];_0x444d3e++){_0x5a9e29[_0x444d3e]!=_0x5a9e29[0x0]&&(_0x1644f0+=_0x149cb3(0x97)+_0x5a9e29[_0x444d3e]+'\x27');}_0x1644f0+=')';}}if($(_0x149cb3(0x122))[_0x149cb3(0xb3)]()!=null&&$('#attendanceDate')[_0x149cb3(0xb3)]()!=''){var _0x381022=$(_0x149cb3(0x122))[_0x149cb3(0xb3)](),_0x228161=moment($('#attendanceDate')[_0x149cb3(0xb3)](),_0x149cb3(0xd9))[_0x149cb3(0xfb)]('YYYY-MM-DD');GetHolidays(_0x228161);debugger;$(_0x149cb3(0xcd))['val'](_0x381022),$(_0x149cb3(0xcc))['text']($[_0x149cb3(0xb6)][_0x149cb3(0x13c)]('DD',new Date(_0x228161))),$('#monthhyear')[_0x149cb3(0x12e)]($[_0x149cb3(0xb6)][_0x149cb3(0x13c)](_0x149cb3(0x78),new Date(_0x228161)));}$(_0x149cb3(0xb8))[_0x149cb3(0xb3)]()!=_0x149cb3(0xbf)&&$(_0x149cb3(0xb8))[_0x149cb3(0xb3)]()!=_0x149cb3(0x102)&&($(_0x149cb3(0xb8))[_0x149cb3(0xb3)]()==_0x149cb3(0x9f)?(_0x50906b+=_0x149cb3(0x8f),_0x523dcd+=_0x149cb3(0xdc)):(_0x50906b+='and\x20AttendanceType\x20eq\x20\x27'+$(_0x149cb3(0xb8))['val']()+'\x27\x20',_0x523dcd+=_0x149cb3(0xe7)+$(_0x149cb3(0xc5))[_0x149cb3(0x12e)]()+'</div>'));$(_0x149cb3(0xfd))[_0x149cb3(0x8b)](),$(_0x149cb3(0xfd))['append'](_0x523dcd);var _0x3b3144=_spPageContextInfo[_0x149cb3(0xe4)]+_0x149cb3(0x100)+_0x228161+'\x27'+_0x50906b;$['when'](getFileData(_0x3b3144))[_0x149cb3(0xce)](function(_0x3a4df1){var _0x32b2e9=_0x149cb3,_0x1ebf29=_spPageContextInfo[_0x32b2e9(0xe4)]+_0x32b2e9(0x79)+txtCompanyId+'\x27'+_0x1644f0;EmployeeListDat(_0x1ebf29);});}function initializePeoplePicker(_0x423114){var _0x381d36=_0x4b86,_0x56619e={};_0x56619e['PrincipalAccountType']=_0x381d36(0xa8),_0x56619e[_0x381d36(0x126)]=0xf,_0x56619e[_0x381d36(0xd2)]=0xf,_0x56619e[_0x381d36(0x13f)]=!![],_0x56619e[_0x381d36(0x103)]=0x32,_0x56619e[_0x381d36(0x86)]=_0x381d36(0xec),this['SPClientPeoplePicker_InitStandaloneControlWrapper'](_0x423114,null,_0x56619e);}function getUserInformation(_0x4c1173){var _0x2a7201=_0x4b86,_0xe70477=[],_0x217661=this[_0x2a7201(0x8d)][_0x2a7201(0x116)][_0x4c1173+'_TopSpan'];if(!_0x217661[_0x2a7201(0xb4)]()){if(_0x217661[_0x2a7201(0x125)])return![];else{if(!_0x217661['HasResolvedUsers']())return![];else{if(_0x217661['TotalUserCount']>0x0){var _0x329c71=_0x217661[_0x2a7201(0x10d)](),_0x3c79a2='',_0x551b54='',_0x5428b5='';for(var _0x229a1b=0x0;_0x229a1b<_0x329c71[_0x2a7201(0x105)];_0x229a1b++){var _0x956884=_0x329c71[_0x229a1b][_0x2a7201(0x130)],_0xe58a35=GetUserID(_0x956884);_0xe58a35!=-0x1&&_0xe70477['push'](_0xe58a35);}return _0xe70477;}}}}else return _0x5428b5;}function GetUserID(_0x5c9515){var _0x43f6b5=_0x4b86,_0x36ee6a={'logonName':_0x5c9515},_0x105f2d=-0x1,_0x58807d=$[_0x43f6b5(0x81)]({'url':_spPageContextInfo[_0x43f6b5(0x132)]+'/_api/web/ensureuser','type':'POST','async':![],'contentType':_0x43f6b5(0xc2),'data':JSON[_0x43f6b5(0x123)](_0x36ee6a),'headers':{'Accept':'application/json;odata=verbose','X-RequestDigest':$(_0x43f6b5(0xc4))[_0x43f6b5(0xb3)]()},'success':function(_0x45c8c1){_0x105f2d=_0x45c8c1['d']['Id'];},'error':function(_0xa964e1){failure(_0xa964e1);}});return _0x105f2d;}function ClearFilterForAttendence(){var _0x483e17=_0x4b86;$(_0x483e17(0x9a))[_0x483e17(0xb3)](_0x483e17(0xbf)),$(_0x483e17(0x115))['val']('All'),$('#AttendanceType')[_0x483e17(0xb3)]('All'),$(_0x483e17(0x122))[_0x483e17(0xb6)]({'dateFormat':_0x483e17(0x13b)})[_0x483e17(0xb6)](_0x483e17(0xa3),new Date()),clearPeoplePickerControl(_0x483e17(0xbc)),$(_0x483e17(0xfd))[_0x483e17(0x8b)](),EmpAttendanceTodayData();}function _0x4b86(_0xfadee9,_0x5cdb4a){var _0x94dc03=_0x94dc();return _0x4b86=function(_0x4b8659,_0x581596){_0x4b8659=_0x4b8659-0x77;var _0x2249f5=_0x94dc03[_0x4b8659];return _0x2249f5;},_0x4b86(_0xfadee9,_0x5cdb4a);}function clearPeoplePickerControl(_0x15afd0){var _0x31878a=_0x4b86,_0x53d6dc=_0x15afd0+_0x31878a(0x12a),_0x5bd755=null,_0x44fb11=this[_0x31878a(0x8d)][_0x31878a(0x116)];for(var _0x5a44b5 in _0x44fb11){if(_0x5a44b5==_0x53d6dc){_0x5bd755=_0x44fb11[_0x5a44b5];break;}}if(_0x5bd755){var _0x97601b=$(document[_0x31878a(0x11e)](_0x5bd755[_0x31878a(0x146)]))[_0x31878a(0xdf)]('span[class=\x27sp-peoplepicker-userSpan\x27]');$(_0x97601b)[_0x31878a(0xb0)](function(_0x1ccdd5){var _0x8ca57d=_0x31878a;_0x5bd755[_0x8ca57d(0x142)](this);});}}function TableConfiguration(){var _0x4fb080=_0x4b86;sorter=new TINY[(_0x4fb080(0x12c))][(_0x4fb080(0x94))](_0x4fb080(0x94),'TempTableQuestions',{'ascclass':_0x4fb080(0xfc),'descclass':_0x4fb080(0x136),'evenclass':_0x4fb080(0x149),'oddclass':_0x4fb080(0xd4),'evenselclass':_0x4fb080(0xea),'oddselclass':_0x4fb080(0xf3),'paginate':!![],'size':0xa,'colddid':'columns','currentid':_0x4fb080(0xff),'totalid':_0x4fb080(0x82),'startingrecid':_0x4fb080(0xf0),'endingrecid':_0x4fb080(0x9e),'totalrecid':'totalrecords','hoverid':_0x4fb080(0xb9),'pageddid':_0x4fb080(0x8c),'navid':_0x4fb080(0x96),'sortdir':0x1,'init':!![]});}function attendanceEditModal(_0x4dc859,_0x29f472){var _0x473ba4=_0x4b86;$(_0x473ba4(0x11a))[_0x473ba4(0xb3)](''),$(_0x473ba4(0xde))[_0x473ba4(0xb3)](''),$(_0x473ba4(0xe8))[_0x473ba4(0x127)](_0x473ba4(0x9b));var _0x1556c1=$(_0x4dc859)[_0x473ba4(0x113)]('tr'),_0x2ce70a=$(_0x1556c1)['find']('.EmpName')[_0x473ba4(0x12e)](),_0x1b5447=$(_0x1556c1)[_0x473ba4(0xdf)](_0x473ba4(0x101))[_0x473ba4(0x12e)](),_0x571e8c=$(_0x1556c1)[_0x473ba4(0xdf)](_0x473ba4(0x10a))[_0x473ba4(0x12e)](),_0x59b17c=$(_0x1556c1)['find']('.Department')[_0x473ba4(0x12e)](),_0x7205a9=$(_0x1556c1)['find'](_0x473ba4(0x7f))['text']();$(_0x473ba4(0x124))[_0x473ba4(0x12e)](_0x2ce70a),$('#currentEmpDesignation')[_0x473ba4(0x12e)](_0x571e8c),$(_0x473ba4(0xf6))[_0x473ba4(0x12e)](_0x59b17c),$(_0x473ba4(0x88))['val'](_0x7205a9),$(_0x473ba4(0x11a))[_0x473ba4(0xb3)](_0x29f472),$(_0x473ba4(0xde))[_0x473ba4(0xb3)](_0x1b5447),$(_0x473ba4(0xed))[_0x473ba4(0x12e)]('');var _0x3cb493=ConvertddmmyyTommddyy($('#attendencedateValue')[_0x473ba4(0xb3)]()),_0x4888b8=$[_0x473ba4(0xb6)][_0x473ba4(0x13c)](_0x473ba4(0x78),new Date(_0x3cb493));$(_0x473ba4(0xed))[_0x473ba4(0x12e)](_0x4888b8);}function Applyattendence(_0x3468e8){var _0x127fd8=_0x4b86;if($('#currentEmpAttendanceType')[_0x127fd8(0xb3)]()==null)return alert(_0x127fd8(0x137)),![];var _0x25de7f=$('#currentEmpName')[_0x127fd8(0x12e)](),_0x2688c7=$(_0x127fd8(0xde))[_0x127fd8(0xb3)](),_0xd82772=$(_0x127fd8(0x88))[_0x127fd8(0xb3)](),_0x1d1421=$(_0x127fd8(0x11a))['val']();_0x1d1421==''?$[_0x127fd8(0x107)](insertAttendence(_0x2688c7,_0xd82772))[_0x127fd8(0xce)](function(_0x6ccdc8){var _0x245ca1=_0x127fd8;MutipleBaseFilter(),alert(_0x245ca1(0xe2));}):$['when'](UpdateAttendencee(_0xd82772,_0x1d1421))[_0x127fd8(0xce)](function(_0xe6a478){MutipleBaseFilter(),alert('Attendance\x20Updated');});}function insertAttendence(_0x5b97ac,_0x521e82){var _0x113b08=_0x4b86,_0x3d12d8=ConvertddmmyyTommddyy($('#attendencedateValue')[_0x113b08(0xb3)]());_0x3d12d8=new Date(_0x3d12d8),_0x3d12d8=$[_0x113b08(0xb6)][_0x113b08(0x13c)]('mm/dd/yy',_0x3d12d8);var _0x220058=$['Deferred'](),_0x16b884='EmpAttendance',_0x29f2c9=_spPageContextInfo[_0x113b08(0xe4)]+_0x113b08(0x11f),_0x23e8fd=_0x113b08(0xd8)+_0x16b884[_0x113b08(0x139)](0x0)['toUpperCase']()+_0x16b884['split']('\x20')['join']('')['slice'](0x1)+_0x113b08(0x84),_0x1d49cb;return _0x1d49cb={'__metadata':{'type':_0x23e8fd},'Title':_0x113b08(0x83),'WorkHours':'0','HrAction':_0x113b08(0x13d),'EmployeeId':_0x5b97ac,'AttendanceDate':_0x3d12d8,'AttendanceType':_0x521e82},$[_0x113b08(0x81)]({'url':_0x29f2c9,'type':_0x113b08(0xe1),'async':![],'headers':{'accept':_0x113b08(0xc2),'X-RequestDigest':$(_0x113b08(0xc4))[_0x113b08(0xb3)](),'content-Type':'application/json;odata=verbose'},'data':JSON['stringify'](_0x1d49cb),'success':function(_0x2cb94c){var _0x28b244=_0x113b08;_0x220058[_0x28b244(0xc9)](!![]);},'error':function(_0x32a33d){var _0xf348c8=_0x113b08;console[_0xf348c8(0xd7)](JSON[_0xf348c8(0x123)](_0x32a33d)),_0x220058[_0xf348c8(0xc3)](_0x32a33d);}}),_0x220058['promise']();}function UpdateAttendencee(_0x5dbfb8,_0xa576f){var _0x3599f3=_0x4b86,_0x3fe6bd=titanForWork[_0x3599f3(0x10b)](_0x3599f3(0xf9)),_0x4dcf64=$['Deferred'](),_0x5a2692=_0x3599f3(0x141),_0x31b9bc=_spPageContextInfo[_0x3599f3(0xe4)]+_0x3599f3(0x112)+_0xa576f+')',_0x3d280f=_0x3599f3(0xd8)+_0x5a2692[_0x3599f3(0x139)](0x0)['toUpperCase']()+_0x5a2692['split']('\x20')['join']('')[_0x3599f3(0x143)](0x1)+'ListItem',_0x3066a0;return _0x3066a0={'__metadata':{'type':_0x3d280f},'Title':_0x3599f3(0x83),'HrAction':_0x3599f3(0x13d),'AttendanceType':_0x5dbfb8},$[_0x3599f3(0x81)]({'url':_0x31b9bc,'type':_0x3599f3(0xe1),'async':![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$('#__REQUESTDIGEST')['val'](),'content-Type':'application/json;odata=verbose','X-Http-Method':'PATCH','If-Match':'*'},'data':JSON[_0x3599f3(0x123)](_0x3066a0),'success':function(_0xefae88){var _0x4db839=_0x3599f3;_0x4dcf64[_0x4db839(0xc9)](!![]);},'error':function(_0x88cde8){var _0x4c2ba5=_0x3599f3;console[_0x4c2ba5(0xd7)](JSON['stringify'](_0x88cde8)),_0x4dcf64['reject'](_0x88cde8);}}),_0x4dcf64[_0x3599f3(0x148)]();}function ConvertddmmyyTommddyy(_0x2e75a0){var _0xb54a01=_0x4b86;return _0x2e75a0[_0xb54a01(0x98)]('/')[0x1]+'/'+_0x2e75a0[_0xb54a01(0x98)]('/')[0x0]+'/'+_0x2e75a0[_0xb54a01(0x98)]('/')[0x2];}function selectedAttendenceEvent(){var _0x42b5f5=_0x4b86;$('#mutipleUpdatedate')['text']('');var _0x51add6=ConvertddmmyyTommddyy($(_0x42b5f5(0xcd))[_0x42b5f5(0xb3)]()),_0x496e27=$['datepicker']['formatDate'](_0x42b5f5(0x78),new Date(_0x51add6));$(_0x42b5f5(0xae))[_0x42b5f5(0x12e)](_0x496e27),$(_0x42b5f5(0xa4))['change'](function(){var _0x12575e=_0x42b5f5;selectedAttendListItem=[],$(_0x12575e(0xa4))['each'](function(){var _0x15c22d=_0x12575e;if($(this)[_0x15c22d(0xe6)](_0x15c22d(0xd6))==!![]){var _0x58dad6=$(this)['val'](),_0x1fbff4=$(this)[_0x15c22d(0x113)]('tr'),_0x375471=_0x1fbff4[_0x15c22d(0xdf)]('.EmpName')[_0x15c22d(0x12e)](),_0x401594=_0x1fbff4[_0x15c22d(0xdf)](_0x15c22d(0x101))['text']();selectedAttendListItem[_0x15c22d(0xc6)]({'AttenListitemId':_0x58dad6,'EmpName':_0x375471,'Empid':_0x401594});}});});}function UpdateMultipleSelectedItem(){var _0x3e44f3=_0x4b86;if(selectedAttendListItem[_0x3e44f3(0x105)]>0x0){if($('#mutipleEmpAttendType')['val']()=='select'){alert(_0x3e44f3(0x129));return![];$(_0x3e44f3(0xcf))[_0x3e44f3(0x127)](_0x3e44f3(0x91));}else{var _0x4dc201=0x1;for(var _0x2e5097=0x0;_0x2e5097<selectedAttendListItem['length'];_0x2e5097++){var _0x46fa00=selectedAttendListItem[_0x2e5097]['AttenListitemId'],_0xd7a326=selectedAttendListItem[_0x2e5097]['Empid'],_0x4f8f42=$(_0x3e44f3(0x10c))[_0x3e44f3(0xb3)]();_0x46fa00==''?$[_0x3e44f3(0x107)](insertAttendence(_0xd7a326,_0x4f8f42))[_0x3e44f3(0xce)](function(_0x2e4735){var _0x38890e=_0x3e44f3;_0x4dc201==selectedAttendListItem[_0x38890e(0x105)]&&(selectedAttendListItem=[],MutipleBaseFilter(),alert(_0x38890e(0x12b)),$(_0x38890e(0xcf))[_0x38890e(0x127)](_0x38890e(0x91)),$(_0x38890e(0x7c))[_0x38890e(0xe6)](_0x38890e(0xd6),![]),$(_0x38890e(0x133))['hide']());}):$[_0x3e44f3(0x107)](UpdateAttendencee(_0x4f8f42,_0x46fa00))[_0x3e44f3(0xce)](function(_0x5d7bff){var _0x4e424b=_0x3e44f3;_0x4dc201==selectedAttendListItem[_0x4e424b(0x105)]&&(selectedAttendListItem=[],MutipleBaseFilter(),alert(_0x4e424b(0x12b)),$(_0x4e424b(0xcf))[_0x4e424b(0x127)](_0x4e424b(0x91)),$('#selectAll')['prop'](_0x4e424b(0xd6),![]),$(_0x4e424b(0x133))[_0x4e424b(0x91)]());}),_0x4dc201++;}}}else alert(_0x3e44f3(0x140));}function ConvertHHMM(_0x554187){var _0xb92e9f=_0x4b86,_0xd44dff=Math[_0xb92e9f(0xda)](_0x554187/0x3c),_0x54c6ec=_0x554187%0x3c;_0xd44dff<0xa&&(_0xd44dff='0'+_0xd44dff);_0x54c6ec<0xa&&(_0x54c6ec='0'+_0x54c6ec);var _0x4d913c=_0xd44dff+':'+_0x54c6ec;return _0x4d913c;}function GetHolidays(_0x155214){var _0x21e1d4=_0x4b86,_0x68832d=_spPageContextInfo[_0x21e1d4(0xe4)]+'/_api/web/lists/getbytitle(\x27CompanyHoliday\x27)/items?$select=*,OfficeLocationID/Title&$expand=OfficeLocationID&$filter=Holiday_start\x20eq\x20\x27'+_0x155214+_0x21e1d4(0xa7)+titanForWork[_0x21e1d4(0x10b)]('CompanyId')+_0x21e1d4(0x77);$[_0x21e1d4(0x81)]({'url':_0x68832d,'headers':{'Accept':_0x21e1d4(0xc2)},'async':![],'success':function(_0x2f4f30){var _0x5be6c2=_0x21e1d4;debugger;var _0x35c9d4=_0x2f4f30['d'][_0x5be6c2(0xcb)],_0x11e41b='';$(_0x5be6c2(0x120))['empty']();if(_0x35c9d4[_0x5be6c2(0x105)]>0x0){$('#daydate')[_0x5be6c2(0xa6)](_0x5be6c2(0x8e),_0x5be6c2(0xf7)),$(_0x5be6c2(0x110))[_0x5be6c2(0xa6)]('color',_0x5be6c2(0xf7));for(var _0xb2dbf6=0x0;_0xb2dbf6<_0x35c9d4[_0x5be6c2(0x105)];_0xb2dbf6++){_0x11e41b=_0x11e41b+'<li>'+_0x35c9d4[_0xb2dbf6]['OfficeLocationID'][_0x5be6c2(0xf2)]+_0x5be6c2(0x7a);}$(_0x5be6c2(0x138))['css']('display',_0x5be6c2(0xa1)),$(_0x5be6c2(0x120))[_0x5be6c2(0xbe)](_0x11e41b);let _0xd02fcf={'marquee_class':_0x5be6c2(0xf4),'container_class':'.simple-marquee-container','sibling_class':0x0,'hover':!![],'duplicated':![],'easing':_0x5be6c2(0xf8),'direction':_0x5be6c2(0x93),'speed':0x32};}else $('.marquee-div')[_0x5be6c2(0xa6)]('display',_0x5be6c2(0x7d)),$('#daydate')['css'](_0x5be6c2(0x8e),_0x5be6c2(0x92)),$('#monthhyear')['css'](_0x5be6c2(0x8e),_0x5be6c2(0x92));},'error':function(_0x3bc58c){var _0x12dcc2=_0x21e1d4;alert(_0x12dcc2(0xbb));}});}function HrActionVerify(_0x2318b7){var _0x4548e0=_0x4b86,_0x3c9ae3=_0x2318b7;debugger;var _0x34deb9=_spPageContextInfo[_0x4548e0(0xe4)]+_0x4548e0(0x144)+_0x2318b7+'\x27)';$[_0x4548e0(0x81)]({'url':_0x34deb9,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x38ed8e){var _0x2d537d=_0x4548e0;debugger;var _0x10df04=_0x38ed8e['d'][_0x2d537d(0xcb)];if(_0x10df04[_0x2d537d(0x105)]>0x0){var _0x41bd1d=_0x10df04[0x0][_0x2d537d(0x104)];if(_0x41bd1d==!![])var _0x745e5a=![];else{if(_0x41bd1d==![])var _0x745e5a=!![];}$['ajax']({'url':_spPageContextInfo['webAbsoluteUrl']+'/_api/web/lists/GetByTitle(\x27EmpAttendance\x27)/items(\x27'+_0x2318b7+'\x27)','type':_0x2d537d(0xe1),'data':JSON[_0x2d537d(0x123)]({'__metadata':{'type':'SP.Data.EmpAttendanceListItem'},'HrAction':_0x745e5a}),'headers':{'Accept':'application/json;odata=verbose','Content-Type':_0x2d537d(0xc2),'X-RequestDigest':$('#__REQUESTDIGEST')[_0x2d537d(0xb3)](),'IF-MATCH':'*','X-HTTP-Method':'MERGE'},'success':function(_0x25a3e8,_0x2a7c82,_0x462af2){var _0x151f3d=_0x2d537d;console[_0x151f3d(0xd7)](_0x151f3d(0xd3));},'error':function(_0x220063,_0x3a1edb,_0x17e89a){var _0x233497=_0x2d537d;$(_0x233497(0xca))[_0x233497(0x8b)]()[_0x233497(0x12e)](_0x38ed8e[_0x233497(0xa9)]['error']);}});}else $(_0x2d537d(0x12d)+_0x3c9ae3+'\x27]')[_0x2d537d(0xe6)](_0x2d537d(0xd6),![]);},'error':function(_0x403c0b){var _0x571a42=_0x4548e0;alert(_0x571a42(0xbb));}});}