<script setup lang="ts">
import { computed } from 'vue';
import { getPrimary, getLight100,getWarning,getError } from '@/utils/UpdateColors';

/* Chart */
const chartOptions = computed(() => {
    return {
        series: [5368, 3319, 3500, 4106],
        labels: ["5368", "Direct Traffic", "Refferal Traffic", "Oragnic Traffic"],
        chart: {
            height: 280,
            type: "donut",
            fontFamily: `inherit`,
            foreColor: "#c6d1e9",
            offsetX: -15,
        },

        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
        },

        colors: [getLight100.value, getWarning.value, getError.value, getPrimary.value],
        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },

        stroke: {
            show: false,
        },

        plotOptions: {
            pie: {
                donut: {
                    size: "75%",
                    background: "none",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "18px",
                            color: undefined,
                            offsetY: 5,
                        },
                        value: {
                            show: false,
                            color: "#98aab4",
                        },
                    },
                },
            },
        },
    };
});

</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <h5 class="text-h5 mb-1 font-weight-semibold">Traffic Distribution</h5>
                </div>
            </div>

            <v-row class="d-sm-flex align-center mt-sm-8 mt-5">
                <v-col cols="12" lg="12" md="5">
                    <apexchart type="pie" height="280" :options="chartOptions" :series="chartOptions.series"> </apexchart>
                </v-col>
               
            </v-row>
        </v-card-item>
    </v-card>
</template>
