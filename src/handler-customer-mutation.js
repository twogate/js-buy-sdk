export default function handleCustomerMutation(mutationRootKey, client) {
  return function ({ data = {}, errors, model = {} }) {
    const rootData = data[mutationRootKey];
    const rootModel = model[mutationRootKey];

    if (rootData && rootData.customerAccessToken) {
      return rootModel.customerAccessToken;
    }

    if (rootData && rootData.customerCreate) {
      return rootModel.customerCreate;
    }

    if (errors && errors.length) {
      return Promise.reject(new Error(JSON.stringify(errors)));
    }

    if (rootData && rootData.customerUserErrors && rootData.customerUserErrors.length) {
      return Promise.reject(new Error(JSON.stringify(rootData.customerUserErrors)));
    }

    if (rootData && rootData.userErrors && rootData.userErrors.length) {
      return Promise.reject(new Error(JSON.stringify(rootData.userErrors)));
    }

    return Promise.reject(new Error(`The ${mutationRootKey} mutation failed due to an unknown error.`));
  };
}
