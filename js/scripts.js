// Form
let form = document.querySelector("form");
form.addEventListener("submit", getUser);

// Get User Profile
function getUser(e) {
  e.preventDefault();

  let formData = new FormData(e.target);
  let userName = formData.get("username");

  fetch(`https://api.github.com/users/${userName}`)
    .then((res) => res.json())
    .then((data) => showUser(data));
}
