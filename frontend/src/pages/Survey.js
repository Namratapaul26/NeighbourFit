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

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/survey', values);
      navigate('/results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('There was an error submitting your preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lifestyle Preference Survey
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your lifestyle and priorities to find your ideal neighborhood
          </p>
        </div>

        <div className="card">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-8">
                {/* Age Group */}
                <div>
                  <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="livingType" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="vibe" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate the importance of each factor (1 = Not Important, 5 = Very Important)
                  </label>
                  <div className="space-y-4">
                    {priorities.map((p) => (
                      <div key={p.name} className="flex items-center gap-4">
                        <span className="w-32">{p.label}</span>
                        <Field
                          type="range"
                          name={p.name}
                          min={1}
                          max={5}
                          step={1}
                          className="flex-1 accent-primary-600"
                        />
                        <span className="w-8 text-center">{values[p.name]}</span>
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
                    className="btn-primary text-lg px-12 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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