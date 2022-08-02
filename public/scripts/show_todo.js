$(document).ready(function() {

  // creat format list item with response list data
  const createListElement = function(listDataObj) {
    const name = Object.keys(listDataObj);
    const markup = `<p> ${listDataObj[name]}  </p>`;
    return markup;
  };

  const renderListContent = function(listDataArr, listCategory) {

    //clear container before append
    $(`#${listCategory}`).empty();
// console.log(listDataArr);
    for (const listDataObj of listDataArr) {
      const $content = createListElement(listDataObj);
      // console.log($content)
      $(`#${listCategory}`).append($content);
    }
  };

  // const listContentBook = [{ title: "book1" }, { title: "book2" }, { title: "book3" }, { title: "book4" }];
  // const listContentMovie = [{ title: "movie1" }, { title: "movie2" }, { title: "movie3" }, { title: "movie4" }];
  // const listContentRestaurant = [{ title: "restaurant1" }, { title: "restaurant2" }, { title: "restaurant3" }, { title: "restaurant4" }];
  // const listContentProduct = [{ title: "product1" }, { title: "product2" }, { title: "product3" }, { title: "product4" }];


  $.ajax({
    url: '/dashboard/book',
  })
    .then((json) => {
      renderListContent(json.results, "bookList");

    })
  $.ajax({
    url: '/dashboard/movie',
  })
    .then((json) => {
      renderListContent(json.results, "movieList");
    })
  $.ajax({
    url: '/dashboard/product',
  })
    .then((json) => {
      console.log(json.results)
      renderListContent(json.results, "productList");

    })
  $.ajax({
    url: '/dashboard/restaurant',
  })
    .then((json) => {
      renderListContent(json.results, "restaurantList");

    })


});
