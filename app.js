//Api's : 
const apiFake = "https://fakestoreapi.com/products";
const apiMine = "https://jsonblob.com/api/1097237461427568640";




const container = document.querySelector('.containerProducts');
const addCar = document.querySelector('.addCart');

const cartButton = document.querySelector('#search-btn');
const carrito = document.querySelector('#carrito');

const priceTotal = document.querySelector('.totalPriceCar');

const numberOfProducts = document.querySelector('#limitOfProducts');
console.log(numberOfProducts.value);
let limit = 20; 
//numberOfProducts.value;



let numberOfItemsToBuy = 0; 




var cart = [];

function addProductToCart (product){

    if (cart[product.id]){

        cart[product.id].quantify++;

    }else {

   cart[product.id] = {
    img : product.image,
    name : product.title,
    price : product.price,
    quantify : 1,
    id : product.id
   };
 }
}



cartButton.addEventListener('click',(event)=>{
    event.preventDefault();

    console.log(cart);

    //console.log(removeItem);
   
    carrito.scrollIntoView({behavior : "smooth"});

})



function getData(){

    fetch('https://fakestoreapi.com/products' +
    `?limit=${limit}`

    )
    .then(res => res.json())
    .then(data => {


        let info = data;

        console.log(data)

        //console.log(info[0]);

       
        let card = "" ; 

        data.forEach(element => {
            //console.log(element.image);

            let descriptionText = element.description;


                card += `
            <div class="product">

                <img src="${element.image}" />

                <div class="product--info">

                    <h2>${element.title}</h2>
                    <p>Description : ${descriptionText.slice(0,50) + '....'}</p>
                    <p class="rating"><span>${element.rating.rate}</span> <img src="https://cdn.iconscout.com/icon/free/png-256/star-bookmark-favorite-shape-rank-3-16006.png?f=avif&w=256" /> <span> Users : ${element.rating.count}</span></p>
                    <h3>Price : ${element.price} $ </h3>
                    <h4>Category : ${element.category}</h4>
                    
                </div>

                <button class="addCart" >Add to Cart</button>

            </div>
        
        `;
            
        })

        
        container.innerHTML=card;

        const addCarButton = document.querySelectorAll(".addCart");
        //console.log(addCarButton);


        addCarButton.forEach((button,index)=>{

            button.addEventListener("click",()=>{

                addProductToCart(info[index]); //anade el producto al arreglo de objetos del carrito, solo lo puedo ver yo es info que no se refleja HTML hasta despues de otras funciones
                addProductToPage(cart);
                getTotalToPay(cart);
                totalItemsCar();

               // console.log(index);
                //console.log("hola");
                //console.log(info[index]);

            });

        });
    });

   

}

numberOfProducts.addEventListener("change", ()=> {
    limit = numberOfProducts.value;
    console.log(limit);
    getData();


});



function addProductToPage(cartProducts){

    //console.log(cartProducts);
    const containerCar = document.querySelector('.car-items');
    let cardsitem = "";

    cartProducts.forEach(element=>{

        if (element.length !== 0) {     /////////////////////cambie esto y ya fuincionaba bien 

        let priceQtyItem = element.quantify*element.price;
        //console.log(priceQtyItem);
        //console.log(element);
        cardsitem += `
        <div class="carItemIndividual">
            <img src = "${element.img}"/>
            <h4>${element.name.slice(0,12)+ "..."}</h4>
            <p>Qty : ${element.quantify}</p>
            <h3>${priceQtyItem + " $"}</h3>
            <button id = "buttonRemove" value="${element.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
        }
    });

    containerCar.innerHTML = cardsitem; 

  
    const removeItem = document.querySelectorAll('#buttonRemove');
    //console.log(removeItem);
    //console.log(cart);

    removeItem.forEach((element,index,array)=> {
        //console.log(element); //show the button element Html
        //console.log(index);
        //console.log(cart);
        //console.log(element.value);
        console.log(array);  //array of buttons 

        element.addEventListener("click",(event)=> {
            //event.preventDefault();*/

            //Magic jeje xD
           /*var indexProduct = cart.findIndex(function (product) {

                if (product !== undefined) {
                    //console.log(product);
                    return product.id = element.value;
                }
                
            });
            console.log(indexProduct); */
            //const cartWithoutEmptys = cart.filter(Boolean);
            removeItemOfCar(cartProducts,element.value);
            //console.log(cart);
            //console.log('hola');
            element.parentElement.remove();
        });
    });
}
function getTotalToPay(cart){

     const priceToPay = document.querySelector('.totalPriceCar');

    //console.log(cart);
    let totalCar = 0;

    cart.forEach(element => {

        if (element.length !== 0) {  /////////////////cambie esto y ya funcionaba bien  

        let totalCElement = 0; 
        let quantifyC = 0;
        let priceC = 0;

        quantifyC = element.quantify;
        priceC = element.price;

        //console.log(quantifyC);
        //console.log(priceC);

        totalCElement = quantifyC * priceC;
        totalCar = totalCar + totalCElement;

        //console.log(totalCar);

        
        }


    });

    priceToPay.innerHTML = totalCar.toFixed(2) + " $";

}

function totalItemsCar(){
    
    numberOfItemsToBuy++;
    //console.log(numberOfItemsToBuy);

    const elements = document.querySelector('.elements-cart-span');
    //console.log(cart.length + "here");

    elements.innerHTML = numberOfItemsToBuy;

}


function removeItemOfCar (cartsent,index) {
    cartsent.splice(index,1, ""); //remove the element of the cart , but just the object, aslo we need figure out how eliminated the HTML element
    cart = cartsent;

    const containerCarProductsRemoving  = document.querySelector('.car-items');
    const productsCarRemoving = containerCarProductsRemoving.querySelectorAll('.carItemIndividual');

    //console.log(productsCarRemoving.length-1);

    if (productsCarRemoving.length-1 == 0) {
        cart = [];

    }

    if (cart.every(element => !element)){

        cart = [];
        //cart.splice(0,cart.length);

    }

    getTotalToPay(cart);

    console.log(cart);
    /*
    const containerCarTwo = document.querySelector('.car-items');

    let cardTwoNew = "";


    containerCarTwo.innerHTML = cardTwoNew;*/

    numberOfItemsToBuy--;
    const elements = document.querySelector('.elements-cart-span');
    //console.log(cart.length + "here");

    elements.innerHTML = numberOfItemsToBuy;
    
    
}




////////////////////////////////////////////////////////
/*function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    //ocultarCarrito();
}
/*

function ready(){
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
}

ready();
*/



   










