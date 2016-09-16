/**
 * Creates a delegate (callback) that sets the scope to obj.
 * Call directly on any function. Example: <code>this.myFunction.createDelegate(this)</code>
 * Will create a function that is automatically scoped to this.
 * @param {Object} obj (optional) The object for which the scope is set
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 *                                             if a number the args are inserted at the specified position
 * @return {Function} The new function
 */
Function.prototype.createDelegate = function(obj, args, appendArgs)
{
    var method = this;
    return function()
    {
        var callArgs = args || arguments;
        if (appendArgs === true)
        {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        } else if (typeof appendArgs == "number")
        {
            callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
            var applyArgs = [appendArgs, 0].concat(args); // create method call params
            Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
        }
        return method.apply(obj || window, callArgs);
    };
};


/* @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
 * @param {Object} obj (optional) The object for which the scope is set
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 *                                             if a number the args are inserted at the specified position
 * @return {Number} The timeout id that can be used with clearTimeout
 */
Function.prototype.defer = function(millis, obj, args, appendArgs)
{
    var fn = this.createDelegate(obj, args, appendArgs);
    if (millis > 0)
    {
        return setTimeout(fn, millis);
    }
    fn();
    return 0;
};
