import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import './Registration.css';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';

const RegistrationForm = ({ eventConfig }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        department: '',
        
        // Team Information
        teamName: '',
        teamSize: eventConfig.minTeamSize?.toString() || '1',
        teamMember2Name: '',
        teamMember2Email: '',
        teamMember2Phone: '',
        
        // Event Specific
        experienceLevel: '',
        
        // Payment Information
        paymentMode: '',
        paymentDate: '',
        paymentReceipt: null,
        
        // Additional Information
        dietaryRestrictions: '',
        specialRequirements: '',
        howDidYouHear: '',
        
        // WhatsApp Group
        whatsappConfirmed: false,
        
        // File Upload
        idProof: null,
        
        // Event-specific custom fields
        customField1: '',
        customField2: '',
        
        // Terms
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields
        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Invalid phone number';
        if (!formData.college.trim()) newErrors.college = 'College is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please select an option';
        if (!formData.whatsappConfirmed) newErrors.whatsappConfirmed = 'Please confirm after joining the WhatsApp group';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';
        
        // Payment validation (skip for CodeBee and HackStorm)
        const skipPayment = eventConfig.eventName === 'Code-Bee' || eventConfig.eventName === 'HackStorm';
        if (!skipPayment) {
            if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
            if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';
            
            // Receipt validation based on payment mode
            if (formData.paymentMode === 'online' && !formData.paymentReceipt) {
                newErrors.paymentReceipt = 'Payment screenshot is required for online payment';
            }
            if (formData.paymentMode === 'offline' && !formData.paymentReceipt) {
                newErrors.paymentReceipt = 'Offline receipt is required for offline payment';
            }
        }
        
        // Team member validation if team size > 1
        if (parseInt(formData.teamSize) > 1) {
            if (!formData.teamMember2Name.trim()) newErrors.teamMember2Name = 'Team member name required';
            if (!formData.teamMember2Email.trim()) newErrors.teamMember2Email = 'Team member email required';
        }
        
        // Event-specific validations
        if (eventConfig.customFields) {
            eventConfig.customFields.forEach((field, index) => {
                if (field.required && !formData[`customField${index + 1}`].trim()) {
                    newErrors[`customField${index + 1}`] = `${field.label} is required`;
                }
            });
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const result = await submitEventRegistration(eventConfig.eventName, formData);
            console.log('Registration successful:', result);
            setSubmitSuccess(true);
            
            setTimeout(() => {
                history.push('/events');
            }, 3000);
        } catch (error) {
            console.error('Registration error:', error);
            if (error.message.includes('duplicate')) {
                setErrors({ submit: 'You have already registered for this event with this email or phone number.' });
            } else {
                setErrors({ submit: error.message || 'Registration failed. Please try again.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <div className="registration-page">
            <Breadcrumb 
                pageTitle={`Register for ${eventConfig.eventName}`}
                currentPage="Registration"
                bgImage={eventConfig.breadcrumbBg}
            />
            
            <div className="registration-container">
                <div className="registration-content">
                    <div className="registration-header">
                        <h1 className="registration-title">Register Now</h1>
                        <p className="registration-subtitle">TechStorm 2.26 - {eventConfig.eventName}</p>
                        {eventConfig.entryFee && (
                            <p className="registration-subtitle" style={{marginTop: '10px', color: '#ffc010'}}>
                                Entry Fee: {eventConfig.entryFee}
                            </p>
                        )}
                    </div>

                    {submitSuccess && (
                        <div className="success-message">
                            ✓ Registration Successful!<br/>
                            Redirecting to events page...
                        </div>
                    )}

                    {errors.submit && (
                        <div className="error-message" style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            backgroundColor: '#ff4444', 
                            color: 'white',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }}>
                            {errors.submit}
                        </div>
                    )}

                    <form className="registration-form" onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; Personal Information</h2>
                            
                            <div className="form-group">
                                <label className="form-label required">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="retro-input"
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label required">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="retro-input"
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && <div className="error-message">{errors.email}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="retro-input"
                                        placeholder="1234567890"
                                    />
                                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label required">College/Institution</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleInputChange}
                                    className="retro-input"
                                    placeholder="Enter your college name"
                                />
                                {errors.college && <div className="error-message">{errors.college}</div>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label required">Year of Study</label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        className="retro-select"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="graduate">Graduate</option>
                                    </select>
                                    {errors.year && <div className="error-message">{errors.year}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="retro-input"
                                        placeholder="e.g., Computer Science"
                                    />
                                    {errors.department && <div className="error-message">{errors.department}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Team Information Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; Team Information</h2>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Team Name (Optional)</label>
                                    <input
                                        type="text"
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleInputChange}
                                        className="retro-input"
                                        placeholder="Enter team name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Team Size</label>
                                    <select
                                        name="teamSize"
                                        value={formData.teamSize}
                                        onChange={handleInputChange}
                                        className="retro-select"
                                    >
                                        {eventConfig.teamSizeOptions?.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        )) || (
                                            <>
                                                <option value="1">Solo (1 Member)</option>
                                                <option value="2">Duo (2 Members)</option>
                                                <option value="3">Trio (3 Members)</option>
                                                <option value="4">Squad (4 Members)</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>

                            {parseInt(formData.teamSize) > 1 && (
                                <div className="form-group">
                                    <label className="form-label required">Team Member 2 Details</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <input
                                            type="text"
                                            name="teamMember2Name"
                                            value={formData.teamMember2Name}
                                            onChange={handleInputChange}
                                            className="retro-input"
                                            placeholder="Team member name"
                                        />
                                        {errors.teamMember2Name && <div className="error-message">{errors.teamMember2Name}</div>}
                                        
                                        <input
                                            type="email"
                                            name="teamMember2Email"
                                            value={formData.teamMember2Email}
                                            onChange={handleInputChange}
                                            className="retro-input"
                                            placeholder="Team member email"
                                        />
                                        {errors.teamMember2Email && <div className="error-message">{errors.teamMember2Email}</div>}
                                        
                                        <input
                                            type="tel"
                                            name="teamMember2Phone"
                                            value={formData.teamMember2Phone}
                                            onChange={handleInputChange}
                                            className="retro-input"
                                            placeholder="Team member phone"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Event Specific Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; Event Preferences</h2>
                            
                            <div className="form-group">
                                <label className="form-label required">Experience Level</label>
                                <div className="mcq-group">
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="experienceLevel"
                                            value="beginner"
                                            checked={formData.experienceLevel === 'beginner'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Beginner - Just starting out</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="experienceLevel"
                                            value="intermediate"
                                            checked={formData.experienceLevel === 'intermediate'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Intermediate - Some experience</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="experienceLevel"
                                            value="advanced"
                                            checked={formData.experienceLevel === 'advanced'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Advanced - Highly experienced</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="experienceLevel"
                                            value="expert"
                                            checked={formData.experienceLevel === 'expert'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Expert - Professional level</span>
                                    </label>
                                </div>
                                {errors.experienceLevel && <div className="error-message">{errors.experienceLevel}</div>}
                            </div>

                            {/* Custom Event-Specific Fields */}
                            {eventConfig.customFields && eventConfig.customFields.map((field, index) => (
                                <div className="form-group" key={index}>
                                    <label className={`form-label ${field.required ? 'required' : ''}`}>
                                        {field.label}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            name={`customField${index + 1}`}
                                            value={formData[`customField${index + 1}`]}
                                            onChange={handleInputChange}
                                            className="retro-textarea"
                                            placeholder={field.placeholder}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            name={`customField${index + 1}`}
                                            value={formData[`customField${index + 1}`]}
                                            onChange={handleInputChange}
                                            className="retro-select"
                                        >
                                            <option value="">Select...</option>
                                            {field.options?.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            name={`customField${index + 1}`}
                                            value={formData[`customField${index + 1}`]}
                                            onChange={handleInputChange}
                                            className="retro-input"
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                    {errors[`customField${index + 1}`] && (
                                        <div className="error-message">{errors[`customField${index + 1}`]}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Payment Information Section - Skip for CodeBee and HackStorm */}
                        {eventConfig.eventName !== 'Code-Bee' && eventConfig.eventName !== 'HackStorm' && (
                            <div className="form-section">
                                <h2 className="form-section-title">&gt;&gt;&gt; Payment Information</h2>
                                
                                <div className="form-group">
                                    <label className="form-label required">Payment Mode</label>
                                    <div className="mcq-group">
                                        <label className="mcq-option">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                value="online"
                                                checked={formData.paymentMode === 'online'}
                                                onChange={handleInputChange}
                                            />
                                            <span className="mcq-option-label">Online Payment (UPI/Card/Net Banking)</span>
                                        </label>
                                        
                                        <label className="mcq-option">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                value="offline"
                                                checked={formData.paymentMode === 'offline'}
                                                onChange={handleInputChange}
                                            />
                                            <span className="mcq-option-label">Offline Payment (Cash/Cheque)</span>
                                        </label>
                                    </div>
                                    {errors.paymentMode && <div className="error-message">{errors.paymentMode}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label required">Payment Date</label>
                                    <input
                                        type="date"
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={handleInputChange}
                                        className="retro-input"
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.paymentDate && <div className="error-message">{errors.paymentDate}</div>}
                                </div>

                                {formData.paymentMode && (
                                    <div className="form-group">
                                        <label className="form-label required">
                                            {formData.paymentMode === 'online' 
                                                ? 'Upload Payment Screenshot' 
                                                : 'Upload Offline Receipt'}
                                        </label>
                                        <div className="file-upload-wrapper">
                                            <div className="file-upload">
                                                <input
                                                    type="file"
                                                    name="paymentReceipt"
                                                    id="paymentReceipt"
                                                    onChange={handleInputChange}
                                                    className="file-upload-input"
                                                    accept="image/*,.pdf"
                                                />
                                                <label htmlFor="paymentReceipt" className="file-upload-label">
                                                    <div className="file-upload-icon">💳</div>
                                                    <div className="file-upload-text">
                                                        <span className="highlight">Click to upload</span><br/>
                                                        {formData.paymentMode === 'online' 
                                                            ? 'Upload payment screenshot' 
                                                            : 'Upload offline receipt'}<br/>
                                                        (PNG, JPG, PDF - Max 5MB)
                                                    </div>
                                                </label>
                                            </div>
                                            {formData.paymentReceipt && (
                                                <div className="file-name">
                                                    ✓ {formData.paymentReceipt.name}
                                                </div>
                                            )}
                                        </div>
                                        {errors.paymentReceipt && <div className="error-message">{errors.paymentReceipt}</div>}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Additional Information Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; Additional Information</h2>
                            
                            <div className="form-group">
                                <label className="form-label">Dietary Restrictions</label>
                                <input
                                    type="text"
                                    name="dietaryRestrictions"
                                    value={formData.dietaryRestrictions}
                                    onChange={handleInputChange}
                                    className="retro-input"
                                    placeholder="e.g., Vegetarian, Vegan, Allergies"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Special Requirements/Accessibility</label>
                                <textarea
                                    name="specialRequirements"
                                    value={formData.specialRequirements}
                                    onChange={handleInputChange}
                                    className="retro-textarea"
                                    placeholder="Let us know if you need any special accommodations"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label required">How did you hear about TechStorm?</label>
                                <div className="mcq-group">
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value="social-media"
                                            checked={formData.howDidYouHear === 'social-media'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Social Media</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value="friend"
                                            checked={formData.howDidYouHear === 'friend'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Friend/Word of Mouth</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value="college"
                                            checked={formData.howDidYouHear === 'college'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">College/University</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value="website"
                                            checked={formData.howDidYouHear === 'website'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Website/Search Engine</span>
                                    </label>
                                    
                                    <label className="mcq-option">
                                        <input
                                            type="radio"
                                            name="howDidYouHear"
                                            value="other"
                                            checked={formData.howDidYouHear === 'other'}
                                            onChange={handleInputChange}
                                        />
                                        <span className="mcq-option-label">Other</span>
                                    </label>
                                </div>
                                {errors.howDidYouHear && <div className="error-message">{errors.howDidYouHear}</div>}
                            </div>
                        </div>

                        {/* WhatsApp Group Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; WhatsApp Group</h2>
                            
                            <div className="form-group">
                                <label className="form-label">Official WhatsApp Group Link</label>
                                <p style={{ margin: '10px 0', color: '#ffc010' }}>
                                    Join our official WhatsApp group for event updates and announcements
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="whatsappConfirmed"
                                        checked={formData.whatsappConfirmed}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <span className="checkbox-label">
                                        I confirm that I have joined the official WhatsApp group
                                    </span>
                                </label>
                                {errors.whatsappConfirmed && <div className="error-message">{errors.whatsappConfirmed}</div>}
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="form-section">
                            <h2 className="form-section-title">&gt;&gt;&gt; Upload Documents</h2>
                            
                            <div className="form-group">
                                <label className="form-label">Student ID / College ID Proof</label>
                                <div className="file-upload-wrapper">
                                    <div className="file-upload">
                                        <input
                                            type="file"
                                            name="idProof"
                                            id="idProof"
                                            onChange={handleInputChange}
                                            className="file-upload-input"
                                            accept="image/*,.pdf"
                                        />
                                        <label htmlFor="idProof" className="file-upload-label">
                                            <div className="file-upload-icon">📁</div>
                                            <div className="file-upload-text">
                                                <span className="highlight">Click to upload</span><br/>
                                                or drag and drop<br/>
                                                (PNG, JPG, PDF - Max 5MB)
                                            </div>
                                        </label>
                                    </div>
                                    {formData.idProof && (
                                        <div className="file-name">
                                            ✓ {formData.idProof.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-section">
                            <div className="form-group">
                                <label className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <span className="checkbox-label">
                                        I agree to the TechStorm 2026 terms and conditions, code of conduct, and privacy policy. I understand that registration is subject to approval and payment confirmation.
                                    </span>
                                </label>
                                {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="submit-button-wrapper">
                            <button 
                                type="submit" 
                                className="retro-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                            </button>
                            <button 
                                type="button" 
                                className="retro-button secondary"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
