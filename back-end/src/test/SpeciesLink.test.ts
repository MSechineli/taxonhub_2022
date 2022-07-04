import { SpeciesLink } from '../Services/SpeciesLink'

test('Search with empty array of species', async () => {
  const speciesLink = new SpeciesLink()
  expect(speciesLink.buscaSpeciesLink([])).toBe([])
})

test('Search Eichhornia azurea of species', async () => {
  const speciesLink = new SpeciesLink()
  const res = await speciesLink.buscaSpeciesLink(['Eichhornia azurea'])

  expect(res).toBe(res.result)
})
