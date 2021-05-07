<template>
  <div>
    <div class="navigation">
      <h2>RFID Transaction Panel</h2>
    </div>
    <div class="container">
      <v-client-table :data="tableData" :columns="columns" :options="options">
      </v-client-table>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
var socket = io("http://localhost:4000", { transports: ["websocket"] });

export default {
  name: "Table",
  data() {
    return {
      columns: [
        "cardUUID",
        "initialBalance",
        "transportFare",
        "newBalance",
        "createdAt"
      ],
      tableData: [],
      options: {
        headings: {
          cardUUID: "Card Number",
          initialBalance: "Initial Balance",
          transportFare: "Transport Fare",
          newBalance: "New Balance",
          createdAt: "Transaction Date"
        },
        sortable: [
          "cardUUID",
          "createdAt",
          "transportFare",
          "newBalance",
          "initialBalance"
        ],
        filterable: [
          "cardUUID",
          "initialBalance",
          "transportFare",
          "newBalance",
          "createdAt"
        ],
        connection: null
      },
      msg: "Welcome to Your Vue.js App",
      transactions: []
    };
  },

  created() {
    let self = this;
    socket.on("NEW_TRANSACTION", function(data) {
      self.tableData = data.transactions;
      for (let i = 0; i < self.tableData.length; i++) {
        self.tableData[i].createdAt = new Date(
          self.tableData[i].createdAt
        ).toUTCString();
      }
    });
  }
};
</script>
<style>
#app {
  width: 100%;
  margin-top: 50px;
  font-family: Inter;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app thead {
  vertical-align: bottom;
  background: #2090e9 !important;
  color: white;
  font-size: 15px;
}
#app label {
  font-size: 20px;
}
#app tr {
  font-size: 16px;
}
#app table {
  caption-side: bottom;
  border-collapse: collapse;
  width: 100% !important;
  font-size: 13px;
}
#app .navigation {
  width: 100%;
  background: #2090e9;
  display: flex;
  height: 40px;
  padding: 1rem 0 0 15rem;
  color: white;
  margin: 0 0 2rem 0;
}
#app input {
  margin: 0 0 0 1rem;
  width: 26rem !important;
}
#app select {
  width: 16rem !important;
  margin: 0 0 0 1rem;
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
.table thead {
  vertical-align: bottom;
  background: black !important;
  color: white;
  font-size: 13px;
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
