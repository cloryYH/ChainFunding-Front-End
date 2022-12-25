const base_url = "https://llw.tw/api/v1";
const reg1 =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
const reg2 = /^[A-Za-z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const reg02 = /\B(?=(\d{3})+(?!\d))/;


function Registration() {
    var username = $('#username').val();
    var email = $('#email').val();
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();
    var data = {
        "username": username,
        "email": email,
        "password": password1,
        "re_password": password2
    }
    //console.log(data);

    if (reg1.test(password1)&&(password1==password2)&&(reg2.test(email))){
    }
    else if (!reg1.test(password1)){
        alert("僅支持8-16位密碼，必須含有字母和數字");}
    else if (!reg2.test(email)){
        alert("不是有效的電子信箱格式");}
    else if (password1!=password2){
        alert("兩次密碼輸入不一致");
    }
    $.ajax({
        url: base_url + "/auth/users/",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),

        success: function (response) {
            alert('成功註冊，接下來將為您轉回註冊前介面。');
            if(document.referrer=="" || document.referrer==document.href){
                window.location.href = "./ChainFunding.html";
            }
            else{
                window.history.back(-1);
            }
        },

        error: function (jqXHR) {
            if(jqXHR.status=='400'){
                alert('該帳戶名已被使用，請更換');
            }
        }
    })

}

function Login() {
    var account = $('#account').val();
    var password = $('#password').val();

    var data = {
        "username": account,
        "password": password,
    }

    $.ajax({
        url: base_url + "/auth/jwt/create/",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            $('#send_data').html(response);
            document.cookie = "refresh="+response.refresh;
            document.cookie = "access="+response.access;
            alert('成功登入，接下來將為您轉回登入前介面。');
            if(document.referrer=="" || document.referrer==document.href){
                window.location.href = "./ChainFunding.html";
            }
            else{
                window.history.back(-1);
            }

        },
        error: function (jqXHR) {
            if(jqXHR.status=='400'){
                alert('請先輸入您的帳戶和密碼！');
            }
            if(jqXHR.status=='401'){
                alert('您的密碼不正確，或您的帳戶不存在，請重新輸入');
            }
        }
    })
}

function Logout(){
    document.cookie='refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie='access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    location.reload();
}

function GetWalletBalance(Wtype){
    var walletApi={
        "url":base_url+"/wallet/"+Wtype,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+$.cookie('access')
        },
    };
    var balance;
    $.ajax(walletApi).done(function (response) {
        balance=parseFloat(response.amount).toFixed(6);
        var walletid=Wtype+'-balance';
        document.getElementById(walletid).innerText=balance.toString();
    });
    
}

function logrequest(){
    var ca=document.cookie.split(';');
    var f=false;
    for (var i=0; i<ca.length; i++){
        var arr=ca[i].split('=');
        if (arr[0].includes('access') && arr[1]!=null) f=true;
    }
    if (!f) window.location.href = "./login.html"; //如果找不到access 即未登入 跳回到登入界面
}
function loadingWallet(){
    logrequest();
    var userinfo={
        "url":base_url+"/walletaddress",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+$.cookie('access')
        }
    };
    $.ajax(userinfo).done(function (response) {
        let a=document.getElementById('W-con');
        if (response.length==0){
            a.innerText='未綁定';
        }
        else{
            a.innerText='已綁定';
            $('.user-wallet-address-text').append("\
              <span class=\"info-label-1\">已綁定的錢包地址</span>");
            for (var i=0;i<response.length;i++){
                $('.user-wallet-address-text').append("\
                <div>\
                  <span>"+response[i].walletAddress+"</span>\
                </div>");
            }
        }
    });
    
    GetWalletBalance('weth');
    GetWalletBalance('usdt');
    GetWalletBalance('usdc');
}

