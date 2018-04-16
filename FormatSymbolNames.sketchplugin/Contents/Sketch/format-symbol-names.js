function onRun(context) {
  var document = require('sketch/dom').getSelectedDocument();
  var UI = require('sketch/ui');

  var page = document.selectedPage;
  var layers = page.layers;

  var symbolCount = 0

  layers.forEach(layer => {
    if (layer.type == 'SymbolMaster') {
      layer.name = formatName(layer.name);
      symbolCount++
    }
  });

  if (symbolCount == 1) {
    var message = 'Formatting applied to ' + symbolCount + ' symbol master name';
  } else {
    var message = 'Formatting applied to ' + symbolCount + ' symbol master names';
  }

  UI.message(message);
}

////////////////////////////////////////////////////////////////////////////////

function formatName(str) {
  return str.split('/').map(subStr => {
    return titleCase(subStr.trim());
  }).join('/');
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
