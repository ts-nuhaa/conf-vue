<script setup>
  import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
  import {onAuthStateChanged, signOut } from 'firebase/auth'
  import confPost from './components/confPost.vue'
  import { doc, addDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
  import { db, confCol, auth } from './firebase.js'

  const title = ref('Confession')
  //start empty. data arrives in onMounted, just like data from server will
  const confs = ref([])
  const newtext = ref('')
  //template ref: vue puts the real input in here after MOUNTING
  const inputTxt = ref(null)
  const canPost = computed(() => newtext.value.trim().length > 0)

  async function addConf() {
    if (!canPost.value) return
    await addDoc(confCol, {
      text: newtext.value.trim(),
      createdAt: serverTimestamp() 
    })
    newtext.value = '' 
    inputTxt.value?.focus()
  }

  function removeConf(id) {
    deleteDoc(doc(db, 'confessions', id))
  }

    let unsubscribe = null

  onMounted(() => { //runs once when the app appears and starts listening to the database
    const q = query(confCol, orderBy('createdAt', 'desc')) //order by yag mana posted dulu
    unsubscribe = onSnapshot(q, (snapshot) => { //fast live connection to db
      confs.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    })
  })

  onUnmounted(() => {
    if (unsubscribe) unsubscribe() //opp to onmounted, stop listening when app is closed
  })

   console.log('setup runs')
</script>

<template>
  <div class="app">
    <header>
      <h1>{{ title }}</h1>
      <p>Welcome to the Confession App. Express your thoughts anonymously!</p>
    </header>

    <!-- create new confession -->
    <form @submit.prevent="addConf" class="confCreate"> <!-- prevent from refreshing the page -->
      <input ref="inputTxt" v-model="newtext" type="text" placeholder="How are you feeling?" />
      <button class="postButt" type="submit" :disabled="!canPost">Post</button>
    </form>

    <!-- displays posted confessions -->
    <ul v-if="confs.length > 0" class="confCards">
      <confPost
        v-for="conf in confs"
        :key="conf.id"
        :id="conf.id"
        :text="conf.text"
        @remove="removeConf"
      />
    </ul>
    <!--call confPost as a child component-->
    <p v-else class="empty">No confessions yet.</p>
  </div>
</template>