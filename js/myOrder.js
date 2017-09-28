$(function() {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  $.ajax({
    type: "get",
    url: "http://192.168.1.200:8080/interface/orderdetail.do?id="+GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      // console.log(data);
      // console.log(data.message);
      // console.log(data.result.refuse);
      $("#excuses").val(data.result.id)
      var lis = "";
      lis +=
        '<div class="tops clearfix">' +
        '<div class="left fl">' +
        '<img src='+data.result.img+'  alt="">' +
        "</div>" +
        '<div class="right ">' +
        '<div class="topic">'+data.result.title+'</div>' +
        '<div class="oldPrice">原价:<span>¥'+data.result.marketprice+'/人</span></div>' +
        '<div class="newPrice">现价:<span class="fontColor">¥'+data.result.yltprice+'/人</span><input id="yltprice" type="hidden" name="yltprice" value='+data.result.yltprice+'></div>' +
        "</div>" +
        "</div>" +
        '<ul class="date">' +
        "<li><span>"+data.result.plandate+"</li>" +
        "<li><span>"+data.result.refunddate+"</span>"+
        "<input id='refunddate' type='hidden' name='refunddate' value="+data.result.refunddate+"></li>" +
        "</ul>"+
        '<input id="refuse" type="hidden" name="refuse" value='+data.result.refuse+'>';
        $("#mains").html(lis);
    }
  });

    $(".looks").hide(); //查看退款订单按钮隐藏
  $(".button").on("click",function(){
    console.log($("#excuses").val());
    console.log($("#cause").val());
    console.log($("#refunddate").val());
    console.log($("#yltprice").val());
    // console.log($("#refuse").val());
    // upForm();
  })

  function upForm() {
    $.ajax({
      cache: false,
      type: "post",
      dataType: "json",
      async: true,
      url: "http://192.168.1.200:8080/interface/refund.do?id="+$("#excuses").val(),
      data: {
        id: $("#excuses").val(),
        refundreason: $("#cause").val(),
        refunddate: $("#refunddate").val(),
        yltprice: $("#yltprice").val(),
      },
       success: function(data) {
        console.log(data);
        console.log(data.message);
        console.log(data.rufuse);
        
        if (data.status === 1) {
          window.location.href = "./orderLists.html?refuse="+data.rufuse;    //退款成功默认显示的页面
          $(".button").hide();
          setTimeout(function(){$(".looks").show();},1000);
          $(".looks").html(
            '<a href='+'./orderLists.html?id='+GetQueryString('id')+'>查看退款订单</a>');
        } else{
           window.location.href = "./error.html?cuowu=" + escape(data.message);
        }
      }
    });
  }


});
