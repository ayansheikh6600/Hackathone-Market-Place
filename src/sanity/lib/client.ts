import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token :"sk5nsQCFieWq4UFU4wlvWJwpwwwnj5Cm8sO13buia3tDkcQK2gQlw0OCjJRDFZuMgrfSbwnPhy2aISikoCYCQEzHV5aeIwrtCIbY8Ffi3r9n33BDHKJP8WpgSh5r8gcD7O1ySaopxj6ru6OEQFjN3dXDIVUtKJLZ0h6daCITqV2FjrAALKhE"
})
