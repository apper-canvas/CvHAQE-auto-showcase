import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Star, Clock, Calendar, Fuel, Settings, MapPin } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Sample data for the vehicle inventory
const vehicleData = [
  {
    id: 1,
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65999,
    mileage: 5200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    condition: "new",
    exteriorColor: "Alpine White",
    interiorColor: "Black",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    make: "Mercedes-Benz",
    model: "E-Class",
    year: 2022,
    price: 58750,
    mileage: 12000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Beige",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    make: "Audi",
    model: "Q7",
    year: 2023,
    price: 72500,
    mileage: 3500,
    fuelType: "Diesel",
    transmission: "Automatic",
    condition: "new",
    exteriorColor: "Daytona Gray",
    interiorColor: "Rock Gray",
    image: "https://images.unsplash.com/photo-1606664922998-f8a0e0c2d89e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 49990,
    mileage: 1200,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "new",
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 5,
    make: "Lexus",
    model: "RX 350",
    year: 2021,
    price: 47800,
    mileage: 18500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    exteriorColor: "Nebula Gray Pearl",
    interiorColor: "Parchment",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    make: "Porsche",
    model: "911",
    year: 2022,
    price: 115000,
    mileage: 8700,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    exteriorColor: "Guards Red",
    interiorColor: "Black",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Owner",
    content: "I couldn't be happier with my new BMW X5! The team at AutoShowcase made the buying process so smooth and enjoyable. They were knowledgeable, patient, and found me exactly what I was looking for.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "After visiting several dealerships, AutoShowcase stood out for their no-pressure approach and incredible selection. They helped me find the perfect Tesla that fit my budget and needs.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    content: "The service department at AutoShowcase is exceptional. They've been maintaining my Mercedes for years, and I wouldn't trust anyone else. Professional, transparent, and always on time.",
    rating: 4
  }
];

