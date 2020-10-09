(function(token) {
    token[';[^\\n]+'] = ['com'];
    token['\\b([a-zA-Z_][\\w]*)([ ]*)(=)([ ]*)([^\\n]+)'] = [0, 'key', 0, 0, 0, token];
    token['\\b([a-zA-Z_][\\w]*)([ ]*)(=)'] = ['key', 0, 0];
    token['(^|\\n)(\\[[^\\]]+\\])(\\n|$)'] = [0, 0, 'tag', 0];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token[ASH.NUM] = ['val.num'];
    token['[^\\n;]+'] = ['val'];
    ASH.token.ini = token;
})({});
