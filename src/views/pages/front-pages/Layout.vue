<script setup lang="ts">
import { onMounted } from 'vue';
import AnnounceBar from '@/components/frontpages/layout/AnnounceBar.vue';
import Footer from '@/components/frontpages/layout/Footer.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    if (isLoggedIn) {
        router.replace('/dashboard');
    }
});
</script>
<template>
    <div class="front-wraper bg-surface">
        <AnnounceBar />
        <!-- <Header /> -->
        <main>
            <slot></slot>
            <!-- This slot will be replaced with page-specific content -->
        </main>
        <Footer />
    </div>
</template>
