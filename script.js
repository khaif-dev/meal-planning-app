// object to store and manage data and methods
const MealPlannerApp = {
  // object properties
  currentUser: null, //get the user logged in
  currentWeek: new Date(), // get current date and time of user
  selectedDay: null, 
  // selectedMealType: null,
  // authToken: null,
  // selectedPlan: null,
  // paymentMethod: null,
  myRecipes: [],

  // init is an object property that takes a function as its value
  init: function() {
    this.setupEventListeners();
    // this.checkAuthStatus(); //checks if user is logged in
    this.renderWeekDays(); //builds and displays week days
    this.renderMeals(); //displays meals
    this.showSection('home'); //switches visible section of the app to home
  },

  // object methods
  setupEventListeners: function(){
    // navigation links
    const nav_links = document.querySelectorAll('.nav-link');
    nav_links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSection(e.currentTarget.dataset.target); 
      });
    })

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
    const reset_password = document.getElementById('reset-password')
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
        const modal = this.closest('.login-modal, .reset-modal, .signup-modal, .recipe-modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });

    // open signup modal when user clicks get started
    const heroBtn = document.getElementById('heroBtn');
    heroBtn.addEventListener('click',()=>{
      modalOverlay.style.display = 'block';
      signup_modal.style.display = 'block';
    });
    
    // scroll through dates on the meal planner
    // previous week
    const prev_week = document.getElementById('prev-week');
    prev_week.addEventListener('click', () => {
        this.changeWeek(-7);
    });

    // next week
    const next_week = document.getElementById('next-week');
    next_week.addEventListener('click', () => {
        this.changeWeek(+7);
    });

    // display recipe modal when add recipe button is clicked
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const recipeModal = document. getElementById('recipe-modal');
    addRecipeBtn.addEventListener('click',()=>{
      modalOverlay.style.display = 'block';
      recipeModal.style.display = 'block';
    })

    // Submit recipe form
    const recipeForm = document.getElementById('recipe-form');
    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleFormSubmit();
        recipeForm.reset();
    });

  },

  // creating method to display notifications for the user
  showNotification: function(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
    notification.style.display = 'block';

    // hide notification modal after 3s
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
  },

  // method signup
  signup: function(){
    const first_name = document.getElementById('first-name').value;
    const last_name = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone_no = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;

    // validation for required fields
    // not necessary if required in html
    if(!first_name || !last_name || !email || !phone_no || !password || !confirm_password){
      this.showNotification('Please fill all required fields', true)
    }

    //validate password
    if(password !== confirm_password){
      this.showNotification('Password do not match', true)
      return;
    }
  },
  
  // login method
  login: function(){
    // validate required field
    if(!email || !password){
      this.showNotification('Please enter both username and password', true)
    }
  },

  
  // show specific section and hide others
  showSection: function(section) {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section =>{
      //hide all sections first
      section.classList.remove('active')
    });

    //display selected section
    const targetSection = document.getElementById(`${section}-section`)
    if (targetSection){
      targetSection.classList.add('active')
    }    
  },


  // method to render the days of the week
  renderWeekDays: function(){
    const weekDaysContainer = document.getElementById('week-days');
    weekDaysContainer.innerHTML = '';

    // defining start of week
    const startOfWeek = new Date(this.currentWeek);
    // adjust date so that sunday is first day of the week
    // .getDay has 0= sunday, 1=monday, 2=tuesday,3wednesday...6=sartuday
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // generating sunday to sat date
    for(let i=0; i<7; i++){
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);   
    
      // creating the day divs
      const dayElement = document.createElement('div');
      dayElement.className = 'day' + (i === new Date().getDay() && day.getDate() === new Date().getDate() ? ' active' : '');
      dayElement.innerHTML = `
          <h4>${daysOfWeek[i]}</h4>
          <p>${day.getDate()}</p>`
      ;
      weekDaysContainer.appendChild(dayElement);
    }
    this.updateWeekRangeText();
  },
  
  
  renderMeals: function(){
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';

    const mealTypes = [
      {type:'breakfast', name:'Breakfast'},
      {type:'lunch', name:'Lunch'},
      {type:'dinner', name:'Dinner'}
    ]

    //creating the meal cards
    mealTypes.forEach(mealType=>{
      const mealCards = document.createElement('div');
      mealCards.className = 'meal-card';
      mealCards.innerHTML = `<div class="meal-image style="background-image: url('./assets/breakfast.jpg=${mealType.name}'")></div>
                             <div class="meal-details">
                                <h2>No ${mealType.name}</h2>
                                <p>Click to add recipe for ${mealType.name}</p>
                             </div>
                             <div class="meal-action">
                                <button>Add</button>
                             </div>`;
        mealCards.querySelector('button').addEventListener('click', () =>{
          this.selectedMealType = mealType.type;
          // this.showMealModal(mealType.name);  
        });
        mealsContainer.appendChild(mealCards);

    });
 
  },

  // method to navigate through dates by moving weeks forward or backwards
  changeWeek: function(days) {
    this.currentWeek.setDate(this.currentWeek.getDate() + days);
    this.renderWeekDays();
    // this.renderMeals();
    this.updateWeekRangeText();
  },

  // method to update the week dates range
  updateWeekRangeText: function() {
    const startOfWeek = new Date(this.currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    const options = { month: 'long', day: 'numeric' };
    const weekRange = `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}, ${endOfWeek.getFullYear()}`;
    
    document.getElementById('week-range').innerHTML = `<strong>${weekRange}</strong>`;
  },

  // method to handle form submit
  handleFormSubmit: function(){
    // submit recipe when save recipe button is clicked
    const recipeForm = document.getElementById('recipe-form');
    const recipeName = document.getElementById('recipe-name').value;
    const recipeDescription = document.getElementById('recipe-description').value;
    const ingredients = document.getElementById('Ingredients').value;
    const steps = document.getElementById('steps').value;
    const mealType = document.getElementById('meal-type').value;   
    const recipeImage = document.getElementById('recipe-image');
    const genericImages = {
      breakfast: 'assets/breakfast.jpg',
      lunch: 'assets/lunch.jpg',
      dinner: 'assets/dinner.jpg'
    }
    // if user provides an image generate url for it else use generic images
    let imageUrl = '';
    if (recipeImage.files.length > 0){
      const imageFile = recipeImage.files[0];
      imageUrl = URL.createObjectURL(imageFile);
    }
    else{
      imageUrl = genericImages[mealType] || genericImages.breakfast;
    }

    // convert the ingredients and steps into arrays
    const ingredientsArray = ingredients.split('\n').filter(line => line.trim() !== '');
    const stepsArray = steps.split('\n').filter(line => line.trim() !== '');

    // create new recipe object
    const newRecipe = {
      title: recipeName,
      description: recipeDescription,
      ingredients: ingredientsArray,
      steps: stepsArray,
      imageUrl: imageUrl,
      id: Date.now()
    }

      this.myRecipes.push(newRecipe);
      this.renderRecipes();  
  },

  //display recipes added by user
  renderRecipes:function(){
    const mealList = document.getElementById('recipe-list');
    mealList.innerHTML = '';

    if(this.myRecipes.length === 0){
      mealList.innerHTML = '<p>No recipes available. Please add some recipes first.</p>';
      return;
    }

    this.myRecipes.forEach(recipe =>{
      const recipeCards = document.createElement('div');
      recipeCards.className = 'recipe-cards';
      recipeCards.dataset.id = recipe.id;
    

      // generating ul for the ingredients 
      const ingredientsList = `
          <ul>
              ${recipe.ingredients.map(ingredient => `<li>${ingredient.trim()}</li>`).join('')}
          </ul>`;
      // generating ol for the steps
      const stepsList =`
          <ol>
              ${recipe.steps.map(step => `<li>${step.trim()}</li>`).join('')}
          </ol>`;   

      recipeCards.innerHTML=`
                <div class="recipe-image">
                  <img src="${recipe.imageUrl}" alt="${recipe.title}">
                </div>
                <div class="recipe-details">
                  <h2>${recipe.title}</h2>
                  <p>${recipe.description}</p>
                </div>
                <div class="recipe-actions">
                  <button class="delete-recipe" recipe-id=${recipe.id}>Delete</button>
                  <button class="full-recipe">View Full Recipe</button>
                </div>`

      // remove recipe when delete button is clicked
      const deleteRecipe = recipeCards.querySelector('.delete-recipe')
      deleteRecipe.addEventListener('click',(event)=>{
        const recipeToDelete = Number(event.target.getAttribute('recipe-id'))
        this.myRecipes = this.myRecipes.filter(recipe => recipe.id !== recipeToDelete)
        // myLibrary = myLibrary.filter(book => book.id !== idToRemove);
        this.renderRecipes();
      });

      mealList.appendChild(recipeCards);         
    });
  }, 
  
  // method to display full recipes
  renderFullRecipe: function(){

  }
  
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    MealPlannerApp.init();
});









