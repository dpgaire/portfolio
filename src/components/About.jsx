import { Code, Zap } from "lucide-react";
import { motion } from 'framer-motion';


const About = () => (
  <section id="about" className="py-20 bg-white dark:bg-gray-900 relative">
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 dark:to-transparent -z-10"></div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Passionate developer creating exceptional digital experiences
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
      </div>
      {/* <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full h-64  rounded-2xl p-8"
          >
            <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-xl">
              <Code size={80} className="text-white" />
             
            </div>
 <img alt="profile" className=" h-full bg-cover" src="https://avatars.githubusercontent.com/u/48995103?s=400&u=bbcb7b8f5ccda2cc314d8212016b26843fa6d9fd&v=4" width={80} height={80}/>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full animate-spin-slow">
              <div className="bg-white dark:bg-gray-900 p-2 rounded-full">
                <Zap size={24} className="text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Senior Frontend Developer with{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              5+ years
            </strong>{" "}
            of experience crafting exceptional digital experiences. Currently
            leading frontend development at{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              Moru Digital Wallet
            </strong>
            , where I architect scalable solutions that serve thousands of users
            daily.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            My expertise spans across modern web technologies, desktop
            applications, and mobile development. I'm passionate about building
            tools that solve real problems—from rich text editors and VS Code
            extensions to AI-powered automation agents.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-inner">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Projects Delivered
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-inner">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                5+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
  {/* Left Section with Code Icon and Image */}
  <div>
    <motion.div
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative w-full max-w-sm mx-auto h-64 rounded-2xl"
    >
      {/* Gradient Circle with Icon */}
      {/* <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center shadow-xl">
        <Code size={64} className="text-white" />
      </div> */}

      {/* Profile Image - Positioned for overlap */}
      <img
        alt="profile"
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-72 h-72 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg"
        src="https://avatars.githubusercontent.com/u/48995103?s=400&u=bbcb7b8f5ccda2cc314d8212016b26843fa6d9fd&v=4"
      />

      {/* Spinning Icon Badge */}
      <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full animate-spin-slow">
        <div className="bg-white dark:bg-gray-900 p-2 rounded-full">
          <Zap size={20} className="text-blue-600" />
        </div>
      </div>
    </motion.div>
  </div>

  {/* Right Section - Description */}
  <div className="space-y-6">
    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      Senior Frontend Developer with{" "}
      <strong className="text-blue-600 dark:text-blue-400">5+ years</strong> of experience crafting exceptional digital experiences. Currently leading frontend development at{" "}
      <strong className="text-blue-600 dark:text-blue-400">Moru Digital Wallet</strong>, where I architect scalable solutions that serve thousands of users daily.
    </p>
    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      My expertise spans across modern web technologies, desktop applications, and mobile development. I'm passionate about building tools that solve real problems—from rich text editors and VS Code extensions to AI-powered automation agents.
    </p>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-4 pt-6">
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-inner">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Projects Delivered</div>
      </div>
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-inner">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5+</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
      </div>
    </div>
  </div>
</div>

    </div>
  </section>
);

export default About;