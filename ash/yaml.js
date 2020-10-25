(token => {
    token['#[^\\n]+'] = ['com'];
    token['%YAML[ ]+\\d+(?:\\.\\d+)*'] = ['typ'];
    token['([-]{3})(\\n+)'] = [0, 'sym', 0];
    token['([.]{3})(\\n+)([\\s\\S]*)'] = [0, 'sym', 0, 'val'];
    token['(' + ASH.STR + ')(\\s*)(:)'] = [0, 'key', 0, 'pun'];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token['~'] = ['val.log'];
    token[ASH.NUM] = function(v) {
        return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
    };
    // Other(s) must be punctuation
    token[ASH.PUN] = ['pun'];
    ASH.token.yaml = token;
})({});
