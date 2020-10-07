ASH['*.xml'] = function(content) {
    var chunk = this.chunk,
        t = this.t;
    return chunk(['<!--[\\s\\S]*?-->', '<(\\/?)([^\\s]+?)(\\s[^>]*)?>'], function(v, i) {
      console.log([v,i])
        if (0 === i) {
            return t('com', v[0]);
        }
        if ('!' === v[2][0]) {
            return t('typ', v[0]);
        }
        if (1 === i) {
            return t('tag', '&lt;' + v[1] + t('nam', v[2]) + (v[3] || "") + '&gt;', 0);
        }
        return t("", v[0]);
    }, content);
};
