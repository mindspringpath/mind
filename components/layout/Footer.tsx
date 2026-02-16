import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Evidence-Based Coaching', href: '/services' },
      { name: '12-Week Program', href: '/program' },
      { name: 'Personalized Support', href: '/services' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about' },
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/legal/privacy-policy' },
      { name: 'Terms of Service', href: '/legal/terms-of-service' },
      { name: 'Cancellation Policy', href: '/legal/cancellation-policy' },
      { name: 'Disclaimer', href: '/legal/disclaimer' },
      { name: 'Website Use Policy', href: '/legal/website-use' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Logo variant="dark" className="h-20 w-auto" />
              </div>
              <p className="text-softwhite/70 mb-6 max-w-md leading-relaxed">
                Transform your mental clarity and focus with evidence-based coaching programs 
                designed for personal and professional growth.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-softwhite/70">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+61 2 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 text-softwhite/70">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@mindspringpath.com.au</span>
                </div>
                <div className="flex items-center space-x-3 text-softwhite/70">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Australia</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-softwhite/50 hover:text-softwhite transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-softwhite/70 hover:text-softwhite transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-softwhite/70 hover:text-softwhite transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-softwhite/70 hover:text-softwhite transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-graphite py-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Ready to Transform Your Mental Clarity?</h3>
            <p className="text-softwhite/70 mb-6 max-w-2xl mx-auto leading-relaxed">
              Schedule your free consultation today and discover how evidence-based coaching can help you achieve clarity and focus.
            </p>
            <Link href="/booking">
              <Button variant="mindspring-primary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-graphite py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-softwhite/50 text-sm">
              © {currentYear} MindSpring Path: Evidence-Based Coaching for Clarity & Focus. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal/privacy-policy" className="text-softwhite/50 hover:text-softwhite text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className="text-softwhite/50 hover:text-softwhite text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
