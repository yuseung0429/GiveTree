'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

interface CreateCampaignState
  extends FormState<
    | 'foundationId'
    | 'name'
    | 'introduction'
    | 'startDate'
    | 'endDate'
    | 'targetFundraisingAmount'
    | 'titleImageUrl'
    | 'imageUrls'
  > {
  location?: string;
}

export default async function createCampaign(
  _: CreateCampaignState,
  formData: FormData
): Promise<CreateCampaignState> {
  const foundationId = formData.get('foundationId'),
    name = formData.get('name'),
    introduction = formData.get('introduction'),
    startDate = formData.get('startDate'),
    endDate = formData.get('endDate'),
    targetFundraisingAmount = formData.get('targetFundraisingAmount'),
    titleImageUrl = formData.get('titleImageUrl'),
    imageUrls = formData.getAll('imageUrls');

  try {
    const response = await fetchWrapper(`/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foundationId: Number(foundationId),
        name,
        introduction,
        startDate,
        endDate,
        targetFundraisingAmount: Number(
          targetFundraisingAmount?.toString().replaceAll(',', '')
        ),
        titleImageUrl,
        imageUrls,
      }),
    });
    switch (response.status) {
      case 201:
        return {
          success: true,
          location: response.headers.get('location') || '',
        };
      default:
        return {
          message: '알 수 없는 오류가 발생하였습니다.',
        };
    }
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
