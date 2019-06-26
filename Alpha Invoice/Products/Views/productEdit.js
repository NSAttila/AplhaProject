class Products {
    constructor (Id, Name, ProductType ) {
        this.Id = Id;
        this.Name = Name;
        this.ProductType = ProductType;
    }
};
// //*The firs method to get the id;
// function qs() {
// var query, parms, i, pos, key, val, qsp;
// qsp = {};
// query = location.search.substring(1);   //Return the string after the '?';
// parms = query.split('&');   //Split the string where is the '&' mark
// for (i=parms.length-1; i>=0; i--) {
//    pos = parms[i].indexOf('=');     //Split each on the '=' to separate the name and the value
//    if (pos > 0) {
//       key = parms[i].substring(0,pos);
//       val = parms[i].substring(pos+1);
//       qsp[key] = val;
//       }
//    }
// console.log(parms);
//    return qsp[key];  //Return the value of the id
// }
// var parms = qs();    //the id from the URL
// console.log(parms);

// //*The secound method, it is actually shorter then the previus one.
window.onload = ()=>{
    var url = document.URL; //Get the url
    var query_string = url.split('?'); //split where the '?' (you get 2 string after splitting the url)
    var search_params = new URLSearchParams(query_string[1]); // Searching after parameters from the secound string
    id = search_params.get('id');   //The actual ID;
    console.log(id);
    productForEdit(id); 
    document.getElementById('updateProductButton').addEventListener('click', ()=>updateProduct(id));}

// Fetch the Pruduct information after the id
function productForEdit(id) {
    console.log(id);
    fetch("http://alpha.apexcode.ro/api/products/" + id, {
        method: 'GET',
    }).then(resp => resp.json())
    //  recreating the input field, and giving it the selected Product datas; 
    .then(function(json){
        document.getElementById('productInputName').value = `${json.Name}`;
        document.getElementById('inputGroupSelect02').value = `${json.ProductType}`;
        document.getElementById('updateProductButton').value = `${json.Id}`;
});};

// Update the selected Id/Product
function updateProduct(id) {
    var name = document.getElementById('productInputName').value;
    var type = document.getElementById('inputGroupSelect02').value;
    var id = id;
    
    var data = new Products(id, name, type);
    data = {
        Id: id, 
        Name: name, 
        ProductType: type 
    } 
    fetch('http://alpha.apexcode.ro/api/products/' + id, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(function(response){
        if (!response.ok) {
            throw new Error('Bad status code from server.');
          }
        return response.json();
    }).catch(error => console.error(error))
}

    // Hideing the alert 
    function displayNone(id){
        document.getElementById(id).style.display = 'none';
        console.log(id);
      }
    // Showing the alert 
      var b = document.getElementById('updateProductButton').addEventListener('click', ()=>{
        document.getElementById('alertIsNotDisplayedYet').style.display = 'block';
      })


