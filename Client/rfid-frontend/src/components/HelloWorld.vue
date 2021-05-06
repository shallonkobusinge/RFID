<template>
    <div class="container">
        <h2>Document </h2>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">Job Id</div>
            <div class="col col-2">Customer Name</div>
            <div class="col col-3">Amount Due</div>
            <div class="col col-4">Payment Status</div>
          </li>
          <li class="table-row">
            <div class="col col-1" data-label="Job Id">42235</div>
            <div class="col col-2" data-label="Customer Name">John Doe</div>
            <div class="col col-3" data-label="Amount">$350</div>
            <div class="col col-4" data-label="Payment Status">Pending</div>
          </li>
          <li class="table-row">
            <div class="col col-1" data-label="Job Id">42442</div>
            <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
            <div class="col col-3" data-label="Amount">$220</div>
            <div class="col col-4" data-label="Payment Status">Pending</div>
          </li>
          <li class="table-row">
            <div class="col col-1" data-label="Job Id">42257</div>
            <div class="col col-2" data-label="Customer Name">John Smith</div>
            <div class="col col-3" data-label="Amount">$341</div>
            <div class="col col-4" data-label="Payment Status">Pending</div>
          </li>
          <li class="table-row">
            <div class="col col-1" data-label="Job Id">42311</div>
            <div class="col col-2" data-label="Customer Name">John Carpenter</div>
            <div class="col col-3" data-label="Amount">$115</div>
            <div class="col col-4" data-label="Payment Status">Pending</div>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/table.scss";
</style>
