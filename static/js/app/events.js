var app = app || {};
app.events = app.events || {};
app.events.registeredListeners = {};

/**
 *
 * @param eventName
 * @param params {Array}
 */
app.events.fireEvent = function(eventName, params)
{
    var listeners = app.events.registeredListeners[eventName] || [];
    for (var i = 0, len = listeners.length; i < len; i++)
    {
        listeners[i].apply(this, params || []);
    }

};

app.events.addEventListener = function(eventName, listener)
{
    app.events.registeredListeners[eventName] = app.events.registeredListeners[eventName] || [];
    app.events.registeredListeners[eventName].push(listener);
};
