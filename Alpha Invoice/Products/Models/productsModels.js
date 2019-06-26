var modelsApi = "http://alpha.apexcode.ro/api/products";
// Product CLASS
class Products {
    constructor (Id, Name, ProductType ) {
        this.Id = Id;
        this.Name = Name;
        this.ProductType = ProductType;
    }
};

// ADD NEW PRODUCT
function addProduct (event) {
    // addButton = event.target.value;
    var name = document.querySelector('#productNameInput').value; //select with querySelector  
    var type = document.getElementById('inputGroupSelect02').value;
    // var type = document.getElementById('productTypeInput').value; //select with getElementById
    var id = 0;
    var data = new Products(id, name, type);
    data = {
        Id: id, 
        Name: name, 
        ProductType: type 
    } 
    // console.log(data);
    fetch('http://alpha.apexcode.ro/api/products', { 
    method: 'POST',
    // mode: 'no-cors',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
}).then(function(response){
    if (!response.ok) {
        throw new Error('Bad status code from server.');
    }
    return response.json();
})
.then(function(json) {
    // console.log(`id= ${json.id}`)
    // All the element deleted from the table and the dropdown 
    document.getElementById('productsDropdown').innerHTML = "";
    document.getElementById('productViews').innerHTML = "";
    // Call the 'fetchProduct' function to fill the table with the new product too.
    fetchProducts(); 
    // console.log('Product Name ', data.Name);
    })
  .catch(error => console.error(error))
}
   

//  UPDATE PRODUCT
function updateProduct(productId) {
    var name = document.getElementById('productNameInput').value;
    var type = document.getElementById('inputGroupSelect02').value;

    // var type = document.getElementById('productTypeInput').value;
    var id = productId;
    
    var data = new Products(id, name, type);
    data = {
        Id: id, 
        Name: name, 
        ProductType: type 
    } 
    console.log('id=', id);
    fetch('http://alpha.apexcode.ro/api/products/' + id, {
        method: 'PUT',
        // mode: 'no-cors',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(function(response){
        if (!response.ok) {
            throw new Error('Bad status code from server.');
          }
        return response.json();
    }).then(function() {
        document.getElementById('productsDropdown').innerHTML = "";
        document.getElementById('productViews').innerHTML = "";
        fetchProducts();    
    }).catch(error => console.error(error))
}


// Delete product
function deleteProduct(clicked_id) {
    var id = clicked_id;
    console.log(id);
fetch('http://alpha.apexcode.ro/api/products/' + id, {
    method: 'DELETE',
    // mode: 'no-cors'
    }).then(function(response){
        if (!response.ok) {
            throw new Error('Bad status code from server.');
          }
        return response.json();
    }).then(function() {
        var productDelete = document.querySelector('#productViews [value="'+id+'"]');
        var linkproductDelete = productDelete.parentNode;
        linkproductDelete.removeChild(productDelete);
        
        // document.querySelector('tr [value="'+id+'"]').innerHTML = "";
        // document.getElementById('productsDropdown').innerHTML = "";
        // document.getElementById('productViews').innerHTML = "";
        // fetchProducts(); 
    }).catch(error => console.error(error))  
};

const load = () => {
    console.log("load event detected!");
  } 

document.getElementById('addProductButton').addEventListener('click', function (){
    addProduct();
});
document.getElementById('updateProductButton').addEventListener('click', function (){
    updateProduct(this.value);
});
document.getElementById('deleteProductButton', 'deleteProductButton_').addEventListener('click', function (){
    deleteProduct(this.value);
});
