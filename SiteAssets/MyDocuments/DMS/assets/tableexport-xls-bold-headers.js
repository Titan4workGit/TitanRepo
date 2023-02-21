/*
 * A jQuery plugin which generates a basic .xls file with bold headers from a HTML table.
 *
 * Original code by Shreedhar Bhat from this StackOverflow answer: https://stackoverflow.com/a/44255259,
 * with some small modifications by Carlo Pantaleo.
 *
 * Usage: let your HTML table be like:
 * <table id="myTable">
 *     <thead>
 *         ...
 *     </thead>
 *     <tbody>
 *         ...
 *     </tbody>
 * </table>
 *
 * Call:
 * $('#myTable').tableExport({
 *      filename: 'myExport.xls'
 * });
 *
 * to generate and download the Excel file 'myExport.xls'
 *
 *
 * Authors: Carlo Pantaleo, Shreedhar Bhat
 */

(function ($) {
    $.fn.extend({
        tableExport: function (options) {
            var defaults = {
                type: 'excel',
                ignoreColumn: [],
                filename: 'Export.xls',
                escape: 'true',
                htmlContent: 'false',
                consoleLog: 'false'
            };
            $.extend(defaults, options);

            var el = this;

            if (defaults.type === 'excel') {
                var excel = "<table>";
                // Header
                $(el).find('thead').find('tr').each(function () {
                    excel += "<tr>";
                    $(this).filter(':visible').find('th').each(function (index, data) {
                        if ($(this).css('display') !== 'none') {
                            if (defaults.ignoreColumn.indexOf(index) === -1) {
                                excel += "<td><b>" + parseString($(this)) + "</b></td>";
                            }
                        }
                    });
                    excel += '</tr>';
                });
                // Row Vs Column
                var rowCount = 1;
                $(el).find('tbody').find('tr').each(function () {
                    excel += "<tr>";
                    var colCount = 0;
                    $(this).filter(':visible').find('td').each(function (index, data) {
                        if ($(this).css('display') !== 'none') {
                            if (defaults.ignoreColumn.indexOf(index) === -1) {
                                excel += "<td>" + parseString($(this)) + "</td>";
                            }
                        }
                        colCount++;
                    });
                    rowCount++;
                    excel += '</tr>';
                });
                excel += '</table>';
                if (defaults.consoleLog === 'true') {
                    console.log(excel);
                }
                var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:" + defaults.type + "' xmlns='http://www.w3.org/TR/REC-html40'>";
                excelFile += "<head>";
                excelFile += "<!--[if gte mso 9]>";
                excelFile += "<xml>";
                excelFile += "<x:ExcelWorkbook>";
                excelFile += "<x:ExcelWorksheets>";
                excelFile += "<x:ExcelWorksheet>";
                excelFile += "<x:Name>";
                excelFile += "{worksheet}";
                excelFile += "</x:Name>";
                excelFile += "<x:WorksheetOptions>";
                excelFile += "<x:DisplayGridlines/>";
                excelFile += "</x:WorksheetOptions>";
                excelFile += "</x:ExcelWorksheet>";
                excelFile += "</x:ExcelWorksheets>";
                excelFile += "</x:ExcelWorkbook>";
                excelFile += "</xml>";
                excelFile += "<![endif]-->";
                excelFile += "</head>";
                excelFile += "<body>";
                excelFile += excel;
                excelFile += "</body>";
                excelFile += "</html>";
                var base64data = "base64," + btoa(excelFile);
                var uri = 'data:application/vnd.ms-excel;' + base64data;
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = defaults.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            function parseString(data) {
                if (defaults.htmlContent === 'true') {
                    content_data = data.html().trim();
                } else {
                    content_data = data.text().trim();
                }
                if (defaults.escape === 'true') {
                    content_data = encodeURI(content_data);
                }
                return content_data;
            }

            //Check original template for lot of convertion like to xml,json,pdf,etc
        }
    });
})(jQuery);
