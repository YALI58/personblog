<template>
  <div class="post-detail">
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p class="post-date">{{ post.date }}</p>
      <div class="post-content" v-html="post.content"></div>
      <button @click="goBack" class="back-button">返回首页</button>
    </div>
    <div v-else>
      <p>文章未找到</p>
      <button @click="goBack" class="back-button">返回首页</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { posts } from '../data/posts'

export default {
  name: 'PostDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const postId = ref(Number(route.params.id))
    const post = ref(null)

    onMounted(() => {
      const foundPost = posts.find(p => p.id === postId.value)
      if (foundPost) {
        post.value = foundPost
      }
    })

    const goBack = () => {
      router.push('/')
    }

    return {
      post,
      goBack
    }
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.post-date {
  color: #7f8c8d;
  font-size: 0.9em;
  margin-bottom: 30px;
}

.post-content {
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 40px;
}

.post-content :deep(p) {
  margin-bottom: 20px;
}

.post-content :deep(h2) {
  margin: 30px 0 15px;
  color: #2c3e50;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #3498db;
  padding-left: 20px;
  margin-left: 0;
  color: #555;
  font-style: italic;
}

.back-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .post-detail {
    padding: 10px;
  }

  h1 {
    font-size: 1.8em;
    margin-bottom: 15px;
  }

  .post-date {
    margin-bottom: 20px;
  }

  .post-content {
    margin-bottom: 30px;
  }
}
</style> 