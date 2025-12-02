import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Clara.ai - L\'assistante RH moderne';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo Circle with Gradient */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '200',
              height: '200',
              borderRadius: '50%',
              border: '4px solid',
              borderImage: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%) 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(99, 102, 241, 0.1)',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#6366f1',
                letterSpacing: '4px',
              }}
            >
              AI
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#6366f1',
            }}
          >
            Clara
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#8b5cf6',
            }}
          >
            .ai
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#a0a0a0',
            fontWeight: '400',
          }}
        >
          L'assistante RH moderne
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#6366f1',
            marginTop: '40px',
            fontWeight: '600',
          }}
        >
          Le Recrutement, Réinventé par l'IA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

