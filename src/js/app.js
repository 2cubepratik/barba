import barba from '@barba/core';

import activeMenu from './functions/activeMenu';
import moveMagnetFn from './functions/moveMagnet';
import { initLoaderHome, pageTransitionIn , initLoader } from './functions/page-loader';



function allFunction() {
    moveMagnetFn();
}

barba.init({
    transitions: [
        {
            name: 'default',
            once(data) {
                console.log('once')
                activeMenu(data.next.url.href);
                allFunction();
                initLoader();
            },
            async leave(data) {
                // console.log('leave')
                pageTransitionIn();
                await delay(495);
                // data.current.container.remove();
            },
            async enter(data) {
                console.log('enter')
                allFunction();
                initLoader();
            }
        }, {
            name: 'to-home',
            from: {
            },
            to: {
                namespace: ['home']
            },
            once(data) {
                initLoaderHome();
                allFunction();
            }
        }
    ]
});


// barba.hooks.beforeOnce((data) => {
//     console.log('beforeOnce')
//     console.log(data.next.url.href)
//     activeMenu(data.next.url.href);
// });







barba.hooks.beforeLeave((data) => {
    activeMenu(data.trigger.href);
});


function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}