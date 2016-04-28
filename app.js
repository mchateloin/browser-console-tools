window.tools = (function(){

    var api = {},
        deepness = 10,
        result;

    var _validateKey = function(key){
        if(key === 'mixins'){
            return false;
        }

        if(key === 'superclass'){
            return false;
        }

        if(key.indexOf('Mixin') > -1){
            return false;
        }

        if(key.indexOf('parentView') > -1){
            return false;
        }

        if(key.indexOf('__') === 0){
            return false;
        }

        return true;
    };

    var _searchSubTree = function(parentObj, query, currentLevel, path, validateKeyFn){
        var level = currentLevel;

        return Object.keys(parentObj).some(function(childKey){
            var childObj = parentObj[childKey],
                childPath;

            if(!validateKeyFn(childKey)){
                return false;
            }

            if(Number.isNaN(Number.parseInt(childKey))){
                childPath = path + '.' + childKey;
            } else {
                childPath = path + '[' + childKey + ']';
            }

            if(childPath === 'Healthbook.editPersonalInfoView') debugger;

            if(query === childKey){
                result = childPath;
                return true;
            } else if(level <= deepness && childObj && (typeof childObj === 'object' || typeof childObj === 'function')) {
                return _searchSubTree(childObj, query, level + 1, childPath, validateKeyFn);
            }
        })
    };

    api.searchNameSpace = function(topLevelObjKey, query, validateKeyFn){
        quitFlag = false;
        result = 'Not found';
        validateKeyFn = validateKeyFn || _validateKey;
        _searchSubTree(window[topLevelObjKey], query, 0, topLevelObjKey, validateKeyFn)
        console.log(result);
    };

    return api;

}());
