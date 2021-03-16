
import { use } from './_utils/use';

let _userAgent = navigator.userAgent;

let isIos13Ipad = /Mac OS/ig.test(_userAgent) && !!window.DeviceMotionEvent && !!window.DeviceOrientationEvent;

let PF = {
    isMobile: /iphone|ipod|ipad|ipad|Android|nokia|blackberry|webos|webos|webmate|bada|lg|ucweb/i.test(_userAgent) || isIos13Ipad,
}

let _use = use('scratchcard'),
    bem = _use[0];

export default {
    name: 'fgo-scratchcard',
    props: {
        prizeName:{
            type:[String],
            default:'恭喜你，中奖啦'
        },
        width:{
            type:[String],
            default:'100%'
        },
        height:{
            type:[String],
            default:'200px'
        },
        showScratchOverlay:{
            type:[Boolean],
            default:true
        },
        overlayColor:{
            type:[String],
            default:'#e5e5e5'
        },
        fontOnOverlay:{
            type:[String],
            default:'刮开查看奖品'
        },
        fontColor:{
            type:[String],
            default:'#bbb'
        },
        fontSize:{
            type:[String],
            default:'20px'
        },
        OverlayPic:{
            type:[String],
            default:''
        },
        OverlayPicRepeat:{
            type:[String],
            default:'repeat'
        },
        //清空临界范围
        scope:{
            type:[Number],
            default:2
        },
        //画笔大小
        fontem:{
            type:[Number],
            default:20 
        },
        canvasParentId:{
            type:[String],
            default:bem('canvas__parent')
        },
        canvasId:{
            type:[String],
            default:bem('canvas__target')
        }
    },
    data() {
        return {
            _canvas: "", //画布
            ctx: "", //画笔
            isdown: false, //标志用户是否按下鼠标或开始触摸
            ScratchAll: false
        };
    },
    methods: {
        slotScoped(){
            return {};
        },
        // 获取插槽元素
        getSlot(name) {
            return this.slotScoped && typeof this.slotScoped === 'function' && this.slotScoped()[name]
        },
        // 初始化刮刮卡
        initCanvas() {
            this.ctx.globalCompositeOperation = "source-over";
            let patten = this.overlayColor;
            new Promise((resolve) => {
                if(this.OverlayPic){
                    let _img = new Image();
                    _img.src = this.OverlayPic;
                    _img.onload = () => {
                        patten = this.ctx.createPattern(_img, this.OverlayPicRepeat);
                        resolve()
                    }
                }else{
                   resolve()
                }
            }).then(()=>{
                this.ctx.fillStyle = patten;
                this.ctx.fillRect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
                this.ctx.fill();
                this.ctx.font = `Bold ${this.fontSize} '微软雅黑'`;
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = this.fontColor;
                this.ctx.fillText(this.fontOnOverlay, this._canvas.width / 2, this._canvas.height / 2 + 10);
                //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
                this.ctx.globalCompositeOperation = "destination-out";
            })
        },
        touchstart(e) {
            e.preventDefault();
            this.isdown = true;
            this.$emit('scratchStart',this.reset);
            this.onScratchStart && typeof this.onScratchStart === 'function' && this.onScratchStart();
        },
        // 操作刮卡
        touchend(e) {
            e.preventDefault();
            //得到canvas的全部数据
            let a = this.ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
            let j = 0;
            for (let i = 3; i < a.data.length; i += 4) {
                if (a.data[i] == 0) j++;
            }
            //当被刮开的区域等于一半时，则可以开始处理结果
            if (j >= a.data.length / (4 * this.scope)) {
                this.ScratchAll = true;
                this.$emit('scratchAll',this.reset);
                this.onScratchAll && typeof this.onScratchAll === 'function' && this.onScratchAll();
            }
            this.isdown = false;
            this.$emit('scratchEnd',this.reset);
            this.onScratchEnd && typeof this.onScratchEnd === 'function' && this.onScratchEnd();
        },
        touchmove(e) {
            e.preventDefault();
            if (this.isdown) {
                if (e.changedTouches) {
                    e = e.changedTouches[e.changedTouches.length - 1];
                }
                let ele = document.getElementById(this.canvasParentId);
                let leftX = ele.offsetLeft;
                let topY = ele.offsetTop;
                while ((ele = ele.offsetParent)) { 
                    leftX += ele.offsetLeft;
                    topY += ele.offsetTop;
                }
                let oX = this._canvas.offsetLeft + leftX,
                    oY = this._canvas.offsetTop + topY;
                let x = (e.pageX || e.clientX + document.body.scrollLeft) - oX || 0,
                    y = (e.pageY || e.clientY + document.body.scrollTop) - oY || 0;
                //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
                //画出来是透明的
                this.ctx.beginPath();
                this.ctx.arc(x, y, this.fontem * 0.5, 0, Math.PI * 2, true); // 调整画笔的大小
                //下面3行代码是为了修复部分手机浏览器不支持destination-out
                //我也不是很清楚这样做的原理是什么
                // this._canvas.style.display = 'none';
                // this._canvas.offsetHeight;
                // this._canvas.style.display = 'inherit';
                this.ctx.fill();
            }
        },
        reset(){
            if(this.ScratchAll) this.ScratchAll = false;
			this.initCanvas();
        }
    },
    mounted(){
        if(this.showScratchOverlay){
            setTimeout(()=>{
                //这是为了不同分辨率上配合@media自动调节刮的宽度
                this._canvas = document.getElementById(this.canvasId);
                //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
                //最好设置成跟画布在页面中的实际大小一样
                //不然canvas中的坐标跟鼠标的坐标无法匹配
                this._canvas.width = this._canvas.clientWidth;
                this._canvas.height = this._canvas.clientHeight;
                this.ctx = this._canvas.getContext("2d");
                this.initCanvas();
            },0)
        }
    },
    render(h) {
        // 判断是否有defalut
        return h('div', {
            "class": bem(""),
            "style":{
                width:this.width,
                height:this.height
            },
            "attrs":{
                "id": this.canvasParentId
            }
        }, [
            this.$slots.prize || this.getSlot('prize') || h('div',{
                "class":bem("prizeinfo")
            },[
                h('p',{},this.prizeName.replace(/\\n/g,'<br>'))
            ]),
            this.showScratchOverlay && h('canvas',{
                "class": bem("canvas"),
                "attrs":{
                    "id": this.canvasId
                },
                "style":{
                    "z-index": this.ScratchAll ? -1 : 2
                },
                "on":PF.isMobile?{
                    "touchstart":($event) => { this.touchstart($event) },
                    "touchmove":($event) => { this.touchmove($event) },
                    "touchend":($event) => { this.touchend($event) }
                } : {
                    "mousedown":($event) => { this.touchstart($event) },
                    "mousemove":($event) => { this.touchmove($event) },
                    "mouseup":($event) => { this.touchend($event) }
                }
            })
        ])
    }
}