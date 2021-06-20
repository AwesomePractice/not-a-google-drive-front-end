/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
export function searchTree(element, matchingId) {
  if (element.id === matchingId) {
    return element;
  }
  if (element.children != null) {
    let i;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingId);
    }
    return result;
  }
  return null;
}
