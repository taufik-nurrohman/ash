ASH.x.json = function(content) {
    var t = this.t;
    return this.chunk([
        // String, followed by `:`
        '(' + ASH.STR + ')(\\s*)(:)',
        // String
        ASH.STR,
        // Number
        ASH.NUM,
        // Logic
        ASH.LOG
    ], function(v, i) {
        if (0 === i && '"' === v[1][0]) {
            return t('key', v[1]) + v[2] + v[3];
        }
        if (1 === i && '"' === v[0][0]) {
            return t('val.str', v[0]);
        }
        if (2 === i) {
            return t('val.num.' + (-1 === v[0].indexOf('.') ? 'int' : 'flo'), v[0]);
        }
        if (3 === i) {
            return t('val.log', v[0]);
        }
        return t(0, v[0]);
    }, content);
};
