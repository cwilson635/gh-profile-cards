// Fetch is built into library
// Axios is a library
const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No profile with this username');
        };
    };  
};

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');
        addReposToCard(data);
    } catch (err) {
        createErrorCard('Problem retrieving repos');
    }; 
};

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="User Avatar" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                    <li>300 <strong>${user.followers}</strong></li>
                    <li>100 <strong>${user.following}</strong></li>
                    <li>30 <strong>${user.repos}</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
};

function createErrorCard(message) {
    const cardHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `;

    main.innerHTML = cardHTML;
};

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);

        search.value = '';
    };
});