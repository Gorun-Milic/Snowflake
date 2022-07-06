import { elements } from "./base";

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => {
    return elements.searchInput.value = "";
}

export const loadSpinner = () => {
    const markup = `
        <div class='load-spinner'>
            <img src="assets/icons/spinner1.svg" alt="">
        </div>
    `;
    elements.content.insertAdjacentHTML('afterbegin', markup);
}
