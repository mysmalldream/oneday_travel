$(function() {
    rights()    //页面初始化加载
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var refuse=GetQueryString("refuse");
  console.log(refuse);

  if( refuse==="refuse"){
     wrong()    //退款成功
    }else{
     rights()   //支付成功
  }

  function rights(){
    $.ajax({
      type: "get",
      // url: "http://192.168.1.200:8080/interface/queryorder.do?id="+GetQueryString("id"),
      url: "http://192.168.1.200:8080/interface/queryorder.do?id=1",
      dataType: "json",
      success: function(data) {
        console.log(data);
        console.log(data.result.img);
        console.log(data.result.plandate);
        var lis = "";
        // console.log($(".lists"));
      //   for (var i = 0; i < data.result.length; i++) {
          // console.log(data.result.img);
          // console.log(data.result.id);
          // console.log(data.message);
          lis +=
            "<li>" +
            '<a href='+"./myOrder.html?id="+data.result.id+'>' +
            '<div class="pics fl">' +
            '<img src='+data.result.img+'  alt="">' +
            "</div>" +
            '<div class="right fl">' +
            "<h3>"+data.result.topic+"</h3>" +
            '<p>'+data.result.plandate+'<span class="success">'+data.message+'</span></p>' +
            "<p>"+data.result.refunddate+"</p>" +
            "</div>" +
            "</a>" +
            "</li>";
          $(".lists").append(lis);
      //   }
        if (data.status === 0) {
          window.location.href = "../error.html?cuowu=" + escape(data.message);
        }
      },
    });
  }
  function wrong(){
    $.ajax({
      type: "get",
      // url: "http://192.168.1.200:8080/interface/queryorder.do?id="+GetQueryString("id"),
      url: "http://192.168.1.200:8080/interface/refund.do?id=1",
      dataType: "json",
      success: function(data) {
        console.log(data);
        console.log(data.result.img);
        console.log(data.result.plandate);
        var lis = "";
        console.log($(".lists"));
      //   for (var i = 0; i < data.result.length; i++) {
          console.log(data.result.img);
          console.log(data.result.id);
          console.log(data.message);
          lis +=
            "<li>" +
            '<a href='+"./myOrder.html?id="+data.result.id+'>' +
            '<div class="pics fl">' +
            '<img src='+data.result.img+'  alt="">' +
            "</div>" +
            '<div class="right fl">' +
            "<h3>"+data.result.topic+"</h3>" +
            '<p>'+data.result.plandate+'<span class="success">'+data.message+'</span></p>' +
            "<p>"+data.result.refunddate+"</p>" +
            "</div>" +
            "</a>" +
            "</li>";
          $(".lists").append(lis);
      //   }
        if (data.status === 0) {
          window.location.href = "../error.html?cuowu=" + escape(data.message);
        }
      },
    });
  }
});
