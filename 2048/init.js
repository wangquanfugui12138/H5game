var cv=new Canvas(document.getElementById('cv')),
    score=document.getElementById('score'),
    start=document.getElementById('reStart'),
    clear=document.getElementById('clear');
(function () {
    score.innerHTML=localStorage.getItem('score') || '0';
    setInterval(function () {
        score.innerHTML=localStorage.getItem('score') || '0';
    },50);
    start.onclick= function () {
        cv.arr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        cv.init();
    };
    clear.onclick= function () {
        localStorage.clear();
    };
    cv.init();
})();

