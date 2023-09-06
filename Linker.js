var isMobile = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) != null;

var time = 0;
function Loop()
{
    time += 0.05;
    GameLoop();
    PVUpdate();
    requestAnimationFrame(Loop);
}
function OpenPage()
{
    console.log("isMobile:" + isMobile);
    PVStart();
    GameStart();
    Loop();
}
OpenPage();
