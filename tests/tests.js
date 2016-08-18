'use strict';

const assert   = require('assert'),
      vars     = require('./variables'),
      isString = require(vars.path);

module.exports = {
    'js-partial-is-string' : () => {
        let _undefined = undefined,
            _null      = null,
            _boolean   = false,
            _number    = 0,
            _string    = 'str',
            _function  = () => {};

        assert(isString()           === false);
        assert(isString(_undefined) === false);
        assert(isString(_null)      === false);
        assert(isString(_boolean)   === false);
        assert(isString(_number)    === false);
        assert(isString(_string)    === true);
        assert(isString(_function)  === false);
    }
};
