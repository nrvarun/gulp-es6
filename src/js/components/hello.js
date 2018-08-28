// 'use strict';

// require('jquery');

$(document).ready(() => {
  console.log('Hello');

  let i = 0;

  const insertElem = () => {
    if (i === 0 || i === 1) {
      $('.home-list').append(`<li class="mr-3">Hello ${i} time</li>`);
    }
    else {
      // newListItem.innerHTML = `Hello ${i} times`;
      $('.home-list').append(`<li class="mr-3">Hello ${i} times</li>`);
    }
    // list.appendChild(newListItem);
  };

  setInterval(() => {
    i++;
    insertElem();
  }, 2000);
});
