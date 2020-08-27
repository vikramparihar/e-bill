<template>
  <div>
    <header class="bg-green fg-white pb-1">
      <p class="p-2 bg-white fg-black">Welcome to my kitchen .</p>
    </header>
    <div class="container-fluid-">
      <div class="row">
        <div class="cell-md-4 mt-4">
          <Card dis-hover>
            <span class="float-left">Total Order</span>
            <span class="float-right">150</span>
            <Progress :percent="25" hide-info />
          </Card>
        </div>
        <div class="cell-md-4 mt-4">
          <Card dis-hover>
            <span class="float-left">Total Bill</span>
            <span class="float-right">130</span>
            <Progress :percent="80" hide-info />
          </Card>
        </div>
        <div class="cell-md-4 mt-4">
          <Card dis-hover>
            <span class="float-left">Total Earning</span>
            <span class="float-right">$52554</span>
            <Progress :percent="80" hide-info />
          </Card>
        </div>
      </div>
      <div class="row mt-2">
        <div class="cell">
          <Card dis-hover :bordered="true" class="card-has-table">
            <p slot="title">Recent Orders</p>
            <Table size="small" :columns="columns1" :data="bills">
                <template slot-scope="{ row }" slot="total">
                    <span class="mif-inr"></span>{{ row.total }}
                </template>
                <template slot-scope="{ row }" slot="date">
                    {{ row.createdAt | moment("MMMM Do YYYY, h:mm:ss a") }}
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div style="width:120px" :id="index">
                        
                        <button title="Preview" class="button small"  @click="preview(row._id)"><span class="mif-eye"></span></button>
                        
                    </div>
                </template>
            </Table>
          </Card>
        </div>
      </div>
    </div>
    <Modal
            v-model="modalPreview"
            title="Preview"
            okText= 'Print'
            width="400"
            >
            <div class="row" v-if="previewBill">
                <div class="cell">
                    <table class="table compact" style="margin:0">
                        <tr class="bg-light">
                            <th align="left">Bill No. </th>
                            <th align="right">1</th>
                        </tr>
                        <tr class="bg-light">
                            <th align="left">Table No. </th>
                            <th align="right">21</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                {{ previewBill.createdAt| moment("MMMM Do YYYY, h:mm:ss a") }}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="cell">
                    <div style="font-size:13px">
                        <section>{{ setting.hotelName }}</section>
                        <section>{{ setting.address }}</section>
                        <section>{{ setting.contact }}</section>
                    </div>
                </div>
            </div>
            
            <div class="preview-table" v-if="previewBill">
                <table class="table compact">
                    <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in previewBill.items" :key="item.uuid">
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.dish }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.total }}</td>
                    </tr>
                    <tr><th align="left" colspan="3" class="bg-light">Subtotal</th><td>{{ subTotal }}</td></tr>
                    <tr><th align="left" colspan="2" class="bg-light">Tax</th><td>7%</td><td>42.76</td></tr>
                    <tr><th align="left" colspan="3" class="bg-light">Total</th><td>653.64</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <p>Thank you for dining with us.<br>Visit again!</p>
                <div>
                    <!-- <img src="https://barcodesegypt.com/wp-content/uploads/sites/123/2019/05/qr_code_5cdd30e269752.jpg" width="300"/> -->
                </div>
            </div>
        </Modal>
  </div>
</template>


<script>
import Recipe from "../../repository/recipeRepo";
import Bill from "../../repository/billRepo";
import Setting from "../../repository/settingRepo";
import VueApexCharts from "vue-apexcharts";
import Vue from "vue";
Vue.component("apexchart", VueApexCharts);

