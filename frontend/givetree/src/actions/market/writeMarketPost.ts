'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type WriteMarketPostState = FormState<
  | 'foundationId'
  | 'price'
  | 'contribution'
  | 'title'
  | 'description'
  | 'imageUrls'
  | 'status'
  | 'productionCondition'
  | 'isDirectSale'
  | 'isDeliverySale'
>;

export default async function writeMarketPost(
  _: WriteMarketPostState,
  formData: FormData
): Promise<WriteMarketPostState> {
  const foundationId = parseInt(formData.get('foundationId')?.toString() || ''),
    price = parseInt(
      formData.get('price')?.toString().replaceAll(',', '') || ''
    ),
    contribution = parseInt(
      formData.get('contribution')?.toString().replaceAll(',', '') || ''
    ),
    title = formData.get('title'),
    description = formData.get('description'),
    imageUrls = formData.getAll('imageUrls'),
    status = '판매중',
    productionCondition = formData.get('productionCondition'),
    isDirectSale = formData.get('isDirectSale') === 'on',
    isDeliverySale = formData.get('isDeliverySale') === 'on';

  try {
    const response = await fetchWrapper(`/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foundationId,
        price,
        contribution,
        title,
        description,
        imageUrls,
        status,
        productionCondition,
        isDirectSale,
        isDeliverySale,
      }),
    });

    console.log({
      foundationId,
      price,
      contribution,
      title,
      description,
      imageUrls,
      status,
      productionCondition,
      isDirectSale,
      isDeliverySale,
    });

    switch (response.status) {
      case 200:
        return { success: true };
      default:
        return {
          message:
            (await response.json()).message ||
            '알 수 없는 오류가 발생하였습니다.',
        };
    }
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
