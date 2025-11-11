
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code2, Download } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './_components/code-block';
import { MethodBadge } from './_components/method-badge';
import { Button } from '@/components/ui/button';

const restExample = `
fetch('https://api.clara.ai/v1/job_offers', {
  headers: {
    'Authorization': 'Bearer VOTRE_CLE_API'
  }
})
.then(response => response.json())
.then(data => console.log(data));
`;

const restResponse = `
{
  "data": [
    {
      "id": "job_123",
      "title": "Développeur Frontend Senior",
      "department": "Ingénierie",
      "status": "Actif"
    }
  ],
  "has_more": true,
  "next_page_token": "token_xyz"
}
`;

const soapExample = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:api="http://api.clara.ai/v1/soap">
   <soapenv:Header/>
   <soapenv:Body>
      <api:GetJobOfferDetailsRequest>
         <api:jobOfferId>job_123</api:jobOfferId>
      </api:GetJobOfferDetailsRequest>
   </soapenv:Body>
</soapenv:Envelope>
`;

const soapResponse = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <api:GetJobOfferDetailsResponse xmlns:api="http://api.clara.ai/v1/soap">
         <api:jobOffer>
            <api:id>job_123</api:id>
            <api:title>Développeur Frontend Senior</api:title>
            <api:description>Rejoignez notre équipe...</api:description>
         </api:jobOffer>
      </api:GetJobOfferDetailsResponse>
   </soapenv:Body>
</soapenv:Envelope>
`;

const graphqlExample = `
query {
  jobOffers(first: 10) {
    edges {
      node {
        id
        title
        status
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

const graphqlResponse = `
{
  "data": {
    "jobOffers": {
      "edges": [
        {
          "node": {
            "id": "am9iXzEyMw==",
            "title": "Développeur Frontend Senior",
            "status": "Actif"
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "cursor_xyz"
      }
    }
  }
}
`;

const grpcExample = `
syntax = "proto3";

package clara.api.v1;

service RecrutementService {
  rpc GetJobOffer(GetJobOfferRequest) returns (JobOffer);
}

message GetJobOfferRequest {
  string job_offer_id = 1;
}

message JobOffer {
  string id = 1;
  string title = 2;
  string description = 3;
}
`;

const apiDocs: Record<string, { title: string, content: string }> = {
    rest: {
        title: "Documentation API REST",
        content: `
            <p>Notre API REST est idéale pour une intégration simple et standardisée via HTTP. Elle est parfaite pour les applications web et mobiles.</p>
            <h4 class="doc-h4">Authentification</h4>
            <p>Utilisez une clé d'API Bearer Token dans l'en-tête \`Authorization\` pour toutes vos requêtes.</p>
            <h4 class="doc-h4">Endpoints</h4>
            <div class="doc-card">
                <p class="flex items-center gap-4"><span class="badge-get">GET</span> <code>/v1/job_offers</code></p>
                <p class="text-sm pl-12 mt-1">Récupère la liste paginée de toutes les offres d'emploi.</p>
            </div>
            <h4 class="doc-h4">Exemple de requête (JavaScript)</h4>
            <pre><code>${restExample.trim()}</code></pre>
            <h4 class="doc-h4">Exemple de réponse</h4>
            <pre><code>${restResponse.trim()}</code></pre>
        `
    },
    soap: {
        title: "Documentation API SOAP",
        content: `
            <p>Pour les intégrations nécessitant une structure formelle et des contrats stricts (WSDL), notre API SOAP est la solution adaptée, idéale pour les systèmes d'entreprise.</p>
            <h4 class="doc-h4">Exemple de requête SOAP</h4>
            <p>Voici un exemple de requête pour obtenir les détails d'une offre d'emploi.</p>
            <pre><code>${soapExample.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            <h4 class="doc-h4">Exemple de réponse SOAP</h4>
            <pre><code>${soapResponse.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        `
    },
    graphql: {
        title: "Documentation API GraphQL",
        content: `
            <p>Obtenez uniquement les données dont vous avez besoin. Notre API GraphQL offre une flexibilité maximale pour des requêtes efficaces et performantes.</p>
            <h4 class="doc-h4">Exemple de requête</h4>
            <p>Récupérez une liste d'offres avec uniquement les champs \`id\`, \`title\` et \`status\`.</p>
            <pre><code>${graphqlExample.trim()}</code></pre>
            <h4 class="doc-h4">Exemple de réponse</h4>
            <pre><code>${graphqlResponse.trim()}</code></pre>
        `
    },
    grpc: {
        title: "Documentation API gRPC",
        content: `
            <p>Pour des communications haute performance et à faible latence, notamment pour les services internes, utilisez notre API gRPC basée sur les Protocol Buffers.</p>
            <h4 class="doc-h4">Définition du Service (.proto)</h4>
            <p>Voici un extrait de notre définition de service pour le module de recrutement.</p>
            <pre><code>${grpcExample.trim()}</code></pre>
             <p class="pt-4">Vous pouvez utiliser ce fichier \`.proto\` pour générer les stubs clients dans votre langage de programmation préféré (Go, Python, Java, etc.) et interagir avec nos services de manière typée et performante.</p>
        `
    }
};

