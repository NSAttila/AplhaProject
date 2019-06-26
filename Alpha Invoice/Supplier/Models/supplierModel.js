// GET BY ID Method
class Supplier {
    constructor() {
        this.Id = "";
        this.Name = "";
        this.CUI = ""; 
    } 
    Id = function () {
        return Math.floor(Math.random() * 100000)
    };
    async fetchData(Id) {
        const that = this;
        try {
            const response = await fetch("http://alpha.apexcode.ro/api/suppliers/" + Id, {
                method: "GET"
            });
            const supplier = await response.json();
            that.Id = supplier.Id;
            that.Name = supplier.Name;
            that.CUI = supplier.CUI;
        }
        catch (e) {
            alert('fetch error: ' + e);
        }
    }
}


//GET ALL Method
class Suppliers {
    constructor() {
        this.list = [];
    }
    async fetchData() {
        const th = this;
        try {
            const response = await fetch("http://alpha.apexcode.ro/api/suppliers", {
                method: "GET"
            });
            const suppliers = await response.json();
            for (var i = 0; i < suppliers.length; i++) {
                var supplier = suppliers[i];
                var supplierModel = new Supplier();
                supplierModel.Id = supplier.Id;
                supplierModel.Name = supplier.Name;
                supplierModel.CUI = supplier.CUI;
                th.list.push(supplierModel);
            }
        }
        catch (e) {
            alert('fetch error: ' + e);
        }
    }
}

window.onblur= function() {window.onfocus= function () {location.reload(true)}};
