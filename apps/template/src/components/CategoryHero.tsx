import { Category } from '@/lib/api'

interface CategoryHeroProps {
  category: Category
  eventCount?: number
}

export function CategoryHero({ category, eventCount = 0 }: CategoryHeroProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Category Name */}
          <h1 className="text-4xl font-bold mb-4">
            {category.name} Events
          </h1>

          {/* Category Description */}
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {category.description}
          </p>

          {/* Event Count */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{eventCount}</div>
              <div className="text-blue-200">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {new Date().toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div className="text-blue-200">Current Month</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center">
            <a
              href="#events"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 transition-colors"
            >
              Browse Events
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-20"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </div>
  )
}
