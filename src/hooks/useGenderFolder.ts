const useGenderFolder = (gender: string) => {
  const genderFolder = gender === 'man' || gender === 'woman' ? gender : 'other'

  return { genderFolder }
}

export default useGenderFolder
