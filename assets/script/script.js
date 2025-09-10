


// Spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// Categories

const category = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};


const displayCategories = (titles) => {
    const categoryContainer = document.getElementById("categories-container");
    // console.log(titles);
    for(let element of titles){
        // console.log(element.category_name);
        const elementCreate = document.createElement("div");
        elementCreate.innerHTML = `
            <ul class="categories-container"> 
                <li id="${element.id}" class="btn category-btn bg-transparent border-none text-[18px] mt-3 hover:bg-[#15803D] hover:text-white w-full rounded-lg">${element.category_name}</li>
            </ul>
        `;
        categoryContainer.appendChild(elementCreate);

    };
    categoryContainer.addEventListener("click", (event) => {
        const allCategoryBtn = document.querySelectorAll(".category-btn");
        // console.log(allCategoryBtn);
        allCategoryBtn.forEach(btn => {
            btn.classList.remove("bg-[#15803D]")
            btn.classList.add("bg-transparent")
            btn.classList.remove("text-white")
        })
        // allCategoryBtn.classList.remove("bg-[#15803D]")

        if(event.target.localName === "li"){
            // console.log(event.target.id);
            event.target.classList.remove("bg-transparent")
            event.target.classList.add("text-white")
            event.target.classList.add("bg-[#15803D]")
            loadPlantsByCategory(event.target.id)
        }
    })
    
};









// CategoriesByCards 
const loadPlantsByCategory = (categoryId) =>{
    // console.log(categoryId);
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        displayCategoriesByPlants(data.plants);
    })
    .catch(err => {
        console.log(err);
    })
}


const displayCategoriesByPlants = (plants) =>{
    const cardsContainer = document.getElementById("card-container");
    
    // console.log(plants[2]);
    cardsContainer.innerHTML = "";
    for(element of plants){
        // console.log(element.id);
        
        const elementCreate = document.createElement("div");
        
        // const description = document.getElementById("description-text");
        
        elementCreate.innerHTML = `
            <div class="card bg-base-100 w-80 shadow-lg h-[470px] mt-5">
                <figure>
                    <img class="" src="${element.image}" alt="">
                </figure>
                <div class="card-body">
                    <h2 id="" class="card-title">${element.name}</h2>
                    <p id="description-text">${element.description}</p>
                </div>
                <div class="flex justify-between mx-5">
                    <button class="btn  bg-[#DCFCE7] text-[#15803D] px-4 py-2 font-semibold rounded-3xl cursor-pointer plants-category-btn " onclick="loadPlantsDetail(${element.id})">${element.category}</button>
                    <p class="font-bold">৳ <span class="plant-price">${element.price}</span></p>
                </div>
                <button id="${element.id}" class="btn card-btn bg-[#15803D] text-white rounded-3xl mt-3 mx-5 mb-4">Add to Cart</button>
            </div>
                            
                            `;
        cardsContainer.appendChild(elementCreate);
    }
    
    
}
// manageSpinner(false);


category();




// All cards
const cards = () => {
    
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayImg(data.plants));
    
};

const displayImg = (plants) => {
    const cardsContainer = document.getElementById("card-container");
    
    
  for (let plant of plants) {
      const elementCreate = document.createElement("div");
      
      
      // const description = document.getElementById("description-text");
      
      elementCreate.innerHTML = `
      <div class="card bg-base-100 w-80 shadow-lg h-[470px] mt-5">
        <figure>
            <img class="" src="${plant.image}" alt="">
        </figure>
        <div class="card-body">
            <h2 id="" class="card-title">${plant.name}</h2>
            <p id="description-text">${plant.description}</p>
        </div>
        <div class="flex justify-between mx-5">
            <button class="btn  bg-[#DCFCE7] text-[#15803D] px-4 py-2 font-semibold rounded-3xl cursor-pointer plants-category-btn " onclick="loadPlantsDetail(${plant.id})">${plant.category}</button>
            <p class="font-bold">৳ <span class="plant-price">${plant.price}</span></p>
        </div>
        <button id="cart-btn-${plant.id}" class="btn card-btn bg-[#15803D] text-white rounded-3xl mt-3 mx-5 mb-4">Add to Cart</button>
      </div>
      
      `;
      
      cardsContainer.appendChild(elementCreate);
  }
  
  
  
  
};


