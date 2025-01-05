<script setup lang="ts">

import ClientReviews from '@/components/frontpages/Homepage/ClientReviews.vue';
import Componies from '@/components/frontpages/Homepage/Componies.vue';
import FAQ from '@/components/frontpages/Homepage/FAQ.vue';
import Highlights from '@/components/frontpages/Homepage/Highlights.vue';
import Mainbanner from '@/components/frontpages/Homepage/Mainbanner.vue';
import PurchaseTemplate from '@/components/frontpages/Homepage/PurchaseTemplate.vue';
import SecurePayment from '@/components/frontpages/Homepage/SecurePayment.vue';
import DefaultLayout from '@/views/pages/front-pages/Layout.vue';
</script>

<template>
    <DefaultLayout>
        <Mainbanner />
        <!-- <OurClients /> -->
        <!-- <OurTeam/> -->
        <!-- <ContactBar/> -->
        <ClientReviews/>
        <Componies/>
        <Highlights/>
        <!-- <Packages/> -->
        <SecurePayment/>
        <FAQ/>
        <PurchaseTemplate/>
    </DefaultLayout>
</template>
