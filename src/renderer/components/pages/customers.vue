<template>
    <div>
        <header class="bg-green fg-white pb-1">
            <ul class="h-menu context h-menu-cus">
                <li>
                    <router-link  tag="button" class="button light d-block" :to="{name: 'dish-new'}"><span class="mif-add"></span> Add New</router-link>
                </li>
            </ul>
        </header>
        <div class="container-fluid- mt-4">
            <div class="panel">
                <div class="panel-content">
                    {{ customers }}
                </div>
                <div class="panel-title bg-light pl-2" style=" font-size:0.8rem">
                    Customers
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CustomerRepo from '../../repository/customerRepo';
export default {
    data () {
        return {
            customers: []
        }
    },
    async beforeMount () {
        await this.load();
    },
    methods: {
        async load() {
            let response = await CustomerRepo.get();
            this.customers = response['customers'];
        }
    },
}
</script>
<style scoped>

</style>