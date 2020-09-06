<template>
	<div class="grid">
		<div class="row">
		<div class="cell-2 p-0">
		<div class="app-sidebar">
			<ul class="v-menu bg-green fg-white pl-2">
			    <li class="menu-title">General</li>
			    <li> <router-link :to="{name: 'home-page'}"><span class="mif-home icon"></span> Home</router-link></li>
			    <li class="menu-title">Counter</li>
			    <li><router-link :to="{name: 'order-page'}"><span class="mif-windows icon"></span> Orders</router-link></li>
			    <li><router-link :to="{name: 'hdorder-page'}"><span class="mif-windows icon"></span> Home Delivery Orders</router-link></li>
			    <li><router-link :to="{name: 'customer-page'}"><span class="mif-windows icon"></span> Customers</router-link></li>
			    <!-- <li><a href="#"><span class="mif-library icon"></span> Bills</a></li> -->
			    <!-- <li><a href="#"><span class="mif-skype icon"></span> Skype</a></li> -->
			    <li class="menu-title">Kitchen</li>
			    <li><router-link :to="{name: 'dish-page'}"><span class="mif-spoon-fork icon"></span> Dishes</router-link></li>
			    <!-- <li><a href="#"><span class="mif-library icon"></span> Office 365</a></li>
				<li><a href="#"><span class="mif-skype icon"></span> Skype</a></li> -->
				<li class="menu-title">Setting</li>
			    <li><router-link :to="{name: 'setting-page'}"><span class="mif-cogs icon"></span> Setting</router-link></li>
			    <li class="menu-title">Account</li>
			    <li><a href="#"><span class="mif-skype icon"></span> Change Password</a></li>
			    <!-- <li class="menu-title">Support</li>
			    <li><a href="#"><span class="mif-skype icon"></span> Skype</a></li>
			    <li class="menu-title">Shop</li>
			    <li><a href="#"><span class="mif-cart icon"></span> Cart</a></li> -->
			</ul>
		</div>
		</div>
		<div class="cell-10 pt-0">
			<div class="main-content pl-5 pr-5">
				<router-view></router-view>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default {
        name: "layout",
        data () {
            return {
                
            }
        }
    }
</script>
<style>
	@import '~metro4/build/css/metro-all.css';
	@import '/static/fontawesome/css/all.min.css';
	.app-sidebar{
		/*width: 200px;
		display: inline-block;*/
		position: fixed;
	}
	.main-content{
		/*width: 100%;
		display: inline-block;
		padding: 20px;*/
	}
	.card-has-table .ivu-card-body{
		padding: 0px;
	}
</style>