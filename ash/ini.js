(function(def0) {
    def0[';[^\\n]+'] = ['com'];
    def0['\\b([a-zA-Z_][\\w]*)([ ]*)(=)([ ]*)([^\\n]+)'] = [0, 'key', 0, 0, 0, def0];
    def0['\\b([a-zA-Z_][\\w]*)([ ]*)(=)'] = ['key', 0, 0];
    def0['(^|\\n)(\\[[^\\]]+\\])(\\n|$)'] = [0, 0, 'tag', 0];
    def0[ASH.STR] = ['val.str'];
    def0[ASH.LOG] = ['val.log'];
    def0[ASH.NUM] = ['val.num'];
    def0['[^\\n;]+'] = ['val'];
    ASH.tokens.ini = def0;
})({});
