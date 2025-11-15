import React from 'react';
import styles from './page.module.css';

async function getJobs(url: string) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    } else {
      console.error("Failed to fetch jobs, server responded with:", res.status);
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching jobs:", error);
    return [];
  }
}

interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  description: string;
}

export default function Home({ searchParams: searchParamsPromise }) {
  
  const searchParams = React.use(searchParamsPromise);

  const locationQuery = searchParams?.location || '';
  const searchQuery = searchParams?.search || '';

  const apiURL = new URL('http://127.0.0.1:8000/api/jobs/');
  if (locationQuery) {
    apiURL.searchParams.append('location', locationQuery);
  }
  if (searchQuery) {
    apiURL.searchParams.append('search', searchQuery);
  }

  const jobsPromise = getJobs(apiURL.toString());
  const jobs: Job[] = React.use(jobsPromise);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to your Job Board</h1>

      <form method="GET" action="/" className={styles.searchForm}>
        <input
          type="text"
          name="search"
          placeholder="Search for a job..."
          defaultValue={searchQuery}
          className={styles.searchInput}
        />
        <input
          type="text"
          name="location"
          placeholder="Location..."
          defaultValue={locationQuery}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <div className={styles.jobList}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <h2>{job.title}</h2>
              <p className={styles.companyLocation}>
                {job.company_name} - {job.location}
              </p>
              <p>{job.description.substring(0, 150)}...</p>
            </div>
          ))
        ) : (
          <p className={styles.noJobsText}>
            No jobs found matching your search.
          </p>
        )}
      </div>
    </main>
  );
}