/*
 首页
*/
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
console.log(GetQueryString("username"));
console.log(GetQueryString("telephone"));
console.log(GetQueryString("IDcard"));
$(".lefts").html('<a class="orderLists" href="./orderLists.html"><h4 class="fa fa-user"></h4><p>我的订单</p></a>')
$(".rights").html('<a class="refundLists" href="./refundLists.html"><h4 class="fa fa-list"></h4><p>退款订单</p></a>')
$(function() {
  $.ajax({
    type: "get",
    url: common_api+"sceniclist.do",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var lis = "";
        for (var i = 0; i < data.result.length; i++){
            lis+=
            '<li>'+
            '<a href=./travel.html?id='+data.result[i].id+'&topic='+data.result[i].topic+'&yltprice='+data.result[i].yltprice+' class="pics">'+
            '<img src='+data.result[i].img+'  alt=""/>'+
            '<div class="tips">'+data.result[i].topic+'</div>'+
            '</a>'+
            '<h3>'+
            '<p>已有'+data.result[i].number+'人报名</p><span>'+data.result[i].plandate+'</span><span>'+data.result[i].refunddate+'</span>'+
            '</h3>'+
            '<h4><span>市场价:</span>'+
            '<del>¥'+data.result[i].marketprice+'</del>'+
            '</h4>'+
            '<h4><span>易旅价:</span>'+
            '<em>¥'+data.result[i].yltprice+'</em>'+
            '</h4>'+
            '</li>';
        $(".topics").html(lis);
        }
        if (data.status == 0) {
          console.log("服务器数据错误~");
          window.location.href = "./error.html?cuowu=" + escape(data.message);
        }    
    },
  });
});
