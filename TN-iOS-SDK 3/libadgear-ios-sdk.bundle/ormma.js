/*  Copyright (c) 2011 The ORMMA.org project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */

(function() {
    var ormma = window.ormma = {};
    
    // CONSTANTS ///////////////////////////////////////////////////////////////
    
    var STATES = ormma.STATES = {
        UNKNOWN     :'unknown',
        DEFAULT     :'default',
        RESIZED     :'resized',
        EXPANDED    :'expanded',
        HIDDEN      :'hidden'
    };
    
    var EVENTS = ormma.EVENTS = {
        ASSETREADY          :'assetReady',
        ASSETREMOVED        :'assetRemoved',
        ASSETRETIRED        :'assetRetired',
        ERROR               :'error',
        INFO                :'info',
        HEADINGCHANGE       :'headingChange',
        KEYBOARDCHANGE      :'keyboardChange',
        LOCATIONCHANGE      :'locationChange',
        NETWORKCHANGE       :'networkChange',
        ORIENTATIONCHANGE   :'orientationChange',
        READY               :'ready',
        RESPONSE            :'response',
        SCREENCHANGE        :'screenChange',
        SHAKE               :'shake',
        SIZECHANGE          :'sizeChange',
        STATECHANGE         :'stateChange',
        TILTCHANGE          :'tiltChange',
        VIEWABLECHANGE      :'viewableChange'
    };
    
    var CONTROLS = ormma.CONTROLS = {
        BACK    :'back',
        FORWARD :'forward',
        REFRESH :'refresh',
        ALL     :'all'
    };
    
    var FEATURES = ormma.FEATURES = {
        LEVEL1      :'level-1',
        LEVEL2      :'level-2',
        LEVEL3      :'level-3',
        SCREEN      :'screen',
        ORIENTATION :'orientation',
        HEADING     :'heading',
        LOCATION    :'location',
        SHAKE       :'shake',
        TILT        :'tilt',
        NETWORK     :'network',
        SMS         :'sms',
        PHONE       :'phone',
        EMAIL       :'email',
        CALENDAR    :'calendar',
        CAMERA      :'camera',
        AUDIO       :'audio',
        VIDEO       :'video',
        MAP         :'map'
    };
    
    var NETWORK = ormma.NETWORK = {
        OFFLINE :'offline',
        WIFI    :'wifi',
        CELL    :'cell',
        UNKNOWN :'unknown'
    };
    
    // PRIVATE PROPERTIES (sdk controlled) //////////////////////////////////////////////////////
    
    var state = STATES.UNKNOWN;
    
    var size = {
        width:0,
        height:0
    };
    
    var defaultPosition = {
        x:0,
        y:0,
        width:0,
        height:0
    };
 
    var currentPosition = {
        x:0,
        y:0,
        width:0,
        height:0
    };
 
    var resizeProperties = {
        width:0,
        height:0,
        customClosePosition:'',
        offsetX:0,
        offsetY:0,
        allowOffscreen:true
    }
 
     var orientationProperties = {
         allowOrientationChange:true,
         forceOrientation:'none'
     }
 
    var maxSize = {
        width:0,
        height:0
    };
    
    var supports = {
        'level-1':true,
        'level-2':true,
        'level-3':true,
        'screen':true,
        'orientation':true,
        'heading':true,
        'location':true,
        'shake':true,
        'tilt':true,
        'network':true,
        'sms':true,
        'phone':true,
        'email':true,
        'calendar':true,
        'camera':true,
        'audio':true,
        'video':true,
        'map':true
    };
 
    var heading = -1;
    
    var keyboardState = false;
    
    var location = null;
    
    var network = NETWORK.UNKNOWN;
    
    var orientation = -1;
    
    var screenSize = null;
    
    var shakeProperties = null;
    
    var tilt = null;
    
    var assets = {};
    
    var cacheRemaining = -1;
 
    var viewable = false;
 
    var version = "2.0";
 
    var placementType = "inline"
 
    
    function trim(str) {
		return str.replace(/^\s+|\s+$/g,"");
	}
    
    var expandPropertyValidators = {
        width:function(value) { return !isNaN(value) && value >= 0},
        height:function(value) { return !isNaN(value) && value >= 0},
        useCustomClose:function(value) { return (value === true || value === false); },
        lockOrientation:function(value) { return (value === true || value === false); },
        useBackground:function(value) { return (value === true || value === false); },
        backgroundColor:function(value) { return (typeof value == 'string' && value.substr(0,1) == '#' && !isNaN(parseInt(value.substr(1), 16))); },
        backgroundOpacity:function(value) { return !isNaN(value) && value >= 0 && value <= 1; }
    };
 
    var resizePropertyValidators = {
        width:function(value) { return !isNaN(value) && value >= 0},
        height:function(value) { return !isNaN(value) && value >= 0},
        offsetX:function(value) { return !isNaN(value) && value >= 0},
        offsetY:function(value) { return !isNaN(value) && value >= 0},
        allowOffscreen:function(value) { return (value === true || value === false); },
        customClosePosition:function(value) { return (value=='none' || value=='top-left' || value=='top-right' || value=='center' || value=='bottom-left' || value=='bottom-right' || value=='top-center' || value=='bottom-center' || value==''); }
    };
 
    var orientationPropertyValidators = {
        allowOrientationChange:function(value) { return (value === true || value === false); },
        forceOrientation:function(value) { return (value=='portrait' || value=='landscape' || value=='none'); }
    };
 
    var shakePropertyValidators = {
        intensity:function(value) { return !isNaN(value); },
        interval:function(value) { return !isNaN(value); }
    };
    
    var changeHandlers = {
        state:function(val) {
            if (state == STATES.UNKNOWN) {
                broadcastEvent(EVENTS.INFO, 'controller initialized, attempting callback');
                ormma.signalReady();
            }
            broadcastEvent(EVENTS.INFO, 'setting state to ' + stringify(val));
            state = val;
            broadcastEvent(EVENTS.STATECHANGE, state);
        },
        size:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting size to ' + stringify(val));
            size = val;
            broadcastEvent(EVENTS.SIZECHANGE, size.width, size.height);
        },
        defaultPosition:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting default position to ' + stringify(val));
            defaultPosition = val;
            currentPosition.width = defaultPosition.width;
            currentPosition.height = defaultPosition.height;
            currentPosition.x = defaultPosition.x;
            currentPosition.y = defaultPosition.y;
        },
        maxSize:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting maxSize to ' + stringify(val));
            maxSize = val;
        },
        expandProperties:function(val) {
            broadcastEvent(EVENTS.INFO, 'merging expandProperties with ' + stringify(val));
            for (var i in val) {
                expandProperties[i] = val[i];
            }
        },
        supports:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting supports to ' + stringify(val));
            supports = {};
            for (var key in FEATURES) {
                supports[FEATURES[key]] = contains(FEATURES[key], val);
            }
        },
        heading:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting heading to ' + stringify(val));
            heading = val;
            broadcastEvent(EVENTS.HEADINGCHANGE, heading);
        },
        keyboardState:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting keyboardState to ' + stringify(val));
            keyboardState = val;
            broadcastEvent(EVENTS.KEYBOARDCHANGE, keyboardState);
        },
        location:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting location to ' + stringify(val));
            location = val;
            broadcastEvent(EVENTS.LOCATIONCHANGE, location.lat, location.lon, location.acc);
        },
        network:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting network to ' + stringify(val));
            network = val;
            broadcastEvent(EVENTS.NETWORKCHANGE, (network != NETWORK.OFFLINE && network != NETWORK.UNKNOWN), network);
        },
        orientation:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting orientation to ' + stringify(val));
            orientation = val;
            broadcastEvent(EVENTS.ORIENTATIONCHANGE, orientation);
        },
        screenSize:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting screenSize to ' + stringify(val));
            screenSize = val;
            broadcastEvent(EVENTS.SCREENCHANGE, screenSize.width, screenSize.height);
        },
        shakeProperties:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting shakeProperties to ' + stringify(val));
            shakeProperties = val;
        },
        tilt:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting tilt to ' + stringify(val));
            tilt = val;
            broadcastEvent(EVENTS.TILTCHANGE, tilt.x, tilt.y, tilt.z);
        },
        cacheRemaining:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting cacheRemaining to ' + stringify(val));
            cacheRemaining = val;
        },
        viewable:function(val) {
            broadcastEvent(EVENTS.INFO, 'setting viewable to ' + stringify(val));
            viewable = val;
            broadcastEvent(EVENTS.VIEWABLECHANGE, viewable);
        }
    };
    
    var listeners = {};
    
    var EventListeners = function(event) {
        this.event = event;
        this.count = 0;
        var listeners = {};
        
        this.add = function(func) {
            var id = String(func);
            if (!listeners[id]) {
                listeners[id] = func;
                this.count++;
                if (this.count == 1) ormmaview.activate(event);
            }
        };
        this.remove = function(func) {
            var id = String(func);
            if (listeners[id]) {
                listeners[id] = null;
                delete listeners[id];
                this.count--;
                if (this.count == 0) ormmaview.deactivate(event);
                return true;
            } else {
                return false;
            }
        };
        this.removeAll = function() { for (var id in listeners) this.remove(listeners[id]); };
        this.broadcast = function(args) { for (var id in listeners) listeners[id].apply({}, args); };
        this.toString = function() {
            var out = [event,':'];
            for (var id in listeners) out.push('|',id,'|');
            return out.join('');
        };
    };
    
    // PRIVATE METHODS ////////////////////////////////////////////////////////////
    
    ormmaview.addEventListener('change', function(properties) {
        for (var property in properties) {
            var handler = changeHandlers[property];
            handler(properties[property]);
        }
    });
    
    ormmaview.addEventListener('shake', function() {
        broadcastEvent(EVENTS.SHAKE);
    });
    
    ormmaview.addEventListener('error', function(message, action) {
        broadcastEvent(EVENTS.ERROR, message, action);
    });
    
    ormmaview.addEventListener('response', function(uri, response) {
        broadcastEvent(EVENTS.RESPONSE, uri, response);
    });
    
    ormmaview.addEventListener('assetReady', function(alias, URL) {
        assets[alias] = URL;
        broadcastEvent(EVENTS.ASSETREADY, alias);
    });
    
    ormmaview.addEventListener('assetRemoved', function(alias) {
        assets[alias] = null;
        delete assets[alias];
        broadcastEvent(EVENTS.ASSETREMOVED, alias);
    });
    
    ormmaview.addEventListener('assetRetired', function(alias) {
        assets[alias] = null;
        delete assets[alias];
        broadcastEvent(EVENTS.ASSETRETIRED, alias);
    });
    
    var clone = function(obj) {
        var f = function() {};
        f.prototype = obj;
        return new f();
    };
    
    var stringify = function(obj) {
        if (typeof obj == 'object') {
            if (obj.push) {
                var out = [];
                for (var p in obj) {
                    out.push(obj[p]);
                }
                return '[' + out.join(', ') + ']';
            } else {
                var out = [];
                for (var p in obj) {
                    out.push('\''+p+'\':'+obj[p]);
                }
                return '{' + out.join(', ') + '}';
            }
        } else {
            return String(obj);
        }
    };
    
    var valid = function(obj, validators, action, full) {
        if (full) {
            if (obj === undefined) {
                broadcastEvent(EVENTS.ERROR, 'Required object missing.', action);
                return false;
            } else {
                for (var i in validators) {
                    if (obj[i] === undefined) {
                        broadcastEvent(EVENTS.ERROR, 'Object missing required property ' + i, action);
                        return false;
                    }
                }
            }
        }
        for (var i in obj) {
            if (!validators[i]) {
                broadcastEvent(EVENTS.ERROR, 'Invalid property specified - ' + i + '.', action);
                return false;
            } else if (!validators[i](obj[i])) {
                broadcastEvent(EVENTS.ERROR, 'Value of property ' + i + ' is not valid type.', action);
                return false;
            }
        }
        return true;
    };
    
    var contains = function(value, array) {
        for (var i in array) if (array[i] == value) return true;
        return false;
    };
    
    var broadcastEvent = function() {
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) args[i] = arguments[i];
        var event = args.shift();
        if (listeners[event]) listeners[event].broadcast(args);
    }
    
    // LEVEL 1 ////////////////////////////////////////////////////////////////////
    
    ormma.signalReady = function() {
        broadcastEvent(EVENTS.READY);
        broadcastEvent(EVENTS.INFO, 'callback invoked');
    };
    
    ormma.addEventListener = function(event, listener) {
        if (!event || !listener) {
            broadcastEvent(EVENTS.ERROR, 'Both event and listener are required.', 'addEventListener');
        } else if (!contains(event, EVENTS)) {
			broadcastEvent(EVENTS.ERROR, 'Unknown event: ' + event, 'addEventListener');
        } else {
            if (!listeners[event]) listeners[event] = new EventListeners(event);
            listeners[event].add(listener);
        }
    };
 
    ormma.removeCloseButton = function() {
        var el = document.getElementById("mraid_close");
        if(el!=null) el.parentNode.removeChild(el);
    };
 
    ormma.close = function() {
        ormma.removeCloseButton();
        ormmaview.close();
    };
 
    ormma.expand = function() {
        var URL;
        var dimensions = null;
 
        if((typeof arguments[0])=='object') dimensions = arguments[0];
        else if((typeof arguments[0])=='string') URL = arguments[0];
 
        if((typeof arguments[1])=='object') dimensions = arguments[1];
        else if((typeof arguments[1])=='string') URL = arguments[1];
 
        if(URL!=null) {
            ormma.open(URL);
            return;
        }
 
        if(dimensions!=null) {
            var expProp = ormmaview.getExpandProperties();
            if(expProp==null) expProp = {};
            if(dimensions.width!=null) expProp.width = dimensions.width;
            if(dimensions.height!=null) expProp.height = dimensions.height;
            if(dimensions.useCustomClose!=null) expProp.useCustomClose = dimensions.useCustomClose;
            if(dimensions.useBackground!=null) expProp.useBackground = dimensions.useBackground;
            if(dimensions.backgroundColor!=null) expProp.backgroundColor = dimensions.backgroundColor;
            if(dimensions.backgroundOpacity!=null) expProp.backgroundOpacity = dimensions.backgroundOpacity;
            if(dimensions.lockOrientation!=null) expProp.lockOrientation = dimensions.lockOrientation;
            ormmaview.setExpandProperties(expProp);
        }
 
        broadcastEvent(EVENTS.INFO, 'expanding to ' + stringify(ormmaview.getExpandProperties()!=null?ormmaview.getExpandProperties():"default"));
        if (ormmaview.getExpandProperties()==null || valid(ormmaview.getExpandProperties(), expandPropertyValidators, 'expand', true)) ormmaview.expand(URL);
        else return;
 
        var state = ormma.getState();
        if(state!="default") return;
 
        if((ormmaview.getExpandProperties()!=null && ormmaview.getExpandProperties().useCustomClose)) return;
 
        ormma.addDefaultCloseButton();
    };
 
    ormma.addDefaultCloseButton = function(position) {
        if(document.getElementById("mraid_close")!=null || position=="none") return;
        var div = document.createElement("div");
        div.id = "mraid_close";
        div.innerHTML = "<a style='width:30px;height:30px;background-color:#262626;display:block;background-size:10px 10px;border-radius:15px;background-repeat:no-repeat;background-position:50% 50%;background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0JGQkZCRiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI1IiB5MT0iNSIgeDI9IjQ1IiB5Mj0iNDUiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiNCRkJGQkYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iNDUiIHkxPSI1IiB4Mj0iNSIgeTI9IjQ1Ii8+PC9nPjwvc3ZnPg==);' href='#' onclick='mraid.close();return false;'></a>";
        document.body.appendChild(div);
        div.style.position = "fixed";
        div.style.zIndex = "2147483647";
        div.style.padding = "10px";
 
        if(position=="top-left") {
            div.style.top = "5px";
            div.style.left = "5px";
        } else if(position=="top-right") {
            div.style.top = "5px";
            div.style.right = "5px";
        } else if(position=="center") {
            div.style.top = "50%";
            div.style.marginTop = "-15px";
            div.style.left = "50%";
            div.style.marginLeft = "-14px";
        } else if(position=="bottom-left") {
            div.style.bottom = "5px";
            div.style.left = "5px";
        } else if(position=="bottom-right") {
            div.style.bottom = "5px";
            div.style.right = "5px";
        } else if(position=="top-center") {
            div.style.top = "5px";
            div.style.left = "50%";
            div.style.marginLeft = "-14px";
        } else if(position=="bottom-center") {
            div.style.bottom = "5px";
            div.style.left = "50%";
            div.style.marginLeft = "-14px";
        } else {
            div.style.top = "5px";
            div.style.right = "5px";
        }
    }
 
    ormma.getDefaultPosition = function() {
        return clone(defaultPosition);
    };
 
    ormma.getCurrentPosition = function() {
        return clone(currentPosition);
    };
 
    ormma.getExpandProperties = function() {
        return clone(ormmaview.getExpandProperties());
    };
 
    ormma.getMaxSize = function() {
        return clone(maxSize);
    };
    
    ormma.getSize = function() {
        return clone(size);
    };
 
    ormma.getResizeProperties = function() {
        return clone(resizeProperties);
    };
 
    ormma.getOrientationProperties = function() {
        return clone(orientationProperties)
    };
 
    ormma.getState = function() {
        return state;
    };
    
    ormma.hide = function() {
        if (state == STATES.HIDDEN) {
            broadcastEvent(EVENTS.ERROR, 'Ad is currently hidden.', 'hide');
        } else {
            ormmaview.hide();
        }
    };
    
    ormma.open = function(URL, controls) {
        if (!URL) {
            broadcastEvent(EVENTS.ERROR, 'URL is required.', 'open');
        } else {
            ormmaview.open(URL, controls);
        }
    };
    
    
    ormma.openMap = function(POI, fullscreen) {
        if (!POI) {
            broadcastEvent(EVENTS.ERROR, 'POI is required.', 'openMap');
        } else {
            ormmaview.openMap(POI, fullscreen);
        }
    };
    
    
    ormma.removeEventListener = function(event, listener) {
        if (!event) {
            broadcastEvent(EVENTS.ERROR, 'Must specify an event.', 'removeEventListener');
        } 
        else {
            if (listener && (!listeners[event] || !listeners[event].remove(listener))) {
                broadcastEvent(EVENTS.ERROR, 'Listener not currently registered for event', 'removeEventListener');
                return;  
            } 
            else if (listeners[event]){
                listeners[event].removeAll();
            }
            
            if (listeners[event] && listeners[event].count == 0) {
                listeners[event] = null;
                delete listeners[event];
            }
        }
    };
    
    
    ormma.resize = function() {

        var width;
        var height;
        var x = 0;
        var y = 0;
        var allowOffscreen = "Y";
 
        if(arguments.length==2) {
            width = arguments[0];
            height = arguments[1];
        } else {
            width = resizeProperties.width;
            height = resizeProperties.height;
            x = resizeProperties.offsetX;
            y = resizeProperties.offsetY;
            allowOffscreen = (resizeProperties.allowOffscreen?"Y":"N");
        }
 
        if (width == null || height == null || isNaN(width) || isNaN(height) || width < 0 || height < 0) {
            broadcastEvent(EVENTS.ERROR, 'Requested size must be numeric values between 0 and maxSize.', 'resize');
        } else if (width > maxSize.width || height > maxSize.height) {
            broadcastEvent(EVENTS.ERROR, 'Request (' + width + ' x ' + height + ') exceeds maximum allowable size of (' + maxSize.width +  ' x ' + maxSize.height + ')', 'resize');
        } else if (width == size.width && height == size.height) {
            broadcastEvent(EVENTS.ERROR, 'Requested size equals current size.', 'resize');
        } else {
            ormmaview.resize(width, height, x, y, allowOffscreen);
            ormma.addDefaultCloseButton(resizeProperties.customClosePosition);
        }
    };
    
    ormma.setExpandProperties = function(properties) {
        if (valid(properties, expandPropertyValidators, 'setExpandProperties')) {
            ormmaview.setExpandProperties(properties);
        }
    };
 
    ormma.useCustomClose = function(flag) {
        var properties = ormmaview.getExpandProperties();
        properties.useCustomClose = flag;
        ormma.setExpandProperties(properties);
    };
 
    ormma.setResizeProperties = function(properties) {
        if (valid(properties, resizePropertyValidators, 'setResizeProperties')) {
            resizeProperties = properties;
        }
    };
 
    ormma.setOrientationProperties = function(properties) {
        if (valid(properties, orientationPropertyValidators, 'setOrientationProperties')) {
            orientationProperties = properties;
        }
    };
 
    ormma.show = function() {
        if (state != STATES.HIDDEN) {
            broadcastEvent(EVENTS.ERROR, 'Ad is currently visible.', 'show');
        } else {
            ormmaview.show();
        }
    };
    
    ormma.playAudio = function(URL, properties) {
        if (!supports[FEATURES.AUDIO]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'playAudio');
        } else if (!URL || typeof URL != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must specify a URL', 'playAudio');
        } else {
            ormmaview.playAudio(URL, properties);
        }
    };
    
    ormma.playVideo = function(URL, properties) {
        if (!supports[FEATURES.VIDEO]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'playVideo');
        } else if (!URL || typeof URL != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must specify a URL', 'playVideo');
        } else {
            ormmaview.playVideo(URL, properties);
        }
    };
 
    ormma.getViewable = function() {
        return viewable;
    };

    ormma.isViewable = function() {
        return viewable;
    };
 
 
    // LEVEL 2 ////////////////////////////////////////////////////////////////////
    
    ormma.createEvent = function(date, title, body) {
		title = trim(title);
		body = trim(body);
        if (!supports[FEATURES.CALENDAR]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'createEvent');
        } else if (!date || typeof date != 'object' || !date.getDate) {
            broadcastEvent(EVENTS.ERROR, 'Valid date required.', 'createEvent');
        } else if (!title || typeof title != 'string' || title.length == 0) {
            broadcastEvent(EVENTS.ERROR, 'Valid title required.', 'createEvent');
		}	else if (!body || typeof body != 'string' || body.length == 0) {
			broadcastEvent(EVENTS.ERROR, 'Valid body required.', 'createEvent');
        } else {
            ormmaview.createEvent(date, title, body);
        }
    };
 
    ormma.createCalendarEvent = function(parameters) {
        ormma.createEvent(parameters.start, parameters.description, parameters.summary);
    };
 
    ormma.getVersion = function() {
        return version;
    };
 
    ormma.getPlacementType = function() {
        return placementType;
    };
 
    ormma.getHeading = function() {
        if (!supports[FEATURES.HEADING]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getHeading');
        }
        return heading;
    };
    
    ormma.getKeyboardState = function() {
        if (!supports[FEATURES.LEVEL2]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getKeyboardState');
        }
        return keyboardState;
    };
 
    ormma.getKeyboard = function() {
        return ormma.getKeyboardState();
    };
    
    ormma.getLocation = function() {
        if (!supports[FEATURES.LOCATION]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getLocation');
        }
        return (null == location)?null:clone(location);
    };
    
    ormma.getNetwork = function() {
        if (!supports[FEATURES.NETWORK]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getNetwork');
        }
        return network;
    };
    
    ormma.getOrientation = function() {
        if (!supports[FEATURES.ORIENTATION]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getOrientation');
        }
        return orientation;
    };
    
    ormma.getScreenSize = function() {
        if (!supports[FEATURES.SCREEN]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getScreenSize');
        } else {
            return (null == screenSize)?null:clone(screenSize);
        }
    };
    
    ormma.getShakeProperties = function() {
        if (!supports[FEATURES.SHAKE]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getShakeProperties');
        } else {
            return (null == shakeProperties)?null:clone(shakeProperties);
        }
    };
    
    ormma.getTilt = function() {
        if (!supports[FEATURES.TILT]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getTilt');
        } else {
            return (null == tilt)?null:clone(tilt);
        }
    };
    
    ormma.makeCall = function(number) {
        if (!supports[FEATURES.PHONE]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'makeCall');
        } else if (!number || typeof number != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must provide a number to call.', 'makeCall');
        } else {
            ormmaview.makeCall(number);
        }
    };
    
    ormma.sendMail = function(recipient, subject, body) {
        if (!supports[FEATURES.EMAIL]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'sendMail');
        } else if (!recipient || typeof recipient != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must specify a recipient.', 'sendMail');
        } else {
            ormmaview.sendMail(recipient, subject, body);
        }
    };
    
    ormma.sendSMS = function(recipient, body) {
        if (!supports[FEATURES.SMS]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'sendSMS');
        } else if (!recipient || typeof recipient != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must specify a recipient.', 'sendSMS');
        } else {
            ormmaview.sendSMS(recipient, body);
        }
    };
    
        
    ormma.setShakeProperties = function(properties) {
        if (!supports[FEATURES.SHAKE]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'setShakeProperties');
        } else if (valid(properties, shakePropertyValidators, 'setShakeProperties')) {
            ormmaview.setShakeProperties(properties);
        }
    };
 
    ormma.storePicture = function(URL) {
        if (!URL || typeof URL != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Request must specify a URL', 'storePicture');
        } else {
            ormmaview.storePicture(URL);
        }
    };
 
    ormma.supports = function(feature) {
        if(feature=='tel') feature = 'phone';
        if (supports[feature]) {
            return true;
        } else {
            return false;
        }
    };
    
    // LEVEL 3 ////////////////////////////////////////////////////////////////////
    
    ormma.addAsset = function(URL, alias) {
        if (!URL || !alias || typeof URL != 'string' || typeof alias != 'string') {
            broadcastEvent(EVENTS.ERROR, 'URL and alias are required.', 'addAsset');
        } else if (supports[FEATURES.LEVEL3]) {
            ormmaview.addAsset(URL, alias);
        } else if (URL.indexOf('ormma://') == 0) {
            broadcastEvent(EVENTS.ERROR, 'Native device assets not supported by this client.', 'addAsset');
        } else {
            assets[alias] = URL;
            broadcastEvent(EVENTS.ASSETREADY, alias);
        }
    };
    
    ormma.addAssets = function(assets) {
        for (var alias in assets) {
            ormma.addAsset(assets[alias], alias);
        }
    };
    
    ormma.getAssetURL = function(alias) {
        if (!assets[alias]) {
            broadcastEvent(EVENTS.ERROR, 'Alias unknown.', 'getAssetURL');
        }
        return assets[alias];
    };
    
    ormma.getCacheRemaining = function() {
        if (!supports[FEATURES.LEVEL3]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'getCacheRemaining');
        }
        return cacheRemaining;
    };
    
    ormma.request = function(uri, display) {
        if (!supports[FEATURES.LEVEL3]) {
            broadcastEvent(EVENTS.ERROR, 'Method not supported by this client.', 'request');
        } else if (!uri || typeof uri != 'string') {
            broadcastEvent(EVENTS.ERROR, 'URI is required.', 'request');
        } else {
            ormmaview.request(uri, display);
        }
    };
    
    ormma.removeAllAssets = function() {
        for (var alias in assets) {
            ormma.removeAsset(alias);
        }
    };
    
    ormma.removeAsset = function(alias) {
        if (!alias || typeof alias != 'string') {
            broadcastEvent(EVENTS.ERROR, 'Alias is required.', 'removeAsset');
        } else if (!assets[alias]) {
            broadcastEvent(EVENTS.ERROR, 'Alias unknown.', 'removeAsset');
        } else if (supports[FEATURES.LEVEL3]) {
            ormmaview.removeAsset(alias);
        } else {
            assets[alias] = null;
            delete assets[alias];
            broadcastEvent(EVENTS.ASSETREMOVED, alias);
        }
    };
 
    ormma.setDisallowParentInterceptTouchEvent = function(val) {
        // Empty method to prevent JS [object] has no method 'setDisallowParentInterceptTouchEvent' error on the ads designed to use setDisallowParentInterceptTouchEvent on Android devices.
    }
})();

var mraid = ormma;