import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

// --- 1. GPA Calculator ---
export const GPACalculatorView: React.FC = () => {
  const [courses, setCourses] = useState([
    { id: '1', name: 'Data Structures', gradePoint: 10, credits: 4 },
    { id: '2', name: 'Database Systems', gradePoint: 9, credits: 3 },
    { id: '3', name: 'Web Engineering', gradePoint: 10, credits: 3 },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: `Subject ${courses.length + 1}`, gradePoint: 8, credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = courses.reduce((sum, c) => sum + (c.gradePoint * c.credits), 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="max-w-3xl mx-auto glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Semester Course List</h3>
        <button onClick={addCourse} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold">
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="space-y-3">
        {courses.map((course, idx) => (
          <div key={course.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <input
              type="text" value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[idx].name = e.target.value;
                setCourses(next);
              }}
              className="flex-1 glass-input py-1.5 text-xs font-semibold"
            />
            <select
              value={course.gradePoint}
              onChange={(e) => {
                const next = [...courses];
                next[idx].gradePoint = Number(e.target.value);
                setCourses(next);
              }}
              className="glass-input py-1.5 text-xs"
            >
              <option value={10}>O (10 Points)</option>
              <option value={9}>A+ (9 Points)</option>
              <option value={8}>A (8 Points)</option>
              <option value={7}>B+ (7 Points)</option>
              <option value={6}>B (6 Points)</option>
              <option value={5}>C (5 Points)</option>
            </select>
            <input
              type="number" value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[idx].credits = Number(e.target.value);
                setCourses(next);
              }}
              placeholder="Credits"
              className="w-20 glass-input py-1.5 text-xs text-center"
            />
            <button onClick={() => removeCourse(course.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-brand-600 text-white flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-white/80 font-bold block">Semester GPA</span>
          <span className="text-4xl font-black">{gpa.toFixed(2)} / 10.0</span>
        </div>
        <div className="text-right text-xs text-white/80">
          <div>Total Credits: {totalCredits}</div>
          <div>Grade Points: {totalPoints}</div>
        </div>
      </div>
    </div>
  );
};

// --- 2. CGPA Calculator ---
export const CGPACalculatorView: React.FC = () => {
  const [semesters, setSemesters] = useState([
    { id: '1', name: 'Semester 1', gpa: 8.8, credits: 24 },
    { id: '2', name: 'Semester 2', gpa: 9.2, credits: 24 },
    { id: '3', name: 'Semester 3', gpa: 9.0, credits: 22 },
  ]);

  const addSem = () => {
    setSemesters([...semesters, { id: Date.now().toString(), name: `Semester ${semesters.length + 1}`, gpa: 8.5, credits: 24 }]);
  };

  const removeSem = (id: string) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const weightedGPA = semesters.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
  const cgpa = totalCredits > 0 ? weightedGPA / totalCredits : 0;
  const percentage = (cgpa * 9.5).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Semester History</h3>
        <button onClick={addSem} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold">
          <Plus className="w-4 h-4" /> Add Semester
        </button>
      </div>

      <div className="space-y-3">
        {semesters.map((sem, idx) => (
          <div key={sem.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <input
              type="text" value={sem.name}
              onChange={(e) => {
                const next = [...semesters];
                next[idx].name = e.target.value;
                setSemesters(next);
              }}
              className="flex-1 glass-input py-1.5 text-xs font-semibold"
            />
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">GPA:</span>
              <input
                type="number" step="0.01" value={sem.gpa}
                onChange={(e) => {
                  const next = [...semesters];
                  next[idx].gpa = Number(e.target.value);
                  setSemesters(next);
                }}
                className="w-20 glass-input py-1.5 text-xs text-center font-bold"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Credits:</span>
              <input
                type="number" value={sem.credits}
                onChange={(e) => {
                  const next = [...semesters];
                  next[idx].credits = Number(e.target.value);
                  setSemesters(next);
                }}
                className="w-20 glass-input py-1.5 text-xs text-center"
              />
            </div>
            <button onClick={() => removeSem(sem.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-white/80 font-bold block">Overall CGPA</span>
          <span className="text-4xl font-black">{cgpa.toFixed(2)}</span>
        </div>
        <div className="text-right text-xs text-white/80">
          <div>Est. Score: <strong>{percentage}%</strong></div>
          <div>Total Credits: <strong>{totalCredits}</strong></div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Attendance Calculator ---
export const AttendanceCalculatorView: React.FC = () => {
  const [attended, setAttended] = useState<number>(42);
  const [totalClasses, setTotalClasses] = useState<number>(50);
  const [targetPercent, setTargetPercent] = useState<number>(75);

  const currentPercent = totalClasses > 0 ? (attended / totalClasses) * 100 : 0;

  let statusText = '';
  if (currentPercent >= targetPercent) {
    const safeBunks = Math.floor((attended - (targetPercent / 100) * totalClasses) / (targetPercent / 100));
    statusText = `🎉 You can safely bunk ${Math.max(0, safeBunks)} upcoming classes and maintain ${targetPercent}%!`;
  } else {
    const required = Math.ceil(((targetPercent / 100) * totalClasses - attended) / (1 - targetPercent / 100));
    statusText = `⚠️ You must attend the next ${Math.max(0, required)} consecutive classes to reach ${targetPercent}%!`;
  }

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Attended Classes</label>
          <input type="number" value={attended} onChange={(e) => setAttended(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Total Conducted</label>
          <input type="number" value={totalClasses} onChange={(e) => setTotalClasses(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Target Attendance (%)</label>
          <input type="number" value={targetPercent} onChange={(e) => setTargetPercent(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 text-center space-y-2">
        <span className="text-xs font-bold text-gray-500 uppercase">Current Attendance</span>
        <div className={`text-4xl font-black ${currentPercent >= targetPercent ? 'text-emerald-500' : 'text-rose-500'}`}>
          {currentPercent.toFixed(1)}%
        </div>
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{statusText}</p>
      </div>
    </div>
  );
};

// --- 4. Marks Calculator ---
export const MarksCalculatorView: React.FC = () => {
  const [obtainedMarks, setObtainedMarks] = useState<number>(435);
  const [totalMarks, setTotalMarks] = useState<number>(500);

  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Marks Obtained</label>
          <input type="number" value={obtainedMarks} onChange={(e) => setObtainedMarks(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Total Max Marks</label>
          <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-brand-600 text-white text-center shadow-xl space-y-1">
        <span className="text-xs uppercase font-bold text-white/80">Percentage Score</span>
        <div className="text-4xl font-black">{percentage.toFixed(2)}%</div>
      </div>
    </div>
  );
};

// --- 5. Grade Calculator ---
export const GradeCalculatorView: React.FC = () => {
  const [score, setScore] = useState<number>(88);

  let letter = 'F';
  let gpaScale = '0.0';
  if (score >= 90) { letter = 'A+ (Outstanding)'; gpaScale = '4.0'; }
  else if (score >= 80) { letter = 'A (Excellent)'; gpaScale = '3.7'; }
  else if (score >= 70) { letter = 'B (Good)'; gpaScale = '3.0'; }
  else if (score >= 60) { letter = 'C (Average)'; gpaScale = '2.0'; }
  else if (score >= 50) { letter = 'D (Pass)'; gpaScale = '1.0'; }

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold mb-1">Enter Score / Percentage</label>
        <input type="number" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full glass-input" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">Letter Grade</span>
          <span className="text-2xl font-black">{letter}</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">4.0 GPA Scale</span>
          <span className="text-2xl font-black">{gpaScale}</span>
        </div>
      </div>
    </div>
  );
};

// --- 6. Study Time Calculator ---
export const StudyTimeCalculatorView: React.FC = () => {
  const [totalSubjects, setTotalSubjects] = useState<number>(4);
  const [availableHours, setAvailableHours] = useState<number>(6);

  const hoursPerSub = totalSubjects > 0 ? availableHours / totalSubjects : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Total Subjects to Study</label>
          <input type="number" value={totalSubjects} onChange={(e) => setTotalSubjects(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Total Free Hours Today</label>
          <input type="number" value={availableHours} onChange={(e) => setAvailableHours(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Recommended Allocation</span>
        <div className="text-3xl font-black mt-1">{hoursPerSub.toFixed(1)} Hours / Subject</div>
        <p className="text-xs text-white/80 mt-2">Includes 10-min Pomodoro break per subject session</p>
      </div>
    </div>
  );
};
