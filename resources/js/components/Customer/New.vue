<template>
    <div class="customer-new">
        <form @submit.prevent="add">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.name" placeholder="Customer Name"/>
                    </td>
                </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.email" placeholder="Customer Email"/>
                    </td>
                </tr>
                  <tr>
                    <th>Phone</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer Phone"/>
                    </td>
                </tr>
                  <tr>
                    <th>Website</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.website" placeholder="Customer Website"/>
                    </td>
                </tr>
                  <tr>
                      <td>
                          <router-link to="/customers" class="btn">Cancel</router-link>
                      </td>
                    <td class="text-right">
                        <input  type="submit" value="Create"  class="btn btn-primary text-right"/>
                    </td>
                </tr>
            </table>
        </form>
        <div v-if="errors" class="error">
            <ul>
                <li v-for="(fieldsError,fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{fieldsError.join('\n')}}
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import validate from "validate.js";
export default {
  name: "new",
  data() {
    return {
      customer: {
        name: "",
        email: "",
        phone: "",
        website: ""
      },
      errors: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    add() {
      this.errors = null;
      const constraints = this.getConstraints();
      const errors = validate(this.$data.customer, constraints);
      if (errors) {
        this.errors = errors;
        return;
      }
      //send customer data to th Api
      axios.post("/api/customers/new", this.$data.customer).then(response => {
        this.$router.push("/customers");
      });
    },
    getConstraints() {
      return {
        name: {
          presence: true,
          length: {
            minimum: 3,
            message: "Must br at last 9 characters"
          }
        },
        email: {
          presence: true,
          email: true
        },
        phone: {
          presence: true,
          numericality: true,
          length: {
            minimum: 10,
            message: "Must br at last 10 characters"
          }
        }
      };
    }
  }
};
</script>

<style>
.error {
  margin-top: 1em;
  background: lightblue;
  border-radius: 5px;
  padding: 20px 0 2px 0;
}
</style>
