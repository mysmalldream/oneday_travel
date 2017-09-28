$(function() {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  console.log(GetQueryString("error"));
  console.log(GetQueryString("cuowu"));
  var code = decodeURIComponent(
    decodeURIComponent(GetQueryString("error", "utf8"))
  );
  var msg = decodeURIComponent(GetQueryString("cuowu", "utf8"));
  console.log(code);
  console.log(msg);
  $("h3").html(code);
  $("h3").html(msg);
});
