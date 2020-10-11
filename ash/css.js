(function(token, query) {
    let key = '(?:[a-zA-Z_-][\\w-]*)';
    let f = '\\b(' + key + ')(\\s*)(\\()';
    let u = ASH.NUM + '(?:[cme]m|ch|ex|in|p[ctx]|rem|v(?:[hw]|max|min)|%)';
    query['\\[[^\\]]+\\]'] = ['que.att'];
    query['::?' + key] = ['que.pse'];
    query['\\.' + key] = ['que.cla'];
    query['#' + key] = ['que.id'];
    query['@' + key] = ['que.wor'];
    query[key] = ['que.ele'];
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    // Select everything after `}` and before `{`
    token['(^|\\}|\\b)(\\s*)([^{}]+?)(\\s*)(\\{)'] = [0, 'pun', 0, query, 0, 'pun'];
    token['(\\s+|\\b)(' + key + ')(\\s*)(:)(\\s*)([^;}]+?)(\\s+|\\b)'] = [0, 0, 'key', 0, 'pun', 0, {
        [ASH.STR]: ['str'],
        [u]: ['num'],
        '#(?:[a-f\\d]{1,2}){3,4}\\b': ['num.hex'],
        [ASH.NUM]: ['num'],
        [ASH.URI]: ['uri'],
        [f]: [0, 'fun', 0, 'pun'],
        [ASH.PUN]: ['pun'],
        // Others must be value
        '[^\\s]+': ['val']
    }, 0];
    token[ASH.STR] = ['str'];
    token[ASH.PUN] = ['pun'];
    ASH.token.css = token;
})({}, {});
