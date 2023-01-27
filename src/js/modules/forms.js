import { postData } from "../services/requests";

export default class Forms {
    constructor(selector, url) {
        this.selector = document.querySelectorAll(selector);
        this.path = url;
        this.message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Что-то пошло не так',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png',
        };
    }

    init() {
        this.selector.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    max-width: 340px;
                    background: grey;
                    border-radius: 4px;
                    margin: 10px 0 0 0;
                    padding: 8px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 900;      
                `;
                form.parentNode.appendChild(statusMessage);


                let statusImg = document.createElement('img');
                statusImg.style.cssText = `
                    heigth: 65px;
                    width: 65px;
                `;
                statusImg.setAttribute('src', this.message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);

                let textMessage = document.createElement('div');
                textMessage.classList.add('animated', 'fadeInUp');
                textMessage.style.cssText = `
                    
                `;
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);

                const formData = new FormData(form);

                postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusImg.setAttribute('src', this.message.ok);
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', this.message.fail);
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    }
}