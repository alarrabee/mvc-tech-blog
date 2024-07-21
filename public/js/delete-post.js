//deletes post when user clicks delete button
async function deletePost(id) {
    try {
        const response = await fetch(`/delete-post/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to create post.');
    }
};