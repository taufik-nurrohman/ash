((token, query) => {
    let key = '(?:(?:\\\\.|[a-zA-Z_-])(?:\\\\.|[\\w-])*)';
    query['(\\()([^)]+)(\\))'] = [0, 'pun', token, 'pun'];
    query['\\[[^\\]]+\\]'] = ['que.att'];
    query['::?' + key] = ['que.pse'];
    query['\\.' + key] = ['que.cla'];
    query['#' + key] = ['que.id'];
    query['@' + key] = ['que.wor'];
    query['\\b(?:' + [
        'and',
        'not',
        'only'
    ].join('|') + ')\\b'] = ['que.wor'];
    query[key] = ['que.ele'];
    query[ASH.PUN] = ['pun'];
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    // Select everything before `{`
    token['((?:[@#.:]?' + key + '|\\[^\\]\\]+)[^{}]*)(\\s*)(\\{)'] = [0, query, 0, 'pun'];
    token['(' + key + ')(\\s*)(:)'] = [0, 'key', 0, 'pun'];
    token['--' + key] = ['var'];
    token['!' + key] = ['sym'];
    token[ASH.STR] = ['str'];
    // Slice -2 to remove the `\b` part
    token[ASH.NUM.slice(0, -2) + '(?:(?:[cme]m|ch|deg|ex|in|p[ctx]|rem|v(?:[hw]|max|min))\\b|%)'] = ['num'];
    token['#(?:[a-fA-F\\d]{1,2}){3,4}\\b'] = ['num.hex'];
    token[ASH.NUM] = ['num'];
    token[ASH.URI] = ['uri'],
    token['\\b(' + key + ')(\\s*)(\\()'] = [0, 'fun', 0, 'pun'];
    token[ASH.PUN] = ['pun'];
    // Other(s) must be value
    token['\\b' + key + '\\b'] = ['val'];
    ASH.token.css = token;
})({}, {});
