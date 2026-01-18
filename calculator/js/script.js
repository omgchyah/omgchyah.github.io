const buttons = document.querySelectorAll(".calc-button");
const screen = document.querySelector(".screen");
const operators = ["+", "-", "×", "÷"];
const deleteButton = document.querySelector(".double");
const backButton = document.querySelector(".back");

function updateScreen() {

    buttons.forEach(button => {
        
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (operators.includes(buttonText)) {
                if (screen.textContent === "Error") {
                    screen.textContent = "0";
                    return;
                }
                if (!operators.includes(screen.textContent.charAt(screen.textContent.length - 1))) {
                    screen.textContent += buttonText;
                    return;
                }
                if (operators.includes(screen.textContent.charAt(screen.textContent.length - 1))) {
                    screen.textContent = screen.textContent.slice(0, -1) + buttonText;
                    return;
                }
            }

            if (!isNaN(parseInt(buttonText))) {
                if (screen.textContent.trim() === "0" || screen.textContent === "Error") {
                    screen.textContent = buttonText;
                } else {
                    screen.textContent += buttonText;
                }
                return;
            }

            if (button === backButton && screen.textContent.length > 1) {
                screen.textContent = screen.textContent.slice(0, -1);
                return;
            }

            if (button === backButton && screen.textContent.length === 1) {
                screen.textContent = "0";
                return;
            }

            if (button === deleteButton) {
                screen.textContent = "0";
                return;
            } 
            
            if (buttonText === "=") {
                try {
                    let expression = screen.textContent.replace("×", "*").replace("÷", "/");
                    screen.textContent = eval(expression);
                } catch(e) {
                    screen.textContent = "Error";
                }
                return;
            }
        });
    });

    return screen.textContent;
}

updateScreen();