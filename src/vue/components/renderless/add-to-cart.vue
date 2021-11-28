

<script>
export default {
  setup() {
    // let cartForm = document.querySelector('form[action="/cart/add"]');
    let mme = "mme";
    // cartForm.addEventListener("submit", processCartForm);

    const processCartForm = (e) => {
      e.preventDefault();
      console.log("object");
    };

    return { processCartForm, mme };
  },
};
</script>

