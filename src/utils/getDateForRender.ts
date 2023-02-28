export const getDateForRender = (d: string, mark: string = '.') => {
  const date = new Date(d).getDate()
  const month = new Date(d).getMonth()+1
  const year = new Date(d).getFullYear()

  return `${date < 10 ? '0'+date : date}${mark}${month < 10 ? '0'+month : month}${mark}${year}`
}