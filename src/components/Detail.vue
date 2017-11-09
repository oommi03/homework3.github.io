<template>
  <div class="detail">
    <div class="container">
    <div class="header clearfix">
            <h1 class="text-muted">{{ msg }}</h1>
    </div>
    <h3>
    <p v-if="user.name">Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Website: {{ user.url }}</p>
    <p>Phone: {{ user.phone }}</p>
    </h3>
    <br>
    <footer class="footer">
        <p>&copy; 2016 Bookmarker, Inc.</p>
    </footer>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'

var md5 = require('md5');

export default {
  name: 'Detail',
  data () {
    return {
      msg: 'User Information',
      user: {
        photoURL: '',
        userId: '',
        name: '',
        email: '',
        url: '',
        phone: ''
      }
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then( () => {
        this.$router.push( { name: 'Login'});
      })
    }
  },
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.user.photoURL = user.photoURL;
      this.user.userId = user.uid;
      this.user.name = user.displayName;
      this.user.email = user.email;

      var uid = md5(user.email);
      console.log(uid);

      db.ref('users/' + uid).once('value').then(
        snapshot => {
          if (snapshot) {
            console.log(snapshot);
            this.user.name = snapshot.val().name;
            this.user.url = snapshot.val().url;
            this.user.phone = snapshot.val().phone;
          }
      });

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
