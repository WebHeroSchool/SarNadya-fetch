
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
  if (response.status === 404) {
    console.log ('Информация о пользователе не найдена');
  } else {
    //получаем тело ответа
    return response.json();
   }
})
.then(json => {
  console.log(json.html_url);
  //получаем и выводим в разметку имя и описание пользователя
  let name = json.name;
  let bio = json.bio;
  document.querySelector('.name').innerHTML = name;
  document.querySelector('.description').innerHTML = bio;
  //получаем и выводим фотографию пользователя в разметку
  let img = new Image();
  img.src = json.avatar_url;
  document.body.append(img);

  let userUrl = json.html_url;
})

