import { Github, Linkedin, Mail } from "lucide-react";
import Card from "./ui/Card";
import ContactForm from "./ui/ContactForm";

const Contact = () => (
  <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative">
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 dark:to-transparent -z-10"></div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Let's discuss your next project or potential collaboration
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Card className="h-full">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send me a message</h3>
              <ContactForm />
            </div>
          </Card>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let's connect</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'm always interested in hearing about new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:gairhedurga13@email.com" 
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm">gairhedurga13@email.com</div>
                </div>
              </a>
              <a 
                href="https://www.linkedin.com/in/durga-gairhe/" 
                target="_blank"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Linkedin size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm">https://www.linkedin.com/in/durga-gairhe/</div>
                </div>
              </a>
              <a 
                target="_blank"
                href="https://github.com/dpgaire" 
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Github size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm">github.com/dpgaire</div>
                </div>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Status</h4>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-300">Available for freelance projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;