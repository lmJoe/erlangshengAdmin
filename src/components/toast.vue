<template>
  <div class="wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>
 
<style scoped>
  .wrap{
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.7);
    width:55%;
    text-align:center;
    margin:0 auto;
    padding:0.7rem 0;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    line-height: 0.5rem;
  }
  .fadein {
    animation: animate_in 0.25s;
  }
  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>