<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
    <div style="height: 3rem; width: 3rem;">
      <!-- From https://magecdn.com/tools/svg-loaders -->
      <svg
        fill="#1565C0FF"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><circle
        cx="4"
        cy="12"
        r="3"
      ><animate
        id="spinner_qFRN"
        begin="0;spinner_OcgL.end+0.25s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      /></circle><circle
        cx="12"
        cy="12"
        r="3"
      ><animate
        begin="spinner_qFRN.begin+0.1s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      /></circle><circle
        cx="20"
        cy="12"
        r="3"
      ><animate
        id="spinner_OcgL"
        begin="spinner_qFRN.begin+0.2s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      /></circle></svg>
    </div>
  </div>
</template>
