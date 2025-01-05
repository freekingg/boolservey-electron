<script setup lang="ts">
import { computed } from 'vue';
import { getPrimary, getLightborder, getTextGrey100, getSecondary } from '@/utils/UpdateColors';
import { useStatisticsStore } from '@/stores/statistics/index';

const store = useStatisticsStore();

/* Chart */
const chartOptions = computed(() => {
    let categories = store.statistics.line_chart?.time || [];
    let series = [];
    series.push({
        name: '成功',
        data: store.statistics.line_chart?.earn || []
    });
    series.push({
        name: '核减',
        data: store.statistics.line_chart?.final || []
    });
    return {
        series,
        chart: {
            height: 300,
            type: 'area',
            fontFamily: `inherit`,
            foreColor: '#626b81',
            toolbar: {
                show: false
            }
        },
        zoom: {
                type: 'x',
                enabled: true
            },
        dataLabels: {
            enabled: true
        },
        grid: {
            borderColor: getLightborder.value,
            strokeDashArray: 4,
            strokeWidth: 1,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        colors: [getPrimary.value, getSecondary.value],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [20, 180]
            }
        },
        stroke: {
            curve: 'smooth',
            width: '6'
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: getTextGrey100.value
                }
            }
        },
        tooltip: {
            theme: 'dark'
        }
    };
});
</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <h5 class="text-h5 mb-1 font-weight-semibold">Product Sales</h5>
                </div>
            </div>
            <div>
                <apexchart type="area" height="260" :options="chartOptions" :series="chartOptions.series"> </apexchart>
            </div>
        </v-card-item>
    </v-card>
</template>
