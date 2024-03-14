const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("button");

async function query(data) {
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

function adjustFormLayout() {
    if (window.innerWidth >= 600) {
        form.style.flexDirection = 'row';
        form.style.justifyContent = 'space-between';
    } else {
        form.style.flexDirection = 'column';
        form.style.justifyContent = 'normal';
    }
}
window.addEventListener('resize', adjustFormLayout);

// Call the function once to set the initial layout
adjustFormLayout();
button.addEventListener("click", async function () {
    try {
        const response = await query();
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL; // Display generated image
    } catch (error) {
        console.error("Error:", error);
    }
});
