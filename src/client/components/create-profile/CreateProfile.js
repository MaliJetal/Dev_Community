import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubusername: "",
      twitter: "",
      facebook: "",
      youtube: "",
      instagram: "",
      linkedin: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.toggleSocialInputs = this.toggleSocialInputs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.errors !== nextProps.errors) {
  //     return {
  //       displaySocialInputs: false,
  //       handle: "",
  //       company: "",
  //       website: "",
  //       location: "",
  //       status: "",
  //       skills: "",
  //       bio: "",
  //       githubusername: "",
  //       twitter: "",
  //       facebook: "",
  //       youtube: "",
  //       instagram: "",
  //       linkedin: "",
  //       errors: nextProps.errors,
  //       // this.setState({ errors: nextProps.errors });
  //     };
  //   }
  //   return null;
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleSocialInputs() {
    this.setState((prevState) => ({
      displaySocialInputs: !prevState.displaySocialInputs,
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      github: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab faa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab faa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab faa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab faa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab faa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }
    return (
      <div className="CreateProfile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Tour Profile.</h1>
              <p className="lead text-center">
                Let's get some lead information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name,
                  nickname"
                  disabled={false}
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us an idea where you are at in your career."
                  options={[
                    { label: "online", value: "online" },
                    { label: "offline", value: "offline" },
                  ]}
                  disabled={true}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for."
                  disabled={false}
                />
                <TextFieldGroup
                  placeholder="* Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one."
                  disabled={false}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (e.g. Boston, MA)"
                  disabled={false}
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma seperated values(eg.
                  HTML,CSS,JavaScript"
                  disabled={false}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github Link, include your username."
                  disabled={false}
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us little about yourself."
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => this.toggleSocialInputs()}
                    className="btn btn-light"
                  >
                    Add Social Network
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="Submit"
                  value="Submit"
                  className="btn btn-info btn-block m-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
