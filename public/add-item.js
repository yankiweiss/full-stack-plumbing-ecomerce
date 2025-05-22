 const form = document.getElementById("uploadForm");

      const sendFiles = async () => {
        const formData = new FormData();

        // Get input values
        const sku = document.querySelector('input[name="sku"]').value;
        const name = document.querySelector('input[name="itemName"]').value;
        const price = document.querySelector('input[name="price"]').value;
        const description = document.querySelector(
          'textarea[name="description"]'
        ).value;

        const category = document.querySelector('select[name="categoryControl"]').value;
        const quantity = document.querySelector('input[name="quantity"]').value;
        const fileInput = document.getElementById("myFile");
        const file = fileInput.files[0];

        

        // Append to formData
        formData.append("sku", sku);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
         formData.append("quantity", quantity);
        formData.append("image", file); // Field name must match what backend expects

        try {
          const response = await fetch("https://full-stack-plumbing-ecomerce.vercel.app/items", {
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

        document.querySelector('input[name="sku"]').value = ""
        document.querySelector('input[name="itemName"]').value = ""
        document.querySelector('input[name="price"]').value = ""
        document.querySelector(
          'textarea[name="description"]'
        ).value = ''
        document.getElementById("myFile").value = ""
      
      });