/************
**Variables**
*************/


const subPrimalName = document.getElementById('name');
const subPrimalAPC = document.getElementById('apc');
const subPrimalBaggedWeight = document.getElementById('baggedWeight');
const subPrimalNakedWeight = document.getElementById('nakedWeight');

let cutName = document.getElementById('cutName');
let cutWeight = document.getElementById('cutWeight');
let cutPrice = document.getElementById('cutPrice');

let cutList = new Array();
let html;


/************
**Functions**
*************/

init();

function calcNakedCost(apc, naked, bagged) {
    return parseFloat(apc) / (parseFloat(naked) / parseFloat(bagged));
}

function calcTotalCost(apc, bagged) {
    return parseFloat(apc) * parseFloat(bagged);
}

function yieldToPrimal() {
    let weights;
    let yield;
    weights = 0;
     for (let i = 0; i < cutList.length; i++) {
         weights += parseFloat(cutList[i].meatCutWeight);
         yield = parseFloat(weights) / parseFloat(subPrimalBaggedWeight.value);
     }
    return parseFloat(yield);
    console.log('The Yield To Primal is: ' + parseFloat(yieldToPrimal()));
    
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
    return total.toFixed(2);
    
}

function costOfCut() {
    
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
    
    document.querySelector('.three').innerHTML += html;
    console.log('naked cost: ' + calcNakedCost(cost, naked, bagged).toFixed(2));
    
    console.log('Primal Total Cost: ' + calcTotalCost(cost, bagged).toFixed(2));
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
    
    cutList.push(meatCut);
    console.log(cutList);
    document.querySelector('.yieldToPrimal').textContent = (yieldToPrimal() * 100).toFixed(2) + '\%';
    console.log('The Yield To Primal is: ' + (yieldToPrimal() * 100).toFixed(2) + '\%');
    
    console.log('The Total Retail Value Of All Cuts: $' + retailValue());
    document.querySelector('.displayRetailValue').textContent = 'Total Retail Value: $' + retailValue();
    
    for (let i = 0; i < cutList.length; i++) {
    cutHTML =  `
            <ul>
            <li>Cut Name: ${cutList[i].meatCutName}</li>
            <li>Cut Weight: ${cutList[i].meatCutWeight}</li>
            <li>Cut Price: ${cutList[i].meatCutPrice}</li>
            </ul>

            `;
    };
    
    document.querySelector('.cutList').innerHTML += cutHTML;
    
    cutName.value = '';
    cutPrice.value = '';
    cutWeight.value = '';
})




function init() {
    document.querySelector('.yieldToPrimal').textContent = '';
}
