<template>
    <ol class="breadcrumb">
        <li v-for="(item, index) in list"
            :class="index === list.length - 1 ? 'active' : null"
            class="breadcrumb-item">
            <router-link v-if="index !== list.length - 1" :to="item.href">{{item.name}}</router-link>
            <span v-else>{{item.name}}</span>
        </li>
    </ol>
</template>

<script src="./breadcrumbs.js"></script>
