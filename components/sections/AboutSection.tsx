import { Award, Users, Target, Brain, User, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutSection() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Professionals Coached",
      description: "Across Australia and internationally"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      description: "Clients achieve their goals"
    },
    {
      icon: Target,
      value: "12",
      label: "Weeks Program",
      description: "Average transformation time"
    },
    {
      icon: Brain,
      value: "100%",
      label: "Evidence-Based",
      description: "Scientifically proven methods"
    }
  ]

  return (
    <section className="py-24 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
            About <span className="text-white">MindSpring Path</span>
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 max-w-4xl mx-auto leading-relaxed">
            Evidence-based coaching designed to help individuals develop the mental skills that support clarity, 
            resilience, and purposeful action in their personal and professional lives.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="mindspring-card-hover text-center p-6">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-softwhite mb-2">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-softwhite/85">
                  {stat.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-softwhite/70">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Miyu Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="mindspring-card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-softwhite tracking-tight">About Miyu Pat</h3>
            </div>
            <div className="text-softwhite/70 space-y-3 leading-relaxed">
              <p className="font-medium text-softwhite">BPsychSc (CDU), MBMSc (University of Sydney), LLB (CDU), GDLPP (UNSW)</p>
              <p>
                Miyu combines neuroscience, psychological science, and practical coaching methods to help individuals build clarity and mental strength. With experience in a psychology clinic environment and academic training in cognition and behaviour, Miyu's approach is structured, evidence-based, and grounded in genuine care for human wellbeing.
              </p>
              <p>
                MindSpring Path: Evidence-Based Coaching for Clarity & Focus was created to support people who want to understand their mind better, respond more effectively to stress, and take purposeful action aligned with what matters most.
              </p>
            </div>
          </div>

          <div className="mindspring-card p-8">
            <h3 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Our Approach</h3>
            <div className="space-y-6">
              <div className="mindspring-card p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold text-softwhite mb-2 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  Mindfulness-Based Attention Training
                </h4>
                <ul className="text-softwhite/70 space-y-1 text-sm">
                  <li>• Strengthen focus and mental steadiness</li>
                  <li>• Notice stress signals early</li>
                  <li>• Reset quickly when overwhelmed</li>
                  <li>• Reduce cognitive overload</li>
                </ul>
              </div>

              <div className="mindspring-card p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold text-softwhite mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  ACT-Informed Coaching
                </h4>
                <ul className="text-softwhite/70 space-y-1 text-sm">
                  <li>• Reduce the influence of unhelpful thoughts</li>
                  <li>• Create distance from self-criticism</li>
                  <li>• Make decisions based on values</li>
                  <li>• Build psychological flexibility</li>
                </ul>
              </div>

              <div className="mindspring-card p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold text-softwhite mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                  CBT-Informed Cognitive Skills
                </h4>
                <ul className="text-softwhite/70 space-y-1 text-sm">
                  <li>• Understand thought–emotion–action patterns</li>
                  <li>• Identify unhelpful thinking habits</li>
                  <li>• Shift perspective intentionally</li>
                  <li>• Strengthen decision-making</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* What You Can Expect */}
        <div className="mindspring-card p-8 text-center">
          <h3 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">What You Can Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Structured yet conversational",
              "Practical and action-oriented",
              "Evidence-informed",
              "Confidential and professional"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-charcoal border border-graphite rounded-xl">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-softwhite/80 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-softwhite/60 mt-6 italic">
            No clinical diagnosis or treatment is provided. Referrals are offered when needed.
          </p>
        </div>
      </div>
    </section>
  )
}
