"use strict";

export class EditorComponent extends HTMLElement {
    constructor(params) {
        super();

    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.innerHTML = this.render();
    }


    render() {
        return `
               editor
        `;
    }


}
