/*===== LOGIN SHOW and HIDDEN =====*/
const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up')


signUp.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    // Add classes
    loginIn.classList.toggle('none')
    loginUp.classList.toggle('block')
})

signIn.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    // Add classes
    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})

const loginFormElement = document.getElementById('login-in');
loginFormElement.addEventListener('submit', event=>{
    // console.log('event ', event);
})

async function  validateLoginInfo(event) {
    console.log('validateLoginInfo function called');
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log('user name ', username);
    console.log('password ', password);
    if(username.length === 0 || password.length === 0){
        alert('User Name and Password can not be empty');
        event.preventDefault();
        return false;
    }
    const value = await getLoginUserInformatiomFromDb(username,password, event);
    return value || false;
}

function validateSignupInformation(event){
   const fname = document.getElementById('fname').value;
   const lname = document.getElementById('lname').value;
   const signupemail = document.getElementById('signupemail').value
   const signuppassword = document.getElementById('signuppassword').value
   const city = document.getElementById('city').value
    if(fname.length === 0 || lname.length === 0  || signupemail.length ===0 || signuppassword.length === 0 || city.length === 0){
        alert('Form fields can not be empty');
        event.preventDefault();
        return false;
    }
    insertNewUserInfomation(signupemail,fname,lname,signuppassword,city);

   return true

}
