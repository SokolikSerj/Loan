export default class Mask {
    constructor({selector = null, template = '', type = 'none'}) {
        this.selector = document.querySelectorAll(selector);
        this.template = template;
        this.type = type;
    }

    setCursorPosition(pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();

        }
    }

    createMask(event) {
        let matrix = this.template,
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = event.target.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        event.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) :
                i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (event.target.value.length == 2) {
                event.target.value = '';
            }
        } else {
            this.setCursorPosition(event.target.value.length, event.target);
        }
    }

    init() {
        if (this.type === 'phone') {
            this.selector.forEach(input => {
                input.addEventListener('input', (e) => this.createMask(e));
                input.addEventListener('focus', (e) => this.createMask(e));
                input.addEventListener('blur', (e) => this.createMask(e));
            });
        }
        if (this.type === 'text') {
            this.selector.forEach(input => {
                input.addEventListener('input', () => {
                    let str = input.value;
                    input.value = str.replace(/[а-яё]/ig, '');
                });
            });
        }
    }
}