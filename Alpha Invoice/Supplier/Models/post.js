//POST method
Supplier.prototype.addData = function () {
    var name = document.getElementById("supplierName").value;
    var cui = document.getElementById("supplierCui").value;

    var data = {
        Name: name,
        CUI: cui,
    }
    fetch("http://alpha.apexcode.ro/api/suppliers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(function(data) {
        document.getElementById("supplierItems").innerHTML +=
        `<tr>` +
        `<td value=${data.Id}>"NEW!"</td>` +
        `<td>${data.Name}</td>` +
        `<td>${data.CUI}</td>` +
        `<td> <a href="supplierEdit.html?supplierId=${data.Id}" target="_blank"><button type="button" class="btn btn-primary px-2" >Edit Supplier </a>
        </td>` +
        `</tr>`
        })
        .catch(function (status, error) {
            console.log(status + " " + error)
        });


}

document.getElementById("addSupplier").addEventListener("click", function () {
    const add = new Supplier();
    add.addData();
});
