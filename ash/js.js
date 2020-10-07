ASH.x.js = function(content) {
    var chunk = this.chunk,
        t = this.t;

    var reserved = '\\b(?:' + ["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"].join('|') + ')\\b';
    var a = ["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"];
    var b = ["arguments","this","super","console","window","document","localStorage","module","global"];
    var c = ["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer"];
    var d = ["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"];
    var lib = '\\b(?:' + a.concat(b).join('|') + ')\\b';
    var lib2 = '\\b(?:' + c.concat(d).join('|') + ')\\b';
    var comment1 = '\\/\\*[\\s\\S]*?\\*\\/';
    var comment2 = '\\/\\/[^\\n]+';
    return chunk([comment1, comment2, ASH.STR, ASH.NUM, ASH.LOG, reserved, lib, lib2], function(v, i) {
        if (0 === i) {
            return t('com.st0', v[0]);
        }
        if (1 === i) {
            return t('com.st1', v[0]);
        }
        if (2 === i) {
            return t('str', v[0]);
        }
        if (3 === i) {
            return t('num', v[0]);
        }
        if (4 === i) {
            return t('log', v[0]);
        }
        if (5 === i) {
            return t('wor', v[0]);
        }
        if (6 === i || 7 === i) {
            return t('lib', v[0]);
        }
        return t(0, v[0]);
    }, content);
};
