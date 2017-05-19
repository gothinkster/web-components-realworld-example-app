"use strict";
export class CFooterComponent extends HTMLElement {
    constructor() {
        super();
        // this.shadow = this.createShadowRoot();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        var template = `
           <footer>
                <div class="container">
                    <a href="/" class="logo-font">conduit</a>
                    <span class="attribution">
                      An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                    </span>
                </div>
            </footer>
        `;
        this.innerHTML = template;
    }


}
