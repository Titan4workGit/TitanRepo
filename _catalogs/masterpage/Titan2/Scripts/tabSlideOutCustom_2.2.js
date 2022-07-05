$(document).ready(function() {
    
    $('#right').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: true, // position the panel from the bottom of the page, rather than the top
      handleOffsetReverse: true, // position the tab from the bottom of the panel, rather than the top
      onLoadSlideOut: false, // open by default
	  /* don't close this tab if a button is clicked, or if the checkbox is set */
	  clickScreenToCloseFilters: [
			'button', // ignore button clicks
			function(event){ // custom filter
				// filters need to return true to filter out the click passed in the parameter
				return $('#keepTabOpen').is(':checked');
			}
	  ]
    });
	
	$('#right1').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: false, // position the panel from the bottom of the page, rather than the top
      handleOffsetReverse: false, // position the tab from the bottom of the panel, rather than the top
      onLoadSlideOut: false, // open by default
	  /* don't close this tab if a button is clicked, or if the checkbox is set */
	  clickScreenToCloseFilters: [
			'button', // ignore button clicks
			function(event){ // custom filter
				// filters need to return true to filter out the click passed in the parameter
				return $('#keepTabOpen').is(':checked');
			}
	  ]
    });
	$('#right2').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: false, // position the panel from the bottom of the page, rather than the top
      handleOffsetReverse: false, // position the tab from the bottom of the panel, rather than the top
      onLoadSlideOut: false, // open by default
	  /* don't close this tab if a button is clicked, or if the checkbox is set */
	  clickScreenToCloseFilters: [
			'button', // ignore button clicks
			function(event){ // custom filter
				// filters need to return true to filter out the click passed in the parameter
				return $('#keepTabOpen').is(':checked');
			}
	  ]
    });
    $('#right3').tabSlideOut({
      tabLocation: 'right',
      offsetReverse: false, // position the panel from the bottom of the page, rather than the top
      handleOffsetReverse: false, // position the tab from the bottom of the panel, rather than the top
      onLoadSlideOut: false, // open by default
	  /* don't close this tab if a button is clicked, or if the checkbox is set */
	  clickScreenToCloseFilters: [
			'button', // ignore button clicks
			function(event){ // custom filter
				// filters need to return true to filter out the click passed in the parameter
				return $('#keepTabOpen').is(':checked');
			}
	  ]
    });

    // ---- new js for teams employee and office location ----

	var sPath = window.location.pathname;
	//var sPage = sPath.substring(sPath.lastIndexOf('\\') + 1);
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

	if ( sPage === "EmployeeDirectory.aspx" || sPage === "OfficeLocation.aspx" || sPage === "officeLocation.aspx" ) {

	$(document).mouseup(function(event) {

	  if (!$(event.target).closest(".my_ui_slidetab_open_right3,.ui-slideouttab-handle").length) {
	    $('#right3').removeClass('my_ui_slidetab_open_right3');
	  }
	  if (!$(event.target).closest(".my_ui_slidetab_open_right,.ui-slideouttab-handle").length) {
	    $('#right').removeClass('my_ui_slidetab_open_right');
	  }
	  if (!$(event.target).closest(".my_ui_slidetab_open_right1,.ui-slideouttab-handle").length) {
	    $('#right1').removeClass('my_ui_slidetab_open_right1');
	  }
	  if (!$(event.target).closest(".my_ui_slidetab_open_right2,.ui-slideouttab-handle").length) {
	    $('#right2').removeClass('my_ui_slidetab_open_right2');
	  }
	  
	});

	$("#right3 #right-handle").click(function(){

		$("#right3").removeClass("ui-slideouttab-open");

		$("#right").removeClass("my_ui_slidetab_open_right");
		$("#right1").removeClass("my_ui_slidetab_open_right1");
		$("#right2").removeClass("my_ui_slidetab_open_right2");

		$("#right3").toggleClass("my_ui_slidetab_open_right3");

	});

	$("#right #right-handle").click(function(){

		$("#right").removeClass("ui-slideouttab-open");

		$("#right1").removeClass("my_ui_slidetab_open_right1");
		$("#right2").removeClass("my_ui_slidetab_open_right2");
		$("#right3").removeClass("my_ui_slidetab_open_right3");

		$("#right").toggleClass("my_ui_slidetab_open_right");

	});

	$("#right1 #right-handle").click(function(){

		$("#right1").removeClass("ui-slideouttab-open");

		$("#right").removeClass("my_ui_slidetab_open_right");
		$("#right2").removeClass("my_ui_slidetab_open_right2");
		$("#right3").removeClass("my_ui_slidetab_open_right3");

		$("#right1").toggleClass("my_ui_slidetab_open_right1");

	});

	$("#right2 #right-handle").click(function(){

		$("#right2").removeClass("ui-slideouttab-open");

		$("#right").removeClass("my_ui_slidetab_open_right");
		$("#right1").removeClass("my_ui_slidetab_open_right1");
		$("#right3").removeClass("my_ui_slidetab_open_right3");

		$("#right2").toggleClass("my_ui_slidetab_open_right2");

	});

	}
    
});