export default function DevelopersPage() {
    
    const handleDownload = (apiType: 'rest' | 'soap' | 'graphql' | 'grpc') => {
        const docInfo = apiDocs[apiType];
        const docContent = docInfo.content;
        const docTitle = docInfo.title;

        const printWindow = window.open('', '_blank');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${docTitle}</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
                            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto+Mono&display=swap');
                            
                            body {
                                font-family: 'Poppins', sans-serif;
                                background-color: hsl(240, 70%, 4%);
                                color: hsl(210, 20%, 98%);
                                margin: 0;
                                padding: 2rem;
                            }
                            @media print {
                                body {
                                    -webkit-print-color-adjust: exact;
                                    print-color-adjust: exact;
                                }
                            }
                            .page-header, .page-footer {
                                text-align: center;
                                margin-bottom: 2rem;
                            }
                            .page-footer {
                                margin-top: 2rem;
                                font-size: 0.8rem;
                                color: hsl(240, 100%, 83%);
                            }
                            .logo-headline { font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 700; }
                            .logo-accent { color: hsl(183, 100%, 50%); }
                            .logo-primary { color: hsl(319, 100%, 65%); }
                            h1.doc-title { font-family: 'Orbitron', sans-serif; color: hsl(319, 100%, 65%); border-bottom: 2px solid hsl(240, 33%, 20%); padding-bottom: 0.5rem; margin-bottom: 1.5rem;}
                            p { color: hsl(240, 100%, 83%); line-height: 1.6; }
                            h4.doc-h4 { font-family: 'Orbitron', sans-serif; color: hsl(210, 20%, 98%); margin-top: 2rem; margin-bottom: 1rem; }
                            .doc-card { background-color: hsl(240, 33%, 10%); border: 1px solid hsl(240, 33%, 20%); padding: 1rem; border-radius: 0.5rem; }
                            .badge-get { background-color: hsl(199, 89%, 47%, 0.2); color: hsl(199, 89%, 77%); border: 1px solid hsl(199, 89%, 47%, 0.3); border-radius: 0.25rem; padding: 0.1rem 0.5rem; font-size: 0.75rem; font-weight: 600; font-family: 'Roboto Mono', monospace; }
                            code, pre { font-family: 'Roboto Mono', monospace; }
                            pre { background-color: hsl(240, 33%, 16%); padding: 1rem; border-radius: 0.5rem; overflow-x: auto; color: hsl(210, 20%, 98%); }

                            .print-header { display: none; }
                            @media print {
                                .print-header { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="page-header">
                            <div class="logo-headline">
                                <span class="logo-accent">Clara</span><span class="logo-primary">.ai</span>
                            </div>
                        </div>

                        <h1 class="doc-title">${docTitle}</h1>
                        <div>${docContent}</div>

                        <div class="page-footer">
                            &copy; ${new Date().getFullYear()} <span class="logo-accent">Clara</span><span class="logo-primary">.ai</span> - Documentation
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            // We give a short timeout to ensure all styles and fonts are loaded before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500); 
        }
    };


  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
        <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center gap-4">
                <Code2 className="h-8 w-8" />
                Portail Développeur
            </CardTitle>
            <CardDescription>
                Intégrez la puissance de <span className="text-accent">Clara</span><span className="text-primary">.ai</span> dans vos applications et SIRH grâce à nos APIs. Découvrez nos différentes options d'intégration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">

            <Tabs defaultValue="rest" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="rest">REST</TabsTrigger>
                    <TabsTrigger value="soap">SOAP</TabsTrigger>
                    <TabsTrigger value="graphql">GraphQL</TabsTrigger>
                    <TabsTrigger value="grpc">gRPC</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    {/* REST TAB */}
                    <TabsContent value="rest">
                        <div className="space-y-6">
                            <h3 className="font-headline text-xl text-foreground">API REST</h3>
                            <p>Notre API REST est idéale pour une intégration simple et standardisée via HTTP. Elle est parfaite pour les applications web et mobiles.</p>
                            
                            <h4 className="font-semibold text-foreground pt-2">Authentification</h4>
                            <p>Utilisez une clé d'API Bearer Token dans l'en-tête `Authorization` pour toutes vos requêtes.</p>
                            
                            <h4 className="font-semibold text-foreground pt-2">Endpoints</h4>
                            <Card className="p-4 bg-muted/30">
                                <p className="flex items-center gap-4"><MethodBadge method="GET" /> <code>/v1/job_offers</code></p>
                                <p className="text-sm pl-12 mt-1">Récupère la liste paginée de toutes les offres d'emploi.</p>
                            </Card>

                            <h4 className="font-semibold text-foreground pt-2">Exemple de requête (JavaScript)</h4>
                            <CodeBlock language="javascript" code={restExample} />

                            <h4 className="font-semibold text-foreground pt-2">Exemple de réponse</h4>
                            <CodeBlock language="json" code={restResponse} />

                            <div className="flex justify-end pt-4">
                                <Button variant="outline" onClick={() => handleDownload('rest')}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger la documentation
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* SOAP TAB */}
                    <TabsContent value="soap">
                         <div className="space-y-6">
                            <h3 className="font-headline text-xl text-foreground">API SOAP</h3>
                            <p>Pour les intégrations nécessitant une structure formelle et des contrats stricts (WSDL), notre API SOAP est la solution adaptée, idéale pour les systèmes d'entreprise.</p>
                            
                            <h4 className="font-semibold text-foreground pt-2">Exemple de requête SOAP</h4>
                            <p>Voici un exemple de requête pour obtenir les détails d'une offre d'emploi.</p>
                            <CodeBlock language="xml" code={soapExample} />

                            <h4 className="font-semibold text-foreground pt-2">Exemple de réponse SOAP</h4>
                            <CodeBlock language="xml" code={soapResponse} />

                            <div className="flex justify-end pt-4">
                                <Button variant="outline" onClick={() => handleDownload('soap')}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger la documentation
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                    
                    {/* GraphQL TAB */}
                    <TabsContent value="graphql">
                        <div className="space-y-6">
                            <h3 className="font-headline text-xl text-foreground">API GraphQL</h3>
                            <p>Obtenez uniquement les données dont vous avez besoin. Notre API GraphQL offre une flexibilité maximale pour des requêtes efficaces et performantes.</p>
                            
                             <h4 className="font-semibold text-foreground pt-2">Exemple de requête</h4>
                            <p>Récupérez une liste d'offres avec uniquement les champs `id`, `title` et `status`.</p>
                            <CodeBlock language="graphql" code={graphqlExample} />

                            <h4 className="font-semibold text-foreground pt-2">Exemple de réponse</h4>
                            <CodeBlock language="json" code={graphqlResponse} />

                             <div className="flex justify-end pt-4">
                                <Button variant="outline" onClick={() => handleDownload('graphql')}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger la documentation
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* gRPC TAB */}
                    <TabsContent value="grpc">
                        <div className="space-y-6">
                            <h3 className="font-headline text-xl text-foreground">API gRPC</h3>
                            <p>Pour des communications haute performance et à faible latence, notamment pour les services internes, utilisez notre API gRPC basée sur les Protocol Buffers.</p>

                            <h4 className="font-semibold text-foreground pt-2">Définition du Service (.proto)</h4>
                            <p>Voici un extrait de notre définition de service pour le module de recrutement.</p>
                            <CodeBlock language="protobuf" code={grpcExample} />

                            <p className="pt-4">Vous pouvez utiliser ce fichier `.proto` pour générer les stubs clients dans votre langage de programmation préféré (Go, Python, Java, etc.) et interagir avec nos services de manière typée et performante.</p>

                            <div className="flex justify-end pt-4">
                                <Button variant="outline" onClick={() => handleDownload('grpc')}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger la documentation
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
