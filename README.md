Asynchronous Syntax Highlighter
===============================

> A hard mode client-side syntax highlighter for the web.

Ash aims to solve problems related to client-side syntax highlighter&rsquo;s file size which is mostly getting bigger as the language variant you want to highlight increases.

[Demo and Documentation](https://taufik-nurrohman.github.io/ash)

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
    document.querySelectorAll('pre > code').forEach(code => {
        new ASH(code);
    });
    </script>
  </body>
</html>
~~~

Examples
--------

 - [No Idea?](https://taufik-nurrohman.github.io/ash/ash.html)

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
ASH.STR = '"(?:\\\\.|[^"])*"|\'(?:\\\\.|[^\'])*\'';
~~~

### Class Naming Specifications

Every language syntax basically have a structure, and usually they have the same kind of categorization. For example, although CSS and JavaScript are two different languages, they obviously have a unified tokens such as _function_, _keyword_, _number_, and _string_. The following are standard class names that likely would apply to all kind of language syntax:

Name | Description
---- | -----------
`cla` | Class.
`com` | Comment.
`con` | Constant.
`exp` | Expression. Regular expression.
`fun` | Function. A function declaration.
`inh` | Inherit. Used to make certain chunk inside a token to have the same color as the parent color.
`key` | Key. Should be paired with `val`.
`lib` | Library. Built-in objects or classes.
`log` | [Three-valued logic](https://en.m.wikipedia.org/wiki/Three-valued_logic). Includes `false`, `null`, `true`.
`nam` | Name. Name of function, HTML tag, etc.
`num` | Number. Including units and modifiers, if any.
`mar` | Markup. As in HTML tags or Markdown syntax.
`str` | String. Literal string.
`sym` | Symbol. Smiley, HTML entities, etc.
`typ` | Type. Document type or identifier.
`val` | Value. Should be paired with `key`.
`var` | Variable. In general, it should not be highlighted unless it has special pattern such as PHP variables.
`wor` | Word. Special words that are reserved by the language parser such as `do`, `else`, `function`, `if`, `var`, `while`, etc.

Others are free to be defined by developers. Each category must at least be compatible with the existing classes, and must consist of a maximum of three letters. For example, you may want to distinguish between float and integer number. You can add `flo` class together with `num`. Or, you may want to make a sub-category for number that is represented in HEX format. You can add `hex` class together with `num`.  Sub-category coloring can be added by the syntax highlighter theme designer optionally. The default color for numbers will always inherit to the `num` class.

Name | Description
---- | -----------
`att` | Attribute. As in attribute selector in CSS.
`bul` | Bullet. As for list and YAML array sequence.
`cod` | Code. As in Markdown syntax for codes.
`ele` | Element. As in element selector in CSS.
`id` | ID. As in ID selector in CSS.
`ima` | Image. As in Markdown syntax for images.
`lin` | Link. As in Markdown syntax for links.
`pse` | Pseudo. As in pseudo class or element selector in CSS.
`quo` | Quote. As in Markdown syntax for quotes.
`que` | Query. As in CSS selector.
`sec` | Section. As in INI syntax for sections.
`tit` | Title. As in Markdown syntax for headings.
`uri` | URI. Just in case you want to highlight URI.

### Adding Your Own Syntax Highlighter

I don&rsquo;t want to look fancy here. The main feature of this syntax highlighter is the ability to load language definition asynchronously. About the way you will mark the tokens is up to you. All you have to do is define a language category based on the file extension like so:

~~~ .js
ASH.token.css = function(content) {};
ASH.token.html = function(content) {};
ASH.token.js = function(content) {};

// You can also make alias
ASH.token.jsx = 'js';
ASH.token.ts = ASH.token.js;
~~~

Defining languages together with the core will make the highlighting work synchronously. To make it asynchronous, you will need to store them as separate files:

~~~ .txt
.\
├── ash\
│   ├── css.js
│   ├── html.js
│   └── js.js
└── ash.js
~~~

The function parameter contains the plain text version of the source element contents. `this` refers to the `ASH` instance. You can get the available methods and properties from there:

~~~ .js
ASH.token.json = function(content) {
    // Mark the desired parts of your syntax here
    content = content.replace(/[\{\}\[\]:,]/g, '<b>$&</b>');
    // Then return the modified content
    return content;
};
~~~

> **Tips:** Use AST parsers such as A and B to get more accurate results. Using this usually has the side effect of a longer parsing process.

Below is a simple example of using the object method to mark portions of a JSON file using regular expressions:

~~~ .js
(token => {
    token['(' + ASH.STR + ')(\\s*:)'] = [0, 'key', 0];
    token[ASH.STR] = ['val.str'];
    token[ASH.LOG] = ['val.log'];
    token[ASH.NUM] = ['val.num'];
    ASH.token.json = token;
})({});
~~~

The order in which the patterns are given is very important. Patterns will be rearranged internally as a series of `regex1|regex2|regex3`.

Current implementation of syntax highlighter relies on regular expressions. I know this is bad, but to handle short code snippets, it should be enough. If you want to handle more complex cases, a syntax highlighter library such as [Highlight.js](https://github.com/highlightjs/highlight.js) will be more appropriate.

Limitations
-----------

 - Currently not possible to preserve HTML tags in the source code.
 - Mixed PHP expression within a HTML tag is likely will break.

License
-------

Use it for free, pay if you get paid. So, you’ve just benefited financially after using this project? It’s a good idea to [share a little financial support](https://paypal.me/tatautaufik) with this open source project too. Your support will motivate me to do any further development, as well as to provide voluntary support to overcome problems related to this project.

Thank you! ❤️
