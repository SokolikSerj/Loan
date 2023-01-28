import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-min";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Mask from "./modules/mask";
import Forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({container: '.page', btns: '.next'});
    slider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Mask({
        selector: '[name="phone"]',
        template: '+1 (___) ___ ____',
        type: 'phone'
    }).init();

    new Mask({
        selector: '[name="email"]',
        template: '',
        type: 'text'
    }).init();

    new Forms('form', 'assets/question.php').init();
});