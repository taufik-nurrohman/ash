($$ => {
    let e = ['&(?:[a-zA-Z\\d]+|#x[a-fA-F\\d]+|#\\d+);', ['sym']];
    let a = ['(\\s+)([^\\s>=/]+)(?:(=)(' + $$.STR + '|[^\\s>=/]+))?', [0, 0, 'key', 'pun', 'val']],
        o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
        c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']];
    let key = '[a-z_-][\\w-]*',
        values = [
            [$$.URI, ['val.uri']],
            [$$.STR, ['val.str']],
            ['^[/?&#]\\S+', ['val.uri']] // Relative URL
        ];
    $$.token.md = [
        ['(?:\\t|[ ]{4,})[^\\n]*(?:\\n(?:\\t|[ ]{4,})[^\\n]*)*', ['cod.s1']],
        ['([~`]{3,})(\\s+[^\\n]+)?(\\n)([\\s\\S]*?)(\\n)(\\1)(?=\\n|$)', ['cod.s2']],
        ['<!--[\\s\\S]*?-->', ['com']],
        ['(<)(' + $$.URI + ')(>)', ['lin', 'pun', 'uri', 'pun']],
        o, c, e,
        ['(^|\\n)([>](?:[ ]*[>])*[^\\n]+(?=\\n|$))', [0, 0, 'quo']],
        ['(^|\\n)([^\\n]+\\n[=-]{2,}(?=\\n|$))', [0, 0, 'sec']],
        ['(^|\\n)(#{1,6}(?:[ ]+[^\\n]+|[^#\\n]+)(?=\\n|$))', [0, 0, 'sec']],
        ['[*][*][^\\s*][^\\n*]*[*][*]', ['bol']],
        ['[_][_][^\\s_][^\\n*]*[_][_]', ['bol']],
        ['[~][~][^\\s~][^\\n*]*[~][~]', ['stk']],
        ['[*][^\\s*][^\\n*]*[*]', ['ita']],
        ['[_][^\\s_][^\\n*]*[_]', ['ita']],
        ['[`][^\\s`][^\\n*]*[`]', ['cod.s0']],
        ['(^|\\n)((?:[ ]{0,3}[-+*]){3,}(?=\\n|$))', [0, 0, 'sym.hor']],
        ['(?:^|\\n)[ ]{0,3}(?:[-+*]|\\d+\\.)[ ]+[^\\n]+(?:\\n[ ]*(?:[-+*]|\\d+\\.)[ ]+[^\\n]+)*', [
            ['([-+*]|\\d+\\.)([ ]+[^\\n]+)', [0, 'sym.bul', 0]]
        ]],
        ['(!)(\\[)([^\\]\\n]*)(\\])(\\[)(\\d+|' + key + ')(\\])', ['ima', 'sym', 'pun', 'key', 'pun', 'pun', 'val', 'pun']],
        ['(!)(\\[)([^\\]\\n]*)(\\])(\\()(' + $$.URI + '(?:[^\\)\\n]+)?)(\\))', ['ima', 'sym', 'pun', 'key', 'pun', 'pun', values, 'pun']],
        ['(\\[)([^\\]\\n]*)(\\])(\\[)(\\d+|' + key + ')(\\])', ['lin', 'pun', 'key', 'pun', 'pun', 'val', 'pun']],
        ['(\\[)([^\\]\\n]*)(\\])(\\()(' + $$.URI + '(?:[^\\)\\n]+)?)(\\))', ['lin', 'pun', 'key', 'pun', 'pun', values, 'pun']],
        ['([*])(\\[)([^\\]\\n]+)(\\])(:)(\\s+)([^\\n]+)', ['ref', 'sym', 'pun', 'key.wor', 'pun', 'pun', 0, 'val']],
        ['(\\[)([^\\]\\n]+)(\\])(:)(\\s+)([^\\n]+)', ['ref', 'pun', 'key', 'pun', 'pun', 0, values]],
    ];
})(ASH);
