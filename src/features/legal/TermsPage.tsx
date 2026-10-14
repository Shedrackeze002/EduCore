import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, LegalLayout, Section } from './LegalLayout.tsx';

const Mail = () => (
  <a className="text-brand hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>
);

/** Gradileo's terms of service, at /terms. */
export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="October 14, 2026"
      intro={
        <p>
          These terms explain the rules for using Gradileo (gradileo.com), an online mathematics platform for teachers and students from Grade 5 to Grade 12.
          By creating an account or using Gradileo, you agree to these terms and to our{' '}
          <Link className="text-brand hover:underline" to="/privacy">
            Privacy Policy
          </Link>
          . If you use Gradileo on behalf of a school, you confirm that you are allowed to accept these terms for it.
        </p>
      }
    >
      <Section id="who" title="1. Who can use Gradileo">
        <p>
          Gradileo is for teachers, students and schools. Students who are minors where they live should use Gradileo through their school or a teacher’s
          class, or with the permission of a parent or guardian.
        </p>
      </Section>

      <Section id="accounts" title="2. Your account">
        <ul>
          <li>Give accurate information when you create an account, and keep it up to date.</li>
          <li>Keep your password private. You are responsible for what happens in your account.</li>
          <li>Teacher accounts are reviewed and approved by Gradileo’s administrators.</li>
          <li>Teachers who create student logins are responsible for sharing them safely with their students.</li>
          <li>
            Tell us at <Mail /> if you think someone else is using your account.
          </li>
        </ul>
      </Section>

      <Section id="use" title="3. Using Gradileo responsibly">
        <p>When you use Gradileo, do not:</p>
        <ul>
          <li>break the law, or the rules of your school or class, including its rules on academic honesty;</li>
          <li>harass, bully or threaten anyone, or post content that is hateful, violent, sexual or otherwise harmful;</li>
          <li>share another person’s personal information without permission;</li>
          <li>try to get into another person’s account, or into data you are not allowed to see;</li>
          <li>disrupt or overload Gradileo, get around its security, or use automated tools to copy its content;</li>
          <li>pretend to be someone else, such as a teacher you are not.</li>
        </ul>
      </Section>

      <Section id="your-content" title="4. Your work and content">
        <p>
          You keep ownership of what you create in Gradileo, such as your answers, whiteboard drawings, class materials and messages. You give Gradileo
          permission to store, process and display that content only as needed to run the service, for example to grade work and show a student’s work
          to their teacher.
        </p>
        <p>
          If you suggest an edit to a Gradileo lesson and an administrator approves it, you allow Gradileo to use your suggestion in its lessons for all
          users.
        </p>
      </Section>

      <Section id="our-content" title="5. Gradileo’s lessons and software">
        <p>
          Gradileo’s lessons, questions, explainer videos, designs and software belong to Gradileo. Teachers and students may use them through Gradileo for
          teaching and learning, including showing them in class. Please do not copy, sell or republish them elsewhere without our permission. Explainer
          videos hosted on YouTube are also subject to YouTube’s terms.
        </p>
      </Section>

      <Section id="ai" title="6. Automatic grading and AI suggestions">
        <p>
          Gradileo grades many answers automatically, and its AI teaching assistant suggests insights and next steps. These tools can make mistakes.
          Teachers should review grades and suggestions and use their own judgement, and students can ask their teacher about a grade.
        </p>
      </Section>

      <Section id="service" title="7. Availability and changes">
        <p>
          Gradileo is currently free to use. We work to keep it available and accurate, but it may sometimes be unavailable, and we may change, add or
          remove features. If we ever introduce paid features, we will tell you before you are charged anything.
        </p>
      </Section>

      <Section id="ending" title="8. Ending your use">
        <p>
          You can stop using Gradileo at any time, and you can ask us to delete your account by emailing <Mail />. We may suspend or close an account that
          breaks these terms or puts other users at risk. Where it is reasonable, we will tell you why.
        </p>
      </Section>

      <Section id="warranty" title="9. Disclaimer">
        <p>
          Gradileo is provided “as is” and “as available”. To the extent the law allows, we make no promises that it will be uninterrupted or free of
          errors, or that it will meet every need.
        </p>
      </Section>

      <Section id="liability" title="10. Limitation of liability">
        <p>
          To the extent the law allows, Gradileo is not responsible for indirect or consequential losses, such as lost data or lost opportunities, that come
          from using or being unable to use the service. Nothing in these terms limits any rights you have under laws that cannot be changed by agreement.
        </p>
      </Section>

      <Section id="changes" title="11. Changes to these terms">
        <p>
          If we change these terms, we will update the date at the top of this page. If a change is significant, we will also tell you in Gradileo or by
          email before it takes effect. If you keep using Gradileo after a change takes effect, you accept the new terms.
        </p>
      </Section>

      <Section id="contact" title="12. Contact us">
        <p>
          Questions about these terms: email <Mail />.
        </p>
      </Section>
    </LegalLayout>
  );
}
