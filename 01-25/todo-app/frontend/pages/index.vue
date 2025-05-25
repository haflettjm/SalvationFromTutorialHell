<template>
    <section class="p-4">
        <h1 class="text-3xl font-bold mb-4">My TODO List</h1>

        <div v-if="pending">Loading todos...</div>
        <div v-else-if="error">Error loading todos: {{ error.message }}</div>

        <ul v-else>
            <li v-for="todo in todos" :key="todo.id">
                <span :class="{ 'line-through': todo.completed }">{{
                    todo.title
                }}</span>
            </li>
        </ul>
    </section>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: todos, error, pending } = await useTodos();
</script>
