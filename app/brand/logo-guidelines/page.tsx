import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logo Guidelines — MindSpring Path',
  description: 'Logo usage guidelines and brand assets for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Download official logos and learn proper usage.',
  keywords: 'logo guidelines, brand assets, MindSpring Path logo, logo usage, brand guidelines',
}

export default function LogoGuidelines() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mindspring-card p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-softwhite mb-4 tracking-tight">
              Logo Guidelines
            </h1>
            <p className="text-lg md:text-xl text-softwhite/70 mb-8">
              Proper usage of the MindSpring Path logo and brand assets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Logo Design Concept</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate border-l-4 border-l-primary rounded">
                  <h3 className="font-semibold text-softwhite mb-2">Design Brief</h3>
                  <p className="text-softwhite/80">
                    Create a modern, calming, professional logo for "MindSpring Path: Evidence-Based Coaching for Clarity & Focus"
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-softwhite">Style Requirements:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                    <li>Clean, minimalist, premium</li>
                    <li>Abstract flowing path or upward curve</li>
                    <li>Represents clarity, direction, mental growth</li>
                    <li>No gradients, no neon, no pastels</li>
                    <li>Modern sans-serif, strong weight</li>
                    <li>Executive, high-trust typography</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-softwhite">Mood & Feeling:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                    <li>Clarity</li>
                    <li>Focus</li>
                    <li>Mental strength</li>
                    <li>Professionalism</li>
                    <li>Trustworthiness</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-slate border-l-4 border-l-primary rounded">
                  <h4 className="font-semibold text-softwhite mb-2">Avoid:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                    <li>Clichés like brains or lotus flowers</li>
                    <li>Harsh shadows or aggressive styling</li>
                    <li>Clinical or medical imagery</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Usage Rules</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-3">Logo Variations</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-graphite rounded bg-slate">
                      <h4 className="font-medium text-softwhite mb-1">Full Logo</h4>
                      <p className="text-sm text-softwhite/70">Use on hero sections, headers, and primary branding</p>
                    </div>
                    <div className="p-3 border border-graphite rounded bg-slate">
                      <h4 className="font-medium text-softwhite mb-1">Icon-Only Version</h4>
                      <p className="text-sm text-softwhite/70">Use in favicon, mobile navigation, and small spaces</p>
                    </div>
                    <div className="p-3 border border-graphite rounded bg-slate">
                      <h4 className="font-medium text-softwhite mb-1">Horizontal Layout</h4>
                      <p className="text-sm text-softwhite/70">Standard format for most applications</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-softwhite mb-3">Clear Space</h3>
                  <p className="text-softwhite/80 mb-3">
                    Maintain clear space around the logo equal to the height of the "M" in MindSpring Path.
                  </p>
                  <div className="p-4 bg-slate border border-graphite rounded-xl text-center">
                    <div className="inline-block p-8 border-2 border-dashed border-graphite rounded">
                      <span className="text-softwhite/60">LOGO</span>
                    </div>
                    <p className="text-sm text-softwhite/60 mt-2">Minimum clear space required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Color Palette</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded" style={{ backgroundColor: '#7A0000' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Deep Crimson</p>
                    <p className="text-sm text-softwhite/70">#7A0000</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded" style={{ backgroundColor: '#111111' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Charcoal</p>
                    <p className="text-sm text-softwhite/70">#111111</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded" style={{ backgroundColor: '#2A2A2A' }}></div>
                  <div>
                    <p className="font-semibold text-softwhite">Graphite</p>
                    <p className="text-sm text-softwhite/70">#2A2A2A</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Typography</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-softwhite mb-2">Primary Font</h3>
                  <p className="text-softwhite/80">Poppins (Bold, confident, modern)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-softwhite mb-2">Secondary Font</h3>
                  <p className="text-softwhite/80">Inter (Clean, readable, professional)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-softwhite mb-2">Spacing Rules</h3>
                  <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                    <li>Use consistent letter spacing for logo text</li>
                    <li>Maintain proportional scaling</li>
                    <li>Ensure readability at all sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mindspring-card p-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Applications & Usage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-softwhite mb-3">Digital Applications</h3>
                <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                  <li>Website headers and navigation</li>
                  <li>Social media profiles</li>
                  <li>Email signatures</li>
                  <li>Digital documents</li>
                  <li>Mobile app icons</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-softwhite mb-3">Print Applications</h3>
                <ul className="list-disc pl-6 space-y-1 text-softwhite/80">
                  <li>Business cards</li>
                  <li>Letterheads</li>
                  <li>Brochures and flyers</li>
                  <li>Signage</li>
                  <li>Merchandise</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate border-l-4 border-l-primary rounded">
              <h3 className="font-semibold text-softwhite mb-2">Important Note</h3>
              <p className="text-softwhite/80">
                Logo files should be created in vector format (SVG, AI) for scalability. 
                Always use the official logo files and do not modify the design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
