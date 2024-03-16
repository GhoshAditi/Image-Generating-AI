
const token = "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";
    const inputTxt = document.getElementById("input");
    const image = document.getElementById("image");
    const button = document.getElementById("button");
    const text = 'InnoNinja AI';
    const animatedText = document.getElementById('animated-text');
    const input = document.getElementById('input');
    


    for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.animationDelay = `${i * 0.1}s`;
    animatedText.appendChild(span);
}
    
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
    window.addEventListener('load', function () {
        setTimeout(function () {
          document.getElementById('loader').style.display = 'none';
          document.querySelector('main').style.display = 'block';
        }, 2000);
        document.getElementById('button').addEventListener('click', async function() {
          document.getElementById('loadingText').style.display = 'block'; // Show loader
          try {
            const response = await query();
            const objectURL = URL.createObjectURL(response);
            image.src = objectURL; // Display generated image
          } catch (error) {
            console.error("Error:", error);
          } finally {
            document.getElementById('loadingText').style.display = 'none'; // Hide loader after query
          }
        });
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