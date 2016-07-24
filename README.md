This repo is a three.js demo of rendering sphere scenes.

## Usage

Put the data in the data.json following the schema descibed in the schema.js -- an array of scenes where each scene could have multiple widgets and each widget has one corresponding action. Then use `npm run build` in development environment or `npm run deploy` in production environment to produce the bundle.js that contains all the data.

### To Add a New Widget

Create a new `[widget-type].js` file in `app/widget-painters`, and export a function `f ( PlainObject widget, Scene scene )`. 

### To Add a New Action

Create a new `[action-name].js` file in `app/action-handlers`, and export a function `f ({ Renderer renderer, Scene scene, Camera camera, Control contol, data_source }) -> g (PlainObject action_payload)`

## License

MIT
