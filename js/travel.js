$(function() {
  
  //获取当前时间日期
  var dt = new Date();
  var m=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec");
  var w=new Array("Monday","Tuseday","Wednesday","Thursday","Friday","Saturday","Sunday");
  var d=new Array("st","nd","rd","th");
  mn=dt.getMonth();
  wn=dt.getDay();
  dn=dt.getDate();
  var dns;
  if(((dn)<1) ||((dn)>3)){
  dns=d[3];
  }
  else
  {
  dns=d[(dn)-1];
  if((dn==11)||(dn==12)){
  dns=d[3];
  }
  }
  
  // console.log(m[mn]+" "+dn+dns+" " +w[wn-1]+" "+dt.getFullYear());
  $(".timeRight1").html(w[wn-1]);
  $(".timeRight2").html(m[mn]+'<span>'+dn+dns+'</span>'+dt.getFullYear());



  // 获取地址栏id
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  // 调用方法
  // console.log(GetQueryString("id"));
  $.ajax({
    type: "get",
    url:
      "http://test.elvmedia.cn:8080/test/distance.do?id=" +
      GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      // console.log(data);
      var lis = "";
      var tickets = "";
      for (var i = 0; i < data.imgs.length; i++) {
        $(".swiper-slide1").css("background", "url(" + data.imgs[0].url + ")");
        $(".swiper-slide3").css("background", "url(" + data.imgs[1].url + ")");
        $(".swiper-slide5").css("background", "url(" + data.imgs[2].url + ")");
      }
      for (var i = 0; i < data.introduce.length; i++) {
        lis +=
          '<li class="ani"  swiper-animate-effect="fadeInUp" swiper-animate-duration="0.7s" swiper-animate-delay="0s">' +
          '<div class="title">' +
          '<i class="name">' +
          data.introduce[i].topic +
          "</i>" +
          "</div>" +
          "<p>" +
          data.introduce[i].summary +
          "</p>" +
          "</li>";
        $(".lists").html(lis);
      }
      $(".steps").html(data.steps);
      $(".ticket").html(data.attention);
      $(".upLoad").append(data.instruction);
    }
  });
});
