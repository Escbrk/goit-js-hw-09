!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")},a={interval:void 0,start:function(){t.start.disabled=!0,t.stop.disabled=!1,a.interval=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)},stop:function(e){t.start.disabled=!1,t.stop.disabled=!0,clearInterval(a.interval)}};t.start.addEventListener("click",a.start),t.stop.addEventListener("click",a.stop)}();
//# sourceMappingURL=01-color-switcher.74cdf7a9.js.map
