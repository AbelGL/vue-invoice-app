<template>
  <header>
      <router-link :to="{name: 'Home'}">
        <div class="branding flex">
            <img src="@/assets/home.png" alt="">
        </div>
      </router-link>
      <router-link v-if="!user" :to="{name: 'Login'}">
        <div class="branding-login flex">
            <img src="@/assets/user-alt-light.svg" alt="">
        </div>
      </router-link>
      <div v-if="user" @click="signOut" class="branding-logout flex">
        <img src="@/assets/sign-out-alt-regular.svg" alt="">
      </div>
  </header>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
    name: 'Navigation',
    methods: {
      signOut() {
       firebase.auth().signOut();
       window.location.reload();
      }
    },
    computed: {
     user() {
      return this.$store.state.user;
     },
    },
}
</script>

<style lang="scss" scoped>
header{
    z-index: 99;
    flex-direction: row;
    background-color: #1e2139;
    @media(min-width:900px){
        min-height: 100%;
        min-width: 90px;
        flex-direction: column;
        border-radius: 0 20px 20px 0;
    }
    .branding{
        border-radius: 0 20px 20px 0;
        background-color: #7c5dfa;
        justify-content: center;
        padding: 24px;
        @media(min-width:900px){
        width: 100%;
    }
    img{
        width: auto;
        height: 30px;
    }
    }

    .branding-login{
        border-radius: 0 20px 20px 0;
        justify-content: center;
        padding: 24px;
        background-color: rgba(51, 214, 160, 0.1);
        @media(min-width:900px){
        width: 100%;
        margin-top: 10px;
       }
        img{
            width: auto;
            height: 30px;
            filter: invert(77%);
        }
    }

    .branding-logout{
        cursor: pointer;
        border-radius: 0 20px 20px 0;
        justify-content: center;
        padding: 24px;
        background-color: rgba(51, 214, 160, 0.1);
        @media(min-width:900px){
        width: 100%;
        margin-top: 10px;
       }
        img{
            width: auto;
            height: 30px;
            filter: invert(77%);
        }
    }

 
}
</style>