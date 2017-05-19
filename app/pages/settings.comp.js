"use strict";

export class SettingsComponent extends HTMLElement {
    constructor(params) {
        super();
        this.$logoutButton = null;
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.$logoutButton = this.querySelector('#logoutButton');
        this.$logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('auth');
            location.href = '/';
        });
    }


    render() {
        return `
            <a href="#" id="logoutButton">logout</a>
        `;
    }


}
