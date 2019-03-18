
// empty fbp element handler to have fbp scope
import {FBP} from "./fbp";

class EmptyFBPNode extends FBP(HTMLElement) {

}
window.customElements.define('empty-fbp-node', EmptyFBPNode);
