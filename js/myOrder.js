/*
 我的订单(退款按钮)
*/
$(function() {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  console.log(GetQueryString("unique"));   //唯一标示
  $.ajax({
    type: "get",
    url: common_api+"orderdetail.do?id="+GetQueryString("id"),
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
  $(".buttons").click(function(){
    console.log($("#excuses").val());
    console.log($("#cause").val());
    console.log($("#refunddate").val());
    console.log($("#yltprice").val());
    console.log(GetQueryString("unique"));
       upForm();
  })

  function upForm() {
    $.ajax({
      cache: false,
      type: "post",
      dataType: "json",
      async: true,
      url: common_api+"refund.do?id="+$("#excuses").val(),
      // url: common_api+"refund.do?id="+$("#excuses").val()+'&unique='+GetQueryString("unique"),
      data: {
        id: $("#excuses").val(),
        refundreason: $("#cause").val(),
        refunddate: $("#refunddate").val(),
        yltprice: $("#yltprice").val(),
        unique:GetQueryString("unique")
      },
       success: function(data) {
        console.log(data);
        console.log(data.message);
        
        if (data.status === 1) {
          // window.location.href = "./refundLists.html?id="+GetQueryString("id");    //退款成功默认显示的页面
          $(".buttons").hide();
          $(".looks").html(
            '<a href='+'./refundLists.html?id='+GetQueryString('id')+'&unique='+data.unique+'&telephone='+data.telephone+'>查看退款订单</a>');
          $(".looks").show();
        } else{
           window.location.href = "./error.html?cuowu=" + escape(data.message);
        }
      }
    });
  }
});