var clicks = 0;
$('#submit')[0].addEventListener('click', function() {
  if (clicks < 1) {
    clicks++;
    var re = $('#re')[0].value.replace(/ /g, '').split(','); // Laver et array, re, som står for raw entries.
    var ec = [...new Set(re)].sort(function(a, b){return a-b}); // Laver et array, ec,  som står for entry categories.

    var fec = [];
    for (var i = ec[0]; i < parseFloat(ec[ec.length - 1]) + 1; i++) {
      fec.push(i.toString());
    }

    ec = fec;

    function getOccs(value) {
      var count = 0;
      re.forEach((v) => (v === value && count++));
      return count;
    }

    for (var i = 0; i < ec.length; i++) {
      $('table').append('<tr>' +
      '<td>' + ec[i] + '</td>' +
      '<td>' + getOccs(ec[i]) + '</td>' +
      '<td>' + (getOccs(ec[i]) / re.length * 100).toString().replace('.', ',') + '%</td>' +
      '</tr>');
      console.log(ec[i] + ': ' + getOccs(ec[i]));
    }

    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      if (i < 1) {
        $('tbody').children()[i + 1].innerHTML += ('<td>' +
          $('tbody').children()[i + 1].children[1].innerText +
        '</td>');
      } else {
        $('tbody').children()[i + 1].innerHTML += ('<td>' +
          (parseFloat($('tbody').children()[i + 1].children[1].innerHTML) + parseFloat($('tbody').children()[i].children[3].innerHTML)) +
        '</td>');
      }
    }

    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      if (i < 1) {
        $('tbody').children()[i + 1].innerHTML += ('<td>' +
          $('tbody').children()[i + 1].children[2].innerText +
        '</td>');
      } else {
        $('tbody').children()[i + 1].innerHTML += ('<td>' +
          (parseFloat($('tbody').children()[i + 1].children[2].innerHTML.replace(',', '.')) + parseFloat($('tbody').children()[i].children[4].innerHTML.replace(',', '.'))).toString().replace('.', ',') +
        '%</td>');
      }
    }

    var ft = 0;

    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      ft += parseFloat($('tbody').children()[i + 1].children[2].innerHTML.replace(',', '.').replace('%', ''))
    }

    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      $('tbody').children()[i + 1].innerHTML += ('<td>' +
        (parseFloat($('tbody').children()[i + 1].children[0].innerHTML) * parseFloat($('tbody').children()[i + 1].children[1].innerHTML)) +
      '</td>');
    }

    var xht = 0;

    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      xht += parseFloat($('tbody').children()[i + 1].children[5].innerHTML.replace(',', '.'));
    }

    $('table').append('<tr>'+
    '<td>I alt:</td>'+
    '<td>' + re.length + '</td>' +
    '<td>' + ft.toString().replace('.', ',') + '%</td>' +
    '<td></td>' +
    '<td></td>' +
    '<td>' + xht.toString().replace('.', ',') + '</td>' +
    '</tr>');

    $('#avg')[0].innerHTML += '<b>' + (xht / re.length).toString().replace('.', ',') + '</b>';


  }
});
