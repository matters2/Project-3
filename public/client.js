

const btnNewUser = document.querySelector('.btnNewUser')

btnNewUser.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        username: document.querySelector('.username').value,
        email: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    }

    const url = '/api/users/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

})




const btnNewPet = document.querySelector('.btnNewPet')

btnNewPet.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        userId: document.querySelector('.userId').value,
        species: document.querySelector('.species').value,
        dob: document.querySelector('.dob').value,
        name: document.querySelector('.name').value,
        image_url: document.querySelector('.image_url').value
    }

    const url = '/api/pets/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

})

const btnNewAppt = document.querySelector('.btnNewAppt')

btnNewAppt.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        petId: document.querySelector('.petId').value,
        appType: document.querySelector('.appType').value,
        location: document.querySelector('.location').value,
        apptDate: document.querySelector('.apptDate').value,
        comments: document.querySelector('.comments').value
    }

    const url = '/api/appointments/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

})

const btnNewMeds = document.querySelector('.btnNewMeds')

btnNewMeds.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        petId: document.querySelector('.petIdMeds').value,
        comments: document.querySelector('.commentsMeds').value
    }

    const url = '/api/meds/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

})