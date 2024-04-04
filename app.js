document.addEventListener('DOMContentLoaded', function() {
    const details = document.getElementById('details');
    const container = document.getElementById('container');
    const res = document.getElementById('res');
    const inp = document.getElementById('inp');
    const searchedMealsSection = document.getElementById('SMeal'); 
    const moreItemsHeading = document.getElementById('moreItemsHeading'); 
    const head = document.getElementById('head'); 
    
  
    searchedMealsSection.style.display = 'none';

    fetchRan();
    function fetchRan() {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          disRan(meal);
        })
        .catch(error => console.error('Error', error));
    }

    function disRan(meal) {
      const mealHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      details.innerHTML = mealHTML;
    }
  


    function fetchimg() {
      Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          const featuredMeals = data.map(mealData => mealData.meals[0]);
          displayimg(featuredMeals);
        })
        .catch(error => console.error('Error fetching featured images:', error));
    }
  
    function displayimg(featuredMeals) {
      let pic = '';
      featuredMeals.forEach(meal => {
        pic += `
          <div class="featuredMeal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <h5>${meal.strInstructions.substring(0, 100)}...</h5>
          </div>
        `;
      });
      container.innerHTML = pic;
    }
  

    inp.addEventListener('input', function() {
      const srch = inp.value.trim();
      if (srch !== '') {
        fetchSearchedMeals(srch);
        searchedMealsSection.style.display = 'block'; 
        moreItemsHeading.style.display = 'none';
      } else {
        res.innerHTML = ''; 
        res.style.display = 'none';
        searchedMealsSection.style.display = 'none'; 
        moreItemsHeading.style.display = 'block'; 
        head.style.display = 'none'; 
      }
    });
  


    function fetchSearchedMeals(query) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
          const meals = data.meals;
          searchmeal(meals);
        })
        .catch(error => console.error('Error fetching searched meals:', error));
    }
  

    function searchmeal(meals) {
      let mealListHTML = '';
      meals.forEach(meal => {
        mealListHTML += `
          <div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        `;
      });
      res.innerHTML = mealListHTML;
      res.style.display = 'block';
    }
    fetchimg();
  });
