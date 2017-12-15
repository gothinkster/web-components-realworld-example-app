"use strict";
import {Http} from "../http/http";
import {RouterHandler} from "../router/router-handler";

export class EditorComponent extends HTMLElement {
    constructor(params) {
        super();
        this.slug = params ? params.slug : null;
        this.article = {};

        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    disconnectedCallback() {
        this.$tagInput.removeEventListener('keyup', this.addTag);
        this.$tagList.removeEventListener('click', this.removeTag);
        this.$submitButton.removeEventListener('click', this.submitHandler);
    }

    connectedCallback() {
        this.innerHTML = this.render();

        this.$title = this.querySelector('#title');
        this.$description = this.querySelector('#description');
        this.$body = this.querySelector('#body');
        this.$tagList = this.querySelector('.tag-list');

        this.$errorMessages = this.querySelector('.error-messages');
        this.$tagInput = this.querySelector('#tag-input');
        this.$tagInput.addEventListener('keyup', this.addTag);
        this.$tagList.addEventListener('click', this.removeTag);
        this.$submitButton = this.querySelector('#submit-button');
        this.$submitButton.addEventListener('click', this.submitHandler);

        if (this.slug) {
            Http.instance.doGet('/articles/' + this.slug, true).then((response) => {
                return response.json();
            }).then(r => {
                this.article = r.article;

                this.$title.value = this.article.title;
                this.$description.value = this.article.description;
                this.$body.value = this.article.body;
                this.$tagList.innerHTML = (this.article.tagList || []).map(tag => `
                    <span class="tag-default tag-pill">
                        <i class="ion-close-round"></i>
                        ${tag}
                    </span>`
                ).join('');
            });
        }
    }

    addTag(e) {
        if (e.keyCode != 13) return;
        e.preventDefault();
        
        const newTag = this.$tagInput.value.trim();
        if (!this.article.tagList) this.article.tagList = [];
        this.article.tagList.push(newTag);

        const $newTag = document.createElement('span');
        $newTag.className = 'tag-default tag-pill';
        $newTag.innerHTML = `<i class="ion-close-round"></i>${newTag}`
        this.$tagList.appendChild($newTag);
        this.$tagInput.value = '';
    }

    removeTag(e) {
        if (!e.target.classList.contains('ion-close-round')) return;

        const $tag = e.target.parentNode;
        $tag.parentNode.removeChild($tag);
        
        const tag = $tag.lastChild.data.trim();
        this.article.tagList = this.article.tagList.filter(current => current != tag);
    }

    _displayErrors(errors, $errorMessages) {
        for (var prop in errors) {
            if (!errors.hasOwnProperty(prop)) continue;
            while ($errorMessages.firstChild) {
                $errorMessages.removeChild($errorMessages.firstChild);
            }
            errors[prop].forEach(m => {
                let text = prop + " " + m;
                let errorItem = document.createElement('li');
                errorItem.textContent = text;
                $errorMessages.appendChild(errorItem);
            });
        }
    }

    submitHandler(e) {

        const data = {
            "article": {
                "title": this.$title.value,
                "description": this.$description.value,
                "body": this.$body.value,
                "tagList": this.article.tagList
            }
        }
        const doRequest = this.slug
            ? Http.instance.doPut(`/articles/${this.slug}`, JSON.stringify(data), true)
            : Http.instance.doPost("/articles", JSON.stringify(data), true);

        doRequest.then(r => {
            if (r.errors) {
                this._displayErrors(r.errors, this.$errorMessages);
            } else {
                const slug = r.article.slug;
                RouterHandler.getInstance.router.navigate(`/article/${slug}`);
            }
        });
        
    }

    render() {
        return `
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
      <ul class="error-messages"></ul>
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" id="title" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" id="description" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" id="body" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" id="tag-input" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button id="submit-button" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
        `;
    }


}
