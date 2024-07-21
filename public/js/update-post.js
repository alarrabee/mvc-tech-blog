//modal and form handlers for updating a post

//modal with pre-filled blog post content
function openUpdateForm(id, title, content) {
    const modal = document.getElementById("updateModal");
    modal.style.display = "block";
    
    document.getElementById("post-id").value = id;
    document.getElementById("post-title").value = title;
    document.getElementById("post-content").value = content;
}

const modal = document.getElementById("updateModal");
const cancle = document.getElementsByClassName("cancle")[0];

//closes modal when cancle button is clicked
cancle.onclick = function() {
    modal.style.display = "none";
}


//form handler for updating a post
document.querySelector('.update-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (title && content) {
        const response = await fetch(`/update-post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            //closes modal when update post or cancle buttons are clicked
            modal.style.display = "none";
            //reloads the page
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
});