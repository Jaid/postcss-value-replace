# postcss-value-replace

[PostCSS](https://github.com/postcss/postcss) plugin that replaces values specified in options. This is an easy way to create flexible themes.

## Example

Input
```css
a {
    color: replace(linkColor);
    background: rgba(replace("red"), replace("green"), replace("blue"), replace(alpha));
    margin: replace("margin");
    font-weight: replace(font-weight);
}
```
Options
```js
postcss([require("postcss-value-replace")({
    replace: {
         linkColor: "#00CC00",
         red: 200,
         green: 60,
         blue: 80,
         alpha: 0.5,
         margin: "5px 2px 5px 2px",
         "font-weight": "bold"
    }
})])
```
Output
```css
a {
    color: #00CC00;
    background: rgba(200, 60, 80, 0.5);
    margin: 5px 2px 5px 2px;
    font-weight: bold;
}
```

## Options

 - `functionName = "replace"` Name of the CSS function postcss-value-replace looks for
 - `replace = {}` Object where keys are the first argument of the CSS replace() function and values the corresponding replacement value

Add key-value-pairs to `replace` to make this plugin replace values in your CSS.

## Plugin order

This should be the first plugin in your plugins array.