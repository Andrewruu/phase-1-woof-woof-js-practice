document.addEventListener('DOMContentLoaded', () =>{
    getDogs();
    document.querySelector("#good-dog-filter").addEventListener('click', filterDog);
})
let filterOff = true

function filterDog(){
    if (filterOff){
        clear()
        document.querySelector("#good-dog-filter").textContent ='Filter good dogs: ON'
        filterOff = false
        getGoodDogs()
    }else{
        clear()
        document.querySelector("#good-dog-filter").textContent ='Filter good dogs: OFF'
        filterOff = true
        getDogs()

    }
    console.log(filterOff)
}
function clear(){
    document.querySelector('#dog-bar').innerHTML = ''
}
function filterDogUpdate(dogObj){
    if(!filterOff){
        if (dogObj.isGoodDog){
            console.log(dogObj.isGoodDog)
            document.getElementById(`${dogObj.id}`).removeAttribute('style');
        }else{
            console.log(dogObj.isGoodDog)
            document.getElementById(`${dogObj.id}`).style.display = 'none';
        }
    }
}
function renderDogs(dogos){
    for (const dogs in dogos){
        const span = document.createElement('span')
        const dogContainer = document.querySelector('#dog-bar')
        span.innerHTML = `${dogos[dogs].name}`
        span.addEventListener('click', function() {
            const dogSumContainer = document.querySelector('#dog-summary-container');
            const div = document.createElement('div');
            div.setAttribute('id', dogos[dogs].name);
            dogSumContainer.innerHTML = '<h1>DOGGO:</h1>';
            
            let typeDog = 'Good Dog!';
            if(!dogos[dogs].isGoodDog)
            {
                typeDog = 'Bad Dog!';
            }
            //console.log(dogos[dogs].name);
            //console.log(dogos[dogs].image);
            //console.log(dogos[dogs].isGoodDog);
            div.innerHTML = `
            <img src="${dogos[dogs].image}" />
            <h2>${dogos[dogs].name}</h2>
            <button>${typeDog}</button>
            `;
            dogSumContainer.appendChild(div);

            dogSumContainer.querySelector('button').addEventListener('click', function() {
                updateDog(dogos[dogs])
            })

        });
 
        dogContainer.appendChild(span)
    }
}

function getDogs(){
    fetch('http://localhost:3000/pups')
    .then (res => res.json())
    .then (info => renderDogs(info))

}

function getGoodDogs(){
    fetch('http://localhost:3000/pups')
    .then (res => res.json())
    .then (info => renderGoodDogs(info))
}

function renderGoodDogs(dogos){
    for (const dogs in dogos){
        
            const span = document.createElement('span')
            const dogContainer = document.querySelector('#dog-bar')
            span.textContent = `${dogos[dogs].name}`
            span.setAttribute('id', dogos[dogs].id)
            if(!dogos[dogs].isGoodDog){
                span.style.display = 'none';
            }else{
                span.style.display = '';
            }
            span.addEventListener('click', function() {
                const dogSumContainer = document.querySelector('#dog-summary-container');
                const div = document.createElement('div');
                div.setAttribute('id', dogos[dogs].name);
                dogSumContainer.innerHTML = '<h1>DOGGO:</h1>';
                
                let typeDog = 'Good Dog!';
                div.innerHTML = `
                <img src="${dogos[dogs].image}" />
                <h2>${dogos[dogs].name}</h2>
                <button>${typeDog}</button>
                `;
                dogSumContainer.appendChild(div);

                dogSumContainer.querySelector('button').addEventListener('click', function() {
                    updateDog(dogos[dogs])
                })

            });
    
            dogContainer.appendChild(span)
        
    }
}

function updateDog(dogObj){
    let typeDog = 'Good Dog!'

    if(dogObj.isGoodDog){
        typeDog = 'Bad Dog!'
        dogObj.isGoodDog = false
    }else{
        dogObj.isGoodDog = true
    }
    document.querySelector('#dog-summary-container').querySelector('button').textContent =  typeDog
    //console.log(dogObj)

    fetch(`http://localhost:3000/pups/${dogObj.id}` ,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    .then(data => filterDogUpdate(data))
    
}
