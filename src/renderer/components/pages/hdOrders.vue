<template>
  <div>
    <header class="bg-green fg-white pb-1">
      <ul class="h-menu context h-menu-cus">
        <li>
          <button class="button" @click="popupCreate = true">
            <span class="mif-add"></span>Create
          </button>
        </li>
      </ul>
    </header>
    <div class="container-fluid- mt-4">
      <div class="row">
        <div class="cell">
          <div class="panel" style="width:100%; font-size:0.8rem">
            <div
              class="panel-content p-0"
              data-role="panel"
              data-width="280"
              data-title-caption="Recent Bills"
              data-title-icon="<span class='mif-apps'></span>"
              data-role-panel="true"
            >
              <!-- {{ bill.items }}
                                <hr>
              {{ bills }}-->
              <Table size="small" :columns="columns1" :data="bills">
                <template
                  slot-scope="{ row }"
                  slot="customer"
                >{{ row.customer.name | ucwords }}</template>
                <template
                  slot-scope="{ row }"
                  slot="contact"
                >{{ row.customer.contact }}</template>
                <template slot-scope="{ row }" slot="total">
                  <span class="mif-inr"></span>
                  {{ row.total }}
                </template>
                <template
                  slot-scope="{ row }"
                  slot="date"
                >{{ row.createdAt | moment("MMMM Do YYYY, h:mm:ss a") }}</template>
                <template slot-scope="{ row, index }" slot="action">
                  <div style="width:120px" :id="index">
                    <button class="button small" @click="preview(row._id)">
                      <span class="mif-eye"></span>
                    </button>
                    <button class="button small" @click="updateId = row._id; getBill()">
                      <span class="mif-pencil"></span>
                    </button>
                    <button class="button small" @click="destroy(row._id)">
                      <span class="mif-bin"></span>
                    </button>
                  </div>
                </template>
              </Table>
              <Page
                :current="pageCurrent"
                :page-size="pageSize"
                :total="totalCount"
                show-sizer
                @on-change="changePage"
                @on-page-size-change="onPageSizeChange"
              />
            </div>
            <div class="panel-title bg-light">
              <span class="caption">Home Delivery Orders</span>
              <img :src="billIcon" width="20" />
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
              <div
                class="panel-content"
                data-role="panel"
                data-width="280"
                data-title-caption="Recent Bills"
                data-title-icon="<span class='mif-apps'></span>"
                data-role-panel="true"
              >
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
                        <input
                          v-model="bill.items[biIndex].dish"
                          :list="'dishList-'+biIndex"
                          class="input-small"
                          type="text"
                          placeholder="Dish"
                          required
                        />
                        <datalist :id="'dishList-'+biIndex">
                          <option v-for="dish in dishes" :key="dish._id" :value="dish.name"></option>
                        </datalist>
                      </td>
                      <td>
                        <input
                          v-model="bill.items[biIndex].quantity"
                          class="input-small"
                          type="number"
                          min="1"
                          placeholder="0"
                          required
                        />
                      </td>
                      <td>
                        <input
                          v-model="bill.items[biIndex].price"
                          class="input-small"
                          type="number"
                          min="1"
                          placeholder="0"
                          required
                        />
                      </td>
                      <td>
                        <input
                          v-model="bill.items[biIndex].total"
                          class="input-small"
                          readonly
                          type="number"
                          min="1"
                          placeholder="0"
                          required
                        />
                      </td>
                      <td>
                        <a v-if="biIndex !== 0" class="button mini" @click="removeList(biIndex)">
                          <span class="mif-cross"></span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" class="text-right">Grand Total: {{ bill.total }}</td>
                    </tr>
                    <tr>
                      <td>
                        <a class="button small" @click="addList">+ More</a>
                      </td>
                    </tr>
                  </table>
                  <hr />
                  <table class="table">
                    <tr>
                      <td>
                        <div class="form-group">
                          <label>Customer Name:</label>
                          <input
                            type="text"
                            v-model="bill.customer.name"
                            class="input-small"
                            maxlength="15"
                          />
                        </div>
                      </td>
                      <td>
                        <div class="form-group">
                          <label>Mobile Number:</label>
                          <input
                            type="text"
                            v-model="bill.customer.contact"
                            class="input-small"
                            maxlength="15"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="form-group">
                          <label>Address:</label>
                          <textarea
                            v-model="bill.customer.address"
                            class="input-small"
                            maxlength="400"
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Checkbox v-model="bill.gst">
                          <small>Is GST Applicable ?</small>
                        </Checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="mb-1">Discount:</span>
                        <input
                            type="text"
                            v-model="bill.discount"
                            class="input-small"
                            maxlength="15"
                          />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button class="button small">
                          <span class="mif-sd-card"></span>Save
                        </button>
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
              <div class="panel-title bg-light">
                <span class="caption">Create New Order</span>
                <img :src="billIcon" width="20" />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
    <Modal v-model="modalPreview" title="Preview" okText="Print" width="500">
      <div class="row" v-if="previewBill">
        <div class="cell">
          <table class="table compact" style="margin:0">
            <tr class="bg-light">
              <th align="left">Bill No.</th>
              <th align="right">1</th>
            </tr>
            <tr class="bg-light">
              <th align="left">Table No.</th>
              <th align="right">21</th>
            </tr>
            <tr>
              <td colspan="2">{{ previewBill.createdAt| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
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
            <tr>
              <th align="left" colspan="3" class="bg-light">Subtotal</th>
              <td>{{ subTotal }}</td>
            </tr>
            <tr>
              <th align="left" colspan="2" class="bg-light">Tax</th>
              <td>7%</td>
              <td>42.76</td>
            </tr>
            <tr>
              <th align="left" colspan="3" class="bg-light">Total</th>
              <td>653.64</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center">
        <p>
          Thank you for dining with us.
          <br />Visit again!
        </p>
        <div>
          <!-- <img src="https://barcodesegypt.com/wp-content/uploads/sites/123/2019/05/qr_code_5cdd30e269752.jpg" width="300"/> -->
        </div>
      </div>
    </Modal>
  </div>
</template>


<script>
import Recipe from "../../repository/recipeRepo";
import Bill from "../../repository/OrderRepo";
import Setting from "../../repository/settingRepo";
import VueApexCharts from "vue-apexcharts";
import CustomerRepo from '../../repository/customerRepo';
import Vue from "vue";
Vue.component("apexchart", VueApexCharts);

export default {
  name: "home",
  data() {
    return {
      totalCount: 0,
      pageSize: 10,
      pageCurrent: 1,
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
        customer: {
            name: '',
            address: '',
            contact: ''
        },
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
        discount: 0,
      },
      columns1: [
        {
          title: "Order No.",
          key: "billNo",
          sortable: true,
        },
        {
          title: "Customer Name",
          key: "customer",
          sortable: true,
          slot: "customer",
        },
        {
          title: "Contact",
          key: "contact",
          slot: "contact",
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
        let params = {
          page: this.pageCurrent,
          size: this.pageSize,
        };
        this.dishes = await Recipe.get();
        let result = await Bill.get(null, params);
        this.bills = result['orders'];
        this.totalCount = result['total'];
        this.bill['billNo'] = eval(this.bills.length + 1);  
        let setting = await Setting.get();
        if (setting.length) {
            this.setting = setting[0];
        }
      } catch (error) {
        this.$Message.error("Unable to load data");
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
          this.$Message.success("Order updated successfully");
        } else {
          this.bill["billNo"] = await Bill.getorderNo();
          await Bill.save(this.bill);
          await CustomerRepo.save(this.bill.customer);
          this.$Message.success("Order created successfully");
        }

        this.initBill();
        this.popupCreate = false;
        this.load();
      } catch (error) {
        console.log(error);
        this.$Message.error("Sorry Unable to create order");
      }
    },
    initBill() {
      this.bill = {
        customer: {
            name: '',
            address: '',
            contact: ''
        },
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
    async changePage(page) {
      this.pageCurrent = page;
      await this.load();
    },
    async onPageSizeChange(size) {
      this.pageSize = size;
      await this.load();
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