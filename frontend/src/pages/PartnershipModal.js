import React from 'react';

const PartnerFeature = ({ iconSrc, altText, description }) => {
  return (
    <div className="flex gap-2.5 justify-between mt-2.5 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
      <img loading="lazy" src={iconSrc} alt={altText} className="w-8 aspect-square" />
      <div className="grow self-start mt-2.5">{description}</div>
    </div>
  );
};

const BenefitSection = ({ className, buttonText, iconSrc }) => {
  return (
    <div className={`${className} flex gap-4 justify-between mt-4 font-semibold whitespace-nowrap`}>
      <div className="grow justify-center px-5 py-3 text-xl tracking-widest rounded-3xl border-solid border-[0.954px] border-white text-stone-100">
        {buttonText}
      </div>
      {iconSrc && <img loading="lazy" src={iconSrc} alt="" className="aspect-[1.04] w-[23px]" />}
    </div>
  );
};

const PartnerPage = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const features = [
    { iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b4bc1af68957b4fcb609e7bc2afdd401086db13b52f578226f9bd192dd6c8cea?apiKey=50c5361058c6465f94eb30dfd5c845d1&', altText: 'Unlimited posting icon', description: 'Unlimited posting on our showcase page' },
    { iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b4bc1af68957b4fcb609e7bc2afdd401086db13b52f578226f9bd192dd6c8cea?apiKey=50c5361058c6465f94eb30dfd5c845d1&', altText: 'Promote events icon', description: 'Feature and promote your events' },
    { iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b4bc1af68957b4fcb609e7bc2afdd401086db13b52f578226f9bd192dd6c8cea?apiKey=50c5361058c6465f94eb30dfd5c845d1&', altText: 'Exposure boost icon', description: 'Boost your exposure through our extensive network' },
    { iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b4bc1af68957b4fcb609e7bc2afdd401086db13b52f578226f9bd192dd6c8cea?apiKey=50c5361058c6465f94eb30dfd5c845d1&', altText: 'Audience expansion icon', description: 'Expand your reach and connect with a wider audience' },
    { iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b4bc1af68957b4fcb609e7bc2afdd401086db13b52f578226f9bd192dd6c8cea?apiKey=50c5361058c6465f94eb30dfd5c845d1&', altText: 'Partnership opportunity icon', description: 'Further partnership opportunities beyond our website' },
  ];

  return (
      <div className="fixed inset-0 flex justify-center items-center" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(158, 159, 160, 0.25)' }}>
        <div className="flex flex-col px-6 py-7 bg-black rounded-lg max-w-[908px] z-50">
          <header className="flex justify-end">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4982242de8e5c5b3df3979a22aa2a9c96f81120a2840a30daa3f6787bc698f95?apiKey=50c5361058c6465f94eb30dfd5c845d1&" alt="Close modal" className="ml-2.5 w-8 aspect-square" />
          </header>
                  <section className="pl-8 mt-7 rounded-xl max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
                        <h1 className="self-stretch my-auto text-6xl font-semibold tracking-wider text-white whitespace-nowrap leading-[70.8px] max-md:mt-10 max-md:text-4xl">
                          BE OUR PARTNER
                        </h1>
                      </div>
                      <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd321aee991d2c782f3090658da097d9b0363811e0199d7c98b91a069b50eac?apiKey=50c5361058c6465f94eb30dfd5c845d1&" alt="Partner benefits visualization" className="grow w-full aspect-[3.57] max-md:mt-10 max-md:max-w-full" />
                      </div>
                    </div>
                  </section>
                  <section className="mt-4 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                        <article className="flex flex-col grow justify-center p-4 w-full text-base font-medium tracking-wide text-white rounded-lg bg-neutral-800 max-md:mt-4 max-md:max-w-full">
                          {features.map((feature, index) => (
                            <PartnerFeature key={index} iconSrc={feature.iconSrc} altText={feature.altText} description={feature.description} />
                          ))}
                        </article>
                      </div>
                      <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                        <article className="flex flex-col grow justify-center self-stretch p-4 rounded-lg max-md:mt-4">
                          <p className="text-2xl italic font-medium leading-7 text-white">
                            For us, partnership isn’t just agreements on paper. It’s about opening doors to new possibilities.
                          </p>
                          <BenefitSection className="contact" buttonText="contact us" />
                          <BenefitSection className="apply" buttonText="APPLY FOR PARTNERSHIP" iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/62843eb5177112d50b50edcc6927f01845921798fdf6cf88117b9b43e4666c1d?apiKey=50c5361058c6465f94eb30dfd5c845d1&" />
                        </article>
                      </div>
                    </div>
                  </section>
        </div>
      </div>
    );
};

export default PartnerPage;