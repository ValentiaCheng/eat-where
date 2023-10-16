<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router';

const navigationOpen = ref(false)
const pageOffSet = ref(window.scrollY)
const dropDown = ref(false)

const route = useRoute()
const currentRouteName = computed(() => route.name)
console.log(currentRouteName.value)

const toggleNavBar = () => (navigationOpen.value = !navigationOpen.value)
const toggleDropDown = () => (dropDown.value = !dropDown.value)
const updateScrollOffset = () => {
    pageOffSet.value = window.scrollY
}
const closeNavBarOnLeave = () => (navigationOpen.value = false)

onMounted(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  window.addEventListener('scroll', updateScrollOffset);
});

// Remove the scroll event listener when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollOffset);
});
    
</script>

<template>
  <!-- ===== Header Start ===== -->
  <header class="g s r vd ya cj" :class="{ 'hh sm _k dj bl ll' : (pageOffSet > 20) }" >
    <div class="bb ze ki xn 2xl:ud-px-0 oo wf yf i" >
      <div class="vd to/4 tc wf yf">
        <a href="/">
          <img class="om" src="../assets/images/logo-light.svg" alt="Logo Light" />
          <img class="xc nm" src="../assets/images/logo-dark.svg" alt="Logo Dark" />
        </a>

        <!-- Hamburger Toggle BTN -->
        <button class="po rc" @click="toggleNavBar">
          <span class="rc i pf re pd">
            <span class="du-block h q vd yc">
              <span
                class="rc i r s eh um tg te rd eb ml jl dl"
                :class="{ 'ue el': !navigationOpen }"
              ></span>
              <span
                class="rc i r s eh um tg te rd eb ml jl fl"
                :class="{ 'ue qr': !navigationOpen }"
              ></span>
              <span
                class="rc i r s eh um tg te rd eb ml jl gl"
                :class="{ 'ue hl': !navigationOpen }"
              ></span>
            </span>
            <span class="du-block h q vd yc lf">
              <span
                class="rc eh um tg ml jl el h na r ve yc"
                :class="{ 'sd dl': !navigationOpen }"
              ></span>
              <span
                class="rc eh um tg ml jl qr h s pa vd rd"
                :class="{ 'sd rr': !navigationOpen }"
              ></span>
            </span>
          </span>
        </button>
        <!-- Hamburger Toggle BTN -->
      </div>

      <div class="vd wo/4 sd qo f ho oo wf yf" :class="{ 'd hh rm sr td ud qg ug jc yh': navigationOpen }" @mouseleave="closeNavBarOnLeave">
        <nav>
          <ul class="tc _o sf yo cg ep">
            <li><a href="/" class="xl">Home</a></li>
            <li class="c i">
              <a href="#" class="xl tc wf yf bg" @click="toggleDropDown">
                Pages

                <svg
                  class="th mm we fd pf"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  :class="{ 'wh': dropDown }"
                >
                  <path
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  />
                </svg>
              </a>

              <!-- Dropdown Start -->
              <ul class="a"  :class="{ 'tc': dropDown }">
                <li><a href="/grid" class="xl">Blog Grid</a></li>
                <li><a href="/single" class="xl">Blog Single</a></li>
                <li><a href="/login" class="xl">Sign In</a></li>
                <li><a href="/register" class="xl">Sign Up</a></li>
                <li><a href="/error" class="xl">404</a></li>
              </ul>
              <!-- Dropdown End -->
            </li>
            <li><a href="/location" class="xl">Location</a></li>
            <li><a href="/#support" class="xl">Support</a></li>
                <li><a href="/bookmark" class="xl">bookmark</a></li>
            <li><a href="/profile" class="xl">Profile</a></li>
          </ul>
       
            </nav>

        <div class="tc wf ig pb no">
          <a href="/login" :class="{ 'lk gh dk rg tc wf xf _l gi hi': currentRouteName == 'login' }">Login</a>
          <a href="/register" :class="{ 'lk gh dk rg tc wf xf _l gi hi': currentRouteName == 'register' }">Register</a>
        </div>
      </div>
    </div>
  </header>
  <!-- ===== Header End ===== -->
</template>
