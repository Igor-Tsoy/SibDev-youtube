<template>
  <section class="video-section">
    <div class="search-interface" :class="{ changed: changeView }">
      <h2 :class="{ changed: changeView }">Поиск видео</h2>
      <div class="search-container">
        <el-input
          placeholder="Что хотите посмотреть?"
          v-model="searchValue"
          class="input-with-select search-input"
        >
          <el-button
            type="primary"
            slot="append"
            class="search-btn"
            @click="searchVideo(searchValue)"
            >Найти</el-button
          >
        </el-input>
        <div class="heart" @click="showRequestForm"></div>
        <div
          class="modal-form"
          v-if="requestForm"
          @OnCloseForm="hideRequestForm"
        >
          <SaveRequestForm
            v-if="requestForm"
            :request="searchValue"
            :titleDisabled="true"
            @OnCloseForm="hideRequestForm"
          />
        </div>
      </div>
    </div>
    <VideoGroup :searchResult="searchValue" v-if="changeView" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VideoGroup from './VideoGroup';
import SaveRequestForm from './SaveRequestForm';

export default {
  name: 'Search',
  components: {
    VideoGroup,
    SaveRequestForm
  },
  data: () => ({
    searchValue: '',
    requestForm: false
  }),
  methods: {
    searchVideo(searchValue) {
      const request = {
        search: searchValue,
        maxResults: 12,
        order: 'relevance'
      };
      this.fetchVideos(request);
    },
    hideRequestForm() {
      if (this.requestForm) {
        this.requestForm = false;
      }
    },
    showRequestForm() {
      if (!this.requestForm) {
        this.requestForm = true;
      }
    },
    ...mapActions('youtube', ['fetchVideos'])
  },
  computed: {
    ...mapGetters('youtube', ['youtubeVideos']),
    changeView() {
      if (Object.keys(this.youtubeVideos).length) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.search-container {
  position: relative;
}

.heart {
  position: absolute;
  top: 8px;
  right: 10%;
  width: 24px;
  height: 24px;
  background-image: url('../assets/heart.png');
}

h2 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  transition: all 0.3s;
}

.search-interface {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s;
}

.search-interface.changed {
  height: 100px;
  margin: 40px 0;
}

h2.changed {
  font-size: 28px;
  margin-bottom: 12px;
  text-align: left;
}
</style>
