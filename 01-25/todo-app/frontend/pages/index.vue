<template>
    <div class="h-auto p-5 h-full flex-1 align-top flex-col">
        <section>
            <div class="flex text-3xl justify-evenly text-center align-middle">
                <h1 class="font-bold mb-4">My TODO List</h1>
                <h2>+</h2>
            </div>

            <div v-if="pending">Loading todos...</div>
            <div v-else-if="error">
                Error loading todos: {{ error.message }}
            </div>
            <div v-else>
                <ul>
                    <li v-for="todo in todos" :key="todo.id">
                        <span :class="{ 'line-through': todo.completed }">{{
                            todo.title
                        }}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: todos, error, pending } = await useTodos();
</script>
