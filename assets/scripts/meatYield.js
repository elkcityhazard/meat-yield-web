/************
 **Variables**
 *************/

const subPrimalName = document.getElementById('name');
const subPrimalAPC = document.getElementById('apc');
const subPrimalBaggedWeight = document.getElementById('baggedWeight');
const subPrimalNakedWeight = document.getElementById('nakedWeight');

const yieldToPrimalDiv = document.getElementById('yieldToPrimal');
const displayRetailValue = document.getElementById('displayRetailValue');
const displayMargin = document.getElementById('displayMargin');
let displayTotalCost = document.getElementById('totalCost');

const displayGrossRetail = document.getElementById('displayGrossRetail');
const displayNetRetail = document.getElementById('displayNetRetail');
const displayTotalCostTotal = document.getElementById('displayTotalCost');
const displayWasteWeight = document.getElementById('displayWasteWeight');
const displayTotalYield = document.getElementById('displayTotalYield');
const displayWasteDollars = document.getElementById('displayWasteDollars');
const displayExpectedMargin = document.getElementById('displayExpectedMargin');

let cutName = document.getElementById('cutName');
let cutWeight = document.getElementById('cutWeight');
let cutPrice = document.getElementById('cutPrice');
//let totalYield = document.getElementById('totalYield').textContent = '';

let cutList = new Array();
let cutListWeights = new Array();
let cutListYield = new Array();
let cutListMargin = new Array();
let allRetail = new Array();
let html;
let counter = 0;



/************
 **Functions**
 *************/



function calcNakedCost() {
  let apc = Number(subPrimalAPC.value);
  let naked = Number(subPrimalNakedWeight.value);
  let bagged = Number(subPrimalBaggedWeight.value);
  return parseFloat(apc) / (parseFloat(naked) / parseFloat(bagged));
}

function calcTotalCost() {
  let apc = Number(subPrimalAPC.value);
  let bagged = Number(subPrimalBaggedWeight.value);
  return parseFloat(apc * bagged).toFixed(2);
}

function yieldToPrimal() {
  let weights;
  let yield;
  weights = 0;
  for (let i = 0; i < cutList.length; i++) {
    weights = parseFloat(cutList[i].meatCutWeight);
  }

    yield = parseFloat(weights) / parseFloat(subPrimalNakedWeight.value);
    cutListYield.push(yield);
  return parseFloat(yield* 100);

}

function yieldToPrimalTotal() {
  let yield = cutListYield.reduce((a,b) => parseFloat(a) + parseFloat(b));
    Number(yield);
    return yield.toFixed(2);
}

function cutRetailValue() {
    let retail;
  let weight;
  let total;
  total = 0;
  for (let i = 0; i < cutList.length; i++) {
    weight = cutList[i].meatCutWeight;
    retail = cutList[i].meatCutPrice;
    total = parseFloat(weight) * parseFloat(retail);

  };
  return parseFloat(total.toFixed(2));
}

function retailValue() {
  let retail;
  let weight;
  let total;
  total = 0;
  for (let i = 0; i < cutList.length; i++) {
    weight = cutList[i].meatCutWeight;
    retail = cutList[i].meatCutPrice;
    total += parseFloat(weight) * parseFloat(retail);

  };
  return parseFloat(total.toFixed(2));

}

function calcMargin() {
  // gross profit / retail value
  let gross = retailValue() - calcTotalCost(subPrimalAPC.value, subPrimalBaggedWeight.value);
  return parseFloat(gross) / parseFloat(retailValue()) * 100;
}

function calcWaste() {
  return parseFloat(1 - yieldToPrimal()) * parseFloat(calcTotalCost(subPrimalAPC.value, subPrimalBaggedWeight.value));

}

function calcWasteWeight() {
    let naked = subPrimalNakedWeight.value;
    parseFloat(naked);
    let weights;
    weights = naked - (cutListWeights.reduce((a,b) => parseFloat(a) + parseFloat(b)));
    parseFloat(weights);
    return weights.toFixed(2);
}

function calcWasteDollars() {
    let dollars = calcWasteWeight() * calcNakedCost();
    parseFloat(dollars);
    return dollars.toFixed(2);
}

function netIncome() {
  let retail = retailValue();
  let cogs = calcTotalCost(subPrimalAPC.value, subPrimalBaggedWeight.value);
  parseFloat(retail);
  parseFloat(cogs);
  return Number(retail - cogs).toFixed(2);
}

function calcCutCost() {
  let value = calcNakedCost() * cutList[counter].meatCutWeight;
  parseFloat(value);
  return '$' + value.toFixed(2);
}

function calcCutMargin() {
  let revenue = cutList[counter].meatCutWeight * cutList[counter].meatCutPrice;
  let cost = cutList[counter].meatCutWeight * calcNakedCost();
  let gross = revenue - cost;
  let margin = gross / revenue;
  margin = margin * 100;
  parseFloat(margin);
    cutListMargin.push(margin);
  return margin.toFixed(2);
}

