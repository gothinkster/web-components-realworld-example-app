# ![RealWorld Example App](https://cloud.githubusercontent.com/assets/556934/26126314/021150f8-3a3a-11e7-87bd-7bfc7616f6f8.png)

### Vanilla JS Web Components codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://conduit-vanilla.herokuapp.com/#/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with Vanilla JS including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the Vanilla JS community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Getting started

Checkout the `esm` branch after cloning the repo:

```shell
$ git clone git@github.com:gothinkster/web-components-realworld-example-app.git
$ cd web-components-realworld-example-app
$ git checkout --track origin/esm
```

You can now serve the `./app` folder with any local server of your choosing and start developing. The project uses [servor](https://github.com/lukejacksonn/servor) in the package.json start script so to use that you can do:

```shell
$ yarn
$ yarn start
```

to start development, and:

```shell
$ yarn build
```

to produce a legacy bundle that runs in old browsers up to IE 11.

## More reading

> Read this [blog post](https://github.com/gothinkster/web-components-realworld-example-app/wiki/Converting-existing-project-to-use-ES-modules-in-production) for a detailed explanation of all the changes that were needed to convert this project from "webpack and babel all the things" to "untranspiled ESM in dev and modern browsers / legacy webpack bundle in old browsers".