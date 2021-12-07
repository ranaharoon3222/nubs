


<script>
import { toRefs, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    currentVariant: {
      type: Object,
      required: true,
    },
    productOptions: {
      type: Object,
      required: true,
    },
    productVariants: {
      type: Object,
      required: true,
    },
  },
  setup(props, { slots }) {
    const store = useStore();

    const { currentVariant, productOptions, productVariants } = toRefs(props);

    const selectedVariant = ref(currentVariant.value);
    const quantityValue = ref(1);

    const selectOption = ({ name }, $event) => {
      const selectedValue = $event.target.value;
      const selectedOption = productOptions.value.find(
        (option) => option.name === name
      );
      const allOptionValuesWithoutSelected = selectedOption.values.filter(
        (value) => value !== selectedValue
      );

      const targetOptions = [
        selectedValue,
        ...selectedVariant.value.options.filter(
          (value) => !allOptionValuesWithoutSelected.includes(value)
        ),
      ];

      productVariants.value.some((variant) => {
        if (variant.options.every((option) => targetOptions.includes(option))) {
          selectedVariant.value = variant;

          goToVariant(selectedVariant.value.id);
          return true;
        }
      });
    };

    const goToVariant = function (value) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?variant=${value}`;
      window.history.pushState({ path: newurl }, "", newurl);
    };

    // **********
    // quantity
    // **********

    const increment = () => {
      quantityValue.value++;
    };
    const decrement = () => {
      if (quantityValue.value > 1) {
        quantityValue.value--;
      }
    };
    // **********
    // quantity
    // **********

    //**********
    // add To Cart
    // *********

    const processCartForm = (e) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
      document.body.classList.add("loading");

      fetch("/cart/add.js", {
        method: "POST",
        body: formdata,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          document.body.classList.remove("loading");
          store.dispatch("cart/current_cart", data);
          return data;
        })
        .catch((error) => {
          document.body.classList.remove("loading");
          console.error("Error:", error);
        });
    };

    //**********
    // End add To Cart
    // *********

    return () =>
      slots.default({
        selectedVariant: selectedVariant.value,
        selectOption,
        processCartForm,
        increment,
        decrement,
        quantityValue,
      });
  },
};
</script>