"use strict";

export class PopularTagsComponent extends HTMLElement {

    constructor() {
        super();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    disconnectedCallback() {

    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.popularTags();
    }

    popularTags() {
        let tagList = this.querySelector('#tagList');

        fetch('https://conduit.productionready.io/api/tags').then(function (response) {
            return response.json();
        }).then(r => {
                while (tagList.firstChild) {
                    tagList.removeChild(tagList.firstChild);
                }
            r.tags.forEach(tag => {
                let tagEl = this.createNewTagElement(tag);
                tagEl.addEventListener('click', () => {
                    this.tagOnClick(tag);
                });
                tagList.appendChild(tagEl);
            });
        });
    }

    tagOnClick(tag) {
        var event = new CustomEvent('filter', { 'detail': tag });
        this.dispatchEvent(event);
    }

    createNewTagElement(tag) {
        const tagEl = document.createElement('a');
        tagEl.className = 'tag-pill tag-default';
        tagEl.innerHTML = tag;
        tagEl.href = '#/';
        tagEl.setAttribute('style', 'cursor: pointer;');
        return tagEl;
    }


    render() {
        return `
            <div class="sidebar">
                <p>Popular Tags</p>
                <div id="tagList" class="tag-list">
                    Loading tags ...
                </div>
            </div>
        `;
    }

}
