export class CommentsContainerComponent extends HTMLElement {
    constructor() {
        super();
        this.comments = [];
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.slug = this.getAttribute('slug');
        fetch('https://conduit.productionready.io/api/articles/' + this.slug + '/comments').then((response) => {
            return response.json();
        }).then(r => {
            this.comments = r.comments;
            this.innerHTML = this.render();
        });
    }

    disconnectedCallback() {

    }

    render() {
        return `
            ${this.comments.map(comment => {
                    return `
                        <comment-preview 
                            username="${comment.author.username}" 
                            content="${comment.body}">
                        </comment-preview>
                    `;
            }).join(' ')}
            
        `;
    }
}
