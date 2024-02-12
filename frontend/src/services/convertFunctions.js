export function reverseDateFormat(formattedDate) {
    const parsedDate = new Date(formattedDate);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
}

export const convertBufferToDataURL = (buffer) => {
    const base64String = buffer.toString('base64');
    return `data:image/png;base64,${base64String}`;
};

export const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

export const fetchAndConvertToBase64 = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const base64String = await fileToBase64(blob);
        return base64String;
    } catch (error) {
        throw error;
    }
};