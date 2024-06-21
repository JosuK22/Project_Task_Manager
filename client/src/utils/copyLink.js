import toast from 'react-hot-toast';

export default function copyLink(id) {
  const url = new URL(window.location.href);
  url.pathname = '';

  // Get the modified URL
  const modifiedUrl = url.href;
  navigator.clipboard.writeText(`${modifiedUrl}tasks/${id}`);
  toast.success('URL copied to clipboard');
}
