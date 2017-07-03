var gonzales = require('gonzales-pe')

var computeCss = function (styles) {
  var cssArray = []
  var parsedStylesheet = gonzales.parse(styles)
  parsedStylesheet = parsedStylesheet.content

  for (var i = 0; i < parsedStylesheet.length; i++) {
    if (parsedStylesheet[i].type === 'ruleset') {
      var ruleset = parsedStylesheet[i].toString()
      cssArray.push('.code-render ' + ruleset)
    }
  }

  styles = cssArray.join('')

  return styles
}

export default computeCss