function calcTotalMargin() {
    let margin = parseFloat(netIncome()) / parseFloat(retailValue());
    return (margin * 100).toFixed(2);
}
/******************
 **Event Listeners**
 *******************/

if (window.innerWidth < 768 ) {
    alert('Phones and tablets are currently not supported.  I\'m working on it! ');
} else {

 // get the entered values from the sub primal and display them.
document.getElementById('primaryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = subPrimalName.value;
  const cost = subPrimalAPC.value;
  const bagged = subPrimalBaggedWeight.value;
  const naked = subPrimalNakedWeight.value;

  html = `
        <ul>
        <li>Name: ${name}</li>
        <li>Cost: ${cost}</li>
        <li>Bagged: ${bagged}</li>
        <li>Naked: ${naked}</li>
        </ul>
        `;

  document.querySelector('.primalList').innerHTML += html;

  //  Display Indivual Properties Of Subprimal
  document.getElementById('displayBaggedWeight').textContent = subPrimalBaggedWeight.value;
  document.getElementById('displayNakedWeight').textContent = subPrimalNakedWeight.value;
  document.getElementById('displayAPC').textContent = subPrimalAPC.value;
  document.getElementById('displayNakedCost').textContent = calcNakedCost().toFixed(2);


});

    //  event listener to get new cuts added

document.getElementById('secondaryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let name = document.getElementById('cutName').value;
  let weight = document.getElementById('cutWeight').value;
  let price = document.getElementById('cutPrice').value;

  //  create a meat cut object and store some properties
  let meatCut = {
    meatCutName: name,
    meatCutWeight: weight,
    meatCutPrice: price
  };


  //  Push Objects to cutList

  cutList.push(meatCut);

  //  create new table sets to display information
  let newTR = document.createElement('tr');
  newTR.setAttribute('id', 'startPosition-' + counter);
  document.querySelector('.tableData').appendChild(newTR);

  // display cut title and increment here
  let newTH = document.createElement('th');
  newTH.setAttribute('scope', 'row');
  newTH.setAttribute('id', 'cut-' + counter);
  let thText = document.createTextNode('Cut ' + (counter + 1) + ': ');
  newTH.appendChild(thText);
  let startPosition = document.querySelector('.tableData');
  startPosition.appendChild(newTH);

  //  display cut name
  let newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayName-' + counter);
  let textTD = document.createTextNode(meatCut.meatCutName);
  newTD.append(textTD);
  startPosition.appendChild(newTD);

  //  display cut price
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayPrice-' + counter);
  textTD = document.createTextNode(meatCut.meatCutPrice);
  newTD.append(textTD);
  newTD.textContent += '\/lb\.';
  startPosition.appendChild(newTD);

  //  display cut weight
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayWeight-' + counter);
  textTD = document.createTextNode(meatCut.meatCutWeight);
  newTD.append(textTD);
  newTD.textContent += ' lbs\.'
  startPosition.appendChild(newTD);
    cutListWeights.push(meatCut.meatCutWeight);

  //  display cut yield
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayYield-' + counter);
  textTD = document.createTextNode(yieldToPrimal().toFixed(2) + ' %');
  newTD.append(textTD);
  startPosition.appendChild(newTD);

  //display cost of cut
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayCostOfCut-' + counter);
  textTD = document.createTextNode(calcCutCost());
  newTD.append(textTD);
  startPosition.appendChild(newTD);

  //  display retail price of cut
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayRetailPrice-' + counter);
  newTD.textContent = '$'
  textTD = document.createTextNode(cutRetailValue().toFixed(2));
  newTD.append(textTD);
  allRetail.push(newTD.textContent);
  startPosition.appendChild(newTD);

  //  display cut margin
  newTD = document.createElement('td');
  newTD.setAttribute('id', 'displayCutMargin-' + counter);
  textTD = document.createTextNode(calcCutMargin() + ' %');
  newTD.append(textTD);
  startPosition.appendChild(newTD);
 cutName.value = '';
cutPrice.value = '';
 cutWeight.value = '';

  displayGrossRetail.textContent = '$' + retailValue();
    displayNetRetail.textContent =  '$' + netIncome();
    displayTotalCostTotal.textContent = '$' + calcTotalCost();
    displayWasteWeight.textContent = calcWasteWeight() + ' lbs\.';
    displayTotalYield.textContent = (yieldToPrimalTotal() * 100) + '%';
    displayWasteDollars.textContent = '$' + calcWasteDollars();
    displayExpectedMargin.textContent = calcTotalMargin() + '%';


  //  increment the counter
  counter++;
}
                                                          );

};
/************************************
 **Init Function At Bottom Baby :-) **
 *************************************/
