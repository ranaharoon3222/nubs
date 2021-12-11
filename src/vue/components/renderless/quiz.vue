

<script>
import { ref, toRef } from "vue";

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  setup(props, { slots }) {
    const products = toRef(props, "products");

    let step = ref(0);
    const state = ref({
      isDisabled: true,
      cuurentState: "Tamano",
    });

    const quizValues = ref({
      formValues: {
        tamano: "",
        modelo: "",
        textil: "",
        costura: "",
        color: "",
        costados: "",
        patas: "",
      },
    });

    const validateValue = () => {
      let val = quizValues.value.formValues;
      if (step.value === 0 && val.tamano === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 1 && val.modelo === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 2 && val.textil === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 3 && val.costura === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 4 && val.color === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 5 && val.costados === "") {
        state.value.isDisabled = true;
        return false;
      } else if (step.value === 6 && val.patas === "") {
        state.value.isDisabled = true;
        return false;
      } else {
        state.value.isDisabled = false;
        return true;
      }
    };

    const currentState = () => {
      if (step.value === 0) {
        state.value.cuurentState = "Tamano";
      } else if (step.value === 1) {
        state.value.cuurentState = "Modelo";
      } else if (step.value === 2) {
        state.value.cuurentState = "Textil";
      } else if (step.value === 3) {
        state.value.cuurentState = "Costura";
      } else if (step.value === 4) {
        state.value.cuurentState = "Color";
      } else if (step.value === 5) {
        state.value.cuurentState = "Costados";
      } else if (step.value === 6) {
        state.value.cuurentState = "Patas";
      }
    };

    const result = () => {
      products.value.every((p) => {
        const handle = p.handle;

        fetch(`products/${handle}?view=json`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const prop = data.metafields.prop;
            const formValues = quizValues.value.formValues;

            if (
              prop.tamano === formValues.tamano &&
              prop.modelo === formValues.modelo &&
              prop.textil === formValues.textil &&
              prop.costura === formValues.costura &&
              prop.color === formValues.color &&
              prop.costados === formValues.costados &&
              prop.patas === formValues.patas
            ) {
              location.href = `/products/${handle}`;
              document.querySelector(".quiz-result").textContent = "";
              return false;
            } else {
              document.querySelector(".quiz-result").textContent =
                "No se encontró ninguna coincidencia Inténtelo de nuevo";
              //   location.href = `/`;
            }
          });
        return true;
      });
    };

    const nextStep = () => {
      const validate = validateValue();
      if (step.value <= 5 && validate) {
        step.value++;
        if (validateValue()) {
          state.value.isDisabled = false;
        } else {
          state.value.isDisabled = true;
        }
      }
      if (step.value === 6 && validateValue()) {
        result();
      }
      currentState();
    };

    const prevStep = () => {
      if (step.value > 0) {
        step.value--;
        state.value.isDisabled = false;
      }
      currentState();
    };

    return () =>
      slots.default({
        nextStep,
        result,
        prevStep,
        step,
        quizValues: quizValues.value.formValues,
        state: state.value,
        validateValue,
      });
  },
};
</script>