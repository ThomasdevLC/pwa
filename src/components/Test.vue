<template>
  <button @click="envoyerMessage">Cliquez-moi</button>
</template>

<script>
import { defineProps } from "vue";

export default {
  name: "MonComposant",
  setup() {
    const { emit } = defineProps();

    const envoyerMessage = () => {
      emit("message-envoye", "Bonjour depuis MonComposant !");
    };

    const emit = defineEmits();
    return {
      envoyerMessage,
    };
  },
};
</script>
