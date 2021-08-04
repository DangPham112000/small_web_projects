const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const searchBlock = $('header .search-block');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

searchBlock.hover(
    function() {
        $('header input').show();
        $('header img').hide();
    }, 
    function() {
        $('header input').hide();
        $('header img').show();
    }
);


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;
    
    return meals;
}


/**
 * <div class="meal">
        <div class="meal-header">
            <span class="random">
                Random Recipe
            </span>
            <img src="https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg" alt="">
        </div>
        <div class="meal-body">
            <h4>Nasi lemak</h4>
            <button class="fav-btn active">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    </div>
 */
function addMeal(mealData, random = false) {
    
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${ random ? `<span class="random">Random Recipe</span>` : '' }
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
        } else {
            addMealToLS(mealData.idMeal);
        }
        btn.classList.toggle('active');

        fetchFavMeals();
    });

    mealsEl.appendChild(meal);
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFormLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id != mealId)));
}

function addMealToLS(mealId) {
    const mealIds = getMealsFormLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function getMealsFormLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // clean favorite container
    favoriteContainer.innerHTML = '';

    const mealIds = getMealsFormLS();

    for (let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        
        addMealFav(meal);
    };
}

/**
 * 
    <li>
        <img src="https://www.themealdb.com/images/media/meals/6ut2og1619790195.jpg" alt="">
        <span>SeriMukaKuih</span>
    </li>
 */

function addMealFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const clearBtn = favMeal.querySelector('.clear');
    clearBtn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal);

        fetchFavMeals();
    });

    favoriteContainer.appendChild(favMeal);
}

searchBtn.addEventListener('click', async () => {
    // clear meals container
    mealsEl.innerHTML = '';
    
    const searchText = searchTerm.value;

    const meals = await getMealBySearch(searchText);

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal);
        });
    }
});