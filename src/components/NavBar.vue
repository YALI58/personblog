<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <router-link to="/" class="logo">相码</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link"><span class="icon">🏠</span>首页</router-link>
        <router-link to="/tags" class="nav-link"><span class="icon">🏷️</span>标签</router-link>
        <router-link to="/categories" class="nav-link"><span class="icon">📁</span>分类</router-link>
        <router-link to="/timeline" class="nav-link"><span class="icon">📅</span>历程</router-link>
        <router-link to="/about" class="nav-link"><span class="icon">ℹ️</span>知悉</router-link>
      </div>
      <div class="nav-search">
        <input type="text" placeholder="搜索..." class="search-input" @keyup.enter="search" v-model="searchTerm">
        <button class="search-btn" @click="search">搜索</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const searchTerm = ref('')

    const search = () => {
      if (searchTerm.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchTerm.value)}`)
        searchTerm.value = ''
      }
    }

    return {
      searchTerm,
      search
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  border-bottom: none;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ecf0f1;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(45deg, #e74c3c, #3498db, #2ecc71, #f1c40f, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: colorShift 5s infinite;
  margin-left: 50px;
}

@keyframes colorShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-right: 30px;
  background-color: rgba(52, 73, 94, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1.2rem;
  transition: color 0.2s ease, background-color 0.2s ease;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.3rem;
}

.nav-link:hover {
  color: #e74c3c;
  background-color: rgba(236, 240, 241, 0.1);
}

.nav-link.router-link-active {
  color: #e74c3c;
  font-weight: 500;
  background-color: transparent;
  border-bottom: 2px solid #e74c3c;
}

.nav-search {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(236, 240, 241, 0.3);
  background-color: rgba(236, 240, 241, 0.1);
  color: #ecf0f1;
  border-radius: 4px 0 0 4px;
  outline: none;
  font-size: 0.9rem;
  width: 200px;
}

.search-input:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

.search-btn {
  padding: 0.5rem 0.75rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .nav-link {
    padding: 0.4rem 0.75rem;
    font-size: 0.9rem;
  }

  .nav-search {
    width: 100%;
  }

  .search-input {
    flex-grow: 1;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.2rem;
  }

  .search-input {
    width: 100%;
  }
}
</style> 