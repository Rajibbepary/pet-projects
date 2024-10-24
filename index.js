const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}

const loadAllPets = async () => {
    loadingSpinner(true);
    const res = await fetch ('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    //console.log(data.pets)
   setTimeout(()=>{
    dispalyPets(data.pets) 

    storedPetData = data.pets
    loadingSpinner(false)
   },2000)
    
}

const loadPetsByCategory = async category=>{
    //remove active class
    removeActiveClass()
//show active class
addActiveClass(category)
    loadingSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    //console.log(data);
    setTimeout(()=>{
        dispalyPets(data.data)
        storedPetData = data.data
        loadingSpinner(false)
       },2000)
}


const loadPetDetails = async id=>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
    displayPetDetails(data.petData)
}


const displayPetDetails = data =>{
    //console.log(data)
const modalBody = document.getElementById('modal-content')
    modalBody.innerHTML =`
    <img class="h-60 rounded-xl object-cover w-full" src="${data.image}"/>.
    <h3 class="text-xl font-bold my-2">${data.pet_name}</h3>
    <div class="flex items-start gap-6">
    <div>
    <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i> Breed: ${data.breed ? data.breed : "Not Available"}</p>
    <p class="text-gray-600 text-sm"><i class="fa-solid fa-venus-mars"></i> Gender: ${data.gender ? data.gender : "Not Available"}</p>
    <p class="text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i> Vaccinated_Status: ${data.vaccinated_status ? data.vaccinated_status : "Not Available"}</p>
    </div>
    <div>
    <p class="text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i> Birth Date: ${data.date_of_birth ? data.date_of_birth : "Not Available"}</p>
    <p class="text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i> Price: ${data.price ? data.price : "Not Available"}</p>
    </div>
    </div>
    <p class="mt-4">Pet_details ${data.pet_details}</p>
    `
    costumModal.showModal()
}

//loadPetsByCategory()
const displayCategories = data =>{
    //console.log(data)
    const categoryContainer = document.getElementById('pet-categories');
    data.forEach(category=>{
        const div = document.createElement('div')
        div.innerHTML = ` <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
        <img class="w-10" src="${category.category_icon}"/> 
        <p class="text-xl font-bold">${category.category}</p>
        </button>`
        categoryContainer.appendChild(div);
    })
}

const dispalyPets = data => {
    const petsContainer = document.getElementById('all-pets');

    if(data.length === 0){
       petsContainer.classList.remove('grid')
       petsContainer.innerHTML =`
       <div class="bg-gray-100 p-20 rounded-xl text-center space-y-4">
       <img class="mx-auto" src="./img/error.webp"
       <h3 class="text-3xl font-bold">No Data Available! </h3>
       
       </div>
       ` 
       return
    }else{
        petsContainer.classList.add('grid') 
    }

   // petsContainer.innerHTML =''
    data.forEach(pet => {
    const div = document.createElement('div')
      //console.log(pet)  
      div.classList.add('flex', 'flex-col', 'gap-2', 'p-4', 'border','rounded-xl', 'font-bold' )
      div.innerHTML = `
      <img class="h-36 w-full rounded-lg object-cover" src="${pet.image}"/>
      <h3 class="text-xl font-semibold">${pet.pet_name ? pet.pet_name:'Not Available'}</h3>
      <p class="text-sm text-gray-600">Breed:${pet.breed ? pet.breed:'Not Available'}</P>
      <p class="text-sm text-gray-600">Birth:${pet.date_of_birth ? pet.date_of_birth:'Not Available'}</P>
      <p class="text-sm text-gray-600">Gender:${pet.gender ? pet.gender:'Not Available'}</P>
      <p class="text-sm text-gray-600">Price:${pet.price ? '$' + pet.price:'Not Available'}</P>
        <hr class="my-2"/>
        <div class="flex justify-between items-center gap-2">
        <button onclick="like('${pet.image}')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4"><i class="fa-regular fa-thumbs-up"></i></button> 
          <button onclick="adoptModal(this)" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Adopt</button> 
            <button onclick="loadPetDetails('${pet.petId}')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Details</button> 
        </div>
      `
      petsContainer.appendChild(div)
    })
}

//adopt button functionality

const adoptModal= event =>{
    let count = 3;
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText = count;
    my_modal_5.showModal()
    const interval = setInterval(() => {
        count--
     if(count !== 0)   countContainer.innerText = count
        if(count<1){
            clearInterval(interval)
        my_modal_5.close()
         event.textContent = 'Adopted'
         event.disabled = true   
        }
    },1000)
}

loadCategories();
loadAllPets()