import barba from '@barba/core';
import gsap from 'gsap';

import activeMenu from './functions/activeMenu';
import moveMagnetFn from './functions/moveMagnet';
import { initLoaderHome, pageTransitionIn, initLoader } from './functions/page-loader';



function allFunction() {
    moveMagnetFn();
}

let isAnimating = false;

function overlayIn() {
    const overlayPath = document.querySelector('.overlay__path');
    const overlay = document.querySelector('.overlay');
    if (isAnimating) return;
    isAnimating = true;

    let tl = gsap.timeline({
        onComplete: () => isAnimating = false
    })
        .set(overlay, { zIndex: '1000' })
        .set(overlayPath, {
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath, {
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
            onStart: () => upcoming(),
        }, 0)
        .to(overlayPath, {
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
            onComplete: () => overlayOut()
        })


    function upcoming() {
        tl.to("main .once-in", {
            duration: 2,
            y: "-10vh",
            opacity:0,
            stagger: .05,
            ease: "Expo.easeOut",
        }, -0.05);
    }




}

function overlayOut() {
    console.log('call')
    const overlayPath = document.querySelector('.overlay__path');
    const overlay = document.querySelector('.overlay');
    gsap.timeline()
        .set(overlayPath, {
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath, {
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        .to(overlayPath, {
            duration: 0.8,
            ease: 'power4',
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        .from("main .once-in", {
            duration: 1,
            y: "50vh",
            stagger: .05,
            ease: "Expo.easeOut",
            clearProps: "true"
        }, 0)
        .set(overlay, { zIndex: '-1' })

}

function overlayTrigger() {
    overlayIn();
}

overlayTrigger();



barba.init({
    transitions: [
        {
            name: 'default',
            once(data) {
                console.log('once')
                activeMenu(data.next.url.href);
                allFunction();
                overlayTrigger();
            },
            async leave(data) {
                // console.log('leave')
                // pageTransitionIn();
                overlayTrigger();
                await delay(1000);
                data.current.container.remove();
            },
            async enter(data) {
                console.log('enter')
                allFunction();
                // overlayTrigger();
            }
        }, {
            name: 'to-home',
            from: {
            },
            to: {
                namespace: ['home']
            },
            once(data) {
                // initLoaderHome();
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