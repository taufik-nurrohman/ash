
/*!
 * ==============================================================
 *  ASYNCHRONOUS SYNTAX HIGHLIGHTER 0.0.0
 * ==============================================================
 * Author: Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * License: MIT
 * --------------------------------------------------------------
 */

(function(win, doc, name) {

    var appendChild = 'appendChild',
        head = doc.head,
        instances = 'instances',
        script = doc.currentScript,
        src = script.src,
        textContent = 'textContent';

    function classHas(of, name) {
        return of.classList.contains(name);
    }

    function classLet(of, name) {
        of.classList.remove(name);
    }

    function classSet(of, name) {
        of.classList.add(name);
    }

    function eventLet(to, event, fn) {
        to.removeEventListener(event, fn, false);
    }

    function eventSet(to, event, fn) {
        to.addEventListener(event, fn, false);
    }

    function isFunction(x) {
        return 'function' === typeof x;
    }

    function isObject(x) {
        return 'object' === typeof x;
    }

    function isSet(x) {
        return 'undefined' !== typeof x && null !== x;
    }

    function isString(x) {
        return 'string' === typeof x;
    }

    function toNode(a, b, c) {
        a = doc.createElement(a);
        b && b[appendChild](a);
        c && (a.className = c);
        return a;
    }

    function toPattern(a, b) {
        return new RegExp(a, b);
    }

    function toScript(content) {
        var node = toNode('script');
        node[textContent] = content;
        head[appendChild](node);
        return node;
    }

    function toSyntax(syntax, content) {

    }

    function typeGet(classes, prefix) {
        // Prioritize class prefixed by `ash-`
        var m = classes && classes.match(toPattern('\\b' + prefix + '([^\\s]+)\\b'));
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
        $$.NUM = '\\b(?:-?(?:\\d+?\\.)?\\d+(?:[eE]\\+?\\d+)?|0[xX][a-fA-F\\d]+|\\d+n)\\b';
        $$.STR = '"(?:\\\\.|[^"])*"|\'(?:\\\\.|[^\'])*\'|`(?:\\\\.|[^`])*`';

        $$.version = '0.0.0';

        $$.state = {
            'class': 'ash',
            'x': 'txt'
        };

        // Collect all instance(s)
        $$[instances] = {};

        // Storage of language token(s)
        $$.x = new Proxy({}, {
            get: function(storage, key) {
                return storage[key] || !async function() {
                    var a, min, url;
                    if (!src) {
                        return;
                    }
                    a = src.split('/');
                    min = '.min.js' === a.pop().slice(-7);
                    return await win.fetch(a.join('/') + '/ash/' + x + (min ? '.min' : "") + '.js').then(function(response) {
                        return response.ok && response.text();
                    }).then(function(text) {
                        if (isSet(text)) {
                            toScript(text);
                            return storage[key];
                        }
                    });
                }();
            },
            set: function(storage, key, value) {
                storage[key] = value;
            }
        });

        $$._ = $$.prototype;

    })(win[name] = function(source, o) {

        if (!source) return;

        var $ = this,
            $$ = win[name],
            hooks = {},
            state = Object.assign({}, $$.state, isString(o) ? {
                'class': o
            } : (o || {})),
            cn = state['class'];

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

        function hookLet(name, fn) {
            if (!isSet(name)) {
                return (hooks = {}), $;
            }
            if (isSet(hooks[name])) {
                if (isSet(fn)) {
                    for (var i = 0, j = hooks[name].length; i < j; ++i) {
                        if (fn === hooks[name][i]) {
                            hooks[name].splice(i, 1);
                        }
                    }
                    // Clean-up empty hook(s)
                    if (0 === j) {
                        delete hooks[name];
                    }
                } else {
                    delete hooks[name];
                }
            }
            return $;
        }

        function hookSet(name, fn) {
            if (!isSet(hooks[name])) {
                hooks[name] = [];
            }
            if (isSet(fn)) {
                hooks[name].push(fn);
            }
            return $;
        }

        function hookFire(name, lot) {
            if (!isSet(hooks[name])) {
                return $;
            }
            for (var i = 0, j = hooks[name].length; i < j; ++i) {
                hooks[name][i].apply($, lot);
            }
            return $;
        }

        $.chunk = function(pattern, fn, content) {
            if (isString(pattern)) {
                pattern = [pattern]; // Force to be array
            }
            var j = pattern.length,
                r = toPattern(pattern.join('|'), 'g'), id, lot;
            content = content.replace(r, function() {
                lot = arguments;
                for (var i = 0; i < j; ++i) {
                    if (toPattern('^' + pattern[i] + '$').test(lot[0])) {
                        id = i;
                        break;
                    }
                }
                return fn.call($, lot, id);
            });
            return content;
        };

        $.hooks = hooks;
        $.off = hookLet;
        $.on = hookSet;

        $.pop = function() {
            if (!source[name]) {
                return $; // Already ejected
            }
            delete source[name];
            return hookFire('pop', [content]);
        };

        $.source = source;
        $.state = state;

        $.t = function(type, content, esc, n) {
            n = n || 'span';
            if (esc = isSet(esc) ? esc : 1) {
                content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            return type ? '<' + n + ' class="' + type.replace(/\./g, ' ') + '">' + content + '</' + n + '>' : content;
        };

        var content = source[textContent],
            type = typeGet(source.className, cn + '-');

        if (null !== type) {
            classSet(source, cn);
            classLet(source, type);
            classSet(source, cn + '-' + type);
            var syntax = $$.x[type]; // Load langauge data directly or via proxy
            if (isObject(syntax)) {
                source.innerHTML = toSyntax.call($, syntax, content);
            } else if (isFunction(syntax)) {
                source.innerHTML = syntax.call($, content);
            }
        }

        return $;

    });

})(window, document, 'ASH');
