// $(document).ready(function() {

//   // creat format list item with response list data
//   const createListElement = function(listDataObj) {

//     const markup = `<p> ${listDataObj.title} </p>`;
//     return markup;
//   };

//   const renderListContent = function(listDataArr, listCategory) {

//     //clear container before append
//     $(`#${listCategory}`).empty();

//     for (const listDataObj of listDataArr) {
//       const $content = createListElement(listDataObj);
//       $(`#${listCategory}`).append($content);
//     }
//   };

//   const listContentBook = [{title: "book1" }, {title: "book2" }, {title: "book3" }, {title: "book4" }];
//   const listContentMovie= [{title: "movie1" }, {title: "movie2" }, {title: "movie3" }, {title: "movie4" }];
//   const listContentRestaurant = [{title: "restaurant1" }, {title: "restaurant2" }, {title: "restaurant3" }, {title: "restaurant4" }];
//   const listContentProduct = [{title: "product1" }, {title: "product2" }, {title: "product3" }, {title: "product4" }];


//   // console.log(renderListContent(listContentExample1, "bookList"));

//   $.ajax({
//     type: "GET",
//     url: '/dashboard',
//     success: (data) => {
//       renderListContent(listContentBook, "bookList");
//       renderListContent(listContentMovie, "movieList");
//       renderListContent(listContentRestaurant, "restaurantList");
//       renderListContent(listContentProduct, "productList");
//     }

//   });

// });
