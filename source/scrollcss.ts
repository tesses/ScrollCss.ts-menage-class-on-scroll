interface ScrollPar {
    elem: any[];
    css: any[];
    reverse?: boolean;
    associative?: boolean;
    range?: number;
}

class ScrollCss implements ScrollPar {
    elem: any[] = [];
    css: any[] = [];
    range: number;
    reverse: boolean;
    associative: boolean;
    private boolelem: boolean;

  constructor(elem: any, css: any, reverse: boolean = false, associative: boolean = false, range: number = 200) {

    // inizialize element
    if (this.isArray(elem)) {
      elem.forEach((element: string) => {this.elem.push(document.querySelector(element)); });
      this.boolelem = true;
    }else if (typeof elem === "string") {
      this.elem.push(document.querySelector(elem));
    }else {
      this.log.error(`unexpected types of parameter - ${elem}`);
    }

    // inizialize css
    if (this.isArray(css)) {
      css.forEach((element: string) => {this.css.push(element); });
    }else if (typeof css === "string") {
      this.css.push(css);
    }else {
      this.log.error(`unexpected types of parameter - ${css}`);
    }

    this.range = range;
    this.reverse = reverse;
    this.associative = associative;
    this.start();
  }

  // checkup if element exists
  public start() {
    let x = this;
    window.onscroll = function(){x.scroll(x); };
    window.onload = function(){x.scroll(x); };
  }

  private scroll(that): any {
    let page = {
                  min : window.pageYOffset - that.range,
                  max : window.pageYOffset + window.innerHeight + that.range
              };
    if (that.boolelem) {
      for (let i = 0, x = that.elem.length; i < x; i++) {
        let el = that.elem[i];
        let offset = el.offsetTop;
        if ((offset >= page.min - el.offsetHeight) && (offset <= page.max)) {
          if (!that.associative) {
            that.css.forEach((v) => el.classList.add(v));
          }else {
            that.css.forEach((v, i) => el.classList.add(v[i % that.css.length]));
          }
        }else if (that.reverse) {
          if (!that.associative) {
            that.css.forEach((v) => el.classList.remove(v));
          }else {
            that.css.forEach((v, i) => el.classList.remove(v[i % that.css.length]));
          }
        }
      }
    }else {
      let el = that.elem[0];
      let offset = el.offsetTop;
      if ((offset >= page.min - el.offsetHeight) && (offset <= page.max)) {
        if (!that.associative) {
          that.css.forEach((v) => el.classList.add(v));
        }else {
          that.css.forEach((v, i) => el.classList.add(v[i % that.css.length]));
        }
      }else if (that.reverse) {
        if (!that.associative) {
          that.css.forEach((v) => el.classList.remove(v));
        }else {
          that.css.forEach((v, i) => el.classList.remove(v[i % that.css.length]));
        }
      }
    }
  }

  private isArray(Array) {
     return Array.constructor.toString().indexOf("Array") > -1;
  }

  // print error or message
  public log = {
    error(msg: string): any {
      throw new Error(`ScrollCss error: ` + msg);
    }
  };
}
