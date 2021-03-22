import Vue from 'vue';

import scratchCardComponent from './scratchCard';

import { use } from './_utils/use';
let _use = use('scratchcard'),
    bem = _use[0];

const scratchCardConstructor = Vue.extend(scratchCardComponent);

const defaultValue = {
	prizename: '恭喜你，中奖啦',
	slotscoped: () => {
		return {}
	}
}

function scratchCard({
    prizeName = defaultValue.prizename,
	width = '100%',
	height = '200px',
	showScratchOverlay = true,
	overlayColor = '#e5e5e5',
	fontOnOverlay = '刮开查看奖品',
	fontColor = '#bbb',
	fontSize = '20px',
	OverlayPic = '',
	fontem = 20,
	scope = 2,
	targetContainer = null,
	onScratchStart = () => {},
	onScratchEnd = () => {},
	onScratchAll = () => {},
	slotScoped = defaultValue.slotscoped,
	canvasParentId = bem('canvas__parent'),
	canvasId = bem('canvas__target')
}={}){
	const scratchCardDom = new scratchCardConstructor({
        el:document.createElement('div'),
        props: {
			prizeName:{
				type:[String],
				default:prizeName
			},
			width:{
				type:[String],
				default:width
			},
			height:{
				type:[String],
				default:height
			},
			showScratchOverlay:{
				type:[Boolean],
				default:showScratchOverlay
			},
			overlayColor:{
				type:[String],
				default:overlayColor
			},
			fontOnOverlay:{
				type:[String],
				default:fontOnOverlay
			},
			fontColor:{
				type:[String],
				default:fontColor
			},
			fontSize:{
				type:[String],
				default:fontSize
			},
			OverlayPic:{
				type:[String],
				default:OverlayPic
			},
			OverlayPicRepeat:{
				type:[String],
				default:OverlayPic
			},
			fontem:{
				type:[Number],
				default:fontem
			},
			canvasParentId:{
				type:[String],
				default:canvasParentId
			},
			canvasId:{
				type:[String],
				default:canvasId
			},
			scope:{
				type:[Number],
				default:scope
			}
		},
		methods:{
			onScratchStart,
			onScratchEnd,
			onScratchAll,
			slotScoped,
			init(){
				if(this.ScratchAll) this.ScratchAll = false;
				this.hadScratched = false;
				this.initCanvas();
			},
			reset({slotScoped = defaultValue.slotscoped, prizeName = defaultValue.prizename} = {}){
				this.init();
				this.slotScoped = slotScoped;
				this.prizeName = prizeName;
				this.$forceUpdate(); //函数调用要强制update一下视图
			}
		}
	})
	if(targetContainer){
		targetContainer.appendChild(scratchCardDom.$el);
	}else{
		document.body.appendChild(scratchCardDom.$el);
	}
	return scratchCardDom;
}

// function registryTncode(){
// 	Vue.prototype.$tncodePop = tncodePop;
// }

export default scratchCard;