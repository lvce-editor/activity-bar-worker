declare const vscode: {
  registerReferenceProvider(provider: {
    languageId: string
    provideReferences2(
      textDocument: { uri: string },
      offset: number,
    ): Array<{
      uri: string
      startRowIndex: number
      startColumnIndex: number
      endRowIndex: number
      endColumnIndex: number
    }>
  }): void
}
