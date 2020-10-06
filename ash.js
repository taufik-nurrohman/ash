
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

    function toScript(content) {
        var node = toNode('script');
        node[textContent] = content;
        head[appendChild](node);
        return node;
    }

    function typeGet(classes, prefix) {
        var m = classes && classes.match(new RegExp('\\b' + prefix + '([^\\s]+)\\b'));
        if (m) {
            return m[1];
        }
        if (classes) {
            return classes.split(/\s+/)[0] || null;
        }
        return null;
    }

    (function($$) {

        // Pre-defined constant(s)
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
            var j = pattern.length,
                r = new RegExp(pattern.join('|'), 'g');
            content = content.replace(r, function() {
                var lot = Array.from(arguments),
                    index;
                for (var i = 0; i < j; ++i) {
                    if ((new RegExp('^' + pattern[i] + '$')).test(lot[0])) {
                        index = i;
                        break;
                    }
                }
                return fn.call($, lot.slice(0, -2), index);
            });
            return content;
        };

        $.fetch = function(x, onSuccess, onError) {
            var a, min, url;
            if (!src) {
                return $;
            }
            a = src.split('/');
            min = '.min.js' === a.pop().slice(-7);
            win.fetch(a.join('/') + '/ash/' + x + (min ? '.min' : "") + '.js').then(function(response) {
                return response.ok && response.text();
            }).then(function(text) {
                if (isSet(text)) {
                    toScript(text);
                    isFunction(onSuccess) && onSuccess.call($, content);
                } else {
                    isFunction(onError) && onError.call($, content);
                }
            }).catch(function() {
                isFunction(onError) && onError.call($, content);
            });
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

        $.t = function(type, content, n) {
            n = n || 'span';
            return '<' + n + ' class="' + type.replace(/\./g, ' ') + '">' + content + '</' + n + '>';
        };

        var content = source[textContent],
            type = typeGet(source.className, cn + '-');

        if (null !== type) {
            source.classList.add(cn);
            source.classList.remove(type);
            source.classList.add(cn + '-' + type);
            var marker = $$['*.' + type];
            if (isFunction(marker)) {
                source.innerHTML = marker.call($, content);
            } else {
                $.fetch(type, function(content) {
                    source.innerHTML = $$['*.' + type].call($, content);
                }, function() {});
            }
        }

        return $;

    });

})(window, document, 'ASH');
