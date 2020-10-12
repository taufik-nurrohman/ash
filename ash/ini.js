(token => {
    let key = '[a-zA-Z_][\\w]*';
    token[';[^\\n]+'] = ['com'];
    token['\\b(' + key + ')([ ]*)(=)([ ]*)([^\\n]+)'] = [0, 'key', 0, 'pun', 0, token];
    token['\\b(' + key + ')([ ]*)(=)'] = [0, 'key', 0, 'pun'];
    token['\\[[^\\n\\]]+\\]'] = ['sec'];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token[ASH.NUM] = ['val.num'];
    token[ASH.PUN] = ['pun'];
    token['[^\\n;]+'] = ['val'];
    ASH.token.ini = token;
})({});
