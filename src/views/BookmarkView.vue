<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BookmarkRestaurantItem from '@/components/BookmarkRestaurantItem.vue';
import restaurantsData from '@/data/restaurants.json'; // Adjust this path to where your data resides


const restaurants = restaurantsData.restaurants;  // This should directly give you the array of restaurants

</script>

<template>
  <Header />
  <main>
    <section class="ji gp uq">
      <div>
        <input type="button" id="btn" value="By Order"/>
        <input type="button" id="btn" value="Nearest"/>
      </div>
    </section>
    <section class="bb ye ki xn vq jb jo">
      <div class="wc zf iq my-grid" >
        <!-- <div class="flex flex-wrap"> -->
          <BookmarkRestaurantItem 
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :restaurant="restaurant" 
          />
        <!-- </div> -->
      </div>
    </section>
    <!-- Rest of your template... -->
    <section class="i pg gh ji">
      <!-- Bg Shape -->
      <img class="h p q" src="../assets/images/shape-16.svg" alt="Bg Shape" />

      <div class="bb ye i z-10 ki xn dr">
        <div class="tc uf sn tn un gg">
          <div class="animate_left to/2">
            <h2 class="fk vj zp pr lk ac">Join with 5000+ Startups Growing with Base.</h2>
            <p class="lk">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nibh lorem. Duis
              sed odio lorem. In a efficitur leo. Ut venenatis rhoncus.
            </p>
          </div>
          <div class="animate_right bf">
            <a href="#" class="vc ek kk hh rg ol il cm gi hi"> Get Started Now </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

<style scoped>
    @media (min-width: 640px) {
    .my-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 639px) {
    .my-grid {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
 
</style>