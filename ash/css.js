((token, query) => {
    let key = '(?:(?:\\\\.|[a-zA-Z_-])(?:\\\\.|[\\w-])*)';
    query['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    query['(\\()([^)]+)(\\))'] = [0, 'pun', token, 'pun'];
    query['\\[[^\\n\\]]+\\]'] = ['que.att'];
    query['::?' + key] = ['que.pse'];
    query['\\.' + key] = ['que.cla'];
    query['#' + key] = ['que.id'];
    query['(@(?:keyframes|property))(\\s+)(' + key + ')'] = [0, 'que.wor', 0, 'nam'];
    query['@' + key] = ['que.wor'];
    // <https://www.w3.org/TR/CSS21/media.html>
    query['\\b(' + [
        'all',
        'braille',
        'embossed',
        'handheld',
        'print',
        'projection',
        'screen',
        'speech',
        'tty',
        'tv'
    ].join('|') + ')\\b'] = ['typ'];
    query['\\b(?:' + [
        'and',
        'from',
        'not',
        'only',
        'to'
    ].join('|') + ')\\b'] = ['que.wor'];
    query[key] = ['que.ele'];
    query['&'] = ['var'];
    query[ASH.PUN] = ['pun'];
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    // Select everything before `{`
    // Also select any word prefixed by `$` and `&` for preprocessor
    token['((?:\\[[^\\n\\]]+\\]|[@#.:$&]?' + key + ')[^{}]*)(\\s*)(\\{)'] = [0, query, 0, 'pun'];
    token[ASH.URI] = ['uri'];
    token['((?:--|$)' + key + ')(\\s*)(:)'] = [0, 'var', 0, 'pun'];
    token['(' + key + ')(\\s*)(:)'] = [0, 'key', 0, 'pun'];
    token['(?:--|$)' + key] = ['var'];
    token['!' + key] = ['sym'];
    token[ASH.STR] = ['str'];
    // Slice -2 to remove the `\b` part
    token[ASH.NUM.slice(0, -2) + '(?:(?:[cme]m|ch|deg|ex|in|p[ctx]|rem|v(?:[hw]|max|min))\\b|%)'] = ['num'];
    token['#(?:[a-fA-F\\d]{1,2}){3,4}\\b'] = ['num.hex'];
    token[ASH.NUM] = ['num'];
    token['\\b(' + key + ')(\\s*)(\\()'] = [0, 'fun', 0, 'pun'];
    token[ASH.PUN] = ['pun'];
    // Other(s) must be value
    token['\\b' + key + '\\b'] = ['val'];
    ASH.token.css = token;
})({}, {});
