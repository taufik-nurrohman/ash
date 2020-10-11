(function(token, query) {
    let key = '(?:[a-zA-Z_-][\\w-]*)';
    query['\\[[^\\]]+\\]'] = ['que.att'];
    query['::?' + key] = ['que.pse'];
    query['\\.' + key] = ['que.cla'];
    query['#' + key] = ['que.id'];
    query['@' + key] = ['que.wor'];
    query[key] = ['que.ele'];
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    // Select everything after `}` and before `{`
    token['\\b(\\s*)([^{}]+)(\\s*)(\\{)'] = [0, 0, query, 0, 'pun'];
    token['\\b(' + key + ')(\\s*)(:)'] = [0, 'key', 0, 'pun'];
    token[ASH.STR] = ['str'];
    // Slice -2 to remove the `\b` part
    token[ASH.NUM.slice(0, -2) + '(?:[cme]m|ch|ex|in|p[ctx]|rem|v(?:[hw]|max|min)|%)\\b'] = ['num'];
    token['#(?:[a-f\\d]{1,2}){3,4}\\b'] = ['num.hex'];
    token[ASH.NUM] = ['num'];
    token[ASH.URI] = ['uri'],
    token['\\b(' + key + ')(\\s*)(\\()'] = [0, 'fun', 0, 'pun'];
    token[ASH.PUN] = ['pun'];
    // Others must be value
    token['[^\\s]+'] = ['val'];
    ASH.token.css = token;
})({}, {});
