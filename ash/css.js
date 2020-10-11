(function(token) {
    token['\\/\\*\\*\\/'] = ['com'];
    // Select everything after `}` and before `{`
    token['(^|\\})(\\s*)([^{}]+?)(\\s*)(\\{)'] = [0, 'pun', 0, {}, 0, 'pun'];
    token[ASH.STR] = ['str'];
    token[ASH.PUN] = ['pun'];
    ASH.token.css = token;
})({});