function newfunding(){//新增集資
    logrequest();

    let a=document.getElementById('newfd-link');
    var opensealink=a.value.split('/');

    var nftId=opensealink[7];
    var address= opensealink[6];
    let n=document.getElementById('name-text');
    var name=n.innerText;
    var startTime=$('#start-date').val();
    var endTime=$('#end-date').val();
    var token='weth'; //幣種
    var buyPrice= $('#buy-price').val();
    var sellPrice= $('#sell-price').val();
    //var gasPrice= 0.001;手續費自動帶0.1%
    var stopPrice= $('#stop-price').val();
    var lowest_share= $('#lowest-share').val()/100;// 最低參與比例
    
    var data = {
        "nftId": nftId,
        "nftContractAddress": address,
        "nftName": name,
        "startTime": startTime+'T00:00:00+08:00',
        "endTime": endTime+'T23:59:59+08:00',
        "token": token,
        "buyPrice": buyPrice,
        "sellPrice": sellPrice,
        //"gasPrice": gasPrice,
        "stopPrice": stopPrice,
        "lowest_share": lowest_share
    }
    //console.log(data);
    $.ajax({
        url: base_url + "/fundingprojects",
        method: "POST",
        timeout: 0,
        headers: {
            "Authorization": "Bearer "+$.cookie('access')
          },
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("成功創建集資項目！您可以在個人追蹤中查看新建立的項目。");
            window.location.href = "./ChainFunding.html";
        },
        error: function (jqXHR) {
            alert("創建失敗！請重新檢查您的投資內容。");
        }
    })
}
function timepad(t){
    return t.toString().padStart(2,'0');
}
function defaultTime(){//新增集资时预设开始日期于今天 预设结束日期为下个月
    var today=new Date();
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var date=today.getDate();
    var d1=document.getElementById("start-date");
    var d2=document.getElementById("end-date");
    d1.value=year+"-"+timepad(month)+"-"+timepad(date);
    d1.min=d1.value;
    d2.value=(month==12?year+1:year)+"-"+(month==12?"01":timepad(month+1))+"-"+timepad(date);
    d2.min=d1.value;
}

function getonefunding(pjid){
    $.ajax({
        url: base_url + "/fundingprojects/" + pjid,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            console.log(JSON.stringify(response));
        }
    })
}
function getallfunding(){
    $.ajax({
        url: base_url + "/fundingprojects",
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            alert(response);
        }
    })
}
//通过id取得项目具体的链接和名字
function pj_show(pjid,boxid,boxpicid){
    var url="fundings.html?id="+pjid;
    let a=document.getElementById(boxid);
    var address;
    var nftid;
    a.href=url;
    $.ajax({
        url: base_url + "/fundingprojects/" + pjid,
        method: "GET",
        timeout: 0,
        async:false,
        contentType: "application/json",
        success: function (response) {
            //console.log(JSON.stringify(response));
            address=response.nftContractAddress;
            nftid=response.nftId;
            a.innerText=response.nftName;
        }
    })
    $.ajax({
        url: base_url + "/search/opensea?address="+address+"&token_id="+nftid,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            var r=response.assets;
            let picture=document.getElementById(boxpicid);
            picture.src=r[0].image_preview_url;
            
        }
    })
    /*
    var address='0x3ad7ad283dab53511abdc5ff9f95a35f735e48f2';
    var token_id='10';
    $.ajax({
        url: base_url + "/search/opensea?address="+address+"&token_id="+token_id,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            console.log(JSON.stringify(response));
        }
    })
    */
}
//https://testnets.opensea.io/zh-TW/assets/goerli/0x3ad7ad283dab53511abdc5ff9f95a35f735e48f2/10
function readproject(){
    let a=document.getElementById('newfd-link');
    var opensealink=a.value.split('/');
    var address= opensealink[6];
    var token_id= opensealink[7];
    $.ajax({
        url: base_url + "/search/opensea?address="+address+"&token_id="+token_id,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            var r=response.assets;
            console.log(r[0]);

            let picture=document.getElementById('newfd-pic');
            picture.src=r[0].image_preview_url;
            let nftname=document.getElementById('name-text');
            nftname.innerText=r[0].name;

            let nftprice=document.getElementById('price-text');
            if (r[0].top_bid!=null){
                var p=parseFloat(r[0].top_bid).toFixed(6);
                p=p.toString();
                nftprice.innerText=p+" "+r[0].top_bid.symbol;
            }
            else if(r[0].last_sale!=null){
                var p=parseFloat(r[0].last_sale.payment_token.eth_price).toFixed(6);
                p=p.toString();
                nftprice.innerText=p+" "+r[0].last_sale.payment_token.symbol;
                let pricelabel=document.getElementById('price-label');
                pricelabel.innerText="最近成交價 :"
            }
            else{
                nftprice.innerText=" 暫無報價";
            }
        }
    })
}

