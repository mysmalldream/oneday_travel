/*
 首页
*/
$(function() {
  $.ajax({
    type: "get",
    url: common_api+"sceniclist.do",
    // url: "http://192.168.1.200:8080/interface/sceniclist.do",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var lis = "";
        for (var i = 0; i < data.result.length; i++){
            // console.log(data.result[i].img);
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
          window.location.href = "../error.html?cuowu=" + escape(data.message);
        }    
    },
  });
});
