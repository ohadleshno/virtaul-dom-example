import {areNodesDifferent} from "./diffChecker";
import {ParsedComponent} from "./ParsedComponent";

function makeComponent(tag: string) {
  return (attributes:any, children:any) => {
    return {
      tag,
      attributes,
      children
    };
  };
}

function setAttributes(element:any, attributes:any) {
  return Object
    .keys(attributes)
    .forEach(a => element.setAttribute(a, attributes[a]));
}


export function renderNode({ tag, children = '', attributes = {} }: ParsedComponent) {
  const element: HTMLElement = document.createElement(tag);
  setAttributes(element, attributes);

  if ((typeof children) === 'string') {
    element.innerHTML = children as string;
  } else {

    (children as any[]).map(renderNode).forEach(element.appendChild.bind(element));
  }

  return element;
}

export function diffAndReRender(previousNode:ParsedComponent, currentNode:ParsedComponent){
  if (areNodesDifferent(currentNode, previousNode)) {
    // Is the current node different? If so, replace it.
    const nodeId = currentNode.attributes.id;
    console.log('Replacing DOM node:', nodeId);

    return document
        .querySelector(`#${nodeId}`)
        ?.replaceWith(renderNode(currentNode));
  }
  if (currentNode.children instanceof Array) {
    // If not, and the children prop is an array, recursivelly call this function for each child
    currentNode.children.forEach((currChildNode, index) => {
      diffAndReRender(previousNode.children[index], currChildNode);
    });
  }
};

export const div = makeComponent('div');
export const p = makeComponent('p');
export const h1 = makeComponent('h1');
