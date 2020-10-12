(token => {
    // This rule was added just to skip the string variant matching that uses single-quote and back-tick character
    // The only string variant that is valid for JSON is double-quote
    token['[\'`]'] = ['pun'];
    token['(' + ASH.STR + ')(\\s*)(:)'] = [0, 'key', 0, 'pun'];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token[ASH.NUM] = function(v) {
        return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
    };
    // Other(s) must be punctuation
    token[ASH.PUN] = ['pun'];
    ASH.token.json = token;
})({});
