<template>
  <div class="container">
    <v-client-table :data="tableData" :columns="columns" :options="options">
    </v-client-table>
  </div>
</template>
<script>
import Api from "../services/Apis";
export default {
  name: "Table",
  data() {
    return {
      columns: [
        "cardUUID",
        "initialBalance",
        "transportFare",
        "newBalance",
        "createdAt",
        "updatedAt"
      ],
      tableData: [],
      options: {
        headings: {
          cardUUID: "Card Number",
          initialBalance: "Initial Balance",
          transportFare: "Transport Fare",
          newBalance: "New Balance",
          createdAt: "Created At",
          updatedAt: "Updated At"
        },
        sortable: [
          "cardUUID",
          "createdAt",
          "updatedAt",
          "transportFare",
          "newBalance"
        ],
        filterable: [
          "cardUUID",
          "initialBalance",
          "transportFare",
          "newBalance",
          "createdAt",
          "updatedAt"
        ]
      },
      msg: "Welcome to Your Vue.js App",
      transactions: []
    };
  },
  methods: {
    async getTransaction() {
      await Api.get("/read/transactions")
        .then(response => {
          this.tableData = response.data.transactions;
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getTransaction();
  }
};
</script>
<style scoped>
#app {
  width: 95%;
  margin-top: 50px;
}
.container {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>
