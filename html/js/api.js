var base_url = "http://140.124.93.21:5900"
var reg1 =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
var reg2 = /^[A-Za-z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

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
    console.log(data);

    if (reg1.test(password1)&&(password1==password2)&&(reg2.test(email))){
    }
    else if (!reg1.test(password1)){
        alert("僅支持8-16位密碼，必須含有字母和數字");}
    else if (!reg2.test(email)){
        alert("不是有效的電子信箱格式");}
    else if (password1!=password2){
        alert("兩次密碼輸入不一致");
    }
    
    var settings = {
        "url": base_url + "/rest-auth/registration/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    
        "data": data
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function Login() {
    var account = $('#account').val();
    var password = $('#password').val();
    if (reg2.test(account)){
        var data = {
            "email": account,
            "password": password,
        }
    }
    else{
        var data = {
            "username": account,
            "password": password,
        }
    }
    $.ajax({
        url: base_url + "/rest-auth/login/",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),

        success: function (response) {
            $('#send_data').html(response);
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        }
    })
}