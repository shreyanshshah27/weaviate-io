import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandbox from './sandbox';
import PricingStandard from './standard';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Weaviate Cloud Services Saas</h2>
        <p>
          Our pricing is designed to give you all the capabilities to build and
          test your applications for free. <br /> When you are ready to move to
          production, simply pick a plan that best suits your needs.
        </p>
      </div>
      <div className={styles.planContainer}>
        <div className={styles.plan}>
          <PricingStandard />
          <PricingEnterprise />
          <PricingBusinessCritical />
        </div>
        <PricingSandbox />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonGradient}>
          <Link to={'https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.weaviate.io/registration-login'} className={styles.labelColor}>Register for Private Beta</Link>
        </div>
        <div className={styles.buttonOutline}>
          <Link className={styles.labelColorSecond} to={'https://console.weaviate.io/'}>Create a Free Sandbox</Link>
        </div>
      </div>
    </div>
  );
}
