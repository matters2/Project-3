let allEditBtns = document.querySelectorAll('.btnShowEdit')

let btnShowEditPet = document.querySelector('.btnShowEdit')
let editFormSpecies = document.querySelector('.pet-edit-species')
let editFormDob = document.querySelector('.pet-edit-dob')
let editFormName = document.querySelector('.pet-edit-name')
let editFormImageUrl = document.querySelector('.pet-edit-image_url')
let editFormPetId = document.querySelector('.petId')
let newPetFrm = document.querySelector('.newPetForm');
var editFrm = document.querySelector('.editPetForm');
let btnAddNewPet = document.querySelector('.btnAddNewPet');

let editPetFrm = document.querySelector('.editPetForm')

let userId = Number(document.querySelector('.hidden-id').value)

// DOM manipulation
newPetFrm.style.display = "none"
editFrm.style.display = "none"



btnAddNewPet.addEventListener('click', (e) => {
    if (newPetFrm.style.display == "none") {
    newPetFrm.style.display = "block"
    } else if (newPetFrm.style.display == "block") {
    newPetFrm.style.display = "none"
    }
})



//  console.log(allEditBtns)

allEditBtns.forEach( (button) => {

    button.addEventListener('click', (e) => {
        e.preventDefault()
        if (editFrm.style.display == "block") {
            editFrm.style.display = "none"
        } else if (editFrm.style.display == "none") {
            editFrm.style.display = "block"
            // console.log(Number(e.target.dataset.id))
            let petId = (Number(e.target.dataset.id))
            console.log(petId)
            let url = `http://localhost:8080/api/pets/${petId}`
            console.log(url)
            axios.get(url).then( resp => {
                console.log(resp.data)
                editFormSpecies.value = resp.data[0].species
                editFormDob.value = resp.data[0].dob.slice(0,10)
                editFormName.value = resp.data[0].name
                editFormImageUrl.value = resp.data[0].image_url
                editFormPetId.value = resp.data[0].id
            })
        } 
    }) // Edit pet's details handler
})



let btnEditPet = document.querySelector('.btnEditPet')

btnEditPet.addEventListener('click', (e) => {
        e.preventDefault() 
      
      var params = {
        userId: userId,
        species: editFormSpecies.value,
        dob: editFormDob.value,
        name: editFormName.value,
        image_url: editFormImageUrl.value,
        id: editFormPetId.value 
    }

    console.log(params)

    const url = 'http://localhost:8080/api/pets/edit'
    
    axios.patch(url, params).then(res => {
        console.log('bug')
    })

    
     editFrm.reset();
    
        
})



const btnNewPet = document.querySelector('.btnNewPet')

btnNewPet.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        userId: userId,
        species: document.querySelector('.pet-new-species').value,
        dob: document.querySelector('.pet-new-dob').value,
        name: document.querySelector('.pet-new-name').value,
        image_url: document.querySelector('.pet-new-image_url').value
    }

    const url = 'http://localhost:8080/api/pets/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

     newPetFrm.reset();

})

const petImg = document.querySelectorAll('.petImg')
const medsList = document.querySelector('.pet-meds')

petImg.forEach( petImage => {

petImage.addEventListener('click', e => {
    
    let petImgId = e.target.dataset.id
    const url = `/api/meds/${petImgId}`
    axios.get(url).then(res => {
    console.log(res.data.length)

    if (res.data.length == 0) {
        // medsList.textContent = "No medications" 
        let li = document.createElement('li')
            li.textContent = "No medications"
            medsList.appendChild(li) 
    } else {
        medsList.textContent = ""
        res.data.forEach(med => {
            let li = document.createElement('li')
            li.textContent = med.comments
            medsList.appendChild(li)
        })
    }

    })
})

})

const apptList = document.querySelector('.pet-appointments')

petImg.forEach( petImage => {

petImage.addEventListener('click', e => {
    
    let petImgId = e.target.dataset.id
    const url = `/api/appointments/${petImgId}`
    axios.get(url).then(res => {
    console.log(res.data.length)

    if (res.data.length == 0) {
        apptList.textContent = "No appointments"  
    } else {
        apptList.textContent = ""
        res.data.forEach(appt => {
            
            let li = document.createElement('li')
            li.innerHTML = '<h3>' + 'type: '+ appt.appt_type + '</h3>' + 
            '<h3>' + 'location: '+ appt.location + '</h3>' +
            '<h3>' + 'date: '+ appt.appt_date.slice(0,10) + '</h3>' +
            '<h3>' + 'comments: '+ appt.comments + '</h3>' +
            '<button data-id="'+ appt.id + '"> edit</button><hr>'
            apptList.appendChild(li)
        })
    }

    })
})

})