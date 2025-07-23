<template>
  <div class="about">
    <h1>关于我</h1>
    <div class="content">
      <p>你好！我是相码，欢迎来到我的个人博客。</p>
      <p>我是一个热爱技术、喜欢分享的忍者。在这个博客中，我会分享我的忍术心得、技术经验以及忍者生活的点滴。</p>
      <p>如果你有任何问题或建议，欢迎通过忍者通讯与我联系。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/20200607231522_juswo.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: -1;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.content {
  background-color: rgba(249, 249, 249, 0.8);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

p {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #34495e;
}

@media (max-width: 600px) {
  .about {
    padding: 10px;
  }

  h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .content {
    padding: 15px;
  }
}
</style> 