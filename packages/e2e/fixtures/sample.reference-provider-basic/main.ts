const referenceProvider = {
  languageId: 'xyz',
  provideReferences2(textDocument: { uri: string }, _offset: number) {
    return [
      {
        uri: `${textDocument.uri}`,
        startRowIndex: 0,
        startColumnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 0,
      },
    ]
  },
}

export const activate = () => {
  vscode.registerReferenceProvider(referenceProvider)
}
