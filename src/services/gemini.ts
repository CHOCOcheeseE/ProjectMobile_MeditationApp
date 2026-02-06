// Google Gemini Service
// Documentation: https://ai.google.dev/tutorials/rest_quickstart

// 1. Dapatkan API Key Gratis di sini: https://aistudio.google.com/app/apikey
// 2. Klik "Create API key"
// 3. Copy key tersebut dan paste di bawah ini:

const GEMINI_API_KEY = "AIzaSyAHGP5kzRZgoJM_Noq39XbOkH2-kqV3Rjo";

// Gunakan gemini-1.5-flash yang standar untuk v1beta
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const sendMessageToGemini = async (message: string) => {
    if (GEMINI_API_KEY.includes("YOUR_GEMINI")) {
        return "⚠️ Configurasi API Key belum diisi. Silakan isi GEMINI_API_KEY di src/services/gemini.ts file";
    }

    try {
        const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Kamu adalah asisten meditasi bernama 'Mindful AI' di aplikasi 'MeditasiApp'.
                        Jawablah dengan sopan, santai, dan menenangkan. Gunakan Bahasa Indonesia.
                        Konteks Aplikasi:
                        - Fitur: Meditasi (7 Days of Calm, Anxiety Release), Fokus, Tidur (Sleep music), Musik Relaksasi.
                        - Tujuan: Membantu pengguna rileks, tidur nyenyak, dan mengurangi stres.
                        
                        Pertanyaan User: ${message}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Gemini API Error Body:", errorBody);
            throw new Error(`API Error: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        return reply;

    } catch (error: any) {
        console.error("Gemini Error:", error);
        return "Maaf, saya sedang meditasi sebentar (Koneksi Error). Coba lagi nanti ya. 🧘";
    }
};
