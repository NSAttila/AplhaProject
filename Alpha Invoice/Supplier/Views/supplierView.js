//Renders data from database on table

var suppliers = new Suppliers();

suppliers.fetchData()
    .then(function () {
        for (var i = 0; i < suppliers.list.length; i++) {
            //Renders data on the table   
            document.getElementById("supplierItems").innerHTML +=
                `<tr>` +
                `<td value=${suppliers.list[i].Id}> ${i} </td>` +
                `<td>${suppliers.list[i].Name}</td>` +
                `<td>${suppliers.list[i].CUI}</td>` +
                `<td> 
                <a href="supplierEdit.html?supplierId=${suppliers.list[i].Id}" target="_blank"><button type="button"  id="editSupplierButton_" class="btn btn-primary" >Edit Supplier </a>
                </td>` +
                `</tr>`
        }
    }) 
