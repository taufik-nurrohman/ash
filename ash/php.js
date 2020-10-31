($$ => {
    let key = '(?:[a-zA-Z_\\x7f-\\xff][a-zA-Z\\d_\\x7f-\\xff]*)';
    let keys = '(?:\\\\?' + key + '(?:\\\\' + key + ')*)';
    // Standard PHP library
    // <https://www.php.net/manual/en/book.spl.php>
    let libraries = '(?:' + [
        'AppendIterator',
        'ArgumentCountError',
        'ArithmeticError',
        'ArrayIterator',
        'ArrayObject',
        'AssertionError',
        'BadFunctionCallException',
        'BadMethodCallException',
        'CachingIterator',
        'CallbackFilterIterator',
        'CompileError',
        'Countable',
        'DirectoryIterator',
        'DivisionByZeroError',
        'DomainException',
        'EmptyIterator',
        'Error',
        'ErrorException',
        'Exception',
        'FilesystemIterator',
        'FilterIterator',
        'GlobIterator',
        'InfiniteIterator',
        'InvalidArgumentException',
        'IteratorIterator',
        'LengthException',
        'LimitIterator',
        'LogicException',
        'MultipleIterator',
        'NoRewindIterator',
        'OutOfBoundsException',
        'OutOfRangeException',
        'OuterIterator',
        'OverflowException',
        'ParentIterator',
        'ParseError',
        'RangeException',
        'RecursiveArrayIterator',
        'RecursiveCachingIterator',
        'RecursiveCallbackFilterIterator',
        'RecursiveDirectoryIterator',
        'RecursiveFilterIterator',
        'RecursiveIterator',
        'RecursiveIteratorIterator',
        'RecursiveRegexIterator',
        'RecursiveTreeIterator',
        'RegexIterator',
        'RuntimeException',
        'SeekableIterator',
        'SplDoublyLinkedList',
        'SplFileInfo',
        'SplFileObject',
        'SplFixedArray',
        'SplHeap',
        'SplMaxHeap',
        'SplMinHeap',
        'SplObjectStorage',
        'SplObserver',
        'SplObserver',
        'SplPriorityQueue',
        'SplQueue',
        'SplStack',
        'SplSubject',
        'SplSubject',
        'SplTempFileObject',
        'TypeError',
        'UnderflowException',
        'UnexpectedValueException',
        // Reserved interface(s)
        // <https://www.php.net/manual/en/reserved.interfaces.php>
        'ArrayAccess',
        'Closure',
        'Generator',
        'Iterator',
        'IteratorAggregate',
        'Serializable',
        'Throwable',
        'Traversable',
        'WeakReference',
        // Reserved class(es)
        // <https://www.php.net/manual/en/reserved.classes.php>
        'Directory',
        '__PHP_Incomplete_Class',
        'parent',
        'php_user_filter',
        'self',
        'static',
        'stdClass'
    ].join('|') + ')';
    let words = '(?:' + [
        // List of keywords that may not require parenthesis
        // (function that look like language construct or language construct that look like function)
        'die',
        'echo',
        'exit',
        'include',
        'include_once',
        'print',
        'require',
        'require_once',
        // Other(s)
        // <https://www.php.net/manual/en/reserved.php>
        'array',
        'abstract',
        'and',
        'as',
        'binary',
        'bool',
        'boolean',
        'break',
        'callable',
        'case',
        'catch',
        'class',
        'clone',
        'const',
        'continue',
        'declare',
        'default',
        'do',
        'double',
        'else',
        'elseif',
        'empty',
        'enddeclare',
        'endfor',
        'endforeach',
        'endif',
        'endswitch',
        'endwhile',
        'eval',
        'extends',
        'final',
        'finally',
        'float',
        'fn',
        'for',
        'foreach',
        'from',
        'function',
        'global',
        'goto',
        'if',
        'implements',
        'instanceof',
        'insteadof',
        'int',
        'integer',
        'interface',
        'isset',
        'iterable',
        'list',
        'match',
        'namespace',
        'new',
        'object',
        'or',
        'private',
        'protected',
        'public',
        'real',
        'return',
        'string',
        'switch',
        'throw',
        'trait',
        'try',
        'unset',
        'use',
        'var',
        'void',
        'while',
        'xor',
        'yield'
    ].join('|') + ')';
    let b = 'class|extends|implements|interface|new|trait|use';
    $$.token.php = [
        ['(<\\?(?:php(?=\\s)|=))([\\s\\S]*?)(\\?>|$)', [0, 'typ', [
            ['/\\*[\\s\\S]*?\\*/', ['com.s0']],
            ['//[^\\n]+', ['com.s1']],
            ['#[^\\n]+', ['com.s2']],
            ['(<<<)([A-Z_][A-Z\\d_]*)([\\s\\S]*?)(\\2)', [0, 'sym', 'con', 'str', 'con']],
            ['(<<<)(")([A-Z_][A-Z\\d_]*)(")([\\s\\S]*?)(\\3)', [0, 'sym', 'pun', 'con', 'pun', 'str', 'con']],
            ['(<<<)(\')([A-Z_][A-Z\\d_]*)(\')([\\s\\S]*?)(\\3)', [0, 'sym', 'pun', 'con', 'pun', 'str', 'con']],
            [$$.STR, v => {
                return ['str.s' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
            }],
            [$$.LOG, ['log']],
            [$$.NUM, ['num']],
            ['(-)(>)(' + key + ')', [0, 'pun', 'pun', 'key']], // Skip
            ['(\\$+' + key + ')(:)(:)(' + key + ')', [0, 'var', 'pun', 'pun', 'con']],
            ['\\$+' + key, ['var']],
            ['\\b(as)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'nam']],
            ['\\b(const)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'con']],
            ['\\b(function)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'fun']],
            ['\\b(namespace)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'nam']],
            ['\\b(' + b + ')(\\s+)(' + libraries + ')\\b', [0, 'wor', 0, 'cla.lib']],
            ['\\b(use)(\\s+)(const)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'wor', 0, 'con']],
            ['\\b(use)(\\s+)(function)(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'wor', 0, 'fun']],
            ['\\b(' + b + ')(\\s+)(' + keys + ')\\b', [0, 'wor', 0, 'cla']],
            ['\\b(' + words + ')(\\s*)(\\()', [0, 'wor', 0, 'pun']],
            ['\\b(' + keys + ')(\\s*)(\\()', [0, 'fun', 0, 'pun']],
            ['\\b(' + keys + ')(:)(:)(' + key + ')', [0, 'cla', 'pun', 'pun', 'con']],
            ['\\b' + words + '\\b', ['wor']],
            ['\\b' + libraries + '\\b', ['cla.lib']],
            // Magic constant <https://www.php.net/manual/en/language.constants.predefined.php>
            ['\\b__(?:' + [
                'CLASS',
                'DIR',
                'FILE',
                'FUNCTION',
                'LINE',
                'METHOD',
                'NAMESPACE',
                'TRAIT'
            ].join('|') + ')__\\b', ['con.lib']],
            [$$.PUN, ['pun']],
            // Other(s) must be constant
            ['\\b' + keys + '\\b', ['con']]
        ], 'typ']]
    ];
})(ASH);
