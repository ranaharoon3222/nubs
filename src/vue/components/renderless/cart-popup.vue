<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(props, { slots }) {
    const store = useStore();
    // get cart count
    store.dispatch("cart/save_cart");

    return () =>
      slots.default({
        popup: computed(() => store.state["cart"].cart_popup).value,
        close_popup: () => store.dispatch("cart/close_popup"),
        cart: computed(() => store.state["cart"].current_cart).value,
      });
  },
};
</script>
