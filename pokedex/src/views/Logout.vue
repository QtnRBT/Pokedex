<script>
import Cookies from 'js-cookie';
export default {
    name: "Logout",
    mounted() {
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("email");
        Cookies.remove("user_id");
        localStorage.removeItem("profileUrl");
        this.$router.push("/login");
    },
}
</script>