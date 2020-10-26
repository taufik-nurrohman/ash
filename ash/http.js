($ => {
    let key = '[a-zA-Z-][a-zA-Z\\d-]*';
    $.token.http = [
        // Ignore everything after `\n\n`
        ['(\\n\\n)([\\s\\S]*)', [0, 0, 'val']],
        ['(DELETE|GET|HEAD|OPTIONS|PATCH|POST|PUT)([ ]+)(\\S+)([ ]+)(HTTP\\/\\d+(?:\\.\\d+)*)', ['typ', 'nam', 0, 'uri', 0, 0]],
        ['(' + key + ')(:)([ ]*)([^\\n]+)', [0, 'key', 'pun', 0, [
            [$.LOG, ['val.log']],
            [$.NUM, ['val.num']],
            [$.STR, ['val.str']],
            ['.+', ['val']]
        ]]]
    ];
})(ASH);
