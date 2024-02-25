export function reverseDateFormat(formattedDate) {
    const parsedDate = new Date(formattedDate);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
}

export function formatDate(dateFromMongo) {
    // Create a new Date object
    const date = new Date(dateFromMongo);

    // Get day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format the date as dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

export const convertBufferToDataURL = (buffer) => {
    const base64String = buffer.toString('base64');
    return `data:image/*;base64,${base64String}`;
};

export const convertBase64ToUrlFile = (buffer) => {
    const base64String = buffer.toString('base64');
    return `data:application/pdf;base64,${base64String}#toolbar=0`;
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

export const formatNumFollowers = (numFollowers) => {
    if (numFollowers > 999)
        return (numFollowers / 1000).toFixed(1) + "k";
    return numFollowers
}