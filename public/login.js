const loginForm = document.querySelector(".login-form")
const loginBtn = document.querySelector(".login-btn")
const loginInputs = document.querySelectorAll(".login-input")

loginForm.addEventListener("input", () => {
    if (loginInputs[0].value != "" && loginInputs[1].value != "") {
    loginBtn.classList.add("login-btn-passed")
    } else {
    loginBtn.classList.remove("login-btn-passed")
    }
})