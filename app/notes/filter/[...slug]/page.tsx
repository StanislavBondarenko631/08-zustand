import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const currentTag = slug ? slug[0] : 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag: currentTag }],
    queryFn: () => fetchNotes({ page: 1, search: '', tag: currentTag }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
