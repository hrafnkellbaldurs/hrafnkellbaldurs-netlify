import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Experience from '../components/Experience'
import { ReactComponent as DownloadIcon } from '../assets/images/download.svg'
import SkillGrid from '../components/SkillGrid'

class IndexPage extends React.PureComponent {
    mapData(data) {
        const {
            aboutMe,
            workExperience,
            educationExperience,
            skills
        } = data

        const pluckEdgeNodes = data => data.edges.map(x => x.node)

        return {
            aboutMe: pluckEdgeNodes(aboutMe)[0],
            workExperienceItems: pluckEdgeNodes(workExperience),
            educationExperienceItems: pluckEdgeNodes(educationExperience),
            skills: pluckEdgeNodes(skills)
        }
    }

    render() {
        const {
            props,
            mapData,
            renderAboutSection: AboutSection,
            renderResumeSection: ResumeSection
        } = this

        const {
            aboutMe,
            workExperienceItems,
            educationExperienceItems,
            skills
        } = mapData(props.data)

        const aboutProps = {
            ...aboutMe
        }

        const resumeProps = {
            workExperienceItems,
            educationExperienceItems,
            skills
        }

        return (
            <Layout>
                <AboutSection { ...aboutProps }></AboutSection>
                <ResumeSection { ...resumeProps }></ResumeSection>
            </Layout>
        )
    }

    renderAboutSection(props) {
        const {
            title,
            description,
            urls,
            contactDetails,
            downloadResumeLabel
        } = props

        return (
            <Section id="about">
                <div className="row">

                    <div className="three columns">

                        <img className="profile-pic" src={ urls.profilePic.public } alt="" />
                    </div>

                    <div className="nine columns main-col">

                        <h2>{ title }</h2>

                        <p dangerouslySetInnerHTML={{ __html: description }}></p>

                        <div className="row">

                            <div className="columns contact-details">

                                <h2>{ contactDetails.label }</h2>
                                <p className="address">
                                    <span>{ contactDetails.name }</span><br/>
                                    <span>{ contactDetails.address }</span><br/>
                                    <span>{ contactDetails.zip } { contactDetails.city }, { contactDetails.country }</span><br/>
                                    <span>{ contactDetails.phone }</span><br/>
                                    <a style={{ color: 'inherit' }} href={`mailto:${ contactDetails.email }`} target="_top">
                                        { contactDetails.email }
                                    </a>
                                </p>

                            </div>

                            <div className="columns download">
                                <a href={ urls.portfolioPdf.public } className="button">
                                    <span style={{ display: 'flex', alignItems: 'center', 'justifyContent': 'center' }}>
                                        <DownloadIcon style={{ fontSize: '22px', marginRight: '5px', marginTop: '-5px' }}/>
                                        { downloadResumeLabel }
                                    </span>
                                </a>
                            </div>

                        </div>

                    </div>

                </div>
            </Section>
        )
    }

    renderResumeSection(props) {
        const {
            workExperienceItems,
            educationExperienceItems,
            skills
        } = props

        const renderExperience = (item, i) => {
            const {
                id,
                dataId,
                title,
                subtitle,
                startDate,
                endDate,
                description,
                logo
            } = item
            const icon = <img src={ logo.publicURL }></img>

            const props = {
                id,
                dataId,
                icon,
                title,
                subtitle,
                startDate,
                endDate,
                description
            }

            return <Experience key={ id } { ...props }/>
        }

        return (
            <Section id="resume">

                <div className="row work">

                    <div className="three columns header-col">
                        <h1><span>Experience</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        { workExperienceItems.map(renderExperience) }
                    </div>

                </div>

                <div className="row education">

                    <div className="three columns header-col">
                        <h1><span>Education</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        { educationExperienceItems.map(renderExperience) }
                    </div>

                </div>

                <div className="row skill">

                    <div className="three columns header-col">
                        <h1><span>Skills</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        <p>
                            I have experience with a broad field of front-end technologies and frameworks.
                        </p>
                        <SkillGrid items={ skills }></SkillGrid>
                    </div>

                </div>

            </Section>
        )
    }
}

export const query = graphql`
    query IndexPage {
        ...IndexPageFragment
    }
`

export default IndexPage