

let storedPetData = []

//loadingSpinner
const loadingSpinner = show=>{
const spinner = document.getElementById('loader');
    if(show){
        spinner.classList.remove('hidden')
        document.getElementById('all-pets').innerHTML='';
    }else{
        spinner.classList.add('hidden')
    }
}//remove active class 
const removeActiveClass = ( ) => {
    const allButtons = document.querySelectorAll('.category-btn');
    for(btn of allButtons){
        btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-teal-700','border-2')
        btn.classList.add('rounded-xl')
    }
}
// add active class 
const addActiveClass = (category) =>{
    const activeButton = document.getElementById(`btn-${category}`)
    activeButton.classList.remove('rounded-xl')
    activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-teal-700','border-2')
}

// handel like button 

const like = imgUrl =>{
    const imageContainer = document.getElementById('likeds-pet');
    const div = document.createElement('div');
    div.innerHTML = `<img class="rounded-lg" src="${imgUrl}"/>`
    imageContainer.appendChild(div);
} 


// handel sort data

const sort = () =>{
    loadingSpinner(true)
    const sortedData = storedPetData.sort((a, b)=> b.price-a.price)
   setTimeout(() => {
    loadingSpinner(false)
    dispalyPets(sortedData)
   },1000)
}