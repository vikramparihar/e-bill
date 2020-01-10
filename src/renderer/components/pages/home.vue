<template>
    <div>
        <navigation></navigation>
        <div class="container-fluid">
            <!-- <div class="row mt-2">
                    <div class="cell-md-4 mt-4">
                        <div class="icon-box border bd-default">
                            <div class="icon bg-cyan fg-white"><span class="mif-cog"></span></div>
                            <div class="content p-4">
                                <div class="text-upper">cpu traffic</div>
                                <div class="text-upper text-bold text-lead">90%</div>
                            </div>
                        </div>
                    </div>
                    <div class="cell-md-4 mt-4">
                        <div class="icon-box border bd-default">
                            <div class="icon bg-red fg-white"><span class="mif-google-plus"></span></div>
                            <div class="content p-4">
                                <div class="text-upper">likes</div>
                                <div class="text-upper text-bold text-lead">41,410</div>
                            </div>
                        </div>
                    </div>
                    <div class="cell-md-4 mt-4">
                        <div class="icon-box border bd-default">
                            <div class="icon bg-green fg-white"><span class="mif-cart"></span></div>
                            <div class="content p-4">
                                <div class="text-upper">sales</div>
                                <div class="text-upper text-bold text-lead">1024</div>
                            </div>
                        </div>
                    </div>
                </div>     -->
                <div class="row">
                    <div class="cell">
                        <div class="panel" style="width:100%; font-size:0.8rem">
                            <div class="panel-content  p-0" data-role="panel" data-width="280" data-title-caption="Recent Bills" data-title-icon="<span class='mif-apps'></span>" data-role-panel="true">
                                <!-- {{ bill.items }}
                                <hr>
                                {{ bills }} -->
                                <Table size="small" :columns="columns1" @on-row-click="preview" :data="bills">
                                    <template slot-scope="{ row }" slot="total">
                                        <span class="mif-inr"></span>{{ row.total }}
                                    </template>
                                    <template slot-scope="{ row }" slot="date">
                                        {{ row.createdAt | moment("MMMM Do YYYY, h:mm:ss a") }}
                                    </template>
                                    <template slot-scope="{ row, index }" slot="action">
                                        <button class="button secondary small" @click="updateId = row._id; getBill()"><span class="mif-pencil"></span></button>
                                        <button class="button alert small" @click="destroy(row._id)"><span class="mif-bin"></span></button>
                                    </template>
                                </Table>
                            </div>
                            <div class="panel-title bg-light">
                                <span class="caption">Recent Bills</span><img :src="billIcon" width="20"/>
                                <span class="caption text-right"><button class="button small" @click="popupCreate = true"><span class="mif-add"></span>Create</button></span>
                                </div>
                            
                            </div>
                        </div>
                    
                    </div>
                    <Drawer
                        :title="updateId ? 'Edit': 'Create'"
                        v-model="popupCreate"
                        width="720"
                        @on-close="resetDrawer"
                        :mask-closable="false"
                        :styles="styles"
                    >
                        <div class="row">
                            <div class="cell">
                            <div class="panel" style="width:100%; font-size:0.8rem">
                                <div class="panel-content" data-role="panel" data-width="280" data-title-caption="Recent Bills" data-title-icon="<span class='mif-apps'></span>" data-role-panel="true">
                                    <form v-on:submit.prevent="onSave">
                                    <table class="table mt-0 mb-0">
                                        <thead>
                                            <tr>
                                                <th>Dish</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tr v-for="(bi, biIndex) in bill.items" :key="biIndex">
                                            <td>
                                                <input v-model="bill.items[biIndex].dish" :list="'dishList-'+biIndex" class="input-small" type="text" placeholder="Dish" required>
                                                <datalist :id="'dishList-'+biIndex">
                                                    <option v-for="dish in dishes" :key="dish._id" :value="dish.name"></option>
                                                </datalist>
                                            </td>
                                            <td>
                                                <input v-model="bill.items[biIndex].quantity" class="input-small" type="number" min="1" placeholder="0" required>
                                            </td>
                                            <td>
                                                <input v-model="bill.items[biIndex].price" class="input-small" type="number" min="1" placeholder="0" required>
                                            </td>
                                            <td>
                                                <input v-model="bill.items[biIndex].total" class="input-small" readonly type="number" min="1" placeholder="0" required>
                                            </td>
                                            <td>
                                                <a v-if="biIndex !== 0" class="button mini" @click="removeList(biIndex)"><span class="mif-cross"></span></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right">
                                                Grand Total: {{ bill.total }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a class="button small" @click="addList">More</a></td>
                                        </tr>
                                        
                                    </table>
                                    <hr>
                                    <table class="table">
                                        <tr>
                                            <td>
                                            <div class="form-group">
                                                    <label>Table No. or Code</label>
                                                    <input v-model="bill.tableNo" type="text" class="input-small" maxlength="8">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Checkbox v-model="bill.gst"><small>   Is GST Applicable ? </small></Checkbox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button class="button small"><span class="mif-sd-card"></span>Save</button>
                                            </td>
                                        </tr>
                                    </table>
                                    </form>
                                </div>
                                <div class="panel-title bg-light"><span class="caption">Create New Bill</span><img :src="billIcon" width="20"/></div>
                                    
                                </div>
                            </div>         
                        </div>
                    </Drawer>
                </div>
                <!-- <apexchart width="500" type="bar" :options="options" :series="series"></apexchart> -->
                
        <Modal
            v-model="modalPreview"
            title="Preview"
            okText= 'Print'
            >
            <!-- {{ previewBill }} -->
            <div class="text-center">
                <section>Radhe Restorent</section>
                <section>A 402 Radha Residency, Opp Maxus Mall</section>
                <section>
                    <label>Table No.</label> 21
                    <label>Bill No.</label> 01
                </section>
            </div>
        </Modal>
        </div>
</template>


<script>
    import Recipe from '../../repository/recipeRepo';
    import Bill from '../../repository/billRepo';
    import VueApexCharts from 'vue-apexcharts'
    import Vue from 'vue';
    Vue.component('apexchart', VueApexCharts)
    
    export default {
        name: "home",
        data () {
            return {
                modalPreview: false,
                previewBill: {},
                updateId: null,
                popupCreate: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                billIcon: 'static/icons/icons8-estimate-32.png',
                dishes: [],
                bills:[],
                bill: {
                    items: [{
                        uuid: new Date().getTime(),
                        dish: '',
                        quantity: 1,
                        price: 0,
                        total: 0
                    }],
                    total: 0,
                },
                columns1: [
                    {
                        title: 'Bill No.',
                        key: 'billNo',
                        sortable: true
                    },
                    {
                        title: 'Table No.',
                        key: 'tableNo',
                        sortable: true
                    },
                    {
                        title: 'Amount',
                        key: 'total',
                        sortable: true,
                        slot: 'total'
                    },
                    {
                        title: 'Date',
                        key: 'createdAt',
                        sortable: true,
                        slot: 'date'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                options: {
                    chart: {
                    id: 'vuechart-example'
                    },
                    xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    }
                },
                series: [{
                    name: 'series-1',
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }]
            }
        },
        beforeMount() {
            this.load();
        },
        methods:{
            async load() {
                try {
                  this.dishes = await Recipe.get();  
                  this.bills = await Bill.get();
                  this.bill['billNo'] = eval(this.bills.length + 1);  
                } catch (error) {
                    this.$Message.error('Unable to load dishes');
                    console.log(error);
                }
            },
            addList(){
                let newList =   { 
                                    uuid: new Date().getTime(),
                                    dish: '',
                                    quantity: 1,
                                    price: 0,
                                    total: 0
								};
    	        this.bill.items.push(newList);
            },
            removeList(index) {
                try {
                    if (index > -1) {
                    this.$Modal.confirm({
                        width:"300",
                        title: 'Are you want to delete ?',
                        content: '',
                        onOk: () => {
                            this.bill.items.splice(index, 1);
                        },
                        onCancel: () => {
                            
                        }
                    });
                    
                }    
                } catch (error) {
                    
                }
            },
            async onSave () {
                try {
                    if (this.updateId) {
                        await Bill.update(this.bill, this.updateId);
                        this.$Message.success('Bill updated successfully'); 
                    } else {
                        this.bill['billNo'] = await Bill.getBillNo();
                        await Bill.save(this.bill);
                        this.$Message.success('Bill created successfully'); 
                    }
                    
                    this.initBill();
                    this.popupCreate = false;
                    this.load();
                } catch (error) {
                    console.log(error);
                    this.$Message.error('Sorry Unable to create bill')
                }
            },
            initBill() {
                this.bill =  {
                    items: [{
                        uuid: new Date().getTime(),
                        dish: '',
                        quantity: 1,
                        price: 0,
                        total: 0
                    }],
                    total: 0
                }
            },
            async getBill() {
                try {
                  this.bill = await Bill.get(this.updateId);
                  this.popupCreate = true;  
                } catch (error) {
                    this.$Message.error('Unable to load bill');
                    console.log(error);
                }
            },
            resetDrawer() {
                this.updateId = null;
                this.initBill();
            },
            destroy (id) {
                try{
                    this.$Modal.confirm({
                        width:"300",
                        title: 'Are you want to delete ?',
                        content: '',
                        onOk: () => {
                            Bill.trash(id);
                            this.$Message.success("Bill deleted successfully");
                            this.load();
                        },
                        onCancel: () => {
                            
                        }
                    });
                }
                catch(e) {
                    this.$Message.error("Sorry Unable to delete");
                }
            },
            preview (bill, index) {
                this.previewBill = bill;
                this.modalPreview = true;
            }
        },
        watch: {
            'bill': {
                    deep: true, 
                    handler(newBill, oldBill) {
                        let grandTotal = 0;
                        for (const [index, item] of this.bill.items.entries()) {
                            let selectedDish = this.dishes.filter(node => { return node.name === item.dish});
                            if (selectedDish.length) {
                                let price = selectedDish[0].price;
                                this.bill.items[index].price = price;
                                let total = eval(price * this.bill.items[index].quantity);
                                this.bill.items[index].total = total;
                                grandTotal += total;
                            }
                        }
                        this.bill.total = grandTotal;
                    }
            }
            
        },
    }
</script>

<style scoped>
</style>