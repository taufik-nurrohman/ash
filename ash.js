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

    function eventLet(to, event, fn) {
        to.removeEventListener(event, fn, false);
    }

    function eventSet(to, event, fn) {
        to.addEventListener(event, fn, false);
    }

    function isArray(x) {
        return Array.isArray(x);
    }

    function isFunction(x) {
        return 'function' === typeof x;
    }

    function isObject(x) {
        return 'object' === typeof x && !isArray(x);
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

    function toSyntax($, syntax, content) {
        // Normalize line-break to `\n` for consistent regex
        content = content.replace(/\r\n|\r/g, '\n');
        let pattern = Object.keys(syntax),
            fn = Object.values(syntax),
            j = pattern.length;
        // TODO: Stream using `exec` for easy control in the future?
        return j ? content.replace(toPattern(pattern.join('|'), 'g'), function() {
            let lot = toArray(arguments).filter(v => isString(v)),
                first = lot[0],
                id, m, task, value = "";
            for (let i = 0; i < j; ++i) {
                if (m = toPattern('^' + pattern[i] + '$').test(first)) {
                    id = i;
                    task = fn[i];
                    break;
                }
            }
            if (m) {
                if (isArray(task)) {
                    for (let i = 0, j = task.length; i < j; ++i) {
                        if (0 === i) {
                            continue; // Ignore first array to be used later
                        }
                        if ("" === lot[i]) {
                            // Do not mark empty string
                            continue;
                        }
                        if (isObject(task[i])) {
                            // Recurse
                            value += toSyntax($, task[i], lot[i]);
                        } else if (isString(task[i])) {
                            value += $.t(task[i], lot[i]);
                        } else {
                            value += $.t(0, lot[i]);
                        }
                    }
                    return $.t(task[0], value || first, value ? 0 : 1);
                }
                if (isFunction(task)) {
                    value = task.call($, lot, id);
                    if (isArray(value)) {
                        let v = "";
                        for (let i = 0, j = value.length; i < j; ++i) {
                            if (0 === i) {
                                continue; // Ignore first array to be used later
                            }
                            if ("" === lot[i]) {
                                // Do not mark empty string
                                continue;
                            }
                            if (isObject(value[i])) {
                                // Recurse
                                v += toSyntax($, value[i], lot[i]);
                            } else if (isString(value[i])) {
                                v += $.t(value[i], lot[i]);
                            } else {
                                v += $.t(0, lot[i]);
                            }
                        }
                        return $.t(value[0], v || first, v ? 0 : 1);
                    }
                    if (isFunction(value) || isObject(value)) {
                        // Recurse
                        return toSyntax($, value, first);
                    }
                }
                if (isObject(task)) {
                    // Recurse
                    return toSyntax($, task, first);
                }
            }
            return first;
        }) : $.t(0, content);
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

        $.t = function(type, content, forceEscape = 1, n) {
            if (!isSet(content)) {
                return;
            }
            if (!isSet(n)) {
                n = '~' === type[0] ? 'ins' : 'span';
            }
            if (forceEscape) {
                content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            return type ? '<' + n + ' class="' + type.replace(/\./g, ' ') + '">' + content + '</' + n + '>' : content;
        };

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
                if (isObject(syntax)) {
                    source[innerHTML] = toSyntax($, syntax, content);
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
