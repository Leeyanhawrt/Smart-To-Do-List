$(document).ready(function () {

  // creat format list item with response list data
  const createListElement = function (listDataObj, listCategory) {
    const name = Object.keys(listDataObj);
    let markup = "";
    if (listCategory === 'movieList') {
      markup = `<p class = "listItem"> ${listDataObj[name[0]]}
      <span>
      <button type = "EDIT" class = "editMovie changeContainer" id="${listDataObj[name[1]]}" value="movie"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type = "DELETE" class = "deleteMovie" id="${listDataObj[name[1]]}"><i class="fa-solid fa-trash-can"></i></button>
      </span>
      </p>`;
    } else if (listCategory === 'restaurantList') {
      markup = `<p class = "listItem"> ${listDataObj[name[0]]}
      <span>
      <button type = "EDIT" class = "editRestaurant changeContainer" id="${listDataObj[name[1]]}" value="restaurant"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type = "DELETE" class = "deleteRestaurant" id="${listDataObj[name[1]]}"><i class="fa-solid fa-trash-can"></i></button>
      </span>
      </p>`;
    } else if (listCategory === 'productList') {
      markup = `<p class = "listItem"> ${listDataObj[name[0]]}
      <span>
      <button type = "EDIT" class = "editProduct changeContainer" id="${listDataObj[name[1]]}" value="product"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type = "DELETE" class = "deleteProduct" id="${listDataObj[name[1]]}"><i class="fa-solid fa-trash-can"></i></button>
      </span>
      </p> `;
    } else if (listCategory === 'bookList') {
      markup = `<p class = "listItem"> ${listDataObj[name[0]]}
      <span>
      <button type = "EDIT" class = "editBook changeContainer" id="${listDataObj[name[1]]}" value="book"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type = "DELETE" class = "deleteBook" id="${listDataObj[name[1]]}"><i class="fa-solid fa-trash-can"></i></button>
      </span>
      </p>`;
    }
    return markup;
  };

  const renderListContent = function (listDataArr, listCategory) {

    //clear container before append
    $(`#${listCategory}`).empty();
    for (const listDataObj of listDataArr) {
      const $content = createListElement(listDataObj, listCategory);
      $(`#${listCategory}`).prepend($content);
    }
  };

  //Perform AJAX GET request from local dashboard/book route containing all books pertaining to the user
  $.ajax({
    url: '/dashboard/book',
  })
    .then((json) => {
      renderListContent(json.results, "bookList");

    })
    .catch(err => {
      console.log(err);
    });

  ////Perform AJAX GET request from local dashboard/movies route containing all movies pertaining to the user
  $.ajax({
    url: '/dashboard/movie',
  })
    .then((json) => {
      renderListContent(json.results, "movieList");
    })
    .catch(err => {
      console.log(err);
    });

  ////Perform AJAX GET request from local dashboard/product route containing all products pertaining to the user
  $.ajax({
    url: '/dashboard/product',
  })
    .then((json) => {
      // console.log(json.results)
      renderListContent(json.results, "productList");
    })
    .catch(err => {
      console.log(err);
    });

  ////Perform AJAX GET request from local dashboard/restaurant route containing all restaurants pertaining to the user
  $.ajax({
    url: '/dashboard/restaurant',
  })
    .then((json) => {
      renderListContent(json.results, "restaurantList");

    })
    .catch(err => {
      console.log(err);
    });

});
