const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("button");

async function query() {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({ "inputs": inputTxt.value }),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener("click", async function () {
    try {
        const response = await query();
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL; // Display generated image
    } catch (error) {
        console.error("Error:", error);
    }
});