// Sample services data
const services = [
  {
    id: 1,
    title: "New Vehicle Sales",
    description: "Explore our extensive inventory of the latest models from top manufacturers, all with competitive pricing and financing options.",
    icon: "🚗"
  },
  {
    id: 2,
    title: "Pre-Owned Vehicles",
    description: "Quality used cars that have passed our rigorous inspection process. All certified pre-owned vehicles come with extended warranties.",
    icon: "🔍"
  },
  {
    id: 3,
    title: "Financing Solutions",
    description: "Our finance experts work with multiple lenders to get you the best rates and terms, regardless of your credit situation.",
    icon: "💰"
  },
  {
    id: 4,
    title: "Service & Maintenance",
    description: "Factory-trained technicians using state-of-the-art equipment to keep your vehicle running at peak performance.",
    icon: "🔧"
  },
  {
    id: 5,
    title: "Parts Department",
    description: "Genuine OEM parts and accessories for all makes and models, ensuring proper fit and function for your vehicle.",
    icon: "⚙️"
  },
  {
    id: 6,
    title: "Trade-In Appraisal",
    description: "Get a fair market value for your current vehicle when you're ready to upgrade to something new.",
    icon: "🔄"
  }
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicleData);
  const [filters, setFilters] = useState({
    condition: "all",
    priceRange: [0, 200000]
  });
  
  // Hero slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const heroSlides = [
    {
      title: "Discover Your Dream Car",
      subtitle: "Explore our premium selection of luxury vehicles",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      cta: "Browse Inventory"
    },
    {
      title: "Exceptional Service",
      subtitle: "Factory-trained technicians for all your maintenance needs",
      image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      cta: "Schedule Service"
    },
    {
      title: "Financing Made Easy",
      subtitle: "Competitive rates and flexible terms for every budget",
      image: "https://images.unsplash.com/photo-1560574188-6a6774965120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      cta: "Get Pre-Approved"
    }
  ];
  
  // Filter functionality
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  useEffect(() => {
    let filtered = vehicleData;
    
    if (filters.condition !== "all") {
      filtered = filtered.filter(vehicle => vehicle.condition === filters.condition);
    }
    
    // Filter by price range
    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.priceRange[0] && 
      vehicle.price <= filters.priceRange[1]
    );
    
    setFilteredVehicles(filtered);
  }, [filters]);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div>
      {/* Hero Section with Slider */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeSlide === index ? 1 : 0, y: activeSlide === index ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">{slide.title}</h1>
                  <p className="text-xl md:text-2xl text-white mb-8 text-shadow">{slide.subtitle}</p>
                  <a 
                    href="#inventory" 
                    className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-lg"
                  >
                    {slide.cta}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === index 
                  ? "bg-white w-10" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <button 
          onClick={() => setActiveSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => setActiveSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </section>
      
      {/* Featured Vehicles Section */}
      <section id="inventory" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Featured Vehicles</h2>
          <p className="section-subtitle text-center">
            Explore our handpicked selection of premium vehicles, each thoroughly inspected to ensure quality and reliability.
          </p>
          
          <div className="mb-10 p-6 bg-white dark:bg-surface-700 rounded-xl shadow-soft">
            <h3 className="text-xl font-semibold mb-4">Filter Vehicles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-surface-700 dark:text-surface-300 mb-2">Condition</label>
                <select 
                  name="condition" 
                  value={filters.condition}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="all">All Vehicles</option>
                  <option value="new">New</option>
                  <option value="used">Pre-Owned</option>
                </select>
              </div>
              
              <div>
                <label className="block text-surface-700 dark:text-surface-300 mb-2">
                  Price Range: ${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}
                </label>
                <input 
                  type="range" 
                  name="priceRange" 
                  min="0" 
                  max="200000" 
                  step="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                  }))}
                  className="w-full h-2 bg-surface-200 dark:bg-surface-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-surface-600 dark:text-surface-400">No vehicles match your current filters. Please adjust your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map(vehicle => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="car-card"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={`${vehicle.make} ${vehicle.model}`} 
                      className="car-card-image"
                    />
                    <div className={`car-badge ${vehicle.condition === 'new' ? 'badge-new' : 'badge-used'}`}>
                      {vehicle.condition === 'new' ? 'New' : 'Pre-Owned'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                    <p className="text-2xl font-bold text-primary mb-4">${formatPrice(vehicle.price)}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-surface-500" />
                        <span>{vehicle.mileage.toLocaleString()} miles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel size={18} className="text-surface-500" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings size={18} className="text-surface-500" />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-surface-500" />
                        <span>{vehicle.year}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <a href="#" className="btn-primary flex-1 text-center">View Details</a>
                      <a href="#contact" className="btn-outline flex-1 text-center">Inquire</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <a href="#" className="btn-secondary inline-flex items-center gap-2">
              View All Inventory
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Our Services</h2>
          <p className="section-subtitle text-center">
            We offer a comprehensive range of automotive services to meet all your needs, from sales to maintenance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-surface-800 p-8 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-surface-600 dark:text-surface-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-title">About AutoShowcase</h2>
              <p className="text-lg mb-6 text-surface-700 dark:text-surface-300">
                For over 20 years, AutoShowcase has been the premier destination for automotive excellence in the region. Our commitment to exceptional customer service and quality vehicles has made us the trusted choice for thousands of satisfied customers.
              </p>
              <p className="text-lg mb-6 text-surface-700 dark:text-surface-300">
                We pride ourselves on offering a pressure-free, transparent car buying experience. Our knowledgeable team is here to guide you through every step of the process, from finding the perfect vehicle to securing the best financing options.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">20+</p>
                  <p className="text-surface-600 dark:text-surface-400">Years of Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">5000+</p>
                  <p className="text-surface-600 dark:text-surface-400">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">200+</p>
                  <p className="text-surface-600 dark:text-surface-400">Vehicles in Stock</p>
                </div>
              </div>
              <a href="#contact" className="btn-primary inline-block">Contact Us Today</a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Luxury car at AutoShowcase" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-surface-700 p-6 rounded-xl shadow-soft border border-surface-200 dark:border-surface-600 max-w-xs">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={20} className="text-primary" />
                  <h3 className="font-bold">Visit Our Showroom</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-400">
                  123 Auto Boulevard, Cartown, CT 12345
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">What Our Customers Say</h2>
          <p className="section-subtitle text-center">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with AutoShowcase.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-surface-800 p-8 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonial.rating ? "text-secondary fill-secondary" : "text-surface-300"} 
                    />
                  ))}
                </div>
                <p className="text-surface-700 dark:text-surface-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section id="contact" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Get In Touch</h2>
          <p className="section-subtitle text-center">
            Have questions about a specific vehicle or our services? Fill out the form below and our team will get back to you promptly.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <MainFeature />
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-96 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036728!2d-73.98784492346177!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="AutoShowcase Location"
          className="absolute inset-0"
        ></iframe>
        
        <div className="absolute top-8 left-8 bg-white dark:bg-surface-800 p-6 rounded-xl shadow-lg max-w-sm">
          <h3 className="text-xl font-bold mb-3">Visit Our Dealership</h3>
          <address className="not-italic text-surface-700 dark:text-surface-300 mb-4">
            <p className="mb-1">123 Auto Boulevard</p>
            <p className="mb-1">Cartown, CT 12345</p>
            <p className="mb-1">Phone: (555) 123-4567</p>
            <p>Email: info@autoshowcase.com</p>
          </address>
          <h4 className="font-semibold mb-2">Hours:</h4>
          <p className="text-surface-600 dark:text-surface-400">Mon-Fri: 9AM-8PM</p>
          <p className="text-surface-600 dark:text-surface-400">Sat: 10AM-6PM</p>
          <p className="text-surface-600 dark:text-surface-400">Sun: Closed</p>
        </div>
      </section>
    </div>
  )
}

export default Home