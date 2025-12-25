import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1️⃣ Obtener fecha y leer body
    const now = new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    const body = await request.json();

    // Extraemos email y la nueva variable ubicación
    const { email, ubicacion } = body;

    const finalEmail = email?.toString().trim();
    // Definimos un valor por defecto si no llega la ubicación
    const finalUbicacion = ubicacion?.toString().trim() || 'No especificado';

    // 2️⃣ Validación mínima
    if (!finalEmail) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email required' }),
        { status: 400 }
      );
    }

    // 3️⃣ Auth Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
        // El replace es clave para que las claves privadas funcionen en Vercel/Netlify
        private_key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 4️⃣ Append row (Alineado con tus columnas: Fecha, Correo, Ubicación)
    await sheets.spreadsheets.values.append({
      spreadsheetId: import.meta.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:C', // Ajustado a tus 3 columnas
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            now,            // Columna A: Fecha
            finalEmail,     // Columna B: Correo
            finalUbicacion, // Columna C: Ubicación (Footer o Formulario)
          ],
        ],
      },
    });

    // 5️⃣ OK
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('[SUBMIT-LEAD ERROR]', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500 }
    );
  }
};