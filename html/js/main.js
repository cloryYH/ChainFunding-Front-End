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