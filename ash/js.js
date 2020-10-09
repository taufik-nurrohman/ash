(function(def0) {
    def0['\\/\\*[\\s\\S]*?\\*\\/'] = ['com.st0'];
    def0['\\/\\/[^\\n]+'] = ['com.st1'];
    def0['(?:"use strict"|\'use strict\')'] = ['typ'];
    def0['<\\/?[^\\s>]+(?:\\s[^>]*)?>'] = ['~js']; // JSX?
    def0['([{,]\\s*)(' + ASH.STR + '|\\[[^\\[]+\\]|[a-zA-Z_$][\\w$]*)(\\s*:\\s*)'] = [0, 0, 'key', 0];
    def0[ASH.STR] = function(v) {
        return ['str.st' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
    };
    def0[ASH.LOG] = ['log.st0'];
    def0['\\b(?:Infinity|NaN|undefined)\\b'] = ['log.st1'];
    def0[ASH.NUM] = ['num'];
    def0[/\/(?:(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\/(?:(?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)/.source] = ['exp']; // <https://stackoverflow.com/a/17843773/421333>
    def0['\\b(class|extends|function|implements|interface|new)(\\s+)([a-zA-Z_$][\\w$]*(?:\\.[a-zA-Z_$][\\w$]*)*)\\b'] = [0, 'wor', 0, 'fun'];
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
    def0['\\b' + wors + '\\b'] = ['wor'];
    def0['\\b' + libs + '\\b'] = ['lib'];
    def0['\\b([a-zA-Z_$][\\w$]*)(\\s*\\()'] = [0, 'fun', 0];
    ASH.tokens.js = def0;
})({});
