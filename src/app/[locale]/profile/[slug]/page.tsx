import { GetCitizenUseCase } from '@/domain/citizen/useCases/GetCitizenUseCase';
import { CitizenRepositoryAPI } from '@/infrastructure/api/CitizenRepositoryAPI';
import CitizenDetails from '@/ui/components/Citizens/CitizenDetails';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const repo = new CitizenRepositoryAPI();
  const getCitizenDetails = new GetCitizenUseCase(repo);
  const citizen = await getCitizenDetails.execute(slug);

  return <CitizenDetails citizen={citizen.toJson()} />;
}
