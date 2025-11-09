// We have REMOVED the 'import styles from ...' line

async function getJobs() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/jobs/', {
      cache: 'no-store',
    });

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

export default async function Home() {
  const jobs = await getJobs();

  return (
    // We are using plain HTML tags like <main>, <h1>, <div>
    // All 'className' props have been removed.
    <main>
      <h1>Welcome to your Job Board</h1>

      <div>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            // Using a simple <div> for the card
            <div key={job.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h2>{job.title}</h2>
              <p>{job.company_name} - {job.location}</p>
              <p>{job.description.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>No approved jobs found. Check back later!</p>
        )}
      </div>
    </main>
  );
}