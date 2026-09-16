export const Type = 'application/x-lvce-editor-activity-bar-item'

export const getData = (id: string): string => `${Type}:${id}`

export const getId = (value: string): string | undefined => {
  const prefix = `${Type}:`
  return value.startsWith(prefix) ? value.slice(prefix.length) : undefined
}
