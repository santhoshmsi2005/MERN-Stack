let email = document.getElementById("email")
let password = document.getElementById("password")
let LoginForm = document.getElementById("LoginForm")
let email_message = document.getElementById("email_message")
let password_message = document.getElementById("password_message")
let success_text = document.getElementById("success_text")

LoginForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    let isValid =  validation(email.value , password.value)

    if(isValid){
        saveData(email.value, password.value)
        alert("Form Submited Successfully...")
    }else{
        return ; 
    }
})

const saveData = (email , password) => {
    const firebaseConfig = {
      apiKey: "AIzaSyAwWKofsy19qI8g3ZtgW6gPlNytj1rV0z0",
      authDomain: "mern-stack-857a8.firebaseapp.com",
      databaseURL: "https://mern-stack-857a8-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "mern-stack-857a8",
      storageBucket: "mern-stack-857a8.firebasestorage.app",
      messagingSenderId: "129778200687",
      appId: "1:129778200687:web:6b5522a95b52c3187add9a"
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.database().ref("ReqForm");

    db.push({
        email: email,
        password: password,
    });
}

let validation = (email , password) => {

    var isValid = true;

    let emailCode = /^\S+@\S+\.\S+$/
    let passwordCode = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    if(email.match(emailCode) && password.match(passwordCode)){
        email_message.textContent = "Valid Email"
        password_message.textContent = "Valid Password"
        email_message.classList.add("text-green-500")
        password_message.classList.add("text-green-500")
        email_message.classList.remove("text-red-500")
        password_message.classList.remove("text-red-500")
        success_text.textContent = "Form Submited Successfully..."
    }else{
        email_message.textContent = "Invalid Email"
        password_message.textContent = "Not a strong password"
        email_message.classList.add("text-red-500")
        password_message.classList.add("text-red-500")
        email_message.classList.remove("text-green-500")
        password_message.classList.remove("text-green-500")
        success_text.textContent = ""
        isValid = false
    }
    if(isValid){
        setTimeout(() => {
            LoginForm.reset()
        }, 1000);
    }
    return isValid

}