import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { submitEventRegistration } from '../../../utils/eventRegistrationAPI';
import './Registration.css';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import Stepper, { Step } from '../../Utilities/Stepper/Stepper';

const RegistrationFormStepper = ({ eventConfig }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        department: '',
        teamName: '',
        teamSize: eventConfig.minTeamSize?.toString() || '1',
        teamMember2Name: '',
        teamMember2Email: '',
        teamMember2Phone: '',
        experienceLevel: '',
        paymentMode: '',
        paymentDate: '',
        paymentReceipt: null,
        dietaryRestrictions: '',
        specialRequirements: '',
        howDidYouHear: '',
        whatsappConfirmed: false,
        idProof: null,
        customField1: '',
        customField2: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [currentStepValid, setCurrentStepValid] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            const file = files && files[0] ? files[0] : null;
            if (file && file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [name]: 'File size must not exceed 2MB. Please choose a smaller file.' }));
                e.target.value = '';
                return;
            }
            setFormData(prev => ({ ...prev, [name]: file }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Invalid phone number';
        if (!formData.college.trim()) newErrors.college = 'College is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';
        if (parseInt(formData.teamSize) > 1) {
            if (!formData.teamMember2Name.trim()) newErrors.teamMember2Name = 'Team member name required';
            if (!formData.teamMember2Email.trim()) newErrors.teamMember2Email = 'Team member email required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const skipPayment = eventConfig.eventName === 'Code-Bee' || eventConfig.eventName === 'HackStorm';
        if (skipPayment) return true;
        
        const newErrors = {};
        if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
        if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';
        if (formData.paymentMode === 'online' && !formData.paymentReceipt) {
            newErrors.paymentReceipt = 'Payment screenshot is required';
        }
        if (formData.paymentMode === 'offline' && !formData.paymentReceipt) {
            newErrors.paymentReceipt = 'Offline receipt is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.whatsappConfirmed) newErrors.whatsappConfirmed = 'Please confirm after joining WhatsApp group';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateStep3()) return;
        
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
            const msg = error?.message || '';
            let userMessage;
            if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('network error') || msg.toLowerCase().includes('networkerror')) {
                userMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
            } else if (msg.includes('FUNCTION_PAYLOAD_TOO_LARGE') || msg.toLowerCase().includes('request entity too large') || msg.toLowerCase().includes('payload too large')) {
                userMessage = 'Submission is too large. Please ensure all uploaded images are under 2MB and try again.';
            } else if (msg.toLowerCase().includes('duplicate')) {
                userMessage = 'You have already registered for this event.';
            } else {
                userMessage = msg || 'Registration failed. Please try again or contact support if the issue persists.';
            }
            setErrors({ submit: userMessage });
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

                    {errors.submit && (
                        <div className="submit-error">
                            <span className="submit-error-icon">⚠</span>
                            <span>{errors.submit}</span>
                        </div>
                    )}

                    <Stepper
                        initialStep={1}
                        onStepChange={(step) => console.log('Step:', step)}
                        onFinalStepCompleted={handleSubmit}
                        backButtonText="← Previous"
                        nextButtonText="Next Step →"
                        nextButtonProps={{
                            onClick: (e) => {
                                e.preventDefault();
                                const currentStep = parseInt(e.target.closest('.step-circle-container')?.querySelector('.step-indicator.active')?.textContent || 1);
                                if (currentStep === 1 && !validateStep1()) {
                                    e.stopPropagation();
                                } else if (currentStep === 2 && !validateStep2()) {
                                    e.stopPropagation();
                                }
                            }
                        }}
                    >

                        {/* Step 1: Team Details */}
                        <Step>
                            <div className="form-section">
                                <h2 className="form-section-title">&gt;&gt;&gt; Personal & Team Information</h2>
                                
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
                        </Step>

                        {/* Step 2: Payment Section */}
                        <Step>
                            {eventConfig.eventName !== 'Code-Bee' && eventConfig.eventName !== 'HackStorm' ? (
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
                                                        accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                                                    />
                                                    <label htmlFor="paymentReceipt" className="file-upload-label">
                                                        <div className="file-upload-icon">💳</div>
                                                        <div className="file-upload-text">
                                                            <span className="highlight">Click to upload</span><br/>
                                                            {formData.paymentMode === 'online' 
                                                                ? 'Upload payment screenshot' 
                                                                : 'Upload offline receipt'}<br/>
                                                            (PNG, JPG, JPEG - Max 5MB)
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
                            ) : (
                                <div className="form-section">
                                    <h2 className="form-section-title">&gt;&gt;&gt; Payment Information</h2>
                                    <div style={{ padding: '40px', textAlign: 'center', background: '#1a1a1a', borderRadius: '8px' }}>
                                        <h3 style={{ color: '#ffc010', marginBottom: '10px' }}>🎉 Free Event!</h3>
                                        <p style={{ color: '#999' }}>No payment required for this event.</p>
                                    </div>
                                </div>
                            )}
                        </Step>

                        {/* Step 3: Rules & Regulations */}
                        <Step>
                            <div className="form-section">
                                <h2 className="form-section-title">&gt;&gt;&gt; Rules & Regulations</h2>
                                
                                <div className="rules-container" style={{ 
                                    background: '#1a1a1a', 
                                    padding: '30px', 
                                    borderRadius: '8px',
                                    marginBottom: '30px',
                                    border: '2px solid #333'
                                }}>
                                    <h3 style={{ color: '#ffc010', marginBottom: '20px' }}>Event Rules</h3>
                                    <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                                        <li>All participants must carry a valid college ID card</li>
                                        <li>Registration is mandatory for all participants</li>
                                        <li>Team members cannot be changed after registration</li>
                                        <li>Participants must follow the event schedule strictly</li>
                                        <li>Any form of malpractice will lead to disqualification</li>
                                        <li>Organizers' decision will be final and binding</li>
                                        <li>Participants must maintain decorum throughout the event</li>
                                        <li>Entry fee is non-refundable under any circumstances</li>
                                    </ul>
                                </div>

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

                                <div className="form-group">
                                    <label className="form-label">Student ID / College ID Proof (Optional)</label>
                                    <div className="file-upload-wrapper">
                                        <div className="file-upload">
                                            <input
                                                type="file"
                                                name="idProof"
                                                id="idProof"
                                                onChange={handleInputChange}
                                                className="file-upload-input"
                                                accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                                            />
                                            <label htmlFor="idProof" className="file-upload-label">
                                                <div className="file-upload-icon">📁</div>
                                                <div className="file-upload-text">
                                                    <span className="highlight">Click to upload</span><br/>
                                                    or drag and drop<br/>
                                                    (PNG, JPG, JPEG - Max 5MB)
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
                        </Step>
                    </Stepper>

                    {submitSuccess && (
                        <div className="success-message" style={{ marginTop: '20px', textAlign: 'center', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
                            <h3 style={{ color: '#ffc010' }}>✓ Registration Successful!</h3>
                            <p style={{ color: '#999' }}>Redirecting to events page...</p>
                        </div>
                    )}

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button 
                            type="button" 
                            className="retro-button secondary"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationFormStepper;
