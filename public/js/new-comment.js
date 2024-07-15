// const newCommentFormHandler = async (event) => {
//     event.preventDefault();
  
//     const comment = document.querySelector('#comment-text').value.trim();
  
//     if (comment) {
//       const response = await fetch('/post', {
//         method: 'POST',
//         body: JSON.stringify({ comment }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/'); //change this 
//       } else {
//         alert('Failed to post comment!'); 
//       }
//     }
//   };
  
//   document
//     .querySelector('.new-comment-form')
//     .addEventListener('submit', newCommentFormHandler);

const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();

    //gets post_id from url to be able to associate each comment with the correct post
    const post_id = window.location.pathname.split('/')[2];

    if (comment_text) {
        const response = await fetch(`/post/${post_id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ commentText }),
        headers: { 'Content-Type': 'application/json' },     
        });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to post comment');
    }
    }
};