import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($skip: Int, $take: Int) {
    products(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        description
        variants {
          id
          name
          price
          sku
          stockLevel
        }
        featuredAsset {
          preview
        }
      }
      totalItems
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      variants {
        id
        name
        price
        sku
        stockLevel
      }
      featuredAsset {
        preview
      }
      assets {
        source
        preview
      }
    }
  }
`;
