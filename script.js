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
const url = `https://api.github.com/users/${username}`;
const loading = document.getElementById('loading');

const getName = new Promise((resolve, reject) => {
  setTimeout(() => username ? resolve(username): reject(alert("Информация о пользователе не доступна. Проверьте имя пользователя")), 5000);
});

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => {
    let date = new Date();
    date = date.toDateString();
    resolve(date);
  }, 2000);
});

Promise.all([getName, getDate])
.then(([username, date]) => document.querySelector('.date').innerHTML = date)
.then(username => fetch(url))
.then(response => {
  if (response.status > 200) {
    throw new Error();
  } else {
  return response.json();
  }
})
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
.then(load =>  loading.classList.add('off'))
.catch(err => {
  alert("Пользователь не найден");
  console.log(Error.message);
});
