($$ => {
    // <https://twig.symfony.com/doc/3.x>
    let _filters = [
            'abs',
            'batch',
            'capitalize',
            'column',
            'convert_encoding',
            'country_name',
            'currency_name',
            'currency_symbol',
            'data_uri',
            'date',
            'date_modify',
            'default',
            'escape',
            'filter',
            'first',
            'format',
            'format_currency',
            'format_date',
            'format_datetime',
            'format_number',
            'format_time',
            'html_to_markdown',
            'inky_to_html',
            'inline_css',
            'join',
            'json_encode',
            'keys',
            'language_name',
            'last',
            'length',
            'locale_name',
            'lower',
            'map',
            'markdown_to_html',
            'merge',
            'nl2br',
            'number_format',
            'raw',
            'reduce',
            'replace',
            'reverse',
            'round',
            'slice',
            'sort',
            'spaceless',
            'split',
            'striptags',
            'timezone_name',
            'title',
            'trim',
            'u',
            'upper',
            'url_encode'
        ],
        _functions = [
            'attribute',
            'block',
            'constant',
            'country_timezones',
            'cycle',
            'date',
            'dump',
            'html_classes',
            'include',
            'max',
            'min',
            'parent',
            'random',
            'range',
            'source',
            'template_from_string'
        ],
        _operators = [
            'and',
            'b-and',
            'b-or',
            'b-xor',
            'in',
            'is',
            'matches',
            'not',
            'or',
            'starts with',
            'ends with'
        ],
        _tags = [
            'apply',
            'autoescape',
            'block',
            'deprecated',
            'do',
            'embed',
            'extends',
            'flush',
            'for',
            'from',
            'if',
            'import',
            'include',
            'macro',
            'sandbox',
            'set',
            'use',
            'verbatim',
            'with'
        ],
        _tests = [
            'constant',
            'defined',
            'divisibleby',
            'empty',
            'even',
            'iterable',
            // 'null',
            'odd',
            'sameas'
        ],
        booleans = '(?:' + _tests.join('|') + ')',
        functions = '(?:' + _filters.join('|') + '|' + _functions.join('|') + ')',
        words = '(?:' + _operators.join('|') + '|' + _tags.join('|') + ')';
    let e = ['&(?:[a-zA-Z\\d]+|#x[a-fA-F\\d]+|#\\d+);', ['sym']];
    let a = ['(\\s+)([^\\s>=/]+)(?:(=)(' + $$.STR + '|[^\\s>=/]+))?', [0, 0, 'key', 'pun', 'val']],
        o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
        c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']],
        comment = ['<!--[\\s\\S]*?-->', ['com']],
        type = ['<![^<>]+>', ['typ']];
    let token = [
        [$$.LOG, ['log']],
        ['\\b' + booleans + '\\b', ['log']],
        [$$.NUM, ['num']],
        [$$.STR, ['str']],
        ['\\bend(?:' + _tags.join('|') + ')\\b', ['wor']],
        ['\\b' + words + '\\b', ['wor']],
        ['\\b' + functions + '\\b', ['fun']],
        [$$.PUN, ['pun']],
        // Other(s) must be variable or constant
        ['[a-zA-Z_$-][\\w_$-]*', ['var']]
    ];
    $$.token.twig = [
        ['\\{#[\\s\\S]*?#\\}', ['com']],
        ['(\\{%)([\\s\\S]*?)(%\\})', [0, 'typ', token, 'typ']],
        ['(\\{\\{)([\\s\\S]*?)(\\}\\})', ['val', 0, token, 0]],
        comment, type,
        o, c, e
    ];
})(ASH);
