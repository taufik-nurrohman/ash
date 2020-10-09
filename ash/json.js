(function(def) {
    def['(' + ASH.STR + ')(\\s*:)'] = [0, 'key', 0];
    def[ASH.STR] = ['val.str'];
    def[ASH.LOG] = ['val.log'];
    def[ASH.NUM] = function(v) {
        return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
    };
    ASH.tokens.json = def;
})({});
