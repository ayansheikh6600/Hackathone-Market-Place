import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token :"skBRFpM87j5RPej5pVxKbmZshhasp8hTkPNuAyRdEbBR6Py8iVdHmFxqSp7cP5cPv7AyqnNCqkw4f0DeZc0ZUuVF42JMYH4AKtjsGiCJyuTOSb5UaunZmyY4c392FdayrOUYpNghxXx9kCO3uFWxrLIagFtZowpXVsrR9IdAmxJa9SK5HwNP"
})
