ASH.token.json = [
    // This rule was added just to skip the string variant matching that uses single-quote and back-tick character
    // The only string variant that is valid for JSON is double-quote
    ['[\'`]', ['pun']],
    ['(' + ASH.STR + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
    [ASH.STR, ['val.str']],
    [ASH.LOG, ['val.log']],
    [ASH.NUM, v => {
        return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
    }],
    // Other(s) must be punctuation
    [ASH.PUN, ['pun']]
];
