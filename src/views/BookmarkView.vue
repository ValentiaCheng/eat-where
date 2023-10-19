<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BookmarkRestaurantItem from '@/components/BookmarkRestaurantItem.vue';
import restaurantsData from '@/data/restaurants.json'; // Adjust this path to where your data resides
import FilterButton from '@/components/FilterButton.vue';
import { ref, computed } from 'vue';
import SortButton from '@/components/SortButton.vue';

import FilterButtonOnSide from '@/components/FilterButtonOnSide.vue';



const restaurants = restaurantsData.restaurants;  // This should directly give you the array of restaurants

const restaurantCategories: string[] = [];
restaurantCategories.push("All");

// var categories: string[] = [];
for (const restaurant of restaurants) {
    for (const cat of restaurant.category) {
        if (restaurantCategories.includes(cat) == false) {
            restaurantCategories.push(cat);
        }
    }
}

const search = ref('');
const catName = computed(() => {
    return search

});

const restaurantsFiltered: any[] = [];
const filter = ref(true);

//use this for method
const myAction = (category: string) => {
    restaurantsFiltered.length = 0;
    if (category == "All") {
        filter.value = true;
    } else {
        filter.value = true;
        filter.value = false;
        for (const restaurant of restaurants) {
            console.log(restaurant.category.includes(category));
            if (restaurant.category.includes(category) == true) {
                console.log("hello");
                restaurantsFiltered.push(restaurant);
            }
        }
    }

};

const sortbyabc = () => {
    // filter.value = false;
    // for (const restaurant of restaurants) {
    //         console.log(restaurant.category.includes(category));
    //         if (restaurant.category.includes(category) == true) {
    //             console.log("hello");
    //             restaurantsFiltered.push(restaurant);
    //         }
    //     }

};


// const 
// console.log(cat.value);

</script>

<template>
    <Header />
    <main>
        <section class="ji gp uq">
            <div>
                <input type="button" id="btn" value="By Order" />
                <input type="button" id="btn" value="Nearest" />
            </div>
        </section>
        <section class="bb ye ki vq jb jo">
            <div>
                <input type="button" id="btn" value="By ABC" style="background: pink; border-color: black;"
                    @click="sortbyabc" />
                <input type="button" id="btn" value="By Price" style="background-color: pink; border-color: black;"
                    @click="sortbyprice" />
                    {{ catName }}
                        <input type="text" v-model="search" />
                        <span>{{ search }}</span>

            </div>
            <div class="grid grid-cols-10">
                <div class="col-span-2 pr-4">
                    <div class="overflow-y-scroll sticky gap-24 max-h-[calc(100vh-168px)] border-solid border-2 border-indigo-55 rounded-lg p-4">
                        <p>FILTER</p>
                    
                    <div class="scrollable-content  ">
                        <h3 class="fold-black text-black pb-2">Categories</h3>
                        <FilterButtonOnSide @filter-event="myAction" v-for="category in restaurantCategories" :key="category"
                            :category="category" />
                    </div>
                    <SortButton />
                </div>
            </div>
                <div class="col-span-8">
                    <div class="scrollable-content overflow-x-scroll">
                        <FilterButton @filter-event="myAction" v-for="category in restaurantCategories" :key="category"
                            :category="category" />
                    </div>
                    <div class="overflow-y-scroll">
                       
                        <div v-if="filter" class="wc zf iq my-grid" style="min-width: 450px;">
                            <!-- <div class="flex flex-wrap"> -->
                            <BookmarkRestaurantItem v-for="restaurant in restaurants" :key="restaurant.id"
                                :restaurant="restaurant" />
                            <!-- </div> -->
                        </div>
                        <div v-else>
                            <BookmarkRestaurantItem v-for="restaurant in restaurantsFiltered" :key="restaurant.id"
                                :restaurant="restaurant" />

                        </div>
                    </div>
                </div>
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
@media (min-width: 1050px) {
    .my-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 1051px) {
    my-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

.scrollable-content {
    /* overflow-x: auto; */
    /* Enable horizontal scrolling */
    white-space: nowrap;
    /* Prevent buttons from wrapping to the next line */
    margin-bottom: 80px;
}

/* Remove scrollbar */
.scrollable-content::-webkit-scrollbar {
    width: 0;
    height: 0;
}

/* Remove scrollbar thumb */
.scrollable-content::-webkit-scrollbar-thumb {
    background: transparent;
}

/* Remove scrollbar track */
.scrollable-content::-webkit-scrollbar-track {
    background: transparent;
}
</style>