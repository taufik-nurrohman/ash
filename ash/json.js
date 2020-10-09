(function(token) {
    token['(' + ASH.STR + ')(\\s*:)'] = [0, 'key', 0];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token[ASH.NUM] = function(v) {
        return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
    };
    ASH.token.json = token;
})({});
