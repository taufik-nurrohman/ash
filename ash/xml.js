ASH.token.xml = {
    '<\\?xml\\s[\\s\\S]*?\\?>': ['typ'],
    '(<!\\[CDATA\\[)([\\s\\S]*?)(\\]\\]>)': [0, 'typ', 'val', 'typ'],
    '<[^>]+>': ['~sgml']
};
