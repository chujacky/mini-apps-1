
var formData = new FormData();

$('#data').on('submit', function(e) {

  formData = ("json", $('#file')[0].files[0]);
  console.log(formData);
  e.preventDefault();    
  $.ajax({
    url: 'http://localhost:3000/',
    type: 'POST',
    data: formData,
    processData: false,  // Important!
    contentType: false,
    success: function (data) {
            $('#csv').replaceWith(`<p id="csv">${data}</p>`);
    }
  })
})

