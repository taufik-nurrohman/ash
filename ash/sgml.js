(function(token, atr) {
    // Just like `html` but this ignores `<script>`, `<style>` and `<template>` tag(s)
    token['<!--[\\s\\S]*?-->'] = ['com'];
    token['<![^>]+>'] = ['typ'];
    // Capture SGML attribute(s)
    let data = '\\s+[^\\s>=]+(?:=(?:' + ASH.STR + '|[^\\s>]+?))?';
    // Categorize the captured SGML attribute(s)
    atr[data] = {};
    // SGML attribute with value
    atr[data]['(\\s+)([^\\s=\\/>]+)(=)(' + ASH.STR + '|[^\\s=\\/>]+)'] = [0, 0, 'key', 'pun', 'val'];
    // SGML attribute without value
    atr[data]['(\\s+)([^\\s=\\/>]+)'] = [0, 0, 'key'];
    // Capture a SGML tag
    let tag = '<\\/?[^\\s]+?(?:\\s[^>]*)?>';
    // Categorize the captured SGML tag
    let task = {
        // Opening tag with attribute(s)
        '(<)([^\\s]+)(\\s[^>]*)(>)': ['mar', 'pun', 'nam', atr, 'pun'],
        // Plain tag or a closing tag
        '(<)(\\/?)([^\\s]+)(>)': ['mar', 'pun', 'pun', 'nam', 'pun']
    };
    token['(<)(\\/)(>)'] = ['mar', 'pun', 'pun', 'pun'];
    token[tag] = task;
    ASH.token.sgml = token;
})({}, {});
