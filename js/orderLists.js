/*
 订单列表11111
*/
$(function() {
  //支付成功
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
    $.ajax({
      type: "get",
       url: common_api+"queryorder.do?id="+GetQueryString("id")+'&unique='+GetQueryString("unique")+'&telephone='+GetQueryString("telephone"),
      dataType: "json",
      success: function(data) {
        // console.log(data);
        var lis = "";
        for (var i = 0; i < data.result.length; i++) {
          console.log(data.result[i].id);
          console.log(data.message);
          lis =
            "<li>" +
            '<a href='+"./myOrder.html?id="+data.result[i].id+'&unique='+data.result[i].unique+'&telephone='+GetQueryString("telephone")+'>' +
            '<div class="pics fl">' +
            '<img src='+data.result[i].img+'  alt="">' +
            "</div>" +
            '<div class="right fl">' +
            "<h3>"+data.result[i].topic+"</h3>" +
            '<p>'+data.result[i].plandate+'<span class="success">'+data.message+'</span></p>' +
            "<p>"+data.result[i].refunddate+"</p>" +
            "</div>" +
            "</a>" +
            "</li>";
          $(".lists").append(lis);
        }
        if (data.status === 0) {
          window.location.href = "./error.html?cuowu=" + escape(data.message);
        }
      },
    });
});
