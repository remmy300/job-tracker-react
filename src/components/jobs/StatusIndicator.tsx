import React from 'react'
import type { JobStatus,Job } from '../../types/jobs'

const StatusIndicator = ({jobs}:{jobs:Job[]}) => {
    const statusCounts = jobs.reduce((acc,job) =>{
        acc[job.status] = (acc[job.status] || 0) + 1
        return acc
    },{} as Record<JobStatus,number>)

    const allStatuses: JobStatus[] = [
    "Bookmarked", 
    "Applying", 
    "Applied", 
    "Interviewing", 
    "Negotiating", 
    "Accepted"
  ];

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      {allStatuses.map((status) => (
        <div key={status} className="flex items-center gap-1">
          <span className="font-medium">{status}:</span>
          <span className="text-gray-600">
            {statusCounts[status] || "--"}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StatusIndicator