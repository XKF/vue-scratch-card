<template>
    <div>
        <div class="line">
            <v-scratchcard @scratchAll="fn" :prizeName="abc">
                <!-- <template v-slot:prize>
                    <p style="position:absolute;width:100%;height:100%;paddingBottom:10px;color:#333">{{abc}}</p>
                </template> -->
            </v-scratchcard>
        </div>
        <div class="line">
            <p class='title' @click="test()">函数调用</p>
            <button 
                type='primary'
                @click='add'>函数添加组件</button>
        </div>
    </div>
</template>

<script>
let i = 0;
export default {
    name: 'test-scratch-card',
    data(){
        return {
            scratch:null,
            abc:'666'
        }
    },
    methods: {
        add() {
            this.scratch = this.$ScratchCard({
                canvasParentId:'123'+i,
                canvasId:'456'+i,
                targetContainer:document.querySelectorAll('.line')[1],
                slotScoped:()=>{
                    return {
                        "prize":{tag:'p', data:{style: {position:'absolute', width:'100%', height:'100%', color: '#333', background:'blue',paddingBottom: '10px'}}, text:'可选插槽插入自定义内容'}
                    }
                },
                onScratchStart(){
                    console.log('start');
                },
                onScratchEnd(){
                    console.log('end');
                }
            })
            i++;
        },
        test(){
            this.scratch.init()
        },
        fn(reset){
            setTimeout(()=>{
                reset()
                this.abc='123'
            },3000)
        }
    }
}
</script>

<style lang='scss' scoped>
    .line {
        margin-bottom:15px;
        .title {
            margin-bottom:6px;
        }
    }
</style>

