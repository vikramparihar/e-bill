<template>
    <div>
        <navigation></navigation>
        <div class="container-fluid">
            <div class="row">
                <div class="cell-8">
            <div class="panel w-100">
                
                <div class="panel-content">
                    <form v-on:submit.prevent="onSave">
                        <table class="table subcompact">
                            <tr>
                                <td>Dish Name:</td>
                                <td><input v-model="dish.name" maxlength="255" type="text" class="input-small" required placeholder="Enter dish or recipe name"/></td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td><input v-model="dish.price" type="number" class="input-small" placeholder="Price" required/></td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="small" type="submit">
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="panel-title bg-light pl-2" style="font-size:0.8rem">
                    <span class="caption"> Add New Dish</span><img :src="dishIcon" width="18"/>
                </div>
            </div>
                </div>
            </div>
        </div>        
    </div>
</template>


<script>
    import Recipe from '../../repository/recipeRepo';

    export default {
        name: "dish-new",
        data () {
            return {
                dish:{},
                dishIcon: 'static/icons/icons8-food-service-32.png'
            }
        },
        beforeMount() {
        },
        methods: {
            async onSave() {
                try {
                    let name = this.$options.filters.ucwords(this.dish.name);
                    this.dish.name = name;
                    let has = await Recipe.hasDishByName(this.dish.name);
                    if (has){
                        this.$Message.info('This dish already exists');
                        return false;
                    }
                    await Recipe.save(this.dish);
                    this.$router.push({name: 'dish-page'});   
                    this.$Message.success('Dish saved successfully'); 
                } catch (error) {
                    console.log(error);
                    this.$Message.error('Sorry Unable to save')
                }
            },

            
        }
    }
</script>

<style scoped>
</style>