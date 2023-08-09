import React from 'react'
import { connect } from 'react-redux'
import './jobList.css'
import Job from '../Job/job'
import Pagination from '../Pagination/pagination'
import Loader from '../Loader/loader'
import {fetchJobs, fetchMoreJobs} from '../../actions'
import { baseUrl } from '../../utils/utils'

class JobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPage: 1,
        };
      }

      setCurrentPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
      };
    componentDidMount() {
        this.props.getJobs(baseUrl)
    }
    loadMore() {
        let url
        const pageNum = Math.ceil(this.props.jobs.length / 50.0) + 1
        const currentFilter = this.props.currentFilter
        if (currentFilter.type === 'description') {
            url = `${baseUrl}?description=${currentFilter.name}&page=${pageNum}`
        }
        else if (currentFilter.type === 'location') {
            url = `${baseUrl}?location=${currentFilter.name}&page=${pageNum}`
        }
        else {
            url = `${baseUrl}?page=${pageNum}`
        }
        this.props.getMoreJobs(url)
    }
    render() {
        const { currentPage } = this.state;
        const { jobs, isJobsLoading, currentFilter } = this.props;
      
        // Pagination variables
        const jobPerPage = 5; // Number of jobs to display per page
        const totalJob = jobs.length;
        const indexOfLastJob = currentPage * jobPerPage;
        const indexOfFirstJob = indexOfLastJob -jobPerPage;
        const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

        // const jobs = this.props.jobs
        const jobList = currentJobs.map((job) => <Job key={job.id} job={job} />);
        const loader = this.props.isJobsLoading ? <Loader/> : null
        const canLoadMore = (jobs.length > 0) && (jobs.length % 50 === 0)
        const name = this.props.currentFilter.name 
        const title = name ? `(${name})`: ''

        console.log(jobs)

        return (
            <div className="job-list">
                <h3 className="job-list__text"> Top Jobs{title} </h3>
                {loader}
                <div className="job-listing">
                    {jobList}
                    {canLoadMore && 
                        <button className="load-more" onClick={()=> this.loadMore()}>
                            More Jobs
                        </button>
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={this.setCurrentPage}
                    jobPerPage={jobPerPage}
                    totalJob={totalJob}
                />
            </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        jobs: state.jobs,
        isJobsLoading: state.jobsIsLoading,
        hasErrored: state.jobsFetchError,
        currentFilter: state.currentFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJobs: (url) => dispatch(fetchJobs(url)),
        getMoreJobs: (url) => dispatch(fetchMoreJobs(url))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobList)