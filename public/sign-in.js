const user = document.getElementById('inputEmail');
const pwd = document.getElementById('inputPassword')
const signIn = document.getElementById('sign-in')
const responseMessage = document.getElementById('response-message');

function auth(e) {
   const userValue = user.value;
   const pwdValue = pwd.value;
    e.preventDefault();
    fetch('http://localhost:3500/auth', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userValue,
            pwd: pwdValue
        })
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
            window.location.href = 'index.html'}, 500)
        })
    

    .catch((error) => {
        console.error('Error during POST:', error);
        responseMessage.textContent = `Error: ${error.message}`;
         responseMessage.style.color = 'red';
    })

    user.value = ''
    pwd.value = ''
}
    

    signIn.addEventListener('click', auth)
