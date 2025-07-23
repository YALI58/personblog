<template>
  <div class="home">
    <div class="hero">
      <div class="container hero-container">
        <h1>相码</h1>
        <p class="motto">金牌选手不会从天而降，你必须用热爱、刻苦和投入来浇灌他们。</p>
        <div class="hero-actions">
          <router-link to="/about" class="btn primary-btn">开始阅读</router-link>
          <a href="https://github.com" target="_blank" class="btn secondary-btn">Github</a>
        </div>
      </div>
    </div>
    
    <div class="container main-content">
      <div class="content-left">
        <section class="recent-posts">
          <h2>最新文章</h2>
          <div class="post-list">
            <article class="post-item" v-for="post in recentPosts" :key="post.id">
              <h3 class="post-title"><router-link :to="`/post/${post.id}`">{{ post.title }}</router-link></h3>
              <div class="post-meta">
                <span class="post-date">{{ post.date }}</span>
                <span class="post-category" v-if="post.category"><router-link :to="`/categories/${post.category.toLowerCase()}`">{{ post.category }}</router-link></span>
              </div>
              <p class="post-excerpt">{{ post.summary }}</p>
              <router-link :to="`/post/${post.id}`" class="read-more">阅读更多</router-link>
            </article>
          </div>
        </section>
      </div>
      
      <div class="content-right">
        <aside class="sidebar">
          <section class="widget featured-posts">
            <h3 class="widget-title">推荐文章</h3>
            <ul class="featured-list">
              <li v-for="post in featuredPosts" :key="post.id">
                <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { posts } from '../data/posts'

export default {
  name: 'Home',
  setup() {
    // 最新文章 - 按日期排序取最新3篇
    const recentPosts = computed(() => {
      return [...posts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    });
    
    // 推荐文章 - 这里简单取前2篇，实际可以根据阅读量等条件筛选
    const featuredPosts = computed(() => {
      return posts.slice(0, 2);
    });

    // 滚动浮现效果
    const observer = ref(null);
    onMounted(() => {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.value.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.post-item').forEach(item => {
        observer.value.observe(item);
      });
    });
    
    return {
      recentPosts,
      featuredPosts
    };
  }
}
</script>

<style scoped>
.home {
  background-color: var(--background-color);
  background: radial-gradient(ellipse at center, #2c1445 0%, #000000 100%);
  position: relative;
  overflow: hidden;
  color: white;
}

/* Milky Way Galaxy background */
.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="none"/><g opacity="0.5"><radialGradient id="galaxyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:white;stop-opacity:0.5"/><stop offset="70%" style="stop-color:white;stop-opacity:0.1"/><stop offset="100%" style="stop-color:white;stop-opacity:0"/></radialGradient><circle cx="500" cy="500" r="400" fill="url(#galaxyGradient)"/><g fill="white" opacity="0.6"><circle cx="100" cy="100" r="1"/><circle cx="200" cy="300" r="1.5"/><circle cx="300" cy="500" r="0.8"/><circle cx="400" cy="200" r="1.2"/><circle cx="500" cy="400" r="1"/><circle cx="600" cy="600" r="1.4"/><circle cx="700" cy="150" r="0.9"/><circle cx="800" cy="350" r="1.1"/><circle cx="900" cy="550" r="1.3"/><circle cx="150" cy="750" r="0.7"/><circle cx="250" cy="850" r="1.2"/><circle cx="350" cy="650" r="0.8"/><circle cx="450" cy="450" r="1.5"/><circle cx="550" cy="250" r="0.9"/><circle cx="650" cy="800" r="1.1"/><circle cx="750" cy="700" r="1.4"/><circle cx="850" cy="500" r="0.7"/><circle cx="950" cy="300" r="1.3"/></g></g></svg>');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.hero {
  background: linear-gradient(135deg, rgba(26, 38, 52, 0.7) 0%, rgba(46, 134, 193, 0.7) 100%);
  color: white;
  padding: 6rem 0;
  margin-bottom: 3rem;
  text-align: center;
  clip-path: none;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  z-index: 1;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,10 L90,10 L90,90 L10,90 Z" stroke="rgba(255,255,255,0.2)" fill="none" stroke-width="1.5"/><path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="rgba(255,255,255,0.1)" fill="none" stroke-width="1"/><path d="M30,30 L70,30 L70,70 L30,70 Z" stroke="rgba(255,255,255,0.05)" fill="none" stroke-width="0.5"/></svg>');
  background-size: 150px 150px;
  opacity: 0.4;
  z-index: 1;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 1s ease-out;
}

.motto {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 700px;
  font-family: 'Inter', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  animation: fadeInUp 1s ease-out 0.6s backwards;
}

.btn {
  display: inline-block;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.primary-btn {
  background-color: #e74c3c;
  color: white;
}

.primary-btn:hover {
  background-color: #c0392b;
  color: white;
  text-decoration: none;
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.3);
}

.secondary-btn {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.3);
}

.main-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background-color: transparent;
  z-index: 1;
  position: relative;
}

.content-left {
  flex: 1;
  min-width: 0;
}

.content-right {
  width: 300px;
  display: flex;
  align-items: flex-start;
}

.recent-posts {
  background-color: rgba(70, 90, 110, 0.7);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.recent-posts h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #e74c3c;
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-items: center;
  padding: 0 2rem;
}

.post-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
  border-left: 6px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  text-align: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
}

.post-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), #3498db);
  z-index: 1;
}

.post-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.post-item:hover .post-title a {
  color: #e74c3c;
  text-decoration: underline;
}

.post-item:hover .read-more {
  background-color: #e74c3c;
  color: white;
  transform: scale(1.05);
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  z-index: 2;
  color: white;
}

.post-title a {
  color: white;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.post-title a:hover {
  color: #e74c3c;
  text-decoration: none;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #b0b0b0;
  font-size: 0.85rem;
  gap: 1rem;
}

.post-date::before {
  content: '📅';
  margin-right: 0.3rem;
}

.post-category a {
  color: #e74c3c;
  text-decoration: none;
}

.post-category a:hover {
  text-decoration: underline;
}

.post-excerpt {
  color: #b0b0b0;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e74c3c;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  align-self: flex-end;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  margin-top: 1rem;
  z-index: 2;
}

.read-more:hover {
  color: #c0392b;
  text-decoration: underline;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.widget {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
}

.widget-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #e74c3c;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #e74c3c;
}

.featured-list {
  list-style: none;
  padding: 0;
}

.featured-list li {
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  border-left: 3px solid #e74c3c;
}

.featured-list li a {
  color: white;
  display: block;
  line-height: 1.4;
}

.featured-list li a:hover {
  color: #e74c3c;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-list li {
  margin-bottom: 0.5rem;
}

.category-list li a {
  color: white;
  display: block;
  padding: 0.3rem 0.5rem;
  border-radius: 0px;
}

.category-list li a:hover {
  color: #e74c3c;
  background-color: rgba(248, 249, 250, 0.2);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: rgba(248, 249, 250, 0.2);
  border-radius: 0px;
  font-size: 0.85rem;
  color: white;
  border: 1px solid #e74c3c;
}

.tag:hover {
  background-color: #e74c3c;
  color: white;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
  .content-right {
    width: 100%;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 0;
  }
  .hero h1 {
    font-size: 2.2rem;
  }
  .motto {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  .btn {
    width: 80%;
    margin-bottom: 0.5rem;
  }
}
</style> 