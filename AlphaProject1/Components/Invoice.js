

class Invoice {
    id = () => {
        return Math.floor(Math.random() * 100000);
    }
    series = () => {
        let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letter = a[Math.floor(Math.random() * a.length)];
    }
    let i= 0;
    number = () => {
        i++;
        return i;
    }
    date = () => { return Date.now();}
    supplierId = 0;
    costumerId = 0;
}


//var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//let A = alph[Math.floor(Math.random() * alph.length)];

// var ar = ['a','b','c','d','e'];
// var i= ar[Math.floor(Math.random() * 4)];
// console.log(i);console.log(getRandomInt(3));


// let r = Math.random().toString(36).substring(2, 3);
// console.log("random", r);

// document.addEventListener('DOMContentLoaded', function() {
// document.querySelector('button').onclick = Invoice.series;
// document.querySelector('#counter').innerHTML = "sadas";
// });