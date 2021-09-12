const GITHUB_API = 'https://api.github.com/users/';

const formEl = document.querySelector('#form');
const mainEl = document.querySelector('#main');
const searchEl = document.querySelector('#search');

getUser('dangpham112000');


async function getUser(username) {
    const resp = await fetch(GITHUB_API + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(GITHUB_API + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
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

            <div class="repos" id="repos"></div>
        </div>
    `;

    mainEl.appendChild(cardEl);
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
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