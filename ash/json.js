ASH['*.json'] = function(content) {
    // Set your pattern sequence to match, ordered by priority
    let pattern = [
            // Literal string followed by `:`
            '(' + ASH.STR + ')(\\s*)(:)',
            // Literal string
            ASH.STR,
            // Number
            ASH.NUM,
            // Boolean and `null`
            '\\bfalse|null|true\\b'
        ],
        // A helper method to generate `<span>` element with class(es)
        t = this.t;
    return this.chunk(pattern, (m, i) => {
        // `m` return the matching part(s)
        // `i` return the matched pattern index
        if (0 === i) {
            // Attribute, String
            return t('key.str', m[1]) + m[2] + m[3];
        }
        if (1 === i) {
            // Value, String
            return t('val.str', m[0]);
        }
        if (2 === i) {
            // Value, Number
            return t('val.num', m[0]);
        }
        if (3 === i) {
            // Value, Word, Literal
            return t('val.wor.lit', m[0]);
        }
        // Other(s)
        return m[0];
    }, content);
};
