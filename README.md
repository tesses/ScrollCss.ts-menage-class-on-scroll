# ScrollCss-Menage-your-css-class-on-scroll
### http://codepen.io/davideTessari/pen/bBypzG
Menage your css class on scroll in javascript (typescript).

### Class usage:
    /* option */
    var element = [".element1","element2"];       // Array or string with the css/id selector
    var className = ["css_class1","css_class2"];  // Array or string with the css
    var reverse = true;                           // boolean Optional. When you exit at the range of the element the css class is removed
    var associates = false;                       // boolean Optional. associates the first class with the first element and so    on...
    var range = 300;                              // number optional. The range of the trigger.
  
    /* class */
    var an = new ScrollCss(element, className, reverse, associates, 300);
