import { GetCitizenUseCase } from '@/domain/citizen/useCases/GetCitizenUseCase';
import { CitizenRepositoryAPI } from '@/infrastructure/api/CitizenRepositoryAPI';
import { CitizenDetailsV2 } from '@/ui/components/CitizensV2/CitizenDetailsV2';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const repo = new CitizenRepositoryAPI();
  const getCitizenDetails = new GetCitizenUseCase(repo);
  const citizen = await getCitizenDetails.execute(slug);

  return <CitizenDetailsV2 citizen={citizen.toJson()} />;
}
