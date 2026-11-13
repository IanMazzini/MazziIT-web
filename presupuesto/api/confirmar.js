// api/confirmar.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Solo permitimos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { email_cliente, presupuesto_id } = req.body;
    
    // Obtenemos las credenciales desde las variables de entorno de Vercel de forma segura
    const miCorreo = process.env.EMAIL_USER;
    const passwordApp = process.env.EMAIL_PASS;

    if (!email_cliente || !email_cliente.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    // Configuramos el servidor SMTP de Google
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true para 465, false para otros puertos
        auth: {
            user: miCorreo,
            pass: passwordApp
        }
    });

    try {
        // Enviamos el mail
        await transporter.sendMail({
            from: `"Mazzi IT Solutions" <${miCorreo}>`,
            to: email_cliente,
            bcc: miCorreo, // Copia oculta para vos
            subject: `Confirmación de Presupuesto ${presupuesto_id} - Mazzi IT`,
            html: `
                <h2>¡Hola!</h2>
                <p>Confirmamos la aceptación del presupuesto <strong>${presupuesto_id}</strong> (Servidor TWWOM Legacy - Partnership).</p>
                <p>En breve nos estaremos poniendo en contacto para coordinar los próximos pasos y comenzar con la migración.</p>
                <br>
                <p>Saludos,<br><strong>Ian Mazzi</strong><br>Mazzi IT Solutions</p>
            `,
        });

        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ message: 'Error interno al enviar el correo' });
    }
}