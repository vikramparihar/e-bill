<template>
	<div class="grid">
		<div class="row">
		<div class="cell-2 p-0">
		<div class="app-sidebar">
			<ul class="v-menu bg-green fg-white">
			    <li class="menu-title">General</li>
			    <li><a href="#"><span class="mif-home icon"></span> Home</a></li>
			    <li class="menu-title">Services</li>
			    <li><a href="#"><span class="mif-windows icon"></span> Windows</a></li>
			    <li><a href="#"><span class="mif-library icon"></span> Office 365</a></li>
			    <li><a href="#"><span class="mif-skype icon"></span> Skype</a></li>
			    <li class="menu-title">Products</li>
			    <li><a href="#"><span class="mif-windows icon"></span> Windows</a></li>
			    <li><a href="#"><span class="mif-library icon"></span> Office 365</a></li>
			    <li><a href="#"><span class="mif-skype icon"></span> Skype</a></li>
			    <li class="menu-title">Support</li>
			    <li>
			        <a href="#" data-hotkey="Alt+F1">Community</a>
			        <ul class="v-menu" data-role="dropdown">
			            <li><a href="#">Blog</a></li>
			            <li><a href="#">Github</a></li>
			            <li><a href="#">Forum</a></li>
			            <li class="divider"></li>
			            <li class="p-2 bg-light">
			                <button class="button square primary"><span class="mif-target"></span></button>
			                <button class="button square success"><span class="mif-apps"></span></button>
			                <button class="button square alert"><span class="mif-file-code"></span></button>
			                <button class="button square warning"><span class="mif-download"></span></button>
			            </li>
			        </ul>
			    </li>
			    <li class="menu-title">Shop</li>
			    <li><a href="#"><span class="mif-cart icon"></span> Cart</a></li>
			</ul>
		</div>
		</div>
		<div class="cell-10 pt-0">
			<div class="main-content">
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
	}
	.main-content{
		/*width: 100%;
		display: inline-block;
		padding: 20px;*/
	}
</style>