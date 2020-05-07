//проверяет на ошибки
"use strict";

// переменные
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const logInInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");


//Текст предупреждение
const warning = document.querySelector("#warning");

let login = localStorage.getItem("gloDelivery");

// ввывод в виде объекта
// console.dir(modalAuth);
/*	add - добавляет класс, пример, modalAuth.classList.add(".класс");
	contains - проверяет если ли класс возвращает тип boolean, пример, modalAuth.classList.contains(".класс");
	remove - удаляет класс, пример, modalAuth.classList.remove(".класс");
	toggle - если класс есть то он удаляется, если его нет то он добаляется, пример, modalAuth.classList.toggle".класс");
*/

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth(){
	modalAuth.classList.toggle("is-open");
	warning.style.display = "";
	warning.classList.remove('animated', 'shake');
	logInInput.style.backgroundColor ="";
}



/* событие на слик по кнопке (обработчик события):
	объектСобытия.addEventListener("событие", функция){}	
*/

// возвращает рестораны на страницу по нажатию на "Выйти"
function Exit(){
		if(restaurants){
			containerPromo.classList.remove("hide");
			restaurants.classList.remove("hide");
			menu.classList.add("hide");
		}
}

function logOut(){
	console.log("выйти");
	
	Exit();
	login ="";
	localStorage.removeItem("gloDelivery"); // - удаляем элемент (логин пользователя)
	buttonAuth.style.display = "";
	userName.style.display = "";
	buttonOut.style.display = "";
	buttonOut.removeEventListener("click", logOut);
	checkAuth();
}

function autorized(){
	console.log("Авторизован");

	userName.textContent = login; // - textContant - контент который мы можем плучать и записвать.

	buttonAuth.style.display = "none";
	userName.style.display = "inline";
	buttonOut.style.display = "block";

	buttonOut.addEventListener("click", logOut);
}

function notAutorized(){
	console.log("Не авторизован");

	function logIn(event){
		if(logInInput.value == ""){	
			console.log(123);
			// код отвечающий за то, чтобы form не закрывалась, когда login не заполнен
			logInInput.style.backgroundColor ="#ff000045";
			logInInput.style.transition =".5s";
			warning.style.display = "inline";
			warning.classList.add('animated', 'shake');
			warning.addEventListener('animationend', function() {
			warning.classList.remove('animated', 'shake'); });
			event.preventDefault();
		}else{
			// preventDefault() - по умолчанию false, когда false то js не блокирует это событие, а мы его блокируем.
			event.preventDefault();
			login = logInInput.value;

			localStorage.setItem("gloDelivery", login);

			toogleModalAuth(); // - закрытие модального окна после авторизации
			buttonAuth.removeEventListener("click",  toogleModalAuth);
			closeAuth.removeEventListener("click",  toogleModalAuth);
			logInForm.removeEventListener("submit",  logIn);
			logInForm.reset(); // - отчищение полей ввода
			checkAuth();
		}			
	}

	buttonAuth.addEventListener("click",  toogleModalAuth);
	closeAuth.addEventListener("click",  toogleModalAuth);
	logInForm.addEventListener("submit",  logIn);
}

function checkAuth(){
	if(login){
		autorized();

	}else{
		notAutorized();
	}
}

function createCardRestaurants(){
	const card = `
		<a class="card card-restaurant">
			<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Пицца плюс</h3>
					<span class="card-tag tag">50 мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
					<div class="price">От 900 ₽</div>
					<div class="category">Пицца</div>
				</div>
			</div>
		</a>
	`;

	cardsRestaurants.insertAdjacentHTML("beforeend", card); // - insertAdjacentHTML()(вставлятьПримыкающийHTML()) метод разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию. 
	// beforeend - после всех в конец блока card, afterbegin - внутрь в начало блока card, beforebegin - перед этим блоком card, afterend - после этого блока card.
}

function createCardGood(){
	// если человек не авторизован, то выходит форма авторизации
	if(userName.textContent == login){
		console.log(123);
		const card = document.createElement("div");
		card.className = "card";
		card.insertAdjacentHTML("beforeend", `
		<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">Пицца Классика</h3>
			</div>
			<div class="card-info">
				<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
					грибы.
				</div>
			</div>
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
				<strong class="card-price-bold">510 ₽</strong>
			</div>
		</div>
	`);

	cardsMenu.insertAdjacentElement("beforeend",card);
	}
	if(userName.textContent != login){
		console.log(321);	
		Exit();
		modalAuth.classList.toggle("is-open");
	}
}

//event - объект события, есть свойство target
function openGoods(event){
	const target = event.target;
	// нужно определять по какой карточке мы кликнули

	const restaurant = target.closest(".card-restaurant"); 
	// closest - проверяет поднимаясь по parents пока не найдет элемент с этим селектором
	if(restaurant){
		containerPromo.classList.add("hide");
		restaurants.classList.add("hide");
		menu.classList.remove("hide");

		cardsMenu.textContent = "";

		createCardGood();
		createCardGood();
		createCardGood();
	}
}

// обработчики событий
cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function(){
	if(restaurants){
		containerPromo.classList.remove("hide");
		restaurants.classList.remove("hide");
		menu.classList.add("hide");
	}
});



cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

// вызов
checkAuth();

createCardRestaurants();
createCardRestaurants();
createCardRestaurants();

