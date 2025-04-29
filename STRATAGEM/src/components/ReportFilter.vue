<template>
    <div class="report-filter">
        <h3>Filter Reports</h3>
        <div v-for="category in categories" :key="category" class="filter-item">
            <label>
                <input 
                    type="checkbox" 
                    :value="category" 
                    v-model="selectedCategories" 
                />
                {{ category }}
            </label>
        </div>
        <button @click="applyFilter">Apply Filter</button>
    </div>
</template>

<script>
export default {
    name: "ReportFilter",
    data() {
        return {
            categories: ["Finance", "Marketing", "Operations", "HR", "IT"],
            selectedCategories: [],
        };
    },
    methods: {
        applyFilter() {
            this.$emit("filter-applied", this.selectedCategories);
        },
    },
};
</script>

<style scoped>
.report-filter {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 300px;
}

.filter-item {
    margin-bottom: 0.5rem;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>