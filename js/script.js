var clicks = 0;
function calc() { if ($('#re')[0].value.replace(/,/g, '.').split(' ').length > 1) {
  if (clicks < 1) {
    clicks++;
  } else {
    for (var i = 0; i < $('tbody').children().length - 1; i++) {
      $('tbody')[0].innerHTML = '<tr id="head"> <th>x</th> <th>h(x)</th> <th>f(x)</th> <th>H(x)</th> <th>F(x)</th> <th>x⋅h(x)</th> </tr>';
      $('div')[3].innerHTML = '</br> <p id="mindst"> Mindsteværdi: </p> <p id="largest"> Størsteværdi: </p> <p id="vari"> Variationsbredden: </p> <p id="midl"> Middeltal: </p> <p id="typet"> Typetal: </p>';
    }
  }
  var re = $('#re')[0].value.replace(/,/g, '.').split(' '); // Laver et array, re, som står for raw entries.
  var ec = [...new Set(re)].sort(function(a, b){return a-b}); // Laver et array, ec,  som står for entry categories.
  if (!$('#dontfill')[0].checked) {
    var cDecNums = false;
    var decNums = [];
    for (var i = 0; i < ec.length; i++) {
      if (ec[i] % 1 > 0) {
        cDecNums = true;
        decNums.push(ec[i] % 1);
      }
    }
    var fec = [];
    if (cDecNums == true) {
      decNums = [...new Set(decNums)].sort(function(a, b){return a-b});
      var incAmount = decNums[0];

      var j = parseFloat(ec[0]);
      for (var i = 0; i < ((ec[ec.length - 1] - parseFloat(ec[0])) / incAmount); i++) {
        fec.push((j + (incAmount * i)).toString());
      }
      fec.push(ec[ec.length - 1]);
    } else {
      for (var i = ec[0]; i < parseFloat(ec[ec.length - 1]) + 1; i++) {
        fec.push(i.toString());
      }
    }

    ec = fec;
  }

  function getOccs(val, arr) {
    var count = 0;
    arr.forEach((v) => (v === val && count++));
    return count;
  }

  for (var i = 0; i < ec.length; i++) {
    $('table').append('<tr>' +
    '<td>' + ec[i].toString().replace('.', ',') + '</td>' +
    '<td>' + getOccs(ec[i], re) + '</td>' +
    '<td>' + (getOccs(ec[i], re) / re.length * 100).toString().replace('.', ',') + '%</td>' +
    '</tr>');
    console.log(ec[i].toString().replace('.', ',') + ': ' + getOccs(ec[i], re));
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

  var typeti = {};
  var typet = [];
  var max = 0;
  for (var i = 0; i < ec.length; i++) {
    typeti[ec[i]] = getOccs(ec[i], re);
    if (getOccs(ec[i], re) >= max) {
      max = getOccs(ec[i], re);
      typet.push(ec[i]);
    }
  }
  console.log(typet);

  $('#midl')[0].innerHTML += '<b>' + (xht / re.length).toString().replace('.', ',') + '</b>';
  $('#mindst')[0].innerHTML += '<b>' + ec[0].toString().replace('.', ',') + '</b>';
  $('#largest')[0].innerHTML += '<b>' + ec[ec.length - 1].toString().replace('.', ',') + '</b>';
  $('#vari')[0].innerHTML += '<b>' + (ec[ec.length - 1] - ec[0]).toString().replace('.', ',') + '</b>';
  if (typet.length > 1) {
    var typetf = '';
    for (var i = 0; i < typet.length; i++) {
      if (i === typet.length - 1) {
        typetf += typet[i].toString().replace('.', ',');
      } else {
        typetf += typet[i].toString().replace('.', ',') + ' og ';
      }
    }
    $('#typet')[0].innerHTML += '<b>' + typetf + '</b>';
  } else {
    $('#typet')[0].innerHTML += '<b>' + typet[0].toString().replace('.', ',') + '</b>';
  }

} else {alert('Du skal skrive mindst to tal.');}}

$('#submit')[0].addEventListener('click', calc);
