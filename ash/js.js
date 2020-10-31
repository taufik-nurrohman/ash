($$ => {
    let key = '(?:[a-zA-Z_$][\\w$]*)';
    let libraries = '(?:' + [
        'console',
        'document',
        'global',
        'globalThis',
        'location',
        'navigator',
        'opener',
        'parent',
        'self',
        'window'
    ].join('|') + ')';
    let words = '(?:' + [
        'abstract',
        'arguments',
        'as',
        'async',
        'await',
        'boolean',
        'break',
        'byte',
        'case',
        'catch',
        'char',
        'class',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'double',
        'else',
        'enum',
        'export',
        'extends',
        'final',
        'finally',
        'float',
        'for',
        'from',
        'function',
        'get',
        'goto',
        'if',
        'implements',
        'import',
        'in',
        'int',
        'interface',
        'instanceof',
        'let',
        'long',
        'native',
        'new',
        'of',
        'package',
        'private',
        'protected',
        'public',
        'return',
        'set',
        'short',
        'static',
        'super',
        'switch',
        'synchronized',
        'this',
        'throw',
        'throws',
        'transient',
        'try',
        'typeof',
        'var',
        'void',
        'volatile',
        'while',
        'with',
        'yield',
    ].join('|') + ')';
    let a = ['(\\s+)([^\\s>=/]+)(?:(=)(' + $$.STR + '|[^\\s>=/]+))?', [0, 0, 'key', 'pun', 'val']],
        o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
        c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']];
    $$.token.js = [
        ['/\\*[\\s\\S]*?\\*/', ['com.s0']],
        ['//[^\\n]+', ['com.s1']],
        ['([\'"])(use strict\\1)', ['typ']],
        o, c, // JSX
        ['\\b(get|set)(\\s+)(' + $$.STR + '|\\[[^\\[]+\\]|' + key + ')(\\s*)(:)', [0, 'wor', 0, 'key', 0, 'pun']],
        ['([{,])(\\s*)(' + $$.STR + '|\\[[^\\[]+\\]|' + key + ')(\\s*)(:)', [0, 'pun', 0, 'key', 0, 'pun']],
        [$$.STR, v => {
            return ['str.s' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
        }],
        [$$.LOG, ['log.s0']],
        ['\\b(?:Infinity|NaN|undefined)\\b', ['log.s1']],
        [$$.NUM, ['num']],
        ['/(?:(?![*+?])(?:[^\\n\\[/\\\\]|\\\\.|\\[(?:[^\\n\\]\\\\]|\\\\.)*\\])+)/[gimuy]*', ['exp']],
        ['\\b(function)(\\s+)([*])?(' + key + ')\\b', [0, 'wor', 0, 'sym', 'fun']],
        ['\\b(export)(\\s+)(' + words + ')(\\s+)(' + key + ')\\b', [0, 'wor', 0, 'wor', 0, 'fun']],
        ['\\b(class|export|extends|implements|interface|new)(\\s+)(' + key + '(?:\\.' + key + ')*)\\b', [0, 'wor', 0, 'cla']],
        ['(\\??)(\\.)(#?' + key + ')\\b', [0, 'pun', 'pun', 'key']],
        ['#' + key + '\\b', ['key']],
        ['\\b' + words + '\\b', ['wor']],
        ['\\b' + libraries + '\\b', ['lib']],
        ['\\b(' + key + ')(\\s*)(\\()', [0, 'fun', 0, 'pun']],
        [$$.PUN, ['pun']],
        ['\\b(?:[A-Z_][A-Z\\d_]*)+\\b', ['con']],
        // Other(s) must be variable
        ['\\b' + key + '\\b', ['var']]
    ];
})(ASH);
