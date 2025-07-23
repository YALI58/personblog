<template>
  <div class="search-page container">
    <h1>搜索结果</h1>
    <div class="search-info" v-if="query">
      <p>为您找到关于 "{{ query }}" 的结果 {{ results.length }} 条</p>
    </div>
    <div class="search-results" v-if="results.length > 0">
      <article class="post-item" v-for="post in results" :key="post.id">
        <h2 class="post-title"><router-link :to="`/post/${post.id}`">{{ highlight(post.title) }}</router-link></h2>
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
        </div>
        <p class="post-excerpt" v-html="highlight(post.summary)"></p>
        <router-link :to="`/post/${post.id}`" class="read-more">阅读更多</router-link>
      </article>
    </div>
    <div v-else class="no-results">
      <p v-if="query">抱歉，没有找到与 "{{ query }}" 相关的内容。</p>
      <p v-else>请输入搜索关键词。</p>
      <p class="suggestion">您可以尝试不同的关键词，或者浏览<a href="/">首页</a>查看最新文章。</p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { posts } from '../data/posts'

export default {
  name: 'Search',
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const searchQuery = ref(props.query)
    const results = ref([])
    
    watchEffect(() => {
      searchQuery.value = props.query
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        results.value = posts.filter(post => 
          post.title.toLowerCase().includes(q) || 
          post.summary.toLowerCase().includes(q) || 
          post.content.toLowerCase().includes(q)
        ).sort((a, b) => new Date(b.date) - new Date(a.date))
      } else {
        results.value = []
      }
    })
    
    // 高亮搜索关键词（现在直接返回原文，不加 <mark> 标签）
    const highlight = (text) => {
      return text;
    }
    
    return {
      query: searchQuery,
      results,
      highlight
    }
  }
}
</script>

<style scoped>
.search-page {
  padding: 2rem 0;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
}

.search-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--secondary-bg-color);
  border-radius: 8px;
  text-align: center;
  color: var(--text-color);
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-item {
  background-color: white;
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
  color: var(--text-color);
}

.post-title a:hover {
  color: var(--primary-color);
  text-decoration: none;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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

.post-excerpt :deep(mark) {
  background-color: #ffeb3b;
  color: var(--text-color);
  padding: 0 0.2em;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  color: var(--light-text-color);
  font-size: 1.1rem;
}

.suggestion {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }
}
</style> 