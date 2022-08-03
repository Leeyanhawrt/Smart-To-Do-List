$(document).ready(function () {

  // creat format list item with response list data
  const createListElement = function (listDataObj, listCategory) {
    const name = Object.keys(listDataObj);
    const markup = "";
    if (listCategory === 'movieList') {
      markup = `<p class = "listItem"> ${listDataObj[name]} <button type = "DELETE" class = "deleteMovie"> <i class="fa-solid fa-circle-trash"></i></button></p> `;
    } else if (listCategory === 'restaurantList') {
      markup = `<p class = "listItem"> ${listDataObj[name]} <button type = "DELETE" class = "deleteRestaurant"> <i class="fa-solid fa-circle-trash"></i> </button></p> `;
    } else if (listCategory === 'productList') {
      markup = `<p class = "listItem"> ${listDataObj[name]} <button type = "DELETE" class = "deleteProduct"> <i class="fa-solid fa-circle-trash"></i> </button></p> `;
    } else if (listCategory === 'bookList') {
      markup = `<p class = "listItem"> ${listDataObj[name]} <button type = "DELETE" class = "deleteBook"> <i class="fa-solid fa-circle-trash"></i> </button></p> `;
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
      res
        .status(500)
        .json({ error: err.message });
    });

  ////Perform AJAX GET request from local dashboard/movies route containing all movies pertaining to the user
  $.ajax({
    url: '/dashboard/movie',
  })
    .then((json) => {
      renderListContent(json.results, "movieList");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
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
      res
        .status(500)
        .json({ error: err.message });
    });

  ////Perform AJAX GET request from local dashboard/restaurant route containing all restaurants pertaining to the user
  $.ajax({
    url: '/dashboard/restaurant',
  })
    .then((json) => {
      renderListContent(json.results, "restaurantList");

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});
