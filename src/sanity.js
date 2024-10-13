import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'qxvbgi0p', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset (e.g., "production")
  apiVersion: '2022-03-07',
  useCdn: true, // `true` if you want faster, cached responses
});
