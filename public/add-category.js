const form = document.getElementById("uploadForm");

const sendFiles = async () => {
    const formData = new FormData();

    // Get input values


    const category = document.querySelector('select[name="categoryControl"]').value;
    const quantity = document.querySelector('input[name="quantity"]').value;
    const fileInput = document.getElementById("myFile");
    const file = fileInput.files[0];


    // Append to formData

    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("image", file); // Field name must match what backend expects

    try {
        const response = await fetch("https://full-stack-plumbing-ecomerce.vercel.app/categories", {
            method: "POST",
            body: formData,

        });
        const json = await response.json();

        document.querySelector(
            "h2"
        ).textContent = `Status: ${response.status}`;
        document.querySelector("h3").textContent = json.message || "Success!";
        console.log(json);
    } catch (error) {
        console.error("Upload failed:", error);
        document.querySelector("h3").textContent = "Error uploading file.";
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendFiles();

   
   
    

});