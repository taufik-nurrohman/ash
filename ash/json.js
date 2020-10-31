($$ => {
    $$.token.json = [
        // This rule was added just to skip the string variant matching that uses single-quote and back-tick character
        // The only string variant that is valid for JSON is double-quote
        ['[\'`]', ['pun']],
        ['(' + $$.STR + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        [$$.STR, ['val.str']],
        [$$.LOG, ['val.log']],
        [$$.NUM, v => {
            return ['val.num.' + (-1 === v[0].indexOf('.') ? 'int' : 'flo')];
        }],
        // Other(s) must be punctuation
        [$$.PUN, ['pun']]
    ];
})(ASH);
