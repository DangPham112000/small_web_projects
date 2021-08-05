const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const searchBlock = $('header .search-block');
const mealInfoContainer = document.getElementById('meal-info-container');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const personalizeContainer = document.querySelector('.meal.personalize');
const personalizeBtn = document.querySelector('.meal.personalize .personilizing-btn');
const personalizeCloseBtn = document.querySelector('.meal.personalize .close-btn');

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

    console.log(randomMeal);
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

    function showMealInfoCallBack() {
        showMealInfo(mealData);
    }
    
    meal.querySelector('img').addEventListener('click', showMealInfoCallBack);
    meal.querySelector('h4').addEventListener('click', showMealInfoCallBack);

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

    function showMealInfoCallBack() {
        showMealInfo(mealData);        
    }

    favMeal.querySelector('img').addEventListener('click', showMealInfoCallBack);
    favMeal.querySelector('span').addEventListener('click', showMealInfoCallBack);

    favoriteContainer.appendChild(favMeal);
}

/**
 * <div class="meal-info">
        <button id="close-meal-info-container"><i class="fas fa-times"></i></button>  
        <h1>Meal title</h1>
        <img src="https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg" alt="">

        <p>
            "In a large casserole, fry the sausages until brown all over – about 10 mins.
            Add the tomato sauce, stirring well, then stir in the beans, treacle or sugar and mustard. Bring to the simmer, cover and cook for 30 mins. Great served with crusty bread or rice."
        </p>
        <ul>
            <li>ing 1 / measure</li>
            <li>ing 2 / measure</li>
            <li>ing 3 / measure</li>
        </ul>
    </div>
 */

function showMealInfo(mealData) {
    // remove old data
    mealInfoContainer.innerHTML = '';

    // add new data
    const mealInfoEl = document.createElement('div');
    mealInfoEl.classList.add('meal-info');
    
    //get ingredients and measures
    const ingredients = [];
    for (let i=1; i<=20; i++) {
        if(mealData['strIngredient' + i]) {
            ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`);
        } else {
            break;
        }
    }
    
    mealInfoEl.innerHTML = `
        <button id="close-meal-info-container"><i class="fas fa-times"></i></button>  
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">

        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) =>`<li>${ing}</li>`).join('')}
        </ul>
    `;

    const mealInfoCloseBtn = mealInfoEl.querySelector('#close-meal-info-container');
    mealInfoCloseBtn.addEventListener('click', () => {
        mealInfoContainer.classList.add('hidden');
    });

    mealInfoContainer.appendChild(mealInfoEl);

    // show
    mealInfoContainer.classList.remove('hidden');
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

personalizeCloseBtn.addEventListener('click', () => {
    personalizeContainer.classList.add('hidden');
});

personalizeBtn.addEventListener('click', () => {
    getRandomMeal();
});