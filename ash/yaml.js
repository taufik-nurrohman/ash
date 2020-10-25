($ => {
    let key = '[a-zA-Z_-][\\w-]*';
    $.token.yaml = [
        ['#[^\\n]+', ['com']],
        ['%YAML[ ]+\\d+(?:\\.\\d+)*', ['typ']],
        ['([-]{3})(\\n+)', [0, 'sym', 0]],
        ['([.]{3})(\\n+)([\\s\\S]*?)(\\n[-]{3}|$)', [0, 'sym', 0, 'val', 'sym']],
        ['(' + ASH.STR + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        ['\\b(' + key + ')(\\s*)(:)', [0, 'key', 0, 'pun']],
        [ASH.STR, ['val.str']],
        [ASH.LOG, ['val.log']],
        // <https://yaml.org/type/bool.html>
        ['\\b(?:y|Y|yes|Yes|YES|n|N|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF)\\b', ['val.log']],
        ['~', ['val.log']],
        ['(-)(\\s)', [0, 'bul', 0]],
        [ASH.NUM, v => {
            return ['val.num.' + (/^-?\d+n?$/.test(v[0]) ? 'int' : 'flo')];
        }],
        // Other(s) must be punctuation
        [ASH.PUN, ['pun']],
        // And value
        ['\\S+', ['val']]
    ];
})(ASH);
