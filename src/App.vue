<template>
  <div id="app" @click="handleClick">
    <NavBar />
    <router-view />
    <div v-if="showWord" class="click-word">{{ word }}</div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      showWord: false,
      word: '',
      clickCount: 0,
      lastClickTime: 0
    }
  },
  methods: {
    handleClick(event) {
      const currentTime = new Date().getTime();
      if (currentTime - this.lastClickTime < 300) {
        this.clickCount++;
        if (this.clickCount >= 3) {
          this.showWord = true;
          this.word = this.getRandomWord();
          this.clickCount = 0;
          setTimeout(() => {
            this.showWord = false;
          }, 2000);
        }
      } else {
        this.clickCount = 1;
      }
      this.lastClickTime = currentTime;
    },
    getRandomWord() {
      const words = ['Hello', 'World', 'Click', 'Fun', 'Amazing', 'Wow', 'Cool', 'Nice', 'Great', 'Awesome'];
      return words[Math.floor(Math.random() * words.length)];
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.click-word {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  opacity: 0;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}
</style> 