(function(def0, def1) {
    def0['<!--[\\s\\S]*?-->'] = ['com'];
    def0['<![^>]+>'] = ['typ'];
    // Capture HTML attribute(s)
    let ASH_XML_DATA = '\\s+[^\\s>=]+(?:=(?:' + ASH.STR + '|[^\\s>]+?))?';
    // Categorize the captured HTML attribute(s)
    def1[ASH_XML_DATA] = {};
    // HTML attribute with value
    def1[ASH_XML_DATA]['(\\s+)([^\\s>=]+)(=)(' + ASH.STR + '|[^\\s>]+?)'] = [0, 0, 'key', 0, 'val'];
    // HTML attribute without value
    def1[ASH_XML_DATA]['(\\s+)([^\\s>=]+)'] = [0, 0, 'key'];
    // Capture a HTML tag
    let ASH_XML_PATTERN = '<\\/?[^\\s]+?(?:\\s[^>]*)?>';
    // Categorize the captured HTML tag
    let ASH_XML_TASK = {
        // Opening tag with attribute(s)
        '(<)([^\\s]+)(\\s[^>]*)(>)': ['tag', 0, 'nam', def1, 0],
        // Plain tag or a closing tag
        '(<)(\\/?)([^\\s]+)(>)': ['tag', 0, 0, 'nam', 0]
    };
    def0['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/script>)'] = [0, def0, '~js', def0];
    def0['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/style>)'] = [0, def0, '~css', def0];
    def0[ASH_XML_PATTERN] = ASH_XML_TASK; 
    ASH.tokens.xml = def0;
})({}, {});
