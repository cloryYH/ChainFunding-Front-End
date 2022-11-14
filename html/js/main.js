var t=0;
$("#bars1").click(function(){
    if (t==0){
        $("#SearchConditions").show();
    }
    else{
        $("#SearchConditions").hide();
    }
    t=1-t;
});

/*在網頁加載后讀取cookie 決定是顯示登入按鈕還是用戶*/

$(document).ready(function () {
    var ca=document.cookie.split(';');
    if(ca.length>1){
        acc=ca[1].split('=')[1];
        if (acc!=null){
            $('#main-user-bt').append("<a href=\"./usermenu.html\">\
                <i class=\"fa-solid fa-user\" style=\"color:skyblue;\"></i>\個人中心</a>\
                <div class=\"dropdown-content\"><a href = \"javascript:void(0);\" onclick =\"Logout()\">登出</a></div>");}
    }
    else{
        $('#main-user-bt').append("<a href=\"./login.html\"><i class=\"fa-solid fa-user-plus\" style=\"color:grey;\"></i>登入</a>");
    }
});
