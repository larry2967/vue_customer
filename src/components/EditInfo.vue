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
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Age</label>
              <input type="number" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Job</label>
              <text type="text" class="form-control" required></text>
            </div>
            <div class="form-group">
              <label>Marriage</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label>PBC</label>
              <input class="form-control" required />
              <b>{{ parseData.id }}</b>
            </div>

            <div class="form-group">
              <label>Stock</label>
              <input type="number" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Real Estate</label>
              <input type="number" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Others</label>
              <input type="number" class="form-control" required />
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
import { reactive } from "vue";
export default {
  name: "EditInfo",
  props: {
    getList: Array,
  },

  setup(props) {
    const parseData = reactive({
      id: [],
    });
    const parse = () => {
      parseData.id = [
        props.getList[0].id,
        props.getList[1].id,
        props.getList[2].id,
        props.getList[3].id,
        props.getList[4].id,
      ];
    };
    parse();

    return { parseData };
  },
};
</script>
