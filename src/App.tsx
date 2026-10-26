import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CoursesPage } from './components/CoursesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LiveChatBox } from './components/LiveChatBox';
import { EnrollModal } from './components/EnrollModal';
import { SILPHOR_COURSES_DATA, Course } from './data/silphorData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'about' | 'contact'>('home');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<string>('vlsi-pd');
  const [enrollModalOpen, setEnrollModalOpen] = useState<boolean>(false);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);

  const handleOpenEnroll = (course?: Course) => {
    setEnrollingCourse(course || SILPHOR_COURSES_DATA[0]);
    setEnrollModalOpen(true);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseForDetail(course.id);
    setActiveTab('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#00828A]/20 selection:text-[#0B2545]">
      {/* Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnroll={() => handleOpenEnroll()}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={setActiveTab}
            onSelectCourse={handleSelectCourse}
            onEnrollCourse={handleOpenEnroll}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesPage
            onEnrollCourse={handleOpenEnroll}
            selectedCourseId={selectedCourseForDetail}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Floating WhatsApp Action Button (+91 7829455663) */}
      <FloatingWhatsApp />

      {/* Interactive Counselor Chat Box */}
      <LiveChatBox />

      {/* Course Enrollment / Admission Lead Modal */}
      <EnrollModal
        course={enrollingCourse}
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
      />
    </div>
  );
}
