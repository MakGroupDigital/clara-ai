
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Important: La clé API est lue depuis les variables d'environnement
// pour des raisons de sécurité.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const companyName = formData.get('companyName') as string;
    const contactName = formData.get('contactName') as string;
    const email = formData.get('email') as string;
    const companyCategory = formData.get('companyCategory') as string;
    const nationalId = formData.get('nationalId') as string;
    const legalDoc = formData.get('legalDoc') as File | null;

    const attachments = [];
    if (legalDoc && legalDoc.size > 0) {
        // Resend expects the file content as a Buffer
        const buffer = Buffer.from(await legalDoc.arrayBuffer());
        attachments.push({
            filename: legalDoc.name,
            content: buffer,
        });
    }

    // Logique pour envoyer l'email avec Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Doit être un domaine vérifié sur Resend
      to: 'contact.makgroup.digital@gmail.com',
      subject: `Nouvelle demande d'accès pour Clara.ai de ${companyName}`,
      html: `
        <h1>Nouvelle demande d'accès à Clara.ai</h1>
        <p>Une nouvelle entreprise a soumis une demande d'accès via le site vitrine.</p>
        <h2>Informations sur l'entreprise :</h2>
        <ul>
          <li><strong>Nom de l'entreprise :</strong> ${companyName}</li>
          <li><strong>Nom du contact :</strong> ${contactName}</li>
          <li><strong>Email du contact :</strong> ${email}</li>
          <li><strong>Catégorie :</strong> ${companyCategory}</li>
          <li><strong>Identification Nationale :</strong> ${nationalId}</li>
        </ul>
        <p>L'équipe peut maintenant analyser cette demande pour accorder l'accès.</p>
        ${attachments.length > 0 ? "<p>Un document légal a été joint à cet e-mail.</p>" : "<p>Aucun document légal n'a été fourni.</p>"}
      `,
      attachments: attachments,
    });

    return NextResponse.json({ message: 'Demande reçue et email envoyé avec succès' }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors du traitement de la demande :", error);
    return NextResponse.json({ message: error.message || 'Erreur interne du serveur' }, { status: 500 });
  }
}
