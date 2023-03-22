<script setup>
import { assetsMaps } from '../config'

console.log(assetsMaps)
</script>

<template>
    <main class="container">
        <div class="demo-image__lazy">
            <el-image
                v-for="url in assetsMaps['2023-3-22'].images"
                :key="url"
                :src="url"
                :preview-src-list="assetsMaps['2023-3-22'].images"
                fit="cover"
            />
        </div>
        <div class="video-list">
            <div class="video-box">
                <video
                    v-for="url in assetsMaps['2023-3-22'].videos"
                    :key="url"
                    muted
                    loop="loop"
                    webkit-playsinline="true"
                    playsinline="true"
                    x-webkit-airplay="allow"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="true"
                    type="video/mp4"
                    controls
                    :src="url"
                ></video>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    max-width: 1024px;
    margin: 0 auto;
}
.demo-image__lazy {
}

.demo-image__lazy .el-image {
    display: block;
    min-height: 200px;
    margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
}
</style>
