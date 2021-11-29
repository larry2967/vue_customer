<template>
  <!-- Delete Modal HTML -->
  <div id="deleteEmployeeModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Delete Customer</h4>
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
            <p>Are you sure you want to delete these Records?</p>
            <p class="text-warning">
              <small>This action cannot be undone.</small>
            </p>
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
              v-on:click="deleteApi()"
              class="btn btn-danger"
              data-dismiss="modal"
              value="Delete"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "DeleteInfo",
  props: {
    editInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  emit: ["deleteApi"],
  setup(props, { emit }) {
    const localData = computed({
      get: () => props.editInfo,
      set: (value) => emit("deleteInfo", value),
    });
    const deleteApi = () => {
      emit("deleteApi");
    };

    // watch(
    //   () => props.editInfo,
    //   () => {
    //     console.log(props.editInfo);
    //   }
    // );
    return { localData, deleteApi };
  },
};
</script>
