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

let cutName = document.getElementById('cutName');
let cutWeight = document.getElementById('cutWeight');
let cutPrice = document.getElementById('cutPrice');
//let totalYield = document.getElementById('totalYield').textContent = '';

let cutList = new Array();
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
    return parseFloat(apc * bagged);
}

function yieldToPrimal() {
    let weights;
    let yield;
    weights = 0;
     for (let i = 0; i < cutList.length; i++) {
         weights = parseFloat(cutList[i].meatCutWeight);
         yield = parseFloat(weights) / parseFloat(subPrimalNakedWeight.value);
     }
    return parseFloat(yield * 100);

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
  return parseFloat(1 - yieldToPrimal()) * parseFloat(calcTotalCost(subPrimalAPC.value, subPrimalBaggedWeight.value))
}

function calcWasteWeight() {
  let weight;
  weight = parseFloat(1 - yieldToPrimal()) * Number(subPrimalNakedWeight.value);
  return parseFloat(weight);
}

function grossIncome() {
    retail = retailValue();
    cogs = calcTotalCost(subPrimalAPC.value, subPrimalBaggedWeight.value);
    parseFloat(retail);
    parseFloat(cogs);
    return retail - cogs;
}
/******************
**Event Listeners**
*******************/


document.getElementById('primaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = subPrimalName.value;
    const cost = subPrimalAPC.value;
    const bagged = subPrimalBaggedWeight.value;
    const naked = subPrimalNakedWeight.value;

    html =`
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


document.getElementById('secondaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('cutName').value;
    let weight = document.getElementById('cutWeight').value;
    let price = document.getElementById('cutPrice').value;

    let meatCut = {
        meatCutName: name,
        meatCutWeight: weight,
        meatCutPrice: price
    };


    //  Push Objects to cutList

    cutList.push(meatCut);


    // for (let i = 0; i < cutList.length; i++) {

      let newTR = document.createElement('tr');
      newTR.setAttribute('id', 'startPosition-' + counter);
      document.querySelector('.tableData').appendChild(newTR);


    let newTH = document.createElement('th');
    newTH.setAttribute('scope', 'row');
    newTH.setAttribute('id', 'cut-' + counter);
    let thText = document.createTextNode('Cut ' + (counter + 1) + ': ');
    newTH.appendChild(thText);
    let startPosition = document.getElementById('startPosition-' + counter);
    startPosition.appendChild(newTH);

    let newTD = document.createElement('td');
    newTD.setAttribute('id', 'displayName-' + counter);
    let textTD = document.createTextNode(meatCut.meatCutName);
    newTD.append(textTD);
    startPosition.appendChild(newTD);

     newTD = document.createElement('td');
     newTD.setAttribute('id', 'displayPrice-' + counter);
     textTD = document.createTextNode(meatCut.meatCutPrice);
     newTD.append(textTD);
     startPosition.appendChild(newTD);

     newTD = document.createElement('td');
     newTD.setAttribute('id', 'displayWeight-' + counter);
     textTD = document.createTextNode(meatCut.meatCutWeight);
     newTD.append(textTD);
     startPosition.appendChild(newTD);

     newTD = document.createElement('td');
     newTD.setAttribute('id', 'displayYield-' + counter);
     textTD = document.createTextNode(yieldToPrimal().toFixed(2) + '%');
     newTD.append(textTD);
     startPosition.appendChild(newTD);

     newTD = document.createElement('td');
     newTD.setAttribute('id', 'displayCostOfCut-' + counter);
     textTD = document.createTextNode('TBD');
     newTD.append(textTD);
     startPosition.appendChild(newTD);

     newTD = document.createElement('td');
     newTD.setAttribute('id', 'displayRetailPrice-' + counter);
     textTD = document.createTextNode(retailValue().toFixed(2));
     newTD.append(textTD);
     startPosition.appendChild(newTD);
// }



    //document.querySelector('.cutList').innerHTML += cutHTML;
/*
    cutName.value = '';
    cutPrice.value = '';
    cutWeight.value = '';

    */
counter++;
});





/************************************
**Init Function At Bottom Baby :-) **
*************************************/
