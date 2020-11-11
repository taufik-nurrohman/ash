($$ => {
    $$.token.json = [
        // This rule was added to skip the single-quote and back-tick string variant
        // The only string variant that is valid for JSON file is double-quote
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
