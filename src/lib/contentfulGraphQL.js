import { GraphQLClient, gql } from "graphql-request";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/master`;

const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export async function getBlogPosts(locale = "en-US") {
  const query = gql`
  query ($locale: String!) {
    blogPostCollection(locale: $locale) {
        items {
          title
          author
          dateAndTime
          imageCollection{
            items{
              url
            }
          }
          richText {
            json
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { locale });
    return data.blogPostCollection.items;
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}
