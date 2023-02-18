<template>
    <div class="tail">
      <div>
        <p>校园资讯 | 招生专栏 | 校企合作 | 在线留言</p>
        <p>手机版 | 管理登录</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Tail',
  data() {
    return {
      
    };
  },
  methods: {
  
  },

};
</script>

<style land="sass" scoped>
.tail {
  width: 100%;
  height: 100px;
  background-color: #222222;
  border-top: 2px solid #f00;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tail > div {
  width: 1190px;
  /* height: 100%; */
}
.tail p {
  font-size: 14px;
  color: #d5d5d5;
}
</style>
