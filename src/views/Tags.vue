<template>
  <div class="tags-page container">
    <!-- 删除h1标签 -->
    <div class="tag-cloud" v-if="Object.keys(tagsWithCount).length > 0">
      <router-link 
        v-for="(count, tag) in tagsWithCount" 
        :key="tag" 
        :to="`/tags/${tag}`" 
        class="tag-item"
        :style="{ fontSize: getFontSize(count) + 'px' }"
      >
        {{ tag }} ({{ count }})
      </router-link>
    </div>
    <p v-else class="no-tags">暂无标签</p>
    
    <div class="tag-posts" v-if="currentTag">
      <h2>{{ currentTag }} 标签下的文章</h2>
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
      <p v-else class="no-posts">该标签下暂无文章</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../data/posts'

export default {
  name: 'Tags',
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const route = useRoute()
    const currentTag = ref(props.tag || route.params.tag || '')
    let animationId = null;
    let rotation = 0;
    let tagCloud = null;
    
    // 监听路由参数变化
    watchEffect(() => {
      currentTag.value = props.tag || route.params.tag || ''
    })
    
    // 计算所有标签及其计数
    const tagsWithCount = computed(() => {
      const tags = {}
      posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1
          })
        }
      })
      return tags
    })
    
    // 根据文章数量计算标签字体大小
    const getFontSize = (count) => {
      const baseSize = 12
      const maxSize = 24
      const increment = Math.min(count * 2, maxSize - baseSize)
      return baseSize + increment
    }
    
    // 筛选当前标签下的文章
    const filteredPosts = computed(() => {
      if (!currentTag.value) return []
      return posts.filter(post => 
        post.tags && post.tags.includes(currentTag.value)
      ).sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    // 标签云旋转效果
    onMounted(() => {
      const tags = document.querySelectorAll('.tag-item');
      const radius = 120;
      const angleStep = (2 * Math.PI) / tags.length;

      tags.forEach((tag, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        tag.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${angle}rad)`;
        tag.style.left = `calc(50% - ${tag.offsetWidth / 2}px)`;
        tag.style.top = `calc(50% - ${tag.offsetHeight / 2}px)`;
      });

      const animate = () => {
        rotation += 0.01;
        tags.forEach((tag, index) => {
          const angle = index * angleStep + rotation;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          tag.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${angle}rad)`;
        });
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);

      tagCloud = document.querySelector('.tag-cloud');
      if (tagCloud) {
        tagCloud.addEventListener('mouseenter', pauseAnimation);
        tagCloud.addEventListener('mouseleave', resumeAnimation);
      }
    });

    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      if (tagCloud) {
        tagCloud.removeEventListener('mouseenter', pauseAnimation);
        tagCloud.removeEventListener('mouseleave', resumeAnimation);
        tagCloud = null;
      }
    });

    const pauseAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const resumeAnimation = () => {
      if (!animationId) {
        const tags = document.querySelectorAll('.tag-item');
        if (tags.length > 0) {
          const radius = 120;
          const angleStep = (2 * Math.PI) / tags.length;
          const animate = () => {
            rotation += 0.01;
            tags.forEach((tag, index) => {
              const angle = index * angleStep + rotation;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              tag.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${angle}rad)`;
            });
            animationId = requestAnimationFrame(animate);
          };
          animationId = requestAnimationFrame(animate);
        }
      }
    };
    
    return {
      tagsWithCount,
      currentTag,
      getFontSize,
      filteredPosts
    }
  }
}
</script>

<style scoped>
.tags-page {
  padding: 2rem 0;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  z-index: -1;
}

/* Starry background */
.tags-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="none"/><g fill="white" opacity="0.6"><circle cx="100" cy="100" r="1"/><circle cx="200" cy="300" r="1.5"/><circle cx="300" cy="500" r="0.8"/><circle cx="400" cy="200" r="1.2"/><circle cx="500" cy="400" r="1"/><circle cx="600" cy="600" r="1.4"/><circle cx="700" cy="150" r="0.9"/><circle cx="800" cy="350" r="1.1"/><circle cx="900" cy="550" r="1.3"/><circle cx="150" cy="750" r="0.7"/><circle cx="250" cy="850" r="1.2"/><circle cx="350" cy="650" r="0.8"/><circle cx="450" cy="450" r="1.5"/><circle cx="550" cy="250" r="0.9"/><circle cx="650" cy="800" r="1.1"/><circle cx="750" cy="700" r="1.4"/><circle cx="850" cy="500" r="0.7"/><circle cx="950" cy="300" r="1.3"/></g></svg>');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  z-index: 1;
}

.tags-page::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="none"/><g fill="white" opacity="0.4"><circle cx="120" cy="220" r="0.6"/><circle cx="220" cy="420" r="1"/><circle cx="320" cy="620" r="0.5"/><circle cx="420" cy="320" r="0.8"/><circle cx="520" cy="520" r="0.7"/><circle cx="620" cy="720" r="0.9"/><circle cx="720" cy="270" r="0.6"/><circle cx="820" cy="470" r="0.8"/><circle cx="920" cy="670" r="1"/><circle cx="170" cy="870" r="0.5"/><circle cx="270" cy="970" r="0.9"/><circle cx="370" cy="770" r="0.6"/><circle cx="470" cy="570" r="1"/><circle cx="570" cy="370" r="0.7"/><circle cx="670" cy="920" r="0.8"/><circle cx="770" cy="820" r="0.9"/><circle cx="870" cy="620" r="0.5"/><circle cx="970" cy="420" r="1"/></g></svg>');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  z-index: 1;
}

h1 {
  display: none; /* 隐藏h1标签 */
}

.tag-cloud {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
  margin-top: 150px; /* 往下移动150px */
  perspective: 1000px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tag-cloud:hover {
  animation-play-state: paused;
}

.tag-item {
  position: absolute;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  transition: all 0.3s ease;
  transform-origin: center center;
  backface-visibility: hidden;
}

.tag-item:hover {
  background-color: #e74c3c;
  color: white;
  transform: translateY(-2px) scale(1.1);
  z-index: 10;
}

.no-tags {
  text-align: center;
  color: #b0b0b0;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e74c3c;
  position: relative;
  z-index: 2;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.post-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

.post-title {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.post-title a {
  color: white;
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
  font-size: 0.9rem;
}

.post-date::before {
  content: '📅';
  margin-right: 0.3rem;
}

.post-excerpt {
  color: white;
  margin-bottom: 1rem;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e74c3c;
}

.no-posts {
  color: #b0b0b0;
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style> 