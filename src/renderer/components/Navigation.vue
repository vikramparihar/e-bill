<template>
    <div>
        <header class="bg-green fg-white pb-1">
            <ul class="h-menu context h-menu-cus">
                <li>
                    <router-link :to="{name: 'home-page'}"><span class="mif-spoon-fork"></span> Home</router-link>
                </li>
                <li> 
                    <router-link :to="{name: 'dish-page'}"><img :src="dishIcon" width="18"/> Dishes</router-link>
                </li>
                <li> 
                    <router-link :to="{name: 'setting-page'}"><span class="mif-cogs"></span> Setting</router-link>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
    export default {
        name: "navigation",
        data () {
            return {
                electron: process.versions.electron,
                name: this.$route.name,
                node: process.versions.node,
                path: this.$route.path,
                platform: require('os').platform(),
                vue: require('vue/package.json').version,
                dishIcon: 'static/icons/icons8-food-service-32.png'
            }
        }
    }
</script>

<style>
@import '~metro4/build/css/metro-all.css';
@import '/static/fontawesome/css/all.min.css';
.h-menu-cus > li > a {
    font-size: 0.8rem;
}
</style>