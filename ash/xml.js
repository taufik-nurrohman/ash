(function(token, atr) {
    token['<!--[\\s\\S]*?-->'] = ['com'];
    token['<![^>]+>'] = ['typ'];
    // Capture HTML attribute(s)
    let ASH_XML_DATA = '\\s+[^\\s>=]+(?:=(?:' + ASH.STR + '|[^\\s>]+?))?';
    // Categorize the captured HTML attribute(s)
    atr[ASH_XML_DATA] = {};
    // HTML attribute with value
    atr[ASH_XML_DATA]['(\\s+)([^\\s=\\/>]+)(=)(' + ASH.STR + '|[^\\s=\\/>]+?)'] = [0, 0, 'key', 0, 'val'];
    // HTML attribute without value
    atr[ASH_XML_DATA]['(\\s+)([^\\s=\\/>]+)'] = [0, 0, 'key'];
    // Capture a HTML tag
    let ASH_XML_TAG = '<\\/?[^\\s]+?(?:\\s[^>]*)?>';
    // Categorize the captured HTML tag
    let ASH_XML_TASK = {
        // Opening tag with attribute(s)
        '(<)([^\\s]+)(\\s[^>]*)(>)': ['tag', 0, 'nam', atr, 0],
        // Plain tag or a closing tag
        '(<)(\\/?)([^\\s]+)(>)': ['tag', 0, 0, 'nam', 0]
    };
    token['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/script>)'] = [0, token, '~js', token];
    token['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/style>)'] = [0, token, '~css', token];
    token[ASH_XML_TAG] = ASH_XML_TASK;
    ASH.token.xml = token;
})({}, {});
