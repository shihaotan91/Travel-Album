$(document).ready(function ($) {
  var $userForm = $('.createUser')

    $userForm.on('submit', function (e) {
    e.preventDefault()
    // console.log($(this).serializeArray())
    var formdata = $(this).serializeArray()

    // console.log(data[0].name)

    var user = $('#user').val()
    var password = $('#password').val()
    var email = $('#email').val()

    // console.log(user_name, user_password, user_email)
    // alert('ajax call now')
    $.post({
      url: '/api/user',
      data: formdata
    }).done(doSomething)
  })

  function doSomething (data) {
    // alert('form submitted, new users created')
    $('#userList').append('<li>'+ data.name + '<br>' + data.password + '<br>' + data.email +'</li>')
  }
})