export default {
  name: "home",
  data() {
    return {
      dishIcon: "static/icons/icons8-food-service-32.png",
      previewBill: null,
      setting: {},
      modalPreview: false,
      updateId: null,
      popupCreate: false,
      billPreview: {},
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
      },
      billIcon: "static/icons/icons8-estimate-32.png",
      dishes: [],
      bills: [],
      billPrint: {},
      bill: {
        items: [
          {
            uuid: new Date().getTime(),
            dish: "",
            quantity: 1,
            price: 0,
            total: 0,
          },
        ],
        total: 0,
      },
      columns1: [
        {
          title: "Order No.",
          key: "billNo",
          sortable: true,
        },
        {
          title: "Table No.",
          key: "tableNo",
          sortable: true,
        },
        {
          title: "Amount",
          key: "total",
          sortable: true,
          slot: "total",
        },
        {
          title: "Date",
          key: "createdAt",
          sortable: true,
          slot: "date",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      subTotal: 0,
      tax: 0,
      total: 0,
    };
  },
  beforeMount() {
    this.load();
  },
  methods: {
    async load() {
      try {
        this.dishes = await Recipe.get();
        let result = await Bill.get();
        this.bills = result['bills'];
        this.bill["billNo"] = eval(this.bills.length + 1);
        let setting = await Setting.get();
        if (setting.length) {
          this.setting = setting[0];
        }
      } catch (error) {
        this.$Message.error("Unable to load dishes");
        console.log(error);
      }
    },
    addList() {
      let newList = {
        uuid: new Date().getTime(),
        dish: "",
        quantity: 1,
        price: 0,
        total: 0,
      };
      this.bill.items.push(newList);
    },
    removeList(index) {
      try {
        if (index > -1) {
          this.$Modal.confirm({
            width: "300",
            title: "Are you want to delete ?",
            content: "",
            onOk: () => {
              this.bill.items.splice(index, 1);
            },
            onCancel: () => {},
          });
        }
      } catch (error) {}
    },
    async onSave() {
      try {
        if (this.updateId) {
          await Bill.update(this.bill, this.updateId);
          this.$Message.success("Bill updated successfully");
        } else {
          this.bill["billNo"] = await Bill.getBillNo();
          await Bill.save(this.bill);
          this.$Message.success("Bill created successfully");
        }

        this.initBill();
        this.popupCreate = false;
        this.load();
      } catch (error) {
        console.log(error);
        this.$Message.error("Sorry Unable to create bill");
      }
    },
    initBill() {
      this.bill = {
        items: [
          {
            uuid: new Date().getTime(),
            dish: "",
            quantity: 1,
            price: 0,
            total: 0,
          },
        ],
        total: 0,
      };
    },
    async getBill() {
      try {
        this.bill = await Bill.get(this.updateId);
        this.popupCreate = true;
      } catch (error) {
        this.$Message.error("Unable to load bill");
        console.log(error);
      }
    },
    resetDrawer() {
      this.updateId = null;
      this.initBill();
    },
    destroy(id) {
      try {
        this.$Modal.confirm({
          width: "300",
          title: "Are you want to delete ?",
          content: "",
          onOk: () => {
            Bill.trash(id);
            this.$Message.success("Bill deleted successfully");
            this.load();
          },
          onCancel: () => {},
        });
      } catch (e) {
        this.$Message.error("Sorry Unable to delete");
      }
    },
    async preview(id) {
      let bill = await Bill.get(id);
      this.previewBill = bill;
      this.modalPreview = true;
      let st = 0;
      for (const iterator of bill.items) {
        st = st + iterator.total;
      }
      this.subTotal = st;
    },
  },
  watch: {
    bill: {
      deep: true,
      handler(newBill, oldBill) {
        let grandTotal = 0;
        for (const [index, item] of this.bill.items.entries()) {
          let selectedDish = this.dishes.filter((node) => {
            return node.name === item.dish;
          });
          if (selectedDish.length) {
            let price = selectedDish[0].price;
            this.bill.items[index].price = price;
            let total = eval(price * this.bill.items[index].quantity);
            this.bill.items[index].total = total;
            grandTotal += total;
          }
        }
        this.bill.total = grandTotal;
      },
    },
  },
};
</script>

<style scoped>
.preview-table thead {
  border-bottom: 2px dashed #e4e4e4;
}
</style>