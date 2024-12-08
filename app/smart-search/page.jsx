'use client';
import React, { useState } from 'react';
import styles from "./jobs.module.scss";
import Button from '@/components/Reusables/Button/Button';

export default function Jobs() {
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkParams = ()=>{
    if( skill==="" || experience==="" || location==="") return false;
    return true;
  }

  const handleSearch = async () => {
    setIsLoading(true); // Start loading
    if( !checkParams()) {
      console.log("add params")
      return;
    };
    try {
      const queryParams = new URLSearchParams();
      if (skill) queryParams.append('skill', skill);
      if (experience) queryParams.append('experience', experience);
      if (location) queryParams.append('location', location);

      const url = `/api/jobs?${queryParams.toString()}`;
      console.log('API Request URL:', url);

      const response = await fetch(url);
      const json = await response.json();

      console.log('Jobs Data:', json);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className={styles.jobsContainer}>
      <label htmlFor="Skill">
        Skill
        <input
          placeholder="Find jobs you are interested in"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </label>

      <label htmlFor="Experience">
        Experience
        <input
          placeholder="Enter experience in years"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </label>

      <label htmlFor="Location">
        Location
        <input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <div>
        <Button
          onClick={handleSearch}
          disabled={isLoading} 
          className={styles.searchButton} 
          text={isLoading ? 'Loading...' : 'Search'}
          gradient="linear-gradient(90deg, rgb(4, 4, 153) 0%, rgb(47, 8, 116) 58%, rgb(0, 11, 219) 100%)"
          textColor='white'
        >
        </Button>
      </div>
    </div>
  );
}
