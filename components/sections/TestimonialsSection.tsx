import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, Tech Startup",
      content: "The 12-week program transformed how I manage my focus and productivity. I'm now accomplishing more in half the time.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "James Chen",
      role: "Senior Lawyer",
      content: "Evidence-based techniques made all the difference. My concentration has improved dramatically, and I feel less stressed.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Emma Thompson",
      role: "Marketing Director",
      content: "The personalized coaching approach helped me identify and eliminate my biggest productivity blockers. Highly recommend!",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ]

  return (
    <section className="py-24 bg-charcoal" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
            What Our <span className="text-white">Clients Say</span>
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 max-w-3xl mx-auto leading-relaxed">
            Real results from real professionals who have transformed their focus and performance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="mindspring-card-hover">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-softwhite/80 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-primary/40 absolute -top-2 -left-2" />
                  <p className="text-softwhite/80 italic relative z-10 pl-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-softwhite">{testimonial.name}</div>
                    <div className="text-sm text-softwhite/60">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
