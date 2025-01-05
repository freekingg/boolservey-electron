<script>
import { ref } from 'vue';
import { InfoCircleIcon, XIcon } from 'vue-tabler-icons';
export default {
    setup(_, { expose }) {
        const showSnackbar = ref(false);
        let color = ref('primary');
        let title = ref('The message came');
        let message = ref('The message came');
        let timeout = ref(3000);
        const close = () => {
            showSnackbar.value = false;
        };
        const open = (obj) => {
            if (obj && obj.type === 'error') {
                color.value = 'error';
                title.value = obj.title || "Oh, something's wrong.";
            } else {
                color.value = 'primary';
                title.value = obj.title || 'Wow. Successful.';
            }
            timeout.value = obj.timeout || 3000;
            message.value = obj.message || 'No message';
            showSnackbar.value = true;
        };

        // 暴露方法给父组件
        expose({
            close,
            open
        });

        return {
            showSnackbar,
            close,
            color,
            message,
            timeout,
            title
        };
    }
};
</script>

<template>
    <v-snackbar rounded="xl" :color="color" :timeout="timeout" class="mt-4" v-model="showSnackbar" location="top center" elevation="0">
        <div class="d-flex gap-2">
            <InfoCircleIcon size="22" />
            <div class="">
                <h5 class="text-body-1">{{ title }}</h5>
                <p class="text-12">{{ message }}</p>
            </div>
        </div>
        <template v-slot:actions>
            <v-btn variant="text" @click="showSnackbar = false"> <XIcon /> </v-btn>
        </template>
    </v-snackbar>
</template>
