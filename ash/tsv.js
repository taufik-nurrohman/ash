($$ => {
    let record = ['(' + $$.STR + '|[^\\n]+)', [0, [
        // This rule was added to skip the single-quote and back-tick string variant
        // The only string variant that is valid for TSV file is double-quote
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
