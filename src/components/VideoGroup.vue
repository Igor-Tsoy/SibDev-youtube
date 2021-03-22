<template>
  <div class="video-group-container">
    <div class="filter-panel">
      <div class="search-request">
        <span>
          Видео по запросу «<b>{{ youtubeVideos.search }}</b
          >» <span class="views">{{ videoCount }}</span>
        </span>
      </div>
      <div class="filter-interface">
        <div
          class="list"
          :class="{ active: listView }"
          @click="changeListView"
        ></div>
        <div
          class="grid"
          :class="{ active: !listView }"
          @click="changeGridView"
        ></div>
      </div>
    </div>
    <div class="videos" :class="{ 'list-view': listView }">
      <VideoItem
        v-for="(youtubeVideo, index) in youtubeVideos.content"
        :youtubeVideo="youtubeVideo"
        :listView="listView"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import VideoItem from './VideoItem';
import { mapGetters } from 'vuex';

export default {
  name: 'VideoGroup',
  components: {
    VideoItem
  },
  data: () => ({
    listView: true
  }),
  methods: {
    changeListView() {
      if (!this.listView) {
        this.listView = true;
      }
    },
    changeGridView() {
      if (this.listView) {
        this.listView = false;
      }
    }
  },
  computed: {
    ...mapGetters('youtube', ['youtubeVideos']),
    videoCount() {
      return this.youtubeVideos.content.length;
    }
  }
};
</script>

<style scoped>
.filter-panel {
  display: flex;
  justify-content: center;
}

.views {
  color: rgba(23, 23, 25, 0.3);
  margin-left: 15px;
}

.filter-interface {
  display: flex;
  margin-left: auto;
}

.filter-interface div {
  width: 24px;
  height: 24px;
}

.list {
  background-image: url('../assets/list.png');
}

.grid {
  background-image: url('../assets/grid.png');
  margin-left: 18px;
}

.list.active {
  background-image: url('../assets/list-active.png');
}

.grid.active {
  background-image: url('../assets/grid-active.png');
}

.videos {
  display: flex;
  margin-left: -20px;
  flex-direction: row;
  flex-wrap: wrap;
}

.videos.list-view {
  flex-direction: column;
}
</style>
