import { activate, registerReferenceProvider } from '@lvce-editor/api'

const referenceProvider = {
  id: 'reference-provider-basic',
  languageId: 'xyz',
  provideReferences(textDocument: { uri: string }, _offset: number) {
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

await activate()

registerReferenceProvider(referenceProvider)
