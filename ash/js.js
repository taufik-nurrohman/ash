(function(token) {
    let key = '(?:[a-zA-Z_$][\\w$]*)';
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com.s0'];
    token['\\/\\/[^\\n]+'] = ['com.s1'];
    token['(?:"use strict"|\'use strict\')'] = ['typ'];
    token['<\\/?[^\\s>]+(?:\\s[^>]*)?>'] = ['~js']; // JSX
    token['([{,])(\\s*)(' + ASH.STR + '|\\[[^\\[]+\\]|' + key + ')(\\s*)(:)'] = [0, 'pun', 0, 'key', 0, 'pun'];
    token[ASH.STR] = function(v) {
        return ['str.s' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
    };
    token[ASH.LOG] = ['log.s0'];
    token['\\b(?:Infinity|NaN|undefined)\\b'] = ['log.s1'];
    token[ASH.NUM] = ['num'];
    token[/\/(?:(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\/(?:(?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)/.source] = ['exp']; // <https://stackoverflow.com/a/17843773/421333>
    token['\\b(class|extends|function|implements|interface|new)(\\s+)(' + key + '(?:\\.' + key + ')*)\\b'] = [0, 'wor', 0, 'fun'];
    token['\\b(' + key + ')(\\s*)(\\()'] = [0, 'fun', 0, 'pun'];
    token['(\\.)([#?]?' + key + ')\\b'] = [0, 'pun', 0]; // Skip
    token['#' + key + '\\b'] = [0]; // Skip
    let wors = '(?:' + [
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
    let libs = '(?:' + [
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
    token['\\b' + wors + '\\b'] = ['wor'];
    token['\\b' + libs + '\\b'] = ['lib'];
    token[ASH.PUN] = ['pun'];
    ASH.token.js = token;
})({});
