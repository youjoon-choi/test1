const $ = e => document.querySelector(e);
        
class ScrollEvent {
    static scrollEventHandler (elTag, v) {
        let preScrollVal = 0;
        document.addEventListener('scroll', e => {
            const scrollVal = document.documentElement.scrollTop;
            let nextScrollVal = scrollVal;
            const condition = (preScrollVal < nextScrollVal && scrollVal >= v);
            const $el = $(elTag);
            $el.style.opacity = condition ? 1 : 0;
            condition ? $el.classList.add('active') : $el.classList.remove('active');
            preScrollVal = nextScrollVal;
        });
    }
    static scrollTopEventHandler (elTag, pos, motion) {
        $(elTag).addEventListener('click', e => {
            console.log('scrollTopEvent Start.', elTag, pos, motion);
            e.preventDefault();
            window.scrollTo({
                top : pos, 
                behavior: motion,
            });
        });
    }
}

window.onload = () => {
    ScrollEvent.scrollEventHandler ('.nav', 100);
    ScrollEvent.scrollEventHandler ('.scrollTop', 100);
    ScrollEvent.scrollTopEventHandler ('.scrollTop__btn-top', 0, 'smooth');

    const gnbHandler = () => {
        $('.gnb-closeBtn').addEventListener('click', () => {
            $('.gnbArea').
        });
    }
    gnbHandler();
}