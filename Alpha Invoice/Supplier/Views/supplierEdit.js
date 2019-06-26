window.onload = function () {
    const supplier = new Supplier();
    const id = getUrlParameter("supplierId");

    supplier.fetchData(id)
        .then(function () {
            document.getElementById("supplierEditName").value = supplier.Name;
            document.getElementById("supplierEditCui").value = supplier.CUI;
            document.getElementById("supplierID").value = supplier.Id;

        })
        .catch(function (e) {
            alert('fetch error' + e.status);
        });
} 

document.getElementById("editSupplier").addEventListener("click", function (event) {
    var id = document.getElementById("supplierID").value;
    const name = document.getElementById("supplierEditName").value;
    const cui = document.getElementById("supplierEditCui").value;

    var data = {
        Id: id,
        Name: name,
        CUI: cui,
    }

    return fetch("http://alpha.apexcode.ro/api/suppliers/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .catch(function (status, error) {
            console.log(status + " " + error);

        });
})

document.getElementById("deleteSupplier").addEventListener("click", function () {
    const id = document.getElementById("supplierID").value;
    return fetch("http://alpha.apexcode.ro/api/suppliers/" + id, {
        method: "DELETE",
    })
        .catch(function (status, error) {
            console.log(status + " " + error);

        })
})

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

document.getElementById("deletedSupplier").addEventListener("click", function () {
    window.close ();
})
// ALERT PART
 // Hideing the alert 
 function displayNone(id){
    document.getElementById(id).style.display = 'none';
    console.log(id);
  }
// Showing the alert 
  var b = document.getElementById('editSupplier').addEventListener('click', ()=>{
    document.getElementById('alertIsNotDisplayedYet').style.display = 'block';
  })

   // Hideing the alert 
 function displayNone(id){
    document.getElementById(id).style.display = 'none';
    console.log(id);
  }
// Showing the alert 
  var b = document.getElementById('deleteSupplier').addEventListener('click', ()=>{
    document.getElementById('alertIsNotDisplayedYet2').style.display = 'block';
  })

