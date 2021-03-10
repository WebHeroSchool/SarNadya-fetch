
//добавляем к текущему url "?username=SarNadya"
//получаем ник пользователя из url
function getUserName() {
  let user = window.location.search;
  let name = user.split('=')[1];
  if (name != undefined) {
    return name;
  } else {
    name = 'SarNadya';
    return name;
    }
}

let username = getUserName();

//добавляем ник пользователя в url
const url = `https://api.github.com/users/${username}`;
//получаем данные о пользователе из запроса fetch
fetch(url)
.then(response => {
  if (response.status > 200) {
    username = undefined;
  } else {
  return response.json();
  }
})
// .then(response => response.json)
.then(json => {
  let name = json.name;
  let bio = json.bio;
  let img = new Image();
  img.src = json.avatar_url;
  let userUrl = json.html_url;

  document.querySelector('.name').innerHTML = name;
  document.querySelector('.description').innerHTML = bio;
  document.body.append(img);
})
// .catch(err => {
//   document.querySelector('.name').innerHTML = "Информация о пользователе не доступна";
//   document.querySelector('.description').innerHTML = "Описание пользователя отсутствует";
// });
const date = new Date();
const getDate = date.toDateString();

const loading = document.getElementById('loading');
console.log(loading);

const getName = new Promise((resolve, reject) => {
  setTimeout(() => username ? resolve(username): reject(alert("Информация о пользователе не доступна")), 2000);
});


const writeDate = new Promise((resolve, reject) => {
  setTimeout(() => resolve(document.querySelector('.date').innerHTML = getDate), 2000);
});

// const userLoading = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(document.querySelector('.off').removeClass, 2000);
// });

 // пока не получим данные о пользователе, загружаем прелоадер
// const setPreloadr = new Promise((resolve, reject) => {
//   setTimeout(() => username ? resolve(loading.classList.add('off')), 2000);
// })