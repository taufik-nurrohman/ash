($$ => {
    let record = ['(' + $$.STR + '|[^\\n]+)', [0, [
        // This token was added to exclude single-quote and back-tick string variant
        ['[\'`]', [0]],
        [$$.STR, [0]], // Skip
        [',', ['sym.sep']],
        ['\\\\[nt]\\b', ['sym']]
    ]]];
    $$.token.csv = [
        ['^' + record[0], ['sec', record[1][1]]],
        record
    ];
})(ASH);
