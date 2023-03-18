import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {createJobOpening} from '../actions/jobOpeningActions'
import { JOB_OPENING_CREATE_RESET } from '../constants/jobOpeningConstants'

const JobOpeningCreateScreen = ({history}) => {
    const dispatch = useDispatch()

    const [nameOftheCompany, setNameOftheCompany] = useState('')
    const [natureOfBusiness, setNatureOfBusiness] = useState('')
    const [typeOfJobOpening, setTypeOfJobOpening] = useState('')
    const [jobDesignation, setJobDesignation] = useState('')
    const [tentativeJoiningDate, setTentativeJoiningDate] = useState(Date.now())
    const [tentativeJobLocation, setTentativeJobLocation] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [minIntakeOfStudents, setMinIntakeOfStudents] = useState(0)
    const [maxIntakeOfStudents, setMaxIntakeOfStudents] = useState(0)
    const [bTechIT, setBTechIT] = useState(false)
    const [bTechITBI, setBTechITBI] = useState(false)
    const [bTechECE, setBTechECE] = useState(false)
    const [mTechIT, setMTechIT] = useState(false)
    const [mTechECE, setMTechECE] = useState(false)
    const [mTechDSA, setMTechDSA] = useState(false)
    const [mTechBI, setMTechBI] = useState(false)
    const [mba, setMba] = useState(false)
    const [bTechCTC, setBTechCTC] = useState('')
    const [bTechBasePay, setBTechBasePay] = useState('')
    const [bTechStocks, setBTechStocks] = useState('')
    const [bTechStockOptions, setBTechStockOptions] = useState('')
    const [bTechDetailedBreakDown, setBTechDetailedBreakDown] = useState('')
    const [mTechCTC, setMTechCTC] = useState('')
    const [mTechBasePay, setMTechBasePay] = useState('')
    const [mTechStocks, setMTechStocks] = useState('')
    const [mTechStockOptions, setMTechStockOptions] = useState('')
    const [mTechDetailedBreakDown, setMTechDetailedBreakDown] = useState('')
    const [relocationBenefits, setRelocationBenefits] = useState('')
    const [serviceBond, setServiceBond] = useState('')
    const [medicalRequirements, setMedicalRequirements] = useState('')
    const [tenthPercentage, setTenthPercentage] = useState(0)
    const [twelfthPercentage, setTwelfthPercentage] = useState(0)
    const [cgpa, setCgpa] = useState(0)
    const [aptitudeTest, setAptitudeTest] = useState(false)
    const [onlineTechnicalTest, setOnlineTechnicalTest] = useState(false)
    const [groupDiscussion, setGroupDiscussion] = useState(false)
    const [technicalInterviews, setTechnicalInterviews] = useState(false)
    const [hrInterviews, setHrInterviews] = useState(false)
    const [formDeadline, setFormDeadline] = useState(Date.now())
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const { recruiterInfo } = recruiterLogin

    const jobOpeningCreate = useSelector(state => state.jobOpeningCreate)
    const {loading, error, success, jobOpening} = jobOpeningCreate

    useEffect(() => {
        if(!recruiterInfo){
            history.push('/login')
        }
        if(success){
            dispatch({type: JOB_OPENING_CREATE_RESET})
            history.push('/recruiter')
        }
    }, [dispatch, success, recruiterInfo, history])

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const createJobOpeningHandler = (e) => {
        e.preventDefault()
        dispatch(createJobOpening(
            nameOftheCompany,
            natureOfBusiness,
            typeOfJobOpening,
            jobDesignation,
            tentativeJoiningDate,
            tentativeJobLocation,
            jobDescription,
            minIntakeOfStudents,
            maxIntakeOfStudents,
            bTechIT,
            bTechITBI,
            bTechECE,
            mTechIT,
            mTechECE,
            mTechDSA,
            mTechBI,
            mba,
            bTechCTC,
            bTechBasePay,
            bTechStocks,
            bTechStockOptions,
            bTechDetailedBreakDown,
            mTechCTC,
            mTechBasePay,
            mTechStocks,
            mTechStockOptions,
            mTechDetailedBreakDown,
            relocationBenefits,
            serviceBond,
            medicalRequirements,
            tenthPercentage,
            twelfthPercentage,
            cgpa,
            aptitudeTest,
            onlineTechnicalTest,
            groupDiscussion,
            technicalInterviews,
            hrInterviews,
            image,
            formDeadline
        ))
    }

    return (
        <>
            <Link to='/recruiter' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Create Job Opening</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={createJobOpeningHandler}>
                        <Form.Group controlId='nameOftheCompany'>
                            <Form.Label>Name of the Company</Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Enter Name of the Company' 
                                value={nameOftheCompany} 
                                onChange={(e) => setNameOftheCompany(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <p> </p>
                        
                        <Form.Group controlId='natureOfBusiness'>
                            <Form.Label>Nature of Business</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Nature of Business' 
                                value={natureOfBusiness} 
                                onChange={(e) => setNatureOfBusiness(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <p> </p>

                        <Form.Group controlId='image'>
                            <Form.Label>Company Logo</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL OR Upload an Image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.Control 
                                type='file'
                                id='image-file' 
                                label='Choose File' 
                                custom 
                                onChange={uploadFileHandler}>
                            </Form.Control>
                            {uploading && <Loader/>}
                        </Form.Group>
                        <p> </p>

                        <Row>
                            <Col>
                                <Form.Group controlId='typeOfJobOpening'>
                                    <Form.Label>Type of Job Opening</Form.Label>
                                    <Form.Control 
                                        as='select'
                                        className='form-select'
                                        value={typeOfJobOpening}
                                        onChange={(e) => setTypeOfJobOpening(e.target.value)}>
                                            <option key={'Select the Type'} value={'Select the Type'}>{'Select the Type'}</option>
                                            <option key={'Summer Internship'} value={'Summer Internship'}>{'Summer Internship'}</option>
                                            <option key={'6-Month Internship'} value={'6-Month Internship'}>{'6-Month Internship'}</option>
                                            <option key={'Full Time'} value={'Full Time'}>{'Full Time'}</option>
                                            <option key={'Full Time + 6-Month Internship'} value={'Full Time + 6-Month Internship'}>{'Full Time + 6-Month Internship'}</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='jobDesignation'>
                                    <Form.Label>Job Designation</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Job Designation' 
                                        value={jobDesignation} 
                                        onChange={(e) => setJobDesignation(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <p> </p>

                        <Form.Group controlId='jobDescription'>
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Job Description' 
                                value={jobDescription} 
                                onChange={(e) => setJobDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <p> </p>

                        <Form.Group controlId='tentativeJobLocation'>
                            <Form.Label>Tentative Job Location {'(add \'\',\'\' between locations if more than one)'}</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Job Locations' 
                                value={tentativeJobLocation} 
                                onChange={(e) => setTentativeJobLocation(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <p> </p>

                        <Form.Group controlId='tentativeJoiningDate'>
                            <Form.Label>Tentative Joining Date</Form.Label>
                            <Form.Control 
                                type='date' 
                                placeholder='Enter Tentative Joining Date' 
                                value={tentativeJoiningDate} 
                                onChange={(e) => setTentativeJoiningDate(e.target.value)}
                                >
                            </Form.Control>
                        </Form.Group>
                        <p> </p>

                        <Form.Group controlId='formDeadline'>
                            <Form.Label>Form Deadline</Form.Label>
                            <Form.Control 
                                type='datetime-local' 
                                placeholder='Enter Form Deadline' 
                                value={formDeadline} 
                                onChange={(e) => setFormDeadline(e.target.value)}
                                >
                            </Form.Control>
                        </Form.Group>
                        <h3> </h3>

                        <h4>Eligible Students</h4>
                        <h4> </h4>
                        <Form.Group controlId='bTechIT'>
                            <Form.Check 
                                type='checkbox' 
                                value={bTechIT} 
                                checked={bTechIT}
                                label='B.Tech. - 4 Year IT'
                                onChange={(e) => setBTechIT(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='bTechITBI'>
                            <Form.Check 
                                type='checkbox' 
                                value={bTechITBI} 
                                checked={bTechITBI}
                                label='B.Tech. - 4 Year IT-Business Informatics'
                                onChange={(e) => setBTechITBI(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='bTechECE'>
                            <Form.Check 
                                type='checkbox' 
                                value={bTechECE} 
                                checked={bTechECE}
                                label='B.Tech. - 4 Year ECE'
                                onChange={(e) => setBTechECE(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='mTechIT'>
                            <Form.Check 
                                type='checkbox' 
                                value={mTechIT} 
                                checked={mTechIT}
                                label='M.Tech. - 2 Year IT'
                                onChange={(e) => setMTechIT(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='mTechECE'>
                            <Form.Check 
                                type='checkbox' 
                                value={mTechECE} 
                                checked={mTechECE}
                                label='M.Tech. - 2 Year ECE'
                                onChange={(e) => setMTechECE(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='mTechDSA'>
                            <Form.Check 
                                type='checkbox' 
                                value={mTechDSA} 
                                checked={mTechDSA}
                                label='M.Tech. - 2 Year Data Science and Analytics'
                                onChange={(e) => setMTechDSA(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='mTechBI'>
                            <Form.Check 
                                type='checkbox' 
                                value={mTechBI} 
                                checked={mTechBI}
                                label='M.Tech. - 2 Year Bio-Informatics'
                                onChange={(e) => setMTechBI(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='mba'>
                            <Form.Check 
                                type='checkbox' 
                                value={mba} 
                                checked={mba}
                                label='MBA - 2 Year MBA'
                                onChange={(e) => setMba(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <h2> </h2>
                        <Row>
                            <h4>Eligibility Criteria</h4>
                            <h4> </h4>
                            <Col>
                                <Form.Group controlId='tenthPercentage'>
                                    <Form.Label>Minimum Percentage in X</Form.Label>
                                    <Form.Control 
                                        type='number' 
                                        placeholder='Enter Percentage' 
                                        value={tenthPercentage} 
                                        step='.1'
                                        onChange={(e) => setTenthPercentage(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='twelfthPercentage'>
                                    <Form.Label>Minimum Percentage in XII</Form.Label>
                                    <Form.Control 
                                        type='number' 
                                        placeholder='Enter Percentage' 
                                        value={twelfthPercentage} 
                                        step='.1'
                                        onChange={(e) => setTwelfthPercentage(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4> </h4>
                        <Form.Group controlId='cgpa'>
                            <Form.Label>Minimum CGPA in UG</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Enter CGPA out of 10' 
                                value={cgpa} 
                                step='.01'
                                onChange={(e) => setCgpa(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h3> </h3>
                        
                        <Row>
                            <h4>Expected Intake of Students</h4>
                            <h4> </h4>
                            <Col>
                                <Form.Group controlId='minIntakeOfStudents'>
                                    <Form.Label>Minimum</Form.Label>
                                    <Form.Control 
                                        type='number' 
                                        placeholder='Enter Minimum' 
                                        value={minIntakeOfStudents} 
                                        onChange={(e) => setMinIntakeOfStudents(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='maxIntakeOfStudents'>
                                    <Form.Label>Maximum</Form.Label>
                                    <Form.Control 
                                        type='number' 
                                        placeholder='Enter Max' 
                                        value={maxIntakeOfStudents} 
                                        onChange={(e) => setMaxIntakeOfStudents(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h3> </h3>

                        
                        <Row>
                            <h4>B.Tech. Compensation Details</h4>
                            <h4> </h4>
                            <Col>
                                <Form.Group controlId='bTechCTC'>
                                    <Form.Label>CTC</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter CTC' 
                                        value={bTechCTC} 
                                        onChange={(e) => setBTechCTC(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='bTechBasePay'>
                                    <Form.Label>Base Pay</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Base Pay' 
                                        value={bTechBasePay} 
                                        onChange={(e) => setBTechBasePay(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4> </h4>
                        <Row>
                            <Col>
                                <Form.Group controlId='bTechStocks'>
                                    <Form.Label>Stocks</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Stocks' 
                                        value={bTechStocks} 
                                        onChange={(e) => setBTechStocks(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='bTechStockOptions'>
                                    <Form.Label>Stock Options</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Stock Options' 
                                        value={bTechStockOptions} 
                                        onChange={(e) => setBTechStockOptions(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4> </h4>
                        <Form.Group controlId='bTechDetailedBreakDown'>
                            <Form.Label>Detailed Breakdown</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Detailed Breakdown' 
                                value={bTechDetailedBreakDown} 
                                onChange={(e) => setBTechDetailedBreakDown(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h3> </h3>

                        <Row>
                            <h4>M.Tech. Compensation Details</h4>
                            <h4> </h4>
                            <Col>
                                <Form.Group controlId='mTechCTC'>
                                    <Form.Label>CTC</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter CTC' 
                                        value={mTechCTC} 
                                        onChange={(e) => setMTechCTC(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='mTechBasePay'>
                                    <Form.Label>Base Pay</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Base Pay' 
                                        value={mTechBasePay} 
                                        onChange={(e) => setMTechBasePay(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4> </h4>
                        <Row>
                            <Col>
                                <Form.Group controlId='mTechStocks'>
                                    <Form.Label>Stocks</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Stocks' 
                                        value={mTechStocks} 
                                        onChange={(e) => setMTechStocks(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='mTechStockOptions'>
                                    <Form.Label>Stock Options</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder='Enter Stock Options' 
                                        value={mTechStockOptions} 
                                        onChange={(e) => setMTechStockOptions(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4> </h4>
                        <Form.Group controlId='mTechDetailedBreakDown'>
                            <Form.Label>Detailed Breakdown</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Detailed Breakdown' 
                                value={mTechDetailedBreakDown} 
                                onChange={(e) => setMTechDetailedBreakDown(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h3> </h3>
                        
                        <h4>Bonds/Contracts and Medical Requirements</h4>
                        <p> </p>
                        <Form.Group controlId='relocationBenefits'>
                            <Form.Label>Relocation Benefits</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Relocation Benefits' 
                                value={relocationBenefits} 
                                onChange={(e) => setRelocationBenefits(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='serviceBond'>
                            <Form.Label>Service Bond</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Service Bond' 
                                value={serviceBond} 
                                onChange={(e) => setServiceBond(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='medicalRequirements'>
                            <Form.Label>Medical Requirements</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Medical Requirements' 
                                value={medicalRequirements} 
                                onChange={(e) => setMedicalRequirements(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h3> </h3>
                        
                        <h4>Screening Process</h4>
                        <h4> </h4>
                        <Form.Group controlId='aptitudeTest'>
                            <Form.Check 
                                type='checkbox' 
                                value={aptitudeTest} 
                                label='Aptitude Test'
                                onChange={(e) => setAptitudeTest(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='onlineTechnicalTest'>
                            <Form.Check 
                                type='checkbox' 
                                value={onlineTechnicalTest} 
                                label='Online Technical Test'
                                onChange={(e) => setOnlineTechnicalTest(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='groupDiscussion'>
                            <Form.Check 
                                type='checkbox' 
                                value={groupDiscussion} 
                                label='Group Discussion'
                                onChange={(e) => setGroupDiscussion(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='technicalInterviews'>
                            <Form.Check 
                                type='checkbox' 
                                value={technicalInterviews} 
                                label='Technical Interviews'
                                onChange={(e) => setTechnicalInterviews(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='hrInterviews'>
                            <Form.Check 
                                type='checkbox' 
                                value={hrInterviews} 
                                label='HR Interviews'
                                onChange={(e) => setHrInterviews(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>

                        <h2> </h2>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button> 
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default JobOpeningCreateScreen
