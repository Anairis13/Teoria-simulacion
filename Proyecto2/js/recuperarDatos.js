$.ajax({
   url: 'datos.txt',
   dataType: 'text'
}).done( (data) => {
   var allRows = data.split("\n");
   var table = '';
   for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      if (singleRow === 0) {
         table += '<tr>';
      } else {
         table += '<tr>';
      }
      var rowCells = allRows[singleRow].split(',');
      for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
         table += '<td>';
         table += rowCells[rowCell];
         table += '</td>';
      }
      table += '</tr>';
  }
  $('#records').append(table);

});
