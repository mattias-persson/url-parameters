const LocationBar = require("location-bar");
const locationBar = new LocationBar();

function Url(){}

Url.prototype.enable = function(onChangeCallback, pushState){
    var self = this;

    // When the URL changes, run provided callback.
    if(onChangeCallback){
        locationBar.onChange(function (queryString) {
            onChangeCallback({
                queryParams: self.getParams(), 
                queryString: queryString
            });
        });
    }

    // Push state defaults to true but can be disabled.
    if(typeof pushState !== 'boolean'){
        pushState = true;
    }

    // Start the URL listener.
    locationBar.start({ pushState: pushState });
}

Url.prototype.apply = function(params){
    if(typeof params === 'object'){
        params = this.objToQueryString(params);
    }

    if(params.substring(0, 1) !== '?' && params.length > 0){
        params = '?' + params;
    }

    locationBar.update(params, {trigger: true});
}

Url.prototype.set = function(param, value){
    var params = this.getParams();

    params[param] = value;    
    
    this.apply(params);
}

Url.prototype.get = function(param, fallback){
    if(typeof fallback === 'undefined' || fallback === null){
        fallback = null;
    }

    var params = this.getParams();

    if(params[param]){
        return params[param];
    }

    return fallback;
}

Url.prototype.getQueryString = function(){
    return this.objToQueryString(this.getParams());
}

Url.prototype.toggle = function(param, value){
    var params = this.getParams();

    if(params[param]){
        delete params[param];
    } else {
        params[param] = value;
    }

    this.apply(params);
}

Url.prototype.toggleValue = function(param, value){
    var params = this.getParams();

    if(params[param]){
        var values = params[param].split(',');
        var valuePosition = values.indexOf(value.toString());
        
        if(valuePosition > -1){
            values.splice(valuePosition, 1);
        } else {
            values.push(value);
        }
        
        if(!values.length){
            delete params[param];
        } else {
            params[param] = values.join(',');
        }
    } else {
        params[param] = value;
    }

    this.apply(params);
}

Url.prototype.replace = function(values){
    var params = this.getParams();

    Object.keys(values).map(function(key){
        params[key] = values[key];
    });

    this.apply(params);
}

Url.prototype.remove = function(param){
    var params = this.getParams();

    if(params[param]){
        delete params[param];
    }

    this.apply(params);
}

Url.prototype.clear = function(){
    this.apply('');
}

Url.prototype.containsValue = function(param, value){
    var params = this.getParams();

    if(!params[param]){
        return false;
    }

    return (params[param].split(',').indexOf(value.toString()) > -1);
}

Url.prototype.objToQueryString = function(obj) {
    var str = [];

    for (var p in obj){
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + obj[p]);
        }
    }

    return str.join("&");
}

Url.prototype.getParams = function(){
    var search;

    if(location.hash){
        search = location.hash.substring(2);
    } else if (location.search){
        search = location.search.substring(1);
    }
    
    if(!search){
        return {};
    }

    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

export default new Url();