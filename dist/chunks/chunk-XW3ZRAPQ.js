"use client";
function t(){let e=typeof document>"u"?null:document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}export{t as a};
