(token => {
    let key = '(?:[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*)';
    let keys = '(?:\\\\?' + key + '(?:\\\\' + key + ')*)';
    token['\\/\\*[\\s\\S]*?\\*\\/'] = ['com.s0'];
    token['\\/\\/[^\\n]+'] = ['com.s1'];
    token['#[^\\n]+'] = ['com.s2'];
    token['<\\?(?:php|=)|\\?>'] = ['typ'];
    // token['<\\/?[^\\s>]+(?:\\s[^>]*)?>'] = ['~xml']; // JSX
    token[ASH.STR] = function(v) {
        return ['str.s' + ({'"': 0, "'": 1, '`': 2}[v[0][0]] || 0)];
    };
    token[ASH.LOG] = ['log.s0'];
    token[ASH.LOG.toUpperCase().replace(/\\B/g, '\\b')] = ['log.s1'];
    token[ASH.NUM] = ['num'];
    let wors = '(?:' + [
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
        'for',
        'foreach',
        'from',
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
    // Standard PHP library
    // <https://www.php.net/manual/en/book.spl.php>
    let libs = '(?:' + [
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
    token['(-)(>)(' + key + ')'] = [0, 'pun', 'pun', 'key']; // Skip
    token['(\\$+' + key + ')(:)(:)(' + key + ')'] = [0, 'var', 'pun', 'pun', 'con'];
    token['\\$+' + key] = ['var'];
    token['\\b(function)(\\s+)(' + keys + ')\\b'] = [0, 'wor', 0, 'fun'];
    let prefix = 'as|class|extends|implements|interface|namespace|new|trait|function|use';
    token['\\b(' + prefix + ')(\\s+)(' + libs + ')\\b'] = [0, 'wor', 0, 'cla.lib'];
    token['\\b(' + prefix + ')(\\s+)(' + keys + ')\\b'] = [0, 'wor', 0, 'cla'];
    token['\\b(' + keys + ')(\\s*)(\\()'] = [0, 'fun', 0, 'pun'];
    token['\\b(' + keys + ')(:)(:)(' + key + ')'] = [0, 'cla', 'pun', 'pun', 'con'];
    token['\\b' + wors + '\\b'] = ['wor'];
    token['\\b' + libs + '\\b'] = ['cla.lib'];
    // Magic constant <https://www.php.net/manual/en/language.constants.predefined.php>
    token['\\b__(?:' + [
        'CLASS',
        'DIR',
        'FILE',
        'FUNCTION',
        'LINE',
        'METHOD',
        'NAMESPACE',
        'TRAIT'
    ].join('|') + ')__\\b'] = ['con.lib'];
    token['\\b' + keys + '\\b'] = ['con'];
    token[ASH.PUN] = ['pun'];
    // Other(s) must be constant
    token['\\b' + key + '\\b'] = ['con'];
    ASH.token.php = token;
})({});
