export default class ShowInfo {
    constructor(trigger) {
        this.trigger = document.querySelectorAll(trigger);
    }

    init() {
        this.trigger.forEach(btn => {
            btn.addEventListener('click', () => {
                if (getComputedStyle(btn.closest('.module__info-show').nextElementSibling).display == 'none') {
                    btn.closest('.module__info-show').nextElementSibling.classList.add('animated', 'fadeInUp');
                    btn.closest('.module__info-show').nextElementSibling.style.display = 'block';
                } else {
                    btn.closest('.module__info-show').nextElementSibling.style.display = 'none';
                }
            });
        });
    }
}