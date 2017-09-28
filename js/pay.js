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
  

  // $(".looks").hide(); //查看订单按钮隐藏
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
  $("#card").on('blur',function(){
    if (form.IDcard.value == '') {
      $(".card").text('不能为空')
      form.IDcard.focus();
      return false;
   }else{$(".card").text('')}
  });
  
  // 表单数据提交
  $("#submits").click(function() {
    upForm();
    console.log($(".topic").html());
    console.log($(".yltprice").html());
    console.log($("#names").val());
    console.log($("#phone").val());
    console.log($("#card").val());
    console.log($("#ceshi").val());
  });
  function upForm() {
    $.ajax({
      cache: false,
      type: "post",
      dataType: "json",
      async: true,
      url: "http://192.168.1.200:8080/interface/unifiedorder.do",
      data: {
        topic: code,
        yltprice: $(".yltprices").val(),
        username: $("#names").val(),
        telephone: $("#phone").val(),
        IDcard: $("#card").val(),
        id:$("#ceshi").val()
      },
       success: function(data) {
        console.log(data);
        console.log(data.result);
        console.log(data.message);
        if (data.status === 1) {
          window.location.href = data.result;
          $("#submits").hide();
          setTimeout(function(){$(".looks").show();},3000);
          $(".looks").html(
            '<a href='+'./orderLists.html?id='+GetQueryString('id')+'>查看订单</a>');
        } else{
          console.log(data.message);
           window.location.href = "./error.html?cuowu=" + data.message;
        }
      }
    });
  }
});
