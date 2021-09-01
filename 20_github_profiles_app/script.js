const GITHUB_API = 'https://api.github.com/users/';

const formEl = document.querySelector('#form');
const mainEl = document.querySelector('#main');
const searchEl = document.querySelector('#search');

getUser('florinpop17');


async function getUser(user) {
    const resp = await fetch(GITHUB_API + user);
    const respData = await resp.json();

    createUserCard(respData);
}

function createUserCard(userData) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    cardEl.innerHTML = `
        <div class="media">
            <img class="avt" src="${userData.avatar_url}" alt="${userData.name}"/>
        </div>
        <div class="info">
            <h2>${userData.name}</h2>
            <p>${userData.bio}</p>

            <ul>
                <li>
                    <ion-icon name="eye"></ion-icon>
                    ${userData.followers}
                </li>
                <li>
                    <ion-icon name="people"></ion-icon>
                    ${userData.following}
                </li>
                <li>
                    <ion-icon name="book"></ion-icon>
                    ${userData.public_repos}
                </li>
            </ul>
        </div>
    `;

    mainEl.appendChild(cardEl);
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    userName = searchEl.value;

    if (userName) {
        mainEl.innerHTML = '';

        getUser(userName);

        searchEl.value = '';
    }
});