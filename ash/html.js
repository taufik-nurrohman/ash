((token, atr) => {
    token['<!--[\\s\\S]*?-->'] = ['com'];
    token['<![^<>]+>'] = ['typ'];
    // Capture HTML attribute(s)
    let data = '\\s+[^\\s>=]+(?:=(?:' + ASH.STR + '|[^\\s=>]+))?';
    // Categorize the captured HTML attribute(s)
    atr[data] = {};
    // HTML attribute with value
    atr[data]['(\\s+)([^\\s=\\/>]+)(=)(' + ASH.STR + '|[^\\s=\\/>]+)'] = [0, 0, 'key', 'pun', 'val'];
    // HTML attribute without value
    atr[data]['(\\s+)([^\\s=\\/>]+)'] = [0, 0, 'key'];
    atr[data]['\\/'] = ['pun'];
    // Capture a HTML tag
    let tag = '<\\/?[^\\s<>]+?(?:\\s[^>]*)?>';
    // Categorize the captured HTML tag
    let task = {
        // Opening tag with attribute(s)
        '(<)([^\\s<>]+)(\\s[^>]*)(>)': ['mar', 'pun', 'nam', atr, 'pun'],
        // Plain tag or a closing tag
        '(<)(\\/?)([^\\s<>]+)(>)': ['mar', 'pun', 'pun', 'nam', 'pun']
    };
    token['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/script>)'] = [0, token, '~js', token];
    token['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/style>)'] = [0, token, '~css', token];
    // Do not highlight content in `<template>` element
    token['(<template(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/template>)'] = [0, token, 'val', token];
    // ditto
    token['(<textarea(?:\\s[^>]*)?>)([\\s\\S]*?)(<\\/textarea>)'] = [0, token, 'val', token];
    token[tag] = task;
    ASH.token.html = token;
})({}, {});
