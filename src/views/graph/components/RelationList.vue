<template>
  <div class="relationContainer">
    <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
      关系
    </h3>
    <br />
    <div class="relationList">

      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-select default-value="实体1" disabled>
            <a-icon slot="suffixIcon" type="smile"/>
            <a-select-option value="实体1">
              实体1
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-select default-value="实体2" disabled>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="实体2">
              实体2
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>类型：</span>
          <a-select default-value="property" disabled>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="property">
              Property
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>关系值：</span>
          <a-select default-value="关系1" disabled>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="关系1">
              关系1
            </a-select-option>
          </a-select>
        </div>
        <a-popconfirm
          title="删除这个关系？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmDeleteRelation"
          @cancel="cancelDelete"
        >
          <a-button type="danger" size="small">
            删除
          </a-button>
        </a-popconfirm>
      </div>


      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-select default-value="实体1" disabled>
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option value="实体1">
              实体1
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-select default-value="实体2" disabled>
            <a-icon slot="suffixIcon" type="smile" />
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
        <a-popconfirm
          title="修改这个关系？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmChangeRelation"
          @cancel="cancelChange"
        >
          <a-button size="small">
            修改
          </a-button>
        </a-popconfirm>
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
        <a-popconfirm
          title="增加这个关系？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmAddRelation"
          @cancel="cancelAdd"
        >
          <a-button size="small" type="primary">
            添加
          </a-button>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RelationList",
        methods:{
          confirmDeleteRelation(){

          },
          cancelDelete(){

          },
          confirmChangeRelation(){

          },
          cancelChange(){

          },
          confirmAddRelation(){

          },
          cancelAdd(){

          },
        }
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
.ant-btn-sm {
  height: 29px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 2px;
  margin-left: 18px;
}
</style>
