export const getData = (type: string, id: string): string => `${type}:${id}`

export const getId = (type: string, value: string): string | undefined => {
  const prefix = `${type}:`
  return value.startsWith(prefix) ? value.slice(prefix.length) : undefined
}
