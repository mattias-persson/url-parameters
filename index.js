let LocationBar = require("location-bar");
let locationBar = new LocationBar();

module.exports = {
    enable(onChangeCallback, pushState){
        let self = this;

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
    },

    apply(params){
        if(typeof params === 'object'){
            params = this.objToQueryString(params);
        }

        if(params.substring(0, 1) !== '?' && params.length > 0){
            params = '?' + params;
        }

        locationBar.update(params, {trigger: true});
    },

    set(param, value){
        let params = this.getParams();

        params[param] = value;    
        
        this.apply(params);
    },

    toggle(param, value){
        let params = this.getParams();

        if(params[param]){
            delete params[param];
        } else {
            params[param] = value;
        }

        this.apply(params);
    },

    toggleValue(param, value){
        let params = this.getParams();

        if(params[param]){
            let values = params[param].split(',');
            let valuePosition = values.indexOf(value.toString());
            
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
    },

    remove(param){
        let params = this.getParams();

        if(params[param]){
            delete params[param];
        }

        this.apply(params);
    },

    clear(){
        this.apply('');
    },

    containsValue(param, value){
        let params = this.getParams();

        if(!params[param]){
            return false;
        }

        return (params[param].split(',').indexOf(value.toString()) > -1);
    },

    getParams(){
        let search;

        if(location.hash){
            search = location.hash.substring(2);
        } else if (location.search){
            search = location.search.substring(1);
        }
        
        if(!search){
            return {};
        }

        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    },

    objToQueryString(obj) {
        let str = [];

        for (var p in obj){
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + obj[p]);
            }
        }

        return str.join("&");
    }
}