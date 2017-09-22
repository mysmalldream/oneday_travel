$(function() {
  // 获取地址栏id
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var code = decodeURIComponent(
    decodeURIComponent(GetQueryString("topic", "utf8"))
  );
  $(".topic").val(code);
  $(".yltprice").val(GetQueryString("yltprice"));

  // 表单数据提交
  // console.log($(".yltprice").val());
  // console.log($(".IDcard").val());

  $("#submits").click(function() {
    upForm();
    // console.log($(".topic").val());
    // console.log($(".yltprice").val());
    // console.log($("#names").val());
    // console.log($("#phone").val());
    // console.log($("#card").val());
  });
  // console.log("打印提交的表单数据:" + $("#documentForm").serialize());

  function upForm() {
    $.ajax({
      cache: false,
      type: "post",
      dataType: "json",
      async: true,
      url: "http://192.168.1.200:8080/interface/unifiedorder.do",
      data: {
        topic: $(".topic").val(),
        yltprice: $(".yltprice").val(),
        username: $("#names").val(),
        telephone: $("#phone").val(),
        IDcard: $("#card").val()
      },
      error: function(data) {
        if (data.status == 0) {
          console.log("提交错误");
        }
      },
      success: function(data) {
        console.log(data.result);
        window.location.href = data.result;
      }
    });
  }

  // $("#submit").submit(console.log(634537));//表单提交
  // $("#submit").onSubmit("location.href='跳转的页面';");
});
