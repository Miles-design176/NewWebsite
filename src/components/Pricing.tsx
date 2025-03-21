import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { SwitchForPricing } from "./ui/SwitchforPricing";
import { Card } from "./ui/card";
import Navbar from "./NavBar/navbar";
import {
  Check,
  X,
  Sparkles,
  Coffee,
  Rocket,
  Crown,
  ArrowRight,
  HelpCircle,
  Star
} from "lucide-react";

// Pricing plans data
const pricingPlans = [
  {
    name: "Free Forever",
    icon: <Coffee className="h-6 w-6" />,
    price: {
      monthly: 0,
      annually: 0
    },
    description: "For people who like free things, which is pretty much everyone.",
    features: [
      { name: "Basic joke access", included: true },
      { name: "Ad-supported experience", included: true },
      { name: "Email support (we might reply)", included: true },
      { name: "Limited to 3 jokes per day", included: true },
      { name: "Premium features", included: false },
      { name: "Ad-free experience", included: false },
      { name: "Priority support", included: false },
      { name: "Access to premium jokes", included: false }
    ],
    cta: "Sign Up Free",
    color: "bg-blue-100",
    popular: false
  },
  {
    name: "Premium",
    icon: <Rocket className="h-6 w-6" />,
    price: {
      monthly: 9.99,
      annually: 7.99
    },
    description: "For people who want better jokes and fewer ads.",
    features: [
      { name: "Unlimited joke access", included: true },
      { name: "Ad-free experience", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom joke categories", included: true },
      { name: "Save favorite jokes", included: true },
      { name: "API access", included: false },
      { name: "White-label option", included: false },
      { name: "Dedicated account manager", included: false }
    ],
    cta: "Start Premium",
    color: "bg-orange-100",
    popular: true
  },
  {
    name: "Enterprise",
    icon: <Crown className="h-6 w-6" />,
    price: {
      monthly: 99.99,
      annually: 89.99
    },
    description: "For businesses that somehow need joke APIs.",
    features: [
      { name: "Everything in Premium", included: true },
      { name: "Unlimited API access", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Custom joke development", included: true },
      { name: "White-label option", included: true },
      { name: "Dedicated joke consultant", included: true },
      { name: "On-site comedian (twice a year)", included: true },
      { name: "We'll laugh at your jokes too", included: true }
    ],
    cta: "Contact Sales",
    color: "bg-purple-100",
    popular: false
  }
];

// FAQ data
const faqs = [
  {
    question: "Is this pricing for real?",
    answer: "Absolutely not! These are completely made-up prices for a fictional service. If you actually try to pay us, we'll be as surprised as you are."
  },
  {
    question: "What happens if I pay for Enterprise?",
    answer: "We'll send a real comedian to your office twice a year. Actually, it's just Dave from accounting who thinks he's funny. We're legally obligated to tell you he's not a professional."
  },
  {
    question: "Can I get a refund if the jokes aren't funny?",
    answer: "Humor is subjective, but our jokes are objectively hilarious. However, if you disagree, we offer a 30-second money-back guarantee, which conveniently expires before you can complete the refund process."
  },
  {
    question: "Do you offer discounts?",
    answer: "We offer a 100% discount to anyone who can make our entire development team laugh simultaneously. So far, no one has succeeded."
  },
  {
    question: "What's included in the 'Custom Joke Development'?",
    answer: "Our team of semi-professional joke writers will create jokes specifically tailored to your business. Results may vary, especially if your business is accounting or tax preparation."
  }
];


const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showAllFeatures, setShowAllFeatures] = useState<Record<string, boolean>>({});

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly");
  };

  const toggleFeatures = (planName: string) => {
    setShowAllFeatures({
      ...showAllFeatures,
      [planName]: !showAllFeatures[planName]
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activePage="pricing" />
      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
              Pricing Plans
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl">
              Unreasonably priced plans for an unreasonably good website.
            </p>

            {/* Pricing Switch */}
            <div className="mt-10 flex justify-center items-center space-x-3">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-blue-500" : "text-slate-500"}`}>Monthly</span>
              <SwitchForPricing checked={billingCycle === "annually"} onCheckedChange={toggleBillingCycle} />
              <span className={`text-sm font-medium ${billingCycle === "annually" ? "text-blue-500" : "text-slate-500"}`}>
                Annually <span className="text-xs text-orange-500 font-bold ml-1">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`${plan.popular ? 'ring-2 ring-orange-500' : ''} relative flex flex-col rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rotate-0 transform translate-x-6 translate-y-6 rotate-45">
                    POPULAR
                  </div>
                )}
                <div className={`${plan.color} px-6 py-8`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-white">
                      {plan.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-slate-900">{plan.name}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-slate-900">
                        ${billingCycle === "monthly" ? plan.price.monthly : plan.price.annually}
                      </span>
                      <span className="ml-1 text-xl font-medium text-slate-500">
                        /{billingCycle === "monthly" ? "mo" : "mo (billed annually)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-white">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">What's included</h4>
                    <ul className="mt-6 space-y-4">
                      {plan.features.slice(0, showAllFeatures[plan.name] ? plan.features.length : 4).map((feature) => (
                        <li key={feature.name} className="flex">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-slate-300 flex-shrink-0" />
                          )}
                          <span className={`ml-3 text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {plan.features.length > 4 && (
                      <button
                        type="button"
                        className="mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium"
                        onClick={() => toggleFeatures(plan.name)}
                      >
                        {showAllFeatures[plan.name] ? "Show less" : "Show all features"}
                      </button>
                    )}
                  </div>

                  <div className="mt-8">
                  <Link to="/signup">
                    <Button
                        className={`w-full ${
                        plan.name === "Enterprise" 
                            ? "bg-purple-500 hover:bg-purple-600" 
                            : plan.name === "Premium" 
                            ? "bg-orange-500 hover:bg-orange-600" 
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white rounded-md shadow-sm hover:shadow-md transition`}
                    >
                        {plan.cta}
                    </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-blue-500/5 to-orange-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-500 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Need something even more ridiculous?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  We offer a "Galactic Emperor" tier that costs $999,999/month. It includes naming rights to our coffee machine and a personal astronaut.
                </p>
                <a
                  href="#"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-blue-500 hover:bg-blue-50"
                >
                  Contact our sales team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="relative -mt-6 aspect-w-5 aspect-h-3 lg:aspect-none bg-white">
              <div className="relative h-full w-full flex items-center justify-center">
                <Sparkles className="h-64 w-64 text-blue-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Some Very Real Customer Reviews
            </p>
          </div>
          <div className="mt-10">
            <div className="max-w-2xl mx-auto">
              <div className="border border-slate-200 rounded-lg p-6 shadow-sm bg-slate-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold">TC</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-900">Tim Cook</h4>
                    <p className="text-sm text-slate-500">Not the real Tim Cook</p>
                  </div>
                  <div className="ml-auto flex">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                <p className="mt-4 text-slate-700">
                  "I was hesitant to pay $99.99 a month for jokes, but then I remembered I'm a fictional character in this testimonial and don't actually have to pay anything. 10/10 would recommend!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Questions that no one has actually asked us, but we thought you might be wondering.
            </p>
          </div>
          <div className="mt-12">
            <dl className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <dt className="text-lg font-semibold text-slate-900 flex items-start">
                    <HelpCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-slate-600 ml-8">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to experience the best website ever?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Sign up today and discover why we're called bestwebsite.ca, and not reasonablyokaywebsite.ca.
          </p>
          <div className="mt-8 flex justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md shadow-sm transition">
              Get Started For Free
            </Button>
            <Link to="/contact" className="ml-4 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-blue-50 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;