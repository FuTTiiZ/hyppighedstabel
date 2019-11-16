let rObs = [];
let pObs = [];
let nObs = [];

let totalH = 0;
let totalH2 = 0;
let totalF = 0;

let typetal = -999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
let typetalA = [];

let kvarStat = 1;
let kvartilSet = [];

let fill = $('#fill')[0].checked;
let interval = 1;

$('#fill').click(function() {
  $('#interval').attr('disabled', !$('#fill')[0].checked);
  fill = $('#fill')[0].checked;
});

$('#submit').click(function() {
  if ($('#obs').val().length < 1) return;

  rObs = $('#obs').val().replace(/  /g, ' ').replace(/\./g, ',').split(' ');
  totalH = 0;
  totalH2 = 0;
  totalF = 0;
  pObs = [];
  nObs = [];
  typetal = -999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
  typetalA = [];
  kvarStat = 1;
  kvartilSet = [];
  fill = $('#fill')[0].checked;
  interval = parseFloat($('#interval').val().replace('.', ',').replace(',', '.'));

  if (fill && isNaN(interval)) {  
    alert('Dit interval skal være et tal!');
    return;
  }

  let cleared = 0;
  for (let i = 0; i < rObs.length; i++) {
    if (!parseFloat(rObs[i].replace(',', '.')) && !parseFloat(rObs[i].replace(',', '.')) === 0) {
      alert('Du må kun skrive tal!')

      rObs = [];
      nObs = [];
    } else {
      nObs.push(parseFloat(rObs[i].replace(',', '.')));
      cleared++;
      if (cleared === rObs.length) {
        $('table').html(`
          <tr id="head">
            <th>x</th>
            <th>h(x)</th>
            <th>f(x)</th>
            <th>H(x)</th>
            <th>F(x)</th>
            <th>x⋅h(x)</th>
          </tr>
        `);
        cleared = 0;
        insertObs();
      }
    }
  }
});

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function pretty(num) {
  let curr = num.toFixed(2).toString().replace('.', ',').replace(',00', '');
  if (!curr.split(',')[1]) return curr;
  if (curr.split(',')[1].charAt(1) === '0') {
    curr = curr.split(',')[0] + ',' + curr.split(',')[1].charAt(0);
  }
  return curr;
}

function h(val, arr, add, type) {
  let occs = 0;
  for (let i = 0; i < arr.length; i++) {
    arr[i] === val ? occs++ : 0;
  }
  //console.log(totalH2 + ' + ' + occs + ' = ' + (totalH2 + occs));
  if (add) totalH2 += occs;
  if (type) {
    if (occs > typetal) {
      typetal = occs;
      typetalA = [];
      typetalA.push(val);
    } else if (occs === typetal) {
      typetalA.push(val);
    }
  }
  return occs;
}

function f(val, kvartVar) {
  totalF += (val / totalH * 100);
  if (totalF >= kvarStat * 25 && kvarStat <= 3) {
    kvartilSet.push(kvartVar);
    kvarStat++;
  }
  if (totalF >= kvarStat * 25 && kvarStat <= 3) {
    kvartilSet.push(kvartVar);
    kvarStat++;
  }
  if (totalF >= kvarStat * 25 && kvarStat <= 3) {
    kvartilSet.push(kvartVar);
    kvarStat++;
  }

  return (val / totalH * 100).toFixed(2).toString().replace('.', ',').replace(',00', '');
}

