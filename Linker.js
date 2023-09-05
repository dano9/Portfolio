
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
    PVStart();
    GameStart();
    Loop();
}
OpenPage();