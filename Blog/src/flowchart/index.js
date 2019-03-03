import Element from "./Element.vue";
import FlowChart from "./FlowChart.vue";
import FlowChartEditor from "./FlowChartEditor.vue";
import Edge from "./Edge.vue";

export { FlowChartEditor, FlowChart, Element, Edge }


const _data = {
    draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
    down: false,
    height: 0,
    width: 0,
    initialX: 0,
    initialY: 0,
    constraintToWindow: false,
    cursorPreviousX: 0,
    cursorPreviousY: 0,
    draggerOffsetLeft: 0,
    draggerOffsetTop: 0,
    overlay: null,
    draggableEl: null,
    initialZIndex: undefined
}

function createOverlay (e, el, _data) {
  const overlay = document.createElement('div')
  overlay.setAttribute('style', `
    width: 100vw; 
    height: 100vh; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  `)
  overlay.addEventListener('mouseup', (e) => mouseup(e, el, _data))
  overlay.addEventListener('mousedown', (e) => mousedown(e, el, _data))
  overlay.addEventListener('mousemove', (e) => mousemove(e, el, _data))
  document.body.appendChild(overlay)

  return overlay
}

function checkIfIdInPath(id, path) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].id === id) {
      return true
    }
  }
  return false
}




