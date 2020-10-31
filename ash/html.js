($$ => {
    let e = ['&(?:[a-zA-Z\\d]+|#x[a-fA-F\\d]+|#\\d+);', ['sym']];
    let a = ['(\\s+)([^\\s>=/]+)(?:(=)(' + $$.STR + '|[^\\s>=/]+))?', [0, 0, 'key', 'pun', 'val']],
        o = ['(<)([^\\s<>/]+)(\\s[^>]*?)?(/)?(>)', ['mar', 'pun', 'nam', [a], 'pun', 'pun']],
        c = ['(<)(/)([^\\s<>/]+)(>)', ['mar', 'pun', 'pun', 'nam', 'pun']];
    $$.token.html = [
        ['<!--[\\s\\S]*?-->', ['com']],
        ['<![^<>]+>', ['typ']],
        ['(<script(?:\\s[^>]*)?>)([\\s\\S]*?)(</script>)', [0, [o], 0, [c]]],
        ['(<style(?:\\s[^>]*)?>)([\\s\\S]*?)(</style>)', [0, [o], 0, [c]]],
        // Do not highlight content in `<template>` element
        ['(<template(?:\\s[^>]*)?>)([\\s\\S]*?)(</template>)', [0, [o], 'val', [c]]],
        // ditto
        ['(<textarea(?:\\s[^>]*)?>)([\\s\\S]*?)(</textarea>)', [0, [o], 'val', [c]]],
        o, c, e
    ];
})(ASH);
