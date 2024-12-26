'use client'
import React, { useEffect, useState } from 'react'
import styles from "./resume.module.scss";
import useJobStore from '@/utils/store';
import Navbar from '@/components/Navbar/Navbar';

export default function AiResume() {
  const {currentJob, customDescription, setGeneratedResume, generatedResume} = useJobStore();
  const [loading, setIsLoading] = useState(false);

  // Function to generate resume
  const generate = async (job_details) => {
    const url = "/api/resume";
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {Navbar
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job_details),
      });
      const json = await response.json();
      console.log(json);
      setGeneratedResume(json.generated_resume); // Save the resume data in the store
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const getResumeDetails = async () => {
      if (currentJob) {
        generate(currentJob); // Generate resume based on the current job details
      }
    }
    getResumeDetails();
  }, [currentJob]);

  // Rendering the resume content once it's available
  return (
    <div className={styles.resumeContainer}>
       <Navbar/>
      <h1>Custom Resume for Your Job Description</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.resumeContent}>
            {generatedResume ? (
              <>
                <h2>Summary</h2>
                <p>{generatedResume.summary}</p>

                <h2>Skills</h2>
                <div>
                  <h3>Soft Skills</h3>
                  <ul>
                    {generatedResume.skills?.soft_skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                  <h3>Technical Skills</h3>
                  <ul>
                    {generatedResume.skills?.technical_skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <h2>Experience</h2>
                {generatedResume.experience.map((exp, index) => (
                  <div key={index}>
                    <h3>{exp.job_title} at {exp.company}</h3>
                    <p><strong>Duration:</strong> {exp.start_date} - {exp.end_date}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}

                <h2>Education</h2>
                {generatedResume.education.map((edu, index) => (
                  <div key={index}>
                    <h3>{edu.degree} - {edu.institution}</h3>
                    <p><strong>Duration:</strong> {edu.start_date} - {edu.end_date}</p>
                    <p>{edu.description}</p>
                  </div>
                ))}

                <h2>Projects</h2>
                {generatedResume.projects.map((project, index) => (
                  <div key={index}>
                    <h3>{project.project_title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}

                {generatedResume.certifications.length>0 && (
                  <>  
                  <h2>Certifications</h2>
                  <ul>
                    {generatedResume.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                  </>
                )}

                <h2>Extra-Curricular Activities</h2>
                <ul>
                  {generatedResume.extra_curricular.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No resume generated yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
