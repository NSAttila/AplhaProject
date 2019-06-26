// The api for fetch
var viewsApi = "http://alpha.apexcode.ro/api/products";

// GET PRODUCTS
window.onload = fetchProducts();

function fetchProducts() {
fetch(`${viewsApi}`)
    .then(resp => resp.json())
.then(function(json) {
    // CREATE BUTTONS FOR "SELECT PRODUCT TYPE" DROPDOWN.
    document.getElementById('productsDropdown').innerHTML +=
       `<button onclick="typeSelected(this.value)" id="dropdownButton" class="dropdown-item" value="Food" type="button">Food</button>
       <button onclick="typeSelected(this.value)" id="dropdownButton" class="dropdown-item" value="NonFood" type="button">NonFood</button>
       <button onclick="typeSelected(this.value)" id="dropdownButton" class="dropdown-item" value="Services" type="button">Services</button>
       <button onclick="typeSelected('all')" class="dropdown-item"  type="button">All</button>`;
    
    //    Display all the product in the table
    for(let i = 0; i < json.length; i++){
        document.getElementById('productViews').innerHTML +=
        `<tr value="${json[i].Id}"><th scope=row> ${i} </th>
        <td onclick='getForEdit(this.id)' id="${json[i].Id}" class='hover' value="${json[i].Id}"> ${json[i].Name} </td>
        <td>${json[i].ProductType}</td>
        <td></td>
        <td>
        <a href=productEdit.html?id=${json[i].Id}&topic=secondary target=_blenk><button id=editProductButton_ value="${json[i].Id}" type=button class='btn btn-primary'>Edit</button></a>
        <button onclick="deleteProduct(this.value)" id="deleteProductButton_" value="${json[i].Id}" type=button class='btn btn-danger'>Delete</button></td></tr>`;  
    };
    return json.length;
});
} 

// DISPLAYING THE SELECT TYPE FROM THE DROPDOWN 
function typeSelected(selected_)
{
    var type = selected_; 
    console.log("id= ", selected_);
    fetch("http://alpha.apexcode.ro/api/products", {
        method: 'GET',
        // mode: 'no-cors'
    }).then(resp => resp.json())
    .then(function(json){
        document.getElementById('productViews').innerHTML = "";
        // if the selected type is all, then fetch all products again;  
        if (type === 'all'){
            for(let i = 0; i < json.length; i++){
                document.getElementById('productViews').innerHTML +=
                `<tr value="${json[i].Id}"><th scope=row> ${i} </th>
                <td onclick='getForEdit(this.id)' id="${json[i].Id}" class='hover' value="${json[i].Id}"> ${json[i].Name} </td>
                <td>${json[i].ProductType}</td>
                <td></td>
                <td>
                <a href=productEdit.html?id=${json[i].Id}&topic=secondary target=_blenk><button id=editProductButton_ value="${json[i].Id}" type=button class='btn btn-primary'>Edit</button></a>
                <button onclick="deleteProduct(this.value)" id="deleteProductButton_" value="${json[i].Id}" type=button class='btn btn-danger'>Delete</button></td></tr>`;  
            };
        }
        // fetch the selected type
        for(let i = 0; i < json.length; i++){
            if(type === json[i].ProductType) {
                document.getElementById('productViews').innerHTML +=
                `<tr value="${json[i].Id}"><th scope=row> ${i} </th>
                <td onclick='getForEdit(this.id)' id="${json[i].Id}" class='hover' value="${json[i].Id}"> ${json[i].Name} </td>
                <td>${json[i].ProductType}</td>
                <td></td>
                <td>
                <a href=productEdit.html?id=${json[i].Id}&topic=secondary target=_blenk><button id=addProductButton${json[i].Id} value="${json[i].Id}" type=button class='btn btn-primary'>Edit</button></a>
                <button onclick='deleteProduct(this.value)' id=deleteProductButton_ value="${json[i].Id}" type=button class='btn btn-danger'>Delete</button></td></tr>`;  
            };
        }
        return json.length;
    })
}

// filling out the input field with informations, from the selected product
function getForEdit(product_id) {
    var id = product_id;
    console.log("id= ", product_id);
    // alert(id, viewsApi);
    fetch("http://alpha.apexcode.ro/api/products/" + id, {
        method: 'GET',
        // mode: 'no-cors'
    }).then(resp => resp.json())
    //  recreating the input field, and giving it the selected Product datas; 
    .then(function(json){
        var name = document.getElementById('productName');
        // var type = document.getElementById('productType');
        var type = document.getElementById('inputGroupSelect02');
        type.value = `${json.ProductType}`;
        name.innerHTML = `<input id="productNameInput" type="text" class="form-control" placeholder="Product Name" value="${json.Name}">`;
        // type.innerHTML = `<input id="productTypeInput" type="text" class="form-control" placeholder="Product Name" value="${json.ProductType}">`;
        document.getElementById('addProductButton').value = `${json.Id}`;
        document.getElementById('updateProductButton').value = `${json.Id}`;
        document.getElementById('deleteProductButton').value = `${json.Id}`;
    });
};
       