import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Send, Car, Calendar, Clock } from 'lucide-react'

function MainFeature() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    vehicleInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  
  // Form validation state
  const [errors, setErrors] = useState({})
  
  // Form submission state
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Inquiry type validation
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type'
    }
    
    // If test drive is selected, validate date and time
    if (formData.inquiryType === 'test-drive') {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select a preferred date'
      }
      
      if (!formData.preferredTime) {
        newErrors.preferredTime = 'Please select a preferred time'
      }
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thank you for your inquiry! Our team will contact you shortly.'
        })
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: '',
          vehicleInterest: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        })
      }, 1500)
    }
  }
  
  // Reset form status
  const resetForm = () => {
    setFormStatus({
      submitted: false,
      success: false,
      message: ''
    })
  }
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
      <AnimatePresence mode="wait">
        {formStatus.submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Inquiry Submitted!</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
              {formStatus.message}
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-soft"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-surface-700 dark:text-surface-300 mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-surface-700 dark:text-surface-300 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-surface-700 dark:text-surface-300 mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="inquiryType" className="block text-surface-700 dark:text-surface-300 mb-2">
                  Inquiry Type*
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`input-field ${errors.inquiryType ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  <option value="">Select an option</option>
                  <option value="vehicle-info">Vehicle Information</option>
                  <option value="test-drive">Schedule Test Drive</option>
                  <option value="financing">Financing Options</option>
                  <option value="service">Service Appointment</option>
                  <option value="other">Other</option>
                </select>
                {errors.inquiryType && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.inquiryType}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="vehicleInterest" className="block text-surface-700 dark:text-surface-300 mb-2">
                Vehicle of Interest (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Car size={18} className="text-surface-500" />
                </div>
                <input
                  type="text"
                  id="vehicleInterest"
                  name="vehicleInterest"
                  value={formData.vehicleInterest}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g., 2023 BMW X5"
                />
              </div>
            </div>
            
            {/* Conditional fields for test drive */}
            {formData.inquiryType === 'test-drive' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              >
                <div>
                  <label htmlFor="preferredDate" className="block text-surface-700 dark:text-surface-300 mb-2">
                    Preferred Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-surface-500" />
                    </div>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.preferredDate ? 'border-red-500 dark:border-red-500' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="preferredTime" className="block text-surface-700 dark:text-surface-300 mb-2">
                    Preferred Time*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock size={18} className="text-surface-500" />
                    </div>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.preferredTime ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select a time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                    </select>
                  </div>
                  {errors.preferredTime && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.preferredTime}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-surface-700 dark:text-surface-300 mb-2">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`input-field resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="Please let us know how we can help you..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.message}
                </p>
              )}
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-soft flex items-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature