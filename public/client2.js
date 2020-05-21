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


newApptForm.style.display = "none"
// this will make the new appt form show with the pets id in a hidden input
allShowNewApptBtn.forEach( button => {
  button.addEventListener('click', (e) => {   
    if (newApptForm.style.display == "block") {
      newApptForm.style.display = "none"
    } else if (newApptForm.style.display == "none") {
      newApptForm.style.display = "block"
      let petId = e.target.dataset.id
      apptPetIdI.value = petId
    }
  })
})

btnNewAppt.addEventListener('click', e => {
  e.preventDefault()
  let url = 'http://localhost:8080/api/appointments/new'

  let params = {
    petId: apptPetIdI.value,
    appType: apptTypeI.value,
    location: apptLocationI.value,
    apptDate: apptDateI.value,
    comments: apptCommentsI.value,
    user_id: apptUserIdI.value
  }

  axios.post(url, params).then( resp => {
    // append this to the new appts
  })
  
})