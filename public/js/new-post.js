//form handler used for submitting a new post
const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/dashboard', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
        //   const errorText = await response.text(); // debugging: get error text
        //   console.error('Error:', errorText); // debugging: log error
          alert('Failed to create post.'); 
        }
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to create post.');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);