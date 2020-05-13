export class CNavComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.createShadowRoot();
        this._complete = 0;
    }

    get complete() {
        return this._complete;
    }

    set complete(val) {
        this.setAttribute('complete', val);
    }

    static get observedAttributes() { return ["complete"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        // name will always be "country" due to observedAttributes
        switch (name) {
            case 'complete': {
                this._complete = newValue;
            }
        }
    }
    connectedCallback() {
        var template = `
            <h1>test ${this.complete}</h1>
            <a>increment</a>
        `;


        this.shadow.innerHTML = template;
        var btn = this.shadow.querySelector('a');
        btn.addEventListener('click',() => {
            this._complete = +this._complete + +1;
            this.connectedCallback();
        });
    }

    increment() {
    }


}
window.customElements.define("c-nav", CNavComponent);
