
export class CBannerComponent extends HTMLElement {
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
        this.innerHTML = `
            <div class="banner">
                <div class="container">
                    <h1 class="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>
        `;
    }
}
