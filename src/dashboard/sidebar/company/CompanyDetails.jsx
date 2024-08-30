import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewWrapper from "../../common/ViewWrapper";
import { BiCloudLightRain } from "react-icons/bi";
import { APIURL } from "../../../utils/constants";

const CompanyDetails = () => {
  const [company, setCompany] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/company`);
        console.log(response.data.data[0], "hellos");
        setCompany(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(company, "is it company details page");
  return (
    // <ViewWrapper>
    <div className='mx-auto rounded-md '>
      <div className='flex gap-6'>
        <aside className='w-1/2'>
          <h2 className='mb-4 text-3xl font-bold'>{company.name}</h2>
          <p className='mb-6 text-gray-600 '>
            <span className='text-sm font-semibold text-black '>
              Description :{" "}
            </span>
            {company.company_description}
          </p>
        </aside>
        <aside className='w-1/2'>
          <img
            src='data:image/jpeg;base64,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'
            alt={company.name}
            className='w-full mb-6 rounded-md h-52 '
          />
        </aside>
      </div>

      <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 '>
        <div>
          <p className='font-bold'>Slogan:</p>
          <p>{company.slogan}</p>
        </div>
        <div>
          <p className='font-bold'>Email Address:</p>
          <p>{company.email}</p>
        </div>
        <div>
          <p className='font-bold'>Phone Number:</p>
          <p>{company.phone_no}</p>
        </div>
        <div>
          <p className='font-bold'>External Phone Number:</p>
          <p>{company.external_phoneno}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2'>
        <div>
          <p className='font-bold'>Sachalak:</p>
          <p>{company.sanchalak}</p>
        </div>
        <div>
          <p className='font-bold'>Pradhan Sanchalak:</p>
          <p>{company.pradhan_sanchalak}</p>
        </div>
        <div>
          <p className='font-bold'>Reporter:</p>
          <p>{company.reporter}</p>
        </div>
        <div>
          <p className='font-bold'>Salahakar:</p>
          <p>{company.salahakar}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2'>
        <div>
          <p className='font-bold'>JI_PRA_KA_RU_D_NO:</p>
          <p>{company.ji_pra_ka_ru_d_no}</p>
        </div>
        <div>
          <p className='font-bold'>Media BIVA Registration Certificate No:</p>
          <p>{company.media_biva_registration_cretificate_no}</p>
        </div>
        <div>
          <p className='font-bold'>Press Council Registration No:</p>
          <p>{company.press_council_registration_no}</p>
        </div>
        <div>
          <p className='font-bold'>Local PRA Registration No:</p>
          <p>{company.local_pra_registration_no}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2'>
        <div className='mb-6'>
          <p className='font-bold'>Social Links:</p>
          {company.social_media?.map((individual, index) => (
            <>
              <p>{individual.name}</p>
            </>
          ))}
        </div>
        <div className='mb-6'>
          <p className='font-bold'>Privacy Policy:</p>
          <p>{company.privacypolicy}</p>
        </div>
      </div>
    </div>
    // </ViewWrapper>
  );
};

export default CompanyDetails;
