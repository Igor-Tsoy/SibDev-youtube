<template>
  <div class="video-card" :class="{ 'list-view': listView }">
    <img
      class="video-image"
      :src="youtubeVideo.snippet.thumbnails.high.url"
      :alt="youtubeVideo.snippet.title"
      @click="toggleShowVideo"
    />
    <div class="video-text">
      <h4 class="video-title" @click="toggleShowVideo">
        {{ youtubeVideo.snippet.title }}
      </h4>
      <p class="video-description">
        {{ youtubeVideo.snippet.description }}
      </p>
    </div>
    <div class="video-wrapper" @click.stop="toggleShowVideo" v-if="showVideo">
      <iframe
        width="1280"
        height="720"
        :src="'https://www.youtube.com/embed/' + youtubeVideo.id.videoId"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    youtubeVideo: {
      type: Object,
      required: true
    },
    listView: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data: () => ({
    showVideo: false
  }),
  methods: {
    toggleShowVideo() {
      this.showVideo = !this.showVideo;
    }
  }
};
</script>

<style scoped>
.video-card {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  width: calc(100% * 1 / 4.001);
}

.video-image {
  max-width: 100%;
  cursor: pointer;
  height: auto;
  object-fit: cover;
}

.video-title {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
}

.video-title:hover {
  text-decoration: underline;
}

.video-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-top: 8px;
  color: rgba(23, 23, 25, 0.3);
}

.video-card.list-view {
  flex-direction: row;
  align-items: center;
  width: 80%;
}

.list-view .video-image {
  margin-right: 20px;
}

.list-view .video-title {
  white-space: initial;
  margin-top: 0;
}

.list-view .video-description {
  white-space: initial;
}

.list-view .video-image {
  max-height: 90px;
  width: auto;
}

.video-text {
  overflow: hidden;
}

.video-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.733);
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
