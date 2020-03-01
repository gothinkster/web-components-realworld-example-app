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
        fetch('https://conduit.productionready.io/api/articles/' + this.slug + '/comments')
            .then(response => response.json())
            .then(r => {
                this.comments = r.comments;
                this.innerHTML = this.render();
            });
    }

    disconnectedCallback() {

    }

    refresh() {
        this.innerHTML = this.render();
    }

    render() {
        return `
            ${this.comments.map(comment => `
                <comment-preview 
                    username="${comment.author.username}" 
                    content="${comment.body}"
                    image="${comment.author.image}"
                    created-at="${comment.createdAt}"
                >
                </comment-preview>
            `
            ).join(' ')}
        `;
    }
}
