'use client';
import React, { useState } from 'react';
import styles from "./jobs.module.scss";
import Button from '@/components/Reusables/Button/Button';
import Finder from '@/components/Finder/Finder';
import useJobStore from '@/utils/store';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';

export default function Jobs() {
  const router = useRouter()
  const {jobs,setJobs,setCurrentJob} = useJobStore()
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (job_details)=>{
    setCurrentJob(job_details);
    router.push("/ai-resume")
  }
  return(
    <div>
      <Navbar/>
      <Finder setResult={setJobs} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        jobs?.total_jobs > 0 && (
          jobs.jobs.map((job, i) => (
            <div key={i} className={styles.card}>
              <h2>{job.job_title}</h2>
              <h3>{job.company}</h3>
              <p><strong>Summary:</strong> {job.summary}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <a href={job.link} target="_blank" rel="noopener noreferrer">View Job Details</a>
              
              <div className="job-description">
                <h4>Job Description</h4>
                <p>{job.detailed_info.job_description}</p>
              </div>

              <div className="key-details">
                <h4>Key Details</h4>
                <ul>
                  {Object.entries(job.detailed_info.key_details).map(([key, value], idx) => (
                    <li key={idx}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </div>

              <div className="skills">
                <h4>Skills</h4>
                <ul>
                  {job.detailed_info.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
              
              <p><strong>Job Posted By:</strong> {job.detailed_info.job_posted_by}</p>
              <Button text="Generate Resume" 
              gradient="linear-gradient(90deg, rgb(4, 4, 153) 0%, rgb(47, 8, 116) 58%, rgb(0, 11, 219) 100%)" 
              onClick={()=>handleGenerate(job)}
              />
            </div>
          ))
        )
      )}
    </div>
    </div>
  );
}
