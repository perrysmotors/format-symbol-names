const DOM = require("sketch/dom");
const UI = require("sketch/ui");

export default function() {
  format("SymbolMaster");
}

export function onArtboards() {
  format("Artboard");
}

export function onLayers() {
  format("Layer");
}

function format(actionType) {
  const document = DOM.getSelectedDocument();
  const selection = document.selectedLayers;

  const message = {};
  message.targetDescription = selection.isEmpty ? "This page" : "The selection";
  if (actionType === "Artboard") {
    message.singular = "artboard";
    message.plural = "artboards";
  } else if (actionType === "SymbolMaster") {
    message.singular = "symbol master";
    message.plural = "symbol masters";
  } else {
    message.targetDescription = "The selection";
    message.singular = "layer";
    message.plural = "layers";
  }

  const layers = selection.isEmpty
    ? document.selectedPage.layers
    : selection.layers;
  const filteredLayers =
    actionType === "Layer"
      ? selection.layers
      : layers.filter(layer => layer.type === actionType);
  filteredLayers.forEach(layer => {
    layer.name = formatName(layer.name);
  });

  switch (filteredLayers.length) {
    case 0:
      UI.message(
        message.targetDescription + " does not contain any " + message.plural
      );
      break;
    case 1:
      UI.message("Name formatting applied to 1 " + message.singular);
      break;
    default:
      UI.message(
        "Name formatting applied to " +
          filteredLayers.length +
          " " +
          message.plural
      );
  }
}

////////////////////////////////////////////////////////////////////////////////

function formatName(str) {
  return str
    .split("/")
    .map(subStr => {
      return titleCase(subStr.trim());
    })
    .join("/");
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
