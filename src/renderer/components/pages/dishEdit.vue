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
                    <td>
                      <input
                        v-model="dish.name"
                        maxlength="255"
                        type="text"
                        class="input-small"
                        required
                        placeholder="Enter dish or recipe name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>
                      <input
                        v-model="dish.price"
                        type="number"
                        class="input-small"
                        placeholder="Price"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input class="small" type="submit" />&nbsp;
                      <button @click="confirmPopUp=true" class="button small bg-red fg-white" type="button">Delete</button>
                    
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div class="panel-title bg-light pl-2" style=" font-size:0.8rem"> 
               <span class="caption">Last updated on:</span> <span class="mif-calendar"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="confirmPopUp"
        title="Confirm"
        width="300"
        @on-ok="destroy($route.query.id)">
        <p>Are you sure you want to delete this item?</p>
    </Modal>
  </div>
</template>

<script>
import Recipe from "../../repository/recipeRepo";

export default {
  name: "dish-new",
  data() {
    return {
      confirmPopUp: false,  
      dish: {},
      dishIcon: "static/icons/icons8-food-service-32.png"
    };
  },
  beforeMount() {
    this.getDish();
  },
  methods: {
    async getDish() {
      try {
        this.dish = await Recipe.get(this.$route.query.id);
      } catch (error) {
        console.log(error);
        this.$Message.error("Sorry Unable to get");
      }
    },
    async onSave() {
        let name = this.$options.filters.ucwords(this.dish.name);
        this.dish.name = name;
      try {
        let has = await Recipe.hasDishByName(
          this.dish.name,
          this.$route.query.id
        );
        if (has) {
          this.$Message.info("This dish already exists");
          return false;
        }
        await Recipe.update(this.dish, this.$route.query.id);
        this.$router.push({ name: "dish-page" });
        this.$Message.success("Dish saved successfully");
      } catch (error) {
        console.log(error);
        this.$Message.error("Sorry Unable to save");
      }
    },
    destroy (id) {
        try{
            Recipe.destroy(id);
            this.$Message.success("Dish deleted successfully");
            this.$router.push({ name: "dish-page" });
        }
        catch(e) {
            this.$Message.error("Sorry Unable to delete");
        }
        
    }
  }
};
</script>

<style scoped></style>
