<h1 align="center">
  <img src="http://imgh.us/magic-rows-logo.svg" width="360" alt="magic-rows">
</h1>

<p align="center">
  <a href="http://standardjs.com/">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="js-standard-style">
  </a>
</p>

> Adds rows to your forms automagically ✨

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/6137112/16466796/cadd796e-3e44-11e6-8b74-6aaebc1c2cbd.gif" alt="magic-rows demo">
</p>

## Install

```console
$ npm install --save magic-rows
```

Or download the [minified version](dist/magic-rows.min.js).

*No dependencies.*

## Features

* ➡ **Row appending automation** — *adds a row only when the two previous are filled*
* ⛔ **Maximum rows restriction** — *enables only a certain number of rows*
* 🎩 **[Pattern detection](#pattern-detection)** — *learns from your patterns to follow your style*
* 📖 **[Pattern declaration](#pattern-declaration)** — *understands your rules to match better*

## Usage

Insert the script at the end of the `body`:

```html
<script src="node_modules/magic-rows/dist/magic-rows.min.js"></script>
```

Add **`data-action="magic-rows"`** to your `form`:

```html
<form data-action="magic-rows">
  <input type="text" id="player-1" placeholder="Player 1">

  <button>Play</button>
</form>
```

That's it!

## Options

You can change all the settings by adding the following `data` attributes to your `form`.

| Attributes                | Type      | Default | Example     | Description                             |
|---------------------------|-----------|---------|-------------|-----------------------------------------|
| `data-max-rows`           | `integer` | `6`     | `3`         | Maximum number of rows                  |
| `data-format-id`          | `string`  | `""`    | `player-$`  | Pattern to be applied to `id`s          |
| `data-format-name`        | `string`  | `""`    | `player_$$` | Pattern to be applied to `name`s        |
| `data-format-placeholder` | `string`  | `""`    | `Player @`  | Pattern to be applied to `placeholder`s |

### Values declaration

* `$` will be interpreted as a number
 * `$$` will be interpreted as a 2-digit number (`01`)
 * `$$$` will be interpreted as a 3-digit number (`001`)
 * ...
* `@` will be interpreted as a letter

## Examples

## Pattern detection

```html
<form data-action="magic-rows" data-max-rows="3">
  <input type="text" id="player-3" placeholder="Player 03">

  <button>Play</button>
</form>
```

Will generate:

```html
<input type="text" id="player-3" placeholder="Player 03">
<input type="text" id="player-4" placeholder="Player 04">
<input type="text" id="player-5" placeholder="Player 05">
```

## Pattern declaration

```html
<form
  data-action="magic-rows"
  data-max-rows="4"
  data-format-id="email-$"
  data-format-name="email-@"
  data-format-placeholder="Friend's #$ email"
>
  <input type="mail" id="friend-1" name="friend-A" placeholder="Enter your friends' email">

  <button>Play</button>
</form>
```

Will generate:

```html
<input type="mail" id="email-1" name="email-A" placeholder="Enter your friends's email">
<input type="mail" id="email-2" name="email-B" placeholder="Friend #2">
<input type="mail" id="email-3" name="email-C" placeholder="Friend #3">
<input type="mail" id="email-4" name="email-D" placeholder="Friend #4">
```

## Demo

See the [demo folder](demo/).

## License

MIT © [François Chalifour](http://francoischalifour.com)
