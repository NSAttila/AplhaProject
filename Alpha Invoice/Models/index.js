const state = {
    invCustomerId: 0,
    invSupplierId: 0,
    invProducts: [],
    tempProdId: 0,
    tempProdName: '',
    nrCrt: 1,
    totalPrice: 0,
    id: 1,
    createdInvID: 0,
};
 const getInvoiceID = () => (
    Math.floor(Math.random() * 1000)
 );

    const prodTypeBtn =document.getElementById('prodTypeBtn');
    const selectedProduct =document.getElementById('selectedProduct');
    const prodSelected = document.querySelector('.SelectedProduct')
    const prodToInvoice = document.querySelector('.prodToInvoice');
    const prodPrice = document.getElementById('ProdPrice');
    const prodQty = document.getElementById('ProdQty');
    const prodVal = document.getElementById('ProdVal');
    const table = document.getElementById('table');
    const grandTotal = document.getElementById('grandTotal');
    const showGrandTotal = document.getElementById('showGrandTotal');
    const invoiceSeries = document.getElementById('invoiceSeries');
    const invoiceNumber = document.getElementById('invoiceNumber');
    const invoiceDate = document.getElementById('invoiceDate');

window.onload = function (){
    const getCustomers = () => {
        fetch('http://alpha.apexcode.ro/api/customers/')
        .then((data) => {return data.json()})
        .then((data) => {
        data.forEach((element) => {
        const customers = document.querySelector('.customersList');
        customers.innerHTML += `<option class="dropdown-item" value="${element.Id}">${element.Name}</option>`;
            });
        }).catch((e) =>{console.log(e)})
    };
    const getSuppliers = () => {
        fetch('http://alpha.apexcode.ro/api/suppliers/')
        .then((data) => {return data.json()})
        .then((data) => {
        data.forEach((element) => {
        const suppliers = document.getElementById('suppliersList');
        suppliers.innerHTML += `<option class="dropdown-item" value="${element.Id}">${element.Name}</option>`;
            });
        })
    }
    const getProducts = () => {
    fetch('http://alpha.apexcode.ro/api/products')
    .then((data) => {return data.json()})
    .then((data) => {
        data.forEach((element) => {
            selectedProduct.innerHTML += `<option class="mb-2 border-bottom-0 SelectedProduct" value='${element.Name},${element.Id}'  data-prdtype=${element.ProductType}>${element.Name}</option>`;
            prodTypeBtn.innerHTML += `<option class="mb-2 border-bottom-0" data-id=${element.Id} data-name=${element.Name} data-prdtype=${element.ProductType}>${element.ProductType}</option>`;
        })
    }).catch((e) =>{console.log(e)})
    }

    getProducts();
    getSuppliers();
    getCustomers();
}

// Getting the selected customer ID
const customers = document.querySelector('.customersList');
customers.addEventListener('change', function(event) {
    selCustomer = event.target.value;
    fetch(`http://alpha.apexcode.ro/api/customers/${selCustomer}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
    state.invCustomerId = data.Id
    const customerCUI = document.querySelector('.customerCUI');
    customerCUI.innerHTML = data.CUI;
    })
})
// Getting the supplier customer ID
const suppliers = document.querySelector('.suppliersList');
suppliers.addEventListener('change', function(event) {
    selSupplier = event.target.value;
    fetch(`http://alpha.apexcode.ro/api/suppliers/${selSupplier}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
    state.invSupplierId = data.Id

    const supplierCUI = document.querySelector('.supplierCUI');
    supplierCUI.innerHTML = data.CUI;
    })
})
selectedProduct.addEventListener('change', (event) => {
    state.tempProdName = event.target.value.split(',')[0];
    state.tempProdId = event.target.value.split(',')[1];
})
prodToInvoice.addEventListener('click', (event) => {
    product = {
        selProduct: state.tempProdName,
        prodId: state.id,
        prodType: prodTypeBtn.value,
        prodPrice: prodPrice.value,
        prodQty: prodQty.value,
        prodVal: prodPrice.value * prodQty.value,
    }
    state.invProducts.push(product);
    state.id = state.id + 1
        markup =`
        <tr>
          <th scope="row">${state.nrCrt}</th>
          <td><h5>${product.selProduct}</h5></td>
          <td><p>${product.prodType}</p></td>
          <td><p>${product.prodPrice} RON</p></td>
          <td><p>${product.prodQty}</p></td>
          <td><p>${product.prodVal} RON</p></td>
        </tr>`;
        table.insertAdjacentHTML('beforeend', markup)
        state.nrCrt += 1;  
      
});

grandTotal.addEventListener('click', (event) => {
    const theTotal =  state.invProducts.forEach(el => {
          let total = 0;
          state.totalPrice += el.prodVal;

          return total
      })
      showGrandTotal.innerHTML += `
      <div class='bg-success col-lg-5 d-inline-block'>
        <h5>The grand total of this invoice is : <strong>${state.totalPrice}</strong></h5>
      </div>
      <div class='d-flex flex-row-reverse pb-5'>
      <button class='btn btn-primary btn-lg' id='SaveInv'>Save Invoice</button>
      </div>
      `
    //   grandTotal.setAttribute('disable',true);
    const saveInv = document.getElementById('SaveInv');
    saveInv.addEventListener('click', () => {
        let invoiceData;
        invoiceData = {
            CustomerId: state.invCustomerId,
            SupplierId: state.invSupplierId,
            Date: invoiceDate.value,
            Number: invoiceNumber.value,
            Series: invoiceSeries.value,
            // items
    }
    fetch('http://alpha.apexcode.ro/api/invoices/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(invoiceData)
        }).then(() => {
    fetch('http://alpha.apexcode.ro/api/invoices/')
       .then(data => data.json())
       .then(data => {
        console.log(data[data.length-1].Id);
        state.createdInvID = data[data.length-1].Id
       }).
       then((data) => {
    const items = state.invProducts.map(product => {
            const prodVAT = (state) => {
                if(product.prodType == 'NonFood') {
                    return 19
                };
                if(product.prodType == 'Food') {
                    return 9
                };
                if(product.prodType == 'Services') {
                    return 5
                }
                return 19
            }
            return (
               x = {
                Id: product.prodId,
                ProductId: product.prodId,
                Quantity: product.prodQty,
                Price: product.prodPrice,
                VAT: prodVAT(state),
                InvoiceID: state.createdInvID,
                Product: {
                     Id: product.prodId,
                     Name: product.selProduct,
                     ProductType: product.prodType
                }
            }
            )
    });
    items.forEach((item) => {
        console.log(item)
        fetch(`http://alpha.apexcode.ro/api/invoices/${state.createdInvID}/items/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
            }).then((response) =>(console.log(response)))
        })
      })   
    });
});
})
