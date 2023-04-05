//Модальное окно
const btn = document.querySelector('.hero__btn');
const modal = document.querySelector('.modal');

btn.addEventListener('click', () => {
  modal.classList.add('modal__open');  //открывает модальное окно
});

modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.closest('.modal__close')) {  
    modal.classList.remove('modal__open');  //закрывает модальное окно если клик на крестик или мимо модального окна
  }
});

//Валидация формы
//функция валидации
function validation(form) {
  //функция, которая прошла валидацию после неправильного заполнения
  function removeError(input) {
    const parent = input.parentNode;  //выбирает родителя элемента
  
    if (parent.classList.contains('error')) {  //если у родителя есть класс error
      parent.querySelector('.error-label').remove(); //то находим у родителя error-label и удаляем этот блок
      parent.classList.remove('error'); // удаляем класс error
    }
  }

  //функция, которая создает ошибку
  function createError(input, text) {
    const parent = input.parentNode; //выбирает родителя элемента
    const errorLabel = document.createElement('label');

    errorLabel.classList.add('error-label'); //добавляет класс элементу
    errorLabel.textContent = text; //добавляем текст ошибке
    parent.classList.add('error'); //добавляет класс для стилизации ошибки

    parent.append(errorLabel); //добавляем элемент и текст ошибки после input
  }

  let result = true;

  //проверка формы на успех
  const allInputs = form.querySelectorAll('input');

  for (const input of allInputs) {

    removeError(input);

    //проверка на мин.кол-во символов
    if (input.dataset.minLength) {  //в html-разметке data атрибут указать
      if(input.value.length < input.dataset.minLength) {
        removeError(input); //очищаем ошибку
        createError(input, `Минимальное количество символов: ${input.dataset.minLength}`); //текст ошибки
        result = false;
      }
    }

    //проверкка на максимальное количество символов
    if (input.dataset.maxLength) {  //в html-разметке data атрибут указать
      if(input.value.length > input.dataset.maxLength) {
        removeError(input); //очищаем ошибку
        createError(input, `Максимальное количество символов: ${input.dataset.maxLength}`); //текст ошибки
        result = false;
      }
    }

    //проверка на заполнение поля
    if(input.value == '') {
      removeError(input);      
      createError(input, 'Поле не заполнено!')
      result = false;
    }
  }

  return result
};

document.getElementById('add-form').addEventListener('submit', function(event) {
  event.preventDefault()  //отменить перезагрузку страницы
  
  if(validation(this) == true) {
    alert('Форма отправлена усрешно!')
  };
});