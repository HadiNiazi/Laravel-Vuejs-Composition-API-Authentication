<template>
    <div class="container">
        <div class="row">
            <div class="col-6 mt-5 offset-3">
                <div class="card">

                    <div class="card-header">
                        Login
                    </div>

                    <div class="card-body">

                        <ul v-for="error in errors">
                            <li class="text-danger">{{ error }}</li>
                        </ul>

                        <form @submit.prevent="login">

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your password">
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {

        return {

            email: '',
            password: '',
            errors: [],

        }

    },

    methods: {

        login() {

            this.clearMessage();

            axios.get('/sanctum/csrf-cookie').then(response => {

                axios.post('api/login', {
                    email: this.email,
                    password: this.password
                }).then( response => {

                    if (response.status == 201) {

                        const status = true;
                        const token = response.data.token

                        this.$store.dispatch('setAuthToken', token)

                        this.$store.dispatch('SetAuthStatus', status)

                        this.$router.push({
                            name: 'dashboard'
                        })

                    }

                }).catch( error => {

                    if (error.response.status == 422) {
                        this.errors = Object.values(error.response.data.errors).flat()
                    }
                    else {
                        this.errors = ['Something went wrong']
                    }

                });

            });

        },

        clearMessage() {
            this.errors = '';
        }

    }

}
</script>
