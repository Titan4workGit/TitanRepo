function sort_name()
{
	 var table=$('#tableTempProjects');
	 var tbody =$('#mainDivAreaOffice365');
	
	 tbody.find('tr').sort(function(a, b) 
	 {
	  if($('#name_order').val()=='asc') 
	  {
	   return $('td:first', a).text().localeCompare($('td:first', b).text());
	  }
	  else 
	  {
	   return $('td:first', b).text().localeCompare($('td:first', a).text());
	  }
			
	 }).appendTo(tbody);
		
	 var sort_order=$('#name_order').val();
	 if(sort_order=="asc")
	 {
	  document.getElementById("name_order").value="desc";
	 }
	 if(sort_order=="desc")
	 {
	  document.getElementById("name_order").value="asc";
	 }
}



function sortTable(column) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tableTempProjects");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
