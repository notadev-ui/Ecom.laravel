
!function(e, t) {
    var i = function() {
        t(e.lazySizes),
        e.removeEventListener("lazyunveilread", i, !0)
    };
    t = t.bind(null, e, e.document),
    "object" == typeof module && module.exports ? t(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes")) : e.lazySizes ? i() : e.addEventListener("lazyunveilread", i, !0)
}(window, (function(e, t, i) {
    "use strict";
    var n, o = i && i.cfg || e.lazySizesConfig, r = t.createElement("img"), s = "sizes"in r && "srcset"in r, a = /\s+\d+h/g, l = function() {
        var e = /\s+(\d+)(w|h)\s+(\d+)(w|h)/
          , i = Array.prototype.forEach;
        return function(n) {
            var o = t.createElement("img")
              , r = function(t) {
                var i, n = t.getAttribute(lazySizesConfig.srcsetAttr);
                n && (n.match(e) && ((i = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1) && t.setAttribute("data-aspectratio", i)),
                t.setAttribute(lazySizesConfig.srcsetAttr, n.replace(a, "")))
            }
              , s = function(e) {
                var t = e.target.parentNode;
                t && "PICTURE" == t.nodeName && i.call(t.getElementsByTagName("source"), r),
                r(e.target)
            }
              , l = function() {
                o.currentSrc && t.removeEventListener("lazybeforeunveil", s)
            };
            n[1] && (t.addEventListener("lazybeforeunveil", s),
            o.onload = l,
            o.onerror = l,
            o.srcset = "data:,a 1w 1h",
            o.complete && l())
        }
    }();
    if (o || (o = {},
    e.lazySizesConfig = o),
    o.supportsType || (o.supportsType = function(e) {
        return !e
    }
    ),
    !e.picturefill && !o.pf) {
        if (e.HTMLPictureElement && s)
            return t.msElementsFromPoint && l(navigator.userAgent.match(/Edge\/(\d+)/)),
            void (o.pf = function() {}
            );
        o.pf = function(t) {
            var i, o;
            if (!e.picturefill)
                for (i = 0,
                o = t.elements.length; o > i; i++)
                    n(t.elements[i])
        }
        ,
        n = function() {
            var r = function(e, t) {
                return e.w - t.w
            }
              , l = /^\s*\d+\.*\d*px\s*$/
              , c = function() {
                var e, t = /(([^,\s].[^\s]+)\s+(\d+)w)/g, i = /\s/, n = function(t, i, n, o) {
                    e.push({
                        c: i,
                        u: n,
                        w: 1 * o
                    })
                };
                return function(o) {
                    return e = [],
                    (o = o.trim()).replace(a, "").replace(t, n),
                    e.length || !o || i.test(o) || e.push({
                        c: o,
                        u: o,
                        w: 99
                    }),
                    e
                }
            }()
              , u = function() {
                u.init || (u.init = !0,
                addEventListener("resize", function() {
                    var e, i = t.getElementsByClassName("lazymatchmedia"), o = function() {
                        var e, t;
                        for (e = 0,
                        t = i.length; t > e; e++)
                            n(i[e])
                    };
                    return function() {
                        clearTimeout(e),
                        e = setTimeout(o, 66)
                    }
                }()))
            }
              , d = function(t, n) {
                var r, s = t.getAttribute("srcset") || t.getAttribute(o.srcsetAttr);
                !s && n && (s = t._lazypolyfill ? t._lazypolyfill._set : t.getAttribute(o.srcAttr) || t.getAttribute("src")),
                t._lazypolyfill && t._lazypolyfill._set == s || (r = c(s || ""),
                n && t.parentNode && (r.isPicture = "PICTURE" == t.parentNode.nodeName.toUpperCase(),
                r.isPicture && e.matchMedia && (i.aC(t, "lazymatchmedia"),
                u())),
                r._set = s,
                Object.defineProperty(t, "_lazypolyfill", {
                    value: r,
                    writable: !0
                }))
            }
              , h = function(t) {
                var n = e.devicePixelRatio || 1
                  , o = i.getX && i.getX(t);
                return Math.min(o || n, 2.5, n)
            }
              , f = function(t) {
                return e.matchMedia ? (f = function(e) {
                    return !e || (matchMedia(e) || {}).matches
                }
                )(t) : !t
            }
              , p = function(e) {
                var t, n, s, a, c, u, p;
                if (d(a = e, !0),
                (c = a._lazypolyfill).isPicture)
                    for (n = 0,
                    s = (t = e.parentNode.getElementsByTagName("source")).length; s > n; n++)
                        if (o.supportsType(t[n].getAttribute("type"), e) && f(t[n].getAttribute("media"))) {
                            a = t[n],
                            d(a),
                            c = a._lazypolyfill;
                            break
                        }
                return c.length > 1 ? (p = a.getAttribute("sizes") || "",
                p = l.test(p) && parseInt(p, 10) || i.gW(e, e.parentNode),
                c.d = h(e),
                !c.src || !c.w || c.w < p ? (c.w = p,
                u = function(e) {
                    for (var t, i, n = e.length, o = e[n - 1], r = 0; n > r; r++)
                        if ((o = e[r]).d = o.w / e.w,
                        o.d >= e.d) {
                            !o.cached && (t = e[r - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (i = Math.pow(t.d - .6, 1.6),
                            t.cached && (t.d += .15 * i),
                            t.d + (o.d - e.d) * i > e.d && (o = t));
                            break
                        }
                    return o
                }(c.sort(r)),
                c.src = u) : u = c.src) : u = c[0],
                u
            }
              , m = function(e) {
                if (!s || !e.parentNode || "PICTURE" == e.parentNode.nodeName.toUpperCase()) {
                    var t = p(e);
                    t && t.u && e._lazypolyfill.cur != t.u && (e._lazypolyfill.cur = t.u,
                    t.cached = !0,
                    e.setAttribute(o.srcAttr, t.u),
                    e.setAttribute("src", t.u))
                }
            };
            return m.parse = c,
            m
        }(),
        o.loadedClass && o.loadingClass && function() {
            var e = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach((function(t) {
                e.push(t + o.loadedClass),
                e.push(t + o.loadingClass)
            }
            )),
            o.pf({
                elements: t.querySelectorAll(e.join(", "))
            })
        }()
    }
}
)),
function(e, t) {
    var i = function() {
        t(e.lazySizes),
        e.removeEventListener("lazyunveilread", i, !0)
    };
    t = t.bind(null, e, e.document),
    "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? i() : e.addEventListener("lazyunveilread", i, !0)
}(window, (function(e, t, i) {
    "use strict";
    function n(t, i) {
        var n, o, r, s, a = e.getComputedStyle(t);
        for (n in o = t.parentNode,
        s = {
            isPicture: !(!o || !d.test(o.nodeName || ""))
        },
        r = function(e, i) {
            var n = t.getAttribute("data-" + e);
            if (!n) {
                var o = a.getPropertyValue("--ls-" + e);
                o && (n = o.trim())
            }
            if (n) {
                if ("true" == n)
                    n = !0;
                else if ("false" == n)
                    n = !1;
                else if (u.test(n))
                    n = parseFloat(n);
                else if ("function" == typeof l[e])
                    n = l[e](t, n);
                else if (m.test(n))
                    try {
                        n = JSON.parse(n)
                    } catch (e) {}
                s[e] = n
            } else
                e in l && "function" != typeof l[e] ? s[e] = l[e] : i && "function" == typeof l[e] && (s[e] = l[e](t, n))
        }
        ,
        l)
            r(n);
        return i.replace(p, (function(e, t) {
            t in s || r(t, !0)
        }
        )),
        s
    }
    function o(e, i, n) {
        var o = 0
          , r = 0
          , s = n;
        if (e) {
            if ("container" === i.ratio) {
                for (o = s.scrollWidth,
                r = s.scrollHeight; !(o && r || s === t); )
                    o = (s = s.parentNode).scrollWidth,
                    r = s.scrollHeight;
                o && r && (i.ratio = r / o)
            }
            (e = function(e, t) {
                var i = [];
                return i.srcset = [],
                t.absUrl && (g.setAttribute("href", e),
                e = g.href),
                e = ((t.prefix || "") + e + (t.postfix || "")).replace(p, (function(e, i) {
                    return c[typeof t[i]] ? t[i] : e
                }
                )),
                t.widths.forEach((function(n) {
                    var o = t.widthmap[n] || n
                      , r = {
                        u: e.replace(h, o).replace(f, t.ratio ? Math.round(n * t.ratio) : ""),
                        w: n
                    };
                    i.push(r),
                    i.srcset.push(r.c = r.u + " " + n + "w")
                }
                )),
                i
            }(e, i)).isPicture = i.isPicture,
            b && "IMG" == n.nodeName.toUpperCase() ? n.removeAttribute(a.srcsetAttr) : n.setAttribute(a.srcsetAttr, e.srcset.join(", ")),
            Object.defineProperty(n, "_lazyrias", {
                value: e,
                writable: !0
            })
        }
    }
    function r(e, t) {
        var o = n(e, t);
        return l.modifyOptions.call(e, {
            target: e,
            details: o,
            detail: o
        }),
        i.fire(e, "lazyriasmodifyoptions", o),
        o
    }
    function s(e) {
        return e.getAttribute(e.getAttribute("data-srcattr") || l.srcAttr) || e.getAttribute(a.srcsetAttr) || e.getAttribute(a.srcAttr) || e.getAttribute("data-pfsrcset") || ""
    }
    var a, l, c = {
        string: 1,
        number: 1
    }, u = /^\-*\+*\d+\.*\d*$/, d = /^picture$/i, h = /\s*\{\s*width\s*\}\s*/i, f = /\s*\{\s*height\s*\}\s*/i, p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi, m = /^\[.*\]|\{.*\}$/, v = /^(?:auto|\d+(px)?)$/, g = t.createElement("a"), y = t.createElement("img"), b = "srcset"in y && !("sizes"in y), w = !!e.HTMLPictureElement && !b;
    !function() {
        var t, n = {
            prefix: "",
            postfix: "",
            srcAttr: "data-src",
            absUrl: !1,
            modifyOptions: function() {},
            widthmap: {},
            ratio: !1
        };
        for (t in (a = i && i.cfg || e.lazySizesConfig) || (a = {},
        e.lazySizesConfig = a),
        a.supportsType || (a.supportsType = function(e) {
            return !e
        }
        ),
        a.rias || (a.rias = {}),
        "widths"in (l = a.rias) || (l.widths = [],
        function(e) {
            for (var t, i = 0; !t || 3e3 > t; )
                (i += 5) > 30 && (i += 1),
                t = 36 * i,
                e.push(t)
        }(l.widths)),
        n)
            t in l || (l[t] = n[t])
    }(),
    addEventListener("lazybeforesizes", (function(e) {
        var t, n, c, u, d, f, p, m, g, y, b, C, E;
        if (e.detail.instance == i && (t = e.target,
        e.detail.dataAttr && !e.defaultPrevented && !l.disabled && (g = t.getAttribute(a.sizesAttr) || t.getAttribute("sizes")) && v.test(g))) {
            if (c = r(t, n = s(t)),
            b = h.test(c.prefix) || h.test(c.postfix),
            c.isPicture && (u = t.parentNode))
                for (f = 0,
                p = (d = u.getElementsByTagName("source")).length; p > f; f++)
                    (b || h.test(m = s(d[f]))) && (o(m, c, d[f]),
                    C = !0);
            b || h.test(n) ? (o(n, c, t),
            C = !0) : C && ((E = []).srcset = [],
            E.isPicture = !0,
            Object.defineProperty(t, "_lazyrias", {
                value: E,
                writable: !0
            })),
            C && (w ? t.removeAttribute(a.srcAttr) : "auto" != g && (y = {
                width: parseInt(g, 10)
            },
            x({
                target: t,
                detail: y
            })))
        }
    }
    ), !0);
    var x = function() {
        var n = function(e, t) {
            return e.w - t.w
        }
          , o = function(e, t) {
            var n;
            return !e._lazyrias && i.pWS && (n = i.pWS(e.getAttribute(a.srcsetAttr || ""))).length && (Object.defineProperty(e, "_lazyrias", {
                value: n,
                writable: !0
            }),
            t && e.parentNode && (n.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase())),
            e._lazyrias
        }
          , r = function(t) {
            var n = e.devicePixelRatio || 1
              , o = i.getX && i.getX(t);
            return Math.min(o || n, 2.4, n)
        }
          , s = function(t, i) {
            var s, a, l, c, u, d;
            if ((u = t._lazyrias).isPicture && e.matchMedia)
                for (a = 0,
                l = (s = t.parentNode.getElementsByTagName("source")).length; l > a; a++)
                    if (o(s[a]) && !s[a].getAttribute("type") && (!(c = s[a].getAttribute("media")) || (matchMedia(c) || {}).matches)) {
                        u = s[a]._lazyrias;
                        break
                    }
            return (!u.w || u.w < i) && (u.w = i,
            u.d = r(t),
            d = function(e) {
                for (var t, i, n = e.length, o = e[n - 1], r = 0; n > r; r++)
                    if ((o = e[r]).d = o.w / e.w,
                    o.d >= e.d) {
                        !o.cached && (t = e[r - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (i = Math.pow(t.d - .6, 1.6),
                        t.cached && (t.d += .15 * i),
                        t.d + (o.d - e.d) * i > e.d && (o = t));
                        break
                    }
                return o
            }(u.sort(n))),
            d
        }
          , l = function(n) {
            if (n.detail.instance == i) {
                var r, c = n.target;
                return !b && (e.respimage || e.picturefill || lazySizesConfig.pf) ? void t.removeEventListener("lazybeforesizes", l) : void (("_lazyrias"in c || n.detail.dataAttr && o(c, !0)) && (r = s(c, n.detail.width),
                r && r.u && c._lazyrias.cur != r.u && (c._lazyrias.cur = r.u,
                r.cached = !0,
                i.rAF((function() {
                    c.setAttribute(a.srcAttr, r.u),
                    c.setAttribute("src", r.u)
                }
                )))))
            }
        };
        return w ? l = function() {}
        : addEventListener("lazybeforesizes", l),
        l
    }()
}
)),
function(e, t) {
    var i = function(e, t) {
        "use strict";
        if (t.getElementsByClassName) {
            var i, n, o = t.documentElement, r = e.Date, s = e.HTMLPictureElement, a = "addEventListener", l = "getAttribute", c = e[a], u = e.setTimeout, d = e.requestAnimationFrame || u, h = e.requestIdleCallback, f = /^picture$/i, p = ["load", "error", "lazyincluded", "_lazyloaded"], m = {}, v = Array.prototype.forEach, g = function(e, t) {
                return m[t] || (m[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
                m[t].test(e[l]("class") || "") && m[t]
            }, y = function(e, t) {
                g(e, t) || e.setAttribute("class", (e[l]("class") || "").trim() + " " + t)
            }, b = function(e, t) {
                var i;
                (i = g(e, t)) && e.setAttribute("class", (e[l]("class") || "").replace(i, " "))
            }, w = function(e, t, i) {
                var n = i ? a : "removeEventListener";
                i && w(e, t),
                p.forEach((function(i) {
                    e[n](i, t)
                }
                ))
            }, x = function(e, n, o, r, s) {
                var a = t.createEvent("CustomEvent");
                return o || (o = {}),
                o.instance = i,
                a.initCustomEvent(n, !r, !s, o),
                e.dispatchEvent(a),
                a
            }, C = function(t, i) {
                var o;
                !s && (o = e.picturefill || n.pf) ? o({
                    reevaluate: !0,
                    elements: [t]
                }) : i && i.src && (t.src = i.src)
            }, E = function(e, t) {
                return (getComputedStyle(e, null) || {})[t]
            }, S = function(e, t, i) {
                for (i = i || e.offsetWidth; i < n.minSize && t && !e._lazysizesWidth; )
                    i = t.offsetWidth,
                    t = t.parentNode;
                return i
            }, z = function() {
                var e, i, n = [], o = [], r = n, s = function() {
                    var t = r;
                    for (r = n.length ? o : n,
                    e = !0,
                    i = !1; t.length; )
                        t.shift()();
                    e = !1
                }, a = function(n, o) {
                    e && !o ? n.apply(this, arguments) : (r.push(n),
                    i || (i = !0,
                    (t.hidden ? u : d)(s)))
                };
                return a._lsFlush = s,
                a
            }(), D = function(e, t) {
                return t ? function() {
                    z(e)
                }
                : function() {
                    var t = this
                      , i = arguments;
                    z((function() {
                        e.apply(t, i)
                    }
                    ))
                }
            }, _ = function(e) {
                var t, i = 0, o = n.throttleDelay, s = n.ricTimeout, a = function() {
                    t = !1,
                    i = r.now(),
                    e()
                }, l = h && s > 49 ? function() {
                    h(a, {
                        timeout: s
                    }),
                    s !== n.ricTimeout && (s = n.ricTimeout)
                }
                : D((function() {
                    u(a)
                }
                ), !0);
                return function(e) {
                    var n;
                    (e = !0 === e) && (s = 33),
                    t || (t = !0,
                    (n = o - (r.now() - i)) < 0 && (n = 0),
                    e || n < 9 ? l() : u(l, n))
                }
            }, A = function(e) {
                var t, i, n = function() {
                    t = null,
                    e()
                }, o = function() {
                    var e = r.now() - i;
                    e < 99 ? u(o, 99 - e) : (h || n)(n)
                };
                return function() {
                    i = r.now(),
                    t || (t = u(o, 99))
                }
            };
            !function() {
                var t, i = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                for (t in n = e.lazySizesConfig || e.lazysizesConfig || {},
                i)
                    t in n || (n[t] = i[t]);
                e.lazySizesConfig = n,
                u((function() {
                    n.init && T()
                }
                ))
            }();
            var k = function() {
                var s, d, h, p, m, S, k, T, P, M, L, F, O, N, R = /^img$/i, W = /^iframe$/i, U = "onscroll"in e && !/glebot/.test(navigator.userAgent), j = 0, q = 0, B = -1, H = function(e) {
                    q--,
                    e && e.target && w(e.target, H),
                    (!e || q < 0 || !e.target) && (q = 0)
                }, Z = function(e, i) {
                    var n, r = e, s = "hidden" == E(t.body, "visibility") || "hidden" != E(e, "visibility");
                    for (T -= i,
                    L += i,
                    P -= i,
                    M += i; s && (r = r.offsetParent) && r != t.body && r != o; )
                        (s = (E(r, "opacity") || 1) > 0) && "visible" != E(r, "overflow") && (n = r.getBoundingClientRect(),
                        s = M > n.left && P < n.right && L > n.top - 1 && T < n.bottom + 1);
                    return s
                }, X = function() {
                    var e, r, a, c, u, h, f, m, v, g = i.elements;
                    if ((p = n.loadMode) && q < 8 && (e = g.length)) {
                        r = 0,
                        B++,
                        null == O && ("expand"in n || (n.expand = o.clientHeight > 500 && o.clientWidth > 500 ? 500 : 370),
                        F = n.expand,
                        O = F * n.expFactor),
                        j < O && q < 1 && B > 2 && p > 2 && !t.hidden ? (j = O,
                        B = 0) : j = p > 1 && B > 1 && q < 6 ? F : 0;
                        for (; r < e; r++)
                            if (g[r] && !g[r]._lazyRace)
                                if (U)
                                    if ((m = g[r][l]("data-expand")) && (h = 1 * m) || (h = j),
                                    v !== h && (S = innerWidth + h * N,
                                    k = innerHeight + h,
                                    f = -1 * h,
                                    v = h),
                                    a = g[r].getBoundingClientRect(),
                                    (L = a.bottom) >= f && (T = a.top) <= k && (M = a.right) >= f * N && (P = a.left) <= S && (L || M || P || T) && (n.loadHidden || "hidden" != E(g[r], "visibility")) && (d && q < 3 && !m && (p < 3 || B < 4) || Z(g[r], h))) {
                                        if (Q(g[r]),
                                        u = !0,
                                        q > 9)
                                            break
                                    } else
                                        !u && d && !c && q < 4 && B < 4 && p > 2 && (s[0] || n.preloadAfterLoad) && (s[0] || !m && (L || M || P || T || "auto" != g[r][l](n.sizesAttr))) && (c = s[0] || g[r]);
                                else
                                    Q(g[r]);
                        c && !u && Q(c)
                    }
                }, G = _(X), K = function(e) {
                    y(e.target, n.loadedClass),
                    b(e.target, n.loadingClass),
                    w(e.target, $),
                    x(e.target, "lazyloaded")
                }, Y = D(K), $ = function(e) {
                    Y({
                        target: e.target
                    })
                }, V = function(e) {
                    var t, i = e[l](n.srcsetAttr);
                    (t = n.customMedia[e[l]("data-media") || e[l]("media")]) && e.setAttribute("media", t),
                    i && e.setAttribute("srcset", i)
                }, J = D((function(e, t, i, o, r) {
                    var s, a, c, d, p, m;
                    (p = x(e, "lazybeforeunveil", t)).defaultPrevented || (o && (i ? y(e, n.autosizesClass) : e.setAttribute("sizes", o)),
                    a = e[l](n.srcsetAttr),
                    s = e[l](n.srcAttr),
                    r && (d = (c = e.parentNode) && f.test(c.nodeName || "")),
                    m = t.firesLoad || "src"in e && (a || s || d),
                    p = {
                        target: e
                    },
                    m && (w(e, H, !0),
                    clearTimeout(h),
                    h = u(H, 2500),
                    y(e, n.loadingClass),
                    w(e, $, !0)),
                    d && v.call(c.getElementsByTagName("source"), V),
                    a ? e.setAttribute("srcset", a) : s && !d && (W.test(e.nodeName) ? function(e, t) {
                        try {
                            e.contentWindow.location.replace(t)
                        } catch (i) {
                            e.src = t
                        }
                    }(e, s) : e.src = s),
                    r && (a || d) && C(e, {
                        src: s
                    })),
                    e._lazyRace && delete e._lazyRace,
                    b(e, n.lazyClass),
                    z((function() {
                        (!m || e.complete && e.naturalWidth > 1) && (m ? H(p) : q--,
                        K(p))
                    }
                    ), !0)
                }
                )), Q = function(e) {
                    var t, i = R.test(e.nodeName), o = i && (e[l](n.sizesAttr) || e[l]("sizes")), r = "auto" == o;
                    (!r && d || !i || !e[l]("src") && !e.srcset || e.complete || g(e, n.errorClass) || !g(e, n.lazyClass)) && (t = x(e, "lazyunveilread").detail,
                    r && I.updateElem(e, !0, e.offsetWidth),
                    e._lazyRace = !0,
                    q++,
                    J(e, t, r, o, i))
                }, ee = function() {
                    if (!d) {
                        if (r.now() - m < 999)
                            return void u(ee, 999);
                        var e = A((function() {
                            n.loadMode = 3,
                            G()
                        }
                        ));
                        d = !0,
                        n.loadMode = 3,
                        G(),
                        c("scroll", (function() {
                            3 == n.loadMode && (n.loadMode = 2),
                            e()
                        }
                        ), !0)
                    }
                };
                return {
                    _: function() {
                        m = r.now(),
                        i.elements = t.getElementsByClassName(n.lazyClass),
                        s = t.getElementsByClassName(n.lazyClass + " " + n.preloadClass),
                        N = n.hFac,
                        c("scroll", G, !0),
                        c("resize", G, !0),
                        e.MutationObserver ? new MutationObserver(G).observe(o, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (o[a]("DOMNodeInserted", G, !0),
                        o[a]("DOMAttrModified", G, !0),
                        setInterval(G, 999)),
                        c("hashchange", G, !0),
                        ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach((function(e) {
                            t[a](e, G, !0)
                        }
                        )),
                        /d$|^c/.test(t.readyState) ? ee() : (c("load", ee),
                        t[a]("DOMContentLoaded", G),
                        u(ee, 2e4)),
                        i.elements.length ? (X(),
                        z._lsFlush()) : G()
                    },
                    checkElems: G,
                    unveil: Q
                }
            }()
              , I = function() {
                var e, i = D((function(e, t, i, n) {
                    var o, r, s;
                    if (e._lazysizesWidth = n,
                    n += "px",
                    e.setAttribute("sizes", n),
                    f.test(t.nodeName || ""))
                        for (r = 0,
                        s = (o = t.getElementsByTagName("source")).length; r < s; r++)
                            o[r].setAttribute("sizes", n);
                    i.detail.dataAttr || C(e, i.detail)
                }
                )), o = function(e, t, n) {
                    var o, r = e.parentNode;
                    r && (n = S(e, r, n),
                    (o = x(e, "lazybeforesizes", {
                        width: n,
                        dataAttr: !!t
                    })).defaultPrevented || (n = o.detail.width) && n !== e._lazysizesWidth && i(e, r, o, n))
                }, r = A((function() {
                    var t, i = e.length;
                    if (i)
                        for (t = 0; t < i; t++)
                            o(e[t])
                }
                ));
                return {
                    _: function() {
                        e = t.getElementsByClassName(n.autosizesClass),
                        c("resize", r)
                    },
                    checkElems: r,
                    updateElem: o
                }
            }()
              , T = function() {
                T.i || (T.i = !0,
                I._(),
                k._())
            };
            return i = {
                cfg: n,
                autoSizer: I,
                loader: k,
                init: T,
                uP: C,
                aC: y,
                rC: b,
                hC: g,
                fire: x,
                gW: S,
                rAF: z
            }
        }
    }(e, e.document);
    e.lazySizes = i,
    "object" == typeof module && module.exports && (module.exports = i)
}(window),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, (function() {
    return function(e) {
        function t(n) {
            if (i[n])
                return i[n].exports;
            var o = i[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(o.exports, o, o.exports, t),
            o.loaded = !0,
            o.exports
        }
        var i = {};
        return t.m = e,
        t.c = i,
        t.p = "dist/",
        t(0)
    }([function(e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }
          , r = (n(i(1)),
        i(6))
          , s = n(r)
          , a = n(i(7))
          , l = n(i(8))
          , c = n(i(9))
          , u = n(i(10))
          , d = n(i(11))
          , h = n(i(14))
          , f = []
          , p = !1
          , m = document.all && !window.atob
          , v = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: "DOMContentLoaded",
            disableMutationObserver: !1
        }
          , g = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (e && (p = !0),
            p)
                return f = (0,
                d.default)(f, v),
                (0,
                u.default)(f, v.once),
                f
        }
          , y = function() {
            f = (0,
            h.default)(),
            g()
        };
        e.exports = {
            init: function(e) {
                return v = o(v, e),
                f = (0,
                h.default)(),
                function(e) {
                    return !0 === e || "mobile" === e && c.default.mobile() || "phone" === e && c.default.phone() || "tablet" === e && c.default.tablet() || "function" == typeof e && !0 === e()
                }(v.disable) || m ? void f.forEach((function(e, t) {
                    e.node.removeAttribute("data-aos"),
                    e.node.removeAttribute("data-aos-easing"),
                    e.node.removeAttribute("data-aos-duration"),
                    e.node.removeAttribute("data-aos-delay")
                }
                )) : (document.querySelector("body").setAttribute("data-aos-easing", v.easing),
                document.querySelector("body").setAttribute("data-aos-duration", v.duration),
                document.querySelector("body").setAttribute("data-aos-delay", v.delay),
                "DOMContentLoaded" === v.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? g(!0) : "load" === v.startEvent ? window.addEventListener(v.startEvent, (function() {
                    g(!0)
                }
                )) : document.addEventListener(v.startEvent, (function() {
                    g(!0)
                }
                )),
                window.addEventListener("resize", (0,
                a.default)(g, 50, !0)),
                window.addEventListener("orientationchange", (0,
                a.default)(g, 50, !0)),
                window.addEventListener("scroll", (0,
                s.default)((function() {
                    (0,
                    u.default)(f, v.once)
                }
                ), 99)),
                v.disableMutationObserver || (0,
                l.default)("[data-aos]", y),
                f)
            },
            refresh: g,
            refreshHard: y
        }
    }
    , function(e, t) {}
    , , , , , function(e, t) {
        (function(t) {
            "use strict";
            function i(e, t, i) {
                function o(t) {
                    var i = h
                      , n = f;
                    return h = f = void 0,
                    y = t,
                    m = e.apply(n, i)
                }
                function s(e) {
                    return y = e,
                    v = setTimeout(c, t),
                    C ? o(e) : m
                }
                function l(e) {
                    var i = e - g;
                    return void 0 === g || i >= t || i < 0 || E && e - y >= p
                }
                function c() {
                    var e = x();
                    return l(e) ? u(e) : void (v = setTimeout(c, function(e) {
                        var i = t - (e - g);
                        return E ? w(i, p - (e - y)) : i
                    }(e)))
                }
                function u(e) {
                    return v = void 0,
                    S && h ? o(e) : (h = f = void 0,
                    m)
                }
                function d() {
                    var e = x()
                      , i = l(e);
                    if (h = arguments,
                    f = this,
                    g = e,
                    i) {
                        if (void 0 === v)
                            return s(g);
                        if (E)
                            return v = setTimeout(c, t),
                            o(g)
                    }
                    return void 0 === v && (v = setTimeout(c, t)),
                    m
                }
                var h, f, p, m, v, g, y = 0, C = !1, E = !1, S = !0;
                if ("function" != typeof e)
                    throw new TypeError(a);
                return t = r(t) || 0,
                n(i) && (C = !!i.leading,
                p = (E = "maxWait"in i) ? b(r(i.maxWait) || 0, t) : p,
                S = "trailing"in i ? !!i.trailing : S),
                d.cancel = function() {
                    void 0 !== v && clearTimeout(v),
                    y = 0,
                    h = g = f = v = void 0
                }
                ,
                d.flush = function() {
                    return void 0 === v ? m : u(x())
                }
                ,
                d
            }
            function n(e) {
                var t = void 0 === e ? "undefined" : s(e);
                return !!e && ("object" == t || "function" == t)
            }
            function o(e) {
                return "symbol" == (void 0 === e ? "undefined" : s(e)) || function(e) {
                    return !!e && "object" == (void 0 === e ? "undefined" : s(e))
                }(e) && y.call(e) == c
            }
            function r(e) {
                if ("number" == typeof e)
                    return e;
                if (o(e))
                    return l;
                if (n(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = n(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(u, "");
                var i = h.test(e);
                return i || f.test(e) ? p(e.slice(2), i ? 2 : 8) : d.test(e) ? l : +e
            }
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , a = "Expected a function"
              , l = NaN
              , c = "[object Symbol]"
              , u = /^\s+|\s+$/g
              , d = /^[-+]0x[0-9a-f]+$/i
              , h = /^0b[01]+$/i
              , f = /^0o[0-7]+$/i
              , p = parseInt
              , m = "object" == (void 0 === t ? "undefined" : s(t)) && t && t.Object === Object && t
              , v = "object" == ("undefined" == typeof self ? "undefined" : s(self)) && self && self.Object === Object && self
              , g = m || v || Function("return this")()
              , y = Object.prototype.toString
              , b = Math.max
              , w = Math.min
              , x = function() {
                return g.Date.now()
            };
            e.exports = function(e, t, o) {
                var r = !0
                  , s = !0;
                if ("function" != typeof e)
                    throw new TypeError(a);
                return n(o) && (r = "leading"in o ? !!o.leading : r,
                s = "trailing"in o ? !!o.trailing : s),
                i(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: s
                })
            }
        }
        ).call(t, function() {
            return this
        }())
    }
    , function(e, t) {
        (function(t) {
            "use strict";
            function i(e) {
                var t = void 0 === e ? "undefined" : r(e);
                return !!e && ("object" == t || "function" == t)
            }
            function n(e) {
                return "symbol" == (void 0 === e ? "undefined" : r(e)) || function(e) {
                    return !!e && "object" == (void 0 === e ? "undefined" : r(e))
                }(e) && g.call(e) == l
            }
            function o(e) {
                if ("number" == typeof e)
                    return e;
                if (n(e))
                    return a;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(c, "");
                var o = d.test(e);
                return o || h.test(e) ? f(e.slice(2), o ? 2 : 8) : u.test(e) ? a : +e
            }
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , s = "Expected a function"
              , a = NaN
              , l = "[object Symbol]"
              , c = /^\s+|\s+$/g
              , u = /^[-+]0x[0-9a-f]+$/i
              , d = /^0b[01]+$/i
              , h = /^0o[0-7]+$/i
              , f = parseInt
              , p = "object" == (void 0 === t ? "undefined" : r(t)) && t && t.Object === Object && t
              , m = "object" == ("undefined" == typeof self ? "undefined" : r(self)) && self && self.Object === Object && self
              , v = p || m || Function("return this")()
              , g = Object.prototype.toString
              , y = Math.max
              , b = Math.min
              , w = function() {
                return v.Date.now()
            };
            e.exports = function(e, t, n) {
                function r(t) {
                    var i = h
                      , n = f;
                    return h = f = void 0,
                    x = t,
                    m = e.apply(n, i)
                }
                function a(e) {
                    return x = e,
                    v = setTimeout(c, t),
                    C ? r(e) : m
                }
                function l(e) {
                    var i = e - g;
                    return void 0 === g || i >= t || i < 0 || E && e - x >= p
                }
                function c() {
                    var e = w();
                    return l(e) ? u(e) : void (v = setTimeout(c, function(e) {
                        var i = t - (e - g);
                        return E ? b(i, p - (e - x)) : i
                    }(e)))
                }
                function u(e) {
                    return v = void 0,
                    S && h ? r(e) : (h = f = void 0,
                    m)
                }
                function d() {
                    var e = w()
                      , i = l(e);
                    if (h = arguments,
                    f = this,
                    g = e,
                    i) {
                        if (void 0 === v)
                            return a(g);
                        if (E)
                            return v = setTimeout(c, t),
                            r(g)
                    }
                    return void 0 === v && (v = setTimeout(c, t)),
                    m
                }
                var h, f, p, m, v, g, x = 0, C = !1, E = !1, S = !0;
                if ("function" != typeof e)
                    throw new TypeError(s);
                return t = o(t) || 0,
                i(n) && (C = !!n.leading,
                p = (E = "maxWait"in n) ? y(o(n.maxWait) || 0, t) : p,
                S = "trailing"in n ? !!n.trailing : S),
                d.cancel = function() {
                    void 0 !== v && clearTimeout(v),
                    x = 0,
                    h = g = f = v = void 0
                }
                ,
                d.flush = function() {
                    return void 0 === v ? m : u(w())
                }
                ,
                d
            }
        }
        ).call(t, function() {
            return this
        }())
    }
    , function(e, t) {
        "use strict";
        function i(e) {
            e && e.forEach((function(e) {
                var t = Array.prototype.slice.call(e.addedNodes)
                  , i = Array.prototype.slice.call(e.removedNodes);
                t.concat(i).filter((function(e) {
                    return e.hasAttribute && e.hasAttribute("data-aos")
                }
                )).length && r()
            }
            ))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = window.document
          , o = window.MutationObserver || window.WebKitMutationObserver
          , r = function() {};
        t.default = function(e, t) {
            var s = new o(i);
            r = t,
            s.observe(n.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })
        }
    }
    , function(e, t) {
        "use strict";
        function i() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }()
          , o = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
          , r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
          , s = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
          , a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
          , l = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return n(e, [{
                key: "phone",
                value: function() {
                    var e = i();
                    return !(!o.test(e) && !r.test(e.substr(0, 4)))
                }
            }, {
                key: "mobile",
                value: function() {
                    var e = i();
                    return !(!s.test(e) && !a.test(e.substr(0, 4)))
                }
            }, {
                key: "tablet",
                value: function() {
                    return this.mobile() && !this.phone()
                }
            }]),
            e
        }();
        t.default = new l
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e, t) {
            var i = window.pageYOffset
              , n = window.innerHeight;
            e.forEach((function(e, o) {
                !function(e, t, i) {
                    var n = e.node.getAttribute("data-aos-once");
                    t > e.position ? e.node.classList.add("aos-animate") : void 0 !== n && ("false" === n || !i && "true" !== n) && e.node.classList.remove("aos-animate")
                }(e, n + i, t)
            }
            ))
        }
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i(12));
        t.default = function(e, t) {
            return e.forEach((function(e, i) {
                e.node.classList.add("aos-init"),
                e.position = (0,
                n.default)(e.node, t.offset)
            }
            )),
            e
        }
    }
    , function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i(13));
        t.default = function(e, t) {
            var i = 0
              , o = 0
              , r = window.innerHeight
              , s = {
                offset: e.getAttribute("data-aos-offset"),
                anchor: e.getAttribute("data-aos-anchor"),
                anchorPlacement: e.getAttribute("data-aos-anchor-placement")
            };
            switch (s.offset && !isNaN(s.offset) && (o = parseInt(s.offset)),
            s.anchor && document.querySelectorAll(s.anchor) && (e = document.querySelectorAll(s.anchor)[0]),
            i = (0,
            n.default)(e).top,
            s.anchorPlacement) {
            case "top-bottom":
                break;
            case "center-bottom":
                i += e.offsetHeight / 2;
                break;
            case "bottom-bottom":
                i += e.offsetHeight;
                break;
            case "top-center":
                i += r / 2;
                break;
            case "bottom-center":
                i += r / 2 + e.offsetHeight;
                break;
            case "center-center":
                i += r / 2 + e.offsetHeight / 2;
                break;
            case "top-top":
                i += r;
                break;
            case "bottom-top":
                i += e.offsetHeight + r;
                break;
            case "center-top":
                i += e.offsetHeight / 2 + r
            }
            return s.anchorPlacement || s.offset || isNaN(t) || (o = t),
            i + o
        }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            for (var t = 0, i = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
                t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0),
                i += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0),
                e = e.offsetParent;
            return {
                top: i,
                left: t
            }
        }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, (function(e, i) {
                t.push({
                    node: e
                })
            }
            )),
            t
        }
    }
    ])
}
)),
function(e) {
    var t = !1;
    if ("function" == typeof define && define.amd && (define(e),
    t = !0),
    "object" == typeof exports && (module.exports = e(),
    t = !0),
    !t) {
        var i = window.Cookies
          , n = window.Cookies = e();
        n.noConflict = function() {
            return window.Cookies = i,
            n
        }
    }
}((function() {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var n in i)
                t[n] = i[n]
        }
        return t
    }
    return function t(i) {
        function n(t, o, r) {
            var s;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof (r = e({
                        path: "/"
                    }, n.defaults, r)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires),
                        r.expires = a
                    }
                    r.expires = r.expires ? r.expires.toUTCString() : "";
                    try {
                        s = JSON.stringify(o),
                        /^[\{\[]/.test(s) && (o = s)
                    } catch (e) {}
                    o = i.write ? i.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var c in r)
                        r[c] && (l += "; " + c,
                        !0 !== r[c] && (l += "=" + r[c]));
                    return document.cookie = t + "=" + o + l
                }
                t || (s = {});
                for (var u = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, h = 0; h < u.length; h++) {
                    var f = u[h].split("=")
                      , p = f.slice(1).join("=");
                    this.json || '"' !== p.charAt(0) || (p = p.slice(1, -1));
                    try {
                        var m = f[0].replace(d, decodeURIComponent);
                        if (p = i.read ? i.read(p, m) : i(p, m) || p.replace(d, decodeURIComponent),
                        this.json)
                            try {
                                p = JSON.parse(p)
                            } catch (e) {}
                        if (t === m) {
                            s = p;
                            break
                        }
                        t || (s[m] = p)
                    } catch (e) {}
                }
                return s
            }
        }
        return n.set = n,
        n.get = function(e) {
            return n.call(n, e)
        }
        ,
        n.getJSON = function() {
            return n.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        n.defaults = {},
        n.remove = function(t, i) {
            n(t, "", e(i, {
                expires: -1
            }))
        }
        ,
        n.withConverter = t,
        n
    }((function() {}
    ))
}
)),
/*!
 * Flickity PACKAGED v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, (function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {}
              , n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t),
            this
        }
    }
    ,
    t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0,
            this
        }
    }
    ,
    t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0),
            t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(e, r),
                delete n[r]),
                r.apply(this, t)
            }
            return this
        }
    }
    ,
    t.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    e
}
)),
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, (function() {
    "use strict";
    function e(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t
    }
    var t = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
      , i = t.length;
    function n(e) {
        return getComputedStyle(e)
    }
    var o, r = !1;
    function s(a) {
        if (function() {
            if (!r) {
                r = !0;
                var t = document.createElement("div");
                t.style.width = "200px",
                t.style.padding = "1px 2px 3px 4px",
                t.style.borderStyle = "solid",
                t.style.borderWidth = "1px 2px 3px 4px",
                t.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(t);
                var a = n(t);
                o = 200 == Math.round(e(a.width)),
                s.isBoxSizeOuter = o,
                i.removeChild(t)
            }
        }(),
        "string" == typeof a && (a = document.querySelector(a)),
        a && "object" == typeof a && a.nodeType) {
            var l = n(a);
            if ("none" == l.display)
                return function() {
                    for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, n = 0; n < i; n++) {
                        e[t[n]] = 0
                    }
                    return e
                }();
            var c = {};
            c.width = a.offsetWidth,
            c.height = a.offsetHeight;
            for (var u = c.isBorderBox = "border-box" == l.boxSizing, d = 0; d < i; d++) {
                var h = t[d]
                  , f = l[h]
                  , p = parseFloat(f);
                c[h] = isNaN(p) ? 0 : p
            }
            var m = c.paddingLeft + c.paddingRight
              , v = c.paddingTop + c.paddingBottom
              , g = c.marginLeft + c.marginRight
              , y = c.marginTop + c.marginBottom
              , b = c.borderLeftWidth + c.borderRightWidth
              , w = c.borderTopWidth + c.borderBottomWidth
              , x = u && o
              , C = e(l.width);
            !1 !== C && (c.width = C + (x ? 0 : m + b));
            var E = e(l.height);
            return !1 !== E && (c.height = E + (x ? 0 : v + w)),
            c.innerWidth = c.width - (m + b),
            c.innerHeight = c.height - (v + w),
            c.outerWidth = c.width + g,
            c.outerHeight = c.height + y,
            c
        }
    }
    return s
}
)),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, (function() {
    "use strict";
    var e = function() {
        var e = window.Element.prototype;
        if (e.matches)
            return "matches";
        if (e.matchesSelector)
            return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var n = t[i] + "MatchesSelector";
            if (e[n])
                return n
        }
    }();
    return function(t, i) {
        return t[e](i)
    }
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, (function(e, t) {
    var i = {
        extend: function(e, t) {
            for (var i in t)
                e[i] = t[i];
            return e
        },
        modulo: function(e, t) {
            return (e % t + t) % t
        }
    }
      , n = Array.prototype.slice;
    return i.makeArray = function(e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? n.call(e) : [e]
    }
    ,
    i.removeFrom = function(e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1)
    }
    ,
    i.getParent = function(e, i) {
        for (; e.parentNode && e != document.body; )
            if (e = e.parentNode,
            t(e, i))
                return e
    }
    ,
    i.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }
    ,
    i.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }
    ,
    i.filterFindElements = function(e, n) {
        e = i.makeArray(e);
        var o = [];
        return e.forEach((function(e) {
            if (e instanceof HTMLElement)
                if (n) {
                    t(e, n) && o.push(e);
                    for (var i = e.querySelectorAll(n), r = 0; r < i.length; r++)
                        o.push(i[r])
                } else
                    o.push(e)
        }
        )),
        o
    }
    ,
    i.debounceMethod = function(e, t, i) {
        i = i || 100;
        var n = e.prototype[t]
          , o = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[o];
            clearTimeout(e);
            var t = arguments
              , r = this;
            this[o] = setTimeout((function() {
                n.apply(r, t),
                delete r[o]
            }
            ), i)
        }
    }
    ,
    i.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }
    ,
    i.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, (function(e, t, i) {
            return t + "-" + i
        }
        )).toLowerCase()
    }
    ,
    i.htmlInit = function(e, t) {
        i.docReady((function() {
            var n = i.toDashed(t)
              , o = "data-" + n
              , r = document.querySelectorAll("[" + o + "]")
              , s = document.querySelectorAll(".js-" + n)
              , a = i.makeArray(r).concat(i.makeArray(s))
              , l = o + "-options";
            a.forEach((function(t) {
                var i, n = t.getAttribute(o) || t.getAttribute(l);
                try {
                    i = n && JSON.parse(n)
                } catch (e) {
                    return
                }
                new e(t,i)
            }
            ))
        }
        ))
    }
    ,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("get-size")) : (e.Flickity = e.Flickity || {},
    e.Flickity.Cell = t(e, e.getSize))
}(window, (function(e, t) {
    function i(e, t) {
        this.element = e,
        this.parent = t,
        this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute",
        this.element.setAttribute("aria-hidden", "true"),
        this.x = 0,
        this.shift = 0
    }
    ,
    n.destroy = function() {
        this.unselect(),
        this.element.style.position = "";
        var e = this.parent.originSide;
        this.element.style[e] = "",
        this.element.removeAttribute("aria-hidden")
    }
    ,
    n.getSize = function() {
        this.size = t(this.element)
    }
    ,
    n.setPosition = function(e) {
        this.x = e,
        this.updateTarget(),
        this.renderPosition(e)
    }
    ,
    n.updateTarget = n.setDefaultTarget = function() {
        var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign
    }
    ,
    n.renderPosition = function(e) {
        var t = this.parent.originSide;
        this.element.style[t] = this.parent.getPositionValue(e)
    }
    ,
    n.select = function() {
        this.element.classList.add("is-selected"),
        this.element.removeAttribute("aria-hidden")
    }
    ,
    n.unselect = function() {
        this.element.classList.remove("is-selected"),
        this.element.setAttribute("aria-hidden", "true")
    }
    ,
    n.wrapShift = function(e) {
        this.shift = e,
        this.renderPosition(this.x + this.parent.slideableWidth * e)
    }
    ,
    n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", t) : "object" == typeof module && module.exports ? module.exports = t() : (e.Flickity = e.Flickity || {},
    e.Flickity.Slide = t())
}(window, (function() {
    "use strict";
    function e(e) {
        this.parent = e,
        this.isOriginLeft = "left" == e.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var t = e.prototype;
    return t.addCell = function(e) {
        if (this.cells.push(e),
        this.outerWidth += e.size.outerWidth,
        this.height = Math.max(e.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = e.x;
            var t = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = e.size[t]
        }
    }
    ,
    t.updateTarget = function() {
        var e = this.isOriginLeft ? "marginRight" : "marginLeft"
          , t = this.getLastCell()
          , i = t ? t.size[e] : 0
          , n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }
    ,
    t.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    t.select = function() {
        this.cells.forEach((function(e) {
            e.select()
        }
        ))
    }
    ,
    t.unselect = function() {
        this.cells.forEach((function(e) {
            e.unselect()
        }
        ))
    }
    ,
    t.getCellElements = function() {
        return this.cells.map((function(e) {
            return e.element
        }
        ))
    }
    ,
    e
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {},
    e.Flickity.animatePrototype = t(e, e.fizzyUIUtils))
}(window, (function(e, t) {
    var i = {
        startAnimation: function() {
            this.isAnimating || (this.isAnimating = !0,
            this.restingFrames = 0,
            this.animate())
        },
        animate: function() {
            this.applyDragForce(),
            this.applySelectedAttraction();
            var e = this.x;
            if (this.integratePhysics(),
            this.positionSlider(),
            this.settle(e),
            this.isAnimating) {
                var t = this;
                requestAnimationFrame((function() {
                    t.animate()
                }
                ))
            }
        },
        positionSlider: function() {
            var e = this.x;
            this.options.wrapAround && this.cells.length > 1 && (e = t.modulo(e, this.slideableWidth),
            e -= this.slideableWidth,
            this.shiftWrapCells(e)),
            this.setTranslateX(e, this.isAnimating),
            this.dispatchScrollEvent()
        },
        setTranslateX: function(e, t) {
            e += this.cursorPosition,
            e = this.options.rightToLeft ? -e : e;
            var i = this.getPositionValue(e);
            this.slider.style.transform = t ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
        },
        dispatchScrollEvent: function() {
            var e = this.slides[0];
            if (e) {
                var t = -this.x - e.target
                  , i = t / this.slidesWidth;
                this.dispatchEvent("scroll", null, [i, t])
            }
        },
        positionSliderAtSelected: function() {
            this.cells.length && (this.x = -this.selectedSlide.target,
            this.velocity = 0,
            this.positionSlider())
        },
        getPositionValue: function(e) {
            return this.options.percentPosition ? .01 * Math.round(e / this.size.innerWidth * 1e4) + "%" : Math.round(e) + "px"
        },
        settle: function(e) {
            !this.isPointerDown && Math.round(100 * this.x) == Math.round(100 * e) && this.restingFrames++,
            this.restingFrames > 2 && (this.isAnimating = !1,
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]))
        },
        shiftWrapCells: function(e) {
            var t = this.cursorPosition + e;
            this._shiftCells(this.beforeShiftCells, t, -1);
            var i = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        },
        _shiftCells: function(e, t, i) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n]
                  , r = t > 0 ? i : 0;
                o.wrapShift(r),
                t -= o.size.outerWidth
            }
        },
        _unshiftCells: function(e) {
            if (e && e.length)
                for (var t = 0; t < e.length; t++)
                    e[t].wrapShift(0)
        },
        integratePhysics: function() {
            this.x += this.velocity,
            this.velocity *= this.getFrictionFactor()
        },
        applyForce: function(e) {
            this.velocity += e
        },
        getFrictionFactor: function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        },
        getRestingPosition: function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        },
        applyDragForce: function() {
            if (this.isDraggable && this.isPointerDown) {
                var e = this.dragX - this.x - this.velocity;
                this.applyForce(e)
            }
        },
        applySelectedAttraction: function() {
            if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                var e = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                this.applyForce(e)
            }
        }
    };
    return i
}
)),
function(e, t) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], (function(i, n, o, r, s, a) {
            return t(e, i, n, o, r, s, a)
        }
        ));
    else if ("object" == typeof module && module.exports)
        module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = e.Flickity;
        e.Flickity = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, (function(e, t, i, n, o, r, s) {
    e.getComputedStyle;
    function a(e, t) {
        for (e = n.makeArray(e); e.length; )
            t.appendChild(e.shift())
    }
    var l = 0
      , c = {};
    function u(e, t) {
        var i = n.getQueryElement(e);
        if (i) {
            if (this.element = i,
            this.element.flickityGUID) {
                var o = c[this.element.flickityGUID];
                return o && o.option(t),
                o
            }
            this.options = n.extend({}, this.constructor.defaults),
            this.option(t),
            this._create()
        }
    }
    u.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        initialIndex: 0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0,
        wrapAround: !1
    },
    u.createMethods = [];
    var d = u.prototype;
    n.extend(d, t.prototype),
    d._create = function() {
        var e = this.guid = ++l;
        for (var t in this.element.flickityGUID = e,
        c[e] = this,
        this.selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        this.options.on) {
            var i = this.options.on[t];
            this.on(t, i)
        }
        u.createMethods.forEach((function(e) {
            this[e]()
        }
        ), this),
        this.activate()
    }
    ,
    d.option = function(e) {
        n.extend(this.options, e)
    }
    ,
    d.activate = function() {
        this.isActive || (this.isActive = !0,
        this.element.classList.add("flickity-enabled"),
        this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
        this.getSize(),
        a(this._filterFindCellElements(this.element.children), this.slider),
        this.viewport.appendChild(this.slider),
        this.element.appendChild(this.viewport),
        this.reloadCells(),
        this.options.accessibility && (this.element.tabIndex = 0,
        this.element.addEventListener("keydown", this)),
        this.emitEvent("activate"),
        this.selectInitialIndex(),
        this.isInitActivated = !0,
        this.dispatchEvent("ready", null, [this.element]))
    }
    ,
    d._createSlider = function() {
        var e = document.createElement("div");
        e.className = "flickity-slider",
        e.style[this.originSide] = 0,
        this.slider = e
    }
    ,
    d._filterFindCellElements = function(e) {
        return n.filterFindElements(e, this.options.cellSelector)
    }
    ,
    d.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    d._makeCells = function(e) {
        return this._filterFindCellElements(e).map((function(e) {
            return new o(e,this)
        }
        ), this)
    }
    ,
    d.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    d.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    d.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    d._positionCells = function(e) {
        e = e || 0,
        this.maxCellHeight = e && this.maxCellHeight || 0;
        var t = 0;
        if (e > 0) {
            var i = this.cells[e - 1];
            t = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, o = e; o < n; o++) {
            var r = this.cells[o];
            r.setPosition(t),
            t += r.size.outerWidth,
            this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = t,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    d._sizeCells = function(e) {
        e.forEach((function(e) {
            e.getSize()
        }
        ))
    }
    ,
    d.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var e = new r(this);
            this.slides.push(e);
            var t = "left" == this.originSide ? "marginRight" : "marginLeft"
              , i = this._getCanCellFit();
            this.cells.forEach((function(n, o) {
                if (e.cells.length) {
                    var s = e.outerWidth - e.firstMargin + (n.size.outerWidth - n.size[t]);
                    i.call(this, o, s) || (e.updateTarget(),
                    e = new r(this),
                    this.slides.push(e)),
                    e.addCell(n)
                } else
                    e.addCell(n)
            }
            ), this),
            e.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    d._getCanCellFit = function() {
        var e = this.options.groupCells;
        if (!e)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof e) {
            var t = parseInt(e, 10);
            return function(e) {
                return e % t != 0
            }
        }
        var i = "string" == typeof e && e.match(/^(\d+)%$/)
          , n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(e, t) {
            return t <= (this.size.innerWidth + 1) * n
        }
    }
    ,
    d.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    d.getSize = function() {
        this.size = i(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var h = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return d.setCellAlign = function() {
        var e = h[this.options.cellAlign];
        this.cellAlign = e ? e[this.originSide] : this.options.cellAlign
    }
    ,
    d.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = e + "px"
        }
    }
    ,
    d._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var e = this.cursorPosition
              , t = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(e, t, -1),
            e = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(e, 0, 1)
        }
    }
    ,
    d._getGapCells = function(e, t, i) {
        for (var n = []; e > 0; ) {
            var o = this.cells[t];
            if (!o)
                break;
            n.push(o),
            t += i,
            e -= o.size.outerWidth
        }
        return n
    }
    ,
    d._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var e = this.options.rightToLeft
              , t = e ? "marginRight" : "marginLeft"
              , i = e ? "marginLeft" : "marginRight"
              , n = this.slideableWidth - this.getLastCell().size[i]
              , o = n < this.size.innerWidth
              , r = this.cursorPosition + this.cells[0].size[t]
              , s = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach((function(e) {
                o ? e.target = n * this.cellAlign : (e.target = Math.max(e.target, r),
                e.target = Math.min(e.target, s))
            }
            ), this)
        }
    }
    ,
    d.dispatchEvent = function(e, t, i) {
        var n = t ? [t].concat(i) : i;
        this.emitEvent(e, n)
    }
    ,
    d.select = function(e, t, i) {
        if (this.isActive && (e = parseInt(e, 10),
        this._wrapSelect(e),
        (this.options.wrapAround || t) && (e = n.modulo(e, this.slides.length)),
        this.slides[e])) {
            var o = this.selectedIndex;
            this.selectedIndex = e,
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [e]),
            e != o && this.dispatchEvent("change", null, [e]),
            this.dispatchEvent("cellSelect")
        }
    }
    ,
    d._wrapSelect = function(e) {
        var t = this.slides.length;
        if (!(this.options.wrapAround && t > 1))
            return e;
        var i = n.modulo(e, t)
          , o = Math.abs(i - this.selectedIndex)
          , r = Math.abs(i + t - this.selectedIndex)
          , s = Math.abs(i - t - this.selectedIndex);
        !this.isDragSelect && r < o ? e += t : !this.isDragSelect && s < o && (e -= t),
        e < 0 ? this.x -= this.slideableWidth : e >= t && (this.x += this.slideableWidth)
    }
    ,
    d.previous = function(e, t) {
        this.select(this.selectedIndex - 1, e, t)
    }
    ,
    d.next = function(e, t) {
        this.select(this.selectedIndex + 1, e, t)
    }
    ,
    d.updateSelectedSlide = function() {
        var e = this.slides[this.selectedIndex];
        e && (this.unselectSelectedSlide(),
        this.selectedSlide = e,
        e.select(),
        this.selectedCells = e.cells,
        this.selectedElements = e.getCellElements(),
        this.selectedCell = e.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    d.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    d.selectInitialIndex = function() {
        var e = this.options.initialIndex;
        if (this.isInitActivated)
            this.select(this.selectedIndex, !1, !0);
        else {
            if (e && "string" == typeof e)
                if (this.queryCell(e))
                    return void this.selectCell(e, !1, !0);
            var t = 0;
            e && this.slides[e] && (t = e),
            this.select(t, !1, !0)
        }
    }
    ,
    d.selectCell = function(e, t, i) {
        var n = this.queryCell(e);
        if (n) {
            var o = this.getCellSlideIndex(n);
            this.select(o, t, i)
        }
    }
    ,
    d.getCellSlideIndex = function(e) {
        for (var t = 0; t < this.slides.length; t++) {
            if (-1 != this.slides[t].cells.indexOf(e))
                return t
        }
    }
    ,
    d.getCell = function(e) {
        for (var t = 0; t < this.cells.length; t++) {
            var i = this.cells[t];
            if (i.element == e)
                return i
        }
    }
    ,
    d.getCells = function(e) {
        e = n.makeArray(e);
        var t = [];
        return e.forEach((function(e) {
            var i = this.getCell(e);
            i && t.push(i)
        }
        ), this),
        t
    }
    ,
    d.getCellElements = function() {
        return this.cells.map((function(e) {
            return e.element
        }
        ))
    }
    ,
    d.getParentCell = function(e) {
        var t = this.getCell(e);
        return t || (e = n.getParent(e, ".flickity-slider > *"),
        this.getCell(e))
    }
    ,
    d.getAdjacentCellElements = function(e, t) {
        if (!e)
            return this.selectedSlide.getCellElements();
        t = void 0 === t ? this.selectedIndex : t;
        var i = this.slides.length;
        if (1 + 2 * e >= i)
            return this.getCellElements();
        for (var o = [], r = t - e; r <= t + e; r++) {
            var s = this.options.wrapAround ? n.modulo(r, i) : r
              , a = this.slides[s];
            a && (o = o.concat(a.getCellElements()))
        }
        return o
    }
    ,
    d.queryCell = function(e) {
        if ("number" == typeof e)
            return this.cells[e];
        if ("string" == typeof e) {
            if (e.match(/^[#.]?[\d/]/))
                return;
            e = this.element.querySelector(e)
        }
        return this.getCell(e)
    }
    ,
    d.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    d.childUIPointerDown = function(e) {
        "touchstart" != e.type && e.preventDefault(),
        this.focus()
    }
    ,
    d.onresize = function() {
        this.resize()
    }
    ,
    n.debounceMethod(u, "onresize", 150),
    d.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var e = this.selectedElements && this.selectedElements[0];
            this.selectCell(e, !1, !0)
        }
    }
    ,
    d.onkeydown = function(e) {
        var t = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !t) {
            var i = u.keyboardHandlers[e.keyCode];
            i && i.call(this)
        }
    }
    ,
    u.keyboardHandlers = {
        37: function() {
            var e = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(),
            this[e]()
        },
        39: function() {
            var e = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(),
            this[e]()
        }
    },
    d.focus = function() {
        var t = e.pageYOffset;
        this.element.focus({
            preventScroll: !0
        }),
        e.pageYOffset != t && e.scrollTo(e.pageXOffset, t)
    }
    ,
    d.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.unselectSelectedSlide(),
        this.cells.forEach((function(e) {
            e.destroy()
        }
        )),
        this.element.removeChild(this.viewport),
        a(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    d.destroy = function() {
        this.deactivate(),
        e.removeEventListener("resize", this),
        this.allOff(),
        this.emitEvent("destroy"),
        delete this.element.flickityGUID,
        delete c[this.guid]
    }
    ,
    n.extend(d, s),
    u.data = function(e) {
        var t = (e = n.getQueryElement(e)) && e.flickityGUID;
        return t && c[t]
    }
    ,
    n.htmlInit(u, "flickity"),
    u.Cell = o,
    u.Slide = r,
    u
}
)),
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */
function(e, t) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.Unipointer = t(e, e.EvEmitter)
}(window, (function(e, t) {
    function i() {}
    var n = i.prototype = Object.create(t.prototype);
    n.bindStartEvent = function(e) {
        this._bindStartEvent(e, !0)
    }
    ,
    n.unbindStartEvent = function(e) {
        this._bindStartEvent(e, !1)
    }
    ,
    n._bindStartEvent = function(t, i) {
        var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener"
          , o = "mousedown";
        e.PointerEvent ? o = "pointerdown" : "ontouchstart"in e && (o = "touchstart"),
        t[n](o, this)
    }
    ,
    n.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }
    ,
    n.getTouch = function(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    n.onmousedown = function(e) {
        var t = e.button;
        t && 0 !== t && 1 !== t || this._pointerDown(e, e)
    }
    ,
    n.ontouchstart = function(e) {
        this._pointerDown(e, e.changedTouches[0])
    }
    ,
    n.onpointerdown = function(e) {
        this._pointerDown(e, e)
    }
    ,
    n._pointerDown = function(e, t) {
        e.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier,
        this.pointerDown(e, t))
    }
    ,
    n.pointerDown = function(e, t) {
        this._bindPostStartEvents(e),
        this.emitEvent("pointerDown", [e, t])
    }
    ;
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return n._bindPostStartEvents = function(t) {
        if (t) {
            var i = o[t.type];
            i.forEach((function(t) {
                e.addEventListener(t, this)
            }
            ), this),
            this._boundPointerEvents = i
        }
    }
    ,
    n._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach((function(t) {
            e.removeEventListener(t, this)
        }
        ), this),
        delete this._boundPointerEvents)
    }
    ,
    n.onmousemove = function(e) {
        this._pointerMove(e, e)
    }
    ,
    n.onpointermove = function(e) {
        e.pointerId == this.pointerIdentifier && this._pointerMove(e, e)
    }
    ,
    n.ontouchmove = function(e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerMove(e, t)
    }
    ,
    n._pointerMove = function(e, t) {
        this.pointerMove(e, t)
    }
    ,
    n.pointerMove = function(e, t) {
        this.emitEvent("pointerMove", [e, t])
    }
    ,
    n.onmouseup = function(e) {
        this._pointerUp(e, e)
    }
    ,
    n.onpointerup = function(e) {
        e.pointerId == this.pointerIdentifier && this._pointerUp(e, e)
    }
    ,
    n.ontouchend = function(e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerUp(e, t)
    }
    ,
    n._pointerUp = function(e, t) {
        this._pointerDone(),
        this.pointerUp(e, t)
    }
    ,
    n.pointerUp = function(e, t) {
        this.emitEvent("pointerUp", [e, t])
    }
    ,
    n._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    n._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    n.pointerDone = function() {}
    ,
    n.onpointercancel = function(e) {
        e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e)
    }
    ,
    n.ontouchcancel = function(e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerCancel(e, t)
    }
    ,
    n._pointerCancel = function(e, t) {
        this._pointerDone(),
        this.pointerCancel(e, t)
    }
    ,
    n.pointerCancel = function(e, t) {
        this.emitEvent("pointerCancel", [e, t])
    }
    ,
    i.getPointerPoint = function(e) {
        return {
            x: e.pageX,
            y: e.pageY
        }
    }
    ,
    i
}
)),
/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */
function(e, t) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], (function(i) {
        return t(e, i)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("unipointer")) : e.Unidragger = t(e, e.Unipointer)
}(window, (function(e, t) {
    function i() {}
    var n = i.prototype = Object.create(t.prototype);
    n.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    n.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    n._bindHandles = function(t) {
        for (var i = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", n = t ? this._touchActionValue : "", o = 0; o < this.handles.length; o++) {
            var r = this.handles[o];
            this._bindStartEvent(r, t),
            r[i]("click", this),
            e.PointerEvent && (r.style.touchAction = n)
        }
    }
    ,
    n._touchActionValue = "none",
    n.pointerDown = function(e, t) {
        this.okayPointerDown(e) && (this.pointerDownPointer = {
            pageX: t.pageX,
            pageY: t.pageY
        },
        e.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(e),
        this.emitEvent("pointerDown", [e, t]))
    }
    ;
    var o = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , r = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return n.okayPointerDown = function(e) {
        var t = o[e.target.nodeName]
          , i = r[e.target.type]
          , n = !t || i;
        return n || this._pointerReset(),
        n
    }
    ,
    n.pointerDownBlur = function() {
        var e = document.activeElement;
        e && e.blur && e != document.body && e.blur()
    }
    ,
    n.pointerMove = function(e, t) {
        var i = this._dragPointerMove(e, t);
        this.emitEvent("pointerMove", [e, t, i]),
        this._dragMove(e, t, i)
    }
    ,
    n._dragPointerMove = function(e, t) {
        var i = {
            x: t.pageX - this.pointerDownPointer.pageX,
            y: t.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(e, t),
        i
    }
    ,
    n.hasDragStarted = function(e) {
        return Math.abs(e.x) > 3 || Math.abs(e.y) > 3
    }
    ,
    n.pointerUp = function(e, t) {
        this.emitEvent("pointerUp", [e, t]),
        this._dragPointerUp(e, t)
    }
    ,
    n._dragPointerUp = function(e, t) {
        this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t)
    }
    ,
    n._dragStart = function(e, t) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(e, t)
    }
    ,
    n.dragStart = function(e, t) {
        this.emitEvent("dragStart", [e, t])
    }
    ,
    n._dragMove = function(e, t, i) {
        this.isDragging && this.dragMove(e, t, i)
    }
    ,
    n.dragMove = function(e, t, i) {
        e.preventDefault(),
        this.emitEvent("dragMove", [e, t, i])
    }
    ,
    n._dragEnd = function(e, t) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(e, t)
    }
    ,
    n.dragEnd = function(e, t) {
        this.emitEvent("dragEnd", [e, t])
    }
    ,
    n.onclick = function(e) {
        this.isPreventingClicks && e.preventDefault()
    }
    ,
    n._staticClick = function(e, t) {
        this.isIgnoringMouseUp && "mouseup" == e.type || (this.staticClick(e, t),
        "mouseup" != e.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    n.staticClick = function(e, t) {
        this.emitEvent("staticClick", [e, t])
    }
    ,
    i.getPointerPoint = t.getPointerPoint,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], (function(i, n, o) {
        return t(e, i, n, o)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : e.Flickity = t(e, e.Flickity, e.Unidragger, e.fizzyUIUtils)
}(window, (function(e, t, i, n) {
    n.extend(t.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }),
    t.createMethods.push("_createDrag");
    var o = t.prototype;
    n.extend(o, i.prototype),
    o._touchActionValue = "pan-y";
    var r = "createTouch"in document
      , s = !1;
    o._createDrag = function() {
        this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        r && !s && (e.addEventListener("touchmove", (function() {}
        )),
        s = !0)
    }
    ,
    o.onActivateDrag = function() {
        this.handles = [this.viewport],
        this.bindHandles(),
        this.updateDraggable()
    }
    ,
    o.onDeactivateDrag = function() {
        this.unbindHandles(),
        this.element.classList.remove("is-draggable")
    }
    ,
    o.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable,
        this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }
    ,
    o.bindDrag = function() {
        this.options.draggable = !0,
        this.updateDraggable()
    }
    ,
    o.unbindDrag = function() {
        this.options.draggable = !1,
        this.updateDraggable()
    }
    ,
    o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    o.pointerDown = function(t, i) {
        this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t),
        this.pointerDownFocus(t),
        document.activeElement != this.element && this.pointerDownBlur(),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this.pointerDownScroll = l(),
        e.addEventListener("scroll", this),
        this._pointerDownDefault(t, i)) : this._pointerDownDefault(t, i)
    }
    ,
    o._pointerDownDefault = function(e, t) {
        this.pointerDownPointer = {
            pageX: t.pageX,
            pageY: t.pageY
        },
        this._bindPostStartEvents(e),
        this.dispatchEvent("pointerDown", e, [t])
    }
    ;
    var a = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    function l() {
        return {
            x: e.pageXOffset,
            y: e.pageYOffset
        }
    }
    return o.pointerDownFocus = function(e) {
        a[e.target.nodeName] || this.focus()
    }
    ,
    o._pointerDownPreventDefault = function(e) {
        var t = "touchstart" == e.type
          , i = "touch" == e.pointerType
          , n = a[e.target.nodeName];
        t || i || n || e.preventDefault()
    }
    ,
    o.hasDragStarted = function(e) {
        return Math.abs(e.x) > this.options.dragThreshold
    }
    ,
    o.pointerUp = function(e, t) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", e, [t]),
        this._dragPointerUp(e, t)
    }
    ,
    o.pointerDone = function() {
        e.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    o.dragStart = function(t, i) {
        this.isDraggable && (this.dragStartPosition = this.x,
        this.startAnimation(),
        e.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", t, [i]))
    }
    ,
    o.pointerMove = function(e, t) {
        var i = this._dragPointerMove(e, t);
        this.dispatchEvent("pointerMove", e, [t, i]),
        this._dragMove(e, t, i)
    }
    ,
    o.dragMove = function(e, t, i) {
        if (this.isDraggable) {
            e.preventDefault(),
            this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x %= this.slideableWidth);
            var o = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                o = o > r ? .5 * (o + r) : o;
                var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                o = o < s ? .5 * (o + s) : o
            }
            this.dragX = o,
            this.dragMoveTime = new Date,
            this.dispatchEvent("dragMove", e, [t, i])
        }
    }
    ,
    o.dragEnd = function(e, t) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else
                this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX,
            this.isDragSelect = this.options.wrapAround,
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", e, [t])
        }
    }
    ,
    o.dragEndRestingSelect = function() {
        var e = this.getRestingPosition()
          , t = Math.abs(this.getSlideDistance(-e, this.selectedIndex))
          , i = this._getClosestResting(e, t, 1)
          , n = this._getClosestResting(e, t, -1);
        return i.distance < n.distance ? i.index : n.index
    }
    ,
    o._getClosestResting = function(e, t, i) {
        for (var n = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(e, t) {
            return e <= t
        }
        : function(e, t) {
            return e < t
        }
        ; r(t, o) && (n += i,
        o = t,
        null !== (t = this.getSlideDistance(-e, n))); )
            t = Math.abs(t);
        return {
            distance: o,
            index: n - i
        }
    }
    ,
    o.getSlideDistance = function(e, t) {
        var i = this.slides.length
          , o = this.options.wrapAround && i > 1
          , r = o ? n.modulo(t, i) : t
          , s = this.slides[r];
        if (!s)
            return null;
        var a = o ? this.slideableWidth * Math.floor(t / i) : 0;
        return e - (s.target + a)
    }
    ,
    o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100)
            return 0;
        var e = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , t = this.previousDragX - this.dragX;
        return e > 0 && t > 0 ? 1 : e < 0 && t < 0 ? -1 : 0
    }
    ,
    o.staticClick = function(e, t) {
        var i = this.getParentCell(e.target)
          , n = i && i.element
          , o = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", e, [t, n, o])
    }
    ,
    o.onscroll = function() {
        var e = l()
          , t = this.pointerDownScroll.x - e.x
          , i = this.pointerDownScroll.y - e.y;
        (Math.abs(t) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }
    ,
    t
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, o) {
        return t(e, i, n, o)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.Unipointer, e.fizzyUIUtils)
}(window, (function(e, t, i, n) {
    "use strict";
    var o = "http://www.w3.org/2000/svg";
    function r(e, t) {
        this.direction = e,
        this.parent = t,
        this._create()
    }
    r.prototype = Object.create(i.prototype),
    r.prototype._create = function() {
        this.isEnabled = !0,
        this.isPrevious = -1 == this.direction;
        var e = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == e;
        var t = this.element = document.createElement("button");
        t.className = "flickity-button flickity-prev-next-button",
        t.className += this.isPrevious ? " flickity-previous" : " flickity-next",
        t.setAttribute("type", "button"),
        this.disable(),
        t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        t.appendChild(i),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    r.prototype.activate = function() {
        this.bindStartEvent(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    r.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        this.unbindStartEvent(this.element),
        this.element.removeEventListener("click", this)
    }
    ,
    r.prototype.createSVG = function() {
        var e = document.createElementNS(o, "svg");
        e.setAttribute("class", "flickity-button-icon"),
        e.setAttribute("viewBox", "0 0 100 100");
        var t = document.createElementNS(o, "path")
          , i = function(e) {
            if ("string" == typeof e)
                return e;
            return "M " + e.x0 + ",50 L " + e.x1 + "," + (e.y1 + 50) + " L " + e.x2 + "," + (e.y2 + 50) + " L " + e.x3 + ",50  L " + e.x2 + "," + (50 - e.y2) + " L " + e.x1 + "," + (50 - e.y1) + " Z"
        }(this.parent.options.arrowShape);
        return t.setAttribute("d", i),
        t.setAttribute("class", "arrow"),
        this.isLeft || t.setAttribute("transform", "translate(100, 100) rotate(180) "),
        e.appendChild(t),
        e
    }
    ,
    r.prototype.handleEvent = n.handleEvent,
    r.prototype.onclick = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var e = this.isPrevious ? "previous" : "next";
            this.parent[e]()
        }
    }
    ,
    r.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    r.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    r.prototype.update = function() {
        var e = this.parent.slides;
        if (this.parent.options.wrapAround && e.length > 1)
            this.enable();
        else {
            var t = e.length ? e.length - 1 : 0
              , i = this.isPrevious ? 0 : t;
            this[this.parent.selectedIndex == i ? "disable" : "enable"]()
        }
    }
    ,
    r.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    n.extend(t.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    t.createMethods.push("_createPrevNextButtons");
    var s = t.prototype;
    return s._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new r(-1,this),
        this.nextButton = new r(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    s.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    s.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    t.PrevNextButton = r,
    t
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, o) {
        return t(e, i, n, o)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.Unipointer, e.fizzyUIUtils)
}(window, (function(e, t, i, n) {
    function o(e) {
        this.parent = e,
        this._create()
    }
    o.prototype = Object.create(i.prototype),
    o.prototype._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.handleClick = this.onClick.bind(this),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    o.prototype.activate = function() {
        this.setDots(),
        this.holder.addEventListener("click", this.handleClick),
        this.bindStartEvent(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    o.prototype.deactivate = function() {
        this.holder.removeEventListener("click", this.handleClick),
        this.unbindStartEvent(this.holder),
        this.parent.element.removeChild(this.holder)
    }
    ,
    o.prototype.setDots = function() {
        var e = this.parent.slides.length - this.dots.length;
        e > 0 ? this.addDots(e) : e < 0 && this.removeDots(-e)
    }
    ,
    o.prototype.addDots = function(e) {
        for (var t = document.createDocumentFragment(), i = [], n = this.dots.length, o = n + e, r = n; r < o; r++) {
            var s = document.createElement("li");
            s.className = "dot",
            s.setAttribute("aria-label", "Page dot " + (r + 1)),
            t.appendChild(s),
            i.push(s)
        }
        this.holder.appendChild(t),
        this.dots = this.dots.concat(i)
    }
    ,
    o.prototype.removeDots = function(e) {
        this.dots.splice(this.dots.length - e, e).forEach((function(e) {
            this.holder.removeChild(e)
        }
        ), this)
    }
    ,
    o.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot",
        this.selectedDot.removeAttribute("aria-current")),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected",
        this.selectedDot.setAttribute("aria-current", "step"))
    }
    ,
    o.prototype.onTap = o.prototype.onClick = function(e) {
        var t = e.target;
        if ("LI" == t.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(t);
            this.parent.select(i)
        }
    }
    ,
    o.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    t.PageDots = o,
    n.extend(t.defaults, {
        pageDots: !0
    }),
    t.createMethods.push("_createPageDots");
    var r = t.prototype;
    return r._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new o(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    r.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    r.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    r.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    r.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    t.PageDots = o,
    t
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], (function(e, i, n) {
        return t(e, i, n)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : t(e.EvEmitter, e.fizzyUIUtils, e.Flickity)
}(window, (function(e, t, i) {
    function n(e) {
        this.parent = e,
        this.state = "stopped",
        this.onVisibilityChange = this.visibilityChange.bind(this),
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    n.prototype = Object.create(e.prototype),
    n.prototype.play = function() {
        "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing",
        document.addEventListener("visibilitychange", this.onVisibilityChange),
        this.tick()))
    }
    ,
    n.prototype.tick = function() {
        if ("playing" == this.state) {
            var e = this.parent.options.autoPlay;
            e = "number" == typeof e ? e : 3e3;
            var t = this;
            this.clear(),
            this.timeout = setTimeout((function() {
                t.parent.next(!0),
                t.tick()
            }
            ), e)
        }
    }
    ,
    n.prototype.stop = function() {
        this.state = "stopped",
        this.clear(),
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }
    ,
    n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }
    ,
    n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused",
        this.clear())
    }
    ,
    n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }
    ,
    n.prototype.visibilityChange = function() {
        this[document.hidden ? "pause" : "unpause"]()
    }
    ,
    n.prototype.visibilityPlay = function() {
        this.play(),
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }
    ,
    t.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }),
    i.createMethods.push("_createPlayer");
    var o = i.prototype;
    return o._createPlayer = function() {
        this.player = new n(this),
        this.on("activate", this.activatePlayer),
        this.on("uiChange", this.stopPlayer),
        this.on("pointerDown", this.stopPlayer),
        this.on("deactivate", this.deactivatePlayer)
    }
    ,
    o.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(),
        this.element.addEventListener("mouseenter", this))
    }
    ,
    o.playPlayer = function() {
        this.player.play()
    }
    ,
    o.stopPlayer = function() {
        this.player.stop()
    }
    ,
    o.pausePlayer = function() {
        this.player.pause()
    }
    ,
    o.unpausePlayer = function() {
        this.player.unpause()
    }
    ,
    o.deactivatePlayer = function() {
        this.player.stop(),
        this.element.removeEventListener("mouseenter", this)
    }
    ,
    o.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(),
        this.element.addEventListener("mouseleave", this))
    }
    ,
    o.onmouseleave = function() {
        this.player.unpause(),
        this.element.removeEventListener("mouseleave", this)
    }
    ,
    i.Player = n,
    i
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], (function(i, n) {
        return t(e, i, n)
    }
    )) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.fizzyUIUtils)
}(window, (function(e, t, i) {
    var n = t.prototype;
    return n.insert = function(e, t) {
        var i = this._makeCells(e);
        if (i && i.length) {
            var n = this.cells.length;
            t = void 0 === t ? n : t;
            var o = function(e) {
                var t = document.createDocumentFragment();
                return e.forEach((function(e) {
                    t.appendChild(e.element)
                }
                )),
                t
            }(i)
              , r = t == n;
            if (r)
                this.slider.appendChild(o);
            else {
                var s = this.cells[t].element;
                this.slider.insertBefore(o, s)
            }
            if (0 === t)
                this.cells = i.concat(this.cells);
            else if (r)
                this.cells = this.cells.concat(i);
            else {
                var a = this.cells.splice(t, n - t);
                this.cells = this.cells.concat(i).concat(a)
            }
            this._sizeCells(i),
            this.cellChange(t, !0)
        }
    }
    ,
    n.append = function(e) {
        this.insert(e, this.cells.length)
    }
    ,
    n.prepend = function(e) {
        this.insert(e, 0)
    }
    ,
    n.remove = function(e) {
        var t = this.getCells(e);
        if (t && t.length) {
            var n = this.cells.length - 1;
            t.forEach((function(e) {
                e.remove();
                var t = this.cells.indexOf(e);
                n = Math.min(t, n),
                i.removeFrom(this.cells, e)
            }
            ), this),
            this.cellChange(n, !0)
        }
    }
    ,
    n.cellSizeChange = function(e) {
        var t = this.getCell(e);
        if (t) {
            t.getSize();
            var i = this.cells.indexOf(t);
            this.cellChange(i)
        }
    }
    ,
    n.cellChange = function(e, t) {
        var i = this.selectedElement;
        this._positionCells(e),
        this._getWrapShiftCells(),
        this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
        this.emitEvent("cellChange", [e]),
        this.select(this.selectedIndex),
        t && this.positionSliderAtSelected()
    }
    ,
    t
}
)),
/*!
 * Flickity v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
function(e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell"], t) : "object" == typeof module && module.exports && (module.exports = t(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell")))
}(window, (function(e) {
    return e
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "fizzy-ui-utils/utils"], t) : "object" == typeof module && module.exports ? module.exports = t(require("flickity"), require("fizzy-ui-utils")) : t(e.Flickity, e.fizzyUIUtils)
}(this, (function(e, t) {
    var i = e.Slide
      , n = i.prototype.updateTarget;
    i.prototype.updateTarget = function() {
        if (n.apply(this, arguments),
        this.parent.options.fade) {
            var e = this.target - this.x
              , t = this.cells[0].x;
            this.cells.forEach((function(i) {
                var n = i.x - t - e;
                i.renderPosition(n)
            }
            ))
        }
    }
    ;
    var o = e.prototype;
    e.createMethods.push("_createFade"),
    o._createFade = function() {
        this.fadeIndex = this.selectedIndex,
        this.prevSelectedIndex = this.selectedIndex,
        this.on("select", this.onSelectFade),
        this.on("dragEnd", this.onDragEndFade),
        this.on("settle", this.onSettleFade),
        this.on("activate", this.onActivateFade),
        this.on("deactivate", this.onDeactivateFade)
    }
    ;
    var r = o.updateSlides;
    o.updateSlides = function() {
        r.apply(this, arguments),
        this.options.fade
    }
    ,
    o.onSelectFade = function() {
        this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1),
        this.prevSelectedIndex = this.selectedIndex
    }
    ,
    o.onSettleFade = function() {
        if (delete this.didDragEnd,
        this.options.fade)
            this.slides[this.fadeIndex]
    }
    ,
    o.onDragEndFade = function() {
        this.didDragEnd = !0
    }
    ,
    o.onActivateFade = function() {
        this.options.fade && this.element.classList.add("is-fade")
    }
    ,
    o.onDeactivateFade = function() {
        this.options.fade && this.element.classList.remove("is-fade")
    }
    ;
    var s = o.positionSlider;
    o.positionSlider = function() {
        this.options.fade ? (this.fadeSlides(),
        this.dispatchScrollEvent()) : s.apply(this, arguments)
    }
    ;
    var a = o.positionSliderAtSelected;
    o.positionSliderAtSelected = function() {
        this.options.fade && this.setTranslateX(0),
        a.apply(this, arguments)
    }
    ,
    o.fadeSlides = function() {
        if (!(this.slides.length < 2)) {
            var e = this.getFadeIndexes()
              , t = this.slides[e.a]
              , i = this.slides[e.b]
              , n = this.wrapDifference(t.target, i.target)
              , o = this.wrapDifference(t.target, -this.x);
            o /= n;
            var r = e.a;
            this.isDragging && (r = o > .5 ? e.a : e.b);
            null != this.fadeHideIndex && this.fadeHideIndex != r && this.fadeHideIndex != e.a && (this.fadeHideIndex,
            e.b);
            this.fadeHideIndex = r
        }
    }
    ,
    o.getFadeIndexes = function() {
        return this.isDragging || this.didDragEnd ? this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes() : {
            a: this.fadeIndex,
            b: this.selectedIndex
        }
    }
    ,
    o.getFadeDragWrapIndexes = function() {
        var e = this.slides.map((function(e, t) {
            return this.getSlideDistance(-this.x, t)
        }
        ), this)
          , i = e.map((function(e) {
            return Math.abs(e)
        }
        ))
          , n = Math.min.apply(Math, i)
          , o = i.indexOf(n)
          , r = e[o]
          , s = this.slides.length
          , a = r >= 0 ? 1 : -1;
        return {
            a: o,
            b: t.modulo(o + a, s)
        }
    }
    ,
    o.getFadeDragLimitIndexes = function() {
        for (var e = 0, t = 0; t < this.slides.length - 1; t++) {
            var i = this.slides[t];
            if (-this.x < i.target)
                break;
            e = t
        }
        return {
            a: e,
            b: e + 1
        }
    }
    ,
    o.wrapDifference = function(e, t) {
        var i = t - e;
        if (!this.options.wrapAround)
            return i;
        var n = i + this.slideableWidth
          , o = i - this.slideableWidth;
        return Math.abs(n) < Math.abs(i) && (i = n),
        Math.abs(o) < Math.abs(i) && (i = o),
        i
    }
    ;
    var l = o._getWrapShiftCells;
    o._getWrapShiftCells = function() {
        this.options.fade || l.apply(this, arguments)
    }
    ;
    var c = o.shiftWrapCells;
    return o.shiftWrapCells = function() {
        this.options.fade || c.apply(this, arguments)
    }
    ,
    e
}
)),
/*! PhotoSwipe - v4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipe = t()
}(this, (function() {
    "use strict";
    return function(e, t, i, n) {
        var o = {
            features: null,
            bind: function(e, t, i, n) {
                var o = (n ? "remove" : "add") + "EventListener";
                t = t.split(" ");
                for (var r = 0; r < t.length; r++)
                    t[r] && e[o](t[r], i, !1)
            },
            isArray: function(e) {
                return e instanceof Array
            },
            createEl: function(e, t) {
                var i = document.createElement(t || "div");
                return e && (i.className = e),
                i
            },
            getScrollY: function() {
                var e = window.pageYOffset;
                return void 0 !== e ? e : document.documentElement.scrollTop
            },
            unbind: function(e, t, i) {
                o.bind(e, t, i, !0)
            },
            removeClass: function(e, t) {
                var i = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(e, t) {
                o.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
            },
            hasClass: function(e, t) {
                return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            },
            getChildByClass: function(e, t) {
                for (var i = e.firstChild; i; ) {
                    if (o.hasClass(i, t))
                        return i;
                    i = i.nextSibling
                }
            },
            arraySearch: function(e, t, i) {
                for (var n = e.length; n--; )
                    if (e[n][i] === t)
                        return n;
                return -1
            },
            extend: function(e, t, i) {
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        if (i && e.hasOwnProperty(n))
                            continue;
                        e[n] = t[n]
                    }
            },
            easing: {
                sine: {
                    out: function(e) {
                        return Math.sin(e * (Math.PI / 2))
                    },
                    inOut: function(e) {
                        return -(Math.cos(Math.PI * e) - 1) / 2
                    }
                },
                cubic: {
                    out: function(e) {
                        return --e * e * e + 1
                    }
                }
            },
            detectFeatures: function() {
                if (o.features)
                    return o.features;
                var e = o.createEl().style
                  , t = ""
                  , i = {};
                if (i.oldIE = document.all && !document.addEventListener,
                i.touch = "ontouchstart"in window,
                window.requestAnimationFrame && (i.raf = window.requestAnimationFrame,
                i.caf = window.cancelAnimationFrame),
                i.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled,
                !i.pointerEvent) {
                    var n = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var r = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        r && r.length > 0 && (r = parseInt(r[1], 10)) >= 1 && r < 8 && (i.isOldIOSPhone = !0)
                    }
                    var s = n.match(/Android\s([0-9\.]*)/)
                      , a = s ? s[1] : 0;
                    (a = parseFloat(a)) >= 1 && (a < 4.4 && (i.isOldAndroid = !0),
                    i.androidVersion = a),
                    i.isMobileOpera = /opera mini|opera mobi/i.test(n)
                }
                for (var l, c, u = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], h = 0; h < 4; h++) {
                    t = d[h];
                    for (var f = 0; f < 3; f++)
                        l = u[f],
                        c = t + (t ? l.charAt(0).toUpperCase() + l.slice(1) : l),
                        !i[l] && c in e && (i[l] = c);
                    t && !i.raf && (t = t.toLowerCase(),
                    i.raf = window[t + "RequestAnimationFrame"],
                    i.raf && (i.caf = window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"]))
                }
                if (!i.raf) {
                    var p = 0;
                    i.raf = function(e) {
                        var t = (new Date).getTime()
                          , i = Math.max(0, 16 - (t - p))
                          , n = window.setTimeout((function() {
                            e(t + i)
                        }
                        ), i);
                        return p = t + i,
                        n
                    }
                    ,
                    i.caf = function(e) {
                        clearTimeout(e)
                    }
                }
                return i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                o.features = i,
                i
            }
        };
        o.detectFeatures(),
        o.features.oldIE && (o.bind = function(e, t, i, n) {
            t = t.split(" ");
            for (var o, r = (n ? "detach" : "attach") + "Event", s = function() {
                i.handleEvent.call(i)
            }, a = 0; a < t.length; a++)
                if (o = t[a])
                    if ("object" == typeof i && i.handleEvent) {
                        if (n) {
                            if (!i["oldIE" + o])
                                return !1
                        } else
                            i["oldIE" + o] = s;
                        e[r]("on" + o, i["oldIE" + o])
                    } else
                        e[r]("on" + o, i)
        }
        );
        var r = this
          , s = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function(e) {
                return "A" === e.tagName
            },
            getDoubleTapZoom: function(e, t) {
                return e || t.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: !0,
            scaleMode: "fit"
        };
        o.extend(s, n);
        var a, l, c, u, d, h, f, p, m, v, g, y, b, w, x, C, E, S, z, D, _, A, k, I, T, P, M, L, F, O, N, R, W, U, j, q, B, H, Z, X, G, K, Y, $, V, J, Q, ee, te, ie, ne, oe, re, se, ae, le, ce = {
            x: 0,
            y: 0
        }, ue = {
            x: 0,
            y: 0
        }, de = {
            x: 0,
            y: 0
        }, he = {}, fe = 0, pe = {}, me = {
            x: 0,
            y: 0
        }, ve = 0, ge = !0, ye = [], be = {}, we = !1, xe = function(e, t) {
            o.extend(r, t.publicMethods),
            ye.push(e)
        }, Ce = function(e) {
            var t = jt();
            return e > t - 1 ? e - t : e < 0 ? t + e : e
        }, Ee = {}, Se = function(e, t) {
            return Ee[e] || (Ee[e] = []),
            Ee[e].push(t)
        }, ze = function(e) {
            var t = Ee[e];
            if (t) {
                var i = Array.prototype.slice.call(arguments);
                i.shift();
                for (var n = 0; n < t.length; n++)
                    t[n].apply(r, i)
            }
        }, De = function() {
            return (new Date).getTime()
        }, _e = function(e) {
            se = e,
            r.bg.style.opacity = e * s.bgOpacity
        }, Ae = function(e, t, i, n, o) {
            (!we || o && o !== r.currItem) && (n /= o ? o.fitRatio : r.currItem.fitRatio),
            e[A] = y + t + "px, " + i + "px" + b + " scale(" + n + ")"
        }, ke = function(e) {
            te && (e && (v > r.currItem.fitRatio ? we || ($t(r.currItem, !1, !0),
            we = !0) : we && ($t(r.currItem),
            we = !1)),
            Ae(te, de.x, de.y, v))
        }, Ie = function(e) {
            e.container && Ae(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e)
        }, Te = function(e, t) {
            t[A] = y + e + "px, 0px" + b
        }, Pe = function(e, t) {
            if (!s.loop && t) {
                var i = u + (me.x * fe - e) / me.x
                  , n = Math.round(e - ut.x);
                (i < 0 && n > 0 || i >= jt() - 1 && n < 0) && (e = ut.x + n * s.mainScrollEndFriction)
            }
            ut.x = e,
            Te(e, d)
        }, Me = function(e, t) {
            var i = dt[e] - pe[e];
            return ue[e] + ce[e] + i - i * (t / g)
        }, Le = function(e, t) {
            e.x = t.x,
            e.y = t.y,
            t.id && (e.id = t.id)
        }, Fe = function(e) {
            e.x = Math.round(e.x),
            e.y = Math.round(e.y)
        }, Oe = null, Ne = function() {
            Oe && (o.unbind(document, "mousemove", Ne),
            o.addClass(e, "pswp--has_mouse"),
            s.mouseUsed = !0,
            ze("mouseUsed")),
            Oe = setTimeout((function() {
                Oe = null
            }
            ), 100)
        }, Re = function(e, t) {
            var i = Xt(r.currItem, he, e);
            return t && (ee = i),
            i
        }, We = function(e) {
            return e || (e = r.currItem),
            e.initialZoomLevel
        }, Ue = function(e) {
            return e || (e = r.currItem),
            e.w > 0 ? s.maxSpreadZoom : 1
        }, je = function(e, t, i, n) {
            return n === r.currItem.initialZoomLevel ? (i[e] = r.currItem.initialPosition[e],
            !0) : (i[e] = Me(e, n),
            i[e] > t.min[e] ? (i[e] = t.min[e],
            !0) : i[e] < t.max[e] && (i[e] = t.max[e],
            !0))
        }, qe = function(e) {
            var t = "";
            s.escKey && 27 === e.keyCode ? t = "close" : s.arrowKeys && (37 === e.keyCode ? t = "prev" : 39 === e.keyCode && (t = "next")),
            t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            r[t]()))
        }, Be = function(e) {
            e && (K || G || ie || B) && (e.preventDefault(),
            e.stopPropagation())
        }, He = function() {
            r.setScrollOffset(0, o.getScrollY())
        }, Ze = {}, Xe = 0, Ge = function(e) {
            Ze[e] && (Ze[e].raf && P(Ze[e].raf),
            Xe--,
            delete Ze[e])
        }, Ke = function(e) {
            Ze[e] && Ge(e),
            Ze[e] || (Xe++,
            Ze[e] = {})
        }, Ye = function() {
            for (var e in Ze)
                Ze.hasOwnProperty(e) && Ge(e)
        }, $e = function(e, t, i, n, o, r, s) {
            var a, l = De();
            Ke(e);
            var c = function() {
                if (Ze[e]) {
                    if ((a = De() - l) >= n)
                        return Ge(e),
                        r(i),
                        void (s && s());
                    r((i - t) * o(a / n) + t),
                    Ze[e].raf = T(c)
                }
            };
            c()
        }, Ve = {
            shout: ze,
            listen: Se,
            viewportSize: he,
            options: s,
            isMainScrollAnimating: function() {
                return ie
            },
            getZoomLevel: function() {
                return v
            },
            getCurrentIndex: function() {
                return u
            },
            isDragging: function() {
                return Z
            },
            isZooming: function() {
                return J
            },
            setScrollOffset: function(e, t) {
                pe.x = e,
                O = pe.y = t,
                ze("updateScrollOffset", pe)
            },
            applyZoomPan: function(e, t, i, n) {
                de.x = t,
                de.y = i,
                v = e,
                ke(n)
            },
            init: function() {
                if (!a && !l) {
                    var i;
                    r.framework = o,
                    r.template = e,
                    r.bg = o.getChildByClass(e, "pswp__bg"),
                    M = e.className,
                    a = !0,
                    N = o.detectFeatures(),
                    T = N.raf,
                    P = N.caf,
                    A = N.transform,
                    F = N.oldIE,
                    r.scrollWrap = o.getChildByClass(e, "pswp__scroll-wrap"),
                    r.container = o.getChildByClass(r.scrollWrap, "pswp__container"),
                    d = r.container.style,
                    r.itemHolders = C = [{
                        el: r.container.children[0],
                        wrap: 0,
                        index: -1
                    }, {
                        el: r.container.children[1],
                        wrap: 0,
                        index: -1
                    }, {
                        el: r.container.children[2],
                        wrap: 0,
                        index: -1
                    }],
                    C[0].el.style.display = C[2].el.style.display = "none",
                    function() {
                        if (A) {
                            var t = N.perspective && !I;
                            return y = "translate" + (t ? "3d(" : "("),
                            void (b = N.perspective ? ", 0px)" : ")")
                        }
                        A = "left",
                        o.addClass(e, "pswp--ie"),
                        Te = function(e, t) {
                            t.left = e + "px"
                        }
                        ,
                        Ie = function(e) {
                            var t = e.fitRatio > 1 ? 1 : e.fitRatio
                              , i = e.container.style
                              , n = t * e.w
                              , o = t * e.h;
                            i.width = n + "px",
                            i.height = o + "px",
                            i.left = e.initialPosition.x + "px",
                            i.top = e.initialPosition.y + "px"
                        }
                        ,
                        ke = function() {
                            if (te) {
                                var e = te
                                  , t = r.currItem
                                  , i = t.fitRatio > 1 ? 1 : t.fitRatio
                                  , n = i * t.w
                                  , o = i * t.h;
                                e.width = n + "px",
                                e.height = o + "px",
                                e.left = de.x + "px",
                                e.top = de.y + "px"
                            }
                        }
                    }(),
                    m = {
                        resize: r.updateSize,
                        orientationchange: function() {
                            clearTimeout(R),
                            R = setTimeout((function() {
                                he.x !== r.scrollWrap.clientWidth && r.updateSize()
                            }
                            ), 500)
                        },
                        scroll: He,
                        keydown: qe,
                        click: Be
                    };
                    var n = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                    for (N.animationName && N.transform && !n || (s.showAnimationDuration = s.hideAnimationDuration = 0),
                    i = 0; i < ye.length; i++)
                        r["init" + ye[i]]();
                    if (t)
                        (r.ui = new t(r,o)).init();
                    ze("firstUpdate"),
                    u = u || s.index || 0,
                    (isNaN(u) || u < 0 || u >= jt()) && (u = 0),
                    r.currItem = Ut(u),
                    (N.isOldIOSPhone || N.isOldAndroid) && (ge = !1),
                    e.setAttribute("aria-hidden", "false"),
                    s.modal && (ge ? e.style.position = "fixed" : (e.style.position = "absolute",
                    e.style.top = o.getScrollY() + "px")),
                    void 0 === O && (ze("initialLayout"),
                    O = L = o.getScrollY());
                    var c = "pswp--open ";
                    for (s.mainClass && (c += s.mainClass + " "),
                    s.showHideOpacity && (c += "pswp--animate_opacity "),
                    c += I ? "pswp--touch" : "pswp--notouch",
                    c += N.animationName ? " pswp--css_animation" : "",
                    c += N.svg ? " pswp--svg" : "",
                    o.addClass(e, c),
                    r.updateSize(),
                    h = -1,
                    ve = null,
                    i = 0; i < 3; i++)
                        Te((i + h) * me.x, C[i].el.style);
                    F || o.bind(r.scrollWrap, p, r),
                    Se("initialZoomInEnd", (function() {
                        r.setContent(C[0], u - 1),
                        r.setContent(C[2], u + 1),
                        C[0].el.style.display = C[2].el.style.display = "block",
                        s.focus && e.focus(),
                        o.bind(document, "keydown", r),
                        N.transform && o.bind(r.scrollWrap, "click", r),
                        s.mouseUsed || o.bind(document, "mousemove", Ne),
                        o.bind(window, "resize scroll orientationchange", r),
                        ze("bindEvents")
                    }
                    )),
                    r.setContent(C[1], u),
                    r.updateCurrItem(),
                    ze("afterInit"),
                    ge || (w = setInterval((function() {
                        Xe || Z || J || v !== r.currItem.initialZoomLevel || r.updateSize()
                    }
                    ), 1e3)),
                    o.addClass(e, "pswp--visible")
                }
            },
            close: function() {
                a && (a = !1,
                l = !0,
                ze("close"),
                o.unbind(window, "resize scroll orientationchange", r),
                o.unbind(window, "scroll", m.scroll),
                o.unbind(document, "keydown", r),
                o.unbind(document, "mousemove", Ne),
                N.transform && o.unbind(r.scrollWrap, "click", r),
                Z && o.unbind(window, f, r),
                clearTimeout(R),
                ze("unbindEvents"),
                qt(r.currItem, null, !0, r.destroy))
            },
            destroy: function() {
                ze("destroy"),
                Ot && clearTimeout(Ot),
                e.setAttribute("aria-hidden", "true"),
                e.className = M,
                w && clearInterval(w),
                o.unbind(r.scrollWrap, p, r),
                o.unbind(window, "scroll", r),
                pt(),
                Ye(),
                Ee = null
            },
            panTo: function(e, t, i) {
                i || (e > ee.min.x ? e = ee.min.x : e < ee.max.x && (e = ee.max.x),
                t > ee.min.y ? t = ee.min.y : t < ee.max.y && (t = ee.max.y)),
                de.x = e,
                de.y = t,
                ke()
            },
            handleEvent: function(e) {
                e = e || window.event,
                m[e.type] && m[e.type](e)
            },
            goTo: function(e) {
                var t = (e = Ce(e)) - u;
                ve = t,
                u = e,
                r.currItem = Ut(u),
                fe -= t,
                Pe(me.x * fe),
                Ye(),
                ie = !1,
                r.updateCurrItem()
            },
            next: function() {
                r.goTo(u + 1)
            },
            prev: function() {
                r.goTo(u - 1)
            },
            updateCurrZoomItem: function(e) {
                if (e && ze("beforeChange", 0),
                C[1].el.children.length) {
                    var t = C[1].el.children[0];
                    te = o.hasClass(t, "pswp__zoom-wrap") ? t.style : null
                } else
                    te = null;
                ee = r.currItem.bounds,
                g = v = r.currItem.initialZoomLevel,
                de.x = ee.center.x,
                de.y = ee.center.y,
                e && ze("afterChange")
            },
            invalidateCurrItems: function() {
                x = !0;
                for (var e = 0; e < 3; e++)
                    C[e].item && (C[e].item.needsUpdate = !0)
            },
            updateCurrItem: function(e) {
                if (0 !== ve) {
                    var t, i = Math.abs(ve);
                    if (!(e && i < 2)) {
                        r.currItem = Ut(u),
                        we = !1,
                        ze("beforeChange", ve),
                        i >= 3 && (h += ve + (ve > 0 ? -3 : 3),
                        i = 3);
                        for (var n = 0; n < i; n++)
                            ve > 0 ? (t = C.shift(),
                            C[2] = t,
                            h++,
                            Te((h + 2) * me.x, t.el.style),
                            r.setContent(t, u - i + n + 1 + 1)) : (t = C.pop(),
                            C.unshift(t),
                            h--,
                            Te(h * me.x, t.el.style),
                            r.setContent(t, u + i - n - 1 - 1));
                        if (te && 1 === Math.abs(ve)) {
                            var o = Ut(E);
                            o.initialZoomLevel !== v && (Xt(o, he),
                            $t(o),
                            Ie(o))
                        }
                        ve = 0,
                        r.updateCurrZoomItem(),
                        E = u,
                        ze("afterChange")
                    }
                }
            },
            updateSize: function(t) {
                if (!ge && s.modal) {
                    var i = o.getScrollY();
                    if (O !== i && (e.style.top = i + "px",
                    O = i),
                    !t && be.x === window.innerWidth && be.y === window.innerHeight)
                        return;
                    be.x = window.innerWidth,
                    be.y = window.innerHeight,
                    e.style.height = be.y + "px"
                }
                if (he.x = r.scrollWrap.clientWidth,
                he.y = r.scrollWrap.clientHeight,
                He(),
                me.x = he.x + Math.round(he.x * s.spacing),
                me.y = he.y,
                Pe(me.x * fe),
                ze("beforeResize"),
                void 0 !== h) {
                    for (var n, a, l, c = 0; c < 3; c++)
                        n = C[c],
                        Te((c + h) * me.x, n.el.style),
                        l = u + c - 1,
                        s.loop && jt() > 2 && (l = Ce(l)),
                        (a = Ut(l)) && (x || a.needsUpdate || !a.bounds) ? (r.cleanSlide(a),
                        r.setContent(n, l),
                        1 === c && (r.currItem = a,
                        r.updateCurrZoomItem(!0)),
                        a.needsUpdate = !1) : -1 === n.index && l >= 0 && r.setContent(n, l),
                        a && a.container && (Xt(a, he),
                        $t(a),
                        Ie(a));
                    x = !1
                }
                g = v = r.currItem.initialZoomLevel,
                (ee = r.currItem.bounds) && (de.x = ee.center.x,
                de.y = ee.center.y,
                ke(!0)),
                ze("resize")
            },
            zoomTo: function(e, t, i, n, r) {
                t && (g = v,
                dt.x = Math.abs(t.x) - de.x,
                dt.y = Math.abs(t.y) - de.y,
                Le(ue, de));
                var s = Re(e, !1)
                  , a = {};
                je("x", s, a, e),
                je("y", s, a, e);
                var l = v
                  , c = de.x
                  , u = de.y;
                Fe(a);
                var d = function(t) {
                    1 === t ? (v = e,
                    de.x = a.x,
                    de.y = a.y) : (v = (e - l) * t + l,
                    de.x = (a.x - c) * t + c,
                    de.y = (a.y - u) * t + u),
                    r && r(t),
                    ke(1 === t)
                };
                i ? $e("customZoomTo", 0, 1, i, n || o.easing.sine.inOut, d) : d(1)
            }
        }, Je = {}, Qe = {}, et = {}, tt = {}, it = {}, nt = [], ot = {}, rt = [], st = {}, at = 0, lt = {
            x: 0,
            y: 0
        }, ct = 0, ut = {
            x: 0,
            y: 0
        }, dt = {
            x: 0,
            y: 0
        }, ht = {
            x: 0,
            y: 0
        }, ft = function(e, t) {
            return st.x = Math.abs(e.x - t.x),
            st.y = Math.abs(e.y - t.y),
            Math.sqrt(st.x * st.x + st.y * st.y)
        }, pt = function() {
            Y && (P(Y),
            Y = null)
        }, mt = function() {
            Z && (Y = T(mt),
            kt())
        }, vt = function(e, t) {
            return !(!e || e === document) && (!(e.getAttribute("class") && e.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (t(e) ? e : vt(e.parentNode, t)))
        }, gt = {}, yt = function(e, t) {
            return gt.prevent = !vt(e.target, s.isClickableElement),
            ze("preventDragEvent", e, t, gt),
            gt.prevent
        }, bt = function(e, t) {
            return t.x = e.pageX,
            t.y = e.pageY,
            t.id = e.identifier,
            t
        }, wt = function(e, t, i) {
            i.x = .5 * (e.x + t.x),
            i.y = .5 * (e.y + t.y)
        }, xt = function() {
            var e = de.y - r.currItem.initialPosition.y;
            return 1 - Math.abs(e / (he.y / 2))
        }, Ct = {}, Et = {}, St = [], zt = function(e) {
            for (; St.length > 0; )
                St.pop();
            return k ? (le = 0,
            nt.forEach((function(e) {
                0 === le ? St[0] = e : 1 === le && (St[1] = e),
                le++
            }
            ))) : e.type.indexOf("touch") > -1 ? e.touches && e.touches.length > 0 && (St[0] = bt(e.touches[0], Ct),
            e.touches.length > 1 && (St[1] = bt(e.touches[1], Et))) : (Ct.x = e.pageX,
            Ct.y = e.pageY,
            Ct.id = "",
            St[0] = Ct),
            St
        }, Dt = function(e, t) {
            var i, n, o, a, l = de[e] + t[e], c = t[e] > 0, u = ut.x + t.x, d = ut.x - ot.x;
            if (i = l > ee.min[e] || l < ee.max[e] ? s.panEndFriction : 1,
            l = de[e] + t[e] * i,
            (s.allowPanToNext || v === r.currItem.initialZoomLevel) && (te ? "h" !== ne || "x" !== e || G || (c ? (l > ee.min[e] && (i = s.panEndFriction,
            ee.min[e] - l,
            n = ee.min[e] - ue[e]),
            (n <= 0 || d < 0) && jt() > 1 ? (a = u,
            d < 0 && u > ot.x && (a = ot.x)) : ee.min.x !== ee.max.x && (o = l)) : (l < ee.max[e] && (i = s.panEndFriction,
            l - ee.max[e],
            n = ue[e] - ee.max[e]),
            (n <= 0 || d > 0) && jt() > 1 ? (a = u,
            d > 0 && u < ot.x && (a = ot.x)) : ee.min.x !== ee.max.x && (o = l))) : a = u,
            "x" === e))
                return void 0 !== a && (Pe(a, !0),
                $ = a !== ot.x),
                ee.min.x !== ee.max.x && (void 0 !== o ? de.x = o : $ || (de.x += t.x * i)),
                void 0 !== a;
            ie || $ || v > r.currItem.fitRatio && (de[e] += t[e] * i)
        }, _t = function(e) {
            if (!("mousedown" === e.type && e.button > 0))
                if (Wt)
                    e.preventDefault();
                else if (!H || "mousedown" !== e.type) {
                    if (yt(e, !0) && e.preventDefault(),
                    ze("pointerDown"),
                    k) {
                        var t = o.arraySearch(nt, e.pointerId, "id");
                        t < 0 && (t = nt.length),
                        nt[t] = {
                            x: e.pageX,
                            y: e.pageY,
                            id: e.pointerId
                        }
                    }
                    var i = zt(e)
                      , n = i.length;
                    V = null,
                    Ye(),
                    Z && 1 !== n || (Z = oe = !0,
                    o.bind(window, f, r),
                    q = ae = re = B = $ = K = X = G = !1,
                    ne = null,
                    ze("firstTouchStart", i),
                    Le(ue, de),
                    ce.x = ce.y = 0,
                    Le(tt, i[0]),
                    Le(it, tt),
                    ot.x = me.x * fe,
                    rt = [{
                        x: tt.x,
                        y: tt.y
                    }],
                    U = W = De(),
                    Re(v, !0),
                    pt(),
                    mt()),
                    !J && n > 1 && !ie && !$ && (g = v,
                    G = !1,
                    J = X = !0,
                    ce.y = ce.x = 0,
                    Le(ue, de),
                    Le(Je, i[0]),
                    Le(Qe, i[1]),
                    wt(Je, Qe, ht),
                    dt.x = Math.abs(ht.x) - de.x,
                    dt.y = Math.abs(ht.y) - de.y,
                    Q = ft(Je, Qe))
                }
        }, At = function(e) {
            if (e.preventDefault(),
            k) {
                var t = o.arraySearch(nt, e.pointerId, "id");
                if (t > -1) {
                    var i = nt[t];
                    i.x = e.pageX,
                    i.y = e.pageY
                }
            }
            if (Z) {
                var n = zt(e);
                if (ne || K || J)
                    V = n;
                else if (ut.x !== me.x * fe)
                    ne = "h";
                else {
                    var r = Math.abs(n[0].x - tt.x) - Math.abs(n[0].y - tt.y);
                    Math.abs(r) >= 10 && (ne = r > 0 ? "h" : "v",
                    V = n)
                }
            }
        }, kt = function() {
            if (V) {
                var e = V.length;
                if (0 !== e)
                    if (Le(Je, V[0]),
                    et.x = Je.x - tt.x,
                    et.y = Je.y - tt.y,
                    J && e > 1) {
                        if (tt.x = Je.x,
                        tt.y = Je.y,
                        !et.x && !et.y && function(e, t) {
                            return e.x === t.x && e.y === t.y
                        }(V[1], Qe))
                            return;
                        Le(Qe, V[1]),
                        G || (G = !0,
                        ze("zoomGestureStarted"));
                        var t = ft(Je, Qe)
                          , i = Lt(t);
                        i > r.currItem.initialZoomLevel + r.currItem.initialZoomLevel / 15 && (ae = !0);
                        var n = 1
                          , o = We()
                          , a = Ue();
                        if (i < o)
                            if (s.pinchToClose && !ae && g <= r.currItem.initialZoomLevel) {
                                var l = 1 - (o - i) / (o / 1.2);
                                _e(l),
                                ze("onPinchClose", l),
                                re = !0
                            } else
                                (n = (o - i) / o) > 1 && (n = 1),
                                i = o - n * (o / 3);
                        else
                            i > a && ((n = (i - a) / (6 * o)) > 1 && (n = 1),
                            i = a + n * o);
                        n < 0 && (n = 0),
                        t,
                        wt(Je, Qe, lt),
                        ce.x += lt.x - ht.x,
                        ce.y += lt.y - ht.y,
                        Le(ht, lt),
                        de.x = Me("x", i),
                        de.y = Me("y", i),
                        q = i > v,
                        v = i,
                        ke()
                    } else {
                        if (!ne)
                            return;
                        if (oe && (oe = !1,
                        Math.abs(et.x) >= 10 && (et.x -= V[0].x - it.x),
                        Math.abs(et.y) >= 10 && (et.y -= V[0].y - it.y)),
                        tt.x = Je.x,
                        tt.y = Je.y,
                        0 === et.x && 0 === et.y)
                            return;
                        if ("v" === ne && s.closeOnVerticalDrag && "fit" === s.scaleMode && v === r.currItem.initialZoomLevel) {
                            ce.y += et.y,
                            de.y += et.y;
                            var c = xt();
                            return B = !0,
                            ze("onVerticalDrag", c),
                            _e(c),
                            void ke()
                        }
                        !function(e, t, i) {
                            if (e - U > 50) {
                                var n = rt.length > 2 ? rt.shift() : {};
                                n.x = t,
                                n.y = i,
                                rt.push(n),
                                U = e
                            }
                        }(De(), Je.x, Je.y),
                        K = !0,
                        ee = r.currItem.bounds,
                        Dt("x", et) || (Dt("y", et),
                        Fe(de),
                        ke())
                    }
            }
        }, It = function(e) {
            if (N.isOldAndroid) {
                if (H && "mouseup" === e.type)
                    return;
                e.type.indexOf("touch") > -1 && (clearTimeout(H),
                H = setTimeout((function() {
                    H = 0
                }
                ), 600))
            }
            var t;
            if (ze("pointerUp"),
            yt(e, !1) && e.preventDefault(),
            k) {
                var i = o.arraySearch(nt, e.pointerId, "id");
                if (i > -1)
                    if (t = nt.splice(i, 1)[0],
                    navigator.msPointerEnabled) {
                        t.type = {
                            4: "mouse",
                            2: "touch",
                            3: "pen"
                        }[e.pointerType],
                        t.type || (t.type = e.pointerType || "mouse")
                    } else
                        t.type = e.pointerType || "mouse"
            }
            var n, a = zt(e), l = a.length;
            if ("mouseup" === e.type && (l = 0),
            2 === l)
                return V = null,
                !0;
            1 === l && Le(it, a[0]),
            0 !== l || ne || ie || (t || ("mouseup" === e.type ? t = {
                x: e.pageX,
                y: e.pageY,
                type: "mouse"
            } : e.changedTouches && e.changedTouches[0] && (t = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
                type: "touch"
            })),
            ze("touchRelease", e, t));
            var c = -1;
            if (0 === l && (Z = !1,
            o.unbind(window, f, r),
            pt(),
            J ? c = 0 : -1 !== ct && (c = De() - ct)),
            ct = 1 === l ? De() : -1,
            n = -1 !== c && c < 150 ? "zoom" : "swipe",
            J && l < 2 && (J = !1,
            1 === l && (n = "zoomPointerUp"),
            ze("zoomGestureEnded")),
            V = null,
            K || G || ie || B)
                if (Ye(),
                j || (j = Tt()),
                j.calculateSwipeSpeed("x"),
                B) {
                    if (xt() < s.verticalDragRange)
                        r.close();
                    else {
                        var u = de.y
                          , d = se;
                        $e("verticalDrag", 0, 1, 300, o.easing.cubic.out, (function(e) {
                            de.y = (r.currItem.initialPosition.y - u) * e + u,
                            _e((1 - d) * e + d),
                            ke()
                        }
                        )),
                        ze("onVerticalDrag", 1)
                    }
                } else {
                    if (($ || ie) && 0 === l) {
                        if (Mt(n, j))
                            return;
                        n = "zoomPointerUp"
                    }
                    ie || ("swipe" === n ? !$ && v > r.currItem.fitRatio && Pt(j) : Ft())
                }
        }, Tt = function() {
            var e, t, i = {
                lastFlickOffset: {},
                lastFlickDist: {},
                lastFlickSpeed: {},
                slowDownRatio: {},
                slowDownRatioReverse: {},
                speedDecelerationRatio: {},
                speedDecelerationRatioAbs: {},
                distanceOffset: {},
                backAnimDestination: {},
                backAnimStarted: {},
                calculateSwipeSpeed: function(n) {
                    rt.length > 1 ? (e = De() - U + 50,
                    t = rt[rt.length - 2][n]) : (e = De() - W,
                    t = it[n]),
                    i.lastFlickOffset[n] = tt[n] - t,
                    i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n]),
                    i.lastFlickDist[n] > 20 ? i.lastFlickSpeed[n] = i.lastFlickOffset[n] / e : i.lastFlickSpeed[n] = 0,
                    Math.abs(i.lastFlickSpeed[n]) < .1 && (i.lastFlickSpeed[n] = 0),
                    i.slowDownRatio[n] = .95,
                    i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n],
                    i.speedDecelerationRatio[n] = 1
                },
                calculateOverBoundsAnimOffset: function(e, t) {
                    i.backAnimStarted[e] || (de[e] > ee.min[e] ? i.backAnimDestination[e] = ee.min[e] : de[e] < ee.max[e] && (i.backAnimDestination[e] = ee.max[e]),
                    void 0 !== i.backAnimDestination[e] && (i.slowDownRatio[e] = .7,
                    i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e],
                    i.speedDecelerationRatioAbs[e] < .05 && (i.lastFlickSpeed[e] = 0,
                    i.backAnimStarted[e] = !0,
                    $e("bounceZoomPan" + e, de[e], i.backAnimDestination[e], t || 300, o.easing.sine.out, (function(t) {
                        de[e] = t,
                        ke()
                    }
                    )))))
                },
                calculateAnimOffset: function(e) {
                    i.backAnimStarted[e] || (i.speedDecelerationRatio[e] = i.speedDecelerationRatio[e] * (i.slowDownRatio[e] + i.slowDownRatioReverse[e] - i.slowDownRatioReverse[e] * i.timeDiff / 10),
                    i.speedDecelerationRatioAbs[e] = Math.abs(i.lastFlickSpeed[e] * i.speedDecelerationRatio[e]),
                    i.distanceOffset[e] = i.lastFlickSpeed[e] * i.speedDecelerationRatio[e] * i.timeDiff,
                    de[e] += i.distanceOffset[e])
                },
                panAnimLoop: function() {
                    if (Ze.zoomPan && (Ze.zoomPan.raf = T(i.panAnimLoop),
                    i.now = De(),
                    i.timeDiff = i.now - i.lastNow,
                    i.lastNow = i.now,
                    i.calculateAnimOffset("x"),
                    i.calculateAnimOffset("y"),
                    ke(),
                    i.calculateOverBoundsAnimOffset("x"),
                    i.calculateOverBoundsAnimOffset("y"),
                    i.speedDecelerationRatioAbs.x < .05 && i.speedDecelerationRatioAbs.y < .05))
                        return de.x = Math.round(de.x),
                        de.y = Math.round(de.y),
                        ke(),
                        void Ge("zoomPan")
                }
            };
            return i
        }, Pt = function(e) {
            if (e.calculateSwipeSpeed("y"),
            ee = r.currItem.bounds,
            e.backAnimDestination = {},
            e.backAnimStarted = {},
            Math.abs(e.lastFlickSpeed.x) <= .05 && Math.abs(e.lastFlickSpeed.y) <= .05)
                return e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0,
                e.calculateOverBoundsAnimOffset("x"),
                e.calculateOverBoundsAnimOffset("y"),
                !0;
            Ke("zoomPan"),
            e.lastNow = De(),
            e.panAnimLoop()
        }, Mt = function(e, t) {
            var i, n, a;
            if (ie || (at = u),
            "swipe" === e) {
                var l = tt.x - it.x
                  , c = t.lastFlickDist.x < 10;
                l > 30 && (c || t.lastFlickOffset.x > 20) ? n = -1 : l < -30 && (c || t.lastFlickOffset.x < -20) && (n = 1)
            }
            n && ((u += n) < 0 ? (u = s.loop ? jt() - 1 : 0,
            a = !0) : u >= jt() && (u = s.loop ? 0 : jt() - 1,
            a = !0),
            a && !s.loop || (ve += n,
            fe -= n,
            i = !0));
            var d, h = me.x * fe, f = Math.abs(h - ut.x);
            return i || h > ut.x == t.lastFlickSpeed.x > 0 ? (d = Math.abs(t.lastFlickSpeed.x) > 0 ? f / Math.abs(t.lastFlickSpeed.x) : 333,
            d = Math.min(d, 400),
            d = Math.max(d, 250)) : d = 333,
            at === u && (i = !1),
            ie = !0,
            ze("mainScrollAnimStart"),
            $e("mainScroll", ut.x, h, d, o.easing.cubic.out, Pe, (function() {
                Ye(),
                ie = !1,
                at = -1,
                (i || at !== u) && r.updateCurrItem(),
                ze("mainScrollAnimComplete")
            }
            )),
            i && r.updateCurrItem(!0),
            i
        }, Lt = function(e) {
            return 1 / Q * e * g
        }, Ft = function() {
            var e = v
              , t = We()
              , i = Ue();
            v < t ? e = t : v > i && (e = i);
            var n, s = se;
            return re && !q && !ae && v < t ? (r.close(),
            !0) : (re && (n = function(e) {
                _e((1 - s) * e + s)
            }
            ),
            r.zoomTo(e, 0, 200, o.easing.cubic.out, n),
            !0)
        };
        xe("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var e = function(e, t, i, n, o) {
                        S = e + t,
                        z = e + i,
                        D = e + n,
                        _ = o ? e + o : ""
                    };
                    (k = N.pointerEvent) && N.touch && (N.touch = !1),
                    k ? navigator.msPointerEnabled ? e("MSPointer", "Down", "Move", "Up", "Cancel") : e("pointer", "down", "move", "up", "cancel") : N.touch ? (e("touch", "start", "move", "end", "cancel"),
                    I = !0) : e("mouse", "down", "move", "up"),
                    f = z + " " + D + " " + _,
                    p = S,
                    k && !I && (I = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                    r.likelyTouchDevice = I,
                    m[S] = _t,
                    m[z] = At,
                    m[D] = It,
                    _ && (m[_] = m[D]),
                    N.touch && (p += " mousedown",
                    f += " mousemove mouseup",
                    m.mousedown = m[S],
                    m.mousemove = m[z],
                    m.mouseup = m[D]),
                    I || (s.allowPanToNext = !1)
                }
            }
        });
        var Ot, Nt, Rt, Wt, Ut, jt, qt = function(t, i, n, a) {
            var l;
            Ot && clearTimeout(Ot),
            Wt = !0,
            Rt = !0,
            t.initialLayout ? (l = t.initialLayout,
            t.initialLayout = null) : l = s.getThumbBoundsFn && s.getThumbBoundsFn(u);
            var d = n ? s.hideAnimationDuration : s.showAnimationDuration
              , h = function() {
                Ge("initialZoom"),
                n ? (r.template.removeAttribute("style"),
                r.bg.removeAttribute("style")) : (_e(1),
                i && (i.style.display = "block"),
                o.addClass(e, "pswp--animated-in"),
                ze("initialZoom" + (n ? "OutEnd" : "InEnd"))),
                a && a(),
                Wt = !1
            };
            if (!d || !l || void 0 === l.x)
                return ze("initialZoom" + (n ? "Out" : "In")),
                v = t.initialZoomLevel,
                Le(de, t.initialPosition),
                ke(),
                e.style.opacity = n ? 0 : 1,
                _e(1),
                void (d ? setTimeout((function() {
                    h()
                }
                ), d) : h());
            var f, p;
            f = c,
            p = !r.currItem.src || r.currItem.loadError || s.showHideOpacity,
            t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"),
            n || (v = l.w / t.w,
            de.x = l.x,
            de.y = l.y - L,
            r[p ? "template" : "bg"].style.opacity = .001,
            ke()),
            Ke("initialZoom"),
            n && !f && o.removeClass(e, "pswp--animated-in"),
            p && (n ? o[(f ? "remove" : "add") + "Class"](e, "pswp--animate_opacity") : setTimeout((function() {
                o.addClass(e, "pswp--animate_opacity")
            }
            ), 30)),
            Ot = setTimeout((function() {
                if (ze("initialZoom" + (n ? "Out" : "In")),
                n) {
                    var i = l.w / t.w
                      , r = {
                        x: de.x,
                        y: de.y
                    }
                      , s = v
                      , a = se
                      , c = function(t) {
                        1 === t ? (v = i,
                        de.x = l.x,
                        de.y = l.y - O) : (v = (i - s) * t + s,
                        de.x = (l.x - r.x) * t + r.x,
                        de.y = (l.y - O - r.y) * t + r.y),
                        ke(),
                        p ? e.style.opacity = 1 - t : _e(a - t * a)
                    };
                    f ? $e("initialZoom", 0, 1, d, o.easing.cubic.out, c, h) : (c(1),
                    Ot = setTimeout(h, d + 20))
                } else
                    v = t.initialZoomLevel,
                    Le(de, t.initialPosition),
                    ke(),
                    _e(1),
                    p ? e.style.opacity = 1 : _e(1),
                    Ot = setTimeout(h, d + 20)
            }
            ), n ? 25 : 90)
        }, Bt = {}, Ht = [], Zt = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function() {
                return Nt.length
            }
        }, Xt = function(e, t, i) {
            if (e.src && !e.loadError) {
                var n = !i;
                if (n && (e.vGap || (e.vGap = {
                    top: 0,
                    bottom: 0
                }),
                ze("parseVerticalMargin", e)),
                Bt.x = t.x,
                Bt.y = t.y - e.vGap.top - e.vGap.bottom,
                n) {
                    var o = Bt.x / e.w
                      , r = Bt.y / e.h;
                    e.fitRatio = o < r ? o : r;
                    var a = s.scaleMode;
                    "orig" === a ? i = 1 : "fit" === a ? i = e.fitRatio : "zoom" === a && (i = Math.max(e.initialZoomLevel || 1, e.fitRatio)),
                    i > 1 && (i = 1),
                    e.initialZoomLevel = i,
                    e.bounds || (e.bounds = {
                        center: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 0,
                            y: 0
                        },
                        min: {
                            x: 0,
                            y: 0
                        }
                    })
                }
                if (!i)
                    return;
                return function(e, t, i) {
                    var n = e.bounds;
                    n.center.x = Math.round((Bt.x - t) / 2),
                    n.center.y = Math.round((Bt.y - i) / 2) + e.vGap.top,
                    n.max.x = t > Bt.x ? Math.round(Bt.x - t) : n.center.x,
                    n.max.y = i > Bt.y ? Math.round(Bt.y - i) + e.vGap.top : n.center.y,
                    n.min.x = t > Bt.x ? 0 : n.center.x,
                    n.min.y = i > Bt.y ? e.vGap.top : n.center.y
                }(e, e.w * i, e.h * i),
                n && i === e.initialZoomLevel && (e.initialPosition = e.bounds.center),
                e.bounds
            }
            return e.w = e.h = 0,
            e.initialZoomLevel = e.fitRatio = 1,
            e.bounds = {
                center: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 0,
                    y: 0
                },
                min: {
                    x: 0,
                    y: 0
                }
            },
            e.initialPosition = e.bounds.center,
            e.bounds
        }, Gt = function(e, t, i, n, o, s) {
            t.loadError || n && (t.imageAppended = !0,
            $t(t, n, t === r.currItem && we),
            i.appendChild(n),
            s && setTimeout((function() {
                t && t.loaded && t.placeholder && (t.placeholder.style.display = "none",
                t.placeholder = null)
            }
            ), 500))
        }, Kt = function(e) {
            e.loading = !0,
            e.loaded = !1;
            var t = e.img = o.createEl("pswp__img", "img")
              , i = function() {
                e.loading = !1,
                e.loaded = !0,
                e.loadComplete ? e.loadComplete(e) : e.img = null,
                t.onload = t.onerror = null,
                t = null
            };
            return t.onload = i,
            t.onerror = function() {
                e.loadError = !0,
                i()
            }
            ,
            t.src = e.src,
            t
        }, Yt = function(e, t) {
            if (e.src && e.loadError && e.container)
                return t && (e.container.innerHTML = ""),
                e.container.innerHTML = s.errorMsg.replace("%url%", e.src),
                !0
        }, $t = function(e, t, i) {
            if (e.src) {
                t || (t = e.container.lastChild);
                var n = i ? e.w : Math.round(e.w * e.fitRatio)
                  , o = i ? e.h : Math.round(e.h * e.fitRatio);
                e.placeholder && !e.loaded && (e.placeholder.style.width = n + "px",
                e.placeholder.style.height = o + "px"),
                t.style.width = n + "px",
                t.style.height = o + "px"
            }
        }, Vt = function() {
            if (Ht.length) {
                for (var e, t = 0; t < Ht.length; t++)
                    (e = Ht[t]).holder.index === e.index && Gt(e.index, e.item, e.baseDiv, e.img, 0, e.clearPlaceholder);
                Ht = []
            }
        };
        xe("Controller", {
            publicMethods: {
                lazyLoadItem: function(e) {
                    e = Ce(e);
                    var t = Ut(e);
                    t && (!t.loaded && !t.loading || x) && (ze("gettingData", e, t),
                    t.src && Kt(t))
                },
                initController: function() {
                    o.extend(s, Zt, !0),
                    r.items = Nt = i,
                    Ut = r.getItemAt,
                    jt = s.getNumItemsFn,
                    s.loop,
                    jt() < 3 && (s.loop = !1),
                    Se("beforeChange", (function(e) {
                        var t, i = s.preload, n = null === e || e >= 0, o = Math.min(i[0], jt()), a = Math.min(i[1], jt());
                        for (t = 1; t <= (n ? a : o); t++)
                            r.lazyLoadItem(u + t);
                        for (t = 1; t <= (n ? o : a); t++)
                            r.lazyLoadItem(u - t)
                    }
                    )),
                    Se("initialLayout", (function() {
                        r.currItem.initialLayout = s.getThumbBoundsFn && s.getThumbBoundsFn(u)
                    }
                    )),
                    Se("mainScrollAnimComplete", Vt),
                    Se("initialZoomInEnd", Vt),
                    Se("destroy", (function() {
                        for (var e, t = 0; t < Nt.length; t++)
                            (e = Nt[t]).container && (e.container = null),
                            e.placeholder && (e.placeholder = null),
                            e.img && (e.img = null),
                            e.preloader && (e.preloader = null),
                            e.loadError && (e.loaded = e.loadError = !1);
                        Ht = null
                    }
                    ))
                },
                getItemAt: function(e) {
                    return e >= 0 && (void 0 !== Nt[e] && Nt[e])
                },
                allowProgressiveImg: function() {
                    return s.forceProgressiveLoading || !I || s.mouseUsed || screen.width > 1200
                },
                setContent: function(e, t) {
                    s.loop && (t = Ce(t));
                    var i = r.getItemAt(e.index);
                    i && (i.container = null);
                    var n, l = r.getItemAt(t);
                    if (l) {
                        ze("gettingData", t, l),
                        e.index = t,
                        e.item = l;
                        var c = l.container = o.createEl("pswp__zoom-wrap");
                        if (!l.src && l.html && (l.html.tagName ? c.appendChild(l.html) : c.innerHTML = l.html),
                        Yt(l),
                        Xt(l, he),
                        !l.src || l.loadError || l.loaded)
                            l.src && !l.loadError && ((n = o.createEl("pswp__img", "img")).style.opacity = 1,
                            n.src = l.src,
                            $t(l, n),
                            Gt(0, l, c, n));
                        else {
                            if (l.loadComplete = function(i) {
                                if (a) {
                                    if (e && e.index === t) {
                                        if (Yt(i, !0))
                                            return i.loadComplete = i.img = null,
                                            Xt(i, he),
                                            Ie(i),
                                            void (e.index === u && r.updateCurrZoomItem());
                                        i.imageAppended ? !Wt && i.placeholder && (i.placeholder.style.display = "none",
                                        i.placeholder = null) : N.transform && (ie || Wt) ? Ht.push({
                                            item: i,
                                            baseDiv: c,
                                            img: i.img,
                                            index: t,
                                            holder: e,
                                            clearPlaceholder: !0
                                        }) : Gt(0, i, c, i.img, 0, !0)
                                    }
                                    i.loadComplete = null,
                                    i.img = null,
                                    ze("imageLoadComplete", t, i)
                                }
                            }
                            ,
                            o.features.transform) {
                                var d = "pswp__img pswp__img--placeholder";
                                d += l.msrc ? "" : " pswp__img--placeholder--blank";
                                var h = o.createEl(d, l.msrc ? "img" : "");
                                l.msrc && (h.src = l.msrc),
                                $t(l, h),
                                c.appendChild(h),
                                l.placeholder = h
                            }
                            l.loading || Kt(l),
                            r.allowProgressiveImg() && (!Rt && N.transform ? Ht.push({
                                item: l,
                                baseDiv: c,
                                img: l.img,
                                index: t,
                                holder: e
                            }) : Gt(0, l, c, l.img, 0, !0))
                        }
                        Rt || t !== u ? Ie(l) : (te = c.style,
                        qt(l, n || l.img)),
                        e.el.innerHTML = "",
                        e.el.appendChild(c)
                    } else
                        e.el.innerHTML = ""
                },
                cleanSlide: function(e) {
                    e.img && (e.img.onload = e.img.onerror = null),
                    e.loaded = e.loading = e.img = e.imageAppended = !1
                }
            }
        });
        var Jt, Qt, ei = {}, ti = function(e, t, i) {
            var n = document.createEvent("CustomEvent")
              , o = {
                origEvent: e,
                target: e.target,
                releasePoint: t,
                pointerType: i || "touch"
            };
            n.initCustomEvent("pswpTap", !0, !0, o),
            e.target.dispatchEvent(n)
        };
        xe("Tap", {
            publicMethods: {
                initTap: function() {
                    Se("firstTouchStart", r.onTapStart),
                    Se("touchRelease", r.onTapRelease),
                    Se("destroy", (function() {
                        ei = {},
                        Jt = null
                    }
                    ))
                },
                onTapStart: function(e) {
                    e.length > 1 && (clearTimeout(Jt),
                    Jt = null)
                },
                onTapRelease: function(e, t) {
                    var i, n;
                    if (t && (!K && !X && !Xe)) {
                        var r = t;
                        if (Jt && (clearTimeout(Jt),
                        Jt = null,
                        i = r,
                        n = ei,
                        Math.abs(i.x - n.x) < 25 && Math.abs(i.y - n.y) < 25))
                            return void ze("doubleTap", r);
                        if ("mouse" === t.type)
                            return void ti(e, t, "mouse");
                        if ("BUTTON" === e.target.tagName.toUpperCase() || o.hasClass(e.target, "pswp__single-tap"))
                            return void ti(e, t);
                        Le(ei, r),
                        Jt = setTimeout((function() {
                            ti(e, t),
                            Jt = null
                        }
                        ), 300)
                    }
                }
            }
        }),
        xe("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    F || (I ? Se("mouseUsed", (function() {
                        r.setupDesktopZoom()
                    }
                    )) : r.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(t) {
                    Qt = {};
                    var i = "wheel mousewheel DOMMouseScroll";
                    Se("bindEvents", (function() {
                        o.bind(e, i, r.handleMouseWheel)
                    }
                    )),
                    Se("unbindEvents", (function() {
                        Qt && o.unbind(e, i, r.handleMouseWheel)
                    }
                    )),
                    r.mouseZoomedIn = !1;
                    var n, s = function() {
                        r.mouseZoomedIn && (o.removeClass(e, "pswp--zoomed-in"),
                        r.mouseZoomedIn = !1),
                        v < 1 ? o.addClass(e, "pswp--zoom-allowed") : o.removeClass(e, "pswp--zoom-allowed"),
                        a()
                    }, a = function() {
                        n && (o.removeClass(e, "pswp--dragging"),
                        n = !1)
                    };
                    Se("resize", s),
                    Se("afterChange", s),
                    Se("pointerDown", (function() {
                        r.mouseZoomedIn && (n = !0,
                        o.addClass(e, "pswp--dragging"))
                    }
                    )),
                    Se("pointerUp", a),
                    t || s()
                },
                handleMouseWheel: function(e) {
                    if (v <= r.currItem.fitRatio)
                        return s.modal && (!s.closeOnScroll || Xe || Z ? e.preventDefault() : A && Math.abs(e.deltaY) > 2 && (c = !0,
                        r.close())),
                        !0;
                    if (e.stopPropagation(),
                    Qt.x = 0,
                    "deltaX"in e)
                        1 === e.deltaMode ? (Qt.x = 18 * e.deltaX,
                        Qt.y = 18 * e.deltaY) : (Qt.x = e.deltaX,
                        Qt.y = e.deltaY);
                    else if ("wheelDelta"in e)
                        e.wheelDeltaX && (Qt.x = -.16 * e.wheelDeltaX),
                        e.wheelDeltaY ? Qt.y = -.16 * e.wheelDeltaY : Qt.y = -.16 * e.wheelDelta;
                    else {
                        if (!("detail"in e))
                            return;
                        Qt.y = e.detail
                    }
                    Re(v, !0);
                    var t = de.x - Qt.x
                      , i = de.y - Qt.y;
                    (s.modal || t <= ee.min.x && t >= ee.max.x && i <= ee.min.y && i >= ee.max.y) && e.preventDefault(),
                    r.panTo(t, i)
                },
                toggleDesktopZoom: function(t) {
                    t = t || {
                        x: he.x / 2 + pe.x,
                        y: he.y / 2 + pe.y
                    };
                    var i = s.getDoubleTapZoom(!0, r.currItem)
                      , n = v === i;
                    r.mouseZoomedIn = !n,
                    r.zoomTo(n ? r.currItem.initialZoomLevel : i, t, 333),
                    o[(n ? "remove" : "add") + "Class"](e, "pswp--zoomed-in")
                }
            }
        }),
        o.extend(r, Ve)
    }
}
)),
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipeUI_Default = t()
}(this, (function() {
    "use strict";
    return function(e, t) {
        var i, n, o, r, s, a, l, c, u, d, h, f, p, m, v, g, y, b, w = this, x = !1, C = !0, E = !0, S = {
            barsSize: {
                top: 44,
                bottom: "auto"
            },
            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
            timeToIdle: 4e3,
            timeToIdleOutside: 1e3,
            loadingIndicatorDelay: 1e3,
            addCaptionHTMLFn: function(e, t) {
                return e.title ? (t.children[0].innerHTML = e.title,
                !0) : (t.children[0].innerHTML = "",
                !1)
            },
            closeEl: !0,
            captionEl: !0,
            fullscreenEl: !0,
            zoomEl: !0,
            shareEl: !0,
            counterEl: !0,
            arrowEl: !0,
            preloaderEl: !0,
            tapToClose: !1,
            tapToToggleControls: !0,
            clickToCloseNonZoomable: !0,
            shareButtons: [{
                id: "facebook",
                label: "Share on Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
            }, {
                id: "twitter",
                label: "Tweet",
                url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
            }, {
                id: "pinterest",
                label: "Pin it",
                url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
            }, {
                id: "download",
                label: "Download image",
                url: "{{raw_image_url}}",
                download: !0
            }],
            getImageURLForShare: function() {
                return e.currItem.src || ""
            },
            getPageURLForShare: function() {
                return window.location.href
            },
            getTextForShare: function() {
                return e.currItem.title || ""
            },
            indexIndicatorSep: " / ",
            fitControlsWidth: 1200
        }, z = function(e) {
            if (g)
                return !0;
            e = e || window.event,
            v.timeToIdle && v.mouseUsed && !u && F();
            for (var i, n, o = (e.target || e.srcElement).getAttribute("class") || "", r = 0; r < W.length; r++)
                (i = W[r]).onTap && o.indexOf("pswp__" + i.name) > -1 && (i.onTap(),
                n = !0);
            if (n) {
                e.stopPropagation && e.stopPropagation(),
                g = !0;
                var s = t.features.isOldAndroid ? 600 : 30;
                setTimeout((function() {
                    g = !1
                }
                ), s)
            }
        }, D = function() {
            return !e.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
        }, _ = function(e, i, n) {
            t[(n ? "add" : "remove") + "Class"](e, "pswp__" + i)
        }, A = function() {
            var e = 1 === v.getNumItemsFn();
            e !== m && (_(n, "ui--one-slide", e),
            m = e)
        }, k = function() {
            _(l, "share-modal--hidden", E)
        }, I = function() {
            return (E = !E) ? (t.removeClass(l, "pswp__share-modal--fade-in"),
            setTimeout((function() {
                E && k()
            }
            ), 300)) : (k(),
            setTimeout((function() {
                E || t.addClass(l, "pswp__share-modal--fade-in")
            }
            ), 30)),
            E || P(),
            !1
        }, T = function(t) {
            var i = (t = t || window.event).target || t.srcElement;
            return e.shout("shareLinkClick", t, i),
            !(!i.href || !i.hasAttribute("download") && (window.open(i.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)),
            E || I(),
            1))
        }, P = function() {
            for (var e, t, i, n, o = "", r = 0; r < v.shareButtons.length; r++)
                e = v.shareButtons[r],
                t = v.getImageURLForShare(e),
                i = v.getPageURLForShare(e),
                n = v.getTextForShare(e),
                o += '<a href="' + e.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(t)).replace("{{raw_image_url}}", t).replace("{{text}}", encodeURIComponent(n)) + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>",
                v.parseShareButtonOut && (o = v.parseShareButtonOut(e, o));
            l.children[0].innerHTML = o,
            l.children[0].onclick = T
        }, M = function(e) {
            for (var i = 0; i < v.closeElClasses.length; i++)
                if (t.hasClass(e, "pswp__" + v.closeElClasses[i]))
                    return !0
        }, L = 0, F = function() {
            clearTimeout(b),
            L = 0,
            u && w.setIdle(!1)
        }, O = function(e) {
            var t = (e = e || window.event).relatedTarget || e.toElement;
            t && "HTML" !== t.nodeName || (clearTimeout(b),
            b = setTimeout((function() {
                w.setIdle(!0)
            }
            ), v.timeToIdleOutside))
        }, N = function(e) {
            f !== e && (_(h, "preloader--active", !e),
            f = e)
        }, R = function(e) {
            var i = e.vGap;
            if (D()) {
                var s = v.barsSize;
                if (v.captionEl && "auto" === s.bottom)
                    if (r || ((r = t.createEl("pswp__caption pswp__caption--fake")).appendChild(t.createEl("pswp__caption__center")),
                    n.insertBefore(r, o),
                    t.addClass(n, "pswp__ui--fit")),
                    v.addCaptionHTMLFn(e, r, !0)) {
                        var a = r.clientHeight;
                        i.bottom = parseInt(a, 10) || 44
                    } else
                        i.bottom = s.top;
                else
                    i.bottom = "auto" === s.bottom ? 0 : s.bottom;
                i.top = s.top
            } else
                i.top = i.bottom = 0
        }, W = [{
            name: "caption",
            option: "captionEl",
            onInit: function(e) {
                o = e
            }
        }, {
            name: "share-modal",
            option: "shareEl",
            onInit: function(e) {
                l = e
            },
            onTap: function() {
                I()
            }
        }, {
            name: "button--share",
            option: "shareEl",
            onInit: function(e) {
                a = e
            },
            onTap: function() {
                I()
            }
        }, {
            name: "button--zoom",
            option: "zoomEl",
            onTap: e.toggleDesktopZoom
        }, {
            name: "counter",
            option: "counterEl",
            onInit: function(e) {
                s = e
            }
        }, {
            name: "button--close",
            option: "closeEl",
            onTap: e.close
        }, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: e.prev
        }, {
            name: "button--arrow--right",
            option: "arrowEl",
            onTap: e.next
        }, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function() {
                i.isFullscreen() ? i.exit() : i.enter()
            }
        }, {
            name: "preloader",
            option: "preloaderEl",
            onInit: function(e) {
                h = e
            }
        }];
        w.init = function() {
            t.extend(e.options, S, !0),
            v = e.options,
            n = t.getChildByClass(e.scrollWrap, "pswp__ui"),
            d = e.listen,
            function() {
                var e;
                d("onVerticalDrag", (function(e) {
                    C && e < .95 ? w.hideControls() : !C && e >= .95 && w.showControls()
                }
                )),
                d("onPinchClose", (function(t) {
                    C && t < .9 ? (w.hideControls(),
                    e = !0) : e && !C && t > .9 && w.showControls()
                }
                )),
                d("zoomGestureEnded", (function() {
                    (e = !1) && !C && w.showControls()
                }
                ))
            }(),
            d("beforeChange", w.update),
            d("doubleTap", (function(t) {
                var i = e.currItem.initialZoomLevel;
                e.getZoomLevel() !== i ? e.zoomTo(i, t, 333) : e.zoomTo(v.getDoubleTapZoom(!1, e.currItem), t, 333)
            }
            )),
            d("preventDragEvent", (function(e, t, i) {
                var n = e.target || e.srcElement;
                n && n.getAttribute("class") && e.type.indexOf("mouse") > -1 && (n.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent = !1)
            }
            )),
            d("bindEvents", (function() {
                t.bind(n, "pswpTap click", z),
                t.bind(e.scrollWrap, "pswpTap", w.onGlobalTap),
                e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", w.onMouseOver)
            }
            )),
            d("unbindEvents", (function() {
                E || I(),
                y && clearInterval(y),
                t.unbind(document, "mouseout", O),
                t.unbind(document, "mousemove", F),
                t.unbind(n, "pswpTap click", z),
                t.unbind(e.scrollWrap, "pswpTap", w.onGlobalTap),
                t.unbind(e.scrollWrap, "mouseover", w.onMouseOver),
                i && (t.unbind(document, i.eventK, w.updateFullscreen),
                i.isFullscreen() && (v.hideAnimationDuration = 0,
                i.exit()),
                i = null)
            }
            )),
            d("destroy", (function() {
                v.captionEl && (r && n.removeChild(r),
                t.removeClass(o, "pswp__caption--empty")),
                l && (l.children[0].onclick = null),
                t.removeClass(n, "pswp__ui--over-close"),
                t.addClass(n, "pswp__ui--hidden"),
                w.setIdle(!1)
            }
            )),
            v.showAnimationDuration || t.removeClass(n, "pswp__ui--hidden"),
            d("initialZoomIn", (function() {
                v.showAnimationDuration && t.removeClass(n, "pswp__ui--hidden")
            }
            )),
            d("initialZoomOut", (function() {
                t.addClass(n, "pswp__ui--hidden")
            }
            )),
            d("parseVerticalMargin", R),
            function() {
                var e, i, o, r = function(n) {
                    if (n)
                        for (var r = n.length, s = 0; s < r; s++) {
                            e = n[s],
                            i = e.className;
                            for (var a = 0; a < W.length; a++)
                                o = W[a],
                                i.indexOf("pswp__" + o.name) > -1 && (v[o.option] ? (t.removeClass(e, "pswp__element--disabled"),
                                o.onInit && o.onInit(e)) : t.addClass(e, "pswp__element--disabled"))
                        }
                };
                r(n.children);
                var s = t.getChildByClass(n, "pswp__top-bar");
                s && r(s.children)
            }(),
            v.shareEl && a && l && (E = !0),
            A(),
            v.timeToIdle && d("mouseUsed", (function() {
                t.bind(document, "mousemove", F),
                t.bind(document, "mouseout", O),
                y = setInterval((function() {
                    2 == ++L && w.setIdle(!0)
                }
                ), v.timeToIdle / 2)
            }
            )),
            v.fullscreenEl && !t.features.isOldAndroid && (i || (i = w.getFullscreenAPI()),
            i ? (t.bind(document, i.eventK, w.updateFullscreen),
            w.updateFullscreen(),
            t.addClass(e.template, "pswp--supports-fs")) : t.removeClass(e.template, "pswp--supports-fs")),
            v.preloaderEl && (N(!0),
            d("beforeChange", (function() {
                clearTimeout(p),
                p = setTimeout((function() {
                    e.currItem && e.currItem.loading ? (!e.allowProgressiveImg() || e.currItem.img && !e.currItem.img.naturalWidth) && N(!1) : N(!0)
                }
                ), v.loadingIndicatorDelay)
            }
            )),
            d("imageLoadComplete", (function(t, i) {
                e.currItem === i && N(!0)
            }
            )))
        }
        ,
        w.setIdle = function(e) {
            u = e,
            _(n, "ui--idle", e)
        }
        ,
        w.update = function() {
            C && e.currItem ? (w.updateIndexIndicator(),
            v.captionEl && (v.addCaptionHTMLFn(e.currItem, o),
            _(o, "caption--empty", !e.currItem.title)),
            x = !0) : x = !1,
            E || I(),
            A()
        }
        ,
        w.updateFullscreen = function(n) {
            n && setTimeout((function() {
                e.setScrollOffset(0, t.getScrollY())
            }
            ), 50),
            t[(i.isFullscreen() ? "add" : "remove") + "Class"](e.template, "pswp--fs")
        }
        ,
        w.updateIndexIndicator = function() {
            v.counterEl && (s.innerHTML = e.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
        }
        ,
        w.onGlobalTap = function(i) {
            var n = (i = i || window.event).target || i.srcElement;
            if (!g)
                if (i.detail && "mouse" === i.detail.pointerType) {
                    if (M(n))
                        return void e.close();
                    t.hasClass(n, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? v.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(i.detail.releasePoint))
                } else if (v.tapToToggleControls && (C ? w.hideControls() : w.showControls()),
                v.tapToClose && (t.hasClass(n, "pswp__img") || M(n)))
                    return void e.close()
        }
        ,
        w.onMouseOver = function(e) {
            var t = (e = e || window.event).target || e.srcElement;
            _(n, "ui--over-close", M(t))
        }
        ,
        w.hideControls = function() {
            t.addClass(n, "pswp__ui--hidden"),
            C = !1
        }
        ,
        w.showControls = function() {
            C = !0,
            x || w.update(),
            t.removeClass(n, "pswp__ui--hidden")
        }
        ,
        w.supportsFullscreen = function() {
            var e = document;
            return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen)
        }
        ,
        w.getFullscreenAPI = function() {
            var t, i = document.documentElement, n = "fullscreenchange";
            return i.requestFullscreen ? t = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: n
            } : i.mozRequestFullScreen ? t = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + n
            } : i.webkitRequestFullscreen ? t = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + n
            } : i.msRequestFullscreen && (t = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }),
            t && (t.enter = function() {
                return c = v.closeOnScroll,
                v.closeOnScroll = !1,
                "webkitRequestFullscreen" !== this.enterK ? e.template[this.enterK]() : void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }
            ,
            t.exit = function() {
                return v.closeOnScroll = c,
                document[this.exitK]()
            }
            ,
            t.isFullscreen = function() {
                return document[this.elementK]
            }
            ),
            t
        }
    }
}
));
