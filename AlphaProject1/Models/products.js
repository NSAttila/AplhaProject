const alphaApi = "http://alpha.apexcode.ro/api";

// Get the products
fetch(alphaApi + "/products")
.then(resp => resp.json())
.then(function(json) {
    for(let i = 0; i < json.length; i++){
        document.getElementById('products_').innerHTML +=
        "<tr value='" + json[i].Id + "'><th scope='row'>" + i + "</th><td>" + json[i].Name + "</td><td>" + json[i].Type +
         "<td></td><td></td>"
         +"</td><td><button id='addProductButton' value='" + json[i].Id + "' type='button' class='btn btn-primary'>Add</button>"+
         "<button id='updateProductButton' value='" + json[i].Id + "' type='button' class='btn btn-warning'>Update</button>"+
         "<button id='deleteProductButton' value='" + json[i].Id + "' type='button' class='btn btn-danger'>Delete</button></td></tr>";
    }
})

//Add new product
function addProduct () {
    let title = document.getElementById('prodName').value;
    let type = document.getElementById('prodType').value
    let id =  function () {
                return Math.floor(Math.random() * 100000);
        } 
    var data = {
    Id: id, 
    Name: title,
    Type: type 
} 

fetch(alphaApi + '/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Conten-Type': 'application/json'
    }
}).then(function(res) {
    return res.json();
}).then(function(datas) {
    console.log('now ', datas);
          document.getElementById('products_').innerHTML +=
        "<tr value='" + json[i].Id + "'><th scope='row'>" + i + "</th><td>" + json[i].Name + "</td><td>" + json[i].Type +
         "<td></td><td></td>"
         +"</td><td><button id='addProductButton' value='" + json[i].Id + "' type='button' class='btn btn-primary'>Add</button>"+
         "<button id='updateProductButton' value='" + json[i].Id + "' type='button' class='btn btn-warning'>Update</button>"+
         "<button id='deleteProductButton' value='" + json[i].Id + "' type='button' class='btn btn-danger'>Delete</button></td></tr>";
   
})
}

//update Product
function updateProduct() {
    var title = document.getElementById('prodName');
    var type = document.getElementById('prodType');
    var id = document.getElementById('products_');
    
    var data = {
        Name: title,
        Type: type,
        Id: id,    
    }

    fetch(alphaApi + '/products/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        return res.json();
    }).then(function(datas) {
       // var selectProduct = document.querySelector('#products_[value="'+id+'"]');
        // selectProduct.innerHTML = datas.Name;
        // document.getElementById('prodname').innerHTML = datas.Name;
        // document.getElementById('prodtype').innerHTML = datas.Type;

    })
}

// Delete product
function deleteProduct() {
    var id = document.getElementById('deleteProductButton').value;
    
    fetch(alphaApi + '/products/' + id, {
        method: 'DELETE'
    }).then(function(response){
        return response.json();
    }).then(function() {
        var productDelete = document.querySelector('#products_[value="'+id+'"]');
        productDelete.parentNode.removeChild(productDelete);
    })
}
    
// window.onload = function() {
    var add = document.getElementById('addProductButton', 'addProductButton_');
    var update = document.getElementById('updateProductButton');
    var del = document.getElementById('deleteProductButton');

    if(add){

        add.addEventListener('click', function() {
            addProduct(); 
        });
    }
    if(update) {

        update.addEventListener('click', function() {
            updateProduct(); 
        });
    }
    if(del) {

        del.addEventListener('click', function() {
            deleteProduct();
        });
    }
        // }







