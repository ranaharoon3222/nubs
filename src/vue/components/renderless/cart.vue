


<script>
import { toRefs, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    qty: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const store = useStore();

    const { qty } = toRefs(props);

    const quantityValue = ref(qty.value);

    // **********
    // quantity
    // **********

    const updateCart = (id) => {
      document.body.classList.add("loading");
      fetch(`/cart/update.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates: {
            [id]: quantityValue.value,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          store.dispatch("cart/save_cart");
          document.body.classList.remove("loading");
        });
    };

    const deleteItem = (id) => {
      fetch(`/cart/update.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates: {
            [id]: 0,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          location.reload();
        });
    };

    const increment = (id) => {
      quantityValue.value++;
      updateCart(id);
    };
    const decrement = (id) => {
      if (quantityValue.value > 1) {
        quantityValue.value--;
        updateCart(id);
      }
    };
    // **********
    // quantity
    // **********

    return () =>
      slots.default({
        increment,
        decrement,
        quantityValue,
        deleteItem,
      });
  },
};
</script>