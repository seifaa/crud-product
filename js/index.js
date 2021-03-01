
var productNameRegex = /^[A-Z][a-z]{3,6}$/;
var productNameInp = document.getElementById("productNameInp");
var addBtn = document.getElementById("addBtn");
var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var updateIndex ;//undefind

addBtn.addEventListener("click" , function(){


    if(addBtn.innerHTML == "add")
    {
        addProduct();
    }
    else
    {
        updateProducts();
    }
})

function updateProducts()
{
    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value,
    }
    productsList[updateIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
    clearForm();

    addBtn.innerHTML ="add";

}



function validateProductName()
{
    if(productNameRegex.test(productNameInp.value) == true)
    {
        ///ragl kwys
        productNameInp.classList.add("is-valid");
        productNameInp.classList.remove("is-invalid");

        return true;
    }
    else
    {
        ////ragel w74
        productNameInp.classList.add("is-invalid");
        productNameInp.classList.remove("is-valid");
        return false;

    }
}

productNameInp.addEventListener("keyup" , validateProductName)


var productsList;//lma y3ml refresh hyfdaaa
if (localStorage.getItem("myProducts") == null)//zbon gdid malo4 7aga
{
    productsList = [];
}
else {
    productsList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
    //productList malyaan bel7aga bta3 embar7


}



























function addProduct() {



    if(validateProductName() == true )
    {
        var product =
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        productsList.push(product);//product dllwa2y w products embar7 
        localStorage.setItem("myProducts", JSON.stringify(productsList));
        displayProducts();
        clearForm();

    }
}





function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+ i + `</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td><button onclick='setData(`+i+`)'  class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}



function setData(index)
{
    updateIndex = index;//number
    //index => rakm el montag ely 3awz update
    productNameInp.value = productsList[index].name;
    productPriceInp.value = productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;

    addBtn.innerHTML ="update";

}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}


function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.includes(term) == true) {
            cartoona += `<tr>
                    <td>`+ i + `</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td><button class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
                   
                  </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}



function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
}



