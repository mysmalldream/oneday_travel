$(function() {
  //获取当前时间日期
  var dt = new Date();
  var m = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec"
  );
  var w = new Array(
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  );
  var d = new Array("st", "nd", "rd", "th");
  mn = dt.getMonth();
  wn = dt.getDay();
  dn = dt.getDate();
  var dns;
  if (dn < 1 || dn > 3) {
    dns = d[3];
  } else {
    dns = d[dn - 1];
    if (dn == 11 || dn == 12) {
      dns = d[3];
    }
  }

  // console.log(m[mn]+" "+dn+dns+" " +w[wn-1]+" "+dt.getFullYear());
  $(".timeRight1").html(w[wn - 1]);
  $(".timeRight2").html(
    m[mn] + "<span>" + dn + dns + "</span>" + dt.getFullYear()
  );

  // 获取地址栏id
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  // 调用方法
  $.ajax({
    type: "get",
    url: common_api + "distance.do?id=" + GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      // console.log(data);
      // console.log(data.title);
      var lis = "";
      var tickets = "";
      for (var i = 0; i < data.imgs.length; i++) {
        $(".swiper-slide1").css("background", "url(" + data.imgs[0].url + ")");
        $(".swiper-slide3").css("background", "url(" + data.imgs[1].url + ")");
        $(".swiper-slide5").css("background", "url(" + data.imgs[2].url + ")");
      }
      for (var i = 0; i < data.introduce.length; i++) {
        lis +=
          '<li class="ani"  swiper-animate-effect="rollIn" swiper-animate-duration="1.0s" swiper-animate-delay="0s">' +
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
      //动态生成的报名按钮(URL传值需要编码两次)
      $(".colorRed").after("<button type="+"button"+"><a href="+'./pay.html?id='+GetQueryString("id")+'&yltprice='
      +GetQueryString("yltprice")+'&topic='+escape(escape(GetQueryString("topic")))+'>'+"我要报名</a></button>");
      // 按钮禁止与可点击
      $(".input2").click(function() {
        $("button").addClass("gray");
        $("button a").removeAttr("href");
        // console.log($("button a")[0]);
      });
      $(".input1").click(function() {
        $("button").removeClass("gray");
        $("button a").attr("href","./pay.html?id=" +GetQueryString("id") +"&yltprice=" +GetQueryString("yltprice") +"&topic=" +escape(escape(GetQueryString("topic")))
        );
        // console.log($("button a")[0]);
      });
      if (data.status == 0) {
        console.log("服务器数据错误~");
        window.location.href = "../error.html?cuowu=" + escape(data.message);
      }
    },
  });
});
