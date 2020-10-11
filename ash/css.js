(function(token, query) {
    let key = '(?:\\\\.|[a-zA-Z_-][\\w-]*)';
    query['\\[\\]'] = ['que.att'];
    query['::?' + key] = ['que.pse'];
    query['\\.' + key] = ['que.cla'];
    query['#' + key] = ['que.id'];
    query['@' + key] = ['que.wor'];
    query[key] = ['que.ele'];
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com'];
    // Select everything after `}` and before `{`
    token['(^|\\})(\\s*)([^{}]+?)(\\s*)(\\{)'] = [0, 'pun', 0, query, 0, 'pun'];
    token['([;{])(\\s*)(' + key + ')(\\s*)(:)(\\s*)([^;}]+?)(\\s*)([;}])'] = [0, 'pun', 0, 'key', 0, 'pun', 0, 'val', 0, 'pun'];
    token[ASH.STR] = ['str'];
    token[ASH.PUN] = ['pun'];
    ASH.token.css = token;
})({}, {});
