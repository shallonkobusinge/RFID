<template>
  <div class="container">
    <v-client-table :data="tableData" :columns="columns" :options="options">
    </v-client-table>
    <!-- <button v-on:click="sendMessage('Hello World')">Send</button> -->
  </div>
</template>
<script>
import Api from "../services/Apis";
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
  methods: {

    // async getTransaction() {
    //   await Api.get("/read/transactions")
    //     .then(response => {
    //       this.tableData = response.data.transactions;
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].createdAt === undefined) {
    //           this.tableData[i].createdAt = new Date();
    //         }
    //         this.tableData[i].createdAt = new Date(
    //           this.tableData[i].createdAt
    //         ).toUTCString();
    //         console.log(this.tableData[i].createdAt);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

    getTransactions() {
      socket.on("NEW_TRANSACTION", function(data) {
        this.tableData = data.transactions;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].createdAt === undefined) {
            this.tableData[i].createdAt = new Date();
          }
          this.tableData[i].createdAt = new Date(
            this.tableData[i].createdAt
          ).toUTCString();
        }
      });
    }
  },
  created() {
    let self = this
    // console.log(this.tableData)
    // this.getTransactions();
     socket.on("NEW_TRANSACTION", function(data) {
        self.tableData = data.transactions;
                for (let i = 0; i < self.tableData.length; i++) {
          if (self.tableData[i].createdAt === undefined) {
            self.tableData[i].createdAt = new Date();
          }
          self.tableData[i].createdAt = new Date(
            self.tableData[i].createdAt
          ).toUTCString();
        }
        // console.log(this.tableData)
     })
    //  console.log(this.tableData)
  }
};
</script>
<style>
#app {
  width: 95%;
  margin-top: 50px;
  font-family: Inter;
}
#app thead {
  vertical-align: bottom;
  background: black !important;
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
/* .container {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
} */

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
