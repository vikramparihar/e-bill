<template>
    <div>
        <navigation></navigation>
        <div class="container-fluid">
            <div class="row">
                <div class="cell offset-10 text-right">
                    <router-link class="button light small" :to="{name: 'dish-new'}"><span class="mif-plus"></span> Add New</router-link>
                </div>
            </div>
            <div class="panel">
                <div class="panel-content">
                    <form class="mt-2">
                        <input v-model="search" type="text" class="input-small" data-role="input" placeholder="Search Dishes" data-search-button="true">
                    </form>
                    <table class="table table-border- row-hover cell-border- subcompact">
                        <tbody>
                            <tr v-for="(dish, index) in filteredDishes" :key="index" @click="goEdit(dish._id)">
                                <td>{{ index+1 }}</td>
                                <td>{{ dish.name }}</td>
                                <td><img :src="rupeeIcon" width="18"/>{{ dish.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="panel-title bg-light pl-2" style=" font-size:0.8rem">
                    <img :src="dishIcon" width="18"/> &nbsp;List of dishes
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Recipe from '../../repository/recipeRepo';
    export default {
        name: "dish",
        data () {
            return {
                dishes:[],
                rupeeIcon: 'static/icons/icons8-rupee-32.png',
                search: '',
                dishIcon: 'static/icons/icons8-food-service-32.png'
            }
        },
        beforeMount() {
            this.load();
        },
        methods:{
            async load() {
                try {
                  this.dishes = await Recipe.get();  
                } catch (error) {
                    this.$Message.error('Unable to load dishes');
                    console.log(error);
                }
            },
            goEdit (id) {
                this.$router.push({
                    name: 'dish-edit',
                    query: { id: id }
                });
            }
        },
        computed:
        {
            filteredDishes() {
                return this.dishes.filter((cust) =>{return cust.name.toLowerCase().indexOf(this.search.toLowerCase())>=0;});
            }
        }
    }
</script>

<style scoped>
</style>