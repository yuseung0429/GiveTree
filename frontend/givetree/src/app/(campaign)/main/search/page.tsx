export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>main/search 페이지 : {q}을 검색했습니다.</div>;
}
