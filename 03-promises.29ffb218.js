var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var l={id:e,exports:{}};return t[e]=l,r.call(l.exports,l,l.exports),l.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var l=r("7Y9D8");const o={delayInput:document.querySelector('[name="delay"]'),fulfilled:document.querySelector('[value="fulfilled"]'),rejected:document.querySelector('[value="rejected"]'),submitBtn:document.querySelector('[type="submit"]')};o.submitBtn.addEventListener("click",(function(e){e.preventDefault();const t=Number(o.delayInput.value);(function(e){return new Promise(((t,n)=>{setTimeout((()=>{o.fulfilled.checked&&t(),o.rejected.checked&&n()}),e)}))})(t).then((()=>{l.Notify.success(`Fulfilled promise in ${t}ms`)})).catch((()=>{l.Notify.failure(`Rejected promise in ${t}ms`)}))}));
//# sourceMappingURL=03-promises.29ffb218.js.map