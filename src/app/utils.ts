export const isElementNotInViewport = (el:HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewWidth  = window.innerWidth || document.documentElement.clientWidth;
  
    // L'elemento non è visibile se:
    // - la sua parte inferiore è sopra il viewport,
    // - la sua parte superiore è sotto il viewport,
    // - la sua parte destra è a sinistra del viewport,
    // - la sua parte sinistra è a destra del viewport.
    return (
      rect.bottom < 0 ||
      rect.top > viewHeight ||
      rect.right < 0 ||
      rect.left > viewWidth
    );
  }