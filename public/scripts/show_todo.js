$(document).ready(function() {

  // creat format list item with response list data
  const createListElement = function(listDataObj) {

    const markup = `<p> ${listDataObj.title} </p>`;
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

  const listContentExample = [{title: "book1" }, {title: "book2" }, {title: "book3" }, {title: "book4" }];


  console.log(renderListContent(listContentExample, "bookList"));

  $.ajax({
    type: "GET",
    url: '/dashboard',
    success: (data) => {
      renderListContent(listContentExample, "bookList");
    }
  
  });

});
