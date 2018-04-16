function onRun(context) {
  var document = require('sketch/dom').getSelectedDocument();
  var UI = require('sketch/ui');

  var page = document.selectedPage;
  var symbols = page.layers.filter(layer => layer.type === 'SymbolMaster');

  symbols.forEach(symbol => {
    symbol.name = formatName(symbol.name);
  });

  switch (symbols.length) {
    case 0:
      UI.message('This page does not contain any symbol masters');
      break;
    case 1:
      UI.message('Name formatting applied to 1 symbol master');
      break;
    default:
      UI.message('Name formatting applied to ' + symbols.length + ' symbol masters');
  }

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
