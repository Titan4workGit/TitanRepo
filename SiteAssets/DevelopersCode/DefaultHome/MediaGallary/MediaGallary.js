var a7_0x9cdb=a7_0x5765;(function(_0x21fb80,_0x1d0ac8){var _0x14a5cb=a7_0x5765,_0x4c49c0=_0x21fb80();while(!![]){try{var _0x313004=parseInt(_0x14a5cb(0x228))/0x1+parseInt(_0x14a5cb(0x1f0))/0x2+parseInt(_0x14a5cb(0x213))/0x3+-parseInt(_0x14a5cb(0x1eb))/0x4+-parseInt(_0x14a5cb(0x1da))/0x5+parseInt(_0x14a5cb(0x1e8))/0x6+-parseInt(_0x14a5cb(0x225))/0x7*(parseInt(_0x14a5cb(0x1d1))/0x8);if(_0x313004===_0x1d0ac8)break;else _0x4c49c0['push'](_0x4c49c0['shift']());}catch(_0x624dd9){_0x4c49c0['push'](_0x4c49c0['shift']());}}}(a7_0x3445,0x4ac8d));var currentAlbumSiteUrl='',companyID='',albumPlace='',albumDate='',Description='',existingAlbumArrayList=new Array();$(document)['ready'](function(){var _0x5cdf68=a7_0x5765;$(_0x5cdf68(0x24b))['addClass'](_0x5cdf68(0x1d8));}),$(window)[a7_0x9cdb(0x248)](function(){var _0x129b95=a7_0x9cdb;CheckSettingsForMagazine();var _0x580b5f=titanForWork[_0x129b95(0x232)](_0x129b95(0x23c));_0x580b5f!=undefined&&MediaGalleryInitialization(),$('#carousel-exampleMagzine\x20ol\x20li')[_0x129b95(0x207)]()>0x1?$(_0x129b95(0x214))[_0x129b95(0x220)]():$('#carousel-exampleMagzine\x20ol')['hide']();});function MediaGalleryInitialization(){InitializationMediaSlider(),LoadRequestDetails();}function InitializationMediaSlider(){var _0x484ed0=a7_0x9cdb;companyID=Logged_CompanyId;var _0x12748d=titanForWork[_0x484ed0(0x1ef)](companyID);currentAlbumSiteUrl=_0x12748d,GetMediaGallery(_0x12748d,_0x484ed0(0x20e));}function EventMediaGallerySiteURL(_0x8c2460,_0x1b4951){var _0x2dd5c1=a7_0x9cdb,_0x2cbbc5=_spPageContextInfo['webAbsoluteUrl']+_0x2dd5c1(0x1dd)+_0x8c2460+'\x27)/items?$select=ID,SiteURL&$filter=ID\x20eq\x20\x27'+_0x1b4951+'\x27';$[_0x2dd5c1(0x246)]({'url':_0x2cbbc5,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x34feba){var _0x351a20=_0x2dd5c1,_0x5c3aea=_0x34feba['d'][_0x351a20(0x1e7)];if(_0x5c3aea['length']>0x0){var _0x125508=_0x5c3aea[0x0][_0x351a20(0x20b)];currentAlbumSiteUrl=_0x125508,GetMediaGallery(_0x125508,_0x351a20(0x20e));}},'eror':function(_0x5c5694){var _0x29aa9c=_0x2dd5c1;console[_0x29aa9c(0x1db)]($(_0x29aa9c(0x215))[_0x29aa9c(0x233)]());}});}function a7_0x5765(_0x159442,_0x16d88d){var _0x34452a=a7_0x3445();return a7_0x5765=function(_0x576573,_0x11643d){_0x576573=_0x576573-0x1c5;var _0x34d252=_0x34452a[_0x576573];return _0x34d252;},a7_0x5765(_0x159442,_0x16d88d);}function AddItemToListWithMetadat(_0x57115a,_0x4c82f3,_0x3583bc){var _0x461ccc=a7_0x9cdb,_0x4bbd1a=$[_0x461ccc(0x1ec)]();return $[_0x461ccc(0x246)]({'url':_0x57115a+'/_api/web/lists/getbytitle(\x27'+_0x4c82f3+_0x461ccc(0x1d3),'type':_0x461ccc(0x235),'async':!![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$(_0x461ccc(0x1c6))[_0x461ccc(0x233)](),'content-Type':_0x461ccc(0x22d)},'data':JSON['stringify'](_0x3583bc),'success':function(_0x2d28c3){var _0x1a4815=_0x461ccc;$(_0x1a4815(0x22e))[_0x1a4815(0x200)](_0x1a4815(0x23d)),InitializationMediaSlider(),_0x4bbd1a['resolve'](_0x2d28c3);},'error':function(_0x304e57){alert(JSON['stringify'](_0x304e57)),_0x4bbd1a['reject'](_0x304e57);}}),_0x4bbd1a[_0x461ccc(0x237)]();}function GetItemTypeForListNameDetailsGroups(_0xc9eac2){var _0x15d7d8=a7_0x9cdb;return _0x15d7d8(0x1fd)+_0xc9eac2[_0x15d7d8(0x217)](0x0)[_0x15d7d8(0x1e6)]()+_0xc9eac2[_0x15d7d8(0x238)]('\x20')[_0x15d7d8(0x219)]('')['slice'](0x1)+_0x15d7d8(0x24e);}var mediaGalleryCounter=0x0;function GetMediaGallery(_0x5eddcd,_0x5af4a4){var _0x2c229f=a7_0x9cdb;BindAlbumDropDownList(_0x5eddcd);var _0x29b77a=_0x5eddcd+'/_api/web/Lists/Getbytitle(\x27MediaGallery\x27)/rootfolder/folders?$select=*,Name,TimeLastModified,ServerRelativeUrl&$top=10&$orderby=TimeLastModified\x20desc';$[_0x2c229f(0x246)]({'url':_0x29b77a,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x3bd2e2){var _0xf965f8=_0x2c229f,_0xeec2be=_0x3bd2e2['d']['results'];console[_0xf965f8(0x1db)](_0xf965f8(0x20f)+_0x3bd2e2);var _0x527eed=0x0;$(_0xf965f8(0x236))[_0xf965f8(0x202)](''),mediaGalleryCounter=0x0;for(var _0x1f09b4=0x0;_0x1f09b4<_0xeec2be[_0xf965f8(0x240)];_0x1f09b4++){if(_0xeec2be[_0x1f09b4][_0xf965f8(0x21b)]!=_0xf965f8(0x1e1)&&_0xeec2be[_0x1f09b4][_0xf965f8(0x21b)]!='_t'&&_0xeec2be[_0x1f09b4][_0xf965f8(0x21b)]!='_w'){if(_0x527eed<0x5){_0x527eed++;var _0x42bdff=encodeURI(_0xeec2be[_0x1f09b4][_0xf965f8(0x23a)]),_0x31cc29=_0xeec2be[_0x1f09b4]['Name'],_0x2f29ef='';$[_0xf965f8(0x1f9)](GetAlbumCaptionDescription(_0x5eddcd,_0x31cc29))[_0xf965f8(0x206)](function(_0x2b61b6){var _0x107e5f=_0xf965f8;_0x2b61b6[_0x107e5f(0x240)]>0x0&&(albumPlace=_0x2b61b6[0x0]['Event_Place'],Description=_0x2b61b6[0x0][_0x107e5f(0x24c)],albumDate=_0x2b61b6[0x0][_0x107e5f(0x1fb)]),GetMediaGalleryThumbNail(_0x5eddcd,_0x42bdff,_0x31cc29,albumPlace,albumDate,Description);});}}}if(_0x527eed==0x0){var _0x2202fa=$(_0xf965f8(0x1fc))[_0xf965f8(0x1f8)]();_0x2202fa==''&&(_0x2202fa='Keep\x20watching\x20for\x20upcoming\x20albums');var _0x44f440=_0xf965f8(0x1ea)+_0x2202fa+'</h3></div>';$(_0xf965f8(0x1c7))[_0xf965f8(0x23b)](_0x44f440);}},'eror':function(_0x3dc6c2){var _0x179fe8=_0x2c229f;console[_0x179fe8(0x1db)]('error');}});}function GetMediaGalleryThumbNail(_0x265447,_0x210060,_0xf4aa9c,_0x472dc8,_0x171314,_0xd96ac){var _0xfa189a=a7_0x9cdb,_0x171314=new Date(_0x171314),_0x201c6b=''+_spPageContextInfo[_0xfa189a(0x22c)]+_0xfa189a(0x231)+companyID+_0xfa189a(0x1e4)+_0x210060+_0xfa189a(0x218),_0x171314=$['datepicker'][_0xfa189a(0x1df)](_0xfa189a(0x1d4),_0x171314),_0x18f8b6=_0x265447+_0xfa189a(0x22f)+_0x210060+'\x27)?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified\x20desc&$top=1';$[_0xfa189a(0x246)]({'url':_0x18f8b6,'headers':{'Accept':_0xfa189a(0x22d)},'async':![],'success':function(_0x25e611){var _0x20f3de=_0xfa189a,_0x1068ee=_0x25e611['d'][_0x20f3de(0x241)][_0x20f3de(0x1e7)];console[_0x20f3de(0x1db)](_0x20f3de(0x22b)+_0x25e611);var _0x656670='';_0x1068ee[_0x20f3de(0x1f4)](function(_0x1fe4b0,_0x1cd66f){var _0x50929f=_0x20f3de,_0x37cb4f=new Date(_0x1fe4b0[_0x50929f(0x208)]),_0x4e814a=new Date(_0x1cd66f[_0x50929f(0x208)]);if(_0x37cb4f<_0x4e814a)return-0x1;if(_0x37cb4f>_0x4e814a)return 0x1;return 0x0;});var _0x70f61f='';mediaGalleryCounter++;for(var _0x44f1e0=0x0;_0x44f1e0<_0x1068ee[_0x20f3de(0x240)];_0x44f1e0++){_0x656670=encodeURI(_0x1068ee[0x0][_0x20f3de(0x23a)]);}_0x656670==''&&(_0x656670=_0x20f3de(0x1f6));if(mediaGalleryCounter==0x1){_0xf4aa9c[_0x20f3de(0x240)]>0x1d&&(_0xf4aa9c=_0xf4aa9c[_0x20f3de(0x245)](0x0,0x1d)+_0x20f3de(0x1e3));var _0x19f5e6=_0x656670[_0x20f3de(0x238)]('.');_0x19f5e6=_0x19f5e6[_0x19f5e6[_0x20f3de(0x240)]-0x1],_0x70f61f+='<div\x20class=\x22cuadro_intro_hover\x20\x22>',_0x70f61f+=_0x20f3de(0x1c8)+_0x201c6b+'\x22>',_0x19f5e6==_0x20f3de(0x1cf)||_0x19f5e6=='JPG'||_0x19f5e6==_0x20f3de(0x1c5)||_0x19f5e6==_0x20f3de(0x1cb)||_0x19f5e6==_0x20f3de(0x221)||_0x19f5e6==_0x20f3de(0x242)||_0x19f5e6==_0x20f3de(0x234)||_0x19f5e6==_0x20f3de(0x23e)||_0x19f5e6==_0x20f3de(0x1e0)||_0x19f5e6==_0x20f3de(0x20a)?_0x70f61f+=_0x20f3de(0x20c)+_0x656670+_0x20f3de(0x222):_0x70f61f+=_0x20f3de(0x21c),_0x70f61f+='</a>',_0x70f61f+=_0x20f3de(0x1d0),_0x70f61f+=_0x20f3de(0x1ed),_0x70f61f+='<div\x20class=\x22caption-text\x22>',_0x70f61f+=_0x20f3de(0x1d6)+_0xf4aa9c+_0x20f3de(0x210),_0x70f61f+=_0x20f3de(0x1e9)+_0x201c6b+_0x20f3de(0x24f)+_0x171314+'</span><br><span\x20class=\x22albumDescription1\x22>Place:\x20'+_0x472dc8+'</span><br><span>Description:\x20'+_0xd96ac+_0x20f3de(0x249),_0x70f61f+=_0x20f3de(0x1de),_0x70f61f+=_0x20f3de(0x1de),_0x70f61f+=_0x20f3de(0x1de),$('#galleryFirstImgThumb')[_0x20f3de(0x202)](''),$('#galleryFirstImgThumb')[_0x20f3de(0x23b)](_0x70f61f);}else{_0xf4aa9c[_0x20f3de(0x240)]>0x12&&(_0xf4aa9c=_0xf4aa9c[_0x20f3de(0x245)](0x0,0x12)+_0x20f3de(0x1e3));var _0x19f5e6=_0x656670['split']('.');_0x19f5e6=_0x19f5e6[_0x19f5e6[_0x20f3de(0x240)]-0x1],_0x70f61f='',_0x70f61f+=_0x20f3de(0x1dc),_0x70f61f+=_0x20f3de(0x1f5),_0x70f61f+='<a\x20href=\x22'+_0x201c6b+'\x22>',_0x19f5e6==_0x20f3de(0x1cf)||_0x19f5e6==_0x20f3de(0x244)||_0x19f5e6==_0x20f3de(0x1c5)||_0x19f5e6==_0x20f3de(0x1cb)||_0x19f5e6=='PNG'||_0x19f5e6=='BMP'||_0x19f5e6==_0x20f3de(0x234)||_0x19f5e6==_0x20f3de(0x23e)||_0x19f5e6==_0x20f3de(0x1e0)||_0x19f5e6==_0x20f3de(0x20a)?_0x70f61f+=_0x20f3de(0x20c)+_0x656670+_0x20f3de(0x1f7):_0x70f61f+=_0x20f3de(0x1f1),_0x70f61f+='</a>',_0x70f61f+=_0x20f3de(0x1d0),_0x70f61f+='<div\x20class=\x22blur\x22></div>',_0x70f61f+='<div\x20class=\x22caption-text\x22>',_0x70f61f+=_0x20f3de(0x1d6)+_0xf4aa9c+'</h5>',_0x70f61f+='<p><a\x20href=\x22'+_0x201c6b+_0x20f3de(0x1f3)+_0x171314+'</span><br><span\x20class=\x22albumDescription\x22>Place:\x20'+_0x472dc8+_0x20f3de(0x24d)+_0xd96ac+_0x20f3de(0x249),_0x70f61f+=_0x20f3de(0x1de),_0x70f61f+=_0x20f3de(0x205),_0x70f61f+=_0x20f3de(0x1de),_0x70f61f+=_0x20f3de(0x1de),$(_0x20f3de(0x201))[_0x20f3de(0x23b)](_0x70f61f);}},'eror':function(_0x49a9bb){var _0x18c813=_0xfa189a;console[_0x18c813(0x1db)](_0x18c813(0x1fa));}});}function a7_0x3445(){var _0x4562d0=['.mediaGalleryTab','<a\x20href=\x22','Publish_Date','Keep\x20watching\x20for\x20upcoming\x20magazines','GIF','.pdf','toLowerCase','AttachmentFiles','jpg','<div\x20class=\x22caption\x22>','96856wIbFTa','<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x220\x22\x20class=\x22active\x22></li>','\x27)/items','MM\x20dd,\x20yy','push','<h5>','<div\x20class=\x22cuadro_intro_hover\x20\x22>','res_home','resolve','179825olaUMa','log','<div\x20class=\x22col-sm-6\x20col-xs-6\x20mb10\x22>','/_api/web/lists/getbytitle(\x27','</div>','formatDate','png','Forms','Active','...','&FName=','reject','toUpperCase','results','2116032JvqcYM','<p><a\x20href=\x22','<div\x20class=\x22albumNoRecord\x20col-sm-12\x20col-xs-12\x20col-md-12\x22><h3\x20class=\x22top5\x22\x20data-localize=\x22NoRecord_MediaGallery\x22>','1105868LGMmli','Deferred','<div\x20class=\x22blur\x22></div>','</span><br><span\x20data-localize=\x22PublishOnColon\x22></span>','currentCompanyUrl','876784LkXdGx','<img\x20src=\x22https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyDocuments/DMS/assets/images/video-files.png?isSPOFile=1\x22\x20alt=\x22\x22\x20class=\x22thumb\x20imageThumView2\x20videoThumbView\x22>','<div\x20class=\x22col-sm-4\x20col-xs-4\x22>','\x22><span\x20class=\x22albumDate\x22>','sort','<div\x20class=\x22cuadro_intro_hover2\x20mb-15\x22>','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MediaGallery/assets/images/default%20album.png','\x22\x20alt=\x22\x22\x20class=\x22thumb\x20imageThumView2\x22>','text','when','error','Modified','#langBlankTextMessageMedia','SP.Data.','.magazineCarouselIndicators','#langBlankTextMessageMagazine','modal','#gallerySecondImgThumb','html','.SecondCarSoulSlide','.thirdCarSoulSlide','\x20</div>','done','size','TimeLastModified','</h3></div>','bmp','SiteURL','<img\x20src=\x22','.nav-custom-gallery>li:nth-child(2)','MediaGallery','root','</h5>','datepicker','/_api/web/lists/GetByTitle(\x27EnvironmentalSettings\x27)/Items?$select=Title,Active&$filter=Title\x20eq\x20\x27Magazine\x27','888906EXNNKD','#carousel-exampleMagzine\x20ol','#txtSomethingWentWrong','</a></p>','charAt','&Mode=View&sourcelocation=../Pages/Default.aspx','join','.firstCarSoulSlide','Name','<img\x20src=\x22https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyDocuments/DMS/assets/images/video-files.png?isSPOFile=1\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20imageThumView1\x20videoThumbView\x22>','<div\x20class=\x22magazineNoRecord\x20col-sm-12\x20col-xs-12\x20col-md-12\x22><h3\x20class=\x22top5\x22\x20data-localize=\x22NoRecord_Magazine\x22>','<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x222\x22></li>','/_api/web/Lists/Getbytitle(\x27MediaGallery\x27)/rootfolder/folders?$select=Name,ServerRelativeUrl&$top=5000','show','PNG','\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20imageThumView1\x22>','application/json;\x20odata=verbose','GET','329XACelm','<div\x20class=\x22caption-text\x22>','<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x221\x22></li>','100412shAXGx','</a>','Title','Album\x20data','webAbsoluteUrl','application/json;odata=verbose','#newAlbumModelPopup','/_api/Web/GetFolderByServerRelativeUrl(\x27','\x22><span\x20data-localize=\x22VolColon\x22>Volume\x20:\x20','/Pages/MediaGalleryDetail.aspx?WebAppId=','getQueryStringParameter','val','jpeg','POST','.gallerySecondImgThumb','promise','split','File','ServerRelativeUrl','append','WelcomePageCalled','hide','gif','Volume','length','Files','BMP','remove','JPG','substring','ajax','/_api/web/lists/getbytitle(\x27Magazine_items\x27)/items?$orderby=\x20Publish_Date\x20desc&$orderby=Volume\x20desc&$expand=AttachmentFiles','load','</span></a></p>','FileName','.article-content','Description','</span><br><span>Description\x20:\x20','ListItem','\x22><span\x20class=\x22albumDate1\x22>','JPEG','#__REQUESTDIGEST'];a7_0x3445=function(){return _0x4562d0;};return a7_0x3445();}function BindAlbumDropDownList(_0x3bad13){var _0x2e5889=a7_0x9cdb;existingAlbumArrayList=[];var _0x59908a=_0x3bad13+_0x2e5889(0x21f);$[_0x2e5889(0x246)]({'url':_0x59908a,'headers':{'Accept':_0x2e5889(0x22d)},'async':!![],'success':function(_0x6ca935){var _0x2bfb24=_0x2e5889,_0x17667d=_0x6ca935['d'][_0x2bfb24(0x1e7)];for(var _0x356d2d=0x0;_0x356d2d<_0x17667d[_0x2bfb24(0x240)];_0x356d2d++){if(_0x17667d[_0x356d2d][_0x2bfb24(0x21b)]!='Forms'&&_0x17667d[_0x356d2d][_0x2bfb24(0x21b)]!='_t'&&_0x17667d[_0x356d2d][_0x2bfb24(0x21b)]!='_w'){var _0x3aa7af=_0x17667d[_0x356d2d][_0x2bfb24(0x21b)];existingAlbumArrayList[_0x2bfb24(0x1d5)](_0x3aa7af[_0x2bfb24(0x1cd)]());}}},'eror':function(_0x28e501){var _0x1cfcb8=_0x2e5889;console[_0x1cfcb8(0x1db)](_0x1cfcb8(0x1fa));}});}function GetAlbumCaptionDescription(_0x238283,_0x276e67){var _0x52bda3=a7_0x9cdb,_0x5795a9=$[_0x52bda3(0x1ec)](),_0x161608=_0x238283+'/_api/web/lists/getbytitle(\x27MediaGallery\x27)/items?$select=*,Title,Description&$filter=Title\x20eq\x20\x27'+_0x276e67+'\x27';return $['ajax']({'url':_0x161608,'headers':{'Accept':_0x52bda3(0x22d)},'async':![],'success':function(_0x427308){var _0x6102e3=_0x52bda3;_0x5795a9[_0x6102e3(0x1d9)](_0x427308['d'][_0x6102e3(0x1e7)]);},'eror':function(_0x4e79d2){var _0x55e263=_0x52bda3;console['log'](_0x55e263(0x1fa)),_0x5795a9[_0x55e263(0x1e5)](_0x4e79d2);}}),_0x5795a9[_0x52bda3(0x237)]();}function LoadRequestDetails(){var _0x82879a=a7_0x9cdb,_0x5759e7=titanForWork['currentCompanyUrl'](Logged_CompanyId),_0x4f9036=_0x5759e7+_0x82879a(0x247);$[_0x82879a(0x246)]({'url':_0x4f9036,'method':_0x82879a(0x224),'headers':{'Accept':_0x82879a(0x223)},'success':function(_0x5dad6e){var _0x27d161=_0x82879a,_0x4b0a11=_0x5dad6e['d'][_0x27d161(0x1e7)],_0x1f3f29=[],_0x58489f=0x0,_0x36701d='',_0x114f1b='',_0x4f36f9='',_0x6972ab='';for(var _0x156732=0x0;_0x156732<_0x4b0a11[_0x27d161(0x240)];_0x156732++){_0x58489f++;var _0xe7f05f='',_0x806934=_0x4b0a11[_0x156732][_0x27d161(0x239)][_0x27d161(0x21b)],_0x1678c5='',_0x479ccf='';_0x4b0a11[_0x156732][_0x27d161(0x1ce)]['results']['length']>0x1&&(_0x4b0a11[_0x156732][_0x27d161(0x1ce)][_0x27d161(0x1e7)][0x0][_0x27d161(0x24a)]['indexOf'](_0x27d161(0x1cc))==-0x1?(_0x1678c5=_0x4b0a11[_0x156732]['AttachmentFiles'][_0x27d161(0x1e7)][0x0][_0x27d161(0x23a)],_0x479ccf=_0x4b0a11[_0x156732][_0x27d161(0x1ce)][_0x27d161(0x1e7)][0x1][_0x27d161(0x23a)]):(_0x1678c5=_0x4b0a11[_0x156732][_0x27d161(0x1ce)][_0x27d161(0x1e7)][0x1]['ServerRelativeUrl'],_0x479ccf=_0x4b0a11[_0x156732][_0x27d161(0x1ce)][_0x27d161(0x1e7)][0x0][_0x27d161(0x23a)]));var _0x204a99=new Date(_0x4b0a11[_0x156732][_0x27d161(0x1c9)]),_0x37a590=$[_0x27d161(0x211)][_0x27d161(0x1df)](_0x27d161(0x1d4),_0x204a99),_0x3170e0=_0x4b0a11[_0x156732][_0x27d161(0x22a)],_0x1ded76=_0x4b0a11[_0x156732]['Volume']==null?'':_0x4b0a11[_0x156732][_0x27d161(0x23f)];_0x3170e0[_0x27d161(0x240)]>0xc&&(_0x3170e0=_0x3170e0['substring'](0x0,0x32)+_0x27d161(0x1e3));_0xe7f05f+=_0x27d161(0x1f2),_0xe7f05f+=_0x27d161(0x1d7),_0xe7f05f+=_0x27d161(0x1c8)+_0x479ccf+'\x22>',_0xe7f05f+='<img\x20\x20src=\x22'+_0x1678c5+'\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20magazineimg\x22>',_0xe7f05f+=_0x27d161(0x229),_0xe7f05f+='<div\x20class=\x22caption\x22>',_0xe7f05f+=_0x27d161(0x1ed),_0xe7f05f+=_0x27d161(0x226),_0xe7f05f+='<h5>'+_0x3170e0+_0x27d161(0x210),_0xe7f05f+='<p><a\x20href=\x22'+_0x479ccf+_0x27d161(0x230)+_0x1ded76+_0x27d161(0x1ee)+_0x37a590+_0x27d161(0x216),_0xe7f05f+='</div>',_0xe7f05f+=_0x27d161(0x1de),_0xe7f05f+='</div>',_0xe7f05f+=_0x27d161(0x1de);if(_0x156732<0x3)_0x36701d+=_0xe7f05f;else{if(_0x156732>0x2&&_0x156732<0x6)_0x114f1b+=_0xe7f05f;else _0x156732>0x5&&_0x156732<0x9&&(_0x4f36f9+=_0xe7f05f);}}_0x36701d['length']>0x0?(_0x6972ab+='<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x220\x22\x20class=\x22active\x22></li>',$(_0x27d161(0x21a))['html'](''),$(_0x27d161(0x21a))[_0x27d161(0x23b)](_0x36701d)):$(_0x27d161(0x21a))[_0x27d161(0x243)]();_0x114f1b[_0x27d161(0x240)]>0x0?(_0x6972ab='',_0x6972ab+='<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x220\x22\x20class=\x22active\x22></li>',_0x6972ab+=_0x27d161(0x227),$(_0x27d161(0x203))[_0x27d161(0x202)](''),$(_0x27d161(0x203))[_0x27d161(0x23b)](_0x114f1b)):$(_0x27d161(0x203))['remove']();_0x4f36f9['length']>0x0?(_0x6972ab='',_0x6972ab+=_0x27d161(0x1d2),_0x6972ab+=_0x27d161(0x227),_0x6972ab+=_0x27d161(0x21e),$(_0x27d161(0x204))[_0x27d161(0x202)](''),$(_0x27d161(0x204))[_0x27d161(0x23b)](_0x4f36f9)):$(_0x27d161(0x204))['remove']();if(_0x58489f==0x0){var _0x440dc3=$(_0x27d161(0x1ff))[_0x27d161(0x1f8)]();_0x440dc3==''&&(_0x440dc3=_0x27d161(0x1ca));var _0x2f9305=_0x27d161(0x21d)+_0x440dc3+_0x27d161(0x209);$('.magazinePanel')['append'](_0x2f9305);}else $(_0x27d161(0x1fe))[_0x27d161(0x23b)](_0x6972ab);}});}function CheckSettingsForMagazine(){var _0x432fab=a7_0x9cdb,_0xf383a0=_spPageContextInfo['webAbsoluteUrl']+_0x432fab(0x212);$[_0x432fab(0x246)]({'url':_0xf383a0,'type':_0x432fab(0x224),'headers':{'accept':_0x432fab(0x22d)},'success':function(_0x6bdb76){var _0x5c9a58=_0x432fab,_0xfd31d4=_0x6bdb76['d'][_0x5c9a58(0x1e7)],_0x1d4db1=_0xfd31d4[0x0][_0x5c9a58(0x1e2)];_0x1d4db1==!![]?$(_0x5c9a58(0x20d))[_0x5c9a58(0x220)]():$(_0x5c9a58(0x20d))[_0x5c9a58(0x23d)]();},'error':function(_0x4a39f2){var _0x574855=_0x432fab;console[_0x574855(0x1db)]('Error\x20occured\x20in\x20GetEnvironmentalSettings()');}});}