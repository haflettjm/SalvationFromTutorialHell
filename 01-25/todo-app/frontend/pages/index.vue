<template>
    <div class="h-auto p-5 h-full flex-1 align-top flex-col">
        <section>
            <div class="flex text-3xl justify-evenly text-center align-middle">
                <h1 class="font-bold mb-4">Test Todos</h1>
            </div>

            <div v-if="pending">Loading todos...</div>
            <div v-else-if="error">
                Error loading todos: {{ error.message }}
            </div>
            <div v-else>
                <ul>
                    <li v-for="todo in todos" :key="todo.id">
                        <div class="justify-evenly p-1 m-auto flex text-start">
                            <div class="w-2">
                                <input
                                    class="appearance-none h-5 w-5 border-2 border-pink-600 rounded-md checked:bg-pink-800 checked:border-pink-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:block checked:before:translate-x-[1px] checked:before:translate-y-[-1px]"
                                    type="checkbox"
                                    :checked="todo.completed"
                                    @change="toggleTodo(todo)"
                                />
                            </div>
                            <div class="w-1/2 font-semibold">
                                <span
                                    :class="{
                                        'line-through font-thin':
                                            todo.completed,
                                    }"
                                >
                                    {{ todo.title }}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useTodos } from "~/composables/useTodos";
import { onMounted } from "vue";
const config = useRuntimeConfig();
const { todos, fetchTodos } = useTodos();

function toggleTodo(todo) {
    todo.completed = !todo.completed;
}

onMounted(async () => {
    await fetchTodos();
});
</script>
