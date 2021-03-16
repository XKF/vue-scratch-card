import ScratchCardComponent from './scratchCard';
import registerScratchCard from "./registerScratchCard";
import './style/index.scss';

var ScratchCard = registerScratchCard

ScratchCard.install = function(Vue) {
    Vue.component('fgo-scratchcard', ScratchCardComponent)
}

ScratchCard.Component = ScratchCardComponent

export default ScratchCard
