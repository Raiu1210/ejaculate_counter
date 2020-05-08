<template>
    <div>
        <h2>Login</h2>
        <div id='firebaseui-auth-container'></div>
    </div>
</template>

<script>
  import firebase from 'firebase'
  import firebaseui from 'firebaseui-ja'
  import 'firebaseui-ja/dist/firebaseui.css'

  export default {
    name: 'Login',
    data() {
      return {

      }
    },
    mounted() {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult) {
            if (authResult.additionalUserInfo.providerId === 'twitter.com') {
              return true;
            }
          }
        },
          signInFlow: 'redirect',
          signInSuccessUrl: '/about',
          signInOptions: [
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          ],
          tosUrl: 'https://day-journal.com/memo',
          privacyPolicyUrl: 'https://day-journal.com/memo'
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  };
</script>

<style scoped>
    h2 {
        margin-top: 40px;
        margin-bottom: 40px;
        text-align: center;
    }
</style>