import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[1]);
        } else if (this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[1]);
        }
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
    }

    prevSlide() {
        for (let i = this.slides.length - 1; i > 0; i--) {
            if (this.slides[i].tagName !== "BUTTON") {
                let active = this.slides[i];
                this.container.insertBefore(active, this.slides[0]);
                this.decorizeSlides();
                break;
            }
        }
    }

    play() {
        if (this.autoplay) {
            this.timer = setInterval(() => this.nextSlide(), 5000);
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => this.prevSlide());

        if (this.autoplay) {
            this.next.addEventListener('mouseenter', () => {
                this.stop();
            });
            this.prev.addEventListener('mouseenter', () => {
                this.stop();
            });
            this.container.addEventListener('mouseenter', () => {
                this.stop();
            });
            this.next.addEventListener('mouseleave', () => {
                this.play();
            });
            this.prev.addEventListener('mouseleave', () => {
                this.play();
            });
            this.container.addEventListener('mouseleave', () => {
                this.play();
            });
        }
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
            this.bindTriggers();
            this.decorizeSlides();
            this.play();
        } catch (error) {}
    }
}