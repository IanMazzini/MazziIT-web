const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { email_cliente, presupuesto_id } = req.body;
    
    // Obtenemos las credenciales desde Vercel
    const miCorreo = process.env.EMAIL_USER;
    const passwordApp = process.env.EMAIL_PASS;

    if (!email_cliente || !email_cliente.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    // Configuramos SMTP
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: miCorreo,
            pass: passwordApp
        }
    });

    // Diseño del correo electrónico con el detalle actualizado del presupuesto y aviso legal
    const emailHTML = `
        <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            
            <!-- Header del Correo -->
            <div style="background-color: #0b1120; padding: 25px; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">MAZZI<span style="color: #0ea5e9;">IT</span></h2>
                <p style="color: #94a3b8; font-size: 11px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Solutions & Infrastructure</p>
            </div>
            
            <!-- Cuerpo del Correo -->
            <div style="padding: 30px; padding-bottom: 15px;">
                <h3 style="color: #0f172a; margin-top: 0;">¡Hola!</h3>
                <p style="line-height: 1.5;">Confirmamos la aceptación formal del presupuesto <strong>${presupuesto_id}</strong>. A continuación, detallamos las condiciones y los alcances técnicos acordados para que quede constancia del servicio:</p>
                
                <!-- Caja de Detalle -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 25px 0;">
                    <h4 style="margin-top: 0; color: #0ea5e9; margin-bottom: 15px; font-size: 14px; text-transform: uppercase;">Ref: Renovación 2027 - TWWOM Legacy</h4>
                    
                    <p style="font-size: 14px; margin-bottom: 5px; color: #0f172a;"><strong>1. Hardware Dedicado Enterprise</strong></p>
                    <ul style="font-size: 13px; color: #475569; margin-top: 0; padding-left: 20px; line-height: 1.6;">
                        <li>CPU: Intel Xeon W-1270 (High Frequency).</li>
                        <li>RAM: 24GB DDR4 ECC.</li>
                        <li>Storage: 512GB NVMe SSD.</li>
                        <li>Uplink: 1 Gbps Dedicado.</li>
                    </ul>

                    <p style="font-size: 14px; margin-bottom: 5px; margin-top: 15px; color: #0f172a;"><strong>2. Servicios Gestionados & Procesos</strong></p>
                    <ul style="font-size: 13px; color: #475569; margin-top: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Monitoreo Activo 24/7 y Gestión de Seguridad (ISO 27001).</li>
                        <li>Backups 3-2-1 profesional con espacio ilimitado.</li>
                        <li>Hosting Web Corporativo Bonificado (Alojamiento + SSL).</li>
                    </ul>

                    <p style="font-size: 14px; margin-bottom: 5px; margin-top: 15px; color: #0f172a;"><strong>3. Acuerdo Comercial & Desarrollo (Partnership)</strong></p>
                    <ul style="font-size: 13px; color: #475569; margin-top: 0; padding-left: 20px; line-height: 1.6;">
                        <li><strong>RevShare:</strong> Reducción del costo base de infraestructura anual (de USD 500 a USD 400) a cambio de una participación inicial del 25% de los ingresos netos de la tienda web.</li>
                        <li><strong>Desarrollo:</strong> Involucramiento en el desarrollo y administración del servidor.</li>
                        <li><strong>Revisión Semestral:</strong> En Junio 2027 se realizará una evaluación conjunta de rendimiento con el objetivo de escalar el acuerdo societario a un esquema porcentual a definir.</li>
                    </ul>

                    <p style="font-size: 14px; margin-bottom: 5px; margin-top: 15px; color: #0f172a;"><strong>4. Notas de Servicio</strong></p>
                    <ul style="font-size: 13px; color: #475569; margin-top: 0; padding-left: 20px; line-height: 1.6;">
                        <li>El esquema de RevShare inicial (25%) aplica sobre el ingreso neto, requiere transparencia contable y se liquida de forma mensual.</li>
                        <li>Todos los precios expresados en Dólares (USD) o en la cotización BBVA al día del pago.</li>
                        <li>Las comisiones cobradas por plataformas (ej. PayPal) corren por cuenta del cliente; el total de este presupuesto es el valor neto a recibir.</li>
                    </ul>
                    
                    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 20px 0;">
                    
                    <h3 style="margin: 0; text-align: right; color: #0f172a; font-size: 18px;">Total Renovación: USD 400.00</h3>
                </div>

                <p style="line-height: 1.5;">En breve me pondré en contacto para coordinar los próximos pasos operativos y comenzar con las tareas de administración.</p>
                
                <!-- Footer / Firma -->
                <p style="margin-bottom: 0; margin-top: 30px; line-height: 1.5; font-size: 14px;">
                    Saludos cordiales,<br>
                    <strong style="color: #0f172a;">Ian Mazzi</strong><br>
                    <span style="color: #64748b;">Mazzi IT Solutions</span>
                </p>
            </div>
            
            <!-- Aviso Legal de Emisión Automática -->
            <div style="background-color: #f1f5f9; padding: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
                <p style="margin: 0; line-height: 1.6;">
                    <strong>Aviso de constancia electrónica:</strong> Este correo ha sido generado y emitido de forma automática tras la confirmación y aceptación explícita de los términos detallados, accionada mediante el botón <em>"Confirmar Presupuesto & Condiciones"</em> en el documento digital alojado en:<br>
                    <a href="https://www.ianmazzi.com.ar/presupuesto#sec-2026-13" style="color: #0ea5e9; text-decoration: none;">https://www.ianmazzi.com.ar/presupuesto#sec-2026-13</a>
                </p>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Mazzi IT Solutions" <${miCorreo}>`,
            to: email_cliente,
            bcc: miCorreo,
            subject: `Confirmación de Presupuesto ${presupuesto_id} - Mazzi IT`,
            html: emailHTML,
        });

        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error("Error SMTP al enviar correo:", error);
        res.status(500).json({ message: 'Error interno SMTP' });
    }
};