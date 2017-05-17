export function X_Component(value) {
    const templateUrl = value.templateUrl;
    return function decorator(target) {
        target.template = (model) => TemplateResolver.templatePromise(templateUrl, model);
    }
}


class TemplateResolver {
    constructor() {
    }

    static hasCache(url) {
        if (this.cache[url]) {
            return this.cache[url];
        }
    }

    static setCache(url, resolve) {
        this.cache[url] = resolve;
    }

    static templatePromise(templateUrl, model) {
        let template = null;
        let cache = this.hasCache(templateUrl);
        if (cache) {
            template = cache;
        } else {
            template = this.getTemplateAsync(templateUrl);
            this.setCache(templateUrl, template);
        }

        return new Promise((resolve, reject) => {
            template.then(t => {
                let parsed = this.parseTemplate(t, model);
                resolve(parsed);
            });
        });
    }


    static parseTemplate(html, model) {
        var htmlDecoded = eval('`' + html + '`');
        var toNode = html =>
            new DOMParser().parseFromString(htmlDecoded, 'text/html').body.firstChild;
        return toNode;
    }

    static async getTemplateAsync(templateUrl) {
        let response = await
        fetch(templateUrl);
        let body = await
        response.body;
        let reader = await
        body.getReader().read();
        var htmlDecoded = new TextDecoder("utf-8").decode(reader.value);
        return htmlDecoded;
    }

}

TemplateResolver.cache = [];


// return new Promise((resolve, reject) => {
//     fetch(templateUrl).then(response => {
//         response.body.getReader().read().then(a => {
//             var htmlDecoded = new TextDecoder("utf-8").decode(a.value);
//             htmlDecoded = eval('`' + htmlDecoded + '`');
//             var toNode = html =>
//                 new DOMParser().parseFromString(htmlDecoded, 'text/html').body.firstChild;
//             this.setCache(templateUrl, toNode);
//             resolve(toNode);
//         });
//     });
// });