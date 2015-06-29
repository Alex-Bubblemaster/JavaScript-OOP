/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * // method removeAttribute(attribute)
 */


/* Example

 var meta = Object.create(domElement)
 .init('meta')
 .addAttribute('charset', 'utf-8');

 var head = Object.create(domElement)
 .init('head')
 .appendChild(meta)

 var div = Object.create(domElement)
 .init('div')
 .addAttribute('style', 'font-size: 42px');

 div.content = 'Hello, world!';

 var body = Object.create(domElement)
 .init('body')
 .appendChild(div)
 .addAttribute('id', 'cuki')
 .addAttribute('bgcolor', '#012345');

 var root = Object.create(domElement)
 .init('html')
 .appendChild(head)
 .appendChild(body);

 console.log(root.innerHTML);
 Outputs:
 <html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
 */


function solve() {
    var domElement = (function () {

        function isValidDomElement(value) {
            return value.match(/^[a-z0-9]+$/i);
        }

        function isValidAttribute(value) {
            return value.match(/^[A-Za-z0-9-]+$/i);
        }

        var domElement = {
            init: function (type) {
                this.type = type;
                this.attributes = [];
                this.children = [];
                this.content = '';
                if (!isValidDomElement(type)) {
                    throw new Error();
                }
                return this;
            },
            removeAttribute: function (attributeName) {
                for (var i = 0; i < this.attributes.length; i += 1) {
                    if (this.attributes[i].name === attributeName) {
                        this.attributes.splice(i, 1);
                        return this;
                    }
                }
                throw new Error();
            },
            get parent() {
                return this._parent;
            },
            set parent(value) {
                this._parent = value;
            },
            appendChild: function (child) {
                child.parent = this;
                this.children.push(child);
                return this;
            },
            addAttribute: function (currentName, value) {
                if (!isValidAttribute(currentName)) {
                    throw new Error();
                }
                var i,
                    len,
                    isUnique = true,
                    indexOfRepeatElement;

                for (i = 0, len = this.attributes.length; i < len; i += 1) {
                    if (this.attributes[i].name === currentName) {
                        isUnique = false;
                        indexOfRepeatElement = i;
                        break;
                    }
                }

                if (isUnique) {
                    this.attributes.push(
                        {name: currentName, value: value});
                } else {
                    this.attributes[indexOfRepeatElement].value = value;
                }

                return this;
            },
            get innerHTML() {
                var output = '<' + this.type;

                if (this.attributes.length > 0) {
                    this.attributes.sort(function (firstAttribute, secondAttribute) {
                        if (firstAttribute.name > secondAttribute.name) {
                            return 1;
                        } else if (firstAttribute.name < secondAttribute.name) {
                            return -1;
                        }
                        return 0;
                    });
                    var i,
                        len;
                    for (var i = 0, len = this.attributes.length; i < len; i += 1) {
                        output += ' ' + this.attributes[i].name + '=' + '"' + this.attributes[i].value + '"';
                    }
                }
                output += '>';
                if (this.children.length > 0) {
                    for (i = 0, len = this.children.length; i < len; i += 1) {
                        if (typeof(this.children[i]) == 'string') {
                            output += this.children[i];
                        } else {
                            output += this.children[i].innerHTML;
                        }
                    }
                } else {
                    output += this.content;
                }
                output += '</' + this.type + '>';
                return output;
            },
            get content() {
                return this._content;
            },
            set content(value) {
                if (this.children.length === 0) {
                    this._content = value;
                }
            }
        };
        return domElement;
    }());

    return domElement;
}

module.exports = solve;
