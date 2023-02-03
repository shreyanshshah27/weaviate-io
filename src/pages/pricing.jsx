import React, { useState } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/PricingHeader';
import PricingCalculator from '../components/PricingCalculator';
import PricingPlan from '../components/PricingPlan';
import PricingFAQ from '../components/PricingFAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/HybridBusinessCritical';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('hybrid');

  return (
    <Layout>
      <PricingHeader selectedType={selectedType} handleSelected={setSelectedType} />
      {selectedType === 'saas' ? (
        <>
          <PricingPlan />
          <PricingCalculator />
        </>
      ) : (
        <HybridBusinessCritical />
      )}
      <PricingFAQ />
      <ContactUsForm />
    </Layout>
  );
}

