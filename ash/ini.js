($ => {
    let key = '[a-zA-Z_][\\w]*';
    let token = [
        [';[^\\n]+', ['com']],
        ['\\b(' + key + ')([ ]*)(=)([ ]*)([^\\n]+)', [0, 'key', 0, 'pun', 0, token]],
        ['\\b(' + key + ')([ ]*)(=)', [0, 'key', 0, 'pun']],
        ['\\[[^\\n\\]]+\\]', ['sec']],
        [ASH.STR, ['val.str']],
        [ASH.LOG, ['val.log']],
        [ASH.NUM, ['val.num']],
        [ASH.PUN, ['pun']],
        // Other(s) must be value
        ['[^\\n]+', ['val']]
    ];
    $.token.ini = token;
})(ASH);
