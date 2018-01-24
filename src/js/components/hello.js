
global.jQuery = require("jquery");

$(document).ready(()=> {
  console.log('Hello');

  let i = 0;

  setInterval(() => {
    i++;
    // console.log($('ul'));
    insertElem();
  }, 2000);

  const insertElem = () => {

    // let list = document.querySelector('ul');
    // var newListItem =  document.createElement('li');

    // newListItem.classList.add('m-3')

    if(i == 0 || i == 1){
      $('ul').append(`<li class="mr-3">Hello ${i} time</li>`);
    }
    else {
      // newListItem.innerHTML = `Hello ${i} times`;
      $('ul').append(`<li class="mr-3">Hello ${i} times</li>`);
    }

    // list.appendChild(newListItem);

  };

})
