this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('mygame-core-v1').then(function (cache) {
            // // 不稳定文件或大文件加载
            //   cache.addAll(
            //     //...
            //   );
            // 稳定文件或小文件加载
            return cache.addAll(
                '/js/common.js'
                // core assets & levels 1-10
            );
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {

        if (event.request.url.indexOf("IPCheck") !== -1) {
            console.log("进来了", response);
            return fetch(event.request);
        }
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                var responseClone = response.clone();
                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return response;
            }).catch(unableToResolve);
        }
    }));
});



function unableToResolve() {
    /* 
      当代码执行到这里，说明请求无论是从缓存还是走网络，都无法得到答复，这个时机，我们可以返回一个相对友好的页面，告诉用户，你可能离线了。
    */
    console.log('WORKER: fetch request failed in both cache and network.');
    return new Response('<h1>Service Unavailable</h1>', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
            'Content-Type': 'text/html'
        })
    });
}



// 这两个事件都只能在 worker 线程的 initial 生命周期里注册。（否则会失败，控制台可看到警告）

// self.addEventListener('error', event => {
//     // 上报错误信息
//     // 常用的属性：
//     // event.message
//     // event.filename
//     // event.lineno
//     // event.colno
//     // event.error.stack
// })
// // 捕获 promise 错误
// self.addEventListener('unhandledrejection', event => {
//     // 上报错误信息
//     // 常用的属性：
//     // event.reason
// })