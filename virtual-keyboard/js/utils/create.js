/**
 * @param {String} tagName
 * @param {String} classNames
 * @param {HTMLElements} children
 * @param  {...array} dataAttr
 */

export default function create(tagName, classes, children, ...dataAttr) {
    let element = null;
    try {
      element = document.createElement(tagName);
    } catch (error) {
      throw new Error('Unable to create HTMLElement! Give a proper tag name.');
    }
  
    if (classes) element.classList.add(...classes.split(' '));
  
    if (children && Array.isArray(children)) {
      children.forEach((child) => element.append(child));
    } else if (children && typeof children === 'string') element.innerHTML = children;
    else if (children && typeof children === 'object') element.append(children);
  
    if (dataAttr.length) {
      dataAttr.forEach(([attrName, attrValue]) => {
        if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
          element.setAttribute(attrName, attrValue);
        } else {
          element.dataset[attrName] = attrValue;
        }
      });
    }
  
    return element;
  }
  