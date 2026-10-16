import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description: 'Create and save a new personal note to your dashboard.',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description: 'Create and save a new personal note to your dashboard.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Preview',
      },
    ],
  },
};

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <p>Form will be here</p>
      </div>
    </main>
  );
}
