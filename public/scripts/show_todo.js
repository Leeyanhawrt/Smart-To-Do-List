$(document).ready(function() {

  // creat format list item with response list data
  const createListElement = function(listDataObj) {
    const name = Object.keys(listDataObj);
    const markup = `<p class = "listItem"> ${listDataObj[name]} <button type = "DELETE" class = "deleteButton"> ❌ </button></p> `;
    return markup;
  };

  const renderListContent = function(listDataArr, listCategory) {

    //clear container before append
    $(`#${listCategory}`).empty();
    for (const listDataObj of listDataArr) {
      const $content = createListElement(listDataObj);
      $(`#${listCategory}`).append($content);
    }
  };


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
