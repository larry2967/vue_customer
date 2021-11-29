<template>
  <!-- Edit Modal HTML  add new emplyee-->
  <div id="addEmployeeModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Add Customer</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                v-model="addData.name"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Age</label>
              <input
                type="number"
                v-model="addData.age"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Job</label>
              <input
                type="text"
                class="form-control"
                v-model="addData.job"
                required
              />
            </div>
            <div class="form-group">
              <label>Marriage</label>
              <input
                type="text"
                class="form-control"
                v-model="addData.marriage"
                required
              />
            </div>
            <div class="form-group">
              <label>PBC</label>
              <input
                type="text"
                class="form-control"
                v-model="addData.consultantName"
                required
              />
            </div>
            <div class="form-group">
              <label>Stock</label>
              <input
                type="number"
                class="form-control"
                v-model="addData.stockAmount"
                required
              />
            </div>
            <div class="form-group">
              <label>Real Estate</label>
              <input
                type="number"
                class="form-control"
                v-model="addData.realEstateAmount"
                required
              />
            </div>
            <div class="form-group">
              <label>Others</label>
              <input
                type="number"
                class="form-control"
                v-model="addData.othersAmount"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <input
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              value="Cancel"
            />
            <input
              type="submit"
              v-on:click="postApi(addData)"
              class="btn btn-success"
              data-dismiss="modal"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Edit Modal HTML -->
  <div id="editEmployeeModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Edit Customer</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input
                v-model="localData.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Age</label>
              <input
                v-model="localData.age"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Job</label>
              <input
                v-model="localData.job"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Marriage</label>
              <input
                v-model="localData.marriage"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>PBC</label>
              <input
                v-model="localData.consultantName"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Stock</label>
              <input
                v-model="localData.stockAmount"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Real Estate</label>
              <input
                v-model="localData.realEstateAmount"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Others</label>
              <input
                v-model="localData.othersAmount"
                type="number"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <input
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              value="Cancel"
            />
            <input
              type="button"
              v-on:click="putApi()"
              class="btn btn-info"
              data-dismiss="modal"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "EditInfo",
  props: {
    editInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  emit: ["postApi", "putApi"],
  setup(props, { emit }) {
    const addData = reactive({
      id: { type: Number, default: 1 },
      name: { type: String, default: "john snow" },
      age: { type: Number, default: null },
      job: { type: String, default: null },
      marriage: { type: String, default: null },
      consultantName: { type: String, default: null },
      stockAmount: { type: Number, default: null },
      realEstateAmount: { type: Number, default: null },
      othersAmount: { type: Number, default: null },
    });
    const postApi = (addData) => {
      emit("postApi", addData);
    };

    const localData = computed({
      get: () => props.editInfo,
      set: (value) => emit("updateInfo", value),
    });
    const putApi = () => {
      emit("putApi");
    };

    return { localData, addData, putApi, postApi };
  },
};
</script>
