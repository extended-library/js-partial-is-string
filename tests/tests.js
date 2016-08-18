'use strict';

const assert   = require('assert'),
      vars     = require('./variables'),
      isString = require(vars.path);

module.exports = {
    'js-partial-is-string' : () => {
        let _undefined    = undefined,
            _null         = null,
            _boolean      = false,
            _number       = 0,
            _string       = 'str',
            _function     = () => {},
            _array        = [],
            _object       = {},
            _stringObject = new String(),
            _fakeString   = {
                toString : () => '',
                valueOf  : () => '',
            };

        // apply @@toStringTag dark magic
        _fakeString[Symbol.toStringTag] = 'String';

        assert(isString()           === false);
        assert(isString(_undefined) === false);
        assert(isString(_null)      === false);
        assert(isString(_boolean)   === false);
        assert(isString(_number)    === false);
        assert(isString(_string)    === true);
        assert(isString(_function)  === false);
        assert(isString(_array)     === false);
        assert(isString(_object)    === false);

        assert(isString(_number)              === false);
        assert(isString(_number, true)        === false);
        assert(isString(_number, true,  true) === false);
        assert(isString(_number, false, true) === false);
        assert(isString(_number, null,  true) === false);

        assert(isString(_string)              === true);
        assert(isString(_string, true)        === true);
        assert(isString(_string, true,  true) === true);
        assert(isString(_string, false, true) === true);
        assert(isString(_string, null,  true) === true);

        assert(isString(_stringObject)              === false);
        assert(isString(_stringObject, true)        === true);
        assert(isString(_stringObject, true,  true) === true);
        assert(isString(_stringObject, false, true) === true);
        assert(isString(_stringObject, null,  true) === true);

        assert(isString(_fakeString)              === false);
        assert(isString(_fakeString, true)        === true);
        assert(isString(_fakeString, true,  true) === false);
        assert(isString(_fakeString, false, true) === false);
        assert(isString(_fakeString, null,  true) === false);
    }
};
