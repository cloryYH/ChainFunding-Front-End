var base_url = "http://140.124.93.21:5900/swagger/"

function registration(){
var username = $('#username').val();
var email = $('#email').val();
var password1 = $('#password1').val();
var password2 = $('#password2').val();
var data ={
    "username":username,
    "email":email,
    "password1":password1,
    "password2":password2
}
$.ajax({
    url: base_url+'/rest-auth/registration/',
    type: 'post',
    contentType: 'application/json; charset=utf-8'
    data:JSON.stringify(data)
})
}

function login(){
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var data ={
        "username":username,
        "email":email,
        "password":password,
    }
    $.ajax({
        url: base_url+'/rest-auth/registration/',
        type: 'post',
        contentType: 'application/json; charset=utf-8'
        data:JSON.stringify(data)
    })
    }