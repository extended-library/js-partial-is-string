/*
 |----------------------------------------------------------------------------------------------------------------------
 | A partial to check whether an object is a string.
 |----------------------------------------------------------------------------------------------------------------------
 */

/**
 * More information on [JavaScript Open Standards]{@link https://github.com/jsopenstd/jsopenstd}.
 *
 * @namespace js.partial
 * @version 0.0.1
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @license [MIT]{@link https://github.com/jsopenstd/js-partial-foreach/blob/master/license.md}
 */

/**
 * UMD - [returnExports.js pattern]{@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function(root, factory) {
    // AMD
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // CommonJS
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser
    } else {
        root.js_partial_isString = factory();
    }
}(this, function() {
    'use strict';

    /**
     * Determines whether an object is a string.
     * Handles object wrappers and fake strings (@@toStringTag).
     *
     * @param {*}            object                      - The object to check.
     * @param {boolean|null} [handleWrapperObject=false] - Handle object wrappers (e.g.: new String()).
     *                                                     If === true, it will return true for object wrappers
     *                                                     for strings too.
     *                                                     Pass 'null' to skip the argument by leaving
     *                                                     with the default value.
     * @param {boolean}      [handleFakeString=false]    - Handle fake strings (check unit tests for examples).
     *                                                     If === true, it will return false for fake strings.
     *
     * @returns {boolean} If the object is string, it will be === true.
     */
    return function isString(object, handleWrapperObject, handleFakeString) {

        // handle @@toStringTag first (before regular check and handleWrapperObject)
        // as it is possible to fake '[object String]'
        if (handleFakeString) {

            /* istanbul ignore else */
            if (typeof Symbol === 'function' &&
                typeof Symbol.toStringTag === 'symbol') {

                if (Object.prototype.toString.call(object) === '[object String]') {
                    try {
                        String.prototype.valueOf.call(object);
                        return true;

                    } catch (e) {
                        return false;
                    }
                }
            }
        }

        if (typeof object === 'string') {
            return true;
        }

        if (handleWrapperObject === true) {
            return Object.prototype.toString.call(object) === '[object String]';
        }

        return false;
    };
}));
