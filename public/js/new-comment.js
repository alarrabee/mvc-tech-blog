const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-content').value.trim();
  
    if (comment) {
      const response = await fetch('/post', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); //change this 
      } else {
        alert('Failed to post comment!'); 
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);