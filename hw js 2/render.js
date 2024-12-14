// render.js


function renderPosts(posts) {
    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = ""; // Clear container

    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const postTitle = document.createElement("h2");
        postTitle.innerText = post.title;

        const viewButton = document.createElement("button");
        viewButton.classList.add("view-btn");
        viewButton.innerText = "View";

        // View Button Event
        viewButton.addEventListener("click", () => {
            displayViewModal(post);
        });

        postDiv.appendChild(postTitle);
        postDiv.appendChild(viewButton);
        postContainer.appendChild(postDiv);
    });
}


function displayViewModal(post) {
    document.getElementById("viewTitle").innerText = post.title;
    document.getElementById("viewContent").innerText = post.content;
    document.getElementById("viewTime").innerText = post.time;

    document.getElementById("viewModal").style.display = "flex";
}
