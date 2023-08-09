import React from 'react';
import './jobDetail.css';
import { connect } from 'react-redux';
import { fetchJob } from '../../actions';

class JobDetail extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const url = `http://localhost:3000/jobs/${id}`;

    this.props.getJob(id, url);
  }

  render() {
    const job = this.props.job;

    return (
      <div className="job-detail">
        <h3 className="job-detail__role">{job.title}</h3>
        <p className="job-detail__company">{job.company}</p>
        <a
          className="btn"
          href={job.company_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply for this job
        </a>
        <h3 className="job-detail__text">Description</h3>
        <div className="job-detail__description">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>
        <div className="find-more">
          <a
            className="btn-line"
            href={job.company_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            to company site &rarr;
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.job,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJob: (id, url) => dispatch(fetchJob(id, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);