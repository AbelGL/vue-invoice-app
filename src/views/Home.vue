<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are {{ invoiceData.length }} total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status <span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span>
          <img src="@/assets/icon-arrow-down.png" alt="">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoices">Draft</li>
            <li @click="filteredInvoices">Pending</li>
            <li @click="filteredInvoices">Paid</li>
            <li @click="filteredInvoices">Clear Filter</li>
          </ul>
        </div>
        <div v-if="user" @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.png" alt="">
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
    <!--Invoices-->
    <div v-if="invoiceData.length > 0">
      <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index"/>
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.png" alt="">
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started!</p>
    </div>
    <div class="pagination-row">
      <button class="pagination-go">Previous</button>
     <span v-for="(item, index) in new Array(10)" :key="index">
       <button class="pagination-button">{{index + 1}}</button>
     </span>
     <button class="pagination-go">Next</button>
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/Invoice.vue';
import {mapMutations, mapState} from 'vuex';
export default {
  name: "Home",
  data: () =>({
    filterMenu: null,
    filteredInvoice: null,
  }),
  components: {
    Invoice
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    toggleFilterMenu(){
      this.filterMenu = !this.filterMenu;
    },
    filteredInvoices(e){
      if(e.target.innerText == 'Clear Filter'){
        this.filteredInvoice  = null;
        return;
      }
      this.filteredInvoice  = e.target.innerText;
    },
    filteredSearch(){
      this.filtered = this.invoiceData.filter((invoice) =>{
        console.log(invoice.clientName.match(this.search))
        return invoice.clientName.match(this.search);
      })
    },
  },
  computed: {
    ...mapState(['invoiceData']),
    filteredData(){
      return this.invoiceData.filter(invoice =>{
        if(this.filteredInvoice === "Draft"){
          return invoice.invoiceDraft === true;
        }
        else if(this.filteredInvoice === "Pending"){
          return invoice.invoicePending === true;
        }
        else if(this.filteredInvoice === "Paid"){
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
    user(){
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-row{
  display:none;
  margin-top: 20px;
  .pagination-button{
     padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: .8em;
    cursor: pointer;
    width: 45px;
    background-color: rgba(51, 214, 160, 0.1);
}

.pagination-go{
  padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: .8em;
    cursor: pointer;
    width: auto;
    background-color: rgba(51, 214, 160, 0.1);
}
}
.home{
  color: #fff;
}
.header{
  margin-bottom: 65px;
  .left, .right{
    flex: 1;
  }
  .right{
    justify-content: flex-end;
    align-items: center;
    .button, .filter{
      align-items: center;
      span{
        font-size: 12px;
      }
    }
    .filter{
      position: relative;
      margin-right: 40px;
      cursor: pointer;
      img{
        margin-left: 12px;
        width: 9px;
        height: 5px;
      }
      .filter-menu{
        width: 120px;
        position: absolute;
        top: 25px;
        list-style: none;
        background-color: #1e2139;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0, 0.06);
        li{
          cursor: pointer;
          font-size: 12px;
          padding: 10 20px;
          &:hover{
            color: #1e2139;
            background-color: #fff;
          }
        }
      }
    }
    .button{
      padding: 8px 10px;
      background-color: #7c5dfa;
      border-radius: 40px;
      .inner-button{
        margin-right: 8px;
        border-radius: 50%;
        padding: 8px;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        img{
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
.empty{
  margin-top: 160px;
  align-items: center;
  img{
    width: 214px;
    height: 200px;
  }
  h3{
    font-size: 20px;
    margin-top: 40px;
  }
  p{
    text-align: center;
    max-width: 224px;
    font-weight: 300x;
    margin-top: 16px;

  }
}
</style>
