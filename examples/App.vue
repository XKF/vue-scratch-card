<template>
  <div id="app">
    <div class="container">
      <ScratchCard/>
    </div>
  </div>
</template>

<script>
import ScratchCard from './components/scratch-card.vue'

export default {
  name: 'App',
  components: {
    ScratchCard
  }
}
</script>

<style lang="scss">
html,body,#app{
  height: 100%;
}

#app {
    font-family: PingFang SC,"微软雅黑", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    margin: 0 auto;
    position:relative;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background:#f0f3f6;
}
ul {
    list-style: none;
}
a {
    text-decoration: none;
}

.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

.fl {
    float: left;
}
.fr {
    float: right;
}

// 省略
@for $i from 2 through 5 {
    .t-hidden-#{$i} {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: #{$i};
    }
}

.container{
    position: relative;
    width: 100%;
    max-width: 768PX;
    padding: 20px;
    margin: 0 auto;
    min-height: 100%;
    background: #fff;
}
</style>
