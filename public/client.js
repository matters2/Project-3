

const btnNewUser = document.querySelector('.btnNewUser')

btnNewUser.addEventListener('click', e => {
    e.preventDefault()

    var params = {
        username: document.querySelector('.username').value,
        email: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    }

    const url = 'http://localhost:8080/api/users/new'
    
    axios.post(url, params).then(res => {
        console.log('bug')
    })

})