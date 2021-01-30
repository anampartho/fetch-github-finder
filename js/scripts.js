// Form
let form = document.querySelector("form");
form.addEventListener("submit", getUser);

// Search Output Div
let searchOutputDiv = document.getElementById("search-output");

// Get User Profile
function getUser(e) {
  e.preventDefault();

  let formData = new FormData(e.target);
  let userName = formData.get("username");

  fetch(`https://api.github.com/users/${userName}`)
    .then((res) => res.json())
    .then((data) => showUser(data));
}

// Show User
function showUser(user) {
  let output = "";
  if (user.message) {
    output += `
    <div class="notification is-danger">
      ${user.message}
    </div>`;
  } else {
    output += `
    <div class="card">
      <header class="card-header is-justify-content-center">
        <figure class="image">
          <img
            class="is-rounded"
            1
            src="${user.avatar_url}"
          />
        </figure>
      </header>
      <div class="card-content">
        ${
          user.name ? `<p class="title has-text-centered">${user.name}</p>` : ""
        }
        <p class="subtitle has-text-centered">
          <a href="${user.html_url}"><i class="fab fa-github"></i> @${
      user.login
    }</a>
          ${
            user.twitter_username
              ? `<a href="https://twitter.com/${user.twitter_username}"><i class="fab fa-twitter"></i> @${user.twitter_username}</a>`
              : ""
          }
          ${
            user.blog !== ""
              ? `<a href="${user.blog}"><i class="fas fa-globe"></i> ${user.blog}</a>`
              : ""
          }
        </p>
        <p class="has-text-centered">
          ${user.location ? `Lives in <strong>${user.location}</strong>` : ""}${
      user.company
        ? ` and Works at
          <strong>${user.company}</strong>`
        : ""
    }
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">Public Repos: <strong>${
          user.public_repos
        }</strong></p>
        <p class="card-footer-item">Public Gist: <strong>${
          user.public_gists
        }</strong></p>
        <p class="card-footer-item">Followers: <strong>${
          user.followers
        }</strong></p>
        <p class="card-footer-item">Following: <strong>${
          user.following
        }</strong></p>
      </footer>
    </div>`;
  }

  searchOutputDiv.innerHTML = output;
}
