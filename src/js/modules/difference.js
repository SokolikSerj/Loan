export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindTriggers(container, content, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== content.length - 2) {
                content[counter].style.display = 'flex';
                counter++;
            } else {
                content[counter].style.display = 'flex';
                content[content.length - 1].remove();
            }
        });
    }

    hideItems(contant) {
        contant.forEach((item, i, arr) => {
            if (i !== arr.length -1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
}