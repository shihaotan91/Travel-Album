$(document).ready(function ($) {
  console.log('Hello')

  $('#commentSubmit').click(function (e) {
    e.preventDefault();
    var formdata = $('#comment123').serializeArray()

    // console.log(data[0].name)

    var thatComment = $('#thatComment').val()
    // var user = $('#user').val()
    // var password = $('#password').val()
    // var email = $('#email').val()

    alert('ajax call now')
    $.post({
      url: window.location.href,
      data: formdata
    }).done(doSomething)
  })

  function doSomething (data) {
    alert("test")
    // alert('form submitted, new users created')
    $('#commentBox').append(data.thatComment)
  }
})
