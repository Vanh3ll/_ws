// app.js

const posts = []; 


const postModal = document.getElementById("postModal");
const viewModal = document.getElementById("viewModal");

const createPostButton = document.getElementById("createPost");
const closeModalButton = document.getElementById("closeModal");
const submitPostButton = document.getElementById("submitPost");
const closeViewModalButton = document.getElementById("closeViewModal");


const postTitleInput = document.getElementById("postTitle");
const postContentInput = document.getElementById("postContent");


createPostButton.addEventListener("click", () => {
    postModal.style.display = "flex";
});


closeModalButton.addEventListener("click", () => {
    postModal.style.display = "none";
    clearInputs();
});


closeViewModalButton.addEventListener("click", () => {
    viewModal.style.display = "none";
});


submitPostButton.addEventListener("click", () => {
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();
    const time = new Date().toLocaleString();

    if (title && content) {
        posts.push({ title, content, time });
        renderPosts(posts);
        postModal.style.display = "none";
        clearInputs();
    } else {
        alert("Please enter both a title and content.");
    }
});


function clearInputs() {
    postTitleInput.value = "";
    postContentInput.value = "";
}
