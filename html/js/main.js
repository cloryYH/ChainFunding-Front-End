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
    var f=false;
    for (var i=0; i<ca.length; i++){
        var arr=ca[i].split('=');
        if (arr[0].includes('access') && arr[1]!=null){
            f=true;
            $('#main-user-bt').append("<a href=\"./usermenu.html\">\
                <i class=\"fa-solid fa-user\" style=\"color:skyblue;\"></i></a>\
                <div class=\"dropdown-content\">\
                  <a href = \"./usermenu.html\">個人中心</a>\
                  <a href = \"./tracklist.html\">追蹤清單</a>\
                  <a href = \"./wallet.html\">我的錢包</a>\
                  <a href = \"./transferRecord.html\">轉帳記錄</a>\
                  <a href = \"javascript:void(0);\" onclick =\"Logout()\">登出</a>\
                </div>");
            $('#notification-bt').append("<a href=\"./notification.html\"><i class=\"fa-solid fa-bell\" style=\"color:orange;\"></i></a>");
        }
    }
    if (!f){
        $('#main-user-bt').append("<a href=\"./login.html\"><i class=\"fa-solid fa-user-plus\" style=\"color:grey;\"></i>登入</a>");
    }
});

