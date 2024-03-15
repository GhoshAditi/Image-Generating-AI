const token = "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";
    const inputTxt = document.getElementById("input");
    const image = document.getElementById("image");
    const button = document.getElementById("button");

    async function query() {
        // Show loading text
        document.getElementById('loadingText').style.display = 'block';

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
                {
                    headers: { Authorization: `Bearer ${token}` },
                    method: "POST",
                    body: JSON.stringify({ "inputs": inputTxt.value }),
                }
            );
            const result = await response.blob();
            // Hide loading text
            document.getElementById('loadingText').style.display = 'none';
            return result;
        } catch (error) {
            // Hide loading text in case of error
            document.getElementById('loadingText').style.display = 'none';
            console.error("Error:", error);
        }
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
    document.addEventListener("DOMContentLoaded", function() {
        const image = document.getElementById('image');
        const brightnessControl = document.getElementById('brightness');
        const sizeControl = document.getElementById('size');
        const opacityControl = document.getElementById('opacity');

        // Function to apply image adjustments
        function applyImageAdjustments() {
            const brightnessValue = brightnessControl.value;
            const sizeValue = sizeControl.value;
            const opacityValue = opacityControl.value;

            // Apply brightness adjustment
            image.style.filter = `brightness(${brightnessValue})`;

            // Apply size adjustment
            image.style.transform = `scale(${sizeValue})`;

            // Apply opacity adjustment
            image.style.opacity = opacityValue;
        }

        // Event listeners for the control inputs
        brightnessControl.addEventListener('input', applyImageAdjustments);
        sizeControl.addEventListener('input', applyImageAdjustments);
        opacityControl.addEventListener('input', applyImageAdjustments);
    });