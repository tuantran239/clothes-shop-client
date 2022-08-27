export const handleError = (error: any) => {
  const defaultError = {
    name: 'Error',
    status: 500,
    error: [{ message: 'Error System', field: 'server' }]
  }
  if (error.response && error.response.data) {
    return error.response.data
  }
  return defaultError
}
