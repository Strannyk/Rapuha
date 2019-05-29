<template>
    <ol class="breadcrumb">
        <li v-for="item in list"
            :class="!item.href ? 'active' : null"
            class="breadcrumb-item">
            <router-link v-if="item.href" :to="item.href">{{item.name}}</router-link>
            <span v-else>{{item.name}}</span>
        </li>
    </ol>
</template>

<script src="./breadcrumbs.js"></script>
