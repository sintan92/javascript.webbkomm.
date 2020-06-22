


//auth status
auth.onAuthStateChanged(user => {
    if(user) {
        db.collection('texts').get().then(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    }else{
        setupUI()
            setupGuides([]);
        
    }
});

//add text
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    db.collection('texts').add({
        title:createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
})

//delete texts
function removeFromList(){

    div.setAttribute('data-id', doc.id);
    let cross = document.createElement("BUTTON");
    cross.textContent = 'x';
    createForm.appendChild(div);
    cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('texts').doc(id).delete();
})
}

//create user
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    //signing up with database
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //closing the loggin window
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut();

});



//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
      

        //closing the loggin window
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        
    })
})



