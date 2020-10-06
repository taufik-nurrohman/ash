Asynchronous Syntax Highlighter
===============================

> A hard mode client-side syntax highlighter for the web.

ASH aims to solve problems related to client-side syntax highlighter&rsquo;s file size which is mostly getting bigger as the language variant you want to highlight increases.

Features
--------

**TODO**

Usage
-----

~~~ .html
<!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="ash.min.css" rel="stylesheet">
  </head>
  <body>
    <pre><code class="json">{&quot;foo&quot;:&quot;bar&quot;}</code></pre>
    <script src="ash.min.js"></script>
    <script>
    document.querySelectorAll('pre > code').forEach(new ASH);
    </script>
  </body>
</html>
~~~

Exanples
--------

**TODO**

Settings
--------

**TODO**

Methods and Properties
----------------------

**TODO**

Development
-----------

Regular expressions and class naming specifications are very inspired by the [Highlight.js](https://github.com/highlightjs/highlight.js) project. API may be very ugly, but I want to prioritize performance and size of the file for now.

### Regular Expression Specifications

If you already know that some tokens have a consistent pattern, you can define the pattern as constant to be used later across languages that could possibly benefit from it:

~~~ .js
ASH.LOG = '\\b(?:false|null|true)\\b';
ASH.NUM = '\\b-?(?:\\d+?\\.)?\\d+\\b';
ASH.STR = '"(?:\\\\.|[^"])*"|\'(?:\\\\.|[^\'])*\'|`(?:\\\\.|[^`])*`';
~~~

### Class Naming Specifications

Every language syntax basically have a structure, and usually they have the same kind of categorization. For example, although CSS and JavaScript are two different languages, they obviously have a unified tokens such as _function_, _keyword_, _number_, and _string_. The following are standard class names that likely would apply to all kind of language syntax:

Name | Description
---- | -----------
`com` | Comment.
`exp` | Expression. Regular expression.
`fun` | Function. A function declaration.
`inh` | Inherit. Used to make certain chunk inside a token to have the same color as the parent color.
`key` | Key. Should be paired with `val`.
`lib` | Library. Built-in objects or classes.
`log` | [Three-valued logic](https://en.m.wikipedia.org/wiki/Three-valued_logic). Includes `false`, `null`, `true`.
`nam` | Name. Name of function, HTML tag, etc.
`num` | Number. Including units and modifiers, if any.
`obj` | Object. Also class, interface.
`par` | Parameter. As in function.
`str` | String. Literal string.
`tag` | Tag. As in HTML tag or document tag.
`typ` | Type. Document type or identifier.
`val` | Value. Should be paired with `key`.
`wor` | Word. Special words that are reserved by the language parser such as `do`, `else`, `function`, `if`, `var`, `while`, etc.

Others are free to be defined by developers. Each category must at least be compatible with the existing classes, and must consist of a maximum of three letters. For example, you may want to distinguish between float and integer number. You can add `flo` class together with `num`. Or, you may want to make a sub-category for number that is represented in HEX format. You can add `hex` class together with `num`.  Sub-category coloring can be added by the syntax highlighter theme designer optionally. The default color for numbers will always inherit to the `num` class.

### Adding Your Own Syntax Highlighter

I don&rsquo;t want to look fancy here. The main feature of this syntax highlighter is the ability to load language definition asynchronously. About the way you will mark the tokens is up to you. All you have to do is define a language category based on the file extension like so:

~~~ .js
ASH['*.css'] = function(content) {};
ASH['*.js'] = function(content) {};
ASH['*.xml'] = function(content) {};

// You can also make alias
ASH['*.html'] = 'xml';
ASH['*.sgml'] = 'xml';
~~~

Defining languages together with the core will make the highlighting work synchronously. To make it asynchronous, you will need to store them as separate files:

~~~ .txt
.\
├── ash\
│   ├── css.js
│   ├── html.js
│   ├── js.js
│   ├── sgml.js
│   └── xml.js
└── ash.js
~~~

The function parameter contains the plain text version of the source element contents. `this` refers to the `ASH` instance. You can get the available methods and properties from there:

~~~ .js
ASH['*.json'] = function(content) {
    // Mark the desired parts of your syntax here
    content = content.replace(/[\{\}\[\]:,]/g, '<b>$&</b>');
    // Then return the modified content
    return content;
};
~~~

> **Tips:** Use AST parsers such as A and B to get more accurate results. Using this usually has the side effect of a longer parsing process.

Below is a simple example of using the `ash.chunk` method to mark portions of a JSON file using regular expressions:

~~~ .js
ASH['*.json'] = function(content) {
    // Set your pattern sequence to match, ordered by priority
    let pattern = [
            // String followed by `:`
            '(' + ASH.STR + ')(\\s*)(:)',
            // String
            ASH.STR,
            // Number
            ASH.NUM,
            // Logic
            ASH.LOG
        ],
        // A helper method to generate `<span>` element with class(es)
        t = this.t;
    return this.chunk(pattern, (m, i) => {
        // `m` return the matching part(s)
        // `i` return the matched pattern index
        if (0 === i) {
            // Attribute
            return t('key', m[1]) + m[2] + m[3];
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
            // Value, Logic
            return t('val.log', m[0]);
        }
        // Other(s)
        return m[0];
    }, content);
};
~~~

Limitations
-----------

 - Currently not possible to preserve HTML tags in the source code.

License
-------

Use it for free, pay if you get paid. So, you’ve just benefited financially after using this project? It’s a good idea to [share a little financial support](https://paypal.me/tatautaufik) with this open source project too. Your support will motivate me to do any further development, as well as to provide voluntary support to overcome problems related to this project.

Thank you! ❤️
