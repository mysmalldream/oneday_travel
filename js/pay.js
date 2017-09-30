/*
  支付页
*/
$(function() {
  // 获取地址栏id
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  console.log(GetQueryString("id"));
  console.log(GetQueryString("yltprice"));
  //解码两次
  var code = decodeURIComponent(decodeURIComponent(GetQueryString("topic", "utf8")));
  console.log(escape(escape(code)));
  console.log(code);
  $("#ceshi").val(GetQueryString("id"));
  $(".topic").html(code);
  $(".yltprice").html(GetQueryString("yltprice"));
  $(".topics").val(GetQueryString("topic"));
  $(".yltprices").val(GetQueryString("yltprice"));
  
  //表单验证
  $("#names").on('blur',function(){
    if (form.username.value == '') {
      $(".names").text('不能为空')
      form.username.focus();
      return false;
   }else{$(".names").text('')}
  });
  $("#phone").on('blur',function(){
    if (form.telephone.value == '') {
      $(".phone").text('不能为空')
      form.telephone.focus();
      return false;
   }else{$(".phone").text('')}
  });
  $("#phone").on('blur',function(){
    if (form.telephone.value.length !== 11) {
      $(".phone").text('长度不够')
      form.telephone.focus();
      return false;
   }else{$(".phone").text('')}
  });
  $("#card").on('blur',function(){
    if (form.IDcard.value == '') {
      $(".card").text('不能为空')
      form.IDcard.focus();
      return false;
   }else{$(".card").text('')}
  });
  $("#card").on('blur',function(){
    if (form.IDcard.value.length !== 18) {
      $(".card").text('长度不够')
      form.IDcard.focus();
      return false;
   }else{$(".card").text('')}
  });

  // $(".looks").hide(); //查看订单按钮隐藏
  // 支付表单数据提交
  $("#submits").click(function() {
      upForms();
    console.log($(".topic").html());
    console.log($(".yltprice").html());
    console.log($("#names").val());
    console.log($("#phone").val());
    console.log($("#card").val());
    console.log(GetQueryString("id"));
  });
  function upForms() {
    $.ajax({
      cache: false,
      type: "post",
      dataType: "json",
      async: true,
      url: common_api+"unifiedorder.do",
      data: {
        topic: code,
        yltprice: $(".yltprices").val(),
        username: $("#names").val(),
        telephone: $("#phone").val(),
        IDcard: $("#card").val(),
        id:$("#ceshi").val(),
      },
       success: function(data) {
        console.log(data);
        console.log(data.unique);
        if (data.status === 1) {
          window.location.href = data.result;
          $("#submits").hide();
          $(".looks").html(
            '<a href='+'./orderLists.html?id='+GetQueryString('id')+'&unique='+data.unique+'&telephone='+$("#phone").val()+'>查看订单</a>');
          setTimeout(function(){$(".looks").show()},10000);
        } else{
          console.log(data.message);
           window.location.href = "./error.html?cuowu=" + data.message;
        }
      }
    });
  }
});
