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
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Age</label>
              <input type="email" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Job</label>
              <textarea class="form-control" required></textarea>
            </div>
            <div class="form-group">
              <label>Marriage</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>PBC</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Stock</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Real Estate</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Others</label>
              <input type="text" class="form-control" required />
            </div>
          </div>
          <div class="modal-footer">
            <input
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              value="Cancel"
            />
            <input type="submit" class="btn btn-success" value="Add" />
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
                :value="editInfo.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Age</label>
              <input
                :value="editInfo.age"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Job</label>
              <input
                :value="editInfo.job"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Marriage</label>
              <input
                :value="editInfo.marriage"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>PBC</label>
              <input
                :value="editInfo.consultantName"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Stock</label>
              <input
                :value="editInfo.stockAmount"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Real Estate</label>
              <input
                :value="editInfo.realEstateAmount"
                type="number"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Others</label>
              <input
                :value="editInfo.othersAmount"
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
            <input type="submit" class="btn btn-info" value="Save" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
// import { reactive } from "vue";
export default {
  name: "EditInfo",
  props: {
    editInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  setup(props) {
    watch(
      () => props.editInfo,
      () => {
        console.log(props.editInfo);
      }
    );
  },
};
</script>
