import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import checkAuthentication from '../services/checkAuthentication';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../stores/authStore';
import { Divider } from '@nextui-org/react';
import JobsLeading from '../components/jobsComponents/JobsLeading';
import mac from "../assets/mac.png"
import JobCard from '../components/jobsComponents/JobCard';
import WhatsApp from "../assets/WhatsApp.jpg"
import apple from "../assets/apple.jpg"
import SkillItem from "../components/SkillItem"
function Jobs() {
  const navigate = useNavigate()
  const authInfos = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAuthInfo = async () => {
      const authInfo = await checkAuthentication();
      dispatch(setAuthenticated(authInfo))
    };

    fetchAuthInfo();

    if (!authInfos.auth)
      navigate("/")
  }, []);

  const jobs = [
    {
      id: 1,
      title: "Customer Service Representative",
      companyName: "McDonald's",
      date_posted: "2024-01-18",
      date_delais: "2024-02-18",
      offer_status: "Open",
      salary: "$15",
      pay_period: "hr",
      description: "Join the McDonald's team as a Customer Service Representative and be a part of the world's leading fast-food restaurant chain. At McDonald's, we are committed to providing exceptional service and creating a positive dining experience for our customers.\n\nAs a Customer Service Representative, you will play a crucial role in ensuring customer satisfaction by taking orders, processing payments, and providing friendly assistance. This position offers a dynamic and fast-paced work environment, making it an ideal opportunity for individuals who thrive in customer-focused roles.\n\nResponsibilities:\n- Greet customers and provide a warm welcome.\n- Take and process customer orders accurately and efficiently.\n- Handle cash transactions and operate the point-of-sale system.\n- Maintain cleanliness and organization in the dining area.\n- Address customer inquiries and resolve issues promptly.\n- Collaborate with team members to ensure smooth operations.\n\nQualifications:\n- Previous experience in customer service is a plus.\n- Excellent communication and interpersonal skills.\n- Ability to work in a fast-paced environment.\n- Flexibility to work various shifts, including evenings and weekends.\n- Enthusiastic and positive attitude.\n\nJoin the McDonald's family and contribute to our commitment to quality, service, and cleanliness. If you are passionate about delivering excellent customer service and enjoy working in a team-oriented atmosphere, we invite you to apply for this exciting opportunity.\n\nApply now and become a valuable member of the McDonald's team!",
      country: "United States",
      city: "New York",
      photo: mac,
    },
    {
      id: 2,
      title: "Technical Support Specialist",
      companyName: "Apple Inc.",
      date_posted: "2024-01-20",
      date_delais: "2024-02-20",
      offer_status: "close",
      salary: "$3000",
      pay_period: "mth",
      description: "Join Apple Inc., a global leader in technology and innovation, as a Technical Support Specialist. At Apple, we are dedicated to creating groundbreaking products and providing unparalleled customer support. As a Technical Support Specialist, you will have the opportunity to be part of a team that ensures our customers receive world-class technical assistance.\n\nResponsibilities:\n- Provide technical support to customers via phone, chat, or email.\n- Diagnose and troubleshoot hardware and software issues on Apple products.\n- Collaborate with cross-functional teams to resolve complex technical problems.\n- Educate customers on the use of Apple products and software.\n- Document and escalate issues as needed.\n- Stay informed about the latest Apple products and technologies.\n\nQualifications:\n- Bachelor's degree in a relevant technical field.\n- Proven experience in technical support or a similar role.\n- Strong knowledge of Apple products, macOS, iOS, and related technologies.\n- Excellent communication and problem-solving skills.\n- Ability to work in a fast-paced and dynamic environment.\n- Apple Certified Support Professional (ACSP) certification is a plus.\n\nJoin the Apple team and be a part of transforming the way people live through innovative technology. If you are passionate about technology, customer service, and making a difference, we encourage you to apply for this exciting opportunity.\n\nApply now and contribute to the legacy of innovation at Apple Inc.!",
      country: "United States",
      city: "Cupertino",
      photo: apple,
    },
    {
      id: 3,
      title: "Software Engineer - Messaging Platform",
      companyName: "WhatsApp Inc.",
      date_posted: "2024-01-22",
      date_delais: "2024-02-22",
      offer_status: "close",
      salary: "$89,500",
      pay_period: "year",
      description: "WhatsApp Inc., a leading messaging platform, is seeking a talented Software Engineer to join our Messaging Platform team. As part of the WhatsApp family, you will contribute to building and enhancing one of the most widely used communication platforms globally.\n\nAs a Software Engineer on the Messaging Platform team, you will be involved in designing and implementing features that shape the future of messaging. Join us in creating seamless and secure communication experiences for millions of users worldwide.\n\nResponsibilities:\n- Design, develop, and maintain features for the WhatsApp messaging platform.\n- Collaborate with cross-functional teams to implement scalable and efficient solutions.\n- Optimize performance and troubleshoot issues to ensure a smooth user experience.\n- Stay abreast of industry trends and emerging technologies.\n- Contribute to the overall architecture and design of the messaging platform.\n\nQualifications:\n- Bachelor's degree in Computer Science or a related field.\n- Proven experience as a Software Engineer, with a focus on scalable systems.\n- Proficiency in programming languages such as Java, Kotlin, or C++.\n- Strong understanding of distributed systems and messaging protocols.\n- Experience with mobile application development is a plus.\n\nJoin WhatsApp Inc. and be a part of revolutionizing the way people connect through messaging. If you are passionate about software engineering and excited about shaping the future of communication, we invite you to apply for this exceptional opportunity.\n\nApply now and contribute to the next chapter of innovation at WhatsApp Inc.!",
      country: "United States",
      city: "Menlo Park",
      photo: WhatsApp
    },
    {
      id: 2,
      title: "Technical Support Specialist",
      companyName: "Apple Inc.",
      date_posted: "2024-01-20",
      date_delais: "2024-02-20",
      offer_status: "Open",
      salary: "$3000",
      pay_period: "mth",
      description: "Join Apple Inc., a global leader in technology and innovation, as a Technical Support Specialist. At Apple, we are dedicated to creating groundbreaking products and providing unparalleled customer support. As a Technical Support Specialist, you will have the opportunity to be part of a team that ensures our customers receive world-class technical assistance.\n\nResponsibilities:\n- Provide technical support to customers via phone, chat, or email.\n- Diagnose and troubleshoot hardware and software issues on Apple products.\n- Collaborate with cross-functional teams to resolve complex technical problems.\n- Educate customers on the use of Apple products and software.\n- Document and escalate issues as needed.\n- Stay informed about the latest Apple products and technologies.\n\nQualifications:\n- Bachelor's degree in a relevant technical field.\n- Proven experience in technical support or a similar role.\n- Strong knowledge of Apple products, macOS, iOS, and related technologies.\n- Excellent communication and problem-solving skills.\n- Ability to work in a fast-paced and dynamic environment.\n- Apple Certified Support Professional (ACSP) certification is a plus.\n\nJoin the Apple team and be a part of transforming the way people live through innovative technology. If you are passionate about technology, customer service, and making a difference, we encourage you to apply for this exciting opportunity.\n\nApply now and contribute to the legacy of innovation at Apple Inc.!",
      country: "United States",
      city: "Cupertino",
      photo: apple,
    },

    {
      id: 1,
      title: "Customer Service Representative",
      companyName: "McDonald's",
      date_posted: "2024-01-18",
      date_delais: "2024-02-18",
      offer_status: "Open",
      salary: "$15",
      pay_period: "hr",
      description: "Join the McDonald's team as a Customer Service Representative and be a part of the world's leading fast-food restaurant chain. At McDonald's, we are committed to providing exceptional service and creating a positive dining experience for our customers.\n\nAs a Customer Service Representative, you will play a crucial role in ensuring customer satisfaction by taking orders, processing payments, and providing friendly assistance. This position offers a dynamic and fast-paced work environment, making it an ideal opportunity for individuals who thrive in customer-focused roles.\n\nResponsibilities:\n- Greet customers and provide a warm welcome.\n- Take and process customer orders accurately and efficiently.\n- Handle cash transactions and operate the point-of-sale system.\n- Maintain cleanliness and organization in the dining area.\n- Address customer inquiries and resolve issues promptly.\n- Collaborate with team members to ensure smooth operations.\n\nQualifications:\n- Previous experience in customer service is a plus.\n- Excellent communication and interpersonal skills.\n- Ability to work in a fast-paced environment.\n- Flexibility to work various shifts, including evenings and weekends.\n- Enthusiastic and positive attitude.\n\nJoin the McDonald's family and contribute to our commitment to quality, service, and cleanliness. If you are passionate about delivering excellent customer service and enjoy working in a team-oriented atmosphere, we invite you to apply for this exciting opportunity.\n\nApply now and become a valuable member of the McDonald's team!",
      country: "United States",
      city: "New York",
      photo: mac,
    },
    {
      id: 3,
      title: "Software Engineer - Messaging Platform",
      companyName: "WhatsApp Inc.",
      date_posted: "2024-01-22",
      date_delais: "2024-02-22",
      offer_status: "close",
      salary: "$89,500",
      pay_period: "year",
      description: "WhatsApp Inc., a leading messaging platform, is seeking a talented Software Engineer to join our Messaging Platform team. As part of the WhatsApp family, you will contribute to building and enhancing one of the most widely used communication platforms globally.\n\nAs a Software Engineer on the Messaging Platform team, you will be involved in designing and implementing features that shape the future of messaging. Join us in creating seamless and secure communication experiences for millions of users worldwide.\n\nResponsibilities:\n- Design, develop, and maintain features for the WhatsApp messaging platform.\n- Collaborate with cross-functional teams to implement scalable and efficient solutions.\n- Optimize performance and troubleshoot issues to ensure a smooth user experience.\n- Stay abreast of industry trends and emerging technologies.\n- Contribute to the overall architecture and design of the messaging platform.\n\nQualifications:\n- Bachelor's degree in Computer Science or a related field.\n- Proven experience as a Software Engineer, with a focus on scalable systems.\n- Proficiency in programming languages such as Java, Kotlin, or C++.\n- Strong understanding of distributed systems and messaging protocols.\n- Experience with mobile application development is a plus.\n\nJoin WhatsApp Inc. and be a part of revolutionizing the way people connect through messaging. If you are passionate about software engineering and excited about shaping the future of communication, we invite you to apply for this exceptional opportunity.\n\nApply now and contribute to the next chapter of innovation at WhatsApp Inc.!",
      country: "United States",
      city: "Menlo Park",
      photo: WhatsApp
    },


    {
      id: 1,
      title: "Customer Service Representative",
      companyName: "McDonald's",
      date_posted: "2024-01-18",
      date_delais: "2024-02-18",
      offer_status: "Open",
      salary: "$15",
      pay_period: "hr",
      description: "Join the McDonald's team as a Customer Service Representative and be a part of the world's leading fast-food restaurant chain. At McDonald's, we are committed to providing exceptional service and creating a positive dining experience for our customers.\n\nAs a Customer Service Representative, you will play a crucial role in ensuring customer satisfaction by taking orders, processing payments, and providing friendly assistance. This position offers a dynamic and fast-paced work environment, making it an ideal opportunity for individuals who thrive in customer-focused roles.\n\nResponsibilities:\n- Greet customers and provide a warm welcome.\n- Take and process customer orders accurately and efficiently.\n- Handle cash transactions and operate the point-of-sale system.\n- Maintain cleanliness and organization in the dining area.\n- Address customer inquiries and resolve issues promptly.\n- Collaborate with team members to ensure smooth operations.\n\nQualifications:\n- Previous experience in customer service is a plus.\n- Excellent communication and interpersonal skills.\n- Ability to work in a fast-paced environment.\n- Flexibility to work various shifts, including evenings and weekends.\n- Enthusiastic and positive attitude.\n\nJoin the McDonald's family and contribute to our commitment to quality, service, and cleanliness. If you are passionate about delivering excellent customer service and enjoy working in a team-oriented atmosphere, we invite you to apply for this exciting opportunity.\n\nApply now and become a valuable member of the McDonald's team!",
      country: "United States",
      city: "New York",
      photo: mac,
    },
    {
      id: 2,
      title: "Technical Support Specialist",
      companyName: "Apple Inc.",
      date_posted: "2024-01-20",
      date_delais: "2024-02-20",
      offer_status: "close",
      salary: "$3000",
      pay_period: "mth",
      description: "Join Apple Inc., a global leader in technology and innovation, as a Technical Support Specialist. At Apple, we are dedicated to creating groundbreaking products and providing unparalleled customer support. As a Technical Support Specialist, you will have the opportunity to be part of a team that ensures our customers receive world-class technical assistance.\n\nResponsibilities:\n- Provide technical support to customers via phone, chat, or email.\n- Diagnose and troubleshoot hardware and software issues on Apple products.\n- Collaborate with cross-functional teams to resolve complex technical problems.\n- Educate customers on the use of Apple products and software.\n- Document and escalate issues as needed.\n- Stay informed about the latest Apple products and technologies.\n\nQualifications:\n- Bachelor's degree in a relevant technical field.\n- Proven experience in technical support or a similar role.\n- Strong knowledge of Apple products, macOS, iOS, and related technologies.\n- Excellent communication and problem-solving skills.\n- Ability to work in a fast-paced and dynamic environment.\n- Apple Certified Support Professional (ACSP) certification is a plus.\n\nJoin the Apple team and be a part of transforming the way people live through innovative technology. If you are passionate about technology, customer service, and making a difference, we encourage you to apply for this exciting opportunity.\n\nApply now and contribute to the legacy of innovation at Apple Inc.!",
      country: "United States",
      city: "Cupertino",
      photo: apple,
    },
    {
      id: 3,
      title: "Software Engineer - Messaging Platform",
      companyName: "WhatsApp Inc.",
      date_posted: "2024-01-22",
      date_delais: "2024-02-22",
      offer_status: "Open",
      salary: "$89,500",
      pay_period: "year",
      description: "WhatsApp Inc., a leading messaging platform, is seeking a talented Software Engineer to join our Messaging Platform team. As part of the WhatsApp family, you will contribute to building and enhancing one of the most widely used communication platforms globally.\n\nAs a Software Engineer on the Messaging Platform team, you will be involved in designing and implementing features that shape the future of messaging. Join us in creating seamless and secure communication experiences for millions of users worldwide.\n\nResponsibilities:\n- Design, develop, and maintain features for the WhatsApp messaging platform.\n- Collaborate with cross-functional teams to implement scalable and efficient solutions.\n- Optimize performance and troubleshoot issues to ensure a smooth user experience.\n- Stay abreast of industry trends and emerging technologies.\n- Contribute to the overall architecture and design of the messaging platform.\n\nQualifications:\n- Bachelor's degree in Computer Science or a related field.\n- Proven experience as a Software Engineer, with a focus on scalable systems.\n- Proficiency in programming languages such as Java, Kotlin, or C++.\n- Strong understanding of distributed systems and messaging protocols.\n- Experience with mobile application development is a plus.\n\nJoin WhatsApp Inc. and be a part of revolutionizing the way people connect through messaging. If you are passionate about software engineering and excited about shaping the future of communication, we invite you to apply for this exceptional opportunity.\n\nApply now and contribute to the next chapter of innovation at WhatsApp Inc.!",
      country: "United States",
      city: "Menlo Park",
      photo: WhatsApp
    }

  ]

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>

        <JobsLeading />
        <Divider className='mt-20' />
        <div className='flex mt-8'>
          <SkillItem skill="Date Posted"/>
          <SkillItem skill="Salary"/>
          <SkillItem skill="Open jobs"/>

        </div>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8 mt-6'>
          {jobs.map(job => (
            <div key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Jobs