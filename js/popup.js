class Popup {
    constructor (el, options) {
        this.$el = document.querySelector(el);
        this.options = Object.assign({
            left: 20,
            top: 20,
            autoplay: true,
            loop: true,
            delay: 3000,
            expires: 1,
        }, options);
        this.cookieInfo = {name: this.$el.className};
        this.eventHandler();
    }
    posHandler () {
        let leftPos = this.options.left;
        let topPos = this.options.top;
        let x = 0;
        let  y = 0;
        this.$el.style.left = (typeof leftPos == 'string') ?  leftPos : `${leftPos}px`;
        (typeof leftPos == 'string') ? (leftPos[leftPos.length - 1] == '%') ? x = -50 : x : x;
        this.$el.style.top = (typeof topPos == 'string') ?  topPos : `${topPos}px`;
        (typeof topPos == 'string') ? (topPos[topPos.length - 1] == '%') ? y = -50 : y : y;
        if ((typeof leftPos == 'string') || (typeof topPos == 'string')) {
            this.$el.style.transform = `translate(${x}%, ${y}%)`;
        }
    }

    swiperHandler () {
        const popupSwiper = new Swiper(this.$el.querySelector('.swiper'), {
            loop: this.options.loop,
            autoplay: (this.options.autoplay == true) ? {delay: this.options.delay}: false, 
        });
        return popupSwiper;
    }

    setCookie () {
        const currDate = new Date();
        currDate.setDate(currDate.getDate() + this.options.expires);
        document.cookie = this.cookieInfo.name + "= done; expires =" + currDate.toUTCString() + ";";
        this.cookieInfo.expires = currDate;
    }

    eventHandler () {
        console.dir(this);
        if (document.cookie.indexOf(`${this.cookieInfo.name}=done`) >= 0) {
            this.$el.parentElement.remove();
            return;
        }
        this.posHandler();
        if (this.$el.querySelector('.swiper')) this.swiperHandler();
        this.$el.parentElement.style.visibility = 'visible';
        const closeEvent = () => {
            this.$el.parentElement.remove();
            this.setCookie();
        }
        this.$el.querySelector('.popup__foot__btn-close').addEventListener('click', closeEvent);
        this.$el.nextElementSibling.addEventListener('click', closeEvent);
    }
}
