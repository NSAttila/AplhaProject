class Customers {
  constructor(name, cui, id) {
    this.name = name;
    this.cui = cui;
    this.id = id;
  };
  id = function () {
    return Math.floor(Math.random() * 100000);
  };
};

function getCustomers() {
  fetch("http://alpha.apexcode.ro/api/customers")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {

      //aici iteram fiecare post si adaugam pe DOM
      for (var i = 0; i < json.length; i++) {
        document.getElementById("customerViews").innerHTML +=
          `<td>${json[i].Name}</td>` +
          `<td>${json[i].CUI}</td>` +
          `<td  colspan="2" style="text-align:center">
        <a href=edit.html target=_blank><button type="button" class="btn btn-primary px-2" id="${json[i].Id} value='${json[i].Id}"> Edit </button></a>
        <button  onclick="deleteCustomer(this.id)" type="button" class="btn btn-primary px-2 deleteButtonC" id="${json[i].Id}" value='${json[i].Id}'> Delete </button> 
       
        
        </td>`
      }

    });
}
getCustomers();
