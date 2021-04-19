import axios from 'axios'
const common = {
  getQueryVariable(variable){
    const reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  getQueryVariable1(variable){
    const reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  },
  //指定日期获取一周的日期时间
  formatDate(num){
    var now = new Date();
    var nowTime = now.getTime();
    var oneDayTime = 24 * 60 * 60 * 1000;
    var ShowTime = nowTime+num*oneDayTime;
    var myDate = new Date(ShowTime);
    var y = myDate.getFullYear();//年
    var m =myDate.getMonth() + 1;//月
    var d =myDate.getDate();//日
    return [y, m, d].map(padStartConvert).join('-')
    function padStartConvert(n){
      n = n.toString()
      return n[1] ? n : '0' + n
    }
  },
  //将秒换算成00：00：00
  time_conversion($times){
    var $result = '00:00';
    if ($times>0){
        var $hour = Math.floor($times/3600);
        var $minute = Math.floor($times%3600/60);
        var $second = Math.floor(($times-60 * $minute) % 60);
        if ($hour < 10) {
            $hour = '0'+$hour;
        }
        if($minute<10){
            $minute = "0"+$minute;
        }
        if($second<10){
            $second = "0"+$second;
        }
        return $result = $hour+':'+$minute+':'+$second;
    }else{
      return $result = "00"+':'+"00"+':'+"00";
    }
  },
  //2020-01-01格式
  getDate(dates) {//dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
    var dd = new Date();
    var n = dates || 0;
    dd.setDate(dd.getDate() + n);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    m = m < 10 ? "0" + m: m;
    d = d < 10 ? "0" + d: d;
    var day = y + "-" + m + "-" + d;
    return day;
  },
  //20200101格式
  getDate1(dates) {//dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
    var dd = new Date();
    var n = dates || 0;
    dd.setDate(dd.getDate() + n);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    m = m < 10 ? "0" + m: m;
    d = d < 10 ? "0" + d: d;
    var day = y + "" + m + "" + d;
    return day;
  },
  //获取当前cookie
  getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  },
  //数据表格导出封装
  exportMethod(data) {
    
    axios({
      method: data.method,
      url: `${data.url}${data.params ? '?' + data.params : ''}`,  
      responseType: 'blob',
      fileName:data.fileName,
      headers: {
          Authorization: data.thedata
        }
    }).then((res) => {
        console.log(res);
        console.log(res.headers["content-disposition"]); // 请求成功打印res
        var mm = res.headers["content-disposition"];
        console.log(mm, "mm");
        var fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1], "UTF-8");
        console.log(fileName);
        //  解码一个编码的 URI 组件。
        var fileName1 = decodeURIComponent(fileName);
        console.log(fileName1);
        if (res.status == 200) {
          const link = document.createElement("a");
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
         });
         link.style.display = "none";
         link.href = URL.createObjectURL(blob);
         link.setAttribute("download", fileName1);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       } else {
         this.$message({
           message: "导出失败",
           type: "warning"
         });
       }
      }).catch(err => {
          // this.$Notice.error({ title: "错误", desc: "网络连接错误" });
          console.log("请求错误");
          // alert("请求错误"); // 请求错误弹出警告
        });
    }
}
export default common