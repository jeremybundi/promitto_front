import React, { useState, useEffect } from "react";
import axios from "axios";
import JosueImage from '../assets/images/josue.png';
import Web1 from '../assets/images/web1.png';
import MissionImage from '../assets/images/mission.png';
import visionSvg from '../assets/icons/vision.svg';
import { useNavigate } from "react-router-dom"; 
import firstImage from '../assets/images/Rectangle57.png'; 
import lastImage from '../assets/images/Rectangle59.png'


const AboutUs = () => {
    const [boardMembers, setBoardMembers] = useState([]);
    const [operationsTeam, setOperationsTeam] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [displayAll, setDisplayAll] = useState(false); 
    const [projects, setProjects] = useState([]); 
    const navigate = useNavigate(); 


    // Function to toggle the display of all projects
    const toggleDisplayAll = () => setDisplayAll(!displayAll);

    // Determine which projects to display
    const displayedProjects = displayAll ? projects : projects.slice(0, 6); 

    const handleShowMore = () => {
        setShowAll(true);
    };
    const handleEnrollNow = () => {
        navigate('/register'); 
      };
      const handleMoreAboutMeClick = (memberId) => {
        console.log("Navigating to board member with id:", memberId);
        navigate(`/board-member/${memberId}`);  // Replace with the correct route where you want to show more details
      };

    // Fetch data from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("https://api4.promittoltd.com/house-ongoing");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        axios.get('https://api4.promittoltd.com/board-members')
          .then(response => {
            setBoardMembers(response.data);
            console.log(response.data); 
          })
          .catch(error => console.error('Error fetching board members:', error));
      }, []);
      

      useEffect(() => {
        const fetchOperationsTeam = async () => {
          try {
            const response = await axios.get('https://api4.promittoltd.com/staff');
            setOperationsTeam(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching operations team:', error);
            setLoading(false);
          }
        };
    
        fetchOperationsTeam();
      }, []);
      



  return (
    <div className="max-w-8xl font-poppins mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* First Column */}
        <div className="bg-gray-50 md:px-12 px-3 md:pt-32 pt-3 border-t rounded-tr-lg rounded-bl-lg shadow-md">
          <h1 className="md:text-6xl text-2xl font-semibold font-lufga text-yellow-500 md:mb-8 mb-2" data-aos="fade-down">
            About Us
          </h1>
          <p className="text-gray-700 md:mb-12 mb-4 text-sm md:text-lg leading-relaxed" data-aos="fade-up">
            Promitto is a real estate company with a distinctive aim to boost
            and support individuals to achieve their dreams of homeownership
            through provision of affordable construction loans at competitive
            interest rates and provision of full construction services.
          </p>

          <div className="flex items-center space-x-2">

            <span className="bg-yellow-500 md:p-2 p-1 md:mb-14 mb-6 items-center text-sm md:text-lg font-medium cursor-pointer flex hover:bg-yellow-600 rounded-md"
            onClick={handleEnrollNow}>
            Enroll Now
            <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="ml-1"
            >
            <rect width="17" height="17" fill="url(#pattern0_101_1417)" />
            <defs>
                <pattern
                id="pattern0_101_1417"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
                >
                <use
                    xlinkHref="#image0_101_1417"
                    transform="scale(0.01)"
                />
                </pattern>
                <image
                id="image0_101_1417"
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHjUlEQVR4nO2deYhVVRjAfzNa44w5ZaXZopmaZZTmmJpJ0zIagbbSRpEVYRNFRpqULbZhttgmVGZQUNleICSUlalYmlnpBJZbLlhqWpo21oyjLw58A49h5p3vru/cd98Pvv9m7jn3fO8s99sOFClSpEiRPFBSHPV4KAeGALXAc8CHwLfA78BfQBOQEakH/gDWAcuAj4CpwE3AmUBlUWn+FHABMA1YDuzLGvCg0iTKfELa6FhUUOuUAZcA7wF7Q1SATf6TGXcxcFBROdATeEaWnkyexSx104G+aVTM6cAHLdb/jCNi+vQO0J8U0Bt4G9jvwMBnLHIAmA30owCpkI200YGBzniURjmpFcwBYKQcQ+P4RWcilA2y+Sf65PRCSAO1A5gLPAncAJwH9AE6A+1azMQuQC/gHGAs8DTwiTwjDMXMADqQME4Evg/w0vuBr4CJwICQvsJL5TBxF/BpwAOF+T46iYRQA+z0+aI/AxOAY2Po59HAeGCFz77uBi7HcW72uXHPA0bl0R5llsAvfPTbzLJbcZR7fbzQUplRrjDUp2IewjEe8PgCZoO90WEL7TXAbx7f6Xkc4T6PHX8f6Ir7VAIve3y3yS78krTH2n+BO0kel3m0tY3LV0fPBxqUndyYcNtQbw+nsaZ8nL66A9s9nNmPI/kcIh+nmnfeA5wcV8eM32CRsmPm7zpROJSJz0bz7nXibIucacoOLZBfVaHRDvhYOQbmUBApZylN5ysK3H/dAZivVMpFUU7XlYoObC6QPcPGobIs2cZjvRg9Q2eyovEGiRBJC32AvxXjMiXsho8SY5qzZ/A8cqXyhxqq5/EVRaNzHDaFRI1mfMxBIDTfhi02ysyeHqSXSgncyzVGxqJxahiNaew5aVyqWnKtYpxmEZAuisC1VQ4GmR0sEicl4uW0mVXMiuObSQqtu+Q1Gw58Iy/eJK7aOMN4hkVtpv/S8vA6hzby4RIa2rKPu8TxFBfzLGO2LciKYpuCJgLEFRbl6GecSqlRzJLRUXwMbszDOp3LimCLIolTKXUKJ53v49yqNjanyGw0Pg1+mrSFuJRyt8JZVxHkK/11eRljWFwi0YiuMUehkLiUcoxixo4gBXalnQ4p5XNLHx4nBVQBf3pQiklzi4qJlvYXkxKGymDne6ZUWdreV2DeVOdnSqkiwDtNrgpcmCm2g8YYUkZVnmfKs3E7rpJAVR6VUmtpz2QAe6JEkmKSLhdKUYG4l69zLW2Z4gYqhogdSxuZWGiyKySl9LG0s1prQk6rIjJZsjOo70KsHLna2Kp5yGIHBiPjiLwVUCEVlufXax4QdTZrkmQ9wcll0zrQImm11Yi8JCT1Z2IS1RpvORQFUojGKZUmeS2gQjpanv+P5iH9JZw+k3LZKmkXQehmaWOL9kH9pDhMc5GwQpBGD8rYFlIMVV9LO8b5l0pqPNThCksZze3maus7Uki1rNXamlmnhdj2bZb2TPJPqqjOozKQWi+52nyUFFGTp2Uqm88s7V5HSqjO88wwtFfkjgwiBdQ4MDMQM36uthuiyqxyiWoHZoa2wsXCoA2US16dqwz04POIcmY0s9DSh0eClHKdnRUZuFrSuFxjoUPK6Kkw0pqKd545AtjUysMOSIKKK5QrjaJxKENTHWmPxCN7ZorFDhNLpQIF5YpfZFzKMBbeXyx9ecPvwxdYHmyc+K7wtQPKQILQbTPVd2z0XIVxzASEucBQiSpvzWoblzI0HtfNGh9IW4xXaPt63GGQ/Ij2ik98VsxVJUYoxsuUuvXNYYqCARuSWMc2AkqlhqTtY7BH1NF3GfkISju1inF6NYyGerSRTJkte9N6zYNwpCI6cp/EaYWCZpYscGiDj5t3FePzZpgNdlbGxz5I+qhVjEu9fL2HygRFw01SHDMt9G/jqN1STJHpSOz7yxSNbw8hBDMJmDDRtYrxWBll+vgAZfTGGqmTUqh0Ut7+sF/qykeKprKckR/EOFlolHmoD29uFYqcUkXKb3bNXnMkLBQqFfVfmmWRLPOx0FVsMpqOrU3S5SeWPUN7SY0JzDuemBnswV1qNvqzSXZa3Drluzbk8wqOUR6uRjV/93ACPx7HeAiaMJv41fnu8C0ec0rMhngC7tNNkjIzHuQOHPpa9aKUeik94VppQGQjHuchx91ZK8VYH8k+a+QOEheWsRLx9i33+A7mnW/HUS71sNFnS53ceV6Whz6bH8NVPhSRESu4+V+nOUNRw7Yt2Qo8FdPlL6fIlaqtRdVoA+0i/woPs4CXrRikTX4S5YwMySNZIc+aKlaEIH2bL++YKNrJRhfGFd2NwI+S8zdBAvWGyRWr3bIqNnSX7K/BUr52klTDWxJS7r3ZLx4LEqTgyhIW9BeZcUBWSCnagqC9/LI1NyxkHJPdcn9ubHapOOkqWUVJKN3RAMxM4l7hB+POfMnnETkTsRgzyfQQUqITyeHi3vzVAUWsFl+PseqmnhLZMF+U831cStghM9VcdlYkx5dzFXCPOML83s3eVhrAHDlgDHTEZJNIegFXAPcDM2RQV4iPYktWtYZNElSwVDJgZ8rgj5YgtYI8KRUpUqRIkSKG/wEg/4LL48cSTQAAAABJRU5ErkJggg=="
                />
            </defs>
            </svg>
            
            </span>
            </div>
                
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {/* Row 1, Column 1 */}
            <div className=" p-6 rounded-3xl border-t shadow-md">
            <span >
                <img src={visionSvg} alt="Vision Icon" className="md:w-16 md:h-16 w-10 h-10 md:mt-8 mt-3 md:mb-4 mb-3  rounded-full md:p-3 p-1 bg-yellow-400" />
                </span>
                <h2 className="md:text-lg text-sm text-yellow-500 fonf-lufga font-medium md:mb-4 mb-1" data-aos="fade-down">Our Vision</h2>
                <p className="text-gray-600 md:text-sm text-sm  md:mb-8 mb-5 leading-relaxed" data-aos="fade-up">
                To be your trusted partner to home ownership.
                </p>
            </div>
            {/* Row 1, Column 2 */}
            <div
              className="bg-blue-100 p-6 rounded-3xl shadow-md hidden md:block"
                style={{
                    backgroundImage: `url(${Web1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', 
                    width: '100%', 
                }}
                ></div>
            {/* Row 2, Column 1 */}
            <div
              className="bg-blue-100 p-6 rounded-3xl shadow-md hidden md:block"
              style={{
                    backgroundImage: `url(${JosueImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', 
                    width: '100%', 
                }}
                ></div>
            {/* Row 2, Column 2 */}
            <div className="bg-yellow-400 p-6 rounded-3xl shadow-md">
        
                <span >
                    <img
                    src={MissionImage}
                    alt="Mission"
                    className="md:w-16 w-10 h-10 md:h-16 md:mt-10 mt-5 mb-4 object-contain bg-[#010440] md:p-3 p-2 rounded-full"
                    />
                </span>

                <h2 className="md:text-lg text-sm  fonf-lufga font-medium md:mb-2 mb-1" data-aos="fade-down">Our Mission</h2>
                <p className="text-gray-800 text-sm mb-7 leading-relaxed" data-aos="fade-up">
                Empower individuals to become home owners.
                </p>
            </div>
            </div>

      </div>
      <div className="shadow bg-gray-50 pb-4 rounded-md">
      {/* Main Title */}
      <p className="text-yellow-500 text-4xl mt-12 ml-2 font-medium text-center pt-10" data-aos="fade-down">Our Team</p>
      
      {/* Description */}
      <p className="md:text-center text-gray-500 text-left text-sm md:mt-4 px-4 md:mx-40 md:px-36">
        At Promitto Ltd, our success is driven by our exceptional team of professionals. 
        From our talented architects and designers who bring visionary concepts to life, to our
         dedicated project managers who ensure seamless execution, every member of our team plays a
          vital role in delivering exceptional results.
      </p>
      
      {/* Board Members Heading */}
      <h1 className="text-center mt-8 text-2xl font-semibold">Board Members</h1>

      {/* Board Members */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
         {boardMembers.map(member => (
            <div key={member.id} className="relative bg-white  overflow-hidden">
            {/* Image */}
            
            <img
                src={member.image_url}
                alt={member.name}
                className="w-full md:h-80 h-auto object-cover rounded-2xl" 
            />
        
            {/* Member Details */}
            <div className="absolute md:bottom-2 bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-white px-1 py-1 rounded-md z-10 text-center">
                <h2 className="text-sm text-yellow-500 font-semibold">{member.name}</h2>
                <p className=" text-sm font-medium">{member.role}</p>
                <a
                href="#"
                className="text-blue-500 text-xs underline mt-1 inline-block"
                onClick={() => handleMoreAboutMeClick(member.id)}

                >
                More about me
                </a>
      </div>
    </div>
  ))}
</div>
<div>
  <h1 className="text-center  items-center mt-8 text-2xl font-semibold">Operations Team</h1>
  <div className="">
  <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-2 justify-center w-full">
    {operationsTeam.slice(
      0,
      showAll || 
      (window.innerWidth < 768 && operationsTeam.length <= 4) ||
      (window.innerWidth >= 768 && operationsTeam.length <= 7) 
        ? operationsTeam.length 
        : window.innerWidth < 768 
        ? 4 
        : 7
    ).map((member) => (
      <div key={member.id} className="relative bg-white overflow-hidden">
        {/* Image */}
        <img
          src={member.image_url}
          alt={member.name}
          className="w-full h-50 object-cover rounded-3xl"
        />
        {/* Member Details */}
        <div className="absolute md:bottom-2 bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] bg-white px-1 py-1 rounded-md z-10 text-center">
          <h2 className="text-[10px] text-yellow-500 font-semibold">{member.name}</h2>
          <p className="text-[10px] font-medium">{member.role}</p>
          <a href={`mailto:${member.email}`} className="text-blue-500 underline text-[9px] font-medium">
            {member.email}
          </a>
        </div>
    
      </div>
    
    ))}
  </div>
  </div>

  {/* Show More Button */}
  {((operationsTeam.length > 4 && window.innerWidth < 768) || 
    (operationsTeam.length > 7 && window.innerWidth >= 768)) && !showAll && (
    <button
      onClick={handleShowMore}
      className="mt-3 mb-4 py-2 px-4 bg-yellow-500 font-medium text-white rounded-md block mx-auto"
    >
      Show More
      
    </button>
  )}
</div>


    </div>
    <div className=" md:mt-12 mt-6 md:text-center ">
    <p className=" text-yellow-500 font-lufga text-center font-medium md:text-4xl" data-aos="fade-down"> Ongoing Projects</p>
    <p className="md:text-sm text-[10px] text-gray-600  md:mx-60 md:px-24 px-2 md:mt-4 mt-1 ">At Promitto LTD, our clients are at the heart of everything we do.
         From first-time homebuyers to seasoned investors, our diverse clientele 
        has entrusted us with their real estate needs, and we have delivered outstanding results time and time again.</p>
</div>
<div>
<div>
      <div className="grid grid-cols-1 md:mx-28 mt-4 ml-3 md:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-row items-center bg-white overflow-hidden"
          >
            {/* Left Column - Image */}
            <div className="flex-shrink-0 w-1/3">
              <img
                src={project.images[0]}
                alt={`Project in ${project.location}`}
                className="w-full h-24 rounded-lg object-cover"
              />
            </div>

            {/* Right Column - Project Details */}
            <div className="p-4 md:w-2/3">
              <span className="flex flex-col">
                <h2 className="md:text-sm text-xs text-gray-600 font-medium mt-1">Project Type:</h2>
                <p className="md:text-xs text-[9px] md:mt-1 font-semibold">{project.description}</p>
              </span>
              <div className="flex flex-col">
                <p className="text-gray-600 text-xs md:text-sm font-medium md:mt-2 mt-1">Location:</p>
                <p className="text-[9px] md:text-xs font-semibold">{project.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to toggle more/less projects */}
      {projects.length > 6 && (
        <div className="text-center mt-4">
          <button
            onClick={toggleDisplayAll}
            className="px-4 py-1 bg-yellow-600 text-sm font-semibold text-white rounded-md hover:bg-yellow-400"
          >
            {displayAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>

</div>
<div className="md:block hidden "> 
    <h1 className="text-yellow-500 text-center md:mt-12 mt-4 font-lufga text-lg md:text-4xl font-medium md:mb-6 " data-aos="fade-down"> Our Core Values</h1>
    <p className="text-center md:mx-60 font-poppins text-gray-600 md:px-24 md:text-sm text-xs "> At Promitto LTD, our core values serve as the guiding principles that shape every aspect of our business.
    These core values are not just words; they are the essence of XYZ Real Estate, shaping our culture and ensuring that we
     consistently deliver the highest standard of service and results. </p>
</div>
<div class="container md:block hidden  md:mx-auto md:px-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-">
   
    <div class="md:p-6  flex ">
        
      <div class="md:text-4xl text-xl font-medium font-manrope mr-2 text-yellow-500">01.</div>
      <div>
      <h3 class="text-sm md:text-xl font-lufga font-semibold ">Trust.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">Trust is a fundamental core value at Promitto LTD. We understand that trust is the cornerstone of
         any successful relationship, and we work diligently to earn and maintain the trust of our clients.</p>
         </div>
    </div>
    <div class="md:p-6   flex">
      <div class="md:text-4xl text-sm font-medium font-manrope mr-2 text-yellow-500">02.</div>
      <div>
      <h3 class="text-sm md:text-sm font-lufga font-semibold ">Customer Satisfaction.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">We are committed to providing exceptional customer service, 
        treating each client with respect, and ensuring their satisfaction throughout their real estate journey.</p>
        </div>
    </div>
    <div class="md:p-6  flex">
      <div class="md:text-4xl text-sm font-medium font-manrope mr-2 text-yellow-500">03.</div>
      <div>
      <h3 class="text-sm md:text-xl font-lufga font-semibold ">Innovation.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">Our dedication to excellence drives us to constantly improve, 
        staying at the forefront of industry trends and delivering outstanding quality in every interaction.</p>
        </div>
    </div>
    <div class="md:p-6   flex">
      <div class="md:text-4xl text-sm font-medium font-manrope mr-2 text-yellow-500">04.</div>
      <div>
      <h3 class="text-sm md:text-xl font-lufga font-semibold ">Inclusion.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">We embrace collaboration, working closely with our clients, 
        partners, and team members to foster strong relationships and achieve mutual success.</p>
        </div>
    </div>
    <div class="md:p-6   flex">
      <div class="md:text-4xl text-sm font-medium font-manrope mr-2 text-yellow-500">05.</div>
      <div>
      <h3 class="text-sm md:text-xl font-lufga font-semibold ">Impact.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">We work together, across boundaries, to meet the needs of our clients.</p>
      </div>
    </div>
    <div class="md:p-6   flex">
      <div class="md:text-4xl text-sm font-medium font-manrope mr-2 text-yellow-500">06.</div>
      <div>
      <h3 class="text-sm md:text-xl font-lufga font-semibold ">Integrity.</h3>
      <p class="md:mt-1 text-[9px] md:text-xs text-gray-500">Integrity is the foundation upon which we operate, as we believe in transparent
         and ethical practices, always putting the best interests of our clients first. </p>
         </div>
    </div>
  </div>

</div>
<h1 className="text-center md:text-3xl text-xl mt-4 md:my-16 font-medium text-yellow-500 font-lufga" data-aos="fade-down">Our Packages</h1>

<div>
</div>
<div class="container md:mx-auto md:px-4">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3 p-4">
      <div class="border md:rounded-3xl rounded-lg md:p-6 p-3 md:shadow-lg">
        <div className="flex pb-4 border-b-2  border-yellow-300">
            <div>
             <h1 className="md:text-2xl text-xl font-medium font-manrope mr-2 text-yellow-500">01.</h1>
            </div>
            <div>
            <h2 class="md:text-lg text-sm font-lufga font-semibold">Residential/Commercial Package</h2>
            <p class="text-gray-500 text-xs mt-1" data-aos="fade-right">
            We Finance the construction of both Residential and Commercial/Rental projects.
            The repayment period ranges from 7-10yrs respectively with an interest of 12% on reducing balance.
            </p>
            </div>

        </div>
        <div className="flex pb-4 border-b-2 mt-4 border-yellow-300">
            <div>
             <h1 className="md:text-2xl text-xl font-medium font-manrope mr-2 text-yellow-500">02.</h1>
            </div>
            <div>
            <h2 class="md:text-lg text-sm font-lufga font-semibold">Perimeter Walls</h2>
            <p class="text-gray-500 md:text-sm text-xs mt-1" data-aos="fade-right">
            We Finance the construction of perimeter walls on your plot.
            The repayment period is 2 years with an interest of 12% on reducing balance.
            </p>
            </div>

        </div>
        <div className="flex pb-4 border-b-2 mt-4 border-yellow-300">
            <div>
             <h1 className="md:text-2xl text-xl font-medium font-manrope mr-2 text-yellow-500">03.</h1>
            </div>
            <div>
            <h2 class="text-sm md:text-lg font-lufga font-semibold">Renovations/Finishings</h2>
            <p class="text-gray-500 md:text-sm text-xs mt-1" data-aos="fade-right">
            We Finance doing renovations and/or finishings for our clients.
             The repayment period is 5yrs with an interest of 12% interest on reducing balance.
            </p>
            </div>

        </div>
        
      </div>
    </div>

    <div class="hidden md:block w-full md:w-2/3 p-4">
      <div class="border bg-yellow-400 rounded-3xl p-8 shadow-lg">
        <h2 class="md:text-5xl text-3xl md:mt-12 md:ml-6 font-lufga font-semibold" data-aos="fade-left">Become a home owner today by Enrolling as a member</h2>
        <p class="text-gray-800 md:mt-8 md:ml-6 ">
        Here at Promitto Ltd we to turn your dreams into reality, as 
        we pride ourselves on delivering extraordinary service, impeccable quality, and unforgettable living experiences.
        </p>
   
      <div className="flex items-center md:ml-6  md:mt-8 space-x-2">

        <span className="bg-yellow-400  p-1 md:mb-14 mb-6 border border-black items-center
         text-sm md:text-lg font-medium flex  rounded-md hover:bg-yellow-600 cursor-pointer"
         onClick={handleEnrollNow}>
        Enroll Now
        <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="ml-1"
        >
        <rect width="17" height="17" fill="url(#pattern0_101_1417)" />
        <defs>
            <pattern
            id="pattern0_101_1417"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
            >
            <use
                xlinkHref="#image0_101_1417"
                transform="scale(0.01)"
            />
            </pattern>
            <image
            id="image0_101_1417"
            width="100"
            height="100"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHjUlEQVR4nO2deYhVVRjAfzNa44w5ZaXZopmaZZTmmJpJ0zIagbbSRpEVYRNFRpqULbZhttgmVGZQUNleICSUlalYmlnpBJZbLlhqWpo21oyjLw58A49h5p3vru/cd98Pvv9m7jn3fO8s99sOFClSpEiRPFBSHPV4KAeGALXAc8CHwLfA78BfQBOQEakH/gDWAcuAj4CpwE3AmUBlUWn+FHABMA1YDuzLGvCg0iTKfELa6FhUUOuUAZcA7wF7Q1SATf6TGXcxcFBROdATeEaWnkyexSx104G+aVTM6cAHLdb/jCNi+vQO0J8U0Bt4G9jvwMBnLHIAmA30owCpkI200YGBzniURjmpFcwBYKQcQ+P4RWcilA2y+Sf65PRCSAO1A5gLPAncAJwH9AE6A+1azMQuQC/gHGAs8DTwiTwjDMXMADqQME4Evg/w0vuBr4CJwICQvsJL5TBxF/BpwAOF+T46iYRQA+z0+aI/AxOAY2Po59HAeGCFz77uBi7HcW72uXHPA0bl0R5llsAvfPTbzLJbcZR7fbzQUplRrjDUp2IewjEe8PgCZoO90WEL7TXAbx7f6Xkc4T6PHX8f6Ir7VAIve3y3yS78krTH2n+BO0kel3m0tY3LV0fPBxqUndyYcNtQbw+nsaZ8nL66A9s9nNmPI/kcIh+nmnfeA5wcV8eM32CRsmPm7zpROJSJz0bz7nXibIucacoOLZBfVaHRDvhYOQbmUBApZylN5ysK3H/dAZivVMpFUU7XlYoObC6QPcPGobIs2cZjvRg9Q2eyovEGiRBJC32AvxXjMiXsho8SY5qzZ/A8cqXyhxqq5/EVRaNzHDaFRI1mfMxBIDTfhi02ysyeHqSXSgncyzVGxqJxahiNaew5aVyqWnKtYpxmEZAuisC1VQ4GmR0sEicl4uW0mVXMiuObSQqtu+Q1Gw58Iy/eJK7aOMN4hkVtpv/S8vA6hzby4RIa2rKPu8TxFBfzLGO2LciKYpuCJgLEFRbl6GecSqlRzJLRUXwMbszDOp3LimCLIolTKXUKJ53v49yqNjanyGw0Pg1+mrSFuJRyt8JZVxHkK/11eRljWFwi0YiuMUehkLiUcoxixo4gBXalnQ4p5XNLHx4nBVQBf3pQiklzi4qJlvYXkxKGymDne6ZUWdreV2DeVOdnSqkiwDtNrgpcmCm2g8YYUkZVnmfKs3E7rpJAVR6VUmtpz2QAe6JEkmKSLhdKUYG4l69zLW2Z4gYqhogdSxuZWGiyKySl9LG0s1prQk6rIjJZsjOo70KsHLna2Kp5yGIHBiPjiLwVUCEVlufXax4QdTZrkmQ9wcll0zrQImm11Yi8JCT1Z2IS1RpvORQFUojGKZUmeS2gQjpanv+P5iH9JZw+k3LZKmkXQehmaWOL9kH9pDhMc5GwQpBGD8rYFlIMVV9LO8b5l0pqPNThCksZze3maus7Uki1rNXamlmnhdj2bZb2TPJPqqjOozKQWi+52nyUFFGTp2Uqm88s7V5HSqjO88wwtFfkjgwiBdQ4MDMQM36uthuiyqxyiWoHZoa2wsXCoA2US16dqwz04POIcmY0s9DSh0eClHKdnRUZuFrSuFxjoUPK6Kkw0pqKd545AtjUysMOSIKKK5QrjaJxKENTHWmPxCN7ZorFDhNLpQIF5YpfZFzKMBbeXyx9ecPvwxdYHmyc+K7wtQPKQILQbTPVd2z0XIVxzASEucBQiSpvzWoblzI0HtfNGh9IW4xXaPt63GGQ/Ij2ik98VsxVJUYoxsuUuvXNYYqCARuSWMc2AkqlhqTtY7BH1NF3GfkISju1inF6NYyGerSRTJkte9N6zYNwpCI6cp/EaYWCZpYscGiDj5t3FePzZpgNdlbGxz5I+qhVjEu9fL2HygRFw01SHDMt9G/jqN1STJHpSOz7yxSNbw8hBDMJmDDRtYrxWBll+vgAZfTGGqmTUqh0Ut7+sF/qykeKprKckR/EOFlolHmoD29uFYqcUkXKb3bNXnMkLBQqFfVfmmWRLPOx0FVsMpqOrU3S5SeWPUN7SY0JzDuemBnswV1qNvqzSXZa3Drluzbk8wqOUR6uRjV/93ACPx7HeAiaMJv41fnu8C0ec0rMhngC7tNNkjIzHuQOHPpa9aKUeik94VppQGQjHuchx91ZK8VYH8k+a+QOEheWsRLx9i33+A7mnW/HUS71sNFnS53ceV6Whz6bH8NVPhSRESu4+V+nOUNRw7Yt2Qo8FdPlL6fIlaqtRdVoA+0i/woPs4CXrRikTX4S5YwMySNZIc+aKlaEIH2bL++YKNrJRhfGFd2NwI+S8zdBAvWGyRWr3bIqNnSX7K/BUr52klTDWxJS7r3ZLx4LEqTgyhIW9BeZcUBWSCnagqC9/LI1NyxkHJPdcn9ubHapOOkqWUVJKN3RAMxM4l7hB+POfMnnETkTsRgzyfQQUqITyeHi3vzVAUWsFl+PseqmnhLZMF+U831cStghM9VcdlYkx5dzFXCPOML83s3eVhrAHDlgDHTEZJNIegFXAPcDM2RQV4iPYktWtYZNElSwVDJgZ8rgj5YgtYI8KRUpUqRIkSKG/wEg/4LL48cSTQAAAABJRU5ErkJggg=="
            />
        </defs>
        </svg>

        </span>
        </div>
    </div>
    </div>
  </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 md:mt-9 md:mb-6 items-center gap-4">
  {/* First Column - Image */}
  <div className="hidden md:block md:mx-24 overflow-hidden">
    <img
      src={firstImage}
      alt="First"
      className="object-contain w-72 h- rounded-lg"  
    />
  </div>
  <div className="rounded-lg border md:pb-4 pb-2 pt-2 md:px-4 shadow-md"  data-aos="fade-left"
  >
  <h2 className="md:text-2xl text-xl text-center font-medium font-lufga mb-3 text-yellow-600">
    Requirements for Registration
  </h2>
  <ul className="pl-5 text-sm md:text-lg pb-2 pr-2 md:pr-3 list-inside">
    <li className="md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3 text-gray-700 text-medium mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5 mr-3  rounded-full bg-yellow-400"></span>
      Copy of National ID
    </li>
    <li className=" text-gray-700 text-medium md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3  mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5  mr-3 rounded-full bg-yellow-400"></span>
      Copy of KRA certificate
    </li>
    <li className=" text-gray-700 text-medium md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3  mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5  mr-3 rounded-full bg-yellow-400"></span>
      Copy of Title Deed
    </li>
    <li className=" text-gray-700 text-medium md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3  mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5  mr-3 rounded-full bg-yellow-400"></span>
      PIN of site location
    </li>
    <li className=" text-gray-700 text-medium md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3  mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5  mr-3 rounded-full bg-yellow-400"></span>
      House Design
    </li>
    <li className=" text-gray-700 text-medium md:border-b-2 border-b border-yellow-400 pb-2 pr-3 px-3  mt-2 flex items-center">
      <span className="inline-block w-1.5 h-1.5  mr-3 rounded-full bg-yellow-400"></span>
      Evaluation fee of Ksh. 30,000 
    </li>
  </ul>
</div>


  <div className="hidden md:block md:mx-24 overflow-hidden">
    <img
      src={lastImage}
      alt="First"
      className="object-contain w-[288px] h-[340px] rounded-lg"  
    />
  </div>
</div>



    </div>
  );
};

export default AboutUs;