cards();




const loadPlantsDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then(res => res.json())
  .then(data => displayPlantsDetails(data.plants))
  
};

const displayPlantsDetails = (plant) => {
//   console.log(plant);
  const detailsBox = document.getElementById("details-container");
  
  detailsBox.innerHTML = `
        <div class="p-2">
            <h3 class="text-lg font-bold ">${plant.category}</h3>
            <img src="${plant.image}" class="rounded-xl mb-4 max-w-[350px]" alt="">
            <h1>Category: <span class="font-bold mt-3">${plant.name}</span></h1>
            <p class="font-bold mt-4">৳ <span class="plant-price ">${plant.price}</span></p>
            <p id="description-text" class="mt-2">${plant.description}</p>
        </div>
    `;
  document.getElementById("plant_modal").showModal();
};








// Add To Cart Button
document.getElementById("card-container").addEventListener("click", (event) => {
    if(event.target.localName === "button"){
        const card = event.target.closest(".card");
        const name = card.querySelector(".card-title").innerText;
        const price = Number(card.querySelector(".plant-price").innerText)
        const btnId = event.target.id
        const cardBtnId = document.getElementById(btnId)
        const buttonId = btnId.split("-")[btnId.split("-").length-1];
        
        
        fetch(`https://openapi.programming-hero.com/api/plant/${buttonId}`)
        .then(res => res.json())
        .then(data => loadDisplayCart(data.plants))

        const loadDisplayCart = (details) => {
            const cartContainer = document.getElementById("cart-container");
            
            alert(`${details.name} has been added to the cart...`)
            // create Element
            const createElement = document.createElement("div");
            createElement.className = "cart"

            createElement.innerHTML = `
            <div class=" bg-[#F0FDF4] p-4 rounded-xl flex justify-between items-center mt-5 ">
                <div class="mr-14 ">
                    <h3 id="cart-title" class="font-semibold text-[16px]">${details.name}</h3>
                    <p class="text-gray-500 mt-2">৳ 
                    <span id="cart-price">${details.price}</span>
                    <span>X</span>
                    <span>1</span>
                    </p>
                </div>
                <div>
                    <i id="cart-cancel-${buttonId}" onclick="cancelBtn('${details.id}')" class="text-red-500 fa-solid fa-xmark cart-cancel"></i>
                </div>
            </div>
            `;

            
            // document.getElementById("cart-price").addEventListener
            
            cartContainer.appendChild(createElement);
            
            const cartPrice = Number(event.target.closest(".card").querySelector(".plant-price").innerText);
            const totalPrice = document.getElementById("total-price");
            const convertTotalPrice = Number(totalPrice.innerText)
            const availableTotalPrice = cartPrice + convertTotalPrice;
            // console.log(availableTotalPrice);
            
            totalPrice.innerText = availableTotalPrice;
            
            
            
        };
    };
});






const cancelBtn = (cancelBtnId) => {
    const cancelCart = document.getElementById(`cart-cancel-${cancelBtnId}`).closest(".cart");

    const cartPrice = Number(cancelCart.querySelector("#cart-price").innerText);

    const totalPrice = document.getElementById("total-price");
    const updatedPrice = Number(totalPrice.innerText) - cartPrice;
    totalPrice.innerText = updatedPrice;

    cancelCart.remove();
}




// document.getElementById("card-container").addEventListener("click", (event) => {
    //     if(event.target.localName === "button"){
        //         const btnId = event.target.id
        //         const cardBtnId = document.getElementById(btnId)
        //         const buttonId = btnId.split("-")[btnId.split("-").length-1];
        
        
        //         fetch(`https://openapi.programming-hero.com/api/plant/${buttonId}`)
        //         .then(res => res.json())
//         .then(data => console.log(data.plants))
//     }
// })



// document.getElementById(`${id}`).addEventListener("click", () =>{


        
// })