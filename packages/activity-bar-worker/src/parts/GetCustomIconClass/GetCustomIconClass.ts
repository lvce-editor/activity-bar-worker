const hashString = (value: string): string => {
  let hash = 2_166_136_261
  for (const character of value) {
    hash ^= character.codePointAt(0) || 0
    hash = Math.imul(hash, 16_777_619)
  }
  return (hash >>> 0).toString(36)
}

export const getCustomIconClass = (id: string, iconUrl: string): string => {
  const hashInput = id + '\n' + iconUrl
  return `MaskIconCustomView${hashString(hashInput)}`
}
