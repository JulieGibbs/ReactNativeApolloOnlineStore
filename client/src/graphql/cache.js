import {InMemoryCache} from '@apollo/client';
import {GET_FAVORITE_PRODUCTS_COUNT} from './requests';

function convertDollarValueToMAD(dollar) {
  return dollar * 10;
}

export const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        favorite: {
          read(favorite = false) {
            return favorite;
          },
        },
        price(price) {
          return `${convertDollarValueToMAD(price)} MAD`;
        },
      },
    },
    Query: {
      fields: {
        product(_, {args, toReference}) {
          return toReference({
            __typename: 'Product',
            id: args.id,
          });
        },
      },
    },
  },
});
cache.writeQuery({
  query: GET_FAVORITE_PRODUCTS_COUNT,
  data: {
    favoriteProductsCount: 0,
  },
});
