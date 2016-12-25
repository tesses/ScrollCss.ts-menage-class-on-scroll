var ScrollCss = (function () {
    function ScrollCss(elem, css, reverse, associative, range) {
        if (reverse === void 0) { reverse = false; }
        if (associative === void 0) { associative = false; }
        if (range === void 0) { range = 200; }
        var _this = this;
        this.elem = [];
        this.css = [];
        this.log = {
            error: function (msg) {
                throw new Error("ScrollCss error: " + msg);
            }
        };
        if (this.isArray(elem)) {
            elem.forEach(function (element) { _this.elem.push(document.querySelector(element)); });
            this.boolelem = true;
        }
        else if (typeof elem === "string") {
            this.elem.push(document.querySelector(elem));
        }
        else {
            this.log.error("unexpected types of parameter - " + elem);
        }
        if (this.isArray(css)) {
            css.forEach(function (element) { _this.css.push(element); });
        }
        else if (typeof css === "string") {
            this.css.push(css);
        }
        else {
            this.log.error("unexpected types of parameter - " + css);
        }
        this.range = range;
        this.reverse = reverse;
        this.associative = associative;
        this.start();
    }
    ScrollCss.prototype.start = function () {
        var x = this;
        window.onscroll = function () { x.scroll(x); };
        window.onload = function () { x.scroll(x); };
    };
    ScrollCss.prototype.scroll = function (that) {
        var page = {
            min: window.pageYOffset - that.range,
            max: window.pageYOffset + window.innerHeight + that.range
        };
        if (that.boolelem) {
            var _loop_1 = function (i, x) {
                var el = that.elem[i];
                var offset = el.offsetTop;
                if ((offset >= page.min - el.offsetHeight) && (offset <= page.max)) {
                    if (!that.associative) {
                        that.css.forEach(function (v) { return el.classList.add(v); });
                    }
                    else {
                        that.css.forEach(function (v, i) { return el.classList.add(v[i % that.css.length]); });
                    }
                }
                else if (that.reverse) {
                    if (!that.associative) {
                        that.css.forEach(function (v) { return el.classList.remove(v); });
                    }
                    else {
                        that.css.forEach(function (v, i) { return el.classList.remove(v[i % that.css.length]); });
                    }
                }
            };
            for (var i = 0, x = that.elem.length; i < x; i++) {
                _loop_1(i, x);
            }
        }
        else {
            var el_1 = that.elem[0];
            var offset = el_1.offsetTop;
            if ((offset >= page.min - el_1.offsetHeight) && (offset <= page.max)) {
                if (!that.associative) {
                    that.css.forEach(function (v) { return el_1.classList.add(v); });
                }
                else {
                    that.css.forEach(function (v, i) { return el_1.classList.add(v[i % that.css.length]); });
                }
            }
            else if (that.reverse) {
                if (!that.associative) {
                    that.css.forEach(function (v) { return el_1.classList.remove(v); });
                }
                else {
                    that.css.forEach(function (v, i) { return el_1.classList.remove(v[i % that.css.length]); });
                }
            }
        }
    };
    ScrollCss.prototype.isArray = function (Array) {
        return Array.constructor.toString().indexOf("Array") > -1;
    };
    return ScrollCss;
}());
var an = new ScrollCss([".element", ".element2"], ["p", "p1"], true);
