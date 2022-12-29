import $ from 'jquery';

function activeMenu(url) {
    const links = Array.from(document.querySelectorAll('.links-wrap li'));

    links.map((link, index) => {
        const linkHref = link.querySelector('a').href;
        const a = linkHref == url ? 1 : 0;
        if (a == 1) {
            links[index].classList.add('active');
        } else {
            links[index].classList.remove('active');
        }
    });



}

export default activeMenu;