<template>
  <div class="modal-form">
    <el-form
      ref="favorites-form"
      size="medium"
      :rules="rules"
      :model="requestFrom"
      class="requestForm"
    >
      <el-form-item label="Запрос">
        <el-input v-model="requestFrom.request" :disabled="titleDisabled">{{
          request
        }}</el-input>
      </el-form-item>
      <el-form-item label="Название" prop="title">
        <el-input v-model="requestFrom.title"></el-input>
      </el-form-item>
      <el-form-item label="Сортировать по">
        <el-select v-model="requestFrom.order" class="form-select">
          <el-option label="Без сортировки" value=""></el-option>
          <el-option label="Дате" value="date"></el-option>
          <el-option label="Рейтингу" value="rating"></el-option>
          <el-option label="Релевантности" value="relevance"></el-option>
          <el-option label="Названию" value="title"></el-option>
          <el-option
            label="Количеству видео на канале"
            value="videoCount"
          ></el-option>
          <el-option
            label="Количеству просмотров"
            value="viewCount"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-slider
          :min="1"
          :max="50"
          v-model="requestFrom.results"
          show-input
          :show-input-controls="false"
          input-size="mini"
        >
        </el-slider>
      </el-form-item>
      <div class="form-conrols">
        <el-button type="primary" plain @click="closeRequestForm"
          >Не сохранять</el-button
        >
        <el-button type="primary" @click="validForm">Сохранить</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SaveRequestForm',
  props: {
    request: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    order: {
      type: String,
      default: ''
    },
    results: {
      type: Number,
      default: 12
    },
    titleDisabled: {
      type: Boolean,
      dafeult: true
    },
    editingObj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      requestFrom: {
        request: this.request,
        title: this.title,
        order: this.order,
        results: this.results
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Пожалуйста, введите название',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    closeRequestForm() {
      this.$emit('OnCloseForm');
    },
    saveRequestForm() {
      const formData = this.requestFrom;
      formData.edit = this.editingObj;
      this.appendFavorites({ ...formData });
      this.closeRequestForm();
      this.notify();
    },
    notify() {
      const msg =
        Object.keys(this.editingObj).length > 0
          ? '<b>Поиск успешно изменен</b>'
          : '<b>Поиск сохранен в раздле "Избранное"</b><br><br><a href="/favorites">Перейти в Избранное</a>';
      this.$notify({
        title: '',
        type: 'success',
        dangerouslyUseHTMLString: true,
        message: msg
      });
    },
    validForm() {
      this.$refs['favorites-form'].validate(valid => {
        if (valid) {
          this.saveRequestForm();
        } else {
          return false;
        }
      });
    },
    ...mapActions('youtube', ['appendFavorites'])
  }
};
</script>

<style scoped>
.requestForm {
  width: 30%;
  background-color: #fff;
  padding: 50px 20px;
  border-radius: 10px;
}

.form-select {
  width: 100%;
}

.modal-form {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.384);
  z-index: 99;
}
</style>
