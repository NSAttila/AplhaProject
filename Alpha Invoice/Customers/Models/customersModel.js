const alphaApi = "http://alpha.apexcode.ro/api";

//Add new customer
function addCustomers() {
    //am luat valorile de pe INPUT
    let name = document.getElementById('custName').value;
    let code = document.getElementById('custCode').value

    //construim obiectele cu datele din DOM

    var data = {
        Id : 0,
        Name: name,
        CUI: code,
    }
    fetch(alphaApi + '/customers', {
        method: 'POST',
        body: JSON.stringify(data), //data am facut string din obiect json
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    }).then(function (datas) {
        console.log('now ', datas);
        document.getElementById('tableCustomers').innerHTML +=
        `<td>${datas.Name}</td>` +
        `<td>${datas.CUI}</td>` +
        `<td  colspan="2" style="text-align:center">
      <a href=edit.html target=_blank><button type="button" class="btn btn-primary px-2" id="${datas.Id} value='${datas.Id}"> Edit </button> 
      <button  type="button" class="btn btn-primary px-2" id="${datas.Id}" value='${datas.Id}'> Delete </button> 
       
      </td>`
    })
   
}
// am prins butonul si am adaugat la click sa apeleze functia addCustomer
document.getElementById('inputAddCust').addEventListener('click', function () {
    addCustomers();
})


//Delete Customer
function deleteCustomer(o_id) {
    var id = o_id;
   alert("Delete this Customer?");

    fetch(alphaApi + "/customers/" + id, {
        method: "DELETE"
    }).then(function (resp) {
        return resp.json();
    }).then(function() {
        var customerDelete = document.querySelector('#customerViews[value="'+id+'"]');
        customerDelete.parentNode.removeChild(customerDelete);
    }).catch(error => console.error(error))

}

