<template>
  <div class="relationContainer">
    <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
      关系
    </h3>
    <div class="relationList">
      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-tag>实体1</a-tag>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-tag>实体2</a-tag>
        </div>
        <div class="keyValue">
          <span>类型：</span>
          <a-tag>Property</a-tag>
        </div>
        <div class="keyValue">
          <span>关系值：</span>
          <a-tag>关系1</a-tag>
        </div>
      </div>

      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-select>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="实体1">
              实体1
            </a-select-option>
            <a-select-option value="实体2">
              实体2
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-select>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="实体1">
              实体1
            </a-select-option>
            <a-select-option value="实体2">
              实体2
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>类型：</span>
          <a-select>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="property">
              Property
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>关系值：</span>
          <a-select>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="关系1">
              关系1
            </a-select-option>
            <a-select-option value="关系2">
              关系2
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RelationList"
    }
</script>

<style scoped>
.relationLine{
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  padding-bottom: 20px;
}
.keyValue{
  width: 200px;
}
.ant-select{
  width: 110px
}
</style>
