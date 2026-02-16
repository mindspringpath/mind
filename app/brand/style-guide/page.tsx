import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Style Guide — MindSpring Path',
  description: 'Complete brand style guide for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Colors, typography, imagery, and brand guidelines.',
  keywords: 'brand style guide, MindSpring Path, brand guidelines, colors, typography, brand assets',
}

export default function BrandStyleGuide() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mindspring-card p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-softwhite mb-4 tracking-tight">
              Brand Style Guide
            </h1>
            <p className="text-lg md:text-xl text-softwhite/70 mb-8">
              MindSpring Path: Evidence-Based Coaching for Clarity & Focus
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Brand Identity</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-2">Brand Name</h3>
                  <p className="text-softwhite/80">MindSpring Path</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-2">Full Business Name</h3>
                  <p className="text-softwhite/80">MindSpring Path: Evidence-Based Coaching for Clarity & Focus</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-2">Brand Personality</h3>
                  <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                    <li>Executive</li>
                    <li>Professional</li>
                    <li>Evidence-based</li>
                    <li>Calm authority</li>
                    <li>Clear and modern</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Color Palette</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: '#7A0000' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Deep Crimson</p>
                    <p className="text-sm text-softwhite/70">#7A0000</p>
                    <p className="text-xs text-softwhite/60">Primary</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: '#111111' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Charcoal</p>
                    <p className="text-sm text-softwhite/70">#111111</p>
                    <p className="text-xs text-softwhite/60">Background</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: '#1A1A1A' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Slate</p>
                    <p className="text-sm text-softwhite/70">#1A1A1A</p>
                    <p className="text-xs text-softwhite/60">Surface</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg border border-graphite" style={{ backgroundColor: '#2A2A2A' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Graphite</p>
                    <p className="text-sm text-softwhite/70">#2A2A2A</p>
                    <p className="text-xs text-softwhite/60">Borders</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg border border-graphite" style={{ backgroundColor: '#E5E5E5' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Soft White</p>
                    <p className="text-sm text-softwhite/70">#E5E5E5</p>
                    <p className="text-xs text-softwhite/60">Text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Typography</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-2">Headings</h3>
                  <p className="text-softwhite/80 mb-2">Poppins (Bold, confident, modern)</p>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Heading Example</p>
                    <p className="text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Subheading Example</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-2">Body Text</h3>
                  <p className="text-softwhite/80 mb-2">Inter (Clean, readable, professional)</p>
                  <p className="text-softwhite/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Body text example using Inter font family. This font provides excellent readability for longer content while maintaining a professional appearance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Imagery Style</h2>
              
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80">
                <li>Subtle dark gradients</li>
                <li>Geometric shapes</li>
                <li>Clean lines</li>
                <li>High-contrast, controlled shadows</li>
                <li>No clinical or medical imagery</li>
              </ul>
              
              <div className="mt-6 p-4 bg-slate border border-graphite rounded-xl">
                <p className="text-sm text-softwhite/80">
                  <strong>Visual Direction:</strong> Create flowing, upward-moving abstract designs that represent mental clarity and growth.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Tone of Voice</h2>
              
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80">
                <li>Warm</li>
                <li>Clear</li>
                <li>Evidence-informed</li>
                <li>Supportive</li>
                <li>Non-clinical</li>
                <li>Action-oriented</li>
              </ul>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Brand Keywords</h2>
              
              <div className="flex flex-wrap gap-2">
                {['Clarity', 'Focus', 'Direction', 'Growth', 'Mindfulness', 'Cognitive Skills', 'Evidence-Based', 'Calm'].map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-slate text-softwhite/80 border border-graphite rounded-full text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
