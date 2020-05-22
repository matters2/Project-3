let allEditBtns = document.querySelectorAll('.btnShowEdit')

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
    newPetFrm.style.display = "block"
})



allEditBtns.forEach( (button) => {

    button.addEventListener('click', (e) => {
        e.preventDefault()
        editFrm.style.display = "block"
        // console.log(Number(e.target.dataset.id))
        let petId = (Number(e.target.dataset.id))
        console.log(petId)
        let url = `/api/pets/${petId}`
        console.log(url)
        axios.get(url).then( resp => {
            console.log(resp.data)
            editFormSpecies.value = resp.data[0].species
            editFormDob.value = resp.data[0].dob.slice(0,10)
            editFormName.value = resp.data[0].name
            editFormImageUrl.value = resp.data[0].image_url
            editFormPetId.value = resp.data[0].id
        })
    }) // displays pet's details for editting
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

    const url = '/api/pets/edit'
    
    axios.patch(url, params).then(res => {
        console.log('bug')
    })
    
    editFrm.reset();
            
}) // update pet details to db



const btnPostNewPet = document.querySelector('.btnNewPet')

btnPostNewPet.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        userId: userId,
        species: document.querySelector('.pet-new-species').value,
        dob: document.querySelector('.pet-new-dob').value,
        name: document.querySelector('.pet-new-name').value,
        image_url: document.querySelector('.pet-new-image_url').value
    }

    const url = '/api/pets/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
        location.reload();
    })
   
     newPetFrm.reset();

}) // adds new pet to db

const petImg = document.querySelectorAll('.petImg')
const medsList = document.querySelector('.pet-meds')

const medListTitle = document.querySelector('.pet-med-title')
const petMedsCard = document.querySelector(".pet-meds")

let petApptTitle = document.querySelector('.pet-selected')
petApptTitle.style.display = 'none'
medListTitle.style.display = 'none'
petImg.forEach( petImage => {
    petImage.addEventListener('click', e => {
        petApptTitle.style.display = 'block'
        medListTitle.style.display = 'block'
        petMedsCard.classList.add("card")
        let petImgId = e.target.dataset.id
        const url = `/api/meds/${petImgId}`
        axios.get(url).then(res => {
            console.log(res.data.length)

            if (res.data.length == 0) {
                medsList.innerHTML = '<h3 class="pet-selected pet-med-title">Pet Medications</h3>'
                // medsList.textContent = "No medications" 
                let li = document.createElement('li')
                li.textContent = "No medications"
                medsList.appendChild(li) 
            } else {
                medsList.innerHTML = '<h3 class="pet-selected pet-med-title">Pet Medications</h3>'
                res.data.forEach(med => {
                    let li = document.createElement('li')
                    li.textContent = med.comments
                    medsList.appendChild(li)
                })
            }

        })
    }) // displays meds when pet portrait is clicked

})

const apptList = document.querySelector('.pet-appointments')

petImg.forEach( petImage => {

    petImage.addEventListener('click', e => {
        
        let petImgId = e.target.dataset.id
        const url = `/api/appointments/${petImgId}`
        axios.get(url).then(res => {
            console.log(res.data.length)

            if (res.data.length == 0) {
                apptList.innerHTML = ""
                let div = document.createElement('div')
                div.innerHTML = 
                    '<h3 class="pet-selected">Pet Appointments</h3>' + 
                    '<p class="appt-subtext">No appointments</p>'  
                div.classList.add('card')
                apptList.appendChild(div)
            } else {
                apptList.innerHTML = ""
                res.data.forEach(appt => {
                    
                    let div = document.createElement('div')
                    div.innerHTML = 
                    '<h3 class="pet-selected">Pet Appointments</h3>' + 
                    '<h3>' + 'Type: '+ appt.appt_type + '</h3>' + 
                    '<p class="appt-subtext">' + 'Date: '+ appt.appt_date.slice(0,10) + '</p>' +
                    '<p class="appt-subtext">' + 'Location: '+ appt.location + '</p>' +
                    '<p class="appt-subtext">' + 'Comments: '+ appt.comments + '</p>' +
                    '<button class="pet-button" data-id="'+ appt.id + '"> Edit</button>'
                    div.classList.add('card')
                    apptList.appendChild(div)
                })
            }

        })
    }) // displays appointments when pet portrait is clicked

})