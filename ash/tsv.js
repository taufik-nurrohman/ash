($$ => {
    let record = ['(' + $$.STR + '|[^\\n]+)', [0, [
        // This token was added to exclude single-quote and back-tick string variant
        ['[\'`]', [0]],
        [$$.STR, [0]], // Skip
        ['[\\t]', ['sym.sep']],
        ['\\\\[nt]', ['sym']]
    ]]];
    $$.token.tsv = [
        ['^' + record[0], ['sec', record[1][1]]],
        record
    ];
})(ASH);
