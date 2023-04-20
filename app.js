//Api's : 
const apiFake = "https://fakestoreapi.com/products";
const apiMine = "https://jsonblob.com/api/1097237461427568640";




const container = document.querySelector('.containerProducts');
const addCar = document.querySelector('.addCart');

const cartButton = document.querySelector('#search-btn');
const carrito = document.querySelector('#carrito');

const priceTotal = document.querySelector('.totalPriceCar');

let numberOfItemsToBuy = 0; 




const cart = [];

function addProductToCart (product){

    if (cart[product.id]){

        cart[product.id].quantify++;

    }else {

   cart[product.id] = {
    img : product.image,
    name : product.title,
    price : product.price,
    quantify : 1
   };
 }
}



cartButton.addEventListener('click',(event)=>{
    event.preventDefault();

    console.log(cart);

    carrito.scrollIntoView({behavior : "smooth"});


})



function getData(){

    fetch(apiFake)
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

        addCarButton.forEach((button,index)=>{

            button.addEventListener("click",()=>{

                addProductToCart(info[index]);
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


getData();


function addProductToPage(cartProducts){

    //console.log(cartProducts);
    const containerCar = document.querySelector('.car-items');
    let cardsitem = "";

    cartProducts.forEach(element=>{
        let priceQtyItem = element.quantify*element.price;
        //console.log(priceQtyItem);
        cardsitem += `
        <div class="carItemIndividual">
            <img src = "${element.img}"/>
            <h4>${element.name.slice(0,12)+ "..."}</h4>
            <p>Qty : ${element.quantify}</p>
            <h3>${priceQtyItem + " $"}</h3>
        </div>
    `;
    });

    containerCar.innerHTML = cardsitem; 
}

function getTotalToPay(cart){

     const priceToPay = document.querySelector('.totalPriceCar');

    //console.log(cart);
    let totalCar = 0;

    cart.forEach(element => {

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

        



    });

    priceToPay.innerHTML = totalCar.toFixed(2) + " $";

}

function totalItemsCar(){
    
    numberOfItemsToBuy++;
    //console.log(numberOfItemsToBuy);

    const elements = document.querySelector('.elements-cart-span');

    elements.innerHTML = numberOfItemsToBuy;

    

}








