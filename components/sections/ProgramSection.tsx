import Link from 'next/link'
import { Calendar, Award, Users, TrendingUp, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProgramSection() {
  const programFeatures = [
    {
      icon: Calendar,
      title: "12-Week Structure",
      description: "Comprehensive program with weekly milestones and progressive skill development."
    },
    {
      icon: Award,
      title: "Certified Coaches",
      description: "Work with experienced, certified focus and performance coaches."
    },
    {
      icon: Users,
      title: "1-on-1 Sessions",
      description: "Personalized coaching sessions tailored to your specific needs and goals."
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track your progress with data-driven insights and performance metrics."
    }
  ]

  const weeklyStructure = [
    "Weeks 1-2: Foundation & Assessment",
    "Weeks 3-4: Focus Training Techniques",
    "Weeks 5-6: Habit Formation",
    "Weeks 7-8: Advanced Productivity",
    "Weeks 9-10: Leadership Integration",
    "Weeks 11-12: Mastery & Sustainability"
  ]

  return (
    <section className="py-24 bg-slate">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
            12-Week <span className="text-white">Focus Transformation</span>
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 max-w-3xl mx-auto leading-relaxed">
            Our flagship program combines evidence-based techniques with personalized coaching 
            to deliver lasting transformation in just 12 weeks.
          </p>
        </div>

        {/* Program Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {programFeatures.map((feature, index) => (
            <Card key={index} className="mindspring-card-hover">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-softwhite tracking-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-softwhite/70">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">
              Program Structure
            </h3>
            <div className="space-y-4">
              {weeklyStructure.map((week, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-softwhite/85 font-medium">{week}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mindspring-card-hover p-8">
            <h3 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">
              What You'll Achieve
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-softwhite/80">Laser-sharp focus and sustained attention</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-softwhite/80">Elimination of productivity-killing habits</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-softwhite/80">Mastery of time and energy management</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-softwhite/80">Enhanced decision-making and problem-solving</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-softwhite/80">Sustainable high-performance mindset</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-softwhite mb-4 tracking-tight">
            Ready to Transform Your Focus?
          </h3>
          <p className="text-lg text-softwhite/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who have transformed their performance with our evidence-based coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/program">
              <Button variant="mindspring-primary" size="lg" className="group">
                Learn More About Program
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="mindspring-secondary" size="lg">
                Start with Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
