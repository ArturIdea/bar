import CitizenDetails from '@/ui/components/Citizens/CitizenDetails';

export default async function Page({ slug }: { slug: string }) {
  // const repo = new CitizenRepositoryAPI();
  // const getCitizenDetails = new GetCitizenDetailsUseCase(repo);
  // const citizenDetails = await getCitizenDetails.execute(slug);

  return <CitizenDetails />;
}
