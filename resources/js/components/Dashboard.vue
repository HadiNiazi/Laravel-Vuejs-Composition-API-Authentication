<template>
    <div class="container">
        <div class="row">
            <div class="col-8 offset-2 mt-5">
                <div class="card">

                    <div class="card-header">
                        Dashboard
                    </div>


                    <div class="card-body">
                        <p v-if="user" class="card-text">Your are logged in!  {{ user.name }}.</p>
                     </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import axios from 'axios';


  export default {

    data() {

     return {
        user: null
     }

    },

    mounted() {
        this.getUserDetails();
    },

    methods: {

        getUserDetails() {
            axios.get('api/user')
                .then( response => {
                    this.user = response.data
                })
                .catch( error => {

                });
        }

    }

  }

</script>

