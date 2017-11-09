<style lang="css">
  @import "../../css/style.css";
</style>

<template>
  
    <div class="login">
        
        <div>
            <nav class="navbar navbar-default">
                <ul class="nav nav-pills navbar-left" style="margin-left:10Px" >
                  <li role="presentation"><h4>Bookmaker.com</h4></li>
                </ul>
                <ul class="nav nav-pills navbar-right" style="margin-right:10Px" >
                  <li role="presentation"><h4>Please Sign In </h4></li>
                </ul>
            </nav>
        </div>
        <br><br>
        <form @submit.prevent="validateBeforeSubmit">
            <div class="container">
                <div class="header clearfix">
                    <h2 class="text-muted">Sign In</h2>
                </div>
            </div>
            <div>
                <input name="email" v-model="user.email" type="email" placeholder="Email"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.email') }">
                <p v-show="errors.has('email')" style="color: red" >{{ errors.first('email') }}</p>
            </div>

            <div>
                <input name="password" v-model="user.password" type="password" placeholder="Password"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password') }">
                <p v-show="errors.has('password')" style="color: red" >{{ errors.first('password') }}</p>
            </div>
            
            <div>
                <button style="margin-bottom: 20px">Sign In</button> 
            </div>
            <p>You don't have an account ? Please <router-link to="/signup"> Sign Up</router-link><br></p>
            <br>
            <div class="container">
            <footer class="footer">
                <p>&copy; 2016 Bookmarker, Inc.</p>
            </footer>
            </div>
        </form>
    </div >
  
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'

export default {
    name: 'login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.login();
                }
            });
        },
        login() {
            firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
                user => {
                    alert('Sign In Success!');
                    this.$router.push({name: 'Detail'});
                },
                err => {
                    if (err.code === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if (err.code === 'auth/user-not-found') {
                        alert('User not found!');
                    } else if (err.code === 'auth/invalid-email') {
                        alert('Invalid email');
                    } else {
                        alert('Oops. ' + err.message);
                    }
                    
                }
            ).catch (error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert(error.message);
                }
            })
        },
        loginGoogle() {
            console.log("Google login");
            // Using a popup.
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(
                result => {
                    if (result) {
                        // This gives you a Google Access Token.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;

                        console.log('token: ' + token);
                        console.log(user);

                        this.$router.push('/detail');
                    }
                    
                },
                err => {
                    alert('Oops. ' + err.message);
                }
            );
        },
        loginFacebook() {
            console.log("Facebook login");
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('public_profile');
            provider.setCustomParameters({
                'display': 'popup'
            });
            
            firebase.auth().signInWithPopup(provider).then(
                result => {
                    if (result) {
                        // This gives you a Google Access Token.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;

                        console.log('token: ' + token);
                        console.log(user);

                        this.$router.push('/hello');
                    }
                    
                },
                err => {
                    alert('Oops. ' + err.message);
                }
            );        
        }
    },

}
</script>

<style scoped>
    .login {
        margin-top: 0px;
    }
    input {
        margin: 10px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 20px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }

</style>

<style src="firebaseui/dist/firebaseui.css" />

</style>