const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword");
const username = document.getElementById('inputUserName')
const submitUser = document.getElementById("submit-user");
const responseMessage = document.getElementById('response-message');

function submitUserInfo(e) {
  const emailValue = email.value;
  const passValue = password.value;
  const usernameValue = username.value;
  e.preventDefault();
  fetch("https://full-stack-plumbing-ecomerce.vercel.app/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passValue,
      username: usernameValue
    }),
  })
    .then((res) => {
        if(!res.ok){
            return res.json().then(err => { throw err})
        }
        return res.json()
    })
    .then((res) => {
        responseMessage.textContent = `Success: ${res.message}`;
        responseMessage.style.color = 'green'

        setTimeout(() => {
            window.location.href = 'signIn.html'}, 500)
        })
    

    .catch((error) => {
        console.error('Error during POST:' , error);
        responseMessage.textContent = `Error: ${error.message}`;
         responseMessage.style.color = 'red';
    })

    email.value = ''
    password.value = ''
}


submitUser.addEventListener('click', submitUserInfo)



