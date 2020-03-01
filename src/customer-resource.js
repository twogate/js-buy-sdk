import Resource from './resource';
import defaultResolver from './default-resolver';
import handleCustomerMutation from './handler-customer-mutation';

// GraphQL
import customerQuery from './graphql/customerQuery.graphql';
import customerCreateMutation from './graphql/customerCreateMutation.graphql';
import customerAccessTokenCreateMutation from './graphql/customerAccessTokenCreateMutation.graphql';
import checkoutCustomerAssociateV2Mutation from './graphql/checkoutCustomerAssociateV2Mutation.graphql';
import checkoutCustomerDisassociateV2Mutation from './graphql/checkoutCustomerDisassociateV2Mutation.graphql';

/**
 * The JS Buy SDK customer resource
 * @class
 */
class CustomerResource extends Resource {
  /**
   * Fetches a single customer by ID on the shop.
   *
   * @example
   * client.customer.fetch(customerAccessToken).then((customer) => {
   *   // Do something with the customer
   * });
   *
   * @param {String} customerAccessToken
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the customer.
   */
  fetch(customerAccessToken) {
    return this.graphQLClient
      .send(customerQuery, { customerAccessToken })
      .then(defaultResolver('customer'))
  }

  /**
  * Fetches a single customer by ID on the shop.
  *
  * @example
  * client.customer.register(email, password).then((customer) => {
  *   // Do something with the customer
  * });
  *
  * 
  * @param {String} email
  * @param {String} password
  * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the customer.
  */
  register(email, password) {
    return this.graphQLClient
      .send(customerCreateMutation, { input: { email, password } })
      .then(handleCustomerMutation('customerCreate'))
  }

  /**
  * Fetches a single customer access token by email and password.
  *
  * @example
  * client.customer.login(email, password).then((customerAccessToken) => {
  *   // Do something with the customer
  * });
  *
  *
  * @param {String} email
  * @param {String} password
  * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the customer access token.
  */
  login(email, password) {
    return this.graphQLClient
      .send(customerAccessTokenCreateMutation, { input: { email, password } })
      .then(handleCustomerMutation('customerAccessTokenCreate'))
  }

  associateCheckout(customerAccessToken, checkoutId) {
    return this.graphQLClient
      .send(checkoutCustomerAssociateV2Mutation, { customerAccessToken, checkoutId })
      .then(handleCustomerMutation('checkoutCustomerAssociateV2'))
  }

  disassociateCheckout(checkoutId) {
    return this.graphQLClient
      .send(checkoutCustomerDisassociateV2Mutation, { checkoutId })
      .then(handleCustomerMutation('checkoutCustomerDisassociateV2'))
  }
}

export default CustomerResource;
