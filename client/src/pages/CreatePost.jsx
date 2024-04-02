import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { config } from '../config';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch(`${config.apiUrl}/posts`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.status === 201) {
      setRedirect(true);
      window.location.href = '/';
    }
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        required={true}
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required={true}
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        required={true}
        type="file"
        // value={files}
        onChange={(e) =>
          setFiles(
            // @ts-ignore
            e.target.files,
          )
        }
      />
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: '10px' }} type="submit">
        Create Post
      </button>
    </form>
  );
}
