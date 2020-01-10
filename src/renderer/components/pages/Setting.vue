<template>
    <div>
        <navigation></navigation>
        <div class="container-fluid">
        

                <div class="row">
                    <div class="cell-8">
                        <div class="panel" style="width:100%; font-size:0.8rem">
                            <div class="panel-content">
                                <Tabs type="card" size="small" :animated="false">
                                    <TabPane label="General setting">
                                        <form v-on:submit.prevent="onSubmit">
                                            <table class="table subcompact-">
                                                <tr>
                                                    <td>Hotel/Restorent Name </td>
                                                    <td><input v-model="setting.hotelName" maxlength="255" type="text" class="input-small" required placeholder=""/></td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td><textarea v-model="setting.address" required></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type="submit" class="small">
                                                    </td>
                                                </tr>
                                            </table>
                                        </form>
                                    </TabPane>
                                    <TabPane label="GST Setting">
                                        <form v-on:submit.prevent="onSubmit">
                                            <table class="table subcompact-">
                                                <tr>
                                                    <td>GST No.</td>
                                                    <td><input v-model="setting.gstNo" maxlength="255" type="text" class="input-small" required placeholder=""/></td>
                                                </tr>
                                                <tr>
                                                    <td>IGST</td>
                                                    <td><input v-model="setting.igst" type="number" class="input-small" placeholder="" required/></td>
                                                </tr>
                                                <tr>
                                                    <td>CGST</td>
                                                    <td><input v-model="setting.cgst" type="number" class="input-small" placeholder="" required/></td>
                                                </tr>
                                                <tr>
                                                    <td>SGST</td>
                                                    <td><input v-model="setting.sgst" type="number" class="input-small" placeholder="" required/></td>
                                                </tr>
                                                <tr>
                                                    <td>State Code</td>
                                                    <td><input v-model="setting.stateCode" type="text" pattern="[0-9]" maxlength="2" class="input-small" placeholder="" required/></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type="submit" class="small">
                                                    </td>
                                                </tr>
                                            </table>
                                        </form>
                                    </TabPane>
                                    <TabPane label="Bill setting">
                                        
                                    </TabPane>
                                </Tabs>
                            </div>
                            <div class="panel-title bg-light pl-2"><span class="caption">Setting</span><span class="mif-cogs"></span></div>
                            
                            </div>
                        </div>
                </div>
                
        </div>
    </div>
</template>


<script>
    import Setting from "../../repository/settingRepo";

    
    export default {
        name: "setting-page",
        data () {
            return {
                setting: {
                    gstNo: '',
                    cgst: '',
                    igst: '',
                    sgst: '',
                    hotelName: '',
                    stateCode: '',
                    address: ''
                }
            }
        },
        beforeMount() {
            this.load();
        },
        methods:{
            async load () {
                let setting = await Setting.get();
                if (setting.length) {
                    this.setting = setting[0];
                }
            },
            async onSubmit() {
                if (this.setting._id !== undefined){
                    try {
                        await Setting.update(this.setting, this.setting._id);
                        this.load();
                        this.$Message.success("Setting saved successfully");
                    } catch (error) {
                        console.log(error);
                        this.$Message.error("Sorry Unable to save");
                    }
                } else {
                    try {
                        await Setting.save(this.setting);
                        this.load();
                        this.$Message.success("Setting saved successfully");
                    } catch (error) {
                        console.log(error);
                        this.$Message.error("Sorry Unable to save");
                    }
                }
            }   
        }
    }
</script>

<style scoped>

</style>