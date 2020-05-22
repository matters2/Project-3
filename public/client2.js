let btnShowNewAppt = document.querySelector('.btnShowNewAppt')
let btnNewAppt = document.querySelector('.btnNewAppt')
let apptTypeI = document.querySelector('.appType')
let apptLocationI = document.querySelector('.location')
let apptDateI = document.querySelector('.apptDate')
let apptCommentsI = document.querySelector('.comments')
let apptPetIdI = document.querySelector('.petId')
let apptUserIdI = document.querySelector('.apptUserId')
let allShowNewApptBtn = document.querySelectorAll('.btnShowNewAppt')
let newApptForm = document.querySelector('.newApptForm')
let newMedForm = document.querySelector('.newMedForm')
let btnNewMed = document.querySelector('.btnNewMed')
let medPetIdI = document.querySelector('.petIdMed')
let btnShowNewMed = document.querySelector('.btnShowNewMed')
let medComments = document.querySelector('.comments-meds')
let medUserId = document.querySelector('.medUserId')



newApptForm.style.display = "none"
// this will make the new appt form show with the pets id in a hidden input
allShowNewApptBtn.forEach( button => {
  button.addEventListener('click', (e) => {   
      newApptForm.style.display = "block"
      let petId = e.target.dataset.id
      apptPetIdI.value = petId
  })
})

btnNewAppt.addEventListener('click', e => {
  e.preventDefault()
  let url = '/api/appointments/new'
  
  let params = {
    petId: apptPetIdI.value,
    appType: apptTypeI.value,
    location: apptLocationI.value,
    apptDate: apptDateI.value,
    comments: apptCommentsI.value,
    user_id: apptUserIdI.value
  }
  
  axios.post(url, params).then( resp => {
    // remove the innerHTML of the ul for appts and reload them making them all dynamically
    
  })
  
})
newMedForm.style.display = "none"

btnShowNewMed.addEventListener('click', e => {
  e.preventDefault()
  
  if (newMedForm.style.display == "none") {
    newMedForm.style.display = "block"
  } else if (newMedForm.style.display == "block") {
    newMedForm.style.display = "none"
  }

  var petIdMed = e.target.dataset.id
  medPetIdI.value = petIdMed
})

btnNewMed.addEventListener('click', e => {
  e.preventDefault()

  let url = '/api/meds/new'
  
  let params = {
    petId: medPetIdI.value,
    comments: medComments.value,
    userId: medUserId.value
  }
  
  axios.post(url, params).then( resp => {
    // remove the innerHTML of the ul for appts and reload them making them all dynamically
    
  })
  
})

