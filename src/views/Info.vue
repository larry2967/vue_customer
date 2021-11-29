<template>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Bootstrap CRUD Data Table for Database with Modal Form</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>

  <body>
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>Manage <b>Customers</b></h2>
              </div>
              <div class="col-sm-6">
                <a
                  href="#addEmployeeModal"
                  class="btn btn-success"
                  data-toggle="modal"
                  ><i class="material-icons">&#xE147;</i>
                  <span>Add New Customer</span></a
                >
                <a
                  href="#deleteEmployeeModal"
                  class="btn btn-danger"
                  data-toggle="modal"
                  ><i class="material-icons">&#xE15C;</i> <span>Delete</span></a
                >
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span class="custom-checkbox">
                    <input type="checkbox" />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Job</th>
                <th>Marriage</th>
                <th>PBC</th>
                <th>Stock</th>
                <th>Real Estate</th>
                <th>Others</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in responseApi.getList" :key="item.id">
                <td class="custom-checkbox">
                  <input type="checkbox" />
                  <label for="selectAll"></label>
                </td>
                <td>
                  {{ item.id }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.age }}
                </td>
                <td>
                  {{ item.job }}
                </td>
                <td>
                  {{ item.marriage }}
                </td>
                <td>
                  {{ item.consultantName }}
                </td>
                <td>
                  {{ item.stockAmount }}
                </td>
                <td>
                  {{ item.realEstateAmount }}
                </td>
                <td>
                  {{ item.othersAmount }}
                </td>

                <td>
                  <a
                    href="#editEmployeeModal"
                    @click="look(item)"
                    class="edit"
                    data-toggle="modal"
                    ><i class="material-icons" title="Edit">&#xE254;</i></a
                  >
                  <a
                    href="#deleteEmployeeModal"
                    @click="look(item)"
                    class="delete"
                    data-toggle="modal"
                    ><i class="material-icons" title="Delete">&#xE872;</i></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <div class="hint-text">
              Showing <b>10</b> out of <b>25</b> entries
            </div>
            <div class="clearfix">
              <ul class="pagination">
                <li class="page-item disabled"><a href="#">Previous</a></li>
                <li class="page-item"><a href="#" class="page-link">1</a></li>
                <li class="page-item"><a href="#" class="page-link">2</a></li>
                <li class="page-item active">
                  <a href="#" class="page-link">3</a>
                </li>
                <li class="page-item"><a href="#" class="page-link">4</a></li>
                <li class="page-item"><a href="#" class="page-link">5</a></li>
                <li class="page-item">
                  <a href="#" class="page-link">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditInfo
      v-model:editInfo="editInfo.data"
      @putApi="putData"
      @postApi="postData"
    ></EditInfo>
    <DeleteInfo
      v-model:editInfo="editInfo.data"
      @deleteApi="deleteData"
    ></DeleteInfo>
  </body>
</template>

<style scoped>
/* for beautiful dynamic table */

body {
  color: #566787;
  background: #f5f5f5;
  font-family: "Varela Round", sans-serif;
  font-size: 13px;
}
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 1000px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #435d7d;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  color: #ffc107;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}
/* Custom checkbox */
.custom-checkbox {
  position: relative;
}
.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}
.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}
.custom-checkbox label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
  border-color: #03a9f4;
  background: #03a9f4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}
</style>

<script>
import { onMounted, reactive, onBeforeMount } from "vue";
import DeleteInfo from "@/components/DeleteInfo.vue";
import EditInfo from "@/components/EditInfo.vue";
import axios from "axios";

export default {
  name: "info",
  setup() {
    const changePage = "string";
    const editInfo = reactive({
      data: {},
    });
    const responseApi = reactive({
      getList: {},
    });
    const getData = async () => {
      try {
        const response = await axios.get("/api/customers");
        console.log("success!");
        responseApi.getList = response.data;
      } catch (error) {
        console.log(error);
        console.log("can not get any response");
      }
    };
    const putData = async () => {
      try {
        console.log("put" + JSON.stringify(editInfo.data));
        await axios({
          method: "put",
          url: "/api/customers/" + editInfo.data.id,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          data: editInfo.data,
        });

        console.log("success!");
      } catch (error) {
        console.log(error);
        console.log("can not put data");
      }
    };
    const deleteData = async () => {
      try {
        console.log("delete" + JSON.stringify(editInfo.data));
        await axios({
          method: "delete",
          url: "/api/customers/" + editInfo.data.id,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        console.log("success!");
      } catch (error) {
        console.log(error);
        console.log("can not delete data");
      }
    };
    const postData = async (addData) => {
      try {
        console.log("post" + JSON.stringify(addData));
        await axios({
          method: "post",
          url: "/api/customers/",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          data: addData,
        });

        console.log("success!");
      } catch (error) {
        console.log(error);
        console.log("can not post data");
      }
    };
    const look = (item) => {
      editInfo.data = item;
    };

    getData();

    onBeforeMount(() => {});

    onMounted(() => {
      var scripts = [
        "https://code.jquery.com/jquery-3.5.1.min.js",
        "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
      ];
      scripts.forEach((script) => {
        let tag = document.createElement("script");
        tag.setAttribute("src", script);
        document.body.appendChild(tag);
      });
    });
    return {
      responseApi,
      look,
      editInfo,
      changePage,
      putData,
      deleteData,
      postData,
    };
  },
  components: {
    EditInfo,
    DeleteInfo,
  },
};
</script>
