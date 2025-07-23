<template>
  <div class="categories-page container">
    <div class="category-list" v-if="Object.keys(categoriesWithCount).length > 0">
      <div class="category-item" v-for="(count, category) in categoriesWithCount" :key="category">
        <router-link :to="`/categories/${category}`" class="category-link">
          <h2 class="category-name">{{ category }}</h2>
          <span class="category-count">{{ count }} 篇文章</span>
        </router-link>
      </div>
    </div>
    <p v-else class="no-categories">暂无分类</p>
    
    <div class="category-posts" v-if="currentCategory">
      <h2>{{ currentCategory }} 分类下的文章</h2>
      <div class="post-list" v-if="filteredPosts.length > 0">
        <article class="post-item" v-for="post in filteredPosts" :key="post.id">
          <h3 class="post-title"><router-link :to="`/post/${post.id}`">{{ post.title }}</router-link></h3>
          <div class="post-meta">
            <span class="post-date">{{ post.date }}</span>
          </div>
          <p class="post-excerpt">{{ post.summary }}</p>
          <router-link :to="`/post/${post.id}`" class="read-more">阅读更多</router-link>
        </article>
      </div>
      <p v-else class="no-posts">该分类下暂无文章</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../data/posts'

export default {
  name: 'Categories',
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const route = useRoute()
    const currentCategory = ref(props.category || route.params.category || '')
    
    // 监听路由参数变化
    watchEffect(() => {
      currentCategory.value = props.category || route.params.category || ''
    })
    
    // 计算所有分类及其计数
    const categoriesWithCount = computed(() => {
      const categories = {}
      posts.forEach(post => {
        if (post.category) {
          categories[post.category] = (categories[post.category] || 0) + 1
        }
      })
      return categories
    })
    
    // 筛选当前分类下的文章
    const filteredPosts = computed(() => {
      if (!currentCategory.value) return []
      return posts.filter(post => 
        post.category === currentCategory.value
      ).sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    return {
      categoriesWithCount,
      currentCategory,
      filteredPosts
    }
  }
}
</script>

<style scoped>
.categories-page {
  padding: 2rem 0;
  background-image: url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  color: white; /* 调整文字颜色以确保在背景上可见 */
}

h1 {
  display: none; /* 隐藏h1标签 */
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 居中排列 */
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 0 1rem; /* 添加左右内边距以适应小屏幕 */
}

.category-item {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-radius 0.3s ease;
  overflow: hidden;
  animation: fadeInUp 0.5s ease-out forwards, rotateIn 0.8s ease-out forwards;
  opacity: 0;
  transform: rotateY(180deg);
  flex: 1 1 auto; /* 自动调整大小 */
  min-width: 250px; /* 最小宽度 */
  max-width: 350px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}

.category-item:hover {
  transform: translateY(-10px) rotateY(0deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.3);
  border-radius: 30px; /* 悬停时更圆的形状 */
}

.category-link {
  display: block;
  padding: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;
  animation: pulse 2s infinite ease-in-out;
}

.category-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.category-link:hover::after {
  transform: translateX(100%);
}

.category-link:hover {
  text-decoration: none;
}

.category-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  border-bottom: none;
  position: relative;
  display: inline-block;
}

.category-name::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.category-link:hover .category-name::after {
  width: 100%;
}

.category-count {
  display: inline-block;
  background-color: var(--secondary-bg-color);
  color: var(--light-text-color);
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.category-link:hover .category-count {
  transform: scale(1.1);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) rotateY(0deg);
  }
}

@keyframes rotateIn {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
}

.no-categories {
  text-align: center;
  color: var(--light-text-color);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white; /* 确保标题在背景上可见 */
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e74c3c; /* 使用固定颜色 */
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-item {
  background-color: rgba(255, 255, 255, 0.8); /* 增加背景透明度以确保内容可见 */
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.post-title a {
  color: #333; /* 使用固定深色以确保可见 */
}

.post-title a:hover {
  color: #e74c3c; /* 使用固定颜色 */
  text-decoration: none;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #666; /* 使用固定颜色以确保可见 */
  font-size: 0.9rem;
}

.post-date::before {
  content: '📅';
  margin-right: 0.3rem;
}

.post-excerpt {
  color: #444; /* 使用固定颜色以确保可见 */
  margin-bottom: 1rem;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e74c3c; /* 使用固定颜色 */
}

.no-posts {
  color: white; /* 确保文字在背景上可见 */
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .category-list {
    grid-template-columns: 1fr;
  }
}
</style> 