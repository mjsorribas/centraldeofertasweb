JST.getTemplate = function (name) {
    return this['.tmp/public/templates/' + name + '.html']();
};


/**
 * Searches the array of objects specifying the key and value. if the value is a string it will return the first occurrency
 * 
 * @param {string} key the name of the property to search for
 * @param {type} value the value to search for
 * @returns {object} returns null if none found
 */
Array.prototype.findBy = function (key, value) {
    for (var k = 0; k < this.length; k++) {
        var item = this[k];
        if (typeof value === 'string') {
            if (item[key].search(value) !== -1) {
                return item;
            }
        } else if (typeof value === 'number') {
            if (parseInt(item[key]) === value) {
                return item;
            }
        }
    }
    return null;
};
/**
 * Searches the an index in an array of objects specifying the key and value. if the value is a string it will return the first occurrency
 * 
 * @param {string} key the name of the property to search for
 * @param {type} value the value to search for
 * @returns {number} the index of the object in the array | null if none found
 */
Array.prototype.findKeyBy = function (key, value) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (typeof value === 'string') {
            if (item[key].search(value) !== -1) {
                return i;
            }
        } else if (typeof value === 'number') {
            if (parseInt(item[key]) === value) {
                return i;
            }
        }
    }
    return null;
};