function pj_go(){
    var url=window.location.href;
    var pjid=url.split("=")[1];
    var address;
    var nftid;
    $.ajax({
        url: base_url + "/fundingprojects/" + pjid,
        method: "GET",
        timeout: 0,
        async:false,
        contentType: "application/json",
        success: function (response) {
            address=response.nftContractAddress;
            nftid=response.nftId;
            //console.log(JSON.stringify(response));
            var token="  "+response.token.toUpperCase();
            
            let title=document.getElementById('funding-title');
            title.innerText=response.nftName;
            let raiser=document.getElementById('sponser-name');
            raiser.innerText=response.fundraiser_name;


            let text_buy=document.getElementById('buy-price-text');
            text_buy.innerText=parseFloat(response.buyPrice).toFixed(6)+token;
            
            let text_sell=document.getElementById('sell-price-text');
            text_sell.innerText=parseFloat(response.sellPrice).toFixed(6)+token;
            
            let text_stop=document.getElementById('stop-price-text');
            text_stop.innerText=parseFloat(response.stopPrice).toFixed(6)+token;


            let raising=document.getElementById('raising-text');
            raising.innerText=parseFloat(response.shares_sum).toFixed(6)+token;

            let raising_percentage=document.getElementById('raising-progress-text');
            raising_percentage.innerText=parseFloat(response.shares_sum_scale)+" %";

            let lowest_share=document.getElementById('min-part-text');
            //lowest_share.innerText=parseFloat(response.lowest_share).toFixed(6);
            lowest_share.innerText="10 %";


            let end_time=document.getElementById('end-time');
            end_time.innerText=response.endTime;

            if (response.shares_sum_scale==0){
                $('.participate-project').append("\
                <button class=\"bt-add-wallet\" onclick=\"gotobuyshare()\"><i class=\"fa-solid fa-indent\" style=\"color: red;\"></i> 購買權利</button>\
                <button class=\"bt-add-wallet\" onclick=\"gotosellshare()\"><i class=\"fa-solid fa-outdent\" style=\"color: green;\"></i> 賣出權利</button>");
            }
        }
    })
    $.ajax({
        url: base_url + "/search/opensea?address="+address+"&token_id="+nftid,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            var r=response.assets;
            //console.log(r[0]);

            let picture=document.getElementById('funding-pic');
            picture.src=r[0].image_preview_url;
            
        }
    })
}
function index_show_fundings(){
    var id1=26;//首页有三个展示项目的框 所以预选3个id 
    var id2=18;//可以写成乱数产生 也可以按最热门的项目搜寻 
    var id3=17;//测试方便就直接123了
    pj_show(id1,'index-pro-1','index-pro-pic-1');
    pj_show(id2,'index-pro-2','index-pro-pic-2');
    pj_show(id3,'index-pro-3','index-pro-pic-3');
}

