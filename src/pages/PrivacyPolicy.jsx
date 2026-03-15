import React from "react";
import { Helmet } from "react-helmet-async";
import { LegalPage } from "../components/legal/LegalPage";
import { ContactBox, Highlight, LegalSection } from "../components/legal/LegalSection";

 const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy - Durga Gairhe</title>
    </Helmet>
    <LegalPage
      title="Privacy Policy"
      subtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
      lastUpdated="January 27, 2025"
    >
      <LegalSection number="1" title="Information We Collect">
        <p>We collect information you provide directly to us, such as when you contact us through forms, subscribe to updates, request services, or interact with our social profiles.</p>
        <p>This may include:</p>
        <ul className="list-none space-y-1.5 mt-2">
          <li><Highlight>Personal:</Highlight> Name, email, phone number, company name</li>
          <li><Highlight>Technical:</Highlight> IP address, browser type, device information</li>
          <li><Highlight>Usage:</Highlight> Pages visited, time on site, referral sources</li>
        </ul>
      </LegalSection>
 
      <LegalSection number="2" title="How We Use Your Information">
        <p>We use collected information to respond to inquiries, send service updates, improve our website, analyze traffic, and comply with legal obligations.</p>
        <p>We will never sell, rent, or share your personal information with third parties for marketing purposes without your explicit consent.</p>
      </LegalSection>
 
      <LegalSection number="3" title="Information Sharing and Disclosure">
        <p>We may share your information with trusted service providers who assist us, when required by law, or in connection with a business transfer. All providers are contractually bound to protect your information.</p>
      </LegalSection>
 
      <LegalSection number="4" title="Data Security">
        <p>We implement SSL encryption, secure hosting, regular security assessments, and limited access controls to protect your data. No transmission method is 100% secure, and we cannot guarantee absolute security.</p>
      </LegalSection>
 
      <LegalSection number="5" title="Cookies and Tracking">
        <p>We use cookies to remember preferences, understand usage patterns, and improve performance. You can control cookie settings via your browser, though this may affect some functionality.</p>
      </LegalSection>
 
      <LegalSection number="6" title="Your Rights">
        <p>You have the right to access, correct, delete, opt out of, or request portability of your personal information. Contact us using the details below to exercise these rights.</p>
      </LegalSection>
 
      <LegalSection number="7" title="Third-Party Links">
        <p>Our website may link to third-party sites. We are not responsible for their privacy practices and encourage you to review their policies.</p>
      </LegalSection>
 
      <LegalSection number="8" title="Changes to This Policy">
        <p>We may update this policy to reflect changes in our practices or legal requirements. Material changes will be communicated via email or a prominent notice on our site.</p>
      </LegalSection>
 
      <LegalSection number="9" title="Contact">
        <ContactBox>
          <p className="text-sm font-semibold text-stone-900 dark:text-white mb-3">Questions about this Privacy Policy?</p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
            Email:{" "}
            <a href="mailto:privacy@durgagairhe.com.np" className="text-secondary-600 dark:text-secondary-400 hover:underline">
              privacy@durgagairhe.com.np
            </a>
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            We respond within 48 hours.
          </p>
        </ContactBox>
      </LegalSection>
    </LegalPage>
  </>
);
 
export default PrivacyPolicy;
