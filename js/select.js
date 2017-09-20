$(function() {
  $.ajax({
    type: "get",
    url: "http://test.elvmedia.cn:8080/test/sceniclist.do",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var lis = "";
        for (var i = 0; i < data.result.length; i++){
            // console.log(data.result[i].img);
            lis+=
            '<li>'+
            '<a href=./travel.html?id='+data.result[i].id+' class="pics">'+
            '<img src='+data.result[i].img+'  alt=""/>'+
            '<div class="tips">'+data.result[i].topic+'</div>'+
            '</a>'+
            '<h3>'+
            '<span>已有'+data.result[i].number+'人报名</span><span>'+data.result[i].plandate+'</span><span>'+data.result[i].refunddate+'</span>'+
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
    }
  });
});
