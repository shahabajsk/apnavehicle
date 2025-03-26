import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertCircle, FiUpload } from 'react-icons/fi';

interface VehicleFormData {
  registrationNumber: string;
  make: string;
  model: string;
  year: string;
  type: string;
  color: string;
  insurance: {
    provider: string;
    policyNumber: string;
    validity: string;
  };
}

interface FormErrors {
  registrationNumber?: string;
  make?: string;
  model?: string;
  year?: string;
  type?: string;
  color?: string;
  insurance?: {
    provider?: string;
    policyNumber?: string;
    validity?: string;
  };
}

interface MobileVehicleFormProps {
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => void;
  initialData?: VehicleFormData;
}

const MobileVehicleForm: React.FC<MobileVehicleFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<VehicleFormData>(
    initialData || {
      registrationNumber: '',
      make: '',
      model: '',
      year: '',
      type: '',
      color: '',
      insurance: {
        provider: '',
        policyNumber: '',
        validity: '',
      },
    }
  );
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.registrationNumber) {
          newErrors.registrationNumber = 'Registration number is required';
        }
        if (!formData.make) {
          newErrors.make = 'Make is required';
        }
        if (!formData.model) {
          newErrors.model = 'Model is required';
        }
        break;
      case 2:
        if (!formData.year) {
          newErrors.year = 'Year is required';
        }
        if (!formData.type) {
          newErrors.type = 'Vehicle type is required';
        }
        if (!formData.color) {
          newErrors.color = 'Color is required';
        }
        break;
      case 3:
        if (!formData.insurance.provider) {
          newErrors.insurance = { provider: 'Provider is required' };
        }
        if (!formData.insurance.policyNumber) {
          newErrors.insurance = {
            ...newErrors.insurance,
            policyNumber: 'Policy number is required',
          };
        }
        if (!formData.insurance.validity) {
          newErrors.insurance = {
            ...newErrors.insurance,
            validity: 'Validity is required',
          };
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(activeStep)) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full bg-white dark:bg-gray-800 rounded-t-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {initialData ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <FiX className="w-5 h-5 text-gray-900 dark:text-white" />
            </motion.button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= activeStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step < activeStep ? <FiCheck className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step < activeStep ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationNumber: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.registrationNumber
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="KA-01-AB-1234"
                  />
                  {errors.registrationNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.registrationNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.make ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Toyota"
                  />
                  {errors.make && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.make}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.model ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Camry"
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.model}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.year ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="2020"
                  />
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.year}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.type ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  >
                    <option value="">Select Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="bike">Bike</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.color ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Silver"
                  />
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.color}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insurance.provider}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insurance: { ...formData.insurance, provider: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.insurance?.provider
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="ICICI Lombard"
                  />
                  {errors.insurance?.provider && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.insurance.provider}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    value={formData.insurance.policyNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insurance: { ...formData.insurance, policyNumber: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.insurance?.policyNumber
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="POL123456789"
                  />
                  {errors.insurance?.policyNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.insurance.policyNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Validity
                  </label>
                  <input
                    type="date"
                    value={formData.insurance.validity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insurance: { ...formData.insurance, validity: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.insurance?.validity
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.insurance?.validity && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.insurance.validity}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            {activeStep > 1 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium"
              >
                Back
              </motion.button>
            )}
            {activeStep < 3 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg font-medium"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileVehicleForm; 