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

const lowerString = (str: any) => `${str}`.trim().toLowerCase()

export const handleUrlFilter = (url: string, filter: any) => {
  if (!filter) {
    return `${url}?color=all&cate=all&sort=newest&gender=all&page=1`
  }
  const color = filter.color || 'all'
  const cate = filter.cate || 'all'
  const sort = filter.sort || 'newest'
  const gender = filter.gender || 'all'
  const page = filter.page || 1
  const min = filter.min
  const max = filter.max
  const search = filter.search || ''
  url =
    url +
    '?color=' +
    lowerString(color) +
    '&cate=' +
    lowerString(cate) +
    '&sort=' +
    lowerString(sort) +
    '&gender=' +
    lowerString(gender) +
    '&search=' +
    lowerString(search) +
    '&page=' +
    lowerString(page)
  if (min && max) {
    url += '&min=' + min + '&max=' + max
  }
  return url
}

export const handleArrayData = (array: any): any[] => {
  if (!array || !(array instanceof Array)) {
    return []
  }
  return array
}


