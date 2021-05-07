<template>
  <div id="app" class="col-sm-12">
    <div class="offset">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Initial Balance</th>
            <th>Transport Fare</th>
            <th>New Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td>{{ transaction.cardNumber }}</td>
            <td>{{ transaction.initialBalance }}</td>
            <td>{{ transaction.transportFare }}</td>

            <td>{{ transaction.newBalance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Api from "../services/Apis";
export default {
  name: "Table",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      transactions: []
    };
  },
  methods: {
    async getTransaction() {
      await Api.get("/read/transactions")
        .then(response => {
          this.transactions = response.data.transactions;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getTransaction();
  }
};
</script>
<style scoped>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
</style>
