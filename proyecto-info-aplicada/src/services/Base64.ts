export const base64 = {};

class Base64 {
    // Método para convertir uno o varios archivos a Base64
    static async toBase64(files: File | File[]): Promise<string | string[]> {
        if (Array.isArray(files)) {
            // Si es un arreglo de archivos, convertimos cada archivo
            const base64Array = await Promise.all(files.map(file => this.convertFileToBase64(file)));
            console.log(base64Array);
            return base64Array;
        } else {
            // Si es un solo archivo, lo convertimos directamente
            return await this.convertFileToBase64(files);
        }
    }

    // Método privado para convertir un archivo individual a Base64
    static convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString());
                } else {
                    reject("No se pudo leer el archivo");
                }
            };

            reader.onerror = () => reject(reader.error);
        });
    }

    // Método para convertir un archivo base64 a Blob y descargarlo
    static downloadBase64File(base64: string, filename: string): void {
        // Extrae solo los datos base64 sin el prefijo
        const base64Data = base64.split(',')[1];
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Crea el Blob con los datos binarios
        const blob = new Blob([bytes], { type: 'application/octet-stream' });

        // Descarga el archivo directamente sin mostrar un enlace
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        // Libera el objeto URL creado
        URL.revokeObjectURL(link.href);
    }

}

export default Base64;
