($$ => {
    let key = '(?:(?:\\\\.|[a-zA-Z_-])(?:\\\\.|[\\w-])*)';
    let q = [
        ['^([\\s\\S]*)$', ['que', [
            ['/\\*[\\s\\S]*?\\*/', ['com']],
            ['(\\()([^)]+)(\\))', [0, 'pun', [
                ['/\\*[\\s\\S]*?\\*/', ['com']],
                ['(' + key + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
                [$$.STR, ['str']],
                // Slice -2 to remove the `\b` part
                [$$.NUM.slice(0, -2) + '(?:(?:[cme]m|ch|deg|ex|in|p[ctx]|rem|v(?:[hw]|max|min))\\b|%)', ['num']],
                ['#(?:[a-fA-F\\d]{1,2}){3,4}\\b', ['num.hex']],
                [$$.NUM, ['num']],
                [$$.PUN, ['pun']],
                // Other(s) must be value
                ['\\b' + key + '\\b', ['val']]
            ], 'pun']],
            ['[*]', ['sym']],
            ['\\[[^\\n\\]]+\\]', ['att']],
            ['::?' + key, ['pse']],
            ['\\.' + key, ['cla']],
            ['#' + key, ['id']],
            ['(@(?:keyframes|property))(\\s+)(' + key + ')', [0, 'wor', 0, 'nam']],
            ['@' + key, ['wor']],
            ['\\b(?:' + [
                'all',
                'braille',
                'embossed',
                'handheld',
                'print',
                'projection',
                'screen',
                'speech',
                'tty',
                'tv'
            ].join('|') + ')\\b', ['typ']],
            ['\\b(?:' + [
                'and',
                'from',
                'not',
                'only',
                'to'
            ].join('|') + ')\\b', ['wor']],
            [key, ['nam']],
            ['&', ['var']],
            [$$.PUN, ['pun']]
        ]]]
    ];
    $$.token.css = [
        ['/\\*[\\s\\S]*?\\*/', ['com']],
        // Select everything before `{`
        // Also select any word prefixed by `$` and `&` for preprocessor
        ['((?:\\[[^\\n\\]]+\\]|[*]|[@#.:$&]?' + key + ')[^{}]*?)(\\s*)(\\{)', [0, q, 0, 'pun']],
        [$$.URI, ['uri']],
        ['((?:--|$)' + key + ')(\\s*)(:)', [0, 'var', 0, 'pun']],
        ['(' + key + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        ['(?:--|$)' + key, ['var']],
        ['!' + key, ['sym']],
        [$$.STR, ['str']],
        // Slice -2 to remove the `\b` part
        [$$.NUM.slice(0, -2) + '(?:(?:[cme]m|ch|deg|ex|in|p[ctx]|rem|v(?:[hw]|max|min))\\b|%)', ['num']],
        ['#(?:[a-fA-F\\d]{1,2}){3,4}\\b', ['num.hex']],
        [$$.NUM, ['num']],
        ['\\b(' + key + ')(\\s*)(\\()', [0, 'fun', 0, 'pun']],
        [$$.PUN, ['pun']],
        // Other(s) must be value
        ['\\b' + key + '\\b', ['val']]
    ];
})(ASH);
