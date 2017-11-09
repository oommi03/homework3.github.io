<style lang="css">
  @import "../../css/style.css";
</style>
<template>
    <div>
        <nav class="navbar navbar-default">
        <ul class="nav nav-pills navbar-left" style="margin-left:10Px" >
                  <li role="presentation"><h4>Bookmaker.com</h4></li>
        </ul>
        <ul class="nav nav-pills navbar-right" style="margin-right:5Px" >
            <li role="presentation"><router-link to="/detail">Profile</router-link></li>
            <li role="presentation"><router-link to="/bookmarker">Bookmarks</router-link></li>
            <li role="presentation"><router-link to="/about">About Us</router-link></li>
            <li role="presentation"><a @click="logout">Sign Out</a></li>
        </ul>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Header',
    methods: {
        logout() {
            firebase.auth().signOut().then( () => {
                this.$router.push( { name: 'Login'});
            })
        }
    },
}
</script>
