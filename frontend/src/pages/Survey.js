import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ageGroups = [
  '18-24', '25-34', '35-44', '45-54', '55-64', '65+',
];
const occupations = [
  'Student', 'Professional', 'Retired', 'Homemaker', 'Other',
];
const livingTypes = [
  'Single', 'Couple', 'Family', 'Roommates',
];
const vibes = [
  'Quiet', 'Mixed', 'Lively',
];
const priorities = [
  { name: 'safety', label: 'Safety' },
  { name: 'affordability', label: 'Affordability' },
  { name: 'cleanliness', label: 'Cleanliness' },
  { name: 'commute', label: 'Commute' },
  { name: 'greenery', label: 'Greenery' },
  { name: 'nightlife', label: 'Nightlife' },
];

const Survey = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    ageGroup: Yup.string().required('Please select your age group'),
    occupation: Yup.string().required('Please select your occupation'),
    livingType: Yup.string().required('Please select your living type'),
    vibe: Yup.string().required('Please select a neighborhood vibe'),
    safety: Yup.number().min(1).max(5).required(),
    affordability: Yup.number().min(1).max(5).required(),
    cleanliness: Yup.number().min(1).max(5).required(),
    commute: Yup.number().min(1).max(5).required(),
    greenery: Yup.number().min(1).max(5).required(),
    nightlife: Yup.number().min(1).max(5).required(),
  });

  const initialValues = {
    ageGroup: '',
    occupation: '',
    livingType: '',
    vibe: '',
    safety: 3,
    affordability: 3,
    cleanliness: 3,
    commute: 3,
    greenery: 3,
    nightlife: 3,
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting survey to:', `${API_BASE_URL}/api/survey`);
      const response = await axios.post(`${API_BASE_URL}/api/survey`, values);
      console.log('Survey response:', response.data);
      navigate('/results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error submitting survey:', error);
      let errorMessage = 'There was an error submitting your preferences. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        errorMessage = 'Cannot connect to the server. Please check your internet connection and try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-50 py-12">
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500 w-full animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary-600 mb-4 flex items-center justify-center gap-2">
            <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
            Lifestyle Preference Survey
          </h1>
          <p className="text-lg text-neutral-600">
            Tell us about your lifestyle and priorities to find your ideal neighborhood
          </p>
        </div>

        <div className="card p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-10">
                {/* Age Group */}
                <div>
                  <label htmlFor="ageGroup" className="block text-lg font-semibold text-primary-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
                    Age Group
                  </label>
                  <Field as="select" id="ageGroup" name="ageGroup" className="input-field">
                    <option value="">Select age group</option>
                    {ageGroups.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="ageGroup" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Occupation */}
                <div>
                  <label htmlFor="occupation" className="block text-lg font-semibold text-primary-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
                    Occupation
                  </label>
                  <Field as="select" id="occupation" name="occupation" className="input-field">
                    <option value="">Select occupation</option>
                    {occupations.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="occupation" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Living Type */}
                <div>
                  <label htmlFor="livingType" className="block text-lg font-semibold text-primary-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5z" /></svg>
                    Living Type
                  </label>
                  <Field as="select" id="livingType" name="livingType" className="input-field">
                    <option value="">Select living type</option>
                    {livingTypes.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="livingType" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Neighborhood Vibe */}
                <div>
                  <label htmlFor="vibe" className="block text-lg font-semibold text-primary-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
                    Preferred Neighborhood Vibe
                  </label>
                  <Field as="select" id="vibe" name="vibe" className="input-field">
                    <option value="">Select vibe</option>
                    {vibes.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="vibe" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Priorities Sliders */}
                <div>
                  <label className="block text-lg font-semibold text-primary-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
                    Rate the importance of each factor (1 = Not Important, 5 = Very Important)
                  </label>
                  <div className="space-y-4">
                    {priorities.map((p) => (
                      <div key={p.name} className="flex items-center gap-4">
                        <span className="w-32 text-neutral-700 font-medium">{p.label}</span>
                        <Field
                          type="range"
                          name={p.name}
                          min={1}
                          max={5}
                          step={1}
                          className="flex-1 accent-primary-500 focus:accent-accent-500 h-2 rounded-full bg-neutral-100"
                        />
                        <span className="w-8 text-center font-bold text-primary-600">{values[p.name]}</span>
                      </div>
                    ))}
                  </div>
                  {priorities.map((p) => (
                    <ErrorMessage key={p.name} name={p.name} component="div" className="text-red-500 text-sm mt-1" />
                  ))}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-xl px-12 py-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Finding Neighborhoods...' : 'Find My Neighborhood'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Survey; 