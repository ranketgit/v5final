export const cities = [
  {
    section: "Marketing Digital au Nord du Maroc",
    cities: [
      { name: 'Tanger', slug: 'tanger' },
      { name: 'Tetouan', slug: 'tetouan' },
      { name: 'Al Hoceima', slug: 'al-hoceima' },
      { name: 'Larache', slug: 'larache' },
      { name: 'Fnideq', slug: 'fnideq' },
      { name: 'Mdiq', slug: 'mdiq' },
      { name: 'Martil', slug: 'martil' },
      { name: 'Ouazzane', slug: 'ouazzane' },
      { name: 'Nador', slug: 'nador' },
      { name: 'Berkane', slug: 'berkane' },
      { name: 'Oujda', slug: 'oujda' },
      { name: 'Taourirt', slug: 'taourirt' },
      { name: 'Guercif', slug: 'guercif' },
      { name: 'Taza', slug: 'taza' },
    ]
  },
  {
    section: "Marketing Digital au Centre du Maroc",
    cities: [
      { name: 'Casablanca', slug: 'casablanca' },
      { name: 'Rabat', slug: 'rabat' },
      { name: 'Salé', slug: 'sale' },
      { name: 'Fes', slug: 'fes' },
      { name: 'Meknes', slug: 'meknes' },
      { name: 'Kenitra', slug: 'kenitra' },
      { name: 'Mohammedia', slug: 'mohammedia' },
      { name: 'Temara', slug: 'temara' },
      { name: 'El Jadida', slug: 'el-jadida' },
      { name: 'Safi', slug: 'safi' },
      { name: 'Beni Mellal', slug: 'beni-mellal' },
      { name: 'Khouribga', slug: 'khouribga' },
      { name: 'Settat', slug: 'settat' },
      { name: 'Berrechid', slug: 'berrechid' },
      { name: 'Khemisset', slug: 'khemisset' },
      { name: 'Skhirat', slug: 'skhirat' },
      { name: 'Dar Bouazza', slug: 'dar-bouazza' },
      { name: 'Bouskoura', slug: 'bouskoura' },
    ]
  },
  {
    section: "Marketing Digital au Sud du Maroc",
    cities: [
      { name: 'Marrakesh', slug: 'marrakesh' },
      { name: 'Agadir', slug: 'agadir' },
      { name: 'Aït Melloul', slug: 'ait-melloul' },
      { name: 'Inezgane', slug: 'inezgane' },
      { name: 'Ouarzazate', slug: 'ouarzazate' },
      { name: 'Essaouira', slug: 'essaouira' },
      { name: 'Guelmim', slug: 'guelmim' },
      { name: 'Tan-Tan', slug: 'tan-tan' },
      { name: 'Taroudant', slug: 'taroudant' },
      { name: 'Tiznit', slug: 'tiznit' },
      { name: 'Dcheira El Jihadia', slug: 'dcheira-el-jihadia' },
      { name: 'Lqliaa', slug: 'lqliaa' },
      { name: 'Oulad Teima', slug: 'oulad-teima' },
      { name: 'Ben Guerir', slug: 'ben-guerir' },
      { name: 'Errachidia', slug: 'errachidia' },
    ]
  }
].map(section => ({
  ...section,
  cities: section.cities.map(city => ({
    ...city,
    slug: city.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
  }))
}));