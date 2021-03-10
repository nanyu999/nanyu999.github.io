 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "https://ae03.alicdn.com/kf/Ufff1b760a81b401e88ebe4f2b60e46e9T.jpg");
         document.title = '你还会回来吗？';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "https://ae03.alicdn.com/kf/Ufff1b760a81b401e88ebe4f2b60e46e9T.jpg");
         document.title = '嘻嘻，我就知道！' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });