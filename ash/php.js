($$ => {
    let key = '(?:[a-zA-Z_\\x7f-\\xff][a-zA-Z\\d_\\x7f-\\xff]*)';
    let keys = '(?:\\\\?' + key + '(?:\\\\' + key + ')*)';
    // <https://www.php.net/manual/en/book.spl.php>
    let libraries = '(?:' + [
        '(?:Append|Array|Caching|CallbackFilter|Directory|Empty|Filesystem|Filter|Glob|Infinite|Iterator|Limit|Multiple|NoRewind|Outer|Parent|Recursive(?:Array|Caching|Callback|Directory|Filter|Iterator|Regex|Tree)?|Regex|Seekable)?Iterator',
        '(?:ArgumentCount|Arithmetic|Assertion|Compile|DivisionByZero|Parse|Type)?Error',
        'Array(?:Access|Object)',
        '(?:Bad(?:Function|Method)Call|Domain|Error|InvalidArgument|Length|Logic|OutOf(?:Bounds|Range)|(?:Over|Under)flow|Range|Runtime|UnexpectedValue)?Exception',
        'Countable',
        'Spl(?:DoublyLinkedList|File(?:Info|Object)|FixedArray|(?:Max|Min)?Heap|ObjectStorage|Observer|(?:Priority)?Queue|Stack|Subject|TempFileObject)',
        'Closure',
        'Generator',
        'IteratorAggregate',
        'Serializable',
        'Throwable',
        'Traversable',
        'WeakReference',
        'Directory',
        '__PHP_Incomplete_Class',
        'parent',
        'php_user_filter',
        'self',
        'static',
        'stdClass'
    ].join('|') + ')';
    let words = '(?:' + [
        'die',
        'echo',
        'exit',
        '(?:include|require)(?:_once)?',
        'print',
        'array',
        'abstract',
        'and',
        'as',
        'binary',
        'bool(?:ean)?',
        'break',
        'callable',
        'case',
        'catch',
        'class',
        'clone',
        'const',
        'continue',
        '(?:end)?declare',
        'default',
        'do',
        'double',
        'else',
        'elseif',
        'empty',
        'eval',
        'extends',
        'final(?:ly)?',
        'float',
        'fn',
        '(?:end)?for(?:each)?',
        'from',
        'function',
        'global',
        'goto',
        '(?:end)?if',
        'implements',
        'inst(?:ance|ead)of',
        'int(?:eger)?',
        'interface',
        'isset',
        'iterable',
        'list',
        'match',
        'namespace',
        'new',
        'object',
        'or',
        'private',
        'protected',
        'public',
        'real',
        'return',
        'string',
        '(?:end)?switch',
        'throw',
        'trait',
        'try',
        'unset',
        'use',
        'var',
        'void',
        '(?:end)?while',
        'xor',
        'yield'
    ].join('|') + ')';
    let b = 'class|extends|implements|interface|new|trait|use';
    let token = [
        ['/\\*[\\s\\S]*?\\*/', ['com.s0']],
        ['//[^\\n]+', ['com.s1']],
        ['#[^\\n]+', ['com.s2']],
        ['(<<<)([A-Z_][A-Z\\d_]*)([\\s\\S]*?)(\\2)', ['str.s3']],
        ['(<<<)(")([A-Z_][A-Z\\d_]*)(")([\\s\\S]*?)(\\3)', ['str.s3']],
        ['(<<<)(\')([A-Z_][A-Z\\d_]*)(\')([\\s\\S]*?)(\\3)', ['str.s4']],
        [$$.STR, v => {
            return ['str.s' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
        }],
        [$$.LOG, ['log.s0']],
        ['\\b(?:FALSE|NULL|TRUE)\\b', ['log.s1']],
        [$$.NUM, ['num']],
        ['(-)(>)(' + key + ')', [0, 'pun', 'pun', 'key']], // Skip
        ['(\\$+' + key + ')(:)(:)(' + key + ')', [0, 'var', 'pun', 'pun', 'con']],
        ['\\$+' + key, ['var']],
        ['\\b(as)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'nam']],
        ['\\b(const)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'con']],
        ['\\b(function)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'fun']],
        ['\\b(namespace)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'nam']],
        ['\\b(' + b + ')(\\s+)(' + libraries + ')\\b', [0, 'wor', 0, 'cla.lib']],
        ['\\b(use)(\\s+)(const)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'wor', 0, 'con']],
        ['\\b(use)(\\s+)(function)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'wor', 0, 'fun']],
        ['\\b(' + b + ')(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'cla']],
        ['\\b(' + words + ')(\\s*)(\\()', [0, 'wor', 0, 'pun']],
        ['\\b(' + keys + ')(\\s*)(\\()', [0, 'fun', 0, 'pun']],
        ['\\b(' + keys + ')(:)(:)(' + key + ')', [0, 'cla', 'pun', 'pun', 'con']],
        ['\\b' + words + '\\b', ['wor']],
        ['\\b' + libraries + '\\b', ['cla.lib']],
        // Magic constant <https://www.php.net/manual/en/language.constants.predefined.php>
        ['\\b__(?:' + [
            'CLASS',
            'DIR',
            'FILE',
            'FUNCTION',
            'LINE',
            'METHOD',
            'NAMESPACE',
            'TRAIT'
        ].join('|') + ')__\\b', ['con.lib']],
        [$$.PUN, ['pun']],
        // Other(s) must be constant
        ['\\b' + keys + '\\b', ['con']]
    ],
    expr = ['(<\\?(?:php(?=\\s)|=)?)([\\s\\S]*?)(\\?>)', ['t:php', 'typ', token, 'typ']];
    // PHP is quite complex, because every file with `.php` extension can be anything.
    // Ash is file-oriented. Means that the syntax name tends to follow the associated
    // file extension. A PHP file with a valid PHP syntax must contain at least
    // `<?php` or `<?=` character. But we also need to allow user(s) to highlight code
    // snippet without `<?php` tag for compatibility with other syntax highlighter(s).
    $$.token.php = content => {
        let e = ['&(?:[a-zA-Z\\d]+|#x[a-fA-F\\d]+|#\\d+);', ['sym']];
        let a = ['(\\s+)([^\\s<>=/]+)(?:(=)(' + $$.STR + '|[^\\s<>=/]+))?', [0, 0, 'key', 'pun', 'val']],
            o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
            c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']],
            data = ['(<!\\[CDATA\\[)([\\s\\S]*)(\\]\\]>)', [0, 'typ', 'val', 'typ']],
            comment = ['<!--[\\s\\S]*?-->', ['com']],
            type = ['<![^<>]+>', ['typ']],
            xml = ['<\\?xml\\s+[\\s\\S]+\\?>', ['typ']];
        let mixed = /<\?(?:php(?=\\s)|=)?/.test(content);
        return mixed ? [
            // Capture HTML markup contains PHP expression
            ['(<(?:<\\?[\\s\\S]*?\\?>|[^<>!?])+>)', ['mar', [
                // Plain HTML markup
                ['^()' + o[0] + '$', o[1]],
                ['^()' + c[0] + '$', c[1]],
                // Capture attribute(s) first to disable syntax
                // highlighting of PHP code in the HTML value
                a,
                // Mark HTML tag name
                ['^(<)([^\\s<>/?]+)', [0, 'pun', 'nam']],
                // Mark PHP code
                expr,
                // Mark value that is not yet highlighted due to
                // PHP code that spans between attribute and value
                [$$.STR, ['val']],
                // Other(s) must be punctuation
                [$$.PUN, ['pun']]
            ]]],
            // Mark any PHP code in HTML content
            ['(<\\?(?:php(?=\\s)|=)?)([\\s\\S]*?)(\\?>|$)', ['t:php', 'typ', token, 'typ']],
            // Mark other(s) native HTML markup
            comment, data, type, xml,
            ['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(</script>)', [0, [o], 't:js', [c]]],
            ['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(</style>)', [0, [o], 't:css', [c]]],
            // Do not highlight content in `<template>` element
            ['(<template(?:\\s[^>]*)?>)([\\s\\S]*?)(</template>)', [0, [o], 'val', [c]]],
            // ditto
            ['(<textarea(?:\\s[^>]*)?>)([\\s\\S]*?)(</textarea>)', [0, [o], 'val', [c]]],
            o, c, e
        ] : token;
    };
})(ASH);
