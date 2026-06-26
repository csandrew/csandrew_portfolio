import React, { useState, useRef, useEffect } from 'react';

// ============================================
// ContactInfo Component
// ============================================
const ContactInfo = ({ icon, label, value, link, ariaLabel }) => {
  const IconComponent = () => {
    try {
      return <i className={`fas fa-${icon} text-primary text-xl`} aria-hidden="true"></i>;
    } catch (error) {
      return <span className="text-primary text-xl font-bold" aria-hidden="true">•</span>;
    }
  };

  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <IconComponent />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {link ? (
          <a
            href={link}
            className="text-sm text-dark hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-sm px-1"
            aria-label={ariaLabel || label}
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-dark block">{value}</span>
        )}
      </div>
    </div>
  );
};

// ============================================
// Form Field Component
// ============================================
const FormField = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  value, 
  onChange, 
  onBlur,
  placeholder, 
  required = false, 
  error,
  touched,
  rows,
  className = '',
  autoComplete,
  maxLength,
  showCounter = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  
  const baseStyles = "w-full rounded-md border-2 px-5 py-4 text-sm text-dark outline-none transition-all duration-200";
  const defaultStyles = "border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20";
  const errorStyles = "border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200";
  const validStyles = "border-green-500 bg-green-50";
  
  let inputStyles = baseStyles + ' ' + defaultStyles;
  if (touched && error) {
    inputStyles = baseStyles + ' ' + errorStyles;
  } else if (touched && value && !error) {
    inputStyles = baseStyles + ' ' + validStyles;
  }

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const commonProps = {
    id,
    name,
    value,
    onChange,
    onBlur: handleBlur,
    onFocus: () => setFocused(true),
    placeholder,
    required,
    className: inputStyles + ' ' + className,
    autoComplete,
    maxLength,
    'aria-required': required,
    'aria-invalid': touched && !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
  };

  return (
    <div className="space-y-1.5">
      <label 
        htmlFor={id}
        className="block text-sm font-semibold text-dark"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...commonProps}
          rows={rows || 5}
          className={`${commonProps.className} resize-none`}
          {...props}
        />
      ) : (
        <input
          {...commonProps}
          type={type}
          {...props}
        />
      )}
      
      {/* Character Counter */}
      {showCounter && maxLength && (
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {value?.length || 0}/{maxLength}
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {touched && error && (
        <p 
          id={`${id}-error`}
          className="text-sm text-red-600 animate-slideDown"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================
// Social Icon Component
// ============================================
const SocialLink = ({ href, icon, label, color = "bg-white" }) => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`p-3 ${color} rounded-full shadow-md hover:shadow-lg transition-all ${
        prefersReducedMotion ? '' : 'hover:scale-110'
      } focus:outline-none focus:ring-2 focus:ring-primary`}
      aria-label={label}
    >
      <i className={`fab fa-${icon} text-xl text-dark`} aria-hidden="true"></i>
    </a>
  );
};

// ============================================
// Main Contact Component
// ============================================
function Contact() {
  // Form state with validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const submitButtonRef = useRef(null);

  // ============================================
  // Check for reduced motion
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // Validation Functions
  // ============================================
  const validateField = (name, value) => {
    const newErrors = {};
    
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          newErrors.name = 'Name is too long (max 100 characters)';
        } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
          newErrors.name = 'Name contains invalid characters';
        }
        break;
        
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
        
      case 'subject':
        if (!value || value.trim().length < 3) {
          newErrors.subject = 'Subject must be at least 3 characters';
        } else if (value.trim().length > 200) {
          newErrors.subject = 'Subject is too long (max 200 characters)';
        }
        break;
        
      case 'message':
        if (!value || value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else if (value.trim().length > 1000) {
          newErrors.message = 'Message is too long (max 1000 characters)';
        }
        break;
        
      default:
        break;
    }
    
    return newErrors;
  };

  const validateForm = () => {
    const allErrors = {};
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      Object.assign(allErrors, fieldErrors);
    });
    
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  // ============================================
  // Handlers
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const fieldErrors = validateField(name, value);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (fieldElement) {
          fieldElement.focus();
        }
      }
      return;
    }

    // Check if already submitting
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
      // Add honeypot field (basic spam protection)
      const honeypotElement = document.querySelector('[name="honeypot"]');
      const honeypotValue = honeypotElement?.value || '';
      
      const formDataToSend = {
        "form-name": "contact",
        ...formData,
      };
      
      // Only include honeypot if it has a value (spam bots usually fill it)
      if (honeypotValue) {
        formDataToSend.honeypot = honeypotValue;
      }

      const encodedData = new URLSearchParams(formDataToSend).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: encodedData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Success
      setStatus({
        type: "success",
        message: "✅ Message sent successfully! I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
      setErrors({});
      
      // Focus on success message
      setTimeout(() => {
        if (statusRef.current) {
          statusRef.current.focus();
        }
      }, 100);

    } catch (error) {
      console.error("Form submission error:", error);
      
      // More specific error messages
      let errorMessage = "❌ Something went wrong. Please try again.";
      if (error.message.includes('fetch')) {
        errorMessage = "❌ Network error. Please check your connection and try again.";
      } else if (error.message.includes('400')) {
        errorMessage = "❌ Invalid form data. Please check all fields.";
      }
      
      setStatus({
        type: "error",
        message: errorMessage,
      });
      
      // Focus on error message
      setTimeout(() => {
        if (statusRef.current) {
          statusRef.current.focus();
        }
      }, 100);
      
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // ============================================
  // Reset form on unmount
  // ============================================
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  // ============================================
  // Render
  // ============================================
  return (
    <section 
      id="contact" 
      className="bg-light py-24"
      aria-labelledby="contact-heading"
      aria-describedby="contact-description"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 
            id="contact-heading"
            className={`inline-block text-3xl font-bold text-dark sm:text-4xl ${
              prefersReducedMotion ? '' : ''} transition-all duration-300`}
          >
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" aria-hidden="true"></div>
          <p 
            id="contact-description"
            className="mt-6 text-lg text-main max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss a potential collaboration? 
            I'm here to help bring your ideas to life.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-dark mb-4">
                Let's Talk About Your Project
              </h3>
              <p className="text-base leading-8 text-main">
                I'm currently available for freelance work and open to new opportunities. 
                Feel free to reach out if you have a project or just want to connect.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                <SocialLink 
                  href="https://github.com/andrewchemi" 
                  icon="github" 
                  label="GitHub Profile" 
                />
                <SocialLink 
                  href="https://linkedin.com/in/andrewchemi" 
                  icon="linkedin-in" 
                  label="LinkedIn Profile" 
                />
                <SocialLink 
                  href="https://instagram.com/andrewchemi" 
                  icon="instagram" 
                  label="Instagram Profile" 
                />
                <SocialLink 
                  href="https://twitter.com/andrewchemi" 
                  icon="twitter" 
                  label="Twitter Profile" 
                />
              </div>
            </div>

            {/* Contact Details - FIXED JSX STRUCTURE */}
            <div className="space-y-5">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
                Contact Information
              </h4>
              
              <ContactInfo 
                icon="location-dot" 
                label="Location" 
                value="Nairobi, Kenya" 
              />
              <ContactInfo 
                icon="phone" 
                label="Phone" 
                value="+254 735 916 581"
                link="tel:+254735916581"
                ariaLabel="Call me at +254 735 916 581"
              />
              <ContactInfo 
                icon="envelope" 
                label="Email" 
                value="andreaschemiati@gmail.com"
                link="mailto:andreaschemiati@gmail.com"
                ariaLabel="Send email to andreaschemiati@gmail.com"
              />
            </div>

            {/* Working Hours */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Response Time:</span> Usually within 24 hours
              </p>
              <p className="text-xs text-gray-500 mt-1" aria-label="Timezone: East Africa Time UTC plus 3">
                🌍 Timezone: East Africa Time (UTC+3)
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div 
            className="rounded-[10px] bg-white p-8 shadow-xl"
            role="form"
            aria-label="Contact form"
          >
            <form 
              ref={formRef}
              id="contact-form"
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              {/* Form Metadata */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field for spam protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="honeypot">Don't fill this out</label>
                <input 
                  id="honeypot"
                  type="text" 
                  name="honeypot" 
                  tabIndex="-1"
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              {/* Status Message */}
              {status && (
                <div
                  ref={statusRef}
                  className={`rounded-xl px-5 py-4 text-sm font-medium ${
                    status.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  tabIndex={-1}
                >
                  {status.message}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="name"
                  name="name"
                  type="text"
                  label="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  required={true}
                  error={errors.name}
                  touched={touched.name}
                  autoComplete="given-name"
                  maxLength={100}
                />
                
                <FormField
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  required={true}
                  error={errors.email}
                  touched={touched.email}
                  autoComplete="email"
                  maxLength={100}
                />
              </div>

              <FormField
                id="subject"
                name="subject"
                type="text"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Project Inquiry"
                required={true}
                error={errors.subject}
                touched={touched.subject}
                autoComplete="off"
                maxLength={200}
                showCounter={true}
              />

              <FormField
                id="message"
                name="message"
                type="textarea"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project..."
                required={true}
                error={errors.message}
                touched={touched.message}
                rows={5}
                maxLength={1000}
                autoComplete="off"
                showCounter={true}
              />

              {/* Submit Button */}
              <div className="space-y-3 pt-2">
                <button
                  ref={submitButtonRef}
                  type="submit"
                  form="contact-form"
                  disabled={loading || isSubmitting}
                  className={`relative inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    loading || isSubmitting
                      ? 'cursor-not-allowed opacity-70 bg-gray-400'
                      : 'bg-secondary hover:bg-primary transform hover:scale-[1.02]'
                  } ${prefersReducedMotion ? 'transform-none hover:scale-100' : ''}`}
                  aria-label={loading ? 'Sending message...' : 'Send message'}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Privacy Policy */}
                <p className="text-xs text-center text-gray-500">
                  By sending this message, you agree to my{' '}
                  <a 
                    href="/privacy-policy" 
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-sm px-1"
                  >
                    Privacy Policy
                  </a>
                  . Your data will be kept confidential.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-slideDown,
            .animate-spin {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Contact;