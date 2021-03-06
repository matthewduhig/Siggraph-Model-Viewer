function webgl_detect(a) {
  if (window.WebGLRenderingContext) {
    for (var b = document.createElement("canvas"), c = ["webgl",
        "experimental-webgl", "moz-webgl", "webkit-3d"
      ], d = !1, e = 0; 4 > e; e++) try {
      if (d = b.getContext(c[e]), d && "function" == typeof d.getParameter)
        return deviceSettings.isWebGl = !0, a ? {
          name: c[e],
          gl: d
        } : !0
    } catch (f) {}
    return deviceSettings.isWebGl = !1, !1
  }
  return deviceSettings.isWebGl = !1, !1
}

(function(a) {
  "use strict";
  var b = a.GreenSockGlobals || a;
  if (!b.TweenLite) {
    var c, d, e, f, g, h = function(a) {
        var c, d = a.split("."),
          e = b;
        for (c = 0; d.length > c; c++) e[d[c]] = e = e[d[c]] || {};
        return e
      },
      i = h("com.greensock"),
      j = 1e-10,
      k = [].slice,
      l = function() {},
      m = function() {
        var a = Object.prototype.toString,
          b = a.call([]);
        return function(c) {
          return null != c && (c instanceof Array || "object" == typeof c &&
            !!c.push && a.call(c) === b)
        }
      }(),
      n = {},
      o = function(c, d, e, f) {
        this.sc = n[c] ? n[c].sc : [], n[c] = this, this.gsClass = null, this
          .func =
          e;
        var g = [];
        this.check = function(i) {
          for (var j, k, l, m, p = d.length, q = p; --p > -1;)(j = n[d[p]] ||
              new o(d[p], [])).gsClass ? (g[p] = j.gsClass, q--) : i && j.sc
            .push(
              this);
          if (0 === q && e)
            for (k = ("com.greensock." + c).split("."), l = k.pop(), m = h(
                k.join(
                  "."))[l] = this.gsClass = e.apply(e, g), f && (b[l] = m,
                "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ?
                    a.GreenSockAMDPath + "/" : "") + c.split(".").join("/"), [],
                  function() {
                    return m
                  }) : "undefined" != typeof module && module.exports && (
                  module.exports = m)), p = 0; this.sc.length > p; p++) this
              .sc[
                p].check()
        }, this.check(!0)
      },
      p = a._gsDefine = function(a, b, c, d) {
        return new o(a, b, c, d)
      },
      q = i._class = function(a, b, c) {
        return b = b || function() {}, p(a, [], function() {
          return b
        }, c), b
      };
    p.globals = b;
    var r = [0, 0, 1, 1],
      s = [],
      t = q("easing.Ease", function(a, b, c, d) {
        this._func = a, this._type = c || 0, this._power = d || 0, this._params =
          b ? r.concat(b) : r
      }, !0),
      u = t.map = {},
      v = t.register = function(a, b, c, d) {
        for (var e, f, g, h, j = b.split(","), k = j.length, l = (c ||
            "easeIn,easeOut,easeInOut").split(","); --k > -1;)
          for (f = j[k], e = d ? q("easing." + f, null, !0) : i.easing[f] || {},
            g = l.length; --g > -1;) h = l[g], u[f + "." + h] = u[h + f] = e[
              h] =
            a.getRatio ? a : a[h] || new a
      };
    for (e = t.prototype, e._calcEnd = !1, e.getRatio = function(a) {
        if (this._func) return this._params[0] = a, this._func.apply(null,
          this
          ._params);
        var b = this._type,
          c = this._power,
          d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
        return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d *
          d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d :
          .5 > a ? d / 2 : 1 - d / 2
      }, c = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], d = c.length; --
      d > -1;) e = c[d] + ",Power" + d, v(new t(null, null, 1, d), e,
      "easeOut", !
      0), v(new t(null, null, 2, d), e, "easeIn" + (0 === d ? ",easeNone" :
      "")), v(new t(null, null, 3, d), e, "easeInOut");
    u.linear = i.easing.Linear.easeIn, u.swing = i.easing.Quad.easeInOut;
    var w = q("events.EventDispatcher", function(a) {
      this._listeners = {}, this._eventTarget = a || this
    });
    e = w.prototype, e.addEventListener = function(a, b, c, d, e) {
      e = e || 0;
      var h, i, j = this._listeners[a],
        k = 0;
      for (null == j && (this._listeners[a] = j = []), i = j.length; --i >
        -1;)
        h = j[i], h.c === b && h.s === c ? j.splice(i, 1) : 0 === k && e >
        h.pr &&
        (k = i + 1);
      j.splice(k, 0, {
        c: b,
        s: c,
        up: d,
        pr: e
      }), this !== f || g || f.wake()
    }, e.removeEventListener = function(a, b) {
      var c, d = this._listeners[a];
      if (d)
        for (c = d.length; --c > -1;)
          if (d[c].c === b) return d.splice(c, 1), void 0
    }, e.dispatchEvent = function(a) {
      var b, c, d, e = this._listeners[a];
      if (e)
        for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d.up ?
          d.c.call(d.s || c, {
            type: a,
            target: c
          }) : d.c.call(d.s || c)
    };
    var x = a.requestAnimationFrame,
      y = a.cancelAnimationFrame,
      z = Date.now || function() {
        return (new Date).getTime()
      },
      A = z();
    for (c = ["ms", "moz", "webkit", "o"], d = c.length; --d > -1 && !x;) x =
      a[
        c[d] + "RequestAnimationFrame"], y = a[c[d] + "CancelAnimationFrame"] ||
      a[c[d] + "CancelRequestAnimationFrame"];
    q("Ticker", function(a, b) {
        var c, d, e, h, i, j = this,
          k = z(),
          m = b !== !1 && x,
          n = function(a) {
            A = z(), j.time = (A - k) / 1e3;
            var b, f = j.time - i;
            (!c || f > 0 || a === !0) && (j.frame++, i += f + (f >= h ? .004 :
              h - f), b = !0), a !== !0 && (e = d(n)), b && j.dispatchEvent(
              "tick")
          };
        w.call(j), j.time = j.frame = 0, j.tick = function() {
          n(!0)
        }, j.sleep = function() {
          null != e && (m && y ? y(e) : clearTimeout(e), d = l, e = null,
            j ===
            f && (g = !1))
        }, j.wake = function() {
          null !== e && j.sleep(), d = 0 === c ? l : m && x ? x :
            function(
              a) {
              return setTimeout(a, 0 | 1e3 * (i - j.time) + 1)
            }, j === f && (g = !0), n(2)
        }, j.fps = function(a) {
          return arguments.length ? (c = a, h = 1 / (c || 60), i = this.time +
            h, j.wake(), void 0) : c
        }, j.useRAF = function(a) {
          return arguments.length ? (j.sleep(), m = a, j.fps(c), void 0) :
            m
        }, j.fps(a), setTimeout(function() {
          m && (!e || 5 > j.frame) && j.useRAF(!1)
        }, 1500)
      }), e = i.Ticker.prototype = new i.events.EventDispatcher, e.constructor =
      i.Ticker;
    var B = q("core.Animation", function(a, b) {
      if (this.vars = b = b || {}, this._duration = this._totalDuration =
        a ||
        0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active =
        b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed ===
        !0, O) {
        g || f.wake();
        var c = this.vars.useFrames ? N : O;
        c.add(this, c._time), this.vars.paused && this.paused(!0)
      }
    });
    f = B.ticker = new i.Ticker, e = B.prototype, e._dirty = e._gc = e._initted =
      e._paused = !1, e._totalTime = e._time = 0, e._rawPrevTime = -1, e._next =
      e._last = e._onUpdate = e._timeline = e.timeline = null, e._paused = !1;
    var C = function() {
      g && z() - A > 2e3 && f.wake(), setTimeout(C, 2e3)
    };
    C(), e.play = function(a, b) {
      return arguments.length && this.seek(a, b), this.reversed(!1).paused(!
        1)
    }, e.pause = function(a, b) {
      return arguments.length && this.seek(a, b), this.paused(!0)
    }, e.resume = function(a, b) {
      return arguments.length && this.seek(a, b), this.paused(!1)
    }, e.seek = function(a, b) {
      return this.totalTime(Number(a), b !== !1)
    }, e.restart = function(a, b) {
      return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !==
        !1, !0)
    }, e.reverse = function(a, b) {
      return arguments.length && this.seek(a || this.totalDuration(), b),
        this.reversed(!0).paused(!1)
    }, e.render = function() {}, e.invalidate = function() {
      return this
    }, e.isActive = function() {
      var a, b = this._timeline,
        c = this._startTime;
      return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >=
        c && c + this.totalDuration() / this._timeScale > a
    }, e._enabled = function(a, b) {
      return g || f.wake(), this._gc = !a, this._active = this.isActive(),
        b !==
        !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime -
          this._delay) : !a && this.timeline && this._timeline._remove(
          this, !
          0)), !1
    }, e._kill = function() {
      return this._enabled(!1, !1)
    }, e.kill = function(a, b) {
      return this._kill(a, b), this
    }, e._uncache = function(a) {
      for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
      return this
    }, e._swapSelfInParams = function(a) {
      for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] &&
        (c[b] = this);
      return c
    }, e.eventCallback = function(a, b, c, d) {
      if ("on" === (a || "").substr(0, 2)) {
        var e = this.vars;
        if (1 === arguments.length) return e[a];
        null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = m(c) && -1 !==
          c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[
            a +
            "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
      }
      return this
    }, e.delay = function(a) {
      return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(
          this._startTime + a - this._delay), this._delay = a, this) : this
        ._delay
    }, e.duration = function(a) {
      return arguments.length ? (this._duration = this._totalDuration = a,
        this._uncache(!0), this._timeline.smoothChildTiming && this._time >
        0 && this._time < this._duration && 0 !== a && this.totalTime(
          this._totalTime *
          (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
    }, e.totalDuration = function(a) {
      return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
    }, e.time = function(a, b) {
      return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(
        a > this._duration ? this._duration : a, b)) : this._time
    }, e.totalTime = function(a, b, c) {
      if (g || f.wake(), !arguments.length) return this._totalTime;
      if (this._timeline) {
        if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
          this._dirty && this.totalDuration();
          var d = this._totalDuration,
            e = this._timeline;
          if (a > d && !c && (a = d), this._startTime = (this._paused ?
              this._pauseTime :
              e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty ||
            this._uncache(!1), e._timeline)
            for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) /
              e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
        }
        this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 ===
          this._duration) && this.render(a, b, !1)
      }
      return this
    }, e.progress = e.totalProgress = function(a, b) {
      return arguments.length ? this.totalTime(this.duration() * a, b) :
        this
        ._time / this.duration()
    }, e.startTime = function(a) {
      return arguments.length ? (a !== this._startTime && (this._startTime =
        a, this.timeline && this.timeline._sortChildren && this.timeline
        .add(
          this, a - this._delay)), this) : this._startTime
    }, e.timeScale = function(a) {
      if (!arguments.length) return this._timeScale;
      if (a = a || j, this._timeline && this._timeline.smoothChildTiming) {
        var b = this._pauseTime,
          c = b || 0 === b ? b : this._timeline.totalTime();
        this._startTime = c - (c - this._startTime) * this._timeScale / a
      }
      return this._timeScale = a, this._uncache(!1)
    }, e.reversed = function(a) {
      return arguments.length ? (a != this._reversed && (this._reversed = a,
          this.totalTime(this._timeline && !this._timeline.smoothChildTiming ?
            this.totalDuration() - this._totalTime : this._totalTime, !0)
        ),
        this) : this._reversed
    }, e.paused = function(a) {
      if (!arguments.length) return this._paused;
      if (a != this._paused && this._timeline) {
        g || a || f.wake();
        var b = this._timeline,
          c = b.rawTime(),
          d = c - this._pauseTime;
        !a && b.smoothChildTiming && (this._startTime += d, this._uncache(!
            1)),
          this._pauseTime = a ? c : null, this._paused = a, this._active =
          this.isActive(), !a && 0 !== d && this._initted && this.duration() &&
          this.render(b.smoothChildTiming ? this._totalTime : (c - this._startTime) /
            this._timeScale, !0, !0)
      }
      return this._gc && !a && this._enabled(!0, !1), this
    };
    var D = q("core.SimpleTimeline", function(a) {
      B.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !
        0
    });
    e = D.prototype = new B, e.constructor = D, e.kill()._gc = !1, e._first =
      e
      ._last = null, e._sortChildren = !1, e.add = e.insert = function(a, b) {
        var c, d;
        if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a
          ._timeline &&
          (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
          a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline =
          this, a._gc && a._enabled(!0, !0), c = this._last, this._sortChildren
        )
          for (d = a._startTime; c && c._startTime > d;) c = c._prev;
        return c ? (a._next = c._next, c._next = a) : (a._next = this._first,
            this._first = a), a._next ? a._next._prev = a : this._last = a, a
          ._prev =
          c, this._timeline && this._uncache(!0), this
      }, e._remove = function(a, b) {
        return a.timeline === this && (b || a._enabled(!1, !0), a.timeline =
            null, a._prev ? a._prev._next = a._next : this._first === a && (
              this._first = a._next), a._next ? a._next._prev = a._prev :
            this._last ===
            a && (this._last = a._prev), this._timeline && this._uncache(!0)),
          this
      }, e.render = function(a, b, c) {
        var d, e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (
          e._active || a >= e._startTime && !e._paused) && (e._reversed ? e
          .render(
            (e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) *
            e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale,
            b, c)), e = d
      }, e.rawTime = function() {
        return g || f.wake(), this._totalTime
      };
    var E = q("TweenLite", function(b, c, d) {
        if (B.call(this, c, d), this.render = E.prototype.render, null == b)
          throw "Cannot tween a null target.";
        this.target = b = "string" != typeof b ? b : E.selector(b) || b;
        var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] ===
            a || b[0].nodeType && b[0].style && !b.nodeType),
          i = this.vars.overwrite;
        if (this._overwrite = i = null == i ? M[E.defaultOverwrite] :
          "number" == typeof i ? i >> 0 : M[i], (h || b instanceof Array ||
            b
            .push && m(b)) && "number" != typeof b[0])
          for (this._targets = g = k.call(b, 0), this._propLookup = [],
            this._siblings = [],
            e = 0; g.length > e; e++) f = g[e], f ? "string" != typeof f ?
            f.length &&
            f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style &&
              !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(
              k.call(f, 0))) : (this._siblings[e] = P(f, this, !1), 1 === i &&
              this._siblings[e].length > 1 && Q(f, this, null, 1, this._siblings[
                e])) : (f = g[e--] = E.selector(f), "string" == typeof f &&
              g
              .splice(e + 1, 1)) : g.splice(e--, 1);
        else this._propLookup = {}, this._siblings = P(b, this, !1), 1 ===
          i &&
          this._siblings.length > 1 && Q(b, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars
          .immediateRender !== !1) && this.render(-this._delay, !1, !0)
      }, !0),
      F = function(b) {
        return b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType &&
          b[
            0].style && !b.nodeType)
      },
      G = function(a, b) {
        var c, d = {};
        for (c in a) L[c] || c in b && "x" !== c && "y" !== c && "width" !==
          c &&
          "height" !== c && "className" !== c && "border" !== c || !(!I[c] ||
            I[
              c] && I[c]._autoCSS) || (d[c] = a[c], delete a[c]);
        a.css = d
      };
    e = E.prototype = new B, e.constructor = E, e.kill()._gc = !1, e.ratio =
      0,
      e._firstPT = e._targets = e._overwrittenProps = e._startAt = null, e._notifyPluginsOfEnabled = !
      1, E.version = "1.11.4", E.defaultEase = e._ease = new t(null, null, 1,
        1),
      E.defaultOverwrite = "auto", E.ticker = f, E.autoSleep = !0, E.selector =
      a.$ || a.jQuery || function(b) {
        return a.$ ? (E.selector = a.$, a.$(b)) : a.document ? a.document.getElementById(
          "#" === b.charAt(0) ? b.substr(1) : b) : b
      };
    var H = E._internals = {
        isArray: m,
        isSelector: F
      },
      I = E._plugins = {},
      J = E._tweenLookup = {},
      K = 0,
      L = H.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1
      },
      M = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        "true": 1,
        "false": 0
      },
      N = B._rootFramesTimeline = new D,
      O = B._rootTimeline = new D;
    O._startTime = f.time, N._startTime = f.frame, O._active = N._active = !0,
      B._updateRoot = function() {
        if (O.render((f.time - O._startTime) * O._timeScale, !1, !1), N.render(
            (f.frame - N._startTime) * N._timeScale, !1, !1), !(f.frame % 120)) {
          var a, b, c;
          for (c in J) {
            for (b = J[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(
              a, 1);
            0 === b.length && delete J[c]
          }
          if (c = O._first, (!c || c._paused) && E.autoSleep && !N._first &&
            1 ===
            f._listeners.tick.length) {
            for (; c && c._paused;) c = c._next;
            c || f.sleep()
          }
        }
      }, f.addEventListener("tick", B._updateRoot);
    var P = function(a, b, c) {
        var d, e, f = a._gsTweenID;
        if (J[f || (a._gsTweenID = f = "t" + K++)] || (J[f] = {
            target: a,
            tweens: []
          }), b && (d = J[f].tweens, d[e = d.length] = b, c))
          for (; --e > -1;) d[e] === b && d.splice(e, 1);
        return J[f].tweens
      },
      Q = function(a, b, c, d, e) {
        var f, g, h, i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++)
            if ((h = e[f]) !== b) h._gc || h._enabled(!1, !1) && (g = !0);
            else if (5 === d) break;
          return g
        }
        var k, l = b._startTime + j,
          m = [],
          n = 0,
          o = 0 === b._duration;
        for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused ||
          (h._timeline !== b._timeline ? (k = k || R(b, 0, o), 0 === R(h, k,
                o) &&
              (m[n++] = h)) : l >= h._startTime && h._startTime + h.totalDuration() /
            h._timeScale > l && ((o || !h._initted) && 2e-10 >= l - h._startTime ||
              (m[n++] = h)));
        for (f = n; --f > -1;) h = m[f], 2 === d && h._kill(c, a) && (g = !0), (
          2 !== d || !h._firstPT && h._initted) && h._enabled(!1, !1) && (g = !
          0);
        return g
      },
      R = function(a, b, c) {
        for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
          if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
          d = d._timeline
        }
        return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * j >
          f -
          b ? j : (f += a.totalDuration() / a._timeScale / e) > b + j ? 0 : f -
          b - j
      };
    e._init = function() {
      var a, b, c, d, e = this.vars,
        f = this._overwrittenProps,
        g = this._duration,
        h = e.immediateRender,
        i = e.ease;
      if (e.startAt) {
        if (this._startAt && this._startAt.render(-1, !0), e.startAt.overwrite =
          0, e.startAt.immediateRender = !0, this._startAt = E.to(this.target,
            0, e.startAt), h)
          if (this._time > 0) this._startAt = null;
          else if (0 !== g) return
      } else if (e.runBackwards && 0 !== g)
        if (this._startAt) this._startAt.render(-1, !0), this._startAt =
          null;
        else {
          c = {};
          for (d in e) L[d] && "autoCSS" !== d || (c[d] = e[d]);
          if (c.overwrite = 0, c.data = "isFromStart", this._startAt = E.to(
              this.target, 0, c), e.immediateRender) {
            if (0 === this._time) return
          } else this._startAt.render(-1, !0)
        }
      if (this._ease = i ? i instanceof t ? e.easeParams instanceof Array ?
        i
        .config.apply(i, e.easeParams) : i : "function" == typeof i ? new t(
          i,
          e.easeParams) : u[i] || E.defaultEase : E.defaultEase, this._easeType =
        this._ease._type, this._easePower = this._ease._power, this._firstPT =
        null, this._targets)
        for (a = this._targets.length; --a > -1;) this._initProps(this._targets[
            a], this._propLookup[a] = {}, this._siblings[a], f ? f[a] :
          null) && (b = !0);
      else b = this._initProps(this.target, this._propLookup, this._siblings,
        f);
      if (b && E._onPluginEvent("_onInitAllProps", this), f && (this._firstPT ||
          "function" != typeof this.target && this._enabled(!1, !1)), e.runBackwards)
        for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
      this._onUpdate = e.onUpdate, this._initted = !0
    }, e._initProps = function(b, c, d, e) {
      var f, g, h, i, j, k;
      if (null == b) return !1;
      this.vars.css || b.style && b !== a && b.nodeType && I.css && this.vars
        .autoCSS !== !1 && G(this.vars, b);
      for (f in this.vars) {
        if (k = this.vars[f], L[f]) k && (k instanceof Array || k.push && m(
            k)) &&
          -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(
            k, this));
        else if (I[f] && (i = new I[f])._onInitTween(b, this.vars[f], this)) {
          for (this._firstPT = j = {
              _next: this._firstPT,
              t: i,
              p: "setRatio",
              s: 0,
              c: 1,
              f: !0,
              n: f,
              pg: !0,
              pr: i._priority
            }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[
              g]] =
            this._firstPT;
          (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable ||
            i._onEnable) &&
          (this._notifyPluginsOfEnabled = !0)
        } else this._firstPT = c[f] = j = {
            _next: this._firstPT,
            t: b,
            p: f,
            f: "function" == typeof b[f],
            n: f,
            pg: !1,
            pr: 0
          }, j.s = j.f ? b[f.indexOf("set") || "function" != typeof b["get" +
            f.substr(3)] ? f : "get" + f.substr(3)]() : parseFloat(b[f]), j
          .c =
          "string" == typeof k && "=" === k.charAt(1) ? parseInt(k.charAt(0) +
            "1", 10) * Number(k.substr(2)) : Number(k) - j.s || 0;
        j && j._next && (j._next._prev = j)
      }
      return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite >
        1 && this._firstPT && d.length > 1 && Q(b, this, c, this._overwrite,
          d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : h
    }, e.render = function(a, b, c) {
      var d, e, f, g, h = this._time,
        i = this._duration;
      if (a >= i) this._totalTime = this._time = i, this.ratio = this._ease
        ._calcEnd ?
        this._ease.getRatio(1) : 1, this._reversed || (d = !0, e =
          "onComplete"), 0 === i && (g = this._rawPrevTime, (0 === a || 0 >
            g ||
            g === j) && g !== a && (c = !0, g > j && (e =
            "onReverseComplete")),
          this._rawPrevTime = g = !b || a || 0 === g ? a : j);
      else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio =
        this._ease
        ._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && this
          ._rawPrevTime >
          j) && (e = "onReverseComplete", d = this._reversed), 0 > a ? (
          this._active = !
          1, 0 === i && (this._rawPrevTime >= 0 && (c = !0), this._rawPrevTime =
            g = !b || a || 0 === this._rawPrevTime ? a : j)) : this._initted ||
        (c = !0);
      else if (this._totalTime = this._time = a, this._easeType) {
        var k = a / i,
          l = this._easeType,
          m = this._easePower;
        (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2),
          1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k *
          k :
          4 === m && (k *= k * k * k * k), this.ratio = 1 === l ? 1 - k : 2 ===
          l ? k : .5 > a / i ? k / 2 : 1 - k / 2
      } else this.ratio = this._ease.getRatio(a / i);
      if (this._time !== h || c) {
        if (!this._initted) {
          if (this._init(), !this._initted || this._gc) return;
          this._time && !d ? this.ratio = this._ease.getRatio(this._time /
              i) :
            d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 ===
              this._time ? 0 : 1))
        }
        for (this._active || !this._paused && this._time !== h && a >= 0 &&
          (
            this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this
              ._startAt
              .render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart &&
            (0 !== this._time || 0 === i) && (b || this.vars.onStart.apply(
              this.vars.onStartScope || this, this.vars.onStartParams ||
              s))),
          f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f
          .t[
            f.p] = f.c * this.ratio + f.s, f = f._next;
        this._onUpdate && (0 > a && this._startAt && this._startTime &&
          this._startAt
          .render(a, b, c), b || (this._time !== h || d) && this._onUpdate
          .apply(
            this.vars.onUpdateScope || this, this.vars.onUpdateParams ||
            s)
        ), e && (this._gc || (0 > a && this._startAt && !this._onUpdate &&
          this._startTime && this._startAt.render(a, b, c), d && (this._timeline
            .autoRemoveChildren && this._enabled(!1, !1), this._active = !
            1), !b && this.vars[e] && this.vars[e].apply(this.vars[e +
            "Scope"] || this, this.vars[e + "Params"] || s), 0 === i &&
          this._rawPrevTime === j && g !== j && (this._rawPrevTime = 0)
        ))
      }
    }, e._kill = function(a, b) {
      if ("all" === a && (a = null), null == a && (null == b || b === this.target))
        return this._enabled(!1, !1);
      b = "string" != typeof b ? b || this._targets || this.target : E.selector(
        b) || b;
      var c, d, e, f, g, h, i, j;
      if ((m(b) || F(b)) && "number" != typeof b[0])
        for (c = b.length; --c > -1;) this._kill(a, b[c]) && (h = !0);
      else {
        if (this._targets) {
          for (c = this._targets.length; --c > -1;)
            if (b === this._targets[c]) {
              g = this._propLookup[c] || {}, this._overwrittenProps = this._overwrittenProps || [],
                d = this._overwrittenProps[c] = a ? this._overwrittenProps[
                  c] || {} :
                "all";
              break
            }
        } else {
          if (b !== this.target) return !1;
          g = this._propLookup, d = this._overwrittenProps = a ? this._overwrittenProps || {} :
            "all"
        }
        if (g) {
          i = a || g, j = a !== d && "all" !== d && a !== g && ("object" !=
            typeof a || !a._tempKill);
          for (e in i)(f = g[e]) && (f.pg && f.t._kill(i) && (h = !0), f.pg &&
            0 !== f.t._overwriteProps.length || (f._prev ? f._prev._next =
              f._next : f === this._firstPT && (this._firstPT = f._next),
              f
              ._next && (f._next._prev = f._prev), f._next = f._prev =
              null
            ), delete g[e]), j && (d[e] = 1);
          !this._firstPT && this._initted && this._enabled(!1, !1)
        }
      }
      return h
    }, e.invalidate = function() {
      return this._notifyPluginsOfEnabled && E._onPluginEvent("_onDisable",
          this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate =
        null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !
        1, this._propLookup = this._targets ? {} : [], this
    }, e._enabled = function(a, b) {
      if (g || f.wake(), a && this._gc) {
        var c, d = this._targets;
        if (d)
          for (c = d.length; --c > -1;) this._siblings[c] = P(d[c], this, !
            0);
        else this._siblings = P(this.target, this, !0)
      }
      return B.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled &&
        this._firstPT ? E._onPluginEvent(a ? "_onEnable" : "_onDisable",
          this) :
        !1
    }, E.to = function(a, b, c) {
      return new E(a, b, c)
    }, E.from = function(a, b, c) {
      return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender,
        new E(a, b, c)
    }, E.fromTo = function(a, b, c, d) {
      return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 !=
        c.immediateRender, new E(a, b, d)
    }, E.delayedCall = function(a, b, c, d, e) {
      return new E(b, 0, {
        delay: a,
        onComplete: b,
        onCompleteParams: c,
        onCompleteScope: d,
        onReverseComplete: b,
        onReverseCompleteParams: c,
        onReverseCompleteScope: d,
        immediateRender: !1,
        useFrames: e,
        overwrite: 0
      })
    }, E.set = function(a, b) {
      return new E(a, 0, b)
    }, E.getTweensOf = function(a, b) {
      if (null == a) return [];
      a = "string" != typeof a ? a : E.selector(a) || a;
      var c, d, e, f;
      if ((m(a) || F(a)) && "number" != typeof a[0]) {
        for (c = a.length, d = []; --c > -1;) d = d.concat(E.getTweensOf(a[
            c],
          b));
        for (c = d.length; --c > -1;)
          for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
      } else
        for (d = P(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !
          d[
            c].isActive()) && d.splice(c, 1);
      return d
    }, E.killTweensOf = E.killDelayedCallsTo = function(a, b, c) {
      "object" == typeof b && (c = b, b = !1);
      for (var d = E.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(
        c,
        a)
    };
    var S = q("plugins.TweenPlugin", function(a, b) {
      this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[
        0], this._priority = b || 0, this._super = S.prototype
    }, !0);
    if (e = S.prototype, S.version = "1.10.1", S.API = 2, e._firstPT = null,
      e._addTween =
      function(a, b, c, d, e, f) {
        var g, h;
        return null != d && (g = "number" == typeof d || "=" !== d.charAt(1) ?
          Number(d) - c : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(
            2))
        ) ? (this._firstPT = h = {
          _next: this._firstPT,
          t: a,
          p: b,
          s: c,
          c: g,
          f: "function" == typeof a[b],
          n: e || b,
          r: f
        }, h._next && (h._next._prev = h), h) : void 0
      }, e.setRatio = function(a) {
        for (var b, c = this._firstPT, d = 1e-6; c;) b = c.c * a + c.s, c.r ?
          b =
          0 | b + (b > 0 ? .5 : -.5) : d > b && b > -d && (b = 0), c.f ? c.t[
            c.p]
          (b) : c.t[c.p] = b, c = c._next
      }, e._kill = function(a) {
        var b, c = this._overwriteProps,
          d = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else
          for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
        for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d
          ._prev ?
          (d._prev._next = d._next, d._prev = null) : this._firstPT === d &&
          (this._firstPT = d._next)), d = d._next;
        return !1
      }, e._roundProps = function(a, b) {
        for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[
          c
          .n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
      }, E._onPluginEvent = function(a, b) {
        var c, d, e, f, g, h = b._firstPT;
        if ("_onInitAllProps" === a) {
          for (; h;) {
            for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
            (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next =
              d) ? d._prev = h : f = h, h = g
          }
          h = b._firstPT = e
        }
        for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
          h = h._next;
        return c
      }, S.activate = function(a) {
        for (var b = a.length; --b > -1;) a[b].API === S.API && (I[(new a[b])
            ._propName] =
          a[b]);
        return !0
      }, p.plugin = function(a) {
        if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
        var b, c = a.propName,
          d = a.priority || 0,
          e = a.overwriteProps,
          f = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_roundProps",
            initAll: "_onInitAllProps"
          },
          g = q("plugins." + c.charAt(0).toUpperCase() + c.substr(1) +
            "Plugin",
            function() {
              S.call(this, c, d), this._overwriteProps = e || []
            }, a.global === !0),
          h = g.prototype = new S(c);
        h.constructor = g, g.API = a.API;
        for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
        return g.version = a.version, S.activate([g]), g
      }, c = a._gsQueue) {
      for (d = 0; c.length > d; d++) c[d]();
      for (e in n) n[e].func || a.console.log(
        "GSAP encountered missing dependency: com.greensock." + e)
    }
    g = !1
  }
}(window));
