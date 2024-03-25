import { defineStore } from "pinia";
import { ref } from 'vue';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {

    const authToken = ref('');
    const isAuthenticated = ref(false);

    const router = useRouter();

    function checkUserAuthenticationStatus() {
        axios.get('api/authenticated')
            .then( response => {
                isAuthenticated.value = response.data.status;

                if (response.data.status == true) {
                    router.push({
                        name: 'dashboard'
                    })
                }

            })
            .catch(error => {
            })
    }

    function setAuthStatus(status) {
        isAuthenticated.value = status;
    }

    function setAuthToken(token) {
        authToken.value = token
        localStorage.setItem('token', token)
    }

    function logout() {

        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']

        isAuthenticated.value = false;
        authToken.value = '';

    }

    return { logout, setAuthToken, setAuthStatus, checkUserAuthenticationStatus, isAuthenticated, authToken }

});
