/*
 退款列表
*/
$(function() {
  //退款成功
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  console.log(GetQueryString("id"));
    $.ajax({
      type: "get",
      url: common_api+"refunddetail.do?id="+GetQueryString("id")+'&unique='+GetQueryString("unique")+'&telephone='+GetQueryString("telephone"),
      dataType: "json",
      success: function(data) {
        console.log(data);
        console.log(data.result.img); 
        var lis = "";
        for (var i = 0; i < data.result.length; i++) {
          lis =
            "<li>" +
            '<a href="">' +
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
          window.location.href = "../error.html?cuowu=" + escape(data.message);
        }
      },
    });
});
