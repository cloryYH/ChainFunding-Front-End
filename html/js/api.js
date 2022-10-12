//var base_url = "http://140.124.93.21:5900"

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
    console.log(data)
    // var reg1 =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    // var reg2 = /^[A-Za-z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    // if (reg1.test(password1)&&(password1==password2)&&(reg2.test(email))){
    //    //提交註冊
    // }
    // else if (!reg1.test(password1)){
    //     alert("僅支持6-16位密碼，必須含有字母和數字");}
    // else if (!reg2.test(email)){
    //     alert("不是有效的電子郵箱格式");}
    // else if (password1!=password2){
    //     alert("兩次密碼輸入不一致");
    // }
    
    // $.ajax({
    //     url: base_url + '/rest-auth/registration/',
    //     type: 'POST',
    //     contentType: 'application/json; charset=utf-8',
    //     data: JSON.stringify(data),

    //     success: function (response) {
    //         $('#send_data').html(response);
    //     },
    //     error: function (xhr) {
    //         alert('Ajax request 發生錯誤');
    //     }
    // })



// var form = new FormData();
// form.append("username", "curtis112");
// form.append("email", "as1234@gmail.com");
// form.append("password1", "Curtis18555");
// form.append("password2", "Curtis18555");

    var settings = {
    //   "url": "http://140.124.93.21:5900/rest-auth/registration/",
        "url": "http://140.124.93.21:5900/rest-auth/registration/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            //"Cookie": "csrftoken=UQ4gXcWgh2en3YOoDpMTK0wVQW85FWnAl32nQs2AlmsnjuQhgrd6tLSFXL4wmrIu; messages=.eJxtjEEKwyAQAL8inq2oUZPeAn1GlGDTNViqQnT_33rvbZiB2Ta67-9Wy56htXACZYIpweijlpiuHHqqhcAth_QhDUonvZLQpJr0eg7Jj5o59ezvxzDq0CopHBp1jw41gCEHXj01KRXnDme7aIcLhOeo8TXM_GMjrXE4CaGo91_UqjUJ:1oYNCJ:ME7jg4PAWlMOxkBazb-nM3pMaO0Zs3CpELo4dly1Gwc; sessionid=w8s1otwup8rps3wygvx4wcereor61ejl",
            "Content-Type": "application/json",
            //"X-Content-Type-Options": "nosniff"
        },
    
        "data": data
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

// $.ajax({
//         success: function (response) {
//             $('#send_data').html(response);
//             alert('AAA');
//         },
//         error: function (xhr) {
//             $('#send_data').html(response);
//             alert('AAA');
//         }
//     })

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
        type: 'POST',
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