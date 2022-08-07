var base_url = "http://140.124.93.21:5900"

 function Registration() {
    var username = $('#username').val();
    var email = $('#email').val();
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();
    var data = {
        "username": username,
        "email": email,
        "password1": password1,
        "password2": password2
    }
    $.ajax({
        url: base_url + '/rest-auth/registration/',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),

        success: function (response) {
            $('#send_data').html(response);
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        }
    })
}


function Login() {
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var data = {
        "username": username,
        "email": email,
        "password": password,
    }
    $.ajax({
        url: base_url + '/rest-auth/login/',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),

        success: function (response) {
            $('#send_data').html(response);
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        }
    })
}