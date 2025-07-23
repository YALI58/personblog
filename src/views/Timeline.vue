<template>
  <div class="timeline-page container">
    <!-- 删除h1标签 -->
    <div class="timeline-container" v-if="timelinePosts.length > 0">
      <div class="timeline-item" v-for="(post, index) in timelinePosts" :key="post.id">
        <div class="timeline-marker">
          <div class="marker-icon"></div>
          <div class="timeline-line" v-if="index < timelinePosts.length - 1"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h2 class="post-title"><router-link :to="`/post/${post.id}`">{{ post.title }}</router-link></h2>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="no-posts">暂无文章</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { posts } from '../data/posts'

export default {
  name: 'Timeline',
  setup() {
    // 按日期降序排列的文章
    const timelinePosts = computed(() => {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    
    return {
      timelinePosts
    };
  }
}
</script>

<style scoped>
.timeline-page {
  padding: 0; /* 移除内边距以占满全屏 */
  max-width: 100%; /* 占满全屏宽度 */
  height: 100vh; /* 占满全屏高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

h1 {
  display: none; /* 隐藏h1标签 */
}

.timeline-container {
  position: relative;
  margin: 0;
  background-image: url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem 0;
  border-radius: 0; /* 移除圆角以占满全屏 */
  overflow: auto; /* 允许滚动 */
  height: 100%; /* 占满父容器高度 */
  width: 100%; /* 占满父容器宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  animation: flow 0.5s ease-out forwards;
  opacity: 0;
  width: 80%; /* 调整宽度以适应弯曲效果 */
  transform: rotate(3deg); /* 轻微旋转以模拟弯曲河流 */
}

.timeline-item:nth-child(even) {
  transform: rotate(-3deg); /* 偶数项反向旋转以模拟弯曲河流 */
  align-self: flex-end; /* 偶数项靠右 */
}

.timeline-item:nth-child(odd) {
  align-self: flex-start; /* 奇数项靠左 */
}

.timeline-marker {
  position: relative;
  width: 40px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #00b09b; /* 河流的颜色 */
  position: absolute;
  top: 0;
  z-index: 2;
  animation: ripple 2s infinite ease-in-out;
}

.timeline-line {
  width: 2px;
  background-color: #00b09b; /* 河流的颜色 */
  flex-grow: 1;
  position: absolute;
  top: 22px;
  z-index: 1;
  animation: flowLine 2s infinite ease-in-out;
}

.timeline-content {
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  margin-left: 1rem;
  border: 1px solid #00b09b; /* 河流的颜色 */
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.post-title {
  font-size: 1.4rem;
  margin: 0;
  font-weight: 600;
}

.post-title a {
  color: var(--text-color);
}

.post-title a:hover {
  color: var(--primary-color);
  text-decoration: none;
}

.post-date {
  color: var(--light-text-color);
  font-size: 0.9rem;
}

.post-date::before {
  content: '📅';
  margin-right: 0.3rem;
}

.post-excerpt {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 500;
}

.no-posts {
  text-align: center;
  color: var(--light-text-color);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    display: none;
  }
}

@keyframes flow {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 176, 155, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 176, 155, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 176, 155, 0);
  }
}

@keyframes flowLine {
  0% {
    background-position: top;
  }
  100% {
    background-position: bottom;
  }
}
</style> 