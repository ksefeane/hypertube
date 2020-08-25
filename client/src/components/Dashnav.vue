<template>
  <div class="navigation">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.url" @click="resetSearch">
          <font-awesome-icon :icon="link.icon" :transform="link.transform" size="2x" class="icon" />
          <br />
          <span>{{ link.text }}</span>
        </router-link>
      </li>
      <li>
        <AppSearch />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    name: 'AppNavigation',
//   components: 
//   { AppSearch },
  data() {
    return {
      links: [
        {
          url: '/tops',
          text: 'Tops',
          icon: 'star',
          transform: 'shrink-7'
        },
        {
          url: '/movies',
          text: 'Movies',
          icon: 'film',
          transform: 'shrink-6'
        },
        {
          url: '/tv-shows',
          text: 'TV',
          icon: 'tv',
          transform: 'shrink-8'
        }
      ]
    };
  }
}
</script>