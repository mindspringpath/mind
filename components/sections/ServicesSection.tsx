import { Brain, Target, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      icon: Brain,
      title: "Evidence-Based Coaching",
      description: "60-75 minute sessions designed to help clients build attention, emotional regulation, and cognitive flexibility",
      features: [
        "Build attention and awareness",
        "Improve emotional regulation", 
        "Strengthen cognitive flexibility",
        "Clarify values and direction",
        "Take consistent, meaningful action"
      ],
      color: "teal"
    },
    {
      icon: Target,
      title: "12-Week Mindful Momentum Program",
      description: "A structured program designed to help participants build mental clarity, navigate thoughts and emotions with flexibility",
      features: [
        "Build mental clarity and focus",
        "Navigate thoughts and emotions with flexibility",
        "Identify core values and long-term direction",
        "Strengthen decision-making",
        "Take action even when discomfort shows up"
      ],
      color: "lavender"
    },
    {
      icon: Users,
      title: "Personalized Support",
      description: "Individualized coaching plans tailored to your specific needs and goals",
      features: [
        "Custom coaching strategies",
        "Flexible scheduling options",
        "Ongoing progress tracking",
        "Email and SMS reminders",
        "24/7 support access"
      ],
      color: "calm-blue"
    }
  ]

  return (
    <section className="py-24 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
            Our <span className="text-white">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 max-w-4xl mx-auto leading-relaxed">
            MindSpring Path: Evidence-Based Coaching for Clarity & Focus
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="mindspring-card-hover group">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-softwhite mb-4 tracking-tight">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-softwhite/70 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-softwhite/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You Can Expect */}
        <div className="mindspring-card p-8 mb-16">
          <h3 className="text-2xl font-bold text-softwhite mb-6 text-center tracking-tight">What You Can Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mindspring-card p-6 border-l-4 border-l-primary">
              <h4 className="font-semibold text-softwhite mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Structured Sessions
              </h4>
              <p className="text-softwhite/70 text-sm leading-relaxed">
                Each 60-75 minute session follows a clear structure with specific goals and actionable takeaways.
              </p>
            </div>
            <div className="mindspring-card p-6 border-l-4 border-l-primary">
              <h4 className="font-semibold text-softwhite mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Action-Oriented
              </h4>
              <p className="text-softwhite/70 text-sm leading-relaxed">
                Focus on practical strategies you can implement immediately in your daily life.
              </p>
            </div>
            <div className="mindspring-card p-6 border-l-4 border-l-primary">
              <h4 className="font-semibold text-softwhite mb-3 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                Evidence-Based
              </h4>
              <p className="text-softwhite/70 text-sm leading-relaxed">
                All techniques are backed by scientific research and proven effectiveness.
              </p>
            </div>
            <div className="mindspring-card p-6 border-l-4 border-l-primary">
              <h4 className="font-semibold text-softwhite mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Confidential & Professional
              </h4>
              <p className="text-softwhite/70 text-sm leading-relaxed">
                Your privacy and comfort are our top priorities in every session.
              </p>
            </div>
          </div>
        </div>

        {/* Who This Is For */}
        <div className="mindspring-card p-8 mb-16">
          <h3 className="text-2xl font-bold text-softwhite mb-6 text-center tracking-tight">Who This Is For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Break free from overthinking",
              "Improve focus and mental clarity", 
              "Navigate life or career transitions",
              "Reduce procrastination",
              "Take values-aligned action",
              "Manage school or exam pressure",
              "Recover from work stress or burnout"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-charcoal border border-graphite rounded-xl hover:bg-slate transition-colors duration-200">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-softwhite/80 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Ready to Transform Your Focus?</h3>
          <p className="text-softwhite/70 mb-8 max-w-2xl mx-auto">
            Take the first step towards mental clarity and purposeful action. 
            Book a free 15-minute consultation to discuss your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="btn-mindspring-primary text-lg px-8 py-4">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/program">
              <Button className="btn-mindspring-secondary text-lg px-8 py-4">
                View 12-Week Program
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
