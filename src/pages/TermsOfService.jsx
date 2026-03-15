import { Helmet } from "react-helmet-async";
import { ContactBox, Highlight, LegalSection } from "../components/legal/LegalSection";
import { LegalPage } from "../components/legal/LegalPage";


export const TermsOfService = () => (
  <>
    <Helmet>
      <title>Terms of Service - Durga Gairhe</title>
    </Helmet>
    <LegalPage
      title="Terms of Service"
      subtitle="Please read these terms carefully. By accessing our website, you agree to be bound by them."
      lastUpdated="January 27, 2025"
    >
      <LegalSection number="1" title="Acceptance of Terms">
        <p>
          By accessing{" "}
          <a href="https://www.durgagairhe.com.np" className="text-secondary-600 dark:text-secondary-400 hover:underline">
            www.durgagairhe.com.np
          </a>{" "}
          you accept and agree to be bound by these Terms. If you do not agree, please do not use this service.
        </p>
      </LegalSection>
 
      <LegalSection number="2" title="Description of Service">
        <p>Durga Gairhe provides professional web development, software development, and technical consulting. Services include full-stack development, mobile apps, system architecture, code review, educational content, and open source contributions. We may modify or discontinue any aspect at any time.</p>
      </LegalSection>
 
      <LegalSection number="3" title="User Responsibilities">
        <p>You agree to provide accurate information, use services lawfully, respect intellectual property, not attempt unauthorized access, and comply with all applicable laws. Violations may result in immediate termination and potential legal action.</p>
      </LegalSection>
 
      <LegalSection number="4" title="Intellectual Property">
        <p><Highlight>Client work:</Highlight> IP transfers to the client upon full payment unless stated otherwise.</p>
        <p><Highlight>Open source:</Highlight> Some work is under open source licenses — see each project's terms.</p>
        <p><Highlight>Educational content:</Highlight> Blog posts and tutorials remain our IP but may be shared with proper attribution.</p>
      </LegalSection>
 
      <LegalSection number="5" title="Service Availability">
        <p>We strive for high availability but cannot guarantee uninterrupted access. Temporary downtime may occur due to maintenance, technical issues, or force majeure. We are not liable for losses from service interruptions.</p>
      </LegalSection>
 
      <LegalSection number="6" title="Payment Terms">
        <p>Payment schedules are set per contract. Late payments may result in service suspension. Refunds are handled case-by-case. All payments are in USD unless otherwise specified.</p>
      </LegalSection>
 
      <LegalSection number="7" title="Privacy">
        <p>Data collection and use is governed by our <a href="/privacy-policy" className="text-secondary-600 dark:text-secondary-400 hover:underline">Privacy Policy</a>, incorporated into these Terms by reference.</p>
      </LegalSection>
 
      <LegalSection number="8" title="Limitation of Liability">
        <p>To the fullest extent permitted by law, Durga Gairhe is not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount you paid for the specific service in question.</p>
      </LegalSection>
 
      <LegalSection number="9" title="Indemnification">
        <p>You agree to indemnify and hold harmless Durga Gairhe from claims arising from your use of our services, your violation of these Terms, or your violation of any third-party rights.</p>
      </LegalSection>
 
      <LegalSection number="10" title="Termination">
        <p>We may terminate or suspend access without prior notice for breach of these Terms, illegal activity, IP violations, or abusive behavior. Provisions that should survive termination will remain in effect.</p>
      </LegalSection>
 
      <LegalSection number="11" title="Governing Law">
        <p>These Terms are governed by the laws of Nepal. Disputes will be resolved first by negotiation, then arbitration in Kathmandu, then the courts of Nepal.</p>
      </LegalSection>
 
      <LegalSection number="12" title="Changes to Terms">
        <p>We may modify these Terms at any time. Material changes will be communicated via email or a site notice. Continued use constitutes acceptance.</p>
      </LegalSection>
 
      <LegalSection number="13" title="Severability">
        <p>If any provision is found unenforceable, it will be limited to the minimum extent necessary, and the remaining Terms will remain in full effect.</p>
      </LegalSection>
 
      <LegalSection number="14" title="Contact">
        <ContactBox>
          <p className="text-sm font-semibold text-stone-900 dark:text-white mb-3">Questions about these Terms?</p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
            Email:{" "}
            <a href="mailto:legal@durgagairhe.com.np" className="text-secondary-600 dark:text-secondary-400 hover:underline">
              legal@durgagairhe.com.np
            </a>
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">We respond within 48 hours.</p>
        </ContactBox>
      </LegalSection>
    </LegalPage>
  </>
);
export default TermsOfService;