function loadinglog(){//外部轉帳
    var transferlogApi={
        "url":base_url+"/transferlog",
        "method": "GET",
        "timeout": 0,
        "async":false,
        "headers": {
          "Authorization": "Bearer "+$.cookie('access')
        },
    };
    $.ajax(transferlogApi).done(function (response) {
        $('.log-content').remove();
        for (var i=0;i<response.length;i++){
            var t=response[i].time.substring(0,19);
            var Afrom=response[i].fromAddress;
            var Ato=response[i].toAddress;
            var token=response[i].token.toUpperCase();
            var amount=parseFloat(response[i].amount).toPrecision(8);
            amount=amount.toString();
            var check=response[i].transferCheck;
            var remark=(response[i].remark==null? " ":response[i].remark);
            $('#transferlog-table').append(
                "<tr class=\"log-content\" style=\"background-color: white;\">\
                    <td>"+t+"</td>\
                    <td>"+Afrom+"</td>\
                    <td>"+Ato+"</td>\
                    <td>"+token+"</td>\
                    <td>"+amount+"</td>\
                    <td>"+check+"</td>\
                    <td>"+remark+"</td>\
                </tr>");
        }
    });
}
function loadinglog_user(){//內部轉帳
    var transferlogApi={
        "url":base_url+"/transferloguser",
        "method": "GET",
        "timeout": 0,
        "async":false,
        "headers": {
          "Authorization": "Bearer "+$.cookie('access')
        },
    };
    $.ajax(transferlogApi).done(function (response) {
        $('.log-content').remove();
        for (var i=0;i<response.length;i++){
            var t=response[i].time.substring(0,19);
            var d=new Date(response[i].time);//d用于时间排序 有空再写
            var Afrom=response[i].from_username;
            var Ato=response[i].to_username;
            var token=response[i].token.toUpperCase();
            var amount=parseFloat(response[i].amount).toPrecision(8);
            amount=amount.toString();
            var check=(response[i].transferCheck==null?"1":response[i].transferCheck);
            var remark=(response[i].remark==null?" ":response[i].remark);
            $('#transferlog-table').append(
                "<tr class=\"log-content\" style=\"background-color: white;\">\
                    <td>"+t+"</td>\
                    <td>"+Afrom+"</td>\
                    <td>"+Ato+"</td>\
                    <td>"+token+"</td>\
                    <td>"+amount+"</td>\
                    <td>"+check+"</td>\
                    <td>"+remark+"</td>\
                </tr>");
        }
    });
}

function loadingUsermenu(){
    logrequest();
    var userinfo={
        "url":base_url+"/auth/users/me/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+$.cookie('access')
        },
    };
    $.ajax(userinfo).done(function (response) {
        let a1=document.getElementById('username-text');
        a1.innerText=response.username;
        let a2=document.getElementById('email-text');
        a2.innerText=response.email;
    });
}

function addnewwallet(){
    var wallet=prompt("請將您可用的錢包地址複製在輸入框內","");
    if (wallet!=null && wallet !=''){
        var data = {"walletAddress": wallet}
        //console.log(data);
        $.ajax({
            url: base_url + "/walletaddress",
            method: "POST",
            timeout: 0,
            headers: {"Authorization": "Bearer "+$.cookie('access')},
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                alert("新增錢包成功");
                location.reload();
            },
            error: function (jqXHR) {
                alert("創建失敗！請重新檢查您的內容。");
            }
        })
    }
}
function transferOnload(){
    logrequest();
    loadinglog();
}
function gotobuyshare(){
    var pjid=window.location.href.split("=")[1];
    var url="buyingfd.html?id="+pjid;
    window.open(url);
}
function gotosellshare(){
    var pjid=window.location.href.split("=")[1];
    var url="sellingfd.html?id="+pjid;
    window.open(url);
}
function loadingsharetrade(){
    logrequest();
    var pjid=window.location.href.split("=")[1];
    var address;
    var nftid;
    $.ajax({
        url: base_url + "/fundingprojects/" + pjid,
        method: "GET",
        timeout: 0,
        async:false,
        contentType: "application/json",
        success: function (response) {
            address=response.nftContractAddress;
            nftid=response.nftId;
            let title=document.getElementById('funding-title');
            title.innerText=response.nftName;
        }
    })
    $.ajax({
        url: base_url + "/search/opensea?address="+address+"&token_id="+nftid,
        method: "GET",
        timeout: 0,
        contentType: "application/json",
        success: function (response) {
            var r=response.assets;
            //console.log(r[0]);
            let picture=document.getElementById('funding-pic');
            picture.src=r[0].image_preview_url;
            
        }
    })
}
function sellshare(){
    var pjid=window.location.href.split("=")[1];
    var share=$('#total-sell-share').val();
    var token=$('#token-option').val();
    var price=$('#total-sell-price').val();
    var data = {
        "fundingProject":pjid,
        "share":share,
        "token":token,
        "price":price
    }
    //console.log(data);
    $.ajax({
        url: base_url + "/fundingsharessold",
        method: "POST",
        timeout: 0,
        headers: {"Authorization": "Bearer "+$.cookie('access')},
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("操作完成，您的這些集資份額已經被放在市場上等待買家。");
            window.location.href = "./tracklist.html";
        },
        error: function (jqXHR) {
            alert("操作失敗！請重新檢查您的內容。");
        }
    })
}