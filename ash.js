/*!
 * ==============================================================
 *  ASYNCHRONOUS SYNTAX HIGHLIGHTER 0.0.0
 * ==============================================================
 * Author: Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * License: MIT
 * --------------------------------------------------------------
 */

(function(win, doc, name) {

    let appendChild = 'appendChild',
        classList = 'classList',
        className = 'className',
        head = doc.head,
        innerHTML = 'innerHTML',
        instances = 'instances',
        replace = 'replace',
        script = doc.currentScript,
        src = script.src,
        textContent = 'textContent',
        token = 'token';

    function classHas(of, name) {
        return of[classList].contains(name);
    }

    function classLet(of, name) {
        of[classList].remove(name);
    }

    function classSet(of, name) {
        of[classList].add(name);
    }

    function doEscape(content) {
        return (content + "")[replace](/&/g, '&amp;')[replace](/</g, '&lt;')[replace](/>/g, '&gt;');
    }

    function doMark(content, name, forceEscape = 1) {
        if (!isSet(content)) {
            return "";
        }
        if (forceEscape) {
            content = doEscape(content);
        }
        return name ? '<span class="' + name[replace](/\./g, ' ') + '">' + content + '</span>' : content;
    }

    function doMarkAll(contents, names) {
        let out = "";
        for (let i = 0, j = contents.length; i < j; ++i) {
            if (0 === i) {
                // Ignore first array to be used later
                continue;
            }
            if ("" === contents[i]) {
                // Do not mark empty string!
                continue;
            }
            if (isArray(names[i])) {
                // Recurse
                out += fromTokens(toTokens(contents[i], names[i]));
            } else if (isFunction(names[i])) {
                // TODO
            } else {
                out += doMark(contents[i], names[i] || 0);
            }
        }
        return doMark(out || doEscape(contents[0]), names[0], 0);
    }

    function eventLet(to, event, fn) {
        to.removeEventListener(event, fn, false);
    }

    function eventSet(to, event, fn) {
        to.addEventListener(event, fn, false);
    }

    function fromTokens(tokens) {
        let out = "", v;
        for (let i = 0, j = tokens.length; i < j; ++i) {
            v = tokens[i];
            if (isFunction(v[1])) {
                v[1] = v[1].call({}, v[0]);
            }
            out += doMarkAll(v[0], v[1]);
        }
        return out;
    }

    function isArray(x) {
        return Array.isArray(x);
    }

    function isFunction(x) {
        return 'function' === typeof x;
    }

    function isObject(x, isPlainObject) {
        if ('object' !== typeof x) {
            return false;
        }
        return isPlainObject ? x instanceof Object : true;
    }

    function isSet(x) {
        return 'undefined' !== typeof x && null !== x;
    }

    function isString(x) {
        return 'string' === typeof x;
    }

    function toArray(x) {
        return Array.from(x);
    }

    function toNode(a, b, c) {
        a = doc.createElement(a);
        b && b[appendChild](a);
        c && (a[className] = c);
        return a;
    }

    function toPattern(a, b) {
        return new RegExp(a, b);
    }

    function toScript(content) {
        let node = toNode('script');
        node[textContent] = content;
        head[appendChild](node);
        return node;
    }

    function toTokens(content, syntax) {
        syntax.push(['\\s+', [0]]); // Add white-space to skip
        syntax.push(['.', [0]]); // Add any to skip
        let out = [],
            j = syntax.length, v;
        // Normalize line-break to optimize the regular expression
        content = content[replace](/\r\n|\r/g, '\n');
        while (content) {
            for (let i = 0; i < j; ++i) {
                v = (new RegExp(syntax[i][0], 'g')).exec(content);
                if (!v || 0 !== v.index) {
                    continue;
                }
                content = content.slice(v[0].length);
                out.push([v, syntax[i][1]]);
                break;
            }
        }
        return out;
    }

    function typeGet(classes, prefix) {
        // Prioritize class prefixed by `ash-`
        let m = classes && classes.match(toPattern('\\b' + prefix + '([^\\s]+)\\b'));
        if (m) {
            return m[1];
        }
        // Return the first class name if any
        if (classes) {
            return classes.split(/\s+/)[0] || null;
        }
    }

    (function($$) {

        // Reusable pattern(s)
        $$.LOG = '\\b(?:false|null|true)\\b';
        $$.NUM = '(?:0[bB][01]+(?:_[01]+)*n?|0[oO]\\d+(?:_\\d+)*n?|0[xX][a-fA-F\\d]+(?:_[a-fA-F\\d]+)*n?|[-+]?(?:\\d*(?:_\\d+)*\\.)?\\d+(?:_\\d+)*(?:n|[eE][-+]?\\d+)?)\\b';
        $$.PUN = '[!"#$%&\'\\(\\)*+,\\-.\\/:;<=>?@\\[\\]\\\\^_`{|}~]';
        $$.STR = '"(?:\\\\.|[^"])*"|\'(?:\\\\.|[^\'])*\'|`(?:\\\\.|[^`])*`';
        $$.URI = '\\b(?:https?):\\/\\/\\S+\\b';

        $$.version = '0.0.0';

        $$.state = {
            'class': 'ash'
        };

        // Collect all instance(s)
        $$[instances] = {};

        // Storage of language token(s)
        $$[token] = new Proxy({}, {
            get: function(storage, key) {
                return storage[key] || (async function() {
                    let a, b, min, url;
                    if (!src) {
                        return;
                    }
                    a = src.split('?');
                    b = a[0].split('/');
                    min = '.min.js' === b.pop().slice(-7);
                    return await win.fetch(b.join('/') + '/ash/' + key + (min ? '.min' : "") + '.js' + (a[1] ? '?' + a[1] : "")).then(response => response.ok && response.text()).then(text => {
                        if (isSet(text)) {
                            toScript(text);
                            return storage[key];
                        }
                    });
                })();
            },
            set: function(storage, key, value) {
                storage[key] = value;
            }
        });

    })(win[name] = function(source, o) {

        if (!source) return;

        let $ = this,
            $$ = win[name],
            state = Object.assign({}, $$.state, isString(o) ? {
                'class': o
            } : (o || {})),
            classNameTo = state['class'],
            classNameToRestore = source[className],
            contentToRestore = source[innerHTML];

        // Already instantiated, skip!
        if (source[name]) {
            return $;
        }

        // Return new instance if `ASH` was called without the `new` operator
        if (!($ instanceof $$)) {
            return new $$(source, o);
        }

        // Store syntax highlighter instance to `ASH.instances`
        $$[instances][source.id || source.name || Object.keys($$[instances]).length] = $;

        // Mark current DOM as active syntax highlighter to prevent duplicate instance
        source[name] = 1;

        $.pop = function() {
            if (!source[name]) {
                return $; // Already ejected
            }
            delete source[name];
            source[className] = classNameToRestore;
            source[innerHTML] = contentToRestore;
            return $;
        };

        $.source = source;
        $.state = state;

        let content = source[textContent],
            type = typeGet(classNameToRestore, classNameTo + '-');

        if (type) {
            classSet(source, classNameTo);
            classLet(source, type);
            classSet(source, classNameTo + '-' + type);
            (async function() {
                // Load language definition(s) directly or via proxy
                let syntax = await $$[token][type];
                // Process alias(es)
                while (isString(syntax)) {
                    syntax = await $$[token][syntax];
                }
                if (isArray(syntax)) {
                    source[innerHTML] = fromTokens(toTokens(content, syntax));
                } else if (isFunction(syntax)) {
                    source[innerHTML] = syntax.call($, content);
                }
                let others = source.querySelectorAll('ins[class^="~"]'),
                    j = others.length;
                if (j) {
                    for (let i = 0; i < j; ++i) {
                        others[i][className] = others[i][className].slice(1);
                        new $$(others[i]);
                        classLet(others[i], classNameTo);
                    }
                }
            })();
        }

        return $;

    });

})(window, document, 'ASH');
