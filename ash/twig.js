($$ => {
    let key = '[a-zA-Z][\\w_]*';
    // <https://twig.symfony.com/doc/3.x>
    let _filters = [
            'abs',
            'batch',
            'capitalize',
            'column',
            'convert_encoding',
            '(?:country|currency|language|locale|timezone)_name',
            'currency_symbol',
            'data_uri',
            'date(?:_modify)?',
            'default',
            'escape',
            'filter',
            'first',
            'format',
            'format(?:_(?:currency|date(?:time)?|number|time))?',
            'html_to_markdown',
            '(?:inky|markdown)_to_html',
            'inline_css',
            'join',
            '(?:json|url)_encode',
            'keys',
            'last',
            'length',
            'lower',
            'map',
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
            'title',
            'trim',
            'u',
            'upper'
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
            'b-(?:and|x?or)',
            'in',
            'is',
            'matches',
            'not',
            'or',
            '(?:start|end)s\\s+with'
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
    let a = ['(\\s+)([^\\s<>=/]+)(?:(=)(' + $$.STR + '|[^\\s<>=/]+))?', [0, 0, 'key', 'pun', 'val']],
        o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
        c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']],
        data = ['(<!\\[CDATA\\[)([\\s\\S]*)(\\]\\]>)', [0, 'typ', 'val', 'typ']],
        comment = ['<!--[\\s\\S]*?-->', ['com']],
        type = ['<![^<>]+>', ['typ']],
        xml = ['<\\?xml\\s+[\\s\\S]+\\?>', ['typ']];
    let token = [
        [$$.LOG, ['log']],
        ['\\b' + booleans + '\\b', ['log']],
        [$$.NUM, ['num']],
        [$$.STR, ['str']],
        ['\\bend(?:' + _tags.join('|') + ')\\b', ['wor']],
        ['\\b' + words + '\\b', ['wor']],
        ['\\b' + functions + '\\b', ['fun.lib']],
        ['\\b(' + key + ')(\\.)(' + key + ')(\\()', [0, 'var', 'pun', 'fun', 'pun']],
        ['\\b(' + key + ')(\\.)(' + key + ')\\b', [0, 'var', 'pun', 'key']],
        ['(\\|)(\\s*)(' + functions + ')\\b', [0, 'sym.fil', 0, 'fun.lib']],
        ['(\\|)(\\s*)(' + key + ')\\b', [0, 'sym.fil', 0, 'fun']],
        [$$.PUN, ['pun']],
        // Other(s) must be variable
        ['\\b' + key + '\\b', ['var']]
    ];
    $$.token.twig = [
        ['(\\{#[\\s\\S]*?#\\})', ['t:twig', 'com']],
        ['(\\{)(%)([\\s\\S]*?)(%)(\\})', ['t:twig', 'pun', 'pun', token, 'pun', 'pun']],
        ['(\\{)(\\{)([\\s\\S]*?)(\\})(\\})', ['t:twig', 'pun', 'pun', token, 'pun', 'pun']],
        comment, data, type, xml,
        ['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(</script>)', [0, [o], 't:js', [c]]],
        ['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(</style>)', [0, [o], 't:css', [c]]],
        // Do not highlight content in `<template>` element
        ['(<template(?:\\s[^>]*)?>)([\\s\\S]*?)(</template>)', [0, [o], 'val', [c]]],
        // ditto
        ['(<textarea(?:\\s[^>]*)?>)([\\s\\S]*?)(</textarea>)', [0, [o], 'val', [c]]],
        o, c, e
    ];
})(ASH);
