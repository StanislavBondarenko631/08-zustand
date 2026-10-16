'use client';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import toast from 'react-hot-toast';
import type { NoteTag } from '@/types/note';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// interface NoteFormProps {
//   onClose: () => void;
// }

// const initialValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, 'Title must be at least 3 characters')
//     .max(50, 'Title must be at most 50 characters')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Content must be at most 500 characters'),
//   tag: Yup.string()
//     .oneOf(
//       ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
//       'Invalid tag value'
//     )
//     .required('Tag is required'),
// });

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Todo');

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Failed to create note. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={e => setTag(e.target.value as NoteTag)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes/filter/all')}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={!title.trim() || createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
