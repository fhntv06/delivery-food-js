const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}



// day 1

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const logInInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

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

function toogleModalAuth(){
	modalAuth.classList.toggle("is-open");
	warning.style.display = "";
	warning.classList.remove('animated', 'shake');
	logInInput.style.backgroundColor ="";
}

/* событие на слик по кнопке (обработчик события):
	объектСобытия.addEventListener("событие", функция){}	
*/


function logOut(){
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

checkAuth();
