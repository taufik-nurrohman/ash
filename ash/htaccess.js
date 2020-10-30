($ => {
    // <https://www.iana.org/assignments/media-types>
    let types = '(?:' + [
        'application',
        'audio',
        'font',
        'example',
        'image',
        'message',
        'model',
        'multipart',
        'text',
        'video'
    ].join('|') + ')/[a-z\\d-]+(?:\\.[a-z\\d-]+)?(?:\\+[a-z\\d-]+)?';
    $.token.htaccess = [
        ['#[^\\n]+', ['com']],
        ['(<)(/)?([^\\s<>/]+)(?:(\\s)([^>]*?))?(>)', ['sec', 0, 0, 'nam', 0, [], 0]],
        ['([aA]dd[dD]efault[cC]harset)(\\s+)([^\\n]+)', [0, 'key', 0, 'val']],
        ['([a-zA-Z][\\w]*)(\\s+)((?:\\\\\\n|[^\\n])+)', [0, 'key', 0, [
            ['^' + $.LOG + '$', ['log']],
            ['^(?:[aA]llow|[dD]eny|False|[nN]o|Null|[oO]ff|[oO]n|True|[yY]es)$', ['log']],
            [$.STR, ['str']],
            ['[$%]\\d+', ['num.ref']],
            [$.NUM, ['num']],
            ['\\^\\S+\\$(?!\\d)', ['exp']],
            ['\\^\\S+', ['exp']],
            ['\\S+\\$(?!\\d)', ['exp']],
            // IP
            ['\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?', ['num']],
            // Port
            [':\\d{1,5}', ['num']],
            ['\\b' + types + '\\b', ['typ']],
            ['%\\{[A-Z][A-Z\\d_]*\\}', ['con']],
            ['\\[[A-Z\\d]+(?:\\s*,\\s*[A-Z\\d]+)*\\]', ['sym']]
        ]]]
    ];
})(ASH);
