<script setup>
const props = defineProps({
  id: String,
  text: String
})

const emit = defineEmits(['remove', 'comment'])
</script>

<template>
  <li class="confCard">
    <button class="remove" @click="emit('remove', props.id)">✕</button>
    <p class="confText">{{ text }}</p>
    <button class="comment" @click="emit('comment', props.id)">💬</button>
  </li>
</template>