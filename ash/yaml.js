($ => {
    let key = '[a-zA-Z_-][\\w-]*';
    $.token.yaml = [
        ['\\t', ['err']], // Tab(s) are illegal in YAML document
        ['#[^\\n]+', ['com']],
        ['%YAML[ ]+\\d+(?:\\.\\d+)*', ['typ']],
        ['([-]{3})(\\n+)', [0, 'sym', 0]],
        ['([.]{3})(\\n+)([\\s\\S]*?)(\\n[-]{3}|$)', [0, 'sym', 0, 'val', 'sym']],
        ['(' + $.STR + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        ['\\b(' + key + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        ['([|>])(\\s*)((?:\\n[ ]+[^\\n]*)+)', [0, 0, 'pun', 'str']],
        [$.STR, ['val.str']],
        [$.LOG, ['val.log']],
        // <https://yaml.org/type/bool.html>
        ['\\b(?:y|Y|yes|Yes|YES|n|N|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF)\\b', ['val.log']],
        // `null`
        ['~', ['val.log']],
        ['(-)(\\s)', [0, 'sym.bul', 0]],
        [$.NUM, v => {
            return ['val.num.' + (-1 === v[0].indexOf('.') ? 'int' : 'flo')];
        }],
        ['[&]' + key, ['sym.anc']],
        ['[*]' + key, ['sym.ref']],
        ['!(?:' + key + ')?!' + key, ['sym.tag']],
        [key, ['val']],
        // Other(s) must be punctuation
        [$.PUN, ['pun']]
    ];
})(ASH);
