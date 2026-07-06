export const escapeCssUrl = (url: string): string => {
  return url.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\n', '\\a ').replaceAll('\r', '\\d ').replaceAll('\f', '\\c ')
}