function insertObs() {
  nObs = [];
  let oObs = {};
  for (let i = 0; i < rObs.length; i++) {
    if (pObs.indexOf(rObs[i]) === -1) {
      //isFloat(rObs[i]) ? pObs.push(pretty(rObs[i])) : pObs.push(rObs[i]);
      nObs.push(parseFloat(rObs[i].replace(',', '.')));
      oObs[parseFloat(rObs[i].replace(',', '.')).toString()] = isFloat(rObs[i]) ? pretty(rObs[i]) : rObs[i];
    }
  }

  nObs.sort(function(a, b){return a-b});

  pObs = []
  for (let v of nObs) {
    isFloat(oObs[v.toString()]) ? pObs.push(pretty(oObs[v.toString()])) : pObs.push(oObs[v.toString()]);
  }

  if (fill && pObs.length > 1) {
    let tpObs = [pObs[0]];
    let tnObs = [nObs[0]];

    let proceed = true;
    let curr = nObs[0];
    for (let i = 0; curr < nObs[nObs.length - 1] - interval; i++) {
      curr += interval;
      if (oObs[curr]) {
        tpObs.push(oObs[curr]);
      } else {
        isFloat(curr) ? tpObs.push(pretty(curr)) : tpObs.push(curr.toString());
      }

      tnObs.push(parseFloat(curr.toString().replace(',', '.')));

      if (!(curr < nObs[nObs.length - 1] - interval) && (curr + interval > nObs[nObs.length - 1])) {
        alert('Dit interval går ikke op i dine observationer!');
        proceed = false;
        tpObs = [pObs[0]];
        tnObs = [nObs[0]];
      }
    }

    if (!proceed) return;

    tpObs.push(pObs[pObs.length - 1]);
    tnObs.push(nObs[nObs.length - 1]);

    for (let v of pObs) {
      if (tpObs.indexOf(v) === -1) {
        //alert(v + ' = ' + )
        alert('Dit interval går ikke op i dine observationer! 2');
        proceed = false;
        tpObs = [pObs[0]];
        tnObs = [nObs[0]];
      }
    }

    pObs = tpObs;
    nObs = tnObs;

  }

  for (let i = 0; i < nObs.length; i++) {
    totalH += h(pObs[i], rObs);
  }

  for (let i = 0; i < pObs.length; i++) {
    pObs[i] = pObs[i].replace(',00', '');
  }  
  
  let totalXH = 0;
  for (let i = 0; i < pObs.length; i++) {
    $('table').html(`${$('table').html()}
      <tr id="head">
        <td>${pObs[i]}</td>
        <td>${h(pObs[i], rObs, true, true)}</td>
        <td>${f(h(pObs[i], rObs), pObs[i])}%</td>
        <td>${totalH2.toString().replace('.', ',')}</td>
        <td>${pretty(totalF)}%</td>
        <td>${pretty(nObs[i] * h(pObs[i], rObs))}</td>
      </tr>
    `);
    totalXH += (nObs[i] * h(pObs[i], rObs));
  }

  $('table').html(`${$('table').html()}
    <tr id="head">
      <th>I alt:</th>
      <td>${totalH}</td>
      <td>${pretty(totalF)}%</td>
      <td></td>
      <td></td>
      <td>${pretty(totalXH)}</td>
    </tr>
  `);

  $('#mindst').html(`Mindsteværdi: <b>${pObs[0]}</b>`);
  $('#largest').html(`Størsteværdi: <b>${pObs[pObs.length - 1]}</b>`);
  $('#vari').html(`Variationsbredde: <b>${pretty(nObs[nObs.length - 1] - nObs[0])}</b>`);
  $('#midl').html(`Middeltal: <b>${pretty(totalXH / totalH)}</b>`);

  if (typetalA.length === 1) {
    $('#typet').html(`Typetal: <b>${typetalA[0]}</b>`);
  } else if (typetalA.length === 2) {
    $('#typet').html(`Typetal: <b>${typetalA[0]} og ${typetalA[1]}</b>`)
  } else if (typetalA.length > 2) {
    let res = '';
    for (let i = 0; i < typetalA.length; i++) {
      if (i === 0) {
        res += typetalA[i];
      } else if (i === (typetalA.length - 1)) {
        res += ' og ' + typetalA[i];
      } else {
        res += ', ' + typetalA[i];
      }
    }
    $('#typet').html(`Typetal: <b>${res}</b>`);
  }

  $('#kvartilsaet').html(`Kvartilsæt: <b>${kvartilSet[0]}, ${kvartilSet[1]} og ${kvartilSet[2]}</b>`)

}
