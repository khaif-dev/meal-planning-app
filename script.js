const modalOverlay = document.querySelector('.modal-overlay');
// open login modal when login button is clicked
const loginBtn = document.querySelector('.login')
const login_modal = document.querySelector('.login-modal')
loginBtn.addEventListener('click', ()=>{
  modalOverlay.style.display = 'block';
  login_modal.style.display = 'block';
});

// display signup modal when signup is clicked
const signupBtn = document.querySelector('.signup')
const signup_modal = document.querySelector('.signup-modal')
signupBtn.addEventListener('click', ()=>{
  modalOverlay.style.display = 'block';
  signup_modal.style.display = 'block'
})

// open reset password modal when forgot password is clicked and close login
const reset_modal = document.querySelector('.reset-modal')
reset_password = document.getElementById('reset-password')
reset_password.addEventListener('click',(event)=>{
  event.preventDefault(); // Prevents the link from navigating
  modalOverlay.style.display = 'block';
  login_modal.style.display = 'none'
  reset_modal.style.display = 'block'
})

//open login modal when login in reset-modal is clicked
const loginButtons = document.querySelectorAll('.login-link')
loginButtons.forEach(function(button){
  button.addEventListener('click', function(event){
    modalOverlay.style.display = 'block';
    event.preventDefault();
    //find the closest open modal and hide it
    const modal = this.closest('.signup-modal, .reset-modal');
    if (modal){
      modal.style.display = 'none';
    }
    // find the login modal and display it
    login_modal.style.display = 'block';

  })
})

// close modal if open when close is clicked
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    modalOverlay.style.display = 'none';
    // Find the closest modal ancestor and hide it
    const modal = this.closest('.login-modal, .reset-modal, .signup-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

