import axios from 'axios';

const baseURL = (() => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8000/'
    } else {
        return '/'
    }
})();

let progress = 0;
let timerId = null;        // timer id

function setProgress(value) {
    progress = value;
     window.progressbar && window.progressbar.onChange(progress);
     window.progressbar1 && window.progressbar1.onChange(progress);
    //  window.notify.onChange(progress);
}

function timer() {
    if (progress < 98) {
        const diff = 100 - progress;
        const inc = diff / (10 + progress * (1 + progress / 100)); // 증가값
        setProgress(progress + inc);
    }
    timerId = setTimeout(timer, 50); // 50 ms 단위로 timer 재귀호출
}

const defaultClient = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*'
    }
});
function showNotify(){
   window.notify.onChange('정상처리되었습니다.');
}
defaultClient.defaults.timeout = 20000;

defaultClient.interceptors.request.use(function (config) {
    // 요청 인터셉터
    setProgress(0);
    // timer();                // HTTP 요청시 timer 실행
    return config
}, function (error) {
    setProgress(100);
    return Promise.reject(error);
});

defaultClient.interceptors.response.use(function (response) {
    // 응답 인터셉터
    if (timerId) {
        clearTimeout(timerId);    // HTTP 응답시 timer 해제
        timerId = null;
    }
    setProgress(100);            // 진행도: 100 = 요청/응답 완료
    // if(response.config.method === 'patch' || response.config.method === 'post'  || response.config.method === 'delete'){
    //     if(window.location.pathname.indexOf('Mng') !== -1){
    //         showNotify();
    //     }
    // }
    return response;
}, function (error) {
    setProgress(100);
    return Promise.reject(error);
});

export default defaultClient;